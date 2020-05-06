import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import SideDrawer from "../sidedrawer/sidedrawer";

const Admin = (props) => {

  
    return (
      <div>
        <SideDrawer role={"admin"}></SideDrawer>
      </div>
    );
  
}

export default Admin;
