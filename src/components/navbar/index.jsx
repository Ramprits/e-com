import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { getToken, clearToken, clearCart } from '../../utils';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

class Layout extends React.Component {
  handleLogOut = () => {
    clearToken();
    clearCart();
    this.props.history.push("/")
  }
  render() {
    return getToken() !== null ? <Authenticate handleSignout={this.handleLogOut} /> : <UnAuthenticate />
  }
}
export default withRouter(Layout)

class Authenticate extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="primary" dark expand="md">
          <NavbarBrand href="/">
            <img src="https://firebasestorage.googleapis.com/v0/b/the-venue-1.appspot.com/o/logo.png?alt=media&token=1bffaaea-81ee-457d-8170-b0f0714eb1bf" alt="logo" height="40"></img>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem >
                <NavLink className="nav-link" to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Welcome Ramprit Sahani
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <a>Profile</a>
                  </DropdownItem>
                  <DropdownItem>
                    <a onClick={this.props.handleSignout} className="btn-link">
                      Logout</a>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Change Password
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

class UnAuthenticate extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="primary" dark expand="md">
          <NavbarBrand href="/">
            <img src="https://firebasestorage.googleapis.com/v0/b/the-venue-1.appspot.com/o/logo.png?alt=media&token=1bffaaea-81ee-457d-8170-b0f0714eb1bf" alt="logo" height="40"></img>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem >
                <NavLink className="nav-link" to="/signin/">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/signup/">Signup</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

