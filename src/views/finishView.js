'use strict';

/**
 * Create the welcome screen
 * @returns {Element}
 */
export const createFinishElement = () => {
  const finalScore = localStorage.getItem('finalScore');
  const element = document.createElement('div');
  element.innerHTML = String.raw`
    <h1 class = "p-2 mb-2 bg-success text-white">SCORE <span class = "btn btn-secondary"> ${finalScore ? finalScore : 0}/10</span></h1>
    <img style="width: 200px;" src="./public/images/true.gif" alt="">
    <div class='againButtonDiv'>
      <button class="btn btn-success mt-2 p-3" id="tryAgain">
        Try Again
      </button>
    </div>
    `;
  element.classList.add("startDiv");

  return element;
};

