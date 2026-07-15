const spell = (id, name, circle, school, classes, castingTime, range, duration, options = {}) => ({
  id,
  name,
  circle,
  school,
  classes,
  castingTime,
  range,
  duration,
  concentration: false,
  ritual: false,
  source: 'OFICIAL',
  summary: '',
  ...options,
});

export const SPELL_SCHOOLS = [
  "Todas",
  "Abjuração",
  "Adivinhação",
  "Conjuração",
  "Encantamento",
  "Evocação",
  "Ilusão",
  "Necromancia",
  "Transmutação"
];

const SPELL_ROWS = [
  {
    "id": "amizade",
    "name": "Amizade",
    "circle": 0,
    "school": "Encantamento",
    "classes": [
      "Bardo",
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Truque oficial do Livro do Jogador. Consulte o detalhe completo na mesa quando precisar de componentes, testes e efeitos finos."
  },
  {
    "id": "ataque-certeiro",
    "name": "Ataque Certeiro",
    "circle": 0,
    "school": "Adivinhação",
    "classes": [
      "Bardo",
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Concentração, até 1 rodada",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Truque oficial do Livro do Jogador. Consulte o detalhe completo na mesa quando precisar de componentes, testes e efeitos finos."
  },
  {
    "id": "bordao-mistico",
    "name": "Bordão Místico",
    "circle": 0,
    "school": "Transmutação",
    "classes": [
      "Druida"
    ],
    "ritual": false,
    "castingTime": "1 ação bônus",
    "range": "Toque",
    "duration": "1 minuto",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Truque oficial do Livro do Jogador. Consulte o detalhe completo na mesa quando precisar de componentes, testes e efeitos finos."
  },
  {
    "id": "chama-sagrada",
    "name": "Chama Sagrada",
    "circle": 0,
    "school": "Evocação",
    "classes": [
      "Clérigo"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Truque oficial do Livro do Jogador. Consulte o detalhe completo na mesa quando precisar de componentes, testes e efeitos finos."
  },
  {
    "id": "chicote-de-espinhos",
    "name": "Chicote de Espinhos",
    "circle": 0,
    "school": "Transmutação",
    "classes": [
      "Druida"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Truque oficial do Livro do Jogador. Consulte o detalhe completo na mesa quando precisar de componentes, testes e efeitos finos."
  },
  {
    "id": "consertar",
    "name": "Consertar",
    "circle": 0,
    "school": "Transmutação",
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 minuto",
    "range": "Toque",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Truque oficial do Livro do Jogador. Consulte o detalhe completo na mesa quando precisar de componentes, testes e efeitos finos."
  },
  {
    "id": "criar-chamas",
    "name": "Criar Chamas",
    "circle": 0,
    "school": "Conjuração",
    "classes": [
      "Druida"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal",
    "duration": "10 minutos",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Truque oficial do Livro do Jogador. Consulte o detalhe completo na mesa quando precisar de componentes, testes e efeitos finos."
  },
  {
    "id": "druidismo",
    "name": "Druidismo",
    "circle": 0,
    "school": "Transmutação",
    "classes": [
      "Druida"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Truque oficial do Livro do Jogador. Consulte o detalhe completo na mesa quando precisar de componentes, testes e efeitos finos."
  },
  {
    "id": "espirro-acido",
    "name": "Espirro Ácido",
    "circle": 0,
    "school": "Conjuração",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Truque oficial do Livro do Jogador. Consulte o detalhe completo na mesa quando precisar de componentes, testes e efeitos finos."
  },
  {
    "id": "estabilizar",
    "name": "Estabilizar",
    "circle": 0,
    "school": "Necromancia",
    "classes": [
      "Clérigo"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Truque oficial do Livro do Jogador. Consulte o detalhe completo na mesa quando precisar de componentes, testes e efeitos finos."
  },
  {
    "id": "globos-de-luz",
    "name": "Globos de Luz",
    "circle": 0,
    "school": "Evocação",
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Truque oficial do Livro do Jogador. Consulte o detalhe completo na mesa quando precisar de componentes, testes e efeitos finos."
  },
  {
    "id": "ilusao-menor",
    "name": "Ilusão Menor",
    "circle": 0,
    "school": "Ilusão",
    "classes": [
      "Bardo",
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "1 minuto",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Truque oficial do Livro do Jogador. Consulte o detalhe completo na mesa quando precisar de componentes, testes e efeitos finos."
  },
  {
    "id": "luz",
    "name": "Luz",
    "circle": 0,
    "school": "Evocação",
    "classes": [
      "Bardo",
      "Clérigo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "1 hora",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Truque oficial do Livro do Jogador. Consulte o detalhe completo na mesa quando precisar de componentes, testes e efeitos finos."
  },
  {
    "id": "maos-magicas",
    "name": "Mãos Mágicas",
    "circle": 0,
    "school": "Conjuração",
    "classes": [
      "Bardo",
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "1 minuto",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Truque oficial do Livro do Jogador. Consulte o detalhe completo na mesa quando precisar de componentes, testes e efeitos finos."
  },
  {
    "id": "mensagem",
    "name": "Mensagem",
    "circle": 0,
    "school": "Transmutação",
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "1 rodada",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Truque oficial do Livro do Jogador. Consulte o detalhe completo na mesa quando precisar de componentes, testes e efeitos finos."
  },
  {
    "id": "orientacao",
    "name": "Orientação",
    "circle": 0,
    "school": "Adivinhação",
    "classes": [
      "Clérigo",
      "Druida"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Truque oficial do Livro do Jogador. Consulte o detalhe completo na mesa quando precisar de componentes, testes e efeitos finos."
  },
  {
    "id": "prestidigitacao",
    "name": "Prestidigitação",
    "circle": 0,
    "school": "Transmutação",
    "classes": [
      "Bardo",
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "3 metros",
    "duration": "Até 1 hora",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Truque oficial do Livro do Jogador. Consulte o detalhe completo na mesa quando precisar de componentes, testes e efeitos finos."
  },
  {
    "id": "protecao-contra-laminas",
    "name": "Proteção contra Lâminas",
    "circle": 0,
    "school": "Abjuração",
    "classes": [
      "Bardo",
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal",
    "duration": "1 rodada",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Truque oficial do Livro do Jogador. Consulte o detalhe completo na mesa quando precisar de componentes, testes e efeitos finos."
  },
  {
    "id": "raio-de-fogo",
    "name": "Raio de Fogo",
    "circle": 0,
    "school": "Evocação",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Truque oficial do Livro do Jogador. Consulte o detalhe completo na mesa quando precisar de componentes, testes e efeitos finos."
  },
  {
    "id": "raio-de-gelo",
    "name": "Raio de Gelo",
    "circle": 0,
    "school": "Evocação",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Truque oficial do Livro do Jogador. Consulte o detalhe completo na mesa quando precisar de componentes, testes e efeitos finos."
  },
  {
    "id": "rajada-de-veneno",
    "name": "Rajada de Veneno",
    "circle": 0,
    "school": "Conjuração",
    "classes": [
      "Bruxo",
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "3 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Truque oficial do Livro do Jogador. Consulte o detalhe completo na mesa quando precisar de componentes, testes e efeitos finos."
  },
  {
    "id": "rajada-mistica",
    "name": "Rajada Mística",
    "circle": 0,
    "school": "Evocação",
    "classes": [
      "Bruxo"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Truque oficial do Livro do Jogador. Consulte o detalhe completo na mesa quando precisar de componentes, testes e efeitos finos."
  },
  {
    "id": "resistencia",
    "name": "Resistência",
    "circle": 0,
    "school": "Abjuração",
    "classes": [
      "Clérigo",
      "Druida"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Truque oficial do Livro do Jogador. Consulte o detalhe completo na mesa quando precisar de componentes, testes e efeitos finos."
  },
  {
    "id": "taumaturgia",
    "name": "Taumaturgia",
    "circle": 0,
    "school": "Transmutação",
    "classes": [
      "Clérigo"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Até 1 minuto",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Truque oficial do Livro do Jogador. Consulte o detalhe completo na mesa quando precisar de componentes, testes e efeitos finos."
  },
  {
    "id": "toque-arrepiante",
    "name": "Toque Arrepiante",
    "circle": 0,
    "school": "Necromancia",
    "classes": [
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "1 rodada",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Truque oficial do Livro do Jogador. Consulte o detalhe completo na mesa quando precisar de componentes, testes e efeitos finos."
  },
  {
    "id": "toque-chocante",
    "name": "Toque Chocante",
    "circle": 0,
    "school": "Evocação",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Truque oficial do Livro do Jogador. Consulte o detalhe completo na mesa quando precisar de componentes, testes e efeitos finos."
  },
  {
    "id": "zombaria-viciosa",
    "name": "Zombaria Viciosa",
    "circle": 0,
    "school": "Encantamento",
    "classes": [
      "Bardo"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Truque oficial do Livro do Jogador. Consulte o detalhe completo na mesa quando precisar de componentes, testes e efeitos finos."
  },
  {
    "id": "alarme",
    "name": "Alarme",
    "circle": 1,
    "school": "Abjuração",
    "classes": [
      "Mago",
      "Patrulheiro"
    ],
    "ritual": true,
    "castingTime": "1 minuto",
    "range": "9 metros",
    "duration": "8 horas",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "amizade-animal",
    "name": "Amizade Animal",
    "circle": 1,
    "school": "Encantamento",
    "classes": [
      "Bardo",
      "Druida",
      "Patrulheiro"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "24 horas",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de encantamento de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "area-escorregadia",
    "name": "Área Escorregadia",
    "circle": 1,
    "school": "Conjuração",
    "classes": [
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "1 minuto",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "armadura-arcana",
    "name": "Armadura Arcana",
    "circle": 1,
    "school": "Abjuração",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "8 horas",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "armadura-de-agathys",
    "name": "Armadura de Agathys",
    "circle": 1,
    "school": "Abjuração",
    "classes": [
      "Bruxo"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal",
    "duration": "1 hora",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "auxilio-divino",
    "name": "Auxílio Divino",
    "circle": 1,
    "school": "Evocação",
    "classes": [
      "Paladino"
    ],
    "ritual": false,
    "castingTime": "1 ação bônus",
    "range": "Pessoal",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "bencao",
    "name": "Bênção",
    "circle": 1,
    "school": "Encantamento",
    "classes": [
      "Clérigo",
      "Paladino"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de encantamento de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "bom-fruto",
    "name": "Bom Fruto",
    "circle": 1,
    "school": "Transmutação",
    "classes": [
      "Druida",
      "Patrulheiro"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "bracos-de-hadar",
    "name": "Braços de Hadar",
    "circle": 1,
    "school": "Conjuração",
    "classes": [
      "Bruxo"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal (3 metros de raio)",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "bruxaria",
    "name": "Bruxaria",
    "circle": 1,
    "school": "Encantamento",
    "classes": [
      "Bruxo"
    ],
    "ritual": false,
    "castingTime": "1 ação bônus",
    "range": "18 metros",
    "duration": "Concentração, até 1 hora",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de encantamento de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "comando",
    "name": "Comando",
    "circle": 1,
    "school": "Encantamento",
    "classes": [
      "Clérigo",
      "Paladino"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "1 rodada",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de encantamento de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "compreender-idiomas",
    "name": "Compreender Idiomas",
    "circle": 1,
    "school": "Adivinhação",
    "classes": [
      "Bardo",
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": true,
    "castingTime": "1 ação",
    "range": "Pessoal",
    "duration": "1 hora",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de adivinhação de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "constricao",
    "name": "Constrição",
    "circle": 1,
    "school": "Conjuração",
    "classes": [
      "Druida"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "27 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "convocar-familiar",
    "name": "Convocar Familiar",
    "circle": 1,
    "school": "Conjuração",
    "classes": [
      "Mago"
    ],
    "ritual": true,
    "castingTime": "1 hora",
    "range": "3 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "criar-ou-destruir-agua",
    "name": "Criar Ou Destruir Água",
    "circle": 1,
    "school": "Transmutação",
    "classes": [
      "Clérigo",
      "Druida"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "curar-ferimentos",
    "name": "Curar Ferimentos",
    "circle": 1,
    "school": "Evocação",
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Paladino",
      "Patrulheiro"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "destruicao-colerica",
    "name": "Destruição Colérica",
    "circle": 1,
    "school": "Evocação",
    "classes": [
      "Paladino"
    ],
    "ritual": false,
    "castingTime": "1 ação bônus",
    "range": "Pessoal",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "destruicao-lancinante",
    "name": "Destruição Lancinante",
    "circle": 1,
    "school": "Evocação",
    "classes": [
      "Paladino"
    ],
    "ritual": false,
    "castingTime": "1 ação bônus",
    "range": "Pessoal",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "destruicao-trovejante",
    "name": "Destruição Trovejante",
    "circle": 1,
    "school": "Evocação",
    "classes": [
      "Paladino"
    ],
    "ritual": false,
    "castingTime": "1 ação bônus",
    "range": "Pessoal",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "detectar-magia",
    "name": "Detectar Magia",
    "circle": 1,
    "school": "Adivinhação",
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Feiticeiro",
      "Mago",
      "Paladino",
      "Patrulheiro"
    ],
    "ritual": true,
    "castingTime": "1 ação",
    "range": "Pessoal",
    "duration": "Concentração, até 10 minutos",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de adivinhação de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "detectar-o-bem-e-mal",
    "name": "Detectar o Bem e Mal",
    "circle": 1,
    "school": "Adivinhação",
    "classes": [
      "Clérigo",
      "Paladino"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal",
    "duration": "Concentração, até 10 minutos",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de adivinhação de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "detectar-veneno-e-doenca",
    "name": "Detectar Veneno e Doença",
    "circle": 1,
    "school": "Adivinhação",
    "classes": [
      "Clérigo",
      "Druida",
      "Paladino",
      "Patrulheiro"
    ],
    "ritual": true,
    "castingTime": "1 ação",
    "range": "Pessoal",
    "duration": "Concentração, até 10 minutos",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de adivinhação de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "disco-flutuante-de-tenser",
    "name": "Disco Flutuante de Tenser",
    "circle": 1,
    "school": "Conjuração",
    "classes": [
      "Mago"
    ],
    "ritual": true,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "1 hora",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "disfarcar-se",
    "name": "Disfarçar-Se",
    "circle": 1,
    "school": "Ilusão",
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal",
    "duration": "1 hora",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de ilusão de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "duelo-compelido",
    "name": "Duelo Compelido",
    "circle": 1,
    "school": "Encantamento",
    "classes": [
      "Paladino"
    ],
    "ritual": false,
    "castingTime": "1 ação bônus",
    "range": "9 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de encantamento de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "enfeiticar-pessoa",
    "name": "Enfeitiçar Pessoa",
    "circle": 1,
    "school": "Encantamento",
    "classes": [
      "Bardo",
      "Bruxo",
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "1 hora",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de encantamento de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "escrita-ilusoria",
    "name": "Escrita Ilusória",
    "circle": 1,
    "school": "Ilusão",
    "classes": [
      "Bardo",
      "Bruxo",
      "Mago"
    ],
    "ritual": true,
    "castingTime": "1 minuto",
    "range": "Toque",
    "duration": "10 dias",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de ilusão de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "escudo-arcano",
    "name": "Escudo Arcano",
    "circle": 1,
    "school": "Abjuração",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 reação, que você faz quando é",
    "range": "Pessoal",
    "duration": "1 rodada",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "escudo-da-fe",
    "name": "Escudo da Fé",
    "circle": 1,
    "school": "Abjuração",
    "classes": [
      "Clérigo",
      "Paladino"
    ],
    "ritual": false,
    "castingTime": "1 ação bônus",
    "range": "18 metros",
    "duration": "Concentração, até 10 minutos",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "falar-com-animais",
    "name": "Falar com Animais",
    "circle": 1,
    "school": "Adivinhação",
    "classes": [
      "Bardo",
      "Druida",
      "Patrulheiro"
    ],
    "ritual": true,
    "castingTime": "1 ação",
    "range": "Pessoal",
    "duration": "10 minutos",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de adivinhação de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "falar-com-plantas",
    "name": "Falar com Plantas",
    "circle": 1,
    "school": "Adivinhação",
    "classes": [
      "Bardo",
      "Druida",
      "Patrulheiro"
    ],
    "ritual": true,
    "castingTime": "1 ação",
    "range": "Pessoal (9 metros de raio)",
    "duration": "10 minutos",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de adivinhação de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "fogo-das-fadas",
    "name": "Fogo das Fadas",
    "circle": 1,
    "school": "Evocação",
    "classes": [
      "Bardo",
      "Druida"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "golpe-constritor",
    "name": "Golpe Constritor",
    "circle": 1,
    "school": "Conjuração",
    "classes": [
      "Patrulheiro"
    ],
    "ritual": false,
    "castingTime": "1 ação bônus",
    "range": "Pessoal",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "heroismo",
    "name": "Heroísmo",
    "circle": 1,
    "school": "Encantamento",
    "classes": [
      "Bardo",
      "Paladino"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de encantamento de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "identificacao",
    "name": "Identificação",
    "circle": 1,
    "school": "Adivinhação",
    "classes": [
      "Bardo",
      "Mago"
    ],
    "ritual": true,
    "castingTime": "1 minuto",
    "range": "Toque",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de adivinhação de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "imagem-silenciosa",
    "name": "Imagem Silenciosa",
    "circle": 1,
    "school": "Ilusão",
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, até 10 minutos",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de ilusão de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "infligir-ferimentos",
    "name": "Infligir Ferimentos",
    "circle": 1,
    "school": "Necromancia",
    "classes": [
      "Clérigo"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de necromancia de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "leque-cromatico",
    "name": "Leque Cromático",
    "circle": 1,
    "school": "Ilusão",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal (cone de 4,5 metros)",
    "duration": "1 rodada",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de ilusão de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "maos-flamejantes",
    "name": "Mãos Flamejantes",
    "circle": 1,
    "school": "Evocação",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal (cone de 4,5 metros)",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "marca-do-cacador",
    "name": "Marca do Caçador",
    "circle": 1,
    "school": "Adivinhação",
    "classes": [
      "Patrulheiro"
    ],
    "ritual": false,
    "castingTime": "1 ação bônus",
    "range": "27 metros",
    "duration": "Concentração, até 1 hora",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de adivinhação de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "misseis-magicos",
    "name": "Mísseis Mágicos",
    "circle": 1,
    "school": "Evocação",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "nevoa-obscurecente",
    "name": "Névoa Obscurecente",
    "circle": 1,
    "school": "Conjuração",
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago",
      "Patrulheiro"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, até 1 hora",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "onda-trovejante",
    "name": "Onda Trovejante",
    "circle": 1,
    "school": "Evocação",
    "classes": [
      "Bardo",
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal (cubo de 4,5 metros)",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "orbe-cromatica",
    "name": "Orbe Cromática",
    "circle": 1,
    "school": "Evocação",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "27 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "palavra-curativa",
    "name": "Palavra Curativa",
    "circle": 1,
    "school": "Evocação",
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida"
    ],
    "ritual": false,
    "castingTime": "1 ação bônus",
    "range": "18 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "passos-longos",
    "name": "Passos Longos",
    "circle": 1,
    "school": "Transmutação",
    "classes": [
      "Bardo",
      "Druida",
      "Mago",
      "Patrulheiro"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "1 hora",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "perdicao",
    "name": "Perdição",
    "circle": 1,
    "school": "Encantamento",
    "classes": [
      "Bardo",
      "Clérigo"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de encantamento de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "protecao-contra-o-bem-e-mal",
    "name": "Proteção contra o Bem e Mal",
    "circle": 1,
    "school": "Abjuração",
    "classes": [
      "Bruxo",
      "Clérigo",
      "Mago",
      "Paladino"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Concentração, até 10 minutos",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "purificar-alimentos",
    "name": "Purificar Alimentos",
    "circle": 1,
    "school": "Transmutação",
    "classes": [
      "Clérigo",
      "Druida",
      "Paladino"
    ],
    "ritual": true,
    "castingTime": "1 ação",
    "range": "3 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "queda-suave",
    "name": "Queda Suave",
    "circle": 1,
    "school": "Transmutação",
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 reação, que você realiza",
    "range": "18 metros",
    "duration": "1 minuto",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "raio-adoecente",
    "name": "Raio Adoecente",
    "circle": 1,
    "school": "Necromancia",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de necromancia de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "raio-de-bruxa",
    "name": "Raio de Bruxa",
    "circle": 1,
    "school": "Evocação",
    "classes": [
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "raio-guiador",
    "name": "Raio Guiador",
    "circle": 1,
    "school": "Evocação",
    "classes": [
      "Clérigo"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "1 rodada",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "recuo-acelerado",
    "name": "Recuo Acelerado",
    "circle": 1,
    "school": "Transmutação",
    "classes": [
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação bônus",
    "range": "Pessoal",
    "duration": "Concentração, até 10 minutos",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "repreensao-infernal",
    "name": "Repreensão Infernal",
    "circle": 1,
    "school": "Evocação",
    "classes": [
      "Bruxo"
    ],
    "ritual": false,
    "castingTime": "1 reação, que você faz em",
    "range": "18 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "riso-histerico-de-tasha",
    "name": "Riso Histérico de Tasha",
    "circle": 1,
    "school": "Encantamento",
    "classes": [
      "Bardo",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de encantamento de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "salto",
    "name": "Salto",
    "circle": 1,
    "school": "Transmutação",
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago",
      "Patrulheiro"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "1 minuto",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "santuario",
    "name": "Santuário",
    "circle": 1,
    "school": "Abjuração",
    "classes": [
      "Clérigo"
    ],
    "ritual": false,
    "castingTime": "1 ação bônus",
    "range": "9 metros",
    "duration": "1 minuto",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "saraivada-de-espinhos",
    "name": "Saraivada de Espinhos",
    "circle": 1,
    "school": "Conjuração",
    "classes": [
      "Patrulheiro"
    ],
    "ritual": false,
    "castingTime": "1 ação bônus",
    "range": "Pessoal",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "servo-invisivel",
    "name": "Servo Invisível",
    "circle": 1,
    "school": "Conjuração",
    "classes": [
      "Bardo",
      "Bruxo",
      "Mago"
    ],
    "ritual": true,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "1 hora",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "sono",
    "name": "Sono",
    "circle": 1,
    "school": "Encantamento",
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "1 minuto",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de encantamento de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "sussurros-dissonantes",
    "name": "Sussurros Dissonantes",
    "circle": 1,
    "school": "Encantamento",
    "classes": [
      "Bardo"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de encantamento de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "vitalidade-falsa",
    "name": "Vitalidade Falsa",
    "circle": 1,
    "school": "Necromancia",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal",
    "duration": "1 hora",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de necromancia de 1º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "acalmar-emocoes",
    "name": "Acalmar Emoções",
    "circle": 2,
    "school": "Encantamento",
    "classes": [
      "Bardo",
      "Clérigo"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de encantamento de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "ajuda",
    "name": "Ajuda",
    "circle": 2,
    "school": "Abjuração",
    "classes": [
      "Clérigo",
      "Paladino"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "8 horas",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "alterar-se",
    "name": "Alterar-Se",
    "circle": 2,
    "school": "Transmutação",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal",
    "duration": "Concentração, até 1 hora",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "aprimorar-habilidade",
    "name": "Aprimorar Habilidade",
    "circle": 2,
    "school": "Transmutação",
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Feiticeiro"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Concentração, até 1 hora",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "arma-espiritual",
    "name": "Arma Espiritual",
    "circle": 2,
    "school": "Evocação",
    "classes": [
      "Clérigo"
    ],
    "ritual": false,
    "castingTime": "1 ação bônus",
    "range": "18 metros",
    "duration": "1 minuto",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "arma-magica",
    "name": "Arma Mágica",
    "circle": 2,
    "school": "Transmutação",
    "classes": [
      "Mago",
      "Paladino"
    ],
    "ritual": false,
    "castingTime": "1 ação bônus",
    "range": "Toque",
    "duration": "Concentração, até 1 hora",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "arrombar",
    "name": "Arrombar",
    "circle": 2,
    "school": "Transmutação",
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "augurio",
    "name": "Augúrio",
    "circle": 2,
    "school": "Adivinhação",
    "classes": [
      "Clérigo"
    ],
    "ritual": true,
    "castingTime": "1 minuto",
    "range": "Pessoal",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de adivinhação de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "aumentar-reduzir",
    "name": "Aumentar/Reduzir",
    "circle": 2,
    "school": "Transmutação",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "aura-magica-de-nystul",
    "name": "Aura Mágica de Nystul",
    "circle": 2,
    "school": "Ilusão",
    "classes": [
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "24 horas",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de ilusão de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "boca-encantada",
    "name": "Boca Encantada",
    "circle": 2,
    "school": "Ilusão",
    "classes": [
      "Bardo",
      "Mago"
    ],
    "ritual": true,
    "castingTime": "1 minuto",
    "range": "9 metros",
    "duration": "Até ser dissipada",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de ilusão de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "cativar",
    "name": "Cativar",
    "circle": 2,
    "school": "Encantamento",
    "classes": [
      "Bardo",
      "Bruxo"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "1 minuto",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de encantamento de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "cegueira-surdez",
    "name": "Cegueira/Surdez",
    "circle": 2,
    "school": "Necromancia",
    "classes": [
      "Bardo",
      "Clérigo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "1 minuto",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de necromancia de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "chama-continua",
    "name": "Chama Continua",
    "circle": 2,
    "school": "Evocação",
    "classes": [
      "Clérigo",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Até ser dissipada",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "convocar-montaria",
    "name": "Convocar Montaria",
    "circle": 2,
    "school": "Conjuração",
    "classes": [
      "Paladino"
    ],
    "ritual": false,
    "castingTime": "10 minutos",
    "range": "9 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "cordao-de-flechas",
    "name": "Cordão de Flechas",
    "circle": 2,
    "school": "Transmutação",
    "classes": [
      "Patrulheiro"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "1,5 metro",
    "duration": "8 horas",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "coroa-da-loucura",
    "name": "Coroa da Loucura",
    "circle": 2,
    "school": "Encantamento",
    "classes": [
      "Bardo",
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de encantamento de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "crescer-espinhos",
    "name": "Crescer Espinhos",
    "circle": 2,
    "school": "Transmutação",
    "classes": [
      "Druida",
      "Patrulheiro"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "45 metros",
    "duration": "Concentração, até 10 minutos",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "despedacar",
    "name": "Despedaçar",
    "circle": 2,
    "school": "Evocação",
    "classes": [
      "Bardo",
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "detectar-pensamentos",
    "name": "Detectar Pensamentos",
    "circle": 2,
    "school": "Adivinhação",
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de adivinhação de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "encontrar-armadilhas",
    "name": "Encontrar Armadilhas",
    "circle": 2,
    "school": "Adivinhação",
    "classes": [
      "Clérigo",
      "Druida",
      "Patrulheiro"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de adivinhação de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "escuridao",
    "name": "Escuridão",
    "circle": 2,
    "school": "Evocação",
    "classes": [
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, até 10 minutos",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "esfera-flamejante",
    "name": "Esfera Flamejante",
    "circle": 2,
    "school": "Conjuração",
    "classes": [
      "Druida",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "esquentar-metal",
    "name": "Esquentar Metal",
    "circle": 2,
    "school": "Transmutação",
    "classes": [
      "Bardo",
      "Druida"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "flecha-acida-de-melf",
    "name": "Flecha Ácida de Melf",
    "circle": 2,
    "school": "Evocação",
    "classes": [
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "forca-fantasmagorica",
    "name": "Força Fantasmagórica",
    "circle": 2,
    "school": "Ilusão",
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de ilusão de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "imobilizar-pessoa",
    "name": "Imobilizar Pessoa",
    "circle": 2,
    "school": "Encantamento",
    "classes": [
      "Bardo",
      "Bruxo",
      "Clérigo",
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de encantamento de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "invisibilidade",
    "name": "Invisibilidade",
    "circle": 2,
    "school": "Ilusão",
    "classes": [
      "Bardo",
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Concentração, até 1 hora",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de ilusão de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "lamina-flamejante",
    "name": "Lâmina Flamejante",
    "circle": 2,
    "school": "Evocação",
    "classes": [
      "Druida"
    ],
    "ritual": false,
    "castingTime": "1 ação bônus",
    "range": "Pessoal",
    "duration": "Concentração, até 10 minutos",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "levitacao",
    "name": "Levitação",
    "circle": 2,
    "school": "Transmutação",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, até 10 minutos",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "localizar-animais-ou-plantas",
    "name": "Localizar Animais Ou Plantas",
    "circle": 2,
    "school": "Adivinhação",
    "classes": [
      "Bardo",
      "Druida",
      "Patrulheiro"
    ],
    "ritual": true,
    "castingTime": "1 ação",
    "range": "Pessoal",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de adivinhação de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "localizar-objeto",
    "name": "Localizar Objeto",
    "circle": 2,
    "school": "Adivinhação",
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Mago",
      "Paladino",
      "Patrulheiro"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal",
    "duration": "Concentração, até 10 minutos",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de adivinhação de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "lufada-de-vento",
    "name": "Lufada de Vento",
    "circle": 2,
    "school": "Evocação",
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal (linha de 18 metros)",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "marca-da-punicao",
    "name": "Marca da Punição",
    "circle": 2,
    "school": "Evocação",
    "classes": [
      "Paladino"
    ],
    "ritual": false,
    "castingTime": "1 ação bônus",
    "range": "Pessoal",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "mensageiro-animal",
    "name": "Mensageiro Animal",
    "circle": 2,
    "school": "Encantamento",
    "classes": [
      "Bardo",
      "Druida",
      "Patrulheiro"
    ],
    "ritual": true,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "24 horas",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de encantamento de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "nublar",
    "name": "Nublar",
    "circle": 2,
    "school": "Ilusão",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de ilusão de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "nuvem-de-adagas",
    "name": "Nuvem de Adagas",
    "circle": 2,
    "school": "Conjuração",
    "classes": [
      "Bardo",
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "oracao-curativa",
    "name": "Oração Curativa",
    "circle": 2,
    "school": "Evocação",
    "classes": [
      "Clérigo"
    ],
    "ritual": false,
    "castingTime": "10 minutos",
    "range": "9 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "passo-nebuloso",
    "name": "Passo Nebuloso",
    "circle": 2,
    "school": "Conjuração",
    "classes": [
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação bônus",
    "range": "Pessoal",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "passos-sem-pegadas",
    "name": "Passos sem Pegadas",
    "circle": 2,
    "school": "Abjuração",
    "classes": [
      "Druida",
      "Patrulheiro"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal",
    "duration": "Concentração, até 1 hora",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "patas-de-aranha",
    "name": "Patas de Aranha",
    "circle": 2,
    "school": "Transmutação",
    "classes": [
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Concentração, até 1 hora",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "pele-de-arvore",
    "name": "Pele de Árvore",
    "circle": 2,
    "school": "Transmutação",
    "classes": [
      "Druida",
      "Patrulheiro"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Concentração, até 1 hora",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "protecao-contra-veneno",
    "name": "Proteção contra Veneno",
    "circle": 2,
    "school": "Abjuração",
    "classes": [
      "Clérigo",
      "Druida",
      "Paladino",
      "Patrulheiro"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "1 hora",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "raio-ardente",
    "name": "Raio Ardente",
    "circle": 2,
    "school": "Evocação",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "raio-do-enfraquecimento",
    "name": "Raio do Enfraquecimento",
    "circle": 2,
    "school": "Necromancia",
    "classes": [
      "Bruxo",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de necromancia de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "raio-lunar",
    "name": "Raio Lunar",
    "circle": 2,
    "school": "Evocação",
    "classes": [
      "Druida"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "reflexos",
    "name": "Reflexos",
    "circle": 2,
    "school": "Ilusão",
    "classes": [
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal",
    "duration": "1 minuto",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de ilusão de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "repouso-tranquilo",
    "name": "Repouso Tranquilo",
    "circle": 2,
    "school": "Necromancia",
    "classes": [
      "Clérigo",
      "Mago"
    ],
    "ritual": true,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "10 dias",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de necromancia de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "restauracao-menor",
    "name": "Restauração Menor",
    "circle": 2,
    "school": "Abjuração",
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Paladino",
      "Patrulheiro"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "sentido-bestial",
    "name": "Sentido Bestial",
    "circle": 2,
    "school": "Adivinhação",
    "classes": [
      "Druida",
      "Patrulheiro"
    ],
    "ritual": true,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Concentração, até 1 hora",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de adivinhação de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "silencio",
    "name": "Silêncio",
    "circle": 2,
    "school": "Ilusão",
    "classes": [
      "Bardo",
      "Clérigo",
      "Patrulheiro"
    ],
    "ritual": true,
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, até 10 minutos",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de ilusão de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "sugestao",
    "name": "Sugestão",
    "circle": 2,
    "school": "Encantamento",
    "classes": [
      "Bardo",
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Concentração, até 8 horas",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de encantamento de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "teia",
    "name": "Teia",
    "circle": 2,
    "school": "Conjuração",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, até 1 hora",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "tranca-arcana",
    "name": "Tranca Arcana",
    "circle": 2,
    "school": "Abjuração",
    "classes": [
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Até ser dissipada",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "truque-de-corda",
    "name": "Truque de Corda",
    "circle": 2,
    "school": "Transmutação",
    "classes": [
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "1 hora",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "ver-o-invisivel",
    "name": "Ver o Invisível",
    "circle": 2,
    "school": "Adivinhação",
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal",
    "duration": "1 hora",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de adivinhação de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "vinculo-protetor",
    "name": "Vínculo Protetor",
    "circle": 2,
    "school": "Abjuração",
    "classes": [
      "Clérigo"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "1 hora",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "visao-no-escuro",
    "name": "Visão No Escuro",
    "circle": 2,
    "school": "Transmutação",
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago",
      "Patrulheiro"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "8 horas",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "zona-da-verdade",
    "name": "Zona da Verdade",
    "circle": 2,
    "school": "Encantamento",
    "classes": [
      "Bardo",
      "Clérigo",
      "Paladino"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "10 minutos",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de encantamento de 2º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "ampliar-plantas",
    "name": "Ampliar Plantas",
    "circle": 3,
    "school": "Transmutação",
    "classes": [
      "Bardo",
      "Druida",
      "Patrulheiro"
    ],
    "ritual": false,
    "castingTime": "1 ação ou 8 horas",
    "range": "45 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "andar-na-agua",
    "name": "Andar Na Água",
    "circle": 3,
    "school": "Transmutação",
    "classes": [
      "Clérigo",
      "Druida",
      "Feiticeiro",
      "Patrulheiro"
    ],
    "ritual": true,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "1 hora",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "animar-mortos",
    "name": "Animar Mortos",
    "circle": 3,
    "school": "Necromancia",
    "classes": [
      "Clérigo",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 minuto",
    "range": "3 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de necromancia de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "arma-elemental",
    "name": "Arma Elemental",
    "circle": 3,
    "school": "Transmutação",
    "classes": [
      "Paladino"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Concentração, até 1 hora",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "aura-de-vitalidade",
    "name": "Aura de Vitalidade",
    "circle": 3,
    "school": "Evocação",
    "classes": [
      "Paladino"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal (9 metros de raio)",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "bola-de-fogo",
    "name": "Bola de Fogo",
    "circle": 3,
    "school": "Evocação",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "45 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "circulo-magico",
    "name": "Círculo Mágico",
    "circle": 3,
    "school": "Abjuração",
    "classes": [
      "Bruxo",
      "Clérigo",
      "Mago",
      "Paladino"
    ],
    "ritual": false,
    "castingTime": "1 minuto",
    "range": "3 metros",
    "duration": "1 hora",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "clarividencia",
    "name": "Clarividência",
    "circle": 3,
    "school": "Adivinhação",
    "classes": [
      "Bardo",
      "Clérigo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "10 minutos",
    "range": "1,5 quilômetro",
    "duration": "Concentração, até 10 minutos",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de adivinhação de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "conjurar-animais",
    "name": "Conjurar Animais",
    "circle": 3,
    "school": "Conjuração",
    "classes": [
      "Druida",
      "Patrulheiro"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, até 1 hora",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "conjurar-rajada",
    "name": "Conjurar Rajada",
    "circle": 3,
    "school": "Conjuração",
    "classes": [
      "Patrulheiro"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal (cone de 18 metros)",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "contramagica",
    "name": "Contramágica",
    "circle": 3,
    "school": "Abjuração",
    "classes": [
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 reação, que você realiza",
    "range": "18 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "convocar-relampagos",
    "name": "Convocar Relâmpagos",
    "circle": 3,
    "school": "Conjuração",
    "classes": [
      "Druida"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, até 10 minutos",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "criar-alimentos",
    "name": "Criar Alimentos",
    "circle": 3,
    "school": "Conjuração",
    "classes": [
      "Clérigo",
      "Paladino"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "destruicao-cegante",
    "name": "Destruição Cegante",
    "circle": 3,
    "school": "Evocação",
    "classes": [
      "Paladino"
    ],
    "ritual": false,
    "castingTime": "1 ação bônus",
    "range": "Pessoal",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "dificultar-deteccao",
    "name": "Dificultar Detecção",
    "circle": 3,
    "school": "Abjuração",
    "classes": [
      "Bardo",
      "Mago",
      "Patrulheiro"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "8 horas",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "dissipar-magia",
    "name": "Dissipar Magia",
    "circle": 3,
    "school": "Abjuração",
    "classes": [
      "Bardo",
      "Bruxo",
      "Clérigo",
      "Druida",
      "Feiticeiro",
      "Mago",
      "Paladino"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "enviar-mensagem",
    "name": "Enviar Mensagem",
    "circle": 3,
    "school": "Evocação",
    "classes": [
      "Bardo",
      "Clérigo",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Ilimitado",
    "duration": "1 rodada",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "espiritos-guardioes",
    "name": "Espíritos Guardiões",
    "circle": 3,
    "school": "Conjuração",
    "classes": [
      "Clérigo"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal (4,5 metros deraio)",
    "duration": "Concentração, até 10 minutos",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "falar-com-os-mortos",
    "name": "Falar com os Mortos",
    "circle": 3,
    "school": "Necromancia",
    "classes": [
      "Bardo",
      "Clérigo"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "3 metros",
    "duration": "10 minutos",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de necromancia de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "flecha-relampejante",
    "name": "Flecha Relampejante",
    "circle": 3,
    "school": "Transmutação",
    "classes": [
      "Patrulheiro"
    ],
    "ritual": false,
    "castingTime": "1 ação bônus",
    "range": "Pessoal",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "fome-de-hadar",
    "name": "Fome de Hadar",
    "circle": 3,
    "school": "Conjuração",
    "classes": [
      "Bruxo"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "45 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "forjar-morte",
    "name": "Forjar Morte",
    "circle": 3,
    "school": "Necromancia",
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Mago"
    ],
    "ritual": true,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "1 hora",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de necromancia de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "forma-gasosa",
    "name": "Forma Gasosa",
    "circle": 3,
    "school": "Transmutação",
    "classes": [
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Concentração, até 1 hora",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "glifo-de-vigilancia",
    "name": "Glifo de Vigilância",
    "circle": 3,
    "school": "Abjuração",
    "classes": [
      "Bardo",
      "Clérigo",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 hora",
    "range": "Toque",
    "duration": "Até ser dissipada ou ativada",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "idiomas",
    "name": "Idiomas",
    "circle": 3,
    "school": "Adivinhação",
    "classes": [
      "Bardo",
      "Bruxo",
      "Clérigo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "1 hora",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de adivinhação de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "imagem-maior",
    "name": "Imagem Maior",
    "circle": 3,
    "school": "Ilusão",
    "classes": [
      "Bardo",
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, até 10 minutos",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de ilusão de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "lentidao",
    "name": "Lentidão",
    "circle": 3,
    "school": "Transmutação",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "luz-do-dia",
    "name": "Luz do Dia",
    "circle": 3,
    "school": "Evocação",
    "classes": [
      "Clérigo",
      "Druida",
      "Feiticeiro",
      "Paladino",
      "Patrulheiro"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "1 hora",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "manto-do-cruzado",
    "name": "Manto do Cruzado",
    "circle": 3,
    "school": "Evocação",
    "classes": [
      "Paladino"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "medo",
    "name": "Medo",
    "circle": 3,
    "school": "Ilusão",
    "classes": [
      "Bardo",
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal (cone de 9 metros)",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de ilusão de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "mesclar-se-as-rochas",
    "name": "Mesclar-Se Às Rochas",
    "circle": 3,
    "school": "Transmutação",
    "classes": [
      "Clérigo",
      "Druida"
    ],
    "ritual": true,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "8 horas",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "montaria-fantasmagorica",
    "name": "Montaria Fantasmagórica",
    "circle": 3,
    "school": "Ilusão",
    "classes": [
      "Mago"
    ],
    "ritual": true,
    "castingTime": "1 minuto",
    "range": "9 metros",
    "duration": "1 hora",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de ilusão de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "muralha-de-vento",
    "name": "Muralha de Vento",
    "circle": 3,
    "school": "Evocação",
    "classes": [
      "Druida",
      "Patrulheiro"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "nevasca",
    "name": "Nevasca",
    "circle": 3,
    "school": "Conjuração",
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "45 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "nevoa-fetida",
    "name": "Névoa Fétida",
    "circle": 3,
    "school": "Conjuração",
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "27 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "padrao-hipnotico",
    "name": "Padrão Hipnótico",
    "circle": 3,
    "school": "Ilusão",
    "classes": [
      "Bardo",
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de ilusão de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "palavra-curativa-em-massa",
    "name": "Palavra Curativa em Massa",
    "circle": 3,
    "school": "Evocação",
    "classes": [
      "Clérigo"
    ],
    "ritual": false,
    "castingTime": "1 ação bônus",
    "range": "18 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "pequena-cabana-de-leomund",
    "name": "Pequena Cabana de Leomund",
    "circle": 3,
    "school": "Evocação",
    "classes": [
      "Bardo",
      "Mago"
    ],
    "ritual": true,
    "castingTime": "1 minuto",
    "range": "Pessoal (hemisfério de 3 metros de raio)",
    "duration": "8 horas",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "piscar",
    "name": "Piscar",
    "circle": 3,
    "school": "Transmutação",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal",
    "duration": "1 minuto",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "protecao-contra-energia",
    "name": "Proteção contra Energia",
    "circle": 3,
    "school": "Abjuração",
    "classes": [
      "Clérigo",
      "Druida",
      "Feiticeiro",
      "Mago",
      "Patrulheiro"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Concentração, até 1 hora",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "relampago",
    "name": "Relâmpago",
    "circle": 3,
    "school": "Evocação",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal (linha de 30 metros)",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "remover-maldicao",
    "name": "Remover Maldição",
    "circle": 3,
    "school": "Abjuração",
    "classes": [
      "Bruxo",
      "Clérigo",
      "Mago",
      "Paladino"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "respirar-na-agua",
    "name": "Respirar Na Água",
    "circle": 3,
    "school": "Transmutação",
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago",
      "Patrulheiro"
    ],
    "ritual": true,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "24 horas",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "revivificar",
    "name": "Revivificar",
    "circle": 3,
    "school": "Necromancia",
    "classes": [
      "Clérigo",
      "Paladino"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de necromancia de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "rogar-maldicao",
    "name": "Rogar Maldição",
    "circle": 3,
    "school": "Necromancia",
    "classes": [
      "Bardo",
      "Clérigo",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de necromancia de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "sinal-de-esperanca",
    "name": "Sinal de Esperança",
    "circle": 3,
    "school": "Abjuração",
    "classes": [
      "Clérigo"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "toque-vampirico",
    "name": "Toque Vampírico",
    "circle": 3,
    "school": "Necromancia",
    "classes": [
      "Bruxo",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de necromancia de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "velocidade",
    "name": "Velocidade",
    "circle": 3,
    "school": "Transmutação",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "voo",
    "name": "Voo",
    "circle": 3,
    "school": "Transmutação",
    "classes": [
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Concentração, até 10 minutos",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 3º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "adivinhacao",
    "name": "Adivinhação",
    "circle": 4,
    "school": "Adivinhação",
    "classes": [
      "Clérigo"
    ],
    "ritual": true,
    "castingTime": "1 ação",
    "range": "Pessoal",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de adivinhação de 4º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "arca-secreta-de-leomund",
    "name": "Arca Secreta de Leomund",
    "circle": 4,
    "school": "Conjuração",
    "classes": [
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 4º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "assassino-fantasmagorico",
    "name": "Assassino Fantasmagórico",
    "circle": 4,
    "school": "Ilusão",
    "classes": [
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de ilusão de 4º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "aura-de-pureza",
    "name": "Aura de Pureza",
    "circle": 4,
    "school": "Abjuração",
    "classes": [
      "Paladino"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal (9 metros de raio)",
    "duration": "Concentração, até 10 minutos",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 4º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "aura-de-vida",
    "name": "Aura de Vida",
    "circle": 4,
    "school": "Abjuração",
    "classes": [
      "Paladino"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal (9 metros de raio)",
    "duration": "Concentração, até 10 minutos",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 4º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "banimento",
    "name": "Banimento",
    "circle": 4,
    "school": "Abjuração",
    "classes": [
      "Bruxo",
      "Clérigo",
      "Feiticeiro",
      "Mago",
      "Paladino"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 4º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "cao-fiel-de-mordenkainen",
    "name": "Cão Fiel de Mordenkainen",
    "circle": 4,
    "school": "Conjuração",
    "classes": [
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "8 horas",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 4º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "compulsao",
    "name": "Compulsão",
    "circle": 4,
    "school": "Encantamento",
    "classes": [
      "Bardo"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de encantamento de 4º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "confusao",
    "name": "Confusão",
    "circle": 4,
    "school": "Encantamento",
    "classes": [
      "Bardo",
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "27 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de encantamento de 4º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "conjurar-elementais-menores",
    "name": "Conjurar Elementais Menores",
    "circle": 4,
    "school": "Conjuração",
    "classes": [
      "Druida",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 minuto",
    "range": "27 metros",
    "duration": "Concentração, até 1 hora",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 4º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "conjurar-seres-da-floresta",
    "name": "Conjurar Seres da Floresta",
    "circle": 4,
    "school": "Conjuração",
    "classes": [
      "Druida",
      "Patrulheiro"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, até 1 hora",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 4º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "controlar-a-agua",
    "name": "Controlar a Água",
    "circle": 4,
    "school": "Transmutação",
    "classes": [
      "Clérigo",
      "Druida",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "90 metros",
    "duration": "Concentração, até 10 minutos",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 4º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "destruicao-estonteante",
    "name": "Destruição Estonteante",
    "circle": 4,
    "school": "Evocação",
    "classes": [
      "Paladino"
    ],
    "ritual": false,
    "castingTime": "1 ação bônus",
    "range": "Pessoal",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 4º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "dominar-besta",
    "name": "Dominar Besta",
    "circle": 4,
    "school": "Encantamento",
    "classes": [
      "Druida",
      "Feiticeiro"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de encantamento de 4º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "escudo-de-fogo",
    "name": "Escudo de Fogo",
    "circle": 4,
    "school": "Evocação",
    "classes": [
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal",
    "duration": "10 minutos",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 4º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "esfera-resiliente-de-otiluke",
    "name": "Esfera Resiliente de Otiluke",
    "circle": 4,
    "school": "Evocação",
    "classes": [
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 4º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "fabricar",
    "name": "Fabricar",
    "circle": 4,
    "school": "Transmutação",
    "classes": [
      "Mago"
    ],
    "ritual": false,
    "castingTime": "10 minutos",
    "range": "36 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 4º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "guardiao-da-fe",
    "name": "Guardião da Fé",
    "circle": 4,
    "school": "Conjuração",
    "classes": [
      "Clérigo"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "8 horas",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 4º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "inseto-gigante",
    "name": "Inseto Gigante",
    "circle": 4,
    "school": "Transmutação",
    "classes": [
      "Druida"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Concentração, até 10 minutos",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 4º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "invisibilidade-maior",
    "name": "Invisibilidade Maior",
    "circle": 4,
    "school": "Ilusão",
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de ilusão de 4º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "localizar-criatura",
    "name": "Localizar Criatura",
    "circle": 4,
    "school": "Adivinhação",
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Mago",
      "Paladino",
      "Patrulheiro"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal",
    "duration": "Concentração, até 1 hora",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de adivinhação de 4º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "malogro",
    "name": "Malogro",
    "circle": 4,
    "school": "Necromancia",
    "classes": [
      "Bruxo",
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de necromancia de 4º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "metamorfose",
    "name": "Metamorfose",
    "circle": 4,
    "school": "Transmutação",
    "classes": [
      "Bardo",
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, até 1 hora",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 4º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "moldar-rochas",
    "name": "Moldar Rochas",
    "circle": 4,
    "school": "Transmutação",
    "classes": [
      "Clérigo",
      "Druida",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 4º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "movimentacao-livre",
    "name": "Movimentação Livre",
    "circle": 4,
    "school": "Abjuração",
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Patrulheiro"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "1 hora",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 4º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "muralha-de-fogo",
    "name": "Muralha de Fogo",
    "circle": 4,
    "school": "Evocação",
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 4º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "olho-arcano",
    "name": "Olho Arcano",
    "circle": 4,
    "school": "Adivinhação",
    "classes": [
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Concentração, até 1 hora",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de adivinhação de 4º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "pele-de-pedra",
    "name": "Pele de Pedra",
    "circle": 4,
    "school": "Abjuração",
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago",
      "Patrulheiro"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Concentração, até 1 hora",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 4º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "porta-dimensional",
    "name": "Porta Dimensional",
    "circle": 4,
    "school": "Conjuração",
    "classes": [
      "Bardo",
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "150 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 4º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "protecao-contra-a-morte",
    "name": "Proteção contra a Morte",
    "circle": 4,
    "school": "Abjuração",
    "classes": [
      "Clérigo",
      "Paladino"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "8 horas",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 4º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "santuario-particular-de-mordenkainen",
    "name": "Santuário Particular de Mordenkainen",
    "circle": 4,
    "school": "Abjuração",
    "classes": [
      "Mago"
    ],
    "ritual": false,
    "castingTime": "10 minutos",
    "range": "36 metros",
    "duration": "24 horas",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 4º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "tempestade-de-gelo",
    "name": "Tempestade de Gelo",
    "circle": 4,
    "school": "Evocação",
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "90 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 4º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "tentaculos-negros-de-evard",
    "name": "Tentáculos Negros de Evard",
    "circle": 4,
    "school": "Conjuração",
    "classes": [
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "27 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 4º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "terreno-alucinogeno",
    "name": "Terreno Alucinógeno",
    "circle": 4,
    "school": "Ilusão",
    "classes": [
      "Bardo",
      "Bruxo",
      "Druida",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "10 minutos",
    "range": "90 metros",
    "duration": "24 horas",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de ilusão de 4º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "vinha-esmagadora",
    "name": "Vinha Esmagadora",
    "circle": 4,
    "school": "Conjuração",
    "classes": [
      "Druida",
      "Patrulheiro"
    ],
    "ritual": false,
    "castingTime": "1 ação bônus",
    "range": "9 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 4º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "aljava-veloz",
    "name": "Aljava Veloz",
    "circle": 5,
    "school": "Transmutação",
    "classes": [
      "Patrulheiro"
    ],
    "ritual": false,
    "castingTime": "1 ação bônus",
    "range": "Toque",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "ancora-planar",
    "name": "Âncora Planar",
    "circle": 5,
    "school": "Abjuração",
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 hora",
    "range": "18 metros",
    "duration": "24 horas",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "animar-objetos",
    "name": "Animar Objetos",
    "circle": 5,
    "school": "Transmutação",
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "caminhar-em-arvores",
    "name": "Caminhar em Árvores",
    "circle": 5,
    "school": "Conjuração",
    "classes": [
      "Druida",
      "Patrulheiro"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "circulo-de-poder",
    "name": "Círculo de Poder",
    "circle": 5,
    "school": "Abjuração",
    "classes": [
      "Paladino"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal (9 metros de raio)",
    "duration": "Concentração, até 10 minutos",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "circulo-de-teletransporte",
    "name": "Círculo de Teletransporte",
    "circle": 5,
    "school": "Conjuração",
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 minuto",
    "range": "3 metros",
    "duration": "1 rodada",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "coluna-de-chamas",
    "name": "Coluna de Chamas",
    "circle": 5,
    "school": "Evocação",
    "classes": [
      "Clérigo"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "comunhao",
    "name": "Comunhão",
    "circle": 5,
    "school": "Adivinhação",
    "classes": [
      "Clérigo"
    ],
    "ritual": true,
    "castingTime": "1 minuto",
    "range": "Pessoal",
    "duration": "1 minuto",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de adivinhação de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "comunhao-com-a-natureza",
    "name": "Comunhão com a Natureza",
    "circle": 5,
    "school": "Adivinhação",
    "classes": [
      "Druida",
      "Patrulheiro"
    ],
    "ritual": true,
    "castingTime": "1 minuto",
    "range": "Pessoal",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de adivinhação de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "cone-de-frio",
    "name": "Cone de Frio",
    "circle": 5,
    "school": "Evocação",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal (cone de 18 metros)",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "conhecimento-lendario",
    "name": "Conhecimento Lendário",
    "circle": 5,
    "school": "Adivinhação",
    "classes": [
      "Bardo",
      "Clérigo",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "10 minutos",
    "range": "Pessoal",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de adivinhação de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "conjurar-elemental",
    "name": "Conjurar Elemental",
    "circle": 5,
    "school": "Conjuração",
    "classes": [
      "Druida",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 minuto",
    "range": "27 metros",
    "duration": "Concentração, até 1 hora",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "conjurar-saraivada",
    "name": "Conjurar Saraivada",
    "circle": 5,
    "school": "Conjuração",
    "classes": [
      "Patrulheiro"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "45 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "consagrar",
    "name": "Consagrar",
    "circle": 5,
    "school": "Evocação",
    "classes": [
      "Clérigo"
    ],
    "ritual": false,
    "castingTime": "24 horas",
    "range": "Toque",
    "duration": "Até ser dissipada",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "contato-extraplanar",
    "name": "Contato Extraplanar",
    "circle": 5,
    "school": "Adivinhação",
    "classes": [
      "Bruxo",
      "Mago"
    ],
    "ritual": true,
    "castingTime": "1 minuto",
    "range": "Pessoal",
    "duration": "1 minuto",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de adivinhação de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "criacao",
    "name": "Criação",
    "circle": 5,
    "school": "Ilusão",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 minuto",
    "range": "9 metros",
    "duration": "Especial",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de ilusão de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "criar-passagem",
    "name": "Criar Passagem",
    "circle": 5,
    "school": "Transmutação",
    "classes": [
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "1 hora",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "cupula-antivida",
    "name": "Cúpula Antivida",
    "circle": 5,
    "school": "Abjuração",
    "classes": [
      "Druida"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal (3 metros de raio)",
    "duration": "Concentração, até 1 hora",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "curar-ferimentos-em-massa",
    "name": "Curar Ferimentos em Massa",
    "circle": 5,
    "school": "Evocação",
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "despertar",
    "name": "Despertar",
    "circle": 5,
    "school": "Transmutação",
    "classes": [
      "Bardo",
      "Druida"
    ],
    "ritual": false,
    "castingTime": "8 horas",
    "range": "Toque",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "despistar",
    "name": "Despistar",
    "circle": 5,
    "school": "Ilusão",
    "classes": [
      "Bardo",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal",
    "duration": "Concentração, até 1 hora",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de ilusão de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "destruicao-banidora",
    "name": "Destruição Banidora",
    "circle": 5,
    "school": "Abjuração",
    "classes": [
      "Paladino"
    ],
    "ritual": false,
    "castingTime": "1 ação bônus",
    "range": "Pessoal",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "dissipar-o-bem-e-mal",
    "name": "Dissipar o Bem e Mal",
    "circle": 5,
    "school": "Abjuração",
    "classes": [
      "Clérigo",
      "Paladino"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "dominar-pessoa",
    "name": "Dominar Pessoa",
    "circle": 5,
    "school": "Encantamento",
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de encantamento de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "imobilizar-monstro",
    "name": "Imobilizar Monstro",
    "circle": 5,
    "school": "Encantamento",
    "classes": [
      "Bardo",
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "27 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de encantamento de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "ligacao-telepatica-de-rary",
    "name": "Ligação Telepática de Rary",
    "circle": 5,
    "school": "Adivinhação",
    "classes": [
      "Mago"
    ],
    "ritual": true,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "1 hora",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de adivinhação de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "mao-de-bigby",
    "name": "Mão de Bigby",
    "circle": 5,
    "school": "Evocação",
    "classes": [
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "missao",
    "name": "Missão",
    "circle": 5,
    "school": "Encantamento",
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Mago",
      "Paladino"
    ],
    "ritual": false,
    "castingTime": "1 minuto",
    "range": "18 metros",
    "duration": "30 dias",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de encantamento de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "modificar-memoria",
    "name": "Modificar Memória",
    "circle": 5,
    "school": "Encantamento",
    "classes": [
      "Bardo",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de encantamento de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "muralha-de-energia",
    "name": "Muralha de Energia",
    "circle": 5,
    "school": "Evocação",
    "classes": [
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, até 10 minutos",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "muralha-de-pedra",
    "name": "Muralha de Pedra",
    "circle": 5,
    "school": "Conjuração",
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, até 10 minutos",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "nevoa-mortal",
    "name": "Névoa Mortal",
    "circle": 5,
    "school": "Conjuração",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, até 10 minutos",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "onda-destrutiva",
    "name": "Onda Destrutiva",
    "circle": 5,
    "school": "Evocação",
    "classes": [
      "Paladino"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal (9 metros de raio)",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "praga",
    "name": "Praga",
    "circle": 5,
    "school": "Necromancia",
    "classes": [
      "Clérigo",
      "Druida"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "7 dias",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de necromancia de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "praga-de-insetos",
    "name": "Praga de Insetos",
    "circle": 5,
    "school": "Conjuração",
    "classes": [
      "Clérigo",
      "Druida",
      "Feiticeiro"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "90 metros",
    "duration": "Concentração, até 10 minutos",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "reencarnacao",
    "name": "Reencarnação",
    "circle": 5,
    "school": "Transmutação",
    "classes": [
      "Druida"
    ],
    "ritual": false,
    "castingTime": "1 hora",
    "range": "Toque",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "restauracao-maior",
    "name": "Restauração Maior",
    "circle": 5,
    "school": "Abjuração",
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "reviver-os-mortos",
    "name": "Reviver os Mortos",
    "circle": 5,
    "school": "Necromancia",
    "classes": [
      "Bardo",
      "Clérigo",
      "Paladino"
    ],
    "ritual": false,
    "castingTime": "1 hora",
    "range": "Toque",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de necromancia de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "similaridade",
    "name": "Similaridade",
    "circle": 5,
    "school": "Ilusão",
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "8 horas",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de ilusão de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "sonho",
    "name": "Sonho",
    "circle": 5,
    "school": "Ilusão",
    "classes": [
      "Bardo",
      "Bruxo",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 minuto",
    "range": "Especial",
    "duration": "8 horas",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de ilusão de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "telecinesia",
    "name": "Telecinésia",
    "circle": 5,
    "school": "Transmutação",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, até 10 minutos",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "videncia",
    "name": "Vidência",
    "circle": 5,
    "school": "Adivinhação",
    "classes": [
      "Bardo",
      "Bruxo",
      "Clérigo",
      "Druida",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "10 minutos",
    "range": "Pessoal",
    "duration": "Concentração, até 10 minutos",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de adivinhação de 5º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "aliado-planar",
    "name": "Aliado Planar",
    "circle": 6,
    "school": "Conjuração",
    "classes": [
      "Clérigo"
    ],
    "ritual": false,
    "castingTime": "10 minutos",
    "range": "18 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 6º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "ataque-visual",
    "name": "Ataque Visual",
    "circle": 6,
    "school": "Necromancia",
    "classes": [
      "Bardo",
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de necromancia de 6º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "banquete-de-herois",
    "name": "Banquete de Heróis",
    "circle": 6,
    "school": "Conjuração",
    "classes": [
      "Clérigo"
    ],
    "ritual": false,
    "castingTime": "10 minutos",
    "range": "9 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 6º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "barreira-de-laminas",
    "name": "Barreira de Lâminas",
    "circle": 6,
    "school": "Evocação",
    "classes": [
      "Clérigo"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "24 metros",
    "duration": "Concentração, até 10 minutos",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 6º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "caminhar-no-vento",
    "name": "Caminhar No Vento",
    "circle": 6,
    "school": "Transmutação",
    "classes": [
      "Druida"
    ],
    "ritual": false,
    "castingTime": "1 minuto",
    "range": "9 metros",
    "duration": "8 horas",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 6º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "carne-para-pedra",
    "name": "Carne para Pedra",
    "circle": 6,
    "school": "Transmutação",
    "classes": [
      "Bruxo",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 6º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "circulo-da-morte",
    "name": "Círculo da Morte",
    "circle": 6,
    "school": "Necromancia",
    "classes": [
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "45 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de necromancia de 6º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "conjurar-fada",
    "name": "Conjurar Fada",
    "circle": 6,
    "school": "Conjuração",
    "classes": [
      "Bruxo",
      "Druida"
    ],
    "ritual": false,
    "castingTime": "1 minuto",
    "range": "27 metros",
    "duration": "Concentração, até 1 hora",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 6º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "contingencia",
    "name": "Contingência",
    "circle": 6,
    "school": "Evocação",
    "classes": [
      "Mago"
    ],
    "ritual": false,
    "castingTime": "10 minutos",
    "range": "Pessoal",
    "duration": "10 dias",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 6º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "corrente-de-relampagos",
    "name": "Corrente de Relâmpagos",
    "circle": 6,
    "school": "Evocação",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "45 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 6º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "criar-mortos-vivos",
    "name": "Criar Mortos-Vivos",
    "circle": 6,
    "school": "Necromancia",
    "classes": [
      "Bruxo",
      "Clérigo",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 minuto",
    "range": "3 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de necromancia de 6º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "cura-completa",
    "name": "Cura Completa",
    "circle": 6,
    "school": "Evocação",
    "classes": [
      "Clérigo",
      "Druida"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 6º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "danca-irresistivel-de-otto",
    "name": "Dança Irresistível de Otto",
    "circle": 6,
    "school": "Encantamento",
    "classes": [
      "Bardo",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de encantamento de 6º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "desintegrar",
    "name": "Desintegrar",
    "circle": 6,
    "school": "Transmutação",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 6º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "doenca-plena",
    "name": "Doença Plena",
    "circle": 6,
    "school": "Necromancia",
    "classes": [
      "Clérigo"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de necromancia de 6º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "encontrar-o-caminho",
    "name": "Encontrar o Caminho",
    "circle": 6,
    "school": "Adivinhação",
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida"
    ],
    "ritual": false,
    "castingTime": "1 minuto",
    "range": "Pessoal",
    "duration": "Concentração, até 1 dia",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de adivinhação de 6º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "esfera-congelante-de-otiluke",
    "name": "Esfera Congelante de Otiluke",
    "circle": 6,
    "school": "Evocação",
    "classes": [
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "90 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 6º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "globo-de-invulnerabilidade",
    "name": "Globo de Invulnerabilidade",
    "circle": 6,
    "school": "Abjuração",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal (3 metros de raio)",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 6º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "ilusao-programada",
    "name": "Ilusão Programada",
    "circle": 6,
    "school": "Ilusão",
    "classes": [
      "Bardo",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Até ser dissipada",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de ilusão de 6º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "invocacao-instantanea-de-drawmij",
    "name": "Invocação Instantânea de Drawmij",
    "circle": 6,
    "school": "Conjuração",
    "classes": [
      "Mago"
    ],
    "ritual": true,
    "castingTime": "1 minuto",
    "range": "Toque",
    "duration": "Até ser dissipada",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 6º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "mover-terra",
    "name": "Mover Terra",
    "circle": 6,
    "school": "Transmutação",
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, até 2 horas",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 6º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "muralha-de-espinhos",
    "name": "Muralha de Espinhos",
    "circle": 6,
    "school": "Conjuração",
    "classes": [
      "Druida"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, até 10 minutos",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 6º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "muralha-de-gelo",
    "name": "Muralha de Gelo",
    "circle": 6,
    "school": "Evocação",
    "classes": [
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, até 10 minutos",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 6º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "palavra-de-recordacao",
    "name": "Palavra de Recordação",
    "circle": 6,
    "school": "Conjuração",
    "classes": [
      "Clérigo"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "1,5 metro",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 6º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "portal-arcano",
    "name": "Portal Arcano",
    "circle": 6,
    "school": "Conjuração",
    "classes": [
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "150 metros",
    "duration": "Concentração, até 10 minutos",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 6º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "proibicao",
    "name": "Proibição",
    "circle": 6,
    "school": "Abjuração",
    "classes": [
      "Clérigo"
    ],
    "ritual": true,
    "castingTime": "10 minutos",
    "range": "Toque",
    "duration": "1 dia",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 6º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "proteger-fortaleza",
    "name": "Proteger Fortaleza",
    "circle": 6,
    "school": "Abjuração",
    "classes": [
      "Bardo",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "10 minutos",
    "range": "Toque",
    "duration": "24 horas",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 6º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "raio-solar",
    "name": "Raio Solar",
    "circle": 6,
    "school": "Evocação",
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal (linha de 18 metros)",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 6º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "recipiente-arcano",
    "name": "Recipiente Arcano",
    "circle": 6,
    "school": "Necromancia",
    "classes": [
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 minuto",
    "range": "Pessoal",
    "duration": "Até ser dissipada",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de necromancia de 6º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "sugestao-em-massa",
    "name": "Sugestão em Massa",
    "circle": 6,
    "school": "Encantamento",
    "classes": [
      "Bardo",
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "24 horas",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de encantamento de 6º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "teletransporte-por-arvores",
    "name": "Teletransporte Por Árvores",
    "circle": 6,
    "school": "Conjuração",
    "classes": [
      "Druida"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "3 metros",
    "duration": "1 rodada",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 6º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "visao-da-verdade",
    "name": "Visão da Verdade",
    "circle": 6,
    "school": "Adivinhação",
    "classes": [
      "Bardo",
      "Bruxo",
      "Clérigo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "1 hora",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de adivinhação de 6º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "bola-de-fogo-controlavel",
    "name": "Bola de Fogo Controlável",
    "circle": 7,
    "school": "Evocação",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "45 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 7º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "conjurar-celestial",
    "name": "Conjurar Celestial",
    "circle": 7,
    "school": "Conjuração",
    "classes": [
      "Clérigo"
    ],
    "ritual": false,
    "castingTime": "1 minuto",
    "range": "27 metros",
    "duration": "Concentração, até 1 hora",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 7º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "dedo-da-morte",
    "name": "Dedo da Morte",
    "circle": 7,
    "school": "Necromancia",
    "classes": [
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de necromancia de 7º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "espada-de-mordenkainen",
    "name": "Espada de Mordenkainen",
    "circle": 7,
    "school": "Evocação",
    "classes": [
      "Bardo",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 7º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "forma-eterea",
    "name": "Forma Etérea",
    "circle": 7,
    "school": "Transmutação",
    "classes": [
      "Bardo",
      "Bruxo",
      "Clérigo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal",
    "duration": "até 8 horas",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 7º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "inverter-a-gravidade",
    "name": "Inverter a Gravidade",
    "circle": 7,
    "school": "Transmutação",
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "30 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 7º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "isolamento",
    "name": "Isolamento",
    "circle": 7,
    "school": "Transmutação",
    "classes": [
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Até ser dissipada",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 7º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "mansao-magnifica-de-mordenkainen",
    "name": "Mansão Magnifica de Mordenkainen",
    "circle": 7,
    "school": "Conjuração",
    "classes": [
      "Bardo",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 minuto",
    "range": "90 metros",
    "duration": "24 horas",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 7º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "miragem",
    "name": "Miragem",
    "circle": 7,
    "school": "Ilusão",
    "classes": [
      "Bardo",
      "Druida",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "10 minutos",
    "range": "Visão",
    "duration": "10 dias",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de ilusão de 7º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "palavra-divina",
    "name": "Palavra Divina",
    "circle": 7,
    "school": "Evocação",
    "classes": [
      "Clérigo"
    ],
    "ritual": false,
    "castingTime": "1 ação bônus",
    "range": "9 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 7º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "prisao-de-energia",
    "name": "Prisão de Energia",
    "circle": 7,
    "school": "Evocação",
    "classes": [
      "Bardo",
      "Bruxo",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "30 metros",
    "duration": "1 hora",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 7º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "projetar-imagem",
    "name": "Projetar Imagem",
    "circle": 7,
    "school": "Ilusão",
    "classes": [
      "Bardo",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Consultar",
    "duration": "Concentração, até 1 dia",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de ilusão de 7º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "rajada-prismatica",
    "name": "Rajada Prismática",
    "circle": 7,
    "school": "Evocação",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal (cone de 18 metros)",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 7º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "regeneracao",
    "name": "Regeneração",
    "circle": 7,
    "school": "Transmutação",
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida"
    ],
    "ritual": false,
    "castingTime": "1 minuto",
    "range": "Toque",
    "duration": "1 hora",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 7º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "ressurreicao",
    "name": "Ressurreição",
    "circle": 7,
    "school": "Necromancia",
    "classes": [
      "Bardo",
      "Clérigo"
    ],
    "ritual": false,
    "castingTime": "1 hora",
    "range": "Toque",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de necromancia de 7º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "simbolo",
    "name": "Símbolo",
    "circle": 7,
    "school": "Abjuração",
    "classes": [
      "Bardo",
      "Clérigo",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 minuto",
    "range": "Toque",
    "duration": "Até ser dissipada ou ativada",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 7º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "simulacro",
    "name": "Simulacro",
    "circle": 7,
    "school": "Ilusão",
    "classes": [
      "Mago"
    ],
    "ritual": false,
    "castingTime": "12 horas",
    "range": "Toque",
    "duration": "Até ser dissipada",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de ilusão de 7º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "teletransporte",
    "name": "Teletransporte",
    "circle": 7,
    "school": "Conjuração",
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "3 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 7º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "tempestade-de-fogo",
    "name": "Tempestade de Fogo",
    "circle": 7,
    "school": "Evocação",
    "classes": [
      "Clérigo",
      "Druida",
      "Feiticeiro"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "45 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 7º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "viagem-planar",
    "name": "Viagem Planar",
    "circle": 7,
    "school": "Conjuração",
    "classes": [
      "Bruxo",
      "Clérigo",
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 7º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "antipatia-simpatia",
    "name": "Antipatia/Simpatia",
    "circle": 8,
    "school": "Encantamento",
    "classes": [
      "Druida",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 hora",
    "range": "18 metros",
    "duration": "10 dias",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de encantamento de 8º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "aura-sagrada",
    "name": "Aura Sagrada",
    "circle": 8,
    "school": "Abjuração",
    "classes": [
      "Clérigo"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 8º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "campo-antimagia",
    "name": "Campo Antimagia",
    "circle": 8,
    "school": "Abjuração",
    "classes": [
      "Clérigo",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal (3 metros de raio)",
    "duration": "Concentração, até 1 hora",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 8º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "clone",
    "name": "Clone",
    "circle": 8,
    "school": "Necromancia",
    "classes": [
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 hora",
    "range": "Toque",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de necromancia de 8º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "controlar-o-clima",
    "name": "Controlar o Clima",
    "circle": 8,
    "school": "Transmutação",
    "classes": [
      "Clérigo",
      "Druida",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "10 minutos",
    "range": "Pessoal (7,5 quilômetros de raio)",
    "duration": "Concentração, até 8 horas",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 8º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "dominar-monstro",
    "name": "Dominar Monstro",
    "circle": 8,
    "school": "Encantamento",
    "classes": [
      "Bardo",
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, até 1 hora",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de encantamento de 8º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "enfraquecer-intelecto",
    "name": "Enfraquecer Intelecto",
    "circle": 8,
    "school": "Encantamento",
    "classes": [
      "Bardo"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "45 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de encantamento de 8º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "explosao-solar",
    "name": "Explosão Solar",
    "circle": 8,
    "school": "Evocação",
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "45 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 8º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "formas-animais",
    "name": "Formas Animais",
    "circle": 8,
    "school": "Transmutação",
    "classes": [
      "Druida"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Concentração, até 24 horas",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 8º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "labirinto",
    "name": "Labirinto",
    "circle": 8,
    "school": "Conjuração",
    "classes": [
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, até 10 minutos",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 8º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "limpar-a-mente",
    "name": "Limpar a Mente",
    "circle": 8,
    "school": "Abjuração",
    "classes": [
      "Bardo",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "24 horas",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 8º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "loquacidade",
    "name": "Loquacidade",
    "circle": 8,
    "school": "Transmutação",
    "classes": [
      "Bardo",
      "Bruxo"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal",
    "duration": "1 hora",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 8º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "nuvem-incendiaria",
    "name": "Nuvem Incendiária",
    "circle": 8,
    "school": "Conjuração",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "45 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 8º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "palavra-de-poder-atordoar",
    "name": "Palavra de Poder Atordoar",
    "circle": 8,
    "school": "Encantamento",
    "classes": [
      "Bardo",
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de encantamento de 8º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "semiplano",
    "name": "Semiplano",
    "circle": 8,
    "school": "Conjuração",
    "classes": [
      "Bruxo",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "1 hora",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 8º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "telepatia",
    "name": "Telepatia",
    "circle": 8,
    "school": "Adivinhação",
    "classes": [
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Ilimitado",
    "duration": "24 horas",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de adivinhação de 8º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "terremoto",
    "name": "Terremoto",
    "circle": 8,
    "school": "Evocação",
    "classes": [
      "Clérigo",
      "Druida",
      "Feiticeiro"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "150 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 8º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "tsunami",
    "name": "Tsunami",
    "circle": 8,
    "school": "Conjuração",
    "classes": [
      "Druida"
    ],
    "ritual": false,
    "castingTime": "1 minuto",
    "range": "Visão",
    "duration": "Concentração, até 6 rodadas",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 8º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "alterar-forma",
    "name": "Alterar Forma",
    "circle": 9,
    "school": "Transmutação",
    "classes": [
      "Druida",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal",
    "duration": "Concentração, até 1 hora",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 9º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "aprisionamento",
    "name": "Aprisionamento",
    "circle": 9,
    "school": "Abjuração",
    "classes": [
      "Bruxo",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 minuto",
    "range": "9 metros",
    "duration": "Até ser dissipada",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 9º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "chuva-de-meteoros",
    "name": "Chuva de Meteoros",
    "circle": 9,
    "school": "Evocação",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "1,5 quilômetro",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 9º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "cura-completa-em-massa",
    "name": "Cura Completa em Massa",
    "circle": 9,
    "school": "Evocação",
    "classes": [
      "Clérigo"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 9º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "desejo",
    "name": "Desejo",
    "circle": 9,
    "school": "Conjuração",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 9º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "encarnacao-fantasmagorica",
    "name": "Encarnação Fantasmagórica",
    "circle": 9,
    "school": "Ilusão",
    "classes": [
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de ilusão de 9º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "metamorfose-verdadeira",
    "name": "Metamorfose Verdadeira",
    "circle": 9,
    "school": "Transmutação",
    "classes": [
      "Bardo",
      "Bruxo",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Concentração, até 1 hora",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 9º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "muralha-prismatica",
    "name": "Muralha Prismática",
    "circle": 9,
    "school": "Abjuração",
    "classes": [
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "10 minutos",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de abjuração de 9º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "palavra-de-poder-curar",
    "name": "Palavra de Poder Curar",
    "circle": 9,
    "school": "Evocação",
    "classes": [
      "Bardo"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de evocação de 9º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "palavra-de-poder-matar",
    "name": "Palavra de Poder Matar",
    "circle": 9,
    "school": "Encantamento",
    "classes": [
      "Bardo",
      "Bruxo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de encantamento de 9º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "parar-o-tempo",
    "name": "Parar o Tempo",
    "circle": 9,
    "school": "Transmutação",
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Pessoal",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de transmutação de 9º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "portal",
    "name": "Portal",
    "circle": 9,
    "school": "Conjuração",
    "classes": [
      "Clérigo",
      "Feiticeiro",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 9º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "projecao-astral",
    "name": "Projeção Astral",
    "circle": 9,
    "school": "Necromancia",
    "classes": [
      "Bruxo",
      "Clérigo",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 hora",
    "range": "3 metros",
    "duration": "Especial",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de necromancia de 9º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "ressurreicao-verdadeira",
    "name": "Ressurreição Verdadeira",
    "circle": 9,
    "school": "Necromancia",
    "classes": [
      "Clérigo",
      "Druida"
    ],
    "ritual": false,
    "castingTime": "1 hora",
    "range": "Toque",
    "duration": "Instantânea",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de necromancia de 9º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "sexto-sentido",
    "name": "Sexto Sentido",
    "circle": 9,
    "school": "Adivinhação",
    "classes": [
      "Bardo",
      "Bruxo",
      "Druida",
      "Mago"
    ],
    "ritual": false,
    "castingTime": "1 minuto",
    "range": "Toque",
    "duration": "8 horas",
    "concentration": false,
    "source": "OFICIAL",
    "summary": "Magia oficial de adivinhação de 9º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  },
  {
    "id": "tempestade-da-vinganca",
    "name": "Tempestade da Vingança",
    "circle": 9,
    "school": "Conjuração",
    "classes": [
      "Druida"
    ],
    "ritual": false,
    "castingTime": "1 ação",
    "range": "Visão",
    "duration": "Concentração, até 1 minuto",
    "concentration": true,
    "source": "OFICIAL",
    "summary": "Magia oficial de conjuração de 9º circulo. Use o grimorio para preparar, conhecer e consumir o espaco correto."
  }
];

export const SPELLS = SPELL_ROWS.map((row) => spell(
  row.id,
  row.name,
  row.circle,
  row.school,
  row.classes,
  row.castingTime,
  row.range,
  row.duration,
  {
    concentration: row.concentration,
    ritual: row.ritual,
    source: row.source,
    summary: row.summary,
  },
));

export const SPELL_CIRCLES = ['Todos', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export function spellById(id) {
  return SPELLS.find((item) => item.id === id) || null;
}
