import { RECOVERY } from './classProgression.js';

const abilityMod = (character, key) =>
  Math.floor(((Number(character.attributes?.[key]) || 10) - 10) / 2);

const byProficiency = (_level, proficiency) => proficiency;
const byWisdom = (_level, _proficiency, character) => Math.max(1, abilityMod(character, 'wisdom'));
const byStrength = (_level, _proficiency, character) => Math.max(1, abilityMod(character, 'strength'));

export const SUBCLASS_OPTIONS = {
  Barbaro: [
    ['berserker', 'Caminho do Furioso'],
    ['totem-warrior', 'Caminho do Guerreiro Totemico'],
    ['ancestral-guardian', 'Guardiao Ancestral'],
    ['storm-herald', 'Arauto da Tempestade'],
    ['zealot', 'Zelote'],
    ['beast', 'Caminho da Fera'],
    ['wild-magic-barbarian', 'Magia Selvagem'],
  ],
  Bardo: [
    ['lore', 'Colegio do Saber'],
    ['valor', 'Colegio do Valor'],
    ['glamour', 'Colegio do Glamour'],
    ['swords', 'Colegio das Espadas'],
    ['whispers', 'Colegio dos Sussurros'],
    ['creation', 'Colegio da Criacao'],
    ['eloquence', 'Colegio da Eloquencia'],
  ],
  Bruxo: [
    ['archfey', 'Arquifada'],
    ['fiend', 'Infernal'],
    ['great-old-one', 'Grande Antigo'],
    ['celestial', 'Celestial'],
    ['hexblade', 'Lamina Maldita'],
    ['fathomless', 'Abissal'],
    ['genie', 'Genio'],
  ],
  Clerigo: [
    ['knowledge-domain', 'Dominio do Conhecimento'],
    ['life-domain', 'Dominio da Vida'],
    ['light-domain', 'Dominio da Luz'],
    ['nature-domain', 'Dominio da Natureza'],
    ['tempest-domain', 'Dominio da Tempestade'],
    ['trickery-domain', 'Dominio da Enganacao'],
    ['war-domain', 'Dominio da Guerra'],
    ['arcana-domain', 'Dominio Arcano'],
    ['forge-domain', 'Dominio da Forja'],
    ['grave-domain', 'Dominio da Sepultura'],
  ],
  Druida: [
    ['land-circle', 'Circulo da Terra'],
    ['moon-circle', 'Circulo da Lua'],
    ['dreams-circle', 'Circulo dos Sonhos'],
    ['shepherd-circle', 'Circulo do Pastor'],
    ['stars-circle', 'Circulo das Estrelas'],
    ['wildfire-circle', 'Circulo do Fogo Selvagem'],
  ],
  Feiticeiro: [
    ['draconic-bloodline', 'Linhagem Draconica'],
    ['wild-magic-sorcerer', 'Magia Selvagem'],
    ['divine-soul', 'Alma Divina'],
    ['shadow-magic', 'Magia das Sombras'],
    ['storm-sorcery', 'Feiticaria da Tempestade'],
    ['aberrant-mind', 'Mente Aberrante'],
    ['clockwork-soul', 'Alma Mecanica'],
  ],
  Guerreiro: [
    ['champion', 'Campeao'],
    ['battle-master', 'Mestre de Batalha'],
    ['eldritch-knight', 'Cavaleiro Arcano'],
    ['arcane-archer', 'Arqueiro Arcano'],
    ['cavalier', 'Cavaleiro'],
    ['samurai', 'Samurai'],
    ['rune-knight', 'Cavaleiro Runico'],
    ['psi-warrior', 'Guerreiro Psiquico'],
  ],
  Ladino: [
    ['thief', 'Ladrao'],
    ['assassin', 'Assassino'],
    ['arcane-trickster', 'Trapaceiro Arcano'],
    ['inquisitive', 'Inquisitivo'],
    ['mastermind', 'Mestre Estrategista'],
    ['scout', 'Batedor'],
    ['swashbuckler', 'Espadachim'],
    ['soulknife', 'Lamina da Alma'],
    ['phantom', 'Fantasma'],
  ],
  Mago: [
    ['abjuration-school', 'Escola de Abjuracao'],
    ['conjuration-school', 'Escola de Conjuracao'],
    ['divination-school', 'Escola de Adivinhacao'],
    ['enchantment-school', 'Escola de Encantamento'],
    ['evocation-school', 'Escola de Evocacao'],
    ['illusion-school', 'Escola de Ilusao'],
    ['necromancy-school', 'Escola de Necromancia'],
    ['transmutation-school', 'Escola de Transmutacao'],
    ['bladesinging', 'Lamina Cantante'],
    ['war-magic', 'Magia de Guerra'],
  ],
  Monge: [
    ['open-hand', 'Mao Aberta'],
    ['shadow', 'Sombra'],
    ['four-elements', 'Quatro Elementos'],
    ['drunken-master', 'Mestre Bebado'],
    ['kensei', 'Kensei'],
    ['sun-soul', 'Alma Solar'],
    ['mercy', 'Misericordia'],
    ['astral-self', 'Eu Astral'],
  ],
  Paladino: [
    ['devotion-oath', 'Juramento da Devocao'],
    ['ancients-oath', 'Juramento dos Antigos'],
    ['vengeance-oath', 'Juramento da Vinganca'],
    ['crown-oath', 'Juramento da Coroa'],
    ['conquest-oath', 'Juramento da Conquista'],
    ['redemption-oath', 'Juramento da Redencao'],
  ],
  Patrulheiro: [
    ['hunter', 'Cacador'],
    ['beast-master', 'Mestre das Feras'],
    ['gloom-stalker', 'Espreitador Sombrio'],
    ['horizon-walker', 'Andarilho do Horizonte'],
    ['monster-slayer', 'Matador de Monstros'],
    ['fey-wanderer', 'Andarilho Feerico'],
    ['swarmkeeper', 'Guardiao do Enxame'],
    ['drakewarden', 'Guardiao Draconico'],
  ],
};

SUBCLASS_OPTIONS['BÃ¡rbaro'] = SUBCLASS_OPTIONS.Barbaro;
SUBCLASS_OPTIONS['Bárbaro'] = SUBCLASS_OPTIONS.Barbaro;
SUBCLASS_OPTIONS['ClÃ©rigo'] = SUBCLASS_OPTIONS.Clerigo;
SUBCLASS_OPTIONS['Clérigo'] = SUBCLASS_OPTIONS.Clerigo;

export const SUBCLASS_RESOURCES = {
  glamour: [
    { id: 'sub-enthralling-performance', name: 'Performance Fascinante', unlock: 3, recovery: RECOVERY.SHORT, max: () => 1 },
    { id: 'sub-mantle-majesty', name: 'Manto de Majestade', unlock: 6, recovery: RECOVERY.LONG, max: () => 1 },
  ],
  whispers: [
    { id: 'sub-words-terror', name: 'Palavras de Terror', unlock: 3, recovery: RECOVERY.SHORT, max: () => 1 },
  ],
  archfey: [
    { id: 'sub-fey-presence', name: 'Presenca Feerica', unlock: 1, recovery: RECOVERY.SHORT, max: () => 1 },
    { id: 'sub-misty-escape', name: 'Fuga Nebulosa', unlock: 6, recovery: RECOVERY.SHORT, max: () => 1 },
    { id: 'sub-dark-delirium', name: 'Delirio Sombrio', unlock: 14, recovery: RECOVERY.SHORT, max: () => 1 },
  ],
  fiend: [
    { id: 'sub-dark-one-luck', name: 'Sorte do Obscuro', unlock: 6, recovery: RECOVERY.SHORT, max: () => 1 },
  ],
  'great-old-one': [
    { id: 'sub-entropic-ward', name: 'Protecao Entropica', unlock: 6, recovery: RECOVERY.SHORT, max: () => 1 },
  ],
  celestial: [
    { id: 'sub-healing-light', name: 'Luz Curativa', unlock: 1, recovery: RECOVERY.LONG, max: (level) => level + 1 },
  ],
  hexblade: [
    { id: 'sub-hexblades-curse', name: 'Maldicao da Lamina', unlock: 1, recovery: RECOVERY.SHORT, max: () => 1 },
  ],
  'war-domain': [
    { id: 'sub-war-priest', name: 'Sacerdote da Guerra', unlock: 1, recovery: RECOVERY.LONG, max: byWisdom },
  ],
  'land-circle': [
    { id: 'sub-natural-recovery', name: 'Recuperacao Natural', unlock: 2, recovery: RECOVERY.LONG, max: () => 1 },
  ],
  'dreams-circle': [
    { id: 'sub-balm-summer-court', name: 'Balsamo da Corte do Verao', unlock: 2, recovery: RECOVERY.LONG, max: (level) => level },
  ],
  'shepherd-circle': [
    { id: 'sub-spirit-totem', name: 'Totem Espiritual', unlock: 2, recovery: RECOVERY.SHORT, max: () => 1 },
  ],
  'wild-magic-sorcerer': [
    { id: 'sub-tides-chaos', name: 'Mares do Caos', unlock: 1, recovery: RECOVERY.LONG, max: () => 1 },
  ],
  'divine-soul': [
    { id: 'sub-favored-gods', name: 'Favorecido pelos Deuses', unlock: 1, recovery: RECOVERY.SHORT, max: () => 1 },
  ],
  'shadow-magic': [
    { id: 'sub-strength-grave', name: 'Forca do Tumulo', unlock: 1, recovery: RECOVERY.LONG, max: () => 1 },
  ],
  'battle-master': [
    { id: 'sub-superiority-dice', name: 'Dados de Superioridade', unlock: 3, recovery: RECOVERY.SHORT, max: (level) => (level < 7 ? 4 : level < 15 ? 5 : 6) },
  ],
  'arcane-archer': [
    { id: 'sub-arcane-shot', name: 'Tiro Arcano', unlock: 3, recovery: RECOVERY.SHORT, max: () => 2 },
  ],
  cavalier: [
    { id: 'sub-unwavering-mark', name: 'Marca Inabalavel', unlock: 3, recovery: RECOVERY.LONG, max: byStrength },
  ],
  samurai: [
    { id: 'sub-fighting-spirit', name: 'Espirito de Luta', unlock: 3, recovery: RECOVERY.LONG, max: () => 3 },
  ],
  'rune-knight': [
    { id: 'sub-giants-might', name: 'Poder do Gigante', unlock: 3, recovery: RECOVERY.LONG, max: byProficiency },
  ],
  'psi-warrior': [
    { id: 'sub-psionic-energy-fighter', name: 'Dados de Energia Psionica', unlock: 3, recovery: RECOVERY.LONG, max: (_level, proficiency) => proficiency * 2 },
  ],
  'soulknife': [
    { id: 'sub-psionic-energy-rogue', name: 'Dados de Energia Psionica', unlock: 3, recovery: RECOVERY.LONG, max: (_level, proficiency) => proficiency * 2 },
  ],
  'divination-school': [
    { id: 'sub-portent', name: 'Portento', unlock: 2, recovery: RECOVERY.LONG, max: (level) => (level >= 14 ? 3 : 2) },
  ],
  bladesinging: [
    { id: 'sub-bladesong', name: 'Cancao da Lamina', unlock: 2, recovery: RECOVERY.SHORT, max: () => 2 },
  ],
  'monster-slayer': [
    { id: 'sub-hunters-sense', name: 'Sentido do Cacador', unlock: 3, recovery: RECOVERY.LONG, max: byWisdom },
  ],
  drakewarden: [
    { id: 'sub-drake-companion', name: 'Companheiro Draconico', unlock: 3, recovery: RECOVERY.LONG, max: byProficiency },
  ],
};

export function subclassUnlockLevel(classKey) {
  if (['Bruxo', 'Clerigo', 'Clérigo', 'Feiticeiro'].includes(classKey)) return 1;
  if (['Druida', 'Mago'].includes(classKey)) return 2;
  return 3;
}

export function subclassesForClass(classKey) {
  return SUBCLASS_OPTIONS[classKey] || [];
}

export function subclassById(classKey, subclassId) {
  return subclassesForClass(classKey).find(([id]) => id === subclassId) || null;
}

export function subclassResourcesFor(character, level, proficiency) {
  return (SUBCLASS_RESOURCES[character.subclassKey] || [])
    .filter((resource) => level >= resource.unlock)
    .map((resource) => ({
      ...resource,
      max: resource.max(level, proficiency, character),
    }));
}

export const ALL_SUBCLASS_RESOURCE_IDS = new Set(
  Object.values(SUBCLASS_RESOURCES).flatMap((items) => items.map((resource) => resource.id))
);

export const ALL_SUBCLASS_RESOURCE_NAMES = new Set(
  Object.values(SUBCLASS_RESOURCES)
    .flatMap((items) => items.map((resource) => String(resource.name || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()))
);
