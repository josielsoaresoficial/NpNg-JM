import { areSynonyms } from './exerciseSynonyms';

/**
 * Normaliza nome de exercício para comparação
 */
export const normalizeExerciseName = (name: string): string => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, ' ') // Normaliza espaços
    .trim();
};

/**
 * Extrai palavras-chave importantes de um nome de exercício
 */
export const extractKeywords = (name: string): string[] => {
  const normalized = normalizeExerciseName(name);
  // Remove palavras comuns que não ajudam na identificação
  const stopWords = ['com', 'de', 'na', 'no', 'em', 'e', 'ou', 'para', 'a', 'o'];
  return normalized
    .split(' ')
    .filter(word => word.length > 2 && !stopWords.includes(word));
};

/**
 * Calcula similaridade entre dois textos usando algoritmo de Levenshtein simplificado
 */
export const calculateSimilarity = (str1: string, str2: string): number => {
  const s1 = normalizeExerciseName(str1);
  const s2 = normalizeExerciseName(str2);

  // Verifica match exato
  if (s1 === s2) return 100;

  // Verifica se um contém o outro
  if (s1.includes(s2) || s2.includes(s1)) {
    return 85;
  }

  // Extrai palavras-chave e compara
  const keywords1 = extractKeywords(str1);
  const keywords2 = extractKeywords(str2);

  if (keywords1.length === 0 || keywords2.length === 0) return 0;

  // Conta palavras-chave em comum
  let commonKeywords = 0;
  keywords1.forEach(k1 => {
    keywords2.forEach(k2 => {
      if (k1 === k2 || areSynonyms(k1, k2)) {
        commonKeywords++;
      }
    });
  });

  // Calcula porcentagem baseada em palavras comuns
  const totalKeywords = Math.max(keywords1.length, keywords2.length);
  const similarity = (commonKeywords / totalKeywords) * 100;

  return Math.round(similarity);
};

/**
 * Compara nome do arquivo com nome identificado pela IA
 */
export interface ComparisonResult {
  isMatch: boolean;
  similarity: number;
  suggestedName: string;
  status: 'correct' | 'incorrect' | 'uncertain';
  confidence: 'alta' | 'média' | 'baixa';
}

export const compareExerciseNames = (
  fileName: string,
  aiIdentified: string,
  aiConfidence: 'alta' | 'média' | 'baixa' = 'média'
): ComparisonResult => {
  // Remove extensão do arquivo
  const cleanFileName = fileName.replace(/\.(gif|png|jpg|jpeg|webp)$/i, '');
  
  const similarity = calculateSimilarity(cleanFileName, aiIdentified);

  let status: 'correct' | 'incorrect' | 'uncertain';
  let isMatch: boolean;

  // Define thresholds baseados na confiança da IA
  const highThreshold = aiConfidence === 'alta' ? 70 : 75;
  const lowThreshold = aiConfidence === 'alta' ? 50 : 60;

  if (similarity >= highThreshold) {
    status = 'correct';
    isMatch = true;
  } else if (similarity >= lowThreshold) {
    status = 'uncertain';
    isMatch = false;
  } else {
    status = 'incorrect';
    isMatch = false;
  }

  return {
    isMatch,
    similarity,
    suggestedName: aiIdentified,
    status,
    confidence: aiConfidence
  };
};

/**
 * Gera sugestão de nome de arquivo baseado na identificação da IA
 */
export const generateFileName = (
  aiExerciseName: string,
  originalExtension: string = 'gif'
): string => {
  const normalized = aiExerciseName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-zA-Z0-9\s]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '_') // Substitui espaços por underscore
    .toLowerCase();

  return `${normalized}.${originalExtension}`;
};

/**
 * Encontra o melhor match de um exercício no banco de dados
 */
export const findBestExerciseMatch = (
  exerciseName: string,
  muscleGroup: string,
  exercises: Array<{ id: string; name: string; muscle_group: string }>
): { exerciseId: string | null; similarity: number; matchedName: string } => {
  let bestMatch = {
    exerciseId: null as string | null,
    similarity: 0,
    matchedName: ''
  };

  // Filtra exercícios do mesmo grupo muscular
  const filteredExercises = exercises.filter(
    ex => normalizeExerciseName(ex.muscle_group) === normalizeExerciseName(muscleGroup)
  );

  // Se não houver exercícios do mesmo grupo, procura em todos
  const searchPool = filteredExercises.length > 0 ? filteredExercises : exercises;

  searchPool.forEach(exercise => {
    const similarity = calculateSimilarity(exerciseName, exercise.name);
    
    if (similarity > bestMatch.similarity) {
      bestMatch = {
        exerciseId: exercise.id,
        similarity,
        matchedName: exercise.name
      };
    }
  });

  // Só retorna match se similaridade for >= 60%
  if (bestMatch.similarity < 60) {
    return {
      exerciseId: null,
      similarity: bestMatch.similarity,
      matchedName: ''
    };
  }

  return bestMatch;
};
