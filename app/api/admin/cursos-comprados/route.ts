import { NextResponse } from "next/server";
import { createClient } from "@/lib/server";
import { createClient as createSupabaseAdmin } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    // ==========================================
    // CLIENTE DEL USUARIO ACTUAL
    // ==========================================

    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          error: "No estás autenticado.",
        },
        { status: 401 }
      );
    }

    // ==========================================
    // SERVICE ROLE
    // SOLO SERVIDOR
    // ==========================================

    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (!serviceRoleKey || !supabaseUrl) {
      return NextResponse.json(
        {
          error:
            "Faltan las variables de Supabase en el servidor.",
        },
        { status: 500 }
      );
    }

    const supabaseAdmin = createSupabaseAdmin(
      supabaseUrl,
      serviceRoleKey
    );

    // ==========================================
    // COMPROBAR QUE EL USUARIO ES ADMIN
    // ==========================================

    const { data: perfil, error: perfilError } =
      await supabaseAdmin
        .from("profiles")
        .select("id, role")
        .eq("id", user.id)
        .maybeSingle();

    if (perfilError) {
      console.error(
        "Error comprobando administrador:",
        perfilError
      );

      return NextResponse.json(
        {
          error: "No se pudo comprobar el usuario.",
        },
        { status: 500 }
      );
    }

    if (!perfil || perfil.role !== "admin") {
      return NextResponse.json(
        {
          error:
            "No tienes permisos para asignar cursos.",
        },
        { status: 403 }
      );
    }

    // ==========================================
    // RECIBIR DATOS
    // ==========================================

    const body = await req.json();

    const {
      user_id,
      curso,
      classroom_url,
    } = body;

    if (!user_id || !curso) {
      return NextResponse.json(
        {
          error:
            "Faltan el alumno o el curso.",
        },
        { status: 400 }
      );
    }

    // ==========================================
    // COMPROBAR SI YA TIENE EL CURSO
    // ==========================================

    const {
      data: compraExistente,
      error: errorBusqueda,
    } = await supabaseAdmin
      .from("cursos_comprados")
      .select("id")
      .eq("user_id", user_id)
      .eq("curso", curso)
      .maybeSingle();

    if (errorBusqueda) {
      console.error(
        "Error buscando curso existente:",
        errorBusqueda
      );

      return NextResponse.json(
        {
          error:
            "Error comprobando si el alumno ya tiene el curso.",
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

    // ==========================================
    // INSERTAR CURSO
    // ==========================================

    const { error: insertError } =
      await supabaseAdmin
        .from("cursos_comprados")
        .insert({
          user_id,
          curso,
          classroom_url:
            classroom_url || null,
        });

    if (insertError) {
      console.error(
        "Error insertando curso:",
        insertError
      );

      return NextResponse.json(
        {
          error:
            "No se pudo asignar el curso.",
        },
        { status: 500 }
      );
    }

    // ==========================================
    // TODO CORRECTO
    // ==========================================

    return NextResponse.json({
      success: true,
      message: "Curso asignado correctamente.",
    });
  } catch (error) {
    console.error(
      "ERROR API ADMIN CURSOS:",
      error
    );

    return NextResponse.json(
      {
        error: "Error interno del servidor.",
      },
      { status: 500 }
    );
  }
}