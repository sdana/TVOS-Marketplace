import React, { Component } from 'react'
import api from "./Api"
import Typography from "@material-ui/core/Typography"


export default class ViewPost extends Component {
    state = {
        post: {}
    }

    componentDidMount() {
        api.getPost(this.props.match.params.postId).then(response => this.setState({post: response}))
    }

    render() {
        console.log("working")
        return(
            <React.Fragment>
                <Typography variant="display3">{this.state.post.title}</Typography>
                <Typography variant="display2">${this.state.post.price}</Typography>
                <Typography variant="display2">{this.state.post.location}, {this.state.post.regionId} TN</Typography>
                <Typography variant="body2">{this.state.post.description}</Typography>
            </React.Fragment>
        )
    }
}