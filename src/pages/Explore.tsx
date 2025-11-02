import { useState } from "react";
import { Layout } from "@/components/Layout";
import { BottomNav } from "@/components/BottomNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dumbbell, Home, Zap, Target } from "lucide-react";

const Explore = () => {
  const featuredPrograms = [
    {
      id: 1,
      title: "Treinos Femininos",
      description: "Programas específicos para o público feminino",
      image: "/placeholder.svg",
      tags: ["Iniciante", "3 dias", "Hipertrofia"]
    },
    {
      id: 2,
      title: "Perder Peso",
      description: "Treinos focados em queima de gordura",
      image: "/placeholder.svg",
      tags: ["Intermediário", "4 dias", "Definição"]
    },
    {
      id: 3,
      title: "Aumento Muscular",
      description: "Maximize seus ganhos de massa muscular",
      image: "/placeholder.svg",
      tags: ["Avançado", "5 dias", "Hipertrofia"]
    }
  ];

  const categories = [
    { icon: Dumbbell, name: "Hipertrofia", count: 12 },
    { icon: Zap, name: "Definição", count: 8 },
    { icon: Home, name: "Treino em Casa", count: 15 },
    { icon: Target, name: "Força", count: 10 }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background pb-24">
        {/* Header */}
        <div className="sticky top-16 md:top-20 bg-background z-10 px-4 py-4 border-b">
          <h1 className="text-2xl font-bold text-foreground">Explorar</h1>
        </div>

        {/* Featured Programs */}
        <div className="px-4 py-6">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Em Destaque</h2>
          <div className="space-y-4">
            {featuredPrograms.map((program) => (
              <Card key={program.id} className="overflow-hidden">
                <div className="h-32 bg-gradient-fitness" />
                <CardHeader>
                  <CardTitle>{program.title}</CardTitle>
                  <CardDescription>{program.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {program.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Ver Programa
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Categories */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Categorias</h2>
            <div className="grid grid-cols-2 gap-4">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Card key={category.name} className="cursor-pointer hover:border-primary transition-colors">
                    <CardHeader className="text-center">
                      <Icon className="w-12 h-12 mx-auto text-primary mb-2" />
                      <CardTitle className="text-base">{category.name}</CardTitle>
                      <CardDescription>{category.count} programas</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        <BottomNav currentPage="explore" />
      </div>
    </Layout>
  );
};

export default Explore;
