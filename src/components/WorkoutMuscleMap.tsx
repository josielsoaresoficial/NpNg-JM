import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bodyFrontWorkout from "@/assets/body-front-workout-transparent.png";
import bodyBackWorkout from "@/assets/body-back-workout-transparent.png";
import { useIsMobile } from "@/hooks/use-mobile";

interface WorkoutMuscleMapProps {
  view: "front" | "back";
  selectedMuscle: string | null;
  onMuscleSelect: (muscle: string) => void;
}

interface MuscleLabel {
  name: string;
  muscle: string;
  side: "left" | "right";
  top: string;
  left?: string;
  right?: string;
  fontSize?: number;
  lineWidth?: number;
  pointSide?: "left" | "right";
  lineType?: "straight" | "angled";
  hideLabel?: boolean;
  hideLine?: boolean;
}

const frontLabels: MuscleLabel[] = [
  { name: "Peitoral", muscle: "chest", side: "right", top: "20%" },
  { name: "Ombros", muscle: "shoulders", side: "left", top: "16%" },
  { name: "Bíceps", muscle: "biceps", side: "left", top: "30%" },
  { name: "Abdômen", muscle: "abs", side: "right", top: "36%" },
  { name: "Antebraços", muscle: "forearms", side: "right", top: "48%" },
  { name: "Oblíquos", muscle: "obliques", side: "left", top: "44%" },
  { name: "Quadríceps", muscle: "legs", side: "left", top: "62%" },
  { name: "Adutores", muscle: "adductors", side: "right", top: "62%" },
  { name: "Panturrilhas", muscle: "calves", side: "right", top: "78%" },
];

const backLabels: MuscleLabel[] = [
  { name: "Trapézio", muscle: "traps", side: "right", top: "14%" },
  { name: "Dorsais", muscle: "back", side: "right", top: "28%" },
  { name: "Tríceps", muscle: "triceps", side: "left", top: "28%" },
  { name: "Lombares", muscle: "lower_back", side: "left", top: "42%" },
  { name: "Glúteos", muscle: "glutes", side: "right", top: "48%" },
  { name: "Isquiotibiais", muscle: "hamstrings", side: "left", top: "62%" },
  { name: "Panturrilhas", muscle: "calves", side: "right", top: "76%" },
];

export function WorkoutMuscleMap({ view, selectedMuscle, onMuscleSelect }: WorkoutMuscleMapProps) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const storageKey = `muscle-labels-${view}-${isMobile ? 'mobile' : 'desktop'}`;
  
  const [labels, setLabels] = useState<MuscleLabel[]>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : (view === "front" ? frontLabels : backLabels);
  });

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    setLabels(saved ? JSON.parse(saved) : (view === "front" ? frontLabels : backLabels));
  }, [view, storageKey]);

  const handleLabelClick = (muscle: string) => {
    const label = labels.find(l => l.muscle === muscle);
    const muscleName = label ? label.name.toLowerCase() : muscle;
    navigate(`/workouts/muscle/${muscleName}`);
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-0 gap-2">
      <div
        id="muscle-map-container"
        className="relative w-full max-w-[600px] flex items-center justify-center"
      >
        {/* Body Image */}
        <div className="relative flex items-center justify-center transition-all duration-300 ease-in-out">
          <img
            src={view === "front" ? bodyFrontWorkout : bodyBackWorkout}
            alt={view === "front" ? "Vista frontal do corpo" : "Vista traseira do corpo"}
            className="w-[280px] h-auto object-contain transition-opacity duration-300"
            style={{ maxHeight: "600px" }}
          />
        </div>

        {/* Muscle Labels */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {labels.map((label) => {
            if (label.hideLabel) return null;
            
            return (
              <div
                key={label.muscle}
                className={`absolute pointer-events-auto ${
                  !label.left && !label.right ? (label.side === "left" ? "left-0" : "right-0") : ""
                } cursor-pointer group transition-all duration-200`}
                style={{ 
                  top: label.top,
                  left: label.side === "left" && label.left ? label.left : undefined,
                  right: label.side === "right" && label.right ? label.right : undefined
                }}
                onClick={() => handleLabelClick(label.muscle)}
              >
                <div className={`flex items-center ${label.side === "left" ? "flex-row" : "flex-row-reverse"} gap-1`}>
                  {/* Label Text */}
                  <div
                    className={`font-medium px-2 py-1 whitespace-nowrap ${
                      label.side === "left" ? "text-left" : "text-right"
                    } ${
                      selectedMuscle === label.muscle
                        ? "font-bold text-primary"
                        : "text-foreground group-hover:font-semibold group-hover:text-primary"
                    } transition-all duration-200`}
                    style={{ 
                      fontSize: `${label.fontSize || 14}px`
                    }}
                  >
                    {label.name}
                  </div>

                  {/* Connector Line and Point */}
                  {!label.hideLine && (
                    <div className={`relative flex items-center ${
                      (label.pointSide || label.side) !== label.side ? "flex-row-reverse" : ""
                    }`}>
                      {label.lineType === "angled" ? (
                        <svg 
                          width={label.lineWidth || 40} 
                          height="20" 
                          className="overflow-visible"
                          style={{ 
                            transform: (label.pointSide || label.side) === "left" ? "scaleX(-1)" : "none"
                          }}
                        >
                          <path
                            d={`M 0,10 L ${((label.lineWidth || 40) * 0.6)},10 L ${(label.lineWidth || 40)},0`}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            className={`${
                              selectedMuscle === label.muscle ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                            } transition-colors duration-200`}
                          />
                          <circle
                            cx={(label.lineWidth || 40)}
                            cy="0"
                            r="2"
                            className={`${
                              selectedMuscle === label.muscle ? "fill-primary" : "fill-muted-foreground group-hover:fill-primary"
                            } transition-colors duration-200`}
                          />
                        </svg>
                      ) : (
                        <>
                          <div
                            className={`h-[1px] ${
                              selectedMuscle === label.muscle ? "bg-primary" : "bg-muted-foreground group-hover:bg-primary"
                            } transition-colors duration-200`}
                            style={{ width: `${label.lineWidth || 40}px` }}
                          />
                          <div
                            className={`w-2 h-2 rounded-full ${
                              selectedMuscle === label.muscle ? "bg-primary" : "bg-muted-foreground group-hover:bg-primary"
                            } transition-colors duration-200`}
                          />
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
