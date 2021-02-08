import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { Home, Quiz, QuizCreate, QuizUpdate } from '../pages'

import '../scss/index.scss';

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/quiz/create" exact component={QuizCreate} />
            <Route path="/quiz/update" exact component={QuizUpdate} />
            <Route path="/quiz/:id" exact component={Quiz} />
            </Switch>
        </Router>
    )
}

export default App