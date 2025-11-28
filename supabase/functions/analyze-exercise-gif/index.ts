import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, fileName } = await req.json();
    
    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: 'imageBase64 é obrigatório' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const GOOGLE_AI_API_KEY = Deno.env.get('GOOGLE_AI_API_KEY');
    if (!GOOGLE_AI_API_KEY) {
      throw new Error('GOOGLE_AI_API_KEY não configurada');
    }

    // Extract image data (remove data:image/gif;base64, prefix if present)
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');

    const systemPrompt = `Você é um especialista em exercícios físicos. Analise esta imagem/GIF de exercício e identifique:

1. O nome EXATO do exercício demonstrado (em português)
2. O grupo muscular principal trabalhado
3. Os equipamentos utilizados
4. O nível de confiança da sua identificação (alta/média/baixa)

IMPORTANTE:
- Seja MUITO específico com o nome: diferencie variações como "Supino Reto" vs "Supino Inclinado" vs "Supino Declinado"
- Especifique se é "com Barra", "com Halteres", "na Máquina", "com Cabo", etc.
- Especifique a pegada quando relevante: "Pegada Pronada", "Supinada", "Neutra", "Aberta", "Fechada"
- Para pernas, diferencie: "Agachamento Livre", "Agachamento Smith", "Leg Press 45°", etc.
- Para remadas, especifique: "Remada Curvada", "Remada Cavalinho", "Remada Unilateral", etc.

Responda APENAS com um JSON no seguinte formato:
{
  "exerciseName": "nome específico do exercício em português",
  "muscleGroup": "grupo muscular principal",
  "equipment": ["equipamento1", "equipamento2"],
  "confidence": "alta/média/baixa",
  "description": "breve descrição do movimento observado"
}`;

    console.log('Analisando exercício:', fileName);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GOOGLE_AI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: systemPrompt },
              {
                inline_data: {
                  mime_type: "image/gif",
                  data: base64Data
                }
              }
            ]
          }],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 1024,
          }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro da API do Google:', errorText);
      throw new Error(`Erro na API do Google: ${response.status}`);
    }

    const data = await response.json();
    console.log('Resposta da IA recebida');

    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('Nenhuma resposta da IA');
    }

    const text = data.candidates[0].content.parts[0].text;
    console.log('Texto da resposta:', text);

    // Extract JSON from the response (it might be wrapped in markdown code blocks)
    let jsonText = text.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    const analysis = JSON.parse(jsonText);

    return new Response(
      JSON.stringify({
        success: true,
        analysis: {
          exerciseName: analysis.exerciseName || '',
          muscleGroup: analysis.muscleGroup || '',
          equipment: Array.isArray(analysis.equipment) ? analysis.equipment : [],
          confidence: analysis.confidence || 'baixa',
          description: analysis.description || ''
        }
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Erro na função analyze-exercise-gif:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Erro desconhecido',
        success: false 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
