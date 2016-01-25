import React from 'react';
import {height, count} from '../constants/Layout';
import {names} from '../constants/Names';
import {links} from '../constants/2FLinks';

const LinkList = React.createClass({

  getRulesLink(wN) {
		{/*You can only get rules for a real world (no x's).*/}
		return <li><a href={"http://504rules.github.io/#" + wN}>Get rules for world {wN} at 504rules</a></li>;
	},

  getRatingsLink(w,wN) {
		{/*You can link to the ratings site with a real world or partial world but not a weird world (no x's followed by digits).*/}
		const link = "http://504-2f.de/?page_id=" + links[parseInt(wN,10)];
		return <li><a href={link}>Rate world {wN} at the official 504 site</a></li>;
	},
	
	render() {
		const { world, worldNo, worldType } = this.props;
		return <ul>
			{worldType == "weird" ? "" : this.getRatingsLink(world, worldNo)}
			{worldType == "full" ? this.getRulesLink(worldNo) : ""}
			<li><a href={"https://boardgamegeek.com/tag/504%3A"  + worldNo + "/"}>Search for world {worldNo} at BoardGameGeek</a></li>
		</ul>;
	}
});

const World = React.createClass({

  convertToWorldName(w) {
		return w.reduce( (prev, valu, indx) => prev + " " + names[indx][valu], "");
	},

	typeWorld(w) {
		if (w[0] < 9 && w[1] < 9 && w[2] < 9)
			return "full";
		else if ( (w[0] < 9 && w[1] < 9) || (w[0] < 9 && w[2] > 8)  || (w[1] > 8 && w[2] > 8) )
			return "partial";
		else
			return "weird";
	},
	
  render () {
		const { world, worldNo } = this.props;
		const worldType = this.typeWorld(world);
		if (history.pushState) {
			history.pushState(null, null, '#' + worldNo);
		} else {
			location.hash = '#' + worldNo;
		}
		{/* was previously on the left with style marginLeft: width * 3 + 20 */}
		return <div className="worldDetails" style={{marginTop: height * count/3 + 20}}>
			<h1>{"World " + worldNo}</h1>
			<h2>{this.convertToWorldName(world)}</h2>
			<LinkList world={world} worldNo={worldNo} worldType={worldType} />
		</div>;
  }
});

export default World;

