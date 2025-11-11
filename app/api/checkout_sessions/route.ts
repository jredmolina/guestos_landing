import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";

interface CheckoutFormData {
  firstName?: string;
  lastName?: string;
  companyName?: string;
  companyWebsite?: string;
  email?: string;
  phone?: string;
  description?: string;
  priceId: string; // Only priceId is required
}

// Initialize Stripe with strict type checking for API key
if (!process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY) {
  console.error("Missing environment variables:", {
    NEXT_PUBLIC_STRIPE_SECRET_KEY: !!process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY,
    NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC:
      !!process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC,
    NEXT_PUBLIC_STRIPE_PRICE_ID_PRO:
      !!process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO,
  });
  throw new Error("STRIPE_SECRET_KEY is not defined in environment variables");
}

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

const ALLOWED_PRICE_IDS = [
  process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC,
  process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO,
  process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ENTERPRISE,
];

export async function POST(req: NextRequest) {
  try {
    const formData = (await req.json()) as CheckoutFormData;
    console.log("Received request with data:", formData);
    console.log("Allowed price IDs:", ALLOWED_PRICE_IDS);

    // Validate price ID
    if (!formData.priceId || !ALLOWED_PRICE_IDS.includes(formData.priceId)) {
      console.log("Invalid price ID:", formData.priceId);
      return NextResponse.json(
        { message: "Invalid price ID provided" },
        { status: 400 }
      );
    }

    console.log("Creating Stripe session...");
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: formData.priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/?canceled=true`,
      automatic_tax: { enabled: true },
      metadata: {
        ...(formData.firstName && { firstName: formData.firstName }),
        ...(formData.lastName && { lastName: formData.lastName }),
        ...(formData.companyName && { companyName: formData.companyName }),
        ...(formData.companyWebsite && {
          companyWebsite: formData.companyWebsite,
        }),
        ...(formData.email && { email: formData.email }),
        ...(formData.phone && { phone: formData.phone }),
        ...(formData.description && { description: formData.description }),
      },
      ...(formData.email && { customer_email: formData.email }),
      billing_address_collection: "required",
      allow_promotion_codes: true,
    });

    console.log("Session created:", session);

    if (!session.url) {
      throw new Error("Failed to create checkout session URL");
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Detailed Stripe error:", err);
    const error = err as Stripe.errors.StripeError;
    return NextResponse.json(
      { message: error.message || "An error occurred during checkout" },
      { status: error.statusCode || 500 }
    );
  }
}
