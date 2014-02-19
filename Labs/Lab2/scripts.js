$( document ).ready(function() {
	getLocation();
	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(getJsonStuff);
		}
		else{
			alert( "Geolocation is not supported by this browser.");
		}
	}
	function getJsonStuff(position) {
		var callme = 'http://api.openweathermap.org/data/2.5/weather?lat='+position.coords.latitude+'&lon='+position.coords.longitude;	
		$("#loading").bind("ajaxStart", function(){
			$(this).show();
		});	
		$.ajax({
			url: callme,
			dataType: 'jsonp',
			success: function(results){
				var name = results.name;
				var curr = results.weather[0].main;
				var desc = results.weather[0].description;
				var img = "http://openweathermap.org/img/w/"+results.weather[0].icon+".png";
				var hum = results.main.humidity;
				var tempF = convertTemp(results.main.temp).toFixed(2);
				var speed = convertSpeed(results.wind.speed).toFixed(2);
				$( "#city" ).html( name );
				$( "#cond" ).html( curr + "<br/><span id='desc'>("+desc+")</span>" );
				$( "#temp" ).html( tempF );
				$( "#wind" ).html( speed );
				$( "#wind" ).html( speed );
				$( "#hum" ).html( hum );
				$("#weathericon").attr("src",img);
				$("#loading").fadeOut();
			}
		});
	}
	function convertTemp(kelvin) {
		return kelvin * 9/5 - 459.67;
	}
	function convertSpeed(mps) {
		return parseFloat(mps * 2.23694);
	}
});