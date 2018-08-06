import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import { Typography, Button, Grid, InputLabel, TextField, FormControl, Select, MenuItem } from "@material-ui/core"
import api from "./Api"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
                    <TextField id="displayName" type="text" label="Change Display Name" style={{marginRight:10}} onChange={this.handleFieldChange}/>
                    <Button variant="raised" color="primary" onClick={() => this.submitChanges("displayName", this.state.displayName)}>Submit</Button>
                <br/>
                    <div style={{ marginTop: 40 }}>
                Change Default Region:
                    <Select value={this.state.userRegion} style={{marginLeft:20, marginRight:20}} onChange={e => this.setState({userRegion: e.target.value})}>
                            <MenuItem value="east">East</MenuItem>
                            <MenuItem value="middle">Middle</MenuItem>
                            <MenuItem value="west">West</MenuItem>
                            <MenuItem value="all">All</MenuItem>
                        </Select>
                        <Button variant="raised" color="primary" onClick={() => this.submitChanges("region", this.state.userRegion)}>Submit</Button>
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