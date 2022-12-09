"use strict";
// @ts-check

import showBody from "./elements.js";
import addEventListenerToButtons from "./buttons.js";
import {EVENT} from "./literals.js";

window.addEventListener(EVENT.load, () => {
    showBody();
    addEventListenerToButtons();
});
