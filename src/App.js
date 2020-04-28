import React from "react";
import "./App.css";
import Signup from "./containers/Signup/signup";
import Login from "./containers/login/login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import userList from "./containers/admin/userList";
import { Provider } from "react-redux";
import UserRequest from "./components/admin/userRequest";
import { createStore } from "redux";
import reducer from "./reducers/index";
import SideDrawer from "./containers/sidedrawer/sidedrawer";

const store = createStore(reducer);
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Signup}></Route>
            <Route path="/login" exact component={Login}></Route>

            <Route component={SideDrawer}></Route>

            <Route path="/admin/userList" exact component={userList}></Route>
            <Route
              path="/admin/userRequest"
              exact
              component={UserRequest}
            ></Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
