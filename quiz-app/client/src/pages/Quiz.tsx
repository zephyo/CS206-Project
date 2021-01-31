import React, { useEffect, useState } from "react";
import api from "../api";
import QuizImage from "./quiz/QuizImage";
import QuizEnd from "./quiz/QuizEnd";
import Loading from "../components/Loading";

export interface QuestionSchema {
  questions: Array<number>;
  quiz_name: string;
  quiz_instructions: string;
}

export interface Question {
  question_text: string;
  question_photo_id: string;
  answers: Array<Answer>;
}

interface Answer {
  answerId: string;
  answerText: string;
  correct: boolean;
}

export default function Quiz() {
  const [
    questionSchema,
    setQuestionSchema,
  ] = useState<QuestionSchema | null>(null);
  const [currQuestion, setCurrQuestion] = useState<Question | null>(
    null
  );
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);

  const [score, setScore] = useState(0);
  //   should we ask the user for data (e.g. top clue) about the question's image?
  const [askForData, setAskForData] = useState(false);

  const FetchSchemaData = async () => {
    await api.getQuizSchema().then((results) => {
      console.log(results);
      setQuestionSchema(results.data);
    });
  };

  const FetchQuestionData = async () => {
    await api
      .getQuestionById(questionSchema?.questions[currQuestionIndex])
      .then((results) => {
        console.log(results);
        setCurrQuestion(results.data);
      });
  };

  // on mount, fetch data
  useEffect(() => {
    FetchSchemaData();
  }, []);

  // when the current question index changes, fetch question data
  useEffect(() => {
    FetchQuestionData();
  }, [currQuestionIndex]);

  if (questionSchema == null || currQuestion == null) {
    return <Loading />;
  }

  const handleAnswerOptionClick = (isCorrect: boolean) => {
    // TODO: have journalists customize whether to ask for data on a particular question or not
    setAskForData(true);

    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currQuestionIndex + 1;
    if (nextQuestion < questionSchema.questions.length) {
      setCurrQuestionIndex(nextQuestion);
    }
  };

  if (askForData) {
    return (
      <QuizImage
        id={currQuestion.question_photo_id}
        setAskForData={setAskForData}
        interactable={true}
      />
    );
  }

  return (
    <div className="app">
      <h1>Quiz: {questionSchema.quiz_name}</h1>
      <p>{questionSchema.quiz_instructions}</p>
      <div className="question-section">
        <div className="question-count">
          <span>Question {currQuestionIndex + 1}</span>/
          {questionSchema.questions.length}
        </div>
        <div className="question-text">
          {currQuestion.question_text}
        </div>
      </div>
      <QuizImage id={currQuestion.question_photo_id} />
      <div className="answer-section">
        {currQuestion.answers.map((answerOption) => (
          <button
            onClick={() =>
              handleAnswerOptionClick(answerOption.correct)
            }
          >
            {answerOption.answerText}
          </button>
        ))}
      </div>
      <QuizEnd
        length={questionSchema.questions.length}
        score={score}
        newspaper="New York Times"
      ></QuizEnd>
    </div>
  );
}
