#!/usr/bin/env node

const program = require('commander');
const rolls = require('./lib');
const chalk = require('chalk');

// Define options and commands
program
    .version('1.0.0')
    .name('dnd-dice-roller')
    .description('A command line interface to roll dice')
    .option('-d, --dice <dice>', 'dice command')
    .option('-a, --ability-roll', 'A standard 4d6 ability roll, dropping the lowest score')
    .option('--advantage', 'Roll with advantage')
    .option('--disadvantage', 'Roll with disadvantage')
    .parse(process.argv)


const main = () => {
    //console.log(program.opts());
    let output = 0;
    const labelColors = chalk.cyan;

    // roll an ability roll if the user so chooses
    if(program.abilityRoll) {
        let abilities = rolls.abilityRoll();
        let sum = abilities.reduce(function(a,b) {
            return a + b;
        });

        console.log(labelColors('Ability Scores:') + ' ' + abilities);
        console.log(labelColors('Total Sum:') + ' ' + sum);
        process.exit(0);
    }

    // Verify -d input
    if(program.dice && !rolls.verifyDiceInput(program.dice)) {
        console.log(chalk.bold.red("Invalid format. Please enter dice option as <number of dice>d<number of dice sides> or d<number of dice sides>, i.e. 4d6 or d20"));
        process.exit(1);
    } 

    // Base dice roll
    let dice = rolls.diceRoll(program.dice);
    output = dice;

    // Add advantage/disadvantage if those options are selected
    if(program.advantage) {
        console.log(chalk.blue("Rolling with advantage."));
        console.log(`Original roll: ${dice}`);
        let advantageRoll = rolls.advantageRoll(dice);
        output = chalk.green.bold(`Advantage roll: ${advantageRoll}`);
    } else if (program.disadvantage) {
        console.log(chalk.blue("Rolling with disadvantage."));
        console.log(`Original roll: ${dice}`);
        let disadvantageRoll = rolls.disadvantageRoll(dice);
        output = chalk.green.bold(`Disadvantage roll: ${disadvantageRoll}`);
    }

    console.log(output);

}

main();