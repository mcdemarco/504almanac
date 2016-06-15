import React from 'react';
import {Motion, spring} from 'react-motion';
import range from 'lodash.range';
import {allColors, contrastColors, icons, modules} from '../constants/Modules';
import {count, width, height, layout} from '../constants/Layout';
import {tags} from '../constants/Tags';
import {ratings} from '../constants/Ratings';
import {reinsert, getHashFromOrder} from './Util';
import Random from './Random';
import World from './World';

const Almanac = React.createClass({
  getInitialState() {
		const initOrder = range(count); // index: visual position. value: component key/id
		const initHash = this.validWorld(window.location.hash.substring(1,4));
		const hashOrder = this.getOrderFromHash(initOrder,initHash);
    return {
      mouse: [0, 0],
      delta: [0, 0], // difference between mouse and circle pos, for dragging
      lastPress: null, // key of the last pressed component
      isPressed: false,
      order: hashOrder,
			hash: initHash,
			dialPosition: 0,
    };
  },

  componentDidMount() {
		{/*
		window.addEventListener('touchmove', this.handleTouchMove);
		window.addEventListener('touchend', this.handleMouseUp);
		window.addEventListener('mousemove', this.handleMouseMove);
		window.addEventListener('mouseup', this.handleMouseUp);
				*/}
		window.addEventListener('keydown', this.handleKeyDown);
		window.addEventListener('hashchange', this.handleHashChange);
  },

	validWorld(world) {
		{/*Don't attempt to process an illegal world name:
				require 3 digits from 1-9 or x's;
				require no adjacent repeated digits;
				require the first and last digit differ or be x's.
			*/}
		if (/[1-9x]{3}/.test(world) && !/([1-9])\1{1,}/.test(world) && (world[0] != world[2] || world[0] == "x"))
					return world;
		else
					return "123";
	},

	getOrderFromHash(order, world) {
		const worldClean = world.split("").map((curr,indx) => curr == "x" ? indx + 9 : parseInt(curr,10) - 1);
		let hashOrder;
		hashOrder = reinsert(order, order.indexOf(worldClean[0]), 0);
		hashOrder = reinsert(hashOrder, hashOrder.indexOf(worldClean[1]), 1);
		hashOrder = reinsert(hashOrder, hashOrder.indexOf(worldClean[2]), 2);
		return hashOrder;
	},

	clamp(n, min, max) {
		return Math.max(Math.min(n, max), min);
	},
	
  handleHashChange() {
		const {order} = this.state;
		const updatedHash = this.validWorld(window.location.hash.substring(1,4));
		const updatedOrder = this.getOrderFromHash(order, updatedHash);
		this.setState({order: updatedOrder, hash: updatedHash});
	},
	
  handleKeyDown(e) {
		const {dialPosition} = this.state; 
		const keyco = e.keyCode;
		let number;
		if (keyco == 82) {
			this.randomize();
			return;
		}	else if (keyco > 48 && keyco < 58) {
			number = keyco - 49;
		} else if (keyco == 88) {
			number = 9 + dialPosition;
		} else {
			return;
		}
		this.dial(number);
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
      const col = this.clamp(Math.floor(mouse[0] / width), 0, 2);
      const row = this.clamp(Math.floor(mouse[1] / height), 0, Math.floor(count / 3));
      const index = row * 3 + col;
      const newOrder = reinsert(order, order.indexOf(lastPress), index);
			const newHash = getHashFromOrder(newOrder);
      this.setState({mouse: mouse, order: newOrder, hash: newHash});
    }
  },

  handleMouseDown(key, [pressX, pressY], {pageX, pageY}) {
		this.dial(key);
		{/*
    this.setState({
      lastPress: key,
      isPressed: true,
      delta: [pageX - pressX, pageY - pressY],
      mouse: [pressX, pressY],
    });
			*/}
  },

  handleMouseUp() {
    this.setState({isPressed: false, delta: [0, 0]});
  },

	dial(number) {
		const {order, dialPosition} = this.state;
		const newOrder = reinsert(order, order.indexOf(number), dialPosition);
		const newHash = getHashFromOrder(newOrder);
		const newDial = (dialPosition + 1) % 3;
		this.setState({order: newOrder, hash: newHash, dialPosition: newDial});
	},

	switchWorld(newWorldOrder) {
		{/* Help push to state from the Random class. */}
		const newWorldHash = getHashFromOrder(newWorldOrder);
    this.setState({order: newWorldOrder, hash: newWorldHash});
  },
	
  render() {
    const {order, lastPress, isPressed, mouse, hash} = this.state;
    return (
			<div className="worldWrapper">
      <div className="worldDial">
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
			</div>
			<Random order={order} worldNo={hash} switchWorld={this.switchWorld} />
			<World world={order.slice(0,3)} worldNo={hash} key={hash} />
			</div>
    );
  },
});

export default Almanac;
