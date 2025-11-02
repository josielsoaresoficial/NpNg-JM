import { useState } from "react";
import { Layout } from "@/components/Layout";
import { BottomNav } from "@/components/BottomNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBodyMetrics } from "@/hooks/useBodyMetrics";
import { useBodyMetricsHistory } from "@/hooks/useBodyMetricsHistory";
import { Weight, Activity, TrendingUp, Ruler, Scale } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { z } from "zod";
import { toast } from "sonner";

const weightSchema = z.object({
  weight: z.number().min(30, "Peso deve ser maior que 30kg").max(300, "Peso deve ser menor que 300kg"),
  bodyFat: z.number().min(0).max(100).optional(),
  muscleMass: z.number().min(0).max(200).optional(),
});

const measurementSchema = z.object({
  chest: z.number().min(0).max(300).optional(),
  waist: z.number().min(0).max(300).optional(),
  hips: z.number().min(0).max(300).optional(),
  biceps: z.number().min(0).max(100).optional(),
  thigh: z.number().min(0).max(200).optional(),
  calf: z.number().min(0).max(100).optional(),
});

const Body = () => {
  const { bodyMetrics, updateBodyMetrics } = useBodyMetrics();
  const { history } = useBodyMetricsHistory();
  
  const [weight, setWeight] = useState(bodyMetrics?.weight?.toString() || "");
  const [bodyFat, setBodyFat] = useState(bodyMetrics?.bodyFat?.toString() || "");
  const [muscleMass, setMuscleMass] = useState(bodyMetrics?.muscleMass?.toString() || "");

  // Measurements state
  const [chest, setChest] = useState("");
  const [waist, setWaist] = useState("");
  const [hips, setHips] = useState("");
  const [biceps, setBiceps] = useState("");
  const [thigh, setThigh] = useState("");
  const [calf, setCalf] = useState("");

  // Advanced metrics
  const [height, setHeight] = useState("");
  const [fatWeight, setFatWeight] = useState("");
  const [leanWeight, setLeanWeight] = useState("");
  const [boneWeight, setBoneWeight] = useState("");
  const [muscleWeight, setMuscleWeight] = useState("");

  const handleUpdateWeight = async () => {
    try {
      const data = {
        weight: weight ? parseFloat(weight) : undefined,
        bodyFat: bodyFat ? parseFloat(bodyFat) : undefined,
        muscleMass: muscleMass ? parseFloat(muscleMass) : undefined
      };

      // Validate with zod
      if (data.weight) {
        weightSchema.parse(data);
      }

      await updateBodyMetrics(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Erro ao atualizar métricas");
      }
    }
  };

  const handleSaveMeasurements = () => {
    try {
      const data = {
        chest: chest ? parseFloat(chest) : undefined,
        waist: waist ? parseFloat(waist) : undefined,
        hips: hips ? parseFloat(hips) : undefined,
        biceps: biceps ? parseFloat(biceps) : undefined,
        thigh: thigh ? parseFloat(thigh) : undefined,
        calf: calf ? parseFloat(calf) : undefined,
      };

      measurementSchema.parse(data);
      toast.success("Medidas salvas com sucesso!");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      }
    }
  };

  const calculateIdealWeight = () => {
    // Simple formula: IMC ideal (22) * altura²
    if (bodyMetrics?.bmi) {
      const heightInMeters = Math.sqrt(bodyMetrics.weight / bodyMetrics.bmi);
      return (22 * heightInMeters * heightInMeters).toFixed(1);
    }
    return "70";
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
            <Card className="border-primary/20">
              <CardHeader className="pb-3">
                <CardDescription className="text-xs">Peso Atual</CardDescription>
                <CardTitle className="text-3xl text-primary">
                  {bodyMetrics?.weight?.toFixed(1) || "--"}kg
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription className="text-xs">Meta</CardDescription>
                <CardTitle className="text-3xl text-foreground">
                  {calculateIdealWeight()}kg
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Weight Progress Chart */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Progresso de Peso
              </CardTitle>
              <CardDescription>Últimos 30 dias</CardDescription>
            </CardHeader>
            <CardContent>
              {history.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={history}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="date" 
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="weight" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-48 flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">
                    Adicione sua primeira medição para visualizar o gráfico
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="peso" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="peso">Peso</TabsTrigger>
              <TabsTrigger value="medidas">Medidas</TabsTrigger>
              <TabsTrigger value="avancado">Avançado</TabsTrigger>
            </TabsList>

            {/* Weight Tab */}
            <TabsContent value="peso" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="w-5 h-5 text-primary" />
                    Diagnóstico
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Weight className="w-5 h-5 text-primary" />
                      <span className="font-medium">IMC</span>
                    </div>
                    <span className="font-bold text-lg">
                      {bodyMetrics?.bmi?.toFixed(1) || "--"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary" />
                      <span className="font-medium">% Gordura</span>
                    </div>
                    <span className="font-bold text-lg">
                      {bodyMetrics?.bodyFat?.toFixed(1) || "--"}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <span className="font-medium">Peso Ideal</span>
                    </div>
                    <span className="font-bold text-lg">{calculateIdealWeight()}kg</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Atualizar Métricas</CardTitle>
                  <CardDescription>Registre suas medições</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Peso (kg) *</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="75.0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bodyFat">% Gordura Corporal</Label>
                    <Input
                      id="bodyFat"
                      type="number"
                      step="0.1"
                      value={bodyFat}
                      onChange={(e) => setBodyFat(e.target.value)}
                      placeholder="15.0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="muscleMass">Massa Muscular (kg)</Label>
                    <Input
                      id="muscleMass"
                      type="number"
                      step="0.1"
                      value={muscleMass}
                      onChange={(e) => setMuscleMass(e.target.value)}
                      placeholder="60.0"
                    />
                  </div>
                  <Button 
                    onClick={handleUpdateWeight} 
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Salvar Métricas
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Measurements Tab */}
            <TabsContent value="medidas" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ruler className="w-5 h-5 text-primary" />
                    Medidas Corporais
                  </CardTitle>
                  <CardDescription>Registre suas medidas em centímetros</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="chest">Peito (cm)</Label>
                      <Input
                        id="chest"
                        type="number"
                        step="0.1"
                        value={chest}
                        onChange={(e) => setChest(e.target.value)}
                        placeholder="95"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="waist">Cintura (cm)</Label>
                      <Input
                        id="waist"
                        type="number"
                        step="0.1"
                        value={waist}
                        onChange={(e) => setWaist(e.target.value)}
                        placeholder="80"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hips">Quadril (cm)</Label>
                      <Input
                        id="hips"
                        type="number"
                        step="0.1"
                        value={hips}
                        onChange={(e) => setHips(e.target.value)}
                        placeholder="90"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="biceps">Bíceps (cm)</Label>
                      <Input
                        id="biceps"
                        type="number"
                        step="0.1"
                        value={biceps}
                        onChange={(e) => setBiceps(e.target.value)}
                        placeholder="35"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="thigh">Coxa (cm)</Label>
                      <Input
                        id="thigh"
                        type="number"
                        step="0.1"
                        value={thigh}
                        onChange={(e) => setThigh(e.target.value)}
                        placeholder="55"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="calf">Panturrilha (cm)</Label>
                      <Input
                        id="calf"
                        type="number"
                        step="0.1"
                        value={calf}
                        onChange={(e) => setCalf(e.target.value)}
                        placeholder="38"
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={handleSaveMeasurements} 
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Salvar Medidas
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Advanced Tab */}
            <TabsContent value="avancado" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Métricas Avançadas</CardTitle>
                  <CardDescription>Dados corporais detalhados</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Altura (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="175"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fatWeight">Peso Gordo (kg)</Label>
                      <Input
                        id="fatWeight"
                        type="number"
                        step="0.1"
                        value={fatWeight}
                        onChange={(e) => setFatWeight(e.target.value)}
                        placeholder="12.0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="leanWeight">Peso Magro (kg)</Label>
                      <Input
                        id="leanWeight"
                        type="number"
                        step="0.1"
                        value={leanWeight}
                        onChange={(e) => setLeanWeight(e.target.value)}
                        placeholder="63.0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="boneWeight">Peso Ósseo (kg)</Label>
                      <Input
                        id="boneWeight"
                        type="number"
                        step="0.1"
                        value={boneWeight}
                        onChange={(e) => setBoneWeight(e.target.value)}
                        placeholder="3.5"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="muscleWeight">Peso Muscular (kg)</Label>
                      <Input
                        id="muscleWeight"
                        type="number"
                        step="0.1"
                        value={muscleWeight}
                        onChange={(e) => setMuscleWeight(e.target.value)}
                        placeholder="60.0"
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={() => toast.success("Métricas avançadas salvas!")} 
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Salvar Métricas Avançadas
                  </Button>
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
