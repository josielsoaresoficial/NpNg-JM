import { motion } from "framer-motion";
import { Share2, Lock } from "lucide-react";
import { Achievement } from "@/hooks/useAchievements";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface AchievementsBadgeProps {
  achievement: Achievement;
  onShare: (achievement: Achievement) => void;
}

export const AchievementsBadge = ({ achievement, onShare }: AchievementsBadgeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className={`p-4 relative overflow-hidden ${
          achievement.unlocked 
            ? 'bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20' 
            : 'bg-muted/50 opacity-60'
        }`}
      >
        {/* Badge Icon */}
        <div className="flex items-start gap-3">
          <div className={`text-4xl ${!achievement.unlocked && 'grayscale'}`}>
            {achievement.unlocked ? achievement.icon : <Lock className="w-10 h-10 text-muted-foreground" />}
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className={`font-semibold ${achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {achievement.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {achievement.description}
                </p>
                
                {achievement.unlocked && achievement.unlockedAt && (
                  <Badge variant="secondary" className="mt-2 text-xs">
                    Desbloqueado em {new Date(achievement.unlockedAt).toLocaleDateString('pt-BR')}
                  </Badge>
                )}
              </div>

              {achievement.unlocked && (
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onShare(achievement)}
                  className="shrink-0"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Progress indicator for locked achievements */}
        {!achievement.unlocked && (
          <div className="mt-3 pt-3 border-t border-border/50">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Requisito: {achievement.requirement}</span>
              <Lock className="h-3 w-3" />
            </div>
          </div>
        )}

        {/* Shine effect for unlocked */}
        {achievement.unlocked && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
        )}
      </Card>
    </motion.div>
  );
};
