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
import "./Header.css";
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
import logo from '../assets/logo.png'
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
    //console.log("user ", this.state.user.user)
    if (this.props.auth.isAuthenticated) {
      //logged in
      title = this.props.auth.user.user.name;
      dropdown = (
        <div>
          <Dropdown.Item>
            <Link
              to="/user"
              onClick={() =>
                document
                  .querySelector(".dropdown-menu.show")
                  .classList.remove("show")
              }
            >
              {this.props.auth.user.user.name}
                    </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link onClick={this.props.logout}>Logout</Link>
          </Dropdown.Item>
        </div>
      );
    } else {
      title = "Sign in";
      dropdown = <Login login={this.props.login} error={this.props.error} />;
    }
    const { navCollapsed } = this.state;
    return (
      <Navbar  light expand="xs" fixed='top'  style={{backgroundColor: "#e8ffe8", padding: "0.3rem 0.6rem 0.3rem 0.6rem",
      borderBottom: "3px solid #e8f9ff", zIndex: "100"}}>
          <NavbarBrand href="/" style={{paddingTop: '2px', paddingBottom: 0}}>
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
            <NavItem style={{alignSelf: 'center'}}>
              <Dropdown style={{marginRight: "5px"}}>
                <Dropdown.Toggle className="btn-sm"  style={{backgroundColor: "#9bd16e", borderColor: "#fff"}} id="dropdown-basic">
                  {title}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{marginTop: '20px'}}>{dropdown}</Dropdown.Menu>
              </Dropdown>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
export default Header;
