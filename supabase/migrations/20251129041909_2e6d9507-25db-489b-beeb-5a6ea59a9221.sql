-- Add trial fields to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS trial_started_at timestamptz,
ADD COLUMN IF NOT EXISTS is_premium boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS trial_expired boolean DEFAULT false;