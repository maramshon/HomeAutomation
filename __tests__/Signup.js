import 'react-native';
import React from 'react';
import Signup from '../src/routes/Signup';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('Search snapshot test', () => {
  const component = renderer.create(<Signup />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot();
})

