import axios from "axios";
const jwt = require("jsonwebtoken");

export const setItem = async (obj) => {
  try {
    console.log(obj,"object")
    let res = await axios.post("http://localhost:8000/signup", obj);
   
    return res.data;
  } catch (err) {
    return false;
  }
};
