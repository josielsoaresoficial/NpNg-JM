import { Trophy, Share2 } from "lucide-react";
import { useAchievements } from "@/hooks/useAchievements";
import { AchievementsBadge } from "./AchievementsBadge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Skeleton } from "./ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { toast } from "sonner";

export const AchievementsSection = () => {
  const { achievements, loading, unlockedCount, totalCount, progress, shareAchievement } = useAchievements();

  const shareAllAchievements = async () => {
    const unlockedAchievements = achievements.filter(a => a.unlocked);
    const text = `🏆 Minhas Conquistas no Fitness App!\n\n${unlockedAchievements.map(a => `${a.icon} ${a.title}`).join('\n')}\n\n${unlockedCount}/${totalCount} conquistas desbloqueadas!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Minhas Conquistas',
          text: text
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      await navigator.clipboard.writeText(text);
      toast.success('Texto copiado!', {
        description: 'Cole em suas redes sociais'
      });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Conquistas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    );
  }

  const workoutAchievements = achievements.filter(a => a.type.startsWith('workouts_'));
  const mealAchievements = achievements.filter(a => a.type.startsWith('meals_'));
  const activeAchievements = achievements.filter(a => a.type.startsWith('active_'));

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Conquistas
          </CardTitle>
          <Button
            size="sm"
            variant="outline"
            onClick={shareAllAchievements}
            className="gap-2"
          >
            <Share2 className="h-4 w-4" />
            Compartilhar
          </Button>
        </div>
        
        <div className="space-y-2 mt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progresso</span>
            <span className="font-semibold">{unlockedCount}/{totalCount}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-auto">
            <TabsTrigger value="all" className="text-xs py-2">
              Todas
            </TabsTrigger>
            <TabsTrigger value="workouts" className="text-xs py-2">
              Treinos
            </TabsTrigger>
            <TabsTrigger value="meals" className="text-xs py-2">
              Refeições
            </TabsTrigger>
            <TabsTrigger value="active" className="text-xs py-2">
              Dias Ativos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3 mt-4">
            {achievements.map((achievement) => (
              <AchievementsBadge
                key={achievement.id}
                achievement={achievement}
                onShare={shareAchievement}
              />
            ))}
          </TabsContent>

          <TabsContent value="workouts" className="space-y-3 mt-4">
            {workoutAchievements.map((achievement) => (
              <AchievementsBadge
                key={achievement.id}
                achievement={achievement}
                onShare={shareAchievement}
              />
            ))}
          </TabsContent>

          <TabsContent value="meals" className="space-y-3 mt-4">
            {mealAchievements.map((achievement) => (
              <AchievementsBadge
                key={achievement.id}
                achievement={achievement}
                onShare={shareAchievement}
              />
            ))}
          </TabsContent>

          <TabsContent value="active" className="space-y-3 mt-4">
            {activeAchievements.map((achievement) => (
              <AchievementsBadge
                key={achievement.id}
                achievement={achievement}
                onShare={shareAchievement}
              />
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
