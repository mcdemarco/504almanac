import React from 'react';
import range from 'lodash.range';
import {tags} from '../constants/Tags';
import {ratings} from '../constants/Ratings';
import {reinsert, getHashFromOrder} from './Util';

const Random = React.createClass({
	
  bestOf() {
		{/* Find a good world. */}
		const {order} = this.props;
		const newWorldOrder = this.randomizer(order);
		const newWorldHash = getHashFromOrder(newWorldOrder);
		if (!this.isGood(newWorldHash))
			this.bestOf();
		else
			this.switcher(newWorldOrder);
  },

	isGood(hash) {
		{/* Check if the current world is highly rated. */}
		return (ratings.hasOwnProperty(hash) && ratings[hash] >= 7);
	},
	
  explore() {
		{/* Explore a new world. */}
		const {order} = this.props;
		const newWorldOrder = this.randomizer(order);
		const newWorldHash = getHashFromOrder(newWorldOrder);
		if (this.isExplored(newWorldHash))
			this.explore();
		else
			this.switcher(newWorldOrder);
  },

	isExplored(hash) {
		{/* Check if the current world is explored (has tags or votes). */}
		return (tags.hasOwnProperty(hash) || ratings.hasOwnProperty(hash));
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
	
	randomize() {
		{/* Get a randomization and push to state. */}
		const {order} = this.props;
		const newWorldOrder = this.randomizer(order);
		this.switcher(newWorldOrder);
	},

	switcher(newWorldOrder) {	
		this.props.switchWorld(newWorldOrder);
  },

	
  render() {
    return (
			<div className="worldRandomizer">
				<span onClick={this.bestOf} title="Highly-rated worlds"><i className="fa fa-star"></i></span>
				<span onClick={this.randomize} title="Random worlds"><i className="fa fa-random"></i></span>
				<span onClick={this.explore} title="Unexplored worlds"><i className="fa fa-safari"></i></span>
			</div>
    );
  },
});

export default Random;
