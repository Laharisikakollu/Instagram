import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, Switch } from 'antd';
import { Redirect } from 'react-router';
import './login.css';
class Login extends Component {
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {

    }
    onFinish = async(values) => {
        
        await this.props.onSubmit(this.props.userName,this.props.password);
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
        console.log(this.props.role)
        if (this.props.role === "user") {
            this.props.setUserUserName(this.props.userName);
        }
      
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

            <div >
                {console.log(this.props.role)}
                {console.log(this.props.userName)}
                {console.log(this.props.success)}
            {this.props.success ? (
                this.props.role === "admin" ?
                    (
                        <Redirect to="/admin"></Redirect>
                    )
                    :
                    (    
                        <Redirect to={`/user/${this.props.userName}`}></Redirect>
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
                    <div  className="insta-icon"></div>
                    <h1 className="h1" >LOG IN</h1>
                    
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
export default Login;