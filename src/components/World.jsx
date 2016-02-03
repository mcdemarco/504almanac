import React from 'react';
import {height, count} from '../constants/Layout';
import {names} from '../constants/Names';
import {links} from '../constants/2FLinks';
import {modules} from '../constants/Modules';

const LinkList = React.createClass({

  getRulesLink(wN) {
		{/*You can only get rules for a real world (no x's).*/}
		const text = "Get rules for this world at 504rules";
		return <li><a href={"http://504rules.github.io/#" + wN} title={text}> <span className="long">{text}</span><span className="short">Rules</span></a></li>;
	},

  getRatingsLink(w,wN) {
		{/*You can link to the ratings site with a real world or partial world but not a weird world (no x's followed by digits).*/}
		const link = "http://504-2f.de/?page_id=" + links[parseInt(wN,10)];
		const text = "Rate this world at the official 504 site";
		return <li><a href={link} title={text}><span className="long">{text}</span> <span className="short">Ratings</span></a></li>;
	},
	
	render() {
		const { world, worldNo, worldType } = this.props;
		const bggText = "Search for this world at BoardGameGeek";
		return <ul>
			{worldType == "weird" ? "" : this.getRatingsLink(world, worldNo)}
			{worldType == "full" ? this.getRulesLink(worldNo) : ""}
			<li><a href={"https://boardgamegeek.com/tag/504%3A"  + worldNo + "/"} title={bggText}><span className="long">{bggText}</span> <span className="short">BGG</span></a></li>
		</ul>;
	}
});

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
	
  render () {
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
			<LinkList world={world} worldNo={worldNo} worldType={worldType} />
		</div>;
  }
});

export default World;

