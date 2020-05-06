import React, { useState,useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import Profile from "../../containers/user/profile";
import {setUserName} from '../../actions/user';

const UserPosts =(props)=> {
 
 

  const [display, setDisplay] = useState(false);
  const dispatch = useDispatch()

  

  useEffect( () => {
    dispatch(setUserName(props.match.params.id))
    setDisplay(true)
  },[]);

  useEffect(() => {
    return () =>{setDisplay(false)}
  },[]);

    return (
      <div>
        {console.log("display",display)}
        <h1>User Page {props.match.params.id}</h1>
           {display ? <Profile /> : null}
      </div>
    );
  
}
export default UserPosts;

