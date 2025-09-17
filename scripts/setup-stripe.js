const Stripe = require('stripe');

// Initialize Stripe with your live key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'YOUR_STRIPE_SECRET_KEY', {
  apiVersion: '2024-12-18.acacia'
});

async function setupStripePrice() {
  try {
    // Check if price already exists
    const existingPrices = await stripe.prices.list({
      product: 'prod_T4WXfGpcS2xX6J',
      active: true,
      limit: 10
    });

    let price = existingPrices.data.find(p =>
      p.unit_amount === 999 &&
      p.currency === 'usd' &&
      p.recurring?.interval === 'month'
    );

    if (!price) {
      // Create the price for the product
      price = await stripe.prices.create({
        product: 'prod_T4WXfGpcS2xX6J',
        unit_amount: 999, // $9.99 in cents
        currency: 'usd',
        recurring: {
          interval: 'month'
        },
        nickname: 'Premium Monthly'
      });

      console.log('✅ Created new price:', price.id);
    } else {
      console.log('✅ Using existing price:', price.id);
    }

    // Create webhook endpoint if it doesn't exist
    const endpoints = await stripe.webhookEndpoints.list({ limit: 10 });
    const webhookUrl = 'https://punctual.ai/api/stripe/webhook';

    let endpoint = endpoints.data.find(e => e.url === webhookUrl);

    if (!endpoint) {
      endpoint = await stripe.webhookEndpoints.create({
        url: webhookUrl,
        enabled_events: [
          'checkout.session.completed',
          'customer.subscription.created',
          'customer.subscription.updated',
          'customer.subscription.deleted',
          'invoice.payment_succeeded',
          'invoice.payment_failed'
        ]
      });

      console.log('✅ Created webhook endpoint');
      console.log('🔑 Webhook Secret:', endpoint.secret);
      console.log('⚠️  SAVE THIS SECRET - You need to add it to Vercel as STRIPE_WEBHOOK_SECRET');
    } else {
      console.log('✅ Webhook endpoint already exists');
    }

    console.log('\n📝 Update your code with this price ID:', price.id);
    console.log('\nAdd these to your .env and Vercel:');
    console.log('STRIPE_PRICE_ID=' + price.id);

    return price.id;

  } catch (error) {
    console.error('Error setting up Stripe:', error);
    process.exit(1);
  }
}

setupStripePrice();