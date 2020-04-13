import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Menu, Button, Drawer } from 'antd';

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

export default Admin;