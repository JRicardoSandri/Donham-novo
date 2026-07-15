# RPG Combat Tracker - Manual de Funcoes

Este manual explica as principais funcoes do aplicativo e o fluxo recomendado para usar o RPG Combat Tracker em mesa.

## Visao Geral

O RPG Combat Tracker foi pensado para acompanhar campanhas de RPG, principalmente D&D 5e, com foco em grupos, personagens, recursos, magias, inventario e combate.

O app salva os dados localmente no dispositivo. Isso inclui personagens, grupos, combates, inventarios, recursos, moedas e configuracoes.

## Fluxo Recomendado

1. Crie um grupo na aba **Personagens**.
2. Adicione ou crie personagens dentro do grupo.
3. Confira XP, nivel, atributos, PV, CA, iniciativa e carga.
4. Use a aba **Recursos** para acompanhar habilidades, descansos e magias.
5. Use a aba **Inventario** para controlar itens, moedas e peso carregado.
6. Use a aba **Combate** durante encontros, iniciativa, dano, cura e condicoes.
7. Ajuste idioma e preferencias na aba **Ajustes**.

## Personagens

A aba **Personagens** concentra grupos e fichas.

### Grupos

Voce pode:

- Criar varios grupos.
- Selecionar o grupo ativo.
- Editar o nome de um grupo segurando o cartao do grupo.
- Remover um grupo sem apagar os personagens.
- Adicionar ao grupo personagens ja existentes.
- Remover um personagem apenas do grupo.

As outras abas usam o grupo ativo como filtro. Assim, **Recursos**, **Inventario** e **Combate** trabalham com os personagens do grupo selecionado.

### Ficha do Personagem

Ao criar ou editar um personagem, voce pode preencher:

- Nome.
- Jogador.
- Raca.
- XP.
- Antecedente.
- Alinhamento.
- CA.
- Deslocamento em metros.
- Modificador de iniciativa.
- Porte: medio ou grande.
- PV atual, maximo e temporario.
- Classe.
- Subclasse.
- Atributos: FOR, DES, CON, INT, SAB e CAR.

### Calculos Automaticos

O app calcula automaticamente:

- Nivel a partir do XP.
- Bonus de proficiencia.
- Modificadores de atributo.
- Carga maxima.
- Progresso ate o proximo nivel.
- Recursos automaticos da classe.
- Recursos automaticos de magia.
- Habilidades liberadas por nivel.
- Proxima habilidade de classe.

### Inspiracao e Pontos de Enredo

Cada personagem possui controles de:

- Inspiracao.
- Pontos de Enredo.

Ambos podem ser aumentados ou reduzidos pelos botoes `+` e `-`, com limite de `0/10` a `10/10`.

### Excluir Personagem

O botao **Excluir personagem** remove o personagem:

- Da lista geral.
- De todos os grupos.
- De todos os combates.

Essa acao nao pode ser desfeita.

## Recursos

A aba **Recursos** acompanha habilidades recuperaveis, descansos e grimorio.

### Filtro por Grupo

Somente personagens do grupo ativo aparecem nesta aba.

Se houver apenas um personagem, a tela abre direto nos recursos dele.

Se houver mais de um personagem, o app mostra uma lista compacta. Toque no personagem para abrir os detalhes.

### Recursos Automaticos

Os recursos sao gerados de acordo com:

- Classe.
- Subclasse.
- Nivel.
- XP.
- Espacos de magia.

Exemplos:

- Furia.
- Inspiracao de Bardo.
- Canalizar Divindade.
- Forma Selvagem.
- Pontos de Feiticaria.
- Retomar Folego.
- Surto de Acao.
- Magia de Pacto.
- Espacos de magia.

Ao reduzir XP e nivel, recursos automaticos que nao pertencem mais ao nivel atual sao removidos da ficha.

### Usar Recursos

Cada recurso mostra:

- Nome.
- Quantidade atual.
- Quantidade maxima.
- Tipo de recuperacao.

Controles disponiveis:

- `-` reduz um uso.
- `+` recupera um uso.
- **Usou** zera o recurso.
- **Cheio** restaura o recurso ao maximo.

### Descanso Curto e Descanso Longo

Voce pode aplicar descanso:

- Para todos os personagens do grupo.
- Para um personagem especifico.

O descanso curto recupera recursos configurados para descanso curto.

O descanso longo recupera recursos configurados para descanso longo e tambem restaura PV atual para o maximo.

### Grimorio

O grimorio permite gerenciar magias por personagem.

Voce pode:

- Ver magias conhecidas.
- Adicionar magias do catalogo.
- Preparar ou desmarcar magias.
- Filtrar por circulo.
- Filtrar por escola.
- Filtrar apenas magias de concentracao.
- Buscar por nome ou efeito.
- Ver detalhes da magia.
- Conjurar magia.

### Conjurar Magias

Ao conjurar:

- Truques nao gastam espaco.
- Magias de circulo consomem um espaco compativel.
- Quando uma magia permite ser conjurada com nivel superior, o app pergunta qual circulo usar.
- O app bloqueia magias acima do circulo liberado pelo nivel do personagem.

## Combate

A aba **Combate** controla encontros, iniciativa, dano, cura, condicoes e erros criticos.

### Novo Combate

O botao **Novo combate** limpa o encontro atual e zera a fila.

### Adicionar Personagens

O botao **+ Personagens** adiciona ao combate os personagens do grupo ativo.

Personagens ja adicionados nao sao duplicados.

### Adicionar Inimigo

Para adicionar um inimigo, preencha:

- Nome.
- PV.
- CA.
- Iniciativa.

Depois toque em **Adicionar ao encontro**.

### Iniciativa

Cada participante possui campo de iniciativa.

Digite o valor e confirme em **OK**.

O app reorganiza a fila pela iniciativa.

Em caso de empate, aparece o botao **Prioridade**. Use esse botao para colocar aquele participante acima dos empatados.

### Turnos e Rodadas

O botao **PROXIMO** avanca o turno.

Quando um participante age:

- Ele sai da posicao atual.
- Vai para o fim da fila.
- O proximo participante se torna o turno atual.

Quando todos agem, a rodada aumenta automaticamente.

### Dano, Cura e PV Temporario

O app aplica a regra de PV temporario:

- Dano consome primeiro o PV temporario.
- O restante reduz o PV normal.
- Cura nao passa do PV maximo.

Controles rapidos:

- Dano: `-10`, `-5`, `-1`.
- Cura: `+1`, `+5`, `+10`.
- PV maximo editavel.
- Zerar PV.
- PV cheio.
- Temp `+1`, `+5`, `+10`.
- Limpar Temp.

### Concentracao

Se o personagem estiver com a condicao **Concentrando** e sofrer dano:

- O app calcula a CD do teste de concentracao.
- O app mostra um alerta pedindo teste de CON.
- A CD considera o dano total aplicado.

Para personagens concentrando, o dano usa um painel proprio:

1. Monte o dano total.
2. Toque em **Aplicar dano**.
3. O app aplica o dano e mostra o teste de concentracao.

### Condicoes

Toque em **Condicoes** no participante para abrir a lista.

Condicoes disponiveis:

- Cego.
- Surdo.
- Envenenado.
- Amedrontado.
- Agarrado.
- Restrito.
- Incapacitado.
- Paralisado.
- Atordoado.
- Inconsciente.
- Enfeiticado.
- Invisivel.
- Petrificado.
- Concentrando.

Condicoes incapacitantes encerram concentracao.

### Testes Contra a Morte

Quando um personagem chega a `0 PV`, o app mostra o painel de testes contra a morte.

Voce pode registrar resultados de d20:

- `1`.
- `5`.
- `10`.
- `20`.

Tambem pode usar **Estabilizar**.

### Erro Critico

O botao **Erro critico** abre o gerador de efeitos para falha critica.

Tipos de ataque:

- Ataque desarmado.
- Arma corpo a corpo.
- Arma a distancia.
- Ataque magico.

O app sorteia o efeito em `1d100`, mostra a faixa, severidade e descricao do resultado.

## Inventario

A aba **Inventario** controla itens, moedas e carga.

### Filtro por Grupo

Somente personagens do grupo ativo aparecem no inventario.

Quando existem varios personagens, a tela mostra uma lista compacta. Toque no personagem para abrir o inventario.

### Carga

O app calcula peso carregado automaticamente.

Regra usada:

- Criatura media: `FOR x 7,5 kg`.
- Criatura grande: `FOR x 15 kg`.

A tela mostra:

- Peso atual.
- Capacidade maxima.
- Aviso de sobrecarga quando passa do limite.

### Moedas

As moedas ficam dentro do inventario do personagem:

- Platina.
- Ouro.
- Eletro.
- Prata.
- Cobre.

### Itens

Cada item possui:

- Nome.
- Quantidade.
- Peso.
- Valor.
- Tipo.
- Raridade.
- Sintonizacao.
- Cargas.
- Descricao.
- Equipado.

### Biblioteca de Itens

Ao tocar em **Novo item**, voce pode escolher no catalogo.

O catalogo permite:

- Buscar por texto.
- Filtrar por tipo.
- Selecionar item oficial.
- Criar item personalizado quando nao encontrar.

Itens personalizados ficam salvos para reutilizacao futura.

### Categorias

Categorias disponiveis:

- Armas.
- Armaduras.
- Equipamento.
- Ferramentas.
- Montarias.
- Veiculos.
- Bens.
- Itens Magicos.
- Personalizado.

### Itens Magicos

Itens magicos usam a mesma tela de itens, mas liberam campos extras:

- Raridade.
- Requer sintonizacao.
- Sintonizado.
- Cargas atuais.
- Cargas maximas.

## Ajustes

A aba **Ajustes** concentra preferencias do aplicativo.

### Idioma

O app suporta:

- Portugues do Brasil.
- Ingles.
- Espanhol.

O idioma pode seguir automaticamente o dispositivo ou ser definido manualmente.

## Splash Screen

Ao abrir o app, a splash screen exibe:

- Icone oficial do app.
- Titulo RPG Combat Tracker.
- Linha dourada.
- Assinatura Sandri Studios.

A abertura usa fade-in suave e dura cerca de 3 segundos.

## Persistencia

O app salva automaticamente:

- Grupos.
- Personagens.
- Recursos.
- Magias conhecidas/preparadas.
- Combates.
- Turno e rodada.
- Inventario.
- Moedas.
- Configuracoes.

## Observacoes Importantes

- O XP controla o nivel automaticamente.
- Recursos oficiais sao recalculados quando o nivel muda.
- Talentos regionais nao oficiais nao sao adicionados a personagens novos.
- Dados antigos migrados podem ser limpos automaticamente quando deixam de fazer parte das regras atuais.
- Sempre confira o grupo ativo antes de usar Recursos, Inventario ou Combate.
