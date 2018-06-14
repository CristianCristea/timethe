import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div>
    <h2 className="display-3">
      The page you are looking does not exist or has been moved.
    </h2>
    <Link to="/" className="btn btn-secondary">
      Back to dashboard
    </Link>
  </div>
);

export default NotFound;
