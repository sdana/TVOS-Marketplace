import React, { Component } from 'react'
import api from "./Api"
import {Redirect} from "react-router-dom"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import { Typography } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import InputLabel from "@material-ui/core/InputLabel"
import Select from "@material-ui/core/Select"
import bcrypt from "bcrypt-nodejs"
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';


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
        redirect: false,
        showPassword: false
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    registerUser = (e) => {
        e.preventDefault()
        api.checkUserThing("username", this.state.username).then(nameResponse => {
            api.checkUserThing("email", this.state.email).then(emailResponse => {
                //Check to see if username or email are already registered
                if (nameResponse.length === 0 && emailResponse.length === 0) {
                    //if not, then register the user
                    let passHash = bcrypt.hashSync(this.state.password)
                    api.registerUser(this.state.username, this.state.email, passHash, this.state.region).then((response) => {
                        sessionStorage.setItem("credentials", response.id)
                        //Call login function to set state in parent component
                    }).then(() => this.setState({ redirect: true })
)
                }
                else {
                    //if username or email are already registered, throw an error
                    alert("Sorry, that username or email is already registered")
                    return
                }
            })
        })

    }

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

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
                    <Typography variant="display3" style={{marginBottom:40, color:"white", paddingTop:80}}>Register for TVOS Marketplace</Typography>
                </Grid>
                    <div style={{ backgroundColor: "rgba(255, 255, 255, .7)", width: "45vw", maxHeight: "100vh", overflowY: "scroll", overflowX: "hidden", margin: "auto", paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 20 }}>

                <form onSubmit={(e) => {this.registerUser(e)}}>
                    <Grid item align="center" style={style.input}>
                        <TextField onChange={this.handleFieldChange} id="username" type="text" label="Username" required autoFocus autoComplete="off" fullWidth/>
                    </Grid>
                        <Grid item align="center" style={style.input}>
                            <TextField onChange={this.handleFieldChange} id="email" type="email" label="E-mail Address" required autoComplete="off" fullWidth/>
                    </Grid>
                        <Grid item align="center" style={style.input}>
                                <FormControl style={{ width: "100%" }}>
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <Input
                                        id="password"
                                        required
                                        style={style.input}
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        value={this.state.password}
                                        onChange={this.handleFieldChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="Toggle password visibility"
                                                    onClick={this.handleClickShowPassword}
                                                >
                                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                    </Grid>
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
                </div>
                </Grid>
            </React.Fragment>
        )
    }
}