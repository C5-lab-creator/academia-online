import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { nombre, email, mensaje } = await req.json();

    // Correo para ti
    await resend.emails.send({
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

    // Correo para el usuario
    await resend.emails.send({
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

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false },
      { status: 500 }
    );
  }
}