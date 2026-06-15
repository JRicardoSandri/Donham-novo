const spell = (id, name, circle, school, classes, castingTime, range, duration, options = {}) => ({
  id, name, circle, school, classes, castingTime, range, duration,
  concentration: false,
  ritual: false,
  source: 'OFICIAL',
  summary: '',
  ...options,
});

export const SPELL_SCHOOLS = [
  'Todas', 'Abjuração', 'Adivinhação', 'Conjuração', 'Encantamento',
  'Evocação', 'Ilusão', 'Necromancia', 'Transmutação',
];

export const SPELLS = [
  spell('acid-splash', 'Espirro Ácido', 0, 'Conjuração', ['Feiticeiro', 'Mago'], '1 ação', '18 m', 'Instantânea', { summary: 'Ácido atinge uma ou duas criaturas próximas.' }),
  spell('eldritch-blast', 'Rajada Mística', 0, 'Evocação', ['Bruxo'], '1 ação', '36 m', 'Instantânea', { summary: 'Ataque mágico à distância que causa dano de energia.' }),
  spell('fire-bolt', 'Raio de Fogo', 0, 'Evocação', ['Feiticeiro', 'Mago'], '1 ação', '36 m', 'Instantânea', { summary: 'Ataque mágico à distância que causa dano de fogo.' }),
  spell('guidance', 'Orientação', 0, 'Adivinhação', ['Clérigo', 'Druida'], '1 ação', 'Toque', '1 minuto', { concentration: true, summary: 'Concede 1d4 a um teste de habilidade.' }),
  spell('light', 'Luz', 0, 'Evocação', ['Bardo', 'Clérigo', 'Feiticeiro', 'Mago'], '1 ação', 'Toque', '1 hora', { summary: 'Faz um objeto emitir luz.' }),
  spell('mage-hand', 'Mãos Mágicas', 0, 'Conjuração', ['Bardo', 'Bruxo', 'Feiticeiro', 'Mago'], '1 ação', '9 m', '1 minuto', { summary: 'Cria uma mão espectral para manipular objetos.' }),
  spell('minor-illusion', 'Ilusão Menor', 0, 'Ilusão', ['Bardo', 'Bruxo', 'Feiticeiro', 'Mago'], '1 ação', '9 m', '1 minuto', { summary: 'Cria um som ou imagem ilusória pequena.' }),
  spell('sacred-flame', 'Chama Sagrada', 0, 'Evocação', ['Clérigo'], '1 ação', '18 m', 'Instantânea', { summary: 'Energia radiante atinge uma criatura visível.' }),
  spell('thaumaturgy', 'Taumaturgia', 0, 'Transmutação', ['Clérigo'], '1 ação', '9 m', '1 minuto', { summary: 'Produz uma pequena manifestação sobrenatural.' }),
  spell('vicious-mockery', 'Zombaria Viciosa', 0, 'Encantamento', ['Bardo'], '1 ação', '18 m', 'Instantânea', { summary: 'Insulto encantado causa dano psíquico e desvantagem.' }),

  spell('armor-of-agathys', 'Armadura de Agathys', 1, 'Abjuração', ['Bruxo'], '1 ação', 'Pessoal', '1 hora', { summary: 'Concede PV temporários e fere atacantes próximos.' }),
  spell('bless', 'Bênção', 1, 'Encantamento', ['Clérigo', 'Paladino'], '1 ação', '9 m', '1 minuto', { concentration: true, summary: 'Aliados somam 1d4 em ataques e salvaguardas.' }),
  spell('burning-hands', 'Mãos Flamejantes', 1, 'Evocação', ['Feiticeiro', 'Mago'], '1 ação', 'Cone de 4,5 m', 'Instantânea', { summary: 'Cone de chamas causa dano de fogo.' }),
  spell('cure-wounds', 'Curar Ferimentos', 1, 'Evocação', ['Bardo', 'Clérigo', 'Druida', 'Paladino', 'Patrulheiro'], '1 ação', 'Toque', 'Instantânea', { summary: 'Restaura pontos de vida de uma criatura.' }),
  spell('detect-magic', 'Detectar Magia', 1, 'Adivinhação', ['Bardo', 'Clérigo', 'Druida', 'Feiticeiro', 'Mago', 'Paladino', 'Patrulheiro'], '1 ação', 'Pessoal', '10 minutos', { concentration: true, ritual: true, summary: 'Percebe magia próxima e identifica sua escola.' }),
  spell('faerie-fire', 'Fogo das Fadas', 1, 'Evocação', ['Bardo', 'Druida'], '1 ação', '18 m', '1 minuto', { concentration: true, summary: 'Contorna alvos com luz e facilita ataques contra eles.' }),
  spell('healing-word', 'Palavra Curativa', 1, 'Evocação', ['Bardo', 'Clérigo', 'Druida'], '1 ação bônus', '18 m', 'Instantânea', { summary: 'Cura uma criatura à distância.' }),
  spell('hex', 'Bruxaria', 1, 'Encantamento', ['Bruxo'], '1 ação bônus', '27 m', '1 hora', { concentration: true, summary: 'Amaldiçoa um alvo e aumenta o dano contra ele.' }),
  spell('hunters-mark', 'Marca do Caçador', 1, 'Adivinhação', ['Patrulheiro'], '1 ação bônus', '27 m', '1 hora', { concentration: true, summary: 'Marca uma criatura e aumenta o dano de armas.' }),
  spell('magic-missile', 'Mísseis Mágicos', 1, 'Evocação', ['Feiticeiro', 'Mago'], '1 ação', '36 m', 'Instantânea', { summary: 'Dardos de energia atingem automaticamente.' }),
  spell('shield', 'Escudo Arcano', 1, 'Abjuração', ['Feiticeiro', 'Mago'], '1 reação', 'Pessoal', '1 rodada', { summary: 'Aumenta temporariamente a CA e bloqueia mísseis mágicos.' }),
  spell('sleep', 'Sono', 1, 'Encantamento', ['Bardo', 'Feiticeiro', 'Mago'], '1 ação', '27 m', '1 minuto', { summary: 'Faz criaturas com poucos PV adormecerem.' }),

  spell('aid', 'Ajuda', 2, 'Abjuração', ['Clérigo', 'Paladino'], '1 ação', '9 m', '8 horas', { summary: 'Aumenta PV máximos e atuais de aliados.' }),
  spell('darkness', 'Escuridão', 2, 'Evocação', ['Bruxo', 'Feiticeiro', 'Mago'], '1 ação', '18 m', '10 minutos', { concentration: true, summary: 'Cria uma área de escuridão mágica.' }),
  spell('hold-person', 'Imobilizar Pessoa', 2, 'Encantamento', ['Bardo', 'Bruxo', 'Clérigo', 'Druida', 'Feiticeiro', 'Mago'], '1 ação', '18 m', '1 minuto', { concentration: true, summary: 'Paralisa um humanoide.' }),
  spell('invisibility', 'Invisibilidade', 2, 'Ilusão', ['Bardo', 'Bruxo', 'Feiticeiro', 'Mago'], '1 ação', 'Toque', '1 hora', { concentration: true, summary: 'Torna uma criatura invisível até atacar ou conjurar.' }),
  spell('lesser-restoration', 'Restauração Menor', 2, 'Abjuração', ['Bardo', 'Clérigo', 'Druida', 'Paladino', 'Patrulheiro'], '1 ação', 'Toque', 'Instantânea', { summary: 'Encerra uma doença ou condição específica.' }),
  spell('misty-step', 'Passo Nebuloso', 2, 'Conjuração', ['Bruxo', 'Feiticeiro', 'Mago'], '1 ação bônus', 'Pessoal', 'Instantânea', { summary: 'Teletransporta o conjurador a curta distância.' }),
  spell('scorching-ray', 'Raio Ardente', 2, 'Evocação', ['Feiticeiro', 'Mago'], '1 ação', '36 m', 'Instantânea', { summary: 'Dispara múltiplos raios de fogo.' }),
  spell('spiritual-weapon', 'Arma Espiritual', 2, 'Evocação', ['Clérigo'], '1 ação bônus', '18 m', '1 minuto', { summary: 'Cria uma arma flutuante que realiza ataques.' }),

  spell('counterspell', 'Contramágica', 3, 'Abjuração', ['Bruxo', 'Feiticeiro', 'Mago'], '1 reação', '18 m', 'Instantânea', { summary: 'Interrompe a conjuração de outra criatura.' }),
  spell('dispel-magic', 'Dissipar Magia', 3, 'Abjuração', ['Bardo', 'Bruxo', 'Clérigo', 'Druida', 'Feiticeiro', 'Mago', 'Paladino'], '1 ação', '36 m', 'Instantânea', { summary: 'Encerra magias ativas sobre alvo ou área.' }),
  spell('fireball', 'Bola de Fogo', 3, 'Evocação', ['Feiticeiro', 'Mago'], '1 ação', '45 m', 'Instantânea', { summary: 'Explosão causa grande dano de fogo em área.' }),
  spell('fly', 'Voo', 3, 'Transmutação', ['Bruxo', 'Feiticeiro', 'Mago'], '1 ação', 'Toque', '10 minutos', { concentration: true, summary: 'Concede deslocamento de voo.' }),
  spell('haste', 'Velocidade', 3, 'Transmutação', ['Feiticeiro', 'Mago'], '1 ação', '9 m', '1 minuto', { concentration: true, summary: 'Aumenta mobilidade, defesa e ações de uma criatura.' }),
  spell('hypnotic-pattern', 'Padrão Hipnótico', 3, 'Ilusão', ['Bardo', 'Bruxo', 'Feiticeiro', 'Mago'], '1 ação', '36 m', '1 minuto', { concentration: true, summary: 'Padrão de cores incapacita criaturas em uma área.' }),
  spell('revivify', 'Revivificar', 3, 'Necromancia', ['Clérigo', 'Paladino'], '1 ação', 'Toque', 'Instantânea', { summary: 'Traz de volta uma criatura morta recentemente.' }),
  spell('spirit-guardians', 'Espíritos Guardiões', 3, 'Conjuração', ['Clérigo'], '1 ação', 'Pessoal', '10 minutos', { concentration: true, summary: 'Espíritos protegem o conjurador e ferem inimigos próximos.' }),

  spell('banishment', 'Banimento', 4, 'Abjuração', ['Bruxo', 'Clérigo', 'Feiticeiro', 'Mago', 'Paladino'], '1 ação', '18 m', '1 minuto', { concentration: true, summary: 'Envia temporariamente uma criatura para outro plano.' }),
  spell('dimension-door', 'Porta Dimensional', 4, 'Conjuração', ['Bardo', 'Bruxo', 'Feiticeiro', 'Mago'], '1 ação', '150 m', 'Instantânea', { summary: 'Teletransporta o conjurador e um aliado.' }),
  spell('greater-invisibility', 'Invisibilidade Maior', 4, 'Ilusão', ['Bardo', 'Feiticeiro', 'Mago'], '1 ação', 'Toque', '1 minuto', { concentration: true, summary: 'Mantém invisibilidade mesmo após atacar ou conjurar.' }),
  spell('polymorph', 'Metamorfose', 4, 'Transmutação', ['Bardo', 'Druida', 'Feiticeiro', 'Mago'], '1 ação', '18 m', '1 hora', { concentration: true, summary: 'Transforma uma criatura em uma besta.' }),

  spell('cone-of-cold', 'Cone de Frio', 5, 'Evocação', ['Feiticeiro', 'Mago'], '1 ação', 'Cone de 18 m', 'Instantânea', { summary: 'Cone gelado causa dano de frio em área.' }),
  spell('greater-restoration', 'Restauração Maior', 5, 'Abjuração', ['Bardo', 'Clérigo', 'Druida'], '1 ação', 'Toque', 'Instantânea', { summary: 'Remove efeitos debilitantes poderosos.' }),
  spell('mass-cure-wounds', 'Curar Ferimentos em Massa', 5, 'Evocação', ['Bardo', 'Clérigo', 'Druida'], '1 ação', '18 m', 'Instantânea', { summary: 'Restaura PV de várias criaturas.' }),
  spell('wall-of-force', 'Muralha de Energia', 5, 'Evocação', ['Mago'], '1 ação', '36 m', '10 minutos', { concentration: true, summary: 'Cria uma barreira invisível quase impenetrável.' }),
];

export const SPELL_CIRCLES = ['Todos', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export function spellById(id) {
  return SPELLS.find((item) => item.id === id) || null;
}
