import axios from "axios";
const jwt = require("jsonwebtoken");

export const onGetUsers = async () => {
  try {
    let res = await axios.get("http://localhost:8000/getuserlist");
    return res.data.names;
  } catch (err) {
    return false;
  }
};

export const onGetRequests = async () => {
  try {
    let res = await axios.get("http://localhost:8000/getrequestlist");
    return res.data.names;
  } catch (err) {
    return false;
  }
};

export const accept = async (data) => {
  try {
    const payload = JSON.parse(localStorage.getItem("token"));
    let res = await axios.put("http://localhost:8000/acceptrequest", {
      userName: data.userName,
      isaccept: data.value,
      token: JSON.parse(localStorage.getItem("token")),
    });

    return res.data;
  } catch (err) {
    return false;
  }
};

export const decline = async (data) => {
  try {
    let res = await axios.put("http://localhost:8000/declinerequest", {
      userName: data.userName,
      isaccept: data.value,
    });
    return data;
  } catch (err) {
    return false;
  }
};
