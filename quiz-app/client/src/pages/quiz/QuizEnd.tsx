import React, { useEffect, useState } from "react";
import api from "../../api";
import Loading from "../../components/Loading";

interface Props {
  score: number;
  length: number;
  newspaper: string;
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
    await api.getEndResults().then((results) => {
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
      You guessed {props.score} out of {props.length} correct, for a
      score of {props.score / props.length} percent.
      <br />
      So far, {props.newspaper} readers have made {numTotal} guesses,
      <br />
      correct {endResults.numCorrect / numTotal} percent of the time.
      <br></br>
      Here's what most gave it away: //TODO
    </div>
  );
}

export default QuizEnd;
