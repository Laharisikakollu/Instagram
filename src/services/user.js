import axios from "axios";
const jwt = require("jsonwebtoken");

export const onGetFollowRequests = async (value) => {
  try {
    let payload = jwt.decode(JSON.parse(localStorage.getItem("token")));
    let res = await axios.get(
      `http://localhost:8000/getfollowrequest/${payload.userName}`
    );
    return res.data;
  } catch (err) {
    return false;
  }
};

export const accept = async (value) => {
  try {
    value = { ...value, token: JSON.parse(localStorage.getItem("token")) };
    let res = await axios.post(
      `http://localhost:8000/acceptfollowrequest`,
      value
    );
    return res.data;
  } catch (err) {
    return false;
  }
};

export const decline = async (value) => {
  try {
    value = { ...value, token: JSON.parse(localStorage.getItem("token")) };

    let res = await axios.post(
      `http://localhost:8000/declinefollowrequest`,
      value
    );
    return res.data;
  } catch (err) {
    return false;
  }
};

export const getUserPosts = async (value) => {
  try {
    let userName = "";
    let payload = await jwt.decode(JSON.parse(localStorage.getItem("token")));
    let path = window.location.pathname.substring(
      window.location.pathname.length - 10,
      window.location.pathname.length
    );

    if (window.location.pathname.substr(0, 16) === "/admin/userList/") {
      userName = window.location.pathname.substr(16);
    } else if (path === "userSearch") {
      userName = value;
    } else {
      userName = payload.userName;
    }
    let res = await axios.get(`http://localhost:8000/getPosts/${userName}`);

    if (res.data.success) {
      return res.data.posts1;
    }
  } catch (err) {
    return false;
  }
};

export const deletePost = async (value) => {
  try {
    await axios.post(`http://localhost:8000/deletePost`, { postId: value });
    return value;
  } catch (err) {
    return false;
  }
};

export const onLikePost = async (value) => {
  try {
    await axios.post(`http://localhost:8000/addLike`, value);
    return value;
  } catch (err) {
    return false;
  }
};

export const addComment = async (value) => {
  try {
    let res = await axios.post(`http://localhost:8000/addComment`, value);
    return value;
  } catch (err) {
    return false;
  }
};

export const getComment = async (value) => {
  try {
    let res = await axios.get(`http://localhost:8000/getComment/${value}`);
    return res.data.names;
  } catch (err) {
    return false;
  }
};

export const getfollowerposts = async (value) => {
  try {
    let res = await axios.get(`http://localhost:8000/timeline/${value}`);
    return res.data;
  } catch (err) {
    return false;
  }
};

export const uploadPost = async (value) => {
  try {
    let res = await axios.post("http://localhost:8000/addPost", {
      token: JSON.parse(localStorage.getItem("token")),
      description: value.description,
      imageList: value.fileList,
    });
    if (res.data.success) {
      return value.imageList;
    }
  } catch (err) {
    return false;
  }
};


export const getUserFollowersAndFollowing=async (value) => {
  try{
  let userName = "";
  let payload = await jwt.decode(JSON.parse(localStorage.getItem("token")));
  let path=window.location.pathname.substring(window.location.pathname.length - 10, window.location.pathname.length);
  if (window.location.pathname.substr(0, 16) === "/admin/userList/") {
    userName = window.location.pathname.substr(16);
  }
  
  else if(path==="userSearch")
  {
    
    userName=value
  }
  else {
    userName = payload.userName;
  }
  console.log(userName)
  let res = await axios.get(
    `http://localhost:8000/fetchfollowers/${userName}`
  )
  return res.data
}
  catch (err) {
    return false;
  }
};

export const followAndUnFollow=async (value) => {
  try{
  const token = JSON.parse(localStorage.getItem("token"));
  await axios.post(`http://localhost:8000/follow`, {
    token: token,
    requestName: value,
  })
return value}
  catch (err) {
    return false;
  }
};




