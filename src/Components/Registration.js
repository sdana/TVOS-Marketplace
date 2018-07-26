import React, { Component } from 'react'
import api from "./Api"
import {Redirect} from "react-router-dom"

export default class Registration extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        region: "east",
        redirect: false
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    registerUser = (e) => {
        e.preventDefault()
        console.log("func called")
        api.checkUserThing("username", this.state.username).then(nameResponse => {
            api.checkUserThing("email", this.state.email).then(emailResponse => {
                //Check to see if username or email are already registered
                if (nameResponse.length === 0 && emailResponse.length === 0) {
                    //if not, then register the user
                    api.registerUser(this.state.username, this.state.email, this.state.password, this.state.region).then((response) => {
                        sessionStorage.setItem("credentials", response.id)
                        this.setState({redirect: true})
                        //Call login function to set state in parent component
                        // this.props.logUserIn()
                    })
                }
                else {
                    //if username or email are already registered, throw an error
                    alert("Sorry, that username or email is already registered")
                    return
                }
            })
        })

    }

    render () {
        if (this.state.redirect) {
            return (
                <Redirect to={"/"} />
            )
        }
        return (
            <React.Fragment>
                <h1>Register for TVOS Marketplace</h1>
                <form onSubmit={(e) => {this.registerUser(e)}}>
                    <label htmlFor="username">Desired Username<input onChange={this.handleFieldChange} id="username" type="text" placeholder="Username" required autoFocus/></label>
                    <label htmlFor="email">Email Address<input onChange={this.handleFieldChange} id="email" type="email" placeholder="E-mail Address" required/></label>
                    <label htmlFor="password">Password<input onChange={this.handleFieldChange} id="password" type="password" placeholder="Password" required /></label>
                    <label htmlFor="region">
                        Region
                        <select ref="select" id="region" onChange={this.handleFieldChange}>
                            <option value="east">East</option>
                            <option value="middle">Middle</option>
                            <option value="west">West</option>
                        </select>
                    </label>
                    <button>Register</button>
                </form>
            </React.Fragment>
        )
    }
}