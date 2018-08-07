import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import { Typography, Button, Grid, InputLabel, TextField, FormControl, Select, MenuItem } from "@material-ui/core"
import api from "./Api"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import bcrypt from "bcrypt-nodejs"

export default class UserSettings extends Component {

    state = {
        userRegion: "",
        displayName: "",
        openDialog: false
    }

    componentDidMount(){
        let userId = String(sessionStorage.getItem("credentials"))
        api.checkUserThing("id", userId).then(response => {this.setState({userId: userId, userRegion: response[0].region, displayName: response[0].displayName})})
    }

        handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    submitChanges(thingToChange, changeValue){
        console.log(this.state.userId, thingToChange, changeValue)
        api.editUserInfo(this.state.userId, thingToChange, changeValue).then(response => {
            this.setState({openDialog: true})})
    }

    changePassword(){
        const userId = String(sessionStorage.getItem("credentials"))
        api.checkUserThing("id", userId ).then(response => {
            if (bcrypt.compareSync(this.state.currentPassword, response[0].password)){
                if (this.state.newPassword === this.state.againPassword){
                    const passHash = bcrypt.hashSync(this.state.newPassword)
                    api.editUserInfo(userId, "password", passHash).then(response => {
                        alert("Password Successfully Changed")
                        return
                    })
                }
                else {
                    alert("New passwords do not match")
                    return
                }
            }
            else {
                alert("Current Password Incorrect")
            }

        })
    }

    handleDialogClose = () => {
        this.setState({ openDialog: false })
        this.props.showChanges(this.state.displayName)
    }

    render(){
        // let root = document.querySelector("root")
        return (
            <React.Fragment>
                <div style={{ backgroundColor: "rgba(255, 255, 255, .7)", width: "45vw", height: "90vh", overflowY:"scroll", overflowX:"hidden", margin: "auto", paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 20 }}>
                <Typography variant="display3" align="center" style={{color:"white", textShadow:"1px 1px .5px black"}}>Account Settings</Typography>
                    <div style={{ marginTop: 40 }} align="center">
                    <TextField id="displayName" type="text" label="Change Display Name" style={{marginRight:10}} onChange={this.handleFieldChange}/>
                    <Button variant="raised" color="primary" onClick={() => this.submitChanges("displayName", this.state.displayName)}>Submit</Button>
                    </div>
                <br/>
                    <div style={{ marginTop: 40 }} align="center">
                Change Default Region:
                    <Select value={this.state.userRegion} style={{marginLeft:20, marginRight:20}} onChange={e => this.setState({userRegion: e.target.value})}>
                            <MenuItem value="east">East</MenuItem>
                            <MenuItem value="middle">Middle</MenuItem>
                            <MenuItem value="west">West</MenuItem>
                            <MenuItem value="all">All</MenuItem>
                        </Select>
                        <Button variant="raised" color="primary" onClick={() => this.submitChanges("region", this.state.userRegion)}>Submit</Button>
                    </div>
                    <div style={{ marginTop: 60 }} align="center">
                Change Password:
                    <br />
                        <TextField id="currentPassword" type="password" label="Current Password" style={{ marginRight: 10, marginBottom: 20, marginTop:10 }} onChange={this.handleFieldChange} />
                        <br />
                        <TextField id="newPassword" type="password" label="New Password" style={{ marginRight: 10, marginBottom: 20 }} onChange={this.handleFieldChange} />
                        <br />
                        <TextField id="againPassword" type="password" label="Current Password Again" style={{ marginRight: 10, marginBottom: 20 }} onChange={this.handleFieldChange} />
                        <br />
                        <Button variant="raised" color="primary" onClick={() => this.changePassword()}>Submit</Button>
                        </div>

                </div>
                {(this.state.openDialog) ? (
                    <div style={{ width: 700 }}>
                        <Dialog
                            open={this.state.openDialog}
                            onClose={this.handleDialogClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Change User Settings"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Changes successful!
                             </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleDialogClose} color="primary">
                                    Close
                        </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                ) : <div />}
            </React.Fragment>
        )
    }
}