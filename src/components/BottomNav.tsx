import { Link, useLocation } from "react-router-dom";
import { Dumbbell, TrendingUp, Compass, Target, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  currentPage?: "workouts" | "activities" | "explore" | "exercises" | "body";
}

export function BottomNav({ currentPage }: BottomNavProps) {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (currentPage) {
      return path.includes(currentPage);
    }
    return location.pathname === path;
  };

  const navItems = [
    { icon: Dumbbell, label: "Treinos", path: "/workouts", page: "workouts" },
    { icon: TrendingUp, label: "Atividades", path: "/activities", page: "activities" },
    { icon: Compass, label: "Explorar", path: "/explore", page: "explore" },
    { icon: Target, label: "Exercícios", path: "/exercises", page: "exercises" },
    { icon: User, label: "Corpo", path: "/body", page: "body" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border pb-safe z-50">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 min-w-[60px]",
                "transition-colors"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 transition-colors",
                  active ? "text-primary" : "text-muted-foreground"
                )}
              />
              <span
                className={cn(
                  "text-xs font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
