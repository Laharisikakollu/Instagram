import React, { Component } from 'react';
// import { Layout, Menu, Breadcrumb } from 'antd';
// import { connect } from "react-redux";
// const { Header, Content, Footer } = Layout;
import { connect } from "react-redux";
import SideDrawer from '../sidedrawer/sidedrawer';
import { Upload, Button , message, Modal as AntModal, Carousel,Card, Col, Row } from 'antd';
import {Container} from 'reactstrap';
import { Input } from 'antd';
import Profile from './profile';

import { DownloadOutlined ,HeartTwoTone,LikeOutlined} from '@ant-design/icons';
const { Meta } = Card;
const { Search } = Input;

class SearchPost extends Component{
    constructor(props) {
        super(props);
        this.state = {
            searchValue:'',
            display:false,
            

          }}
          
          componentDidMount(){
            // this.props.setUserName(this.state.searchValue)
            this.props.getUserPosts(this.state.searchValue);
        }


    newSearch = (e) => {
        e.preventDefault();
        this.setState({ searchValue: e.target.value });
    }

    handleSearch =async () => {
       
        await this.props.getUserPosts(this.state.searchValue);
        this.setState({
          display: true,
        });

        
        
        // this.props.setUserName(this.state.searchValue)
      this.props.getUserPosts(this.state.searchValue);
    

    //    this.setState({
    //         fileList: [],
    //         uploading: false,
    //         // newPostName:null
    //     });
    //     message.success('upload successfully.');

    }



    

    render() {
       
        return (
        
        
        <div>
               <Input placeholder="Search user" onChange={this.newSearch}  />
               <Button outline color="primary" onClick={this.handleSearch}>Done</Button>
            {this.state.display ?  ( this.props.userPosts ? (
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
                    {
                        this.props.userPosts.map((el, key) => {
                            return (<div>
                                
                                <Card hoverable title={this.props.userName} bordered={true} style={{ width: 240 }}
                                 actions={[
                                    <LikeOutlined className="TwoTone" key="like" value={el.likeCounter} />,

                                  ]} >
                                    {console.log(el)}
                                    <Carousel autoplay>
                                        {
                                            Object.keys(el).map((el2, key2) => {
                                                if (el2 !== "description"&& el2!=="likeCount")
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

                                
                            </div>

                            )
                        })
                    }
                </Container>
            ) :  (<div>
                User not found</div>)):null
           }
       
        </div>);
    }
}

const mapStateToProps = state => ({
    userName: state.user.userName,
    userPosts: state.user.userPosts,
})
const mapDispatchToProps = dispatch => {
    return {
        getUserPosts: (value) =>
            dispatch({
                type: "GETUSERPOSTS",
                payload: value,

            }),
            setUserName: (value) =>
            dispatch({
                type: "SETUSERNAME",
                payload: value
            }),

    }
}
export default (connect(mapStateToProps, mapDispatchToProps)(SearchPost));

