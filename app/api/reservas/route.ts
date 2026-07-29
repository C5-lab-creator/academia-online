import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const {
      nombre,
      email,
      servicio,
      profesional,
      fecha,
      hora,
    } = await req.json();

    // Correo para vosotros
    await resend.emails.send({
      from: "Academia Mente Abierta <info@academia-menteabierta.com>",
      to: [
        "sheylaapariciosuarez@gmail.com",
        "eduardobadi93@gmail.com",
      ],
      subject: "Nueva reserva recibida",
      html: `
        <h2>Nueva reserva</h2>

        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Servicio:</strong> ${servicio}</p>
        <p><strong>Profesional:</strong> ${profesional}</p>
        <p><strong>Fecha:</strong> ${fecha}</p>
        <p><strong>Hora:</strong> ${hora}</p>
      `,
    });

    // Confirmación al cliente
    await resend.emails.send({
      from: "Academia Mente Abierta <info@academia-menteabierta.com>",
      to: [email],
      subject: "Reserva confirmada",
      html: `
        <h2>Gracias por reservar con Academia Mente Abierta</h2>

        <p>Hola ${nombre},</p>

        <p>Hemos recibido correctamente tu reserva.</p>

        <ul>
          <li><strong>Servicio:</strong> ${servicio}</li>
          <li><strong>Profesional:</strong> ${profesional}</li>
          <li><strong>Fecha:</strong> ${fecha}</li>
          <li><strong>Hora:</strong> ${hora}</li>
        </ul>

        <p>Nos pondremos en contacto contigo si fuese necesario.</p>
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