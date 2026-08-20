const pptxgen = require(process.env.SP + "/node_modules/pptxgenjs");
const P = new pptxgen();
P.layout = "LAYOUT_WIDE";              // 13.3 x 7.5
P.author = "PMDF";
P.title  = "Cartao Tatico de Resposta a Eventos Criticos";

const SW = 13.3, SH = 7.5, ML = 0.65, CW = 12.0;

const C = {
  dark:   "101820", deeper: "070C11", light: "F3F4F1", white: "FFFFFF",
  ink:    "14191C", mute:   "5B6569", rule:  "D3D8D2",
  onDark: "EDF1EE", onDarkMute: "97A3A6", darkCard: "1A242E", darkRule: "2C3A45",
  upm:    "B3121B", ativo: "D4581C", gerente: "1F5F7A", petardo: "B58700",
  caso:   "4F6B3A", ok: "2E7D4F"
};
const FT = "Cambria", FB = "Calibri", FM = "Courier New";
const SHADOW = () => ({ type: "outer", color: "000000", blur: 8, offset: 1, angle: 90, opacity: 0.10 });

/* ---------- estimativa de altura de texto (evita estouro) ---------- */
function estH(text, w, fs, pad) {
  pad = pad === undefined ? 0.14 : pad;
  const cpl = Math.max(8, ((w - pad) * 96) / (fs * 0.6266));
  const lines = String(text).split("\n").reduce(function (n, seg) {
    return n + Math.max(1, Math.ceil(seg.length / cpl));
  }, 0);
  return lines * fs * 0.01694 + 0.10;
}

/* ---------- slides base ---------- */
function slideLight(idx, name, accent, title, sub) {
  const s = P.addSlide();
  s.background = { color: C.light };
  if (idx) {
    s.addShape(P.ShapeType.rect, { x: ML, y: 0.46, w: 0.44, h: 0.44, fill: { color: accent } });
    s.addText(idx, { x: ML, y: 0.46, w: 0.44, h: 0.44, fontFace: FM, fontSize: 15, bold: true,
      color: C.white, align: "center", valign: "middle", margin: 0 });
    s.addText(name, { x: ML + 0.60, y: 0.46, w: 7.5, h: 0.44, fontFace: FM, fontSize: 11,
      color: accent, charSpacing: 1.4, valign: "middle", margin: 0 });
  }
  s.addText(title, { x: ML, y: idx ? 1.00 : 0.55, w: CW, h: 0.66, fontFace: FT, fontSize: 30,
    bold: true, color: C.ink, valign: "middle", margin: 0 });
  if (sub) {
    s.addText(sub, { x: ML, y: idx ? 1.62 : 1.18, w: CW, h: 0.38, fontFace: FB, fontSize: 13.5,
      color: C.mute, italic: true, valign: "top", margin: 0 });
  }
  return s;
}
function slideDark(title, kicker, accent) {
  const s = P.addSlide();
  s.background = { color: C.dark };
  if (kicker) {
    s.addText(kicker, { x: ML, y: 0.62, w: CW, h: 0.34, fontFace: FM, fontSize: 12,
      color: accent || C.onDarkMute, charSpacing: 1.6, valign: "middle", margin: 0 });
  }
  if (title) {
    s.addText(title, { x: ML, y: 1.05, w: CW, h: 0.9, fontFace: FT, fontSize: 32, bold: true,
      color: C.onDark, valign: "middle", margin: 0 });
  }
  return s;
}
function divider(num, name, accent, lines) {
  const s = P.addSlide();
  s.background = { color: C.deeper };
  s.addText(num, { x: ML, y: 1.55, w: 3.4, h: 2.6, fontFace: FT, fontSize: 150, bold: true,
    color: accent, valign: "middle", margin: 0 });
  s.addText("FICHA", { x: ML + 0.12, y: 1.15, w: 3.0, h: 0.35, fontFace: FM, fontSize: 13,
    color: C.onDarkMute, charSpacing: 3, valign: "middle", margin: 0 });
  s.addText(name, { x: 4.5, y: 1.75, w: 8.15, h: 1.3, fontFace: FT, fontSize: 34, bold: true,
    color: C.onDark, valign: "middle", margin: 0 });
  let y = 3.15;
  lines.forEach(function (t) {
    s.addShape(P.ShapeType.rect, { x: 4.5, y: y + 0.10, w: 0.16, h: 0.16, fill: { color: accent } });
    s.addText(t, { x: 4.82, y: y, w: 7.85, h: 0.4, fontFace: FB, fontSize: 14.5, color: C.onDark,
      valign: "middle", margin: 0 });
    y += 0.52;
  });
  return s;
}

/* ---------- componentes ---------- */
function card(s, x, y, w, h, dark) {
  s.addShape(P.ShapeType.rect, { x: x, y: y, w: w, h: h,
    fill: { color: dark ? C.darkCard : C.white },
    line: { color: dark ? C.darkRule : C.rule, width: 1 },
    shadow: dark ? undefined : SHADOW() });
}
function cardTitle(s, x, y, w, t, accent, dark) {
  s.addText(t, { x: x, y: y, w: w, h: 0.34, fontFace: FT, fontSize: 15.5, bold: true,
    color: accent || (dark ? C.onDark : C.ink), valign: "middle", margin: 0 });
}
// lista numerada com altura calculada
function steps(s, items, x, y, w, accent, fs, dark, start) {
  fs = fs || 13;
  start = start || 1;
  let cy = y;
  items.forEach(function (it, i) {
    const tw = w - 0.44;
    const h = Math.max(0.30, estH(it, tw, fs));
    s.addShape(P.ShapeType.rect, { x: x, y: cy + 0.02, w: 0.28, h: 0.24,
      fill: { color: accent }, line: { color: accent, width: 0 } });
    s.addText(String(i + start), { x: x, y: cy + 0.02, w: 0.28, h: 0.24, fontFace: FM, fontSize: 9.5,
      bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });
    s.addText(it, { x: x + 0.40, y: cy - 0.02, w: tw, h: h, fontFace: FB, fontSize: fs,
      color: dark ? C.onDark : C.ink, valign: "top", margin: 0 });
    cy += h + 0.09;
  });
  return cy;
}
// lista com marcador quadrado
function bullets(s, items, x, y, w, accent, fs, dark) {
  fs = fs || 13;
  let cy = y;
  items.forEach(function (it) {
    const tw = w - 0.30;
    const h = Math.max(0.26, estH(it, tw, fs));
    s.addShape(P.ShapeType.rect, { x: x + 0.02, y: cy + 0.10, w: 0.13, h: 0.13, fill: { color: accent } });
    s.addText(it, { x: x + 0.30, y: cy - 0.02, w: tw, h: h, fontFace: FB, fontSize: fs,
      color: dark ? C.onDark : C.ink, valign: "top", margin: 0 });
    cy += h + 0.07;
  });
  return cy;
}
// caixa de alerta
function callout(s, x, y, w, tag, text, accent, fs) {
  fs = fs || 13;
  const th = Math.max(0.30, estH(text, w - 0.55, fs));
  const h = th + 0.62;
  s.addShape(P.ShapeType.rect, { x: x, y: y, w: w, h: h, fill: { color: C.white },
    line: { color: accent, width: 1.75 } });
  s.addShape(P.ShapeType.rect, { x: x + 0.26, y: y + 0.22, w: 0.14, h: 0.14, fill: { color: accent } });
  s.addText(tag, { x: x + 0.52, y: y + 0.14, w: w - 0.8, h: 0.30, fontFace: FM, fontSize: 10.5,
    bold: true, color: accent, charSpacing: 1.2, valign: "middle", margin: 0 });
  s.addText(text, { x: x + 0.26, y: y + 0.46, w: w - 0.55, h: th, fontFace: FB, fontSize: fs,
    color: C.ink, valign: "top", margin: 0 });
  return y + h;
}
function pageNums() {
  // aplicado no final
}

/* =================================================================== */
/* 01 · CAPA                                                            */
/* =================================================================== */
{
  const s = P.addSlide();
  s.background = { color: C.dark };
  s.addText("POLÍCIA MILITAR DO DISTRITO FEDERAL", { x: ML, y: 0.85, w: CW, h: 0.34,
    fontFace: FM, fontSize: 12.5, color: C.onDarkMute, charSpacing: 2.6, margin: 0 });
  s.addText("Cartão Tático de Resposta\na Eventos Críticos", { x: ML, y: 1.35, w: 11.0, h: 1.9,
    fontFace: FT, fontSize: 46, bold: true, color: C.onDark, lineSpacing: 50, margin: 0 });
  s.addText("Ficha de pronto emprego para consulta durante o serviço operacional", {
    x: ML, y: 3.35, w: 10.5, h: 0.4, fontFace: FB, fontSize: 16, color: C.onDarkMute, margin: 0 });

  const chips = [
    ["01", "DEFESA DA UPM", "Novo Cangaço · domínio de cidades", C.upm],
    ["02", "AGRESSOR ATIVO", "IN EM nº 11/2023", C.ativo],
    ["03", "OPERAÇÃO GERENTE", "Portaria PMDF nº 1.218/2021", C.gerente],
    ["04", "OPERAÇÃO PETARDO", "Portaria Conjunta SSP nº 07/2019", C.petardo]
  ];
  let x = ML;
  const w = (CW - 3 * 0.24) / 4;
  chips.forEach(function (c) {
    s.addShape(P.ShapeType.rect, { x: x, y: 4.15, w: w, h: 1.62, fill: { color: C.darkCard },
      line: { color: C.darkRule, width: 1 } });
    s.addShape(P.ShapeType.rect, { x: x + 0.26, y: 4.42, w: 0.40, h: 0.40, fill: { color: c[3] } });
    s.addText(c[0], { x: x + 0.26, y: 4.42, w: 0.40, h: 0.40, fontFace: FM, fontSize: 14, bold: true,
      color: C.white, align: "center", valign: "middle", margin: 0 });
    s.addText(c[1], { x: x + 0.26, y: 4.94, w: w - 0.52, h: 0.30, fontFace: FT, fontSize: 14,
      bold: true, color: C.onDark, valign: "middle", margin: 0 });
    s.addText(c[2], { x: x + 0.26, y: 5.24, w: w - 0.52, h: 0.42, fontFace: FB, fontSize: 11,
      color: C.onDarkMute, valign: "top", margin: 0 });
    x += w + 0.24;
  });
  s.addText("Material didático de consulta rápida — não substitui o texto integral dos normativos.", {
    x: ML, y: 6.30, w: CW, h: 0.3, fontFace: FM, fontSize: 10, color: C.onDarkMute, margin: 0 });
  s.addNotes("Deck de pronto emprego. Quatro protocolos que podem ser acionados no mesmo turno de serviço. A competência exigida não e decorar listas, e classificar o evento nos primeiros segundos.");
}

/* =================================================================== */
/* 02 · O QUE ESTE MATERIAL ENTREGA                                     */
/* =================================================================== */
{
  const s = slideLight(null, null, null, "O que este material entrega",
    "Cinco produtos integrados, organizados para leitura vertical rápida.");
  const items = [
    ["01", "Infográfico tático", "Ações defensivas do Plano de Defesa da UPM e diretrizes do POP do Agressor Ativo, em procedimentos numerados.", C.upm],
    ["02", "Mapa mental integrado", "Convergências e a única contradição direta entre a Operação Gerente e a Operação Petardo.", C.gerente],
    ["03", "Caso real do DF", "Artefato explosivo em caminhão-tanque nas imediações do Aeroporto de Brasília, dez. 2022.", C.caso],
    ["04", "Quiz comentado", "Quatro questões inéditas com gabarito fundamentado nas normas de regência.", C.ativo],
    ["05", "Roteador de triagem", "Qual protocolo se aplica ao que você está vendo, em três leituras.", C.petardo]
  ];
  const w = (CW - 2 * 0.26) / 3;
  let x = ML, y = 2.05;
  items.forEach(function (it, i) {
    if (i === 3) { x = ML + (w + 0.26) / 2; y = 4.42; }
    card(s, x, y, w, 2.10);
    s.addShape(P.ShapeType.rect, { x: x + 0.28, y: y + 0.28, w: 0.38, h: 0.38, fill: { color: it[3] } });
    s.addText(it[0], { x: x + 0.28, y: y + 0.28, w: 0.38, h: 0.38, fontFace: FM, fontSize: 13,
      bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });
    s.addText(it[1], { x: x + 0.28, y: y + 0.76, w: w - 0.56, h: 0.36, fontFace: FT, fontSize: 16,
      bold: true, color: C.ink, valign: "middle", margin: 0 });
    s.addText(it[2], { x: x + 0.28, y: y + 1.16, w: w - 0.56, h: 0.78, fontFace: FB, fontSize: 12.5,
      color: C.mute, valign: "top", margin: 0 });
    x += w + 0.26;
  });
}

/* =================================================================== */
/* 03 · RESUMO                                                          */
/* =================================================================== */
{
  const s = slideLight(null, null, null, "Resumo", null);
  card(s, ML, 1.45, 7.3, 4.9);
  const txt =
    "Este material reúne, em formato de consulta imediata, quatro protocolos de resposta a eventos críticos que o " +
    "policial-militar do Distrito Federal pode acionar no mesmo turno de serviço: as ações defensivas do Plano de " +
    "Defesa da UPM frente ao ataque de grupos criminosos especializados (Novo Cangaço / domínio de cidades); as " +
    "diretrizes do POP do Agressor Ativo (IN EM nº 11/2023); as ações do Primeiro Interventor em Crise (Portaria " +
    "PMDF nº 1.218/2021 — Operação Gerente); e a Primeira Resposta com Explosivos (Portaria Conjunta SSP nº 07/2019 " +
    "— Operação Petardo).";
  const txt2 =
    "A abordagem parte de uma constatação operacional: os protocolos não apenas diferem entre si — eles se " +
    "contradizem. O procedimento que preserva vidas em um evento é exatamente o que as ceifa no outro. Por isso o " +
    "material privilegia a classificação correta do evento e o reconhecimento das transições de natureza, e não a " +
    "memorização isolada de listas.";
  s.addText(txt, { x: ML + 0.32, y: 1.75, w: 6.66, h: 2.0, fontFace: FB, fontSize: 13.5,
    color: C.ink, valign: "top", margin: 0 });
  s.addText(txt2, { x: ML + 0.32, y: 3.85, w: 6.66, h: 1.9, fontFace: FB, fontSize: 13.5,
    color: C.ink, valign: "top", margin: 0 });

  const kx = ML + 7.66, kw = CW - 7.66;
  const kpis = [
    ["4", "protocolos que podem ser acionados no mesmo turno", C.upm],
    ["1", "única contradição direta entre eles: o emprego do rádio", C.petardo],
    ["30s", "janela de decisão para classificar o evento", C.gerente]
  ];
  let ky = 1.45;
  kpis.forEach(function (k) {
    card(s, kx, ky, kw, 1.52);
    s.addText(k[0], { x: kx + 0.28, y: ky + 0.18, w: 1.5, h: 0.72, fontFace: FT, fontSize: 42,
      bold: true, color: k[2], valign: "middle", margin: 0 });
    s.addText(k[1], { x: kx + 0.28, y: ky + 0.92, w: kw - 0.56, h: 0.50, fontFace: FB, fontSize: 12.5,
      color: C.mute, valign: "top", margin: 0 });
    ky += 1.69;
  });
}

/* =================================================================== */
/* 04 · INTRODUÇÃO                                                      */
/* =================================================================== */
{
  const s = slideLight(null, null, null, "Introdução",
    "O erro cometido nos dois primeiros minutos não é corrigível nas duas horas seguintes.");
  const cols = [
    ["Três erros que definem o número de mortos", [
      "Guarnição que sai fracionada do quartel sob ataque de grupo com armamento de guerra.",
      "Policial que interrompe a progressão para socorrer ferido enquanto o agressor segue atirando.",
      "Interventor que transmite pelo HT ao lado de artefato com iniciação por radiofrequência."
    ], C.upm],
    ["Os protocolos se contradizem", [
      "Isolar e negociar é a regra de ouro na crise com reféns — e o erro fatal diante do agressor ativo.",
      "Difundir de imediato pelo rádio é obrigação no ataque à UPM — e conduta proibida junto a um artefato.",
      "A primeira decisão nunca é o que fazer, e sim qual protocolo se aplica."
    ], C.gerente]
  ];
  let x = ML;
  const w = (CW - 0.30) / 2;
  cols.forEach(function (c) {
    card(s, x, 2.10, w, 4.15);
    cardTitle(s, x + 0.30, 2.40, w - 0.60, c[0], c[2]);
    bullets(s, c[1], x + 0.30, 2.95, w - 0.60, c[2], 13.5);
    x += w + 0.30;
  });
  s.addNotes("Abrir a palestra por aqui: a contradicao entre protocolos e o ponto que mais gera erro sob pressao.");
}

/* =================================================================== */
/* 05 · ROTEADOR DE TRIAGEM                                             */
/* =================================================================== */
{
  const s = slideDark("Roteador de triagem — os primeiros 30 segundos", "CONSULTA IMEDIATA", C.onDarkMute);
  const cols = [
    ["O QUE VOCÊ ESTÁ VENDO", "Grupo armado, fuzis, vias bloqueadas, quartel sob fogo", "FICHA 01 · Defesa da UPM", "Autoproteção → difusão → cerco", C.upm],
    ["O QUE VOCÊ ESTÁ OUVINDO", "Disparos contínuos, pessoas em fuga, vítimas caindo", "FICHA 02 · Agressor Ativo", "Contato → progressão → intervenção", C.ativo],
    ["AMEAÇA ESTÁTICA COM PESSOAS", "Refém, barricada, causador que fala e negocia", "FICHA 03 · Operação Gerente", "Conter → isolar → negociar", C.gerente],
    ["OBJETO SUSPEITO", "Artefato, mochila, fio, temporizador, ameaça de bomba", "FICHA 03 · Operação Petardo", "Não tocar → silêncio de RF → afastar", C.petardo]
  ];
  const w = (CW - 3 * 0.22) / 4;
  let x = ML;
  cols.forEach(function (c) {
    s.addShape(P.ShapeType.rect, { x: x, y: 2.15, w: w, h: 2.72, fill: { color: C.darkCard },
      line: { color: C.darkRule, width: 1 } });
    s.addText(c[0], { x: x + 0.24, y: 2.36, w: w - 0.48, h: 0.46, fontFace: FM, fontSize: 9.5,
      color: c[4], charSpacing: 0.8, valign: "top", margin: 0 });
    s.addText(c[1], { x: x + 0.24, y: 2.86, w: w - 0.48, h: 1.02, fontFace: FT, fontSize: 15,
      bold: true, color: C.onDark, valign: "top", margin: 0 });
    s.addText(c[2], { x: x + 0.24, y: 3.94, w: w - 0.48, h: 0.34, fontFace: FB, fontSize: 12.5,
      bold: true, color: c[4], valign: "middle", margin: 0 });
    s.addText(c[3], { x: x + 0.24, y: 4.28, w: w - 0.48, h: 0.42, fontFace: FB, fontSize: 11.5,
      color: C.onDarkMute, valign: "top", margin: 0 });
    x += w + 0.22;
  });
  s.addShape(P.ShapeType.rect, { x: ML, y: 5.20, w: CW, h: 1.06, fill: { color: C.upm } });
  s.addText("REGRA DE DESEMPATE", { x: ML + 0.30, y: 5.34, w: 4.0, h: 0.28, fontFace: FM,
    fontSize: 10.5, bold: true, color: "FFD9D9", charSpacing: 1.4, valign: "middle", margin: 0 });
  s.addText("Havendo menção, indício ou visualização de artefato explosivo em qualquer dos quatro cenários, as regras de radiofrequência da Operação Petardo passam a valer imediatamente e sobre todas as demais. Silêncio eletrônico primeiro; difusão depois, à distância.",
    { x: ML + 0.30, y: 5.62, w: CW - 0.60, h: 0.56, fontFace: FB, fontSize: 13, color: C.white,
      valign: "top", margin: 0 });
  s.addNotes("Na duvida entre dois protocolos, aplicar sempre o mais restritivo: o que mais afasta pessoas e mais restringe o radio.");
}

/* =================================================================== */
/* FICHA 01                                                             */
/* =================================================================== */
divider("01", "Ações defensivas do Plano de Defesa da UPM", C.upm, [
  "Modus operandi do Novo Cangaço e do domínio de cidades",
  "A · Autoproteção do quartel e das instalações",
  "B · Difusão imediata de dados ao COPOM pela rede de rádio",
  "C · Cerco nos pontos de estrangulamento das vias de acesso e saída"
]);

{
  const s = slideLight("01", "DEFESA DA UPM · A AMEAÇA", C.upm, "O ataque não é um roubo ampliado",
    "É uma operação militarizada com fases. Reconhecer a fase em curso é o que permite antecipar a próxima.");
  const items = [
    ["Horário e efetivo", "Madrugada (02h–05h), menor densidade policial. De 10 a 30 criminosos em múltiplos veículos, fuzis 5,56 e 7,62, por vezes .50, e explosivos para arrombamento."],
    ["Neutralização prévia da resposta", "O quartel é atacado, cercado ou fixado antes do golpe principal. O objetivo raramente é tomar a UPM — é prendê-la ao solo."],
    ["Negação de mobilidade", "Veículos incendiados atravessados nas vias, miguelitos, derrubada de postes e árvores, artefato improvisado na rota de aproximação."],
    ["Negação de comunicação", "Ataque a torres e antenas, bloqueadores de sinal, monitoramento da rede de rádio por scanner ou equipamento clonado."],
    ["Escudo humano", "Reféns colhidos na via pública e distribuídos sobre veículos e nas rotas de fuga, para inibir o emprego de fogo policial."],
    ["Dispersão planejada", "Troca de veículos, abandono do produto, fuga por área rural ou mata, evasão para a unidade federativa vizinha."]
  ];
  const w = (CW - 2 * 0.24) / 3, h = 1.86;
  let x = ML, y = 2.22;
  items.forEach(function (it, i) {
    if (i === 3) { x = ML; y = 2.22 + h + 0.24; }
    card(s, x, y, w, h);
    s.addText(it[0], { x: x + 0.26, y: y + 0.18, w: w - 0.52, h: 0.44, fontFace: FT, fontSize: 15,
      bold: true, color: C.upm, valign: "top", margin: 0 });
    s.addText(it[1], { x: x + 0.26, y: y + 0.64, w: w - 0.52, h: 1.14, fontFace: FB, fontSize: 12,
      color: C.ink, valign: "top", margin: 0 });
    x += w + 0.24;
  });
  s.addText("Referências recorrentes na literatura policial brasileira: Araçatuba/SP (2021) e Criciúma/SC (2022), entre outras ocorrências de domínio de cidade com ataque simultâneo a bases policiais.",
    { x: ML, y: 6.42, w: CW, h: 0.34, fontFace: FB, fontSize: 11, italic: true, color: C.mute, margin: 0 });
}

{
  const s = slideLight("01", "DEFESA DA UPM · AÇÃO A", C.upm, "Autoproteção do quartel e das instalações", null);
  const col1 = [
    "Alarme e cerramento. Acionar o alerta interno; travar portões, cancelas e acessos secundários; recolher ao perímetro tudo o que estiver exposto.",
    "Iluminação a favor da defesa. Apagar as luzes que recortam a silhueta do defensor; manter as que iluminam o atacante na via de aproximação.",
    "Ocupação dos postos previstos no plano. Posições com cobertura dura — concreto, colunas, terrapleno. Alvenaria simples, drywall e vidro não param projétil de fuzil.",
    "Distribuição prioritária de meios. Fuzil, carabina, coletes de maior nível e munição de reserva para quem ocupa os setores de maior exposição."
  ];
  const col2 = [
    "Proteção da reserva de armamento. A captura de armas e munição é objetivo secundário do grupo: o paiol recebe guarnecimento próprio.",
    "Recolhimento de terceiros e custodiados. Público, servidores e presos conduzidos a área protegida, fora de linhas de tiro e de fachadas envidraçadas.",
    "Viaturas dispersas. Nunca concentradas na testada do quartel: viatura enfileirada é alvo remunerador e obstáculo à própria saída.",
    "Comunicação alternativa pronta. Telefonia celular e fixa, aplicativos, rede de outra força e, em último caso, mensageiro — com contatos impressos."
  ];
  const w = (CW - 0.34) / 2;
  card(s, ML, 1.90, w, 3.55);
  card(s, ML + w + 0.34, 1.90, w, 3.55);
  steps(s, col1, ML + 0.28, 2.16, w - 0.56, C.upm, 12.5);
  steps(s, col2, ML + w + 0.62, 2.16, w - 0.56, C.upm, 12.5, false, 5);
  callout(s, ML, 5.62, CW, "ERRO QUE MATA",
    "Não fracionar a tropa e não sair isoladamente sob provocação. A saída de uma ou duas guarnições em resposta ao fogo contra o quartel é precisamente o efeito que o atacante busca: dissolve a defesa, entrega viaturas em emboscada preparada e libera o alvo principal. Sai-se em bloco, com ordem, meios e reforço articulado — ou não se sai.",
    C.upm, 12.5);
  s.addNotes("Oito medidas de autoprotecao. A regra de ouro esta no rodape: nao fracionar e nao sair isoladamente.");
}

{
  const s = slideDark("O ataque ao quartel raramente quer o quartel", "FICHA 01 · ERRO QUE MATA", C.upm);
  s.addText("Ele quer a sua guarnição fora dele.", { x: ML, y: 2.15, w: 11.0, h: 0.62,
    fontFace: FB, fontSize: 21, italic: true, color: C.upm, valign: "middle", margin: 0 });
  const rows = [
    ["O que o atacante faz", "Abre fogo contra a UPM a partir de posição não identificada, à distância, sem tentar transpor o muro."],
    ["O que ele espera de você", "Que a tropa saia fracionada e em movimento, na direção do fogo, por vias que ele já preparou."],
    ["O que ele obtém", "Defesa dissolvida, viaturas em emboscada, alvo principal desguarnecido e rota de fuga livre."],
    ["O que interrompe o plano", "Tropa reunida no dispositivo de defesa, difusão imediata ao COPOM e reforço articulado em bloco."]
  ];
  let y = 3.05;
  const w = CW;
  rows.forEach(function (r, i) {
    const acc = i === 3 ? C.ok : C.upm;
    s.addShape(P.ShapeType.rect, { x: ML, y: y, w: w, h: 0.78, fill: { color: C.darkCard },
      line: { color: i === 3 ? C.ok : C.darkRule, width: i === 3 ? 1.75 : 1 } });
    s.addText(r[0], { x: ML + 0.28, y: y, w: 3.1, h: 0.78, fontFace: FT, fontSize: 14, bold: true,
      color: acc, valign: "middle", margin: 0 });
    s.addText(r[1], { x: ML + 3.50, y: y, w: w - 3.80, h: 0.78, fontFace: FB, fontSize: 13,
      color: C.onDark, valign: "middle", margin: 0 });
    y += 0.88;
  });
}

{
  const s = slideLight("01", "DEFESA DA UPM · AÇÃO B", C.upm, "Difusão imediata de dados ao COPOM",
    "Transmita curto, pausado e completo, nesta ordem — e atualize a cada mudança relevante.");
  const fields = [
    ["1 · O QUÊ", "Natureza do evento: ataque a UPM, domínio de cidade, ataque a instituição financeira, explosão."],
    ["2 · ONDE", "Endereço exato, ponto de referência inequívoco e sentido de deslocamento."],
    ["3 · QUANTOS", "Número estimado de criminosos e de veículos empregados."],
    ["4 · COMO ARMADOS", "Fuzil, metralhadora, explosivos, drones, coletes — o que foi visto, sem inferência."],
    ["5 · VEÍCULOS", "Tipo, cor, marca, placa quando legível e sentido de fuga."],
    ["6 · REFÉNS", "Existência, quantidade aproximada, onde estão, se são usados como escudo."],
    ["7 · BLOQUEIOS", "Vias obstruídas, incêndios, miguelitos — orienta o eixo de aproximação do reforço."],
    ["8 · NECESSIDADES", "Reforço, aeronave, apoio de saúde, bombeiros, concessionárias, forças vizinhas."]
  ];
  const w = (CW - 0.26) / 2, rh = 0.62;
  let y = 2.20;
  fields.forEach(function (f, i) {
    const x = i < 4 ? ML : ML + w + 0.26;
    const yy = 2.20 + (i % 4) * (rh + 0.12);
    s.addShape(P.ShapeType.rect, { x: x, y: yy, w: w, h: rh, fill: { color: C.white },
      line: { color: C.rule, width: 1 } });
    s.addText(f[0], { x: x + 0.22, y: yy, w: 2.05, h: rh, fontFace: FM, fontSize: 10.5, bold: true,
      color: C.upm, valign: "middle", margin: 0 });
    s.addText(f[1], { x: x + 2.32, y: yy, w: w - 2.54, h: rh, fontFace: FB, fontSize: 11.5,
      color: C.ink, valign: "middle", margin: 0 });
  });
  callout(s, ML, 5.42, CW, "CONTRA-INTELIGÊNCIA DE REDE",
    "Presuma a rede monitorada. Difundir o que se vê é obrigação; difundir o que se vai fazer é entregar o plano. Não transmita em claro o dispositivo de resposta, o efetivo empregado, as rotas do reforço nem a localização das equipes de cerco — esses dados vão por canal alternativo, criptografado ou por telefonia. Rede da ocorrência restrita; demais unidades em silêncio.",
    C.upm, 12.5);
}

{
  const s = slideLight("01", "DEFESA DA UPM · AÇÃO C", C.upm, "Cerco nos pontos de estrangulamento",
    "Ponto de estrangulamento é o trecho de passagem obrigatória: ponte, viaduto, alça, trevo, cancela, saída de rodovia.");
  const col1 = [
    "Três anéis, não uma perseguição. 1º anel nas imediações do alvo; 2º nas vias arteriais da região administrativa; 3º nas saídas do Distrito Federal.",
    "Distância antes de posição. Posicionar-se, quando o terreno permitir, fora do alcance eficaz do fuzil, com observação em enfiada da via.",
    "A viatura não é parapeito. Nem blindagem frontal, nem barricada, nem iluminação de posição. Lataria e vidro não param 7,62.",
    "Plano de fogo e de evasão. Setor de responsabilidade de cada equipe, limite lateral, ponto de recuo e para onde ninguém atira."
  ];
  const col2 = [
    "Identificação de tropa amiga. Múltiplas forças, à noite, em movimento: senha, contrassenha, sinalização e canal comum são obrigatórios.",
    "Refém embarcado suspende o fogo. Identificado refém no veículo em fuga, o evento transita para gerenciamento de crise.",
    "Armadilhas na rota. Obstáculos, veículos abandonados e volumes deixados na via de fuga são tratados como possíveis artefatos.",
    "Integração e sensores. Aeronave, videomonitoramento e leitura de placas; PRF nas federais, forças do Entorno e PCDF na investigação."
  ];
  const w = (CW - 0.34) / 2;
  card(s, ML, 2.32, w, 3.30);
  card(s, ML + w + 0.34, 2.32, w, 3.30);
  steps(s, col1, ML + 0.28, 2.58, w - 0.56, C.upm, 12.5);
  steps(s, col2, ML + w + 0.62, 2.58, w - 0.56, C.upm, 12.5, false, 5);
  s.addText("No Distrito Federal os eixos obrigatórios de evasão são poucos e conhecidos — BR-020, BR-040, BR-060, BR-070 e BR-251; DF-001 (EPCT), DF-003 (EPIA), DF-085 (EPTG) e DF-095 (EPCL); e as pontes do Lago Paranoá. A proximidade do Entorno goiano comprime o tempo: o 3º anel só funciona se for acionado junto com a primeira difusão, não depois da confirmação do roubo.",
    { x: ML, y: 5.80, w: CW, h: 0.86, fontFace: FB, fontSize: 12.5, color: C.mute, valign: "top", margin: 0 });
}

/* --- diagrama dos anéis --- */
{
  const s = slideLight("01", "DEFESA DA UPM · ESQUEMA", C.upm, "Interceptar em profundidade, não perseguir", null);
  const cx = 5.00, cy = 4.50;
  [[2.40, "3º ANEL · SAÍDAS DO DF"], [1.75, "2º ANEL · VIAS ARTERIAIS"], [1.00, "1º ANEL · ALVO"]].forEach(function (r) {
    s.addShape(P.ShapeType.ellipse, { x: cx - r[0], y: cy - r[0], w: r[0] * 2, h: r[0] * 2,
      fill: { type: "none" }, line: { color: C.rule, width: 1.25, dashType: "dash" } });
    s.addText(r[1], { x: cx - 1.35, y: cy - r[0] + 0.07, w: 2.70, h: 0.22, fontFace: FM,
      fontSize: 8.5, color: C.mute, align: "center", valign: "middle", margin: 0 });
  });

  const blocks = [[6.70, 2.80, "rodovia federal"], [7.40, 4.50, "via de saída da RA"], [6.70, 6.20, "ponte / viaduto"]];
  blocks.forEach(function (b) {
    s.addShape(P.ShapeType.line, { x: Math.min(cx, b[0]), y: Math.min(cy, b[1]),
      w: Math.abs(b[0] - cx) - 0.26, h: Math.max(0, Math.abs(b[1] - cy) - 0.20),
      line: { color: C.mute, width: 1.5, endArrowType: "triangle" }, flipV: b[1] < cy });
    s.addShape(P.ShapeType.rect, { x: b[0] - 0.17, y: b[1] - 0.17, w: 0.34, h: 0.34, fill: { color: C.upm } });
    s.addText("B", { x: b[0] - 0.17, y: b[1] - 0.17, w: 0.34, h: 0.34, fontFace: FM, fontSize: 11,
      bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });
    s.addText(b[2], { x: b[0] + 0.26, y: b[1] - 0.15, w: 1.85, h: 0.30, fontFace: FB, fontSize: 10.5,
      color: C.mute, valign: "middle", margin: 0 });
  });

  s.addShape(P.ShapeType.rect, { x: cx - 0.62, y: cy - 0.30, w: 1.24, h: 0.60,
    fill: { color: C.white }, line: { color: C.ink, width: 2 } });
  s.addText("ALVO", { x: cx - 0.62, y: cy - 0.30, w: 1.24, h: 0.60, fontFace: FT, fontSize: 12.5,
    bold: true, color: C.ink, align: "center", valign: "middle", margin: 0 });

  s.addShape(P.ShapeType.rect, { x: 0.95, y: 5.50, w: 1.10, h: 0.50, fill: { color: C.white },
    line: { color: C.ink, width: 2 } });
  s.addText("UPM", { x: 0.95, y: 5.50, w: 1.10, h: 0.50, fontFace: FT, fontSize: 12.5, bold: true,
    color: C.ink, align: "center", valign: "middle", margin: 0 });
  s.addShape(P.ShapeType.line, { x: 2.15, y: 4.90, w: 1.30, h: 0.75,
    line: { color: C.upm, width: 2, dashType: "dash", endArrowType: "triangle" }, flipV: true });
  s.addText("NÃO perseguir em coluna", { x: 0.92, y: 6.10, w: 2.55, h: 0.26, fontFace: FB,
    fontSize: 11.5, bold: true, color: C.upm, valign: "middle", margin: 0 });

  card(s, 9.85, 2.10, 2.80, 3.05);
  s.addText("LEITURA", { x: 10.10, y: 2.32, w: 2.3, h: 0.26, fontFace: FM, fontSize: 10,
    color: C.upm, charSpacing: 1.4, valign: "middle", margin: 0 });
  bullets(s, [
    "B = bloqueio no ponto de passagem obrigatória.",
    "O cerco aguarda; não corre atrás da coluna criminosa.",
    "Perseguir entrega a iniciativa e leva a guarnição ao terreno preparado pelo atacante."
  ], 10.10, 2.68, 2.30, C.upm, 11.5);
  s.addNotes("Figura de apoio: o cerco produz resultado por interceptacao em profundidade.");
}

/* =================================================================== */
/* FICHA 02                                                             */
/* =================================================================== */
divider("02", "POP do Agressor Ativo", C.ativo, [
  "Instrução Normativa EM nº 11/2023",
  "A · Protocolo de formação de contato",
  "B · Progressão tática imediata em direção ao som dos disparos",
  "C · Intervenção direta para conter a ameaça e salvar vidas"
]);

{
  const s = slideDark("Aqui não se isola e não se negocia", "FICHA 02 · INVERSÃO DOUTRINÁRIA", C.ativo);
  s.addText("Enquanto houver produção contínua de vítimas, a única missão da primeira equipe é cessar os disparos. Perímetro, negociação e socorro vêm depois — e só existem se a ameaça for contida antes.",
    { x: ML, y: 2.25, w: 11.4, h: 0.9, fontFace: FB, fontSize: 17, color: C.onDark, valign: "top", margin: 0 });
  const pair = [
    ["MODELO ANTIGO", ["Conter e aguardar a especializada", "Perímetro antes de tudo", "Socorro imediato ao primeiro ferido", "Formação completa antes de entrar"], C.onDarkMute],
    ["MODELO VIGENTE", ["Contato imediato com o efetivo disponível", "Progressão ao som dos disparos", "Ultrapassar feridos e quem foge", "Intervenção direta para cessar a ameaça"], C.ativo]
  ];
  let x = ML;
  const w = (CW - 0.34) / 2;
  pair.forEach(function (p, i) {
    s.addShape(P.ShapeType.rect, { x: x, y: 3.45, w: w, h: 2.70, fill: { color: C.darkCard },
      line: { color: i === 1 ? C.ativo : C.darkRule, width: i === 1 ? 1.75 : 1 } });
    s.addText(p[0], { x: x + 0.30, y: 3.68, w: w - 0.60, h: 0.32, fontFace: FM, fontSize: 11,
      bold: true, color: p[2], charSpacing: 1.4, valign: "middle", margin: 0 });
    let yy = 4.12;
    p[1].forEach(function (t) {
      s.addShape(P.ShapeType.rect, { x: x + 0.30, y: yy + 0.09, w: 0.12, h: 0.12, fill: { color: p[2] } });
      s.addText(t, { x: x + 0.56, y: yy, w: w - 0.86, h: 0.32, fontFace: FB, fontSize: 13,
        color: i === 1 ? C.onDark : C.onDarkMute, valign: "middle", margin: 0 });
      yy += 0.45;
    });
    x += w + 0.34;
  });
}

{
  const s = slideLight("02", "AGRESSOR ATIVO · IDENTIFICAÇÃO", C.ativo, "É agressor ativo ou é crise com reféns?",
    "A classificação acompanha o comportamento do causador em tempo real — e pode mudar durante o mesmo evento.");
  const rows = [
    ["Produção de vítimas", "Contínua e em curso", "Cessada; ameaça de causar"],
    ["Intenção do causador", "Matar o maior número; sem pauta", "Barganhar, exigir, ser ouvido"],
    ["Comunicação", "Não busca contato", "Fala, exige, negocia"],
    ["Deslocamento", "Móvel, procura vítimas", "Estático, barricado"],
    ["Resposta correta", "Contato imediato", "Conter, isolar, negociar"]
  ];
  const cw = [3.5, 4.25, 4.25], rh = 0.53;
  let y = 2.35;
  const heads = ["INDICADOR", "AGRESSOR ATIVO → FICHA 02", "CRISE COM REFÉNS → FICHA 03"];
  let hx = ML;
  heads.forEach(function (hd, i) {
    s.addShape(P.ShapeType.rect, { x: hx, y: y, w: cw[i], h: 0.50,
      fill: { color: i === 1 ? C.ativo : (i === 2 ? C.gerente : C.ink) } });
    s.addText(hd, { x: hx + 0.20, y: y, w: cw[i] - 0.30, h: 0.50, fontFace: FM, fontSize: 10,
      bold: true, color: C.white, charSpacing: 0.8, valign: "middle", margin: 0 });
    hx += cw[i];
  });
  y += 0.50;
  rows.forEach(function (r, ri) {
    let x = ML;
    r.forEach(function (cell, ci) {
      s.addShape(P.ShapeType.rect, { x: x, y: y, w: cw[ci], h: rh,
        fill: { color: ri % 2 ? C.light : C.white }, line: { color: C.rule, width: 1 } });
      s.addText(cell, { x: x + 0.20, y: y, w: cw[ci] - 0.30, h: rh, fontFace: FB, fontSize: 13,
        bold: ri === 4, color: ri === 4 ? (ci === 1 ? C.ativo : (ci === 2 ? C.gerente : C.ink)) : C.ink,
        valign: "middle", margin: 0 });
      x += cw[ci];
    });
    y += rh;
  });
  callout(s, ML, y + 0.24, CW, "AS DUAS TRANSIÇÕES",
    "O agressor ativo que se barrica com reféns e passa a dialogar vira crise. O causador barricado que inicia execuções vira agressor ativo. Percebida a transição, ela é difundida ao COPOM de imediato — é ela que troca o protocolo.",
    C.ativo, 12.5);
}

{
  const s = slideLight("02", "AGRESSOR ATIVO · AÇÃO A e B", C.ativo, "Formação de contato e progressão", null);
  const w = (CW - 0.34) / 2;
  card(s, ML, 1.90, w, 4.55);
  card(s, ML + w + 0.34, 1.90, w, 4.55);
  cardTitle(s, ML + 0.28, 2.14, w - 0.56, "A · Formação de contato", C.ativo);
  steps(s, [
    "Constituir a equipe com o que há. A formação preferencial é de 3 a 4 policiais; havendo disparos em curso, a dupla é suficiente para iniciar o contato.",
    "Distribuir responsabilidade de 360°. Coluna, \"T\" ou losango conforme o ambiente, cada integrante com setor definido, incluindo retaguarda e planos superior e inferior.",
    "Anunciar-se ao COPOM. Ponto de entrada utilizado, composição da equipe e sentido de progressão — é o que permite às equipes seguintes entrar sem provocar fogo cruzado.",
    "Comando do incidente. O primeiro supervisor a chegar não entra: assume o comando, instala o Posto de Comando em área fria e organiza as equipes subsequentes."
  ], ML + 0.28, 2.62, w - 0.56, C.ativo, 12.5);
  cardTitle(s, ML + w + 0.62, 2.14, w - 0.56, "B · Progressão ao som dos disparos", C.ativo);
  steps(s, [
    "Ir ao som. A progressão é feita na direção dos disparos ou estampidos — é ali que a ameaça está produzindo vítimas.",
    "Silêncio não é fim. A pausa pode significar recarga, troca de posição, preparo de artefato ou busca de novas vítimas.",
    "Ultrapassar feridos. Não interromper a progressão para socorrer: marcar a posição, informar ao comando e seguir. O socorro é missão da equipe de resgate, sob escolta.",
    "Ultrapassar quem foge. Comandar mãos visíveis e canalizar as pessoas para a retaguarda, sem perder de vista que o agressor pode deslocar-se misturado a elas.",
    "Vencer aberturas com técnica. Fatiar o ângulo, evitar o vão da porta, deslocar-se de cobertura em cobertura.",
    "Artefato na rota. Aplicar de imediato as regras do Petardo — não tocar, não mover — e contornar, se houver via alternativa."
  ], ML + w + 0.62, 2.62, w - 0.56, C.ativo, 12);
}

{
  const s = slideLight("02", "AGRESSOR ATIVO · AÇÃO C", C.ativo, "Intervenção direta e consolidação", null);
  const items = [
    ["Identificação positiva antes do disparo", "Alvo identificado, visada segura, consciência do fundo e dos terceiros. Ambiente com policiais de folga, seguranças e civis armados eleva o risco de engano."],
    ["Presumir múltiplos agressores", "A neutralização de um não encerra o evento. A varredura continua até a declaração formal de ambiente controlado."],
    ["Consolidar o agressor contido", "Algemar, afastar armamento e revistar em busca de artefatos, colete explosivo ou dispositivos de iniciação — sem manipular o que parecer explosivo."],
    ["Zonas de trabalho", "Quente (ameaça direta), morna (ameaça possível) e fria (segura). A equipe de resgate opera na zona morna, sempre com escolta armada."],
    ["Corredor de extração", "Definir ponto de coleta de feridos e corredor protegido; acionar CBMDF e SAMU; triagem e evacuação por prioridade."],
    ["Preservar o local", "Contida a ameaça, congelar a cena para a perícia e registrar a sequência dos fatos enquanto a memória é recente."]
  ];
  const w = (CW - 2 * 0.24) / 3, h = 1.72;
  let x = ML, y = 2.00;
  items.forEach(function (it, i) {
    if (i === 3) { x = ML; y = 2.00 + h + 0.24; }
    card(s, x, y, w, h);
    s.addText(it[0], { x: x + 0.26, y: y + 0.20, w: w - 0.52, h: 0.52, fontFace: FT, fontSize: 14.5,
      bold: true, color: C.ativo, valign: "top", margin: 0 });
    s.addText(it[1], { x: x + 0.26, y: y + 0.74, w: w - 0.52, h: 0.84, fontFace: FB, fontSize: 12,
      color: C.ink, valign: "top", margin: 0 });
    x += w + 0.24;
  });
}

{
  const s = slideDark("A pressa não é emocional. É estatística.", "FICHA 02 · POR QUE O CONTATO É IMEDIATO", C.ativo);
  s.addShape(P.ShapeType.rect, { x: ML, y: 2.45, w: 5.2, h: 3.35, fill: { color: C.darkCard },
    line: { color: C.ativo, width: 1.75 } });
  s.addText("160", { x: ML + 0.4, y: 2.75, w: 4.4, h: 1.25, fontFace: FT, fontSize: 76, bold: true,
    color: C.ativo, valign: "middle", margin: 0 });
  s.addText("eventos de agressor ativo analisados pelo FBI nos Estados Unidos entre 2000 e 2013.",
    { x: ML + 0.4, y: 4.05, w: 4.4, h: 0.75, fontFace: FB, fontSize: 14, color: C.onDark, valign: "top", margin: 0 });
  s.addText("A maioria dos incidentes se encerra em poucos minutos, e boa parte termina antes da chegada da polícia.",
    { x: ML + 0.4, y: 4.85, w: 4.4, h: 0.75, fontFace: FB, fontSize: 13, italic: true,
      color: C.onDarkMute, valign: "top", margin: 0 });
  const pts = [
    "Cada minuto aguardando a formação ideal é convertido diretamente em vítimas.",
    "Foi esse dado que substituiu o modelo de conter e esperar pelo modelo de contato imediato.",
    "No DF, o cenário mais provável combina alta concentração de pessoas e edificação conhecida do agressor: unidades escolares, centros comerciais, terminais e órgãos públicos.",
    "Daí a integração com o policiamento escolar, a difusão de plantas e rotas de acesso e o treinamento de contato com efetivo reduzido."
  ];
  let yy = 2.60;
  pts.forEach(function (t) {
    const h = Math.max(0.32, estH(t, 5.9, 13.5));
    s.addShape(P.ShapeType.rect, { x: 6.35, y: yy + 0.09, w: 0.14, h: 0.14, fill: { color: C.ativo } });
    s.addText(t, { x: 6.68, y: yy - 0.02, w: 5.95, h: h, fontFace: FB, fontSize: 13.5,
      color: C.onDark, valign: "top", margin: 0 });
    yy += h + 0.24;
  });
}

/* =================================================================== */
/* FICHA 03                                                             */
/* =================================================================== */
divider("03", "Mapa mental integrado — Gerente × Petardo", C.gerente, [
  "Primeiro Interventor em Crise · Portaria PMDF nº 1.218/2021",
  "Primeira Resposta com Explosivos · Portaria Conjunta SSP nº 07/2019",
  "Núcleo comum, bifurcação por natureza da ameaça e reconvergência",
  "A única contradição direta: o emprego do rádio"
]);

{
  const s = slideLight("03", "MAPA MENTAL · ESTRUTURA", C.gerente, "Um só personagem, duas normas, uma bifurcação", null);
  const cxm = 6.65;
  // tronco
  s.addShape(P.ShapeType.rect, { x: cxm - 2.30, y: 1.80, w: 4.60, h: 0.62, fill: { color: C.ink } });
  s.addText("PRIMEIRO INTERVENTOR NO LOCAL", { x: cxm - 2.30, y: 1.80, w: 4.60, h: 0.62,
    fontFace: FT, fontSize: 14.5, bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });
  s.addShape(P.ShapeType.line, { x: cxm, y: 2.42, w: 0, h: 0.30,
    line: { color: C.ink, width: 2, endArrowType: "triangle" } });
  // nucleo comum
  s.addShape(P.ShapeType.rect, { x: 1.55, y: 2.72, w: 10.2, h: 1.30, fill: { color: C.white },
    line: { color: C.mute, width: 1.5, dashType: "dash" } });
  s.addText("NÚCLEO COMUM ÀS DUAS NORMAS", { x: 1.55, y: 2.84, w: 10.2, h: 0.28, fontFace: FM,
    fontSize: 10.5, bold: true, color: C.mute, align: "center", charSpacing: 1.6, valign: "middle", margin: 0 });
  const nucleo = [
    "1 · Não se tornar a próxima vítima", "4 · Comunicar e acionar a especializada",
    "2 · Isolar e controlar o perímetro", "5 · Não improvisar, não manipular",
    "3 · Preservar vidas antes do patrimônio", "6 · Preservar o local para a perícia"
  ];
  nucleo.forEach(function (t, i) {
    const col = i % 2, row = Math.floor(i / 2);
    s.addText(t, { x: 1.85 + col * 5.0, y: 3.18 + row * 0.27, w: 4.85, h: 0.26, fontFace: FB,
      fontSize: 12, color: C.ink, valign: "middle", margin: 0 });
  });
  s.addShape(P.ShapeType.line, { x: cxm, y: 4.02, w: 0, h: 0.28,
    line: { color: C.ink, width: 2, endArrowType: "triangle" } });
  // decisao
  s.addShape(P.ShapeType.diamond, { x: cxm - 1.65, y: 4.30, w: 3.30, h: 1.05,
    fill: { color: C.white }, line: { color: C.ink, width: 2 } });
  s.addText("QUAL É A AMEAÇA?", { x: cxm - 1.40, y: 4.30, w: 2.80, h: 1.05, fontFace: FT,
    fontSize: 12.5, bold: true, color: C.ink, align: "center", valign: "middle", margin: 0 });
  // ramos
  s.addShape(P.ShapeType.line, { x: 2.95, y: 4.82, w: cxm - 1.65 - 2.95, h: 0,
    line: { color: C.gerente, width: 2, endArrowType: "triangle" }, flipH: true });
  s.addShape(P.ShapeType.line, { x: cxm + 1.65, y: 4.82, w: 10.35 - (cxm + 1.65), h: 0,
    line: { color: C.petardo, width: 2, endArrowType: "triangle" } });
  s.addText("pessoa · refém · barricada", { x: 3.00, y: 4.50, w: 1.95, h: 0.26, fontFace: FB,
    fontSize: 10.5, color: C.mute, align: "center", valign: "middle", margin: 0 });
  s.addText("objeto · artefato suspeito", { x: 8.35, y: 4.50, w: 1.95, h: 0.26, fontFace: FB,
    fontSize: 10.5, color: C.mute, align: "center", valign: "middle", margin: 0 });

  s.addShape(P.ShapeType.rect, { x: 0.70, y: 4.45, w: 2.25, h: 0.74, fill: { color: C.gerente } });
  s.addText("OPERAÇÃO\nGERENTE", { x: 0.70, y: 4.45, w: 2.25, h: 0.74, fontFace: FT, fontSize: 13,
    bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });
  s.addShape(P.ShapeType.rect, { x: 10.35, y: 4.45, w: 2.25, h: 0.74, fill: { color: C.petardo } });
  s.addText("OPERAÇÃO\nPETARDO", { x: 10.35, y: 4.45, w: 2.25, h: 0.74, fontFace: FT, fontSize: 13,
    bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });

  // reconvergencia
  s.addShape(P.ShapeType.line, { x: cxm, y: 5.35, w: 0, h: 0.42,
    line: { color: C.ink, width: 2, endArrowType: "triangle" } });
  s.addShape(P.ShapeType.rect, { x: cxm - 2.55, y: 5.77, w: 5.10, h: 0.62, fill: { color: C.white },
    line: { color: C.ink, width: 2 } });
  s.addText("TRANSFERÊNCIA FORMAL AO BOPE", { x: cxm - 2.55, y: 5.77, w: 5.10, h: 0.62,
    fontFace: FT, fontSize: 13.5, bold: true, color: C.ink, align: "center", valign: "middle", margin: 0 });
  s.addText("o que se viu · o que se fez · o que não foi tocado", { x: cxm - 2.55, y: 6.42, w: 5.10,
    h: 0.28, fontFace: FB, fontSize: 11, italic: true, color: C.mute, align: "center", valign: "middle", margin: 0 });
  s.addNotes("O primeiro interventor nao resolve o evento critico: ele o estabiliza. Resolver e atribuicao do BOPE.");
}

{
  const s = slideLight("03", "MAPA MENTAL · RAMOS", C.gerente, "Tópicos conectores de cada ramo", null);
  const w = (CW - 0.34) / 2;
  card(s, ML, 1.88, w, 4.88);
  card(s, ML + w + 0.34, 1.88, w, 4.88);
  cardTitle(s, ML + 0.28, 2.12, w - 0.56, "Ramo A · Operação Gerente", C.gerente);
  s.addText("Portaria PMDF nº 1.218/2021", { x: ML + 0.28, y: 2.44, w: w - 0.56, h: 0.24,
    fontFace: FM, fontSize: 10, color: C.mute, valign: "middle", margin: 0 });
  bullets(s, [
    "Conter → impedir a expansão do evento e a produção de novas vítimas.",
    "Isolar → perímetro interno (crítico) e externo (segurança, PC, saúde, imprensa), com controle rígido de acesso.",
    "Negociar sem concessão de risco → ganhar tempo, escuta ativa, baixar o tom.",
    "Jamais conceder → arma, munição, droga, veículo de fuga, troca de refém por policial, deslocamento do causador com refém.",
    "Não prometer o que não se pode cumprir → o negociador invoca a autoridade superior para recusar sem romper o vínculo.",
    "Rádio ativo → difusão contínua ao COPOM; o fluxo de informação alimenta a decisão do gerente da crise."
  ], ML + 0.28, 2.76, w - 0.56, C.gerente, 11.5);
  cardTitle(s, ML + w + 0.62, 2.12, w - 0.56, "Ramo B · Operação Petardo", C.petardo);
  s.addText("Portaria Conjunta SSP nº 07/2019", { x: ML + w + 0.62, y: 2.44, w: w - 0.56, h: 0.24,
    fontFace: FM, fontSize: 10, color: C.mute, valign: "middle", margin: 0 });
  bullets(s, [
    "Não tocar, não mover → e também não cobrir, não molhar, não fotografar com flash, não revistar o volume.",
    "Silêncio eletrônico → desligar HT, celular e terminal de dados no raio de segurança; iniciadores por RF respondem à energia irradiada.",
    "Transmitir só à distância → afastar-se antes de acionar qualquer equipamento; alternativa: telefonia fixa distante ou mensageiro.",
    "Distância pelo volume aparente → artefato acoplado a veículo ou carga perigosa: calcular pelo conjunto, não pelo dispositivo.",
    "Fora da linha de visada → evacuar para trás de estrutura dura; fachadas envidraçadas viram estilhaço secundário.",
    "Presumir artefato secundário → dirigido à tropa que responde: varrer o ponto de concentração e o PC antes de ocupá-los."
  ], ML + w + 0.62, 2.76, w - 0.56, C.petardo, 11.5);
}

{
  const s = slideDark("As duas normas divergem em um único ponto", "FICHA 03 · A CONTRADIÇÃO", C.onDarkMute);
  s.addText("E é justamente esse ponto que costuma ser confundido sob pressão.", { x: ML, y: 2.10,
    w: 11.0, h: 0.42, fontFace: FB, fontSize: 17, italic: true, color: C.onDarkMute, valign: "middle", margin: 0 });
  s.addShape(P.ShapeType.rect, { x: ML, y: 2.85, w: 5.25, h: 1.55, fill: { color: C.darkCard },
    line: { color: C.gerente, width: 2 } });
  s.addText("RÁDIO ATIVO", { x: ML + 0.35, y: 3.05, w: 4.6, h: 0.5, fontFace: FT, fontSize: 26,
    bold: true, color: C.gerente, valign: "middle", margin: 0 });
  s.addText("Operação Gerente — difusão contínua ao COPOM alimenta a decisão do gerente da crise.",
    { x: ML + 0.35, y: 3.58, w: 4.6, h: 0.62, fontFace: FB, fontSize: 12.5, color: C.onDark, valign: "top", margin: 0 });

  s.addShape(P.ShapeType.rect, { x: 7.40, y: 2.85, w: 5.25, h: 1.55, fill: { color: C.darkCard },
    line: { color: C.petardo, width: 2 } });
  s.addText("SILÊNCIO ELETRÔNICO", { x: 7.75, y: 3.05, w: 4.6, h: 0.5, fontFace: FT, fontSize: 26,
    bold: true, color: C.petardo, valign: "middle", margin: 0 });
  s.addText("Operação Petardo — HT, celular e terminal desligados; transmitir apenas fora do raio de segurança.",
    { x: 7.75, y: 3.58, w: 4.6, h: 0.62, fontFace: FB, fontSize: 12.5, color: C.onDark, valign: "top", margin: 0 });

  s.addShape(P.ShapeType.line, { x: ML + 5.25, y: 3.62, w: 2.15, h: 0,
    line: { color: C.upm, width: 2.5, dashType: "dash", beginArrowType: "triangle", endArrowType: "triangle" } });

  s.addShape(P.ShapeType.rect, { x: ML, y: 4.75, w: CW, h: 1.55, fill: { color: C.upm } });
  s.addText("REGRA DE PREVALÊNCIA · AMEAÇA MISTA", { x: ML + 0.35, y: 4.88, w: 8.0, h: 0.30,
    fontFace: FM, fontSize: 11, bold: true, color: "FFD9D9", charSpacing: 1.6, valign: "middle", margin: 0 });
  s.addText("Se o causador alega portar ou porta artefato explosivo, prevalece o Petardo: afaste-se antes de transmitir.",
    { x: ML + 0.35, y: 5.20, w: CW - 0.70, h: 0.74, fontFace: FT, fontSize: 19, bold: true,
      color: C.white, valign: "middle", margin: 0 });
  s.addText("O dever de difusão imediata não desaparece — ele é deslocado no tempo e no espaço. Primeiro a distância, depois o rádio.",
    { x: ML + 0.35, y: 5.96, w: CW - 0.70, h: 0.30, fontFace: FB, fontSize: 12.5, color: "FFE3E3",
      valign: "middle", margin: 0 });
}

{
  const s = slideLight("03", "OPERAÇÃO PETARDO · EVACUAÇÃO", C.petardo, "Evacuar não é só afastar — é sair da linha de visada",
    "Distância sem massa interposta protege menos do que massa interposta a menor distância.");
  const gy = 5.00;
  s.addShape(P.ShapeType.line, { x: 1.05, y: gy, w: 11.2, h: 0, line: { color: C.ink, width: 1.5 } });
  s.addShape(P.ShapeType.line, { x: 1.85, y: gy - 1.70, w: 9.60, h: 1.42,
    line: { color: C.upm, width: 2, dashType: "dash", endArrowType: "triangle" }, flipV: true });
  s.addShape(P.ShapeType.rect, { x: 1.25, y: gy - 0.42, w: 0.55, h: 0.42, fill: { color: C.white },
    line: { color: C.upm, width: 2 } });
  s.addText("ARTEFATO", { x: 0.92, y: gy - 0.80, w: 1.5, h: 0.28, fontFace: FM, fontSize: 10,
    bold: true, color: C.upm, align: "center", valign: "middle", margin: 0 });
  s.addText("linha de visada — o estilhaço viaja em linha reta", { x: 4.20, y: 2.62, w: 5.60,
    h: 0.30, fontFace: FB, fontSize: 12, bold: true, color: C.upm, valign: "middle", margin: 0 });

  s.addShape(P.ShapeType.rect, { x: 5.05, y: gy - 1.30, w: 0.38, h: 1.30, fill: { color: C.ink } });
  s.addText("CONCRETO", { x: 4.35, y: 3.34, w: 1.8, h: 0.28, fontFace: FM, fontSize: 10,
    bold: true, color: C.ink, align: "center", valign: "middle", margin: 0 });
  s.addShape(P.ShapeType.ellipse, { x: 5.72, y: gy - 0.62, w: 0.26, h: 0.26,
    fill: { type: "none" }, line: { color: C.ok, width: 2 } });
  s.addShape(P.ShapeType.line, { x: 5.85, y: gy - 0.36, w: 0, h: 0.36, line: { color: C.ok, width: 2 } });
  s.addText("ABRIGO CORRETO", { x: 5.10, y: gy + 0.12, w: 2.3, h: 0.28, fontFace: FB, fontSize: 12,
    bold: true, color: C.ok, align: "center", valign: "middle", margin: 0 });
  s.addText("massa dura + fora da visada", { x: 5.10, y: gy + 0.40, w: 2.3, h: 0.26, fontFace: FB,
    fontSize: 11, color: C.mute, align: "center", valign: "middle", margin: 0 });

  s.addShape(P.ShapeType.line, { x: 9.70, y: gy - 1.45, w: 0, h: 1.45,
    line: { color: C.mute, width: 1.5, dashType: "dash" } });
  s.addText("VIDRO", { x: 9.05, y: 3.02, w: 1.3, h: 0.28, fontFace: FM, fontSize: 10, bold: true,
    color: C.mute, align: "center", valign: "middle", margin: 0 });
  s.addShape(P.ShapeType.ellipse, { x: 10.20, y: gy - 0.62, w: 0.26, h: 0.26,
    fill: { type: "none" }, line: { color: C.upm, width: 2 } });
  s.addShape(P.ShapeType.line, { x: 10.33, y: gy - 0.36, w: 0, h: 0.36, line: { color: C.upm, width: 2 } });
  s.addText("ABRIGO FALSO", { x: 9.60, y: gy + 0.12, w: 2.3, h: 0.28, fontFace: FB, fontSize: 12,
    bold: true, color: C.upm, align: "center", valign: "middle", margin: 0 });
  s.addText("a fachada vira estilhaço", { x: 9.60, y: gy + 0.40, w: 2.3, h: 0.26, fontFace: FB,
    fontSize: 11, color: C.mute, align: "center", valign: "middle", margin: 0 });

  s.addText("Corredores e saguões envidraçados, comuns em órgãos públicos e terminais do DF, funcionam como fonte de estilhaço secundário e não devem ser usados como ponto de concentração de evacuados.",
    { x: ML, y: 6.00, w: CW, h: 0.6, fontFace: FB, fontSize: 13, color: C.ink, valign: "top", margin: 0 });
}

{
  const s = slideLight("03", "OPERAÇÃO PETARDO · ISOLAMENTO", C.petardo, "Distâncias de referência para o isolamento inicial",
    "Na dúvida entre duas faixas, adote sempre a maior.");
  const cw = [5.4, 3.3, 3.3], rh = 0.50;
  const heads = ["VOLUME APARENTE", "EVACUAÇÃO DE EDIFICAÇÃO", "EVACUAÇÃO EM ÁREA ABERTA"];
  let y = 2.30, hx = ML;
  heads.forEach(function (hd, i) {
    s.addShape(P.ShapeType.rect, { x: hx, y: y, w: cw[i], h: 0.52, fill: { color: C.petardo } });
    s.addText(hd, { x: hx + 0.20, y: y, w: cw[i] - 0.30, h: 0.52, fontFace: FM, fontSize: 10,
      bold: true, color: C.white, charSpacing: 0.8, valign: "middle", margin: 0 });
    hx += cw[i];
  });
  y += 0.52;
  const rows = [
    ["Artefato tubular / pequeno volume", "21 m", "366 m"],
    ["Mochila / maleta", "46 m", "564 m"],
    ["Automóvel de passeio", "98 m", "457 m"],
    ["Van / utilitário de carga", "195 m", "838 m"],
    ["Caminhão de carga ou tanque", "378 m", "1.982 m"]
  ];
  rows.forEach(function (r, ri) {
    let x = ML;
    r.forEach(function (cell, ci) {
      s.addShape(P.ShapeType.rect, { x: x, y: y, w: cw[ci], h: rh,
        fill: { color: ri === 4 ? "FBF3DC" : (ri % 2 ? C.light : C.white) },
        line: { color: C.rule, width: 1 } });
      s.addText(cell, { x: x + 0.20, y: y, w: cw[ci] - 0.30, h: rh,
        fontFace: ci ? FM : FB, fontSize: ci ? 13 : 13, bold: ri === 4,
        color: ri === 4 ? C.petardo : C.ink, valign: "middle", margin: 0 });
      x += cw[ci];
    });
    y += rh;
  });
  callout(s, ML, y + 0.22, CW, "COMO LER ESTA TABELA",
    "Valores da tabela internacional de referência (ATF/NCTC), amplamente adotada no ensino policial brasileiro, apresentados como piso orientativo do isolamento inicial. Confirme os parâmetros fixados na Portaria Conjunta SSP nº 07/2019 e as instruções do Esquadrão Antibombas do BOPE.",
    C.petardo, 12.5);
}

/* =================================================================== */
/* FICHA 04 · CASO REAL                                                 */
/* =================================================================== */
divider("04", "Caso real no Distrito Federal", C.caso, [
  "Artefato explosivo em caminhão-tanque · 24 de dezembro de 2022",
  "Imediações do Aeroporto Internacional de Brasília",
  "Aplicação das medidas da Operação Petardo pela PMDF",
  "Resposta tática do Primeiro Interventor antes da chegada do Esquadrão de Bombas"
]);

{
  const s = slideLight("04", "CASO REAL · OS FATOS", C.caso, "Artefato em caminhão-tanque, véspera de Natal", null);
  card(s, ML, 1.90, 7.0, 2.65);
  s.addText("Na véspera do Natal de 2022, o motorista de um caminhão-tanque carregado de combustível de aviação, estacionado em via nas imediações do Aeroporto Internacional de Brasília, percebeu um objeto estranho acoplado à estrutura do veículo e acionou a polícia. Tratava-se de artefato explosivo com sistema de iniciação por radiofrequência, acionável por telefone celular. A área foi isolada e o Esquadrão Antibombas do BOPE/PMDF conduziu o reconhecimento e a neutralização do dispositivo. O autor foi identificado e preso ainda no mesmo dia e confessou a autoria.",
    { x: ML + 0.30, y: 2.16, w: 6.40, h: 2.15, fontFace: FB, fontSize: 13, color: C.ink, valign: "top", margin: 0 });
  const tres = [
    ["Iniciação por radiofrequência", "O rádio do próprio policial poderia funcionar como sinal de acionamento do artefato.", C.petardo],
    ["Carga secundária de altíssima energia", "O artefato era pequeno. O caminhão-tanque era a verdadeira bomba.", C.upm],
    ["Proximidade de infraestrutura crítica", "Aeroporto internacional, grande fluxo de pessoas e véspera de feriado.", C.caso]
  ];
  let ty = 1.90;
  tres.forEach(function (t) {
    card(s, ML + 7.30, ty, CW - 7.30, 1.44);
    s.addText(t[0], { x: ML + 7.56, y: ty + 0.18, w: CW - 7.82, h: 0.52, fontFace: FT, fontSize: 14,
      bold: true, color: t[2], valign: "top", margin: 0 });
    s.addText(t[1], { x: ML + 7.56, y: ty + 0.72, w: CW - 7.82, h: 0.56, fontFace: FB, fontSize: 11.5,
      color: C.ink, valign: "top", margin: 0 });
    ty += 1.58;
  });
  callout(s, ML, 4.82, 7.0, "POR QUE É O EXEMPLO DIDÁTICO PERFEITO",
    "Uma única ocorrência reúne as três circunstâncias que a Operação Petardo trata com maior rigor — e que, isoladas, já bastariam para justificar o protocolo.",
    C.caso, 12.5);
  s.addNotes("A sequencia dos slides seguintes reconstitui tecnicamente a atuacao exigida do primeiro interventor pela Portaria Conjunta SSP 07/2019, aplicada aos fatos publicos do caso.");
}

function casoTimeline(titulo, sub, itens) {
  const s = slideLight("04", "CASO REAL · PRIMEIRO INTERVENTOR", C.caso, titulo, sub);
  let y = 2.16;
  itens.forEach(function (it) {
    const bodyH = Math.max(0.44, estH(it[2], 8.85, 12.5));
    const h = bodyH + 0.46;
    s.addShape(P.ShapeType.rect, { x: ML, y: y, w: CW, h: h, fill: { color: C.white },
      line: { color: C.rule, width: 1 } });
    s.addShape(P.ShapeType.rect, { x: ML, y: y, w: 1.32, h: h, fill: { color: C.caso } });
    s.addText(it[0], { x: ML, y: y, w: 1.32, h: h, fontFace: FM, fontSize: 12, bold: true,
      color: C.white, align: "center", valign: "middle", margin: 0 });
    s.addText(it[1], { x: ML + 1.56, y: y + 0.10, w: 8.85, h: 0.30, fontFace: FT, fontSize: 14.5,
      bold: true, color: C.ink, valign: "middle", margin: 0 });
    s.addText(it[2], { x: ML + 1.56, y: y + 0.42, w: 8.85, h: bodyH, fontFace: FB, fontSize: 12.5,
      color: C.ink, valign: "top", margin: 0 });
    s.addText(it[3], { x: ML + 10.55, y: y + 0.10, w: 1.35, h: h - 0.20, fontFace: FM, fontSize: 9.5,
      color: C.caso, align: "right", valign: "middle", margin: 0 });
    y += h + 0.12;
  });
  return s;
}

const CASO = [
  ["T+0", "Recebimento e não aproximação",
    "A guarnição interrompe o deslocamento a distância segura e conduz avaliação visual e à distância. Nenhum policial se aproxima para conferir se é mesmo uma bomba — a confirmação não é atribuição do interventor.",
    "não tocar\nnão mover"],
  ["T+1 min", "Silêncio eletrônico imediato",
    "Rádio HT, telefones celulares e terminais de dados desligados no raio de segurança. Aqui a regra deixa de ser precaução doutrinária: o dispositivo tinha iniciação por radiofrequência, e uma única transmissão nas proximidades poderia atuar como sinal de acionamento.",
    "silêncio de RF"],
  ["T+2 min", "Proibição de mover o veículo",
    "O impulso natural — afastar o caminhão da área — é vedado. Movimentar veículo com artefato acoplado o submete a vibração e a possíveis chaves inerciais ou anti-remoção. O veículo permanece onde está; quem se move é a população.",
    "não mover"],
  ["T+4 min", "Isolamento dimensionado pelo conjunto",
    "A distância de segurança não é calculada pelo tamanho do artefato, e sim pelo conjunto artefato + carga: um tanque de combustível de aviação impõe a faixa de isolamento de caminhão-tanque, com risco adicional de incêndio e de ruptura do reservatório sob pressão.",
    "distância pelo\nconjunto"],
  ["T+6 min", "Evacuação fora da linha de visada",
    "Retirada de pedestres, ocupantes de veículos e trabalhadores das imediações, direcionando-os para trás de estruturas rígidas e para fora do eixo direto do artefato — evitando saguões, passarelas e fachadas envidraçadas como pontos de concentração.",
    "preservação\nde vidas"],
  ["T+8 min", "Bloqueio viário e controle de acesso",
    "Interdição das vias de aproximação com viaturas posicionadas fora do perímetro, controle de entrada e saída, registro de quem já estava no local e canalização do tráfego por rota alternativa. Em véspera de feriado, com fluxo aeroportuário intenso, controlar trânsito é preservar vidas.",
    "isolamento do\nperímetro"],
  ["T+10 min", "Varredura do ponto de concentração",
    "Antes de instalar o ponto de reunião da tropa e o Posto de Comando, inspeção visual da área escolhida: presume-se artefato secundário dirigido contra quem responde à ocorrência. O PC não é montado no ponto óbvio nem na linha de visada do dispositivo.",
    "artefato\nsecundário"],
  ["T+12 min", "Difusão à distância e acionamento integrado",
    "Já fora do raio de segurança, difusão ao COPOM com localização, descrição do artefato observada à distância, natureza da carga e dimensão do perímetro. Acionamento do Esquadrão Antibombas do BOPE e, de forma articulada, de CBMDF, SAMU, PCDF, administração aeroportuária e Polícia Federal.",
    "acionamento da\nespecializada"],
  ["T+n", "Manutenção e transferência formal",
    "Perímetro mantido sem alteração, preservação de imagens de videomonitoramento e identificação de testemunhas. Com a chegada do Esquadrão: o que se viu, o que se fez, o que não foi tocado e quem esteve dentro do perímetro.",
    "transferência\nao BOPE"]
];
[
  ["Resposta tática do Primeiro Interventor · 1 de 3", "Reconstituição à luz da Portaria Conjunta SSP nº 07/2019, no intervalo entre o acionamento e a chegada do Esquadrão."],
  ["Resposta tática do Primeiro Interventor · 2 de 3", "Dimensionamento do isolamento pelo conjunto artefato + carga e evacuação da área."],
  ["Resposta tática do Primeiro Interventor · 3 de 3", "Proteção contra artefato secundário, difusão à distância e transferência de responsabilidade."]
].forEach(function (cab, k) {
  casoTimeline(cab[0], cab[1], CASO.slice(k * 3, k * 3 + 3));
});

{
  const s = slideLight("04", "CASO REAL · RESULTADO", C.caso, "Proteção do patrimônio e recorrência do cenário no DF", null);
  const w = (CW - 0.34) / 2;
  card(s, ML, 1.95, w, 3.05);
  cardTitle(s, ML + 0.28, 2.20, w - 0.56, "Como o patrimônio foi protegido", C.caso);
  bullets(s, [
    "Pela contenção da detonação secundária: impedir a movimentação do tanque e afastar fontes de ignição evitou que um artefato de pequeno porte se convertesse em evento de grandes proporções.",
    "Pela interrupção de serviços de risco: articulação com concessionárias e com a administração aeroportuária para suspender operações e fluxos na área afetada.",
    "Pela integridade da prova: a não manipulação do artefato preservou vestígios que sustentaram a identificação e a responsabilização do autor."
  ], ML + 0.28, 2.68, w - 0.56, C.caso, 12.5);

  card(s, ML + w + 0.34, 1.95, w, 3.05);
  cardTitle(s, ML + w + 0.62, 2.20, w - 0.56, "Não é hipótese remota de manual", C.upm);
  bullets(s, [
    "13 de novembro de 2024 — detonação de artefatos na Praça dos Três Poderes, diante do STF, e localização de veículo com material explosivo nas imediações.",
    "8 de janeiro de 2023 — invasão e depredação das sedes dos três Poderes, com falhas concentradas na fase de pré-confrontação.",
    "24 de dezembro de 2022 — o caso analisado, nas imediações do aeroporto."
  ], ML + w + 0.62, 2.68, w - 0.56, C.upm, 12.5);

  callout(s, ML, 5.20, CW, "A LIÇÃO QUE OS TRÊS CASOS REPETEM",
    "Em Brasília, a Operação Petardo é ocorrência recorrente em área de altíssima densidade institucional. O que separou o caso de dezembro de 2022 dos demais não foi a sorte: foi a disciplina do primeiro interventor em não tocar, não mover e não transmitir.",
    C.caso, 13);
}

/* =================================================================== */
/* FICHA 05 · QUIZ                                                      */
/* =================================================================== */
divider("05", "Quiz — quatro questões com gabarito comentado", C.ativo, [
  "Base: Plano de Defesa da UPM (Novo Cangaço / domínio de cidades)",
  "Base: Instrução Normativa EM nº 11/2023 — POP do Agressor Ativo",
  "Cada questão é seguida do gabarito comentado e fundamentado",
  "Q1 e Q2 · Defesa da UPM     Q3 e Q4 · Agressor Ativo"
]);

function quizQ(n, base, enunciado, alts, accent) {
  const s = slideLight("05", "QUIZ · QUESTÃO " + n + " · " + base, accent, "Questão " + n, null);
  card(s, ML, 1.86, CW, 1.15);
  s.addText(enunciado, { x: ML + 0.30, y: 1.98, w: CW - 0.60, h: 0.92, fontFace: FB, fontSize: 13.5,
    color: C.ink, valign: "top", margin: 0 });
  let y = 3.18;
  alts.forEach(function (a) {
    const h = Math.max(0.60, estH(a[1], CW - 1.30, 12.5) + 0.16);
    s.addShape(P.ShapeType.rect, { x: ML, y: y, w: CW, h: h, fill: { color: C.white },
      line: { color: C.rule, width: 1 } });
    s.addShape(P.ShapeType.rect, { x: ML + 0.24, y: y + (h - 0.34) / 2, w: 0.34, h: 0.34,
      fill: { color: C.light }, line: { color: C.mute, width: 1 } });
    s.addText(a[0], { x: ML + 0.24, y: y + (h - 0.34) / 2, w: 0.34, h: 0.34, fontFace: FM,
      fontSize: 11, bold: true, color: C.ink, align: "center", valign: "middle", margin: 0 });
    s.addText(a[1], { x: ML + 0.76, y: y, w: CW - 1.06, h: h, fontFace: FB, fontSize: 12.5,
      color: C.ink, valign: "middle", margin: 0 });
    y += h + 0.10;
  });
  return s;
}
function quizA(n, letra, accent, texto, porque, fundamento) {
  const s = slideLight("05", "QUIZ · GABARITO DA QUESTÃO " + n, accent, "Gabarito comentado", null);
  s.addShape(P.ShapeType.rect, { x: ML, y: 1.86, w: 1.50, h: 0.86, fill: { color: C.ok } });
  s.addText(letra, { x: ML, y: 1.86, w: 1.50, h: 0.86, fontFace: FT, fontSize: 36, bold: true,
    color: C.white, align: "center", valign: "middle", margin: 0 });
  s.addText("ALTERNATIVA CORRETA", { x: ML + 1.78, y: 1.86, w: 6.0, h: 0.30, fontFace: FM,
    fontSize: 10.5, bold: true, color: C.ok, charSpacing: 1.4, valign: "middle", margin: 0 });
  const tw = CW - 1.78;
  const th = Math.max(0.80, estH(texto, tw, 13));
  s.addText(texto, { x: ML + 1.78, y: 2.18, w: tw, h: th, fontFace: FB, fontSize: 13,
    color: C.ink, valign: "top", margin: 0 });

  let cardY = Math.max(2.18 + th + 0.22, 2.94);
  const rows = porque.map(function (p) {
    return Math.max(0.30, estH(p[1], CW - 1.16, 12.5));
  });
  const cardH = 0.46 + rows.reduce(function (a, b) { return a + b + 0.09; }, 0) + 0.10;
  card(s, ML, cardY, CW, cardH);
  s.addText("POR QUE AS DEMAIS FALHAM", { x: ML + 0.30, y: cardY + 0.12, w: CW - 0.60, h: 0.28,
    fontFace: FM, fontSize: 10.5, bold: true, color: C.upm, charSpacing: 1.4, valign: "middle", margin: 0 });
  let y = cardY + 0.50;
  porque.forEach(function (p, i) {
    s.addShape(P.ShapeType.rect, { x: ML + 0.30, y: y + 0.01, w: 0.30, h: 0.26, fill: { color: C.upm } });
    s.addText(p[0], { x: ML + 0.30, y: y + 0.01, w: 0.30, h: 0.26, fontFace: FM, fontSize: 10,
      bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });
    s.addText(p[1], { x: ML + 0.74, y: y - 0.03, w: CW - 1.16, h: rows[i], fontFace: FB, fontSize: 12.5,
      color: C.ink, valign: "top", margin: 0 });
    y += rows[i] + 0.09;
  });

  const fh = Math.max(0.34, estH(fundamento, CW - 0.60, 12));
  const bandY = Math.min(cardY + cardH + 0.20, 7.00 - (fh + 0.46));
  s.addShape(P.ShapeType.rect, { x: ML, y: bandY, w: CW, h: fh + 0.46, fill: { color: C.ink } });
  s.addText("FUNDAMENTO", { x: ML + 0.30, y: bandY + 0.08, w: 2.5, h: 0.24, fontFace: FM, fontSize: 10,
    bold: true, color: C.onDarkMute, charSpacing: 1.4, valign: "middle", margin: 0 });
  s.addText(fundamento, { x: ML + 0.30, y: bandY + 0.34, w: CW - 0.60, h: fh, fontFace: FB,
    fontSize: 12, color: C.onDark, valign: "top", margin: 0 });
  return s;
}

quizQ(1, "DEFESA DA UPM",
  "Durante o serviço noturno, a UPM passa a receber disparos de fuzil vindos de posição não identificada. Simultaneamente, o COPOM informa alarme disparado em agência bancária a 3 km. Há duas guarnições disponíveis no quartel. Qual conduta atende ao Plano de Defesa da UPM?",
  [
    ["A", "Deslocar imediatamente uma das guarnições para a agência e manter a outra na defesa do quartel, dividindo a resposta entre os dois pontos."],
    ["B", "Sair com as duas guarnições em perseguição à origem dos disparos, para identificar e neutralizar os atiradores antes que ampliem o ataque."],
    ["C", "Manter a tropa reunida no dispositivo de defesa da UPM, difundir imediatamente a situação ao COPOM e aguardar a articulação do reforço, tratando o ataque como fixação da resposta policial."],
    ["D", "Cessar as transmissões de rádio para não revelar posição e aguardar em silêncio o amanhecer, quando o efetivo do turno seguinte assumirá."]
  ], C.upm);

quizA(1, "C", C.upm,
  "O ataque ao quartel simultâneo a alarme em instituição financeira é a assinatura clássica do Novo Cangaço: o fogo contra a UPM não busca conquistá-la, mas fixá-la — prendê-la ao solo enquanto o golpe principal se desenvolve em outro ponto. A resposta correta preserva o dispositivo defensivo, difunde os dados para que o sistema articule reforço em bloco e evita entregar guarnições isoladas ao terreno preparado pelo atacante.",
  [
    ["A", "Produz exatamente o efeito perseguido pelo agressor: fraciona a tropa e envia uma guarnição em inferioridade contra grupo com armamento de guerra."],
    ["B", "Agrava — abandona a instalação, a reserva de armamento e os custodiados, e lança a tropa em movimento contra posição de tiro não identificada, provavelmente preparada como emboscada."],
    ["D", "Confunde disciplina de rede com silêncio. A difusão imediata ao COPOM é obrigatória; o que se restringe é a transmissão em claro do dispositivo de resposta, não o relato do que está acontecendo."]
  ],
  "Plano de Defesa da UPM — autoproteção das instalações, vedação ao fracionamento da tropa e difusão imediata de dados ao COPOM pela rede de rádio.");

quizQ(2, "DEFESA DA UPM",
  "Confirmado o roubo a instituição financeira com fuga de quatro veículos, o comando determina o cerco. Sobre o posicionamento das equipes nos pontos de estrangulamento, assinale a conduta tecnicamente correta.",
  [
    ["A", "Atravessar as viaturas na pista, com os policiais abrigados atrás das portas e do compartimento do motor, formando barreira física no eixo da via."],
    ["B", "Ocupar o ponto de passagem obrigatória com antecedência, buscando distância superior ao alcance eficaz do fuzil, cobertura dura e observação em enfiada da via, com plano de fogo e de evasão definidos."],
    ["C", "Seguir a coluna criminosa a curta distância, mantendo contato visual e transmitindo pelo rádio a posição em tempo real até a chegada do apoio aéreo."],
    ["D", "Concentrar todas as equipes disponíveis no primeiro anel, junto à agência, por ser o ponto de maior probabilidade de reencontro com os criminosos."]
  ], C.upm);

quizA(2, "B", C.upm,
  "O cerco produz resultado por interceptação em profundidade, não por perseguição. A eficácia depende de três fatores combinados: chegar ao ponto obrigatório antes, permanecer fora do alcance eficaz do armamento do oponente e dispor de cobertura dura com setor de tiro definido — além do plano de evasão, porque a equipe de cerco pode ser a parte em desvantagem numérica.",
  [
    ["A", "Repousa sobre um erro difundido: a viatura não é blindagem. Lataria, vidro e portas não detêm projétil de fuzil, e a viatura atravessada converte a equipe em alvo iluminado e previsível."],
    ["C", "É a perseguição em coluna — entrega a iniciativa, expõe a guarnição a emboscada preparada na rota de fuga e ainda transmite em claro a posição das equipes, presumindo-se a rede monitorada."],
    ["D", "Desperdiça meios no anel onde os criminosos já não estão, deixando desguarnecidos exatamente os pontos por onde terão de passar."]
  ],
  "Plano de Defesa da UPM — estabelecimento do cerco nos pontos de estrangulamento das vias de acesso e saída; escalonamento em anéis de contenção.");

quizQ(3, "AGRESSOR ATIVO",
  "Guarnição composta por dois policiais chega a um centro comercial onde se ouvem disparos sucessivos. No hall de entrada há três feridos caídos e dezenas de pessoas correndo em direção à equipe. Conforme o POP do Agressor Ativo (IN EM nº 11/2023), a conduta correta é:",
  [
    ["A", "Prestar os primeiros socorros aos feridos do hall, por serem vítimas já identificadas e de risco imediato de morte, e aguardar equipe de reforço para a progressão."],
    ["B", "Estabelecer perímetro no acesso principal, conter a saída das pessoas para triagem e iniciar contato verbal a fim de negociar a rendição do agressor."],
    ["C", "Aguardar a formação mínima de quatro policiais, por vedação ao contato com efetivo reduzido, mantendo a guarnição na entrada."],
    ["D", "Formar contato com a dupla disponível e progredir em direção ao som dos disparos, ultrapassando feridos e pessoas em fuga, com o objetivo de conter a ameaça e cessar a produção de vítimas."]
  ], C.ativo);

quizA(3, "D", C.ativo,
  "Enquanto há produção contínua de vítimas, a única missão da primeira equipe é cessar os disparos: interromper a fonte do dano salva mais vidas do que atender qualquer vítima individual, porque cada minuto de atraso soma novas vítimas. Daí as duas condutas mais contraintuitivas da doutrina — ultrapassar feridos, cuja posição é marcada e informada para socorro pela equipe de resgate sob escolta, e ultrapassar quem foge, canalizando as pessoas para a retaguarda sem interromper a progressão.",
  [
    ["A", "Converte a equipe de contato em equipe de socorro e deixa o agressor livre para prosseguir produzindo vítimas."],
    ["B", "Aplica ao agressor ativo o protocolo do evento com reféns: isolar e negociar só faz sentido quando a produção de vítimas cessou e há causador disposto a barganhar."],
    ["C", "Inverte a regra — a formação de 3 a 4 policiais é preferencial, não condição. Havendo disparos em curso, a dupla inicia o contato."]
  ],
  "IN EM nº 11/2023 — protocolo de formação de contato, progressão tática imediata em direção ao som dos disparos e ação de intervenção direta para conter a ameaça e salvar vidas.");

quizQ(4, "AGRESSOR ATIVO",
  "Durante a progressão, o agressor recolhe-se a uma sala com quatro pessoas, tranca a porta, cessa os disparos e passa a gritar exigências, afirmando que \"vai explodir tudo\". Qual é a conduta correta da equipe de contato?",
  [
    ["A", "Interromper a progressão, conter e isolar o ambiente, comunicar de imediato a mudança de natureza do evento e adotar as regras de radiofrequência aplicáveis à ameaça de explosivo, aguardando a especializada."],
    ["B", "Manter a progressão e invadir a sala de imediato, pois uma vez iniciado o protocolo de agressor ativo ele deve ser levado até a neutralização da ameaça."],
    ["C", "Recuar toda a equipe para fora da edificação e liberar o perímetro interno, transferindo integralmente o evento ao comando, sem manter contato visual com o acesso."],
    ["D", "Iniciar de pronto a negociação das exigências, concedendo o que for necessário para evitar a detonação, inclusive meio de transporte para a saída do agressor."]
  ], C.ativo);

quizA(4, "A", C.ativo,
  "O evento mudou de natureza duas vezes na mesma cena. Ao cessar a produção de vítimas, barricar-se e formular exigências, o agressor deixou de ser agressor ativo e passou a ser causador de evento crítico com reféns, o que desloca a resposta para conter, isolar e negociar. Ao mesmo tempo, a menção a explosivo faz incidir a regra de radiofrequência da Operação Petardo, que prevalece sobre o dever de difusão imediata: afasta-se primeiro, transmite-se depois.",
  [
    ["B", "Trata o protocolo como trilho. A classificação acompanha o comportamento do causador em tempo real, e invadir ambiente barricado com reféns e ameaça de artefato é a alternativa de maior risco e menor reversibilidade, reservada à tropa especializada."],
    ["C", "Abandona a contenção: perder o controle do acesso permite deslocamento do causador, fuga misturada às vítimas ou reinício das execuções."],
    ["D", "Viola o núcleo da negociação policial — não há concessão de itens que criem risco novo ou transfiram poder ao causador, e meio de fuga com refém é vedação expressa."]
  ],
  "IN EM nº 11/2023, quanto à identificação e à transição do evento; Portaria PMDF nº 1.218/2021 (Operação Gerente), quanto à contenção, ao isolamento e à negociação sem concessões de risco; Portaria Conjunta SSP nº 07/2019 (Operação Petardo), quanto ao silêncio eletrônico.");

/* =================================================================== */
/* CONCLUSÃO                                                            */
/* =================================================================== */
{
  const s = slideDark("Conclusão", "SÍNTESE", C.onDarkMute);
  s.addText("Não são quatro assuntos. São quatro respostas mutuamente excludentes à mesma pergunta inicial.",
    { x: ML, y: 2.05, w: 11.6, h: 0.62, fontFace: FB, fontSize: 18, italic: true, color: C.onDarkMute,
      valign: "middle", margin: 0 });
  const tres = [
    ["Autoproteção viabiliza a missão", "O interventor que se torna vítima subtrai um socorrista e acrescenta uma ocorrência. Proteger-se não concorre com a missão — é o que a torna possível.", C.upm],
    ["Estabilizar, não resolver", "O primeiro interventor não resolve o evento crítico: ele o estabiliza. A pressa em resolver sozinho é a origem mais frequente do desastre.", C.gerente],
    ["Informação disciplinada", "Difundir cedo e com disciplina vale mais do que qualquer ação isolada — ressalvado o único caso em que a transmissão é, ela própria, o perigo.", C.petardo]
  ];
  let x = ML;
  const w = (CW - 2 * 0.28) / 3;
  tres.forEach(function (t) {
    s.addShape(P.ShapeType.rect, { x: x, y: 2.95, w: w, h: 2.15, fill: { color: C.darkCard },
      line: { color: C.darkRule, width: 1 } });
    s.addShape(P.ShapeType.rect, { x: x + 0.28, y: 3.20, w: 0.16, h: 0.16, fill: { color: t[2] } });
    s.addText(t[0], { x: x + 0.28, y: 3.44, w: w - 0.56, h: 0.56, fontFace: FT, fontSize: 16,
      bold: true, color: C.onDark, valign: "top", margin: 0 });
    s.addText(t[1], { x: x + 0.28, y: 4.02, w: w - 0.56, h: 0.92, fontFace: FB, fontSize: 12.5,
      color: C.onDarkMute, valign: "top", margin: 0 });
    x += w + 0.28;
  });
  s.addShape(P.ShapeType.rect, { x: ML, y: 5.42, w: CW, h: 1.10, fill: { color: C.darkCard },
    line: { color: C.ativo, width: 2 } });
  s.addText("Eventos críticos são vencidos ou perdidos muito antes de começarem — na fase em que ninguém está olhando: a do treinamento, do plano ensaiado e do equipamento conferido.",
    { x: ML + 0.34, y: 5.42, w: CW - 0.68, h: 1.10, fontFace: FT, fontSize: 17, bold: true,
      color: C.onDark, valign: "middle", margin: 0 });
}

/* =================================================================== */
/* NOTA DE USO                                                          */
/* =================================================================== */
{
  const s = slideLight(null, null, null, "Nota de uso e fontes", null);
  const w = (CW - 0.34) / 2;
  card(s, ML, 1.55, w, 4.35);
  cardTitle(s, ML + 0.30, 1.82, w - 0.60, "Alcance deste material", C.upm);
  bullets(s, [
    "Material didático de consulta rápida. Não substitui o texto integral do Plano de Defesa da UPM, da IN EM nº 11/2023, da Portaria PMDF nº 1.218/2021 e da Portaria Conjunta SSP nº 07/2019.",
    "Os procedimentos foram organizados a partir da doutrina consolidada de gerenciamento de crises, primeira resposta a explosivos e resposta a agressor ativo.",
    "Confira numeração de itens, distâncias e atribuições diretamente nos normativos vigentes e nas instruções do Esquadrão Antibombas do BOPE antes de empregar em instrução formal."
  ], ML + 0.30, 2.28, w - 0.60, C.upm, 12.5);

  card(s, ML + w + 0.34, 1.55, w, 4.35);
  cardTitle(s, ML + w + 0.64, 1.82, w - 0.60, "Fontes de apoio", C.gerente);
  bullets(s, [
    "Plano de Defesa da Unidade Policial Militar — PMDF.",
    "Instrução Normativa EM nº 11/2023 — POP do Agressor Ativo.",
    "Portaria PMDF nº 1.218/2021 — Operação Gerente.",
    "Portaria Conjunta SSP nº 07/2019 — Operação Petardo.",
    "Distâncias de evacuação: tabela de referência ATF/NCTC.",
    "Duração de eventos de agressor ativo: estudo do FBI sobre incidentes ocorridos nos Estados Unidos entre 2000 e 2013.",
    "Lei nº 13.060/2014 e Portaria Interministerial nº 4.226/2010 — uso diferenciado da força."
  ], ML + w + 0.64, 2.28, w - 0.60, C.gerente, 12.5);

  s.addText("Polícia Militar do Distrito Federal — ficha de pronto emprego para o serviço operacional.",
    { x: ML, y: 6.20, w: CW, h: 0.3, fontFace: FM, fontSize: 10, color: C.mute, margin: 0 });
}

/* ---------- numeração ---------- */
P.slides.forEach(function (s, i) {
  if (i === 0) return;
  const darkBg = s.background && (s.background.color === C.dark || s.background.color === C.deeper);
  s.addText(String(i + 1).padStart(2, "0"), { x: 12.10, y: 6.86, w: 0.55, h: 0.28,
    fontFace: FM, fontSize: 9.5, color: darkBg ? C.onDarkMute : C.mute, align: "right",
    valign: "middle", margin: 0 });
});

P.writeFile({ fileName: process.argv[2] }).then(function (f) {
  console.log("OK ->", f, "| slides:", P.slides.length);
});
