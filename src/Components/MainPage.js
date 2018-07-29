import React, { Component } from 'react'
import api from "./Api"
import CreatePostCard from "./CreatePostCard"

export default class MainPage extends Component {
    state = {
        allPosts: [],
        user: {},
        order: "desc"
    }

    componentDidMount() {
        const userId = sessionStorage.getItem("credentials")
        api.checkUserThing("id", userId).then(response => {
            this.setState({user: response[0]})
            this.setState({region: response[0].region})
            this.getAllRegionalPosts(this.state.order)
        })
    }
getAllRegionalPosts = (order) => {
    api.getRegionalPosts(this.state.region, order).then(response => this.setState({allPosts: response}))
}

getSpecRegionPosts = (region, order) => {
    console.log(region, order)
    this.setState({region: region})
    if (region === "all"){
        api.getAllPosts(order).then(response => this.setState({allPosts: response, order: order}))
    }
    else {
        api.getRegionalPosts(region, order).then(response => this.setState({ allPosts: response, order: order }))
    }
}

    render() {
        return(
            <React.Fragment>
                <h1>Main Page</h1>
                <h2>{`All Posts from ${this.state.region} TN`}</h2>
                <label htmlFor="region">Select Region:</label>
                <select onChange={(e) => this.getSpecRegionPosts(e.target.value, this.state.order)} value={this.state.region}>
                    <option value="east">East</option>
                    <option value="middle">Middle</option>
                    <option value="west">West</option>
                    <option value="all">All</option>
                </select>
                <label htmlFor="order">Show:</label>
                <select id="order" onChange={(e) => this.getSpecRegionPosts(this.state.region, e.target.value)} defaultValue="desc">
                    <option value="desc">Newest First</option>
                    <option value="asc">Oldest First</option>
                </select>
                {this.state.allPosts.map(post => <CreatePostCard key={post.id} card={post} />)}
            </React.Fragment>
        )
    }
}