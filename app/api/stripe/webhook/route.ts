import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!
);

// IMPORTANTE:
// Este cliente utiliza SERVICE ROLE.
// Solo se usa en el servidor.
// NUNCA lo pongas en un componente React.
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ======================================================
// CLASSROOM DE CADA CURSO Y MODALIDAD
// ======================================================

const classroomUrls: Record<
  string,
  Record<string, string>
> = {
  // ====================================================
  // AUTISMO
  // ====================================================

  "familias-autismo": {
    estandar:
      "https://classroom.google.com/c/ODE5OTA2NzI1NDI4?cjc=lmxfrlk3",

    premium:
      "https://classroom.google.com/c/ODE5OTM4MjQ1OTEw?cjc=xzafkcdw",
  },

  // ====================================================
  // FAMILIAS DEMENCIA
  // ====================================================

  "familias-demencia": {
    estandar:
      "https://classroom.google.com/c/ODE5OTA2NzczMTc4?cjc=dqlfafnw",

    premium:
      "https://classroom.google.com/c/ODcyMjU0NDU5NjI5?cjc=rxui6mjj",
  },

  // ====================================================
  // PROFESIONALES DEMENCIA
  // ====================================================

  "profesionales-demencia": {
    estandar:
      "https://classroom.google.com/c/ODcxNjg3NDY3MTY2?cjc=igqu5ih7",

    premium:
      "https://classroom.google.com/c/ODcyMjYyMzQ0MTAy?cjc=2eujdznj",
  },

  // ====================================================
  // ESCUELA DE ESPALDA
  // ====================================================

  "escuela de espalda": {
    estandar:
      "https://classroom.google.com/c/ODE5OTA2ODU3MzMw?cjc=ospc6vzr",

    premium:
      "https://classroom.google.com/c/ODcyMjYyNDMxNzE1?cjc=5php4hgk",
  },

  // ====================================================
  // MAYORES 25 - TRONCALES
  // ====================================================

  "mayores25-troncales": {
    "":
      "https://classroom.google.com/c/ODcxNjg3NDU1NzU0?cjc=ylxw56wj",
  },

  // ====================================================
  // MAYORES 25 - ESPECÍFICAS
  // ====================================================

  "mayores25-especificas": {
    "":
      "https://classroom.google.com/c/ODcxNjg3MTg4MzA4?cjc=aboudaof",
  },

  // ====================================================
  // QUÍMICA MAYORES 25
  // ====================================================

  "quimica-mayores25": {
    "":
      "https://classroom.google.com/c/ODcxNjg2NTQ5NTg3?cjc=6qnhi2bi",
  },

  // ====================================================
  // QUÍMICA SELECTIVIDAD
  // ====================================================

  "quimica-selectividad": {
    "":
      "https://classroom.google.com/c/ODcxNjg2OTI0NDAy?cjc=6aratxf2",
  },

  // ====================================================
  // MATEMÁTICAS SELECTIVIDAD
  // ====================================================

  "matematicas-selectividad": {
    "":
      "https://classroom.google.com/c/ODcxNjg0NTY0Nzcx?cjc=lcncxz7g",
  },

  // ====================================================
  // MATEMÁTICAS BACHILLERATO
  // ====================================================

  "matematicas-bachillerato": {
    "":
      "https://classroom.google.com/c/ODE5OTA2ODI0MzYw?cjc=yekdiake",
  },

  // ====================================================
  // QUÍMICA BACHILLERATO
  // ====================================================

  "quimica-bachillerato": {
    "":
      "https://classroom.google.com/c/ODE5OTA2Nzc5OTYz?cjc=lrnfm4ho",
  },

  // ====================================================
  // QUIMICA UNED
  // ====================================================

  "quimica-uned": {
    "":
      "https://classroom.google.com/c/ODc2MjAyMDA0NDMz?cjc=iz7dcmso",
  },

  
  // ====================================================
  // QUIMICA UNED
  // ====================================================

  "farmacia-uned": {
    "":
      "https://classroom.google.com/c/ODc2MjA2MjAyMjAy?cjc=ymzqx5vv",
  },
  
};

// ======================================================
// CALCULAR FECHA DE EXPIRACIÓN
// ======================================================

function calcularFechaExpiracion(
  fechaInicio: Date,
  acceso: string
): Date | null {
  // PREMIUM → acceso permanente
  if (acceso === "permanente") {
    return null;
  }

  // ESTÁNDAR → 6 meses
  if (acceso === "6_meses") {
    const fechaExpiracion = new Date(fechaInicio);

    fechaExpiracion.setMonth(
      fechaExpiracion.getMonth() + 6
    );

    return fechaExpiracion;
  }

  // Cursos sin modalidad:
  // no establecemos expiración aquí.
  return null;
}

// ======================================================
// WEBHOOK
// ======================================================

export async function POST(req: Request) {
  try {
    const body = await req.text();

    const signature =
      req.headers.get("stripe-signature");

    if (!signature) {
      console.error(
        "❌ Falta stripe-signature"
      );

      return new NextResponse(
        "Falta stripe-signature",
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    // ==================================================
    // VERIFICAR WEBHOOK DE STRIPE
    // ==================================================

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (error) {
      console.error(
        "❌ Firma Stripe inválida:",
        error
      );

      return new NextResponse(
        "Webhook signature verification failed",
        { status: 400 }
      );
    }

    console.log(
      "===================================="
    );

    console.log(
      "📦 EVENTO STRIPE:",
      event.type
    );

    console.log(
      "===================================="
    );

    // ==================================================
    // PAGO COMPLETADO
    // ==================================================

    if (
      event.type ===
      "checkout.session.completed"
    ) {
      const session =
        event.data.object as Stripe.Checkout.Session;

      // ==================================================
      // RECUPERAR DATOS DE METADATA
      // ==================================================

      const userId =
        session.metadata?.userId;

      const curso =
        session.metadata?.curso;

      const modalidad =
        session.metadata?.modalidad ?? "";

      const acceso =
        session.metadata?.acceso ?? "";

      console.log(
        "========== COMPRA RECIBIDA =========="
      );

      console.log(
        "Usuario:",
        userId
      );

      console.log(
        "Curso:",
        curso
      );

      console.log(
        "Modalidad:",
        modalidad || "única"
      );

      console.log(
        "Tipo de acceso:",
        acceso || "no especificado"
      );

      console.log(
        "Session:",
        session.id
      );

      // ==================================================
      // COMPROBAR METADATA
      // ==================================================

      if (!userId || !curso) {
        console.error(
          "❌ Falta userId o curso en metadata"
        );

        return new NextResponse(
          "Metadata incompleta",
          { status: 400 }
        );
      }

      // ==================================================
      // BUSCAR EL CURSO
      // ==================================================

      const cursoClassrooms =
        classroomUrls[curso];

      if (!cursoClassrooms) {
        console.error(
          "❌ Curso no configurado:",
          curso
        );

        return new NextResponse(
          "Curso no configurado",
          { status: 400 }
        );
      }

      // ==================================================
      // BUSCAR CLASSROOM SEGÚN MODALIDAD
      // ==================================================

      const classroomUrl =
        cursoClassrooms[modalidad];

      if (!classroomUrl) {
        console.error(
          "❌ No existe Classroom para:",
          curso,
          modalidad
        );

        return new NextResponse(
          "Modalidad sin Classroom configurado",
          { status: 400 }
        );
      }

      // ==================================================
      // COMPROBAR CLASSROOM
      // ==================================================

      if (
        classroomUrl.startsWith("PON_AQUI_")
      ) {
        console.error(
          "❌ Falta configurar el Classroom:",
          curso,
          modalidad
        );

        return new NextResponse(
          "Classroom no configurado",
          { status: 400 }
        );
      }

      console.log(
        "Classroom:",
        classroomUrl
      );

      // ==================================================
      // CALCULAR FECHAS DE ACCESO
      // ==================================================

      const fechaInicio = new Date();

      const fechaExpiracion =
        calcularFechaExpiracion(
          fechaInicio,
          acceso
        );

      console.log(
        "Fecha inicio:",
        fechaInicio.toISOString()
      );

      console.log(
        "Fecha expiración:",
        fechaExpiracion
          ? fechaExpiracion.toISOString()
          : "PERMANENTE"
      );

      // ==================================================
      // COMPROBAR SI YA EXISTE LA COMPRA
      // ==================================================

      const {
        data: compraExistente,
        error: errorBusqueda,
      } = await supabaseAdmin
        .from("cursos_comprados")
        .select(
          "id, fecha_inicio, fecha_expiracion"
        )
        .eq("user_id", userId)
        .eq("curso", curso)
        .eq("modalidad", modalidad)
        .maybeSingle();

      if (errorBusqueda) {
        console.error(
          "❌ Error buscando compra:",
          errorBusqueda
        );

        return new NextResponse(
          "Error buscando compra",
          { status: 500 }
        );
      }

      // ==================================================
      // SI YA EXISTE
      // ==================================================

      if (compraExistente) {
        console.log(
          "ℹ️ Esta compra ya existe."
        );

        console.log(
          "No se crea duplicado."
        );

        return NextResponse.json({
          received: true,
          alreadyExists: true,
        });
      }

      // ==================================================
      // GUARDAR COMPRA
      // ==================================================

      const {
        error: errorInsert,
      } = await supabaseAdmin
        .from("cursos_comprados")
        .insert({
          user_id: userId,
          curso: curso,
          modalidad: modalidad,
          classroom_url: classroomUrl,

          // ============================================
          // DURACIÓN DEL ACCESO
          // ============================================

          fecha_inicio:
            fechaInicio.toISOString(),

          fecha_expiracion:
            fechaExpiracion
              ? fechaExpiracion.toISOString()
              : null,
        });

      if (errorInsert) {
        console.error(
          "❌ Error guardando curso:",
          errorInsert
        );

        return new NextResponse(
          "Error guardando compra",
          { status: 500 }
        );
      }

      // ==================================================
      // TODO CORRECTO
      // ==================================================

      console.log(
        "===================================="
      );

      console.log(
        "✅ CURSO DESBLOQUEADO"
      );

      console.log(
        "Usuario:",
        userId
      );

      console.log(
        "Curso:",
        curso
      );

      console.log(
        "Modalidad:",
        modalidad || "única"
      );

      console.log(
        "Acceso:",
        acceso
      );

      console.log(
        "Classroom:",
        classroomUrl
      );

      console.log(
        "Fecha inicio:",
        fechaInicio.toISOString()
      );

      console.log(
        "Fecha expiración:",
        fechaExpiracion
          ? fechaExpiracion.toISOString()
          : "PERMANENTE"
      );

      console.log(
        "===================================="
      );
    }

    // ==================================================
    // RESPUESTA A STRIPE
    // ==================================================

    return NextResponse.json({
      received: true,
    });

  } catch (error) {
    console.error(
      "❌ ERROR WEBHOOK:",
      error
    );

    return new NextResponse(
      "Webhook error",
      { status: 500 }
    );
  }
}