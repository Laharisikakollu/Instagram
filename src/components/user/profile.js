import React, { Component } from 'react';
import {Container} from 'reactstrap';
import { connect } from "react-redux";
import SideDrawer from '../sidedrawer/sidedrawer';
import { Upload, Button , message, Modal as AntModal,  Carousel,Card, Col, Row } from 'antd';
import { DownloadOutlined ,HeartTwoTone,LikeOutlined,DeleteOutlined } from '@ant-design/icons';
import UserInfo from './userInfo';

const { Meta } = Card;
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class Profile extends Component{

   
    componentDidMount() {
        this.props.getUserPosts(this.props.userName);
    }

    handleLikePost = async(e) => {
        e.preventDefault();
        console.log(e.target.id);
        let obj = {
            key: e.target.id,
            postUserName:this.props.userName,
            presentUser:this.props.userName,
        }
        await this.props.onLikePost(obj);
        await this.props.getUserPosts(this.props.userName);
    }
  


    render() {
       
        return (
        
            <div>
            <h1>profile page</h1>
            <Container >
                {/* <h1>{this.props.match.params.id}</h1> */}
                <h1>{this.props.userName}</h1>
                
            </Container>
            {this.props.userPosts ? (
                <Container
                    style={{
                        border: '2px solid black',
                        overflowY: 'scroll',
                        width: '70%',
                        float: 'center',
                        position: 'center',
                        textAlign: 'center',
                        alignItems:'center',
                        alignContent:'center',
                    }}
                >
                    <div>
                        <Row gutter={16}>
                     <UserInfo from={"profile"} name={this.props.userName}></UserInfo>
                    {
                        this.props.userPosts.map((el, key) => {
                            return (<div>
                                {/* <Carousel autoplay> */}
                                <Col span={8}>
                                <Card hoverable title={this.props.userName} bordered={true} style={{ width: 240 }}
                                 actions={[
                                    <Button onClick={this.handleLikePost} id={key} type='primary' color="primary"><LikeOutlined className="TwoTone" key={key}/>{el.likeCounter.length}</Button>,
                                    <Button onClick={() => {this.props.deletePost({key:key,userName:this.props.userName})}} ><DeleteOutlined /></Button>
                                  ]} >
                                    {console.log(el)}
                                    <Carousel autoplay>
                                        {
                                            Object.keys(el).map((el2, key2) => {
                                                if (el2 !== "description" && el2!=="likeCounter")
                                                    return (
                                                        <div>
                                                            <img
                                                                alt="example"
                                                                src={`${el[el2].thumbUrl}`}
                                                            />

                                                        </div>
                                                    )
                                            })
                                        }
                                    </Carousel>
                                    {console.log(el.description)}
                                    <Meta title={el.description} description="www.instagram.com" />
                                   
                                </Card>
                                </Col>
                             

                                {/* </Carousel> */}
                            </div>

                            )
                        })
                    }
                    </Row>
                    </div>
                </Container>
            ) : null}
        </div>
    );
}
}
const mapDispatchToProps = dispatch => {
    return {
       
       
        getUserPosts:(value)=>
        dispatch({
            type:"GETUSERPOSTS",
            payload:value

        }),
        deletePost:(value)=>
        dispatch({
            type:"DELETEPOST",
            payload:value
        }),
        onLikePost: (value) =>
            dispatch({
                type: "LIKEUSERPOST",
                payload: value,
            }),
        
    }
}
const mapStateToProps = state => ({
   
userName:state.user.userName,
userPosts:state.user.userPosts,
searchValue: state.user.searchValue,
})
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
