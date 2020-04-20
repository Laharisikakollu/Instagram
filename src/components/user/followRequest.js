import React, { Component } from 'react'
import { Checkbox } from 'antd';
import { connect } from "react-redux";
import { Table } from 'reactstrap';
import axios from "axios";
const jwt=require('jsonwebtoken');
class FollowRequests extends Component {
    componentDidMount() {
        this.props.onGetFollowRequests(this.props.userName);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.followRequests !== this.props.followRequests) {
        }
    }

    onAcceptChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
        console.log(e.target.id)
        console.log(e.target.checked)
        let obj = {
            acceptingName: e.target.id,
            accept: e.target.checked
        }

        this.props.accept(obj);
        this.props.onGetFollowRequests(this.props.userName);
    }
    onDeclineChange = (e) => {
        let obj = {
            acceptingName: e.target.id,
            accept: e.target.checked
        }

        this.props.decline(obj);
        this.props.onGetFollowRequests(this.props.userName);

        console.log(e.target.id)
    }
    render() {
        return (<div>
            <h1>Follow Requests</h1>
            {console.log(this.props.followRequests)}
            {
              
                this.props.followRequests ? (<div>
                    <Table dark bordered striped >
                        <thead>
                            <tr>
                                <th>Accept</th>
                                <th>Decline</th>
                                <th>User Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.followRequests.map((el, key) => {
                                    return (
                                        <tr key={key}>
                                            <td><Checkbox onChange={this.onAcceptChange} id={el}></Checkbox></td>
                                            <td><Checkbox onChange={this.onDeclineChange} id={el}></Checkbox></td>
                                            <td>{el}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>) : null
            }

        </div>);
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onGetFollowRequests: async (value) =>
        {console.log("getfollowrequest",value)
        let payload=jwt.decode(JSON.parse(localStorage.getItem("token")))
          let res=await axios.get(`http://localhost:8000/getfollowrequest/${payload.userName}`)
          dispatch({
            type: "GETFOLLOWREQUESTS",
            payload: res.data
          })},

        accept: async(value) =>
        {
        value={...value,token:JSON.parse(localStorage.getItem("token"))}
        let res=await axios.post(`http://localhost:8000/acceptfollowrequest`,value)
            dispatch({
                type: "ACCEPTFOLLOW",
                payload: res.data
            })},
        decline: async(value) =>
        {
        value={...value,token:JSON.parse(localStorage.getItem("token"))}
        let res=await axios.post(`http://localhost:8000/acceptfollowrequest`,value)
            dispatch({
                type: "DECLINEFOLLOW",
                payload: res.data
            })}
    }
}
const mapStateToProps = state => ({
    followRequests: state.user.followRequests,
    userName:state.user.userName,
})
export default connect(mapStateToProps, mapDispatchToProps)(FollowRequests);