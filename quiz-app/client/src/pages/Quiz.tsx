import React, { useEffect, useState } from "react";
import api from "../api";
import MultipleChoiceImage, {
	Coordinates,
} from "./quiz/MultipleChoiceImage";
import QuizEnd from "./quiz/QuizEnd";
import Loading from "../components/Loading";
import MultipleChoice from "./quiz/MultipleChoice";
import Ranking from "./quiz/Ranking";
import { RouteComponentProps, useParams } from "react-router-dom";

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
	question_type: QuestionTypes;
	answers: Array<Answer>;
	hidden_text: string;
}

export enum QuestionTypes {
	MULTIPLE_CHOICE = "multiple_choice",
	RANKING = "ranking",
}

export interface Answer {
	answerId: string;
	answerPhoto: string;
	answerText: string;
	correct: number;
	percentOfAnswer: number;
}

export interface AnswerPayload {
	quiz_id: number;
	question_id: number;
	response_id: number;
	answer: AnswerTypes;
}
export type AnswerTypes = MultipleChoiceAnswer | RankingAnswer;

export interface MultipleChoiceAnswer {
	answer_number: string;
	area_selected: Coordinates;
}

export interface RankingAnswer {
	answer_order: Array<string>;
}

type QuizParams = { id: string };

export default function Quiz({
	match,
}: RouteComponentProps<QuizParams>) {
	const [quizSchema, setQuizSchema] = useState<QuizSchema | null>(
		null
	);
	const [currQuestion, setCurrQuestion] = useState<Question | null>(
		null
	);
	const [currQuestionIndex, setCurrQuestionIndex] = useState(0);
	const [currAnswer, setCurrAnswer] = useState<Answer | null>(null);

	const [score, setScore] = useState(0);

	const FetchSchemaData = async () => {
		await api.getQuizSchema(match.params.id).then((results) => {
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

	const sendAnswer = async (answer: AnswerTypes) => {
		const a: AnswerPayload = {
			quiz_id: quizSchema.quiz.quiz_id,
			response_id: quizSchema.response_id,
			question_id: quizSchema.quiz.questions[currQuestionIndex],
			answer: answer,
		};
		await api.sendAnswer(a);

		if (currAnswer?.correct) {
			setScore(score + 1);
		}
		setCurrQuestionIndex(currQuestionIndex + 1);
	};

	let question = null;
	if (currQuestionIndex < quizSchema.quiz.questions.length) {
		switch (currQuestion.question_type) {
			case QuestionTypes.MULTIPLE_CHOICE:
				question = (
					<MultipleChoice
						{...{
							currQuestionIndex,
							quizSchema,
							currQuestion,
							currAnswer,
							sendAnswer,
						}}
					/>
				);
				break;
			case QuestionTypes.RANKING:
				question = (
					<Ranking
						{...{
							currQuestionIndex,
							quizSchema,
							currQuestion,
							currAnswer,
							sendAnswer,
						}}
					/>
				);
				break;
			default:
				question = <div>Question type unknown</div>;
				break;
		}
	} else {
		question = <div>That's all!</div>;
	}

	return (
		<div className="quiz">
			<h1>Quiz: {quizSchema.quiz.quiz_name}</h1>
			{quizSchema.quiz.quiz_instructions ? (
				<p className="subtitle">
					{quizSchema.quiz.quiz_instructions}
				</p>
			) : null}
			{question}
			<QuizEnd
				quiz_id={quizSchema.quiz.quiz_id}
				response_id={quizSchema.response_id}
				length={quizSchema.quiz.questions.length}
				score={score}
				newspaper="New York Times"
				percent_of_answer={
					currQuestion.answers[0].percentOfAnswer
				}
			></QuizEnd>
		</div>
	);
}
