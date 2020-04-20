import Timeline from '../../components/user/timeline';
import { connect } from "react-redux";
import axios from "axios";
import {  message } from 'antd';
const mapDispatchToProps = dispatch => {
    return {
       
        uploadPost: async (value) => {
            console.log(value.fileList)
            await axios.post('http://localhost:8000/addPost', {
                token: JSON.parse(localStorage.getItem("token")),
                description: value.description,
                imageList: value.fileList
            })
           
                .then((res) => {
                    console.log(res)
                    if (res.data.success) {
                        message.success("successfully uploaded");
                        dispatch({
                            type: "UPLOADPOST",
                            payload: value.imageList
                        })
                    }
                    else {
                        message.warning("error");
                    }
                })
                .catch((err) => {
                    console.log(err);
                    message.error("err");
                })

        },

        onLikePost: async(value) =>
        {
            await axios.post(`http://localhost:8000/addLike`,
                value
            )   
        
            dispatch({
                type: "LIKEUSERPOST",
                payload: value,
            })},

        getUserPosts:async (value)=>
       
        dispatch({
            type:"GETUSERPOSTS",
            payload:value
        }),

        getfollowerposts:async(value)=>
        {
            let res=await axios.get(`http://localhost:8000/timeline/${value}` )
            console.log(res.data)
        dispatch({
            type:"GETFOLLOWERPOSTS",
            payload:res.data
        })},

        
        uploadDescription: (value) =>
         dispatch({
        type: "NEWDESCRIPTION",
        payload: value
    })
    }
}
const mapStateToProps = state => ({
   
userName:state.user.userName,
userPosts:state.user.userPosts,
description: state.user.description,
followingPosts:state.user.followingPosts
})
export default connect(mapStateToProps, mapDispatchToProps)(Timeline);