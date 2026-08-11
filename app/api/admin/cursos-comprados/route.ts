import { NextResponse } from "next/server";
import { createClient as createSupabaseAdmin } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    console.log("======================================");
    console.log("API ADMIN CURSOS COMPRADOS");
    console.log("======================================");

    // =====================================================
    // 1. VARIABLES DE ENTORNO
    // =====================================================

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    console.log(
      "SUPABASE URL:",
      supabaseUrl ? "OK" : "FALTA"
    );

    console.log(
      "SERVICE ROLE:",
      serviceRoleKey ? "OK" : "FALTA"
    );

    if (!supabaseUrl || !serviceRoleKey) {
      console.error(
        "FALTAN VARIABLES DE SUPABASE"
      );

      return NextResponse.json(
        {
          error:
            "Faltan variables de Supabase en .env.local",
        },
        { status: 500 }
      );
    }

    // =====================================================
    // 2. OBTENER TOKEN DEL HEADER
    // =====================================================

    const authorization =
      req.headers.get("authorization");

    console.log(
      "Authorization:",
      authorization ? "RECIBIDA" : "NO RECIBIDA"
    );

    if (!authorization) {
      return NextResponse.json(
        {
          error:
            "No se recibió el token de autenticación.",
        },
        { status: 401 }
      );
    }

    if (!authorization.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          error:
            "Formato de autorización incorrecto.",
        },
        { status: 401 }
      );
    }

    const accessToken =
      authorization.replace("Bearer ", "").trim();

    if (!accessToken) {
      return NextResponse.json(
        {
          error:
            "El access token está vacío.",
        },
        { status: 401 }
      );
    }

    console.log("Access token recibido: OK");

    // =====================================================
    // 3. CLIENTE SUPABASE NORMAL PARA VALIDAR USUARIO
    // =====================================================

    const supabase = createSupabaseAdmin(
      supabaseUrl,
      serviceRoleKey
    );

    const {
      data: userData,
      error: userError,
    } = await supabase.auth.getUser(accessToken);

    console.log(
      "Resultado getUser:",
      userData?.user
        ? "USUARIO ENCONTRADO"
        : "SIN USUARIO"
    );

    if (userError) {
      console.error(
        "ERROR getUser:",
        userError
      );

      return NextResponse.json(
        {
          error:
            "La sesión de Supabase no es válida o ha expirado.",
          detalle: userError.message,
        },
        { status: 401 }
      );
    }

    const user = userData.user;

    if (!user) {
      return NextResponse.json(
        {
          error:
            "No se pudo identificar al usuario.",
        },
        { status: 401 }
      );
    }

    console.log(
      "Usuario autenticado:",
      user.email
    );

    // =====================================================
    // 4. COMPROBAR PERFIL ADMIN
    // =====================================================

    const {
      data: perfil,
      error: perfilError,
    } = await supabase
      .from("profiles")
      .select("id, role")
      .eq("id", user.id)
      .maybeSingle();

    console.log(
      "Perfil:",
      perfil
    );

    if (perfilError) {
      console.error(
        "ERROR BUSCANDO PERFIL:",
        perfilError
      );

      return NextResponse.json(
        {
          error:
            "No se pudo comprobar el perfil del usuario.",
          detalle: perfilError.message,
        },
        { status: 500 }
      );
    }

    if (!perfil) {
      return NextResponse.json(
        {
          error:
            "No existe un perfil para este usuario.",
        },
        { status: 403 }
      );
    }

    if (perfil.role !== "admin") {
      console.error(
        "USUARIO NO ES ADMIN:",
        perfil.role
      );

      return NextResponse.json(
        {
          error:
            "No tienes permisos para asignar cursos.",
        },
        { status: 403 }
      );
    }

    console.log("ADMINISTRADOR CONFIRMADO");

    // =====================================================
    // 5. LEER DATOS DEL FORMULARIO
    // =====================================================

    const body = await req.json();

    console.log(
      "Datos recibidos:",
      body
    );

    const {
      user_id,
      curso,
      classroom_url,
    } = body;

    if (!user_id) {
      return NextResponse.json(
        {
          error:
            "Falta seleccionar el alumno.",
        },
        { status: 400 }
      );
    }

    if (!curso) {
      return NextResponse.json(
        {
          error:
            "Falta seleccionar el curso.",
        },
        { status: 400 }
      );
    }

    // =====================================================
    // 6. COMPROBAR SI YA EXISTE
    // =====================================================

    const {
      data: existente,
      error: existenteError,
    } = await supabase
      .from("cursos_comprados")
      .select("id")
      .eq("user_id", user_id)
      .eq("curso", curso)
      .maybeSingle();

    if (existenteError) {
      console.error(
        "ERROR COMPROBANDO CURSO EXISTENTE:",
        existenteError
      );

      return NextResponse.json(
        {
          error:
            "Error comprobando si el alumno ya tiene este curso.",
          detalle:
            existenteError.message,
        },
        { status: 500 }
      );
    }

    if (existente) {
      return NextResponse.json(
        {
          error:
            "Este alumno ya tiene este curso asignado.",
        },
        { status: 400 }
      );
    }

    // =====================================================
    // 7. INSERTAR CURSO
    // =====================================================

    const {
      data: nuevoCurso,
      error: insertError,
    } = await supabase
      .from("cursos_comprados")
      .insert({
        user_id: user_id,
        curso: curso,
        classroom_url:
          classroom_url?.trim() || null,
      })
      .select()
      .single();

    if (insertError) {
      console.error(
        "ERROR INSERTANDO CURSO:",
        insertError
      );

      return NextResponse.json(
        {
          error:
            "No se pudo asignar el curso.",
          detalle:
            insertError.message,
          codigo:
            insertError.code,
        },
        { status: 500 }
      );
    }

    // =====================================================
    // 8. TODO CORRECTO
    // =====================================================

    console.log(
      "CURSO INSERTADO CORRECTAMENTE:",
      nuevoCurso
    );

    return NextResponse.json({
      success: true,
      message:
        "Curso asignado correctamente.",
      curso: nuevoCurso,
    });

  } catch (error: any) {
    console.error(
      "======================================"
    );

    console.error(
      "ERROR INTERNO API:"
    );

    console.error(error);

    console.error(
      "======================================"
    );

    return NextResponse.json(
      {
        error:
          "Error interno del servidor.",
        detalle:
          error?.message ||
          String(error),
      },
      { status: 500 }
    );
  }
}