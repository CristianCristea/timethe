/* global it, expect */
import React from 'react';
import { shallow } from 'enzyme';
import Header from './index';

it('should render header', () => {
  const wrapper = shallow(<Header title='TIMETHE' subtitle='test' />);
  expect(wrapper).toMatchSnapshot();
});
