import React from "react";
import { Container } from "reactstrap";
import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "../components/navbar";
import Home from "./home";
import Checkout from "../components/checkout";
import ProductDetail from "../components/productDetail";
import Signin from "../components/auth/signin";
import Signup from "../components/auth/signup";
import { getToken } from "../utils";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      getToken() !== null ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const App = () => {
  return (
    <div>
      <Layout />
      <Container className="mt-3">
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <PrivateRoute path="/checkout" component={Checkout} />
          <Route exact path="/" component={Home} />
          <Route path="/:id" component={ProductDetail} />
        </Switch>
      </Container>
    </div>
  );
};
export default App;
