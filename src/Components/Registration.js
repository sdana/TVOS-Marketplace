import React, { Component } from 'react'
import api from "./Api"
import {Redirect} from "react-router-dom"
import Button from "@material-ui/core/Button"
import Input from "@material-ui/core/Input"
import InputAdornment from "@material-ui/core/InputAdornment"
import Grid from "@material-ui/core/Grid"
import { Typography } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import InputLabel from "@material-ui/core/InputLabel"
import Select from "@material-ui/core/Select"

const style = {
    input: {
        marginBottom: 30,
    },
    select: {
        marginLeft: 30,
        marginBottom: 30,
    }
}

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
                        // sessionStorage.setItem("credentials", response.id)
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
            <Grid container direction="column" alignContent="center" justify="center">
                <Grid item sm align="center">
                    <Typography variant="display3" style={{marginBottom:40}}>Register for TVOS Marketplace</Typography>
                </Grid>
                <form onSubmit={(e) => {this.registerUser(e)}}>
                    <Grid item align="center" style={style.input}>
                        <Input onChange={this.handleFieldChange} id="username" type="text" placeholder="Username" required autoFocus autoComplete="off"/>
                    </Grid>
                        <Grid item align="center" style={style.input}>
                            <Input onChange={this.handleFieldChange} id="email" type="email" placeholder="E-mail Address" required autoComplete="off"/>
                    </Grid>
                        <Grid item align="center" style={style.input}>
                            <Input onChange={this.handleFieldChange} id="password" type="password" placeholder="Password" required autoComplete="off" />
                    </Grid>
                    {/* <label htmlFor="region">
                        Region
                        <select ref="select" id="region" onChange={this.handleFieldChange}>
                            <option value="east">East</option>
                            <option value="middle">Middle</option>
                            <option value="west">West</option>
                        </select>
                    </label> */}
                        <Grid item align="center">
                        <InputLabel htmlFor="age-native-simple">Select Region: </InputLabel>
                        <Select
                            ref="select"
                            id="region"
                            native
                            value={this.state.region}
                            onChange={this.handleFieldChange}
                            style={style.select}
                        >
                            <option value={"east"}>East</option>
                            <option value={"middle"}>Middle</option>
                            <option value={"west"}>West</option>
                        </Select>
                        </Grid>
                        <Grid item align="center">
                    <Button variant="contained" color="primary" type="submit">Register</Button>
                    </Grid>
                </form>
                </Grid>
            </React.Fragment>
        )
    }
}