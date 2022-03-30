import "../css/Header.css";
import React, { Component } from "react";
import Login from "./Login";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { Dropdown } from "react-bootstrap";
import logo from "../assets/logo.png";
class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      navCollapsed: true,
      showNavbar: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    let dropdown;
    let title;
    if (!this.props.auth.loading) {
      if (this.props.auth.isAuthenticated) {
        //logged in
        title = this.props.auth.user.name;
        dropdown = (
          <>
            <Dropdown.Item
              href="/user"
              onClick={() =>
                document
                  .querySelector(".dropdown-menu.show")
                  .classList.remove("show")
              }
            >
              {this.props.user.name}
            </Dropdown.Item>
            <Dropdown.Item href="/" onClick={this.props.logout}>
              Logout
            </Dropdown.Item>
          </>
        );
      } else {
        title = "Sign in";
        dropdown = <Login login={this.props.login} error={this.props.error} />;
      }
    }
    return (
      <Navbar
        light
        expand="xs"
        fixed="top"
        style={{
          backgroundColor: "#e8ffe8",
          padding: "0.3rem 0.6rem 0.3rem 0.6rem",
          borderBottom: "3px solid #e8f9ff",
          zIndex: "100",
          width: "100vw",
        }}
      >
        <NavbarBrand href="/" style={{ paddingTop: "2px", paddingBottom: 0 }}>
          <img
            src={logo}
            height="45"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/Menu">Menu</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Order">Order</NavLink>
            </NavItem>
            <NavItem style={{ alignSelf: "center" }}>
              <Dropdown style={{ marginRight: "5px" }}>
                <Dropdown.Toggle
                  className="btn-sm"
                  style={{ backgroundColor: "#9bd16e", borderColor: "#fff" }}
                  id="dropdown-basic"
                >
                  {title}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ marginTop: "20px" }}>
                  {dropdown}
                </Dropdown.Menu>
              </Dropdown>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
export default Header;
