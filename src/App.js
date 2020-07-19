import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import Products from "./components/Stores/Products/Products";
import CreateProduct from "./components/Stores/Products/CreateProduct";
import Orders from "./components/Stores/Products/Orders/Orders";
import Dashboard from "./components/Dashboard/Dashboard";
import { Switch, Route, withRouter } from "react-router-dom";
import AuthGuard from "./components/Utility/AuthGuard";
import Register from "./components/Users/Signup/Register";
import Login from "./components/Users/Signin/Login";

const Main = withRouter(({ location }) => {
  return (
    <>
      {location.pathname !== "/signin" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/register" &&
        location.pathname !== "/login" && (
          <>
            <Sidebar />
          </>
        )}
      <Switch>
        <AuthGuard exact path="/" component={Dashboard} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />

        <AuthGuard path="/products" component={Products} />
        <AuthGuard path="/create" component={CreateProduct} />
        <AuthGuard path="/orders" component={Orders} />
      </Switch>
    </>
  );
});

function App() {
  return (
    <div>
      <Main />
    </div>
  );
}

export default App;
