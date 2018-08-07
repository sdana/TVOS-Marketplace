import React, { Component } from 'react'
import api from "./Api"


export default class EditPost extends Component {

    state = {
    }
        componentDidMount() {
            api.getPost(this.props.match.params.postId).then(response => this.setState({ post: response }))
        }

    render() {
        if (this.state.post){
        return (
            <React.Fragment>
            <h1>{this.state.post.title}</h1>
            </React.Fragment>
        )
    }
    else {
        return (
            <h2>No Item</h2>
        )
    }
    }
}