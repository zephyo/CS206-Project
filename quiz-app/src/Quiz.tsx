import React, { useState } from "react";
import  {Question} from "./App";
import QuizImage from "./QuizImage";

interface Props {
    currQuestionIndex: number;
    currentQuestion: Question;
    length: number;
    handleAnswerOptionClick: (isCorrect: boolean) => void;
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
          <QuizImage src={props.currentQuestion.imageSrc}/>
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