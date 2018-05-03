import React from 'react';
import PropTypes from 'prop-types';

export default function Header({ title }) {
  return (
    <header>
      <h2>{title}</h2>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired
};
