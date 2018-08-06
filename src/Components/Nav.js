import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom"
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import api from "./Api"

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    noLink: {
        textDecoration: "none",
        color: "rgb(63, 81, 181)"
    },
};

class MenuAppBar extends React.Component {
    state = {
        auth: true,
        anchorEl: null,
        user: {name: ""}
    };

    componentDidMount() {
        const userId = sessionStorage.getItem("credentials")
        api.checkUserThing("id", userId).then(response => this.setState({user: response[0], displayName: response[0].displayName}))
    }

    handleChange = (event, checked) => {
        this.setState({ auth: checked });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    logUserOut = () => {
        sessionStorage.removeItem("credentials")
        sessionStorage.removeItem("region")
        sessionStorage.removeItem("order")
    }

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            <Link to="/" style={{ textDecoration: "none", color: "white" }}>Home</Link>
            </Typography>

                            <div>
                            <Typography variant="subheading" style={{display: "inline-block"}} color="inherit">{((!this.props.displayName) ? this.state.displayName : this.props.displayName)}</Typography>
                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : null}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleClose}><Link to="/post" style={styles.noLink}>Post New Item</Link></MenuItem>
                                    <MenuItem onClick={this.handleClose}><Link to="/dashboard" style={styles.noLink}>My Items</Link></MenuItem>
                                    <MenuItem onClick={this.handleClose}><Link to="/settings" style={styles.noLink}>Settings</Link></MenuItem>
                                <MenuItem onClick={() => { this.handleClose(); this.logUserOut() }}><Link to="/" style={styles.noLink}>Logout</Link></MenuItem>
                                </Menu>
                            </div>

                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);