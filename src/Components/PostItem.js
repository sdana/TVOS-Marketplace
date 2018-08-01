import React, { Component } from 'react'
import api from "./Api"
import { Redirect } from "react-router-dom"
import { TextField, Typography, InputLabel, Grid, Select, MenuItem, Button } from "@material-ui/core"
import Dropzone from 'react-dropzone'
import request from 'superagent'
import PhotoPreview from "./PhotoPreview"
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
// import { withStyles } from '@material-ui/core/styles';


const cloudUpPreset = "qamybs5i"
const cloudUpAddr = "https://api.cloudinary.com/v1_1/tvos-marketplace/upload"

const style = {
    bottomMargin: {
        marginBottom: 40
    }
}

// const styles = theme => ({
//     close: {
//         width: theme.spacing.unit * 4,
//         height: theme.spacing.unit * 4,
//     },
// });

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
        photoArray: [],
        email: "",
        phone: ""
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

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    // componentDidUpdate() {
    //     if (this.state.categorie === "1") {
    //         let disablePrice = true
    //     }
    // }

    submitPost = (e) => {
        e.preventDefault()
        // if (this.state.category === "1"){
        //     let price = "Free"
        // }
        // else {
        //     let price = this.state.price
        // }
        api.postItem(this.state.user.id, this.state.title, this.state.price, this.state.location, this.state.category, this.state.description, this.state.user.region, this.state.photoArray, this.state.email, this.state.phone).then(response => {
            alert("Post Successful!")
            this.setState({ redirect: true })
        })
    }

    onImageDrop(files) {
        // console.log(files[0])
        this.setState(({ pictureURL }) => ({
            pictureURL: this.state.pictureURL.concat(files)
        }))
    }

    uploadImages = () => {
        this.state.pictureURL.map(photo => {
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
                    photoArray: this.state.photoArray.concat(response.body.secure_url),
                    open: true
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
                <div style={{ backgroundColor: "rgba(255, 255, 255, .5)", width: "60vw", height: "auto", margin: "auto", padding: 50 }}>
                    <Typography variant="display3" align="center" style={{color:"white", marginBottom:40}}>Post A New Item</Typography>
                    <Grid container xs={12} direction="column" justify="center">
                        <form onSubmit={(e) => this.submitPost(e)}>
                            <Grid item sm align="center" style={style.bottomMargin}>
                                {/* <InputLabel htmlFor="title">Title: </InputLabel> */}
                                <TextField onChange={this.handleFieldChange} id="title" type="text" required autoFocus label="Title" />
                            </Grid>
                            <Grid item sm align="center" style={style.bottomMargin}>
                                {/* <InputLabel htmlFor="price">Price: $</InputLabel> */}
                                <TextField onChange={this.handleFieldChange} id="price" type="text" label="Price" />
                            </Grid>
                            <Grid item sm align="center" style={style.bottomMargin}>
                                {/* <InputLabel htmlFor="location">Specific Location: </InputLabel> */}
                                <TextField onChange={this.handleFieldChange} id="location" type="text" required label="Specific Location" />
                            </Grid>
                            <Grid item sm align="center" style={style.bottomMargin}>
                                <InputLabel htmlFor="category" style={{marginBottom:40, marginRight: 40}}>Item Category: </InputLabel>
                            <Select ref="category" id="category" onChange={e => this.setState({ category: e.target.value })} defaultValue={this.state.category} value={this.state.category}>
                                <MenuItem value="1">Free</MenuItem>
                                <MenuItem value="2">Produce</MenuItem>
                                <MenuItem value="3">Farm Equipment</MenuItem>
                                <MenuItem value="4">Wine</MenuItem>
                                <MenuItem value="5">Request</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item sm align="center" style={style.bottomMargin}>
                            {/* <InputLabel htmlFor="description">Description</InputLabel> */}
                                    <TextField fullWidth onChange={this.handleFieldChange} id="description" multiline rows="10" label="Item Description" style={{ width: "60%" }} />
                        </Grid>
                        <Grid item sm align="center" style={style.bottomMargin}>
                            <TextField onChange={this.handleFieldChange} id="email" label="Email" type="email" style={{marginRight:40}} /><TextField onChange={this.handleFieldChange} id="phone" label="Phone Number" type="phone" />
                        </Grid>
                        <Grid item md align="center" style={style.bottomMargin}>
                            <Dropzone style={{ height: 100, width: 200, border: "1px dashed grey" }}
                                multiple
                                accept="image/*"
                                onDrop={this.onImageDrop.bind(this)}>
                                <Typography variant="caption" style={{ paddingTop: "15%" }}>Drop an image or click to select a file to upload.</Typography>
                            </Dropzone>
                            <div>
                                {this.state.pictureURL === [] ? null :
                                        <div style={{display: "flex", direction:"row", justifyContent:"flex-start", flexWrap:"wrap"}}>
                                        {/* <img src={this.state.pictureURL} style={{height:300, width:"auto"}}/> */}
                                        {this.state.pictureURL.map(photo => { return <div style={{ margin: "5px 15px"}}><PhotoPreview url={photo.preview} /></div> })}
                                    </div>}
                                <Button variant="outlined" onClick={this.uploadImages} style={{ marginTop: 20, marginBottom:40 }}>Upload Photos</Button>
                            </div>
                    </Grid>
                    <Grid item sm align="center">
                        <Button variant="raised" color="primary" onClick={this.submitPost} ><Typography variant="headline" style={{ color: "white" }}>Post Item</Typography></Button>
                    </Grid>
                    </form>
                </Grid>
                </div >
                    (this.state.open) ? (<div>
                        <Button onClick={this.handleClick}>Open simple snackbar</Button>
                        <Snackbar
                        variant="success"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            open={this.state.open}
                            autoHideDuration={4000}
                            onClose={this.handleClose}
                            ContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">Photos Successfully Uploaded!</span>}
                            action={[
                                <IconButton
                                    key="close"
                                    aria-label="Close"
                                    color="inherit"
                                    onClick={this.handleClose}
                                >
                                    <CloseIcon />
                                </IconButton>,
                            ]}
                        />
                    </div>) : null
            </React.Fragment >
        )
    }
}