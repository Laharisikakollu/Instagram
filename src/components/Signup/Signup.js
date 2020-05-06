import React, { useState,useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import "antd/dist/antd.css";
import { Button } from "antd";
import { Link } from "react-router-dom";
import {onNameChange} from '../../actions/signup';
import {onPasswordChange} from '../../actions/signup';
import {setItems} from '../../actions/signup';
import {setItem} from '../../services/signup';
import "./signup.css";
import {
  Form,
  Input,
  Select
} from "antd";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

const { Option } = Select;
const SignUp =(props)=> {

  const [submit, setSubmit] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [userNameValidated,setuserNameValidated]=useState("");
  const [passwordValidated,setPasswordValidated]=useState("");
  const [email,setEmail]=useState("");
  const [emailValidated,setEmailValidated]=useState("");
  const [phone,setPhone]=useState("");
  const [phoneValidated,setPhoneValidated]=useState("");
  const [role,setRole]=useState("");
  const [roleValidated,setRoleValidated]=useState("");

  const userName = useSelector(state => state.signUp.userName)
  const password = useSelector(state => state.signUp.password)
  
 
  const dispatch = useDispatch()

  const handleChange = (e) => {
    let success = "success";
    if (
     e.target.value.length < 4 ||
     e.target.value.length > 30 ||
      !/^[A-Z0-9_-]{3,30}$/i.test(e.target.value)
    ) {
      success = "warning";
    }
   dispatch(onNameChange({userName:e.target.value}));
   setuserNameValidated(success)
  };
  const handlePassword = (e) => {
    let success = "success";
    if (!e.target.value || e.target.value.length < 5) {
      success = "warning";
    }
   dispatch(onPasswordChange({password:e.target.value}));
   setPasswordValidated(success)
  };
  const handleSubmit = async () => {
    console.log(userName,password,"names")
    let obj = {};
    if (
      (userName !== null || userName !== "") &&
      (password !== null || password !== "")
    ) {
      
      if (role === "admin") {
        obj = {
          userName: userName.userName,
          password: password.password,
          email: email,
          phone: phone,
          role: role,
          isaccept: true,
        };
      
       await setItem(obj)

        if (!props.success) {
          alert("Not valid User");
          return;
        }
      } else {
        obj = {
          userName: userName.userName,
          password: password.password,
          email: email,
          phone: phone,
          role: role,
          isaccept: null,
        };
        await setItem(obj)
      }

      alert("Signup successful", 1000);
      setSubmit(true)
      setToggle(false)
    } else {
      alert("enter username and password", 3000);
    }
  };

  

 
  const handleEmail = (e) => {
    let success = "success";
    if (!e.target.value || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)) {
      success = "warning";
    }
   setEmail(e.target.value);
   setEmailValidated(success)
  };


  const handlePhone = (e) => {
    let success = "success";
    if (!/^\d{10}$/.test(e.target.value)) {
      success = "warning";
    }
   setPhone(e.target.value);
   setPhoneValidated(success)
  };

  const handleRole = (e) => {
    let success = "success";
    if (!e) {
      success = "warning";
    }
    setRole(e);
    setRoleValidated(success)
  };

  
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 5,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 12,
        },
      },
    };
    const menu = (
      <Menu>
        <Menu.Item
          key="0"
          value="admin"
          id="admin"
          onClick={() => handleRole("admin")}
        >
          Admin
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          key="1"
          value="user"
          id="user"
          onClick={() => handleRole("user")}
        >
          User
        </Menu.Item>
      </Menu>
    );
    return (
      <div>
        {toggle ? (
          <div>
            <Form {...formItemLayout}>
              <h1 className="h1">Sign Up</h1>
              <Form.Item
                onChange={handleChange}
                label="Username"
                validateStatus={userNameValidated}
                help="Should be between 4 to 30 characters"
                hasFeedback
              >
                <Input id="success" />
              </Form.Item>

              <Form.Item
                onChange={handlePassword}
                value={password}
                label="Password"
                validateStatus={passwordValidated}
                help="Atleast 8 characters"
                hasFeedback
              >
                <Input id="success" />
              </Form.Item>

              <Form.Item
                onChange={handleEmail}
                value={email}
                label="Email"
                validateStatus={emailValidated}
                help="Should contain characters "
                hasFeedback
              >
                <Input id="success" />
              </Form.Item>

              <Form.Item
                onChange={handlePhone}
                value={phone}
                label="Phonenumber"
                validateStatus={phoneValidated}
                help="Should be length of 10 only numbers allowed"
                hasFeedback
              >
                <Input id="success" />
              </Form.Item>

              <Form.Item label="Role">
                <Dropdown overlay={menu} trigger={["click"]}>
                  <Button>
                    {roleValidated === "success" ? (
                      role
                    ) : (
                      <div>
                        Role <DownOutlined />
                      </div>
                    )}
                  </Button>
                </Dropdown>
              </Form.Item>

              <Form.Item>
                <Button
                  className="signup"
                  onClick={handleSubmit}
                  type="primary"
                  size="middle"
                >
                  SignUp
                </Button>
                <br></br>
                <br></br>

                <Link to="/login" className="link">
                  Already have an account
                </Link>
              </Form.Item>
            </Form>
          </div>
        ) : null}
      </div>
    );
  }


export default SignUp;
