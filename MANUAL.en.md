# RPG Combat Tracker - Feature Manual

This manual explains the main app features and the recommended workflow for using RPG Combat Tracker at the table.

## Overview

RPG Combat Tracker is designed to support RPG campaigns, especially D&D 5e, with a focus on parties, characters, resources, spells, inventory, and combat.

The app saves data locally on the device. This includes characters, parties, combats, inventories, resources, coins, and settings.

## Recommended Workflow

1. Create a party in the **Characters** tab.
2. Add or create characters inside the party.
3. Review XP, level, ability scores, HP, AC, initiative, and carrying load.
4. Use the **Resources** tab to track abilities, rests, and spells.
5. Use the **Inventory** tab to manage items, coins, and carried weight.
6. Use the **Combat** tab during encounters, initiative, damage, healing, and conditions.
7. Adjust language and preferences in the **Settings** tab.

## Characters

The **Characters** tab contains parties and character sheets.

### Parties

You can:

- Create multiple parties.
- Select the active party.
- Edit a party name by holding the party card.
- Remove a party without deleting characters.
- Add existing characters to the party.
- Remove a character only from the party.

The other tabs use the active party as a filter. This means **Resources**, **Inventory**, and **Combat** work with the characters from the selected party.

### Character Sheet

When creating or editing a character, you can fill in:

- Name.
- Player.
- Race.
- XP.
- Background.
- Alignment.
- AC.
- Speed in meters.
- Initiative modifier.
- Size: Medium or Large.
- Current, maximum, and temporary HP.
- Class.
- Subclass.
- Ability scores: STR, DEX, CON, INT, WIS, and CHA.

### Automatic Calculations

The app automatically calculates:

- Level from XP.
- Proficiency bonus.
- Ability modifiers.
- Maximum carrying load.
- Progress toward the next level.
- Automatic class resources.
- Automatic spell resources.
- Features unlocked by level.
- Next class feature.

### Inspiration and Plot Points

Each character has controls for:

- Inspiration.
- Plot Points.

Both can be increased or reduced with the `+` and `-` buttons, from `0/10` to `10/10`.

### Delete Character

The **Delete character** button removes the character:

- From the full character list.
- From every party.
- From every combat.

This action cannot be undone.

## Resources

The **Resources** tab tracks recoverable abilities, rests, and the spellbook.

### Party Filter

Only characters from the active party appear in this tab.

If there is only one character, the screen opens directly on that character's resources.

If there is more than one character, the app shows a compact list. Tap a character to open details.

### Automatic Resources

Resources are generated according to:

- Class.
- Subclass.
- Level.
- XP.
- Spell slots.

Examples:

- Rage.
- Bardic Inspiration.
- Channel Divinity.
- Wild Shape.
- Sorcery Points.
- Second Wind.
- Action Surge.
- Pact Magic.
- Spell slots.

When XP and level are reduced, automatic resources that no longer belong to the current level are removed from the sheet.

### Use Resources

Each resource shows:

- Name.
- Current amount.
- Maximum amount.
- Recovery type.

Available controls:

- `-` reduces one use.
- `+` restores one use.
- **Spent** empties the resource.
- **Full** restores the resource to maximum.

### Short Rest and Long Rest

You can apply rest:

- To every character in the party.
- To a specific character.

Short rest restores resources configured for short rest.

Long rest restores resources configured for long rest and also restores current HP to maximum.

### Spellbook

The spellbook lets you manage spells by character.

You can:

- View known spells.
- Add spells from the catalog.
- Prepare or unprepare spells.
- Filter by spell level.
- Filter by school.
- Filter only concentration spells.
- Search by name or effect.
- View spell details.
- Cast spells.

### Cast Spells

When casting:

- Cantrips do not spend slots.
- Leveled spells spend a compatible slot.
- When a spell can be cast at a higher level, the app asks which slot level to use.
- The app blocks spells above the level unlocked by the character.

## Combat

The **Combat** tab manages encounters, initiative, damage, healing, conditions, and critical fumbles.

### New Combat

The **New combat** button clears the current encounter and resets the queue.

### Add Characters

The **+ Characters** button adds the active party characters to combat.

Characters already added are not duplicated.

### Add Enemy

To add an enemy, fill in:

- Name.
- HP.
- AC.
- Initiative.

Then tap **Add to encounter**.

### Initiative

Each participant has an initiative field.

Enter the value and confirm with **OK**.

The app reorganizes the queue by initiative.

If there is a tie, the **Priority** button appears. Use it to place that participant above tied entries.

### Turns and Rounds

The **NEXT** button advances the turn.

When a participant acts:

- They leave the current position.
- They go to the end of the queue.
- The next participant becomes the current turn.

When everyone acts, the round increases automatically.

### Damage, Healing, and Temporary HP

The app applies the temporary HP rule:

- Damage consumes temporary HP first.
- Remaining damage reduces normal HP.
- Healing cannot exceed maximum HP.

Quick controls:

- Damage: `-10`, `-5`, `-1`.
- Healing: `+1`, `+5`, `+10`.
- Editable maximum HP.
- Set HP to zero.
- Full HP.
- Temp `+1`, `+5`, `+10`.
- Clear Temp.

### Concentration

If the character has the **Concentrating** condition and takes damage:

- The app calculates the concentration check DC.
- The app shows an alert asking for a CON save.
- The DC considers the total damage applied.

For concentrating characters, damage uses its own panel:

1. Build the total damage.
2. Tap **Apply damage**.
3. The app applies damage and shows the concentration check.

### Conditions

Tap **Conditions** on a participant to open the list.

Available conditions:

- Blinded.
- Deafened.
- Poisoned.
- Frightened.
- Grappled.
- Restrained.
- Incapacitated.
- Paralyzed.
- Stunned.
- Unconscious.
- Charmed.
- Invisible.
- Petrified.
- Concentrating.

Incapacitating conditions end concentration.

### Death Saving Throws

When a character reaches `0 HP`, the app shows the death saving throw panel.

You can register d20 results:

- `1`.
- `5`.
- `10`.
- `20`.

You can also use **Stabilize**.

### Critical Fumble

The **Critical fumble** button opens the critical failure effect generator.

Attack types:

- Unarmed attack.
- Melee weapon.
- Ranged weapon.
- Magic attack.

The app rolls the effect on `1d100` and shows the range, severity, and result description.

## Inventory

The **Inventory** tab manages items, coins, and carrying load.

### Party Filter

Only characters from the active party appear in Inventory.

When there are multiple characters, the screen shows a compact list. Tap a character to open the inventory.

### Load

The app calculates carried weight automatically.

Rule used:

- Medium creature: `STR x 7.5 kg`.
- Large creature: `STR x 15 kg`.

The screen shows:

- Current weight.
- Maximum capacity.
- Overload warning when the limit is exceeded.

### Coins

Coins are inside the character inventory:

- Platinum.
- Gold.
- Electrum.
- Silver.
- Copper.

### Items

Each item has:

- Name.
- Quantity.
- Weight.
- Value.
- Type.
- Rarity.
- Attunement.
- Charges.
- Description.
- Equipped.

### Item Library

When tapping **New item**, you can choose from the catalog.

The catalog allows:

- Text search.
- Filter by type.
- Select an official item.
- Create a custom item when not found.

Custom items are saved for future reuse.

### Categories

Available categories:

- Weapons.
- Armor.
- Equipment.
- Tools.
- Mounts.
- Vehicles.
- Goods.
- Magic Items.
- Custom.

### Magic Items

Magic items use the same item screen, but unlock extra fields:

- Rarity.
- Requires attunement.
- Attuned.
- Current charges.
- Maximum charges.

## Settings

The **Settings** tab contains app preferences.

### Language

The app supports:

- Brazilian Portuguese.
- English.
- Spanish.

The language can follow the device automatically or be set manually.

## Splash Screen

When opening the app, the splash screen shows:

- Official app icon.
- RPG Combat Tracker title.
- Gold line.
- Sandri Studios signature.

The opening uses a smooth fade-in and lasts around 3 seconds.

## Persistence

The app automatically saves:

- Parties.
- Characters.
- Resources.
- Known/prepared spells.
- Combats.
- Turn and round.
- Inventory.
- Coins.
- Settings.

## Important Notes

- XP controls level automatically.
- Official resources are recalculated when level changes.
- Non-official regional talents are not added to new characters.
- Old migrated data can be cleaned automatically when it is no longer part of the current rules.
- Always check the active party before using Resources, Inventory, or Combat.
