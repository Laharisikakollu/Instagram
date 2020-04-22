import React from 'react';
import "antd/dist/antd.css";
import { Button } from 'antd';
import {Link} from 'react-router-dom';
import './signup.css';
import { SmileOutlined } from '@ant-design/icons';
import { Form, Input, DatePicker, TimePicker, Select, Cascader, InputNumber } from 'antd';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const { Option } = Select;
class SignUp extends React.Component {
    state = {
        submit: false,
        toggle: true,
        
        
    }
    handleChange = (e) => {
        this.props.onNameChange(e.target.value)
        
    }
    handlePassword = (e) => {
        this.props.onPasswordChange(e.target.value)
    }
    handleSubmit = async () => {
      let obj={}
        if ((this.props.userName !== null || this.props.userName !== "" ) && (this.props.password !== null || this.props.password!=="")) {
          console.log(this.props.role)
          if(this.props.role==="admin")
          {
            obj = {
                userName:this.props.userName,
                password: this.props.password,
                email:this.props.email,
                phone: this.props.phone,
                role:this.props.role,
                // posts:[],
                // followers:[],
                // following:[],
                isaccept:true
                // followRequests:[],
             }
            await this.props.validate();
            this.props.setItem(obj)
           
            if(!this.props.success){
                alert("Not valid User");
                return;
            }

            // await this.props.getItem();
            // if (!this.props.localStorageData && this.props.role!=="admin") {
            //     this.props.setItem(obj)
            // }
          }
            else{
                obj={
                    userName:this.props.userName,
                    password: this.props.password,
                    email:this.props.email,
                    phone: this.props.phone,
                    role:this.props.role,
                    isaccept:null
                    // users:[],
                    // requests:[]
                }
                await this.props.validate();
                this.props.setItem(obj)
            }

            alert("Signup successful", 1000);
            this.setState({ submit: true, toggle: false })
        }
        else {
            alert("enter username and password", 3000);
        }
    }
    handleLogout = () => {
        this.setState({ submit: false, toggle: true })
        this.props.onLogout()
        alert("logout successful", 1000);
    }
    handleEmail = (e) => {
        this.props.setEmail(e.target.value);
    }
    handlePhone = (e) => {
        this.props.setPhone(e.target.value);
    }

    handleRole = (e) => {
        this.props.setRole(e);
    }

    render() {
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
            <Menu >
              <Menu.Item key="0"  value="admin" id="admin" onClick={() => this.handleRole("admin")}  > 
                Admin
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item key="1" value="user" id="user" onClick={() => this.handleRole("user")}>
               User
              </Menu.Item>
              
              
            </Menu>
          );
        return (
            <div>
                {this.state.toggle ? 
                <div>
                    

<Form {...formItemLayout}>
    <h1 className="h1">Sign Up</h1>
    <Form.Item
      onChange={this.handleChange}
      label="Username"
      validateStatus={this.props.userNameValidated}
      help="Should be between 4 to 30 characters"
      hasFeedback
    >
      <Input id="success" />
    </Form.Item>

    <Form.Item
    onChange={this.handlePassword} 
    value={this.props.password} 
      label="Password"
      validateStatus={this.props.passwordValidated}
      help="Atleast 8 characters"
      hasFeedback
    >
      <Input id="success" />
    </Form.Item>

    <Form.Item
    onChange={this.handleEmail} 
    value={this.props.email}
      label="Email"
      validateStatus={this.props.emailValidated}
      help="Should contain characters "
      hasFeedback
    >
      <Input  id="success"/>
    </Form.Item>

    <Form.Item
    onChange={this.handlePhone} 
    value={this.props.phone}
      label="Phonenumber"
      validateStatus={this.props.phoneValidated}
      help="Should be length of 10 only numbers allowed"
      hasFeedback
    >
      <Input id="success" />
    </Form.Item>

    <Form.Item label="Role" > 
    <Dropdown overlay={menu} trigger={['click']}>
    <Button >
    {
                this.props.roleValidated === "success" ?
                    (this.props.role)
                                         :
                 (<div>Role  <DownOutlined/></div>)
    }
    </Button>
  </Dropdown>
  


 </Form.Item>

    <Form.Item>
    <Button className="signup" onClick={this.handleSubmit} type="primary" size="middle">SignUp</Button><br></br><br></br>
                           
                                <Link to="/login" className="link">Already have an account</Link> 
                                </Form.Item>
    </Form>
                        
                </div> : null}
                
            </div>
        );
    }
}

export default SignUp;