import { Clock } from "lucide-react";
import { useTrialStatus } from "@/hooks/useTrialStatus";
import { cn } from "@/lib/utils";

export function TrialTimer() {
  const { isTrialActive, timeRemaining } = useTrialStatus();

  if (!isTrialActive) return null;

  // Converter segundos para HH:MM:SS
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Animação pulsante quando < 1 hora
  const isUrgent = timeRemaining < 3600;

  return (
    <div 
      className={cn(
        "fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-lg",
        "bg-red-500/90 text-white backdrop-blur-sm shadow-lg",
        "transition-all duration-300",
        isUrgent && "animate-pulse"
      )}
    >
      <Clock className="w-4 h-4" />
      <span className="font-mono text-sm font-semibold">
        {formattedTime}
      </span>
    </div>
  );
}
