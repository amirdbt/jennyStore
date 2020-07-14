import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
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
