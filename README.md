# dnd-dice-roller
A command line application for rolling DnD dice.

### Dependencies
* [Commander](https://www.npmjs.com/package/commander)
* [Chalk](https://www.npmjs.com/package/chalk)

### Installation
`npm install dnd-dice-roller`

###  Options
* **-v, --version**
  * Fetch the version number of the tool.
* **-d, --dice <dice>**
  * Roll some dice. Input is in standard dice format such as 4d6 or d20.
  * Example: `dnd-dice-roller -d 4d6`
  * Addition modifier support added. The format is `dnd-dice-roller -d 4d6+5`
* **-a, --ability roll**
  * Generate 6 ability scores for character creation.
* **--advantage**
  * Roll with advantage. Used in conjunction with the --dice option. Rolls an extra D20 and takes the highest number between your roll and the D20.
  * Example: `dnd-dice-roller -d d20 --advantage`
* **--disadvantage**
  * Roll with disadvantage. Used in conjunction with the --dice option. Rolls an extra D20 and takes the lower number between your roll and the D20.
  * Example: `dnd-dice-roller -d d20 --disadvantage`
