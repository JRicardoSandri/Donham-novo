# Arquitetura do RPG Companion

A pasta `src` passa a ser o centro do aplicativo.

- `screens/`: telas e composicao dos fluxos.
- `components/`: componentes reutilizaveis de interface.
- `services/`: persistencia e integracoes externas.
- `data/`: tabelas e dados estaticos de D&D 5e.
- `models/`: formatos e fabricas das entidades do dominio.
- `theme/`: cores, espacamentos e tokens visuais.

## Estrategia incremental

A tela legada foi preservada em `screens/CompanionScreen.js` para manter o aplicativo funcional. Nas proximas fases, seus blocos serao extraidos em commits pequenos para grupos, personagens, regras de progressao, combate e inventario.

Nenhuma funcionalidade existente deve ser removida durante essa migracao.
