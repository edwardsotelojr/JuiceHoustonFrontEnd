/* import React, { useState } from "react";
import "./Header.css";
import JuiceHoustonLogo from "../assets/JuiceHouston.png";
import { useHistory } from "react-router";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Login from "./Login";
import { LinkContainer } from "react-router-bootstrap";
const goToPage = (page) => {
  const goToPage = "./" + page;
  return goToPage;
};

/* const Header = (auth) => {
    const history = useHistory();
    const handle = (e, p) => {
        e.preventDefault();
        console.log("p: " + p);
        history.push(goToPage(p));
    };
    console.log(auth.auth)
    

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            isOpened: true
        }
    }

    toggle = () => {
        this.setState({
            isOpened: !this.state.isOpened
        });
    }

    render(){
  return (
    <Navbar
      expand={"sm"}
      className="ms-auto header"
      style={{
        padding: ".3rem 1rem",
        position: "fixed",
        backgroundColor: "white",
      }}
    >
      <Navbar.Brand href="/">
        <img
          src={JuiceHoustonLogo}
          height="39px"
          width="100px"
          className="d-inline-block align-top"
          alt="Tesla Logo"
        ></img>
      </Navbar.Brand>
      <Navbar.Collapse
        onClick={(e) => e.preventDefault()}
        id="basic-navbar-nav"
        style={{ flex: "initial" }}
      >
        <Nav className="container-fluid ms-auto">
          <Nav.Link href="/" className="link">
            Home
          </Nav.Link>
          <Nav.Link href="/AboutUs" className="link">
            About Us
          </Nav.Link>
          <Nav.Link href="/Menu" className="link">
            Menu
          </Nav.Link>
          <LinkContainer to="/Order">
            <Nav.Link href="/Order" className="link">
              Order
            </Nav.Link>
          </LinkContainer>
          <NavDropdown.Toggle onClick={this.toggle} />
          <NavDropdown.Collapse isOpened={this.state.isOpened} navbar>
                            <NavDropdown.Item>
lol                            </NavDropdown.Item>
                    </NavDropdown.Collapse>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
};

export default Header;
 */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Button, Dropdown } from "react-bootstrap";
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
    console.log("toggle");
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    let dropdown;
    let title;
    if (this.props.auth.isAuthenticated) {
      //logged in
      title = 'user'
      dropdown = (
        <div>
            <Dropdown.Header><Link to="/User">{this.props.user.name}</Link></Dropdown.Header>
            <Dropdown.Item><Button onClick={this.props.logout}>Logout</Button></Dropdown.Item>
        </div>
      );
    } else {
      title = 'Sign in'
      dropdown = (
        <div>
              <Login login={this.props.login} />
            <Link
              to="/Signup"
              onClick={() =>
                (document.querySelector(".dropdown-menu.show").style.display =
                  "none")
              }
            >
              signup
            </Link>
        </div>
      );
    }
    const { navCollapsed } = this.state;
    return (
      <div>
        <Navbar color="light" light expand="xs">
          <NavbarBrand href="/">JuicedHouston</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/AboutUs">About Us</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/Menu">Menu</NavLink>
              </NavItem>
              <NavItem>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {title}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {dropdown}
                  </Dropdown.Menu>
                </Dropdown>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
export default Header;
