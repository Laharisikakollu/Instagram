import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import SideDrawer from "../sidedrawer/sidedrawer";

class Admin extends Component {
  state = { collapsed: false, visible: false, placement: "left" };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <div>
        <SideDrawer role={"admin"}></SideDrawer>
      </div>
    );
  }
}

export default Admin;
