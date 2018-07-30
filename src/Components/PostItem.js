import React, { Component } from 'react'
import api from "./Api"
import {Redirect} from "react-router-dom"
import { TextField, Typography, InputLabel, Grid, Select, MenuItem } from "@material-ui/core"

export default class PostItem extends Component {
    state = {
        user: {},
        title: "",
        price: "",
        description: "",
        location: "",
        redirect: false,
        category: "1"
    }

    handleFieldChange = evt => {
        console.log(evt.target)
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }


    componentDidMount() {
        if (!sessionStorage.getItem("credentials")){
            api.checkUserThing("id", this.props.userId).then(user => {
                console.log(user)
                this.setState({user: user[0]})
            })
        }
        else {
            const userId = sessionStorage.getItem("credentials")
            api.checkUserThing("id",userId).then(user => {
                this.setState({user: user[0]})
            })
        }
    }

    submitPost(e){
        e.preventDefault()
        api.postItem(this.state.user.id, this.state.title, this.state.price, this.state.location, this.refs.category.value, this.state.description, this.state.user.region).then(response => {
            alert("Post Successful!")
            this.setState({redirect: true})
        })
    }

    render() {
        if (this.state.redirect){
            return (
                <Redirect to={"/Dashboard"} />
            )
        }
        return (
            <React.Fragment>
                <Typography variant="display3" align="center">Post A New Item</Typography>
                <Grid container xs={12} direction="column" justify="center">
                <form onSubmit={(e) => this.submitPost(e)}>
                        <Grid item sm align="center">
                    <InputLabel htmlFor="title">Title: </InputLabel>
                    <TextField onChange={this.handleFieldChange} id="title" type="text" required autoFocus />
                    </Grid>
                        <Grid item sm align="center">
                    <InputLabel htmlFor="price">Price: $</InputLabel>
                    <TextField onChange={this.handleFieldChange} id="price" type="text" required />
                    </Grid>
                        <Grid item sm align="center">
                    <InputLabel htmlFor="location">Specific Location: </InputLabel>
                    <TextField onChange={this.handleFieldChange} id="location" type="text" required />
                    </Grid>
                    <InputLabel htmlFor="category">Item Category: </InputLabel>
                    <Select ref="category" id="category" onChange={e => this.setState({category: e.target.value})} defaultValue={this.state.category} value={this.state.category}>
                        {/* <MenuItem value="" required disabled hidden>Category</MenuItem> */}
                        <MenuItem value="1">Free</MenuItem>
                        <MenuItem value="2">Produce</MenuItem>
                        <MenuItem value="3">Farm Equipment</MenuItem>
                        <MenuItem value="4">Wine</MenuItem>
                        <MenuItem value="5">Request</MenuItem>
                    </Select>
                    {/* <InputLabel htmlFor="region">Region</InputLabel>
                    <select id="region">
                        <option value="1">East</option>
                        <option value="2">Middle</option>
                        <option value="3">West</option>
                    </select> */}
                    <InputLabel htmlFor="description">Description</InputLabel>
                    <TextField onChange={this.handleFieldChange} id="description" rows="10" />
                    <button><h3>Post Item</h3></button>
                </form>
                </Grid>
            </React.Fragment>
        )
    }
}