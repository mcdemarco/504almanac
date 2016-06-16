import React from 'react';
import range from 'lodash.range';
import {names} from '../constants/Names';
import {modules} from '../constants/Modules';
import Link from './Link';

const World = React.createClass({

  convertToWorldName(w) {
		return w.reduce( (prev, valu, indx) => prev + " " + names[indx][valu], "");
	},

	convertToWorldModules(w) {
		return w.reduce( (prev, valu, indx) => prev + (indx > 0 ? ", " : "") + modules[valu], "");
	},

	typeWorld(w) {
		if (w[0] < 9 && w[1] < 9 && w[2] < 9)
			return "full";
		else if ( (w[0] < 9 && w[1] < 9) || (w[0] < 9 && w[2] > 8)  || (w[1] > 8 && w[2] > 8) )
			return "partial";
		else
			return "weird";
	},

  render() {
		const { world, worldNo } = this.props;
		const worldType = this.typeWorld(world);
		if (history.pushState) {
			history.pushState(null, null, '#' + worldNo);
		} else {
			location.hash = '#' + worldNo;
		}
		return <div className="worldDetails">
			<h1>{"World " + worldNo}</h1>
			<h2>{this.convertToWorldName(world)}</h2>
			<h3>{this.convertToWorldModules(world)}</h3>

			<Link world={world} worldNo={worldNo} worldType={worldType} />
		</div>;
  }
});

export default World;

