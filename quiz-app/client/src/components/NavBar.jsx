import React, { Component } from 'react'
import Logo from './Logo'
import Links from './Links'
import { Link } from 'react-router-dom'

class NavBar extends Component {
    render() {
        return (
            <div className="nav-bar">
                <div className="left">
                    <Logo />
                    <Link to="/" className="name">
                        Quiz Generator
                    </Link>
                </div>
                <div className="right">
                    <Links />
                </div>
            </div>
        )
    }
}

export default NavBar