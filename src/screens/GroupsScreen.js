import React, { useMemo, useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ATTRIBUTE_FIELDS, CLASSES } from '../data/dnd5e';
import { progressionFor } from '../data/classFeatures';
import { RACE_OPTIONS, raceProgressionFor } from '../data/raceProgression';
import { subclassById, subclassesForClass } from '../data/subclassProgression';
import { createCharacter } from '../models/Character';
import { createGroup } from '../models/Group';
import { useCampaign } from '../services/CampaignContext';
import { gameTerm, tr } from '../services/i18nService';
import {
  abilityModifier,
  carryingCapacity,
  initiativeFromAttributes,
  proficiencyBonus,
  signedModifier,
  xpProgress,
} from '../services/rulesService';
import { colors, radii, spacing } from '../theme';

const EMPTY_CHARACTER = {
  name: '',
  player: '',
  classKey: 'Guerreiro',
  subclassKey: null,
  race: '',
  xp: '0',
  background: '',
  alignment: '',
  armorClass: '10',
  speed: '9',
  initiative: '',
  size: 'medium',
  hp: { current: '1', max: '1', temporary: '0' },
  inspiration: 0,
  plotPoints: 0,
  attributes: {
    strength: '10',
    dexterity: '10',
    constitution: '10',
    intelligence: '10',
    wisdom: '10',
    charisma: '10',
  },
};

export default function GroupsScreen({ language = 'pt-BR' }) {
  const { state, setState, saveError } = useCampaign();
  const tt = (text, values = {}) => tr(text, language, values);
  const term = (value) => gameTerm(value, language);
  const [groupName, setGroupName] = useState('');
  const [editingGroup, setEditingGroup] = useState(null);
  const [characterDraft, setCharacterDraft] = useState(null);

  const activeGroup = state?.groups.find((group) => group.id === state.activeGroupId) || null;
  const groupCharacters = useMemo(() => {
    if (!activeGroup) return [];
    return activeGroup.characterIds
      .map((id) => state.characters.find((character) => character.id === id))
      .filter(Boolean);
  }, [activeGroup, state?.characters]);
  const availableCharacters = useMemo(() => {
    if (!activeGroup) return [];
    return state.characters.filter((character) => !activeGroup.characterIds.includes(character.id));
  }, [activeGroup, state?.characters]);

  function addGroup() {
    const name = groupName.trim();
    if (!name) return;
    const group = createGroup({ name });
    setState((old) => ({
      ...old,
      groups: [...old.groups, group],
      activeGroupId: group.id,
    }));
    setGroupName('');
  }

  function saveGroupName() {
    if (!editingGroup?.name.trim()) return;
    setState((old) => ({
      ...old,
      groups: old.groups.map((group) =>
        group.id === editingGroup.id
          ? { ...group, name: editingGroup.name.trim(), updatedAt: new Date().toISOString() }
          : group
      ),
    }));
    setEditingGroup(null);
  }

  function removeGroup(group) {
    Alert.alert(tt('Remover grupo?'), tt('Os personagens de "{name}" continuarão salvos.', { name: group.name }), [
      { text: tt('Cancelar'), style: 'cancel' },
      {
        text: tt('Remover'),
        style: 'destructive',
        onPress: () =>
          setState((old) => ({
            ...old,
            groups: old.groups.filter((item) => item.id !== group.id),
            activeGroupId: old.activeGroupId === group.id ? null : old.activeGroupId,
          })),
      },
    ]);
  }

  function openCharacter(character = null) {
    setCharacterDraft(
      character
        ? {
            ...character,
            xp: String(character.xp),
            armorClass: String(character.armorClass ?? 10),
            speed: String(character.speed ?? 9),
            initiative: String(character.initiative ?? 0),
            size: character.size || 'medium',
            hp: {
              current: String(character.hp?.current ?? 1),
              max: String(character.hp?.max ?? 1),
              temporary: String(character.hp?.temporary ?? 0),
            },
            attributes: Object.fromEntries(
              ATTRIBUTE_FIELDS.map(([key]) => [key, String(character.attributes?.[key] ?? 10)])
            ),
          }
        : { ...EMPTY_CHARACTER, attributes: { ...EMPTY_CHARACTER.attributes } }
    );
  }

  function saveCharacter() {
    if (!activeGroup || !characterDraft?.name.trim()) return;
    const character = createCharacter(characterDraft);

    setState((old) => {
      const exists = old.characters.some((item) => item.id === character.id);
      return {
        ...old,
        characters: exists
          ? old.characters.map((item) => (item.id === character.id ? character : item))
          : [...old.characters, character],
        groups: old.groups.map((group) =>
          group.id === activeGroup.id && !group.characterIds.includes(character.id)
            ? { ...group, characterIds: [...group.characterIds, character.id] }
            : group
        ),
        combats: old.combats.map((combat) => ({
          ...combat,
          participants: combat.participants.map((participant) =>
            participant.sourceId === character.id
              ? {
                  ...participant,
                  name: character.name,
                  armorClass: character.armorClass,
                  hp: { ...character.hp },
                  conditions: [...character.conditions],
                }
              : participant
          ),
        })),
      };
    });
    setCharacterDraft(null);
  }

  function removeCharacterFromGroup(character) {
    setState((old) => ({
      ...old,
      groups: old.groups.map((group) =>
        group.id === activeGroup.id
          ? { ...group, characterIds: group.characterIds.filter((id) => id !== character.id) }
          : group
      ),
    }));
  }

  function addExistingCharacter(character) {
    setState((old) => ({
      ...old,
      groups: old.groups.map((group) =>
        group.id === activeGroup.id
          ? { ...group, characterIds: [...group.characterIds, character.id] }
          : group
      ),
    }));
  }

  function changeToken(characterId, key, delta) {
    setState((old) => ({
      ...old,
      characters: old.characters.map((character) =>
        character.id === characterId
          ? { ...character, [key]: Math.max(0, Math.min(10, (Number(character[key]) || 0) + delta)) }
          : character
      ),
    }));
  }

  function deleteCharacter(character) {
    Alert.alert(
      tt('Excluir personagem?'),
      tt('Isso remove "{name}" de todos os grupos e combates. Essa ação não pode ser desfeita.', { name: character.name }),
      [
        { text: tt('Cancelar'), style: 'cancel' },
        {
          text: tt('Excluir'),
          style: 'destructive',
          onPress: () =>
            setState((old) => ({
              ...old,
              characters: old.characters.filter((item) => item.id !== character.id),
              groups: old.groups.map((group) => ({
                ...group,
                characterIds: group.characterIds.filter((id) => id !== character.id),
              })),
              combats: old.combats.map((combat) => ({
                ...combat,
                participants: combat.participants.filter((participant) => participant.sourceId !== character.id),
                activeIndex: 0,
                turnsTaken: 0,
              })),
            })),
        },
      ]
    );
  }

  if (!state) return <Text style={styles.loading}>{tt('Carregando campanhas...')}</Text>;

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>{tt('RPG COMPANION')}</Text>
        <Text style={styles.title}>{tt('Suas campanhas')}</Text>
        <Text style={styles.subtitle}>{tt('Organize grupos e personagens sem prender o app a uma única mesa.')}</Text>
        {saveError && (
          <View style={styles.warning}>
            <Text style={styles.warningText}>{tt('Não foi possível salvar os dados neste dispositivo. Tente novamente antes de fechar o app.')}</Text>
          </View>
        )}

        <View style={styles.createRow}>
          <TextInput
            style={styles.inputGrow}
            value={groupName}
            onChangeText={setGroupName}
            placeholder={tt('Nome do novo grupo')}
            placeholderTextColor={colors.textMuted}
          />
          <TouchableOpacity style={styles.primaryButton} onPress={addGroup}>
            <Text style={styles.primaryText}>{tt('Criar')}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.groupStrip}>
          {state.groups.map((group) => {
            const active = group.id === state.activeGroupId;
            return (
              <TouchableOpacity
                key={group.id}
                style={[styles.groupChip, active && styles.groupChipActive]}
                onPress={() => setState((old) => ({ ...old, activeGroupId: group.id }))}
                onLongPress={() => setEditingGroup({ ...group })}
              >
                <Text style={[styles.groupChipText, active && styles.groupChipTextActive]}>{group.name}</Text>
                <Text style={styles.groupCount}>{group.characterIds.length} personagens</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {!activeGroup ? (
          <View style={styles.emptyCard}>
            <Text style={styles.cardTitle}>{tt('Crie seu primeiro grupo')}</Text>
            <Text style={styles.muted}>{tt('Depois você poderá adicionar personagens e preparar o combate.')}</Text>
          </View>
        ) : (
          <>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>{activeGroup.name}</Text>
                <Text style={styles.muted}>{tt('Segure o cartão do grupo para editar o nome.')}</Text>
              </View>
              <TouchableOpacity style={styles.smallDanger} onPress={() => removeGroup(activeGroup)}>
                <Text style={styles.dangerText}>{tt('Remover')}</Text>
              </TouchableOpacity>
            </View>

            {groupCharacters.map((character) => {
              const progress = xpProgress(character.xp);
              const level = progress.level;
              const progression = progressionFor(character.classKey, level);
              const raceProgression = raceProgressionFor(character.race, level);
              const subclass = subclassById(character.classKey, character.subclassKey);
              const classLabel = subclass ? `${term(character.classKey)} (${subclass[1]})` : term(character.classKey);
              const initiative = character.initiative ?? initiativeFromAttributes(character.attributes);
              const capacity = carryingCapacity(character.attributes, character.size);
              return (
                <View key={character.id} style={styles.characterCard}>
                  <View style={styles.characterHeader}>
                    <View style={styles.flex}>
                      <Text style={styles.cardTitle}>{character.name}</Text>
                      <Text style={styles.muted}>
                        {character.race ? term(character.race) : tt('Raça não informada')} · {classLabel} {tt('Nível')} {level}
                      </Text>
                      <Text style={styles.muted}>{tt('Jogador')}: {character.player || tt('Não informado')}</Text>
                      {subclass && <Text style={styles.muted}>{tt('Subclasse')}: {subclass[1]}</Text>}
                    </View>
                    <View style={styles.levelBadge}>
                      <Text style={styles.levelLabel}>{tt('NÍVEL')}</Text>
                      <Text style={styles.levelValue}>{level}</Text>
                    </View>
                  </View>

                  <View style={styles.statsRow}>
                    <Stat label="Prof." value={signedModifier(proficiencyBonus(level))} />
                    <Stat label={tt('Iniciativa')} value={signedModifier(initiative)} />
                    <Stat label="CA" value={character.armorClass || 10} />
                    <Stat label={tt('Desloc.')} value={`${character.speed || 9} m`} />
                  </View>
                  <View style={styles.statsRow}>
                    <Stat label={tt('PV')} value={`${character.hp?.current || 0}/${character.hp?.max || 1}`} />
                    <Stat label={tt('Temp.')} value={character.hp?.temporary || 0} />
                    <Stat label={tt('Carga')} value={`${capacity} kg`} />
                    <Stat label="XP" value={character.xp} />
                  </View>

                  <View style={styles.progressHeader}>
                    <Text style={styles.muted}>
                      {progress.nextXp
                        ? `${tt('Próximo nível')}: ${progress.nextXp} XP · ${tt('faltam')} ${progress.missing}`
                        : tt('Nível máximo')}
                    </Text>
                    <Text style={styles.progressPercent}>{progress.percent}%</Text>
                  </View>
                  <View style={styles.progressTrack}>
                    <View style={[styles.progressFill, { width: `${progress.percent}%` }]} />
                  </View>

                  {progression.unlocked.length > 0 && (
                    <View style={styles.featurePanel}>
                      <Text style={styles.featureTitle}>{tt('Habilidades por nível')}</Text>
                      {progression.unlocked.map(([featureLevel, text]) => (
                        <Text key={`${character.id}-feature-${featureLevel}`} style={styles.featureText}>
                          {tt('Nível')} {featureLevel}: {language === 'pt-BR' ? text : tt('Class feature unlocked. Check rules for details.')}
                        </Text>
                      ))}
                      {progression.upcoming.length > 0 && (
                        <Text style={styles.nextFeature}>
                          {tt('Próximo')}: {tt('Nível')} {progression.upcoming[0][0]} · {language === 'pt-BR' ? progression.upcoming[0][1] : tt('Next class feature. Check rules for details.')}
                        </Text>
                      )}
                    </View>
                  )}

                  {raceProgression.unlocked.length > 0 && (
                    <View style={styles.featurePanel}>
                      <Text style={styles.featureTitle}>{tt('Habilidades raciais')}</Text>
                      {raceProgression.unlocked.map(([featureLevel, text]) => (
                        <Text key={`${character.id}-race-${featureLevel}`} style={styles.featureText}>
                          {tt('Nível')} {featureLevel}: {language === 'pt-BR' ? text : tt('Racial trait unlocked. Check rules for details.')}
                        </Text>
                      ))}
                      {raceProgression.upcoming.length > 0 && (
                        <Text style={styles.nextFeature}>
                          {tt('Próximo')}: {tt('Nível')} {raceProgression.upcoming[0][0]} · {language === 'pt-BR' ? raceProgression.upcoming[0][1] : tt('Next racial trait. Check rules for details.')}
                        </Text>
                      )}
                    </View>
                  )}

                  <View style={styles.tokenRow}>
                    <TokenCounter
                      label={tt('Inspiração')}
                      value={character.inspiration || 0}
                      onMinus={() => changeToken(character.id, 'inspiration', -1)}
                      onPlus={() => changeToken(character.id, 'inspiration', 1)}
                    />
                    <TokenCounter
                      label={tt('Pontos de Enredo')}
                      value={character.plotPoints || 0}
                      onMinus={() => changeToken(character.id, 'plotPoints', -1)}
                      onPlus={() => changeToken(character.id, 'plotPoints', 1)}
                    />
                  </View>

                  <View style={styles.actions}>
                    <TouchableOpacity style={styles.secondaryButton} onPress={() => openCharacter(character)}>
                      <Text style={styles.secondaryText}>{tt('Editar ficha')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.secondaryButton} onPress={() => removeCharacterFromGroup(character)}>
                      <Text style={styles.dangerText}>{tt('Remover do grupo')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => deleteCharacter(character)}>
                      <Text style={styles.deleteText}>{tt('Excluir personagem')}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}

            <TouchableOpacity style={styles.primaryWide} onPress={() => openCharacter()}>
              <Text style={styles.primaryText}>{tt('Adicionar personagem')}</Text>
            </TouchableOpacity>

            {availableCharacters.length > 0 && (
              <View style={styles.availableSection}>
                <Text style={styles.cardTitle}>{tt('Personagens disponíveis')}</Text>
                <Text style={styles.muted}>{tt('Adicione ao grupo personagens que já foram criados.')}</Text>
                {availableCharacters.map((character) => (
                  <TouchableOpacity
                    key={`available-${character.id}`}
                    style={styles.availableCharacter}
                    onPress={() => addExistingCharacter(character)}
                  >
                    <View style={styles.flex}>
                      <Text style={styles.secondaryText}>{character.name}</Text>
                      <Text style={styles.muted}>{term(character.classKey)} · {character.player || tt('Sem jogador')}</Text>
                    </View>
                    <Text style={styles.addText}>{tt('+ Adicionar')}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </>
        )}

      </ScrollView>

      <GroupModal draft={editingGroup} language={language} onChange={setEditingGroup} onSave={saveGroupName} onClose={() => setEditingGroup(null)} />
      <CharacterModal
        draft={characterDraft}
        language={language}
        onChange={setCharacterDraft}
        onSave={saveCharacter}
        onClose={() => setCharacterDraft(null)}
      />
    </View>
  );
}

function Stat({ label, value }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

function TokenCounter({ label, value, onMinus, onPlus }) {
  return (
    <View style={styles.token}>
      <Text style={styles.tokenLabel}>{label}</Text>
      <View style={styles.tokenControls}>
        <TouchableOpacity style={styles.tokenButton} onPress={onMinus}>
          <Text style={styles.tokenButtonText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.tokenValue}>{value}/10</Text>
        <TouchableOpacity style={styles.tokenButton} onPress={onPlus}>
          <Text style={styles.tokenButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function GroupModal({ draft, language, onChange, onSave, onClose }) {
  const tt = (text, values = {}) => tr(text, language, values);
  return (
    <Modal visible={Boolean(draft)} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalCard}>
          <Text style={styles.sectionTitle}>{tt('Editar grupo')}</Text>
          <TextInput
            style={styles.input}
            value={draft?.name || ''}
            onChangeText={(name) => onChange((old) => ({ ...old, name }))}
            placeholder={tt('Nome do grupo')}
            placeholderTextColor={colors.textMuted}
          />
          <ModalActions language={language} onClose={onClose} onSave={onSave} />
        </View>
      </View>
    </Modal>
  );
}

function CharacterModal({ draft, language, onChange, onSave, onClose }) {
  const tt = (text, values = {}) => tr(text, language, values);
  const term = (value) => gameTerm(value, language);
  const [racePickerOpen, setRacePickerOpen] = useState(false);
  const [raceQuery, setRaceQuery] = useState('');
  const update = (patch) => onChange((old) => ({ ...old, ...patch }));
  const updateAttribute = (key, value) =>
    onChange((old) => ({ ...old, attributes: { ...old.attributes, [key]: value } }));

  return (
    <Modal visible={Boolean(draft)} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.sheet}>
          <ScrollView contentContainerStyle={styles.sheetContent}>
            <Text style={styles.sectionTitle}>{draft?.id ? tt('Editar personagem') : tt('Novo personagem')}</Text>
            <Field label={tt('Nome')} value={draft?.name} onChangeText={(name) => update({ name })} />
            <Field label={tt('Jogador')} value={draft?.player} onChangeText={(player) => update({ player })} />
            <Text style={styles.fieldLabel}>{tt('Ra\u00e7a')}</Text>
            <TouchableOpacity style={styles.selectInput} onPress={() => setRacePickerOpen(true)}>
              <Text style={draft?.race ? styles.selectText : styles.selectPlaceholder}>
                {draft?.race ? term(draft.race) : tt('Escolher ra\u00e7a')}
              </Text>
              <Text style={styles.selectArrow}>⌄</Text>
            </TouchableOpacity>
            <Field label="XP" value={draft?.xp} keyboardType="numeric" onChangeText={(xp) => update({ xp })} />
            <Field label={tt('Antecedente')} value={draft?.background} onChangeText={(background) => update({ background })} />
            <Field label={tt('Alinhamento')} value={draft?.alignment} onChangeText={(alignment) => update({ alignment })} />
            <View style={styles.fieldRow}>
              <View style={styles.flex}>
                <Field label="CA" value={draft?.armorClass} keyboardType="numeric" onChangeText={(armorClass) => update({ armorClass })} />
              </View>
              <View style={styles.flex}>
                <Field label={tt('Deslocamento (m)')} value={draft?.speed} keyboardType="numeric" onChangeText={(speed) => update({ speed })} />
              </View>
              <View style={styles.flex}>
                <Field label={tt('Mod. iniciativa')} value={draft?.initiative} keyboardType="numeric" onChangeText={(initiative) => update({ initiative })} />
              </View>
            </View>
            <Text style={styles.fieldLabel}>{tt('Porte')}</Text>
            <View style={styles.sizeRow}>
              {[
                ['medium', tt('Médio · FOR × 7,5 kg')],
                ['large', tt('Grande · FOR × 15 kg')],
              ].map(([size, label]) => (
                <TouchableOpacity
                  key={size}
                  style={[styles.sizeButton, draft?.size === size && styles.sizeButtonActive]}
                  onPress={() => update({ size })}
                >
                  <Text style={[styles.sizeText, draft?.size === size && styles.sizeTextActive]}>{label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.fieldLabel}>{tt('Pontos de Vida')}</Text>
            <View style={styles.fieldRow}>
              <View style={styles.flex}>
                <Field label={tt('Atual')} value={draft?.hp?.current} keyboardType="numeric" onChangeText={(current) => update({ hp: { ...draft.hp, current } })} />
              </View>
              <View style={styles.flex}>
                <Field label={tt('M\u00e1ximo')} value={draft?.hp?.max} keyboardType="numeric" onChangeText={(max) => update({ hp: { ...draft.hp, max } })} />
              </View>
              <View style={styles.flex}>
                <Field label={tt('Tempor\u00e1rio')} value={draft?.hp?.temporary} keyboardType="numeric" onChangeText={(temporary) => update({ hp: { ...draft.hp, temporary } })} />
              </View>
            </View>

            <Text style={styles.fieldLabel}>{tt('Classe')}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.classStrip}>
              {CLASSES.map((classKey) => (
                <TouchableOpacity
                  key={classKey}
                  style={[styles.classChip, draft?.classKey === classKey && styles.classChipActive]}
                  onPress={() => update({ classKey, subclassKey: null })}
                >
                  <Text style={[styles.classText, draft?.classKey === classKey && styles.classTextActive]}>{term(classKey)}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {subclassesForClass(draft?.classKey).length > 0 && (
              <>
                <Text style={styles.fieldLabel}>{tt('Subclasse')}</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.classStrip}>
                  {subclassesForClass(draft?.classKey).map(([subclassId, subclassName]) => (
                    <TouchableOpacity
                      key={subclassId}
                      style={[styles.classChip, draft?.subclassKey === subclassId && styles.classChipActive]}
                      onPress={() => update({ subclassKey: subclassId })}
                    >
                      <Text style={[styles.classText, draft?.subclassKey === subclassId && styles.classTextActive]}>{subclassName}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </>
            )}

            <Text style={styles.fieldLabel}>{tt('Atributos')}</Text>
            <View style={styles.attributeGrid}>
              {ATTRIBUTE_FIELDS.map(([key, label]) => {
                const modifier = abilityModifier(draft?.attributes?.[key] ?? 10);
                return (
                  <View key={key} style={styles.attributeCard}>
                    <Text style={styles.attributeLabel}>{term(label)}</Text>
                    <TextInput
                      style={styles.attributeInput}
                      keyboardType="numeric"
                      value={draft?.attributes?.[key] || ''}
                      onChangeText={(value) => updateAttribute(key, value)}
                    />
                    <Text style={styles.modifier}>{signedModifier(modifier)}</Text>
                  </View>
                );
              })}
            </View>
            <ModalActions language={language} onClose={onClose} onSave={onSave} />
          </ScrollView>
        </View>
      </View>
      <Modal visible={racePickerOpen} transparent animationType="fade" onRequestClose={() => setRacePickerOpen(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.racePicker}>
            <Text style={styles.sectionTitle}>{tt('Escolher ra\u00e7a')}</Text>
            <TextInput
              style={styles.input}
              value={raceQuery}
              onChangeText={setRaceQuery}
              placeholder={tt('Filtrar ra\u00e7as')}
              placeholderTextColor={colors.textMuted}
            />
            <ScrollView style={styles.raceList}>
              {RACE_OPTIONS
                .filter((option) => option.name.toLowerCase().includes(raceQuery.trim().toLowerCase()))
                .map((option, index, filtered) => (
                  <View key={option.name}>
                    {(index === 0 || filtered[index - 1].group !== option.group) && (
                      <Text style={styles.raceGroup}>{term(option.group)}</Text>
                    )}
                    <TouchableOpacity
                      style={[styles.raceOption, draft?.race === option.name && styles.raceOptionActive]}
                      onPress={() => {
                        update({ race: option.name });
                        setRacePickerOpen(false);
                        setRaceQuery('');
                      }}
                    >
                      <Text style={[styles.raceOptionText, draft?.race === option.name && styles.raceOptionTextActive]}>
                        {option.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
            </ScrollView>
            <TouchableOpacity style={styles.secondaryButton} onPress={() => setRacePickerOpen(false)}>
              <Text style={styles.secondaryText}>{tt('Fechar')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Modal>
  );
}

function Field({ label, ...props }) {
  return (
    <View>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput style={styles.input} placeholderTextColor={colors.textMuted} {...props} />
    </View>
  );
}

function ModalActions({ language, onClose, onSave }) {
  const tt = (text, values = {}) => tr(text, language, values);
  return (
    <View style={styles.actions}>
      <TouchableOpacity style={styles.secondaryButton} onPress={onClose}>
        <Text style={styles.secondaryText}>{tt('Cancelar')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.primaryButton} onPress={onSave}>
        <Text style={styles.primaryText}>{tt('Salvar')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, color: colors.text, backgroundColor: colors.background, padding: spacing.lg },
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: 48 },
  eyebrow: { color: colors.primary, fontSize: 12, fontWeight: '900', letterSpacing: 2 },
  title: { color: colors.text, fontSize: 30, fontWeight: '900', marginTop: 6 },
  subtitle: { color: colors.textMuted, lineHeight: 20, marginTop: 6, marginBottom: spacing.lg },
  warning: { backgroundColor: '#241B0D', borderColor: '#7A5A1C', borderWidth: 1, borderRadius: radii.md, marginBottom: spacing.md, padding: 12 },
  warningText: { color: '#FFD78A', fontSize: 12, lineHeight: 18 },
  createRow: { flexDirection: 'row', gap: spacing.sm },
  inputGrow: {
    flex: 1,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radii.md,
    color: colors.text,
    paddingHorizontal: 14,
  },
  input: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radii.md,
    color: colors.text,
    marginTop: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  selectInput: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surfaceMuted, borderColor: colors.border, borderWidth: 1, borderRadius: radii.md, marginTop: 6, paddingHorizontal: 14, paddingVertical: 14 },
  selectText: { flex: 1, color: colors.text },
  selectPlaceholder: { flex: 1, color: colors.textMuted },
  selectArrow: { color: colors.primary, fontSize: 20, fontWeight: '900' },
  primaryButton: { backgroundColor: colors.primary, borderRadius: radii.md, justifyContent: 'center', paddingHorizontal: 18, paddingVertical: 12 },
  primaryWide: { backgroundColor: colors.primary, borderRadius: radii.md, alignItems: 'center', marginTop: spacing.md, padding: 14 },
  primaryText: { color: colors.background, fontWeight: '900' },
  groupStrip: { gap: spacing.sm, paddingVertical: spacing.lg },
  groupChip: { minWidth: 150, backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: radii.lg, padding: 14 },
  groupChipActive: { borderColor: colors.primary, backgroundColor: '#211F18' },
  groupChipText: { color: colors.text, fontWeight: '900' },
  groupChipTextActive: { color: colors.primary },
  groupCount: { color: colors.textMuted, fontSize: 11, marginTop: 4 },
  emptyCard: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: radii.lg, padding: spacing.xl },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md },
  sectionTitle: { color: colors.text, fontSize: 20, fontWeight: '900' },
  smallDanger: { borderColor: '#5B2B2B', borderWidth: 1, borderRadius: radii.sm, padding: 10 },
  dangerText: { color: '#FFB0B0', fontWeight: '800' },
  characterCard: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: radii.lg, marginBottom: spacing.md, padding: spacing.lg },
  characterHeader: { flexDirection: 'row', gap: spacing.md },
  flex: { flex: 1 },
  cardTitle: { color: colors.text, fontSize: 17, fontWeight: '900' },
  muted: { color: colors.textMuted, fontSize: 12, lineHeight: 18 },
  levelBadge: { backgroundColor: colors.surfaceMuted, borderRadius: radii.md, alignItems: 'center', minWidth: 58, padding: 8 },
  levelLabel: { color: colors.textMuted, fontSize: 9, fontWeight: '900' },
  levelValue: { color: colors.primary, fontSize: 22, fontWeight: '900' },
  statsRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  stat: { flex: 1, backgroundColor: colors.surfaceMuted, borderRadius: radii.sm, alignItems: 'center', paddingVertical: 9 },
  statLabel: { color: colors.textMuted, fontSize: 9 },
  statValue: { color: colors.text, fontWeight: '900', marginTop: 2 },
  tokenRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  token: { flex: 1, backgroundColor: colors.primarySoft, borderRadius: radii.md, padding: spacing.sm },
  tokenLabel: { color: colors.primary, fontSize: 11, fontWeight: '900', textAlign: 'center' },
  tokenControls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, marginTop: 6 },
  tokenButton: { width: 32, height: 32, borderRadius: radii.sm, backgroundColor: colors.surfaceHighlight, alignItems: 'center', justifyContent: 'center' },
  tokenButtonText: { color: colors.text, fontSize: 19, fontWeight: '900' },
  tokenValue: { minWidth: 42, color: colors.text, fontWeight: '900', textAlign: 'center' },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.md },
  progressPercent: { color: colors.primary, fontSize: 11, fontWeight: '900' },
  progressTrack: { height: 7, backgroundColor: colors.surfaceMuted, borderRadius: radii.pill, overflow: 'hidden', marginTop: 6 },
  progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: radii.pill },
  featurePanel: { backgroundColor: colors.surfaceMuted, borderRadius: radii.md, marginTop: spacing.md, padding: spacing.md },
  featureTitle: { color: colors.text, fontWeight: '900', marginBottom: 6 },
  featureText: { color: colors.textMuted, fontSize: 11, lineHeight: 17 },
  nextFeature: { color: colors.primary, fontSize: 11, fontWeight: '800', marginTop: 7 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.lg },
  secondaryButton: { flex: 1, minWidth: 120, borderColor: colors.border, borderWidth: 1, borderRadius: radii.md, alignItems: 'center', padding: 12 },
  secondaryText: { color: colors.text, fontWeight: '800' },
  deleteButton: { flex: 1, minWidth: 150, backgroundColor: colors.dangerSoft, borderColor: '#5B2B2B', borderWidth: 1, borderRadius: radii.md, alignItems: 'center', padding: 12 },
  deleteText: { color: colors.danger, fontWeight: '900' },
  availableSection: { backgroundColor: colors.surfaceMuted, borderColor: colors.border, borderWidth: 1, borderRadius: radii.lg, marginTop: spacing.lg, padding: spacing.lg },
  availableCharacter: { flexDirection: 'row', alignItems: 'center', borderTopColor: colors.border, borderTopWidth: 1, marginTop: spacing.md, paddingTop: spacing.md },
  addText: { color: colors.primary, fontWeight: '900' },
  modalBackground: { flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'center', padding: spacing.lg },
  modalCard: { backgroundColor: colors.surface, borderRadius: radii.lg, padding: spacing.lg },
  sheet: { maxHeight: '92%', backgroundColor: colors.surface, borderRadius: radii.lg },
  sheetContent: { padding: spacing.lg, paddingBottom: 36 },
  racePicker: { maxHeight: '82%', backgroundColor: colors.surface, borderRadius: radii.lg, padding: spacing.lg },
  raceList: { marginVertical: spacing.md },
  raceGroup: { color: colors.primary, fontSize: 11, fontWeight: '900', letterSpacing: 1, marginTop: spacing.md, marginBottom: 6 },
  raceOption: { borderColor: colors.border, borderWidth: 1, borderRadius: radii.md, marginBottom: spacing.sm, padding: 13 },
  raceOptionActive: { backgroundColor: colors.primarySoft, borderColor: colors.primary },
  raceOptionText: { color: colors.text, fontWeight: '800' },
  raceOptionTextActive: { color: colors.primary },
  fieldLabel: { color: colors.textMuted, fontSize: 12, fontWeight: '800', marginTop: spacing.md },
  fieldRow: { flexDirection: 'row', gap: spacing.sm },
  sizeRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  sizeButton: { flex: 1, borderColor: colors.border, borderWidth: 1, borderRadius: radii.md, padding: 11 },
  sizeButtonActive: { backgroundColor: colors.primarySoft, borderColor: colors.primary },
  sizeText: { color: colors.textMuted, fontSize: 11, fontWeight: '800', textAlign: 'center' },
  sizeTextActive: { color: colors.primary },
  classStrip: { gap: spacing.sm, paddingVertical: spacing.sm },
  classChip: { borderColor: colors.border, borderWidth: 1, borderRadius: radii.pill, paddingHorizontal: 12, paddingVertical: 8 },
  classChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  classText: { color: colors.textMuted, fontWeight: '800' },
  classTextActive: { color: colors.background },
  attributeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.sm },
  attributeCard: { width: '31%', backgroundColor: colors.surfaceMuted, borderRadius: radii.md, alignItems: 'center', padding: 10 },
  attributeLabel: { color: colors.textMuted, fontSize: 11, fontWeight: '900' },
  attributeInput: { color: colors.text, fontSize: 20, fontWeight: '900', textAlign: 'center', width: '100%', paddingVertical: 4 },
  modifier: { color: colors.primary, fontWeight: '900' },
});
