import React, { Component } from 'react'

import logo from '../logo.svg'
class Logo extends Component {
    render() {
        return (
            <a href="https://sambarros.com">
                <img src={logo} width="50" height="50" alt="sambarros.com" />
            </a>
        )
    }
}

export default Logo