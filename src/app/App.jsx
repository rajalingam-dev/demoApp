/** **************************** Import Packages ****************************** */
import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

/** **************************** Import Pages ****************************** */
import "../scss/style.scss";
import "../assets/css/responsiveness.css";
import "./app.css";

/** **************************** Import Container ****************************** */
const DefaultLayout = React.lazy(() => import("../containers/Layout"));

/** **************************** Import Pages ****************************** */
const Login = React.lazy(() => import("../pages/Login"));
// const AcceptContract = React.lazy(() => import("../views/Onboarding/TemporaryAccessPage/AcceptContract"));

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse" />
  </div>
);

const App = () => {
  const [handle, setHandle] = useState("");
  const changeHandle = (props) => {
    setHandle(props);
  };

  return (
    <>
      <BrowserRouter>
        <React.Suspense fallback={ loading }>
          <Switch>
            <Route
              exact
              path="/"
              name="Login Page"
              render={ (props) => <Login { ...props } /> }
            />
            <Route
              path="/home"
              name="Home"
              render={ (props) => (localStorage.getItem("loggedUser") ? (
                  <DefaultLayout
                    { ...props }
                    changeHandle={ changeHandle }
                    handle={ handle }
                  />
              ) : (
                (window.location.href = "/")
              )) }
            />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
      <ToastContainer limit={ 1 } autoClose={ 3000 } />
    </>
  );
};

export default App;
