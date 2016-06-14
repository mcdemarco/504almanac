var ratings = {};
var average = 6.67;
/*
average = getAverage();
ratings = {average: average};

function getAverage() {
	var raters = 0;
	var total = 0;
	var twoR = 0;
	var bggR = 0;
	var subTotal = 0;
	for (var v in votes) {
		if (votes.hasOwnProperty(v)) {
			var r = votes[v];
			for (var i = 1; i < 11; i++) {
				twoR = 0;
				bggR = 0;
				if (r.twof.hasOwnProperty(i))
					twoR = r.twof[i];
				if (r.bgg.hasOwnProperty(i))
					bggR = r.bgg[i];
				subTotal = Math.max(twoR,bggR);
				raters += subTotal;
				total += subTotal * i;
			}
		}
	}
	return total/raters;
}
*/

function getRating(wN) {
	var r = votes[wN];
	var raters = 0;
	var total = 0;
	var twoR = 0;
	var bggR = 0;
	var subTotal = 0;
	for (var i = 1; i < 11; i++) {
		twoR = 0;
		bggR = 0;
		if (r.twof.hasOwnProperty(i))
			twoR = r.twof[i];
		if (r.bgg.hasOwnProperty(i))
			bggR = r.bgg[i];
		subTotal = Math.max(twoR,bggR);
		raters += subTotal;
		total += subTotal * i;
	}
	//For a more precise rating return Math.floor((total/raters)*10)/10.
	//Here I instead return a whole number from 0--10 for use in a 5-star system,
	//plus I do some flattening for the one-voter case.
	if (raters == 0)
		return 0;
	else if (raters == 1 && total < average - 1)
		return total + 1;
	else if (raters == 1 && total > average + 1)
		return total - 1;
	else
		return Math.round(total/raters);
}

for (var wN in votes) {
	if (votes.hasOwnProperty(wN)) {
		var rating = getRating(wN);
		if (rating)
			ratings[wN] = rating;
	}
}

var url = 'data:text/json;charset=utf8,' + encodeURIComponent(JSON.stringify(ratings));
window.open(url, '_blank');
window.focus();



