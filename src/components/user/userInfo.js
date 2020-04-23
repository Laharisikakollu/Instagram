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
    let str = window.location.pathname;
    let username = "";
    if (str.substring(str.length - 10, str.length) === "userSearch") {
      username = this.props.name;
    } else {
      let payload = jwt.decode(JSON.parse(localStorage.getItem("token")));
      username = payload.userName;
    }

    await this.props.getUserFollowersAndFollowing(username);
    await this.handleUpdatingMenu();
    await this.props.onGetFollowRequests(this.props.searchValue);
  };
  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.name !== this.props.name) {
      await this.props.getUserFollowersAndFollowing(this.props.name);
      await this.handleUpdatingMenu();
      await this.props.onGetFollowRequests(this.props.searchValue);
    }
  };
  handleFollow = async (myName) => {
    await this.props.onGetFollowRequests(this.props.searchValue);
    if (
      !this.props.followRequests.find(
        (element) =>
          element ===
          jwt.decode(JSON.parse(localStorage.getItem("token"))).userName
      )
    )
      await this.props.followAndUnFollow(myName);

    await this.props.getUserFollowersAndFollowing(this.props.name);
    await this.handleUpdatingMenu();
  };

  render() {
    return (
      <div>
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

                {this.props.from === "search" &&
                jwt.decode(JSON.parse(localStorage.getItem("token")))
                  .userName !== this.props.searchValue ? (
                  <Button
                    style={{ marginTop: 16 }}
                    type="primary"
                    onClick={() => this.handleFollow(this.props.searchValue)}
                  >
                    {this.props.followers.find(
                      (element) =>
                        element ===
                        jwt.decode(JSON.parse(localStorage.getItem("token")))
                          .userName
                    ) ? (
                      "Unfolow"
                    ) : this.props.followRequests ? (
                      this.props.followRequests.find(
                        (element) =>
                          element ===
                          jwt.decode(JSON.parse(localStorage.getItem("token")))
                            .userName
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

export default UserInfo;
