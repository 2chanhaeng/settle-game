"use strict";
// @ts-check

import {TAGS, ALL_PARTS, CLASS, ID, TEXT, TYPE, DIFFICULTY} from "./literals.js";

const {cards, parts} = DIFFICULTY.EASY;
const part_kinds = ALL_PARTS.slice(0, parts);

/**
 * <body>
 *    <div class="choices"></div>
 *    <div id="result-borad"></div>
 * </body>
 */
export default function showBody(){
    const body = document.body;
    body.appendChild(createChoices());
    body.appendChild(createResult());
}

/**
 * <div class="choices">
 *   <div class="cards"></div>
 *   <button id="submit">Submit</button>
 * </div>
 * @returns {HTMLDivElement} div.choices
 */
function createChoices(){
    const choices = createElem(TAGS.div, {className: CLASS.choices});
    const cardBoard = createCardBoard();
    choices.appendChild(cardBoard);
    const submitOpt = {id: ID.submit, textContent: TEXT.submit};
    const submit = createElem(TAGS.button, submitOpt);
    choices.appendChild(submit);
    return choices;
}

/**
 * <div class="cardBoard">
 *   <div class="card" id="${i}"></div>
 *   ...
 * </div>
 * @returns {HTMLDivElement} div.cardBoard
 */
function createCardBoard(){
    const cardBoard = createElem(TAGS.div, {className: CLASS.cardBoard});
    for(let id = 0; id < cards; id++){
        const card = createCard(id);
        cardBoard.appendChild(card);
    }
    return cardBoard;
}

/**
 * <div class="card" id="${id}">
 *   <div class="cardImage"></div>
 *   <div class="change"></div>
 * </div>
 * @param {number} id 
 * @returns {HTMLDivElement} div.card
 */
function createCard(id){
    const cardOpt = {id: id, className: CLASS.card};
    const card = createElem(TAGS.div, cardOpt);
    const cardImage = createCardImage();
    card.appendChild(cardImage);
    const change = createChange();
    card.appendChild(change);
    return card;
}

/**
 * <div class="cardImage">
 *   <div class="figure"></div>
 * </div>
 * @returns {HTMLDivElement} div.cardImage
 */
function createCardImage(){
    const cardImage = createElem(TAGS.div, {className: CLASS.cardImage});
    const figure = createElem(TAGS.div, {className: CLASS.figure});
    cardImage.appendChild(figure);
    return cardImage;
}

/**
 * <div id="result-borad">
 *   <ul id="result"></ul>
 * </div>
 * @returns {HTMLDivElement} div#result-borad
 */
function createResult(){
    const result = createElem(TAGS.div, {id: ID.resultBoard});
    const ul = createElem(TAGS.ul, {id: ID.result});
    result.appendChild(ul);
    return result;
}

/**
 * <div class="change">
 *   <div class="control color"></div>
 *   ...
 * </div>
 * @returns {HTMLDivElement} div.change
 */
function createChange(){
    const change = createElem(TAGS.div, {className: CLASS.change});
    part_kinds.forEach(kind => {
        const control = createControl(kind);
        change.appendChild(control);
    });
    return change;
}

/**
 * <div class="control ${className}">
 *   <input type="number" min="0" max="${cards - 1}" class="choice">
 *   <button class="befor">←</button>
 *   <button class="after">→</button>
 * </div>
 * @param {string} className
 * @returns {HTMLDivElement} div.control
 */
function createControl(className){
    const control = createElem(TAGS.div, {className: `${CLASS.control} ${className}`});
    const choiceOpt = {
        type: TYPE.number,
        min: 0,
        max: cards - 1,
        className: CLASS.choice,
    },
    beforOpt = {
        className: CLASS.before,
        textContent: TEXT.leftArrow,
    },
    afterOpt = {
        className: CLASS.after,
        textContent: TEXT.rightArrow,
    };
    [
        [TAGS.input, choiceOpt],
        [TAGS.button, beforOpt],
        [TAGS.button, afterOpt]
    ].forEach(([tag, opt]) => {
        const elem = createElem(tag, opt);
        control.appendChild(elem);
    });
    return control;
}

/**
 * <${tag} class="${className}" ...opt>
 * @param {string} tag
 * @param {Object} opt_
 * @returns {HTMLElement} tag.className
 */
function createElem(tag, opt_){
    const elem = document.createElement(tag);
    const {className, ...opt} = opt_
    Object.keys(opt).forEach(key => elem[key] = opt[key]);
    if(className) {
        elem.classList = className;
    }
    return elem;
}
