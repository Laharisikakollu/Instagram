import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Menu, Button, Drawer, notification } from "antd";
import Logout from "../logout/logout";
import {
  InstagramOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  FieldTimeOutlined,
  UsergroupAddOutlined,
  BellOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import UserList from "../../containers/admin/userList";
import UserRequest from "../../containers/admin/userRequest";
import UserTimeline from "../../containers/user/timeline";
import UserProfile from "../../containers/user/profile";
import UserSearch from "../../containers/user/search";
import FollowRequests from "../../containers/user/followRequest";
const jwt = require("jsonwebtoken");
class SideDrawer extends React.Component {
  state = { visible: false, placement: "left", collapsed: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  hideUserLinks = () => {
    if (this.state.visible === this.props.toggle) this.props.onChangeToggle();
  };

  sleep = async (time) => {
    await new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  };
  async componentWillMount() {
    let payload = jwt.decode(JSON.parse(localStorage.getItem("token")));
    await this.props.setUserName(payload.userName);
  }

  componentDidMount = async () => {
    await this.props.setUserName(this.props.signeduserName);
    console.log("roleeeeee",this.props.role)
    if (this.props.role === "user") {
      await this.props.onGetFollowRequests(this.props.signeduserName);
      if (this.props.followRequests)
        await this.props.followRequests.map(async (el, key) => {
          return await this.sleep(2000).then(() =>
            notification.open({
              message: "New follow Request  ",
              description: `from ${el}`,
              icon: <BellOutlined style={{ color: "#308ee9" }} />,
            })
          );
        });
    } else {
      await this.props.onGetSignUpRequests();

      if (this.props.signUpRequests) {
        this.props.signUpRequests.map((el, key) => {
          return notification.open({
            message: "New Sign Up Request  ",
            description: `from ${el}`,
            icon: <BellOutlined style={{ color: "#308ee9" }} />,
          });
        });
      }
    }
  };

  render() {
    return (
      <div>
        <Button
          type="primary"
          onClick={this.showDrawer}
          style={{ marginRight: 1800 }}
        >
          {this.props.toggle ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="left"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          {console.log(window.location.pathname.substr(1,5))}
          {window.location.pathname.substr(1,5) === "admin" ? (
            <div>
              <Link to="/admin/userList" onClick={this.hideUserLinks}>
                <InstagramOutlined />
                UserLists
              </Link>
              <br></br>
              <br></br>
              <br></br>
              <Link to="/admin/userRequest">
                <UserOutlined />
                User Requests
              </Link>
            </div>
          ) : (
            <div>
              <Link to={`/user/${this.props.signeduserName}/userProfile`}>
                <InstagramOutlined />
                User Profile
              </Link>
              <br></br>
              <br></br>
              <br></br>
              <Link to={`/user/${this.props.signeduserName}/userTimeline`}>
                <FieldTimeOutlined />
                User Timline
              </Link>
              <br></br>
              <br></br>
              <br></br>
              <Link to={`/user/${this.props.signeduserName}/userSearch`}>
                <SearchOutlined />
                User Search
              </Link>
              <br></br>
              <br></br>
              <br></br>
              <Link to={`/user/${this.props.signeduserName}/followRequests`}>
                <UsergroupAddOutlined />
                FollowRequests
              </Link>
            </div>
          )}
        </Drawer>
        <Route exact component={Logout}></Route>
        <Switch>
          <Route path="/admin/userList" component={UserList}></Route>
          <Route path="/admin/userRequest" component={UserRequest}></Route>
          <Route path="/user/:id/userProfile" component={UserProfile}></Route>
          <Route path="/user/:id/userTimeline" component={UserTimeline}></Route>
          <Route path="/user/:id/userSearch" component={UserSearch}></Route>

          <Route
            path="/user/:id/followRequests"
            component={FollowRequests}
          ></Route>
        </Switch>
      </div>
    );
  }
}
export default SideDrawer;
