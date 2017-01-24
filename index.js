var c="";
var f="";
var metric="true";
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
  positionAvailable(position.coords.latitude, position.coords.longitude);
});
} else {
	positionError();
};
function positionError(){
	$("#no-location").css("display", "block");
};
function positionAvailable(latitude,longtitude){
	
	var link = "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longtitude+"&units=metric&APPID=3a9c3bab1f047c17a809f03c5293f912";
	$("#api-not-work").css("display", "block");
	$.getJSON(link, function(json){
		jsonSuccess(json);
	});
};
function jsonSuccess(json){
	$("#api-not-work").css("display", "none");
	console.log(json);
	var html="";
	var weather=json.weather[0].main+", "+json.weather[0].description;
	c=json.main.temp;
	f=convertToF(c);
	html+="<h2>"+json.name+", "+json.sys.country+"</h2>"+"<h3>"+json.weather[0].main+", "+json.weather[0].description+"</h3>"+'<h3 class="pointer blue" id="degrees" onclick="tempSwitch()">'+c+" &degC</h3>"+"<img class='div-center imgsize' src='http://openweathermap.org/img/w/"+json.weather[0].icon+".png' alt='"+weather+"'>";
	$("#weather").html(html);
};
function convertToF(c) {  
  return 9*c/5+32;
};
function tempSwitch(){
	if(metric){
		$("#degrees").html(f+" &degF");
		metric=false;
	}
	else{
		$("#degrees").html(c+" &degC");
		metric=true;
	}
};