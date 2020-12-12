const { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } = require('constants');
const https = require('https');
const chalk = require('chalk');
const readline = require('readline');
const { parse } = require('path');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/*
function Character() {
}
*/

const verifyDiceInput = (input) => {
    // regex expressions for correct dice format
    let format = "(\d|^)*d(?:4|6|8|10|12|20|100)(\\+\\d+|$)";

    // Check if dice input is in the correct format
    if(input.match(format) == null) {
        return false;
    }

    return true;
}

const abilityRoll = () => {
    let scores = [];
    let count = 0;

    // Loop 6 times for 6 ability scores
    while (count < 6) {
        let rolls = [];
        let j = 0;

        // Roll the 4d6 dice
        while (j < 4) {
            let d6 = Math.floor(Math.random() * 6) + 1;
            rolls.push(d6);
            j++;
        }

        // find smallest dice roll and yeet it from the array
        let min = Math.min.apply(null, rolls);
        let index = rolls.indexOf(min);

        rolls = rolls.filter((_, i) => i !== index);

        // Add rolls together
        let sum = rolls.reduce(function(a,b) {
            return a + b;
        });
        // Add sum to ability scores
        scores.push(sum);
        count++;
    }

    return scores;

}

const diceRoll = (input) => {
    //parse input into number of dice and dice sides
    const inputString = String(input);
    const numDice = input.substr(0, input.indexOf("d"));
    let diceSides = input.substr((input.indexOf("d") + 1));

    // If no prefix, then roll as single die
    if(input.indexOf("d") == 0) {
        let roll = Math.floor(Math.random() * diceSides) + 1;
        return roll;
    }

    let i = 0;
    let output = "";

    // if input includes modifier, add all rolls together and add modifier
    if(inputString.includes('+')){
        let total = 0;
        let modifier = inputString.split('+')[1];
        let sidesString = inputString.split('d').pop().split('+');
        diceSides = parseInt(sidesString);

        while (i < numDice) {
            let roll = Math.floor(Math.random() * diceSides) + 1;
            total += roll;
            //console.log(roll);
            i++;
        }

        total += parseInt(modifier);
        //console.log(modifier);
        return total;
        

    }

    // for each number of dice specified, roll and append to output string
    while (i < numDice) {
        let roll = Math.floor(Math.random() * diceSides) + 1
        let str = roll + "\n"

        output += str;
        i++;
    }

    return output;
    
}


const advantageRoll = (input) => {
    let d20 = Math.floor(Math.random() * 20) + 1;
    let output = Math.max(input, d20);

    return output;

}

const disadvantageRoll = (input) => {
    let d20 = Math.floor(Math.random() * 20) + 1;
    let output = Math.min(input, d20);

    return output;
}

module.exports = { verifyDiceInput, abilityRoll, diceRoll, advantageRoll, disadvantageRoll };