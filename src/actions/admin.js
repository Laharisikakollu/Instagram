// export const GETUSERS='GETUSERS';
// export const TOGGLEUSER='TOGGLEUSER';
// export const GETUSERPOSTS='GETUSERPOSTS';
// export const SETUSERNAME='SETUSERNAME';
// export const GETREQUESTS='GETREQUESTS';
// export const ACCEPT='ACCEPT';
// export const REJECT='REJECT';
import {onGetUsers} from '../services/admin';
import {useDispatch} from 'react-redux';



export const onChangeToggle = () =>{
    return{
        type: "TOGGLEUSER",
      }
    }  

export const getRequests = (getrequests) => {
        // let getRequests=await onGetRequests()
         return{
            type: "GETREQUESTS",
            payload: getrequests,
          }
        }
    
export const accepts= (accept) => {
        
         return{
            type: "ACCEPT",
            payload: accept,
          }
        }
    
export const declines= (decline) => {
       
          return{
            type: "REJECT",
            payload: decline,
          }
        }


export const getUserPosts= async (getuserPosts) => {
     
          // let getuserPosts=await getUserPosts()
            return{
                type: "GETUSERPOSTS",
                payload: getuserPosts,
              }
            }
        
