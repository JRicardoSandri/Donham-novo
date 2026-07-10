import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { tr } from '../services/i18nService';
import { colors, radii, spacing } from '../theme';

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
    greeting: 'Ola! Sou o assistente de ajuda do RPG Combat Tracker. Posso explicar como usar as abas e os principais controles.',
    questions: [
      {
        id: 'flow',
        question: 'Qual e o fluxo recomendado?',
        keywords: ['fluxo', 'comecar', 'começar', 'primeiro', 'inicio', 'início'],
        answer: 'Comece criando um grupo na aba Personagens. Depois crie ou adicione personagens, confira XP e ficha, use Recursos para habilidades e magias, Inventario para itens e moedas, e Combate durante os encontros.',
      },
      {
        id: 'groups',
        question: 'Como funcionam os grupos?',
        keywords: ['grupo', 'grupos', 'campanha', 'mesa'],
        answer: 'Os grupos organizam personagens por mesa/campanha. O grupo selecionado filtra Recursos, Inventario e Combate. Voce pode criar varios grupos, editar o nome segurando o cartao, remover o grupo sem apagar personagens e adicionar personagens ja existentes.',
      },
      {
        id: 'character',
        question: 'Como crio ou edito personagem?',
        keywords: ['personagem', 'ficha', 'criar personagem', 'editar ficha', 'atributo', 'raca', 'raça', 'classe'],
        answer: 'Na aba Personagens, selecione um grupo e toque em Adicionar personagem. Preencha nome, jogador, raca, classe, subclasse, XP, CA, deslocamento, iniciativa, PV, porte e atributos. Para editar, toque em Editar ficha no card do personagem.',
      },
      {
        id: 'xp',
        question: 'O XP atualiza o nivel?',
        keywords: ['xp', 'nivel', 'nível', 'proficiencia', 'proficiência'],
        answer: 'Sim. Ao alterar XP, o app recalcula nivel, bonus de proficiencia, progresso ate o proximo nivel e recursos automaticos liberados para aquele nivel.',
      },
      {
        id: 'resources',
        question: 'Como uso recursos e descansos?',
        keywords: ['recurso', 'recursos', 'descanso', 'curto', 'longo', 'cheio', 'usou'],
        answer: 'Na aba Recursos, toque no personagem. Cada recurso tem usos atuais e maximos. Use - e + para ajustar, Usou para zerar e Cheio para restaurar. Descanso curto e descanso longo recuperam os recursos correspondentes; descanso longo tambem restaura PV ao maximo.',
      },
      {
        id: 'spells',
        question: 'Como funciona o grimorio?',
        keywords: ['grimorio', 'grimório', 'magia', 'magias', 'conjurar', 'circulo', 'círculo'],
        answer: 'Na aba Recursos, abra o Grimorio do personagem. Voce pode adicionar magias do catalogo, filtrar por circulo, escola e concentracao, preparar magias e conjurar. O app limita magias ao circulo liberado pelo nivel e gasta o espaco correto ao conjurar.',
      },
      {
        id: 'combat',
        question: 'Como inicio um combate?',
        keywords: ['combate', 'encontro', 'batalha', 'inimigo'],
        answer: 'Na aba Combate, toque em + Personagens para adicionar o grupo ativo. Para inimigos, preencha nome, PV, CA e iniciativa, depois toque em Adicionar ao encontro. Use Novo combate para limpar a cena atual.',
      },
      {
        id: 'initiative',
        question: 'Como funciona a iniciativa?',
        keywords: ['iniciativa', 'turno', 'rodada', 'prioridade', 'empate'],
        answer: 'Digite a iniciativa no participante e confirme em OK. O app ordena a fila. Se houver empate, aparece Prioridade para colocar aquele participante acima dos empatados. Ao avancar turno, quem agiu vai para o fim da fila; quando todos agem, a rodada aumenta.',
      },
      {
        id: 'damage',
        question: 'Como dano, cura e PV temporario funcionam?',
        keywords: ['dano', 'cura', 'pv', 'temporario', 'temporário', 'morte'],
        answer: 'Dano consome primeiro PV temporario e depois PV normal. Cura respeita o PV maximo. Voce pode usar atalhos de dano e cura, zerar PV, preencher PV cheio, adicionar PV temporario e limpar temporarios.',
      },
      {
        id: 'concentration',
        question: 'Como funciona concentracao?',
        keywords: ['concentracao', 'concentração', 'concentrando', 'cd', 'teste'],
        answer: 'Se o personagem estiver com a condicao Concentrando e sofrer dano, o app calcula a CD do teste de concentracao e mostra um alerta. Para personagem concentrando, monte o dano total e toque em Aplicar dano para a CD sair correta.',
      },
      {
        id: 'critical',
        question: 'Como uso o erro critico?',
        keywords: ['erro critico', 'erro crítico', 'falha critica', 'falha crítica', 'd100'],
        answer: 'Na aba Combate, toque em Erro critico. Escolha o tipo de ataque: desarmado, corpo a corpo, distancia ou magico. O app rola 1d100 e mostra faixa, severidade e efeito.',
      },
      {
        id: 'inventory',
        question: 'Como funciona o inventario?',
        keywords: ['inventario', 'inventário', 'item', 'itens', 'moeda', 'moedas', 'carga', 'peso'],
        answer: 'Na aba Inventario, toque no personagem. Voce controla moedas, adiciona itens, edita quantidade, peso, valor, descricao e equipado. A carga usa FOR x 7,5 kg para criatura media e FOR x 15 kg para criatura grande.',
      },
      {
        id: 'items',
        question: 'Como adiciono itens da biblioteca?',
        keywords: ['catalogo', 'catálogo', 'biblioteca', 'item personalizado', 'magico', 'mágico', 'sintonizacao', 'sintonização'],
        answer: 'No inventario do personagem, toque em Novo item e depois Escolher no catalogo. Voce pode buscar e filtrar por categoria. Se nao encontrar, crie um item personalizado; ele fica salvo para reutilizar. Itens magicos liberam raridade, sintonizacao e cargas.',
      },
      {
        id: 'language',
        question: 'Como mudo o idioma?',
        keywords: ['idioma', 'ingles', 'inglês', 'espanhol', 'portugues', 'português', 'ajustes'],
        answer: 'Abra Ajustes. Voce pode usar o idioma automatico do dispositivo ou escolher manualmente Portugues, Ingles ou Espanhol.',
      },
    ],
  },
  en: {
    title: 'Interactive Help',
    subtitle: 'Ask how to use characters, resources, combat, inventory, and settings.',
    inputPlaceholder: 'Type your question...',
    askButton: 'Ask',
    quickTitle: 'Quick questions',
    emptyTitle: 'Help assistant',
    emptyMessage: 'Choose a question below or type your own. I answer based on the app features.',
    fallback: 'I did not find an exact answer. Try asking about: party, character, XP, resources, rest, spellbook, spell, combat, initiative, damage, concentration, critical fumble, inventory, coins, load, or language.',
    greeting: 'Hello! I am the RPG Combat Tracker help assistant. I can explain the tabs and main controls.',
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
    greeting: 'Hola! Soy el asistente de ayuda de RPG Combat Tracker. Puedo explicar las pestañas y los controles principales.',
  },
};

function contentFor(language) {
  if (language === 'en') return { ...HELP_CONTENT.en, questions: translateQuestions('en') };
  if (language === 'es') return { ...HELP_CONTENT.es, questions: translateQuestions('es') };
  return HELP_CONTENT['pt-BR'];
}

function translateQuestions(language) {
  const source = HELP_CONTENT['pt-BR'].questions;
  const translated = {
    en: {
      flow: ['What is the recommended flow?', 'Create a party in Characters, add characters, check XP and sheet data, use Resources for abilities and spells, Inventory for items and coins, and Combat during encounters.'],
      groups: ['How do parties work?', 'Parties organize characters by table or campaign. The selected party filters Resources, Inventory, and Combat. You can create multiple parties, rename one by holding its card, remove a party without deleting characters, and add existing characters.'],
      character: ['How do I create or edit a character?', 'In Characters, select a party and tap Add character. Fill name, player, race, class, subclass, XP, AC, speed, initiative, HP, size, and abilities. To edit, tap Edit sheet on the character card.'],
      xp: ['Does XP update level?', 'Yes. Changing XP recalculates level, proficiency bonus, next level progress, and automatic resources unlocked for that level.'],
      resources: ['How do resources and rests work?', 'In Resources, open a character. Each resource has current and maximum uses. Use - and + to adjust, Spent to empty, and Full to restore. Short and long rests recover matching resources; long rest also restores HP.'],
      spells: ['How does the spellbook work?', 'Open a character spellbook in Resources. You can add spells, filter by level, school, and concentration, prepare spells, and cast. The app limits spells to the level unlocked by the character and spends the correct slot.'],
      combat: ['How do I start combat?', 'In Combat, tap + Characters to add the active party. For enemies, fill name, HP, AC, and initiative, then add them to the encounter. New combat clears the current scene.'],
      initiative: ['How does initiative work?', 'Enter initiative and confirm with OK. The app sorts the queue. If there is a tie, Priority moves that participant above tied entries. After acting, a participant goes to the end of the queue; rounds advance automatically.'],
      damage: ['How do damage, healing, and temp HP work?', 'Damage consumes temporary HP first, then normal HP. Healing respects maximum HP. You can use quick damage/heal buttons, zero HP, full HP, add temp HP, and clear temp HP.'],
      concentration: ['How does concentration work?', 'If a participant has Concentrating and takes damage, the app calculates the concentration DC and shows an alert. For concentrating characters, build the total damage and tap Apply damage.'],
      critical: ['How do I use critical fumble?', 'In Combat, tap Critical fumble. Choose attack type: unarmed, melee, ranged, or magic. The app rolls 1d100 and shows range, severity, and effect.'],
      inventory: ['How does inventory work?', 'In Inventory, open a character. You manage coins and items, including quantity, weight, value, description, and equipped status. Load uses STR x 7.5 kg for Medium and STR x 15 kg for Large.'],
      items: ['How do I add library items?', 'In a character inventory, tap New item and choose from catalog. Search and filter by category. If you do not find it, create a custom item; it is saved for reuse. Magic items support rarity, attunement, and charges.'],
      language: ['How do I change language?', 'Open Settings. You can use the device language automatically or manually choose Portuguese, English, or Spanish.'],
    },
    es: {
      flow: ['Cual es el flujo recomendado?', 'Crea un grupo en Personajes, agrega personajes, revisa XP y ficha, usa Recursos para habilidades y conjuros, Inventario para objetos y monedas, y Combate durante encuentros.'],
      groups: ['Como funcionan los grupos?', 'Los grupos organizan personajes por mesa o campaña. El grupo seleccionado filtra Recursos, Inventario y Combate. Puedes crear varios grupos, renombrar manteniendo pulsada la tarjeta, eliminar el grupo sin borrar personajes y agregar personajes existentes.'],
      character: ['Como creo o edito un personaje?', 'En Personajes, selecciona un grupo y toca Agregar personaje. Completa nombre, jugador, raza, clase, subclase, XP, CA, velocidad, iniciativa, PG, tamaño y atributos. Para editar, toca Editar ficha.'],
      xp: ['La XP actualiza el nivel?', 'Si. Al cambiar XP, la app recalcula nivel, bonificador de competencia, progreso al siguiente nivel y recursos automaticos desbloqueados.'],
      resources: ['Como uso recursos y descansos?', 'En Recursos, abre un personaje. Cada recurso tiene usos actuales y maximos. Usa - y + para ajustar, Usado para vaciar y Lleno para restaurar. Descanso corto y largo recuperan recursos compatibles; descanso largo tambien restaura PG.'],
      spells: ['Como funciona el libro de conjuros?', 'Abre el libro de conjuros del personaje en Recursos. Puedes agregar conjuros, filtrar por nivel, escuela y concentracion, preparar y lanzar. La app limita los conjuros al nivel desbloqueado y gasta el espacio correcto.'],
      combat: ['Como inicio un combate?', 'En Combate, toca + Personajes para agregar el grupo activo. Para enemigos, completa nombre, PG, CA e iniciativa, y agregalos al encuentro. Nuevo combate limpia la escena actual.'],
      initiative: ['Como funciona la iniciativa?', 'Ingresa la iniciativa y confirma con OK. La app ordena la cola. Si hay empate, Prioridad coloca ese participante por encima de los empatados. Despues de actuar, baja al final; las rondas avanzan automaticamente.'],
      damage: ['Como funcionan dano, cura y PG temporales?', 'El dano consume primero PG temporales y luego PG normales. La curacion respeta el maximo. Puedes usar botones rapidos, poner PG en cero, llenar PG, agregar temporales y limpiarlos.'],
      concentration: ['Como funciona concentracion?', 'Si un participante esta Concentrando y recibe dano, la app calcula la CD y muestra un aviso. Para concentracion, arma el dano total y toca Aplicar dano.'],
      critical: ['Como uso la pifia critica?', 'En Combate, toca Pifia critica. Elige tipo de ataque: desarmado, cuerpo a cuerpo, distancia o magico. La app tira 1d100 y muestra rango, severidad y efecto.'],
      inventory: ['Como funciona el inventario?', 'En Inventario, abre un personaje. Controlas monedas y objetos, con cantidad, peso, valor, descripcion y equipado. La carga usa FUE x 7,5 kg para Mediano y FUE x 15 kg para Grande.'],
      items: ['Como agrego objetos de biblioteca?', 'En el inventario, toca Nuevo item y elige del catalogo. Puedes buscar y filtrar por categoria. Si no existe, crea un objeto personalizado; queda guardado para reutilizar. Objetos magicos tienen rareza, sintonia y cargas.'],
      language: ['Como cambio el idioma?', 'Abre Ajustes. Puedes usar el idioma del dispositivo o elegir manualmente Portugues, Ingles o Espanol.'],
    },
  };
  return source.map((item) => ({
    ...item,
    question: translated[language][item.id][0],
    answer: translated[language][item.id][1],
  }));
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
    <ScrollView contentContainerStyle={styles.content}>
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
        <TouchableOpacity style={styles.askButton} onPress={() => ask()}>
          <Text style={styles.askButtonText}>{content.askButton}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>{content.quickTitle}</Text>
      <View style={styles.questionGrid}>
        {visibleQuestions.map((item) => (
          <TouchableOpacity key={item.id} style={styles.questionChip} onPress={() => ask(item.question)}>
            <Text style={styles.questionText}>{item.question}</Text>
          </TouchableOpacity>
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
