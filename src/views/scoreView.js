'use strict';

import { CURRENT_SCORE_ID } from '../constants.js';
import { quizData } from '../data.js';

export const createScoreElement = () => {
  const element = document.createElement('div');
  element.className = 'scoreAndTimer'
  element.innerHTML = String.raw`
  <div><p class="btn btn-success"> Score <span class="btn btn-secondary score" id="${CURRENT_SCORE_ID}"> ${quizData.finalScore} </span> </p></div>
  `;
  element.style.pointerEvents = 'none'
  return element;
};

export const updateScore = () => {
  document.getElementById(CURRENT_SCORE_ID).innerText = quizData.finalScore;
}

