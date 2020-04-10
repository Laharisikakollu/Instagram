import React, { Component } from 'react'
import { Checkbox } from 'antd';
import { connect } from "react-redux";
import { Table } from 'reactstrap';
class UserRequest extends Component {
    componentDidMount() {
        this.props.onGetRequests();
    }
    componentDidUpdate(prevProps, prevState) {
      
    }

    Accept = (e) => {
        let obj = {
            index: e.target.id,
            value: e.target.checked
        }

        this.props.accept(obj);
        this.props.onGetRequests();
    }
    Reject = (e) => {
        let obj = {
            index: e.target.id,
            value: e.target.checked
        }

        this.props.decline(obj);
        this.props.onGetRequests();

        
    }
    render() {
       
        return (<div>
            <h1>USER REQUESTS</h1>
            
            <Table dark >
                <thead>
                    <tr>

                        <th>USERNAME</th>
                        <th>ACCEPT USER</th>
                        <th>REJECT USER</th>
                        
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.requests ? (
                            this.props.requests.map((el, key) => {
                                return (
                                    <tr>
                                       <td>{el}</td>
                                        <td><Checkbox onChange={this.Accept} id={key}></Checkbox></td>
                                        <td><Checkbox onChange={this.Reject} id={key}></Checkbox></td>
                                        
                                        
                                    </tr>
                                )
                            })
                        ) : null
                    }
                </tbody>
            </Table>
        </div>);
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onGetRequests: () =>
            dispatch({
                type: "GETREQUESTS"
            }),
        accept: (value) =>
            dispatch({
                type: "ACCEPT",
                payload: value
            }),
        decline: (value) =>
            dispatch({
                type: "REJECT",
                payload: value
            })
    }
}
const mapStateToProps = state => ({
    requests: state.admin.requests,
})
export default connect(mapStateToProps, mapDispatchToProps)(UserRequest);