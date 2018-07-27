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
                            <input type="text" placeholder={this.props.post.title}></input>
                            <input type="text" placeholder={this.props.post.price}></input>
                            <input type="text" placeholder={this.props.post.location}></input>
                            {/* <select>{this.props.post.categorie.cat}</h5> */}
                            <textarea placeholder={this.props.post.description}></textarea>
                            <button onClick={()=>this.setState({editMode: false})}>Submit</button>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }
}