import React, { useState } from "react";
import Quiz from "./Quiz";
import QuizEnd from "./QuizEnd";
import QuizImage from "./QuizImage";
import './scss/index.scss';

export interface Question {
  questionText: string;
  answerOptions:  Array<Answer>;
  imageSrc: string;
}

interface Answer {
  answerText: string;
  isCorrect: boolean;
}


const questions : Array<Question> = [
  {
    questionText: "Democrat or Republican?",
    answerOptions: [
      { answerText: "Democrat", isCorrect: false },
      { answerText: "Republican", isCorrect: true },
    ],
    imageSrc: "https://i.pinimg.com/474x/9e/cd/29/9ecd29672631c9f2357d7204299fe774.jpg",
  },
  {
    questionText: "Democrat or Republican?",
    answerOptions: [
      { answerText: "Democrat", isCorrect: false },
      { answerText: "Republican", isCorrect: true },
    ],
    imageSrc: "https://i.pinimg.com/474x/39/2f/cf/392fcf715cad56cd4bf260cc6cd06de2.jpg",
  },
  {
    questionText: "Democrat or Republican?",
    answerOptions: [
      { answerText: "Democrat", isCorrect: true },
      { answerText: "Republican", isCorrect: false },
    ],
    imageSrc: "https://i.pinimg.com/474x/9e/cd/29/9ecd29672631c9f2357d7204299fe774.jpg",
  },
  {
    questionText: "Democrat or Republican?",
    answerOptions: [
      { answerText: "Democrat", isCorrect: false },
      { answerText: "Republican", isCorrect: true },
    ],
    imageSrc: "https://i.pinimg.com/474x/d3/11/61/d31161c1dd90394ca66ed3c0b78092e7.jpg",
  },
];

export default function App() {
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);
  const [quizTitle, setQuizTitle] = useState(
    "Can You Tell a Democrat's House from a Republican's House?"
  );
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
    //   should we ask the user for data (e.g. top clue) about the question's image?
    const [askForData, setAskForData] = useState(false);

  const handleAnswerOptionClick = (isCorrect: boolean) => {
    // TODO: have journalists customize whether to ask for data on a particular question or not
    setAskForData(true);

    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrQuestionIndex(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  if (askForData){
    return  <QuizImage src={questions[currQuestionIndex-1].imageSrc}
    setAskForData={setAskForData}
    interactable={true}/>;
  }

  if (showScore){
    return <QuizEnd
    length={questions.length}
    score={score}
    newspaper="New York Times"
    ></QuizEnd>;
  }

  return (
    <div className="app">
      <h1>Quiz: {quizTitle}</h1>
        <Quiz length={questions.length} 
        currQuestionIndex={currQuestionIndex}
        currentQuestion={questions[currQuestionIndex]} 
        handleAnswerOptionClick={handleAnswerOptionClick}></Quiz>
    </div>
  );
}
