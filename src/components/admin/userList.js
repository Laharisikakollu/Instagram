import React, { Component } from "react";
import { Table } from "reactstrap";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import { Button } from "antd";
import UserPosts from "../../containers/admin/userPosts";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
    };
  }

  componentDidMount() {
    this.props.onGetUsers();
  }

  hideUserLinks = () => {
    this.props.onChangeToggle();
    this.setState({ toggle: !this.state.toggle });
  };

  render() {
    return (
      <div>
        {!this.props.toggle ? (
          <div>
            <h1>User List</h1>
            {this.props.users
              ? this.props.users.map((el, index) => {
                  return (
                    <div key={index}>
                      <Link
                        onClick={this.hideUserLinks}
                        to={{ pathname: `/admin/userList/${el}` }}
                      >
                        {el}
                      </Link>

                      <br></br>
                    </div>
                  );
                })
              : null}
          </div>
        ) : (
          <div>
            <Route path="/admin/userList/:id" exact component={UserPosts} />
          </div>
        )}
      </div>
    );
  }
}

export default UserList;
