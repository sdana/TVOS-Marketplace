
import React, { Component } from 'react'

export default class MakePostCard extends Component {
    state = {
        editMode: false
    }

    render() {
        if (!this.state.editMode){
            return (
                <div className="post-card" id={this.props.post.id}>
                    <h3>{this.props.post.title}</h3>
                    <h4>{this.props.post.price}</h4>
                    <h4>{this.props.post.location}</h4>
                    <h5>{this.props.post.categorie.cat}</h5>
                    <h5>{this.props.post.description}</h5>
                </div>
            )
        }
    }
}


// "userId": 1,
//       "title": "thing",
//       "price": "ten",
//       "location": "nash",
//       "categorieId": "1",
//       "description": "get this ten thing",
//       "regionId": "middle",
//       "photo": "",
//       "id": 1