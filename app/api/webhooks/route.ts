import { NextRequest, NextResponse } from 'next/server';
import { Stripe } from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature')!;

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Here you can save the customer data to your database
      const customerData = {
        ...session.metadata,
        customerEmail: session.customer_email,
        paymentStatus: session.payment_status,
        amountTotal: session.amount_total,
        created: session.created,
      };

      // TODO: Add your database logic here
      // await prisma.customer.create({ data: customerData });
      
      // You could also trigger any other necessary actions
      // like sending welcome emails, etc.
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    const error = err as Error;
    console.error('Webhook error:', error.message);
    return NextResponse.json(
      { message: error.message },
      { status: 400 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}; 