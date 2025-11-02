import { X, Play, Clock, Dumbbell, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { ChestExercise } from '@/data/chestExercisesData';
import AnimatedExercise from '@/components/AnimatedExercise';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface ExerciseDetailModalProps {
  exercise: ChestExercise | null;
  isOpen: boolean;
  onClose: () => void;
}

const ExerciseDetailModal = ({ exercise, isOpen, onClose }: ExerciseDetailModalProps) => {
  const [activeTab, setActiveTab] = useState<'instructions' | 'tips' | 'mistakes'>('instructions');

  if (!isOpen || !exercise) return null;

  const startExercise = () => {
    console.log('Iniciar exercício:', exercise.name);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border shadow-lg">
        
        {/* Cabeçalho */}
        <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{exercise.name}</h2>
              <div className="flex flex-wrap gap-3 text-sm">
                <Badge className="gap-1 bg-[#FF9800] hover:bg-[#F57C00] text-white border-0">
                  <Dumbbell className="w-3 h-3" />
                  {exercise.day}
                </Badge>
                <Badge className="gap-1 bg-[#FF9800] hover:bg-[#F57C00] text-white border-0">
                  <Clock className="w-3 h-3" />
                  {exercise.sets}x{exercise.reps} • {exercise.restTime}s
                </Badge>
                <Badge className="bg-[#FF9800] hover:bg-[#F57C00] text-white border-0">{exercise.difficulty}</Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-primary-foreground/90">{exercise.description}</p>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-auto">
          
          {/* Coluna da Esquerda - Animação */}
          <div className="lg:w-2/5 p-6 border-r">
            <div className="bg-muted rounded-xl p-6 flex items-center justify-center min-h-[200px]">
              <AnimatedExercise 
                animation={exercise.animation}
                size="large"
              />
            </div>
            
            {/* Informações Rápidas */}
            <div className="mt-6 space-y-3">
              <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg border-l-4 border-primary">
                <span className="font-medium">Séries</span>
                <span className="text-primary font-bold text-xl">{exercise.sets}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg border-l-4 border-primary">
                <span className="font-medium">Repetições</span>
                <span className="text-primary font-bold text-xl">{exercise.reps}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg border-l-4 border-primary">
                <span className="font-medium">Descanso</span>
                <span className="text-primary font-bold text-xl">{exercise.restTime}s</span>
              </div>
            </div>

            {/* Equipamento */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Dumbbell className="w-4 h-4" />
                Equipamento Necessário
              </h4>
              <div className="flex flex-wrap gap-2">
                {exercise.equipment.map((item, index) => (
                  <Badge key={index} variant="outline">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Foco */}
            <div className="mt-6">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Foco
              </h4>
              <p className="text-sm text-muted-foreground">{exercise.focus}</p>
            </div>
          </div>

          {/* Coluna da Direita - Conteúdo Detalhado */}
          <div className="lg:w-3/5 p-6">
            {/* Abas de Navegação */}
            <div className="flex border-b mb-6">
              <button
                onClick={() => setActiveTab('instructions')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'instructions'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Instruções
              </button>
              <button
                onClick={() => setActiveTab('tips')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'tips'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Dicas
              </button>
              {exercise.commonMistakes && (
                <button
                  onClick={() => setActiveTab('mistakes')}
                  className={`px-4 py-2 font-medium transition-colors ${
                    activeTab === 'mistakes'
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Erros Comuns
                </button>
              )}
            </div>

            {/* Conteúdo das Abas */}
            {activeTab === 'instructions' && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Info className="w-6 h-6 text-primary" />
                  Como Executar
                </h3>
                {exercise.instructions.map((instruction, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-sm pt-1 leading-relaxed">{instruction}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'tips' && (
              <div className="space-y-3">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-primary" />
                  Dicas Importantes
                </h3>
                {exercise.tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'mistakes' && exercise.commonMistakes && (
              <div className="space-y-3">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-destructive" />
                  Evite Estes Erros
                </h3>
                {exercise.commonMistakes.map((mistake, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-destructive/10 rounded-lg border-l-4 border-destructive">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <p className="text-sm leading-relaxed">{mistake}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Rodapé com Botões de Ação */}
        <div className="border-t p-6 bg-muted/30">
          <div className="flex gap-3">
            <Button
              onClick={startExercise}
              className="flex-1 gap-2 bg-primary hover:bg-primary/90"
              size="lg"
            >
              <Play className="w-5 h-5" />
              Iniciar Exercício
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              size="lg"
            >
              Fechar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetailModal;
