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

export const onGetSignUpRequests = async () => {
  try {
    let res = await axios.get("http://localhost:8000/getrequestlist");
    return res.data.names;
  } catch (err) {
    return false;
  }
};
