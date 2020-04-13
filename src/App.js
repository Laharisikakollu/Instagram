import React from 'react';
import './App.css';
import Signup from './containers/Signup/signup';
import Login from './containers/login/login';
import Admin from './components/admin/admin';
import UserPosts from './components/admin/userPosts';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import userList from './containers/admin/userList';
import { Provider } from 'react-redux';
import UserRequest from './components/admin/userRequest';
import { createStore } from 'redux';
import UserProfile from './components/user/profile';
import UserTimeline from './components/user/timeline';
import UserSearch from './components/user/search';

import reducer from './reducers/index';
import AdminRouter from './Routes/adminRouter';
import UserRouter from './Routes/userRouter';
import SideDrawer from './containers/sidedrawer/sidedrawer';
import Logout from './components/logout/logout';
const store = createStore(reducer);
function App() {
  return (
    
    <Provider store={store}>
      <Router>
        <div className="App">
        
        <Switch>
        {/* <Route  path="/admin/userList/:id" exact component={UserPosts}/> */}
        <Route path="/" exact component={Signup}></Route>
        <Route path="/login" exact component={Login}></Route>
       
        <Route component={SideDrawer}></Route>
       
       
        

        {/* <Route path="/user/userProfile"  component={UserProfile} ></Route>
        <Route path="/user/userTimeline" component={UserTimeline} ></Route>
        <Route path="/user/userSearch"  component={UserSearch} ></Route> */}

        <Route path="/admin/userList" exact component={userList}></Route>
        <Route path="/admin/userRequest" exact component={UserRequest}></Route>
        {/* <Route  path="/admin" exact component={AdminRouter}></Route>
        <Route path="/user" component={UserRouter} ></Route> */}

        {/* <UserRouter/>  */}
         {/* <AdminRouter/> */}
       

        </Switch>                 
                        
        </div>
        
      </Router>
    </Provider>

   



                            
        
     
   
  );
}

export default App;