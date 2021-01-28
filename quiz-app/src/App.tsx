import React, { useState } from "react";
import Quiz, {Question} from "./Quiz";
import QuizEnd from "./QuizEnd";

const questions : Array<Question> = [
  {
    questionText: "What is the capital of France?",
    answerOptions: [
      { answerText: "New York", isCorrect: false },
      { answerText: "London", isCorrect: false },
      { answerText: "Paris", isCorrect: true },
      { answerText: "Dublin", isCorrect: false },
    ],
  },
  {
    questionText: "Who is CEO of Tesla?",
    answerOptions: [
      { answerText: "Jeff Bezos", isCorrect: false },
      { answerText: "Elon Musk", isCorrect: true },
      { answerText: "Bill Gates", isCorrect: false },
      { answerText: "Tony Stark", isCorrect: false },
    ],
  },
  {
    questionText: "The iPhone was created by which company?",
    answerOptions: [
      { answerText: "Apple", isCorrect: true },
      { answerText: "Intel", isCorrect: false },
      { answerText: "Amazon", isCorrect: false },
      { answerText: "Microsoft", isCorrect: false },
    ],
  },
  {
    questionText: "How many Harry Potter books are there?",
    answerOptions: [
      { answerText: "1", isCorrect: false },
      { answerText: "4", isCorrect: false },
      { answerText: "6", isCorrect: false },
      { answerText: "7", isCorrect: true },
    ],
  },
];

export default function App() {
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);
  const [quizTitle, setQuizTitle] = useState(
    "Quiz: Can You Tell a Democrat's House from a Republican's House?"
  );
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerOptionClick = (isCorrect: boolean) => {
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
  return (
    <div className="app">
      <h1>Quiz: {quizTitle}</h1>
      {showScore ? (
        <QuizEnd
          length={questions.length}
          score={score}
          newspaper="New York Times"
        ></QuizEnd>
      ) : (
        <Quiz length={questions.length} 
        currQuestionIndex={currQuestionIndex}
        currentQuestion={questions[currQuestionIndex]} 
        handleAnswerOptionClick={handleAnswerOptionClick}></Quiz>
      )}
    </div>
  );
}
