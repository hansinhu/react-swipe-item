# rmc-swipe-item
---

React Mobile Carousel Component (web and react-native)


![react](https://img.shields.io/badge/react-%3E%3D_16.0.0-green.svg)
[![node version][node-image]][node-url]
[![npm download][download-img]][download-url]

[npm-url]: http://npmjs.org/package/carousel
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-img]: https://img.shields.io/npm/dm/rmc-swipe-item.svg?style=flat-square
[download-url]: https://npmjs.org/package/rmc-swipe-item

## Screenshots

<img src="https://github.com/hansinhu/react-swipe-item/blob/master/assets/img/demoimg.png?raw=true" width="288"/>

## Usage
```
npm install rmc-swipe-item
```
```
import SwipeItem from 'rmc-swipe-item';


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

<SwipeItem btnList={ btnList }>
  <div style={{ lineHeight: '30px', paddingLeft: '40px', border: '1px solid #eee' }}>
    <div>
      <a target='_blank' href='http://www.baidu.com' rel="noopener noreferrer">Hansin Test</a>  
    </div>
    <a target='_blank' href='http://www.baidu.com' rel="noopener noreferrer">---Test</a>
  </div>
</SwipeItem>

```

[see example](https://github.com/hansinhu/react-swipe-item/blob/master/examples/demo.tsx)


## Development

```
npm i
npm start
```

## Example

http://localhost:8000/examples/

## install

[![npm download][download-img]][download-url]


## API

### Carousel props

| name     | description    | type     | default      |
|----------|----------------|----------|--------------|
|dots | show dots or not | Boolean | true |
|autoplay | autoplay or not | Boolean | true |
|edgeEasing | transition type | String | 'linear' |
|speed | transition speed | Number | 500 |
|interVal | carousel interVal | Number | 5000 |


## Test Case

```
npm test
npm run chrome-test
```

## Coverage

```
npm run coverage
```

open coverage/ dir

## License

rmc-swipe-item is released under the MIT license.
