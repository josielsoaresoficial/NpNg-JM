import { MuscleGroup } from "@/pages/Exercises";
import bodyFront from "@/assets/body-front.png";
import bodyBack from "@/assets/body-back.png";

interface MuscleMapProps {
  view: "front" | "back";
  selectedMuscle: MuscleGroup | null;
  onMuscleSelect: (muscle: MuscleGroup) => void;
}

interface MuscleLabel {
  name: string;
  muscle: MuscleGroup;
  position: {
    desktop: { top: string; left?: string; right?: string };
    mobile: { top: string; left?: string; right?: string };
  };
  lineLength: number;
  fontSize: string;
  lineType: 'straight' | 'curved';
}

const frontLabels: MuscleLabel[] = [
  {
    name: "Ombros",
    muscle: "ombros",
    position: {
      desktop: { top: "18%", left: "10%" },
      mobile: { top: "18%", left: "5%" }
    },
    lineLength: 60,
    fontSize: "14px",
    lineType: 'straight'
  },
  {
    name: "Bíceps",
    muscle: "biceps",
    position: {
      desktop: { top: "32%", left: "8%" },
      mobile: { top: "32%", left: "3%" }
    },
    lineLength: 70,
    fontSize: "14px",
    lineType: 'straight'
  },
  {
    name: "Oblíquos",
    muscle: "obliquos",
    position: {
      desktop: { top: "46%", left: "5%" },
      mobile: { top: "46%", left: "2%" }
    },
    lineLength: 80,
    fontSize: "14px",
    lineType: 'straight'
  },
  {
    name: "Abdutores",
    muscle: "abdutores",
    position: {
      desktop: { top: "60%", left: "3%" },
      mobile: { top: "60%", left: "1%" }
    },
    lineLength: 90,
    fontSize: "14px",
    lineType: 'straight'
  },
  {
    name: "Quadríceps",
    muscle: "quadriceps",
    position: {
      desktop: { top: "74%", left: "2%" },
      mobile: { top: "74%", left: "0%" }
    },
    lineLength: 95,
    fontSize: "14px",
    lineType: 'straight'
  },
  {
    name: "Peitoral",
    muscle: "peitoral",
    position: {
      desktop: { top: "22%", right: "10%" },
      mobile: { top: "22%", right: "5%" }
    },
    lineLength: 60,
    fontSize: "14px",
    lineType: 'straight'
  },
  {
    name: "Abdômen",
    muscle: "abdomen",
    position: {
      desktop: { top: "38%", right: "8%" },
      mobile: { top: "38%", right: "3%" }
    },
    lineLength: 70,
    fontSize: "14px",
    lineType: 'straight'
  },
  {
    name: "Antebraços",
    muscle: "antebracos",
    position: {
      desktop: { top: "52%", right: "5%" },
      mobile: { top: "52%", right: "2%" }
    },
    lineLength: 80,
    fontSize: "14px",
    lineType: 'straight'
  },
  {
    name: "Adutores",
    muscle: "adutores",
    position: {
      desktop: { top: "66%", right: "3%" },
      mobile: { top: "66%", right: "1%" }
    },
    lineLength: 90,
    fontSize: "14px",
    lineType: 'straight'
  },
  {
    name: "Cardio",
    muscle: "cardio",
    position: {
      desktop: { top: "80%", right: "2%" },
      mobile: { top: "80%", right: "0%" }
    },
    lineLength: 95,
    fontSize: "14px",
    lineType: 'straight'
  }
];

const backLabels: MuscleLabel[] = [
  {
    name: "Trapézio",
    muscle: "trapezio",
    position: {
      desktop: { top: "16%", right: "10%" },
      mobile: { top: "16%", right: "5%" }
    },
    lineLength: 60,
    fontSize: "14px",
    lineType: 'straight'
  },
  {
    name: "Tríceps",
    muscle: "triceps",
    position: {
      desktop: { top: "30%", left: "8%" },
      mobile: { top: "30%", left: "3%" }
    },
    lineLength: 70,
    fontSize: "14px",
    lineType: 'straight'
  },
  {
    name: "Dorsais",
    muscle: "dorsais",
    position: {
      desktop: { top: "32%", right: "8%" },
      mobile: { top: "32%", right: "3%" }
    },
    lineLength: 70,
    fontSize: "14px",
    lineType: 'straight'
  },
  {
    name: "Lombares",
    muscle: "lombares",
    position: {
      desktop: { top: "46%", left: "5%" },
      mobile: { top: "46%", left: "2%" }
    },
    lineLength: 80,
    fontSize: "14px",
    lineType: 'straight'
  },
  {
    name: "Glúteos",
    muscle: "gluteos",
    position: {
      desktop: { top: "52%", right: "5%" },
      mobile: { top: "52%", right: "2%" }
    },
    lineLength: 80,
    fontSize: "14px",
    lineType: 'straight'
  },
  {
    name: "Isquiotibiais",
    muscle: "isquiotibiais",
    position: {
      desktop: { top: "66%", left: "3%" },
      mobile: { top: "66%", left: "1%" }
    },
    lineLength: 90,
    fontSize: "14px",
    lineType: 'straight'
  },
  {
    name: "Cardio",
    muscle: "cardio",
    position: {
      desktop: { top: "70%", right: "3%" },
      mobile: { top: "70%", right: "1%" }
    },
    lineLength: 90,
    fontSize: "14px",
    lineType: 'straight'
  },
  {
    name: "Panturrilhas",
    muscle: "panturrilhas",
    position: {
      desktop: { top: "84%", left: "2%" },
      mobile: { top: "84%", left: "0%" }
    },
    lineLength: 95,
    fontSize: "14px",
    lineType: 'straight'
  }
];

export function MuscleMap({ view, selectedMuscle, onMuscleSelect }: MuscleMapProps) {
  const labels = view === "front" ? frontLabels : backLabels;
  const isMobile = window.innerWidth < 768;

  return (
    <div className="relative w-full flex items-center justify-center py-8">
      {/* Container with fixed max-width for consistent sizing */}
      <div className="relative w-full max-w-[600px] flex items-center justify-center">
        {/* Body Image - Centered */}
        <div className="relative flex items-center justify-center transition-all duration-300 ease-in-out">
          <img
            src={view === "front" ? bodyFront : bodyBack}
            alt={view === "front" ? "Vista frontal do corpo" : "Vista traseira do corpo"}
            className="w-[280px] h-auto object-contain transition-opacity duration-300"
            style={{ maxHeight: "600px" }}
          />
        </div>

        {/* Muscle Labels - Positioned absolutely */}
        <div className="absolute inset-0 pointer-events-none">
          {labels.map((label) => {
            const position = isMobile ? label.position.mobile : label.position.desktop;
            const isLeft = position.left !== undefined;
            
            return (
              <div
                key={label.muscle}
                className="absolute pointer-events-auto cursor-pointer group"
                style={position}
                onClick={() => onMuscleSelect(label.muscle)}
              >
                {/* Label Container */}
                <div className={`flex items-center ${isLeft ? "flex-row" : "flex-row-reverse"} gap-1`}>
                  {/* Label Text */}
                  <div
                    className={`font-medium text-black px-2 py-1 whitespace-nowrap ${
                      isLeft ? "text-left" : "text-right"
                    } ${
                      selectedMuscle === label.muscle
                        ? "font-bold text-[#FF9F66]"
                        : "group-hover:font-semibold group-hover:text-[#FF9F66]"
                    } transition-all duration-200`}
                    style={{ fontSize: label.fontSize }}
                  >
                    {label.name}
                  </div>

                  {/* Connector Line and Point */}
                  <div className="relative flex items-center">
                    <div
                      className={`h-[1px] ${
                        selectedMuscle === label.muscle ? "bg-[#FF9F66]" : "bg-gray-400 group-hover:bg-[#FF9F66]"
                      } transition-colors duration-200`}
                      style={{ width: `${label.lineLength}px` }}
                    />
                    <div
                      className={`w-2 h-2 ${
                        selectedMuscle === label.muscle ? "bg-[#FF9F66]" : "bg-gray-400 group-hover:bg-[#FF9F66]"
                      } transition-colors duration-200`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
