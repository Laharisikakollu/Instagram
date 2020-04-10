import React, { Component } from 'react';
import { connect } from "react-redux";
import { Form, Input, Button, Checkbox, Switch } from 'antd';
import { Redirect } from 'react-router';
class Login extends Component {
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {

    }
    onFinish = async(values) => {
        
        await this.props.onSubmit();
        if(!this.props.uSuccess){
            alert("Username does not exist");
            return;
        }
        if(!this.props.pSuccess){
            alert("Password Incorrect");
            return;
        }
        if(!this.props.success){
            alert("Admin didn't accept");
            return;
        }
        alert("Successfully Logged in");
        this.props.setUserName(this.props.userName);
      
    };

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    handleNameChange = (e) => {
        this.props.onNameChange(e.target.value);
        
    }
    handlePasswordChange = (e) => {
        this.props.onPasswordChange(e.target.value);
    }
    render() {
        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 16,
            },
        };
        const tailLayout = {
            wrapperCol: {
                offset: 8,
                span: 16,
            },
        };
        return (
            <div>
            {this.props.success ? (
                this.props.role === "admin" ?
                    (
                        <Redirect to="/admin"></Redirect>
                    )
                    :
                    (    
                        <Redirect to="/user"></Redirect>
                    )
                    
            ) : (
            <div className="container"
             style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "100px",
                marginRight: "500px"
            }}
            >

                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <h1>Sign In</h1>
                    <Form.Item
                        onChange={this.handleNameChange}
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your username!',
                            },
                        ]}
                        
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your password!',
                            },
                        ]}
                        onChange={this.handlePasswordChange}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" >Submit</Button>
                    </Form.Item>
                </Form>
            </div>)}
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onNameChange: (value) =>
            dispatch({
                type: "USERNAMECHANGE",
                payload: value
            }),
        onPasswordChange: (value) =>
            dispatch({
                type: "PASSWORDCHANGE",
                payload: value
            }),
            onSubmit:()=>
            dispatch({
                type:"SUBMIT"
            }),
            setUserName: (value) =>
            dispatch({
                type: "SETUSERNAME",
                payload: value
            })
            
  }
    };

const mapStateToProps = (state) => ({
    userName: state.login.userName,
    password: state.login.password,
    localStorageData: state.login.localStorageData,
    success: state.login.success,
    uSuccess: state.login.uSuccess,
    pSuccess: state.login.pSuccess,
    role:state.login.role
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);