import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from 'reactstrap';
import { connect } from 'react-redux';
import { startLogout } from '../../../actions/auth';
import './MainNav.css';

export class MainNav extends React.Component {
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
    const { startLogout: logout } = this.props;

    return (
      <div className="MainNav">
        <Navbar dark expand="md" className="mb-5">
          <Container>
            <NavbarBrand href="/dashboard">T</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav navbar className="pl-3 text-center">
                <NavItem>
                  <NavLink
                    activeClassName="active"
                    className="nav-link"
                    to="/dashboard"
                    exact
                  >
                    Projects
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink activeClassName="active" className="nav-link" to="/archive">Archive</NavLink>
                </NavItem>
              </Nav>
              <button
                className="nav__button nav-link ml-auto nav-link"
                onClick={logout}
              >
                Logout
              </button>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout()),
});

export default connect(undefined, mapDispatchToProps)(MainNav);


MainNav.propTypes = {
  startLogout: PropTypes.func.isRequired,
};
