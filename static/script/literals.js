"use strict";
// @ts-check

/**
 * save literals prevent typo error
 */

export const ALL_PARTS = Object.freeze([
    "number",
    "color",
    "shape",
    "fill_",
]);

export const CLASS = Object.freeze({
    after: "after",
    before: "before",
    card: "card",
    cardImage: "cardImage",
    change: "change",
    choice: "choice",
    choices: "choices",
    control: "control",
    figure: "figure",
});

export const DIFFICULTY = Object.freeze({
    EASY: {
        cards: 3,
        parts: 4,
    },
});

export const EVENT = Object.freeze({
    click: "click",
    load: "load",
});

export const ID = Object.freeze({
    submit: "submit",
    result: "result",
    resultBoard: "resultBoard",
});

export const TAGS = Object.freeze({
    div: "div",
    button: "button",
    input: "input",
    ul: "ul",
});

export const TEXT = Object.freeze({
    submit: "Submit",
    leftArrow: "←",
    rightArrow: "→",
});

export const TYPE = Object.freeze({
    number: "number",
});
