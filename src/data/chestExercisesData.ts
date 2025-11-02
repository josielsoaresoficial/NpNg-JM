// Banco de dados completo de exercícios de peitoral

export interface ChestExercise {
  id: string;
  name: string;
  day: string;
  type: 'principal' | 'acessório';
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  focus: string;
  muscleGroup: 'peitoral';
  equipment: string[];
  sets: number;
  reps: string;
  restTime: number;
  description: string;
  instructions: string[];
  tips: string[];
  animation: string;
  commonMistakes?: string[];
}

export const chestExercises: Record<string, ChestExercise> = {
  // DIA 1 - PEITORAL SUPERIOR
  'supino_inclinado_barra': {
    id: 'supino_inclinado_barra',
    name: 'Supino Inclinado com Barra',
    day: 'Dia 1 - Peitoral Superior',
    type: 'principal',
    difficulty: 'Intermediário',
    focus: 'Porção superior do peitoral',
    muscleGroup: 'peitoral',
    equipment: ['banco inclinado', 'barra', 'pesos'],
    sets: 4,
    reps: '8-12',
    restTime: 60,
    description: 'Exercício fundamental para desenvolvimento da porção clavicular do peitoral',
    instructions: [
      'Ajuste o banco em 30-45 graus de inclinação',
      'Deite-se com pés firmes no chão',
      'Segure a barra com pegada pronada, mãos mais largas que os ombros',
      'Desça a barra controladamente até a altura do peito superior',
      'Empurre explosivamente até a posição inicial',
      'Mantenha escápulas retraídas durante todo o movimento'
    ],
    tips: [
      'Não arqueie excessivamente as costas',
      'Mantenha os punhos alinhados com os antebraços',
      'Controle a fase excêntrica (descida) por 2-3 segundos',
      'Expire na fase concêntrica (subida)',
      'Use um spotter para cargas pesadas'
    ],
    animation: 'supino_inclinado',
    commonMistakes: [
      'Bloquear os cotovelos no topo',
      'Arquear demais as costas',
      'Deixar os pés suspensos',
      'Usar amplitude muito curta'
    ]
  },
  'crucifixo_inclinado': {
    id: 'crucifixo_inclinado',
    name: 'Crucifixo Inclinado',
    day: 'Dia 1 - Peitoral Superior',
    type: 'acessório',
    difficulty: 'Intermediário',
    focus: 'Alongamento e definição do peitoral superior',
    muscleGroup: 'peitoral',
    equipment: ['banco inclinado', 'halteres'],
    sets: 4,
    reps: '12',
    restTime: 45,
    description: 'Excelente para alongamento muscular e trabalho de definição',
    instructions: [
      'Banco inclinado a 30-45 graus',
      'Segure halteres acima do peito com braços estendidos',
      'Mantenha cotovelos levemente flexionados',
      'Abra os braços em arco até sentir alongamento no peitoral',
      'Retorne à posição inicial contraindo o peitoral',
      'Mantenha movimento controlado em toda amplitude'
    ],
    tips: [
      'Não use pesos muito pesados',
      'Foque no alongamento e contração',
      'Mantenha cotovelos fixos durante o movimento',
      'Não deixe os halteres baterem no topo'
    ],
    animation: 'crucifixo_inclinado',
    commonMistakes: [
      'Usar carga excessiva',
      'Estender completamente os cotovelos',
      'Descer rápido demais',
      'Não contrair no topo'
    ]
  },
  'flexao_declinada': {
    id: 'flexao_declinada',
    name: 'Flexão Declinada',
    day: 'Dia 1 - Peitoral Superior',
    type: 'acessório',
    difficulty: 'Iniciante',
    focus: 'Peitoral superior com peso corporal',
    muscleGroup: 'peitoral',
    equipment: ['banco', 'peso corporal'],
    sets: 3,
    reps: '15',
    restTime: 45,
    description: 'Variação de flexão que enfatiza o peitoral superior',
    instructions: [
      'Apoie os pés em um banco elevado',
      'Mãos no chão na largura dos ombros',
      'Corpo em linha reta da cabeça aos pés',
      'Desça até o peito quase tocar o chão',
      'Empurre com força até estender os braços',
      'Mantenha o core contraído'
    ],
    tips: [
      'Quanto mais alto os pés, maior a ênfase no peitoral superior',
      'Mantenha o corpo rígido',
      'Não deixe o quadril cair',
      'Controle a descida'
    ],
    animation: 'flexao',
    commonMistakes: [
      'Deixar o quadril cair',
      'Não descer completamente',
      'Abrir muito os cotovelos',
      'Perder a linha do corpo'
    ]
  },
  'cross_over_superior': {
    id: 'cross_over_superior',
    name: 'Cross Over Superior',
    day: 'Dia 1 - Peitoral Superior',
    type: 'acessório',
    difficulty: 'Intermediário',
    focus: 'Isolamento e definição do peitoral superior',
    muscleGroup: 'peitoral',
    equipment: ['polia alta'],
    sets: 3,
    reps: '15',
    restTime: 30,
    description: 'Exercício de isolamento para definição muscular',
    instructions: [
      'Polias na posição alta',
      'Segure as alças e dê um passo à frente',
      'Incline levemente o tronco',
      'Puxe as alças em arco até as mãos se encontrarem à frente',
      'Contraia o peitoral por 1 segundo',
      'Retorne controladamente'
    ],
    tips: [
      'Mantenha uma leve flexão nos cotovelos',
      'Foque na contração muscular',
      'Use carga moderada',
      'Controle o movimento de volta'
    ],
    animation: 'cross_over'
  },
  'supino_inclinado_halteres': {
    id: 'supino_inclinado_halteres',
    name: 'Supino Inclinado com Halteres',
    day: 'Dia 1 - Peitoral Superior',
    type: 'principal',
    difficulty: 'Intermediário',
    focus: 'Amplitude completa do peitoral superior',
    muscleGroup: 'peitoral',
    equipment: ['banco inclinado', 'halteres'],
    sets: 4,
    reps: '12',
    restTime: 60,
    description: 'Permite maior amplitude que a barra, trabalhando melhor as fibras musculares',
    instructions: [
      'Sente-se no banco inclinado com halteres nos joelhos',
      'Deite-se levando os halteres à posição inicial',
      'Palmas das mãos voltadas para frente',
      'Desça os halteres até alongar o peitoral',
      'Empurre para cima em linha reta',
      'Contraia o peitoral no topo do movimento'
    ],
    tips: [
      'Use a técnica correta para subir os halteres',
      'Mantenha os halteres alinhados',
      'Não bata os halteres no topo',
      'Desça até sentir o alongamento'
    ],
    animation: 'supino_inclinado_halteres'
  },

  // DIA 2 - PEITORAL MEDIAL
  'supino_reto_barra': {
    id: 'supino_reto_barra',
    name: 'Supino Reto com Barra',
    day: 'Dia 2 - Peitoral Medial',
    type: 'principal',
    difficulty: 'Iniciante',
    focus: 'Peitoral completo com ênfase na porção medial',
    muscleGroup: 'peitoral',
    equipment: ['banco reto', 'barra', 'pesos'],
    sets: 5,
    reps: '8',
    restTime: 90,
    description: 'Exercício básico para massa e força do peitoral',
    instructions: [
      'Deite-se no banco com pés apoiados no chão',
      'Pegada na barra com mãos mais largas que os ombros',
      'Retire a barra do suporte',
      'Desça controladamente até o meio do peito',
      'Empurre explosivamente até estender os braços',
      'Mantenha as escápulas retraídas'
    ],
    tips: [
      'Use sempre um spotter',
      'Mantenha os pés firmes no chão',
      'Não salte a barra do peito',
      'Mantenha os ombros estáveis'
    ],
    animation: 'supino_reto',
    commonMistakes: [
      'Saltar a barra do peito',
      'Arquear excessivamente',
      'Não usar amplitude completa',
      'Treinar sem spotter'
    ]
  },
  'supino_halteres': {
    id: 'supino_halteres',
    name: 'Supino com Halteres',
    day: 'Dia 2 - Peitoral Medial',
    type: 'principal',
    difficulty: 'Iniciante',
    focus: 'Desenvolvimento completo do peitoral',
    muscleGroup: 'peitoral',
    equipment: ['banco reto', 'halteres'],
    sets: 4,
    reps: '10',
    restTime: 60,
    description: 'Permite maior amplitude e trabalho unilateral',
    instructions: [
      'Deite-se no banco com halteres',
      'Comece com halteres na altura do peito',
      'Empurre os halteres para cima',
      'Una os halteres no topo',
      'Desça controladamente',
      'Sinta o alongamento no peitoral'
    ],
    tips: [
      'Mantenha o equilíbrio dos halteres',
      'Não bata os halteres',
      'Desça mais que com a barra',
      'Controle o movimento'
    ],
    animation: 'supino_reto'
  },
  'crucifixo_reto': {
    id: 'crucifixo_reto',
    name: 'Crucifixo Reto',
    day: 'Dia 2 - Peitoral Medial',
    type: 'acessório',
    difficulty: 'Iniciante',
    focus: 'Definição e alongamento do peitoral medial',
    muscleGroup: 'peitoral',
    equipment: ['banco reto', 'halteres'],
    sets: 4,
    reps: '12',
    restTime: 45,
    description: 'Trabalha a porção medial com foco em contração muscular',
    instructions: [
      'Deitado no banco reto, halteres acima do peito',
      'Braços estendidos com cotovelos levemente flexionados',
      'Abra os braços em arco amplo',
      'Desça até sentir alongamento no peitoral',
      'Retorne contraindo o peitoral',
      'Mantenha movimento controlado'
    ],
    tips: [
      'Use carga moderada',
      'Mantenha leve flexão nos cotovelos',
      'Foque no alongamento',
      'Contraia forte no topo'
    ],
    animation: 'crucifixo'
  },
  'flexao_braco': {
    id: 'flexao_braco',
    name: 'Flexão de Braço',
    day: 'Dia 2 - Peitoral Medial',
    type: 'acessório',
    difficulty: 'Iniciante',
    focus: 'Resistência e força do peitoral',
    muscleGroup: 'peitoral',
    equipment: ['peso corporal'],
    sets: 4,
    reps: '15',
    restTime: 45,
    description: 'Exercício fundamental com peso corporal',
    instructions: [
      'Mãos no chão na largura dos ombros',
      'Corpo em linha reta',
      'Desça até o peito quase tocar o chão',
      'Empurre com força',
      'Mantenha core contraído',
      'Respire corretamente'
    ],
    tips: [
      'Mantenha o corpo rígido',
      'Não deixe o quadril cair',
      'Desça controladamente',
      'Expire na subida'
    ],
    animation: 'flexao'
  },
  'cross_over_medio': {
    id: 'cross_over_medio',
    name: 'Cross Over Médio',
    day: 'Dia 2 - Peitoral Medial',
    type: 'acessório',
    difficulty: 'Intermediário',
    focus: 'Isolamento do peitoral medial',
    muscleGroup: 'peitoral',
    equipment: ['polia'],
    sets: 3,
    reps: '15',
    restTime: 30,
    description: 'Trabalho de isolamento para definição',
    instructions: [
      'Polias na altura do peito',
      'Segure as alças e dê um passo à frente',
      'Puxe as alças em direção ao centro',
      'Contraia o peitoral',
      'Retorne controladamente',
      'Mantenha tensão constante'
    ],
    tips: [
      'Use carga moderada',
      'Foque na contração',
      'Mantenha postura estável',
      'Controle o retorno'
    ],
    animation: 'cross_over'
  },

  // DIA 3 - PEITORAL INFERIOR
  'supino_declinado': {
    id: 'supino_declinado',
    name: 'Supino Declinado',
    day: 'Dia 3 - Peitoral Inferior',
    type: 'principal',
    difficulty: 'Avançado',
    focus: 'Porção inferior do peitoral',
    muscleGroup: 'peitoral',
    equipment: ['banco declinado', 'barra', 'pesos'],
    sets: 4,
    reps: '10',
    restTime: 60,
    description: 'Foco no desenvolvimento da porção esternal do peitoral',
    instructions: [
      'Ajuste o banco em declínio de 15-30 graus',
      'Posicione-se com segurança no banco',
      'Pegada na barra com mãos afastadas',
      'Desça a barra em direção à linha inferior do peito',
      'Empurre verticalmente',
      'Contraia o peitoral inferior no topo'
    ],
    tips: [
      'Use sempre um spotter',
      'Não exagere no ângulo',
      'Mantenha controle total',
      'Cuidado ao descer a barra'
    ],
    animation: 'supino_declinado',
    commonMistakes: [
      'Ângulo muito acentuado',
      'Perder o controle',
      'Amplitude curta',
      'Não usar spotter'
    ]
  },
  'paralelas_peito': {
    id: 'paralelas_peito',
    name: 'Paralelas para Peito',
    day: 'Dia 3 - Peitoral Inferior',
    type: 'principal',
    difficulty: 'Intermediário',
    focus: 'Peitoral inferior e tríceps',
    muscleGroup: 'peitoral',
    equipment: ['paralelas'],
    sets: 4,
    reps: '12',
    restTime: 60,
    description: 'Exercício composto para peitoral inferior',
    instructions: [
      'Apoie-se nas barras paralelas',
      'Incline o tronco para frente',
      'Desça até os cotovelos formarem 90 graus',
      'Empurre com força',
      'Mantenha o core contraído',
      'Controle o movimento'
    ],
    tips: [
      'Incline mais para trabalhar peitoral',
      'Não desça demais',
      'Mantenha ombros estáveis',
      'Use peso adicional quando dominado'
    ],
    animation: 'paralelas'
  },
  'cross_over_inferior': {
    id: 'cross_over_inferior',
    name: 'Cross Over Inferior',
    day: 'Dia 3 - Peitoral Inferior',
    type: 'acessório',
    difficulty: 'Intermediário',
    focus: 'Isolamento do peitoral inferior',
    muscleGroup: 'peitoral',
    equipment: ['polia baixa'],
    sets: 4,
    reps: '15',
    restTime: 45,
    description: 'Trabalho de definição do peitoral inferior',
    instructions: [
      'Polias na posição baixa',
      'Segure as alças e dê um passo à frente',
      'Puxe as alças para cima em arco',
      'Una as mãos acima do peito',
      'Contraia o peitoral inferior',
      'Retorne controladamente'
    ],
    tips: [
      'Use carga moderada',
      'Foque na contração',
      'Mantenha postura estável',
      'Controle o retorno'
    ],
    animation: 'cross_over'
  },
  'crucifixo_declinado': {
    id: 'crucifixo_declinado',
    name: 'Crucifixo Declinado',
    day: 'Dia 3 - Peitoral Inferior',
    type: 'acessório',
    difficulty: 'Intermediário',
    focus: 'Alongamento do peitoral inferior',
    muscleGroup: 'peitoral',
    equipment: ['banco declinado', 'halteres'],
    sets: 3,
    reps: '12',
    restTime: 45,
    description: 'Trabalha alongamento e definição',
    instructions: [
      'Posicione-se no banco declinado',
      'Halteres acima do peito',
      'Abra os braços em arco',
      'Desça até alongar',
      'Contraia ao retornar',
      'Mantenha controle'
    ],
    tips: [
      'Use carga moderada',
      'Mantenha flexão nos cotovelos',
      'Foque no alongamento',
      'Contraia no topo'
    ],
    animation: 'crucifixo'
  },
  'push_up_diamante': {
    id: 'push_up_diamante',
    name: 'Push Up Diamante',
    day: 'Dia 3 - Peitoral Inferior',
    type: 'acessório',
    difficulty: 'Intermediário',
    focus: 'Peitoral inferior e tríceps',
    muscleGroup: 'peitoral',
    equipment: ['peso corporal'],
    sets: 3,
    reps: '15',
    restTime: 45,
    description: 'Variação avançada de flexão',
    instructions: [
      'Mãos juntas formando um diamante',
      'Corpo em linha reta',
      'Desça até o peito quase tocar as mãos',
      'Empurre com força',
      'Mantenha core ativo',
      'Controle o movimento'
    ],
    tips: [
      'Mantenha cotovelos próximos',
      'Não deixe quadril cair',
      'Desça controladamente',
      'Foque no peitoral inferior'
    ],
    animation: 'flexao'
  },

  // DIA 4 - FULL CHEST
  'supino_reto_pesado': {
    id: 'supino_reto_pesado',
    name: 'Supino Reto Pesado',
    day: 'Dia 4 - Full Chest',
    type: 'principal',
    difficulty: 'Avançado',
    focus: 'Força e massa do peitoral',
    muscleGroup: 'peitoral',
    equipment: ['banco', 'barra', 'pesos'],
    sets: 5,
    reps: '5',
    restTime: 120,
    description: 'Treino de força com cargas pesadas',
    instructions: [
      'Aquecimento completo obrigatório',
      'Use sempre um spotter',
      'Pegada segura na barra',
      'Desça controladamente',
      'Empurre explosivamente',
      'Descanse adequadamente'
    ],
    tips: [
      'Aumente carga progressivamente',
      'Priorize técnica sobre carga',
      'Use spotter sempre',
      'Descanse bem entre séries'
    ],
    animation: 'supino_reto',
    commonMistakes: [
      'Saltar a barra do peito',
      'Treinar sem spotter',
      'Sacrificar técnica por carga',
      'Não aquecer adequadamente'
    ]
  },
  'supino_inclinado_medio': {
    id: 'supino_inclinado_medio',
    name: 'Supino Inclinado',
    day: 'Dia 4 - Full Chest',
    type: 'principal',
    difficulty: 'Intermediário',
    focus: 'Peitoral superior',
    muscleGroup: 'peitoral',
    equipment: ['banco inclinado', 'barra'],
    sets: 4,
    reps: '10',
    restTime: 60,
    description: 'Complemento para peitoral superior',
    instructions: [
      'Banco em 30-45 graus',
      'Pegada adequada',
      'Desça controladamente',
      'Empurre com força',
      'Mantenha estabilidade',
      'Controle o movimento'
    ],
    tips: [
      'Mantenha técnica correta',
      'Não arqueie excessivamente',
      'Use amplitude completa',
      'Controle a descida'
    ],
    animation: 'supino_inclinado'
  },
  'paralelas_full': {
    id: 'paralelas_full',
    name: 'Paralelas',
    day: 'Dia 4 - Full Chest',
    type: 'principal',
    difficulty: 'Intermediário',
    focus: 'Peitoral inferior completo',
    muscleGroup: 'peitoral',
    equipment: ['paralelas'],
    sets: 3,
    reps: '12',
    restTime: 60,
    description: 'Exercício composto eficiente',
    instructions: [
      'Apoie-se nas barras',
      'Incline o tronco',
      'Desça controladamente',
      'Empurre com força',
      'Mantenha estabilidade',
      'Controle o movimento'
    ],
    tips: [
      'Incline para trabalhar peitoral',
      'Mantenha ombros estáveis',
      'Não desça demais',
      'Controle total do movimento'
    ],
    animation: 'paralelas'
  },
  'crucifixo_maquina': {
    id: 'crucifixo_maquina',
    name: 'Crucifixo na Máquina',
    day: 'Dia 4 - Full Chest',
    type: 'acessório',
    difficulty: 'Iniciante',
    focus: 'Isolamento e definição',
    muscleGroup: 'peitoral',
    equipment: ['máquina'],
    sets: 4,
    reps: '15',
    restTime: 45,
    description: 'Trabalho seguro de isolamento',
    instructions: [
      'Ajuste o banco corretamente',
      'Segure as alças',
      'Puxe as alças para frente',
      'Contraia o peitoral',
      'Retorne controladamente',
      'Mantenha tensão constante'
    ],
    tips: [
      'Use carga adequada',
      'Foque na contração',
      'Não use impulso',
      'Controle o retorno'
    ],
    animation: 'crucifixo'
  },
  'pullover': {
    id: 'pullover',
    name: 'Pullover',
    day: 'Dia 4 - Full Chest',
    type: 'acessório',
    difficulty: 'Intermediário',
    focus: 'Alongamento e expansão torácica',
    muscleGroup: 'peitoral',
    equipment: ['banco', 'halter'],
    sets: 3,
    reps: '12',
    restTime: 45,
    description: 'Exercício para alongamento do peitoral',
    instructions: [
      'Deite-se perpendicular ao banco',
      'Segure um halter acima do peito',
      'Desça o halter atrás da cabeça',
      'Mantenha braços levemente flexionados',
      'Puxe o halter de volta',
      'Sinta o alongamento'
    ],
    tips: [
      'Use carga moderada',
      'Mantenha flexão nos cotovelos',
      'Desça até alongar',
      'Controle o movimento'
    ],
    animation: 'pullover'
  },

  // DIA 5 - VOLUME ALTO
  'supino_guillotina': {
    id: 'supino_guillotina',
    name: 'Supino Guillotina',
    day: 'Dia 5 - Volume Alto',
    type: 'principal',
    difficulty: 'Avançado',
    focus: 'Peitoral superior com amplitude extrema',
    muscleGroup: 'peitoral',
    equipment: ['banco', 'barra'],
    sets: 4,
    reps: '12',
    restTime: 60,
    description: 'Variação avançada do supino',
    instructions: [
      'Use carga moderada',
      'Desça a barra em direção ao pescoço',
      'Mantenha controle total',
      'Use spotter obrigatoriamente',
      'Amplitude completa',
      'Controle extremo'
    ],
    tips: [
      'Sempre use spotter',
      'Use carga menor que supino normal',
      'Mantenha controle total',
      'Não faça se tiver lesões'
    ],
    animation: 'supino_reto',
    commonMistakes: [
      'Usar carga excessiva',
      'Treinar sem spotter',
      'Perder o controle',
      'Não ter técnica adequada'
    ]
  },
  'supino_pegada_fechada': {
    id: 'supino_pegada_fechada',
    name: 'Supino com Pegada Fechada',
    day: 'Dia 5 - Volume Alto',
    type: 'principal',
    difficulty: 'Intermediário',
    focus: 'Peitoral interno e tríceps',
    muscleGroup: 'peitoral',
    equipment: ['banco', 'barra'],
    sets: 4,
    reps: '10',
    restTime: 60,
    description: 'Trabalha peitoral interno',
    instructions: [
      'Pegada mais estreita que ombros',
      'Desça a barra controladamente',
      'Mantenha cotovelos próximos',
      'Empurre com força',
      'Foque no peitoral interno',
      'Controle o movimento'
    ],
    tips: [
      'Não feche demais a pegada',
      'Mantenha cotovelos próximos',
      'Controle a descida',
      'Foque na contração'
    ],
    animation: 'supino_reto'
  },
  'crucifixo_drop_set': {
    id: 'crucifixo_drop_set',
    name: 'Crucifixo Drop Set',
    day: 'Dia 5 - Volume Alto',
    type: 'acessório',
    difficulty: 'Avançado',
    focus: 'Volume extremo e definição',
    muscleGroup: 'peitoral',
    equipment: ['banco', 'halteres'],
    sets: 3,
    reps: '12-10-8',
    restTime: 60,
    description: 'Técnica avançada de volume',
    instructions: [
      'Comece com peso moderado',
      'Faça 12 repetições',
      'Sem descanso, reduza peso',
      'Faça mais 10 repetições',
      'Reduza peso novamente',
      'Faça 8 repetições finais'
    ],
    tips: [
      'Tenha halteres preparados',
      'Não descanse entre drops',
      'Mantenha técnica',
      'Controle a fadiga'
    ],
    animation: 'crucifixo',
    commonMistakes: [
      'Descansar entre drops',
      'Perder a técnica',
      'Começar muito pesado',
      'Não completar as reps'
    ]
  },
  'flexao_variada': {
    id: 'flexao_variada',
    name: 'Flexão Variada',
    day: 'Dia 5 - Volume Alto',
    type: 'acessório',
    difficulty: 'Intermediário',
    focus: 'Resistência muscular',
    muscleGroup: 'peitoral',
    equipment: ['peso corporal'],
    sets: 4,
    reps: '15',
    restTime: 45,
    description: 'Variações de flexão para volume',
    instructions: [
      'Alterne entre diferentes tipos',
      'Flexão normal',
      'Flexão diamante',
      'Flexão ampla',
      'Mantenha técnica',
      'Controle o movimento'
    ],
    tips: [
      'Varie as posições',
      'Mantenha corpo rígido',
      'Não deixe quadril cair',
      'Respire corretamente'
    ],
    animation: 'flexao'
  },
  'cross_over_100': {
    id: 'cross_over_100',
    name: 'Cross Over 100 reps',
    day: 'Dia 5 - Volume Alto',
    type: 'acessório',
    difficulty: 'Avançado',
    focus: 'Resistência extrema',
    muscleGroup: 'peitoral',
    equipment: ['polia'],
    sets: 1,
    reps: '100',
    restTime: 0,
    description: 'Desafio de volume extremo',
    instructions: [
      'Use carga leve',
      'Faça 100 repetições',
      'Pode pausar se necessário',
      'Mantenha técnica',
      'Foque na contração',
      'Complete o desafio'
    ],
    tips: [
      'Use carga muito leve',
      'Pode pausar brevemente',
      'Mantenha técnica sempre',
      'Prepare-se mentalmente'
    ],
    animation: 'cross_over',
    commonMistakes: [
      'Usar carga pesada',
      'Perder a técnica',
      'Desistir cedo',
      'Não contrair adequadamente'
    ]
  }
};

export interface ChestWorkoutDay {
  id: string;
  name: string;
  focus: string;
  exercises: string[];
}

export const chestWorkoutProgram = {
  id: 'peitoral_completo',
  name: 'Foco em Peitoral',
  description: 'Programa completo para desenvolvimento do peitoral. Trabalha todas as porções: superior, medial e inferior, com exercícios variados para massa e definição muscular.',
  level: 'Intermediário',
  duration: '5 dias',
  focus: 'Peitoral',
  tags: ['Peitoral', 'Força', 'Hipertrofia', 'Upper Body'],
  days: [
    {
      id: 'dia1',
      name: 'Dia 1 - Peitoral Superior',
      focus: 'Porção clavicular',
      exercises: [
        'supino_inclinado_barra',
        'crucifixo_inclinado',
        'flexao_declinada',
        'cross_over_superior',
        'supino_inclinado_halteres'
      ]
    },
    {
      id: 'dia2',
      name: 'Dia 2 - Peitoral Medial',
      focus: 'Porção esternal',
      exercises: [
        'supino_reto_barra',
        'supino_halteres',
        'crucifixo_reto',
        'flexao_braco',
        'cross_over_medio'
      ]
    },
    {
      id: 'dia3',
      name: 'Dia 3 - Peitoral Inferior',
      focus: 'Porção abdominal',
      exercises: [
        'supino_declinado',
        'paralelas_peito',
        'cross_over_inferior',
        'crucifixo_declinado',
        'push_up_diamante'
      ]
    },
    {
      id: 'dia4',
      name: 'Dia 4 - Full Chest',
      focus: 'Peitoral completo',
      exercises: [
        'supino_reto_pesado',
        'supino_inclinado_medio',
        'paralelas_full',
        'crucifixo_maquina',
        'pullover'
      ]
    },
    {
      id: 'dia5',
      name: 'Dia 5 - Volume Alto',
      focus: 'Resistência muscular',
      exercises: [
        'supino_guillotina',
        'supino_pegada_fechada',
        'crucifixo_drop_set',
        'flexao_variada',
        'cross_over_100'
      ]
    }
  ]
};
