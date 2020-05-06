import React, { useState,useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import UserPosts from './userPosts';
import {onGetUsers} from '../../services/admin';
import {onChangeToggle} from '../../actions/admin';


const UserList=(props)=>{
 
  const [users, setUsers] = useState([])
  const toggle = useSelector(state => state.admin.toggle)
  

  const dispatch = useDispatch()

 const getusers = async ()=>{
  let getusers = await onGetUsers()
  setUsers(getusers)
  // return getusers
 }
 
  useEffect(() => {
    getusers()
  },[]);

  const hideUserLinks = () => {
    dispatch(onChangeToggle())
  };
  
    return (
      <div>
        {!toggle ? (
          <div>
            <h1>User List</h1>
            {users
              ? users.map((el, index) => {
                  return (
                    <div key={index}>
                      <Link
                        onClick={hideUserLinks}
                        to={{ pathname: `/admin/userList/${el}` }}
                      >
                        {el}
                      </Link>

                      <br></br>
                    </div>
                  );
                })
              : null}
          </div>
        ) : (
          <div>
            <Route path="/admin/userList/:id" exact component={UserPosts} />
          </div>
        )}
      </div>
    );
  }


export default UserList;
