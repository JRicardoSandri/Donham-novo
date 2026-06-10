import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

const STORAGE_KEY = 'domhan_rpg_companion_supremo_v1';

const RECOVERY = {
  SHORT: 'Descanso Curto',
  LONG: 'Descanso Longo',
  MANUAL: 'Manual',
};

const XP_TABLE = [
  { level: 1, xp: 0 },
  { level: 2, xp: 300 },
  { level: 3, xp: 900 },
  { level: 4, xp: 2700 },
  { level: 5, xp: 6500 },
  { level: 6, xp: 14000 },
  { level: 7, xp: 23000 },
  { level: 8, xp: 34000 },
  { level: 9, xp: 48000 },
  { level: 10, xp: 64000 },
  { level: 11, xp: 85000 },
  { level: 12, xp: 100000 },
  { level: 13, xp: 120000 },
  { level: 14, xp: 140000 },
  { level: 15, xp: 165000 },
  { level: 16, xp: 195000 },
  { level: 17, xp: 225000 },
  { level: 18, xp: 265000 },
  { level: 19, xp: 305000 },
  { level: 20, xp: 355000 },
];

const CONDITIONS = [
  {
    id: 'concentrando',
    name: 'Concentrando',
    desc: 'Mantém uma magia de concentração. Ao sofrer dano, faça teste de Constituição para manter a magia.',
  },
  {
    id: 'cego',
    name: 'Cego',
    desc: 'Falha automaticamente em testes que dependem de visão. Ataques contra você têm vantagem; seus ataques têm desvantagem.',
  },
  {
    id: 'surdo',
    name: 'Surdo',
    desc: 'Falha automaticamente em testes que dependem de audição.',
  },
  {
    id: 'amedrontado',
    name: 'Amedrontado',
    desc: 'Desvantagem em testes e ataques enquanto vê a fonte do medo. Não pode se aproximar voluntariamente dela.',
  },
  {
    id: 'envenenado',
    name: 'Envenenado',
    desc: 'Desvantagem em jogadas de ataque e testes de atributo.',
  },
  {
    id: 'caido',
    name: 'Caído',
    desc: 'Move-se rastejando ou gasta metade do deslocamento para levantar. Ataques corpo a corpo contra você têm vantagem; ataques à distância têm desvantagem.',
  },
  {
    id: 'agarrado',
    name: 'Agarrado',
    desc: 'Deslocamento 0. A condição termina se o agarrador ficar incapacitado ou se o efeito for removido.',
  },
  {
    id: 'restrito',
    name: 'Restrito',
    desc: 'Deslocamento 0. Ataques contra você têm vantagem; seus ataques têm desvantagem; desvantagem em salvaguardas de Destreza.',
  },
  {
    id: 'incapacitado',
    name: 'Incapacitado',
    desc: 'Não pode realizar ações nem reações.',
  },
  {
    id: 'paralisado',
    name: 'Paralisado',
    desc: 'Incapacitado, não pode mover/falar, falha em testes de Força e Destreza. Ataques corpo a corpo adjacentes que acertam são críticos.',
  },
  {
    id: 'atordoado',
    name: 'Atordoado',
    desc: 'Incapacitado, não pode mover e fala de forma limitada. Falha em testes de Força e Destreza. Ataques contra você têm vantagem.',
  },
  {
    id: 'inconsciente',
    name: 'Inconsciente',
    desc: 'Incapacitado, caído, não pode mover/falar e não percebe o ambiente. Falha em Força e Destreza; ataques corpo a corpo adjacentes que acertam são críticos.',
  },
  {
    id: 'enfeiticado',
    name: 'Enfeitiçado',
    desc: 'Não pode atacar quem o enfeitiçou ou escolher essa criatura como alvo de habilidades ou efeitos mágicos nocivos. Quem enfeitiçou tem vantagem em testes sociais contra a criatura.',
  },
  {
    id: 'invisivel',
    name: 'Invisível',
    desc: 'Não pode ser visto sem magia ou sentido especial. Ataques contra a criatura têm desvantagem; os ataques dela têm vantagem.',
  },
  {
    id: 'petrificado',
    name: 'Petrificado',
    desc: 'Transformado em substância sólida, incapacitado, não se move/fala, não percebe o ambiente, ataques contra ela têm vantagem, falha em testes de Força e Destreza e tem resistência a todos os danos.',
  },
];

const LEVEL_FEATURES = {
  Guerreiro: [
    [1, 'Estilo de Luta; Retomar Fôlego'],
    [2, 'Surto de Ação'],
    [3, 'Arquétipo Marcial'],
    [4, 'Aumento de Atributo ou Talento'],
    [5, 'Ataque Extra'],
    [6, 'Aumento de Atributo ou Talento'],
    [7, 'Habilidade do Arquétipo Marcial'],
    [8, 'Aumento de Atributo ou Talento'],
    [9, 'Indomável'],
    [10, 'Habilidade do Arquétipo Marcial'],
    [11, 'Ataque Extra (2)'],
    [12, 'Aumento de Atributo ou Talento'],
    [13, 'Indomável (2 usos)'],
    [14, 'Aumento de Atributo ou Talento'],
    [15, 'Habilidade do Arquétipo Marcial'],
    [16, 'Aumento de Atributo ou Talento'],
    [17, 'Surto de Ação (2 usos); Indomável (3 usos)'],
    [18, 'Habilidade do Arquétipo Marcial'],
    [19, 'Aumento de Atributo ou Talento'],
    [20, 'Ataque Extra (3)'],
  ],
  Paladino: [
    [1, 'Sentido Divino; Cura Pelas Mãos'],
    [2, 'Estilo de Luta; Conjuração; Destruição Divina'],
    [3, 'Saúde Divina; Juramento Sagrado; Canalizar Divindade'],
    [4, 'Aumento de Atributo ou Talento'],
    [5, 'Ataque Extra; magias de 2º círculo'],
    [6, 'Aura de Proteção'],
    [7, 'Habilidade do Juramento'],
    [8, 'Aumento de Atributo ou Talento'],
    [9, 'Magias de 3º círculo'],
    [10, 'Aura de Coragem'],
    [11, 'Destruição Divina Aprimorada'],
    [12, 'Aumento de Atributo ou Talento'],
    [13, 'Magias de 4º círculo'],
    [14, 'Toque Purificador'],
    [15, 'Habilidade do Juramento'],
    [16, 'Aumento de Atributo ou Talento'],
    [17, 'Magias de 5º círculo'],
    [18, 'Melhoria das Auras'],
    [19, 'Aumento de Atributo ou Talento'],
    [20, 'Habilidade final do Juramento'],
  ],
  Bruxo: [
    [1, 'Patrono; Magia de Pacto'],
    [2, 'Invocações Místicas'],
    [3, 'Dádiva do Pacto'],
    [4, 'Aumento de Atributo ou Talento'],
    [5, 'Invocações adicionais; magias de 3º círculo'],
    [6, 'Habilidade do Patrono'],
    [7, 'Magias de 4º círculo'],
    [8, 'Aumento de Atributo ou Talento'],
    [9, 'Magias de 5º círculo'],
    [10, 'Habilidade do Patrono'],
    [11, 'Arcano Místico (6º)'],
    [12, 'Aumento de Atributo ou Talento'],
    [13, 'Arcano Místico (7º)'],
    [14, 'Habilidade do Patrono'],
    [15, 'Arcano Místico (8º)'],
    [16, 'Aumento de Atributo ou Talento'],
    [17, 'Arcano Místico (9º)'],
    [18, 'Invocação adicional'],
    [19, 'Aumento de Atributo ou Talento'],
    [20, 'Mestre Místico'],
  ],
  Bardo: [
    [1, 'Conjuração; Inspiração de Bardo'],
    [2, 'Versatilidade; Canção do Descanso'],
    [3, 'Colégio de Bardo; Aptidão'],
    [4, 'Aumento de Atributo ou Talento'],
    [5, 'Fonte de Inspiração; Inspiração d8'],
    [6, 'Contraencanto; Habilidade do Colégio'],
    [7, 'Magias de 4º círculo'],
    [8, 'Aumento de Atributo ou Talento'],
    [9, 'Canção do Descanso d8'],
    [10, 'Aptidão; Segredos Mágicos; Inspiração d10'],
    [11, 'Magias de 6º círculo'],
    [12, 'Aumento de Atributo ou Talento'],
    [13, 'Canção do Descanso d10'],
    [14, 'Segredos Mágicos; Habilidade do Colégio'],
    [15, 'Inspiração d12'],
    [16, 'Aumento de Atributo ou Talento'],
    [17, 'Canção do Descanso d12'],
    [18, 'Segredos Mágicos'],
    [19, 'Aumento de Atributo ou Talento'],
    [20, 'Inspiração Superior'],
  ],
  Ranger: [
    [1, 'Exploração e combate de patrulheiro'],
    [2, 'Estilo de Luta; Conjuração'],
    [3, 'Arquétipo de Ranger; Consciência Primitiva'],
    [4, 'Aumento de Atributo ou Talento'],
    [5, 'Ataque Extra; magias de 2º círculo'],
    [6, 'Melhoria de exploração'],
    [7, 'Habilidade do Arquétipo'],
    [8, 'Aumento de Atributo ou Talento; Passo da Terra'],
    [9, 'Magias de 3º círculo'],
    [10, 'Esconder-se à Vista'],
    [11, 'Habilidade do Arquétipo'],
    [12, 'Aumento de Atributo ou Talento'],
    [13, 'Magias de 4º círculo'],
    [14, 'Desaparecer'],
    [15, 'Habilidade do Arquétipo'],
    [16, 'Aumento de Atributo ou Talento'],
    [17, 'Magias de 5º círculo'],
    [18, 'Sentidos Selvagens'],
    [19, 'Aumento de Atributo ou Talento'],
    [20, 'Matador de Inimigos'],
  ],
};


const SPELL_SLOT_TABLES = {
  Bardo: {
    1: [2],
    2: [3],
    3: [4, 2],
    4: [4, 3],
    5: [4, 3, 2],
    6: [4, 3, 3],
    7: [4, 3, 3, 1],
    8: [4, 3, 3, 2],
    9: [4, 3, 3, 3, 1],
    10: [4, 3, 3, 3, 2],
    11: [4, 3, 3, 3, 2, 1],
    12: [4, 3, 3, 3, 2, 1],
    13: [4, 3, 3, 3, 2, 1, 1],
    14: [4, 3, 3, 3, 2, 1, 1],
    15: [4, 3, 3, 3, 2, 1, 1, 1],
    16: [4, 3, 3, 3, 2, 1, 1, 1],
    17: [4, 3, 3, 3, 2, 1, 1, 1, 1],
    18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
    19: [4, 3, 3, 3, 3, 2, 1, 1, 1],
    20: [4, 3, 3, 3, 3, 2, 2, 1, 1],
  },
  Paladino: {
    1: [],
    2: [2],
    3: [3],
    4: [3],
    5: [4, 2],
    6: [4, 2],
    7: [4, 3],
    8: [4, 3],
    9: [4, 3, 2],
    10: [4, 3, 2],
    11: [4, 3, 3],
    12: [4, 3, 3],
    13: [4, 3, 3, 1],
    14: [4, 3, 3, 1],
    15: [4, 3, 3, 2],
    16: [4, 3, 3, 2],
    17: [4, 3, 3, 3, 1],
    18: [4, 3, 3, 3, 1],
    19: [4, 3, 3, 3, 2],
    20: [4, 3, 3, 3, 2],
  },
  Ranger: {
    1: [],
    2: [2],
    3: [3],
    4: [3],
    5: [4, 2],
    6: [4, 2],
    7: [4, 3],
    8: [4, 3],
    9: [4, 3, 2],
    10: [4, 3, 2],
    11: [4, 3, 3],
    12: [4, 3, 3],
    13: [4, 3, 3, 1],
    14: [4, 3, 3, 1],
    15: [4, 3, 3, 2],
    16: [4, 3, 3, 2],
    17: [4, 3, 3, 3, 1],
    18: [4, 3, 3, 3, 1],
    19: [4, 3, 3, 3, 2],
    20: [4, 3, 3, 3, 2],
  },
};

const WARLOCK_PACT_TABLE = {
  1: { slots: 1, circle: 1 },
  2: { slots: 2, circle: 1 },
  3: { slots: 2, circle: 2 },
  4: { slots: 2, circle: 2 },
  5: { slots: 2, circle: 3 },
  6: { slots: 2, circle: 3 },
  7: { slots: 2, circle: 4 },
  8: { slots: 2, circle: 4 },
  9: { slots: 2, circle: 5 },
  10: { slots: 2, circle: 5 },
  11: { slots: 3, circle: 5 },
  12: { slots: 3, circle: 5 },
  13: { slots: 3, circle: 5 },
  14: { slots: 3, circle: 5 },
  15: { slots: 3, circle: 5 },
  16: { slots: 3, circle: 5 },
  17: { slots: 4, circle: 5 },
  18: { slots: 4, circle: 5 },
  19: { slots: 4, circle: 5 },
  20: { slots: 4, circle: 5 },
};

function ordinalCircle(circle) {
  return `${circle}º círculo`;
}

function isMagicResource(resource) {
  if (!resource) return false;
  const name = String(resource.name || '').toLowerCase();
  return (
    resource.type === 'Magia' ||
    name.includes('conjurador') ||
    name.includes('conjuração') ||
    name.includes('magia de pacto') ||
    name.includes('arcano místico') ||
    name.includes('círculo')
  );
}

function makeResource(character, index, name, type, recovery, max, oldResource = null) {
  const oldMax = oldResource ? numberValue(oldResource.max) : max;
  const oldCurrent = oldResource ? numberValue(oldResource.current) : max;
  const used = Math.max(0, oldMax - oldCurrent);

  return {
    id: oldResource?.id || `${character}-${index}`,
    name,
    type,
    recovery,
    max,
    current: clamp(max - used, 0, max),
  };
}

function getMagicResources(character) {
  const level = getLevelInfo(numberValue(character.xp)).level;
  const classKey = character.classKey;
  const resources = [];

  if (classKey === 'Bruxo') {
    const pact = WARLOCK_PACT_TABLE[level] || WARLOCK_PACT_TABLE[1];
    resources.push({
      idKey: `pact-${pact.circle}`,
      name: `Magia de Pacto — ${ordinalCircle(pact.circle)}`,
      type: 'Magia',
      recovery: RECOVERY.SHORT,
      max: pact.slots,
    });

    [6, 7, 8, 9].forEach((circle) => {
      const unlockLevel = { 6: 11, 7: 13, 8: 15, 9: 17 }[circle];
      if (level >= unlockLevel) {
        resources.push({
          idKey: `mystic-${circle}`,
          name: `Arcano Místico — ${ordinalCircle(circle)}`,
          type: 'Magia',
          recovery: RECOVERY.LONG,
          max: 1,
        });
      }
    });

    return resources;
  }

  const slots = SPELL_SLOT_TABLES[classKey]?.[level] || [];
  slots.forEach((max, index) => {
    if (max > 0) {
      const circle = index + 1;
      resources.push({
        idKey: `spell-${circle}`,
        name: `Magia ${ordinalCircle(circle)}`,
        type: 'Magia',
        recovery: RECOVERY.LONG,
        max,
      });
    }
  });

  return resources;
}

function syncMagicResources(character) {
  const currentResources = character.resources || [];
  const staticResources = currentResources.filter((r) => !isMagicResource(r));
  const existingMagic = currentResources.filter(isMagicResource);

  const generatedMagic = getMagicResources(character).map((resource, index) => {
    const oldResource =
      existingMagic.find((r) => r.name === resource.name) ||
      existingMagic.find((r) => String(r.name || '').includes(resource.idKey));

    return makeResource(
      character.character,
      `magic-${resource.idKey}`,
      resource.name,
      resource.type,
      resource.recovery,
      resource.max,
      oldResource
    );
  });

  return {
    ...character,
    tempHp: Math.max(0, numberValue(character.tempHp || 0)),
    resources: [...staticResources, ...generatedMagic],
  };
}

const DEFAULT_CHARACTERS = [
  {
    player: 'Bruno',
    character: 'Vashka',
    build: 'Orc Bruxo — Arquifada',
    classKey: 'Bruxo',
    color: '#8E7CC3',
    xp: 300,
    hpMax: 17,
    hpCurrent: 17,
    initiative: '',
    inspiration: 0,
    plot: 0,
    coins: { pc: 0, pp: 0, pe: 0, po: 0, pl: 0 },
    conditions: [],
    resources: [
      ['Adrenalina de Combate', 'Racial', RECOVERY.LONG, 2],
      ['Resistência Implacável', 'Racial', RECOVERY.LONG, 1],
      ['Presença Feérica', 'Classe', RECOVERY.SHORT, 1],
      ['Magia de Pacto', 'Classe', RECOVERY.SHORT, 2],
      ['Esforço Heróico', 'Especial', RECOVERY.LONG, 1],
    ],
  },
  {
    player: 'Thiago',
    character: 'Volcan',
    build: 'Golias de Fogo Paladino',
    classKey: 'Paladino',
    color: '#E69138',
    xp: 300,
    hpMax: 20,
    hpCurrent: 20,
    initiative: '',
    inspiration: 0,
    plot: 0,
    coins: { pc: 0, pp: 0, pe: 0, po: 0, pl: 0 },
    conditions: [],
    resources: [
      ['Queimadura da Forja', 'Racial', RECOVERY.LONG, 2],
      ['Sentido Divino (Carisma 16)', 'Classe', RECOVERY.LONG, 4],
      ['Cura Pelas Mãos', 'Classe', RECOVERY.LONG, 10],
      ['Conjuração', 'Magia', RECOVERY.LONG, 2],
      ['Esforço Heróico', 'Especial', RECOVERY.LONG, 1],
    ],
  },
  {
    player: 'Ricardo',
    character: 'Kael',
    build: 'Leonino Guerreiro',
    classKey: 'Guerreiro',
    color: '#D4AF37',
    xp: 300,
    hpMax: 24,
    hpCurrent: 24,
    initiative: '',
    inspiration: 0,
    plot: 0,
    coins: { pc: 0, pp: 0, pe: 0, po: 140, pl: 0 },
    conditions: [],
    resources: [
      ['Rugido Assustador', 'Racial', RECOVERY.LONG, 2],
      ['Retomar Fôlego', 'Classe', RECOVERY.SHORT, 1],
      ['Surto de Ação', 'Classe', RECOVERY.SHORT, 1],
      ['Esforço Heróico', 'Especial', RECOVERY.LONG, 1],
    ],
  },
  {
    player: 'Cleriston',
    character: 'Pirit',
    build: 'Kobold Ranger',
    classKey: 'Ranger',
    color: '#93C47D',
    xp: 300,
    hpMax: 18,
    hpCurrent: 18,
    initiative: '',
    inspiration: 0,
    plot: 0,
    coins: { pc: 0, pp: 0, pe: 0, po: 0, pl: 0 },
    conditions: [],
    resources: [
      ['Grito de Guerra Kobolds', 'Racial', RECOVERY.LONG, 2],
      ['Conjurador', 'Magia', RECOVERY.LONG, 2],
    ],
  },
  {
    player: 'Alexandre',
    character: 'BlackSun',
    build: 'Aasimar Paladino',
    classKey: 'Paladino',
    color: '#F2E6B6',
    xp: 300,
    hpMax: 20,
    hpCurrent: 20,
    initiative: '',
    inspiration: 0,
    plot: 0,
    coins: { pc: 0, pp: 0, pe: 0, po: 0, pl: 0 },
    conditions: [],
    resources: [
      ['Mãos Curativas', 'Racial', RECOVERY.LONG, 1],
      ['Sentido Divino (Carisma 18)', 'Classe', RECOVERY.LONG, 5],
      ['Cura Pelas Mãos', 'Classe', RECOVERY.LONG, 10],
      ['Conjurador', 'Magia', RECOVERY.LONG, 2],
      ['Presença Agressiva', 'Racial', RECOVERY.LONG, 2],
      ['Prontidão de Combate', 'Especial', RECOVERY.LONG, 1],
    ],
  },
  {
    player: 'Eduardo',
    character: 'Seth',
    build: 'Yuan-ti Sangue-Puro Bardo',
    classKey: 'Bardo',
    color: '#6AA84F',
    xp: 300,
    hpMax: 15,
    hpCurrent: 15,
    initiative: '',
    inspiration: 0,
    plot: 0,
    coins: { pc: 0, pp: 0, pe: 0, po: 125, pl: 0 },
    conditions: [],
    resources: [
      ['Conjurador', 'Magia', RECOVERY.LONG, 4],
      ['Inspiração de Bardo (Carisma 18)', 'Classe', RECOVERY.LONG, 4],
      ['Esforço Heróico', 'Especial', RECOVERY.LONG, 1],
    ],
  },
];

function hydrateCharacters(characters) {
  return characters.map((c) => {
    const hydrated = {
      ...c,
      tempHp: Math.max(0, numberValue(c.tempHp || 0)),
      resources: c.resources.map((r, index) => {
        if (Array.isArray(r)) {
          const [name, type, recovery, max] = r;
          return {
            id: `${c.character}-${index}`,
            name,
            type,
            recovery,
            max,
            current: max,
          };
        }
        return r;
      }),
    };

    return syncMagicResources(hydrated);
  });
}

const INITIAL_PARTY = hydrateCharacters(DEFAULT_CHARACTERS);

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function numberValue(value) {
  const parsed = parseInt(String(value).replace(/[^0-9-]/g, ''), 10);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function getLevelInfo(xp) {
  let level = 1;

  for (const row of XP_TABLE) {
    if (xp >= row.xp) level = row.level;
  }

  const current = XP_TABLE.find((row) => row.level === level) || XP_TABLE[0];
  const next = XP_TABLE.find((row) => row.level === level + 1);

  if (!next) {
    return {
      level,
      currentXp: current.xp,
      nextXp: null,
      missing: 0,
      percent: 100,
    };
  }

  const span = next.xp - current.xp;
  const gained = xp - current.xp;

  return {
    level,
    currentXp: current.xp,
    nextXp: next.xp,
    missing: Math.max(0, next.xp - xp),
    percent: clamp(Math.round((gained / span) * 100), 0, 100),
  };
}

export default function App() {
  const [party, setParty] = useState(INITIAL_PARTY);
  const [enemies, setEnemies] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState('resources');
  const [activeTurn, setActiveTurn] = useState(0);
  const [round, setRound] = useState(1);
  const [statusModal, setStatusModal] = useState(null);
  const [lastAction, setLastAction] = useState('');

  useEffect(() => {
    async function loadState() {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed.party)) setParty(parsed.party);
          if (typeof parsed.round === 'number') setRound(parsed.round);
          if (typeof parsed.activeTurn === 'number') setActiveTurn(parsed.activeTurn);
        }
      } catch (error) {
        console.log('Erro ao carregar dados salvos:', error);
      } finally {
        setLoaded(true);
      }
    }

    loadState();
  }, []);

  useEffect(() => {
    if (!loaded) return;

    AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ party, round, activeTurn })
    ).catch((error) => console.log('Erro ao salvar:', error));
  }, [party, enemies, round, activeTurn, loaded]);

  const totals = useMemo(() => {
    let current = 0;
    let max = 0;
    let pi = 0;
    let pe = 0;

    party.forEach((p) => {
      pi += p.inspiration;
      pe += p.plot;
      p.resources.forEach((r) => {
        current += r.current;
        max += r.max;
      });
    });

    return { current, max, used: max - current, pi, pe };
  }, [party]);

  const initiativeOrder = useMemo(() => {
    const heroes = party.map((p, index) => ({
      ...p,
      kind: 'hero',
      originalIndex: index,
      initiativeValue: numberValue(p.initiative),
    }));

    const foes = enemies.map((enemy, index) => ({
      ...enemy,
      kind: 'enemy',
      originalIndex: index,
      character: enemy.name,
      build: 'Inimigo',
      color: '#B85450',
      conditions: enemy.conditions || [],
      initiativeValue: numberValue(enemy.initiative),
    }));

    return [...heroes, ...foes].sort((a, b) => b.initiativeValue - a.initiativeValue);
  }, [party, enemies]);

  function updateCharacter(index, patch) {
    setParty((old) =>
      old.map((p, i) => {
        if (i !== index) return p;
        const updated = { ...p, ...patch };
        return Object.prototype.hasOwnProperty.call(patch, 'xp') ? syncMagicResources(updated) : updated;
      })
    );
  }

  function updateEnemy(index, patch) {
    setEnemies((old) => old.map((enemy, i) => (i === index ? { ...enemy, ...patch } : enemy)));
  }

  function addEnemy() {
    setEnemies((old) => [
      ...old,
      {
        id: `enemy-${Date.now()}`,
        name: `Inimigo ${old.length + 1}`,
        hpMax: 10,
        hpCurrent: 10,
        tempHp: 0,
        initiative: '',
        conditions: [],
      },
    ]);
    setLastAction('Inimigo adicionado ao combate.');
  }

  function removeEnemy(index) {
    setEnemies((old) => old.filter((_, i) => i !== index));
    setLastAction('Inimigo removido do combate.');
  }

  function changeResource(playerIndex, resourceIndex, delta) {
    setParty((old) =>
      old.map((p, pi) => {
        if (pi !== playerIndex) return p;
        return {
          ...p,
          resources: p.resources.map((r, ri) => {
            if (ri !== resourceIndex) return r;
            return { ...r, current: clamp(r.current + delta, 0, r.max) };
          }),
        };
      })
    );
  }

  function setResource(playerIndex, resourceIndex, value) {
    setParty((old) =>
      old.map((p, pi) => {
        if (pi !== playerIndex) return p;
        return {
          ...p,
          resources: p.resources.map((r, ri) => {
            if (ri !== resourceIndex) return r;
            return { ...r, current: clamp(value, 0, r.max) };
          }),
        };
      })
    );
  }

  function changeToken(playerIndex, field, delta) {
    const max = field === 'inspiration' ? 3 : 2;
    setParty((old) =>
      old.map((p, pi) => {
        if (pi !== playerIndex) return p;
        return { ...p, [field]: clamp(p[field] + delta, 0, max) };
      })
    );
  }

  function rest(type, playerIndex = null) {
    setParty((old) =>
      old.map((p, pi) => {
        if (playerIndex !== null && pi !== playerIndex) return p;

        return {
          ...p,
          hpCurrent: type === RECOVERY.LONG ? p.hpMax : p.hpCurrent,
          resources: p.resources.map((r) => {
            if (type === RECOVERY.LONG) return { ...r, current: r.max };
            if (type === RECOVERY.SHORT && r.recovery === RECOVERY.SHORT) return { ...r, current: r.max };
            return r;
          }),
        };
      })
    );

    setLastAction(playerIndex === null ? `${type} aplicado para todos.` : `${type} aplicado.`);
  }

  function resetAll() {
    Alert.alert('Resetar tudo?', 'Todos os recursos, PV, status, iniciativa e moedas voltam ao padrão inicial.', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Resetar',
        style: 'destructive',
        onPress: () => {
          setParty(INITIAL_PARTY);
          setEnemies([]);
          setRound(1);
          setActiveTurn(0);
          setLastAction('Tudo resetado.');
        },
      },
    ]);
  }

  function nextTurn() {
    if (initiativeOrder.length === 0) return;

    const next = activeTurn + 1;

    if (next >= initiativeOrder.length) {
      setActiveTurn(0);
      setRound((r) => r + 1);
    } else {
      setActiveTurn(next);
    }
  }

  function applyHpDelta(target, delta) {
    if (delta >= 0) {
      return { ...target, hpCurrent: clamp(target.hpCurrent + delta, 0, target.hpMax) };
    }

    let damage = Math.abs(delta);
    const tempAbsorbed = Math.min(numberValue(target.tempHp || 0), damage);
    damage -= tempAbsorbed;

    return {
      ...target,
      tempHp: Math.max(0, numberValue(target.tempHp || 0) - tempAbsorbed),
      hpCurrent: clamp(target.hpCurrent - damage, 0, target.hpMax),
    };
  }

  function changeHp(index, delta) {
    setParty((old) => old.map((p, i) => (i === index ? applyHpDelta(p, delta) : p)));
  }

  function changeEnemyHp(index, delta) {
    setEnemies((old) => old.map((enemy, i) => (i === index ? applyHpDelta(enemy, delta) : enemy)));
  }

  function changeTempHp(index, delta) {
    setParty((old) =>
      old.map((p, i) => (i === index ? { ...p, tempHp: Math.max(0, numberValue(p.tempHp || 0) + delta) } : p))
    );
  }

  function changeEnemyTempHp(index, delta) {
    setEnemies((old) =>
      old.map((enemy, i) =>
        i === index ? { ...enemy, tempHp: Math.max(0, numberValue(enemy.tempHp || 0) + delta) } : enemy
      )
    );
  }

  function changeHpMax(index, delta) {
    setParty((old) =>
      old.map((p, i) => {
        if (i !== index) return p;

        const hpMax = Math.max(1, p.hpMax + delta);
        const hpCurrent = clamp(p.hpCurrent + delta, 0, hpMax);

        return { ...p, hpMax, hpCurrent };
      })
    );
  }

  function setHpMaxManual(index, rawValue) {
    const value = Math.max(1, numberValue(rawValue));

    setParty((old) =>
      old.map((p, i) => {
        if (i !== index) return p;
        return { ...p, hpMax: value, hpCurrent: clamp(p.hpCurrent, 0, value) };
      })
    );
  }

  function toggleCondition(index, conditionId) {
    setParty((old) =>
      old.map((p, i) => {
        if (i !== index) return p;

        const exists = p.conditions.includes(conditionId);

        return {
          ...p,
          conditions: exists
            ? p.conditions.filter((c) => c !== conditionId)
            : [...p.conditions, conditionId],
        };
      })
    );
  }

  function toggleEnemyCondition(index, conditionId) {
    setEnemies((old) =>
      old.map((enemy, i) => {
        if (i !== index) return enemy;

        const conditions = enemy.conditions || [];
        const exists = conditions.includes(conditionId);

        return {
          ...enemy,
          conditions: exists
            ? conditions.filter((c) => c !== conditionId)
            : [...conditions, conditionId],
        };
      })
    );
  }

  function changeCoin(index, coin, delta) {
    setParty((old) =>
      old.map((p, i) => {
        if (i !== index) return p;

        return {
          ...p,
          coins: {
            ...p.coins,
            [coin]: Math.max(0, (p.coins[coin] || 0) + delta),
          },
        };
      })
    );
  }

  function setCoin(index, coin, value) {
    setParty((old) =>
      old.map((p, i) => {
        if (i !== index) return p;
        return { ...p, coins: { ...p.coins, [coin]: Math.max(0, numberValue(value)) } };
      })
    );
  }

  function clearInitiative() {
    setParty((old) => old.map((p) => ({ ...p, initiative: '' })));
    setEnemies((old) => old.map((enemy) => ({ ...enemy, initiative: '' })));
    setRound(1);
    setActiveTurn(0);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.title}>Domhan RPG Companion</Text>
        <Text style={styles.subtitle}>Recursos • Combate • XP • Moedas</Text>

        <View style={styles.summaryRow}>
          <Summary label="Disponíveis" value={`${totals.current}/${totals.max}`} />
          <Summary label="Usados" value={totals.used} />
          <Summary label="PI" value={totals.pi} />
          <Summary label="PE" value={totals.pe} />
        </View>

        <View style={styles.tabs}>
          <TabButton label="Recursos" active={tab === 'resources'} onPress={() => setTab('resources')} />
          <TabButton label="Combate" active={tab === 'combat'} onPress={() => setTab('combat')} />
          <TabButton label="Personagem" active={tab === 'character'} onPress={() => setTab('character')} />
        </View>

        {!!lastAction && <Text style={styles.last}>{lastAction}</Text>}
      </View>

      {tab === 'resources' && (
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.actions}>
            <TouchableOpacity style={[styles.bigButton, styles.short]} onPress={() => rest(RECOVERY.SHORT)}>
              <Text style={styles.bigText}>Descanso Curto Todos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.bigButton, styles.long]} onPress={() => rest(RECOVERY.LONG)}>
              <Text style={styles.bigText}>Descanso Longo Todos</Text>
            </TouchableOpacity>
          </View>

          {party.map((p, playerIndex) => (
            <View key={p.character} style={styles.card}>
              <View style={[styles.bar, { backgroundColor: p.color }]} />

              <Text style={styles.player}>{p.player}</Text>
              <Text style={styles.character}>{p.character}</Text>
              <Text style={styles.build}>{p.build}</Text>

              <View style={styles.actionsMini}>
                <TouchableOpacity style={styles.miniButton} onPress={() => rest(RECOVERY.SHORT, playerIndex)}>
                  <Text style={styles.quickText}>Curto</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.miniButton} onPress={() => rest(RECOVERY.LONG, playerIndex)}>
                  <Text style={styles.quickText}>Longo</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.tokenRow}>
                <Token
                  label="Inspiração"
                  value={p.inspiration}
                  max={3}
                  minus={() => changeToken(playerIndex, 'inspiration', -1)}
                  plus={() => changeToken(playerIndex, 'inspiration', 1)}
                />

                <Token
                  label="Ponto de Enredo"
                  value={p.plot}
                  max={2}
                  minus={() => changeToken(playerIndex, 'plot', -1)}
                  plus={() => changeToken(playerIndex, 'plot', 1)}
                />
              </View>

              {p.resources.map((r, resourceIndex) => (
                <ResourceCard
                  key={r.id}
                  r={r}
                  minus={() => changeResource(playerIndex, resourceIndex, -1)}
                  plus={() => changeResource(playerIndex, resourceIndex, 1)}
                  empty={() => setResource(playerIndex, resourceIndex, 0)}
                  full={() => setResource(playerIndex, resourceIndex, r.max)}
                />
              ))}
            </View>
          ))}

          <TouchableOpacity style={styles.reset} onPress={resetAll}>
            <Text style={styles.resetText}>Resetar app inteiro</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {tab === 'combat' && (
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.combatHeader}>
            <Text style={styles.sectionTitle}>Rodada {round}</Text>
            <TouchableOpacity style={styles.bigButtonDark} onPress={nextTurn}>
              <Text style={styles.bigText}>Próximo Turno</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.resetCombat} onPress={() => { setRound(1); setActiveTurn(0); }}>
              <Text style={styles.resetText}>Resetar Turnos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resetCombat} onPress={clearInitiative}>
              <Text style={styles.resetText}>Limpar Iniciativa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resetCombat} onPress={addEnemy}>
              <Text style={styles.resetText}>+ Adicionar Inimigo</Text>
            </TouchableOpacity>
          </View>

          {initiativeOrder.map((p, orderIndex) => {
            const isActive = orderIndex === activeTurn;
            const originalIndex = p.originalIndex;
            const isEnemy = p.kind === 'enemy';
            const real = isEnemy ? enemies[originalIndex] : party[originalIndex];
            if (!real) return null;

            const name = isEnemy ? real.name : p.character;
            const build = isEnemy ? 'Inimigo' : p.build;
            const hpChange = isEnemy ? changeEnemyHp : changeHp;
            const tempHpChange = isEnemy ? changeEnemyTempHp : changeTempHp;
            const conditionToggle = isEnemy ? toggleEnemyCondition : toggleCondition;
            const updateTarget = isEnemy ? updateEnemy : updateCharacter;

            return (
              <View key={`${isEnemy ? real.id : p.character}-combat`} style={[styles.card, isActive && styles.activeTurn]}>
                <View style={[styles.bar, { backgroundColor: isEnemy ? '#B85450' : p.color }]} />
                <Text style={styles.character}>{isActive ? '▶ ' : ''}{name}</Text>
                <Text style={styles.build}>{build}</Text>

                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>{isEnemy ? 'Nome do inimigo' : 'Iniciativa manual'}</Text>
                  {isEnemy ? (
                    <TextInput
                      style={styles.input}
                      value={String(real.name)}
                      onChangeText={(text) => updateEnemy(originalIndex, { name: text || 'Inimigo' })}
                      placeholder="Nome"
                      placeholderTextColor="#6F7B89"
                    />
                  ) : (
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      value={String(real.initiative)}
                      onChangeText={(text) => updateCharacter(originalIndex, { initiative: text })}
                      placeholder="0"
                      placeholderTextColor="#6F7B89"
                    />
                  )}
                </View>

                {isEnemy && (
                  <View style={styles.inputRow}>
                    <Text style={styles.inputLabel}>Iniciativa</Text>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      value={String(real.initiative)}
                      onChangeText={(text) => updateEnemy(originalIndex, { initiative: text })}
                      placeholder="0"
                      placeholderTextColor="#6F7B89"
                    />
                  </View>
                )}

                <View style={styles.hpBox}>
                  <Text style={styles.resourceName}>PV Atual: {real.hpCurrent}/{real.hpMax}</Text>
                  <Text style={styles.resourceMeta}>PV Temporário: {numberValue(real.tempHp || 0)}</Text>

                  <View style={styles.quickRow}>
                    {[-10, -5, -1, 1, 5, 10].map((value) => (
                      <TouchableOpacity key={value} style={styles.quick} onPress={() => hpChange(originalIndex, value)}>
                        <Text style={styles.quickText}>{value > 0 ? `+${value}` : value}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <View style={styles.quickRow}>
                    {[1, 5, 10].map((value) => (
                      <TouchableOpacity key={`temp-${value}`} style={styles.quick} onPress={() => tempHpChange(originalIndex, value)}>
                        <Text style={styles.quickText}>+{value} Temp</Text>
                      </TouchableOpacity>
                    ))}
                    <TouchableOpacity style={styles.quick} onPress={() => updateTarget(originalIndex, { tempHp: 0 })}>
                      <Text style={styles.quickText}>Zerar Temp</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.quickRow}>
                    <TouchableOpacity style={styles.quick} onPress={() => updateTarget(originalIndex, { hpCurrent: 0 })}>
                      <Text style={styles.quickText}>0 PV</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.quick} onPress={() => updateTarget(originalIndex, { hpCurrent: real.hpMax })}>
                      <Text style={styles.quickText}>Cura Total</Text>
                    </TouchableOpacity>
                    {!isEnemy && (
                      <>
                        <TouchableOpacity style={styles.quick} onPress={() => changeHpMax(originalIndex, 1)}>
                          <Text style={styles.quickText}>+1 PV Máx</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.quick} onPress={() => changeHpMax(originalIndex, -1)}>
                          <Text style={styles.quickText}>-1 PV Máx</Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </View>

                  <View style={styles.inputRow}>
                    <Text style={styles.inputLabel}>Editar PV Máximo</Text>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      value={String(real.hpMax)}
                      onChangeText={(text) => {
                        const value = Math.max(1, numberValue(text));
                        if (isEnemy) {
                          updateEnemy(originalIndex, { hpMax: value, hpCurrent: clamp(real.hpCurrent, 0, value) });
                        } else {
                          setHpMaxManual(originalIndex, text);
                        }
                      }}
                    />
                  </View>

                  {isEnemy && (
                    <TouchableOpacity style={styles.resetCombat} onPress={() => removeEnemy(originalIndex)}>
                      <Text style={styles.resetText}>Remover Inimigo</Text>
                    </TouchableOpacity>
                  )}
                </View>

                <View style={styles.sectionDivider} />

                <Text style={styles.resourceName}>Status rápidos</Text>
                <Text style={styles.helpText}>Toque para ativar/desativar. Segure para ver a regra.</Text>

                <View style={styles.statusWrap}>
                  {CONDITIONS.map((condition) => {
                    const active = (real.conditions || []).includes(condition.id);
                    return (
                      <TouchableOpacity
                        key={condition.id}
                        style={[styles.statusButton, active && styles.statusActive]}
                        onPress={() => conditionToggle(originalIndex, condition.id)}
                        onLongPress={() => setStatusModal(condition)}
                      >
                        <Text style={[styles.statusText, active && styles.statusTextActive]}>
                          {condition.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}

      {tab === 'character' && (
        <ScrollView contentContainerStyle={styles.content}>
          {party.map((p, playerIndex) => {
            const level = getLevelInfo(numberValue(p.xp));
            const features = LEVEL_FEATURES[p.classKey] || [];
            const unlocked = features.filter(([lvl]) => lvl <= level.level);
            const nextFeatures = features.filter(([lvl]) => lvl > level.level).slice(0, 4);

            return (
              <View key={`${p.character}-sheet`} style={styles.card}>
                <View style={[styles.bar, { backgroundColor: p.color }]} />

                <Text style={styles.player}>{p.player}</Text>
                <Text style={styles.character}>{p.character}</Text>
                <Text style={styles.build}>{p.build}</Text>

                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>XP Total vindo da planilha</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={String(p.xp)}
                    onChangeText={(text) => updateCharacter(playerIndex, { xp: numberValue(text) })}
                  />
                </View>

                <Text style={styles.resourceName}>Nível {level.level}</Text>
                <Text style={styles.resourceMeta}>
                  {level.nextXp ? `Próximo: ${level.nextXp} XP • Faltam ${level.missing} XP` : 'Nível máximo'}
                </Text>

                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${level.percent}%` }]} />
                </View>

                <Text style={styles.resourceName}>Habilidades atuais por nível</Text>
                {unlocked.map(([lvl, text]) => (
                  <Text key={`${p.character}-u-${lvl}`} style={styles.featureText}>Nível {lvl}: {text}</Text>
                ))}

                <Text style={styles.resourceName}>Próximos níveis</Text>
                {nextFeatures.map(([lvl, text]) => (
                  <Text key={`${p.character}-n-${lvl}`} style={styles.featureTextMuted}>Nível {lvl}: {text}</Text>
                ))}

                <View style={styles.sectionDivider} />

                <Text style={styles.resourceName}>Moedas individuais</Text>
                <Text style={styles.helpText}>PC cobre • PP prata • PE electro • PO ouro • PL platina</Text>

                {['pc', 'pp', 'pe', 'po', 'pl'].map((coin) => (
                  <View key={`${p.character}-${coin}`} style={styles.coinRow}>
                    <Text style={styles.coinName}>{coin.toUpperCase()}</Text>

                    <View style={styles.coinControls}>
                      <TouchableOpacity style={styles.small} onPress={() => changeCoin(playerIndex, coin, -10)}>
                        <Text style={styles.smallText}>−</Text>
                      </TouchableOpacity>

                      <TextInput
                        style={styles.coinInput}
                        keyboardType="numeric"
                        value={String(p.coins[coin])}
                        onChangeText={(text) => setCoin(playerIndex, coin, text)}
                      />

                      <TouchableOpacity style={styles.small} onPress={() => changeCoin(playerIndex, coin, 10)}>
                        <Text style={styles.smallText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            );
          })}
        </ScrollView>
      )}

      <Modal transparent visible={!!statusModal} animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.character}>{statusModal?.name}</Text>
            <Text style={styles.modalText}>{statusModal?.desc}</Text>

            <TouchableOpacity style={styles.bigButtonDark} onPress={() => setStatusModal(null)}>
              <Text style={styles.bigText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function Summary({ label, value }) {
  return (
    <View style={styles.summary}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

function TabButton({ label, active, onPress }) {
  return (
    <TouchableOpacity style={[styles.tabButton, active && styles.tabActive]} onPress={onPress}>
      <Text style={[styles.tabText, active && styles.tabTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

function Token({ label, value, max, minus, plus }) {
  return (
    <View style={styles.token}>
      <Text style={styles.tokenLabel}>{label}</Text>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.small} onPress={minus}>
          <Text style={styles.smallText}>−</Text>
        </TouchableOpacity>

        <Text style={styles.count}>{value}/{max}</Text>

        <TouchableOpacity style={styles.small} onPress={plus}>
          <Text style={styles.smallText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ResourceCard({ r, minus, plus, empty, full }) {
  return (
    <View style={[styles.resource, r.current === 0 && styles.empty]}>
      <View>
        <Text style={styles.resourceName}>{r.name}</Text>
        <Text style={styles.resourceMeta}>{r.type} • {r.recovery}</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.small} onPress={minus}>
          <Text style={styles.smallText}>−</Text>
        </TouchableOpacity>

        <Text style={[styles.count, r.current === 0 && styles.zero]}>{r.current}/{r.max}</Text>

        <TouchableOpacity style={styles.small} onPress={plus}>
          <Text style={styles.smallText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.quickRow}>
        <TouchableOpacity style={styles.quick} onPress={empty}>
          <Text style={styles.quickText}>Usou</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quick} onPress={full}>
          <Text style={styles.quickText}>Cheio</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#080B10' },
  header: {
    backgroundColor: '#101722',
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#283445',
  },
  title: { color: '#F5D98B', fontSize: 27, fontWeight: '900' },
  subtitle: { color: '#9DA9B8', marginTop: 3 },
  summaryRow: { flexDirection: 'row', gap: 8, marginTop: 14 },
  summary: {
    flex: 1,
    backgroundColor: '#0B1118',
    borderColor: '#263244',
    borderWidth: 1,
    borderRadius: 12,
    padding: 8,
  },
  summaryLabel: { color: '#9DA9B8', fontSize: 10, textAlign: 'center' },
  summaryValue: { color: '#FFF', fontWeight: '900', textAlign: 'center', marginTop: 4 },
  tabs: { flexDirection: 'row', gap: 8, marginTop: 14 },
  tabButton: {
    flex: 1,
    backgroundColor: '#0B1118',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    borderColor: '#263244',
    borderWidth: 1,
  },
  tabActive: { backgroundColor: '#F5D98B' },
  tabText: { color: '#C6CFDA', fontWeight: '800', fontSize: 12 },
  tabTextActive: { color: '#080B10' },
  actions: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  actionsMini: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  miniButton: {
    backgroundColor: '#1A2432',
    borderColor: '#2F3D51',
    borderWidth: 1,
    borderRadius: 9,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  bigButton: { flex: 1, paddingVertical: 13, borderRadius: 14, alignItems: 'center' },
  bigButtonDark: {
    backgroundColor: '#253244',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  short: { backgroundColor: '#315F91' },
  long: { backgroundColor: '#7A4C1D' },
  bigText: { color: '#FFF', fontWeight: '900' },
  last: { color: '#7FB77E', textAlign: 'center', marginTop: 10 },
  content: { padding: 14, paddingBottom: 30 },
  card: {
    backgroundColor: '#121A25',
    borderColor: '#273445',
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    paddingLeft: 18,
    marginBottom: 14,
    overflow: 'hidden',
  },
  activeTurn: { borderColor: '#F5D98B', borderWidth: 2 },
  bar: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 5 },
  player: { color: '#FFF', fontSize: 18, fontWeight: '900' },
  character: { color: '#F5D98B', fontSize: 16, fontWeight: '800', marginTop: 2 },
  build: { color: '#9DA9B8', fontSize: 12, marginTop: 2, marginBottom: 10 },
  tokenRow: { flexDirection: 'row', gap: 10, marginBottom: 8 },
  token: {
    flex: 1,
    backgroundColor: '#0B1118',
    borderColor: '#263244',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
  },
  tokenLabel: { color: '#C6CFDA', fontSize: 11, marginBottom: 8 },
  resource: {
    backgroundColor: '#0B1118',
    borderColor: '#263244',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginTop: 8,
  },
  empty: { borderColor: '#6B2A2A', backgroundColor: '#1A1010' },
  resourceName: { color: '#FFF', fontSize: 14, fontWeight: '800', marginTop: 8 },
  resourceMeta: { color: '#9DA9B8', fontSize: 11, marginTop: 3 },
  controls: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  small: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#253244',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallText: { color: '#FFF', fontSize: 22, fontWeight: '900' },
  count: { color: '#F5D98B', fontWeight: '900', width: 48, textAlign: 'center' },
  zero: { color: '#FF6B6B' },
  quickRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  quick: {
    backgroundColor: '#1A2432',
    borderColor: '#2F3D51',
    borderWidth: 1,
    borderRadius: 9,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  quickText: { color: '#C6CFDA', fontWeight: '800', fontSize: 11 },
  reset: {
    borderColor: '#5B2B2B',
    borderWidth: 1,
    backgroundColor: '#1A1010',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  resetCombat: {
    flex: 1,
    borderColor: '#5B2B2B',
    borderWidth: 1,
    backgroundColor: '#1A1010',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  resetText: { color: '#FFB0B0', fontWeight: '900' },
  combatHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: '900' },
  inputRow: { marginTop: 8 },
  inputLabel: { color: '#C6CFDA', fontSize: 12, marginBottom: 6 },
  input: {
    backgroundColor: '#0B1118',
    borderColor: '#263244',
    borderWidth: 1,
    borderRadius: 10,
    color: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  hpBox: { marginTop: 8 },
  helpText: { color: '#7E8A99', fontSize: 11, marginTop: 4 },
  sectionDivider: { height: 1, backgroundColor: '#263244', marginVertical: 12 },
  statusWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  statusButton: {
    backgroundColor: '#1A2432',
    borderColor: '#2F3D51',
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  statusActive: { backgroundColor: '#F5D98B' },
  statusText: { color: '#C6CFDA', fontSize: 11, fontWeight: '800' },
  statusTextActive: { color: '#080B10' },
  progressBar: {
    height: 10,
    backgroundColor: '#0B1118',
    borderRadius: 999,
    overflow: 'hidden',
    marginTop: 8,
    marginBottom: 12,
  },
  progressFill: { height: '100%', backgroundColor: '#F5D98B' },
  featureText: { color: '#C6CFDA', fontSize: 12, marginTop: 4 },
  featureTextMuted: { color: '#7E8A99', fontSize: 12, marginTop: 4 },
  coinRow: {
    backgroundColor: '#0B1118',
    borderColor: '#263244',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginTop: 8,
  },
  coinName: { color: '#FFF', fontWeight: '900', marginBottom: 6 },
  coinControls: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  coinInput: {
    flex: 1,
    backgroundColor: '#121A25',
    borderColor: '#263244',
    borderWidth: 1,
    borderRadius: 10,
    color: '#F5D98B',
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontWeight: '900',
    textAlign: 'center',
  },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', padding: 24 },
  modalCard: { backgroundColor: '#121A25', borderRadius: 18, padding: 18, borderColor: '#273445', borderWidth: 1 },
  modalText: { color: '#C6CFDA', marginVertical: 14, lineHeight: 20 },
});
