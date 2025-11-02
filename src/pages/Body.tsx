import { useState } from "react";
import { Layout } from "@/components/Layout";
import { BottomNav } from "@/components/BottomNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBodyMetrics } from "@/hooks/useBodyMetrics";
import { TrendingUp, TrendingDown, Weight, Ruler, Activity } from "lucide-react";

const Body = () => {
  const { bodyMetrics, updateBodyMetrics } = useBodyMetrics();
  const [weight, setWeight] = useState(bodyMetrics?.weight?.toString() || "");
  const [bodyFat, setBodyFat] = useState(bodyMetrics?.bodyFat?.toString() || "");
  const [muscleMass, setMuscleMass] = useState(bodyMetrics?.muscleMass?.toString() || "");

  const handleUpdateWeight = async () => {
    await updateBodyMetrics({
      weight: parseFloat(weight),
      bodyFat: bodyFat ? parseFloat(bodyFat) : undefined,
      muscleMass: muscleMass ? parseFloat(muscleMass) : undefined
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background pb-24">
        {/* Header */}
        <div className="sticky top-16 md:top-20 bg-background z-10 px-4 py-4 border-b">
          <h1 className="text-2xl font-bold text-foreground">Progresso Corporal</h1>
        </div>

        {/* Current Stats */}
        <div className="px-4 py-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Peso Atual</CardDescription>
                <CardTitle className="text-3xl text-primary">
                  {bodyMetrics?.weight || "--"}kg
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Meta</CardDescription>
                <CardTitle className="text-3xl text-foreground">70kg</CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Chart Placeholder */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Progresso de Peso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Gráfico em breve</p>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="peso" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="peso">Peso</TabsTrigger>
              <TabsTrigger value="medidas">Medidas</TabsTrigger>
              <TabsTrigger value="avancado">Avançado</TabsTrigger>
            </TabsList>

            <TabsContent value="peso" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Diagnóstico</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Weight className="w-5 h-5 text-primary" />
                      <span>IMC</span>
                    </div>
                    <span className="font-semibold">{bodyMetrics?.bmi?.toFixed(1) || "--"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary" />
                      <span>% Gordura</span>
                    </div>
                    <span className="font-semibold">{bodyMetrics?.bodyFat?.toFixed(1) || "--"}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <span>Peso Ideal</span>
                    </div>
                    <span className="font-semibold">70kg</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Atualizar Peso</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Peso (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="75.0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bodyFat">% Gordura (opcional)</Label>
                    <Input
                      id="bodyFat"
                      type="number"
                      value={bodyFat}
                      onChange={(e) => setBodyFat(e.target.value)}
                      placeholder="15.0"
                    />
                  </div>
                  <Button onClick={handleUpdateWeight} className="w-full">
                    Salvar
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="medidas">
              <Card>
                <CardHeader>
                  <CardTitle>Medidas Corporais</CardTitle>
                  <CardDescription>Registre suas medidas em centímetros</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center py-8">
                    Funcionalidade em desenvolvimento
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="avancado">
              <Card>
                <CardHeader>
                  <CardTitle>Métricas Avançadas</CardTitle>
                  <CardDescription>Dados corporais detalhados</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center py-8">
                    Funcionalidade em desenvolvimento
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <BottomNav currentPage="body" />
      </div>
    </Layout>
  );
};

export default Body;
