import React from 'react';
import range from 'lodash.range';
import {tags} from '../constants/Tags';
import {ratings} from '../constants/Ratings';
import {buttons} from '../constants/Layout';
import {reinsert, getHashFromOrder} from './Util';

const Random = React.createClass({

	getComponent(button) {
    this.getNewWorld(button.name);
	},

	getNewWorld(ofType) {
		{/* Find a world of the specified type. */}
		const {order} = this.props;
		const newWorldOrder = this.randomizer(order);
		const newWorldHash = getHashFromOrder(newWorldOrder);
		if (!this.worldTest(newWorldHash,ofType))
			this.getNewWorld(ofType);
		else
			this.switcher(newWorldOrder);			
	},

	worldTest(hash,ofType) {
		switch(ofType) {
			case "random":
				return true;
			case "bestOf":
				return this.isGood(hash);
			case "worstOf":
				return this.isBad(hash);
			case "tagged":
				return this.isTagged(hash);
			case "unexplored":
				return this.isUnexplored(hash);
			default:
				return true;
		}
	},

	isBad(hash) {
		{/* Check if the current world is poorly rated. */}
		return (ratings.hasOwnProperty(hash) && ratings[hash] < 6 && ratings[hash] > 0);
	},
	
	isGood(hash) {
		{/* Check if the current world is highly rated. */}
		return (ratings.hasOwnProperty(hash) && ratings[hash] >= 7);
	},
	
	isUnexplored(hash) {
		{/* Check if the current world is explored (has tags or votes). */}
		return (!(tags.hasOwnProperty(hash) || ratings.hasOwnProperty(hash)));
	},

	isTagged(hash) {
		{/* Check if the current world has tags. */}
		return tags.hasOwnProperty(hash);
	},

	randomizer(order) {
		{/* Randomize to a real world. */}
		let newWorld;
		let newWorldOrder;
		newWorld = Math.floor(Math.random() * 9);
		newWorldOrder = reinsert(order, order.indexOf(newWorld), 0);
		newWorld = Math.floor(Math.random() * 9);
		newWorldOrder = reinsert(newWorldOrder, newWorldOrder.indexOf(newWorld), 0);
		newWorld = Math.floor(Math.random() * 9);
		newWorldOrder = reinsert(newWorldOrder, newWorldOrder.indexOf(newWorld), 0);
		return newWorldOrder;
  },
	
	switcher(newWorldOrder) {
		{/* Pass new world to parent. */}
		this.props.switchWorld(newWorldOrder);
  },

	
  render() {
    return (
			<div className="worldRandomizer">
				{buttons.map(b => {
           return(
              <span key={b.name} title={b.title} onClick={this.getComponent.bind(this,b)}><i className={b.icon}></i></span>
           )}
         )}
			</div>
    );
  },
});

export default Random;
