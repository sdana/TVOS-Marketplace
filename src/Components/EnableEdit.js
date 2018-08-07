import React, { Component } from 'react'
import api from "./Api"
import PostCard from "./CreatePostCard"
import Button from '@material-ui/core/Button';
// import Input from "@material-ui/core/Input"
// import InputAdornment from "@material-ui/core/InputAdornment"
import Grid from "@material-ui/core/Grid"
// import Card from "@material-ui/core/Card"
// import Paper from "@material-ui/core/Paper"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import TextField from "@material-ui/core/TextField"
import { Link } from "react-router-dom"
// import ReturnImg from './ReturnImg';

const styles = {
    div: {
        minWidth: 275,
        margin: 40,
        marginBottom: 60,
        maxHeight: 400,
    },
    card: {
        maxHeight: 200,
    },
    addPadd: {
        padding: 15
    }
}

export default class EnableEdit extends Component {
    state = {
        editMode: false
    }

    editModeEnable = () => {
        this.setState({ editMode: true })
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    editPost = (postId, title, price, location, category, description) => {
        api.editPost(postId, title, price, location, category, description).then(response => {
            this.setState({ editMode: false })
            this.props.updatePostList(this.props.post.userId)
        })
    }

    cancel = () => {
        this.setState({ editMode: false })
    }

    deletePost = (e) => {
        const postId = e.target.parentNode.id
        api.deleteUserPost(postId).then(() => {
            this.props.updatePostList(this.props.post.userId)
        })
    }

    render() {
        if (!this.state.editMode) {
            return (
                <React.Fragment key={this.props.post.id}>
                    <div>
                        <div style={styles.div} id={this.props.post.id}>
                            <Link to={`/viewPost/${this.props.post.id}`} style={{ textDecoration: "none" }}><PostCard key={this.props.post.id} card={this.props.post} /></Link>
                            <Grid container direction="row" justify="space-evenly">
                                <Grid item>
                                    <Link to={`/editPost/${this.props.post.id}`} style={{ textDecoration: "none" }}><Button style={styles.button} variant="raised" color="primary">Edit Post</Button></Link>
                                </Grid>
                                <Grid item>
                                    <Button id={this.props.post.id} style={styles.button} onClick={this.deletePost} variant="flat" color="secondary">Delete Post</Button>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
        else {
            return (
                <React.Fragment key={this.props.post.id}>
                    <div style={{ backgroundColor: "rgba(255, 255, 255, .7)", width: 395, height: "auto", margin: "auto", paddingLeft: 20, paddingRight: 80, paddingTop: 20, paddingBottom: 20 }}>
                    <Grid container xs={24} direction="column" justify="flex-start">
                    <div id={this.props.post.id}>
                        <div className="post-card" id={this.props.post.id}>
                            {/* <InputAdornment htmlFor="title" position="top">Title</InputAdornment> */}
                            <Grid item >
                                <TextField onChange={this.handleFieldChange} id="title" type="text" placeholder={this.props.post.title} label="Title" fullWidth style={styles.addPadd}></TextField>
                            </Grid>
                            {/* <label htmlFor="price">Price</label> */}
                            <Grid item>
                                    <TextField onChange={this.handleFieldChange} id="price" type="text" label="Price" placeholder={this.props.post.price} fullWidth style={styles.addPadd}></TextField>
                            </Grid>
                            {/* <label htmlFor="location">Location</label> */}
                            <Grid>
                                    <TextField onChange={this.handleFieldChange} id="location" type="text" placeholder={this.props.post.location} label="Location" fullWidth style={styles.addPadd}></TextField>
                            </Grid>
                            {/* <label htmlFor="category">Category</label> */}
                            {/* <select ref="category" id="category" defaultValue={`${this.props.post.categorie.id}`}>
                                <option value="1">Free</option>
                                <option value="2">Produce</option>
                                <option value="3">Farm Equipment</option>
                                <option value="4">Wine</option>
                                <option value="5">Request</option>
                            </select> */}
                            <Grid item>
                            <Select ref="category" id="category" onChange={e => this.setState({ category: e.target.value })} defaultValue={this.props.post.categorieId} value={this.state.category} align="center" style={{width:250}}>
                                <MenuItem value="1">Free</MenuItem>
                                <MenuItem value="2">Produce</MenuItem>
                                <MenuItem value="3">Farm Equipment</MenuItem>
                                <MenuItem value="4">Wine</MenuItem>
                                <MenuItem value="5">Request</MenuItem>
                            </Select>
                            </Grid>
                            {/* <label htmlFor="description">Description</label> */}
                            <Grid item>
                                    <TextField onChange={this.handleFieldChange} id="description" placeholder={this.props.post.description} multiline rows="4" fullWidth style={styles.addPadd}></TextField>
                            </Grid>
                            <Grid>
                            <Button variant="raised" color="primary" onClick={() => { this.setState({ editMode: false }); this.editPost(this.props.post.id, this.state.title, this.state.price, this.state.location, this.refs.category.value, this.state.description) }}>Save</Button><Button variant="outlined" color="secondary" onClick={this.cancel} style={{marginLeft:15}}>Cancel</Button>
                            </Grid>
                        </div>
                    </div>
                    </Grid>
                    </div>
                </React.Fragment>
            )
        }
    }
}