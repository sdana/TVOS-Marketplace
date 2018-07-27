import React, { Component } from 'react'
import api from "./Api"
import PostCard from "./CreatePostCard"

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
                        <button onClick={this.editModeEnable}>Edit Post</button><button onClick={this.deletePost}>Delete Post</button>
                    </div>
                </React.Fragment>
            )
        }
        else {
            return(
                <React.Fragment key={this.props.post.id}>
                    <div id={this.props.post.id}>
                        <div className="post-card" id={this.props.post.id}>
                            <input onChange={this.handleFieldChange} id="title" type="text" placeholder={this.props.post.title}></input>
                            <input onChange={this.handleFieldChange} id="price" type="text" placeholder={this.props.post.price}></input>
                            <input onChange={this.handleFieldChange} id="location" type="text" placeholder={this.props.post.location}></input>
                            <select ref="category" id="category" defaultValue={`${this.props.post.categorie.id}`}>
                                <option value="1">Free</option>
                                <option value="2">Produce</option>
                                <option value="3">Farm Equipment</option>
                                <option value="4">Wine</option>
                                <option value="5">Request</option>
                            </select>
                            <textarea onChange={this.handleFieldChange} id="description" placeholder={this.props.post.description}></textarea>
                            <button onClick={()=>{this.setState({editMode: false}); this.editPost(this.props.post.id, this.state.title, this.state.price, this.state.location, this.refs.category.value, this.state.description)}}>Submit</button>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }
}