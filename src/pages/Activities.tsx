import { Layout } from "@/components/Layout";
import { BottomNav } from "@/components/BottomNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useProgressTracking } from "@/hooks/useProgressTracking";
import { TrendingUp, TrendingDown, Activity, Flame, Target, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const Activities = () => {
  const { weeklyStats } = useProgressTracking();

  const stats = [
    {
      icon: Activity,
      label: "Treinos",
      value: weeklyStats.workouts,
      unit: "",
      change: weeklyStats.workoutsChange,
      color: "text-primary"
    },
    {
      icon: Flame,
      label: "Calorias",
      value: weeklyStats.calories,
      unit: "kcal",
      change: weeklyStats.caloriesChange,
      color: "text-primary"
    },
    {
      icon: Target,
      label: "Meta Nutricional",
      value: weeklyStats.nutritionGoal,
      unit: "%",
      change: weeklyStats.nutritionChange,
      color: "text-primary"
    },
    {
      icon: Clock,
      label: "Tempo de Treino",
      value: weeklyStats.workoutTime,
      unit: "h",
      change: weeklyStats.timeChange,
      color: "text-primary"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background pb-24">
        {/* Header */}
        <div className="sticky top-16 md:top-20 bg-background z-10 px-4 py-4 border-b">
          <h1 className="text-2xl font-bold text-foreground">Atividades</h1>
          <p className="text-sm text-muted-foreground mt-1">Últimos 7 dias</p>
        </div>

        {/* Stats Grid */}
        <div className="px-4 py-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              const isPositive = stat.change > 0;
              const isNegative = stat.change < 0;

              return (
                <Card key={stat.label}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Icon className={cn("w-5 h-5", stat.color)} />
                      {stat.change !== 0 && (
                        <div className={cn(
                          "flex items-center gap-1 text-xs font-medium",
                          isPositive && "text-green-600",
                          isNegative && "text-red-600"
                        )}>
                          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {Math.abs(stat.change)}%
                        </div>
                      )}
                    </div>
                    <CardDescription className="text-xs">{stat.label}</CardDescription>
                    <CardTitle className="text-2xl">
                      {stat.value}{stat.unit}
                    </CardTitle>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
              <CardDescription>Seus treinos da semana</CardDescription>
            </CardHeader>
            <CardContent>
              {weeklyStats.workouts === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Nenhum treino registrado esta semana
                </p>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Você completou {weeklyStats.workouts} treino{weeklyStats.workouts > 1 ? 's' : ''} esta semana! 💪
                  </p>
                  <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Calendário em breve</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <BottomNav currentPage="activities" />
      </div>
    </Layout>
  );
};

export default Activities;
