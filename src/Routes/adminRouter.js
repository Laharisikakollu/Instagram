import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Admin from '../components/admin/admin';
import userList from '../components/admin/userList';
import UserRequest from '../components/admin/userRequest';


function AdminRouter() {
  return (
      <div>
   <Switch>
    <Route path="/admin" exact component={Admin}></Route>
    <Route path="/admin/userList" exact component={userList}></Route>
    <Route path="/admin/userRequest" exact component={UserRequest}></Route>
    </Switch>

    </div>
  );
}

export default AdminRouter;