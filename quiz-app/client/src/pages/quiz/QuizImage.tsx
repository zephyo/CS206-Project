import Loading from "../../components/Loading";
import React, { useEffect, useState } from "react";
import api from "../../api";
import { Coordinates } from "./MultipleChoiceImage";

interface Props {
	quiz_id: number;
	// image source id
	id: string;
	onMouseMove?: (e: any) => void;
	onClick?: (e: any) => void;
	className?: string;
}

export default function QuizImage(props: Props) {
	const [imgSrc, setImgSrc] = useState<string | null>(null);

	const FetchData = async () => {
		await api
			.getPhotoById(props.quiz_id, props.id)
			.then((results) => {
				console.log("img ID in quizimage: ", props.id);
				console.log("img", results);
				setImgSrc(results.data.data.url);
			});
	};

	useEffect(() => {
		console.log("new img id", props.id);
		FetchData();
	}, [props.id]);

	if (imgSrc == null) {
		return <Loading />;
	}

	return (
		<img
			src={imgSrc}
			onMouseMove={props.onMouseMove}
			onClick={props.onClick}
			className={props.className}
		/>
	);
}
