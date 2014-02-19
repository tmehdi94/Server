// initialize some variables
var indTweet = 0;
var indHash = 0;
var tweets = new Array();
var hash = new Array();
var realHash = new Array();
var profile = new Array();

$( document ).ready(function() {

	$.getJSON('tweets.json', function(data) {
		
		// read in the JSON file and begin parsing
		for(var i = 0; i < data.length; i++) {
			tweets[i] = data[i].text;
			hash[i] = data[i].entities.hashtags;
			
			// a tweet can contian multiple hashtags, so we iterate through
			// and push all hashtags into realHash
			for (var j = 0; j < hash[i].length; j++) {
				realHash.push(hash[i][j].text);
			}
			
			// this was supposed to get the profile image of the user
			// but many images were dead, so was not used
			profile[i] = data[i].user.profile_image_url;		
		}
		
		// get together the first five tweets and hashtags
		var i = 4;
		while (i >= 0) {

			$("<li>"+tweets[indTweet]+"</li>").appendTo("#tweets");
			$("<li>#"+realHash[indHash]+"</li>").appendTo("#hashs");
			indTweet++;
			indHash++;
			i--;
		}
		// call whoathere every 3 seconds
		setInterval(whoathere, 3000);
	});
	
	function whoathere() {
		// get rid of the last li element from hashtags and tweets
		$("#hashs li:last").remove();
		$("#tweets li:last").remove();
		
		// fade in the new tweet and hashtag
		$("#tweets").prepend("<li>"+tweets[indTweet]+"</li>").hide().fadeIn();
		$("#hashs").prepend("<li>#"+realHash[indHash]+"</li>").hide().fadeIn();
		
		// increment indices and check if out of bounds, if so, reset to 0
		indTweet++;
		indHash++;
		if (indTweet >= tweets.length) { indTweet = 0; }
		if (indHash >= realHash.length) {indHash = 0; }
	} 	
});