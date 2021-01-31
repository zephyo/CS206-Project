import React, { useEffect, useState } from "react";
import api from "../api";
import QuizImage, { Coordinates } from "./quiz/QuizImage";
import QuizEnd from "./quiz/QuizEnd";
import Loading from "../components/Loading";

export interface QuizSchema {
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
  const [questionSchema, quizSchema] = useState<QuizSchema | null>(
    null
  );
  const [currQuestion, setCurrQuestion] = useState<Question | null>(
    null
  );
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);
  const [currAnswer, setCurrAnswer] = useState<Answer | null>(null);

  const [score, setScore] = useState(0);
  //   should we ask the user for data (e.g. top clue) about the question's image?
  const [askForData, setAskForCoords] = useState(false);

  const FetchSchemaData = async () => {
    await api.getQuizSchema().then((results) => {
      console.log("schema", results);
      quizSchema(results.data.data);
    });
  };

  const FetchQuestionData = async () => {
    if (
      questionSchema == null ||
      currQuestionIndex >= questionSchema.questions.length
    )
      return;

    await api
      .getQuestionById(questionSchema.questions[currQuestionIndex])
      .then((results) => {
        console.log(results);
        setCurrQuestion(results.data.data);
      });
  };

  // on mount, fetch data
  useEffect(() => {
    FetchSchemaData();
  }, []);

  // when the current question index changes, fetch question data
  useEffect(() => {
    FetchQuestionData();
  }, [currQuestionIndex, questionSchema]);

  if (questionSchema == null || currQuestion == null) {
    return <Loading />;
  }

  const handleAnswerOptionClick = (answer: Answer) => {
    setCurrAnswer(answer);
    setAskForCoords(true);
  };

  const sendAnswer = async (coordinates: Coordinates) => {
    await api.sendAnswer({
      answer_number: currAnswer?.answerId,
      question_id: questionSchema.questions[currQuestionIndex],
      area_selected: {
        x: coordinates.x,
        y: coordinates.y,
      },
    });

    if (currAnswer?.correct) {
      setScore(score + 1);
    }
    setCurrQuestionIndex(currQuestionIndex + 1);
  };

  if (askForData) {
    return (
      <QuizImage
        id={currQuestion.question_photo_id}
        setAskForCoords={setAskForCoords}
        sendAnswer={sendAnswer}
        interactable={true}
      />
    );
  }

  return (
    <div className="quiz">
      <h1>Quiz: {questionSchema.quiz_name}</h1>
      <p className="subtitle">{questionSchema.quiz_instructions}</p>
      {currQuestionIndex < questionSchema.questions.length ? (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>{currQuestionIndex + 1}</span>/
              {questionSchema.questions.length}
            </div>
            <div className="question-text">
              {currQuestion.question_text}
            </div>
          </div>
          <QuizImage id={currQuestion.question_photo_id} />
          <div className="answer-section">
            {currQuestion.answers.map((answerOption, i) => (
              <button
                key={i}
                onClick={() => handleAnswerOptionClick(answerOption)}
              >
                {answerOption.answerText}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div>That's all!</div>
      )}
      <QuizEnd
        length={questionSchema.questions.length}
        score={score}
        newspaper="New York Times"
      ></QuizEnd>
    </div>
  );
}
