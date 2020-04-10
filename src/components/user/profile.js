import React, { Component } from 'react';
import {Container} from 'reactstrap';
import { connect } from "react-redux";
import SideDrawer from '../sidedrawer/sidedrawer';
import { Upload, Button , message, Modal as AntModal,  Carousel,Card, Col, Row } from 'antd';
import { DownloadOutlined ,HeartTwoTone,LikeOutlined} from '@ant-design/icons';

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
                        // maxHeight: '250px'
                    }}
                >
                    {
                        this.props.userPosts.map((el, key) => {
                            return (<div>
                                {/* <Carousel autoplay> */}
                                <Card hoverable title={this.props.userName} bordered={true} style={{ width: 240 }}
                                 actions={[
                                    <LikeOutlined className="TwoTone" key="like" value={el.likeCounter} />,

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
                                    {/* <AntButton className="Twotone"><HeartTwoTone className="TwoTone"/></AntButton> */}
                                </Card>

                                {/* </Carousel> */}
                            </div>

                            )
                        })
                    }
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

        })
    }
}
const mapStateToProps = state => ({
   
userName:state.user.userName,
userPosts:state.user.userPosts
})
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
