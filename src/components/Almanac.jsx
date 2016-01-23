import React from 'react';
import {Motion, spring} from 'react-motion';
import range from 'lodash.range';
import {allColors, contrastColors, icons, modules} from '../constants/Modules';
import {count, width, height, layout} from '../constants/Layout';
import World from './World';

function reinsert(arr, from, to) {
  const _arr = arr.slice(0);
  const val = _arr[from];
  _arr.splice(from, 1);
  _arr.splice(to, 0, val);
  return _arr;
}

function clamp(n, min, max) {
  return Math.max(Math.min(n, max), min);
}

const Almanac = React.createClass({
  getInitialState() {
    return {
      mouse: [0, 0],
      delta: [0, 0], // difference between mouse and circle pos, for dragging
      lastPress: null, // key of the last pressed component
      isPressed: false,
      order: range(count), // index: visual position. value: component key/id
    };
  },

  componentDidMount() {
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
		window.addEventListener('hashchange', this.handleHashChange);
  },

  handleHashChange() {
		const {order} = this.state;
		const world = window.location.hash.substring(1,4);
		let worldClean;
		let hashOrder;
		{/*Don't attempt to reprocess an illegal world name.*/}
		if (world.length == 3 && /[1-9x]{3}/.test(world) && !/([1-9])\1{1,}/.test(world)) {
			worldClean = world.split("").map((curr,indx) => curr == "x" ? indx + 9 : parseInt(curr,10) - 1);
			hashOrder = reinsert(order, order.indexOf(worldClean[0]), 0);
			hashOrder = reinsert(hashOrder, hashOrder.indexOf(worldClean[1]), 1);
			hashOrder = reinsert(hashOrder, hashOrder.indexOf(worldClean[2]), 2);
			
			{/*Don't attempt to reprocess the same hash.*/}
			if (order[0] != hashOrder[0] || order[1] != hashOrder[1] || order[2] != hashOrder[2])
				this.setState({order: hashOrder});
		};
	},

  handleTouchStart(key, pressLocation, e) {
    this.handleMouseDown(key, pressLocation, e.touches[0]);
  },

  handleTouchMove(e) {
    e.preventDefault();
    this.handleMouseMove(e.touches[0]);
  },

  handleMouseMove({pageX, pageY}) {
    const {order, lastPress, isPressed, delta: [dx, dy]} = this.state;
    if (isPressed) {
      const mouse = [pageX - dx, pageY - dy];
      const col = clamp(Math.floor(mouse[0] / width), 0, 2);
      const row = clamp(Math.floor(mouse[1] / height), 0, Math.floor(count / 3));
      const index = row * 3 + col;
      const newOrder = reinsert(order, order.indexOf(lastPress), index);
      this.setState({mouse: mouse, order: newOrder});
    }
  },

  handleMouseDown(key, [pressX, pressY], {pageX, pageY}) {
    this.setState({
      lastPress: key,
      isPressed: true,
      delta: [pageX - pressX, pageY - pressY],
      mouse: [pressX, pressY],
    });
  },

  handleMouseUp() {
    this.setState({isPressed: false, delta: [0, 0]});
  },

  render() {
    const {order, lastPress, isPressed, mouse} = this.state;
    return (
      <div className="almanac">
        {order.map((_, key) => {
          let style;
          let x;
          let y;
          const visualPosition = order.indexOf(key);
          if (key === lastPress && isPressed) {
            [x, y] = mouse;
            style = {
              translateX: x,
              translateY: y,
              scale: spring(1.2, [180, 10]),
              boxShadow: spring((x - (3 * width - 50) / 2) / 15, [180, 10]),
            };
          } else {
            [x, y] = layout[visualPosition];
            style = {
              translateX: spring(x, [120, 17]),
              translateY: spring(y, [120, 17]),
              scale: spring(1, [180, 10]),
              boxShadow: spring((x - (3 * width - 50) / 2) / 15, [180, 10]),
            };
          }
          return (
            <Motion key={key} style={style}>
              {({translateX, translateY, scale, boxShadow}) =>
                <div
                  onMouseDown={this.handleMouseDown.bind(null, key, [x, y])}
                  onTouchStart={this.handleTouchStart.bind(null, key, [x, y])}
                  className="protoPlanet"
									title={modules[key]}
                  style={{
                    backgroundColor: allColors[key],
                    color: contrastColors[key],
                    WebkitTransform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                    transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                    zIndex: key === lastPress ? 99 : visualPosition,
                  boxShadow: `${boxShadow}px 5px 5px rgba(0,0,0,0.5)`,
									borderWidth: visualPosition < 3 ? 3 : 1,
									borderColor: visualPosition < 3 ? 'indigo' : 'black',
                  }}
									>
							 <div className={key < 9 ? "icon" : "noIcon"}>{key < 9 ? key + 1 : "x"}</div>
							 <div><i className={"fa fa-" + icons[key]}></i></div>
							 </div>
              }
            </Motion>
          );
         })}
						<World world={order.slice(0,3)} />
      </div>
    );
  },
});

export default Almanac;
