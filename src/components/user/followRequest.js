import React, { Component } from 'react'
import { Checkbox } from 'antd';
import { connect } from "react-redux";
import { Table } from 'reactstrap';
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
        let obj = {
            index: e.target.id,
            value: e.target.checked
        }

        this.props.accept(obj);
        this.props.onGetFollowRequests(this.props.userName);
    }
    onDeclineChange = (e) => {
        let obj = {
            index: e.target.id,
            value: e.target.checked
        }

        this.props.decline(obj);
        this.props.onGetFollowRequests(this.props.userName);

        console.log(e.target.id)
    }
    render() {
        return (<div>
            <h1>Follow Requests</h1>

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
                                            <td><Checkbox onChange={this.onAcceptChange} id={key}></Checkbox></td>
                                            <td><Checkbox onChange={this.onDeclineChange} id={key}></Checkbox></td>
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
        onGetFollowRequests: (value) =>
            dispatch({
                type: "GETFOLLOWREQUESTS",
                payload:value,
            }),
        accept: (value) =>
            dispatch({
                type: "ACCEPTFOLLOW",
                payload: value
            }),
        decline: (value) =>
            dispatch({
                type: "DECLINEFOLLOW",
                payload: value
            })
    }
}
const mapStateToProps = state => ({
    followRequests: state.user.followRequests,
    userName:state.user.userName,
})
export default connect(mapStateToProps, mapDispatchToProps)(FollowRequests);