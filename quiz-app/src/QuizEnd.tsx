import React, { useState } from "react";
// import api from "../api";

interface Props {
  score: number;
  length: number;
  newspaper: string;
}

interface EndResult {
  totalGuesses: number;
  totalCorrect: number;
}

function QuizEnd(props:Props) {
  const [isLoading, setLoading] = useState(true);
  const [endResults, setEndResults] = useState<EndResult | null>(null);

  // on mount, fetch data
  //   useEffect(async () => {
  //     setLoading(true);

  //     await api.getEndResults().then((results) => {
  //       setEndResults(results);
  //       setLoading(false);
  //     });
  //   }, []);

if (isLoading || endResults == null){
  return  <div>Loading...</div>;
}
  return <div className="score-section">
      You guessed {props.score} out of {props.length} correct, for a
      score of {props.score / props.length} percent.
      <br />
      So far, {props.newspaper} readers have made{" "}
      {endResults.totalGuesses} guesses,
      <br />
      correct {endResults.totalCorrect / endResults.totalGuesses}{" "}
      percent of the time.
      <br></br>
      Here's what most gave it away:
      //TODO
    </div>
  ;
}

export default QuizEnd;
