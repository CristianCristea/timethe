import React from 'react';
import SideNav from './SideNav';
import PropTypes from 'prop-types';

export default function Sidebar({ links }) {
  return (
    <aside>
      <h1>TIMETHE</h1>
      <SideNav links={links} />
    </aside>
  );
}

Sidebar.propTypes = {
  links: PropTypes.array.isRequired
};
