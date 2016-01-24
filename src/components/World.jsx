import React from 'react';
import {height, count} from '../constants/Layout';
import {names} from '../constants/Names';
import {links} from '../constants/2FLinks';

const World = React.createClass({

  convertToWorldName(w) {
		return w.reduce( (prev, valu, indx) => prev + " " + names[indx][valu], "");
	},
	
  getBGGLink(wN) {
		{/*You can search for any tag.*/}
		const link = "https://boardgamegeek.com/tag/504%3A" + wN + "/";
		return <li><a href={link}>Search for world {wN} at BoardGameGeek</a></li>;
	},
  getRulesLink(w,wN) {
		{/*You can only get rules for a real world (no x's).*/}
		const link = "http://504rules.github.io/#" + wN;
		if (w[0] < 9 && w[1] < 9 && w[2] < 9)
			return <li><a href={link}>Get rules for world {wN} at 504rules</a></li>;
	},
  getRatingsLink(w,wN) {
		{/*You can link to the ratings site with a real world or partial world but not a weird world (no x's followed by digits).*/}
		const link = "http://504-2f.de/?page_id=" + links[parseInt(wN,10)];
		if (w[0] < 9 && w[1] < 9 && w[2] < 9)
			return <li><a href={link}>Rate world {wN} at the official 504 site</a></li>;
		else if ( (w[0] < 9 && w[1] < 9) || (w[0] < 9 && w[2] > 8)  || (w[1] > 8 && w[2] > 8) )
			return <li><a href={link}>Look up world {wN} at the official 504 site</a></li>;
	},
	
  render () {
		const { world, worldNo } = this.props;
		if (history.pushState) {
			history.pushState(null, null, '#' + worldNo);
		} else {
			location.hash = '#' + worldNo;
		}
		{/* was previously on the left with style marginLeft: width * 3 + 20 */}
		return <div className="worldDetails" style={{marginTop: height * count/3 + 20}}>
			<h1>{"World " + worldNo}</h1>
			<h2>{this.convertToWorldName(world)}</h2>
			<ul>
				{this.getRatingsLink(world, worldNo)}
				{this.getRulesLink(world, worldNo)}
				{this.getBGGLink(worldNo)}
			</ul>
		</div>;
  }
});

export default World;

