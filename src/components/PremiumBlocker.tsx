import { Crown, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function PremiumBlocker() {
  const handleUpgradeToPremium = () => {
    // TODO: Integrar com sistema de pagamento (Stripe)
    window.open('mailto:contato@npngjm.com?subject=Quero assinar Premium', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4">
      <Card className="w-full max-w-lg border-2 border-primary/20 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
              <Crown className="w-10 h-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">
            Seu período de teste expirou
          </CardTitle>
          <CardDescription className="text-lg">
            Você aproveitou as 24 horas gratuitas do nPnG JM! 🎉
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-3 text-center">
            <p className="text-muted-foreground">
              Continue sua jornada fitness com acesso ilimitado a:
            </p>
            <ul className="space-y-2 text-sm text-left max-w-sm mx-auto">
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Treinos personalizados ilimitados com IA</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Análise nutricional avançada com NutriAI</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Biblioteca completa de exercícios com GIFs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Histórico completo de treinos e nutrição</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Suporte prioritário e atualizações</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleUpgradeToPremium}
              size="lg"
              className="w-full gradient-hero hover:opacity-90 transition-smooth"
            >
              <Crown className="w-5 h-5 mr-2" />
              Assinar Premium
            </Button>

            <Button 
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => window.open('mailto:contato@npngjm.com', '_blank')}
            >
              <Mail className="w-5 h-5 mr-2" />
              Falar com Suporte
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Dúvidas? Entre em contato conosco pelo email acima
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
