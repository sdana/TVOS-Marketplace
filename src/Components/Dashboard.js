import React, { Component } from 'react'
import api from "./Api"
import PostCard from "./CreatePostCard"
import EnableEdit from "./EnableEdit"

export default class Dashboard extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        const userId = sessionStorage.getItem("credentials")
        this.setState({userId: userId})
        console.log(`items for ${this.props.userId}`)
        api.getUserPosts(userId).then(posts => {
            console.log(posts)
            this.setState({posts: posts})
        })
    }

    updatePostList = (userId) => {
        api.getUserPosts(userId).then(posts => {
            console.log(posts)
            this.setState({ posts: posts })
        })
    }

    render () {
        // console.log(this.state.posts)
        return (
            <React.Fragment>
            {this.state.posts.map(post => <EnableEdit key={post.id} post={post} updatePostList={this.updatePostList}/>)}
            </React.Fragment>
        )
    }
}