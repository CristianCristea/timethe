import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from 'reactstrap';
import './MainNav.css';

export default class MainNav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      <div className="MainNav">
        <Navbar dark expand="md" className="mb-5">
          <Container>
            <NavbarBrand href="/">T</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav navbar className="pl-3 text-center">
                <NavItem className="main-nav-link">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/"
                    exact
                  >
                    Projects
                  </NavLink>
                </NavItem>
                <NavItem className="main-nav-link">
                  <NavLink className="nav-link" activeClassName="active" to="/archived-projects">Archive</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
