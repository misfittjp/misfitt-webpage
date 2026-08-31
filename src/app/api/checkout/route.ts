import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// This is a placeholder for the secret key. In production, use process.env.STRIPE_SECRET_KEY
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2026-07-29.dahlia',
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { plan, pax, date, photoAddon } = body;

    // Map plans to mock price IDs or line items
    let unitAmount = 0;
    let productName = "Bespoke Tokyo Private Tour";

    if (plan === '6-hour') {
      unitAmount = 77000;
      productName = "6-Hour Essential Tokyo Tour";
    } else if (plan === '7-hour') {
      unitAmount = 90000;
      productName = "7-Hour Curated Tokyo Tour";
    } else if (plan === '8-hour') {
      unitAmount = 100000;
      productName = "8-Hour Ultimate Bespoke Tokyo Experience";
    }

    const lineItems = [
      {
        price_data: {
          currency: 'jpy',
          product_data: {
            name: productName,
            description: `Group size: ${pax} | Date: ${date}`,
          },
          unit_amount: unitAmount,
        },
        quantity: 1,
      },
    ];

    if (photoAddon && photoAddon !== 'none') {
      let addonName = "Professional Photography Add-on";
      let addonPrice = 0;
      
      if (photoAddon === 'standard') {
        addonName = "Photography Add-on: Standard Story (~50 photos)";
        addonPrice = 35000;
      } else if (photoAddon === 'signature') {
        addonName = "Photography Add-on: Signature Story (~80 photos)";
        addonPrice = 45000;
      } else if (photoAddon === 'ultimate') {
        addonName = "Photography Add-on: Ultimate Documentary (~120+ photos)";
        addonPrice = 60000;
      }

      if (addonPrice > 0) {
        lineItems.push({
          price_data: {
            currency: 'jpy',
            product_data: {
              name: addonName,
              description: "High-resolution, editorial-style portraits",
            },
            unit_amount: addonPrice,
          },
          quantity: 1,
        });
      }
    }

    // In a real environment with a valid secret key, we would create a session:
    /*
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/tours`,
    });
    return NextResponse.json({ id: session.id });
    */

    // For now, we return a mock session ID for the frontend to handle
    console.log("Mock Stripe Checkout Session created for:", lineItems);
    
    return NextResponse.json({ 
      id: "cs_test_mock_session_id",
      mockUrl: "/success?mock=true" 
    });

  } catch (err: any) {
    console.error("Error creating checkout session:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
