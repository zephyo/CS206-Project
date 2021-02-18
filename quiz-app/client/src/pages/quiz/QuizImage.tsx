import Loading from "../../components/Loading";
import React, { useEffect, useState } from "react";
import api from "../../api";
import { Coordinates } from "./MultipleChoiceImage";

interface Props {
	// image source url
	url?: string;
	onMouseMove?: (e: any) => void;
	onClick?: (e: any) => void;
	className?: string;
}

export default function QuizImage(props: Props) {
	if (props.url == null) {
		return <Loading />;
	}

	return (
		<img
			src={props.url}
			onMouseMove={props.onMouseMove}
			onClick={props.onClick}
			className={props.className}
		/>
	);
}
