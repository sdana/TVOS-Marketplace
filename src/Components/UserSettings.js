import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import { Typography, Button } from "@material-ui/core"
export default class UserSettings extends Component {
    state = {
        backgroundImage: "https://images.unsplash.com/photo-1446413145391-40052a2477ee?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0002cd5cbc5b5d32f8a75fd15471e2b6&auto=format&fit=crop&w=1350&q=80)"

    }
    render(){
        let root = document.querySelector("root")
        return (
            <React.Fragment>
                <Typography variant="display3" align="center" style={{color:"white"}}>Settings</Typography>
                <div style={{ backgroundColor: "rgba(255, 255, 255, .7)", width: "45vw", height: "auto", margin: "auto", paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 20 }}>
                <Button variant="raised" onClick={() => {
                }}
                >Change Background</Button>
                </div>
            </React.Fragment>
        )
    }
}