import Stripe from 'stripe';

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any, // Use a stable API version
  typescript: true,
});

// Subscription price ID for Premium plan
export const PREMIUM_PRICE_ID = 'price_1S8NxtPvPVptBEttGMbxtPYn'; // $9.99/month recurring

// Product IDs
export const PRODUCT_IDS = {
  premium: 'prod_T4WXfGpcS2xX6J'
};

// Helper function to create checkout session
export async function createCheckoutSession({
  customerId,
  customerEmail,
  priceId,
  successUrl,
  cancelUrl,
  metadata = {}
}: {
  customerId?: string;
  customerEmail: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    customer: customerId,
    customer_email: customerId ? undefined : customerEmail,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata,
    subscription_data: {
      metadata,
    },
    allow_promotion_codes: true,
  });

  return session;
}

// Helper to create customer portal session
export async function createPortalSession(customerId: string, returnUrl: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  return session;
}

// Helper to get or create Stripe customer
export async function getOrCreateStripeCustomer(email: string, userId: string) {
  // Check if customer exists
  const existingCustomers = await stripe.customers.list({
    email,
    limit: 1
  });

  if (existingCustomers.data.length > 0) {
    return existingCustomers.data[0];
  }

  // Create new customer
  const customer = await stripe.customers.create({
    email,
    metadata: {
      supabase_user_id: userId
    }
  });

  return customer;
}