import React, { Component } from 'react'
import {Route} from "react-router-dom"
import Login from "./Components/Login"
import Nav from "./Nav/Nav"
import PostItem from "./Components/PostItem"
import Dashboard from "./Components/Dashboard"
import MainPage from "./Components/MainPage"
import Register from "./Components/Registration"

export default class ApplicationViews extends Component {
    state = {
        // auth: 0
    }

    loginUser = (userId) => {
        this.setState({auth: userId})
    }

    componentDidMount(){
        if (sessionStorage.getItem("credentials")){
            const userId = sessionStorage.getItem("credentials")
            console.log(userId)
            this.setState({auth: userId})
        }
    }

    isAuthenticated = () => {
        return sessionStorage.getItem("credentials")
    }

    render () {
        if (this.isAuthenticated()){
            return (
                <React.Fragment>
                    <Route path="/" component={Nav} />
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/post" render={props => {
                        return (
                            <PostItem userId={this.state.auth} />
                        )
                        }
                        }
                    />
                    <Route exact path="/dashboard" render={props =>{
                        return(
                            <Dashboard userId={this.state.auth}/>
                        )
                        }
                        }
                    />
                </React.Fragment>
            )
        }
        else {
            return (
                <React.Fragment>
                    <Route exact path="/" render={props => {
                        return (
                            <Login loginUser={this.loginUser} />
                        )
                        }

                    }
                    />
                    <Route exact path="/register" component={Register} />
                </React.Fragment>
            )
        }
    }
}
