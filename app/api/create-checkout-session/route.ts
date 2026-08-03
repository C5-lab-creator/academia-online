import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { curso, modalidad } = await req.json();

    let priceId = "";

    // AUTISMO
    if (curso === "familias-autismo") {
      if (modalidad === "estandar") {
        priceId = "price_1U0Ma8GwdiBdCmqJUum7roiD";
      } else if (modalidad === "premium") {
        priceId = "price_1U0Mb1GwdiBdCmqJlvx2Onic";
      }
    }

    // FAMILIAS DEMENCIA
    else if (curso === "familias-demencia") {
      if (modalidad === "estandar") {
        priceId = "price_1U0MnjGwdiBdCmqJkEX9zDvS";
      } else if (modalidad === "premium") {
        priceId = "price_1U0MoBGwdiBdCmqJ1g5PUQoh";
      }
    }

    // PROFESIONALES DEMENCIA
    else if (curso === "profesionales-demencia") {
      if (modalidad === "estandar") {
        priceId = "price_1U0MpnGwdiBdCmqJjVVorAMZ";
      } else if (modalidad === "premium") {
        priceId = "price_1U0MqAGwdiBdCmqJs3SzGvv0";
      }
    }

    // ESCUELA DE ESPALDA
    else if (curso === "escuela de espalda") {
      if (modalidad === "estandar") {
        priceId = "price_1U0MonGwdiBdCmqJ2USEx9rp";
      } else if (modalidad === "premium") {
        priceId = "price_1U0MpCGwdiBdCmqJYUoMzkGM";
      }
    }

    if (!priceId) {
      return NextResponse.json(
        { error: "Curso o modalidad no válidos" },
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