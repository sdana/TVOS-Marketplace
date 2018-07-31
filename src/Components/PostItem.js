import React, { Component } from 'react'
import api from "./Api"
import { Redirect } from "react-router-dom"
import { TextField, Typography, InputLabel, Grid, Select, MenuItem, Button } from "@material-ui/core"
import Dropzone from 'react-dropzone'
import request from 'superagent'
import PhotoPreview from "./PhotoPreview"

const cloudUpPreset = "qamybs5i"
const cloudUpAddr = "https://api.cloudinary.com/v1_1/tvos-marketplace/upload"

export default class PostItem extends Component {
    state = {
        user: {},
        title: "",
        price: "",
        description: "",
        location: "",
        redirect: false,
        category: "1",
        pictureURL: [],
        photoArray: []
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }


    componentDidMount() {
        if (!sessionStorage.getItem("credentials")) {
            api.checkUserThing("id", this.props.userId).then(user => {
                console.log(user)
                this.setState({ user: user[0] })
            })
        }
        else {
            const userId = sessionStorage.getItem("credentials")
            api.checkUserThing("id", userId).then(user => {
                this.setState({ user: user[0] })
            })
        }
    }

    submitPost = (e) => {
        e.preventDefault()
        api.postItem(this.state.user.id, this.state.title, this.state.price, this.state.location, this.state.category, this.state.description, this.state.user.region, this.state.photoArray).then(response => {
            alert("Post Successful!")
            this.setState({ redirect: true })
        })
    }

    onImageDrop(files) {
        // console.log(files[0])
        this.setState(({ pictureURL }) => ({
            pictureURL: this.state.pictureURL.concat(files)
        }))
        // this.state.pictureURL.map(picture => {this.handleImageUpload(picture)})
    }

    uploadImages = () => {
        this.state.pictureURL.map(photo => {
            console.log("MAPPING")
           this.handleImageUpload(photo)
        })
    }

    handleImageUpload(file) {
        let upload = request.post(cloudUpAddr)
            .field('upload_preset', cloudUpPreset)
            .field('file', file);

        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }

            if (response.body.secure_url !== '') {
                this.setState(({ photoArray }) => ({
                    photoArray: this.state.photoArray.concat(response.body.secure_url)
                }))
            }
        });
    }


    render() {
        if (this.state.redirect) {
            return (
                <Redirect to={"/Dashboard"} />
            )
        }
        return (
            <React.Fragment>
                <Typography variant="display3" align="center">Post A New Item</Typography>
                <Grid container xs={12} direction="column" justify="center">
                    <form onSubmit={(e) => this.submitPost(e)}>
                        <Grid item sm align="center">
                            <InputLabel htmlFor="title">Title: </InputLabel>
                            <TextField onChange={this.handleFieldChange} id="title" type="text" required autoFocus />
                        </Grid>
                        <Grid item sm align="center">
                            <InputLabel htmlFor="price">Price: $</InputLabel>
                            <TextField onChange={this.handleFieldChange} id="price" type="text" required />
                        </Grid>
                        <Grid item sm align="center">
                            <InputLabel htmlFor="location">Specific Location: </InputLabel>
                            <TextField onChange={this.handleFieldChange} id="location" type="text" required />
                        </Grid>
                        <Grid item sm align="center">
                            <InputLabel htmlFor="category">Item Category: </InputLabel>
                            <Select ref="category" id="category" onChange={e => this.setState({ category: e.target.value })} defaultValue={this.state.category} value={this.state.category}>
                                <MenuItem value="1">Free</MenuItem>
                                <MenuItem value="2">Produce</MenuItem>
                                <MenuItem value="3">Farm Equipment</MenuItem>
                                <MenuItem value="4">Wine</MenuItem>
                                <MenuItem value="5">Request</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item sm align="center">
                            <InputLabel htmlFor="description">Description</InputLabel>
                            <TextField onChange={this.handleFieldChange} id="description" rows="10" />
                        </Grid>
                        <Grid item md align="center">
                            <Dropzone style={{height:100, width:200, border:"1px dashed grey"}}
                                multiple
                                accept="image/*"
                                onDrop={this.onImageDrop.bind(this)}>
                                <Typography variant="caption" style={{paddingTop:"15%"}}>Drop an image or click to select a file to upload.</Typography>
                            </Dropzone>
                            <div>
                                {this.state.pictureURL === [] ? null :
                                    <div>
                                        {/* <img src={this.state.pictureURL} style={{height:300, width:"auto"}}/> */}
                                        {this.state.pictureURL.map(photo => {return <PhotoPreview url={photo.preview}/>})}
                                    </div>}
                                    <Button variant="outlined" onClick={this.uploadImages}>Upload Photos</Button>
                            </div>
                        </Grid>
                        <Grid item sm align="center">
                            <Button variant="raised" color="primary" onClick={this.submitPost} ><Typography variant="headline">Post Item</Typography></Button>
                        </Grid>
                    </form>
                </Grid>
            </React.Fragment>
        )
    }
}