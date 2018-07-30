import React, { Component } from 'react'
import api from "./Api"
import CreatePostCard from "./CreatePostCard"
import { Grid, Typography, Select, InputLabel, MenuItem } from "@material-ui/core"

const style= {
    card: {
        minWidth: 275,
        margin: 40,
        maxHeight: 361
    }
}

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
                <Typography variant="display3">TVOS Marketplace</Typography>
                <Typography variant="headline">{`All posts from ${this.state.region} TN`}</Typography>
            </Grid>
            <Grid item align="center">
                <InputLabel htmlFor="region" style={{marginRight:20}}>Select Region:</InputLabel>
                <Select onChange={(e) => this.getSpecRegionPosts(e.target.value, this.state.order)} value={this.state.region}>
                    <MenuItem value="east">East</MenuItem>
                    <MenuItem value="middle">Middle</MenuItem>
                    <MenuItem value="west">West</MenuItem>
                    <MenuItem value="all">All</MenuItem>
                </Select>
                <InputLabel htmlFor="order" style={{marginRight:20, marginLeft: 30}}>Show:</InputLabel>
                <Select id="order" onChange={(e) => this.getSpecRegionPosts(this.state.region, e.target.value)} defaultValue="desc" value={this.state.order}>
                    <MenuItem value="desc">Newest First</MenuItem>
                    <MenuItem value="asc">Oldest First</MenuItem>
                </Select>
                </Grid>
                <Grid container lg={12} direction="row" justify="flex-start">
                    {this.state.allPosts.map(post => <Grid item xs={3}><CreatePostCard key={post.id} card={post} /></Grid>)}
                </Grid>
            </React.Fragment>
        )
    }
}