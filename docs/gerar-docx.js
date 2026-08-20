const {
  Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel,
  Footer, PageNumber, Table, TableRow, TableCell, WidthType, ShadingType,
  BorderStyle, VerticalAlign
} = require('docx');
const fs = require('fs');

const FONT = 'Times New Roman';
const LINE = 360;          // 1,5
const INDENT = 709;        // 1,25 cm
const MARGIN = 1417;       // 2,5 cm

// Parágrafo de corpo de texto: justificado, recuo de 1ª linha, entrelinhas 1,5
const p = (text, opts = {}) => new Paragraph({
  alignment: opts.align || AlignmentType.JUSTIFIED,
  spacing: { line: opts.line || LINE, after: opts.after === undefined ? 0 : opts.after },
  indent: opts.indent === null ? undefined : { firstLine: opts.indent === undefined ? INDENT : opts.indent },
  children: [new TextRun({ text, bold: !!opts.bold, italics: !!opts.italics, size: opts.size || 24, font: FONT })]
});

// Citação longa (recuo 4 cm, fonte 10, espaço simples)
const cit = (text) => new Paragraph({
  alignment: AlignmentType.JUSTIFIED,
  spacing: { line: 240, before: 240, after: 240 },
  indent: { left: 2268 },
  children: [new TextRun({ text, size: 20, font: FONT })]
});

// Alínea (a), b), c)...) com recuo
const ali = (text) => new Paragraph({
  alignment: AlignmentType.JUSTIFIED,
  spacing: { line: LINE, after: 0 },
  indent: { left: 709, hanging: 0, firstLine: 709 },
  children: [new TextRun({ text, size: 24, font: FONT })]
});

// Título de seção primária
const h1 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_1,
  alignment: AlignmentType.LEFT,
  spacing: { line: LINE, before: 480, after: 240 },
  children: [new TextRun({ text, bold: true, size: 24, font: FONT, color: '000000' })]
});

// Título de seção secundária
const h2 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_2,
  alignment: AlignmentType.LEFT,
  spacing: { line: LINE, before: 360, after: 180 },
  children: [new TextRun({ text, bold: true, size: 24, font: FONT, color: '000000' })]
});

const vazio = () => new Paragraph({ spacing: { line: LINE }, children: [new TextRun({ text: '', size: 24, font: FONT })] });

// Referência (alinhada à esquerda, espaço simples, separadas por linha em branco)
const ref = (text) => new Paragraph({
  alignment: AlignmentType.LEFT,
  spacing: { line: 240, after: 240 },
  children: [new TextRun({ text, size: 24, font: FONT })]
});

const legenda = (text) => new Paragraph({
  alignment: AlignmentType.LEFT,
  spacing: { line: 240, before: 240, after: 120 },
  children: [new TextRun({ text, size: 20, font: FONT })]
});

const fonteTab = (text) => new Paragraph({
  alignment: AlignmentType.LEFT,
  spacing: { line: 240, before: 120, after: 240 },
  children: [new TextRun({ text, size: 20, font: FONT })]
});

const cel = (text, width, bold) => new TableCell({
  width: { size: width, type: WidthType.DXA },
  verticalAlign: VerticalAlign.CENTER,
  shading: bold ? { type: ShadingType.CLEAR, fill: 'D9D9D9', color: 'auto' } : undefined,
  margins: { top: 60, bottom: 60, left: 100, right: 100 },
  children: [new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { line: 240 },
    children: [new TextRun({ text, size: 20, font: FONT, bold: !!bold })]
  })]
});

const linha = (cells) => new TableRow({ children: cells });

// ---------------------------------------------------------------- TABELA 1
const W1 = [900, 2200, 5970];
const tabela1 = new Table({
  columnWidths: W1,
  width: { size: 9070, type: WidthType.DXA },
  rows: [
    linha([cel('Grau', W1[0], true), cel('Denominação', W1[1], true), cel('Caracterização e exemplos típicos', W1[2], true)]),
    linha([cel('1', W1[0]), cel('Alto risco', W1[1]), cel('Evento com ameaça concreta à vida, sem sofisticação de meios: tentativa de suicídio, indivíduo barricado sem reféns, roubo frustrado com vítima detida no local.', W1[2])]),
    linha([cel('2', W1[0]), cel('Altíssimo risco', W1[1]), cel('Presença de reféns localizados, causador armado e com disposição de resistir; exige negociação estruturada e grupo tático em prontidão.', W1[2])]),
    linha([cel('3', W1[0]), cel('Ameaça extraordinária', W1[1]), cel('Motivação política, ideológica ou terrorista; múltiplos causadores; artefatos explosivos; alvos simbólicos ou autoridades.', W1[2])]),
    linha([cel('4', W1[0]), cel('Ameaça exótica', W1[1]), cel('Emprego ou ameaça de emprego de agentes químicos, biológicos ou radiológicos; sabotagem de infraestrutura crítica.', W1[2])]),
    linha([cel('5', W1[0]), cel('Ameaça limite', W1[1]), cel('Ameaça de emprego de artefato nuclear ou de evento com potencial de dano catastrófico e irreversível.', W1[2])])
  ]
});

// ---------------------------------------------------------------- TABELA 2
const W2 = [2400, 6670];
const tabela2 = new Table({
  columnWidths: W2,
  width: { size: 9070, type: WidthType.DXA },
  rows: [
    linha([cel('Alternativa tática', W2[0], true), cel('Características, requisitos e riscos', W2[1], true)]),
    linha([cel('Negociação', W2[0]), cel('Alternativa preferencial e permanente. Baixo risco para todos os envolvidos, custo operacional reduzido e reversibilidade integral. Acompanha todas as demais alternativas, jamais sendo por elas substituída de forma definitiva.', W2[1])]),
    linha([cel('Emprego de técnicas e instrumentos de menor potencial ofensivo', W2[0]), cel('Uso de agentes químicos, munições de impacto controlado, dispositivos de incapacitação neuromuscular e recursos de distração. Exige treinamento certificado, avaliação de risco à saúde de reféns e terceiros e observância da Lei nº 13.060/2014.', W2[1])]),
    linha([cel('Tiro de comprometimento', W2[0]), cel('Disparo de precisão executado por atirador de elite, mediante autorização expressa do gerente da crise, quando presente risco atual ou iminente à vida da vítima. Requer posição consolidada, identificação inequívoca do alvo e leitura precisa do ambiente.', W2[1])]),
    linha([cel('Invasão tática', W2[0]), cel('Alternativa de maior risco e de menor reversibilidade. Somente se justifica quando as demais se mostrarem inviáveis ou insuficientes, exigindo planejamento, ensaio em maquete ou instalação similar e apoio de saúde previamente posicionado.', W2[1])])
  ]
});

// ---------------------------------------------------------------- CONTEÚDO
const children = [];

// Identificação
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { line: LINE, after: 120 },
  children: [new TextRun({ text: 'POLÍCIA MILITAR DO DISTRITO FEDERAL', bold: true, size: 24, font: FONT })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { line: LINE, after: 480 },
  children: [new TextRun({ text: 'DEPARTAMENTO DE EDUCAÇÃO E CULTURA', size: 24, font: FONT })] }));

// TÍTULO
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { line: LINE, after: 120 },
  children: [new TextRun({ text: 'GERENCIAMENTO DE CRISES NA POLÍCIA MILITAR DO DISTRITO FEDERAL:', bold: true, size: 24, font: FONT })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { line: LINE, after: 480 },
  children: [new TextRun({ text: 'fundamentos doutrinários, marco normativo e aplicação operacional', size: 24, font: FONT })] }));

// RESUMO
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { line: LINE, after: 240 },
  children: [new TextRun({ text: 'RESUMO', bold: true, size: 24, font: FONT })] }));

children.push(new Paragraph({
  alignment: AlignmentType.JUSTIFIED, spacing: { line: 240, after: 240 }, indent: null,
  children: [new TextRun({ size: 24, font: FONT, text:
'O presente trabalho examina o gerenciamento de crises como campo doutrinário, normativo e operacional da atividade de polícia ostensiva e de preservação da ordem pública, com ênfase na realidade da Polícia Militar do Distrito Federal. Adota-se o conceito consagrado pela doutrina norte-americana e incorporado ao Brasil por intermédio da Academia Nacional de Polícia e da Secretaria Nacional de Segurança Pública, segundo o qual crise é o evento ou situação crucial que exige da polícia uma resposta especial, a fim de assegurar solução aceitável. A metodologia empregada é a pesquisa bibliográfica e documental, com análise do material de apoio do curso, da legislação federal e distrital pertinente, dos atos normativos que disciplinam o uso diferenciado da força e de precedentes do Supremo Tribunal Federal e da Corte Interamericana de Direitos Humanos. O desenvolvimento percorre as características essenciais do evento crítico, os objetivos e os critérios de ação do gerenciamento, a estruturação do teatro de operações, as fases do processo decisório, a graduação do risco, as alternativas táticas disponíveis e as técnicas de negociação, articulando cada elemento com o regime jurídico do uso da força. Em seguida, a matéria é contextualizada com a atividade operacional e administrativa da Corporação, considerando as particularidades do Distrito Federal, sede dos Poderes da República e território de intensa densidade institucional. Conclui-se que a qualidade da resposta da Polícia Militar do Distrito Federal a eventos críticos depende menos da atuação heroica isolada do que da institucionalização de doutrina, do adestramento continuado, da interoperabilidade entre órgãos e da submissão permanente da decisão tática aos parâmetros de legalidade, necessidade, proporcionalidade e responsabilização.' })]
}));

children.push(new Paragraph({
  alignment: AlignmentType.JUSTIFIED, spacing: { line: 240, after: 240 }, indent: null,
  children: [
    new TextRun({ text: 'Palavras-chave: ', bold: true, size: 24, font: FONT }),
    new TextRun({ text: 'Gerenciamento de crises. Negociação policial. Uso diferenciado da força. Polícia Militar do Distrito Federal. Direitos humanos.', size: 24, font: FONT })
  ]
}));

// 1 INTRODUÇÃO
children.push(h1('1 INTRODUÇÃO'));
[
'A atividade policial-militar é, por natureza, marcada pela imprevisibilidade. Entre as ocorrências que compõem a rotina operacional, contudo, existe uma categoria que se distingue de todas as demais tanto pela gravidade quanto pela impossibilidade de solução por meio dos procedimentos ordinários de policiamento: os eventos críticos. Uma tentativa de suicídio em plataforma de metrô, um assaltante encurralado que mantém clientes de uma agência bancária sob a mira de arma de fogo, um pai que se barrica com os filhos após episódio de violência doméstica, um artefato explosivo abandonado nas proximidades de repartição pública ou uma rebelião em unidade de internação socioeducativa são situações que, embora distintas em sua fenomenologia, compartilham um traço comum: exigem da instituição policial uma postura organizacional que não é a habitual.',
'É precisamente para esse conjunto de situações que se desenvolveu, ao longo das últimas cinco décadas, um corpo doutrinário autônomo, conhecido como gerenciamento de crises. Trata-se de disciplina que sistematiza o processo decisório policial diante de eventos que ameaçam a vida, comprimem o tempo disponível para a deliberação e expõem a corporação ao escrutínio imediato da sociedade, dos órgãos de controle e dos meios de comunicação. Sua premissa fundamental é a de que a improvisação, nesses cenários, tende a produzir resultados trágicos, ao passo que a resposta protocolada, treinada e juridicamente balizada amplia significativamente a probabilidade de preservação da vida.',
'A Polícia Militar do Distrito Federal ocupa posição singular nesse contexto. Além de exercer, nos termos do artigo 144, § 5º, da Constituição Federal, a polícia ostensiva e a preservação da ordem pública em todo o território do Distrito Federal, a Corporação atua em uma unidade federativa que concentra a sede dos três Poderes da República, o corpo diplomático acreditado no País, órgãos de cúpula do Sistema de Justiça, infraestruturas críticas de âmbito nacional e um calendário permanente de manifestações e de grandes eventos. A probabilidade de ocorrência de eventos críticos de elevada complexidade e de repercussão nacional é, portanto, estruturalmente maior do que em outras unidades da Federação, o que impõe à Instituição um padrão de preparação igualmente elevado.',
'O objetivo geral deste trabalho é sistematizar os fundamentos do gerenciamento de crises apresentados na palestra sobre o tema e demonstrar sua aplicabilidade à atividade operacional e administrativa da Polícia Militar do Distrito Federal. Como objetivos específicos, pretende-se: apresentar a origem, o conceito e as características essenciais da crise; identificar o marco normativo que condiciona a atuação policial em eventos críticos, com destaque para o uso diferenciado da força; descrever a estrutura do teatro de operações, as fases do processo de gerenciamento, a graduação do risco e as alternativas táticas; analisar a negociação como alternativa preferencial; examinar as balizas jurisprudenciais e os mecanismos de controle da atuação policial; e, por fim, contextualizar a matéria com a realidade distrital, a partir de casos concretos e dos desafios contemporâneos da atividade.',
'A metodologia adotada é a pesquisa bibliográfica e documental, de natureza qualitativa e finalidade aplicada. Foram consultados o material de apoio do curso, a literatura nacional e estrangeira sobre gerenciamento de crises e negociação, a legislação constitucional, penal e processual penal, os atos normativos federais e internacionais que disciplinam o uso da força por agentes de segurança pública e a jurisprudência mais recente do Supremo Tribunal Federal e da Corte Interamericana de Direitos Humanos sobre letalidade policial e protocolos de operação.',
'O trabalho estrutura-se em nove seções. Após esta introdução, a segunda seção apresenta o referencial doutrinário; a terceira, o marco normativo do uso da força; a quarta, a organização da resposta e o processo decisório; a quinta, a negociação; a sexta, o controle e a jurisprudência; a sétima, a contextualização com a atividade da Corporação; a oitava, os desafios contemporâneos; e a nona apresenta as considerações finais.'
].forEach(t => children.push(p(t)));

// 2
children.push(h1('2 REFERENCIAL DOUTRINÁRIO DO GERENCIAMENTO DE CRISES'));
children.push(h2('2.1 Origem e evolução da doutrina'));
[
'A doutrina do gerenciamento de crises é resposta institucional a fracassos históricos. O episódio fundador é o massacre ocorrido durante os Jogos Olímpicos de Munique, em setembro de 1972, quando membros da organização Setembro Negro tomaram atletas israelenses como reféns na Vila Olímpica. A tentativa de resgate conduzida na base aérea de Fürstenfeldbruck, sem coordenação adequada, sem atiradores em número e posição suficientes e sem qualquer estratégia de negociação previamente estabelecida, resultou na morte de todos os reféns. Somado ao motim da penitenciária de Attica, no estado de Nova Iorque, em 1971, o episódio evidenciou que a resposta puramente tática, desprovida de planejamento e de canal de comunicação com os causadores, tendia a maximizar a letalidade em vez de reduzi-la.',
'A partir desse diagnóstico, o Departamento de Polícia de Nova Iorque estruturou, ainda em 1973, a primeira equipe policial de negociação de reféns, iniciativa em seguida absorvida e sistematizada pelo Federal Bureau of Investigation em sua unidade de pesquisa e operações especiais, na Academia de Quantico. Consolidou-se, então, o modelo que associa três componentes indissociáveis: o comando da crise, o grupo tático e a equipe de negociação, articulados em um mesmo teatro de operações sob direção única. Nas décadas seguintes, a doutrina migrou do enfoque exclusivo em terrorismo para a gestão de todo evento crítico, incorporando contribuições da psicologia da comunicação, da administração de emergências e da gestão de riscos.',
'No Brasil, a difusão da matéria deu-se principalmente por intermédio da Academia Nacional de Polícia e, posteriormente, da Secretaria Nacional de Segurança Pública, que incluiu o gerenciamento de crises entre os conteúdos da Matriz Curricular Nacional para as ações formativas dos profissionais da área de segurança pública. As polícias militares estaduais e distrital, por sua vez, criaram e consolidaram unidades especializadas — batalhões e grupamentos de operações especiais, grupos de ações táticas e equipes de negociação —, responsáveis por materializar a doutrina no plano operacional.'
].forEach(t => children.push(p(t)));

children.push(h2('2.2 Conceito e características essenciais da crise'));
[
'O conceito operacional adotado pela doutrina brasileira, de matriz norte-americana, define crise como o evento ou a situação crucial que exige uma resposta especial da polícia, a fim de assegurar uma solução aceitável. Cada elemento do conceito possui densidade técnica. O caráter "crucial" indica que o evento se situa em ponto de inflexão, em que a decisão adotada determinará desfecho favorável ou trágico. A "resposta especial" afasta a suficiência dos procedimentos rotineiros e convoca meios, pessoal e processos decisórios diferenciados. A "solução aceitável", por fim, é aquela que atende cumulativamente a três critérios, adiante detalhados.',
'A doutrina identifica quatro características essenciais, cuja presença simultânea permite classificar o evento como crise. A primeira é a imprevisibilidade: a crise não é agendada, irrompe sem aviso e frustra a rotina. A segunda é a compressão do tempo, ou urgência: o gerente da crise decide sob pressão temporal, frequentemente sem dispor de informações completas. A terceira é a ameaça à vida, elemento que confere ao evento sua gravidade específica e que orienta toda a hierarquia de prioridades da resposta. A quarta característica é a necessidade de postura organizacional não rotineira, desdobrada em três exigências: a de um planejamento analítico especial, a de uma organização específica para o evento e a de capacidade concreta de implementação das medidas planejadas.',
'Da conjugação dessas características extrai-se importante consequência prática: nem toda ocorrência grave é uma crise, e nem toda crise se resolve com emprego de força. Ocorrências de elevada gravidade que se esgotam na intervenção imediata da guarnição — como um roubo em andamento interrompido pela chegada da viatura, sem retenção de vítimas — não configuram evento crítico em sentido técnico. A distinção é relevante porque a classificação equivocada conduz ao acionamento desproporcional de meios ou, o que é mais grave, à improvisação em cenário que exigiria protocolo especializado.'
].forEach(t => children.push(p(t)));

children.push(h2('2.3 Objetivos e critérios de ação'));
[
'O gerenciamento de crises persegue dois objetivos, dispostos em ordem de precedência inequívoca: preservar vidas e aplicar a lei. A prioridade da preservação da vida não é retórica humanitária, mas critério decisório concreto: diante de conflito entre a captura imediata do causador e a integridade dos reféns, dos policiais ou de terceiros, prevalece a integridade física. Dentro do próprio objetivo primário, a doutrina estabelece escala de prioridades que situa, em ordem, os reféns e terceiros inocentes, os policiais empregados e, por fim, o próprio causador do evento — que também é titular do direito à vida e cuja rendição incólume constitui o desfecho ideal.',
'Toda decisão tomada no teatro de operações deve, ainda, submeter-se a três critérios de ação. O primeiro é a necessidade: a medida somente se justifica se indispensável, inexistindo alternativa menos gravosa apta a produzir o mesmo resultado. O segundo é a validade do risco: o risco assumido deve guardar proporção com o benefício esperado, sendo inadmissível expor reféns e policiais a perigo superior àquele que se pretende evitar. O terceiro é a aceitabilidade, que se decompõe em três dimensões — a legalidade, isto é, a conformidade da medida ao ordenamento jurídico; a eticidade, ou sua compatibilidade com os valores da Corporação e com os direitos humanos; e a tecnicidade, entendida como a adequação da medida aos padrões profissionais e à capacidade real dos meios empregados.',
'Esses critérios funcionam como filtro permanente e cumulativo. Uma invasão tática tecnicamente exequível, mas desnecessária porque a negociação avançava, é inaceitável; do mesmo modo, um disparo juridicamente amparado, porém executado sem posição consolidada e com risco concreto de atingir a vítima, viola o critério da tecnicidade e, por consequência, o da validade do risco. A observância desses filtros é o que distingue a decisão profissional da aposta.'
].forEach(t => children.push(p(t)));

// 3
children.push(h1('3 MARCO NORMATIVO E O USO DIFERENCIADO DA FORÇA'));
children.push(h2('3.1 Fundamento constitucional e legal da atuação da PMDF'));
[
'A competência da Polícia Militar do Distrito Federal decorre do artigo 144, § 5º, da Constituição Federal, que atribui às polícias militares a polícia ostensiva e a preservação da ordem pública. A Corporação submete-se a regime jurídico peculiar: nos termos do artigo 21, inciso XIV, da Constituição, compete à União organizar e manter a Polícia Militar do Distrito Federal, ao passo que sua utilização é assegurada ao Distrito Federal, na forma do artigo 32, § 4º. No plano infraconstitucional, destacam-se a Lei nº 6.450, de 14 de outubro de 1977, que dispõe sobre a organização básica da Corporação; a Lei nº 7.289, de 18 de dezembro de 1984, que institui o Estatuto dos Policiais-Militares; a Lei nº 12.086, de 6 de novembro de 2009, que trata dos militares da PMDF e do CBMDF; e o Decreto nº 88.777, de 30 de setembro de 1983, que aprova o Regulamento para as Polícias Militares e Corpos de Bombeiros Militares.',
'A atuação em eventos críticos insere-se, ainda, na lógica de integração instituída pela Lei nº 13.675, de 11 de junho de 2018, que disciplina o Sistema Único de Segurança Pública e a Política Nacional de Segurança Pública e Defesa Social. O diploma consagra a integração operacional, a interoperabilidade dos sistemas e a atuação conjunta como diretrizes vinculantes, o que se revela especialmente relevante em crises, cuja resolução dificilmente prescinde da participação simultânea de polícias, corpo de bombeiros, serviços de saúde, defesa civil e, conforme o caso, de órgãos federais.'
].forEach(t => children.push(p(t)));

children.push(h2('3.2 O regime jurídico do uso da força'));
[
'O uso da força em crises é regido por normas de diferentes hierarquias e origens, que convergem para um mesmo núcleo axiológico. No plano internacional, o Código de Conduta para os Funcionários Responsáveis pela Aplicação da Lei, adotado pela Assembleia Geral das Nações Unidas por meio da Resolução nº 34/169, de 1979, estabelece que a força somente pode ser empregada quando estritamente necessária e na medida exigida pelo cumprimento do dever. Os Princípios Básicos sobre o Uso da Força e Armas de Fogo pelos Funcionários Responsáveis pela Aplicação da Lei, aprovados no Oitavo Congresso das Nações Unidas realizado em Havana, em 1990, detalham essa diretriz ao exigir o desenvolvimento de meios diferenciados, o esgotamento de alternativas não violentas e a admissão do uso intencionalmente letal de armas de fogo apenas quando estritamente inevitável para proteger a vida.',
'No plano interno, a Portaria Interministerial nº 4.226, de 31 de dezembro de 2010, editada pela Secretaria de Direitos Humanos da Presidência da República e pelo Ministério da Justiça, estabelece diretrizes sobre o uso da força e armas de fogo pelos agentes de segurança pública, prevendo a obrigatoriedade de capacitação periódica, de registro e comunicação dos eventos com emprego de força, de assistência às vítimas e de disponibilização de instrumentos de menor potencial ofensivo. A Lei nº 13.060, de 22 de dezembro de 2014, por sua vez, disciplina o uso desses instrumentos, vedando o disparo de arma de fogo contra pessoa, salvo em legítima defesa própria ou de terceiro contra perigo iminente de morte ou lesão grave, e determinando a observância dos princípios da legalidade, necessidade, razoabilidade e proporcionalidade.',
'Esse conjunto normativo é traduzido, na prática policial, pelo modelo do uso diferenciado da força, que escalona a resposta desde a mera presença ostensiva e a verbalização, passando pelo controle de contato, pelas técnicas de submissão e pelos instrumentos de menor potencial ofensivo, até chegar, como último recurso, à força potencialmente letal. Em gerenciamento de crises, esse escalonamento não é sequência rígida, mas referencial dinâmico: a resposta deve ser proporcional ao nível de resistência e de ameaça verificado no momento, admitindo progressão e, sobretudo, regressão imediata assim que cessada a agressão.'
].forEach(t => children.push(p(t)));

children.push(h2('3.3 Excludentes de ilicitude e a proteção do policial que atua em crise'));
[
'A intervenção tática que resulta em lesão ou morte do causador deve ser analisada à luz das excludentes de ilicitude previstas nos artigos 23 a 25 do Código Penal, notadamente a legítima defesa de terceiro e o estrito cumprimento de dever legal. A Lei nº 13.964, de 24 de dezembro de 2019, acrescentou ao artigo 25 do Código Penal parágrafo único de particular relevância para a matéria, ao dispor que, observados os requisitos do caput, também se considera em legítima defesa o agente de segurança pública que repele agressão ou risco de agressão a vítima mantida refém durante a prática de crimes.',
'O dispositivo confere assento legal expresso ao tiro de comprometimento e à invasão tática destinada a salvar vida de refém, mas não dispensa a verificação concreta dos requisitos da legítima defesa: atualidade ou iminência da agressão, injustiça da agressão, uso moderado dos meios necessários e conhecimento da situação justificante. Não se trata, portanto, de autorização genérica para o uso letal da força, e sim de reconhecimento normativo de uma situação fática que a doutrina de crises já disciplinava tecnicamente. A mesma Lei nº 13.964/2019 alterou o artigo 292 do Código de Processo Penal para exigir que o emprego de força seja o indispensável e proporcional à resistência, vedando expressamente o uso de algemas e de força em desconformidade com a lei.',
'Complementa o quadro a Lei nº 13.869, de 5 de setembro de 2019, que define os crimes de abuso de autoridade e exige, para a configuração dos tipos nela previstos, a finalidade específica de prejudicar outrem, beneficiar a si mesmo ou a terceiro, ou o mero capricho ou satisfação pessoal. O diploma reforça que a atuação técnica, documentada e submetida a protocolo não apenas é juridicamente exigível, como constitui a mais sólida garantia do policial-militar diante de eventual responsabilização penal, civil ou administrativa.'
].forEach(t => children.push(p(t)));

// 4
children.push(h1('4 A ORGANIZAÇÃO DA RESPOSTA: TEATRO DE OPERAÇÕES E PROCESSO DECISÓRIO'));
children.push(h2('4.1 Primeiras providências: conter, isolar e negociar'));
[
'A doutrina consolidou a máxima segundo a qual as primeiras providências de quem chega ao local de um evento crítico consistem em conter, isolar e iniciar contato com o causador. Contendo-se o evento, impede-se sua expansão territorial e a produção de novas vítimas; isolando-se a área, estabelece-se o controle sobre quem entra e sai, preserva-se o local para a futura perícia e protege-se a população; iniciando-se o contato, ganha-se tempo, reduz-se a tensão e abre-se o canal por onde transitará toda a solução negociada.',
'A qualidade dessa primeira intervenção condiciona todo o desenrolar do evento. Erros cometidos nos minutos iniciais — aproximação excessiva da guarnição, disparos de advertência, permanência de curiosos e de jornalistas no perímetro, ausência de comunicação à central de operações — dificilmente são corrigidos nas fases seguintes. Daí a importância de que o gerenciamento de crises não seja tratado como conhecimento exclusivo das unidades especializadas: o primeiro interventor é, quase sempre, o policial-militar do policiamento ordinário, e é dele que depende a preservação das condições para a atuação subsequente da tropa especializada.',
'Merece registro a exceção doutrinária representada pelo evento de ameaça ativa, popularmente designado atirador ativo. Quando o agressor está em movimento, produzindo vítimas de forma contínua e sem qualquer intenção negocial ou de retenção de reféns, a resposta correta inverte a lógica clássica: em vez de isolar e aguardar, impõe-se a intervenção imediata dos primeiros policiais presentes, com o objetivo de cessar a produção de vítimas. Trata-se de distinção crítica, cujo domínio deve integrar o adestramento de toda a tropa.'
].forEach(t => children.push(p(t)));

children.push(h2('4.2 O teatro de operações e seus perímetros'));
[
'Denomina-se teatro de operações a área física em que se desenvolve o evento crítico e sobre a qual o comando policial exerce controle. Sua estruturação obedece a lógica de perímetros concêntricos. O perímetro tático interno, ou área crítica, corresponde ao espaço de risco imediato, no qual somente ingressa pessoal do grupo tático, mediante autorização expressa. O perímetro tático externo, ou área de segurança, envolve o primeiro e abriga o posto de comando, a equipe de negociação, o apoio de saúde, a reserva tática e os meios logísticos. Além dele, situa-se a área destinada ao tráfego, à imprensa e ao público, cujo controle é indispensável tanto à segurança quanto à gestão da informação.',
'A direção do teatro de operações compete ao gerente da crise, autoridade policial responsável pelas decisões estratégicas e pela autorização das alternativas táticas. É princípio doutrinário fundamental que o gerente não se envolva na execução direta das ações nem conduza pessoalmente a negociação: sua função é decidir com base nas informações que lhe são fornecidas pelos diversos componentes, preservando a visão de conjunto. Do posto de comando participam, ainda, o comandante do grupo tático, o coordenador dos negociadores, a inteligência policial, a comunicação social, o apoio de saúde e representantes dos demais órgãos envolvidos.',
'Essa arquitetura guarda evidente correspondência com o Sistema de Comando de Incidentes, adotado no Brasil no âmbito da proteção e defesa civil por força da Lei nº 12.608, de 10 de abril de 2012, e difundido pela Secretaria Nacional de Segurança Pública. A convergência entre os dois modelos — comando único, funções especializadas, cadeia de informação definida e escalabilidade conforme a complexidade do evento — favorece a interoperabilidade entre a Polícia Militar do Distrito Federal, o Corpo de Bombeiros Militar, os serviços de saúde e a defesa civil distrital.'
].forEach(t => children.push(p(t)));

children.push(h2('4.3 Fases do processo de gerenciamento'));
[
'O processo de gerenciamento de crises desenvolve-se em fases sucessivas e interdependentes. Em perspectiva ampliada, distinguem-se três momentos: a pré-confrontação, a confrontação e a pós-confrontação. A fase de pré-confrontação abrange tudo o que antecede o evento: seleção e capacitação de pessoal, aquisição e manutenção de equipamentos, elaboração de procedimentos operacionais padrão, levantamento de dados sobre alvos prováveis, planos de contingência, exercícios simulados e articulação prévia com os demais órgãos. É a fase decisiva, embora invisível: nenhuma crise é bem gerenciada por instituição que não se preparou antes dela.',
'A fase de confrontação compreende o evento propriamente dito e desdobra-se, no plano do processo decisório, em quatro etapas. A primeira é a confrontação inicial, em que se aplicam as providências de conter, isolar e iniciar contato. A segunda é o planejamento específico, em que se coletam informações sobre o local, o causador, as vítimas e o armamento, elaboram-se croquis, definem-se hipóteses e preparam-se as alternativas táticas, inclusive as de emprego emergencial. A terceira é a execução da alternativa tática eleita. A quarta é a resolução do evento, com a rendição ou neutralização do causador e a libertação das vítimas.',
'A fase de pós-confrontação, frequentemente negligenciada, envolve o resgate e o atendimento das vítimas, a preservação do local e o acionamento da perícia, a condução do preso, a comunicação formal ao Ministério Público e aos órgãos de controle, o acolhimento psicológico dos policiais e das vítimas, a elaboração de relatórios e, sobretudo, o debriefing operacional. É desta última atividade que decorre o aprendizado institucional: sem análise crítica estruturada do evento, a experiência permanece individual e a organização repete os mesmos erros.'
].forEach(t => children.push(p(t)));

children.push(h2('4.4 A graduação do risco'));
children.push(p('A doutrina classifica os eventos críticos segundo graus crescentes de risco, escala que orienta o nível de acionamento, a composição dos meios e o eventual envolvimento de outras instituições. O Quadro 1 sintetiza essa graduação.'));
children.push(legenda('Quadro 1 – Graus de risco dos eventos críticos'));
children.push(tabela1);
children.push(fonteTab('Fonte: elaborado pelo autor com base no material de apoio do curso e na doutrina nacional de gerenciamento de crises.'));
children.push(p('A classificação não é mero exercício acadêmico. Dela decorrem consequências operacionais imediatas: a partir do terceiro grau, a resolução do evento tende a exigir articulação com órgãos federais, ativação de gabinete de gestão integrada e assessoramento jurídico permanente. No Distrito Federal, essa hipótese é mais provável do que em qualquer outra unidade da Federação, dada a presença de alvos simbólicos de significado nacional.'));

children.push(h2('4.5 As alternativas táticas'));
children.push(p('Definido o quadro, o gerente da crise dispõe de quatro alternativas táticas, ordenadas segundo o risco crescente que representam para a vida das pessoas envolvidas. O Quadro 2 apresenta suas características.'));
children.push(legenda('Quadro 2 – Alternativas táticas em ordem crescente de risco'));
children.push(tabela2);
children.push(fonteTab('Fonte: elaborado pelo autor com base no material de apoio do curso e na legislação de regência.'));
[
'Duas advertências doutrinárias são indispensáveis. A primeira é que a progressão entre as alternativas não é automática nem irreversível: a negociação permanece ativa mesmo durante a preparação de uma invasão, e o simples avanço da negociação pode determinar o recuo da opção tática. A segunda é que toda alternativa deve contar com plano de emprego emergencial, isto é, com a possibilidade de execução imediata caso o causador inicie a execução de reféns antes de concluído o planejamento. A ausência desse plano converte a espera em omissão.'
].forEach(t => children.push(p(t)));

// 5
children.push(h1('5 A NEGOCIAÇÃO COMO ALTERNATIVA TÁTICA PREFERENCIAL'));
[
'A negociação é a alternativa tática de menor risco e de maior taxa de sucesso documentada. Seu propósito imediato não é convencer o causador a se render de pronto, mas gerenciar o tempo e a emoção. A passagem do tempo produz efeitos objetivos favoráveis: reduz o nível de excitação fisiológica do causador, permite a coleta de informações e a consolidação de posições táticas, favorece o surgimento de vínculos entre causador e vítimas e amplia o desgaste natural da resistência. Por isso, afirma-se que o tempo trabalha a favor da polícia — desde que empregado deliberadamente.',
'A literatura especializada consolidou o modelo da escada de mudança comportamental, proposto por Vecchi, Van Hasselt e Romano (2005), segundo o qual a influência sobre o comportamento do causador pressupõe a superação sucessiva de degraus: escuta ativa, empatia demonstrada, construção de vínculo de confiança, influência e, somente então, mudança de comportamento. A tentativa de saltar degraus — exigir a rendição antes de estabelecer vínculo — é a causa mais frequente de fracasso na negociação. Noesner (2010), a partir de sua experiência à frente da unidade de negociação do Federal Bureau of Investigation, sublinha que a escuta ativa não é técnica de manipulação, mas instrumento de redução genuína da tensão.',
'A negociação policial obedece a parâmetros próprios. O negociador não é o decisor, o que lhe permite invocar autoridade superior para ganhar tempo e recusar pedidos sem romper o vínculo. A comunicação deve evitar promessas impossíveis, negativas categóricas e o emprego de termos que reforcem a identidade criminosa do causador. Estabelecem-se, ademais, itens inegociáveis, cuja concessão é vedada por criar risco adicional ou por transferir poder ao causador: armas, munições, explosivos, substâncias entorpecentes, troca de reféns por policiais ou por autoridades, liberdade de deslocamento do causador com refém e fornecimento de meios de fuga.',
'Merece destaque, no cenário contemporâneo, o crescimento das ocorrências envolvendo pessoas em sofrimento psíquico ou em risco de autoextermínio, que hoje representam parcela significativa das crises atendidas pelas polícias militares. Nesses casos, o causador não é, tecnicamente, um criminoso, e a intervenção deve articular-se com a rede de atenção psicossocial, à luz da Lei nº 10.216, de 6 de abril de 2001, que dispõe sobre a proteção e os direitos das pessoas portadoras de transtornos mentais. A resposta adequada exige do policial repertório de comunicação terapêutica e conhecimento dos fluxos de encaminhamento, e não apenas técnica tática.'
].forEach(t => children.push(p(t)));

// 6
children.push(h1('6 CONTROLE, JURISPRUDÊNCIA E RESPONSABILIZAÇÃO'));
[
'A atuação policial em eventos críticos submete-se a intenso controle jurisdicional e internacional, cuja evolução recente redesenhou o padrão de exigência quanto a planejamento, documentação e transparência das operações. Na jurisdição interamericana, a sentença proferida pela Corte Interamericana de Direitos Humanos no Caso Favela Nova Brasília versus Brasil, em 16 de fevereiro de 2017, condenou o Estado brasileiro por violação dos direitos às garantias judiciais e à proteção judicial, fixando obrigações relativas à investigação independente de mortes decorrentes de intervenção policial e à adoção de protocolos de uso da força compatíveis com os padrões internacionais.',
'No plano interno, a Arguição de Descumprimento de Preceito Fundamental nº 635, relatada pelo Ministro Edson Fachin no Supremo Tribunal Federal, tornou-se o principal marco jurisprudencial sobre letalidade policial. Ao longo de sucessivas decisões cautelares e do julgamento de mérito concluído em 2025, a Corte firmou obrigações que ultrapassam o caso concreto do Estado do Rio de Janeiro e projetam-se como parâmetro nacional: elaboração de protocolos de uso da força, planejamento prévio e registro das operações, emprego de câmeras corporais e de sistemas de gravação audiovisual, presença de ambulâncias e de equipes de saúde em operações programadas, preservação do local e realização de perícia independente, comunicação imediata ao Ministério Público e restrições ao uso de aeronaves como plataforma de tiro.',
'A jurisprudência do Supremo Tribunal Federal também consolidou o entendimento sobre a responsabilidade civil do Estado em situações de custódia. No julgamento do Recurso Extraordinário nº 841.526, submetido à sistemática da repercussão geral, a Corte fixou tese segundo a qual, em razão do dever específico de proteção que decorre do artigo 5º, inciso XLIX, da Constituição, responde o Estado objetivamente pela morte de pessoa sob sua custódia. O raciocínio é transponível, com as devidas adaptações, para as vítimas que se encontram sob a esfera de proteção direta da autoridade policial durante o gerenciamento de um evento crítico.',
'A síntese desses precedentes é clara: a legalidade da ação policial já não se afere exclusivamente pelo resultado, mas pela demonstração documentada de que a decisão foi precedida de planejamento, submetida a critérios técnicos e registrada de forma auditável. Para a Polícia Militar do Distrito Federal, isso significa que o relatório de ocorrência, o registro audiovisual, o croqui do teatro de operações, o registro das tratativas negociais e a ata de decisão do gerente da crise deixam de ser formalidades burocráticas para se tornarem instrumentos de proteção institucional e individual.'
].forEach(t => children.push(p(t)));

// 7
children.push(h1('7 CONTEXTUALIZAÇÃO COM A ATIVIDADE OPERACIONAL E ADMINISTRATIVA DA PMDF'));
children.push(h2('7.1 Particularidades do Distrito Federal'));
[
'O Distrito Federal apresenta configuração urbana e institucional sem paralelo no País. Concentra a Praça dos Três Poderes, a Esplanada dos Ministérios, o Setor de Embaixadas, os tribunais superiores, o Aeroporto Internacional de Brasília, complexos penitenciários e unidades de internação socioeducativa, além de infraestruturas críticas de energia, telecomunicações e abastecimento de água. Soma-se a esse quadro um calendário permanente de manifestações, marchas e mobilizações de alcance nacional, muitas delas com deslocamento de grandes contingentes vindos de outras unidades da Federação.',
'Desse perfil decorrem consequências diretas para o gerenciamento de crises na Corporação. A primeira é a elevada probabilidade de eventos classificados nos graus superiores da escala de risco, com motivação política ou ideológica e repercussão nacional imediata. A segunda é a necessidade estrutural de coordenação interinstitucional, envolvendo a Secretaria de Estado de Segurança Pública do Distrito Federal, a Polícia Civil, o Corpo de Bombeiros Militar, a Polícia Federal, a Polícia Rodoviária Federal, as polícias legislativas das Casas do Congresso Nacional, a segurança institucional dos tribunais e o Gabinete de Segurança Institucional da Presidência da República. A terceira é a exposição midiática permanente, que transforma cada decisão tática em objeto de avaliação pública em tempo real.',
'A Corporação dispõe, para essa missão, de capacidades especializadas relevantes, entre as quais se destacam o Batalhão de Operações Policiais Especiais, responsável pelas ações táticas de alto risco, pela negociação e pelo enfrentamento de artefatos explosivos; o Batalhão de Aviação Operacional, que agrega mobilidade, observação aérea e capacidade de evacuação aeromédica; as unidades de policiamento com cães, empregadas na busca de pessoas e na detecção de explosivos e entorpecentes; e o efetivo das unidades de área, primeiro interventor em praticamente todos os eventos críticos. A articulação desses meios é operacionalizada por intermédio das centrais integradas de atendimento e despacho de emergências e dos centros de comando e controle ativados em grandes eventos.'
].forEach(t => children.push(p(t)));

children.push(h2('7.2 Casos ilustrativos e lições aprendidas'));
[
'O sequestro do ônibus da linha 174, ocorrido no Rio de Janeiro em 12 de junho de 2000, permanece como o mais estudado caso brasileiro de falha de gerenciamento. Transmitido ao vivo por várias horas, o evento reuniu praticamente todos os erros que a doutrina busca evitar: ausência de isolamento eficaz do perímetro, presença de jornalistas e de curiosos na área crítica, multiplicidade de comandos, negociação conduzida sem coordenação, disparo de comprometimento executado sem posição consolidada e morte da refém. O episódio demonstrou que a falha de gerenciamento produz, além da tragédia humana, severo dano à legitimidade institucional.',
'Em sentido oposto, o sequestro de ônibus ocorrido na Ponte Rio–Niterói, em 20 de agosto de 2019, ilustra a aplicação correta do modelo: isolamento imediato e completo da via, evacuação da área, contenção da imprensa a distância segura, negociação prolongada conduzida por equipe especializada, posicionamento de atiradores de elite em posições consolidadas e execução do tiro de comprometimento mediante autorização expressa do gerente da crise, com libertação de todos os reféns sem qualquer ferimento.',
'No âmbito distrital, dois episódios recentes merecem registro. Em dezembro de 2022, a localização de artefato explosivo instalado em caminhão-tanque nas imediações do Aeroporto Internacional de Brasília exigiu isolamento de área, evacuação preventiva e atuação do esquadrão antibombas, evidenciando a importância da capacidade especializada de desativação de explosivos e da articulação com a administração aeroportuária e com órgãos federais de investigação.',
'Os atos de 8 de janeiro de 2023, que resultaram na invasão e na depredação das sedes dos três Poderes da República, constituem o caso mais grave e mais instrutivo da história recente do Distrito Federal em matéria de gestão de eventos críticos. A gravidade das consequências — que incluiu a decretação de intervenção federal na área de segurança pública do Distrito Federal, por meio do Decreto nº 11.377, de 8 de janeiro de 2023 — evidenciou que as falhas determinantes não se situaram no plano da coragem individual ou da capacidade tática das equipes empenhadas, mas no da fase de pré-confrontação: insuficiência de análise de inteligência prévia, subdimensionamento do dispositivo, ausência de plano de contingência efetivamente ativado, deficiências de comando e controle e de comunicação interinstitucional. O episódio confirma a lição doutrinária central deste trabalho: crises são vencidas ou perdidas muito antes de começarem.',
'Cabe acrescentar a esse rol a rotina menos visível, porém quantitativamente dominante, das crises de baixa escala: tentativas de autoextermínio em pontes, edifícios e vias urbanas; ocorrências de violência doméstica com barricada e retenção de familiares; e distúrbios em unidades prisionais e socioeducativas. São esses eventos, atendidos diariamente pelas unidades de área, que mais demandam a difusão do conhecimento doutrinário para além da tropa especializada.'
].forEach(t => children.push(p(t)));

children.push(h2('7.3 A dimensão administrativa do gerenciamento de crises'));
[
'O gerenciamento de crises não se esgota na atividade operacional. Sua sustentação depende de decisões administrativas que se situam na fase de pré-confrontação e que competem aos órgãos de direção-geral e de apoio da Corporação. No campo do ensino, cabe assegurar a inclusão progressiva do conteúdo nos cursos de formação, aperfeiçoamento e altos estudos, bem como a realização periódica de exercícios simulados conjuntos, com participação dos demais órgãos do sistema de segurança pública distrital.',
'No campo da gestão de pessoas e de material, impõem-se a seleção criteriosa e a certificação periódica de negociadores e de operadores táticos, a manutenção de escalas de sobreaviso, a aquisição e a substituição tempestiva de instrumentos de menor potencial ofensivo, de equipamentos de proteção individual, de meios de comunicação seguros e de recursos de vídeo. No campo normativo, cabe manter atualizados os procedimentos operacionais padrão e as diretrizes de emprego, incorporando as exigências fixadas pela jurisprudência recente quanto a registro audiovisual, comunicação de ocorrências com resultado morte e preservação de local.',
'Merece destaque, ainda, a comunicação organizacional. Em eventos críticos de repercussão, a informação inexata divulgada nos primeiros minutos tende a se consolidar como versão predominante, com efeitos duradouros sobre a imagem institucional. A designação prévia de porta-voz, a definição de área destinada à imprensa fora do perímetro tático e a padronização do fluxo de informação entre o posto de comando e a assessoria de comunicação são medidas de baixo custo e de elevado impacto. Por fim, o cuidado com a saúde mental dos policiais empenhados — mediante debriefing estruturado, apoio psicológico e acompanhamento posterior — é responsabilidade administrativa cujo descumprimento se converte, no médio prazo, em perda de capacidade operacional.'
].forEach(t => children.push(p(t)));

// 8
children.push(h1('8 DESAFIOS CONTEMPORÂNEOS'));
[
'O primeiro desafio contemporâneo é a mutação do perfil dos eventos críticos. As chamadas ameaças ativas, com destaque para os ataques a instituições de ensino, impuseram revisão doutrinária relevante, ao exigir intervenção imediata em vez de isolamento e negociação. A resposta legislativa a esse fenômeno materializou-se, entre outros diplomas, na Lei nº 14.811, de 8 de janeiro de 2024, que instituiu a Política Nacional de Prevenção e Combate ao Abuso e à Violência contra Crianças e Adolescentes e tipificou condutas de indução e instigação à violência em ambiente escolar. Para a Corporação, isso significa articular o policiamento escolar com protocolos de resposta a ameaça ativa e com fluxos de detecção precoce, em cooperação com a rede de ensino do Distrito Federal.',
'O segundo desafio é tecnológico. Aeronaves remotamente pilotadas ampliaram simultaneamente a capacidade de observação do teatro de operações e o repertório de ameaças, ao permitirem sobrevoo hostil e transporte de artefatos. Sistemas de videomonitoramento, reconhecimento facial e análise de dados oferecem ganhos expressivos de consciência situacional, mas suscitam questões de legalidade, de proteção de dados pessoais e de risco de erro que exigem regulamentação interna cuidadosa.',
'O terceiro desafio é comunicacional. A transmissão ao vivo por dispositivos móveis e a circulação instantânea de conteúdo em redes sociais alteraram profundamente a dinâmica das crises: o causador pode acompanhar em tempo real a movimentação policial, familiares e terceiros interferem espontaneamente na negociação e narrativas concorrentes se consolidam antes de qualquer manifestação oficial. O controle do perímetro deixou de ser apenas físico e passou a ser também informacional.',
'O quarto desafio é o da formação continuada. A doutrina de gerenciamento de crises tem baixa taxa de retenção quando ensinada apenas em sala de aula: sua eficácia depende de treinamento periódico, de simulação realista e de avaliação de desempenho. Considerando que o primeiro interventor é o policial do policiamento ordinário, a difusão dos fundamentos para todo o efetivo — e não somente para as unidades especializadas — constitui, provavelmente, a medida de maior relação entre benefício e custo disponível à Corporação.'
].forEach(t => children.push(p(t)));

// 9
children.push(h1('9 CONCLUSÃO'));
[
'O percurso desenvolvido neste trabalho permite afirmar que o gerenciamento de crises constitui, na atualidade, competência institucional indispensável e não mais especialidade restrita a poucos operadores. A crise, compreendida como evento crucial que exige resposta especial da polícia, caracteriza-se pela imprevisibilidade, pela compressão do tempo, pela ameaça à vida e pela necessidade de postura organizacional diferenciada, e sua superação depende de método, e não de improvisação.',
'Verificou-se que o processo decisório em eventos críticos possui estrutura própria e verificável: objetivos hierarquizados na preservação da vida e na aplicação da lei; critérios de necessidade, validade do risco e aceitabilidade em suas dimensões legal, ética e técnica; providências iniciais de conter, isolar e negociar; organização do teatro de operações em perímetros com comando único; fases de pré-confrontação, confrontação e pós-confrontação; graduação do risco; e alternativas táticas escalonadas, entre as quais a negociação ocupa posição de preferência permanente.',
'Constatou-se, igualmente, que esse processo não é juridicamente livre. O uso da força submete-se a um regime normativo denso, integrado por normas internacionais, pela Portaria Interministerial nº 4.226/2010, pela Lei nº 13.060/2014 e pelas alterações promovidas pela Lei nº 13.964/2019, e é hoje escrutinado por jurisprudência exigente, especialmente a firmada na Arguição de Descumprimento de Preceito Fundamental nº 635 e na sentença da Corte Interamericana de Direitos Humanos no Caso Favela Nova Brasília. O padrão contemporâneo de legalidade exige demonstração documentada de planejamento, de proporcionalidade e de registro auditável da decisão.',
'No plano da contextualização institucional, demonstrou-se que a Polícia Militar do Distrito Federal opera em ambiente de risco agravado, decorrente da condição de Brasília como sede dos Poderes da República, e que os episódios analisados — do sequestro do ônibus 174 aos atos de 8 de janeiro de 2023 — convergem para a mesma conclusão: as crises são decididas na fase de preparação. Inteligência prévia, planos de contingência exercitados, comando e controle definidos, meios disponíveis e tropa adestrada explicam os desfechos com muito mais precisão do que a bravura demonstrada no momento do evento.',
'Como contribuição propositiva, sugere-se: a difusão dos fundamentos de gerenciamento de crises a todo o efetivo, com ênfase na atuação do primeiro interventor; a realização periódica de exercícios simulados integrados com os demais órgãos do sistema de segurança pública do Distrito Federal, contemplando cenários de ameaça ativa, artefatos explosivos e distúrbios civis em áreas institucionais; a certificação e a reciclagem obrigatórias de negociadores e operadores táticos; a atualização dos procedimentos operacionais padrão à luz das exigências jurisprudenciais recentes; e a institucionalização do debriefing estruturado como fonte permanente de aprendizado organizacional.',
'Conclui-se, enfim, que gerenciar crises é, antes de tudo, gerenciar decisões sob incerteza, e que o valor da doutrina reside justamente em reduzir a margem de arbítrio no instante em que a pressão é máxima. Ao subordinar a resposta tática a critérios técnicos e jurídicos previamente definidos, a Polícia Militar do Distrito Federal protege simultaneamente três bens: a vida das pessoas envolvidas no evento, a integridade física e jurídica de seus policiais e a legitimidade que sustenta o exercício da autoridade policial em uma sociedade democrática.'
].forEach(t => children.push(p(t)));

// REFERÊNCIAS
children.push(h1('REFERÊNCIAS'));
[
'BRASIL. [Constituição (1988)]. Constituição da República Federativa do Brasil de 1988. Brasília, DF: Presidência da República, 1988.',
'BRASIL. Decreto-Lei nº 2.848, de 7 de dezembro de 1940. Código Penal. Rio de Janeiro, 1940.',
'BRASIL. Decreto-Lei nº 3.689, de 3 de outubro de 1941. Código de Processo Penal. Rio de Janeiro, 1941.',
'BRASIL. Lei nº 6.450, de 14 de outubro de 1977. Dispõe sobre a organização básica da Polícia Militar do Distrito Federal. Brasília, DF, 1977.',
'BRASIL. Decreto nº 88.777, de 30 de setembro de 1983. Aprova o regulamento para as polícias militares e corpos de bombeiros militares (R-200). Brasília, DF, 1983.',
'BRASIL. Lei nº 7.289, de 18 de dezembro de 1984. Dispõe sobre o Estatuto dos Policiais-Militares da Polícia Militar do Distrito Federal. Brasília, DF, 1984.',
'BRASIL. Lei nº 10.216, de 6 de abril de 2001. Dispõe sobre a proteção e os direitos das pessoas portadoras de transtornos mentais. Brasília, DF, 2001.',
'BRASIL. Lei nº 12.086, de 6 de novembro de 2009. Dispõe sobre os militares da Polícia Militar do Distrito Federal e do Corpo de Bombeiros Militar do Distrito Federal. Brasília, DF, 2009.',
'BRASIL. Secretaria de Direitos Humanos da Presidência da República; Ministério da Justiça. Portaria Interministerial nº 4.226, de 31 de dezembro de 2010. Estabelece diretrizes sobre o uso da força e armas de fogo pelos agentes de segurança pública. Brasília, DF, 2010.',
'BRASIL. Lei nº 12.608, de 10 de abril de 2012. Institui a Política Nacional de Proteção e Defesa Civil. Brasília, DF, 2012.',
'BRASIL. Lei nº 13.060, de 22 de dezembro de 2014. Disciplina o uso dos instrumentos de menor potencial ofensivo pelos agentes de segurança pública. Brasília, DF, 2014.',
'BRASIL. Lei nº 13.675, de 11 de junho de 2018. Institui o Sistema Único de Segurança Pública e cria a Política Nacional de Segurança Pública e Defesa Social. Brasília, DF, 2018.',
'BRASIL. Lei nº 13.869, de 5 de setembro de 2019. Dispõe sobre os crimes de abuso de autoridade. Brasília, DF, 2019.',
'BRASIL. Lei nº 13.964, de 24 de dezembro de 2019. Aperfeiçoa a legislação penal e processual penal. Brasília, DF, 2019.',
'BRASIL. Decreto nº 11.377, de 8 de janeiro de 2023. Decreta intervenção federal no Distrito Federal, com o objetivo de pôr termo a grave comprometimento da ordem pública. Brasília, DF, 2023.',
'BRASIL. Lei nº 14.811, de 8 de janeiro de 2024. Institui a Política Nacional de Prevenção e Combate ao Abuso e à Violência contra Crianças e Adolescentes. Brasília, DF, 2024.',
'BRASIL. Ministério da Justiça. Academia Nacional de Polícia. Manual de gerenciamento de crises. Brasília, DF: ANP.',
'BRASIL. Ministério da Justiça. Secretaria Nacional de Segurança Pública. Matriz curricular nacional para ações formativas dos profissionais da área de segurança pública. Brasília, DF: SENASP.',
'BRASIL. Ministério da Justiça. Secretaria Nacional de Segurança Pública. Curso de gerenciamento de crises: material didático da Rede Nacional de Altos Estudos em Segurança Pública. Brasília, DF: SENASP.',
'BOLZ, Frank; DUDONIS, Kenneth J.; SCHULZ, David P. The counterterrorism handbook: tactics, procedures, and techniques. 4. ed. Boca Raton: CRC Press, 2012.',
'CORTE INTERAMERICANA DE DIREITOS HUMANOS. Caso Favela Nova Brasília vs. Brasil. Sentença de 16 de fevereiro de 2017. San José: Corte IDH, 2017.',
'FÓRUM BRASILEIRO DE SEGURANÇA PÚBLICA. Anuário brasileiro de segurança pública. São Paulo: FBSP.',
'LUCCA, Diógenes Viegas Meireles de. O gerenciamento de crises. São Paulo: Centro de Altos Estudos de Segurança da Polícia Militar do Estado de São Paulo.',
'McMAINS, Michael J.; MULLINS, Wayman C. Crisis negotiations: managing critical incidents and hostage situations in law enforcement and corrections. 5. ed. New York: Routledge, 2014.',
'NOESNER, Gary. Stalling for time: my life as an FBI hostage negotiator. New York: Random House, 2010.',
'ORGANIZAÇÃO DAS NAÇÕES UNIDAS. Código de conduta para os funcionários responsáveis pela aplicação da lei. Resolução nº 34/169 da Assembleia Geral, de 17 de dezembro de 1979. Nova Iorque: ONU, 1979.',
'ORGANIZAÇÃO DAS NAÇÕES UNIDAS. Princípios básicos sobre o uso da força e armas de fogo pelos funcionários responsáveis pela aplicação da lei. Oitavo Congresso das Nações Unidas sobre Prevenção do Delito e Tratamento do Delinquente. Havana: ONU, 1990.',
'POLÍCIA MILITAR DO DISTRITO FEDERAL. Procedimentos operacionais padrão e diretrizes de emprego operacional. Brasília, DF: PMDF.',
'SUPREMO TRIBUNAL FEDERAL. Arguição de Descumprimento de Preceito Fundamental nº 635/RJ. Relator: Ministro Edson Fachin. Brasília, DF: STF.',
'SUPREMO TRIBUNAL FEDERAL. Recurso Extraordinário nº 841.526/RS. Tema 592 da repercussão geral. Relator: Ministro Luiz Fux. Brasília, DF: STF, 2016.',
'VECCHI, Gregory M.; VAN HASSELT, Vincent B.; ROMANO, Stephen J. Crisis (hostage) negotiation: current strategies and issues in high-risk conflict resolution. Aggression and Violent Behavior, v. 10, n. 5, p. 533-551, 2005.'
].forEach(t => children.push(ref(t)));

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: FONT, size: 24 }, paragraph: { spacing: { line: LINE } } },
      heading1: { run: { font: FONT, size: 24, bold: true, color: '000000' } },
      heading2: { run: { font: FONT, size: 24, bold: true, color: '000000' } }
    }
  },
  sections: [{
    properties: {
      page: {
        margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN }
      }
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ children: [PageNumber.CURRENT], size: 20, font: FONT })]
        })]
      })
    },
    children
  }]
});

Packer.toBuffer(doc).then(b => {
  fs.writeFileSync(process.argv[2], b);
  console.log('OK ->', process.argv[2], b.length, 'bytes');
});
