import React, { Component } from "react";
import { connect } from "react-redux";
import { Container } from "reactstrap";
import {
  Spin,
  Statistic,
  Row,
  Col,
  Button,
  Select,
  Menu,
  Dropdown,
  message,
} from "antd";
import { LoadingOutlined, DownOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
const jwt = require("jsonwebtoken");
const { Option } = Select;

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followers: "",
      following: "",
    };
  }
  handleButtonClick = (e) => {
    message.info("Click on left button.");
    console.log("click left button", e);
  };

  handleMenuClick = async (e) => {
    message.info(e);
    if (this.props.from !== "profile") {
      await this.props.onNewSearch(e);

      await this.props.getUserFollowersAndFollowing(e);
      await this.handleUpdatingMenu();
    }
  };
  handleUpdatingMenu = async () => {
    await this.setState({
      followers: (
        <Menu>
          {this.props.followers.map((el, key) => {
            return (
              <Menu.Item
                value={el}
                key={key}
                onClick={() => this.handleMenuClick(el)}
              >
                <UserOutlined />
                {el}
              </Menu.Item>
            );
          })}
        </Menu>
      ),
    });
    await this.setState({
      following: (
        <Menu>
          {this.props.following.map((el, key) => {
            return (
              <Menu.Item
                value={el}
                key={key}
                onClick={() => this.handleMenuClick(el)}
              >
                <UserOutlined />
                {el}
              </Menu.Item>
            );
          })}
        </Menu>
      ),
    });
  };
  componentWillMount = async () => {
    let str=window.location.pathname
    let username=''
    console.log( str.substring(str.length - 10, str.length))
    if( str.substring(str.length - 10, str.length)==="userSearch")
   {username=this.props.name}
   else{
    let payload=jwt.decode(JSON.parse(localStorage.getItem("token"))) 
    username=payload.userName}
 
    await this.props.getUserFollowersAndFollowing(username);
    await this.handleUpdatingMenu();
    await this.props.onGetFollowRequests(this.props.searchValue);
  };
  componentDidUpdate = async (prevProps, prevState) => {
    console.log("this.props.name",this.props.name)
    if (prevProps.name !== this.props.name) {
      await this.props.getUserFollowersAndFollowing(this.props.name);
      await this.handleUpdatingMenu();
      await this.props.onGetFollowRequests(this.props.searchValue);
    }
  };
  handleFollow = async (myName) => {
    // e.preventDefault();
    console.log(myName);
    await this.props.onGetFollowRequests(this.props.searchValue);
    if (
      !this.props.followRequests.find(
        (element) => element === (jwt.decode(JSON.parse(localStorage.getItem("token"))).userName)
        // (element) => element === this.props.userName)
      )
    )
      await this.props.followAndUnFollow(myName);

    // if (!this.props.followers.find((element) => element.userName === this.props.userName))
    // {
    //   await this.props.followAndUnFollow({userName:myName,followed:false});
    // }
    // else{
    //   await this.props.followAndUnFollow({userName:myName,followed:true});
    // }

    await this.props.getUserFollowersAndFollowing(this.props.name);
    await this.handleUpdatingMenu();
    // await this.props.onGetFollowRequests(this.props.searchValue);
  };
//   onChange = (value) => {
//     console.log(`selected ${value}`);
//   };

//   onBlur = () => {
//     console.log("blur");
//   };

//   onFocus = () => {
//     console.log("focus");
//   };

//   onSearch = (val) => {
//     console.log("search:", val);
//   };
  render() {
    return (
      <div>
        {console.log(this.props.followRequests)}
        <Container style={{ border: "2px solid" }}>
          {this.props.searchValue}
          {this.props.followers && this.props.following ? (
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="Followers"
                  value={this.props.followers.length}
                ></Statistic>
                <Dropdown overlay={this.state.followers}>
                  <Button>
                    Followers <DownOutlined />
                  </Button>
                </Dropdown>
              </Col>
              <Col span={12}>
                <Statistic
                  title="Following"
                  value={this.props.following.length}
                ></Statistic>
                <Dropdown overlay={this.state.following}>
                  <Button>
                    Following <DownOutlined />
                  </Button>
                </Dropdown>
              {console.log("usrn",jwt.decode(JSON.parse(localStorage.getItem("token"))).userName)}
                {this.props.from === "search" &&
               (jwt.decode(JSON.parse(localStorage.getItem("token"))).userName) !== this.props.searchValue ? (
                  <Button
                    style={{ marginTop: 16 }}
                    type="primary"
                    onClick={() => this.handleFollow(this.props.searchValue)}
                  >
                    {console.log(this.props.followers,"followers")}
                    {console.log(this.props.followRequests,"followrequests")}
                    {console.log(this.props.userName,"usernammee")}
                    {this.props.followers.find(
                      (element) => element ===  (jwt.decode(JSON.parse(localStorage.getItem("token"))).userName)
                    ) ? (
                      "Unfolow"
                    ) : this.props.followRequests ? (
                      this.props.followRequests.find(
                        (element) => element === (jwt.decode(JSON.parse(localStorage.getItem("token"))).userName)
                      ) ? (
                        "Requested"
                      ) : (
                        "Follow"
                      )
                    ) : (
                      <Spin
                        indicator={
                          <LoadingOutlined style={{ fontSize: 24 }} spin />
                        }
                      />
                    )}
                  </Button>
                ) : null}
              </Col>
            </Row>
          ) : null}
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  userName: state.user.userName,
  followers: state.user.followers,
  following: state.user.following,
  searchValue: state.user.searchValue,
  followRequests: state.user.followRequests,
});
const mapDispatchToProps = (dispatch) => {
  return {
    getUserFollowersAndFollowing: async (value) => {
      console.log(value,"followersandfollowing")
      let res = await axios.get(
        `http://localhost:8000/fetchfollowers/${value}`
      );
      dispatch({
        type: "GETUSERFOLLOWERSANDFOLLOWING",
        payload: res.data,
      });
    },
    followAndUnFollow: async(value) =>
    {
        const token=JSON.parse(localStorage.getItem("token"))
        await axios.post(`http://localhost:8000/follow`,{
            token:token,
            requestName:value
        })
      dispatch({
        type: "FOLLOWANDUNFOLLOW",
        payload: value,
      })},
    onNewSearch: (value) =>
      dispatch({
        type: "SEARCHUSERNAME",
        payload: value,
      }),

    onGetFollowRequests: async (value) =>
    {console.log("getfollowrequest",value)
      let res=await axios.get(`http://localhost:8000/getfollowrequest/${value}`)
      dispatch({
        type: "GETFOLLOWREQUESTS",
        payload: res.data
      })},
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
