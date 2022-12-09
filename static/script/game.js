"use strict";
import {zip, sum, toBase, randomInt, range} from './utils.js';

const CHOICE_ELEM_ID = '#choices .choice';

const cards = 3, parts = 4;
const randomMax = cards ** parts;
const base = toBase(cards, parts);
const isSame = (arr) => arr[0] === arr[1] ? 1 : 0;
const answer0 = randomInt(0, randomMax);
const _1 = randomInt(0, randomMax - 1);
const answer1 = _1 >= answer0 ? _1 + 1 : _1;
const answers = [answer0, answer1, createAnswerFromBefore(answer0, answer1)];

// answers.forEach(answer => console.log(answer, base(answer)))

function randomChoice(array){
    return array[randomInt(0, array.length - 1)]
}

function avoid(used){
    const already = new Set(used); // Set of already used
    const nonUsed = range(cards).filter(card => !already.has(card))
    // console.log(`nonUsed: ${nonUsed}`)
    return randomChoice(nonUsed)
}

function createAnswerFromBefore(...answers){
    const zipped = zip(...answers.map(base));
    return zipped.reverse().reduce(
        // console.log(`acc: ${acc}, used: ${used}, issame: ${used[0] === used[1]}, if: ${used[0]}, else: ${avoidOverlap(used)}`)
        (acc, used) => acc * cards + (
            used[0] === used[1]
                ? used[0] // If the some of the same, use the same
                : avoid(used) // Else, choose random avoiding overlap
        ), 0
    )
}

/**
 * @param {number} choice 
 * @returns {number[]}
 */
function score(choices){
    return choices.map(
        choice => Math.max(
            ...answers.map(
                scoreEachChoiceAnswer(choice)
            )
        )
    )
}

/**
 * @param {number} choice 
 * @returns {function(number): number}
 */
function scoreEachChoiceAnswer(choice) {
    /**
     * @param {number} answer
     * @returns {number}
     */
    return answer => {
        const zipped = zip(base(choice), base(answer));
        return sum(zipped.map(isSame))
    }
}

function validChoice(choices){
    return zip(...choices.map(base)).every(
        comps => [1, cards].includes((new Set(comps)).size)
    )
}

function alertInvalidChoice(choices){
    // TODO: alert invalid choice
    console.log('invalid choice');
    choices.map(base).forEach(choice => console.log(choice));
}

function isPlayerWin(scores){
    return sum(scores) === cards * parts;
}

function showScore(choices, scores){
    const li = document.createElement('li');
    li.textContent = `${choices} => ${scores}`;
    document.getElementById('result').appendChild(li);
}

function showPlayerWin(choices, scores){
    const li = document.createElement('li');
    li.textContent = `${choices} => Player Win`;
    document.getElementById('result').appendChild(li);
}

document.getElementById('submit').addEventListener('click', () => {
    const inputs = document.querySelectorAll(CHOICE_ELEM_ID)
    const choices = Array.from(inputs).map(input => parseInt(input.value));
    if(!validChoice(choices)){
        alertInvalidChoice(choices);
        return
    }
    const scores = score(choices);
    if (isPlayerWin(scores)){
        showPlayerWin(choices, scores);
    } else {
        showScore(choices, scores);
    }
})
