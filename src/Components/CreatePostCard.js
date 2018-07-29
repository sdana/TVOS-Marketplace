
import React, { Component } from 'react'

export default class MakePostCard extends Component {
    render() {
        console.log("card thing", this.props.card)
        // return(<h1>TEST</h1>)
            return (
                <div className="post-card" id={this.props.card.id}>
                    <h3>{this.props.card.title}</h3>
                    <h4>{this.props.card.price}</h4>
                    <h4>{this.props.card.location}</h4>
                    <h5>{this.props.card.categorie.cat}</h5>
                    <p>{this.props.card.description}</p>
                </div>
            )
    }
}