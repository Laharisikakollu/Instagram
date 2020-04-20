import React, { Component } from 'react'
import { Checkbox } from 'antd';
import { Table } from 'reactstrap';
class UserRequest extends Component {
    componentDidMount() {
        this.props.onGetRequests();
    }
    

    Accept = (e) => {
       
        let obj = {
            userName: e.target.id,
            value: e.target.checked
        }

        console.log(obj.value)
        this.props.accept(obj);
        this.props.onGetRequests();
    }
    Reject = (e) => {
        let obj = {
            userName: e.target.id,
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
                {console.log(this.props.requests)}
                    {
                        
                        this.props.requests ? (
                            this.props.requests.map((el, key) => {
                                return (
                                    <tr>
                                       <td>{el}</td>
                                        <td><Checkbox onChange={this.Accept} id={el}></Checkbox></td>
                                        <td><Checkbox onChange={this.Reject} id={el}></Checkbox></td>
                                        
                                        
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
export default UserRequest;