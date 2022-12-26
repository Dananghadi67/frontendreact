//import react
import React from "react";

//import react router dom
import { Switch, Route } from "react-router-dom";

//import component Register
import Register from "./pages/Register";

//import component Login
import Login from "./pages/Login";

//import component Register
import Dashboard from "./pages/Dashboard";
import DashboardUser from "./pages/DashboardUser";
import Create from "./pages/Create";
import Edit from "./pages/Edit";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/admin" component={Dashboard} />
        <Route exact path="/admin/create" component={Create} />
        <Route exact path="/admin/edit" component={Edit} />
        <Route exact path="/user" component={DashboardUser} />
      </Switch>
    </div>
  );
}

export default App;
