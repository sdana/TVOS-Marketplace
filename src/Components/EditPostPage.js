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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import "./PhotoPreviewCSS.css"

const cloudUpPreset = "qamybs5i"
const cloudUpAddr = "https://api.cloudinary.com/v1_1/tvos-marketplace/upload"

const style = {
    bottomMargin: {
        marginBottom: 40
    }
}



export default class EditPost extends Component {

    state = {
        user: {},
        title: "",
        price: "",
        description: "",
        location: "",
        redirect: false,
        category: "",
        pictureURL: [],
        photoArray: [],
        email: "",
        phone: "",
        phoneDialog: false,
        photoDialog: false
    }

    componentDidMount() {
        api.getPost(this.props.match.params.postId).then(response => this.setState({ post: response })).then(response => {this.setState({category: this.state.post.categorieId})})
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    }

    handleDialogClose = (which, redirectBool) => {
        this.setState({ [which]: false });
        this.setState({ redirect: redirectBool })
    }

    onImageDrop(files) {
        this.setState(({ pictureURL }) => ({
            pictureURL: this.state.pictureURL.concat(files)
        }))
    }

    removePostedPhoto = (e) => {
        let photoId = parseInt(e.target.id)
        let newArray = this.state.post.photo
        newArray.splice(photoId, 1)
        let originalObject = this.state.post
        originalObject.photo = newArray
        this.setState({ post: originalObject})
    }

    removePhoto = (e) => {
        let photoId = parseInt(e.target.id)
        let newArray = this.state.pictureURL
        newArray.splice(photoId, 1)
        this.setState({ pictureURL: newArray })
    }

    uploadImages = () => {
        this.setState(({photoArray}) => ({
            photoArray: this.state.post.photo,
        }))
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

    checkValues(){
        let title = (this.state.title) ? this.state.title : this.state.post.title
        let price = (this.state.price) ? this.state.price : this.state.post.price
        let location = (this.state.location) ? this.state.location : this.state.post.location
        let category = (this.state.category) ? this.state.category : this.state.post.categorieId
        let description = (this.state.description) ? this.state.description : this.state.post.description
        let email = (this.state.email) ? this.state.email : this.state.post.email
        let phone = (this.state.phone) ? this.state.phone : this.state.post.phone
        let photos = []
        if (this.state.photoArray.length === 0){
            photos = this.state.post.photo
        }
        else {
            photos = this.state.photoArray
        }
        let editObject = {
            userId: this.state.post.userId,
            title: title,
            price: price,
            location: location,
            categorieId: category,
            description: description,
            region: this.state.post.regionId,
            photo: photos,
            email: email,
            phone: phone
        }
        console.log("OBJECT", editObject)

        return editObject
    }


    submitEdits = (e) => {
        e.preventDefault()
        api.editItem(this.state.post.id, this.checkValues()).then(response => {
            this.setState({ openDialog: true });
        })
    }

    render() {
        if (this.state.post){
                if (this.state.redirect) {
                    return (
                        <Redirect to={"/Dashboard"} />
                    )
                }
                return (
                    <React.Fragment>
                        <div style={{ backgroundColor: "rgba(250, 250, 250, .9)", width: "60vw", maxHeight: "80vh", overflowY: "scroll", overflowX: "hidden", margin: "auto", padding: 50 }}>
                            <Typography variant="display3" align="center" style={{ color: "white", textShadow: "1px 1px .5px black", marginBottom: 40 }}>Edit Post</Typography>
                            <Grid container xs={12} direction="column" justify="center">
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    if (this.state.photoArray.length === 0 && this.state.pictureURL.length !== 0) {
                                        this.setState({ photoDialog: true })
                                        return
                                    }
                                    else if (this.state.phone) {
                                        let phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
                                        if (this.state.phone.match(phoneno)) {
                                            this.submitEdits(e)
                                        }
                                        else {
                                            this.setState({ phoneDialog: true })
                                        }
                                    }
                                    else {
                                        this.submitEdits(e)
                                    }
                                }}>
                                    <Grid item sm align="center" style={style.bottomMargin}>
                                        <TextField onChange={this.handleFieldChange} id="title" type="text" required autoFocus label="Title" defaultValue={this.state.post.title}/>
                                    </Grid>
                                    <Grid item sm align="center" style={style.bottomMargin}>
                                        <TextField onChange={this.handleFieldChange} id="price" type="text" label="Price" defaultValue={this.state.post.price}/>
                                    </Grid>
                                    <Grid item sm align="center" style={style.bottomMargin}>
                                        <TextField onChange={this.handleFieldChange} id="location" type="text" required label="Specific Location" defaultValue={this.state.post.location}/>
                                    </Grid>
                                    <Grid item sm align="center" style={style.bottomMargin}>
                                        <InputLabel htmlFor="category" style={{ marginBottom: 40, marginRight: 40 }}>Item Category: </InputLabel>
                                        <Select ref="category" id="category" onChange={e => this.setState({ category: e.target.value })} defaultValue={this.state.post.categorieId} value={this.state.category} required>
                                            <MenuItem value="1">Free</MenuItem>
                                            <MenuItem value="2">Produce</MenuItem>
                                            <MenuItem value="3">Farm Equipment</MenuItem>
                                            <MenuItem value="4">Wine</MenuItem>
                                            <MenuItem value="5">Request</MenuItem>
                                        </Select>
                                    </Grid>
                                    <Grid item sm align="center" style={style.bottomMargin}>
                                        <TextField fullWidth onChange={this.handleFieldChange} id="description" multiline rows="10" label="Item Description" style={{ width: "60%" }} defaultValue={this.state.post.description}/>
                                    </Grid>
                                    <Grid item sm align="center" style={style.bottomMargin}>
                                        <TextField onChange={this.handleFieldChange} id="email" label="Email" type="email" required style={{ marginRight: 40 }} defaultValue={this.state.post.email}/><TextField onChange={this.handleFieldChange} id="phone" ref="phoneInput" label="Phone Number" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" defaultValue={(this.state.post.phone) ? this.state.post.phone : ""}/>
                                    </Grid>
                                    <Typography variant="display1" align="center" style={{marginBottom:15, width:"100%", borderBottom:".5px dashed grey"}}>Posted Photos</Typography>
                                    <Grid container xs={12} direction="row" justify="flex-start">
                                        {this.state.post.photo.map((photo, index) => {
                                            return <div style={{ margin: "5px 15px" }}><div className="tooltip"><span className="tooltiptext" id={index} onClick={e => this.removePostedPhoto(e)}>Click To Delete</span><img style={{maxHeight:300}} src={`${photo}`} /></div></div>})}
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
                                                <div style={{ display: "flex", direction: "row", justifyContent: "flex-start", flexWrap: "wrap" }}>
                                                    {this.state.pictureURL.map((photo, index) => {
                                                        return <div style={{ margin: "5px 15px" }}><div className="tooltip"><span className="tooltiptext" id={index} onClick={e => this.removePhoto(e)}>Click To Delete</span><PhotoPreview key={index} url={photo.preview} id={index} /></div></div>
                                                    })}
                                                </div>}
                                            <Button variant="outlined" onClick={this.uploadImages} style={{ marginTop: 20, marginBottom: 40 }}>Upload Photos</Button>
                                        </div>
                                    </Grid>
                                    <Grid item sm align="center">
                                        <Button variant="raised" color="primary" type="submit"><Typography variant="headline" style={{ color: "white" }}>Submit Edits</Typography></Button>
                                    </Grid>
                                </form>
                            </Grid>
                        </div >
                        {(this.state.open) ? <div>
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
                        </div> : <div />}
                        {(this.state.openDialog) ? (
                            <div style={{ width: 700 }}>
                                <Dialog
                                    open={this.state.openDialog}
                                    onClose={this.handleDialogClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">{"Post Item"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Edits successful!
                             </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => this.handleDialogClose("openDialog", true)} color="primary">
                                            Close
                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        ) : <div />}
                        {(this.state.phoneDialog) ? (
                            <div style={{ width: 700 }}>
                                <Dialog
                                    open={this.state.phoneDialog}
                                    onClose={this.handleDialogClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">{"Post Item"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Please enter a valid 10-digit phone number
                             </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => this.handleDialogClose("phoneDialog", false)} color="primary">
                                            Close
                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        ) : <div />}
                        {(this.state.photoDialog) ? (
                            <div style={{ width: 700 }}>
                                <Dialog
                                    open={this.state.photoDialog}
                                    onClose={this.handleDialogClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">{"Post Item"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            You have photos that have not been uploaded! Please click the <em>Upload Photos</em> button.
                             </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => this.handleDialogClose("photoDialog", false)} color="primary">
                                            Close
                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        ) : <div />}
                    </React.Fragment >
                )
            }
    else {
        return (
            <h2>Post Not Found</h2>
        )
    }
    }
}