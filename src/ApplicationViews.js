import React, { Component } from 'react'
import {Route} from "react-router-dom"
import Login from "./Components/Login"
import Nav from "./Components/Nav"
import PostItem from "./Components/PostItem"
import Dashboard from "./Components/Dashboard"
import MainPage from "./Components/MainPage"
import Register from "./Components/Registration"
import ViewPost from "./Components/viewPost"
import UserSettings from "./Components/UserSettings"
import api from "./Components/Api"
import EditPostPage from "./Components/EditPostPage"
import "./index.css"

const backgrounds = ["https://images.unsplash.com/photo-1445216978101-0b05a9c8da3d?ixlib=rb-0.3.5&s=028d47aec09c1fae0ac7bbdde206d991&auto=format&fit=crop&w=1591&q=80",
                    "https://images.unsplash.com/photo-1446413145391-40052a2477ee?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0002cd5cbc5b5d32f8a75fd15471e2b6&auto=format&fit=crop&w=1350&q=80",
                    "https://images.unsplash.com/photo-1464788061904-b026adb5422b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4a6aa5b3608cb4e7f5a6f5d0be6e45e1&auto=format&fit=crop&w=1950&q=80",
                    "https://images.unsplash.com/photo-1464638681273-0962e9b53566?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ff907dcc91db99272bacb3ac68fe971e&auto=format&fit=crop&w=1950&q=80",
                    "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f3567f2ad7bbcd7d2f18095598ce0245&auto=format&fit=crop&w=1350&q=80",
                    "https://images.unsplash.com/photo-1503427128716-12b0ed4822bb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f841787a75346271184e3be94eac765a&auto=format&fit=crop&w=1489&q=80",
                    "https://images.unsplash.com/photo-1463598208575-2fba20d78efe?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4e2aab772a629172e5ee8934cc9b90eb&auto=format&fit=crop&w=1385&q=8"]

const bodyElement = document.querySelector("body")


export default class ApplicationViews extends Component {
    state = {
        updates: false,
        wallpaper: "https://images.unsplash.com/photo-1464788061904-b026adb5422b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4a6aa5b3608cb4e7f5a6f5d0be6e45e1&auto=format&fit=crop&w=1950&q=80"
    }

    wallpaperChange = () => {
        let newURL = backgrounds[Math.floor(Math.random()*backgrounds.length)]
        this.setState({wallpaper: newURL})
    }

    loginUser = (userId) => {
        this.setState({auth: userId})
    }

    componentDidMount(){
        if (sessionStorage.getItem("credentials")){
            const userId = sessionStorage.getItem("credentials")
            api.checkUserThing("id", userId).then(response => this.setState({ displayName: response[0].displayName }))
            this.setState({auth: userId})
        }
        setInterval(() =>{
            this.wallpaperChange()
        }, 60000)
    }

    userChanges = (newName) => {
        this.setState({displayName: newName})
    }

    isAuthenticated = () => {
        return sessionStorage.getItem("credentials")
    }


    render () {
        if (this.isAuthenticated()){
            return (
                <React.Fragment>
                    <div style={{ width: "100%", height: "100vh", backgroundRepeat: "no-repeat", overflowY:"scroll", overflowX:"hidden", backgroundPosition: "center center", backgroundAttachment: "fixed", backgroundSize: "cover", backgroundImage: `url(${this.state.wallpaper})` }}>
                    <Route path="/" render={props => {
                        return (
                            <Nav displayName={this.state.displayName} userChanges={this.userChanges}/>
                        )
                    }
                    } />
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
                    <Route exact path="/settings" render={props => {
                        return (
                            <UserSettings userId={this.state.auth} showChanges={this.userChanges}/>
                        )
                    }
                    }
                    />
                    <Route path="/viewPost/:postId" render={ props => {
                        return (<ViewPost {...props}/>)
                    }}/>
                    <Route path="/editPost/:postId" render={ props => {
                        return (<EditPostPage {...props}/>)
                    }}/>
                    </div>
                </React.Fragment>
            )
        }
        else {
            return (
                <React.Fragment>
                    <div style={{width:"100%", height:"100%", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundAttachment: "fixed", backgroundSize:"cover", backgroundImage:`url(${this.state.wallpaper})`}}>
                    <Route exact path="/" render={props => {
                        return (
                            <Login loginUser={this.loginUser} />
                        )
                        }

                    }
                    />
                    <Route exact path="/register" render={props => {
                        return (
                            <Register loginUser={this.loginUser} />
                        )
                    }} />
                    </div>
                </React.Fragment>
            )
        }
    }
}
