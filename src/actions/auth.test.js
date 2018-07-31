/* global describe, it, expect */
import { login, logout } from './auth';

describe('user auth', () => {
  it('should setup user login action', () => {
    const action = login('acvasdfasvasd23x');

    expect(action).toEqual({
      type: 'LOGIN',
      uid: expect.any(String),
    });
  });

  it('should setup user logout action', () => {
    const action = logout();

    expect(action).toEqual({
      type: 'LOGOUT',
    });
  });
});
