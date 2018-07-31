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
                <div style={{ backgroundColor:"rgba(255, 255, 255, .5)", width:"90vw", margin:"auto", padding:50}}>
                <Typography variant="display3">{this.state.post.title}</Typography>
                <Typography variant="display2">${this.state.post.price}</Typography>
                <img src={this.state.post.photo} style={{height:500}}/>
                <Typography variant="display2">{this.state.post.location}, {this.state.post.regionId} TN</Typography>
                <Typography variant="body2">{this.state.post.description}</Typography>
            </div>
            </React.Fragment>
        )
    }
}