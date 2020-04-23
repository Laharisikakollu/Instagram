import axios from "axios";
const jwt = require("jsonwebtoken");

export const onSubmit = async (userName, password) => {
  try {
    let res = await axios.post("http://localhost:8000/login", {
      userName: userName,
      password: password,
    });

    return res.data;
  } catch (err) {
    return false;
  }
};
