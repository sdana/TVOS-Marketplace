import React, { Component } from 'react'
import api from "./Api"
import CreatePostCard from "./CreatePostCard"

export default class MainPage extends Component {
    state = {
        allPosts: [],
        user: {}
    }

    componentDidMount() {
        const userId = sessionStorage.getItem("credentials")
        api.checkUserThing("id", userId).then(response => {
            this.setState({user: response[0]})
            this.setState({region: response[0].region})
            this.getAllRegionalPosts(this.state.region)
        })
    }
getAllRegionalPosts = (userId) => {
    api.getRegionalPosts(this.state.region).then(response => this.setState({allPosts: response}))
}

    render() {
        return(
            <React.Fragment>
                <h1>Main Page</h1>
                <h2>{`All Posts from ${this.state.region} TN`}</h2>
                {this.state.allPosts.map(post => <CreatePostCard key={post.id} card={post} />)}
            </React.Fragment>
        )
    }
}