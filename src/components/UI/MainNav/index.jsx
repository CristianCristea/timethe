import React from 'react';
import { Link } from 'react-router-dom';
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
                  <Link className="nav-link active" to="/">Projects</Link>
                </NavItem>
                <NavItem className="main-nav-link">
                  <Link className="nav-link" to="/archived-projects">Archive</Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
