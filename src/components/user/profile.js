import React, { Component } from "react";
import { Container } from "reactstrap";
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
  notification
} from "antd";
import {
  LikeOutlined,
  DeleteOutlined,
  BellOutlined 
} from "@ant-design/icons";
import UserInfo from "../../containers/user/userInfo";
const jwt = require("jsonwebtoken");

const { Meta } = Card;
class Profile extends Component {



  componentDidMount() {
   this.props.getUserPosts(this.props.userName);
  }

  async componentWillMount() {
    await this.props.getUserPosts(this.props.userName);
  }

  handleLikePost = async (e) => {
    let payload = jwt.decode(JSON.parse(localStorage.getItem("token")));
    let obj = {
      postId: e,
      userId: payload.id,
    };
    await this.props.onLikePost(obj);
    await this.props.getUserPosts(this.props.userName);
  };

  handleDeletePost = async (e) => {
    await this.props.deletePost({postId:e});
    await this.props.getUserPosts(this.props.userName);
  };

  

  render() {
    return (
      <div>
        <h1>Profile Page</h1>
        <Container>
          <h1>{this.props.userName}</h1>
        </Container>
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
            <div>
              <Row gutter={16}>
                <Container>
                  <UserInfo
                    from={"profile"}
                    name={this.props.userName}
                  ></UserInfo>
                </Container>
                {this.props.userPosts.map((el, key) => {
                  return (
                    <div>
                      <Col span={8}>
                        <Card
                          hoverable
                          title={this.props.userName}
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
                            <Button
                              onClick={() => this.handleDeletePost(el.id)}
                              id={el.id}
                              type="primary"
                              color="primary"
                            >
                              <DeleteOutlined />
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
                      </Col>
                    </div>
                  );
                })}
              </Row>
            </div>
          </Container>
        ) : null}
      </div>
    );
  }
}

export default Profile;
