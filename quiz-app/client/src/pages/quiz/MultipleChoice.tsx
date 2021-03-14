import React, { useState } from "react";
import { Answer, AnswerTypes, Question, QuizSchema } from "../Quiz";
import QuestionHeader from "./QuestionHeader";
import MultipleChoiceImage, {
	Coordinates,
} from "./MultipleChoiceImage";

export default function MultipleChoice(props: {
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

	const [selectedAnswer, onSelectAnswer] = useState<Answer | null>(
		null
	);

	if (selectedAnswer) {
		return (
			<MultipleChoiceImage
				id={currQuestion.question_photo_id}
				interactable={true}
				onInteract={(coord: Coordinates) => {
					if (!selectedAnswer) return;
					sendAnswer({
						answer_number: selectedAnswer.answerId,
						area_selected: coord,
					});
					onSelectAnswer(null);
				}}
				is_correct={selectedAnswer?.correct == 1}
				politician_name={currQuestion.hidden_text}
			/>
		);
	}

	return (
		<>
			<QuestionHeader
				currQuestionIndex={currQuestionIndex}
				quizSchema={quizSchema}
				currQuestion={currQuestion}
			/>
			<MultipleChoiceImage
				id={currQuestion.question_photo_id}
				politician_name={currQuestion.hidden_text}
			/>
			<div className="answer-section">
				{currQuestion.answers.map((answerOption, i) => (
					<button
						key={i}
						onClick={() => {
							onSelectAnswer(answerOption);
						}}
					>
						{answerOption.answerText}
					</button>
				))}
			</div>
		</>
	);
}
