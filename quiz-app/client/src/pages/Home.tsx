import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
	return (
		<div className="center col fullheight home">
			<h1>Welcome to Quiz Generator!</h1>
			<p>Create, edit, and test out your own quizzes.</p>
			<br />
			<div className="special-btn">
				<Link to="/quiz/1234" className="size16">
					TRY A DEMO
				</Link>
			</div>
		</div>
	);
}
