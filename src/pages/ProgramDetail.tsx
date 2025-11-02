import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, Dumbbell, Target, TrendingUp, Clock } from "lucide-react";

const ProgramDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - seria carregado do banco
  const program = {
    id: 1,
    title: "Treino Feminino Completo",
    description: "Programa de 12 semanas focado em força e tonificação, desenvolvido especialmente para mulheres que buscam resultados consistentes.",
    gradient: "from-pink-500 to-rose-500",
    tags: ["Iniciante", "3x semana", "Hipertrofia"],
    duration: "12 semanas",
    exercises: 36,
    difficulty: "Iniciante",
    goal: "Hipertrofia e Tonificação",
    schedule: "3x por semana",
    equipment: ["Halteres", "Barra", "Banco", "Máquinas"],
    workouts: [
      {
        day: "Dia 1",
        name: "Pernas e Glúteos",
        duration: "50-60 min",
        exercises: [
          { name: "Agachamento Livre", sets: "4x12", rest: "90s" },
          { name: "Leg Press 45°", sets: "4x15", rest: "60s" },
          { name: "Stiff", sets: "3x12", rest: "60s" },
          { name: "Cadeira Abdutora", sets: "3x15", rest: "45s" },
          { name: "Cadeira Adutora", sets: "3x15", rest: "45s" },
          { name: "Panturrilha no Smith", sets: "4x20", rest: "45s" }
        ]
      },
      {
        day: "Dia 2",
        name: "Peito, Ombros e Tríceps",
        duration: "45-55 min",
        exercises: [
          { name: "Supino Reto", sets: "4x10", rest: "90s" },
          { name: "Supino Inclinado com Halteres", sets: "3x12", rest: "60s" },
          { name: "Desenvolvimento com Halteres", sets: "3x12", rest: "60s" },
          { name: "Elevação Lateral", sets: "3x15", rest: "45s" },
          { name: "Tríceps na Polia", sets: "3x15", rest: "45s" }
        ]
      },
      {
        day: "Dia 3",
        name: "Costas, Bíceps e Abdômen",
        duration: "50-60 min",
        exercises: [
          { name: "Barra Fixa (ou Puxada)", sets: "4x8-10", rest: "90s" },
          { name: "Remada Curvada", sets: "4x12", rest: "60s" },
          { name: "Pulldown", sets: "3x15", rest: "60s" },
          { name: "Rosca Direta", sets: "3x12", rest: "45s" },
          { name: "Rosca Martelo", sets: "3x12", rest: "45s" },
          { name: "Abdominal Crunch", sets: "3x20", rest: "30s" },
          { name: "Prancha", sets: "3x60s", rest: "45s" }
        ]
      }
    ]
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background pb-6">
        {/* Header with gradient */}
        <div className={`relative h-56 bg-gradient-to-br ${program.gradient}`}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative h-full flex flex-col justify-between p-4">
            <Button
              variant="ghost"
              size="icon"
              className="self-start bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                {program.tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    className="bg-white/20 backdrop-blur-sm text-white border-white/30"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-2xl font-bold text-white mb-1">{program.title}</h1>
              <p className="text-white/90 text-sm">{program.duration} • {program.exercises} exercícios</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 -mt-6">
          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Card className="shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" />
                  <CardDescription className="text-xs">Objetivo</CardDescription>
                </div>
                <CardTitle className="text-sm">{program.goal}</CardTitle>
              </CardHeader>
            </Card>
            
            <Card className="shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <CardDescription className="text-xs">Nível</CardDescription>
                </div>
                <CardTitle className="text-sm">{program.difficulty}</CardTitle>
              </CardHeader>
            </Card>
            
            <Card className="shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <CardDescription className="text-xs">Frequência</CardDescription>
                </div>
                <CardTitle className="text-sm">{program.schedule}</CardTitle>
              </CardHeader>
            </Card>
            
            <Card className="shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-4 h-4 text-primary" />
                  <CardDescription className="text-xs">Duração</CardDescription>
                </div>
                <CardTitle className="text-sm">{program.duration}</CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Description */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Sobre o Programa</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{program.description}</p>
            </CardContent>
          </Card>

          {/* Equipment */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Equipamentos Necessários</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {program.equipment.map((item) => (
                  <Badge key={item} variant="secondary">
                    {item}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Workout Days */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Estrutura do Treino</CardTitle>
              <CardDescription>Dias e exercícios do programa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {program.workouts.map((workout, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-sm">{workout.day} - {workout.name}</h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {workout.duration}
                      </p>
                    </div>
                    <Button size="sm" variant="ghost" className="text-primary">
                      Ver
                    </Button>
                  </div>
                  <div className="space-y-2 pl-4">
                    {workout.exercises.slice(0, 3).map((exercise, idx) => (
                      <div key={idx} className="text-xs text-muted-foreground flex items-center justify-between">
                        <span>• {exercise.name}</span>
                        <span className="text-primary font-medium">{exercise.sets}</span>
                      </div>
                    ))}
                    {workout.exercises.length > 3 && (
                      <p className="text-xs text-muted-foreground pl-2">
                        +{workout.exercises.length - 3} exercícios
                      </p>
                    )}
                  </div>
                  {index < program.workouts.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* CTA Button */}
          <Button 
            className="w-full bg-primary hover:bg-primary/90 h-12 text-base font-semibold"
            onClick={() => navigate(`/workout-session/${program.id}/1`)}
          >
            Iniciar Programa
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ProgramDetail;
