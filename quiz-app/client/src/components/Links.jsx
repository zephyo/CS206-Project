import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class Links extends Component {
    render() {
        return (
            <>
                <Link to="/quiz/1234" >
                    Test Quiz
                </Link>
                <Link to="/quiz/create">
                    Create Quiz
                </Link>
                <Link to="/quiz/update" >
                    Update Quiz
                </Link>
            </>
        )
    }
}

export default Links