import React, { useState } from "react";
import QuizImage from "./QuizImage";

interface Props {
    currQuestionIndex: number;
    currentQuestion: Question;
    length: number;
    handleAnswerOptionClick: (isCorrect: boolean) => void;
}

export interface Question {
    questionText: string;
    answerOptions:  Array<Answer>;
}

interface Answer {
    answerText: string;
    isCorrect: boolean;
}
  

  function Quiz(props: Props) {
    return <><div className="question-section">
            <div className="question-count">
              <span>Question {props.currQuestionIndex + 1}</span>/
              {props.length}
            </div>
            <div className="question-text">
              {props.currentQuestion.questionText}
            </div>
          </div>
       <QuizImage></QuizImage>
          <div className="answer-section">
            {props.currentQuestion.answerOptions.map(
              (answerOption) => (
                <button
                  onClick={() =>
                    props.handleAnswerOptionClick(answerOption.isCorrect)
                  }
                >
                  {answerOption.answerText}
                </button>
              )
            )}
          </div></>;
}

export default Quiz;