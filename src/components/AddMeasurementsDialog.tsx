import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AddMeasurementsDialogProps {
  onAdd: (measurements: any) => void;
  trigger: React.ReactNode;
}

export const AddMeasurementsDialog = ({ onAdd, trigger }: AddMeasurementsDialogProps) => {
  const [open, setOpen] = useState(false);
  const [measurements, setMeasurements] = useState({
    neck: "",
    shoulders: "",
    chest: "",
    waist: "",
    hips: "",
    left_arm: "",
    right_arm: "",
    left_forearm: "",
    right_forearm: "",
    left_thigh: "",
    right_thigh: "",
    left_calf: "",
    right_calf: "",
    triceps_skinfold: "",
    biceps_skinfold: "",
    subscapular_skinfold: "",
    suprailiac_skinfold: "",
    abdominal_skinfold: "",
    thigh_skinfold: "",
    calf_skinfold: "",
    notes: ""
  });

  const handleSubmit = () => {
    const formattedData: any = { notes: measurements.notes };
    
    Object.keys(measurements).forEach(key => {
      if (key !== 'notes' && measurements[key as keyof typeof measurements]) {
        formattedData[key] = parseFloat(measurements[key as keyof typeof measurements]);
      }
    });

    onAdd(formattedData);
    setOpen(false);
    setMeasurements({
      neck: "", shoulders: "", chest: "", waist: "", hips: "",
      left_arm: "", right_arm: "", left_forearm: "", right_forearm: "",
      left_thigh: "", right_thigh: "", left_calf: "", right_calf: "",
      triceps_skinfold: "", biceps_skinfold: "", subscapular_skinfold: "",
      suprailiac_skinfold: "", abdominal_skinfold: "", thigh_skinfold: "",
      calf_skinfold: "", notes: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="w-[95vw] max-w-2xl max-h-[85vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Adicionar Medidas Corporais</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="circumferences" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-auto mb-4">
            <TabsTrigger value="circumferences" className="py-2.5 sm:py-3 text-xs sm:text-sm px-2 sm:px-4">
              Circunferências
            </TabsTrigger>
            <TabsTrigger value="skinfolds" className="py-2.5 sm:py-3 text-xs sm:text-sm px-2 sm:px-4">
              Dobras Cutâneas
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="circumferences" className="space-y-4 mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm">Pescoço (cm)</Label>
                <Input type="number" step="0.1" value={measurements.neck} onChange={(e) => setMeasurements({...measurements, neck: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Ombros (cm)</Label>
                <Input type="number" step="0.1" value={measurements.shoulders} onChange={(e) => setMeasurements({...measurements, shoulders: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Peito (cm)</Label>
                <Input type="number" step="0.1" value={measurements.chest} onChange={(e) => setMeasurements({...measurements, chest: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Cintura (cm)</Label>
                <Input type="number" step="0.1" value={measurements.waist} onChange={(e) => setMeasurements({...measurements, waist: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Quadril (cm)</Label>
                <Input type="number" step="0.1" value={measurements.hips} onChange={(e) => setMeasurements({...measurements, hips: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Braço Esq. (cm)</Label>
                <Input type="number" step="0.1" value={measurements.left_arm} onChange={(e) => setMeasurements({...measurements, left_arm: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Braço Dir. (cm)</Label>
                <Input type="number" step="0.1" value={measurements.right_arm} onChange={(e) => setMeasurements({...measurements, right_arm: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Antebraço Esq. (cm)</Label>
                <Input type="number" step="0.1" value={measurements.left_forearm} onChange={(e) => setMeasurements({...measurements, left_forearm: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Antebraço Dir. (cm)</Label>
                <Input type="number" step="0.1" value={measurements.right_forearm} onChange={(e) => setMeasurements({...measurements, right_forearm: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Coxa Esq. (cm)</Label>
                <Input type="number" step="0.1" value={measurements.left_thigh} onChange={(e) => setMeasurements({...measurements, left_thigh: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Coxa Dir. (cm)</Label>
                <Input type="number" step="0.1" value={measurements.right_thigh} onChange={(e) => setMeasurements({...measurements, right_thigh: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Panturrilha Esq. (cm)</Label>
                <Input type="number" step="0.1" value={measurements.left_calf} onChange={(e) => setMeasurements({...measurements, left_calf: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Panturrilha Dir. (cm)</Label>
                <Input type="number" step="0.1" value={measurements.right_calf} onChange={(e) => setMeasurements({...measurements, right_calf: e.target.value})} />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="skinfolds" className="space-y-4 mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm">Tríceps (mm)</Label>
                <Input type="number" step="0.1" value={measurements.triceps_skinfold} onChange={(e) => setMeasurements({...measurements, triceps_skinfold: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Bíceps (mm)</Label>
                <Input type="number" step="0.1" value={measurements.biceps_skinfold} onChange={(e) => setMeasurements({...measurements, biceps_skinfold: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Subescapular (mm)</Label>
                <Input type="number" step="0.1" value={measurements.subscapular_skinfold} onChange={(e) => setMeasurements({...measurements, subscapular_skinfold: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Supra-ilíaca (mm)</Label>
                <Input type="number" step="0.1" value={measurements.suprailiac_skinfold} onChange={(e) => setMeasurements({...measurements, suprailiac_skinfold: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Abdominal (mm)</Label>
                <Input type="number" step="0.1" value={measurements.abdominal_skinfold} onChange={(e) => setMeasurements({...measurements, abdominal_skinfold: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Coxa (mm)</Label>
                <Input type="number" step="0.1" value={measurements.thigh_skinfold} onChange={(e) => setMeasurements({...measurements, thigh_skinfold: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Panturrilha (mm)</Label>
                <Input type="number" step="0.1" value={measurements.calf_skinfold} onChange={(e) => setMeasurements({...measurements, calf_skinfold: e.target.value})} />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="space-y-2 mt-4">
          <Label className="text-sm">Observações</Label>
          <Textarea 
            value={measurements.notes} 
            onChange={(e) => setMeasurements({...measurements, notes: e.target.value})}
            placeholder="Adicione observações sobre as medidas..."
            className="min-h-[80px]"
          />
        </div>

        <Button onClick={handleSubmit} className="w-full mt-4">Salvar Medidas</Button>
      </DialogContent>
    </Dialog>
  );
};
