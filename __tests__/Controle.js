import 'react-native';
import React from 'react';
import Controle from '../src/routes/Controle';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('Search snapshot test', () => {
  const component = renderer.create(<Controle />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot();
})
