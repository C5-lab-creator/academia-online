import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  console.log("➡️ Entrando en solicitud-reserva");
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          ok: false,
          error: "RESEND_API_KEY no está configurada.",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const {
      nombre,
      email,
      servicio,
      profesional,
      fecha,
      hora,
    } = await req.json();

    // Correo para la academia
    const admin = await resend.emails.send({
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

    console.log("ADMIN:", admin);

    if (admin.error) {
      console.error("ERROR ADMIN:", admin.error);

      return NextResponse.json(
        {
          ok: false,
          error: admin.error,
        },
        { status: 500 }
      );
    }

    // Confirmación al cliente
    const usuario = await resend.emails.send({
      from: "Academia Mente Abierta <info@academia-menteabierta.com>",
      to: [email],
      subject: "Reserva realizada con Academia Mente Abierta",
      html: `
        <h2>Gracias por reservar con Academia Mente Abierta</h2>

        <p>Hola ${nombre},</p>

        <p>Hemos recibido correctamente tu solicitud de reserva.</p>

        <ul>
          <li><strong>Servicio:</strong> ${servicio}</li>
          <li><strong>Profesional:</strong> ${profesional}</li>
          <li><strong>Fecha:</strong> ${fecha}</li>
          <li><strong>Hora:</strong> ${hora}</li>
        </ul>

        <p>Nos pondremos en contacto contigo si fuese necesario.</p>
      `,
    });

    console.log("USUARIO:", usuario);

    if (usuario.error) {
      console.error("ERROR USUARIO:", usuario.error);

      return NextResponse.json(
        {
          ok: false,
          error: usuario.error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
    });

  } catch (error: any) {
    console.error("ERROR GENERAL:", error);

    return NextResponse.json(
      {
        ok: false,
        error: error?.message || "Error desconocido",
      },
      { status: 500 }
    );
  }
}