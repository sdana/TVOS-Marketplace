
import React, { Component } from 'react'

export default class MakePostCard extends Component {
    render() {
        console.log("card thing", this.props.card)
        // return(<h1>TEST</h1>)
            return (
                <div className="post-card" id={this.props.card[0].id}>
                    <h3>{this.props.card[0].title}</h3>
                    <h4>{this.props.card[0].price}</h4>
                    <h4>{this.props.card[0].location}</h4>
                    <h5>{this.props.card[0].categorie.cat}</h5>
                    <h5>{this.props.card[0].description}</h5>
                </div>
            )
    }
}