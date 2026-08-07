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

    const { data: reserva, error } = await supabase
      .from("reservas")
      .update({ estado: "Cancelada" })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    await resend.emails.send({
      from: "Academia Mente Abierta <info@academia-menteabierta.com>",
      to: reserva.email,
      subject: "❌ Tu reserva ha sido cancelada",
      html: `
        <h2>Reserva cancelada</h2>

        <p>Hola <strong>${reserva.nombre}</strong>,</p>

        <p>Te confirmamos que tu reserva ha sido cancelada correctamente.</p>

        <p><strong>Clase:</strong> ${reserva.clase}</p>
        <p><strong>Fecha:</strong> ${reserva.fecha}</p>
        <p><strong>Hora:</strong> ${reserva.hora}</p>

        <p>Si se trata de un error o deseas reservar otra fecha, estaremos encantados de ayudarte.</p>

        <br>

        <p>Un saludo,<br>
        <strong>Academia Mente Abierta</strong></p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        ok: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}