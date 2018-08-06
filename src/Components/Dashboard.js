import React, { Component } from 'react'
import api from "./Api"
// import PostCard from "./CreatePostCard"
import EnableEdit from "./EnableEdit"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

// const styles = {
//     card: {
//         minWidth: 275,
//         margin: 40,
//         maxHeight: 361,
//         overflow: "hidden"
//     }
// }

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
            <Typography variant="display3" align="center" style={{color:"white"}}>My Items</Typography>
            <Grid container direction="row" xs={24}>
            {this.state.posts.map(post => <Grid item xs={12} sm={6} lg={4} xl={3}><EnableEdit key={post.id} post={post} updatePostList={this.updatePostList}/></Grid>)}
            </Grid>
            </React.Fragment>
        )
    }
}