import React, { Component } from "react";
// import SideDrawer from "../sidedrawer/sidedrawer";
import UserInfo from '../../containers/user/userInfo';
import Profile from "../../containers/user/profile";
class UserPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
    };
  }
  componentDidMount = async () => {
    await this.props.setUserName(this.props.match.params.id);
    this.setState({ display: true });
  };
  componentWillUnmount = async () => {
    this.setState({ display: false });
  };
  render() {
    return (
      <div>
        <h1>User Page {this.props.match.params.id}</h1>
        {this.state.display ? <Profile /> : null}
      </div>
    );
  }
}
export default UserPosts;
