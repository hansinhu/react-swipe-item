import React from 'react';
import { render/*, mount*/ } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import SwipeItem from '../src';

describe('DatePicker', () => {
  it('renders correctly', () => {
    const btnList = [
      {
        text: 'cancel',
        style: {},
        onClick: () => {},
      },
    ]
    const wrapper = render(
      <SwipeItem btnList={btnList}>
        <div style={{ lineHeight: '50px' }}>1</div>
      </SwipeItem>
    );
    expect(renderToJson(wrapper)).toMatchSnapshot();
  });
});
