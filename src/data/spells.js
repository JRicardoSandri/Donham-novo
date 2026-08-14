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
    "summary": "Durante a duração, você tem vantagem em testes de Carisma feitos para influenciar uma criatura não hostil escolhida dentro do alcance, que não percebe ter sido enfeitiçada. Ao término do efeito, a criatura pode perceber a manipulação, a critério do mestre, e se tornar hostil a você por causa da magia."
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
    "summary": "Você aponta para uma criatura à vista e ganha percepção mágica de suas defesas; se atacá-la antes do fim do seu próximo turno, o primeiro ataque contra ela é feito com vantagem. Exige concentração e não causa dano por si só."
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
    "summary": "Encanta um porrete ou bordão que você esteja empunhando, permitindo usar seu modificador de conjuração (Carisma, Sabedoria ou Inteligência, conforme sua classe) no lugar de Força para ataques e dano com a arma, que passa a causar 1d8 de dano contundente. O efeito dura 1 minuto ou até você repetir o encantamento em outra arma."
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
    "summary": "Um clarão de luz radiante atinge uma criatura visível dentro do alcance, que deve fazer um teste de resistência de Destreza; se falhar, sofre 1d8 de dano radiante (aumenta em 1d8 nos níveis 5, 11 e 17). O alvo não se beneficia de cobertura parcial contra este ataque."
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
    "summary": "Você invoca um chicote de espinhos e faz um ataque à distância contra uma criatura no alcance; em caso de acerto, causa 1d6 de dano perfurante (aumenta 1d6 nos níveis 5, 11 e 17) e pode puxar o alvo até 3 metros em linha reta na sua direção."
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
    "summary": "Repara uma quebra ou rasgo único em um objeto tocado, sem deixar marcas, desde que o dano não ultrapasse cerca de 30 centímetros em qualquer dimensão; não reconstrói objetos complexos nem restaura itens destruídos por magia ou criaturas."
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
    "summary": "Uma chama dança em sua mão, emitindo luz por até 10 minutos sem queimá-lo, podendo acender materiais inflamáveis próximos. A qualquer momento durante a duração, você pode arremessá-la contra uma criatura no alcance como ataque à distância, causando 1d8 de dano de fogo (aumenta 1d8 nos níveis 5, 11 e 17) e encerrando o efeito."
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
    "summary": "Você produz um pequeno efeito natural inofensivo à sua escolha: prever o clima das próximas 24 horas na região, fazer uma semente brotar e florescer instantaneamente, criar uma sensação ou aroma natural passageiro, ou acender ou apagar uma pequena chama."
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
    "summary": "Você arremessa uma bolha de ácido contra uma criatura, ou contra duas criaturas adjacentes dentro do alcance; cada alvo faz um teste de resistência de Destreza, sofrendo 1d6 de dano ácido em caso de falha (o dano aumenta em 1d6 nos níveis 5, 11 e 17)."
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
    "summary": "Ao tocar uma criatura viva com 0 pontos de vida, ela se torna estável automaticamente, sem necessidade de qualquer teste, dispensando testes de resistência contra a morte enquanto o efeito perdurar."
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
    "summary": "Cria até quatro luzes fracas do tamanho de uma tocha (ou uma única forma humanoide vaga formada por elas) que flutuam no ar dentro do alcance; como ação bônus, você as reposiciona em até 18 metros a cada rodada enquanto mantiver concentração, por até 1 minuto."
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
    "summary": "Cria um som (não mais alto que um grito) ou uma imagem visual estática e silenciosa de um objeto que caiba em um cubo de 1,5 metro, ambos persistindo por 1 minuto; uma criatura que use a ação para investigar a ilusão pode identificá-la como falsa com um teste de Investigação contra sua CD de magia."
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
    "summary": "Toca um objeto de até 3 metros em qualquer dimensão, fazendo-o emitir luz plena em raio de 6 metros e luz fraca por mais 6 metros durante 1 hora; se o objeto estiver com uma criatura hostil, ela pode evitar o efeito com um teste de resistência de Destreza bem-sucedido."
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
    "summary": "Cria uma mão espectral flutuante que pode manipular objetos leves (até cerca de 5 kg), abrir recipientes e portas destrancadas, ou guardar e retirar itens, a até 9 metros de você por 1 minuto; a mão não pode atacar, ativar itens mágicos nem carregar mais que o limite de peso."
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
    "summary": "Você sussurra uma mensagem que viaja como um fio espectral de força até uma criatura visível a até 36 metros; somente ela ouve as palavras e pode responder em sussurro que só você escuta, desde que não haja obstáculo sólido bloqueando totalmente a linha entre vocês."
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
    "summary": "Toca uma criatura disposta, que pode somar 1d4 a um teste de habilidade de sua escolha, uma única vez, antes do fim de 1 minuto de concentração."
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
    "summary": "Cria um dentre vários efeitos mágicos triviais ao alcance, como um pequeno som, faísca ou odor, limpar ou sujar um objeto pequeno, esfriar, aquecer ou colorir algo, ou uma imagem sensorial ilusória que cabe em uma mão; o efeito dura até 1 hora ou até você o dissipar com uma ação, e não pode causar dano nem afetar outra criatura diretamente."
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
    "summary": "Como ação, você ganha resistência a dano cortante, perfurante e de concussão causado por armas até o fim do seu próximo turno."
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
    "summary": "Você lança um raio de fogo contra uma criatura ou objeto a até 36 metros; em caso de acerto no ataque de magia, causa 2d10 de dano de fogo (aumentando para 3d10, 4d10 e 5d10 nos níveis 5, 11 e 17) e pode incendiar objetos inflamáveis que não estejam sendo usados ou carregados."
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
    "summary": "Um raio gélido atinge uma criatura a até 18 metros; em caso de acerto no ataque de magia, causa 1d8 de dano de frio (aumenta 1d8 nos níveis 5, 11 e 17) e reduz a velocidade do alvo em 3 metros até o início do seu próximo turno."
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
    "summary": "Você expele uma nuvem de gás venenoso contra uma criatura a até 3 metros, que deve ser bem-sucedida em um teste de resistência de Constituição ou sofrer 1d12 de dano de veneno (aumenta 1d12 nos níveis 5, 11 e 17)."
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
    "summary": "Um feixe de energia crepitante atinge uma criatura a até 36 metros, causando 1d10 de dano de força em caso de acerto no ataque de magia. Você dispara dois feixes ao chegar ao 5º nível de personagem, três ao 11º e quatro ao 17º, podendo direcionar cada feixe a um alvo diferente."
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
    "summary": "Toca uma criatura disposta, concedendo-lhe um d4 que pode somar a um teste de resistência de sua escolha, uma única vez, antes do fim de 1 minuto de concentração."
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
    "summary": "Cria um dentre vários efeitos sobrenaturais discretos ao alcance, como amplificar sua voz, abrir ou trancar uma porta ou janela destrancada, mudar a cor de uma chama, provocar um tremor leve no chão ou fazer seus olhos brilharem, durando até 1 minuto."
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
    "summary": "Uma mão espectral esquelética ataca uma criatura a até 36 metros; em caso de acerto no ataque de magia, causa 1d8 de dano necrótico (aumenta 1d8 nos níveis 5, 11 e 17) e impede o alvo de recuperar pontos de vida até o início do seu próximo turno; se o alvo for morto-vivo, ele também sofre desvantagem em ataques contra você durante esse período."
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
    "summary": "Ao tocar uma criatura, você libera um choque elétrico que causa 1d8 de dano elétrico (aumenta 1d8 nos níveis 5, 11 e 17) em caso de acerto; o ataque tem vantagem se o alvo estiver usando armadura metálica, e a criatura atingida não pode fazer reações até o início do seu próximo turno."
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
    "summary": "Você dirige um insulto mágico a uma criatura a até 18 metros, que deve fazer um teste de resistência de Sabedoria; se falhar, sofre 1d4 de dano psíquico (aumenta 1d4 nos níveis 5, 11 e 17) e tem desvantagem no próximo ataque que fizer antes do fim do seu próximo turno."
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
    "summary": "Após 1 minuto conjurando, você demarca uma área de até 6 metros de lado dentro do alcance; qualquer criatura não designada por você que toque ou entre na área durante as próximas 8 horas dispara um alarme audível a até 18 metros ou, se preferido, um alarme mental que o alerta enquanto você estiver a até 300 metros."
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
    "summary": "Uma besta com Inteligência 3 ou menos a até 9 metros deve fazer um teste de resistência de Sabedoria; se falhar, fica encantada por você por 24 horas ou até você ou um aliado a ferir. Ao ser conjurada com espaço de nível maior, você pode encantar uma besta adicional para cada nível acima do 1º."
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
    "summary": "Cobre um quadrado de 3 metros de lado dentro do alcance com graxa escorregadia por 1 minuto; qualquer criatura que esteja na área ao ser conjurada, ou que entre nela, deve ser bem-sucedida em um teste de resistência de Destreza ou cair prona."
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
    "summary": "Toca uma criatura disposta que não esteja usando armadura, envolvendo-a em força protetora invisível que fixa sua CA em 13 + modificador de Destreza pela duração de 8 horas, ou até ela vestir uma armadura ou o efeito ser dissipado."
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
    "summary": "Uma geada mágica concede a você 5 pontos de vida temporários; enquanto eles durarem, qualquer criatura que acerte você com um ataque corpo a corpo sofre 5 de dano de frio. Ao ser conjurada com espaço de nível maior, tanto os pontos de vida temporários quanto o dano de frio aumentam em 5 para cada nível acima do 1º."
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
    "summary": "Sua arma passa a arder com energia divina pela duração de concentração de até 1 minuto; enquanto durar, seus ataques corpo a corpo com arma causam 1d4 de dano radiante adicional em caso de acerto."
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
    "summary": "Abençoa até três criaturas à sua escolha dentro do alcance; enquanto durar (concentração, até 1 minuto), cada uma soma 1d4 aos seus testes de ataque e testes de resistência. Ao ser conjurada com espaço de nível maior, você pode abençoar uma criatura adicional para cada nível acima do 1º."
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
    "summary": "Cria até dez bagas mágicas em sua mão; cada uma, ao ser consumida, cura 1 ponto de vida e equivale ao sustento de uma refeição completa. As bagas perdem sua magia se não forem comidas dentro de 24 horas."
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
    "summary": "Tentáculos de energia sombria brotam de você, atingindo toda criatura em um raio de 3 metros ao seu redor; cada uma faz um teste de resistência de Força, sofrendo 2d6 de dano necrótico em caso de falha (metade em caso de sucesso), e as que falharem não podem usar reações até o início do seu próximo turno. Ao ser conjurada com espaço de nível maior, o dano aumenta em 1d6 para cada nível acima do 1º."
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
    "summary": "Como ação bônus, você amaldiçoa uma criatura no alcance, causando 1d6 de dano necrótico adicional sempre que a acertar com um ataque e impondo desvantagem em testes de um atributo escolhido por você; a maldição dura enquanto você mantiver concentração, até 1 hora, e pode ser transferida a um novo alvo com outra ação bônus se o original morrer. Ao ser conjurada com espaço de nível 3 ou 4, a duração passa a 8 horas; com espaço de nível 5 ou superior, passa a 24 horas."
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
    "summary": "Uma criatura a até 18 metros que ouça e compreenda você deve obedecer a uma única palavra de comando (como fugir, cair, largar algo, ajoelhar-se ou parar) até o fim do seu próximo turno, a menos que seja bem-sucedida em um teste de resistência de Sabedoria. Ao ser conjurada com espaço de nível maior, você afeta uma criatura adicional para cada nível acima do 1º."
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
    "summary": "Pela duração de 1 hora, você compreende o sentido literal de qualquer língua falada que ouvir e de qualquer texto escrito que tocar, a um ritmo aproximado de uma página por minuto; a magia não decifra códigos nem textos ocultados por outros meios mágicos."
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
    "summary": "Plantas e vinhas rasteiras brotam em um quadrado de 6 metros de lado dentro do alcance, tornando a área terreno difícil; toda criatura ali no momento da conjuração faz um teste de resistência de Força, ficando agarrada em caso de falha (ou apenas sujeita ao terreno difícil em caso de sucesso), podendo repetir o teste em seu turno para se libertar enquanto você mantiver concentração, por até 1 minuto."
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
    "summary": "Após 1 hora de ritual com componentes especiais, você invoca um espírito que assume forma de pequeno animal à sua escolha para servir como familiar, capaz de obedecer seus comandos simples e entregar toques de magia por você; se o familiar morrer, só pode ser substituído conjurando esta magia novamente."
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
    "summary": "Você cria até 38 litros de água limpa dentro do alcance, seja em um recipiente ou derramada sobre uma área de até 9 metros quadrados, ou destrói essa mesma quantidade de água não contida. Ao ser conjurada com espaço de nível maior, o volume de água afetado dobra para cada nível acima do 1º."
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
    "summary": "Ao tocar uma criatura, ela recupera 1d8 pontos de vida mais seu modificador de habilidade de conjuração; a magia não tem efeito sobre mortos-vivos ou constructos. Ao ser conjurada com espaço de nível maior, a cura aumenta em 1d8 para cada nível acima do 1º."
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
    "summary": "Seu próximo acerto corpo a corpo com arma nesta rodada causa 1d6 de dano psíquico adicional e obriga o alvo a um teste de resistência de Sabedoria; se falhar, fica amedrontado de você enquanto durar (concentração, até 1 minuto), podendo repetir o teste ao fim de cada um de seus turnos para encerrar o medo."
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
    "summary": "Seu próximo acerto corpo a corpo com arma nesta rodada envolve a lâmina em chamas, causando 1d6 de dano de fogo adicional e ateando fogo ao alvo; no início de cada um dos turnos dele, enquanto durar (concentração, até 1 minuto), sofre mais 1d6 de dano de fogo, podendo usar sua ação para um teste de Constituição que extingue as chamas."
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
    "summary": "Seu próximo acerto corpo a corpo com arma nesta rodada libera uma explosão de trovão, causando 1d6 de dano de trovão adicional e forçando o alvo a um teste de resistência de Força; se falhar, é empurrado 3 metros para longe de você e cai prono."
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
    "summary": "Enquanto mantiver concentração (até 10 minutos), você percebe a presença de magia em um raio de 9 metros ao seu redor. Gastando uma ação para se concentrar em algo específico dentro do alcance, você descobre a escola de magia responsável pelo efeito ou item; a percepção não atravessa 30 cm de pedra, metal comum ou 15 cm de madeira ou terra."
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
    "summary": "Durante a concentração (até 10 minutos), você sabe se há aberrações, celestiais, elementais, fadas, corruptores ou mortos-vivos em um raio de 9 metros, incluindo a localização de cada um, e também percebe se existe algum objeto ou local consagrado ou profanado na mesma área. Barreiras espessas de pedra, metal ou madeira bloqueiam a percepção."
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
    "summary": "Enquanto durar a concentração (até 10 minutos), você percebe a presença e a direção aproximada de venenos, criaturas venenosas e doenças em um raio de 9 metros, podendo identificar a natureza de cada contaminação; barreiras espessas de pedra, metal ou madeira impedem a detecção."
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
    "summary": "Você conjura um disco horizontal e invisível de força pura, com cerca de 90 cm de diâmetro, que flutua a meia altura do chão e suporta até 227 kg. Ele acompanha você automaticamente mantendo distância de até 6 metros pela próxima hora, e a magia se encerra caso o disco seja levado além do alcance ou precise descer uma escada."
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
    "summary": "Pela próxima hora, você altera sua aparência — rosto, voz, roupas, altura em até 30 cm e estrutura corporal — criando uma ilusão convincente que não concede alterações físicas reais; um exame tátil cuidadoso ou um teste de Investigação contra sua CD de magia revela a farsa."
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
    "summary": "Uma criatura visível a até 9 metros faz uma resistência de Sabedoria; se falhar, fica compelida a se concentrar em você enquanto durar a concentração (até 1 minuto), sofrendo desvantagem em ataques contra qualquer outro alvo e precisando arriscar uma resistência sempre que tentar se afastar mais de 9 metros de você. O efeito termina se você atacar outra criatura ou perder a criatura de vista."
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
    "summary": "Uma criatura humanoide à sua escolha, a até 9 metros, faz uma resistência de Sabedoria; se falhar, fica enfeitiçada por 1 hora, tratando você como um conhecido amistoso, e o efeito termina antes se você ou um aliado a prejudicar, momento em que ela percebe ter sido enfeitiçada. Ao ser conjurada com espaço de nível maior, você pode enfeitiçar uma criatura adicional (a até 9 metros das demais) para cada nível acima do primeiro."
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
    "summary": "Você imbui um texto escrito com uma ilusão que dura 10 dias: apenas as pessoas que você designar ao conjurar conseguem ler a mensagem verdadeira, enquanto qualquer outro leitor vê apenas rabiscos sem sentido ou, se preferir, um texto diferente do original. Uma tentativa de decifrar o texto por meios mágicos exige uma resistência de Inteligência, com falha causando 1d6 de dano psíquico e impedindo nova tentativa naquele dia."
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
    "summary": "Reação usada quando você é atingido por um ataque ou teria acertado por Mísseis Mágicos: você ganha +5 na Classe de Armadura até o início do seu próximo turno, retroativamente o suficiente para transformar o ataque que ativou a reação em um erro, e anula automaticamente qualquer dano de Mísseis Mágicos direcionado a você durante esse intervalo."
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
    "summary": "Uma criatura à sua escolha, a até 18 metros, é envolvida por um brilho protetor que concede +2 na Classe de Armadura enquanto a concentração durar (até 10 minutos)."
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
    "summary": "Durante os próximos 10 minutos, você compreende e consegue se comunicar verbalmente com bestas, podendo obter informações limitadas pela inteligência de cada animal, como perigos recentes ou pontos de interesse nas proximidades; isso não garante que a criatura seja cooperativa."
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
    "summary": "Durante os próximos 10 minutos, plantas comuns em um raio de 9 metros ao seu redor ganham consciência limitada e se comunicam com você, relatando o que perceberam da área recentemente; você também pode pedir que se abram passagens, se enrosquem em criaturas ou dificultem a movimentação nesse espaço, dentro dos limites da anatomia de cada planta."
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
    "summary": "Todas as criaturas em um cubo de 6 metros de lado, a até 18 metros de você, fazem uma resistência de Destreza; quem falhar fica contornado por uma luz colorida que emite luz fraca em 3 metros, concede vantagem em ataques contra a criatura e impede que ela se beneficie de invisibilidade, enquanto a concentração durar (até 1 minuto)."
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
    "summary": "Na próxima vez que você acertar uma criatura com um ataque de arma antes do fim da concentração (até 1 minuto), videiras espinhosas brotam do ponto de impacto: o alvo faz uma resistência de Força ou fica agarrado e restrito, sofrendo 1d6 de dano perfurante no início de cada um dos seus turnos até se libertar com um teste de Força bem-sucedido contra sua CD de magia."
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
    "summary": "Uma criatura voluntária tocada fica imune ao efeito amedrontado e recebe pontos de vida temporários iguais ao seu modificador de habilidade de conjuração, ganhando a mesma quantidade novamente no início de cada um dos seus turnos enquanto a concentração durar (até 1 minuto); os pontos de vida temporários restantes somem quando a magia termina."
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
    "summary": "Ao tocar um objeto durante todo o minuto de conjuração, você descobre suas propriedades mágicas, o modo de ativação, cargas restantes e eventuais requisitos de sintonia; se o alvo for uma criatura ou objeto sob efeito de magia contínua, você identifica quais efeitos a afetam e de quais escolas se originam. A magia não revela se algo está amaldiçoado."
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
    "summary": "Você cria uma imagem puramente visual, sem som ou qualquer outra sensação, de um objeto, criatura ou fenômeno que caiba em um cubo de 4,5 metros, a até 18 metros; usando uma ação em turnos posteriores você pode mover ou alterar a imagem dentro do alcance. Um exame físico ou teste de Investigação contra sua CD revela a farsa, e o efeito persiste enquanto a concentração durar (até 10 minutos)."
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
    "summary": "Um ataque corpo a corpo com magia contra uma criatura tocada causa 3d10 de dano necrótico em caso de acerto. Ao ser conjurada com espaço de nível maior, o dano aumenta em 1d10 para cada nível acima do primeiro."
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
    "summary": "Cores ofuscantes se espalham em um cone de 4,5 metros partindo de você: distribua 6d10 de pontos de vida entre as criaturas na área, começando pelas de menor PV atual, e cada uma delas fica cega até o final do seu próximo turno; criaturas cujo PV total ultrapasse a soma restante não são afetadas. Ao ser conjurada com espaço de nível maior, some 1d10 adicional ao total de pontos de vida afetados para cada nível acima do primeiro."
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
    "summary": "Um cone de 4,5 metros de fogo parte das suas mãos: cada criatura na área faz uma resistência de Destreza, sofrendo 3d6 de dano de fogo em caso de falha ou metade disso em caso de sucesso; objetos inflamáveis que não estejam sendo usados ou carregados podem pegar fogo. Ao ser conjurada com espaço de nível maior, o dano aumenta em 1d6 para cada nível acima do primeiro."
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
    "summary": "Você amaldiçoa uma criatura visível a até 27 metros: enquanto a concentração durar (até 1 hora), seus ataques com arma contra ela causam 1d6 de dano adicional e você tem vantagem em testes de Sabedoria (Percepção ou Sobrevivência) para localizá-la. Se o alvo morrer antes do fim da duração, você pode usar uma ação bônus em um turno seguinte para transferir a marca a outra criatura."
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
    "summary": "Você conjura três dardos de energia mágica que acertam automaticamente, sem rolagem de ataque, cada um causando 1d4+1 de dano de força; os dardos podem ser distribuídos entre uma ou mais criaturas visíveis a até 36 metros. Ao ser conjurada com espaço de nível maior, um dardo adicional é criado para cada nível acima do primeiro."
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
    "summary": "Uma esfera de névoa densa com 6 metros de raio surge centrada em um ponto a até 36 metros, obscurecendo fortemente a área e contornando cantos livremente; ventos moderados a fortes podem dispersá-la antes do fim da concentração (até 1 hora). Ao ser conjurada com espaço de nível maior, o raio aumenta em 6 metros para cada nível acima do primeiro."
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
    "summary": "Uma onda de energia sonora se espalha em um cubo de 4,5 metros partindo de você: cada criatura na área faz uma resistência de Constituição, sofrendo 2d8 de dano de trovão e sendo empurrada 3 metros para longe se falhar, ou apenas metade do dano sem empurrão se for bem-sucedida; o estrondo pode ser ouvido a 90 metros. Ao ser conjurada com espaço de nível maior, o dano aumenta em 1d8 para cada nível acima do primeiro."
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
    "summary": "Você arremessa uma esfera de energia contra uma criatura a até 27 metros, escolhendo o tipo de dano entre ácido, frio, fogo, elétrico, veneno, trovão ou força: em caso de acerto no ataque de magia à distância, causa 3d8 de dano do tipo escolhido. Ao ser conjurada com espaço de nível maior, o dano aumenta em 1d8 para cada nível acima do primeiro."
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
    "summary": "Uma criatura à sua escolha a até 18 metros, exceto mortos-vivos ou constructos, recupera 1d4 pontos de vida mais seu modificador de habilidade de conjuração. Ao ser conjurada com espaço de nível maior, a cura aumenta em 1d4 para cada nível acima do primeiro."
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
    "summary": "Uma criatura tocada tem seu deslocamento aumentado em 3 metros pelo restante da hora de duração."
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
    "summary": "Até três criaturas à sua escolha, a até 9 metros, fazem uma resistência de Carisma; quem falhar precisa subtrair 1d4 de cada teste de ataque e resistência que fizer enquanto a concentração durar (até 1 minuto). Ao ser conjurada com espaço de nível maior, escolha uma criatura adicional para cada nível acima do primeiro."
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
    "summary": "Uma criatura voluntária tocada fica protegida contra aberrações, celestiais, elementais, fadas, corruptores e mortos-vivos enquanto a concentração durar (até 10 minutos): essas criaturas sofrem desvantagem para atacá-la e não conseguem enfeitiçá-la, amedrontá-la ou possuí-la; se ela já estiver sob um desses efeitos causado por tais criaturas, ganha vantagem no próximo teste de resistência para se libertar."
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
    "summary": "Toda comida e bebida não mágica contaminada dentro de uma esfera de 1,5 metro de raio, centrada em um ponto a até 3 metros de você, é purificada e livrada de veneno e doença."
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
    "summary": "Reação usada quando você ou até cinco criaturas em queda a até 18 metros começam a cair: a velocidade de queda de cada uma é reduzida para 18 metros por rodada pelo próximo minuto, eliminando o dano de queda caso pousem antes do efeito acabar e permitindo que aterrissem de pé."
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
    "summary": "Um raio nauseante e esverdeado atinge uma criatura a até 18 metros: em caso de acerto no ataque de magia à distância, causa 2d8 de dano de veneno, e o alvo faz uma resistência de Constituição, ficando envenenado até o final do seu próximo turno em caso de falha. Ao ser conjurada com espaço de nível maior, o dano aumenta em 1d8 para cada nível acima do primeiro."
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
    "summary": "Um arco de eletricidade conecta você a uma criatura a até 9 metros: em caso de acerto no ataque de magia à distância, causa 1d12 de dano elétrico, e enquanto a concentração durar (até 1 minuto) você pode usar sua ação em turnos seguintes para causar automaticamente mais 1d12 de dano elétrico ao mesmo alvo, desde que ele permaneça no alcance. Ao ser conjurada com espaço de nível maior, o dano inicial aumenta em 1d12 para cada nível acima do primeiro."
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
    "summary": "Um facho de luz atinge uma criatura a até 36 metros: em caso de acerto no ataque de magia à distância, causa 4d6 de dano radiante, e o alvo passa a brilhar até o final do seu próximo turno, concedendo vantagem ao próximo ataque de um aliado contra ele nesse período. Ao ser conjurada com espaço de nível maior, o dano aumenta em 1d6 para cada nível acima do primeiro."
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
    "summary": "Enquanto a concentração durar (até 10 minutos), você pode usar uma ação bônus em cada um dos seus turnos para realizar a ação Disparada, dobrando seu deslocamento naquele turno."
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
    "summary": "Reação usada quando uma criatura a até 18 metros causa dano a você: chamas infernais brotam ao redor dela, que faz uma resistência de Destreza, sofrendo 2d10 de dano de fogo em caso de falha ou metade disso em caso de sucesso. Ao ser conjurada com espaço de nível maior, o dano aumenta em 1d10 para cada nível acima do primeiro."
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
    "summary": "Uma criatura a até 9 metros, se não for imune a ficar enfeitiçada, faz uma resistência de Sabedoria; se falhar, cai prona e fica incapacitada por gargalhadas incontroláveis enquanto a concentração durar (até 1 minuto). No fim de cada um de seus turnos, ou sempre que sofrer dano, a criatura pode repetir a resistência para encerrar o efeito."
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
    "summary": "Uma criatura tocada tem a distância de seus saltos triplicada pelo próximo minuto."
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
    "summary": "Uma criatura à sua escolha, a até 9 metros, fica protegida pelo próximo minuto: qualquer inimigo que tente atacá-la diretamente ou mirá-la com uma magia prejudicial precisa antes ser bem-sucedido em uma resistência de Sabedoria, do contrário deve escolher outro alvo ou perder a ação; a proteção não impede efeitos em área e termina se a criatura protegida atacar ou conjurar uma magia prejudicial."
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
    "summary": "Na próxima vez que você acertar uma criatura com um ataque de arma à distância antes do fim da concentração (até 1 minuto), espinhos mágicos explodem ao redor do alvo: cada criatura em um raio de 1,5 metro dele, exceto você e o alvo, faz uma resistência de Destreza, sofrendo 1d10 de dano perfurante se falhar ou metade disso se for bem-sucedida. Ao ser conjurada com espaço de nível maior, o dano aumenta em 1d10 para cada nível acima do primeiro."
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
    "summary": "Você cria um servo invisível e sem inteligência, feito de força, capaz de realizar tarefas simples como abrir portas, carregar objetos ou servir comida a até 18 metros de você; ele se move 4,5 metros quando comandado por uma ação bônus, tem CA 10, apenas 1 ponto de vida, não pode atacar e desaparece se sofrer qualquer dano, durando até 1 hora."
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
    "summary": "Escolhendo um ponto a até 27 metros, todas as criaturas em um raio de 6 metros a partir dali, exceto mortos-vivos e criaturas imunes a ficar enfeitiçadas, caem inconscientes por 1 minuto (ou até sofrerem dano ou serem acordadas), somando 5d8 de pontos de vida entre as afetadas a partir das de menor PV atual; criaturas cujo PV total ultrapasse a soma restante não são afetadas. Ao ser conjurada com espaço de nível maior, some 2d8 adicionais ao total de pontos de vida afetados para cada nível acima do primeiro."
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
    "summary": "Uma criatura a até 18 metros ouve palavras dissonantes e dolorosas em sua mente: faz uma resistência de Sabedoria, sofrendo 3d6 de dano psíquico e sendo forçada a usar sua reação para fugir de você pelo caminho mais seguro em caso de falha (o que pode provocar ataques de oportunidade), ou apenas metade do dano sem ser forçada a se mover em caso de sucesso. Ao ser conjurada com espaço de nível maior, o dano aumenta em 1d6 para cada nível acima do primeiro."
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
    "summary": "Você ganha 1d4+4 pontos de vida temporários pela próxima hora. Ao ser conjurada com espaço de nível maior, você ganha 5 pontos de vida temporários adicionais para cada nível acima do primeiro."
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
    "summary": "Escolha até seis criaturas visíveis em um raio de 6 metros, a até 18 metros de você: cada uma faz uma resistência de Carisma, e você define um efeito para quem falhar — suprimir qualquer condição de enfeitiçado ou amedrontado, ou tornar criaturas hostis indiferentes ao combate — enquanto a concentração durar (até 1 minuto); a hostilidade retorna caso a criatura sofra dano ou veja um aliado ser ferido."
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
    "summary": "Até três criaturas à sua escolha, a até 9 metros, têm seu total de pontos de vida máximo e atual aumentado em 5 pelas próximas 8 horas. Ao ser conjurada com espaço de nível maior, o aumento é de 5 pontos de vida adicionais para cada nível acima do segundo."
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
    "summary": "Você assume uma forma alternativa por até 1 hora, escolhendo entre respirar debaixo d'água e ganhar deslocamento de natação, desenvolver garras ou presas que causam 1d6 de dano (cortante, perfurante ou concussivo, à sua escolha) em ataques desarmados, ou alterar sua aparência física. Você pode trocar a opção escolhida usando uma ação a cada vez que quiser, enquanto a concentração durar."
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
    "summary": "Você concede a uma criatura tocada vantagem em testes de uma habilidade à sua escolha durante até 1 hora, com um benefício extra conforme a habilidade escolhida (Força dobra a capacidade de carga, Destreza evita dano de queda, Constituição concede pontos de vida temporários, e assim por diante). Ao ser conjurada com espaço de nível maior, você pode afetar uma criatura adicional para cada nível acima do 2º."
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
    "summary": "Você cria uma arma espectral que ataca imediatamente uma criatura ao seu alcance, usando seu bônus de ataque de conjuração e causando 1d8 mais o modificador de habilidade de conjuração em dano de força. Nos turnos seguintes, como ação bônus, você pode mover a arma até 6 metros e atacar de novo; ao ser conjurada com espaço de nível maior, o dano aumenta 1d8 a cada dois níveis acima do 2º."
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
    "summary": "Você torna uma arma não mágica tocada temporariamente mágica, concedendo +1 em jogadas de ataque e de dano por até 1 hora. Ao ser conjurada com espaço de nível maior, o bônus sobe para +2 com um espaço de 4º círculo e +3 com um espaço de 6º círculo."
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
    "summary": "Você escolhe uma fechadura, porta, portão, corrente ou baú ao seu alcance: fechaduras se abrem, ferrolhos se soltam e portas ou janelas emperradas ou barradas se libertam, produzindo um estrondo audível a até 90 metros."
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
    "summary": "Antes de realizar uma ação importante dentro dos próximos 30 minutos, você recebe da conjuração um sinal sobre seu provável desfecho — bom presságio, mau presságio, os dois ao mesmo tempo ou nenhum. Consultar novamente sobre a mesma ação dentro de 24 horas traz risco cada vez maior de receber uma resposta aleatória e sem valor."
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
    "summary": "Uma criatura ou objeto ao seu alcance (com resistência de Constituição, se a criatura for relutante) dobra ou reduz à metade suas dimensões e peso por até 1 minuto. Ao crescer, o alvo ganha vantagem em testes e resistências de Força e +1d4 de dano em ataques com arma; ao encolher, sofre desvantagem nesses testes e resistências e -1d4 de dano."
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
    "summary": "Você impregna um objeto ou criatura tocada com uma aura ilusória que engana feitiços e habilidades de detecção mágica por 24 horas, fazendo algo mágico parecer comum, algo comum parecer mágico de uma escola à sua escolha, ou disfarçando a verdadeira natureza de um item amaldiçoado ou encantado para quem tentar identificá-lo."
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
    "summary": "Você encanta um objeto para que ele fale uma mensagem de até 25 palavras assim que uma condição específica definida por você for satisfeita, permanecendo assim até ser dissipado ou até a mensagem ser pronunciada."
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
    "summary": "Criaturas à sua escolha ao seu alcance que possam ouvir seu discurso fazem uma resistência de Sabedoria; as que falham ficam fascinadas por suas palavras e sofrem desvantagem em testes de Percepção para notar qualquer coisa além de você, pelo 1 minuto de duração ou até sofrerem dano."
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
    "summary": "Uma criatura ao seu alcance faz uma resistência de Constituição ou fica cega ou surda, à sua escolha, podendo repetir a resistência ao final de cada um de seus turnos para encerrar o efeito antes do fim do 1 minuto de duração. Ao ser conjurada com espaço de nível maior, você pode afetar uma criatura adicional para cada nível acima do 2º."
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
    "summary": "Você faz brotar em um objeto tocado uma chama mágica que não emite calor nem consome combustível, iluminando como uma tocha até que a magia seja dissipada."
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
    "summary": "Você invoca um espírito que assume a forma de uma montaria fiel e inteligente, com estatísticas equivalentes a uma criatura de desafio 1/2 à sua escolha (como cavalo, lobo ou pônei celestial), com quem se comunica telepaticamente. Se a montaria chegar a 0 pontos de vida ou for dispensada, ela desaparece, podendo ser convocada de novo em outra conjuração deste feitiço."
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
    "summary": "Você planta até quatro flechas, virotes ou dardos não mágicos no chão ao seu alcance, transformando-os em sentinelas mágicas por 8 horas: quando uma criatura que você não tenha designado se aproxima a até 3 metros deles, uma das flechas voa e ataca essa criatura (1d6 de dano perfurante) antes de perder a magia. Ao ser conjurada com espaço de nível maior, você planta duas flechas adicionais para cada nível acima do 2º."
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
    "summary": "Um humanoide ao seu alcance faz uma resistência de Sabedoria ou passa a enxergar uma coroa ilusória sobre a própria cabeça e fica enfeitiçado; em cada um dos turnos dele, você pode usar uma ação bônus para forçá-lo a atacar corpo a corpo uma criatura de sua escolha ao alcance dele, que não seja ele mesmo. Ao final de cada um de seus turnos, o alvo pode repetir a resistência, encerrando o efeito antes do fim do 1 minuto de duração."
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
    "summary": "O solo em uma área de 6 metros de raio ao seu alcance se cobre de espinhos retorcidos e camuflados, tornando-se terreno difícil; qualquer criatura que se mova por essa área sofre 2d4 de dano perfurante a cada 1,5 metro percorrido, durante os até 10 minutos de duração."
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
    "summary": "Um estrondo ressoa em uma esfera de 3 metros de raio centrada em um ponto ao seu alcance; criaturas na área fazem uma resistência de Constituição, sofrendo 3d8 de dano de trovão no fracasso ou metade no sucesso, e objetos não mágicos que ninguém esteja usando ou carregando são automaticamente danificados. Ao ser conjurada com espaço de nível maior, o dano aumenta 1d8 para cada nível acima do 2º."
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
    "summary": "Durante até 1 minuto, você lê os pensamentos superficiais de uma criatura à sua escolha a até 9 metros; ela pode fazer uma resistência de Sabedoria para perceber a intrusão e bloqueá-la, e nesse caso você não pode tentar ler seus pensamentos de novo naquele dia. Você pode se aprofundar para descobrir motivações ou lembranças específicas, arriscando uma nova resistência da criatura, e a cada turno pode trocar de alvo dentro do alcance."
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
    "summary": "Você percebe a presença de uma armadilha mágica ou mecânica dentro de 36 metros, caso exista alguma, descobrindo sua localização exata sem saber que tipo de perigo ela representa."
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
    "summary": "Uma escuridão mágica se espalha a partir de um ponto ao seu alcance, preenchendo uma esfera de 4,5 metros de raio por até 10 minutos; a área fica opaca até para visão no escuro e luzes não mágicas não conseguem iluminá-la. Conjurada sobre um objeto que você carrega, a escuridão se desloca junto com ele."
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
    "summary": "Você conjura uma esfera de fogo de 1,5 metro de diâmetro que rola pelo campo de batalha; criaturas a até 1,5 metro dela fazem uma resistência de Destreza, sofrendo 2d6 de dano de fogo no fracasso ou metade no sucesso. Como ação bônus, você move a esfera até 9 metros, podendo empurrá-la contra inimigos para causar dano de novo; ao ser conjurada com espaço de nível maior, o dano aumenta 1d6 para cada nível acima do 2º."
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
    "summary": "Um objeto de metal manufaturado ao seu alcance esquenta instantaneamente, causando 2d8 de dano de fogo a quem estiver em contato direto com ele e obrigando essa criatura a fazer uma resistência de Constituição ou largar o item, se puder fazê-lo. Enquanto a concentração de até 1 minuto durar, você pode usar uma ação bônus a cada turno para reaquecer o objeto e repetir o dano."
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
    "summary": "Você dispara um projétil de ácido contra uma criatura ao seu alcance com um ataque à distância de conjuração: se acertar, causa 4d4 de dano ácido imediato e mais 2d4 de dano ácido no final do próximo turno da criatura; se errar, causa apenas metade do dano imediato e nenhum dano residual. Ao ser conjurada com espaço de nível maior, tanto o dano imediato quanto o residual aumentam em 1d4 para cada nível acima do 2º."
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
    "summary": "Você cria a ilusão de um objeto, criatura ou fenômeno que caiba em um cubo de 3 metros de lado dentro do alcance; uma criatura à sua escolha faz uma resistência de Inteligência ou passa a acreditar que a ilusão é real, podendo sofrer 1d6 de dano psíquico sempre que interagir com ela de forma prejudicial, durante o 1 minuto de duração. Uma investigação cuidadosa pode revelar a farsa antes do fim do efeito."
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
    "summary": "Um humanoide ao seu alcance faz uma resistência de Sabedoria ou fica paralisado pelos até 1 minuto de duração, podendo repetir a resistência ao final de cada um de seus turnos para se libertar; ataques feitos contra ele a até 1,5 metro são automaticamente críticos em caso de acerto. Ao ser conjurada com espaço de nível maior, você pode afetar um humanoide adicional para cada nível acima do 2º."
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
    "summary": "Uma criatura tocada por você fica invisível por até 1 hora, efeito que termina antes se ela atacar ou conjurar um feitiço. Ao ser conjurada com espaço de nível maior, você pode afetar uma criatura adicional para cada nível acima do 2º."
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
    "summary": "Você conjura em sua mão uma lâmina feita de fogo que ilumina como uma tocha e se desfaz caso você a solte; ataques corpo a corpo com ela causam 3d6 de dano de fogo. Ao ser conjurada com espaço de nível maior, o dano aumenta 1d6 a cada dois níveis acima do 2º."
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
    "summary": "Uma criatura ou objeto de até 230 quilos ao seu alcance passa a flutuar no ar por até 10 minutos, subindo ou descendo até 6 metros por turno quando você usa uma ação para guiá-lo; uma criatura relutante pode resistir com Constituição, e o alvo não consegue se mover horizontalmente por conta própria, apenas ser empurrado ou puxado por outra fonte."
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
    "summary": "Você concentra seus pensamentos para localizar o exemplar mais próximo de um tipo específico de animal ou planta dentro de 8 quilômetros, descobrindo instantaneamente a direção e a distância até ele, caso exista algum na área."
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
    "summary": "Durante até 10 minutos, você sente a direção de um objeto específico com o qual já teve contato, ou de um tipo genérico de objeto, dentro de 300 metros, sendo o efeito bloqueado por uma fina camada de chumbo."
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
    "summary": "Uma rajada de vento forte se forma em uma linha de 18 metros de comprimento por 3 metros de largura partindo de você; criaturas na linha fazem uma resistência de Força ou são empurradas 4,5 metros para longe, o vento reduz pela metade o alcance de ataques com armas de projétil que o atravessem e apaga chamas pequenas. A cada turno de concentração, que dura até 1 minuto, você pode usar uma ação bônus para mudar a direção do vento."
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
    "summary": "O próximo ataque corpo a corpo bem-sucedido que você realizar dentro de 1 minuto causa 2d6 de dano radiante adicional e faz o alvo emitir uma luz fraca que o impede de ficar invisível enquanto o efeito durar. Ao ser conjurada com espaço de nível maior, o dano extra aumenta 1d6 para cada nível acima do 2º."
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
    "summary": "Você encanta um pequeno animal ao seu alcance para que ele leve uma mensagem falada até um local ou pessoa descrita por você, entregando-a e esperando até 24 horas por uma resposta antes de voltar até você. Ao ser conjurada com espaço de nível maior, esse prazo de espera aumenta em 48 horas para cada nível acima do 2º."
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
    "summary": "Sua forma fica embaçada e difícil de definir por até 1 minuto, concedendo desvantagem em jogadas de ataque contra você, exceto para criaturas que não dependam da visão para atacar."
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
    "summary": "Você enche um cubo de 1,5 metro de lado ao seu alcance com adagas giratórias; qualquer criatura que entre na área ou comece seu turno ali sofre 4d4 de dano cortante, efeito que dura até 1 minuto. Ao ser conjurada com espaço de nível maior, o dano aumenta 2d4 para cada nível acima do 2º."
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
    "summary": "Após 10 minutos de conjuração, até seis criaturas à sua escolha dentro de 9 metros recuperam 2d8 mais seu modificador de habilidade de conjuração em pontos de vida. Ao ser conjurada com espaço de nível maior, a cura aumenta 1d8 para cada nível acima do 2º."
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
    "summary": "Envolto em uma névoa prateada, você se teleporta instantaneamente para um espaço desocupado que possa ver a até 9 metros de distância."
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
    "summary": "Você e criaturas aliadas a até 9 metros de você ganham +10 em testes de Furtividade enquanto durar a concentração de até 1 hora, e não deixam rastros nem podem ser rastreados por meios não mágicos."
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
    "summary": "Uma criatura tocada ganha deslocamento de escalada igual ao seu deslocamento normal por até 1 hora, podendo escalar superfícies difíceis, incluindo tetos, sem precisar de testes de habilidade e sem usar as mãos para se segurar."
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
    "summary": "A pele de uma criatura tocada endurece como casca de árvore por até 1 hora, fazendo com que sua Classe de Armadura nunca seja inferior a 16, independentemente da armadura usada ou de sua Destreza."
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
    "summary": "Se a criatura tocada estiver envenenada, o veneno é neutralizado; além disso, pela 1 hora seguinte, ela ganha vantagem em resistências contra veneno e resistência a dano de veneno."
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
    "summary": "Você projeta três raios de fogo contra criaturas dentro de 36 metros, podendo mirar todos no mesmo alvo ou distribuí-los entre vários; cada raio exige uma jogada de ataque à distância separada e causa 2d6 de dano de fogo em caso de acerto. Ao ser conjurada com espaço de nível maior, você cria um raio adicional para cada nível acima do 2º."
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
    "summary": "Você realiza um ataque à distância de conjuração contra uma criatura ao seu alcance; se acertar, enquanto os até 1 minuto de concentração durarem, os ataques baseados em Força dela causam apenas metade do dano normal. A criatura pode repetir uma resistência de Constituição ao final de cada um de seus turnos para encerrar o efeito antes do previsto."
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
    "summary": "Um feixe de luz prateada de 1,5 metro de raio desce sobre um ponto ao seu alcance; criaturas que entrem na área ou comecem seu turno ali fazem uma resistência de Constituição, sofrendo 2d10 de dano radiante no fracasso ou metade no sucesso. Metamorfos, como lupinos, têm desvantagem nessa resistência e podem ser forçados a reverter à forma original caso falhem. Como ação, você move o feixe até 18 metros, e ao ser conjurada com espaço de nível maior o dano aumenta 1d10 para cada nível acima do 2º."
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
    "summary": "Três duplicatas ilusórias suas surgem ao seu redor por 1 minuto; sempre que uma criatura tentar te atacar, há chance de o golpe atingir uma das imagens em vez de você, destruindo-a, até que todas tenham sido consumidas ou o efeito termine."
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
    "summary": "Um cadáver tocado fica protegido contra decomposição e contra se tornar morto-vivo pelos 10 dias seguintes, período durante o qual o prazo para conjurar feitiços de ressurreição sobre ele deixa de correr."
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
    "summary": "Você toca uma criatura e remove dela uma doença ou encerra uma das seguintes condições: cego, surdo, paralisado ou envenenado."
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
    "summary": "Toca um animal disposto a colaborar e estabelece uma ligação sensorial com ele; enquanto a concentração durar, você pode usar sua ação para enxergar e ouvir através dos sentidos da fera, mesmo estando longe dela."
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
    "summary": "Cria uma esfera silenciosa de 6 metros de raio centrada em um ponto à sua escolha, que pode se mover junto de uma origem móvel; nenhum som atravessa a área, criaturas dentro ficam imunes a dano de trovão e não conseguem conjurar magias com componente verbal."
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
    "summary": "Uma criatura à sua escolha que consiga ouvir e entender você faz uma resistência de Sabedoria; se falhar, passa a seguir de forma razoável o curso de ação sugerido até o efeito acabar ou até algo prejudicá-la claramente, o que encerra a magia mais cedo."
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
    "summary": "Preenche um cubo de 6 metros com teias grudentas que se tornam terreno difícil; criaturas que comecem o turno na área ou entrem nela fazem resistência de Destreza, ficando presas em caso de falha, podendo se libertar com um teste de Força ou queimando a teia (1d4 de dano de fogo por rodada de exposição às chamas)."
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
    "summary": "Toca uma porta, portão, janela ou recipiente e o tranca magicamente até que a magia seja dissipada; apenas você ou criaturas que designar podem abri-lo normalmente, e a trava soma +10 ao CD para arrombá-lo ou para usar magias de destrancar sobre ele."
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
    "summary": "Toca uma corda de até 18 metros e faz seu topo se abrir em um espaço extradimensional invisível e seguro, acessível apenas subindo pela corda; até oito criaturas médias podem se abrigar ali por 1 hora, e puxar a corda para dentro impede que outros entrem."
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
    "summary": "Durante 1 hora, você enxerga criaturas e objetos invisíveis como se estivessem visíveis e também consegue ver através para o Plano Etéreo."
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
    "summary": "Cria um vínculo místico entre você e uma criatura tocada disposta: enquanto durar, o alvo ganha +1 em CA e testes de resistência e resistência a todo tipo de dano, mas sempre que sofrer dano você sofre o mesmo tanto; o vínculo se rompe se vocês ficarem a mais de 18 metros de distância um do outro ou se você chegar a 0 pontos de vida."
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
    "summary": "Toca uma criatura disposta e concede a ela visão no escuro em um alcance de 18 metros por 8 horas."
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
    "summary": "Cria uma área esférica de 4,5 metros de raio; qualquer criatura que comece o turno na zona ou entre nela pela primeira vez faz resistência de Carisma, e em caso de falha não consegue dizer mentira deliberada enquanto estiver dentro da área, embora ainda possa evitar responder ou distorcer a verdade."
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
    "summary": "Conjurada com 1 ação, faz com que a vegetação em uma área de 30 metros de raio se torne densa e retorcida, virando terreno difícil para quem a atravessar; conjurada ao longo de 8 horas sobre a mesma área, em vez disso aumenta muito a qualidade e a quantidade das plantas cultivadas ali."
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
    "summary": "Concede a até dez criaturas tocadas a capacidade de se mover sobre qualquer superfície líquida como se fosse chão firme, sem afundar, por 1 hora."
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
    "summary": "Você aponta para até um monte de ossos ou um cadáver ao alcance e o transforma em um esqueleto ou zumbi obediente sob seu comando; ao ser conjurada com espaço de nível maior, você anima um corpo ou monte de ossos adicional para cada nível acima do 3º."
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
    "summary": "Uma arma não mágica tocada se torna uma arma mágica que concede +1 aos testes de ataque e, à sua escolha, causa 1d4 de dano adicional de ácido, frio, fogo, relâmpago ou trovão; ao ser conjurada com espaço de nível maior, o bônus de ataque e o dado de dano extra aumentam (+2/2d4 com espaço de 5º nível, +3/3d4 com espaço de 7º nível)."
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
    "summary": "Cria uma aura pessoal de energia vital em um raio de 9 metros; em cada um dos seus turnos, enquanto durar, você pode usar uma ação bônus para curar 2d6 pontos de vida em uma criatura dentro da aura."
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
    "summary": "Uma explosão de chamas se espalha a partir de um ponto à sua escolha em uma esfera de 6 metros de raio; cada criatura na área faz resistência de Destreza, sofrendo 8d6 de dano de fogo em caso de falha ou metade em caso de sucesso, e objetos inflamáveis não usados nem carregados na área pegam fogo; ao ser conjurada com espaço de nível maior, o dano aumenta em 1d6 para cada nível acima do 3º."
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
    "summary": "Cria um cilindro invisível de 3 metros de raio e 6 metros de altura; ao conjurar, você escolhe um tipo de criatura (celestiais, elementais, feéricos, demônios ou mortos-vivos), que sofrem desvantagem em ataques contra alvos dentro do cilindro e precisam gastar espaço de magia ou uma ação para atravessar a barreira, além de você poder impor desvantagem nos testes de resistência delas contra magias de encantamento ou de amedrontamento que você conjurar."
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
    "summary": "Após 10 minutos de conjuração, cria um sensor invisível e imóvel em um ponto conhecido ou já visitado dentro de 1,5 quilômetro; enquanto durar, você pode usar sua ação para ver ou ouvir (escolha um) através do sensor como se estivesse lá."
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
    "summary": "Invoca espíritos feéricos que assumem forma de bestas para lutar ao seu lado dentro do alcance: você pode conjurar uma fera de desafio 2 ou menor, duas de desafio 1 ou menor, quatro de desafio 1/2 ou menor, ou oito de desafio 1/4 ou menor, todas obedientes aos seus comandos enquanto durar a concentração; ao ser conjurada com espaço de nível maior, o número de bestas invocadas em cada categoria dobra a cada dois níveis acima do 3º."
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
    "summary": "Você libera uma saraivada de projéteis espectrais em um cone de 18 metros partindo de você; cada criatura na área faz resistência de Destreza, sofrendo 3d8 de dano perfurante, cortante ou de concussão (à sua escolha) em caso de falha, ou metade em caso de sucesso; ao ser conjurada com espaço de nível maior, o dano aumenta em 1d8 para cada nível acima do 3º."
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
    "summary": "Como reação a uma criatura que você possa ver começando a conjurar uma magia, você tenta interromper o feitiço; se a magia for de 3º nível ou menor, ela simplesmente falha, e se for de nível maior, você faz um teste de habilidade de conjuração com CD igual a 10 mais o nível da magia para anulá-la; ao ser conjurada com espaço de nível maior, a magia interrompida é automaticamente anulada se seu nível for igual ou menor ao do espaço usado."
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
    "summary": "Convoca uma nuvem de tempestade que paira a 18 metros acima de você; em cada um dos seus turnos, enquanto durar, você pode usar sua ação para fazer um raio atingir um ponto que possa ver sob a nuvem, causando 3d10 de dano de relâmpago (resistência de Destreza para metade) em um cilindro de 3 metros de raio, dano que sobe para 4d10 se você estiver ao ar livre durante uma tempestade; ao ser conjurada com espaço de nível maior, o dano de cada descarga aumenta em 1d10 para cada nível acima do 3º."
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
    "summary": "Cria comida e água simples, mas nutritiva, suficiente para alimentar e hidratar até quinze criaturas (ou cinco cavalos) por 24 horas, surgindo em recipientes dentro do alcance; ao ser conjurada com espaço de nível maior, o número de criaturas sustentadas aumenta em cinco para cada nível acima do 3º."
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
    "summary": "Na próxima vez que você acertar um ataque com arma antes do fim da magia, o golpe causa 3d8 de dano radiante adicional e o alvo faz resistência de Constituição, ficando cego até o fim da magia em caso de falha."
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
    "summary": "Toca uma criatura, um objeto de até 3 metros cúbicos ou um espaço de até 3 metros de aresta, escondendo-o de magias de adivinhação e de olhos mágicos por 8 horas; um objeto ou local protegido também não pode ser localizado por magia de rastreamento enquanto durar."
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
    "summary": "Uma criatura, objeto ou efeito mágico ao alcance tem todas as magias de 3º nível ou menor incidentes sobre ele automaticamente encerradas; para cada magia de nível maior sobre o alvo, você faz um teste de habilidade de conjuração com CD igual a 10 mais o nível da magia, encerrando-a apenas em caso de sucesso."
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
    "summary": "Envia um breve pensamento de até vinte e cinco palavras a uma criatura que você conheça, em qualquer parte do mesmo plano de existência; o alvo ouve a mensagem em sua mente e pode gastar sua reação para responder com igual brevidade, sem que nenhum dos dois precise saber onde o outro está."
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
    "summary": "Convoca espíritos protetores que preenchem uma aura ao seu redor de 4,5 metros de raio, à qual você atribui dano radiante ou necrótico (à sua escolha); criaturas hostis a você que comecem o turno na área ou entrem nela fazem resistência de Sabedoria, sofrendo 3d8 de dano do tipo escolhido em caso de falha ou metade em caso de sucesso, além de terem o deslocamento reduzido à metade enquanto permanecerem lá; ao ser conjurada com espaço de nível maior, o dano aumenta em 1d8 para cada nível acima do 3º."
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
    "summary": "Concede a um cadáver capacidade temporária de fala e memória suficiente para responder perguntas; você pode fazer até cinco perguntas durante os 10 minutos de duração, e o morto responde com o conhecimento que tinha em vida, podendo mentir se costumava ser desonesto."
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
    "summary": "Na próxima vez que você acertar um ataque com arma à distância antes do fim da magia, o dano do ataque se converte em dano de relâmpago e aumenta em 4d8; se o alvo não for minúsculo, cada criatura a até 3 metros dele faz resistência de Destreza, sofrendo metade desse dano extra em caso de falha, ou nenhum em caso de sucesso; ao ser conjurada com espaço de nível maior, o dano extra aumenta em 1d8 para cada nível acima do 3º."
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
    "summary": "Cria um vazio esférico de 6 metros de raio preenchido por trevas totais e tentáculos famintos; criaturas que comecem o turno na área sofrem 2d6 de dano de frio, e as que terminarem o turno encostadas na borda interna da esfera sofrem 2d6 de dano ácido de mordidas espectrais; a área conta como fortemente obscurecida."
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
    "summary": "Toca uma criatura disposta, que faz uma resistência de Constituição; em caso de sucesso, ela cai inconsciente e parece morta (batimentos e respiração indetectáveis, resistência a todo dano) até o fim da duração ou até você tocá-la de novo para encerrar o efeito antes."
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
    "summary": "Transforma a criatura tocada e seus pertences em uma nuvem de névoa disforme enquanto durar; nesse estado ela tem resistência a dano contundente, perfurante e cortante não mágico, não consegue falar nem manipular objetos, pode se espremer por frestas minúsculas e ganha deslocamento de voo lento de 3 metros por rodada."
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
    "summary": "Após uma hora inscrevendo runas em uma superfície ou objeto, você define um gatilho (como pisar em determinado ponto ou tocar o objeto) que ativa o glifo; ao disparar, ele libera uma explosão de 5d8 de dano de um tipo à sua escolha em um raio de 6 metros (resistência de Destreza para metade), ou dispara uma magia de até 3º nível que você armazenou nele no momento da inscrição."
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
    "summary": "Toca uma criatura, que passa a compreender qualquer idioma falado e a ser compreendida por qualquer criatura que entenda ao menos um idioma, durante 1 hora; a magia não afeta comunicação escrita."
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
    "summary": "Cria a ilusão visual e sonora de um objeto, criatura ou outro fenômeno dentro de um cubo de até 6 metros de lado, incluindo som, cheiro e temperatura convincentes; você pode usar uma ação para mover a ilusão dentro do alcance e alterar seus efeitos, e ela persiste até o fim da concentração ou até ser tocada por uma criatura que tenha sucesso em um teste de Investigação contra sua CD de magia para perceber a farsa."
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
    "summary": "Até seis criaturas dentro de um cubo de 12 metros de lado fazem resistência de Sabedoria; as que falharem têm o deslocamento reduzido à metade, sofrem -2 em CA e em testes de resistência de Destreza, não podem usar reações e só conseguem realizar uma ação ou uma ação bônus em cada turno (nunca as duas), repetindo a resistência ao fim dos próprios turnos para tentar encerrar o efeito sobre si."
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
    "summary": "Um ponto à sua escolha ao alcance passa a emitir luz plena em um raio de 18 metros e luz fraca por mais 18 metros, por 1 hora; a magia pode se originar de um objeto ou criatura tocada, e sua luz é forte o bastante para suprimir trevas mágicas criadas por magias de nível 3 ou menor."
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
    "summary": "Cria uma aura pessoal de 9 metros de raio; enquanto durar, cada aliado que possa ver você e esteja dentro da aura causa 1d4 de dano radiante adicional sempre que acertar um ataque com arma."
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
    "summary": "Você projeta uma ilusão aterrorizante em um cone de 9 metros partindo de você; cada criatura na área faz resistência de Sabedoria, e em caso de falha larga o que estiver segurando e fica amedrontada, sendo obrigada a usar seus movimentos a cada turno para se afastar de você da forma mais segura possível até o fim da magia."
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
    "summary": "Você e todo o seu equipamento se fundem com uma formação rochosa tocada, grande o bastante para contê-lo, permanecendo escondidos e protegidos dentro da pedra por até 8 horas; enquanto mesclado, você percebe o ambiente ao redor mas não consegue ver, e a magia termina antes do prazo se você optar por sair ou se a pedra for destruída."
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
    "summary": "Após um minuto de conjuração, cria um corcel espectral em forma de cavalo com deslocamento de 30 metros por rodada, que só você pode montar; ele existe por 1 hora, some se ficar a mais de 3 metros de você, e desaparece imediatamente caso sofra qualquer dano."
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
    "summary": "Cria uma parede de vento forte, em linha reta de até 15 metros ou em anel de até 6 metros de diâmetro, com 4,5 metros de altura, que dura enquanto você se concentrar; a barreira dispersa gases e fumaça, apaga chamas pequenas e impõe desvantagem em ataques à distância com projéteis que a atravessem, chegando a desviar completamente flechas e dardos comuns."
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
    "summary": "Cria uma tempestade de granizo e chuva congelante em um cilindro de 6 metros de raio e 12 metros de altura, que obscurece fortemente a área e apaga chamas expostas; o chão dentro da área vira gelo escorregadio, obrigando quem se mover ali a fazer uma resistência de Destreza ou cair prostrado, e há desvantagem em testes de Sabedoria (Percepção) baseados na visão dentro da tempestade."
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
    "summary": "Cria uma nuvem de gás amarelo nauseante em uma esfera de 6 metros de raio, que obscurece fortemente a área e se molda ao terreno; cada criatura que comece o turno lá dentro faz resistência de Constituição, ficando enjoada em caso de falha e perdendo a ação seguinte, a menos que gaste toda a ação apenas tentando a resistência de novo para se livrar do enjoo."
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
    "summary": "Ilusão que preenche um cubo de 9 metros de lado dentro do alcance com um padrão hipnótico e sinuoso de cores; cada criatura na área que possa ver o efeito precisa ser bem-sucedida em um teste de resistência de Sabedoria ou fica enfeitiçada, ficando incapacitada e com deslocamento 0 enquanto durar a concentração (até 1 minuto). Sofrer dano ou receber ajuda de um aliado que gaste uma ação para sacudi-la encerra o efeito nessa criatura."
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
    "summary": "Como ação bônus, você cura até seis criaturas à sua escolha dentro do alcance, cada uma recuperando 1d4 pontos de vida mais seu modificador de habilidade de conjuração; a magia não afeta mortos-vivos nem constructos. Ao ser conjurada com espaço de nível maior, a cura de cada alvo aumenta em 1d4 para cada nível acima do 3º."
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
    "summary": "Cria uma cúpula imóvel e invisível de força com 3 metros de raio ao seu redor, impedindo a passagem de criaturas, objetos e observação externa, além de manter o clima ameno dentro dela; você e até nove aliados no interior podem enxergar através da cúpula normalmente, e ela dura 8 horas ou até ser dissipada. Pode ser conjurada como ritual."
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
    "summary": "Ao final de cada um dos seus turnos enquanto a magia durar, role 1d20: com resultado 11 ou mais, você some para o Plano Etéreo até o início do seu próximo turno, tornando-se imune a ataques e efeitos vindos do plano material; ao término da magia estando lá, você reaparece em um espaço desocupado à sua escolha próximo de onde desapareceu."
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
    "summary": "Ao tocar uma criatura, concede a ela resistência a um tipo de dano à sua escolha entre ácido, frio, fogo, raio ou trovão enquanto durar a concentração (até 1 hora)."
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
    "summary": "Dispara uma linha de 30 metros de comprimento por 1,5 metro de largura, causando 8d6 de dano de raio a todas as criaturas atingidas; cada uma pode fazer um teste de resistência de Destreza para sofrer apenas metade do dano, e objetos inflamáveis não portados na área pegam fogo. Ao ser conjurada com espaço de nível maior, o dano aumenta em 1d6 para cada nível acima do 3º."
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
    "summary": "Ao tocar uma criatura ou objeto amaldiçoado, encerra todas as maldições que afetam o alvo; se usada em um item mágico amaldiçoado, a maldição permanece no objeto, mas ele deixa de afetar quem o carrega, permitindo que a vítima se desvincule dele normalmente."
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
    "summary": "Concede a até dez criaturas dispostas dentro do alcance a capacidade de respirar debaixo d'água pelas próximas 24 horas, efeito que persiste mesmo que elas saiam da água antes desse prazo. Pode ser conjurada como ritual."
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
    "summary": "Ao tocar uma criatura morta há no máximo 1 minuto, ela retorna à vida com 1 ponto de vida, desde que não tenha sofrido dano capaz de destruir seu corpo; a magia não cura ferimentos nem doenças anteriores e consome componentes de material no valor de 300 peças de ouro em diamantes."
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
    "summary": "Ao tocar uma criatura, ela deve ser bem-sucedida em um teste de resistência de Sabedoria ou sofre, enquanto durar a concentração (até 1 minuto), uma maldição à sua escolha: desvantagem em testes e resistências de um atributo escolhido, desvantagem em ataques contra você, a obrigação de um teste de Sabedoria a cada turno sob pena de perder a ação, ou 1d8 de dano necrótico adicional sempre que você acertá-la com um ataque. Ao ser conjurada com espaço de nível maior, a duração aumenta e deixa de exigir concentração, podendo durar até ser dissipada com um espaço de 9º nível."
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
    "summary": "Até três criaturas à sua escolha dentro do alcance ganham vantagem em testes de resistência de Sabedoria e em testes de resistência contra a morte, além de recuperarem o máximo possível de pontos de vida sempre que forem alvo de uma cura, enquanto durar a concentração (até 1 minuto)."
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
    "summary": "Seu toque causa 3d6 de dano necrótico em uma criatura ao seu alcance através de um ataque mágico corpo a corpo, e você recupera pontos de vida igual à metade do dano causado; enquanto durar a concentração (até 1 minuto), você pode repetir esse ataque como ação em turnos seguintes. Ao ser conjurada com espaço de nível maior, o dano aumenta em 1d6 para cada nível acima do 3º."
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
    "summary": "Uma criatura à sua escolha dobra seu deslocamento, ganha +2 na CA, vantagem em testes de resistência de Destreza e uma ação adicional por turno (limitada a ataque, corrida, desengajar, esconder-se ou usar objeto) enquanto durar a concentração (até 1 minuto); quando o efeito termina, o alvo fica incapacitado até o fim do turno seguinte."
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
    "summary": "Uma criatura disposta que você tocar ganha deslocamento de voo de 18 metros enquanto durar a concentração (até 10 minutos); se a magia terminar com o alvo ainda no ar e sem outro meio de voar, ele desce suavemente até o chão em vez de cair."
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
    "summary": "Ao entrar em contato com forças além do véu, você recebe uma resposta verdadeira sobre um objetivo, evento ou atividade específicos que devem ocorrer nos próximos 7 dias, respondida de forma direta, em verso ou por meio de um sinal; conjurar a magia novamente antes de descansar reduz a confiabilidade da próxima resposta. Pode ser conjurada como ritual."
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
    "summary": "Você faz um baú especial, feito de madeira rara que já deve possuir, desaparecer para o Plano Etéreo, deixando em suas mãos uma réplica em miniatura que permite reabrir uma passagem e recuperar o baú a qualquer momento nos próximos 180 dias, ou indefinidamente se a magia for renovada antes desse prazo; o baú pode conter até cerca de 136 quilos de conteúdo."
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
    "summary": "Você projeta na mente de uma criatura ao alcance a ilusão de um algoz aterrorizante; o alvo deve ser bem-sucedido em um teste de resistência de Sabedoria ou fica amedrontado e sofre 4d10 de dano psíquico, repetindo o teste ao final de cada um dos seus turnos e sofrendo o mesmo dano em caso de falha ou metade em caso de sucesso, enquanto durar a concentração (até 1 minuto). Ao ser conjurada com espaço de nível maior, o dano aumenta em 1d10 para cada nível acima do 4º."
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
    "summary": "Emana de você uma aura com 9 metros de raio; enquanto durar a concentração (até 10 minutos), você e criaturas aliadas dentro dela não podem contrair doenças, têm resistência a dano de veneno e vantagem em testes de resistência contra ficarem envenenadas."
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
    "summary": "Emana de você uma aura com 9 metros de raio; enquanto durar a concentração (até 10 minutos), você e criaturas aliadas na área têm resistência a dano necrótico e não podem ter seu máximo de pontos de vida reduzido. Sempre que um aliado na aura seria reduzido a 0 pontos de vida sem morrer instantaneamente, ele fica com 1 ponto de vida em vez disso, e aliados com 0 pontos de vida que comecem o turno na área recuperam 1 ponto de vida."
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
    "summary": "Uma criatura à sua escolha dentro do alcance deve ser bem-sucedida em um teste de resistência de Carisma ou é enviada, enquanto durar a concentração (até 1 minuto), a um bolso inofensivo de outro plano de existência, de onde não pode agir; se o alvo for nativo de um plano diferente do atual, ao fim da duração (ou se a magia terminar antes) ele é enviado de volta a esse plano em vez de retornar. Ao ser conjurada com espaço de nível maior, você pode banir uma criatura adicional para cada nível acima do 4º."
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
    "summary": "Conjura um guardião espectral invisível em forma de cão em um ponto ao alcance; ele late alto sempre que uma criatura invisível ou oculta se aproxima a até 9 metros, e pode usar sua reação para morder uma criatura adjacente que veja, causando 4d8 de dano perfurante. O guardião permanece vigiando por 8 horas ou até ser dispensado."
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
    "summary": "Uma criatura à sua escolha que possa ouvi-lo dentro do alcance deve ser bem-sucedida em um teste de resistência de Sabedoria ou fica compelida, enquanto durar a concentração (até 1 minuto), a gastar seu deslocamento em cada turno para se mover na direção que você determinar, evitando perigos óbvios mas sem poder agir de outra forma voluntariamente."
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
    "summary": "Cada criatura em uma esfera com 3 metros de raio centrada em um ponto ao alcance deve ser bem-sucedida em um teste de resistência de Sabedoria ou fica confusa enquanto durar a concentração (até 1 minuto); no início de cada turno, uma criatura confusa rola 1d10 para determinar se vagueia, fica parada, ataca a criatura mais próxima ou age normalmente. Ao ser conjurada com espaço de nível maior, o raio da esfera aumenta em 1,5 metro para cada nível acima do 4º."
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
    "summary": "Invoca elementais em espaços desocupados que você possa ver dentro do alcance, com o total de Nível de Desafio das criaturas somando no máximo 2; elas obedecem seus comandos enquanto durar a concentração (até 1 hora) e retornam ao plano de origem ao final da magia. Ao ser conjurada com espaço de nível maior, o total de ND permitido aumenta."
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
    "summary": "Invoca fadas ou bestas feéricas em espaços desocupados dentro do alcance, com o total de Nível de Desafio somando no máximo 2; elas obedecem seus comandos e lutam ao seu lado enquanto durar a concentração (até 1 hora), desaparecendo ao final da magia. Ao ser conjurada com espaço de nível maior, o total de ND permitido aumenta."
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
    "summary": "Escolha um entre quatro efeitos que manipulam uma extensão de água dentro do alcance enquanto durar a concentração (até 10 minutos): provocar uma inundação que eleva o nível da água, dividi-la abrindo um caminho seco, redirecionar uma correnteza para uma nova direção, ou criar um redemoinho que suga embarcações e criaturas próximas para o fundo; cada efeito pode exigir um teste de resistência de Força das criaturas afetadas."
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
    "summary": "Como ação bônus, você libera uma onda de energia sagrada em um raio de 9 metros ao seu redor; cada criatura hostil na área deve ser bem-sucedida em um teste de resistência de Constituição ou sofre 5d6 de dano de trovão somados a 5d6 de dano radiante ou necrótico à sua escolha e fica caída, sofrendo apenas metade do dano e permanecendo em pé em caso de sucesso."
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
    "summary": "Uma besta que você possa ver dentro do alcance deve ser bem-sucedida em um teste de resistência de Sabedoria ou fica enfeitiçada por você enquanto durar a concentração (até 1 minuto), estabelecendo um vínculo telepático pelo qual você pode lhe dar ordens; se a ordem contrariar sua natureza, ela pode repetir o teste para resistir. Ao ser conjurada com espaço de nível maior, a duração aumenta, chegando a 8 horas sem concentração com um espaço de 7º nível ou maior."
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
    "summary": "Envolve seu corpo em chamas quentes ou frias, à sua escolha, por 10 minutos, concedendo resistência a dano de frio (se escolhidas chamas quentes) ou de fogo (se escolhidas chamas frias); sempre que uma criatura acertar você com um ataque corpo a corpo, ela sofre 2d8 de dano de fogo (chamas quentes) ou de frio (chamas frias)."
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
    "summary": "Uma criatura ou objeto à sua escolha dentro do alcance deve ser bem-sucedido em um teste de resistência de Destreza ou fica envolvido por uma esfera brilhante e intransponível de força mágica enquanto durar a concentração (até 1 minuto); nada consegue atravessá-la, entrar ou sair, e a esfera pode ser deslocada rolando-a pelo chão."
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
    "summary": "Você transforma matéria-prima bruta em um produto acabado do mesmo material, com até 3 metros em qualquer dimensão, moldando-a em qualquer forma que conheça, desde que não seja uma criatura nem possua partes móveis complexas; o tempo de conjuração é de 10 minutos."
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
    "summary": "Conjura um grande guardião espectral em um espaço desocupado que você possa ver dentro do alcance, permanecendo imóvel guardando o local por 8 horas; qualquer criatura hostil que se aproxime a até 3 metros dele ou termine o turno nessa distância deve ser bem-sucedida em um teste de resistência de Destreza ou sofre 20 de dano radiante, reduzido à metade em caso de sucesso, e o guardião desaparece após causar um total de 60 pontos de dano."
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
    "summary": "Transforma até dez centopeias, três aranhas, cinco vespas ou um escorpião dentro do alcance em versões gigantes de si mesmas enquanto durar a concentração (até 10 minutos); as criaturas lutam ao seu lado e obedecem suas ordens, voltando ao tamanho normal quando a magia termina."
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
    "summary": "Uma criatura disposta que você tocar fica invisível enquanto durar a concentração (até 1 minuto), permanecendo assim mesmo ao atacar ou conjurar magias."
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
    "summary": "Você sente a direção da localização de uma criatura específica que conheça bem ou de uma criatura de um tipo familiar dentro de cerca de 300 metros, desde que ela não esteja em outro plano de existência nem protegida por água corrente ou por uma camada de chumbo, sabendo também se está se movendo e para onde, enquanto durar a concentração (até 1 hora)."
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
    "summary": "Uma criatura ao alcance deve realizar um teste de resistência de Constituição, sofrendo 8d8 de dano necrótico em caso de falha ou metade em caso de sucesso; criaturas do tipo planta fazem esse teste com desvantagem, e uma planta não mágica que não seja uma criatura sofre automaticamente o dano máximo, murchando e morrendo."
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
    "summary": "Uma criatura à sua escolha dentro do alcance, se não estiver disposta, deve ser bem-sucedida em um teste de resistência de Sabedoria ou se transforma em uma forma de besta com Nível de Desafio igual ou inferior ao seu próprio nível, mantendo sua mente enquanto durar a concentração (até 1 hora); o alvo passa a usar os atributos físicos e pontos de vida da nova forma, retornando ao normal se os pontos de vida da forma chegarem a 0 ou se a magia terminar."
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
    "summary": "Ao tocar uma porção de pedra natural com até 1,5 metro em qualquer dimensão, você a molda instantaneamente em qualquer forma útil dentro desse volume, como um arco, uma escada, um estreitamento de passagem ou uma protuberância, sem necessidade de teste de habilidade."
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
    "summary": "Uma criatura que você tocar fica imune a ficar paralisada ou agarrada, seu deslocamento não é reduzido por terreno difícil nem por efeitos mágicos, e ela pode gastar 1,5 metro de deslocamento para se libertar automaticamente de amarras ou de um agarrão não mágico; a magia dura 1 hora."
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
    "summary": "Cria uma parede de fogo opaca, reta com até 18 metros de comprimento ou em anel com até 3 metros de raio, com 6 metros de altura e 30 centímetros de espessura, com um dos lados escolhido como o lado aquecido; criaturas nesse lado quando a parede surge, ou que terminem o turno a até 3 metros dela, sofrem 5d8 de dano de fogo, reduzido à metade com um teste de resistência de Destreza bem-sucedido, e criaturas que atravessem a parede sofrem o mesmo dano sem direito a teste, enquanto durar a concentração (até 1 minuto)."
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
    "summary": "Cria um olho mágico invisível e flutuante em um ponto ao alcance, através do qual você enxerga como se estivesse ali; o olho pode se mover em qualquer direção a até 9 metros por rodada, atravessando espaços estreitos mas sem poder entrar em outro plano de existência, enquanto durar a concentração (até 1 hora)."
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
    "summary": "Ao tocar uma criatura disposta, ela ganha resistência a dano de concussão, perfurante e cortante não mágico enquanto durar a concentração (até 1 hora); a magia exige pó de diamante no valor de pelo menos 100 peças de ouro, consumido no processo."
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
    "summary": "Você e uma criatura disposta a até 1,5 metro de você se teleportam instantaneamente para um ponto que você possa ver ou para um local conhecido a até 150 metros de distância; se o destino estiver ocupado por um objeto ou criatura sólida, ambos são empurrados para o espaço livre mais próximo e sofrem 4d6 de dano de força."
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
    "summary": "Uma criatura que você tocar fica protegida por 8 horas: da próxima vez que ela seria reduzida a 0 pontos de vida sem morrer instantaneamente, ela fica com 1 ponto de vida em vez disso, encerrando o efeito; a proteção não impede a morte instantânea causada por dano excessivo."
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
    "summary": "Você protege uma área cúbica de até 30 metros de lado dentro do alcance por 24 horas, escolhendo entre efeitos como impedir que sons atravessem seus limites, bloquear observação por adivinhação à distância, deixar o local completamente escuro, impedir teletransporte para dentro ou para fora, ou bloquear viagem planar através dela; mais de um efeito pode ser combinado conjurando a magia novamente sobre a mesma área."
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
    "summary": "Um cilindro com 6 metros de raio e 12 metros de altura, centrado em um ponto ao alcance, é atingido por uma tempestade de granizo; cada criatura na área sofre 2d8 de dano de concussão e 4d6 de dano de frio, podendo fazer um teste de resistência de Destreza para sofrer apenas o dano de frio. Ao ser conjurada com espaço de nível maior, o dano de frio aumenta em 1d6 para cada nível acima do 4º."
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
    "summary": "Um emaranhado de tentáculos surge em uma área quadrada de 6 metros de lado dentro do alcance, transformando o local em terreno difícil. Cada criatura na área quando o efeito surge faz um teste de resistência de Destreza, sofrendo 3d6 de dano de concussão e ficando agarrada em uma falha (ou apenas metade do dano em um sucesso, sem ficar agarrada); enquanto restrita, a criatura repete o teste no início de cada turno e pode usar a ação para tentar um teste de Força ou Destreza contra a CD de resistência do conjurador para se libertar."
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
    "summary": "Disfarça o terreno natural em um cubo de até 45 metros de lado, fazendo árvores, rochedos, trilhas e corpos d'água parecerem, soarem e cheirarem como outro tipo de terreno à escolha do conjurador, embora construções não sejam ocultadas por esse efeito. É puramente sensorial: uma criatura que investigue fisicamente o local pode perceber a ilusão com um teste de Investigação bem-sucedido contra a CD do conjurador."
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
    "summary": "Conjura uma vinha animada em um espaço desocupado a até 9 metros; como ação bônus em rodadas seguintes, o conjurador pode ordenar que ela golpeie uma criatura a até 9 metros dela, que faz um teste de resistência de Destreza ou é puxada 6 metros na direção da vinha. A vinha permanece enquanto durar a concentração, até 1 minuto."
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
    "summary": "Ao tocar uma aljava, ela passa a produzir munição mágica sem limite e permite que, até duas vezes por turno, o conjurador realize um ataque adicional com uma arma à distância que utilize flechas ou virotes dela, sempre que já tiver atacado com essa arma na mesma ação. O efeito dura enquanto durar a concentração, até 1 minuto."
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
    "summary": "Ao longo de 1 hora de ritual, tenta prender uma criatura celestial, elemental, feérica ou infernal que permaneça dentro do alcance durante todo o processo; a criatura faz um teste de resistência de Carisma, e se falhar fica compelida a cumprir um serviço combinado por 24 horas. Ao ser conjurada com espaço de nível maior, a duração da vinculação aumenta bastante, podendo chegar a dias, meses ou até um ano e um dia conforme o nível do espaço usado."
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
    "summary": "Até dez objetos não mágicos dentro do alcance ganham vida e passam a obedecer aos comandos do conjurador, distribuídos entre categorias de tamanho (por exemplo, dez minúsculos, cinco pequenos, dois médios ou um grande), cada um lutando com estatísticas próprias conforme o tamanho. Como ação bônus a cada turno o conjurador direciona os objetos durante a concentração, até 1 minuto; ao ser conjurada com espaço de nível maior, dois objetos adicionais (ou um de categoria de tamanho maior) podem ser animados para cada nível acima do 5º."
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
    "summary": "Enquanto durar, o conjurador pode usar uma ação bônus em seu turno para entrar em uma árvore viva ao seu alcance e emergir instantaneamente de outra árvore da mesma espécie que já tenha visto, a até 150 metros, levando consigo até cinco criaturas dispostas adjacentes a ele. O efeito dura enquanto durar a concentração, até 1 minuto, e cada árvore só serve como passagem quando o conjurador está a até 1,5 metro dela."
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
    "summary": "Uma emanação de 9 metros de raio, centrada no conjurador e que se move com ele, concede vantagem em testes de resistência contra magia a todos os aliados (exceto o próprio conjurador) dentro da área; se um aliado falhar em um teste que causaria apenas parte do efeito em caso de sucesso, ele não sofre efeito algum. Dura enquanto durar a concentração, até 10 minutos."
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
    "summary": "Desenha um círculo temporário que se conecta a um círculo de teletransporte permanente conhecido pelo conjurador, em qualquer lugar do mesmo plano ou de outro, abrindo um portal cintilante entre os dois pontos por 1 rodada. Qualquer criatura que atravesse o portal surge instantaneamente a até 1,5 metro do círculo de destino."
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
    "summary": "Uma coluna vertical de fogo divino, com 3 metros de raio e 12 metros de altura, surge centrada em um ponto dentro do alcance; cada criatura na área faz um teste de resistência de Destreza, sofrendo 4d6 de dano de fogo mais 4d6 de dano radiante em uma falha, ou metade disso em um sucesso. Ao ser conjurada com espaço de nível maior, o dano de fogo e o dano radiante aumentam em 1d6 cada para cada nível acima do 5º."
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
    "summary": "Ritual que estabelece contato breve com a divindade do conjurador ou um de seus servos, permitindo fazer até três perguntas que possam ser respondidas com sim ou não antes de o efeito terminar, em 1 minuto. As respostas costumam ser verdadeiras, mas conjurar essa magia repetidamente antes de um descanso longo aumenta a chance cumulativa de receber apenas silêncio no lugar de uma resposta."
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
    "summary": "Ritual em que o conjurador se sintoniza com a natureza ao redor, obtendo conhecimento sobre o terreno em um raio de aproximadamente 5 quilômetros (ou 500 metros se estiver debaixo da terra), incluindo relevo, corpos d'água e a presença predominante de plantas, minerais, animais ou povoados. O conjurador escolhe até três fatos específicos que deseja descobrir sobre essa área."
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
    "summary": "Emana do conjurador um cone de 18 metros de frio congelante; cada criatura na área faz um teste de resistência de Constituição, sofrendo 8d8 de dano de frio em uma falha, ou metade disso em um sucesso. Uma criatura morta por esse dano fica reduzida a uma estátua de gelo quebradiça; ao ser conjurada com espaço de nível maior, o dano aumenta em 1d8 para cada nível acima do 5º."
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
    "summary": "Ao nomear ou descrever com precisão uma pessoa, lugar ou objeto famoso, o conjurador recebe do mestre informações relevantes e antigas sobre esse assunto, que podem incluir fatos históricos importantes, canções ou lendas locais ainda lembradas por sábios. Quanto mais vago for o assunto escolhido, mais incompleta tende a ser a informação obtida."
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
    "summary": "Invoca um elemental com Nível de Desafio 5 ou menor, que surge em um espaço desocupado dentro do alcance e obedece às ordens do conjurador enquanto durar a concentração, até 1 hora; sem ordens, ele apenas se defende. Ao ser conjurada com espaço de nível maior, o Nível de Desafio máximo do elemental invocado aumenta em 1 para cada nível acima do 5º."
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
    "summary": "Uma chuva de projéteis mágicos desaba sobre um ponto escolhido dentro do alcance, atingindo um cilindro de 12 metros de raio por 6 metros de altura; cada criatura na área faz um teste de resistência de Destreza, sofrendo 8d8 de dano perfurante em uma falha, ou metade disso em um sucesso. Ao ser conjurada com espaço de nível maior, o dano aumenta em 1d8 para cada nível acima do 5º."
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
    "summary": "Após um ritual de 24 horas, o conjurador consagra uma área de até 18 metros de raio, impedindo que aberrações e mortos-vivos entrem ou se manifestem ali e protegendo os que estão dentro contra serem enfeitiçados, amedrontados ou possuídos por tais criaturas. Além disso, o conjurador vincula ao local um efeito mágico adicional à sua escolha, como resistência a um tipo de dano, silêncio absoluto ou proteção contra o medo, que persiste enquanto a consagração não for dissipada."
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
    "summary": "Ritual em que o conjurador projeta sua mente através dos planos para contatar uma entidade distante e poderosa, arriscando um teste de resistência de Inteligência: em uma falha, sofre 6d6 de dano psíquico e fica atordoado por um bom tempo, podendo até enlouquecer temporariamente. Em caso de sucesso, pode fazer até cinco perguntas, recebendo respostas curtas (sim, não, talvez, nunca, irrelevante ou incompreensível) que podem ou não ser verdadeiras conforme os interesses da entidade contatada."
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
    "summary": "Modela um objeto sólido e não vivo de até 1,5 metro de lado a partir de matéria sutil condensada, dentro do alcance; a duração do objeto depende do material escolhido, sendo permanente se for mineral e temporária se for vegetal ou similar, e a magia não pode criar criaturas nem itens mágicos. Ao ser conjurada com espaço de nível maior, o tamanho máximo do cubo criado aumenta em 1,5 metro para cada dois níveis acima do 5º."
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
    "summary": "Abre uma passagem através de madeira, gesso ou pedra, criando um túnel de 1,5 metro de largura, 2,5 metros de altura e até 6 metros de profundidade em uma superfície sólida dentro do alcance. A passagem permanece por 1 hora, e qualquer criatura ainda dentro dela quando o efeito termina é empurrada para um dos lados ou fica presa, dependendo da posição."
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
    "summary": "Uma barreira invisível de 3 metros de raio envolve o conjurador e se move com ele, impedindo que criaturas vivas, exceto ele mesmo, atravessem a barreira ou estendam qualquer parte do corpo ou efeito através dela; ainda assim, o conjurador pode permitir a passagem de alguém segurando sua mão. Dura enquanto durar a concentração, até 1 hora."
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
    "summary": "Uma onda de energia curativa atinge até seis criaturas escolhidas dentro de uma esfera de 9 metros de raio centrada em um ponto ao alcance, e cada uma recupera 3d8 pontos de vida mais o modificador de habilidade de conjuração do conjurador. Ao ser conjurada com espaço de nível maior, a cura concedida aumenta em 1d8 para cada nível acima do 5º."
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
    "summary": "Após 8 horas de ritual tocando uma besta ou planta com Inteligência 3 ou menor, a criatura desperta para uma consciência plena, passando a ter Inteligência 10 e a capacidade de falar um idioma conhecido pelo conjurador, ganhando também, no caso de uma planta, a habilidade de mover seus membros. A criatura desperta se torna amistosa com o conjurador por 30 dias ou até ser maltratada, passando a decidir por si mesma como agir depois disso."
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
    "summary": "O conjurador se torna invisível e cria simultaneamente um duplo ilusório de si mesmo em seu antigo lugar, podendo perceber através dos sentidos do duplo e controlar seus movimentos e fala à distância; atacar ou conjurar magias através do duplo não encerra a invisibilidade do conjurador. O efeito dura enquanto durar a concentração, até 1 hora."
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
    "summary": "Como ação bônus, o conjurador envolve sua arma em energia astral; o próximo ataque corpo a corpo bem-sucedido durante a concentração, até 1 minuto, causa 5d10 de dano de força adicional, e se esse golpe reduzir a 50 pontos de vida ou menos um alvo que não seja nativo do plano em que se encontra, a criatura é banida de volta ao seu plano de origem."
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
    "summary": "Durante a concentração, até 1 minuto, celestiais, elementais, feéricos, infernais e mortos-vivos sofrem desvantagem em ataques contra o conjurador; a qualquer momento ele também pode gastar sua ação para tentar expulsar uma dessas criaturas que o tenha enfeitiçado, possuído ou amedrontado, forçando um teste de resistência de Carisma que, se falho, faz a criatura fugir ou ser expulsa por 1 minuto."
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
    "summary": "Um humanoide visível dentro do alcance faz um teste de resistência de Sabedoria; em uma falha, fica enfeitiçado enquanto durar a concentração, até 1 minuto, e o conjurador estabelece um vínculo telepático para lhe dar ordens simples, que a criatura obedece a menos que sejam suicidas (sem ordem, ela apenas se defende). O alvo repete o teste toda vez que sofre dano, encerrando o efeito em um sucesso; ao ser conjurada com espaço de nível maior, a duração aumenta para até 8 horas com um espaço de 6º nível, até 24 horas com um de 7º, e deixa de exigir concentração com um espaço de 8º nível ou maior."
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
    "summary": "Uma criatura visível dentro do alcance, que não seja morta-viva, faz um teste de resistência de Sabedoria, ficando paralisada enquanto durar a concentração em uma falha; ela repete o teste ao final de cada um de seus turnos, encerrando o efeito em um sucesso. Ao ser conjurada com espaço de nível maior, uma criatura adicional a até 9 metros das demais pode ser afetada para cada nível acima do 5º."
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
    "summary": "Ritual que cria um vínculo telepático entre até oito criaturas dispostas dentro do alcance, permitindo que se comuniquem mentalmente entre si independentemente do idioma, desde que permaneçam no mesmo plano de existência, sem limite prático de distância entre elas. O vínculo dura 1 hora."
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
    "summary": "Cria uma mão espectral enorme e translúcida que o conjurador controla como ação bônus a cada turno, podendo escolher entre socar (ataque à distância usando o modificador de conjuração, 4d8 de dano de força), empurrar, agarrar (impondo a condição agarrado com um teste de Força) ou simplesmente bloquear uma passagem. A mão dura enquanto durar a concentração, até 1 minuto; ao ser conjurada com espaço de nível maior, o dano do soco aumenta em 2d8 para cada nível acima do 5º."
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
    "summary": "Impõe uma ordem mágica a uma criatura visível dentro do alcance que compreenda o conjurador; ela faz um teste de resistência de Sabedoria, e em uma falha fica compelida a cumprir ou evitar determinada atividade por 30 dias, sofrendo 5d10 de dano psíquico sempre que agir claramente contra a ordem. Ao ser conjurada com espaço de nível de 7º ou 8º a duração passa a ser de 1 ano, e com um espaço de 9º nível a ordem se torna permanente até ser dissipada."
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
    "summary": "Uma criatura visível dentro do alcance faz um teste de resistência de Sabedoria, com vantagem se estiver em combate; em uma falha, fica enfeitiçada durante a concentração, até 1 minuto, permitindo ao conjurador apagar, alterar, tornar mais vívida ou implantar uma lembrança de até 10 minutos dentro das últimas 24 horas vividas pelo alvo. Ao ser conjurada com espaço de nível maior, o alcance temporal das lembranças manipuláveis se estende bastante, podendo abranger qualquer momento da vida do alvo com um espaço de 8º nível ou superior."
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
    "summary": "Cria uma barreira invisível e intangível composta por até dez painéis de 3 metros de lado (ou moldada como esfera ou hemisfério), completamente imune a dano e à dissipar magia, através da qual nada consegue passar fisicamente, embora teletransporte e viagem planar atravessem sem problema. Dura enquanto durar a concentração, até 10 minutos."
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
    "summary": "Faz surgir uma muralha de pedra não mágica com 15 centímetros de espessura, composta por até dez painéis de 3 metros de lado que podem ser moldados em formas diversas, inclusive apoiadas em superfícies já existentes. Se o conjurador mantiver a concentração pelos 10 minutos completos de duração, a muralha se torna permanente; caso contrário, ela desmorona ao final do efeito."
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
    "summary": "Uma esfera de névoa amarelo-esverdeada e venenosa, de 6 metros de raio, surge centrada em um ponto ao alcance e se afasta 3 metros do conjurador ao final de cada um dos turnos dele, contornando obstáculos e assentando-se em terrenos baixos. Toda criatura que entra ou termina o turno na névoa faz um teste de resistência de Constituição, sofrendo 5d8 de dano de veneno em uma falha ou metade disso em um sucesso, enquanto durar a concentração, até 10 minutos; ao ser conjurada com espaço de nível maior, o dano aumenta em 1d8 para cada nível acima do 5º."
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
    "summary": "O conjurador golpeia o chão liberando uma onda de energia em um raio de 9 metros centrado nele mesmo; cada criatura à escolha do conjurador na área, exceto ele, faz um teste de resistência de Constituição, sofrendo 5d6 de dano de trovão mais 5d6 de dano radiante ou necrótico (à escolha do conjurador) e caindo prostrada em uma falha, ou sofrendo apenas metade do dano sem cair prostrada em um sucesso."
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
    "summary": "Um ataque corpo a corpo mágico contra uma criatura a até 1,5 metro a deixa envenenada; a partir daí, ela faz um teste de resistência de Constituição ao final de cada um de seus turnos, e ao acumular três sucessos antes de três falhas o veneno é neutralizado, mas ao acumular três falhas antes de três sucessos ela contrai uma doença grave, escolhida pelo conjurador entre efeitos como cegueira, fraqueza ou convulsões, que persiste por até 7 dias, até ser curada."
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
    "summary": "Um enxame de insetos ferozes preenche uma esfera de 6 metros de raio centrada em um ponto dentro do alcance, tornando a área terreno difícil e levemente obscurecida; toda criatura que esteja lá quando o efeito surge, ou que termine o turno dentro dele, faz um teste de resistência de Constituição, sofrendo 4d10 de dano perfurante em uma falha ou metade disso em um sucesso. Dura enquanto durar a concentração, até 10 minutos; ao ser conjurada com espaço de nível maior, o dano aumenta em 1d10 para cada nível acima do 5º."
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
    "summary": "Ao tocar o corpo de um humanoide morto há poucos dias, desde que a alma esteja livre e disposta a retornar, a magia cria um novo corpo adulto de uma raça determinada aleatoriamente próximo ao local, e a alma do falecido se transfere para ele. A criatura retorna à vida com a mesma personalidade, memórias e nível de classe de antes, mas com a aparência e possivelmente os traços raciais do novo corpo."
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
    "summary": "Ao tocar uma criatura, o conjurador pode eliminar um dos seguintes efeitos: um nível de exaustão, a condição enfeitiçado ou petrificado, uma maldição, ou uma redução de pontos de vida máximos ou de um valor de habilidade causada por magia ou por um efeito especial. A magia é instantânea e não requer concentração."
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
    "summary": "Traz de volta à vida uma criatura morta há no máximo 10 dias, desde que sua alma esteja livre e disposta a retornar e seu corpo ainda possua os órgãos necessários à vida; a criatura reaparece com 1 ponto de vida, e a magia neutraliza qualquer veneno e cura doenças não mágicas presentes no momento da morte, embora partes do corpo perdidas não sejam restauradas."
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
    "summary": "Altera a aparência, e se desejado a voz, de até oito criaturas dispostas dentro do alcance, fazendo-as parecer mais altas, mais baixas, de outra raça ou com feições diferentes, incluindo roupas e equipamento, por 8 horas ou até o alvo morrer. Uma criatura que interaja fisicamente com o disfarce pode perceber a ilusão com um teste de Investigação bem-sucedido contra a CD do conjurador."
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
    "summary": "O conjurador usa um mensageiro voluntário adormecido como veículo para entrar no sonho de uma criatura conhecida, em qualquer lugar do mesmo plano, aparecendo na forma que escolher para conversar ou entregar uma mensagem; ao final, pode transformar o sonho em pesadelo, causando 3d6 de dano psíquico ao alvo e impedindo que ele obtenha os benefícios do descanso. O efeito dura até 8 horas, mas o conjurador pode encerrá-lo antes desse prazo."
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
    "summary": "Durante a concentração, até 10 minutos, o conjurador pode usar sua ação em cada turno para manipular à distância um objeto de até 450 quilos, movendo-o até 9 metros, ou tentar mover uma criatura dentro do alcance, que resiste com um teste de Força; em caso de falha, ela é deslocada até 9 metros na direção desejada pelo conjurador."
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
    "summary": "Cria um sensor invisível e móvel próximo a uma criatura, objeto ou local escolhido, através do qual o conjurador pode ver e ouvir como se estivesse lá; se o alvo for uma criatura resistente, ela faz um teste de resistência de Sabedoria, mais fácil ou mais difícil dependendo do quanto o conjurador sabe ou possui dela, impedindo o efeito em caso de sucesso. Dura enquanto durar a concentração, até 10 minutos."
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
    "summary": "O conjurador solicita o auxílio de uma criatura celestial, elemental, feérica ou infernal poderosa em um local onde ela costume estar, e se ela concordar, o que não é garantido, negocia um serviço em troca de um pagamento ou oferenda determinado pelo mestre. A criatura, se disposta, presta a ajuda combinada, mas pode exigir uma quantia alta ou recusar tarefas que considere perigosas ou indignas demais."
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
    "summary": "Você mira uma criatura visível a até 18 metros, que deve ser bem-sucedida em um teste de resistência de Sabedoria ou sofre, à sua escolha, um entre três efeitos: cai inconsciente, fica apavorada e foge de você, ou fica enjoada com desvantagem em ataques e testes de habilidade. O efeito dura enquanto você mantiver concentração, por até 1 minuto, e em turnos seguintes você pode gastar uma ação para mirar em outro alvo."
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
    "summary": "Você invoca um banquete suntuoso para até doze criaturas, que precisam de 1 hora para comer; ao terminar, cada uma cura doenças e neutraliza venenos presentes, ganha vantagem em testes de resistência de Sabedoria e imunidade a veneno e medo, e tem seu máximo de pontos de vida aumentado em 2d10 (recebendo essa cura imediatamente), tudo durando 24 horas."
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
    "summary": "Você cria uma muralha giratória de lâminas espectrais com até 30 metros de comprimento (ou um anel fechado), erguendo-se 6 metros e ocupando 1,5 metro de espessura; criaturas no espaço da muralha ao surgir, ou que tentem atravessá-la, fazem um teste de resistência de Destreza, sofrendo 6d10 de dano cortante em uma falha ou metade em um sucesso, e o espaço vira terreno difícil enquanto a concentração durar, por até 10 minutos."
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
    "summary": "Você e até dez criaturas voluntárias a até 9 metros se transformam em uma forma gasosa e nebulosa, ganhando deslocamento de voo de 90 metros e resistência a dano não mágico pelas próximas 8 horas; qualquer uma pode retomar a forma normal como ação bônus, mas precisa de 1 minuto para voltar a se transformar em névoa."
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
    "summary": "Uma criatura a até 18 metros faz um teste de resistência de Constituição; em uma falha, fica restringida e deve repetir o teste em cada um de seus turnos seguintes, sendo petrificada após três falhas consecutivas, enquanto três sucessos consecutivos encerram o efeito antes do fim da concentração de até 1 minuto."
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
    "summary": "Você faz um ponto a até 45 metros explodir em energia negativa numa esfera de 18 metros de raio; cada criatura na área faz um teste de resistência de Constituição, sofrendo 8d6 de dano necrótico em uma falha ou metade em um sucesso. Ao ser conjurada com espaço de nível maior, o dano aumenta em 2d6 para cada nível acima do 6º."
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
    "summary": "Você invoca um espírito feérico ou fera feérica com desafio 6 ou menor (ou mais de uma, somando desafios equivalentes) em um espaço desocupado a até 27 metros; a criatura age como sua aliada e obedece seus comandos enquanto você mantiver concentração, por até 1 hora, desaparecendo ao fim da duração. Ao ser conjurada com espaço de nível maior, o desafio máximo permitido aumenta."
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
    "summary": "Você prepara uma magia de até 5º círculo que afete apenas você mesmo, definindo uma condição específica de disparo; se essa condição ocorrer dentro de 10 dias, a magia armazenada é conjurada automaticamente sem custar sua ação, e apenas uma contingência pode estar ativa de cada vez."
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
    "summary": "Você lança um raio principal contra um alvo a até 45 metros e mais três raios secundários que saltam para outras criaturas diferentes a até 9 metros do alvo original; cada uma faz um teste de resistência de Destreza, sofrendo 10d8 de dano elétrico em uma falha ou metade em um sucesso. Ao ser conjurada com espaço de nível maior, um raio adicional salta para outro alvo por nível acima do 6º."
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
    "summary": "Você anima até três cadáveres a até 3 metros de distância, transformando-os em carniçais sob seu comando indefinido. Ao ser conjurada com espaço de nível maior, você pode criar mortos-vivos mais poderosos, como carcaças ou múmias, em vez de carniçais."
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
    "summary": "Você canaliza energia curativa em uma criatura a até 18 metros, restaurando 70 pontos de vida instantaneamente e encerrando cegueira, surdez e qualquer doença que a afete; a magia não tem efeito sobre mortos-vivos ou constructos. Ao ser conjurada com espaço de nível maior, a cura aumenta em 10 pontos de vida para cada nível acima do 6º."
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
    "summary": "Uma criatura a até 9 metros é forçada a dançar de forma cômica e desajeitada, gastando sua ação para continuar dançando, tendo desvantagem em testes de resistência de Destreza e concedendo vantagem a ataques contra ela, além de ter desvantagem em seus próprios ataques; ao final de cada um de seus turnos ela pode repetir um teste de resistência de Sabedoria para encerrar o efeito, que dura enquanto você mantiver concentração, por até 1 minuto."
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
    "summary": "Você mira uma criatura, um objeto ou uma seção de até 3 metros cúbicos de uma superfície a até 18 metros; uma criatura-alvo faz um teste de resistência de Destreza, sofrendo 10d6+40 de dano de força em uma falha (nenhum efeito em um sucesso), e se esse dano a reduzir a 0 pontos de vida, seu corpo se desfaz em poeira fina; objetos visados são automaticamente destruídos. Ao ser conjurada com espaço de nível maior, o dano aumenta em 3d6 para cada nível acima do 6º."
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
    "summary": "Você mira uma criatura a até 18 metros, que faz um teste de resistência de Constituição; em uma falha, sofre 14d6 de dano necrótico e tem seu máximo de pontos de vida reduzido nesse valor até descansar longamente, e em um sucesso sofre metade do dano sem essa redução; o efeito nunca reduz o alvo a menos de 1 ponto de vida."
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
    "summary": "Enquanto mantiver concentração, por até 1 dia, você percebe a rota mais direta até um local ou objeto que conheça, mesmo em outro plano de existência, e ganha vantagem em testes de habilidade e em testes de resistência para evitar obstáculos, desvios ou armadilhas ao longo do trajeto."
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
    "summary": "Você arremessa uma esfera de gelo até um ponto a até 90 metros, que se rompe em uma explosão de 18 metros de raio; cada criatura na área faz um teste de resistência de Constituição, sofrendo 10d6 de dano de frio em uma falha ou metade em um sucesso, podendo também congelar a superfície de água líquida presente. Ao ser conjurada com espaço de nível maior, o dano aumenta em 1d6 para cada nível acima do 6º."
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
    "summary": "Você cria uma esfera protetora de 3 metros de raio centrada em você mesmo, dentro da qual magias de 5º círculo ou inferior conjuradas por outros simplesmente não têm efeito, enquanto você mantiver concentração, por até 1 minuto. Ao ser conjurada com espaço de nível maior, o círculo máximo bloqueado sobe de acordo com o espaço usado."
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
    "summary": "Você cria uma ilusão semelhante à imagem maior em um ponto a até 36 metros, programada para só se manifestar quando uma condição específica que você definiu ocorrer; ativada a ilusão dura até 5 minutos e volta a ficar latente, repetindo-se sempre que o gatilho se repetir, até que a magia seja dissipada."
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
    "summary": "Ritual em que você toca um objeto de até 4,5 quilos e vincula a ele uma palavra secreta; a qualquer momento depois, dizer essa palavra em voz alta teleporta o objeto instantaneamente para sua mão, não importa a distância, e o vínculo segue ativo até ser usado ou dissipado."
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
    "summary": "Enquanto mantiver concentração, por até 2 horas, você remodela terra, areia ou argila macia dentro de um cubo de 12 metros de lado a até 36 metros, erguendo colinas, escavando valas ou nivelando o solo gradualmente em intervalos de 10 minutos; pedra maciça e estruturas trabalhadas não são afetadas."
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
    "summary": "Você faz brotar uma muralha de espinhos retorcidos com até 18 metros de comprimento e 3 metros de altura a até 36 metros; criaturas no espaço ao surgir fazem um teste de resistência de Destreza, sofrendo 7d8 de dano perfurante em uma falha ou metade em um sucesso, e atravessar a muralha custa movimento extra e causa dano adicional enquanto você mantiver concentração, por até 10 minutos. Ao ser conjurada com espaço de nível maior, o dano inicial aumenta em 1d8 para cada nível acima do 6º."
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
    "summary": "Você ergue uma muralha de gelo com até dez painéis de 3 metros de lado (ou um domo ou esfera equivalente) a até 36 metros; criaturas no espaço ao surgir fazem um teste de resistência de Destreza, sofrendo 10d6 de dano de frio em uma falha ou metade em um sucesso, e a muralha resiste enquanto você mantiver concentração, por até 10 minutos, deixando uma névoa gélida e terreno difícil ao ser destruída. Ao ser conjurada com espaço de nível maior, o dano e os pontos de vida de cada painel aumentam."
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
    "summary": "Você e até cinco criaturas voluntárias a até 1,5 metro são instantaneamente transportadas para um santuário específico que você vinculou previamente a esta magia, não importa a distância, desde que ambos estejam no mesmo plano de existência."
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
    "summary": "Você cria um par de portais circulares conectados, cada um com até 3 metros de diâmetro, dentro de 3 metros um do outro em cada extremidade e a até 150 metros de você; qualquer criatura ou objeto que atravesse um portal emerge instantaneamente do outro, enquanto você mantiver concentração, por até 10 minutos."
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
    "summary": "Ritual que protege uma área de até 3.700 metros quadrados dentro de uma mesma edificação por 1 dia, impedindo teleporte e viagem planar para dentro ou para fora dela e causando 5d10 de dano radiante ou necrótico, à sua escolha, a criaturas de um tipo específico que você designar ao entrarem na área; repetir a conjuração no mesmo local por um ano torna a proteção permanente."
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
    "summary": "Você impregna uma estrutura de até 232 metros quadrados com uma rede de efeitos protetores por 24 horas, incluindo névoa que reduz a visão, portas trancadas magicamente, um alarme silencioso e corredores ou aposentos ilusórios que confundem quem tentar atravessar a área sem autorização."
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
    "summary": "Você emite um feixe de luz solar em uma linha de 18 metros de comprimento e 1,5 metro de largura partindo de você; cada criatura na área faz um teste de resistência de Constituição, sofrendo 6d8 de dano radiante e ficando cega até o fim do seu próximo turno em uma falha, ou metade do dano sem cegueira em um sucesso, e em turnos seguintes você pode usar uma ação para emitir outro feixe enquanto mantiver concentração, por até 1 minuto."
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
    "summary": "Você transfere sua alma para dentro de um recipiente mágico especialmente preparado, deixando seu corpo inconsciente; a partir do recipiente, você pode tentar possuir um humanoide próximo que falhe em um teste de resistência de Carisma, passando a controlar seu corpo e a perceber o mundo através dele enquanto a magia durar, até ser dissipada, podendo alternar entre hospedeiros ou retornar ao recipiente quando quiser."
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
    "summary": "Você mira até doze criaturas capazes de ouvi-lo a até 18 metros, cada uma fazendo um teste de resistência de Sabedoria; em uma falha, a criatura passa a seguir um curso de ação razoável que você sugerir, mantendo esse comportamento por 24 horas ou até que a ordem seja cumprida ou uma palavra de comando a encerre, desde que a sugestão não seja obviamente prejudicial a ela. Ao ser conjurada com espaço de nível maior, a duração se estende para dias, semanas ou até cerca de um ano, conforme o círculo usado."
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
    "summary": "Você cria uma passagem mágica entre uma planta grande a até 3 metros de você e outra planta da mesma espécie que você já conheça, permitindo que você e outras criaturas entrem em uma delas e emerjam instantaneamente da outra durante 1 rodada, mesmo que estejam em outro plano de existência."
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
    "summary": "Ao tocar uma criatura voluntária, você concede a ela visão verdadeira com alcance de 36 metros por 1 hora, permitindo enxergar através de ilusões e disfarces mágicos, perceber criaturas no Plano Etéreo e enxergar normalmente mesmo na escuridão mágica."
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
    "summary": "Você cria uma esfera de fogo latente em um ponto a até 45 metros, que se expande em uma explosão de 6 metros de raio; cada criatura na área faz um teste de resistência de Destreza, sofrendo 12d6 de dano de fogo em uma falha ou metade em um sucesso, e enquanto você mantiver concentração, por até 1 minuto, o dano aumenta em 1d6 a cada rodada antes da detonação; tocar a esfera antes disso a faz explodir imediatamente. Ao ser conjurada com espaço de nível maior, o dano base aumenta em 1d6 para cada nível acima do 7º."
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
    "summary": "Você invoca um celestial de desafio 4 ou menor em um espaço desocupado a até 27 metros; a criatura age como sua aliada e segue seus comandos enquanto você mantiver concentração, por até 1 hora, desaparecendo ao fim da duração. Ao ser conjurada com espaço de nível maior, o desafio máximo permitido aumenta."
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
    "summary": "Você mira uma criatura a até 18 metros com energia mortífera, que faz um teste de resistência de Constituição, sofrendo 7d8+30 de dano necrótico em uma falha ou metade em um sucesso; um humanoide morto por esse dano se ergue no início do seu próximo turno como um zumbi sob seu comando permanente."
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
    "summary": "Você cria uma lâmina espectral flutuante a até 18 metros que ataca imediatamente uma criatura à sua escolha próxima a ela, e em turnos seguintes você pode usar uma ação bônus para movê-la e atacar de novo; cada acerto é um ataque mágico corpo a corpo que causa 3d10 de dano de força, durando enquanto você mantiver concentração, por até 1 minuto."
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
    "summary": "Você e até três criaturas voluntárias que estejam tocando você entram parcialmente no Plano Etéreo, tornando-se invisíveis e intangíveis para criaturas no plano material (e vice-versa) por até 8 horas, podendo perceber ambos os planos próximos e retornar antecipadamente usando uma ação."
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
    "summary": "Você inverte a gravidade em um cilindro de 15 metros de raio e 30 metros de altura a até 30 metros; objetos soltos e criaturas que falharem em um teste de resistência de Destreza começam a cair para cima até atingirem uma superfície ou saírem da área, enquanto você mantiver concentração, por até 1 minuto, e ao fim tudo cai de volta na direção normal."
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
    "summary": "Ao tocar uma criatura voluntária ou um objeto, você o torna invisível e o coloca em uma espécie de animação suspensa que interrompe o tempo para ele, sem necessidade de respirar, comer ou envelhecer, e o torna indetectável por adivinhações como bola de cristal, até que uma condição específica que você definir encerre a magia."
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
    "summary": "Você cria uma entrada extradimensional para uma morada luxuosa em um ponto a até 90 metros, mobiliada e com até três servos espectrais para atender visitantes, durando 24 horas antes que a porta desapareça e tudo em seu interior seja ejetado para fora."
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
    "summary": "Você transforma a aparência de um terreno natural em uma área de até 1,6 quilômetro de lado que você possa ver, alterando visão, som, cheiro e textura para simular outra paisagem, efeito que dura até 10 dias e engana até criaturas que interajam fisicamente com o terreno ilusório."
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
    "summary": "Como uma ação bônus, você pronuncia uma palavra sagrada que afeta cada criatura à sua escolha a até 9 metros capaz de ouvi-lo; o efeito depende dos pontos de vida atuais do alvo, variando entre ficar surdo, cego, atordoado ou morrer instantaneamente conforme sua vida restante é menor, e celestiais, elementais, feéricos ou infernais hostis fora de seu plano de origem também são banidos de volta a ele."
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
    "summary": "Você aprisiona uma criatura grande ou até oito criaturas menores dentro de uma gaiola de barras de força invisíveis (cubo de 6 metros) ou de uma caixa sólida sem janelas (cubo de 3 metros) a até 30 metros; cada alvo faz um teste de resistência de Carisma, ficando preso na estrutura em uma falha, que bloqueia passagem física e a maioria dos efeitos mágicos e teleporte, durando 1 hora ou até ser destruída por magias específicas como desintegrar."
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
    "summary": "Você cria uma imagem ilusória idêntica a você em um local que conheça ou consiga ver, capaz de se mover à sua vontade e reproduzir sua fala e gestos, embora seja intangível e não interaja fisicamente com nada; você percebe através dela como se estivesse lá, enquanto mantiver concentração, por até 1 dia."
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
    "summary": "Você emite oito raios coloridos em um cone de 18 metros partindo de você; cada criatura na área é atingida por um ou mais raios sorteados aleatoriamente, cada cor exigindo um teste de resistência diferente e causando um efeito distinto, como 10d6 de dano elemental (fogo, ácido, frio, raio ou veneno), petrificação gradual, ou cegueira seguida de banimento para outro plano, sem que você escolha qual raio atinge cada alvo."
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
    "summary": "Ao tocar uma criatura, você restaura instantaneamente 4d8+15 pontos de vida e faz com que ela recupere mais 1 ponto de vida no início de cada um dos seus turnos pela próxima hora; partes do corpo perdidas, como dedos ou membros, voltam a crescer em minutos se o coto for mantido junto ao corpo, ou se regeneram sozinhas ao longo da duração caso contrário."
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
    "summary": "Após 1 hora de ritual tocando uma criatura morta há no máximo um século, que não tenha morrido de velhice e cuja alma esteja livre e disposta a retornar, você a traz de volta à vida com todos os pontos de vida restaurados, curando qualquer doença ou veneno presente no momento da morte e fechando ferimentos mortais, desde que ainda exista alguma parte do corpo para servir de foco."
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
    "summary": "Grava um símbolo mágico oculto em uma superfície, porta ou objeto, que se ativa quando um gatilho definido pelo conjurador acontece (tocar, ler, aproximar-se, etc.). Ao disparar, todas as criaturas em uma esfera de 18 metros de raio sofrem um entre vários efeitos à escolha do conjurador feita no momento da conjuração — como medo, sono, dor, loucura ou até morte — cada um exigindo um teste de resistência específico (Sabedoria, Constituição ou Carisma, conforme o efeito) para reduzir ou anular a consequência."
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
    "summary": "Molda um duplicado quase perfeito de uma criatura à escolha usando neve ou gelo, um fragmento do corpo original e componentes raros; o processo consome longas horas e o resultado é uma cópia leal ao conjurador, com metade dos pontos de vida máximos do original e as mesmas habilidades, exceto pela incapacidade de recuperar pontos de vida perdidos por descanso. Se reduzida a 0 pontos de vida, a duplicata se desfaz em neve derretida."
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
    "summary": "Transporta instantaneamente o conjurador e até oito criaturas ou objetos dispostos a um destino no mesmo plano de existência. Quanto menos familiar for o destino ao conjurador, maior a chance de um desvio no local de chegada ou de um pequeno acidente na materialização, podendo até resultar em falha total da viagem."
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
    "summary": "Faz brotar paredes de chamas em até dez cubos contíguos de 3 metros dentro do alcance; cada criatura na área faz um teste de resistência de Destreza, sofrendo 7d10 de dano de fogo se falhar ou metade disso se for bem-sucedida. Vegetação não protegida na área é consumida pelo fogo."
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
    "summary": "Toca em até oito criaturas dispostas e as envia instantaneamente para um plano de existência diferente escolhido pelo conjurador, usando uma haste de metal sintonizada como foco. Se usada contra uma criatura hostil, esta pode fazer um teste de resistência de Carisma para evitar ser banida a um local aleatório do plano escolhido."
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
    "summary": "Encanta um objeto, local ou criatura para atrair irresistivelmente (simpatia) ou repelir violentamente (antipatia) um tipo específico de criatura definido pelo conjurador. Qualquer criatura desse tipo que se aproxime deve ser bem-sucedida em um teste de resistência de Sabedoria ou passa a se sentir compelida a se aproximar ou a evitar o alvo pelo resto dos 10 dias de duração."
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
    "summary": "Envolve o conjurador em luz divina, concedendo a até dez criaturas de sua escolha ao alcance vantagem em testes de resistência e impondo desvantagem em ataques feitos por inimigos contra elas enquanto a aura durar. Se um morto-vivo ou um demônio acertar um ataque corpo a corpo contra uma criatura protegida, deve ser bem-sucedido em um teste de resistência de Constituição ou fica cego."
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
    "summary": "Cria uma esfera estável de 3 metros de raio ao redor do conjurador dentro da qual magias não podem ser conjuradas, efeitos mágicos existentes são suprimidos e a maioria dos itens mágicos perde suas propriedades enquanto permanecer na área. Criaturas convocadas ou mantidas por magia dentro da esfera ficam temporariamente suprimidas até saírem dela."
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
    "summary": "Cria um recipiente selado contendo um pedaço da criatura-alvo, que ao longo de 120 dias cresce até formar um corpo idêntico e destituído de consciência. Se a criatura original morrer depois disso, sua alma migra para o clone, que desperta com todas as lembranças e habilidades do original até o momento de sua morte."
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
    "summary": "Permite ao conjurador alterar gradualmente as condições climáticas em uma área imensa ao redor de si, mudando precipitação, temperatura, nebulosidade e vento em etapas ao longo de alguns minutos, enquanto mantiver a concentração por até 8 horas. O tipo exato de clima resultante fica a critério do mestre, dentro das opções compatíveis com a região."
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
    "summary": "Uma criatura visível ao alcance faz um teste de resistência de Sabedoria ou fica enfeitiçada, permitindo ao conjurador se comunicar telepaticamente com ela e emitir comandos, ou assumir controle total dela gastando uma ação; o alvo pode repetir o teste sempre que sofrer dano, encerrando o efeito em caso de sucesso. Ao ser conjurada com espaço de 9º círculo, a duração passa a ser concentração por até 8 horas."
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
    "summary": "Uma criatura visível ao alcance faz um teste de resistência de Inteligência; se falhar, sofre 4d6 de dano psíquico e tem seus valores de Inteligência e Carisma reduzidos a 1, perdendo a capacidade de lançar magias, entender linguagem ou se comunicar de forma coerente até que a condição seja revertida por magia poderosa de restauração."
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
    "summary": "Um clarão ofuscante se expande em uma esfera de 18 metros de raio; cada criatura na área faz um teste de resistência de Constituição, sofrendo 12d6 de dano radiante se falhar (metade se for bem-sucedida) e ficando cega por 1 minuto, podendo repetir o teste ao final de cada turno para deixar de estar cega. Mortos-vivos e limos têm desvantagem nesse teste de resistência."
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
    "summary": "Transforma cada criatura disposta ao alcance em uma Besta à escolha do conjurador com Nível de Desafio 4 ou menor, mantendo a mente e a personalidade de cada uma delas na nova forma. O efeito dura enquanto a concentração for mantida, por até 24 horas, e cada criatura pode retornar à forma original antes disso como uma ação bônus."
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
    "summary": "Bane instantaneamente uma criatura visível ao alcance para um labirinto extradimensional isolado. Em seu turno, a criatura presa pode gastar a ação para tentar escapar com um teste de Inteligência CD 20 (minotauros e criaturas nativas de labirintos têm sucesso automático); se a magia terminar antes da fuga, a criatura retorna ao espaço que ocupava."
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
    "summary": "Toca em uma criatura disposta, tornando-a imune por 24 horas a dano psíquico, a leitura ou controle da mente, a efeitos de adivinhação que revelem pensamentos ou emoções, e a qualquer forma de enfeitiçamento, incluindo tentativas replicadas por Desejo."
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
    "summary": "Enquanto durar, qualquer teste de Carisma feito pelo conjurador é tratado como um resultado de 15 caso o valor natural seja menor, mesmo com desvantagem; além disso, magias e efeitos que detectem mentiras (como Zona da Verdade) consideram verdadeiras quaisquer afirmações feitas pelo conjurador durante essa hora de duração."
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
    "summary": "Conjura uma nuvem de fumaça e brasas em uma esfera de 6 metros de raio dentro do alcance, que obscurece levemente a área e se desloca 3 metros para longe do conjurador a cada rodada enquanto a concentração for mantida. Qualquer criatura que entre ou comece seu turno na nuvem faz um teste de resistência de Destreza, sofrendo 10d8 de dano de fogo se falhar ou metade disso em caso de sucesso."
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
    "summary": "Uma única palavra basta para atordoar uma criatura visível ao alcance, sem direito a teste de resistência, desde que ela tenha 150 pontos de vida ou menos no momento — do contrário, a magia não tem efeito algum. A criatura afetada pode repetir um teste de resistência de Constituição ao final de cada um de seus turnos para encerrar o atordoamento."
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
    "summary": "Abre uma porta sombria em uma superfície sólida ao alcance, que leva a uma sala vazia de 9 metros de lado em um semiplano criado pela própria magia. O conjurador e quem mais ele desejar podem atravessar a porta livremente enquanto ela existir; passada 1 hora, a porta desaparece, prendendo quem estiver dentro até que a magia seja conjurada novamente."
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
    "summary": "Estabelece um vínculo telepático bidirecional entre o conjurador e uma criatura que ele conheça, permitindo trocar pensamentos e palavras livremente por 24 horas, independentemente da distância entre eles, desde que estejam no mesmo plano de existência."
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
    "summary": "Provoca um violento tremor de terra em um raio de 30 metros ao redor de um ponto visível ao alcance; toda criatura sobre o solo na área faz um teste de resistência de Destreza ou cai prostrada, fissuras podem se abrir sob criaturas específicas, e estruturas na área correm risco de desabar, causando 5d6 de dano de concussão. O efeito se repete a cada rodada enquanto a concentração for mantida, por até 1 minuto."
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
    "summary": "Ergue uma parede de água de até 90 metros de comprimento e 90 metros de altura em um ponto visível, que na primeira rodada se transforma em uma onda avassaladora avançando 15 metros por rodada na direção escolhida. Criaturas atingidas fazem um teste de resistência de Força, sofrendo 6d10 de dano de concussão e sendo arrastadas pela onda se falharem, ou apenas metade do dano sem serem arrastadas se forem bem-sucedidas; a magia dura enquanto a concentração for mantida, até 6 rodadas."
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
    "summary": "O conjurador se transforma em qualquer criatura que já tenha visto, assumindo seu bloco de estatísticas físico mas mantendo suas próprias capacidades mentais e a habilidade de conjurar magias. Pode assumir uma nova forma novamente como ação sempre que desejar, e o efeito persiste enquanto a concentração for mantida, por até 1 hora."
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
    "summary": "Uma criatura ao alcance faz um teste de resistência de Sabedoria ou é presa por um entre vários métodos escolhidos pelo conjurador — sono eterno, redução a uma joia minúscula, aprisionamento em correntes ou isolamento em uma prisão extradimensional oculta. A criatura permanece presa indefinidamente até que a magia seja dissipada por um método específico ligado ao componente material usado."
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
    "summary": "Quatro meteoros flamejantes atingem pontos à escolha do conjurador dentro de 1,5 quilômetro, cada um explodindo em uma esfera de 12 metros de raio. Cada criatura na área de uma ou mais explosões faz um teste de resistência de Destreza, sofrendo 20d6 de dano de fogo somado a 20d6 de dano de concussão se falhar, ou metade disso se for bem-sucedida."
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
    "summary": "Distribui até 700 pontos de vida de cura entre quantas criaturas o conjurador desejar dentro do alcance, encerrando também qualquer cegueira, surdez ou doença nas criaturas curadas por essa magia."
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
    "summary": "A magia mais poderosa possível: replica perfeitamente qualquer outra magia de até 8º círculo sem exigir seus componentes ou pré-requisitos, ou concede ao conjurador um efeito essencialmente livre dentro dos limites que o mestre considerar razoável. Usar a magia para criar algo além de duplicar outro efeito é extremamente desgastante, causando ferimentos necróticos graves que reduzem permanentemente os pontos de vida máximos do conjurador, debilitando-o por vários dias e trazendo uma chance real de ele jamais conseguir conjurar Desejo novamente."
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
    "summary": "Cada criatura em uma esfera de 9 metros de raio dentro do alcance enfrenta uma manifestação ilusória aterrorizante de seus piores medos; se falhar em um teste de resistência de Sabedoria, fica amedrontada e sofre 4d10 de dano psíquico no início de cada um dos próprios turnos enquanto a concentração for mantida, por até 1 minuto, podendo repetir o teste ao final de cada turno para encerrar o medo."
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
    "summary": "Transforma permanentemente, caso a concentração seja mantida por 1 hora completa, uma criatura ou objeto não mágico visível ao alcance em uma criatura ou objeto diferente; um alvo relutante pode fazer um teste de resistência de Sabedoria para negar o efeito. Enquanto transformada, a criatura usa o bloco de estatísticas da nova forma, mas conserva sua própria mente e personalidade."
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
    "summary": "Ergue uma muralha, cúpula ou esfera composta de sete camadas coloridas sobrepostas, cada uma com até 27 metros de comprimento e 9 metros de altura (ou 9 metros de raio, se em formato de cúpula ou esfera). Cada camada causa um efeito distinto a quem a atravessa — dano de um tipo específico, cegueira, paralisia ou até petrificação — e exige um método próprio para ser destruída, e a barreira toda permanece por 10 minutos ou até que todas as camadas sejam removidas."
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
    "summary": "Ao tocar em uma criatura, restaura todos os seus pontos de vida perdidos e encerra qualquer efeito de atordoamento, paralisia, medo ou enfeitiçamento sobre ela, colocando-a de pé caso esteja caída."
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
    "summary": "Uma única palavra mata instantaneamente uma criatura visível ao alcance, sem direito a teste de resistência, desde que ela tenha 100 pontos de vida ou menos no momento; caso contrário, a magia não produz efeito algum."
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
    "summary": "O tempo se congela para todas as outras criaturas e objetos por 1d4+1 turnos consecutivos, durante os quais o conjurador pode agir e se mover livremente. O efeito termina imediatamente se o conjurador se afastar mais de 300 metros do ponto onde conjurou a magia ou se qualquer ação sua afetar outra criatura ou um objeto que outra criatura esteja usando ou carregando."
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
    "summary": "Abre um portal circular de até 3 metros de diâmetro conectando um ponto próximo do conjurador a um local específico em outro plano de existência que ele conheça ou já tenha visitado. Ao pronunciar o verdadeiro nome de uma criatura específica, o conjurador pode convocá-la através do portal, ainda que ela possa resistir com um teste de resistência de Carisma; o portal permanece aberto enquanto a concentração for mantida, por até 1 minuto."
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
    "summary": "O conjurador e até oito criaturas dispostas projetam suas formas astrais para o Plano Astral, deixando seus corpos físicos incorpóreos e adormecidos em segurança; um cordão de prata liga cada forma astral ao seu corpo, e caso seja cortado, a criatura correspondente morre no plano material. O efeito dura até ser encerrado voluntariamente ou até que o cordão seja rompido."
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
    "summary": "Toca (ou apenas nomeia, caso não haja corpo) uma criatura morta há até 200 anos e a traz de volta à vida com pontos de vida máximos, curando qualquer doença, veneno, petrificação ou maldição, e restaurando partes do corpo perdidas — tudo isso mesmo que a alma esteja em outro plano, desde que não esteja retida contra sua vontade por outra criatura ou divindade."
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
    "summary": "Toca em uma criatura disposta, concedendo a ela por 8 horas a impossibilidade de ser surpreendida e vantagem em testes de ataque, testes de resistência e testes de habilidade, enquanto qualquer criatura que a ataque sofre desvantagem nesse ataque."
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
    "summary": "Invoca uma tempestade sombria centrada em um ponto visível, cobrindo uma área circular de 110 metros de raio; no instante em que é conjurada, trovões ensurdecem por 5 minutos as criaturas na área que falharem em um teste de resistência de Constituição. Em cada rodada seguinte, enquanto a concentração for mantida (até 1 minuto), o conjurador escolhe entre uma saraivada de granizo que causa dano contundente a todos na área, um raio que atinge um alvo específico causando 10d6 de dano elétrico (metade com sucesso em Destreza), chuva congelante que cobre o chão de gelo e pode derrubar criaturas, ou ventania forte que impõe desvantagem em ataques à distância e força criaturas voadoras a pousar."
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
