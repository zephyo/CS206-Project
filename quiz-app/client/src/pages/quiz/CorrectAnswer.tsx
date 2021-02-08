import React, { useEffect, useState } from "react";
import api from "../../api";
import Loading from "../../components/Loading";

interface Props {
  is_correct: boolean | undefined;
  politician_name: string;
}

function CorrectAnswer(props: Props) {
  let result = props.is_correct ? (
    <div className="correct-answer-text"
    >Correct! This house belongs to {props.politician_name}.</div>
  ) : <div className="correct-answer-text"
  >Nope! This house belongs to {props.politician_name}.</div>
  return result;
}

export default CorrectAnswer;
