import React, { Component } from "react";
import axios from "axios";

import { connect } from "react-redux";
import SideDrawer from "../sidedrawer/sidedrawer";
import {
  Upload,
  Button,
  message,
  Modal as AntModal,
  Carousel,
  Card,
  Col,
  Row,
} from "antd";
import { Container } from "reactstrap";
import { Input } from "antd";

import Profile from "../../containers/user/profile";
import UserInfo from "../../containers/user/userInfo";

import {
  DownloadOutlined,
  HeartTwoTone,
  LikeOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
const { Meta } = Card;
const { Search } = Input;
const jwt = require("jsonwebtoken");

class SearchPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      display: false,
    };
  }

  componentDidMount() {
    this.props.getUserPosts(this.state.searchValue,this.props.following);
   this.props.getUserFollowersAndFollowing(this.props.userName);
  }

  async componentWillMount() {
    let payload = jwt.decode(JSON.parse(localStorage.getItem("token")));
    await this.props.setUserName(payload.userName);
  }

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.searchValue !== this.props.searchValue) {
      await this.props.getUserPosts(this.props.searchValue,this.props.following);
    }
  };

  newSearch = async (e) => {
    e.preventDefault();
    this.setState({ searchValue: e.target.value });
    await this.props.onNewSearch(e.target.value);
    this.setState({ display: false });
  };

  handleSearch = async () => {
    await this.props.getUserPosts(this.props.searchValue,this.props.following);

    this.setState({
      display: true,
    });
  };

  handleLikePost = async (e) => {
    let payload = jwt.decode(JSON.parse(localStorage.getItem("token")));

    let obj = {
      postId: e,
      userId: payload.id,
    };
    await this.props.onLikePost(obj);
    await this.props.getUserFollowersAndFollowing(payload.userName);
    await this.props.getUserPosts(this.props.searchValue,this.props.following);
  };

  render() {
    return (
      <div>
        {this.state.display ? (
          <div>
            {this.props.searchValue}
            {this.props.userPosts ? (
              <Container
                style={{
                  border: "2px solid black",
                  overflowY: "scroll",
                  width: "70%",
                  float: "center",
                  position: "center",
                  textAlign: "center",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <UserInfo
                  from={"search"}
                  name={this.state.searchValue}
                ></UserInfo>
                
                {this.props.userPosts.map((el, key) => {
                  return (
                    <div>
                      <Card
                        hoverable
                        title={this.props.searchValue}
                        bordered={true}
                        style={{ width: 240 }}
                        actions={[
                          <Button
                            onClick={() => this.handleLikePost(el.id)}
                            id={el.id}
                            type="primary"
                            color="primary"
                          >
                            <LikeOutlined className="TwoTone" key={key} />
                            {el.likes}
                          </Button>,
                        ]}
                      >
                        <Carousel autoplay>
                          {el.images.map((el2, key2) => {
                            return (
                              <div>
                                <img alt="example" src={`${el2}`} />
                              </div>
                            );
                          })}
                        </Carousel>

                        <Meta
                          title={el.description}
                          description="www.instagram.com"
                        />
                      </Card>
                    </div>
                  );
                })}
              </Container>
            ) : (
              <div> User not found</div>
            )}
          </div>
        ) : (
          <div>
            <Input
              placeholder="Search user"
              value={this.searchValue}
              onChange={this.newSearch}
            />
            <Button outline color="primary" onClick={this.handleSearch}>
              Done
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default SearchPost;
