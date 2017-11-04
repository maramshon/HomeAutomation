import 'react-native';
import React from 'react';
import Profile from '../src/routes/Profile';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('Search snapshot test', () => {
  const component = renderer.create(<Profile />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot();
})

