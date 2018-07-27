import React, { Component } from 'react'
import api from "./Api"
import PostCard from "./CreatePostCard"

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

    deletePost = (e) => {
        console.log(e.target.parentNode.id)
        const postId = e.target.parentNode.id
        api.deleteUserPost(postId).then(() =>{
            api.getUserPosts(this.state.userId).then(response => {
                this.setState({posts: response})
            })
        })
    }

    render () {
        return (
            <React.Fragment>
                <h1>My Items</h1>
                    {this.state.posts.map(post => {
                       return (
                            <React.Fragment key={post.id}>
                            <div id={post.id}>
                                <PostCard key={post.id} post={post}/>
                               <button>Edit Post</button><button onClick={this.deletePost}>Delete Post</button>
                            </div>
                            </React.Fragment>
                       )
                    })}
            </React.Fragment>
        )
    }
}