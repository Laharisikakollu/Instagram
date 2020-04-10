import React, { Component } from 'react';
import SideDrawer from '../sidedrawer/sidedrawer';
import Profile from '../user/profile';
import { connect } from "react-redux";
class UserPosts extends Component{

    constructor(props){
        super(props);
        this.state=({
            display:false,
        })
    }
    componentDidMount=async()=> {
        
        await this.props.setUserName(this.props.match.params.id)
        this.setState({display:true})
    }
    componentWillUnmount=async()=> {
        this.setState({display:false})
    }
    render(){
        
        return(
            <div>
                <h1>User Page {this.props.match.params.id}</h1>
                {this.state.display?<Profile />:null}
               
            </div>
        )
    }
}
const mapStateToProps = state => ({
    userName: state.user.userName,
    userPosts: state.user.userPosts,
})
const mapDispatchToProps = dispatch => {
    return {
        getUserPosts: () =>
            dispatch({
                type: "GETUSERPOSTS",

            }),
            setUserName: (value) =>
            dispatch({
                type: "SETUSERNAME",
                payload: value
            }),

    }
}
export default (connect(mapStateToProps, mapDispatchToProps)(UserPosts));