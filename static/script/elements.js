"use strict";

const TAGS = Object.freeze({
    // prevent typo error
    div: "div",
    button: "button",
    input: "input",
    ul: "ul",
});

const cards = 3, parts = 4;
const COMPO_KINDS = ["number", "color", "shape", "fill_"].slice(0, parts);

window.addEventListener("load", showBody);

/**
 * <body>
 *    <div class="choices"></div>
 *    <div id="result-borad"></div>
 * </body>
 */
function showBody(){
    const body = document.body;
    body.appendChild(createChoices());
    body.appendChild(createResult());
}

/**
 * <div class="choices">
 *   <div id="0">
 *     <div class="change"></div>
 *   </div>
 *   ...
 *   <button id="submit">Submit</button>
 * </div>
 * @returns {HTMLDivElement} div.choices
 */
function createChoices(){
    const choices = createElem(TAGS.div, {className: "choices"});
    for(let i = 0; i < cards; i++){
        const div = createElem(TAGS.div, {id: i});
        const change = createChange();
        div.appendChild(change);
        choices.appendChild(div);
    }
    const submit = createElem("button", {id: "submit", textContent: "Submit"});
    choices.appendChild(submit);
    return choices;
}

/**
 * <div id="result-borad">
 *   <ul id="result"></ul>
 * </div>
 * @returns {HTMLDivElement} div#result-borad
 */
function createResult(){
    const result = createElem(TAGS.div, {id: "result-borad"});
    const ul = createElem(TAGS.ul, {id: "result"});
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
    const change = createElem(TAGS.div, {className: "change"});
    COMPO_KINDS.forEach(kind => {
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
    const control = createElem(TAGS.div, {className: `control ${className}`});
    const choiceOpt = {
        type: "number",
        min: 0,
        max: cards - 1,
        className: "choice"
    },
    beforOpt = {
        className: "before",
        textContent: "←"
    },
    afterOpt = {
        className: "after",
        textContent: "→"
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
