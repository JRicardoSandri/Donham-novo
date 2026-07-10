# RPG Combat Tracker - Manual de Funciones

Este manual explica las funciones principales de la aplicacion y el flujo recomendado para usar RPG Combat Tracker en mesa.

## Vista General

RPG Combat Tracker fue pensado para acompanar campanas de RPG, principalmente D&D 5e, con foco en grupos, personajes, recursos, conjuros, inventario y combate.

La app guarda los datos localmente en el dispositivo. Esto incluye personajes, grupos, combates, inventarios, recursos, monedas y configuraciones.

## Flujo Recomendado

1. Crea un grupo en la pestana **Personajes**.
2. Agrega o crea personajes dentro del grupo.
3. Revisa XP, nivel, atributos, PG, CA, iniciativa y carga.
4. Usa la pestana **Recursos** para seguir habilidades, descansos y conjuros.
5. Usa la pestana **Inventario** para controlar objetos, monedas y peso cargado.
6. Usa la pestana **Combate** durante encuentros, iniciativa, dano, curacion y condiciones.
7. Ajusta idioma y preferencias en la pestana **Ajustes**.

## Personajes

La pestana **Personajes** concentra grupos y fichas.

### Grupos

Puedes:

- Crear varios grupos.
- Seleccionar el grupo activo.
- Editar el nombre de un grupo manteniendo presionada la tarjeta del grupo.
- Eliminar un grupo sin borrar personajes.
- Agregar al grupo personajes ya existentes.
- Quitar un personaje solo del grupo.

Las otras pestanas usan el grupo activo como filtro. Asi, **Recursos**, **Inventario** y **Combate** trabajan con los personajes del grupo seleccionado.

### Ficha del Personaje

Al crear o editar un personaje, puedes completar:

- Nombre.
- Jugador.
- Raza.
- XP.
- Trasfondo.
- Alineamiento.
- CA.
- Velocidad en metros.
- Modificador de iniciativa.
- Tamano: mediano o grande.
- PG actuales, maximos y temporales.
- Clase.
- Subclase.
- Atributos: FUE, DES, CON, INT, SAB y CAR.

### Calculos Automaticos

La app calcula automaticamente:

- Nivel a partir de XP.
- Bonificador de competencia.
- Modificadores de atributo.
- Carga maxima.
- Progreso hacia el siguiente nivel.
- Recursos automaticos de clase.
- Recursos automaticos de conjuros.
- Rasgos desbloqueados por nivel.
- Siguiente rasgo de clase.

### Inspiracion y Puntos de Trama

Cada personaje tiene controles para:

- Inspiracion.
- Puntos de Trama.

Ambos pueden aumentarse o reducirse con los botones `+` y `-`, con limite de `0/10` a `10/10`.

### Eliminar Personaje

El boton **Eliminar personaje** quita el personaje:

- De la lista general.
- De todos los grupos.
- De todos los combates.

Esta accion no se puede deshacer.

## Recursos

La pestana **Recursos** acompana habilidades recuperables, descansos y libro de conjuros.

### Filtro por Grupo

Solo aparecen personajes del grupo activo en esta pestana.

Si hay solo un personaje, la pantalla abre directamente en sus recursos.

Si hay mas de un personaje, la app muestra una lista compacta. Toca el personaje para abrir los detalles.

### Recursos Automaticos

Los recursos se generan segun:

- Clase.
- Subclase.
- Nivel.
- XP.
- Espacios de conjuro.

Ejemplos:

- Furia.
- Inspiracion bardica.
- Canalizar divinidad.
- Forma salvaje.
- Puntos de hechiceria.
- Segundo aliento.
- Accion subita.
- Magia de pacto.
- Espacios de conjuro.

Al reducir XP y nivel, los recursos automaticos que ya no pertenecen al nivel actual se eliminan de la ficha.

### Usar Recursos

Cada recurso muestra:

- Nombre.
- Cantidad actual.
- Cantidad maxima.
- Tipo de recuperacion.

Controles disponibles:

- `-` reduce un uso.
- `+` recupera un uso.
- **Usado** vacia el recurso.
- **Lleno** restaura el recurso al maximo.

### Descanso Corto y Descanso Largo

Puedes aplicar descanso:

- Para todos los personajes del grupo.
- Para un personaje especifico.

El descanso corto recupera recursos configurados para descanso corto.

El descanso largo recupera recursos configurados para descanso largo y tambien restaura PG actuales al maximo.

### Libro de Conjuros

El libro de conjuros permite gestionar conjuros por personaje.

Puedes:

- Ver conjuros conocidos.
- Agregar conjuros del catalogo.
- Preparar o desmarcar conjuros.
- Filtrar por nivel.
- Filtrar por escuela.
- Filtrar solo conjuros de concentracion.
- Buscar por nombre o efecto.
- Ver detalles del conjuro.
- Lanzar conjuros.

### Lanzar Conjuros

Al lanzar:

- Los trucos no gastan espacios.
- Los conjuros de nivel gastan un espacio compatible.
- Cuando un conjuro permite ser lanzado con nivel superior, la app pregunta que nivel de espacio usar.
- La app bloquea conjuros por encima del nivel desbloqueado por el personaje.

## Combate

La pestana **Combate** controla encuentros, iniciativa, dano, curacion, condiciones y pifias criticas.

### Nuevo Combate

El boton **Nuevo combate** limpia el encuentro actual y reinicia la cola.

### Agregar Personajes

El boton **+ Personajes** agrega al combate los personajes del grupo activo.

Los personajes ya agregados no se duplican.

### Agregar Enemigo

Para agregar un enemigo, completa:

- Nombre.
- PG.
- CA.
- Iniciativa.

Luego toca **Agregar al encuentro**.

### Iniciativa

Cada participante tiene un campo de iniciativa.

Ingresa el valor y confirma con **OK**.

La app reorganiza la cola por iniciativa.

En caso de empate, aparece el boton **Prioridad**. Usa ese boton para colocar ese participante por encima de los empatados.

### Turnos y Rondas

El boton **SIGUIENTE** avanza el turno.

Cuando un participante actua:

- Sale de la posicion actual.
- Va al final de la cola.
- El siguiente participante se convierte en el turno actual.

Cuando todos actuan, la ronda aumenta automaticamente.

### Dano, Curacion y PG Temporales

La app aplica la regla de PG temporales:

- El dano consume primero los PG temporales.
- El resto reduce los PG normales.
- La curacion no supera los PG maximos.

Controles rapidos:

- Dano: `-10`, `-5`, `-1`.
- Curacion: `+1`, `+5`, `+10`.
- PG maximos editables.
- Reducir PG a cero.
- PG llenos.
- Temp `+1`, `+5`, `+10`.
- Limpiar Temp.

### Concentracion

Si el personaje tiene la condicion **Concentrando** y recibe dano:

- La app calcula la CD de la prueba de concentracion.
- La app muestra una alerta pidiendo prueba de CON.
- La CD considera el dano total aplicado.

Para personajes concentrando, el dano usa un panel propio:

1. Arma el dano total.
2. Toca **Aplicar dano**.
3. La app aplica el dano y muestra la prueba de concentracion.

### Condiciones

Toca **Condiciones** en el participante para abrir la lista.

Condiciones disponibles:

- Ciego.
- Sordo.
- Envenenado.
- Asustado.
- Agarrado.
- Restringido.
- Incapacitado.
- Paralizado.
- Aturdido.
- Inconsciente.
- Hechizado.
- Invisible.
- Petrificado.
- Concentrando.

Las condiciones incapacitantes terminan concentracion.

### Tiradas de Salvacion Contra la Muerte

Cuando un personaje llega a `0 PG`, la app muestra el panel de tiradas contra la muerte.

Puedes registrar resultados de d20:

- `1`.
- `5`.
- `10`.
- `20`.

Tambien puedes usar **Estabilizar**.

### Pifia Critica

El boton **Pifia critica** abre el generador de efectos para fallo critico.

Tipos de ataque:

- Ataque desarmado.
- Arma cuerpo a cuerpo.
- Arma a distancia.
- Ataque magico.

La app sortea el efecto en `1d100`, muestra la franja, severidad y descripcion del resultado.

## Inventario

La pestana **Inventario** controla objetos, monedas y carga.

### Filtro por Grupo

Solo aparecen personajes del grupo activo en el inventario.

Cuando hay varios personajes, la pantalla muestra una lista compacta. Toca el personaje para abrir el inventario.

### Carga

La app calcula el peso cargado automaticamente.

Regla usada:

- Criatura mediana: `FUE x 7,5 kg`.
- Criatura grande: `FUE x 15 kg`.

La pantalla muestra:

- Peso actual.
- Capacidad maxima.
- Aviso de sobrecarga cuando se supera el limite.

### Monedas

Las monedas estan dentro del inventario del personaje:

- Platino.
- Oro.
- Electrum.
- Plata.
- Cobre.

### Objetos

Cada objeto tiene:

- Nombre.
- Cantidad.
- Peso.
- Valor.
- Tipo.
- Rareza.
- Sintonia.
- Cargas.
- Descripcion.
- Equipado.

### Biblioteca de Objetos

Al tocar **Nuevo item**, puedes elegir en el catalogo.

El catalogo permite:

- Buscar por texto.
- Filtrar por tipo.
- Seleccionar objeto oficial.
- Crear objeto personalizado cuando no se encuentra.

Los objetos personalizados quedan guardados para reutilizacion futura.

### Categorias

Categorias disponibles:

- Armas.
- Armaduras.
- Equipo.
- Herramientas.
- Monturas.
- Vehiculos.
- Bienes.
- Objetos Magicos.
- Personalizado.

### Objetos Magicos

Los objetos magicos usan la misma pantalla de objetos, pero liberan campos extras:

- Rareza.
- Requiere sintonia.
- Sintonizado.
- Cargas actuales.
- Cargas maximas.

## Ajustes

La pestana **Ajustes** concentra preferencias de la aplicacion.

### Idioma

La app soporta:

- Portugues de Brasil.
- Ingles.
- Espanol.

El idioma puede seguir automaticamente el dispositivo o definirse manualmente.

## Splash Screen

Al abrir la app, la splash screen muestra:

- Icono oficial de la app.
- Titulo RPG Combat Tracker.
- Linea dorada.
- Firma Sandri Studios.

La apertura usa fade-in suave y dura cerca de 3 segundos.

## Persistencia

La app guarda automaticamente:

- Grupos.
- Personajes.
- Recursos.
- Conjuros conocidos/preparados.
- Combates.
- Turno y ronda.
- Inventario.
- Monedas.
- Configuraciones.

## Observaciones Importantes

- La XP controla el nivel automaticamente.
- Los recursos oficiales se recalculan cuando cambia el nivel.
- Los talentos regionales no oficiales no se agregan a personajes nuevos.
- Datos antiguos migrados pueden limpiarse automaticamente cuando dejan de formar parte de las reglas actuales.
- Siempre revisa el grupo activo antes de usar Recursos, Inventario o Combate.
