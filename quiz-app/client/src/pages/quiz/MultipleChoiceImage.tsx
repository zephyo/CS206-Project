import React, { useEffect, useState } from "react";
import api from "../../api";
import Loading from "../../components/Loading";
import CorrectAnswer from "./CorrectAnswer";
import QuizImage from "./QuizImage";

interface Props {
	// image source id
	id: string;
	interactable?: boolean;
	onInteract?: (coordinates: Coordinates) => void;
	is_correct?: boolean | undefined;
	politician_name: string;
}

export interface Coordinates {
	x: number;
	y: number;
}

// component to render an image and capture user's mouse coordinates
function MultipleChoiceImage(props: Props) {
	const [clicked, setClicked] = useState<boolean>(false);
	const [coordinates, setCoordinates] = useState<Coordinates>({
		x: 0,
		y: 0,
	});
	const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

	useEffect(() => {
		setShowCorrectAnswer(false);
	}, [props.id]);

	const onMouseMove = (e: any) => {
		if (clicked == true) return;
		setCoordinates({
			x: e.nativeEvent.offsetX,
			y: e.nativeEvent.offsetY,
		});
	};

	const onClick = (e: any) => {
		if (props.interactable == false) return;
		// TODO: send the coordinates somewhere

		// show a circle around where you clicked
		setClicked(true);
		setShowCorrectAnswer(true);
		setTimeout(() => {
			if (props.onInteract == null) return;
			props.onInteract(coordinates);
			setClicked(false);
		}, 2500);
	};

	return (
		<>
			<div className="question-image">
				{props.interactable && (
					<h2>
						Before we reveal the answer, tap the part that
						made you think that way.
					</h2>
				)}
				<QuizImage
					url={props.id}
					onMouseMove={onMouseMove}
					onClick={onClick}
				/>
				<p>
					x: {coordinates.x}, y: {coordinates.y}
				</p>
				<div
					className={
						"circle " + (clicked ? "show" : "hide")
					}
					style={{
						top: coordinates.y,
						left: coordinates.x,
					}}
				/>
			</div>
			<div>
				{showCorrectAnswer ? (
					<CorrectAnswer
						is_correct={props.is_correct}
						politician_name={props.politician_name}
					></CorrectAnswer>
				) : (
					<div></div>
				)}
			</div>
		</>
	);
}

MultipleChoiceImage.defaultProps = {
	interactable: false,
	setAskForData: null,
};

export default MultipleChoiceImage;
