import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import api from "./Api"
import Button from "@material-ui/core/Button"
import Input from "@material-ui/core/Input"
import InputAdornment from "@material-ui/core/InputAdornment"
import Grid from "@material-ui/core/Grid"
import { Typography } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';


const style = {
    input: {
        marginBottom: 40,
        },
    Link: {
        textDecoration: "none",
    },
    button: {
        marginRight: 50,
    }
}

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
                        sessionStorage.setItem("credentials", emailResponse[0].id)
                        this.props.loginUser(emailResponse[0].id)
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
                    <Grid container direction="column" alignContent="center" alignItems="center" grid-xs-12 justify="space-between">
                    <form onSubmit={this.handleLogin}>
                        <Typography variant="display4" align="center" color="default" gutterBottom={true}>Please sign in</Typography>
                        <Grid item align="center">
                        <Input
                            onChange={this.handleFieldChange}
                            type="text"
                            id="username"
                            placeholder="Username"
                            required
                            autoFocus
                            style={style.input}
                        />
                        </Grid>
                        {/* <label htmlFor="email">E-mail</label> */}
                        <Grid item align="center">
                        <Input
                            onChange={this.handleFieldChange}
                            type="email"
                            id="email"
                            placeholder="Email"
                            required
                            style={style.input}
                        />
                        </Grid>
                        {/* <label htmlFor="password">Password</label> */}
                        <Grid item align="center">
                        <Input
                            onChange={this.handleFieldChange}
                            type="password"
                            id="password"
                            placeholder="Password"
                            required
                            style={style.input}
                        />
                        </Grid>
                        <Grid item align="center">
                            <Button type="submit" variant="contained" color="primary" style={style.button}>Sign in</Button><Link to="/register" style={style.Link}><Button variant="text" size="small"><h4>New User?</h4></Button></Link>
                        </Grid>
                    </form>
                    </Grid>
                </React.Fragment>
            )
        }
    }
}
