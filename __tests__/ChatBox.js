import 'react-native';
import React from 'react';
import ChatBox from '../src/routes/ChatBox';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('Search snapshot test', () => {
  const component = renderer.create(<ChatBox />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot();
})


