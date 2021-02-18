import React, { useState } from "react";
import { Answer, AnswerTypes, Question, QuizSchema } from "../Quiz";
import QuestionHeader from "./QuestionHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { ReactSortable } from "react-sortablejs";
import QuizImage from "./QuizImage";

interface SortableAnswer {
	id: string;
	answer: Answer;
}

export default function Ranking(props: {
	currQuestionIndex: number;
	quizSchema: QuizSchema;
	currQuestion: Question;
	sendAnswer: (answer: AnswerTypes) => void;
}) {
	const {
		currQuestionIndex,
		quizSchema,
		currQuestion,
		sendAnswer,
	} = props;

	const init: SortableAnswer[] = currQuestion.answers.map((a) => ({
		id: a.answerId,
		answer: a,
	}));
	const [answers, setAnswers] = useState<SortableAnswer[]>(init);

	const onSubmit = () => {
		sendAnswer({
			answer_order: answers.map((r) => r.id),
		});
	};

	return (
		<>
			<QuestionHeader
				currQuestionIndex={currQuestionIndex}
				quizSchema={quizSchema}
				currQuestion={currQuestion}
			/>
			<QuizImage
				quiz_id={quizSchema.quiz.quiz_id}
				id={currQuestion.question_photo_id}
			/>
			<form className="answer-section">
				<div>
					<ReactSortable
						list={answers}
						setList={setAnswers}
					>
						{answers.map((item, index) => (
							<div className="draggable" key={item.id}>
								{item.answer.answerPhoto && (
									<QuizImage
										quiz_id={
											quizSchema.quiz.quiz_id
										}
										id={item.answer.answerPhoto}
									/>
								)}
								<FontAwesomeIcon
									icon={faSort}
									className="icon"
								/>
								{item.answer.answerText}
								<span className="index">
									{index + 1}
								</span>
							</div>
						))}
					</ReactSortable>
				</div>
				<button onSubmit={onSubmit}>Done</button>
			</form>
		</>
	);
}
