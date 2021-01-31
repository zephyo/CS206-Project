import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { Quiz, QuizCreate, QuizUpdate } from '../pages'

import '../scss/index.scss';

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/quiz/:id" exact component={Quiz} />
                <Route path="/quiz/create" exact component={QuizCreate} />
                <Route path="/quiz/update" exact component={QuizUpdate} />
            </Switch>
        </Router>
    )
}

export default App