import React, { useState,useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { Form, Input, Button, Checkbox, Switch } from "antd";
import {onNameChange} from '../../actions/signup';
import {onPasswordChange} from '../../actions/signup';
import {setUserName} from '../../actions/login';
import {onSubmit} from '../../services/login';
import {onSubmits} from '../../actions/login';
import { Redirect } from "react-router";
import "./login.css";
const Login =(props) => {


  const userName = useSelector(state => state.login.userName)
  const password = useSelector(state => state.login.password)
  const role = useSelector(state => state.login.role)
  const uSuccess = useSelector(state => state.login.uSuccess)
  const pSuccess = useSelector(state => state.login.pSuccess)
  const success = useSelector(state => state.login.success)
  
console.log(userName,password,"log")
console.log(role,"role")
  const dispatch = useDispatch()

  const onFinish = async (values) => {
    let submit=await onSubmit(userName,password)
    console.log(submit)
      dispatch(onSubmits(submit))
    if (uSuccess===false) {
      alert("Username does not exist");
      return;
    }
    if (pSuccess===false) {
      alert("Password Incorrect");
      return;
    }
    if (success === "") {
      alert("Admin didn't accept");
      return;
    }
    alert("Successfully Logged in");
   dispatch(setUserName(userName))
    if (role === "user") {
      dispatch(setUserName(userName))
    }
  };

  const onFinishFailed = (errorInfo) => {
    alert("Failed:", errorInfo);
  };

  const handleNameChange = (e) => {
    dispatch(onNameChange(e.target.value));
  };
  const handlePasswordChange = (e) => {
    dispatch(onPasswordChange(e.target.value));
  };
  
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
        {success ? (
          role === "admin" ? (
            <Redirect to="/admin"></Redirect>
          ) : (
            <Redirect to={`/user/${userName}`}></Redirect>
          )
        ) : (
          <div
            className="container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "100px",
              marginRight: "500px",
            }}
          >
            <Form
              {...layout}
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <div className="insta-icon"></div>
              <h1 className="h1">LOG IN</h1>

              <Form.Item
                onChange={handleNameChange}
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please enter your username!",
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
                    message: "Please enter your password!",
                  },
                ]}
                onChange={handlePasswordChange}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                {...tailLayout}
                name="remember"
                valuePropName="checked"
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </div>
    );
  }

export default Login;
