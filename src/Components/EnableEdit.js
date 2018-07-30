import React, { Component } from 'react'
import api from "./Api"
import PostCard from "./CreatePostCard"
import Button from '@material-ui/core/Button';
import Input from "@material-ui/core/Input"
import InputAdornment from "@material-ui/core/InputAdornment"

export default class EnableEdit extends Component {
    state = {
        editMode: false
    }

    editModeEnable = () => {
        this.setState({editMode: true})
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    editPost = (postId, title, price, location, category, description) => {
        api.editPost(postId, title, price, location, category, description).then(response =>{
            this.setState({editMode: false})
            this.props.updatePostList(this.props.post.userId)
        })
    }

    cancel = () => {
        this.setState({editMode: false})
    }

    deletePost = (e) => {
        console.log(e.target.parentNode.id)
        const postId = e.target.parentNode.id
        api.deleteUserPost(postId).then(() => {
            this.props.updatePostList(this.props.post.userId)
        })
    }

    render() {
        console.log(this.props.post)
        if (!this.state.editMode){
            return (
                <React.Fragment key={this.props.post.id}>
                    <div id={this.props.post.id}>
                        <PostCard key={this.props.post.id} card={this.props.post} />
                        <Button onClick={this.editModeEnable} variant="raised" color="primary">Edit Post</Button><Button onClick={this.deletePost} variant="raised" color="secondary">Delete Post</Button>
                    </div>
                </React.Fragment>
            )
        }
        else {
            return(
                <React.Fragment key={this.props.post.id}>
                    <div id={this.props.post.id}>
                        <div className="post-card" id={this.props.post.id}>
                            <InputAdornment htmlFor="title" position="top">Title</InputAdornment>
                            <Input onChange={this.handleFieldChange} id="title" type="text" placeholder={this.props.post.title}></Input>
                            <label htmlFor="price">Price</label>
                            <input onChange={this.handleFieldChange} id="price" type="text" placeholder={this.props.post.price}></input>
                            <label htmlFor="location">Location</label>
                            <input onChange={this.handleFieldChange} id="location" type="text" placeholder={this.props.post.location}></input>
                            <label htmlFor="category">Category</label>
                            <select ref="category" id="category" defaultValue={`${this.props.post.categorie.id}`}>
                                <option value="1">Free</option>
                                <option value="2">Produce</option>
                                <option value="3">Farm Equipment</option>
                                <option value="4">Wine</option>
                                <option value="5">Request</option>
                            </select>
                            <label htmlFor="description">Description</label>
                            <textarea onChange={this.handleFieldChange} id="description" placeholder={this.props.post.description}></textarea>
                            <button onClick={()=>{this.setState({editMode: false}); this.editPost(this.props.post.id, this.state.title, this.state.price, this.state.location, this.refs.category.value, this.state.description)}}>Save</button><button onClick={this.cancel}>Cancel</button>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }
}