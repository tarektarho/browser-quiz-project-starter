'use strict';

import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { quizData } from '../data.js';
import { initFinishPage } from './finishPage.js';
import { createScoreElement, updateScore } from '../views/scoreView.js';
import { createTimerElement,startTimer, stopTimer } from '../views/timeView.js';

export const initQuestionPage = (storedIndex) => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  localStorage.setItem('currentQuestionIndex', quizData.currentQuestionIndex);

  const questionElement = createQuestionElement(currentQuestion.text);
  userInterface.appendChild(questionElement);
  const scoreElement = createScoreElement();
  userInterface.insertBefore(scoreElement, userInterface.firstChild);


  const timerElement = createTimerElement();
  scoreElement.appendChild(timerElement);

  //const timeCount = document.querySelector(".timer .timer-sec")

  const correctAnswer = (event) => {
    if (currentQuestion.selected != null) {
      return;
    }

    const selectedAnswer = event.target.id;
    localStorage.setItem('selectedAnswer', selectedAnswer);
  };

  const showCorrectAnswer = (event) => {
    if (currentQuestion.selected != null) {
      return;
    }

    stopTimer();
    const correctAnswerElement = document.getElementById(
      currentQuestion.correct
    );
    const selectedAnswerElement = document.getElementById(
      event.target.id
    );
    const liTags = document.getElementsByTagName('li');
   
    for (let liTag of liTags) {
      // after selected question, disabled the others.
      liTag.style.pointerEvents = 'none';
      liTag.style.background = 'gray';
      liTag.style.color = 'white';
    }
      const isCorrectAnswer = event.target.id === currentQuestion.correct;
      if (isCorrectAnswer) {
        setElementStyle(correctAnswerElement, selectedAnswerElement, isCorrectAnswer);
        quizData.finalScore++;
        updateScore();
      } else {
        setElementStyle(correctAnswerElement, selectedAnswerElement, false);
      }
      localStorage.setItem('finalScore', quizData.finalScore);
  };

  const answersListElement = document.getElementById(ANSWERS_LIST_ID);

  for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
    const answerElement = createAnswerElement(key, answerText);
    answersListElement.appendChild(answerElement);
    answerElement.addEventListener('click', correctAnswer);
    answerElement.addEventListener('click', showCorrectAnswer);
  }
  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener('click', () => {
      nextQuestion();
      console.log('nextquestion çağrıldı');
      startTimer();
    })

  
  if (storedIndex) {
    const selectedAnswer = localStorage.getItem('selectedAnswer');
    const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
    const correctAnswerElement = document.getElementById(
      currentQuestion.correct
    );
    const selectedAnswerElement = document.getElementById(selectedAnswer);
    const isCorrectAnswer = selectedAnswer === currentQuestion.correct
    const liTags = document.getElementsByTagName('li');

    for (let liTag of liTags) {
      // after selected question, disabled the others.
      liTag.style.pointerEvents = 'none';
      liTag.style.background = 'gray';
      liTag.style.color = 'white'
    }
    if (isCorrectAnswer) {
      setElementStyle(correctAnswerElement, selectedAnswerElement, true);
    } else {
      setElementStyle(correctAnswerElement, selectedAnswerElement, false);
    }
  }
  
};
/**
 * 
 * @param {*} correctAnswerElement 
 * @param {*} selectedAnswerElement 
 * @param {Boolen} isCorrectAnswer 
 */


const setElementStyle = (
  correctAnswerElement,
  selectedAnswerElement,
  isCorrectAnswer
) => {
  if (isCorrectAnswer) {
    correctAnswerElement.style.backgroundColor = 'green';
    correctAnswerElement.style.color = 'white';
  } else {
    correctAnswerElement.style.backgroundColor = 'green';
    correctAnswerElement.style.color = 'white';
    selectedAnswerElement.style.backgroundColor = 'red';
    selectedAnswerElement.style.color = 'white';
  }
};

const nextQuestion = () => {
  if (quizData.currentQuestionIndex < 9) {
    quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;
    initQuestionPage();
  } else {
    initFinishPage();
  }
};
