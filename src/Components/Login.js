import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import api from "./Api"

export default class Login extends Component {
    // Set initial state
    state = {
        username: "",
        email: "",
        password: "",
        redirect: false
    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    // Simplistic handler for login submit
    handleLogin = e => {
        e.preventDefault()
        api.checkUserThing("username", this.state.username).then(nameResponse => {
            api.checkUserThing("email", this.state.email).then(emailResponse => {
                api.checkUserThing("password", this.state.password).then(passwordResponse => {
                    //Check to see if username or email are already registered
                    console.log(nameResponse, emailResponse)
                    if (nameResponse.length === 0 || emailResponse.length === 0 || passwordResponse.length === 0) {
                        alert("Username, Email, or Password incorrect")
                    }
                    else {
                        sessionStorage.setItem("credentials", String(emailResponse[0].id))
                        this.props.loginUser(emailResponse.id)
                    }
                })
            })
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />
        } else {
            return (
                <React.Fragment>
                    <form onSubmit={this.handleLogin}>
                        <h1>Please sign in</h1>
                        <label htmlFor="username">Username</label>
                        <input
                            onChange={this.handleFieldChange}
                            type="text"
                            id="username"
                            placeholder="Username"
                            required
                            autoFocus
                        />
                        <label htmlFor="email">E-mail</label>
                        <input
                            onChange={this.handleFieldChange}
                            type="email"
                            id="email"
                            placeholder="Email"
                            required
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={this.handleFieldChange}
                            type="password"
                            id="password"
                            placeholder="Password"
                            required
                        />
                        <button type="submit">Sign in</button>
                    </form>
                    <Link to="/register"><h4>New User?</h4></Link>
                </React.Fragment>
            )
        }
    }
}
