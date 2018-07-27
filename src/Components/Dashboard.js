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
            // <React.Fragment>
            //     <h1>My Items</h1>
            //         {this.state.posts.map(post => {
            //            return (
            //                 <React.Fragment key={post.id}>
            //                 <div id={post.id}>
            //                     <PostCard key={post.id} post={post}/>
            //                    <button>Edit Post</button><button onClick={this.deletePost}>Delete Post</button>
            //                 </div>
            //                 </React.Fragment>
            //            )
            //         })}
            // </React.Fragment>
            <React.Fragment>
            {this.state.posts.map(post => <EnableEdit post={post} updatePostList={this.updatePostList}/>)}
            </React.Fragment>
        )
    }
}