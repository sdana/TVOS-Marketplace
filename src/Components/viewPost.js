import React, { Component } from 'react'
import { render } from "react-dom"
import { Carousel } from 'react-responsive-carousel'
import api from "./Api"
import Typography from "@material-ui/core/Typography"
import ReturnImg from "./ReturnImg"
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css'
import Grid from "@material-ui/core/Grid"


export default class ViewPost extends Component {
    state = {
        post: {
            photo: []
        }
    }

    componentDidMount() {
        api.getPost(this.props.match.params.postId).then(response => this.setState({post: response}))
    }


    render() {
        console.log("working")
        return(
            <React.Fragment>
                <Grid container xs={24}>
                <div style={{ backgroundColor:"rgba(255, 255, 255, .7)", width:"75vw",height:"auto", margin:"auto", padding:50}}>
                <Typography variant="display3">{this.state.post.title}</Typography>
                <Typography variant="display2">${this.state.post.price}</Typography>
                <Typography variant="display2" style={{marginBottom:50}}>{this.state.post.location}, {this.state.post.regionId} TN</Typography>

                    <Grid item sm align="center">
                            <Carousel width="50vw" swipeable emulateTouch infiniteLoop interval={3000} autoPlay useKeyboardArrows showStatus={false} >
                    {this.state.post.photo.map(photo => {
                        return (
                            <div>
                                <img src={photo}/>
                            </div>
                        )
                    })}
                </Carousel>
                </Grid>
                <Typography variant="display1">{this.state.post.description}</Typography>
                <Typography variant="headline" style={{marginTop:30}}>Contact: <Typography variant="subheading">{(this.state.post.email) ? this.state.post.email : "No Email"}</Typography> <Typography variant="subheading">{(this.state.post.phone) ? this.state.post.phone : "No Phone Number"}</Typography></Typography>
            </div>
            </Grid>
            </React.Fragment>
        )
    }
}