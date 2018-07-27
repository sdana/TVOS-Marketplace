import React, { Component } from 'react'
import api from "./Api"
import PostCard from "./CreatePostCard"

export default class Dashboard extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        const userId = sessionStorage.getItem("credentials")
        console.log(`items for ${this.props.userId}`)
        api.getUserPosts(userId).then(posts => {
            console.log(posts)
            this.setState({posts: posts})
        })
    }

    render () {
        return (
            <React.Fragment>
                <h1>My Items</h1>
                <ul>
                    {this.state.posts.map(post => {
                       return <PostCard key={post.id} post={post} />
                        console.log(post)
                    })}
                </ul>
            </React.Fragment>
        )
    }
}