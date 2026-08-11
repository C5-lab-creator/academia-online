import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    // =====================================================
    // VARIABLES DE SUPABASE
    // =====================================================

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseAnonKey || !serviceRoleKey) {
      console.error("Faltan variables de Supabase");

      return NextResponse.json(
        {
          error: "Faltan variables de Supabase en Vercel.",
        },
        { status: 500 }
      );
    }

    // =====================================================
    // OBTENER TOKEN DEL ADMINISTRADOR
    // =====================================================

    const authorization = req.headers.get("authorization");

    if (!authorization) {
      return NextResponse.json(
        {
          error: "No se recibió el token de autenticación.",
        },
        { status: 401 }
      );
    }

    if (!authorization.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          error: "Formato de autorización incorrecto.",
        },
        { status: 401 }
      );
    }

    const accessToken = authorization.replace("Bearer ", "").trim();

    if (!accessToken) {
      return NextResponse.json(
        {
          error: "El token de autenticación está vacío.",
        },
        { status: 401 }
      );
    }

    // =====================================================
    // CLIENTE SUPABASE PARA VALIDAR AL USUARIO
    // =====================================================

    const supabaseAuth = createClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
        global: {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      }
    );

    // =====================================================
    // OBTENER USUARIO DEL TOKEN
    // =====================================================

    const {
      data: { user },
      error: userError,
    } = await supabaseAuth.auth.getUser(accessToken);

    if (userError || !user) {
      console.error("Error validando sesión:", userError);

      return NextResponse.json(
        {
          error:
            "La sesión de Supabase no es válida o ha expirado.",
        },
        { status: 401 }
      );
    }

    console.log(
      "Usuario autenticado:",
      user.email,
      user.id
    );

    // =====================================================
    // CLIENTE ADMINISTRADOR SERVICE ROLE
    // =====================================================

    const supabaseAdmin = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );

    // =====================================================
    // COMPROBAR QUE ES ADMIN
    // =====================================================

    const {
      data: perfil,
      error: perfilError,
    } = await supabaseAdmin
      .from("profiles")
      .select("id, role")
      .eq("id", user.id)
      .maybeSingle();

    if (perfilError) {
      console.error(
        "Error comprobando perfil:",
        perfilError
      );

      return NextResponse.json(
        {
          error: "No se pudo comprobar tu perfil.",
        },
        { status: 500 }
      );
    }

    if (!perfil) {
      return NextResponse.json(
        {
          error:
            "No existe un perfil asociado a este usuario.",
        },
        { status: 403 }
      );
    }

    if (perfil.role !== "admin") {
      return NextResponse.json(
        {
          error:
            "No tienes permisos de administrador.",
        },
        { status: 403 }
      );
    }

    console.log(
      "Administrador confirmado:",
      user.email
    );

    // =====================================================
    // RECIBIR DATOS
    // =====================================================

    const body = await req.json();

    const {
      user_id,
      curso,
      classroom_url,
    } = body;

    if (!user_id) {
      return NextResponse.json(
        {
          error: "Falta seleccionar el alumno.",
        },
        { status: 400 }
      );
    }

    if (!curso) {
      return NextResponse.json(
        {
          error: "Falta seleccionar el curso.",
        },
        { status: 400 }
      );
    }

    if (!classroom_url) {
      return NextResponse.json(
        {
          error:
            "Falta introducir el enlace de Google Classroom.",
        },
        { status: 400 }
      );
    }

    // =====================================================
    // COMPROBAR SI YA TIENE EL CURSO
    // =====================================================

    const {
      data: compraExistente,
      error: busquedaError,
    } = await supabaseAdmin
      .from("cursos_comprados")
      .select("id")
      .eq("user_id", user_id)
      .eq("curso", curso)
      .maybeSingle();

    if (busquedaError) {
      console.error(
        "Error buscando curso:",
        busquedaError
      );

      return NextResponse.json(
        {
          error:
            "Error comprobando si el alumno ya tiene este curso.",
        },
        { status: 500 }
      );
    }

    if (compraExistente) {
      return NextResponse.json(
        {
          error:
            "Este alumno ya tiene este curso asignado.",
        },
        { status: 400 }
      );
    }

    // =====================================================
    // INSERTAR CURSO
    // =====================================================

    const {
      data: nuevoCurso,
      error: insertError,
    } = await supabaseAdmin
      .from("cursos_comprados")
      .insert({
        user_id: user_id,
        curso: curso,
        classroom_url: classroom_url.trim(),
      })
      .select()
      .single();

    if (insertError) {
      console.error(
        "Error insertando curso:",
        insertError
      );

      return NextResponse.json(
        {
          error:
            `No se pudo asignar el curso: ${insertError.message}`,
        },
        { status: 500 }
      );
    }

    // =====================================================
    // TODO CORRECTO
    // =====================================================

    console.log(
      "CURSO ASIGNADO CORRECTAMENTE",
      {
        alumno: user_id,
        curso,
      }
    );

    return NextResponse.json({
      success: true,
      message: "Curso asignado correctamente.",
      curso: nuevoCurso,
    });
  } catch (error) {
    console.error(
      "ERROR API ADMIN CURSOS:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Error interno del servidor.",
      },
      { status: 500 }
    );
  }
}