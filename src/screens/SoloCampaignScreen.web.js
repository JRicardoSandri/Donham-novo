import React, { useEffect, useMemo, useRef } from 'react';
import { View } from 'react-native';
import { useCampaign } from '../services/CampaignContext.js';
import {
  characterAttackOptions,
  characterSpellOptions,
  htmlCheckpointsForCharacter,
  upsertHtmlCheckpoint,
  clearHtmlCheckpoint,
} from '../services/soloCampaignService.js';
import { subclassById } from '../data/subclassProgression.js';
import {
  gameTerm,
  itemDescription,
  itemName,
  resourceName,
  spellName,
  spellSummary,
  subclassName,
} from '../services/i18nService.js';

function campaignResourceName(name, language) {
  const localized = resourceName(name, language);
  const translatedSlots = String(language).startsWith('es')
    ? localized.replace(/Spell Slots/g, 'Espacios de conjuro')
    : localized;
  return translatedSlots.replace(/(\d+)[º°]\s*círculo/gi, (_, circle) => {
    if (String(language).startsWith('en')) return `level ${circle}`;
    if (String(language).startsWith('es')) return `nivel ${circle}`;
    return `${circle}º círculo`;
  });
}

function prototypeCharacter(character, soloSessions, language) {
  const subclass = subclassById(character.classKey, character.subclassKey);
  const inventory = (character.inventory || []).map((item) => ({
    ...item,
    name: itemName(item.name, language),
    description: itemDescription(item.description || item.desc || '', language),
    desc: itemDescription(item.desc || item.description || '', language),
  }));
  const resources = (character.resources || []).map((resource) => ({
    ...resource,
    name: campaignResourceName(resource.name, language),
  }));
  const attacks = characterAttackOptions(character, { inventory: character.inventory }).map((attack) => ({
    ...attack,
    name: itemName(attack.name, language),
    damageType: gameTerm(attack.damageType, language),
  }));
  const spells = characterSpellOptions(character).map((spell) => ({
    ...spell,
    name: spellName(spell, language),
    summary: spellSummary(spell, language),
    school: gameTerm(spell.school, language),
    castingTime: gameTerm(spell.castingTime, language),
    range: gameTerm(spell.range, language),
    duration: gameTerm(spell.duration, language),
  }));

  return {
    ...character,
    displayClass: gameTerm(character.classKey, language),
    displayRace: gameTerm(character.race, language),
    displaySubclass: subclass
      ? subclassName(subclass[1], language)
      : subclassName(character.subclassKey, language),
    inventory,
    resources,
    attacks,
    spells,
    _checkpoints: htmlCheckpointsForCharacter(soloSessions, character.id),
  };
}

export default function SoloCampaignScreen({ language = 'pt-BR' }) {
  const { state, setState } = useCampaign();
  const characters = useMemo(() => {
    const activeGroup = state.groups.find((group) => group.id === state.activeGroupId);
    const characterIds = new Set(activeGroup?.characterIds || []);
    return state.characters
      .filter((character) => characterIds.has(character.id))
      .map((character) => prototypeCharacter(character, state.soloSessions, language));
  }, [language, state.activeGroupId, state.characters, state.groups, state.soloSessions]);
  const sourceRef = useRef({ characterSignature: null, value: null });
  const characterSignature = language + '|' + JSON.stringify(
    characters.map(({ _checkpoints, ...character }) => character)
  );
  if (sourceRef.current.characterSignature !== characterSignature) {
    sourceRef.current = {
      characterSignature,
      value: `/o-limiar-combate.html?lang=${encodeURIComponent(language)}#characters=${encodeURIComponent(JSON.stringify(characters))}`,
    };
  }
  const source = sourceRef.current.value;

  useEffect(() => {
    function onMessage(event) {
      const data = event.data;
      if (!data || typeof data !== 'object') return;
      if (data.type === 'rpgct-checkpoint' && data.characterId) {
        setState((old) => ({
          ...old,
          soloSessions: upsertHtmlCheckpoint(
            old.soloSessions,
            data.characterId,
            data.checkpoint,
            data.adventureId
          ),
        }));
      } else if (data.type === 'rpgct-clear-checkpoint' && data.characterId) {
        setState((old) => ({
          ...old,
          soloSessions: clearHtmlCheckpoint(
            old.soloSessions,
            data.characterId,
            data.adventureId
          ),
        }));
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [setState]);

  return (
    <View style={{ flex: 1, backgroundColor: '#08090C' }}>
      <iframe
        src={source}
        title="Campanhas solo"
        style={{
          width: '100%',
          height: '100%',
          border: 0,
          background: '#08090C',
        }}
      />
    </View>
  );
}
