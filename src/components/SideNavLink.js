import React from 'react';
import PropTypes from 'prop-types';

export default function SideNavLink({ link }) {
  return <li className="nav-link">{link}</li>;
}

SideNavLink.propTypes = {
  link: PropTypes.string.isRequired
};
