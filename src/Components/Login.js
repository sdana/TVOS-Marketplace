import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import api from "./Api"
import Button from "@material-ui/core/Button"
// import Input from "@material-ui/core/Input"
// import InputAdornment from "@material-ui/core/InputAdornment"
import Grid from "@material-ui/core/Grid"
import { Typography } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
// import { withStyles } from '@material-ui/core/styles';
import bcrypt from "bcrypt-nodejs"


const style = {
    input: {
        marginBottom: 40,
        },
    Link: {
        textDecoration: "none",
    },
    button: {
        marginRight: 50,
    },
    background: {
        backgroundImage: "url(https://images.unsplash.com/photo-1464788061904-b026adb5422b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4a6aa5b3608cb4e7f5a6f5d0be6e45e1&auto=format&fit=crop&w=1950&q=80)",
        width: "100%",
        height: "auto"
    },
    fullHeight: {
        height: "100vw"
    },
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
                    //Check to see if username or email are already registered
                    console.log(emailResponse)
                console.log(bcrypt.compareSync(this.state.password, emailResponse[0].password))
                    if (nameResponse.length === 0 || emailResponse.length === 0 || !bcrypt.compareSync(this.state.password, emailResponse[0].password)) {
                        alert("Username, Email, or Password incorrect")
                    }
                    else {
                        sessionStorage.setItem("credentials", emailResponse[0].id)
                        this.props.loginUser(emailResponse[0].id)
                    }
            })
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />
        } else {
            return (
                <React.Fragment>
                    <Grid container direction="column" alignContent="center" alignItems="center" grid-xs-12 justify="center">
                    <form onSubmit={this.handleLogin} style={{height: "50vh"}}>
                        <Typography variant="display3" align="center" color="inherit" gutterBottom={true} style={{color: "white", marginBottom:100, marginTop:80}}>Welcome to TVOS Marketplace</Typography>
                            <div style={{ backgroundColor: "rgba(255, 255, 255, .7)", width: "45vw", height: "auto", margin: "auto",paddingLeft: 20, paddingRight: 80, paddingTop: 20, paddingBottom: 20 }}>
                                <Typography variant="display1" align="center" color="default" gutterBottom={true}>Please sign in</Typography>
                                <Grid item align="center">
                                <TextField
                                    onChange={this.handleFieldChange}
                                    type="text"
                                    id="username"
                                    label="Username"
                                    required
                                    autoFocus
                                    style={style.input}
                                    fullWidth
                                />
                                </Grid>
                                {/* <label htmlFor="email">E-mail</label> */}
                                <Grid item align="center">
                                <TextField
                                    onChange={this.handleFieldChange}
                                    type="email"
                                    id="email"
                                    label="Email"
                                    required
                                    style={style.input}
                                    fullWidth
                                />
                                </Grid>
                                {/* <label htmlFor="password">Password</label> */}
                                <Grid item align="center">
                                <TextField
                                    onChange={this.handleFieldChange}
                                    type="password"
                                    id="password"
                                    label="Password"
                                    required
                                    style={style.input}
                                    fullWidth
                                />
                                </Grid>
                                <Grid item align="center">
                                    <Button type="submit" variant="contained" color="primary" style={style.button}>Sign in</Button><Link to="/register" style={style.Link}><Button variant="flat" size="small"><h4>New User?</h4></Button></Link>
                                </Grid>
                            </div>
                        </form>
                    </Grid>
                </React.Fragment>
            )
        }
    }
}
