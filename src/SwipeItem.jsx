/**
 * 滑动操作：编辑 / 删除
 * btnList: 按钮数量 1-3 个，接收text, style, onClick三个参数
 * 例如:
 * btnList: [
      {
        text: 'edit',
        style: {
          backgroundColor: 'red',
        },
        onClick: () => {},
      },
    ]
    <SwipeItem btnList={ btnList }>
      <div style={{ lineHeight: '60px', paddingLeft: '40px' }}>
        <a target='_blank' href='http://www.baidu.com' rel="noopener noreferrer">hsshshs hsshshs hsshshs</a>
      </div>
    </SwipeItem>
 */

import React from 'react'
import PropTypes from 'prop-types'

import 'rmc-swipe-item/assets/index.less'

class SwipeItem extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    btnList: PropTypes.array.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
  }

  static defaultProps = {
    style: {},
    className: '',
  }

  constructor (props) {
    super(props)
    this.state = {
      dragging: false,
      swiped: false,
      moveLeft: 0,
      contentStyle: {},
    }
    this.touchObject = {}
    this.clickDisabled = false
  }

  handleSwiping = (left) => {
    if (this.state.swiped) {
      let contentStyle = {
        transition: 'all 0s',
        'WebkitTransition': 'all 0s',
        transform: `translate3d(${left}px, 0px, 0px)`,
        'WebkitTransform': `translate3d(${left}px, 0px, 0px)`,
      }
      this.setState({
        contentStyle,
      })
    } else {
      let contentStyle = { left: left + 'px', transition: 'all 0s' }
      this.setState({
        contentStyle,
      })
    }
  }

  // 拖动后移动效果
  handleSwipe = () => {
    let left = this.state.moveLeft
    let process = Math.abs(left)
    if (process > 10 && left < 0) { // 展开
      this.setState({
        swiped: true,
        contentStyle: {},
      })
    } else { // 关闭
      this.setState({
        swiped: false,
        contentStyle: {},
      })
    }
    setTimeout(() => {
      this.clickDisabled = false
    }, 0);
    this.touchObject = {}
    this.setState({
      dragging: false,
    })
  }

  // 阻止默认事件
  handleClick = (event) => {
    if (this.clickDisabled === true) {
      event.preventDefault();
      event.stopPropagation();

      if (event.nativeEvent) {
        event.nativeEvent.stopPropagation();
      }
    }
  }

  // 移动端touch相关操作
  getTouchEvents = () => {
    return {
      onTouchStart: e => {
        this.touchObject = {
          startX: e.touches[0].pageX,
          startY: e.touches[0].pageY,
        }
      },
      onTouchMove: e => {
        e.preventDefault();
        const length = Math.round(
          Math.sqrt(
            Math.pow(e.touches[0].pageX - this.touchObject.startX, 2)
          )
        )
        // 移动距离 %
        if (length >= 2) this.clickDisabled = true

        this.touchObject = {
          startX: this.touchObject.startX,
          startY: this.touchObject.startY,
          endX: e.touches[0].pageX,
          endY: e.touches[0].pageY,
          length,
        };
        let moveLeft = this.touchObject.endX - this.touchObject.startX
        this.setState({
          moveLeft,
        })
        this.handleSwiping(moveLeft)
      },
      onTouchEnd: _ => {
        this.handleSwipe();
      },
      onTouchCancel: _ => {
        this.handleSwipe();
      },
    };
  }

  // web Mouse相关操作
  getMouseEvents = () => {
    return {
      onMouseDown: e => {
        if (e.preventDefault) {
          e.preventDefault();
        }

        this.touchObject = {
          startX: e.clientX,
          startY: e.clientY,
        };

        this.setState({
          dragging: true,
        });
      },
      onMouseMove: e => {
        if (!this.state.dragging) return

        const length = Math.round(
          Math.sqrt(Math.pow(e.clientX - this.touchObject.startX, 2))
        )
        let process = length / this.state.frameWidth * 100
        if (process >= 5) this.clickDisabled = true

        this.touchObject = {
          startX: this.touchObject.startX,
          startY: this.touchObject.startY,
          endX: e.clientX,
          endY: e.clientY,
          length,
        };

        let moveLeft = this.touchObject.endX - this.touchObject.startX
        this.setState({
          moveLeft,
        })
        this.handleSwiping(moveLeft)
      },
      onMouseUp: e => {
        if (!this.state.dragging) return
        this.handleSwipe(e);
      },
      onMouseLeave: e => {
        if (!this.state.dragging) return
        this.handleSwipe(e);
      },
    }
  }

  render () {
    const { children, btnList = [], style, className } = this.props
    const { contentStyle, swiped } = this.state
    const touchEvents = this.getTouchEvents()
    const mouseEvents = this.getMouseEvents()
    const swipedClassName = 'is_swiped_' + btnList.length
    return <div style={style} className={`rmc_swipe ${className}`}>
      <div className='rmc_swipe_actions'>
        {
          btnList.map((item, idx) => {
            return <div onClick={item.onClick} key={idx} style={item.style || {}} className='rmc_swipe_btn'>{item.text}</div>
          })
        }
      </div>
      <div
        {...touchEvents}
        {...mouseEvents}
        onClickCapture={this.handleClick}
        style={contentStyle}
        className={`rmc_swipe_content ${swiped ? swipedClassName : ''}` }>{ children }</div>
    </div>
  }
}
export default SwipeItem
