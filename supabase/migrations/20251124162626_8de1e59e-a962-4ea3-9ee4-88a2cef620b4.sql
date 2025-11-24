-- Create meals table for meal history
CREATE TABLE public.meals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  meal_name TEXT,
  meal_type TEXT, -- breakfast, lunch, dinner, snack
  image_url TEXT,
  foods JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of identified foods with nutrition
  total_calories INTEGER NOT NULL DEFAULT 0,
  total_protein DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_carbs DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_fat DECIMAL(10,2) NOT NULL DEFAULT 0,
  notes TEXT,
  confidence_score DECIMAL(3,2), -- Average confidence from AI analysis
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.meals ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own meals"
  ON public.meals
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own meals"
  ON public.meals
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own meals"
  ON public.meals
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own meals"
  ON public.meals
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_meals_user_id ON public.meals(user_id);
CREATE INDEX idx_meals_created_at ON public.meals(created_at DESC);
CREATE INDEX idx_meals_meal_type ON public.meals(meal_type);

-- Create function to get daily nutrition totals
CREATE OR REPLACE FUNCTION public.get_daily_nutrition(
  p_user_id UUID,
  p_date DATE DEFAULT CURRENT_DATE
)
RETURNS TABLE (
  total_calories BIGINT,
  total_protein DECIMAL,
  total_carbs DECIMAL,
  total_fat DECIMAL,
  meal_count BIGINT
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    COALESCE(SUM(m.total_calories), 0)::BIGINT as total_calories,
    COALESCE(SUM(m.total_protein), 0) as total_protein,
    COALESCE(SUM(m.total_carbs), 0) as total_carbs,
    COALESCE(SUM(m.total_fat), 0) as total_fat,
    COUNT(*)::BIGINT as meal_count
  FROM public.meals m
  WHERE m.user_id = p_user_id
    AND DATE(m.created_at) = p_date
$$;