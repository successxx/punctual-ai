-- Add Stripe-related fields to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS subscription_status TEXT,
ADD COLUMN IF NOT EXISTS subscription_current_period_end TIMESTAMP WITH TIME ZONE;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_customer_id ON profiles(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_subscription_id ON profiles(stripe_subscription_id);

-- Create table to track processed webhook events
CREATE TABLE IF NOT EXISTS stripe_webhooks (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create index for webhook lookups
CREATE INDEX IF NOT EXISTS idx_stripe_webhooks_created_at ON stripe_webhooks(created_at);

-- Add a cleanup policy to remove old webhook records (older than 30 days)
-- This prevents the table from growing indefinitely
CREATE OR REPLACE FUNCTION cleanup_old_webhooks()
RETURNS void AS $$
BEGIN
  DELETE FROM stripe_webhooks
  WHERE created_at < NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;