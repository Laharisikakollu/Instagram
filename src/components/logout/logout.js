import React, { Component } from "react";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logout: false,
    };
  }
  componentDidMount() {
    this.setState({ logout: false });
  }
  componentWillUnmount() {
    this.setState({ logout: false });
  }

  handleLogout = async (e) => {
    e.preventDefault();
    await localStorage.removeItem("role");
    this.setState({ logout: true });
  };
  render() {
    return (
      <div>
        <Button style={{ float: "right" }} onClick={this.handleLogout}>
          <LogoutOutlined />
        </Button>
        {this.state.logout ? (
          <div>
            {console.log("heloo")}
            {(window.location.href = "/login")}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Logout;
