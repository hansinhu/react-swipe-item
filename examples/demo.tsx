/* eslint no-console:0 */

import 'rmc-picker/assets/index.css';
import 'rmc-swipe-item/assets/index.less';
import SwipeItem from '../src/index';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

class Demo extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {};
  }

  editClick = () => {
    console.log('editClick=>')
  }

  render() {
    const btnList = [
      {
        text: 'edit',
        style: {
          backgroundColor: 'red',
        },
        onClick: this.editClick,
      },
      {
        text: 'cancel',
        style: {},
        onClick: () => {},
      },
    ]
    return (<div style={{ margin: '10px 0' }}>
      <h2>Carousel</h2>
      <div>
        <SwipeItem btnList={ btnList }>
          <div style={{ lineHeight: '30px', paddingLeft: '40px', border: '1px solid #eee' }}>
            <div>
              <a target='_blank' href='http://www.baidu.com' rel="noopener noreferrer">Hansin Test Hansin Test Hansin Test</a>  
            </div>
            <a target='_blank' href='http://www.baidu.com' rel="noopener noreferrer">---Test</a>
          </div>
        </SwipeItem>
      </div>
    </div>);
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
