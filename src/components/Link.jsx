import React from 'react';
import range from 'lodash.range';
import {links} from '../constants/2FLinks';
import {ratings} from '../constants/Ratings';
import {tags} from '../constants/Tags';

const Link = React.createClass({

  getRulesLink(wN) {
		{/*You can only get rules for a real world (no x's).*/}
		const text = "Get rules for this world at 504rules";
		return <li><a href={"http://504rules.github.io/#" + wN} title={text}><span className="short">Rules</span> <span className="long">{text}</span></a></li>;
	},

  getRatingsLink(wN,wT) {
		{/*You can link to the ratings site with a real world or partial world but not a weird world (no x's followed by digits).*/}
		const link = "http://504-2f.de/?page_id=" + links[parseInt(wN,10)];
		let pluralize = "this world";
		if (wT != "full")
			pluralize = "these worlds";
		const text = "Rate " + pluralize + " at the official 504 site";
		return <li><a href={link} title={text}><span className="short">Ratings</span> <span className="long">{text}</span></a></li>;
	},
	
  getBggLink(wN,wT) {
		{/*You can get any world from BGG.*/}
		const link = "https://boardgamegeek.com/tag/504%3A"  + wN + "/";
		let pluralize = "this world";
		if (wT != "full")
			pluralize = "these worlds";
		const text = "Search for " + pluralize + " at BoardGameGeek";
		const tagCount = tags[wN] ? tags[wN] : 0;
		return <li><a href={link} title={text}><span className="short">BGG</span> <span className="long">{text}</span> ({tagCount})</a></li>;
	},

  getBggExtra(wN,m,flip) {
		{/*Return a masked world from BGG, if it differs from the actual world.*/}
		let wNew = "xxx";
		let key = m;
		if (m > 3) {
			key += 3;
			m = m - 3;
			wNew = wNew.slice(0,m) + wN.slice(m,m+1) + wNew.slice(m + 1,3);
		} else {
			wNew = wN.slice(0,m) + "x" + wN.slice(m + 1,3);
		}
		const link = "https://boardgamegeek.com/tag/504%3A" + wNew + "/";
		const text = "Search for related worlds " + wNew + " at BoardGameGeek";
		const tagCount = tags[wNew] ? tags[wNew] : 0;
		if (wNew != wN && wNew != "xxx" && tagCount > 0)
			return <a href={link} className="mask" key={key} title={text}>{wNew}</a>;
	},
	
  getBggExtras(wN) {
		{/*Get masked worlds from BGG, too.*/}
		const maskList = range(6).map(m => this.getBggExtra(wN,m));
		return <li>{maskList}</li>;
	},

	getStar(num,rating) {
		let starClass = "fa fa-star-o";
		if (num * 2 <= rating)
			starClass="fa fa-star";
		else if (num * 2 == rating + 1)
			starClass="fa fa-star-half-o";
		return <i className={starClass} key={num}></i>;
	},
	
	getStars(wN,wT) {
		{/*Express the rating with stars.*/}
		let stars = 0;
		if (wT == "full" && ratings[wN]) 
			stars = ratings[wN];
		const starList = range(5).map(n => this.getStar(n + 1,stars)); 
		return <li title={stars == 0 ? "Unrated" : "Rating"}>{starList}</li>;
	},

	render() {
		const { world, worldNo, worldType } = this.props;
		return <ul>
			{this.getStars(worldNo,worldType)}
			{worldType == "weird" ? "" : this.getRatingsLink(worldNo, worldType)}
			{worldType == "full" ? this.getRulesLink(worldNo) : ""}
			{this.getBggLink(worldNo,worldType)}
			{/*worldType != "weird" || (worldType.match(/x/g) || []).length < 2 ? this.getBggExtras(worldNo) : ""*/}
		</ul>;
	}
});

export default Link;
