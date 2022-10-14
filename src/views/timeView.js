'use strict'
import { quizData } from "../data.js";

export const createTimerElement = () =>{
    const element = document.createElement('div');
    element.className = "timer";
    element.innerHTML = String.raw`
  <p class="btn btn-success time-text"> Time Left <span class="btn btn-secondary timer-sec">15</span> </p>
  `;
  element.style.pointerEvents = 'none';
  return element;
}

let intervalId = null;

export function startTimer(){
    const timeCount = document.querySelector(".timer .timer-sec");
    intervalId = setInterval (timer, 1000);
    let remainingTime = quizData.counter
    function timer(){
        timeCount.textContent = remainingTime;
        remainingTime --;
        if (remainingTime < 0){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (remainingTime < 0){
            clearInterval(intervalId);
            timeCount.textContent = "00"
        }
    }
}

export function stopTimer(){
    if(intervalId){
        clearInterval(intervalId)
    }
}