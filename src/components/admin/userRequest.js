import React, { Component } from "react";
import { Checkbox } from "antd";
import { Table } from "reactstrap";
class UserRequest extends Component {
  async componentWillMount() {
    await this.props.onGetRequests();
  }

  Accept = async (e) => {
    let obj = {
      userName: e.target.id,
      value: e.target.checked,
    };

    await this.props.accept(obj);
    await this.props.onGetRequests();
  };

  Reject = async (e) => {
    let obj = {
      userName: e.target.id,
      value: e.target.checked,
    };

    await this.props.decline(obj);
    await this.props.onGetRequests();
  };
  render() {
    return (
      <div>
        <h1>USER REQUESTS</h1>

        <Table dark>
          <thead>
            <tr>
              <th>USERNAME</th>
              <th>ACCEPT USER</th>
              <th>REJECT USER</th>
            </tr>
          </thead>
          <tbody>
            {this.props.requests
              ? this.props.requests.map((el, key) => {
                  return (
                    <tr>
                      <td>{el}</td>
                      <td>
                        <Checkbox onChange={this.Accept} id={el}></Checkbox>
                      </td>
                      <td>
                        <Checkbox onChange={this.Reject} id={el}></Checkbox>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </Table>
      </div>
    );
  }
}
export default UserRequest;
