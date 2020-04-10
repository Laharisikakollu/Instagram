import React, { Component } from 'react';
import { Container, Modal, ModalFooter, ModalHeader, ModalBody, Form, FormGroup, Label, Input, } from 'reactstrap';
// import { Button } from 'reactstrap';
import { Upload, Button , message, Modal as AntModal, Card, Col, Row } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';

import { Container, Modal, ModalFooter, ModalHeader, ModalBody, Form, FormGroup, Label, Input, } from 'reactstrap';

import { connect } from "react-redux";

class Dummy extends Component{
    constructor(props) {
        super(props);
        this.state = {
            newStageName: null,
            toggleAddNewStage: false,
        }
    }
    handleAddNewStageToggler = (e) => {
        e.preventDefault();
        this.setState({ toggleAddNewStage: !this.state.toggleAddNewStage })
    }
    newStageNameHandler = (e) => {
        e.preventDefault();
        this.setState({ newStageName: e.target.value });
    }
    componentDidMount() {
    }
    componentDidUpdate(prevProps, prevState) {
    }
    
    handleNotSubmit = () => {
        this.setState({
            toggleAddNewStage: !this.state.toggleAddNewStage,
            newStageName: null
        })
    }
    handleSubmitNewStage = () => {
        if (this.state.newStageName === null || this.state.newStageName === "") {
            alert("enter Valid stage name");
            return;
        }
        this.setState({
            toggleAddNewStage: !this.state.toggleAddNewStage,
        })
    }
    render() {
        
        return (
            <div>
              
                    <Button outline color="info" onClick={this.handleAddNewStageToggler}> Add new Stage</Button>
                    <Modal isOpen={this.state.toggleAddNewStage} toggle={this.state.toggleAddNewStage} backdrop="static" >
                        <ModalHeader toggle={this.state.toggleAddNewStage}>Add A NEW STAGE</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="newStage">Stage Name</Label>
                                    <Input type="text" id="newStage" onChange={this.newStageNameHandler} placeholder="enter new stage name"></Input>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button outline color="primary" onClick={this.handleSubmitNewStage}>Add Stage</Button>{' '}
                            <Button outline color="secondary" onClick={this.handleNotSubmit}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                 {/* </Container> */}
            </div>
        );
    }
}
export default Dummy;