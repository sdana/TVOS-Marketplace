import React, { Component } from 'react'
import api from "./Api"
import {Redirect} from "react-router-dom"

export default class PostItem extends Component {
    state = {
        user: {},
        title: "",
        price: "",
        description: "",
        location: "",
        redirect: false
    }

    handleFieldChange = evt => {
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
                <h1>Post A New Item</h1>
                <form onSubmit={(e) => this.submitPost(e)}>
                    <label htmlFor="title">Title</label>
                    <input onChange={this.handleFieldChange} id="title" type="text" required autoFocus />
                    <label htmlFor="price">Price: $</label>
                    <input onChange={this.handleFieldChange} id="price" type="text" required />
                    <label htmlFor="location">Specific Location</label>
                    <input onChange={this.handleFieldChange} id="location" type="text" required />
                    <select ref="category" id="category" defaultValue="">
                        <option value="" required disabled hidden>Category</option>
                        <option value="1">Free</option>
                        <option value="2">Produce</option>
                        <option value="3">Farm Equipment</option>
                        <option value="4">Wine</option>
                        <option value="5">Request</option>
                    </select>
                    {/* <label htmlFor="region">Region</label>
                    <select id="region">
                        <option value="1">East</option>
                        <option value="2">Middle</option>
                        <option value="3">West</option>
                    </select> */}
                    <label htmlFor="description">Description</label>
                    <textarea onChange={this.handleFieldChange} id="description" rows="10" cols="150" />
                    <button><h3>Post Item</h3></button>
                </form>
            </React.Fragment>
        )
    }
}