import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { nombre, email, mensaje } = await req.json();

    // Envío a la academia
    const admin = await resend.emails.send({
      from: "Academia Mente Abierta <info@academia-menteabierta.com>",
      to: [
        "sheylaapariciosuarez@gmail.com",
        "eduardobadi93@gmail.com",
      ],
      subject: "Nuevo mensaje desde Academia Mente Abierta",
      html: `
        <h2>Nuevo mensaje recibido</h2>

        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Mensaje:</strong></p>

        <p>${mensaje}</p>
      `,
    });

    console.log("ADMIN:", admin);

    if (admin.error) {
      console.error("ERROR ADMIN:", admin.error);
      return NextResponse.json(
        { ok: false, error: admin.error },
        { status: 500 }
      );
    }

    // Confirmación al usuario
    const usuario = await resend.emails.send({
      from: "Academia Mente Abierta <info@academia-menteabierta.com>",
      to: [email],
      subject: "Hemos recibido tu mensaje",
      html: `
        <h2>Gracias por contactar con Academia Mente Abierta</h2>

        <p>Hola ${nombre},</p>

        <p>Hemos recibido correctamente tu mensaje.</p>

        <p>Te responderemos lo antes posible.</p>

        <p>Un saludo.</p>
      `,
    });

    console.log("USUARIO:", usuario);

    if (usuario.error) {
      console.error("ERROR USUARIO:", usuario.error);
      return NextResponse.json(
        { ok: false, error: usuario.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });

  } catch (error: any) {
    console.error("ERROR GENERAL:", error);

    return NextResponse.json(
      {
        ok: false,
        message: error?.message || "Error desconocido",
        error,
      },
      { status: 500 }
    );
  }
}