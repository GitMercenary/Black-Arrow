-- Newsletter Subscriptions Table
-- Stores email addresses for newsletter subscriptions

CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  unsubscribed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscriptions(email);

-- Create index on is_active for filtering
CREATE INDEX IF NOT EXISTS idx_newsletter_active ON newsletter_subscriptions(is_active);

-- Enable Row Level Security
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can subscribe (insert)
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscriptions
  FOR INSERT
  WITH CHECK (true);

-- Policy: Admins can view all subscriptions
CREATE POLICY "Admins can view all newsletter subscriptions"
  ON newsletter_subscriptions
  FOR SELECT
  USING (
    auth.uid() IN (SELECT id FROM admin_users)
  );

-- Policy: Admins can update subscriptions (e.g., mark as inactive)
CREATE POLICY "Admins can update newsletter subscriptions"
  ON newsletter_subscriptions
  FOR UPDATE
  USING (
    auth.uid() IN (SELECT id FROM admin_users)
  );

-- Add comment
COMMENT ON TABLE newsletter_subscriptions IS 'Stores newsletter email subscriptions';
