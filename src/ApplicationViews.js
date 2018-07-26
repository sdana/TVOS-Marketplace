import React, { Component } from 'react'
import {Route} from "react-router-dom"
import Login from "./Login"
import Nav from "./Nav/Nav"

export default class ApplicationViews extends Component {
    isAuthenticated = () => {
        return sessionStorage.getItem("credentials")
    }

    render () {
        return (
            <React.Fragment>
            <Route path="/" component={Nav} />
            </React.Fragment>
        )
    }
}
