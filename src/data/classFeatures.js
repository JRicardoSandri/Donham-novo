export const CLASS_FEATURES = {
  Guerreiro: [
    [1, 'Estilo de Luta; Retomar Fôlego'],
    [2, 'Surto de Ação'],
    [3, 'Arquétipo Marcial'],
    [4, 'Aumento de Atributo ou Talento'],
    [5, 'Ataque Extra'],
    [9, 'Indomável'],
    [11, 'Ataque Extra (2)'],
    [13, 'Indomável (2 usos)'],
    [17, 'Surto de Ação (2 usos); Indomável (3 usos)'],
    [20, 'Ataque Extra (3)'],
  ],
  Paladino: [
    [1, 'Sentido Divino; Cura pelas Mãos'],
    [2, 'Estilo de Luta; Conjuração; Destruição Divina'],
    [3, 'Juramento Sagrado; Canalizar Divindade'],
    [5, 'Ataque Extra; magias de 2º círculo'],
    [6, 'Aura de Proteção'],
    [9, 'Magias de 3º círculo'],
    [11, 'Destruição Divina Aprimorada'],
    [13, 'Magias de 4º círculo'],
    [17, 'Magias de 5º círculo'],
    [20, 'Habilidade final do Juramento'],
  ],
  Bruxo: [
    [1, 'Patrono; Magia de Pacto'],
    [2, 'Invocações Místicas'],
    [3, 'Dádiva do Pacto'],
    [5, 'Invocações adicionais; magias de 3º círculo'],
    [9, 'Magias de 5º círculo'],
    [11, 'Arcano Místico (6º)'],
    [13, 'Arcano Místico (7º)'],
    [15, 'Arcano Místico (8º)'],
    [17, 'Arcano Místico (9º)'],
    [20, 'Mestre Místico'],
  ],
  Bardo: [
    [1, 'Conjuração; Inspiração de Bardo'],
    [2, 'Versatilidade; Canção do Descanso'],
    [3, 'Colégio de Bardo; Aptidão'],
    [5, 'Fonte de Inspiração; Inspiração d8'],
    [6, 'Contraencanto; habilidade do Colégio'],
    [10, 'Segredos Mágicos; Inspiração d10'],
    [14, 'Segredos Mágicos; habilidade do Colégio'],
    [15, 'Inspiração d12'],
    [18, 'Segredos Mágicos'],
    [20, 'Inspiração Superior'],
  ],
  Patrulheiro: [
    [1, 'Inimigo Favorito; Explorador Natural'],
    [2, 'Estilo de Luta; Conjuração'],
    [3, 'Arquétipo de Patrulheiro'],
    [5, 'Ataque Extra; magias de 2º círculo'],
    [9, 'Magias de 3º círculo'],
    [13, 'Magias de 4º círculo'],
    [17, 'Magias de 5º círculo'],
    [20, 'Matador de Inimigos'],
  ],
};

export function progressionFor(classKey, level) {
  const features = CLASS_FEATURES[classKey] || [];
  return {
    unlocked: features.filter(([featureLevel]) => featureLevel <= level),
    upcoming: features.filter(([featureLevel]) => featureLevel > level).slice(0, 4),
  };
}
