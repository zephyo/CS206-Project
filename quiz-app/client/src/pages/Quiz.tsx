import React, { useEffect, useState } from "react";
import api from "../api";
import CorrectAnswer from "./quiz/CorrectAnswer";
import QuizImage, { Coordinates } from "./quiz/QuizImage";
import QuizEnd from "./quiz/QuizEnd";
import Loading from "../components/Loading";

export interface QuizSchema {
  response_id: number;
  quiz: {
    quiz_id: number;
    questions: Array<number>;
    quiz_name: string;
    quiz_instructions: string;
  };
}

export interface Question {
  question_text: string;
  question_photo_id: string;
  answers: Array<Answer>;
  hidden_text: string;
}

interface Answer {
  answerId: string;
  answerText: string;
  correct: boolean;
  percentOfAnswer: number;
}

export default function Quiz() {
  const [quizSchema, setQuizSchema] = useState<QuizSchema | null>(
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
    await api.getQuizSchema(0).then((results) => {
      console.log("schema", results);
      setQuizSchema(results.data.data);
    });
  };

  const FetchQuestionData = async () => {
    if (
      quizSchema == null ||
      currQuestionIndex >= quizSchema.quiz.questions.length
    )
      return;

    await api
      .getQuestionById(
        quizSchema.quiz.quiz_id,
        quizSchema.quiz.questions[currQuestionIndex]
      )
      .then((results) => {
        console.log("new question", results);
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
  }, [currQuestionIndex, quizSchema]);

  if (quizSchema == null || currQuestion == null) {
    return <Loading />;
  }

  const handleAnswerOptionClick = (answer: Answer) => {
    setCurrAnswer(answer);
    setAskForCoords(true);
  };

  const sendAnswer = async (coordinates: Coordinates) => {
    await api.sendAnswer({
      quiz_id: quizSchema.quiz.quiz_id,
      response_id: quizSchema.response_id,
      answer_number: currAnswer?.answerId,
      question_id: quizSchema.quiz.questions[currQuestionIndex],
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
        is_correct={currAnswer?.correct}
        politician_name={currQuestion.hidden_text}
      />
    );
  }

  return (
    <div className="quiz">
      <h1>Quiz: {quizSchema.quiz.quiz_name}</h1>
      <p className="subtitle">{quizSchema.quiz.quiz_instructions}</p>
      {currQuestionIndex < quizSchema.quiz.questions.length ? (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>{currQuestionIndex + 1}</span>/
              {quizSchema.quiz.questions.length}
            </div>
            <div className="question-text">
              {currQuestion.question_text}
            </div>
          </div>
          <QuizImage
            id={currQuestion.question_photo_id}
            is_correct={currAnswer?.correct}
            politician_name={currQuestion.hidden_text}
          />
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
        quiz_id={quizSchema.quiz.quiz_id}
        response_id={quizSchema.response_id}
        length={quizSchema.quiz.questions.length}
        score={score}
        newspaper="New York Times"
        percent_of_answer={currQuestion.answers[0].percentOfAnswer}
      ></QuizEnd>
    </div>
  );
}
