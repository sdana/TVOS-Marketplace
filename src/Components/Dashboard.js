import React, { Component } from 'react'
import api from "./Api"
import PostCard from "./CreatePostCard"
import EnableEdit from "./EnableEdit"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

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
            <Typography variant="display3" align="center">My Items</Typography>
            <Grid container direction="row">
            {this.state.posts.map(post => <Grid item sm><EnableEdit key={post.id} post={post} updatePostList={this.updatePostList}/></Grid>)}
            </Grid>
            </React.Fragment>
        )
    }
}