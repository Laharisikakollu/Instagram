import React, { Component } from "react";
import { Checkbox } from "antd";
import { Table } from "reactstrap";

class FollowRequests extends Component {
  componentWillMount() {
    this.props.onGetFollowRequests(this.props.userName);
  }
  componentDidMount() {
    this.props.onGetFollowRequests(this.props.userName);
  }

  onAcceptChange = async (e) => {
    let obj = {
      acceptingName: e.target.id,
      accept: e.target.checked,
    };

    await this.props.accept(obj);
    await this.props.onGetFollowRequests(this.props.userName);
  };
  onDeclineChange = async (e) => {
    let obj = {
      acceptingName: e.target.id,
      accept: e.target.checked,
    };

    await this.props.decline(obj);
    await this.props.onGetFollowRequests(this.props.userName);
  };
  render() {
    return (
      <div>
        <h1>Follow Requests</h1>
        {this.props.followRequests ? (
          <div>
            <Table dark bordered striped>
              <thead>
                <tr>
                  <th>Accept</th>
                  <th>Decline</th>
                  <th>User Name</th>
                </tr>
              </thead>
              <tbody>
                {this.props.followRequests.map((el, key) => {
                  return (
                    <tr key={key}>
                      <td>
                        <Checkbox
                          onChange={this.onAcceptChange}
                          id={el}
                        ></Checkbox>
                      </td>
                      <td>
                        <Checkbox
                          onChange={this.onDeclineChange}
                          id={el}
                        ></Checkbox>
                      </td>
                      <td>{el}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        ) : null}
      </div>
    );
  }
}

export default FollowRequests;
