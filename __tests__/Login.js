import 'react-native';
import React from 'react';
import Login from '../src/routes/Login';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('Search snapshot test', () => {
  const component = renderer.create(<Login />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot();
})

