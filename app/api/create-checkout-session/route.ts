import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { titulo, precio } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: titulo,
            },
            unit_amount: Math.round(precio * 100),
          },
          quantity: 1,
        },
      ],

      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pago-correcto`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pago-cancelado`,
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error creando la sesión de pago" },
      { status: 500 }
    );
  }
}