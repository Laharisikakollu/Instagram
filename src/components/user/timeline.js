import React, { Component } from 'react';
import { Container, Modal, ModalFooter, ModalHeader, ModalBody, Form, FormGroup, Label, Input, } from 'reactstrap';
// import { Button } from 'reactstrap';
import { Upload, Button , message, Modal as AntModal, Card, Col, Row ,Carousel} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { PlusOutlined, LoadingOutlined ,LikeOutlined} from '@ant-design/icons';
import { connect } from "react-redux";
const { Meta } = Card;
const jwt=require('jsonwebtoken')

function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }


class Timeline extends Component{
    constructor(props) {
        super(props);
        this.state = {
            newPostName:'',
            toggleAddNewPost:false,
            fileList: [],
            uploading: false,
            previewImage:'',
            previewVisible: false,
            

          }}

          componentWillMount(){
            const payload=jwt.decode(JSON.parse(localStorage.getItem("token")))
            this.props.getfollowerposts(payload.userName)
          }
          
          componentDidMount() {
            this.props.getUserPosts(this.props.userName);
        }

        handlePreview = async file => {
            if (!file.url && !file.preview) {
              file.preview = await getBase64(file.originFileObj);
            }
        
            this.setState({
              previewImage: file.url || file.preview,
              previewVisible: true,
            });
          };

          handleCancel = () => this.setState({ previewVisible: false });

          handleChange = ({ fileList }) => this.setState({ fileList });

        
          handleUpload = async () => {
            const { fileList } = this.state;
            console.log(fileList)
            let formData = new FormData();

            await fileList.forEach(file => {
              file = { ...file, description: this.state.newPostName };
              formData.append('files[]', file);
            });
        
            this.setState({
              uploading: true,
            });

            await this.props.uploadDescription(this.state.newPostName);    
            await this.props.uploadPost({fileList,description:this.props.description});
            // await this.props.getUserPosts(this.props.userName);

            await this.setState({
                fileList: [],
                uploading: false,
                newPostName:null
            });
            message.success('upload successfully.');
    
        }

        handleAddNewPostToggler = (e) => {
            e.preventDefault();
            this.setState({ toggleAddNewPost: !this.state.toggleAddNewPost })
        }

        newPostHandler = (e) => {
            e.preventDefault();
            this.setState({ newPostName: e.target.value });
        }
    
        handleNotSubmit = () => {
            this.setState({
                toggleAddNewPost: !this.state.toggleAddNewPost,
                newPostName: null
            })
        }
        handleSubmitNewPost = () => {
            
            this.setState({
                toggleAddNewPost: !this.state.toggleAddNewPost,
            })
        }

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
           
            
        
          render() 
          {
            const { uploading, fileList, previewVisible,previewImage} = this.state;
            const props = {
                listType: 'picture-card',
            className: "avatar-uploader",
              onRemove: file => {
                this.setState(state => {
                  const index = state.fileList.indexOf(file);
                  const newFileList = state.fileList.slice();
                  newFileList.splice(index, 1);
                  return {
                    fileList: newFileList,
                  };
                });
              },
              beforeUpload: file => {
                this.setState(state => ({
                  fileList: [...state.fileList, file],
                }));
                return false;
              },
              fileList,
            };
        
            return (
              <div>
                  <Container style={{
                    border: '2px solid black',
                    display: 'flex',
                    overflowX: 'scroll',
                    width: '70%',
                    maxHeight: '150px'
                }}>
                <Button outline color="info" onClick={this.handleAddNewPostToggler}> Add new Post</Button>
                <Modal isOpen={this.state.toggleAddNewPost} toggle={this.state.toggleAddNewPost} backdrop="static" >

                    <ModalHeader toggle={()=>this.state.toggleAddNewPost}>Add A NEW POST</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="newStage">Stage Name</Label>
                                <Input type="text" id="newStage" value={this.state.newPostName} onChange={this.newPostHandler} placeholder="enter description"></Input>
                            </FormGroup>
                            <FormGroup>

                <Upload {...props} onChange={this.handleChange}>
                  <Button>
                    <UploadOutlined /> Select File
                  </Button>
                </Upload>
                <Button
                  type="primary"
                  onClick={this.handleUpload}
                  disabled={fileList.length === 0}
                  loading={uploading}
                  style={{ marginTop: 16 }}
                >
                  {uploading ? 'Uploading' : 'Start Upload'}
                </Button>

                <AntModal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </AntModal>
                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button outline color="primary" onClick={this.handleSubmitNewPost}>Done</Button>
                            <Button outline color="secondary" onClick={this.handleNotSubmit}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </Container>
                <br></br>

                {console.log(this.props.followingPosts)}
                {this.props.followingPosts?(
                  
                this.props.followingPosts.map((el, key) => {
                            return (<Container  style={{marginLeft:"850px"}}>
                               <div> 
                                
                                  {/* <Container> */}
                                <Col span={8}>
                                <Card hoverable bordered={true} style={{ width: 240 }}
                                 actions={[
                                    <Button onClick={()=>this.handleLikePost(el.id)} id={el.id} type='primary' color="primary"><LikeOutlined className="TwoTone" key={key}/>{el.likes}</Button>,
                                   
                                  ]} >
                                    {console.log("hi")}
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
                                <br></br>
                                </Col>
                             

                            </div>

                            </Container>


                            )
                        })):null}
                </div>
            );
          }}
    
export default Timeline;
        

