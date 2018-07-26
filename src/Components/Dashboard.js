import React, { Component } from 'react'
import api from "./Api"

export default class Dashboard extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        console.log(`items for ${this.props.userId}`)
//change this to get userId directly from session storage instead of props SAYS JISSIE
        api.getUserPosts(this.props.userId).then(posts => {
            console.log(posts)
            this.setState({posts: posts})
        })
    }

    render () {
        return (
            <h1>My Items</h1>
        )
    }
}