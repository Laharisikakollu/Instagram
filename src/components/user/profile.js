import React, { Component } from 'react';
import {Container} from 'reactstrap';
import { connect } from "react-redux";
import SideDrawer from '../sidedrawer/sidedrawer';
import { Upload, Button , message, Modal as AntModal,  Carousel,Card, Col, Row } from 'antd';
import { DownloadOutlined ,HeartTwoTone,LikeOutlined,DeleteOutlined } from '@ant-design/icons';
import UserInfo from './userInfo';
import axios from "axios";
const jwt = require('jsonwebtoken');

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

    // componentDidUpdate(prevState,prevProps) {
    //     if(prevProps.userPosts!==this.props.userPosts)
    //     this.props.getUserPosts(this.props.userName);
    //     console.log(prevProps,prevState)
    // }

    handleLikePost = async(e) => {
        // e.preventDefault();
        // console.log(e.target.id);
        let payload=jwt.decode(JSON.parse(localStorage.getItem("token")))
        console.log(payload.id)
        let obj = {
            postId:e,
            userId:payload.id
        }
        await this.props.onLikePost(obj);
        await this.props.getUserPosts(this.props.userName);
    }
  


    render() {
       
        return (
        
            <div>
            <h1>Profile Page</h1>
            <Container >
                {/* <h1>{this.props.match.params.id}</h1> */}
                <h1>{this.props.userName}</h1>
                {console.log(this.props.userPosts)}
                
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
                        {  console.log(this.props.userPosts)}
                        <Row gutter={16}>
                            <Container>
                     <UserInfo from={"profile"} name={this.props.userName}></UserInfo>
                     </Container>
                    {
                      
                        this.props.userPosts.map((el, key) => {
                            return (<div> 
                                {/* <Carousel autoplay> */}
                                <Col span={8}>
                                <Card hoverable title={this.props.userName} bordered={true} style={{ width: 240 }}
                                 actions={[
                                    <Button onClick={()=>this.handleLikePost(el.id)} id={el.id} type='primary' color="primary"><LikeOutlined className="TwoTone" key={key}/>{el.likes}</Button>,
                                    <Button onClick={() =>this.props.deletePost(el.id)} ><DeleteOutlined /></Button>
                                  ]} >
                                    {console.log(el)}
                                    <Carousel autoplay>
                                        {
                                            (el.images).map((el2, key2) => {
                                                // if (el2 !== "description" && el2!=="likeCounter")
                                                    return (
                                                        <div>
                                                            <img
                                                                alt="example"
                                                                src={`${el2}`}
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
       
       
        getUserPosts: async (value) => {
            console.log((localStorage.getItem("token")))
            let userName=''
           let payload=await jwt.decode(JSON.parse(localStorage.getItem("token")))
           console.log(payload)
           
           console.log(window.location.pathname.substr(0,16))
           if(window.location.pathname.substr(0,16)==="/admin/userList/")
         
            {
                console.log(window.location.pathname.substr(0,16))
                userName=window.location.pathname.substr(16)}
            else{
                userName=payload.userName
            console.log(payload.userName)}
            await axios.get(`http://localhost:8000/getPosts/${userName}`)
                .then((res) => {
                    console.log(res)
                    if (res.data.success) {
                        dispatch({
                            type: "GETUSERPOSTS",
                            payload: res.data.posts1
                        })
                    }
                })
                .catch((err) => {
                    console.log(err);
                    message.error("error")
                })

        },
        deletePost:async(value)=>
        {
            console.log(value)
            await axios.post(`http://localhost:8000/deletePost`,{postId:value})   
        dispatch({
            type:"DELETEPOST",
            payload:value
        })},

        onLikePost: async(value) =>
        {
            await axios.post(`http://localhost:8000/addLike`,
                value
            )   
        
            dispatch({
                type: "LIKEUSERPOST",
                payload: value,
            })},
        
    }
}
const mapStateToProps = state => ({
   
userName:state.user.userName,
userPosts:state.user.userPosts,
searchValue: state.user.searchValue,
})
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
