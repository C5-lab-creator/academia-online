import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  console.log("➡️ Entrando en confirmar-reserva");

  try {
    const { id } = await req.json();
    console.log("ID:", id);

    const { data: reserva, error } = await supabase
      .from("reservas")
      .update({ estado: "Confirmada" })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    await resend.emails.send({
      from: "Academia Mente Abierta <info@academia-menteabierta.com>",
      to: reserva.email,
      subject: "✅ Tu reserva ha sido confirmada",
      html: `
        <h2>¡Tu reserva ha sido confirmada!</h2>
        <p>Hola <strong>${reserva.nombre}</strong>,</p>
        <p>Tu cita ya está confirmada.</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("ERROR:", error);

    return NextResponse.json(
      {
        ok: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}