import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { titulo, precio } = await req.json();

    console.log("Secret:", !!process.env.STRIPE_SECRET_KEY);
    console.log("Site:", process.env.NEXT_PUBLIC_SITE_URL);

    const session = await stripe.checkout.sessions.create({
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
  } catch (error: any) {
    console.error("===== ERROR STRIPE =====");
    console.error(error);
    console.error("Mensaje:", error.message);
    console.error("Tipo:", error.type);
    console.error("Código:", error.code);
    console.error("Param:", error.param);

    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}