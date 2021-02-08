import React, { useEffect, useState } from "react";
import api from "../../api";
import Loading from "../../components/Loading";

interface Props {
	quiz_id: number;
	response_id: number;
	score: number;
	length: number;
	newspaper: string;
	percent_of_answer: number;
}

interface EndResult {
	numWrong: number;
	numCorrect: number;
}

function QuizEnd(props: Props) {
	const [endResults, setEndResults] = useState<EndResult | null>(
		null
	);

	const FetchData = async () => {
		await api
			.getEndResults(props.quiz_id, props.response_id)
			.then((results) => {
				console.log("end results", results);
				setEndResults(results.data.data);
			});
	};

	// on mount, fetch data
	useEffect(() => {
		FetchData();
	}, []);

	if (endResults == null) {
		return <Loading />;
	}

	const numTotal = endResults.numWrong + endResults.numCorrect;

	return (
		<div className="score-section">
			You guessed {props.score} out of {props.length} correct,
			for a score of {(props.score * 100) / props.length}%.
			<br />
			<br />
			So far, {props.newspaper} readers have made {numTotal}{" "}
			guesses, correct {props.percent_of_answer / numTotal}% of
			the time.
			{/* Here's what most gave it away: //TODO */}
		</div>
	);
}

export default QuizEnd;
