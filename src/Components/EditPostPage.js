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
        category: "1",
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

    onImageDrop(files) {
        this.setState(({ pictureURL }) => ({
            pictureURL: this.state.pictureURL.concat(files)
        }))
    }

    render() {
        if (this.state.post){
        // return (
        //     <React.Fragment>
        //     <h1>{this.state.post.title}</h1>
        //     </React.Fragment>
        //)
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
                                        // alert("You have photos that have not been uploaded")
                                        this.setState({ photoDialog: true })
                                        return
                                    }
                                    else if (this.state.phone) {
                                        let phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
                                        if (this.state.phone.match(phoneno)) {
                                            this.submitPost(e)
                                        }
                                        else {
                                            // alert("Please enter a valid 10-digit phone number")
                                            this.setState({ phoneDialog: true })
                                        }
                                    }
                                    else {
                                        this.submitPost(e)
                                    }
                                }}>
                                    <Grid item sm align="center" style={style.bottomMargin}>
                                        {/* <InputLabel htmlFor="title">Title: </InputLabel> */}
                                        <TextField onChange={this.handleFieldChange} id="title" type="text" required autoFocus label="Title" defaultValue={this.state.post.title}/>
                                    </Grid>
                                    <Grid item sm align="center" style={style.bottomMargin}>
                                        {/* <InputLabel htmlFor="price">Price: $</InputLabel> */}
                                        <TextField onChange={this.handleFieldChange} id="price" type="text" label="Price" defaultValue={this.state.post.price}/>
                                    </Grid>
                                    <Grid item sm align="center" style={style.bottomMargin}>
                                        {/* <InputLabel htmlFor="location">Specific Location: </InputLabel> */}
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
                                        {/* <InputLabel htmlFor="description">Description</InputLabel> */}
                                        <TextField fullWidth onChange={this.handleFieldChange} id="description" multiline rows="10" label="Item Description" style={{ width: "60%" }} defaultValue={this.state.post.description}/>
                                    </Grid>
                                    <Grid item sm align="center" style={style.bottomMargin}>
                                        <TextField onChange={this.handleFieldChange} id="email" label="Email" type="email" required style={{ marginRight: 40 }} defaultValue={this.state.post.email}/><TextField onChange={this.handleFieldChange} id="phone" ref="phoneInput" label="Phone Number" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" defaultValue={(this.state.post.phone) ? this.state.post.phone : ""}/>
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
                                                    {/* <img src={this.state.pictureURL} style={{height:300, width:"auto"}}/> */}
                                                    {this.state.pictureURL.map((photo, index) => {
                                                        return <div style={{ margin: "5px 15px" }}><div className="tooltip"><span className="tooltiptext" id={index} onClick={e => this.removePhoto(e)}>Click To Delete</span><PhotoPreview key={index} url={photo.preview} id={index} /></div></div>
                                                    })}
                                                </div>}
                                            <Button variant="outlined" onClick={this.uploadImages} style={{ marginTop: 20, marginBottom: 40 }}>Upload Photos</Button>
                                        </div>
                                    </Grid>
                                    <Grid item sm align="center">
                                        <Button variant="raised" color="primary" type="submit"
                                        // onSubmit={(e) => {
                                        //     if (this.state.photoArray.length === 0 && this.state.pictureURL.length !== 0) {
                                        //             alert("You have photos that have not been uploaded")
                                        //             return
                                        //         }
                                        //         else {
                                        //             // this.submitPost(e)
                                        //             }
                                        //             }}
                                        ><Typography variant="headline" style={{ color: "white" }}>Post Item</Typography></Button>
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
                                            Your item has been posted!
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