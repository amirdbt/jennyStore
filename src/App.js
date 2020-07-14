import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import Customers from "./components/Stores/Customers";
import Products from "./components/Stores/Products/Products";
import CreateProduct from "./components/Stores/Products/CreateProduct";
import { Switch, Route, withRouter } from "react-router-dom";

const Main = withRouter(({ location }) => {
  return (
    <>
      {location.pathname !== "/signin" && location.pathname !== "/signup" && (
        <>
          <Sidebar />
        </>
      )}
      <Switch>
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/customers" component={Customers} />
        <Route path="/products" component={Products} />
        <Route path="/create" component={CreateProduct} />
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
