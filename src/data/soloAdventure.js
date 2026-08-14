export const SOLO_ADVENTURE_ID = 'o-limiar';

export const SOLO_ADVENTURE = {
  id: SOLO_ADVENTURE_ID,
  title: {
    'pt-BR': 'O Limiar',
    en: 'The Threshold',
    es: 'El Umbral',
  },
  subtitle: {
    'pt-BR': 'Uma prova de fogo para o seu personagem',
    en: 'A trial by fire for your character',
    es: 'Una prueba de fuego para tu personaje',
  },
  startSceneId: 'entrada',
  scenes: {
    entrada: {
      type: 'choice',
      eyebrow: {
        'pt-BR': 'Aventura solo',
        en: 'Solo adventure',
        es: 'Aventura en solitario',
      },
      title: {
        'pt-BR': 'A porta sem maçaneta',
        en: 'The door without a handle',
        es: 'La puerta sin picaporte',
      },
      text: {
        'pt-BR': 'A guilda construiu o Limiar para revelar o que uma ficha não mostra. Três marcas cobrem a porta de pedra: uma folha, um olho e um punho.',
        en: 'The guild built the Threshold to reveal what a character sheet cannot. Three marks cover the stone door: a leaf, an eye, and a fist.',
        es: 'El gremio construyó el Umbral para revelar lo que una ficha no muestra. Tres marcas cubren la puerta de piedra: una hoja, un ojo y un puño.',
      },
      choices: [
        {
          id: 'folha',
          ability: 'wisdom',
          skill: 'perception',
          dc: 12,
          nextOnSuccess: 'santuario',
          nextOnFailure: 'corredor',
          label: {
            'pt-BR': 'Observar a folha',
            en: 'Study the leaf',
            es: 'Observar la hoja',
          },
        },
        {
          id: 'olho',
          ability: 'intelligence',
          skill: 'investigation',
          dc: 12,
          nextOnSuccess: 'santuario',
          nextOnFailure: 'corredor',
          label: {
            'pt-BR': 'Decifrar o olho',
            en: 'Decipher the eye',
            es: 'Descifrar el ojo',
          },
        },
        {
          id: 'punho',
          ability: 'strength',
          skill: 'athletics',
          dc: 13,
          nextOnSuccess: 'santuario',
          nextOnFailure: 'corredor',
          label: {
            'pt-BR': 'Forçar a porta',
            en: 'Force the door',
            es: 'Forzar la puerta',
          },
        },
      ],
    },
    corredor: {
      type: 'hazard',
      eyebrow: {
        'pt-BR': 'O Limiar reage',
        en: 'The Threshold reacts',
        es: 'El Umbral reacciona',
      },
      title: {
        'pt-BR': 'Lâminas na escuridão',
        en: 'Blades in the dark',
        es: 'Hojas en la oscuridad',
      },
      text: {
        'pt-BR': 'A escolha errada desperta lâminas escondidas. Sua agilidade decide quanto desse preço será pago.',
        en: 'The wrong choice awakens hidden blades. Your agility decides how much of the price is paid.',
        es: 'La elección equivocada despierta hojas ocultas. Tu agilidad decide cuánto pagarás.',
      },
      ability: 'dexterity',
      savingThrow: true,
      dc: 12,
      damage: { count: 2, sides: 4 },
      halfOnSuccess: true,
      next: 'santuario',
    },
    santuario: {
      type: 'choice',
      eyebrow: {
        'pt-BR': 'Câmara segura',
        en: 'Safe chamber',
        es: 'Cámara segura',
      },
      title: {
        'pt-BR': 'O santuário rachado',
        en: 'The cracked sanctuary',
        es: 'El santuario agrietado',
      },
      text: {
        'pt-BR': 'Uma fonte ainda corre entre as pedras. Adiante, passos pesados anunciam o guardião. Você pode respirar ou seguir antes que ele esteja pronto.',
        en: 'A fountain still runs between the stones. Ahead, heavy steps announce the guardian. You may catch your breath or move before it is ready.',
        es: 'Una fuente aún corre entre las piedras. Más adelante, pasos pesados anuncian al guardián. Puedes recuperar el aliento o avanzar antes de que esté listo.',
      },
      choices: [
        {
          id: 'descansar',
          action: 'short-rest',
          next: 'guardiao',
          label: {
            'pt-BR': 'Fazer um descanso curto',
            en: 'Take a short rest',
            es: 'Tomar un descanso corto',
          },
        },
        {
          id: 'avancar',
          next: 'guardiao',
          label: {
            'pt-BR': 'Avançar imediatamente',
            en: 'Advance immediately',
            es: 'Avanzar de inmediato',
          },
        },
      ],
    },
    guardiao: {
      type: 'combat',
      eyebrow: {
        'pt-BR': 'Combate',
        en: 'Combat',
        es: 'Combate',
      },
      title: {
        'pt-BR': 'O Guardião do Limiar',
        en: 'The Threshold Guardian',
        es: 'El Guardián del Umbral',
      },
      text: {
        'pt-BR': 'Pedra e metal se erguem para medir sua capacidade de sobreviver quando a iniciativa deixa de ser teoria.',
        en: 'Stone and metal rise to measure your ability to survive when initiative stops being theory.',
        es: 'Piedra y metal se alzan para medir tu capacidad de sobrevivir cuando la iniciativa deja de ser teoría.',
      },
      enemy: {
        id: 'threshold-guardian',
        name: {
          'pt-BR': 'Guardião do Limiar',
          en: 'Threshold Guardian',
          es: 'Guardián del Umbral',
        },
        armorClass: 13,
        hp: 18,
        attackBonus: 4,
        damage: { count: 1, sides: 6, bonus: 2 },
        initiativeModifier: 0,
      },
      nextOnVictory: 'veredito',
    },
    veredito: {
      type: 'ending',
      eyebrow: {
        'pt-BR': 'Prova concluída',
        en: 'Trial complete',
        es: 'Prueba completada',
      },
      title: {
        'pt-BR': 'O que o Limiar revelou',
        en: 'What the Threshold revealed',
        es: 'Lo que reveló el Umbral',
      },
      text: {
        'pt-BR': 'A porta final se abre. O resultado não altera sua ficha de mesa: esta foi uma simulação para mostrar como suas escolhas e capacidades funcionam sob pressão.',
        en: 'The final door opens. The result does not alter your tabletop character sheet: this was a simulation showing how your choices and abilities perform under pressure.',
        es: 'La puerta final se abre. El resultado no altera tu ficha de mesa: esta fue una simulación para mostrar cómo funcionan tus decisiones y capacidades bajo presión.',
      },
    },
  },
};

export function soloText(value, language = 'pt-BR') {
  if (!value || typeof value === 'string') return value || '';
  return value[language] || value.en || value['pt-BR'] || '';
}
