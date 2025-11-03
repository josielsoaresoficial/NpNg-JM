import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
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
  position: {
    desktop: { top: string; left?: string; right?: string };
    mobile: { top: string; left?: string; right?: string };
  };
  side: "left" | "right";
  lineLength: number;
  fontSize: string;
  lineType: 'straight' | 'curved';
  hideLineAndPoint?: boolean;
}

const frontLabels: MuscleLabel[] = [
  {
    name: "Ombros",
    muscle: "ombros",
    side: "left",
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
    side: "left",
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
    side: "left",
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
    side: "left",
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
    side: "left",
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
    side: "right",
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
    side: "right",
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
    side: "right",
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
    side: "right",
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
    side: "right",
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
    side: "right",
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
    side: "left",
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
    side: "right",
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
    side: "left",
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
    side: "right",
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
    side: "left",
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
    side: "right",
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
    side: "left",
    position: {
      desktop: { top: "84%", left: "2%" },
      mobile: { top: "84%", left: "0%" }
    },
    lineLength: 95,
    fontSize: "14px",
    lineType: 'straight'
  }
];

export function WorkoutMuscleMap({ view, selectedMuscle, onMuscleSelect }: WorkoutMuscleMapProps) {
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 768;
  
  // Seleciona os labels corretos baseado na view
  const baseLabels = view === "front" ? frontLabels : backLabels;
  
  // Estados para modo editor
  const [isEditing, setIsEditing] = useState(false);
  const [editableLabels, setEditableLabels] = useState<MuscleLabel[]>(baseLabels);
  const [draggedLabel, setDraggedLabel] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [editMenuPosition, setEditMenuPosition] = useState<{ top: number; left: number } | null>(null);
  
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
    
    const deviceKey = isMobile ? 'mobile' : 'desktop';
    
    setEditableLabels(prev => prev.map(label => {
      if (label.muscle === draggedLabel) {
        return {
          ...label,
          position: {
            ...label.position,
            [deviceKey]: {
              top: `${percentY}%`,
              left: label.side === "left" ? `${percentX}%` : undefined,
              right: label.side === "right" ? `${100 - percentX}%` : undefined,
            }
          }
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
  
  const handleResetPositions = () => {
    setEditableLabels(baseLabels);
    setSelectedLabel(null);
    toast.success("Posições resetadas!");
  };
  
  const handleFontSizeChange = (value: number[]) => {
    if (!selectedLabel) return;
    setEditableLabels(prev => prev.map(label => 
      label.muscle === selectedLabel ? { ...label, fontSize: `${value[0]}px` } : label
    ));
  };
  
  const handleLineWidthChange = (value: number[]) => {
    if (!selectedLabel) return;
    setEditableLabels(prev => prev.map(label => 
      label.muscle === selectedLabel ? { ...label, lineLength: value[0] } : label
    ));
  };
  
  const handleSideChange = (side: "left" | "right") => {
    if (!selectedLabel) return;
    const deviceKey = isMobile ? 'mobile' : 'desktop';
    setEditableLabels(prev => prev.map(label => {
      if (label.muscle === selectedLabel) {
        return {
          ...label,
          side,
          position: {
            ...label.position,
            [deviceKey]: {
              ...label.position[deviceKey],
              left: side === "left" ? "3.125%" : undefined,
              right: side === "right" ? "3.125%" : undefined,
            }
          }
        };
      }
      return label;
    }));
  };
  
  const handleLineTypeChange = (lineType: "straight" | "curved") => {
    if (!selectedLabel) return;
    setEditableLabels(prev => prev.map(label => 
      label.muscle === selectedLabel ? { ...label, lineType } : label
    ));
  };
  
  const handleToggleLineAndPoint = () => {
    if (!selectedLabel) return;
    setEditableLabels(prev => prev.map(label => 
      label.muscle === selectedLabel ? { ...label, hideLineAndPoint: !label.hideLineAndPoint } : label
    ));
  };
  
  const handleAddLabel = () => {
    const newMuscle = `novo_musculo_${Date.now()}`;
    const deviceKey = isMobile ? 'mobile' : 'desktop';
    const newLabel: MuscleLabel = {
      name: "Novo Músculo",
      muscle: newMuscle,
      side: "left",
      position: {
        desktop: { top: "50%", left: "10%" },
        mobile: { top: "50%", left: "5%" }
      },
      lineLength: 60,
      fontSize: "14px",
      lineType: 'straight',
      hideLineAndPoint: false
    };
    setEditableLabels(prev => [...prev, newLabel]);
    setSelectedLabel(newMuscle);
    toast.success("Novo label adicionado!");
  };
  
  const handleRemoveLabel = () => {
    if (!selectedLabel) return;
    setEditableLabels(prev => prev.filter(label => label.muscle !== selectedLabel));
    toast.success("Label removido!");
    setSelectedLabel(null);
  };
  
  const handleNameChange = (newName: string) => {
    if (!selectedLabel) return;
    setEditableLabels(prev => prev.map(label => 
      label.muscle === selectedLabel ? { ...label, name: newName } : label
    ));
  };
  
  const selectedLabelData = editableLabels.find(l => l.muscle === selectedLabel);

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-4 gap-4">
      {/* Controles do Editor */}
      <div className="flex flex-wrap gap-2 z-30 justify-center">
        <Button
          onClick={() => {
            setIsEditing(!isEditing);
            if (!isEditing) {
              setEditableLabels(baseLabels);
              setSelectedLabel(null);
              setEditMenuPosition(null);
            } else {
              setSelectedLabel(null);
              setEditMenuPosition(null);
            }
          }}
          variant={isEditing ? "destructive" : "default"}
        >
          {isEditing ? "Sair do Editor" : "Modo Editor"}
        </Button>
        {isEditing && (
          <>
            <Button onClick={handleSavePositions} variant="default">
              Salvar
            </Button>
            <Button onClick={handleResetPositions} variant="outline">
              Resetar
            </Button>
            <Button onClick={handleAddLabel} variant="outline">
              + Label
            </Button>
          </>
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
          {labels.map((label) => {
            const position = isMobile ? label.position.mobile : label.position.desktop;
            return (
              <div
                key={label.muscle}
                className={`absolute pointer-events-auto group transition-all duration-200 ${
                  isEditing ? 'cursor-move' : 'cursor-pointer'
                } ${draggedLabel === label.muscle ? 'z-50' : ''} ${
                  selectedLabel === label.muscle ? 'ring-2 ring-primary rounded-md' : ''
                }`}
                style={{ 
                  top: position.top,
                  left: label.side === "left" ? position.left : undefined,
                  right: label.side === "right" ? position.right : undefined
                }}
              onClick={(e) => {
                if (isEditing) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setSelectedLabel(label.muscle);
                  setEditMenuPosition({
                    top: rect.top + window.scrollY,
                    left: label.side === "left" ? rect.right + 10 : rect.left - 260
                  });
                } else {
                  handleLabelClick(label.muscle);
                }
              }}
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
                    style={{ fontSize: label.fontSize }}
                  >
                    {label.name}
                  </div>

                  {/* Line and Point */}
                  {!label.hideLineAndPoint && (
                    <div className="relative flex items-center">
                      <div
                        className={`h-[1px] ${
                          selectedMuscle === label.muscle ? "bg-primary" : "bg-muted-foreground group-hover:bg-primary"
                        } transition-colors duration-200`}
                        style={{ width: `${label.lineLength}px` }}
                      />
                      <div
                        className={`w-2 h-2 rounded-full ${
                          selectedMuscle === label.muscle ? "bg-primary" : "bg-muted-foreground group-hover:bg-primary"
                        } transition-colors duration-200`}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Menu de Edição Inline */}
      {isEditing && selectedLabel && editMenuPosition && selectedLabelData && (
        <Card 
          className="fixed z-50 w-[250px] shadow-lg"
          style={{
            top: `${editMenuPosition.top}px`,
            left: `${editMenuPosition.left}px`,
          }}
        >
          <CardContent className="p-3 space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium text-sm">{selectedLabelData.name}</span>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => {
                  setSelectedLabel(null);
                  setEditMenuPosition(null);
                }}
              >
                ✕
              </Button>
            </div>

            <div>
              <label className="text-xs font-medium">Nome</label>
              <input
                type="text"
                value={selectedLabelData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full px-2 py-1 text-sm border rounded mt-1"
              />
            </div>

            <div>
              <label className="text-xs font-medium">Fonte: {selectedLabelData.fontSize}</label>
              <Slider
                value={[parseInt(selectedLabelData.fontSize)]}
                onValueChange={handleFontSizeChange}
                min={8}
                max={24}
                step={1}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-xs font-medium">Linha: {selectedLabelData.lineLength}px</label>
              <Slider
                value={[selectedLabelData.lineLength]}
                onValueChange={handleLineWidthChange}
                min={20}
                max={120}
                step={5}
                className="mt-1"
              />
            </div>

            <div className="flex gap-1">
              <Button
                size="sm"
                onClick={() => handleSideChange("left")}
                variant={selectedLabelData.side === "left" ? "default" : "outline"}
                className="flex-1 text-xs"
              >
                Esq
              </Button>
              <Button
                size="sm"
                onClick={() => handleSideChange("right")}
                variant={selectedLabelData.side === "right" ? "default" : "outline"}
                className="flex-1 text-xs"
              >
                Dir
              </Button>
            </div>

            <div className="flex gap-1">
              <Button
                size="sm"
                onClick={() => handleLineTypeChange("straight")}
                variant={selectedLabelData.lineType === "straight" ? "default" : "outline"}
                className="flex-1 text-xs"
              >
                Reta
              </Button>
              <Button
                size="sm"
                onClick={() => handleLineTypeChange("curved")}
                variant={selectedLabelData.lineType === "curved" ? "default" : "outline"}
                className="flex-1 text-xs"
              >
                Curva
              </Button>
            </div>

            <Button
              size="sm"
              onClick={handleToggleLineAndPoint}
              variant="outline"
              className="w-full text-xs"
            >
              {selectedLabelData.hideLineAndPoint ? "Mostrar Linha" : "Ocultar Linha"}
            </Button>

            <Button
              size="sm"
              onClick={handleRemoveLabel}
              variant="destructive"
              className="w-full text-xs"
            >
              Remover Label
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
