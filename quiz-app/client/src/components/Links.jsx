import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class Links extends Component {
    render() {
        return (
            <>
                <Link to="/" className="navbar-brand">
                    My first MERN Application
                </Link>
                    <div className="links">
                            <Link to="/quiz/1234" >
                                Test Quiz
                            </Link>
                            <Link to="/quiz/create">
                                Create Quiz
                            </Link>
                            <Link to="/quiz/update" >
                                Update Quiz
                            </Link>
                    </div>
            </>
        )
    }
}

export default Links