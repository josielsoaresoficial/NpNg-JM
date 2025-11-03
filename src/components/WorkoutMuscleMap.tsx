import { useNavigate } from "react-router-dom";
import bodyFrontWorkout from "@/assets/body-front-workout-transparent.png";
import bodyBackWorkout from "@/assets/body-back-workout-transparent.png";

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
}

// Posições ajustadas - Desktop
const frontLabelsDesktop: MuscleLabel[] = [
  { name: "Peitoral", muscle: "chest", side: "right", top: "23.166666666666668%", right: "3.125%", fontSize: 14, lineWidth: 40 },
  { name: "Ombros", muscle: "shoulders", side: "left", top: "18.333333333333332%", left: "3.125%", fontSize: 14, lineWidth: 40 },
  { name: "Bíceps", muscle: "biceps", side: "left", top: "31.666666666666668%", left: "3.125%", fontSize: 14, lineWidth: 40 },
  { name: "Abdômen", muscle: "abs", side: "right", top: "38.333333333333336%", right: "3.125%", fontSize: 14, lineWidth: 40 },
  { name: "Antebraços", muscle: "forearms", side: "right", top: "50%", right: "3.125%", fontSize: 14, lineWidth: 40 },
  { name: "Oblíquos", muscle: "obliques", side: "left", top: "46.666666666666664%", left: "3.125%", fontSize: 14, lineWidth: 40 },
  { name: "Quadríceps", muscle: "legs", side: "left", top: "65%", left: "3.125%", fontSize: 14, lineWidth: 40 },
  { name: "Adutores", muscle: "adductors", side: "right", top: "65%", right: "3.125%", fontSize: 14, lineWidth: 40 },
  { name: "Panturrilhas", muscle: "calves", side: "right", top: "81.66666666666667%", right: "3.125%", fontSize: 14, lineWidth: 40 },
];

const backLabelsDesktop: MuscleLabel[] = [
  { name: "Trapézio", muscle: "traps", side: "right", top: "16.666666666666668%", right: "3.125%", fontSize: 14, lineWidth: 40 },
  { name: "Dorsais", muscle: "back", side: "right", top: "31.666666666666668%", right: "3.125%", fontSize: 14, lineWidth: 40 },
  { name: "Tríceps", muscle: "triceps", side: "left", top: "31.666666666666668%", left: "3.125%", fontSize: 14, lineWidth: 40 },
  { name: "Lombares", muscle: "lower_back", side: "left", top: "45%", left: "3.125%", fontSize: 14, lineWidth: 40 },
  { name: "Glúteos", muscle: "glutes", side: "right", top: "51.666666666666664%", right: "3.125%", fontSize: 14, lineWidth: 40 },
  { name: "Isquiotibiais", muscle: "hamstrings", side: "left", top: "65%", left: "3.125%", fontSize: 14, lineWidth: 40 },
  { name: "Panturrilhas", muscle: "calves", side: "right", top: "80%", right: "3.125%", fontSize: 14, lineWidth: 40 },
];

// Posições ajustadas - Mobile
const frontLabelsMobile: MuscleLabel[] = [
  { name: "Peitoral", muscle: "chest", side: "right", top: "23.166666666666668%", right: "0%", fontSize: 12, lineWidth: 35 },
  { name: "Ombros", muscle: "shoulders", side: "left", top: "18.333333333333332%", left: "0%", fontSize: 12, lineWidth: 35 },
  { name: "Bíceps", muscle: "biceps", side: "left", top: "31.666666666666668%", left: "0%", fontSize: 12, lineWidth: 35 },
  { name: "Abdômen", muscle: "abs", side: "right", top: "38.333333333333336%", right: "0%", fontSize: 12, lineWidth: 35 },
  { name: "Antebraços", muscle: "forearms", side: "right", top: "50%", right: "0%", fontSize: 12, lineWidth: 35 },
  { name: "Oblíquos", muscle: "obliques", side: "left", top: "46.666666666666664%", left: "0%", fontSize: 12, lineWidth: 35 },
  { name: "Quadríceps", muscle: "legs", side: "left", top: "65%", left: "0%", fontSize: 12, lineWidth: 35 },
  { name: "Adutores", muscle: "adductors", side: "right", top: "65%", right: "0%", fontSize: 12, lineWidth: 35 },
  { name: "Panturrilhas", muscle: "calves", side: "right", top: "81.66666666666667%", right: "0%", fontSize: 12, lineWidth: 35 },
];

const backLabelsMobile: MuscleLabel[] = [
  { name: "Trapézio", muscle: "traps", side: "right", top: "16.666666666666668%", right: "0%", fontSize: 12, lineWidth: 35 },
  { name: "Dorsais", muscle: "back", side: "right", top: "31.666666666666668%", right: "0%", fontSize: 12, lineWidth: 35 },
  { name: "Tríceps", muscle: "triceps", side: "left", top: "31.666666666666668%", left: "0%", fontSize: 12, lineWidth: 35 },
  { name: "Lombares", muscle: "lower_back", side: "left", top: "45%", left: "0%", fontSize: 12, lineWidth: 35 },
  { name: "Glúteos", muscle: "glutes", side: "right", top: "51.666666666666664%", right: "0%", fontSize: 12, lineWidth: 35 },
  { name: "Isquiotibiais", muscle: "hamstrings", side: "left", top: "65%", left: "0%", fontSize: 12, lineWidth: 35 },
  { name: "Panturrilhas", muscle: "calves", side: "right", top: "80%", right: "0%", fontSize: 12, lineWidth: 35 },
];

export function WorkoutMuscleMap({ view, selectedMuscle, onMuscleSelect }: WorkoutMuscleMapProps) {
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 768;
  
  // Seleciona os labels corretos baseado na view e dispositivo
  const labels = isMobile 
    ? (view === "front" ? frontLabelsMobile : backLabelsMobile)
    : (view === "front" ? frontLabelsDesktop : backLabelsDesktop);

  const handleLabelClick = (muscle: string) => {
    const label = labels.find(l => l.muscle === muscle);
    const muscleName = label ? label.name.toLowerCase() : muscle;
    navigate(`/workouts/muscle/${muscleName}`);
  };

  return (
    <div className="relative w-full flex items-center justify-center py-4">
      <div className="relative w-full max-w-[600px] flex items-center justify-center">
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
          {labels.map((label) => (
            <div
              key={label.muscle}
              className="absolute pointer-events-auto cursor-pointer group transition-all duration-200"
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
                  style={{ fontSize: `${label.fontSize || 14}px` }}
                >
                  {label.name}
                </div>

                {/* Line and Point */}
                <div className="relative flex items-center">
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
