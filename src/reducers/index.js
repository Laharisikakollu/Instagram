import { combineReducers } from 'redux'
import signUp from './signup.js'
import login from './login';
import admin from './admin.js';
import user from './user.js';

export default combineReducers({
  signUp,admin,login,user
})