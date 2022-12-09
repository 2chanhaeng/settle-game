"use strict";
// @ts-check

import {TAGS, CLASS, EVENT, DIFFICULTY} from "./literals.js";

const {cards} = DIFFICULTY.EASY;
const clickBefore = clickArrow(-1),
    clickAfter = clickArrow(1);

export default function addEventListenerToButtons(){
    const {before, after} = CLASS;
    document.querySelectorAll(TAGS.button)
        .forEach(element => {
            switch (element.className){
                case before:
                    element.addEventListener(EVENT.click, clickBefore);
                    break;
                case after:
                    element.addEventListener(EVENT.click, clickAfter);
                    break;
            }
        });
}

/**
 * Get the input element by tag name,
 * the child of the parent of the clicked button.
 * Change the value of the input element.
 * Let `direction` be `-1` if the button has class `before`,
 * and `1` if the button has class `after`.
 * If the value is `val`, change it to `(val + direction) % 3`
 * @param {1 | -1} direction
 * @returns {function(Event): void}
 */
function clickArrow(direction){
    const changeInput = changeInputByDirection(direction);
    return (event) => {
        /** @type {HTMLButtonElement} */
        const button = event.target;
        /** @type {HTMLInputElement} */
        const input = button.parentElement.getElementsByTagName(TAGS.input)[0];
        input.value = changeInput(input.value);
    }
}

/** @type {(direc:number) => (value:string) => number} */
function changeInputByDirection(direc){
    return value => (cards + (parseInt(value) || 0) + direc) % cards
}
