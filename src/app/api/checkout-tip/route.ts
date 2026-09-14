import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "STRIPE_SECRET_KEY is not defined in environment" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16" as any,
    });

    const { amount } = await req.json();

    if (!amount || Number(amount) < 5) {
      return NextResponse.json(
        { error: "Minimum amount is $5" },
        { status: 400 }
      );
    }

    const origin = req.headers.get("origin") || "https://misfitt.tokyo";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Back YU up! (Creative Fuel & Field Research)",
              description: "Direct support for equipment, field research, and upcoming productions.",
            },
            unit_amount: Math.round(Number(amount) * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/backup?success=true`,
      cancel_url: `${origin}/backup`,
    });

    if (!session.url) {
      throw new Error("Failed to create Stripe session URL.");
    }

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe Checkout Error:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
