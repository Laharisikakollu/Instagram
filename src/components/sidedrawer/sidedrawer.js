import React from "react";
import {
    Switch,
    Route,
    Link
  } from "react-router-dom";


import { Menu, Button, Drawer } from 'antd';
import { connect } from "react-redux";
import Logout from '../logout/logout';


import {
    InstagramOutlined,
    UserOutlined,
} from '@ant-design/icons';
import UserList from '../admin/userList';
import UserRequest from '../admin/userRequest';
import UserTimeline from '../user/timeline';
import UserProfile from '../user/profile';
import UserSearch from '../user/search';


class SideDrawer extends React.Component {
    


    state = { visible: false, placement: 'left',collapsed:false };

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

hideUserLinks = () => {
 
  if(this.state.visible===this.props.toggle)
  this.props.onChangeToggle();
  
}


    render() {
        return (
            <div >
                <Button type="primary" onClick={this.showDrawer} style={{marginRight:1300}}>
          MENU
        </Button>
                <Drawer
          title="Basic Drawer"
          placement="left"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
            {localStorage.getItem("role") === "admin" ?
         (
         <div><Link to="/admin/userList"  onClick={this.hideUserLinks}><InstagramOutlined />UserLists</Link><br></br><br></br><br></br>
         <Link to="/admin/userRequest"><UserOutlined />User Requests</Link></div>)
         :
         (<div>
           
            <Link to={`/user/${this.props.signeduserName}/userProfile`}><InstagramOutlined />User Profile</Link><br></br><br></br><br></br>
            <Link to={`/user/${this.props.signeduserName}/userTimeline`}><InstagramOutlined />User Timline</Link><br></br><br></br><br></br>
            <Link to={`/user/${this.props.signeduserName}/userSearch`}><InstagramOutlined />User Search</Link>
            </div>)}

        </Drawer>
        <Route exact component={Logout}></Route>
        <Switch>
                        
                        <Route path="/admin/userList"  component={UserList}></Route>
                        <Route path="/admin/userRequest" component={UserRequest} ></Route>
                        <Route path="/user/:id/userProfile"   component={UserProfile} ></Route>
                        <Route path="/user/:id/userTimeline" component={UserTimeline} ></Route>
                        <Route path="/user/:id/userSearch" component={UserSearch} ></Route>
                        
                       
                            
        </Switch>
            </div>

        );
    }
}
const mapStateToProps = state => ({
  users: state.admin.users,
  toggle:state.admin.toggle,
  signeduserName:state.login.userName
})
const mapDispatchToProps = dispatch => {
  return {
      onChangeToggle:()=>
      dispatch({
          type:"TOGGLEUSER"
      })
      
}}
export default (connect(mapStateToProps, mapDispatchToProps)(SideDrawer));