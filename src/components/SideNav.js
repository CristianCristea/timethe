import React from 'react';
import SideNavLink from './SideNavLink';

export default function SideNav({ links }) {
  let generateID = function() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return (
      '_' +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  };
  return (
    <ul className="side-nav">
      {links.map(link => <SideNavLink key={generateID()} link={link} />)}
    </ul>
  );
}
