/* global jest, it, expect */
import React from 'react';
import { shallow } from 'enzyme';
import { MainNav } from './index';

it('should call startLogout on buton click', () => {
  const startLogout = jest.fn();
  const wrapper = shallow(<MainNav startLogout={startLogout} />);
  wrapper.find('button').simulate('click');
  expect(startLogout).toHaveBeenCalled();
});
