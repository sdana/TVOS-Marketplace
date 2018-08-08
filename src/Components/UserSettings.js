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
        openDialog: false,
        oldPasswordDialog: false,
        newPasswordDialog: false,
        passwordSuccessDialog: false
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
                        this.setState({ passwordSuccessDialog: true, currentPassword: "", newPassword: "", againPassword: "" })
                        return
                    })
                }
                else {
                    this.setState({newPasswordDialog: true})
                    return
                }
            }
            else {
                this.setState({oldPasswordDialog: true})
            }

        })
    }

    handleDialogClose = (which, redirectBool) => {
        this.setState({ [which]: false });
        this.setState({ redirect: redirectBool })
        this.props.showChanges(this.state.displayName)
    };

    render(){
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
                <form onSubmit={(e) => {e.preventDefault(); this.changePassword()}}>
                Change Password:
                    <br />
                        <TextField id="currentPassword" type="password" label="Current Password" value={this.state.currentPassword} style={{ marginRight: 10, marginBottom: 20, marginTop:10 }} onChange={this.handleFieldChange} />
                        <br />
                        <TextField id="newPassword" type="password" label="New Password" value={this.state.newPassword} style={{ marginRight: 10, marginBottom: 20 }} onChange={this.handleFieldChange} />
                        <br />
                        <TextField id="againPassword" type="password" label="New Password Again" value={this.state.againPassword} style={{ marginRight: 10, marginBottom: 20 }} onChange={this.handleFieldChange} />
                        <br />
                        <Button variant="raised" color="primary" type="submit" ref="passwordSubmit">Submit</Button>
                        </form>
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
                                <Button onClick={() => this.handleDialogClose("openDialog", false)} color="primary">
                                    Close
                        </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                ) : <div />}
                {(this.state.oldPasswordDialog) ? (
                    <div style={{ width: 700 }}>
                        <Dialog
                            open={this.state.oldPasswordDialog}
                            onClose={this.handleDialogClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Post Item"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Current password incorrect
                             </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => this.handleDialogClose("oldPasswordDialog", false)} color="primary">
                                    Close
                        </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                ) : <div />}
                {(this.state.newPasswordDialog) ? (
                    <div style={{ width: 700 }}>
                        <Dialog
                            open={this.state.newPasswordDialog}
                            onClose={this.handleDialogClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Post Item"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    New passwords do not match
                             </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => this.handleDialogClose("newPasswordDialog", false)} color="primary">
                                    Close
                        </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                ) : <div />}
                {(this.state.passwordSuccessDialog) ? (
                    <div style={{ width: 700 }}>
                        <Dialog
                            open={this.state.passwordSuccessDialog}
                            onClose={this.handleDialogClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Post Item"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Password successfully changed
                             </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => this.handleDialogClose("passwordSuccessDialog", false)} color="primary">
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