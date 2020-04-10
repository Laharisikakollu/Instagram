import React,{Component} from 'react';
import{connect} from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Menu, Button, Drawer } from 'antd';
import UserList from './userList';
import UserRequest from './userRequest';
import {
    InstagramOutlined,
    UserOutlined,
} from '@ant-design/icons';
import SideDrawer from '../sidedrawer/sidedrawer';


class Admin extends Component{
  

    state = {collapsed:false, visible: false, placement: 'left' };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

    
  toggleCollapsed = () => {
    this.setState({
        collapsed: !this.state.collapsed,
    });
};

  render() {
    return (
      <div>

          <SideDrawer role={"admin"}></SideDrawer>
      {/* <Router>
        <Button type="primary" onClick={this.showDrawer}>
          MENU
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="left"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
         <Link to="/admin/userList"><InstagramOutlined />UserLists</Link><br></br><br></br><br></br>
         <Link to="/admin/userRequest"><UserOutlined />User Requests</Link>
        </Drawer>
        <Switch>
                        
                        <Route path="/admin/userList" >
                            <UserList />
                        </Route>
                        <Route path="/admin/userRequest" >
                            <UserRequest/>
                        </Route>
        </Switch>
       </Router>  */}

      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
    // return {
    //     onNameChange: (value) =>
    //         dispatch({
    //             type: "USERNAMECHANGE",
    //             payload: value
    //         }),
    //     onPasswordChange: (value) =>
    //         dispatch({
    //             type: "PASSWORDCHANGE",
    //             payload: value
    //         }),
    //     onLogout: () =>
    //         dispatch({
    //             type: "LOGOUT",
    //         }),
    //     getItem: () =>
    //         dispatch({
    //             type: "GET",
    //             // payload: this.props.userName
    //         }),
    //     setItem: (obj) =>
    //         dispatch({
    //             type: "SET",
    //             payload: obj
    //         }),
    //         setRole:(value)=>
    //         dispatch({
    //             type:"ROLE",
    //             payload:value
    //         }),
    //         setPhone:(value)=>
    //         dispatch({
    //             type:"PHONE",
    //             payload:value
    //         }),
    // };
};
const mapStateToProps = (state) => ({
    // userName: state.signUp.userName,
    // password: state.signUp.password,
    // localStorageData: state.signUp.localStorageData,
    // phone:state.signUp.phone,
    // role:state.signUp.role,
    // email:state.signUp.email,
    // success:state.signUp.success
})
export default connect(mapStateToProps, mapDispatchToProps)(Admin);