import { RECOVERY } from './classProgression.js';

export const RACE_OPTIONS = [
  ['Livro do Jogador', 'Anão da Colina'], ['Livro do Jogador', 'Anão da Montanha'],
  ['Livro do Jogador', 'Alto Elfo'], ['Livro do Jogador', 'Elfo da Floresta'],
  ['Livro do Jogador', 'Drow'], ['Livro do Jogador', 'Halfling Pés-Leves'],
  ['Livro do Jogador', 'Halfling Robusto'], ['Livro do Jogador', 'Humano'],
  ['Livro do Jogador', 'Draconato'], ['Livro do Jogador', 'Gnomo da Floresta'],
  ['Livro do Jogador', 'Gnomo das Rochas'], ['Livro do Jogador', 'Meio-Elfo'],
  ['Livro do Jogador', 'Meio-Orc'], ['Livro do Jogador', 'Tiefling'],
  ['Campanha legada', 'Orc'], ['Campanha legada', 'Golias de Fogo'],
  ['Campanha legada', 'Leonino'], ['Campanha legada', 'Kobold'],
  ['Campanha legada', 'Aasimar'], ['Campanha legada', 'Yuan-ti Sangue-Puro'],
].map(([group, name]) => ({ group, name }));

const RACES = [
  { names: ['Anão da Colina', 'Anão'], features: [[1, 'Visão no Escuro; Resiliência Anã; Treinamento Anão em Combate; Proficiência com Ferramentas; Especialização em Rochas; Tenacidade Anã']] },
  { names: ['Anão da Montanha'], features: [[1, 'Visão no Escuro; Resiliência Anã; Treinamento Anão em Combate; Proficiência com Ferramentas; Especialização em Rochas; Treinamento Anão com Armaduras']] },
  { names: ['Alto Elfo', 'Elfo'], features: [[1, 'Visão no Escuro; Sentidos Aguçados; Ancestral Feérico; Transe; Treinamento Élfico com Armas; Truque; Idioma Adicional']] },
  { names: ['Elfo da Floresta'], features: [[1, 'Visão no Escuro; Sentidos Aguçados; Ancestral Feérico; Transe; Treinamento Élfico com Armas; Pés Ligeiros; Máscara da Natureza']] },
  {
    names: ['Drow', 'Elfo Negro'],
    features: [[1, 'Visão no Escuro Superior; Sensibilidade à Luz Solar; Ancestral Feérico; Transe; Globos de Luz; Treinamento Drow com Armas'], [3, 'Magia Drow: Fogo das Fadas'], [5, 'Magia Drow: Escuridão']],
    resources: [
      { id: 'race-drow-faerie-fire', name: 'Magia Drow · Fogo das Fadas', unlock: 3, recovery: RECOVERY.LONG, max: () => 1 },
      { id: 'race-drow-darkness', name: 'Magia Drow · Escuridão', unlock: 5, recovery: RECOVERY.LONG, max: () => 1 },
    ],
  },
  { names: ['Halfling Pés-Leves', 'Halfling'], features: [[1, 'Sortudo; Bravura; Agilidade Halfling; Furtividade Natural']] },
  { names: ['Halfling Robusto'], features: [[1, 'Sortudo; Bravura; Agilidade Halfling; Resiliência dos Robustos']] },
  { names: ['Humano'], features: [[1, 'Aumento versátil nos valores de habilidade; idioma adicional']] },
  {
    names: ['Draconato'],
    features: [[1, 'Ancestral Dracônico; Arma de Sopro; Resistência a Dano']],
    resources: [{ id: 'race-breath-weapon', name: 'Arma de Sopro', unlock: 1, recovery: RECOVERY.SHORT, max: () => 1 }],
  },
  { names: ['Gnomo da Floresta', 'Gnomo'], features: [[1, 'Visão no Escuro; Esperteza Gnômica; Ilusionista Nato; Falar com Bestas Pequenas']] },
  { names: ['Gnomo das Rochas'], features: [[1, 'Visão no Escuro; Esperteza Gnômica; Conhecimento de Artífice; Engenhoqueiro']] },
  { names: ['Meio-Elfo'], features: [[1, 'Visão no Escuro; Ancestral Feérico; Versatilidade em Perícia; idiomas adicionais']] },
  {
    names: ['Meio-Orc'],
    features: [[1, 'Visão no Escuro; Ameaçador; Resistência Implacável; Ataques Selvagens']],
    resources: [{ id: 'race-relentless-endurance', name: 'Resistência Implacável', unlock: 1, recovery: RECOVERY.LONG, max: () => 1 }],
  },
  {
    names: ['Tiefling'],
    features: [[1, 'Visão no Escuro; Resistência Infernal; Taumaturgia'], [3, 'Legado Infernal: Repreensão Infernal'], [5, 'Legado Infernal: Escuridão']],
    resources: [
      { id: 'race-infernal-rebuke', name: 'Legado Infernal · Repreensão Infernal', unlock: 3, recovery: RECOVERY.LONG, max: () => 1 },
      { id: 'race-tiefling-darkness', name: 'Legado Infernal · Escuridão', unlock: 5, recovery: RECOVERY.LONG, max: () => 1 },
    ],
  },
  {
    names: ['Orc'],
    features: [[1, 'Adrenalina de Combate; Resistência Implacável']],
    resources: [
      { id: 'race-combat-adrenaline', name: 'Adrenalina de Combate', unlock: 1, recovery: RECOVERY.LONG, max: (_level, proficiency) => proficiency },
      { id: 'race-orc-relentless-endurance', name: 'Resistência Implacável', unlock: 1, recovery: RECOVERY.LONG, max: () => 1 },
    ],
  },
  { names: ['Golias de Fogo'], features: [[1, 'Queimadura da Forja']], resources: [{ id: 'race-forge-burn', name: 'Queimadura da Forja', unlock: 1, recovery: RECOVERY.LONG, max: (_level, proficiency) => proficiency }] },
  { names: ['Leonino'], features: [[1, 'Rugido Assustador']], resources: [{ id: 'race-daunting-roar', name: 'Rugido Assustador', unlock: 1, recovery: RECOVERY.LONG, max: (_level, proficiency) => proficiency }] },
  { names: ['Kobold'], features: [[1, 'Grito de Guerra Kobolds']], resources: [{ id: 'race-draconic-cry', name: 'Grito de Guerra Kobolds', unlock: 1, recovery: RECOVERY.LONG, max: (_level, proficiency) => proficiency }] },
  {
    names: ['Aasimar'],
    features: [[1, 'Mãos Curativas; Presença Agressiva']],
    resources: [
      { id: 'race-healing-hands', name: 'Mãos Curativas', unlock: 1, recovery: RECOVERY.LONG, max: () => 1 },
      { id: 'race-aggressive-presence', name: 'Presença Agressiva', unlock: 1, recovery: RECOVERY.LONG, max: (_level, proficiency) => proficiency },
    ],
  },
  { names: ['Yuan-ti Sangue-Puro'], features: [[1, 'Legado racial da campanha']] },
].map((race) => ({ ...race, resources: race.resources || [] }));

function normalized(value) {
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

function raceDefinition(race) {
  const value = normalized(race);
  if (!value) return null;
  return RACES.find((entry) => entry.names.some((name) => normalized(name) === value))
    || RACES.find((entry) => [...entry.names].sort((a, b) => b.length - a.length).some((name) => value.includes(normalized(name))))
    || null;
}

export function raceResourcesFor(race, level = 1) {
  return (raceDefinition(race)?.resources || []).filter((resource) => level >= resource.unlock);
}

export function raceProgressionFor(race, level) {
  const features = raceDefinition(race)?.features || [];
  return {
    unlocked: features.filter(([featureLevel]) => featureLevel <= level),
    upcoming: features.filter(([featureLevel]) => featureLevel > level),
  };
}

export const ALL_RACE_RESOURCE_IDS = new Set(RACES.flatMap((entry) => entry.resources.map((resource) => resource.id)));
export const ALL_RACE_RESOURCE_NAMES = new Set(RACES.flatMap((entry) => entry.resources.map((resource) => normalized(resource.name))));
