import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { PressableScale } from '../components/MicroInteractions';
import { tr } from '../services/i18nService';
import { colors, radii, spacing } from '../theme';

const QUESTIONS_PT = [
  {
    id: 'flow',
    question: 'Qual e o fluxo recomendado?',
    keywords: ['fluxo', 'comecar', 'primeiro', 'inicio', 'mesa', 'campanha'],
    answer: 'Comece criando um grupo na aba Personagens. Depois crie ou adicione personagens, confira XP e ficha, use Recursos para habilidades e magias, Inventario para itens e moedas, e Combate durante os encontros.',
  },
  {
    id: 'groups',
    question: 'Como funcionam os grupos?',
    keywords: ['grupo', 'grupos', 'campanha', 'mesa', 'selecionado', 'filtro'],
    answer: 'Os grupos organizam personagens por mesa ou campanha. O grupo selecionado filtra Recursos, Inventario e Combate. Voce pode criar varios grupos, editar o nome, remover o grupo sem apagar personagens e adicionar personagens ja existentes.',
  },
  {
    id: 'character',
    question: 'Como crio ou edito personagem?',
    keywords: ['personagem', 'ficha', 'criar personagem', 'editar ficha', 'atributo', 'raca', 'classe', 'subclasse'],
    answer: 'Na aba Personagens, selecione um grupo e toque em Adicionar personagem. Preencha nome, jogador, raca, classe, subclasse, XP, CA, deslocamento, iniciativa, PV, porte e atributos. Para editar, toque em Editar ficha no card do personagem.',
  },
  {
    id: 'xp',
    question: 'O XP atualiza o nivel?',
    keywords: ['xp', 'nivel', 'proficiencia', 'evolucao', 'proximo nivel'],
    answer: 'Sim. Ao alterar XP, o app recalcula nivel, bonus de proficiencia, progresso ate o proximo nivel e recursos automaticos liberados para aquele nivel.',
  },
  {
    id: 'features',
    question: 'Onde vejo habilidades de classe e raca?',
    keywords: ['habilidade', 'habilidades', 'classe', 'raca', 'racial', 'subclasse', 'proximo nivel'],
    answer: 'Na ficha do personagem e na aba Recursos, o app mostra as habilidades liberadas ate o nivel atual e tambem indica a proxima habilidade futura. As habilidades regionais nao oficiais foram removidas dos recursos automaticos.',
  },
  {
    id: 'resources',
    question: 'Como uso recursos e descansos?',
    keywords: ['recurso', 'recursos', 'descanso', 'curto', 'longo', 'cheio', 'usou', 'restaurar'],
    answer: 'Na aba Recursos, toque no personagem. Cada recurso tem usos atuais e maximos. Use - e + para ajustar, Usou para zerar e Cheio para restaurar. Descanso curto e descanso longo recuperam os recursos correspondentes; descanso longo tambem restaura PV ao maximo.',
  },
  {
    id: 'spells',
    question: 'Como funciona o grimorio?',
    keywords: ['grimorio', 'magia', 'magias', 'conjurar', 'circulo', 'preparar', 'espaco'],
    answer: 'Na aba Recursos, abra o Grimorio do personagem. Voce pode adicionar magias do catalogo, filtrar por circulo, escola, ritual e concentracao, preparar magias e conjurar. O app limita magias ao circulo liberado pelo nivel e gasta o espaco correto ao conjurar.',
  },
  {
    id: 'upcast',
    question: 'Posso conjurar magia em nivel maior?',
    keywords: ['nivel maior', 'upcast', 'conjurar acima', 'espaco maior', 'magia maior'],
    answer: 'Sim. Ao conjurar uma magia que permite nivel maior, escolha o circulo do espaco usado antes de confirmar. O app consome o espaco escolhido e mantem a magia na lista do personagem.',
  },
  {
    id: 'combat',
    question: 'Como inicio um combate?',
    keywords: ['combate', 'encontro', 'batalha', 'inimigo', 'monstro'],
    answer: 'Na aba Combate, toque em + Personagens para adicionar o grupo ativo. Para inimigos, preencha nome, PV, CA e iniciativa, depois toque em Adicionar ao encontro. Use Novo combate para limpar a cena atual e zerar as iniciativas.',
  },
  {
    id: 'initiative',
    question: 'Como funciona a iniciativa?',
    keywords: ['iniciativa', 'turno', 'rodada', 'prioridade', 'empate', 'fila'],
    answer: 'Digite a iniciativa no participante e confirme em OK. O app ordena a fila. Se houver empate, use Prioridade no participante que deve agir antes. Ao avancar turno, quem agiu vai para o fim da fila; quando todos agem, a rodada aumenta.',
  },
  {
    id: 'damage',
    question: 'Como dano, cura e PV temporario funcionam?',
    keywords: ['dano', 'cura', 'pv', 'temporario', 'morte', 'aplicar dano'],
    answer: 'Dano consome primeiro PV temporario e depois PV normal. Cura respeita o PV maximo. Voce pode usar atalhos de dano e cura, zerar PV, preencher PV cheio, adicionar PV temporario e limpar temporarios.',
  },
  {
    id: 'concentration',
    question: 'Como funciona concentracao?',
    keywords: ['concentracao', 'concentrando', 'cd', 'teste', 'dano total'],
    answer: 'Se o personagem estiver com a condicao Concentrando e sofrer dano, o app calcula a CD do teste de concentracao e mostra um alerta. Para personagem concentrando, monte o dano total e toque em Aplicar dano para a CD sair correta.',
  },
  {
    id: 'conditions',
    question: 'Como marco condicoes?',
    keywords: ['condicao', 'condicoes', 'cego', 'envenenado', 'paralisado', 'invisivel', 'concentrando'],
    answer: 'Na ficha e no combate, use a area de condicoes para marcar efeitos ativos como Cego, Envenenado, Paralisado, Invisivel, Inconsciente e Concentrando. A condicao Concentrando tambem ativa o alerta de teste ao receber dano.',
  },
  {
    id: 'critical',
    question: 'Como uso o erro critico?',
    keywords: ['erro critico', 'falha critica', 'd100', 'desarmado', 'corpo a corpo', 'distancia', 'magico'],
    answer: 'Na aba Combate, toque em Erro critico. Escolha o tipo de ataque: desarmado, corpo a corpo, distancia ou magico. O app rola 1d100 e mostra faixa, severidade e efeito.',
  },
  {
    id: 'inventory',
    question: 'Como funciona o inventario?',
    keywords: ['inventario', 'item', 'itens', 'moeda', 'moedas', 'carga', 'peso', 'equipado'],
    answer: 'Na aba Inventario, toque no personagem. Voce controla moedas, adiciona itens, edita quantidade, peso, valor, descricao e equipado. A carga usa FOR x 7,5 kg para criatura media e FOR x 15 kg para criatura grande.',
  },
  {
    id: 'items',
    question: 'Como adiciono itens da biblioteca?',
    keywords: ['catalogo', 'biblioteca', 'item personalizado', 'magico', 'sintonizacao', 'raridade', 'cargas'],
    answer: 'No inventario do personagem, toque em Novo item e depois Escolher no catalogo. Voce pode buscar e filtrar por categoria. Se nao encontrar, crie um item personalizado; ele fica salvo para reutilizar. Itens magicos liberam raridade, sintonizacao e cargas.',
  },
  {
    id: 'settings',
    question: 'Como mudo idioma e ajustes?',
    keywords: ['idioma', 'ingles', 'espanhol', 'portugues', 'ajustes', 'configuracoes'],
    answer: 'Abra Ajustes. Voce pode usar o idioma automatico do dispositivo ou escolher manualmente Portugues, Ingles ou Espanhol. Os textos principais do app, itens, magias e efeitos seguem o idioma escolhido.',
  },
  {
    id: 'storage',
    question: 'O app salva minhas informacoes?',
    keywords: ['salvar', 'persistencia', 'asyncstorage', 'backup', 'dados'],
    answer: 'Sim. O app salva personagens, grupos, combates, inventarios, recursos, moedas, idioma e configuracoes localmente no aparelho usando AsyncStorage.',
  },
];

const QUESTIONS_EN = [
  {
    id: 'flow',
    question: 'What is the recommended workflow?',
    keywords: ['workflow', 'start', 'first', 'home', 'table', 'campaign'],
    answer: 'Start by creating a party in Characters. Then create or add characters, review XP and sheet data, use Resources for abilities and spells, Inventory for items and coins, and Combat during encounters.',
  },
  {
    id: 'groups',
    question: 'How do parties work?',
    keywords: ['party', 'parties', 'campaign', 'table', 'selected', 'filter'],
    answer: 'Parties organize characters by table or campaign. The selected party filters Resources, Inventory, and Combat. You can create multiple parties, rename them, remove a party without deleting characters, and add existing characters.',
  },
  {
    id: 'character',
    question: 'How do I create or edit a character?',
    keywords: ['character', 'sheet', 'create character', 'edit sheet', 'ability', 'race', 'class', 'subclass'],
    answer: 'In Characters, select a party and tap Add character. Fill in name, player, race, class, subclass, XP, AC, speed, initiative, HP, size, and ability scores. To edit, tap Edit sheet on the character card.',
  },
  {
    id: 'xp',
    question: 'Does XP update the level?',
    keywords: ['xp', 'level', 'proficiency', 'progression', 'next level'],
    answer: 'Yes. When XP changes, the app recalculates level, proficiency bonus, progress toward the next level, and automatic resources unlocked at that level.',
  },
  {
    id: 'features',
    question: 'Where do I see class and race features?',
    keywords: ['feature', 'features', 'class', 'race', 'racial', 'subclass', 'next level'],
    answer: 'On the character sheet and in Resources, the app shows features unlocked up to the current level and also previews the next future feature. Non-official regional features were removed from automatic resources.',
  },
  {
    id: 'resources',
    question: 'How do resources and rests work?',
    keywords: ['resource', 'resources', 'rest', 'short', 'long', 'full', 'spent', 'restore'],
    answer: 'In Resources, open a character. Each resource has current and maximum uses. Use - and + to adjust, Spent to empty, and Full to restore. Short and long rests recover matching resources; long rest also restores HP to maximum.',
  },
  {
    id: 'spells',
    question: 'How does the spellbook work?',
    keywords: ['spellbook', 'spell', 'spells', 'cast', 'level', 'prepare', 'slot'],
    answer: 'In Resources, open the character spellbook. You can add spells from the catalog, filter by spell level, school, ritual, and concentration, prepare spells, and cast. The app limits spells to levels unlocked by the character and spends the correct slot.',
  },
  {
    id: 'upcast',
    question: 'Can I cast a spell at a higher level?',
    keywords: ['higher level', 'upcast', 'cast higher', 'higher slot', 'spell slot'],
    answer: 'Yes. When casting a spell that supports higher levels, choose the slot level before confirming. The app consumes the chosen slot and keeps the spell in the character list.',
  },
  {
    id: 'combat',
    question: 'How do I start combat?',
    keywords: ['combat', 'encounter', 'battle', 'enemy', 'monster'],
    answer: 'In Combat, tap + Characters to add the active party. For enemies, fill in name, HP, AC, and initiative, then add them to the encounter. New combat clears the current scene and resets initiatives.',
  },
  {
    id: 'initiative',
    question: 'How does initiative work?',
    keywords: ['initiative', 'turn', 'round', 'priority', 'tie', 'queue'],
    answer: 'Enter initiative for a participant and confirm with OK. The app sorts the queue. If there is a tie, use Priority on the participant who should act first. After a turn, that participant moves to the end of the queue; after everyone acts, the round increases.',
  },
  {
    id: 'damage',
    question: 'How do damage, healing, and temporary HP work?',
    keywords: ['damage', 'healing', 'hp', 'temporary', 'death', 'apply damage'],
    answer: 'Damage consumes temporary HP first, then normal HP. Healing cannot go above maximum HP. You can use quick damage and healing buttons, set HP to zero, fill HP, add temporary HP, and clear temporary HP.',
  },
  {
    id: 'concentration',
    question: 'How does concentration work?',
    keywords: ['concentration', 'concentrating', 'dc', 'check', 'total damage'],
    answer: 'If a character has the Concentrating condition and takes damage, the app calculates the concentration check DC and shows an alert. For concentrating characters, build the total damage and tap Apply damage so the DC is correct.',
  },
  {
    id: 'conditions',
    question: 'How do I mark conditions?',
    keywords: ['condition', 'conditions', 'blinded', 'poisoned', 'paralyzed', 'invisible', 'concentrating'],
    answer: 'On the sheet and in combat, use the conditions area to mark active effects such as Blinded, Poisoned, Paralyzed, Invisible, Unconscious, and Concentrating. Concentrating also triggers the concentration check alert when damage is applied.',
  },
  {
    id: 'critical',
    question: 'How do I use critical fumble?',
    keywords: ['critical fumble', 'critical failure', 'd100', 'unarmed', 'melee', 'ranged', 'magic'],
    answer: 'In Combat, tap Critical fumble. Choose the attack type: unarmed, melee, ranged, or magic. The app rolls 1d100 and shows the range, severity, and effect.',
  },
  {
    id: 'inventory',
    question: 'How does inventory work?',
    keywords: ['inventory', 'item', 'items', 'coin', 'coins', 'load', 'weight', 'equipped'],
    answer: 'In Inventory, open a character. You manage coins, add items, and edit quantity, weight, value, description, and equipped status. Carrying capacity uses STR x 15 lb. for Medium creatures and STR x 30 lb. for Large creatures.',
  },
  {
    id: 'items',
    question: 'How do I add library items?',
    keywords: ['catalog', 'library', 'custom item', 'magic', 'attunement', 'rarity', 'charges'],
    answer: 'In the character inventory, tap New item and then Choose from catalog. You can search and filter by category. If you do not find it, create a custom item; it is saved for reuse. Magic items support rarity, attunement, and charges.',
  },
  {
    id: 'settings',
    question: 'How do I change language and settings?',
    keywords: ['language', 'english', 'spanish', 'portuguese', 'settings', 'configuration'],
    answer: 'Open Settings. You can use the device language automatically or manually choose Portuguese, English, or Spanish. Main interface text, items, spells, and effects follow the selected language.',
  },
  {
    id: 'storage',
    question: 'Does the app save my data?',
    keywords: ['save', 'persistence', 'asyncstorage', 'backup', 'data'],
    answer: 'Yes. The app saves characters, parties, combats, inventories, resources, coins, language, and settings locally on the device using AsyncStorage.',
  },
];

const QUESTIONS_ES = [
  {
    id: 'flow',
    question: 'Cual es el flujo recomendado?',
    keywords: ['flujo', 'empezar', 'primero', 'inicio', 'mesa', 'campana'],
    answer: 'Empieza creando un grupo en Personajes. Luego crea o agrega personajes, revisa XP y ficha, usa Recursos para habilidades y conjuros, Inventario para objetos y monedas, y Combate durante los encuentros.',
  },
  {
    id: 'groups',
    question: 'Como funcionan los grupos?',
    keywords: ['grupo', 'grupos', 'campana', 'mesa', 'seleccionado', 'filtro'],
    answer: 'Los grupos organizan personajes por mesa o campana. El grupo seleccionado filtra Recursos, Inventario y Combate. Puedes crear varios grupos, cambiarles el nombre, eliminar un grupo sin borrar personajes y agregar personajes existentes.',
  },
  {
    id: 'character',
    question: 'Como creo o edito un personaje?',
    keywords: ['personaje', 'ficha', 'crear personaje', 'editar ficha', 'atributo', 'raza', 'clase', 'subclase'],
    answer: 'En Personajes, selecciona un grupo y toca Agregar personaje. Completa nombre, jugador, raza, clase, subclase, XP, CA, velocidad, iniciativa, PG, tamano y atributos. Para editar, toca Editar ficha en la tarjeta del personaje.',
  },
  {
    id: 'xp',
    question: 'La XP actualiza el nivel?',
    keywords: ['xp', 'nivel', 'competencia', 'progresion', 'siguiente nivel'],
    answer: 'Si. Al cambiar la XP, la app recalcula nivel, bonificador de competencia, progreso hacia el siguiente nivel y recursos automaticos desbloqueados en ese nivel.',
  },
  {
    id: 'features',
    question: 'Donde veo rasgos de clase y raza?',
    keywords: ['rasgo', 'rasgos', 'clase', 'raza', 'racial', 'subclase', 'siguiente nivel'],
    answer: 'En la ficha del personaje y en Recursos, la app muestra los rasgos desbloqueados hasta el nivel actual y tambien anticipa el siguiente rasgo futuro. Los rasgos regionales no oficiales fueron eliminados de los recursos automaticos.',
  },
  {
    id: 'resources',
    question: 'Como uso recursos y descansos?',
    keywords: ['recurso', 'recursos', 'descanso', 'corto', 'largo', 'lleno', 'usado', 'restaurar'],
    answer: 'En Recursos, abre un personaje. Cada recurso tiene usos actuales y maximos. Usa - y + para ajustar, Usado para vaciar y Lleno para restaurar. El descanso corto y largo recuperan los recursos correspondientes; el descanso largo tambien restaura los PG al maximo.',
  },
  {
    id: 'spells',
    question: 'Como funciona el libro de conjuros?',
    keywords: ['libro de conjuros', 'conjuro', 'conjuros', 'lanzar', 'nivel', 'preparar', 'espacio'],
    answer: 'En Recursos, abre el libro de conjuros del personaje. Puedes agregar conjuros del catalogo, filtrar por nivel, escuela, ritual y concentracion, preparar conjuros y lanzarlos. La app limita los conjuros al nivel desbloqueado por el personaje y gasta el espacio correcto.',
  },
  {
    id: 'upcast',
    question: 'Puedo lanzar un conjuro con nivel mayor?',
    keywords: ['nivel mayor', 'lanzar mayor', 'espacio mayor', 'conjuro mayor'],
    answer: 'Si. Al lanzar un conjuro que permite nivel mayor, elige el nivel del espacio antes de confirmar. La app consume el espacio elegido y mantiene el conjuro en la lista del personaje.',
  },
  {
    id: 'combat',
    question: 'Como inicio un combate?',
    keywords: ['combate', 'encuentro', 'batalla', 'enemigo', 'monstruo'],
    answer: 'En Combate, toca + Personajes para agregar el grupo activo. Para enemigos, completa nombre, PG, CA e iniciativa, luego agregalos al encuentro. Nuevo combate limpia la escena actual y reinicia las iniciativas.',
  },
  {
    id: 'initiative',
    question: 'Como funciona la iniciativa?',
    keywords: ['iniciativa', 'turno', 'ronda', 'prioridad', 'empate', 'cola'],
    answer: 'Ingresa la iniciativa del participante y confirma con OK. La app ordena la cola. Si hay empate, usa Prioridad en quien debe actuar primero. Despues de actuar, el participante baja al final de la cola; cuando todos actuan, aumenta la ronda.',
  },
  {
    id: 'damage',
    question: 'Como funcionan dano, curacion y PG temporales?',
    keywords: ['dano', 'curacion', 'pg', 'temporal', 'muerte', 'aplicar dano'],
    answer: 'El dano consume primero PG temporales y luego PG normales. La curacion no supera los PG maximos. Puedes usar botones rapidos de dano y cura, poner PG en cero, llenar PG, agregar PG temporales y limpiarlos.',
  },
  {
    id: 'concentration',
    question: 'Como funciona concentracion?',
    keywords: ['concentracion', 'concentrando', 'cd', 'prueba', 'dano total'],
    answer: 'Si un personaje tiene la condicion Concentrando y recibe dano, la app calcula la CD de la prueba de concentracion y muestra un aviso. Para personajes concentrando, arma el dano total y toca Aplicar dano para que la CD sea correcta.',
  },
  {
    id: 'conditions',
    question: 'Como marco condiciones?',
    keywords: ['condicion', 'condiciones', 'ciego', 'envenenado', 'paralizado', 'invisible', 'concentrando'],
    answer: 'En la ficha y en combate, usa el area de condiciones para marcar efectos activos como Ciego, Envenenado, Paralizado, Invisible, Inconsciente y Concentrando. Concentrando tambien activa el aviso de prueba al recibir dano.',
  },
  {
    id: 'critical',
    question: 'Como uso la pifia critica?',
    keywords: ['pifia critica', 'fallo critico', 'd100', 'desarmado', 'cuerpo a cuerpo', 'distancia', 'magico'],
    answer: 'En Combate, toca Pifia critica. Elige el tipo de ataque: desarmado, cuerpo a cuerpo, distancia o magico. La app tira 1d100 y muestra rango, severidad y efecto.',
  },
  {
    id: 'inventory',
    question: 'Como funciona el inventario?',
    keywords: ['inventario', 'objeto', 'objetos', 'moneda', 'monedas', 'carga', 'peso', 'equipado'],
    answer: 'En Inventario, abre un personaje. Controlas monedas, agregas objetos y editas cantidad, peso, valor, descripcion y equipado. La capacidad de carga usa FUE x 15 lb. para criaturas Medianas y FUE x 30 lb. para criaturas Grandes.',
  },
  {
    id: 'items',
    question: 'Como agrego objetos de la biblioteca?',
    keywords: ['catalogo', 'biblioteca', 'objeto personalizado', 'magico', 'sintonia', 'rareza', 'cargas'],
    answer: 'En el inventario del personaje, toca Nuevo item y luego Elegir del catalogo. Puedes buscar y filtrar por categoria. Si no lo encuentras, crea un objeto personalizado; queda guardado para reutilizar. Los objetos magicos admiten rareza, sintonia y cargas.',
  },
  {
    id: 'settings',
    question: 'Como cambio idioma y ajustes?',
    keywords: ['idioma', 'ingles', 'espanol', 'portugues', 'ajustes', 'configuracion'],
    answer: 'Abre Ajustes. Puedes usar automaticamente el idioma del dispositivo o elegir manualmente Portugues, Ingles o Espanol. Los textos principales de la app, objetos, conjuros y efectos siguen el idioma elegido.',
  },
  {
    id: 'storage',
    question: 'La app guarda mis datos?',
    keywords: ['guardar', 'persistencia', 'asyncstorage', 'backup', 'datos'],
    answer: 'Si. La app guarda personajes, grupos, combates, inventarios, recursos, monedas, idioma y configuraciones localmente en el dispositivo usando AsyncStorage.',
  },
];

const HELP_CONTENT = {
  'pt-BR': {
    title: 'Ajuda interativa',
    subtitle: 'Pergunte como usar personagens, recursos, combate, inventario e ajustes.',
    inputPlaceholder: 'Digite sua duvida...',
    askButton: 'Perguntar',
    quickTitle: 'Perguntas rapidas',
    emptyTitle: 'Assistente de ajuda',
    emptyMessage: 'Escolha uma pergunta abaixo ou digite uma duvida. Eu respondo com base nas funcoes atuais do app.',
    fallback: 'Nao encontrei uma resposta exata. Tente perguntar sobre: grupo, personagem, XP, recursos, descanso, grimorio, magia, combate, iniciativa, dano, concentracao, erro critico, inventario, moedas, carga ou idioma.',
    greeting: 'Ola! Sou a Ajuda interativa do RPG Combat Tracker. Posso explicar as abas e os principais controles.',
    questions: QUESTIONS_PT,
  },
  en: {
    title: 'Interactive Help',
    subtitle: 'Ask how to use characters, resources, combat, inventory, and settings.',
    inputPlaceholder: 'Type your question...',
    askButton: 'Ask',
    quickTitle: 'Quick questions',
    emptyTitle: 'Help assistant',
    emptyMessage: 'Choose a question below or type your own. I answer based on the current app features.',
    fallback: 'I did not find an exact answer. Try asking about: party, character, XP, resources, rest, spellbook, spell, combat, initiative, damage, concentration, critical fumble, inventory, coins, load, or language.',
    greeting: 'Hello! This is the RPG Combat Tracker Interactive Help. I can explain the tabs and main controls.',
    questions: QUESTIONS_EN,
  },
  es: {
    title: 'Ayuda interactiva',
    subtitle: 'Pregunta como usar personajes, recursos, combate, inventario y ajustes.',
    inputPlaceholder: 'Escribe tu duda...',
    askButton: 'Preguntar',
    quickTitle: 'Preguntas rapidas',
    emptyTitle: 'Asistente de ayuda',
    emptyMessage: 'Elige una pregunta abajo o escribe una duda. Respondo segun las funciones actuales de la app.',
    fallback: 'No encontre una respuesta exacta. Intenta preguntar sobre: grupo, personaje, XP, recursos, descanso, libro de conjuros, conjuro, combate, iniciativa, dano, concentracion, pifia critica, inventario, monedas, carga o idioma.',
    greeting: 'Hola! Esta es la Ayuda interactiva de RPG Combat Tracker. Puedo explicar las pestanas y los controles principales.',
    questions: QUESTIONS_ES,
  },
};

function contentFor(language) {
  return HELP_CONTENT[language] || HELP_CONTENT['pt-BR'];
}

function normalize(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export default function HelpScreen({ language = 'pt-BR' }) {
  const tt = (text, values = {}) => tr(text, language, values);
  const content = contentFor(language);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', text: content.greeting },
  ]);

  const visibleQuestions = useMemo(() => {
    const search = normalize(query);
    if (!search) return content.questions;
    return content.questions.filter((item) =>
      normalize(`${item.question} ${item.answer} ${item.keywords.join(' ')}`).includes(search)
    );
  }, [content.questions, query]);

  function answerFor(questionText) {
    const search = normalize(questionText);
    if (!search) return null;
    let best = null;
    let score = 0;
    content.questions.forEach((item) => {
      const haystack = normalize(`${item.question} ${item.answer} ${item.keywords.join(' ')}`);
      const currentScore = item.keywords.reduce((total, keyword) => (
        search.includes(normalize(keyword)) ? total + 2 : total
      ), haystack.includes(search) ? 1 : 0);
      if (currentScore > score) {
        score = currentScore;
        best = item;
      }
    });
    return best?.answer || content.fallback;
  }

  function ask(text = query) {
    const question = String(text || '').trim();
    if (!question) return;
    const answer = answerFor(question);
    setMessages((old) => [
      ...old,
      { role: 'user', text: question },
      { role: 'assistant', text: answer },
    ]);
    setQuery('');
  }

  return (
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.eyebrow}>{tt('RPG COMBAT TRACKER')}</Text>
      <Text style={styles.title}>{content.title}</Text>
      <Text style={styles.subtitle}>{content.subtitle}</Text>

      <View style={styles.chatCard}>
        {messages.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.cardTitle}>{content.emptyTitle}</Text>
            <Text style={styles.muted}>{content.emptyMessage}</Text>
          </View>
        ) : messages.map((message, index) => (
          <View
            key={`${message.role}-${index}`}
            style={[
              styles.message,
              message.role === 'user' ? styles.userMessage : styles.assistantMessage,
            ]}
          >
            <Text style={message.role === 'user' ? styles.userText : styles.assistantText}>{message.text}</Text>
          </View>
        ))}
      </View>

      <View style={styles.askRow}>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder={content.inputPlaceholder}
          placeholderTextColor={colors.textMuted}
          onSubmitEditing={() => ask()}
        />
        <PressableScale style={styles.askButton} onPress={() => ask()}>
          <Text style={styles.askButtonText}>{content.askButton}</Text>
        </PressableScale>
      </View>

      <Text style={styles.sectionTitle}>{content.quickTitle}</Text>
      <View style={styles.questionGrid}>
        {visibleQuestions.map((item) => (
          <PressableScale key={item.id} style={styles.questionChip} onPress={() => ask(item.question)}>
            <Text style={styles.questionText}>{item.question}</Text>
          </PressableScale>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, paddingBottom: 64 },
  eyebrow: { color: colors.primary, fontSize: 12, fontWeight: '900', letterSpacing: 2 },
  title: { color: colors.text, fontSize: 28, fontWeight: '900', marginTop: 6 },
  subtitle: { color: colors.textMuted, lineHeight: 20, marginTop: 6, marginBottom: spacing.lg },
  chatCard: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: radii.lg, padding: spacing.md, minHeight: 220 },
  empty: { padding: spacing.md },
  cardTitle: { color: colors.text, fontSize: 17, fontWeight: '900' },
  muted: { color: colors.textMuted, fontSize: 12, lineHeight: 18, marginTop: 6 },
  message: { borderRadius: radii.md, marginBottom: spacing.sm, padding: spacing.md },
  assistantMessage: { alignSelf: 'flex-start', backgroundColor: colors.surfaceMuted, maxWidth: '92%' },
  userMessage: { alignSelf: 'flex-end', backgroundColor: colors.primarySoft, borderColor: colors.primaryDark, borderWidth: 1, maxWidth: '86%' },
  assistantText: { color: colors.text, lineHeight: 19 },
  userText: { color: colors.primary, fontWeight: '800', lineHeight: 19 },
  askRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  input: { flex: 1, backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: radii.md, color: colors.text, paddingHorizontal: 14, paddingVertical: 12 },
  askButton: { backgroundColor: colors.primary, borderRadius: radii.md, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 14 },
  askButtonText: { color: colors.background, fontWeight: '900' },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: '900', marginTop: spacing.lg, marginBottom: spacing.sm },
  questionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  questionChip: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: radii.pill, paddingHorizontal: 13, paddingVertical: 10 },
  questionText: { color: colors.text, fontSize: 12, fontWeight: '800' },
});
