/* global jest, it, expect */
import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from './index';

it('should correctly display the login page', () => {
  const wrapper = shallow(<LoginPage startLogin={() => { }} />);
  expect(wrapper).toMatchSnapshot();
});

it('should call startLogout on buton click', () => {
  const startLogin = jest.fn();
  const wrapper = shallow(<LoginPage startLogin={startLogin} />);
  wrapper.find('button').simulate('click');
  expect(startLogin).toHaveBeenCalled();
});