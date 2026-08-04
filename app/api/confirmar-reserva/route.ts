import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    // Confirmar la reserva
    const { data: reserva, error } = await supabase
      .from("reservas")
      .update({ estado: "Confirmada" })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    // Enviar correo al cliente
    await resend.emails.send({
      from: "Academia Mente Abierta <info@academia-menteabierta.com>",
      to: reserva.email,
      subject: "✅ Tu reserva ha sido confirmada",
      html: `
        <h2>¡Tu reserva ha sido confirmada!</h2>

        <p>Hola <strong>${reserva.nombre}</strong>,</p>

        <p>Tu cita ya está confirmada.</p>

        <ul>
          <li><strong>Servicio:</strong> ${reserva.servicio}</li>
          <li><strong>Profesional:</strong> ${reserva.profesional}</li>
          <li><strong>Fecha:</strong> ${reserva.fecha}</li>
          <li><strong>Hora:</strong> ${reserva.hora}</li>
        </ul>

        ${
          reserva.enlace_meet
            ? `
            <p><strong>Enlace de Google Meet:</strong></p>
            <p><a href="${reserva.enlace_meet}">
              ${reserva.enlace_meet}
            </a></p>
          `
            : ""
        }

        <p>Te esperamos.</p>

        <p>Academia Mente Abierta</p>
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