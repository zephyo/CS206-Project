import React, { Component } from 'react'

import Logo from './Logo'
import Links from './Links'
class NavBar extends Component {
    render() {
        return (
            <div className="nav-bar">
                    <Logo />
                    <Links />
            </div>
        )
    }
}

export default NavBar