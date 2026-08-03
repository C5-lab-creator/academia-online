import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { modalidad } = await req.json();

    let priceId = "";

    if (modalidad === "estandar") {
      priceId = "price_1U0L2RGmUnKYDkqv94iBxBJr";
    } else if (modalidad === "premium") {
      priceId = "price_1U0L2RGmUnKYDkqvDHY8dgxK";
    } else {
      return NextResponse.json(
        { error: "Modalidad no válida" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: [
        {
          price: priceId,
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

    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}