import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface MetricHistory {
  date: string;
  weight: number;
  bodyFat?: number;
  muscleMass?: number;
  bmi?: number;
}

export const useBodyMetricsHistory = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState<MetricHistory[]>([]);
  const [loading, setLoading] = useState(false);

  const loadHistory = async () => {
    if (!user) return;
    setLoading(true);

    const { data } = await supabase
      .from('body_metrics')
      .select('*')
      .eq('user_id', user.id)
      .order('measurement_date', { ascending: true })
      .limit(30);

    if (data) {
      setHistory(data.map(d => ({
        date: new Date(d.measurement_date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
        weight: Number(d.weight),
        bodyFat: d.body_fat_percentage ? Number(d.body_fat_percentage) : undefined,
        muscleMass: d.muscle_mass ? Number(d.muscle_mass) : undefined,
        bmi: d.bmi ? Number(d.bmi) : undefined
      })));
    }
    setLoading(false);
  };

  useEffect(() => {
    loadHistory();
  }, [user]);

  return {
    history,
    loading,
    refreshHistory: loadHistory
  };
};
