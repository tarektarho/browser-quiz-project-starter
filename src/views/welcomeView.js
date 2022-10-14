'use strict';

import { START_QUIZ_BUTTON_ID } from '../constants.js';

/**
 * Create the welcome screen
 * @returns {Element}
 */
export const createWelcomeElement = () => {
  const element = document.createElement('div');
  element.innerHTML = String.raw`
    <h1 class= "welcome text-shadow">Welcome <br> To <br>Space </h1>
    <button class="btn btn-success btn-lg w-50 p-3 mt-3" id="${START_QUIZ_BUTTON_ID}">Start Diving</button>
  `;
  element.classList.add("startDiv");
  return element;
};
