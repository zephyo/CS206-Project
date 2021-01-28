import React, { useState } from "react";

function QuizEnd(props) {
  return (
    <div className="score-section">
      You scored {props.score} out of {props.length}
    </div>
  );
}

export default QuizEnd;
