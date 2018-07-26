import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import "./nav.css"

export default class Nav extends Component {
    render() {
        return <nav>
            <h2>TVOS Marketplace</h2>
            <Link className="nav-link" to="/post">Post Item</Link>
            <Link className="nav-link" to="/dashboard">My Items</Link>
        </nav>
    }
}