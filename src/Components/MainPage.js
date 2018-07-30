import React, { Component } from 'react'
import api from "./Api"
import CreatePostCard from "./CreatePostCard"
import { Grid, Typography, Select } from "@material-ui/core"

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
            <Grid item align="center">
                <Typography variant="display3">Main Page</Typography>
                <Typography variant="headline">{`All Posts from ${this.state.region} TN`}</Typography>
            </Grid>
            <Grid item align="center">
                <label htmlFor="region" style={{marginRight:20}}>Select Region:</label>
                <Select onChange={(e) => this.getSpecRegionPosts(e.target.value, this.state.order)} value={this.state.region}>
                    <option value="east">East</option>
                    <option value="middle">Middle</option>
                    <option value="west">West</option>
                    <option value="all">All</option>
                </Select>
                <label htmlFor="order" style={{marginRight:20, marginLeft: 30}}>Show:</label>
                <Select id="order" onChange={(e) => this.getSpecRegionPosts(this.state.region, e.target.value)} defaultValue="desc" value={this.state.order}>
                    <option value="desc">Newest First</option>
                    <option value="asc">Oldest First</option>
                </Select>
                </Grid>
                <Grid container>
                    {this.state.allPosts.map(post => <CreatePostCard key={post.id} card={post} />)}
                </Grid>
            </React.Fragment>
        )
    }
}