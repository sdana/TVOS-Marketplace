import React, { Component } from 'react'
import {Route} from "react-router-dom"
import Login from "./Login"

export default class ApplicationViews extends Component {
    isAuthenticated = () => {
        return sessionStorage.getItem("credentials")
    }

    render() {
        if (!this.isAuthenticated())
        return (
            <React.Fragment>
            <Route path="/" component={Login} />
            </React.Fragment>
        )
    }
}