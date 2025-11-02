import { useState } from "react";
import { Layout } from "@/components/Layout";
import { BottomNav } from "@/components/BottomNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dumbbell, Home, Zap, Target, Users, TrendingUp, Heart, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  const navigate = useNavigate();

  const featuredPrograms = [
    {
      id: 1,
      title: "Treino Feminino Completo",
      description: "Programa de 12 semanas focado em força e tonificação",
      gradient: "from-pink-500 to-rose-500",
      tags: ["Iniciante", "3x semana", "Hipertrofia"],
      duration: "12 semanas",
      exercises: 36
    },
    {
      id: 2,
      title: "Perder Peso Rápido",
      description: "Treinos intensos de alta queima calórica",
      gradient: "from-orange-500 to-red-500",
      tags: ["Intermediário", "4x semana", "Emagrecimento"],
      duration: "8 semanas",
      exercises: 48
    },
    {
      id: 3,
      title: "Ganho de Massa",
      description: "Maximize seus ganhos com treino progressivo",
      gradient: "from-blue-500 to-purple-500",
      tags: ["Avançado", "5x semana", "Hipertrofia"],
      duration: "16 semanas",
      exercises: 60
    },
    {
      id: 4,
      title: "Treino em Casa",
      description: "Resultados sem equipamentos profissionais",
      gradient: "from-green-500 to-teal-500",
      tags: ["Todos os níveis", "5x semana", "Funcional"],
      duration: "10 semanas",
      exercises: 40
    }
  ];

  const categories = [
    { 
      icon: Dumbbell, 
      name: "Hipertrofia", 
      count: 12,
      description: "Programas para ganho de massa muscular",
      color: "text-primary"
    },
    { 
      icon: Zap, 
      name: "Definição", 
      count: 8,
      description: "Redução de gordura e tonificação",
      color: "text-primary"
    },
    { 
      icon: Home, 
      name: "Treino em Casa", 
      count: 15,
      description: "Exercícios sem equipamento",
      color: "text-primary"
    },
    { 
      icon: Target, 
      name: "Força", 
      count: 10,
      description: "Aumento de força máxima",
      color: "text-primary"
    },
    { 
      icon: Users, 
      name: "Iniciantes", 
      count: 18,
      description: "Programas para começar do zero",
      color: "text-primary"
    },
    { 
      icon: Trophy, 
      name: "Atlético", 
      count: 7,
      description: "Performance e explosão",
      color: "text-primary"
    },
    { 
      icon: Heart, 
      name: "Cardio", 
      count: 14,
      description: "Resistência cardiovascular",
      color: "text-primary"
    },
    { 
      icon: TrendingUp, 
      name: "Avançado", 
      count: 9,
      description: "Desafios de alto nível",
      color: "text-primary"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background pb-24">
        {/* Header */}
        <div className="sticky top-16 md:top-20 bg-background z-10 px-4 py-4 border-b">
          <h1 className="text-2xl font-bold text-foreground">Explorar</h1>
          <p className="text-sm text-muted-foreground mt-1">Descubra programas de treino</p>
        </div>

        <div className="px-4 py-6">
          {/* Featured Programs Carousel */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Em Destaque</h2>
              <Button variant="ghost" size="sm" className="text-primary">
                Ver todos
              </Button>
            </div>

            <Carousel className="w-full max-w-full">
              <CarouselContent>
                {featuredPrograms.map((program) => (
                  <CarouselItem key={program.id} className="md:basis-1/2 lg:basis-1/3">
                    <Card 
                      className="overflow-hidden cursor-pointer hover:border-primary transition-colors"
                      onClick={() => navigate(`/program/${program.id}`)}
                    >
                      <div className={`h-40 bg-gradient-to-br ${program.gradient} flex items-end p-4`}>
                        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
                          <p className="text-white text-xs font-medium">{program.duration}</p>
                        </div>
                      </div>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">{program.title}</CardTitle>
                        <CardDescription className="text-xs line-clamp-2">
                          {program.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {program.tags.map((tag) => (
                            <Badge 
                              key={tag} 
                              variant="secondary" 
                              className="text-xs bg-primary/10 text-primary hover:bg-primary/20"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Dumbbell className="w-3 h-3" />
                            <span>{program.exercises} exercícios</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-4" />
              <CarouselNext className="hidden md:flex -right-4" />
            </Carousel>
          </div>

          {/* Categories Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Categorias</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Card 
                    key={category.name} 
                    className="cursor-pointer hover:border-primary hover:shadow-lg transition-all group"
                  >
                    <CardHeader className="text-center pb-3">
                      <div className="mx-auto mb-3 p-4 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                        <Icon className={`w-8 h-8 ${category.color} group-hover:scale-110 transition-transform`} />
                      </div>
                      <CardTitle className="text-base">{category.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {category.count} programas
                      </CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Popular Programs */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Mais Populares</h2>
            </div>
            
            <div className="space-y-3">
              {[
                { name: "Treino ABC Clássico", users: "2.5k", level: "Intermediário" },
                { name: "HIIT 20 Minutos", users: "1.8k", level: "Todos" },
                { name: "Push Pull Legs", users: "3.2k", level: "Avançado" },
              ].map((program, index) => (
                <Card 
                  key={index}
                  className="cursor-pointer hover:border-primary transition-colors"
                >
                  <CardHeader className="py-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-sm">{program.name}</CardTitle>
                        <CardDescription className="text-xs mt-1">
                          {program.users} usuários • {program.level}
                        </CardDescription>
                      </div>
                      <Button size="sm" variant="ghost" className="text-primary">
                        Ver
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <BottomNav currentPage="explore" />
      </div>
    </Layout>
  );
};

export default Explore;
