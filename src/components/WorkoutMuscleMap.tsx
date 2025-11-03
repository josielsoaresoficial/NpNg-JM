import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import bodyFrontWorkout from "@/assets/body-front-workout-transparent.png";
import bodyBackWorkout from "@/assets/body-back-workout-transparent.png";
import { toast } from "sonner";

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

// Posições ajustadas - Desktop (baseado nas imagens de referência)
const frontLabelsDesktop: MuscleLabel[] = [
  { name: "Ombros", muscle: "shoulders", side: "left", top: "20%", left: "3.125%", fontSize: 14, lineWidth: 40 },
  { name: "Peitoral", muscle: "chest", side: "right", top: "23%", right: "3.125%", fontSize: 14, lineWidth: 40 },
  { name: "Bíceps", muscle: "biceps", side: "left", top: "32%", left: "3.125%", fontSize: 14, lineWidth: 40 },
  { name: "Abdômen", muscle: "abs", side: "right", top: "37%", right: "3.125%", fontSize: 14, lineWidth: 40 },
  { name: "Oblíquos", muscle: "obliques", side: "left", top: "43%", left: "3.125%", fontSize: 14, lineWidth: 40 },
  { name: "Antebraços", muscle: "forearms", side: "right", top: "48%", right: "3.125%", fontSize: 14, lineWidth: 40 },
  { name: "Abdutores", muscle: "adductors", side: "left", top: "57%", left: "3.125%", fontSize: 14, lineWidth: 40 },
  { name: "Adutores", muscle: "adductors", side: "right", top: "62%", right: "3.125%", fontSize: 14, lineWidth: 40 },
  { name: "Quadríceps", muscle: "legs", side: "left", top: "70%", left: "3.125%", fontSize: 14, lineWidth: 40 },
];

const backLabelsDesktop: MuscleLabel[] = [
  { name: "Trapézio", muscle: "traps", side: "right", top: "18%", right: "3.125%", fontSize: 14, lineWidth: 40 },
  { name: "Tríceps", muscle: "triceps", side: "left", top: "30%", left: "3.125%", fontSize: 14, lineWidth: 40 },
  { name: "Dorsais", muscle: "back", side: "right", top: "32%", right: "3.125%", fontSize: 14, lineWidth: 40 },
  { name: "Lombares", muscle: "lower_back", side: "left", top: "44%", left: "3.125%", fontSize: 14, lineWidth: 40 },
  { name: "Glúteos", muscle: "glutes", side: "right", top: "50%", right: "3.125%", fontSize: 14, lineWidth: 40 },
  { name: "Isquiotibiais", muscle: "hamstrings", side: "left", top: "64%", left: "3.125%", fontSize: 14, lineWidth: 40 },
  { name: "Panturrilhas", muscle: "calves", side: "right", top: "78%", right: "3.125%", fontSize: 14, lineWidth: 40 },
];

// Posições ajustadas - Mobile (baseado nas imagens de referência)
const frontLabelsMobile: MuscleLabel[] = [
  { name: "Ombros", muscle: "shoulders", side: "left", top: "20%", left: "0%", fontSize: 12, lineWidth: 35 },
  { name: "Peitoral", muscle: "chest", side: "right", top: "23%", right: "0%", fontSize: 12, lineWidth: 35 },
  { name: "Bíceps", muscle: "biceps", side: "left", top: "32%", left: "0%", fontSize: 12, lineWidth: 35 },
  { name: "Abdômen", muscle: "abs", side: "right", top: "37%", right: "0%", fontSize: 12, lineWidth: 35 },
  { name: "Oblíquos", muscle: "obliques", side: "left", top: "43%", left: "0%", fontSize: 12, lineWidth: 35 },
  { name: "Antebraços", muscle: "forearms", side: "right", top: "48%", right: "0%", fontSize: 12, lineWidth: 35 },
  { name: "Abdutores", muscle: "adductors", side: "left", top: "57%", left: "0%", fontSize: 12, lineWidth: 35 },
  { name: "Adutores", muscle: "adductors", side: "right", top: "62%", right: "0%", fontSize: 12, lineWidth: 35 },
  { name: "Quadríceps", muscle: "legs", side: "left", top: "70%", left: "0%", fontSize: 12, lineWidth: 35 },
];

const backLabelsMobile: MuscleLabel[] = [
  { name: "Trapézio", muscle: "traps", side: "right", top: "18%", right: "0%", fontSize: 12, lineWidth: 35 },
  { name: "Tríceps", muscle: "triceps", side: "left", top: "30%", left: "0%", fontSize: 12, lineWidth: 35 },
  { name: "Dorsais", muscle: "back", side: "right", top: "32%", right: "0%", fontSize: 12, lineWidth: 35 },
  { name: "Lombares", muscle: "lower_back", side: "left", top: "44%", left: "0%", fontSize: 12, lineWidth: 35 },
  { name: "Glúteos", muscle: "glutes", side: "right", top: "50%", right: "0%", fontSize: 12, lineWidth: 35 },
  { name: "Isquiotibiais", muscle: "hamstrings", side: "left", top: "64%", left: "0%", fontSize: 12, lineWidth: 35 },
  { name: "Panturrilhas", muscle: "calves", side: "right", top: "78%", right: "0%", fontSize: 12, lineWidth: 35 },
];

export function WorkoutMuscleMap({ view, selectedMuscle, onMuscleSelect }: WorkoutMuscleMapProps) {
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 768;
  
  // Seleciona os labels corretos baseado na view e dispositivo
  const baseLabels = isMobile 
    ? (view === "front" ? frontLabelsMobile : backLabelsMobile)
    : (view === "front" ? frontLabelsDesktop : backLabelsDesktop);
  
  // Estados para modo editor
  const [isEditing, setIsEditing] = useState(false);
  const [editableLabels, setEditableLabels] = useState<MuscleLabel[]>(baseLabels);
  const [draggedLabel, setDraggedLabel] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  // Atualiza labels quando view ou dispositivo muda
  useState(() => {
    setEditableLabels(baseLabels);
  });
  
  const labels = isEditing ? editableLabels : baseLabels;

  const handleLabelClick = (muscle: string) => {
    if (isEditing) return; // Não navega no modo edição
    const label = labels.find(l => l.muscle === muscle);
    const muscleName = label ? label.name.toLowerCase() : muscle;
    navigate(`/workouts/muscle/${muscleName}`);
  };
  
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent, muscle: string) => {
    if (!isEditing) return;
    e.preventDefault();
    
    const container = (e.currentTarget as HTMLElement).closest('.muscle-map-container');
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const label = labels.find(l => l.muscle === muscle);
    if (!label) return;
    
    const labelElement = e.currentTarget as HTMLElement;
    const labelRect = labelElement.getBoundingClientRect();
    
    setDraggedLabel(muscle);
    setDragOffset({
      x: clientX - labelRect.left,
      y: clientY - labelRect.top
    });
  };
  
  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isEditing || !draggedLabel) return;
    e.preventDefault();
    
    const container = (e.currentTarget as HTMLElement);
    const rect = container.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const x = clientX - rect.left - dragOffset.x;
    const y = clientY - rect.top - dragOffset.y;
    
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    
    setEditableLabels(prev => prev.map(label => {
      if (label.muscle === draggedLabel) {
        return {
          ...label,
          top: `${percentY}%`,
          left: label.side === "left" ? `${percentX}%` : undefined,
          right: label.side === "right" ? `${100 - percentX}%` : undefined,
        };
      }
      return label;
    }));
  };
  
  const handleDragEnd = () => {
    setDraggedLabel(null);
  };
  
  const handleSavePositions = () => {
    const device = isMobile ? "Mobile" : "Desktop";
    const viewType = view === "front" ? "front" : "back";
    console.log(`${viewType}Labels${device}:`, editableLabels);
    toast.success("Posições salvas com sucesso!");
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-4 gap-4">
      {/* Controles do Editor */}
      <div className="flex gap-2 z-30">
        <Button
          onClick={() => {
            setIsEditing(!isEditing);
            if (!isEditing) {
              setEditableLabels(baseLabels);
            }
          }}
          variant={isEditing ? "destructive" : "default"}
        >
          {isEditing ? "Cancelar Edição" : "Ativar Modo Editor"}
        </Button>
        {isEditing && (
          <Button onClick={handleSavePositions} variant="default">
            Salvar Posições
          </Button>
        )}
      </div>
      
      <div 
        className="relative w-full max-w-[600px] flex items-center justify-center muscle-map-container"
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
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
          {labels.map((label) => (
            <div
              key={label.muscle}
              className={`absolute pointer-events-auto group transition-all duration-200 ${
                isEditing ? 'cursor-move' : 'cursor-pointer'
              } ${draggedLabel === label.muscle ? 'z-50' : ''}`}
              style={{ 
                top: label.top,
                left: label.side === "left" && label.left ? label.left : undefined,
                right: label.side === "right" && label.right ? label.right : undefined
              }}
              onClick={() => handleLabelClick(label.muscle)}
              onMouseDown={(e) => handleDragStart(e, label.muscle)}
              onTouchStart={(e) => handleDragStart(e, label.muscle)}
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
