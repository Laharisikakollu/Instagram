import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import { Button } from 'antd';
import UserPosts from './userPosts';

class UserList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        }}

    componentDidMount() {
        this.props.onGetUsers();
    }

    

    // DeleteUser = (e) => {
    //     let obj = {
    //         index: e.target.id,
    //     }

    //     this.props.accept(obj);
    //     this.props.onGetRequests();
    // }

    hideUserLinks = () => {
       
        this.props.onChangeToggle();
        this.setState({ toggle: !this.state.toggle })
    }

    render() {
       
        return (
            <div>
                {/* <Router> */}
                {!this.props.toggle ? (
                    <div>
                        <h1>User List</h1>
                        {this.props.users ? (
                            this.props.users.map((el, index) => {
                                return (
                                    <div key={index} >
                                        <Link onClick={this.hideUserLinks} to={{pathname:`/admin/userList/${el}`}} >{el}</Link>
                                        
                                        <br></br>
                                    </div>
                                )
                            })
                        ) : null}
                    </div>
                ) : (
                        <div>
                            <Route path="/admin/userList/:id" exact component={UserPosts} />
                        </div>
                    )}


                {/* </Router> */}
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onGetUsers: () =>
            dispatch({
                type: "GETUSERS"
            }),
        onChangeToggle:()=>
        dispatch({
            type:"TOGGLEUSER"
        })
    }
}
const mapStateToProps = state => ({
    users: state.admin.users,
    toggle:state.admin.toggle
})
export default connect(mapStateToProps, mapDispatchToProps)(UserList);

