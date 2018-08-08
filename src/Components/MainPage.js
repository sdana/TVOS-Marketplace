import React, { Component } from 'react'
import api from "./Api"
import CreatePostCard from "./CreatePostCard"
import { Link } from "react-router-dom"
import { Grid, Typography, Select, InputLabel, MenuItem, TextField, Tooltip, Fade } from "@material-ui/core"


export default class MainPage extends Component {
    state = {
        allPosts: [],
        user: {},
        order: "desc"
    }

    defineRegion= () => {
        let regionString
            (sessionStorage.getItem("region")) ? regionString = sessionStorage.getItem("region") : regionString = this.state.region
            let newString
            if (regionString) {
                let newString = regionString.charAt(0).toUpperCase() + regionString.slice(1)
                regionString = newString
                return regionString
            }
            regionString = newString
            return regionString
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    componentDidMount() {
        const userId = sessionStorage.getItem("credentials")
        api.checkUserThing("id", userId).then(response => {
            this.setState({user: response[0]})
            if (sessionStorage.getItem("order")){
                let selectedOrder = sessionStorage.getItem("order")
                this.setState({order: selectedOrder})
            }
            if (!sessionStorage.getItem("region")){
                this.setState({region: this.state.user.region})
                switch (this.state.user.region){
                    case "all":
                        api.getAllPosts(this.state.order).then(response => this.setState({ allPosts: response }))
                        break
                    default:
                    this.getAllRegionalPosts(this.state.order)
                }

            }
            else if (sessionStorage.getItem("region") === "all"){
                this.setState({region: "all"})
                api.getAllPosts(this.state.order).then(response => this.setState({ allPosts: response}))
            }
            else {
                let selectedRegion = sessionStorage.getItem("region")
                this.setState({region: selectedRegion})
                this.getAllRegionalPosts(this.state.order)

            }
        })
    }

getAllRegionalPosts = (order) => {
    if (!sessionStorage.getItem("region")){
        api.getRegionalPosts(this.state.region, order).then(response => this.setState({ allPosts: response }))

    }
    else {
        let selectedRegion = sessionStorage.getItem("region")
        api.getRegionalPosts(selectedRegion, order).then(response => this.setState({ allPosts: response }))
    }
}

getSpecRegionPosts = (region, order) => {
    this.setState({region: region})
    if (region === "all"){
        api.getAllPosts(order).then(response => this.setState({allPosts: response, order: order}))
    }
    else {
        api.getRegionalPosts(region, order).then(response => this.setState({ allPosts: response, order: order }))
    }
}

    render() {
        if (!this.state.searchString){
            return (
                <React.Fragment>
                    <Grid item align="center">
                        <Typography variant="display3" style={{color:"White"}}>TVOS Marketplace</Typography>
                        <Typography variant="headline">{`Posts from ${this.defineRegion()} TN`}</Typography>
                    </Grid>
                    <Grid container xs={12} direction="row" justify="center">
                        <Grid item align="center">
                    <div style={{boxSizing:"border-box", background:"rgba(209, 215, 225, .6)",width:"100%",padding:10, paddingTop:0, margin:"auto", borderRadius:5}}>
                            <InputLabel htmlFor="region" style={{ marginRight: 20 }}>Select Region:</InputLabel>
                            <Select onChange={(e) => { sessionStorage.setItem("region", e.target.value); this.getSpecRegionPosts(e.target.value, this.state.order)}} value={(sessionStorage.getItem("region")) ? sessionStorage.getItem("region") : this.state.region}>
                                <MenuItem value="east">East</MenuItem>
                                <MenuItem value="middle">Middle</MenuItem>
                                <MenuItem value="west">West</MenuItem>
                                <MenuItem value="all">All</MenuItem>
                            </Select>
                            <InputLabel htmlFor="order" style={{ marginRight: 20, marginLeft: 30 }}>Show:</InputLabel>
                            <Select id="order" onChange={(e) => {sessionStorage.setItem("order", e.target.value); this.getSpecRegionPosts(this.state.region, e.target.value)}} defaultValue="desc" value={this.state.order}>
                                <MenuItem value="desc">Newest First</MenuItem>
                                <MenuItem value="asc">Oldest First</MenuItem>
                            </Select>
                            <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Search for post title, category, location, or description">
                            <div style={{ display: "inline-block", marginLeft: 30 }}><Grid><TextField id="searchString" label="Search" onChange={this.handleFieldChange}></TextField></Grid></div>
                            </Tooltip>
                    </div>
                        </Grid>
                    </Grid>
                    <Grid container lg={12} direction="row" justify="flex-start">
                        {this.state.allPosts.map(post => <Link to={`/viewPost/${post.id}`} style={{ textDecoration: "none" }}><Grid item xs={12} sm={6} lg={4} xl={2} key={post.id} ><CreatePostCard  card={post} /></Grid></Link>)}
                    </Grid>
                </React.Fragment>
            )
        }
        else {
            let searchArray = this.state.allPosts.filter((post) => { return post.title.toLowerCase().match(this.state.searchString) || post.categorie.cat.toLowerCase().match(this.state.searchString) || post.location.toLowerCase().match(this.state.searchString) || post.description.toLowerCase().match(this.state.searchString)})
            return (
                <React.Fragment>
                    <Grid item align="center">
                        <Typography variant="display3" style={{color:"white"}}>TVOS Marketplace</Typography>
                        <Typography variant="headline">Search Results</Typography>
                    </Grid>
                    <Grid container xs={24} direction="row" justify="center">
                        <Grid item align="center">
                            <div style={{ boxSizing: "border-box", background: "rgba(209, 215, 225, .6)", width: "100%", padding: 10, paddingTop: 0, margin: "auto", borderRadius: 5 }}>
                            <InputLabel htmlFor="region" style={{ marginRight: 20 }}>Select Region:</InputLabel>
                            <Select onChange={(e) => {sessionStorage.setItem("region", e.target.value); this.getSpecRegionPosts(e.target.value, this.state.order)}} value={this.state.region}>
                                <MenuItem value="east">East</MenuItem>
                                <MenuItem value="middle">Middle</MenuItem>
                                <MenuItem value="west">West</MenuItem>
                                <MenuItem value="all">All</MenuItem>
                            </Select>
                            <InputLabel htmlFor="order" style={{ marginRight: 20, marginLeft: 30 }}>Show:</InputLabel>
                            <Select id="order" onChange={(e) => this.getSpecRegionPosts(this.state.region, e.target.value)} defaultValue="desc" value={this.state.order}>
                                <MenuItem value="desc">Newest First</MenuItem>
                                <MenuItem value="asc">Oldest First</MenuItem>
                            </Select>
                            <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Search for post title, category, location, or description">
                            <div style={{ display: "inline-block", marginLeft: 30 }}><Grid><TextField id="searchString" label="Search" onChange={this.handleFieldChange}></TextField></Grid></div>
                            </Tooltip>
                        </div>
                        </Grid>
                    </Grid>
                    <Grid container lg={12} direction="row" justify="flex-start" style={{overflowY:"scroll", overflowX:"hidden"}}>
                        {searchArray.map(post => <Link to={`/viewPost/${post.id}`} style={{ textDecoration: "none" }}><Grid item xs={12} sm={6} lg={4} xl={2}><CreatePostCard key={post.id} card={post} /></Grid></Link>)}
                    </Grid>
                </React.Fragment>
            )
        }
    }
}