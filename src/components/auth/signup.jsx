import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  Row,
  Col
} from "reactstrap";
import { ToastsStore } from "react-toasts";
import { setToken } from "../../utils";
import Strapi from "strapi-sdk-javascript/build/main";
const url = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(url);

class Signup extends React.Component {
  state = {
    email: "",
    username: "",
    password: ""
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { username, email, password } = this.state;
    if (this.isFormValid(this.state)) {
      ToastsStore.error("Please enter required fields");
    }

    try {
      const response = await strapi.register(username, email, password);
      console.log(response);
      setToken(response.jwt);
      this.redirect("/");
    } catch (err) {
      console.error(err);
    }
  };

  redirect = path => this.props.history.push(path);

  isFormValid = ({ username, email, password }) =>
    !username || !email || !password;

  render() {
    return (
      <Row>
        <Col className="col-md-8 col-xs-12  offset-md-2">
          <Card>
            <CardBody>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup row>
                  <Label for="email" sm={2}>
                    Email
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="email"
                      onChange={this.handleChange}
                      name="email"
                      id="email"
                      placeholder="Please enter your email"
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="email" sm={2}>
                    User Name
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      onChange={this.handleChange}
                      name="username"
                      id="username"
                      placeholder="Please enter your username"
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="password" sm={2}>
                    Password
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="password"
                      name="password"
                      onChange={this.handleChange}
                      id="password"
                      placeholder="Please enter password"
                    />
                  </Col>
                </FormGroup>
                <FormGroup check row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Button color="primary" size="sm">
                      Register
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
export default Signup;
