import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import UserSearch from '../components/user/search';
import UserProfile from '../components/user/profile';
import UserTimeline from '../components/user/timeline';
import UserPosts from '../components/admin/userPosts';

function AdminRouter() {
  return (
      <div>
   
    <Switch>
        <Route path="/user" exact component={UserPosts} ></Route>

        <Route path="/user/userProfile"  component={UserProfile} ></Route>
        <Route path="/user/userTimeline" component={UserTimeline} ></Route>
        <Route path="/user/userSearch"  component={UserSearch} ></Route>

        </Switch>

    </div>
  );
}

export default AdminRouter;