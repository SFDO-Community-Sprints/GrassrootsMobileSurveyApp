import React from 'react';
import { render } from '@testing-library/react-native';

import { TextHeading } from '../../src/components';

describe('<TextHeading />', () => {
  it('Rendering', () => {
    const screen = render(<TextHeading>This is a test text</TextHeading>);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
