export const CONDITIONS = [
  { id: 'blinded', name: 'Cego', summary: 'Falha em testes que exigem visao; ataques contra ele tem vantagem.' },
  { id: 'deafened', name: 'Surdo', summary: 'Falha em testes que exigem audicao.' },
  { id: 'poisoned', name: 'Envenenado', summary: 'Desvantagem em ataques e testes de habilidade.' },
  { id: 'frightened', name: 'Amedrontado', summary: 'Desvantagem enquanto enxergar a fonte; nao pode se aproximar.' },
  { id: 'grappled', name: 'Agarrado', summary: 'Deslocamento se torna zero.' },
  { id: 'restrained', name: 'Restrito', summary: 'Deslocamento zero; ataques e salvaguardas de DES prejudicados.' },
  { id: 'incapacitated', name: 'Incapacitado', summary: 'Nao pode realizar acoes ou reacoes.' },
  { id: 'paralyzed', name: 'Paralisado', summary: 'Incapacitado; falha em FOR e DES; ataques proximos podem ser criticos.' },
  { id: 'stunned', name: 'Atordoado', summary: 'Incapacitado; falha em FOR e DES; ataques contra ele tem vantagem.' },
  { id: 'unconscious', name: 'Inconsciente', summary: 'Incapacitado, caido e sem percepcao do ambiente.' },
  { id: 'charmed', name: 'Enfeiticado', summary: 'Nao pode atacar quem o enfeiticou.' },
  { id: 'invisible', name: 'Invisivel', summary: 'Nao pode ser visto sem sentidos especiais.' },
  { id: 'petrified', name: 'Petrificado', summary: 'Transformado e incapacitado; resistencia a todo dano.' },
  { id: 'concentrating', name: 'Concentrando', summary: 'Ao sofrer dano, teste de CON CD 10 ou metade do dano.' },
];

export const INCAPACITATING_CONDITIONS = new Set([
  'incapacitated',
  'paralyzed',
  'stunned',
  'unconscious',
  'petrified',
]);
