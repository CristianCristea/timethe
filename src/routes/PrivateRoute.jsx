import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
    <Route
      {...rest}
      component={props => (
        isAuthenticated ? (
          <div>
            <Component {...props} />
          </div>
        ) : (
            <Redirect to={`${process.env.PUBLIC_URL}/`} />
          )
      )}
    />
  );

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.uid,
});

export default connect(mapStateToProps)(PrivateRoute);
