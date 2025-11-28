/**
 * Detecta o grupo muscular baseado em keywords no nome do arquivo
 * Usa a mesma lógica da edge function rebuild-exercise-library
 */
export function detectMuscleGroup(filename: string): string {
  const lowerName = filename.toLowerCase();
  
  if (lowerName.includes('supino') || lowerName.includes('crucifixo') || 
      lowerName.includes('fly') || lowerName.includes('peitoral') || 
      lowerName.includes('crossover') || lowerName.includes('chest') ||
      lowerName.includes('press')) {
    return 'peito';
  }
  
  if (lowerName.includes('puxada') || lowerName.includes('remada') || 
      lowerName.includes('pulldown') || lowerName.includes('pulley') || 
      lowerName.includes('dorsal') || lowerName.includes('row') ||
      lowerName.includes('pull_up') || lowerName.includes('pullup')) {
    return 'costas';
  }
  
  if (lowerName.includes('agachamento') || lowerName.includes('leg_press') || 
      lowerName.includes('extensora') || lowerName.includes('flexora') || 
      lowerName.includes('squat') || lowerName.includes('leg') ||
      lowerName.includes('coxa') || lowerName.includes('quadriceps')) {
    return 'pernas';
  }
  
  if (lowerName.includes('desenvolvimento') || lowerName.includes('elevacao_lateral') || 
      lowerName.includes('ombro') || lowerName.includes('shoulder') ||
      lowerName.includes('lateral_raise') || lowerName.includes('military')) {
    return 'ombros';
  }
  
  if (lowerName.includes('rosca') || lowerName.includes('biceps') || 
      lowerName.includes('martelo') || lowerName.includes('scott') ||
      lowerName.includes('curl') || lowerName.includes('bicep')) {
    return 'biceps';
  }
  
  if (lowerName.includes('triceps') || lowerName.includes('frances') || 
      lowerName.includes('testa') || lowerName.includes('corda') ||
      lowerName.includes('tricep') || lowerName.includes('pushdown') ||
      lowerName.includes('skull')) {
    return 'triceps';
  }
  
  if (lowerName.includes('abdominal') || lowerName.includes('prancha') || 
      lowerName.includes('crunch') || lowerName.includes('obliquo') ||
      lowerName.includes('abs') || lowerName.includes('plank')) {
    return 'abdomen';
  }
  
  if (lowerName.includes('gluteo') || lowerName.includes('hip_thrust') || 
      lowerName.includes('elevacao_pelvica') || lowerName.includes('glute') ||
      lowerName.includes('bridge')) {
    return 'gluteos';
  }
  
  if (lowerName.includes('antebraco') || lowerName.includes('punho') || 
      lowerName.includes('wrist') || lowerName.includes('forearm')) {
    return 'antebraco';
  }
  
  if (lowerName.includes('corrida') || lowerName.includes('bike') || 
      lowerName.includes('esteira') || lowerName.includes('cardio') ||
      lowerName.includes('running') || lowerName.includes('cycling')) {
    return 'cardio';
  }
  
  if (lowerName.includes('adut') || lowerName.includes('adutor') ||
      lowerName.includes('adduction') || lowerName.includes('adductor')) {
    return 'adutores';
  }
  
  return 'outros';
}

/**
 * Extrai o nome do exercício do filename
 * Remove extensões e formata underscores para espaços
 */
export function extractExerciseName(filename: string): string {
  return filename
    .replace(/\.(gif|jpg|jpeg|png|webp)$/i, '')
    .replace(/_/g, ' ')
    .trim();
}
