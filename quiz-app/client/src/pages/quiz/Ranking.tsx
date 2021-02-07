import React, { useCallback, useRef, useState } from "react";
import { Answer, AnswerTypes, Question, QuizSchema } from "../Quiz";
import QuestionHeader from "./QuestionHeader";
import {
	DndProvider,
	useDrag,
	useDrop,
	DropTargetMonitor,
	XYCoord,
} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";

const TYPE_RANK: string = "rank";

interface DragItem {
	index: number;
	id: string;
	type: string;
}

interface RowProps {
	answer: Answer;
	moveItem: (dragIndex: number, hoverIndex: number) => void;
	dragItem: DragItem;
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

	const [reorderedAnswers, setAnswers] = useState<Array<Answer>>(
		currQuestion.answers.map((a) => a)
	);

	const onSubmit = () => {
		sendAnswer({
			answer_order: reorderedAnswers.map((r) => r.answerId),
		});
	};

	const moveItem = useCallback(
		(dragIndex: number, hoverIndex: number) => {
			const draggedItem = reorderedAnswers[dragIndex];
			setAnswers(
				update(reorderedAnswers, {
					$splice: [
						[dragIndex, 1],
						[hoverIndex, 0, draggedItem],
					],
				})
			);
		},
		[reorderedAnswers]
	);

	return (
		<>
			<QuestionHeader
				currQuestionIndex={currQuestionIndex}
				quizSchema={quizSchema}
				currQuestion={currQuestion}
			/>
			<form className="answer-section">
				<div>
					{reorderedAnswers.map((a, i) =>
						RankingRow({
							answer: a,
							dragItem: {
								index: i,
								id: a.answerId,
								type: TYPE_RANK,
							},
							moveItem: moveItem,
						})
					)}
				</div>
				<button onSubmit={onSubmit}>Done</button>
			</form>
		</>
	);
}

const RankingRow: React.FC<RowProps> = (props) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [, drop] = useDrop({
		accept: TYPE_RANK,
		hover(item: DragItem, monitor: DropTargetMonitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = props.dragItem.index;

			// Don't replace items with themselves
			if (dragIndex === hoverIndex) {
				return;
			}

			// Determine rectangle on screen
			const hoverBoundingRect = ref.current?.getBoundingClientRect();

			// Get vertical middle
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) /
				2;

			// Determine mouse position
			const clientOffset = monitor.getClientOffset();

			// Get pixels to the top
			const hoverClientY =
				(clientOffset as XYCoord).y - hoverBoundingRect.top;

			// Dragging downwards
			if (
				dragIndex < hoverIndex &&
				hoverClientY < hoverMiddleY
			) {
				return;
			}

			// Dragging upwards
			if (
				dragIndex > hoverIndex &&
				hoverClientY > hoverMiddleY
			) {
				return;
			}

			// Time to actually perform the action
			props.moveItem(dragIndex, hoverIndex);
			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			item.index = hoverIndex;
		},
	});

	const [{ isDragging }, drag] = useDrag({
		item: props.dragItem,
		collect: (monitor: any) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const opacity = isDragging ? 0 : 1;
	drag(drop(ref));

	return (
		<div
			ref={ref}
			style={{ opacity }}
			key={props.answer.answerId}
		>
			{props.answer.answerText}
		</div>
	);
};
