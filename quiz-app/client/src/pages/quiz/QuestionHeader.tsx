import React from "react";
import { Question, QuizSchema } from "../Quiz";

export default function QuestionHeader(props: {
	currQuestionIndex: number;
	quizSchema: QuizSchema;
	currQuestion: Question;
}) {
	const { currQuestionIndex, quizSchema, currQuestion } = props;
	return (
		<div>
			<div className="question-count">
				<span>{currQuestionIndex + 1}</span>/
				{quizSchema.quiz.questions.length}
			</div>
			<div className="question-text">
				{currQuestion.question_text}
			</div>
		</div>
	);
}
