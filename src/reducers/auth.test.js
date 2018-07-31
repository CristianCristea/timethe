/* global describe, it, expect */
import authReduceder from './auth';

describe('auth reducer', () => {
  it('should add user id to state', () => {
    const action = {
      type: 'LOGIN',
      uid: 'adfasdfwe324dfas',
    };

    const state = authReduceder({}, action);
    expect(state.uid).toBe(action.uid);
  });

  it('should clear user id from state', () => {
    const action = {
      type: 'LOGOUT',
    };

    const state = authReduceder({ uid: 'logged_in_user_id' }, action);
    expect(state).toEqual({});
  });
});
