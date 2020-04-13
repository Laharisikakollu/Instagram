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
import UserInfo from './userInfo';
import { DownloadOutlined ,HeartTwoTone,LikeOutlined,UserAddOutlined} from '@ant-design/icons';
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

        componentDidUpdate = async (prevProps, prevState) => {
            if (prevProps.searchValue !== this.props.searchValue) {
                await this.props.getUserPosts(this.props.searchValue);
            }
        }


    newSearch =async (e) => {
        e.preventDefault();
        this.setState({ searchValue: e.target.value });
        await this.props.onNewSearch(e.target.value);
        this.setState({ display: false })
    }

    handleSearch =async () => {
       
        await this.props.getUserPosts(this.state.searchValue);
        await this.props.getUserPosts(this.props.searchValue);
        this.setState({
          display: true,
        });


    }

    handleLikePost = async (e) => {
        e.preventDefault();
        console.log(e.target.id);
        let obj = {
            key: e.target.id,
            postUserName: this.props.searchValue,
            presentUser: this.props.userName,
        }
        await this.props.onLikePost(obj);
        await this.props.getUserPosts(this.props.searchValue)
    }


    

    render() {
       
        return (
        
        
        <div>
              
            {this.state.display ?  ( 
                
                

                <div>

             
                                            
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
                                                      <UserInfo from={"search"} name={this.state.searchValue}></UserInfo>
                                                   {
                                                       this.props.userPosts.map((el, key) => {
                                                        return (<div>
                                
                                                         <Card hoverable title={this.props.userName} bordered={true} style={{ width: 240 }}
                                                           actions={[
                                                            <Button onClick={this.handleLikePost} id={key} type='primary' color="primary"><LikeOutlined className="TwoTone" key={key} />{el.likeCounter.length}</Button>,

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
                                            ) : 
            
                                           (<div> User not found</div>) }</div>  ):<div> <Input placeholder="Search user"  value={this.searchValue} onChange={this.newSearch}  />
                                                                                <Button outline color="primary" onClick={this.handleSearch}>Done</Button>
                                                                                </div>
           }
       
        </div>);
    }
}

const mapStateToProps = state => ({
    userName: state.user.userName,
    userPosts: state.user.userPosts,
    followRequests: state.user.followRequests,
    searchValue: state.user.searchValue,
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
            onLikePost: (value) =>
            dispatch({
                type: "LIKEUSERPOST",
                payload: value,
            }),
            onNewSearch: (value) =>
            dispatch({
                type: "SEARCHUSERNAME",
                payload: value,
            }),

    }
}
export default (connect(mapStateToProps, mapDispatchToProps)(SearchPost));

