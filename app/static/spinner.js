
$(document).ready(function() {

// What step of the cooking process are we at?
var step = 0;

var cover = "https://cdn.dribbble.com/users/948184/screenshots/11991534/media/bb0c9bcc70dccbfd4b5dd7595f707dad.gif"
//var cover = "https://cdn.shopify.com/s/files/1/0723/6423/t/27/assets/mocha.gif?v=7428839628543292966"



var grounds = "https://www.one-copenhagen.com/wp-content/uploads/2019/07/1-1-1024x678.jpg";
var extraction = "https://cdn.shopify.com/s/files/1/1200/1578/files/blog_Under-Ideal-Over-copy-1024x529.jpg?2171014596988438291";
var stove = "https://media.istockphoto.com/vectors/gas-camping-stove-color-icon-camping-outdoor-travel-equipment-vector-id1312268285?k=20&m=1312268285&s=612x612&w=0&h=97x0mz80FV-TeEkQ_UlCgLXOk-KmTtWJTbJbvKZudOI="
	
	
var margin = {top: 20, bottom: 20, left: 30, right: 30},
height=(window.innerHeight/2)-margin.top-margin.bottom,
width=(window.innerWidth/2)-margin.left-margin.right;


// Temp range
window.MAX_TEMP = 250;
window.MIN_TEMP = 210;


// Cooking Status
window.cStatus = "";

// Current cooking status
window.cStatus = "Temp: ";

// Current cooking temp
window.currTemp = 0;

// Cooking time in seconds
var cTime = 3;

// Timer, counter for data
var counter = 0;

// Container for each second of cooking time
var data = [];

// Temperature from temperature sensor

// General purpose code for filling in pie
// for(var i=0; i<cTime; i++) {
//     // Push a value [0,1] for color interpolation
//     data.push({
//        length : 1/cTime,
//        color: i/cTime
//     });
// }
var cMax = Math.PI*2;


var arc = d3.arc()
  .innerRadius(80)
  .outerRadius(100)
  .cornerRadius(0)
  .startAngle(d => ((counter-1)/cTime)*cMax)
  .endAngle(d => (((counter)/cTime)*cMax));

var pie = d3.pie()
  .sort(null)
  .value(function(d) {
    return d.length;
  });

// Data for presentation
var ttl = d3.select("#ttl");

var subttl = d3.select("#subttl");

var info = d3.select("#pChart")
	.append("div")
	.attr("id", "info")
	.attr("class", "position-absolute");

var activeImg = info.append("img")
	.attr("class", "d-flex mx-auto w-75")
	.attr("src", cover);


// Pie chart for timer
var svg = d3.select("#pChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "pie")
    .attr("opacity", 1)
    .append("g")
    .attr("transform", "translate(" + (width/2) + "," + (height/2) + ")");


var tempTxt = svg.append("text")
.attr("font-weight", "bold")
.attr("id", "tmp")
.attr("dx", -(margin.left+margin.right-(Math.PI)))
.text(cStatus);


var timeTxt = svg.append("text")
.attr("font-weight", "bold")
.attr("id", "time")
.attr("dx", -Math.PI)
.attr("dy", 20)
.text("Time: " + counter);

function arcTween(a) {
  var i = () => d3.interpolate(this._current, a);
  this._current = i(0);
  return function(t) {
  return arc(i(t));
  };
}

svg.selectAll(".arc")
  .data(pie(data))
  .enter()
  .append("path")
  .attr("class", "arc")
  .style("fill", d => d3.interpolateRdBu(1-d.data.color))
  .attr("d", (d,idx) => arc(idx))
  .each(d => this._current = d.length);


// svg.selectAll("path")
// .data(pie(data))
// .transition()
// .attrTween("d", arcTween);

d3.select("#stBtn")
.on("click", () => {
 
	if(step == 0) {
	stepOne();
	}
	else if(step == 1) {
	stepTwo();
	}
	else if(step == 2) {
		

	ttl.text("Now Cooking");

	subttl.text("Place the pot onto the stove and wait!");

	d3.select("#pie")
 	 .transition()
 	 .duration(500)
	 .attr("opacity", 1);

	//var timer = setInterval(animate, 1000);
	animate();
  	//var timer = d3.interval(animate, 1000, 0);
	
	}
	step++;
});




function stepOne() {
	

	activeImg.attr("src", grounds);

	ttl.text("Grind Your Beans");

	subttl.text("When Brewing Espresso, it is important to grind your beans uniformly to retain their flavor");


	d3.select("#stBtn").text("Next Step");

}
function stepTwo() {
	
	activeImg.attr("src", stove);
	
	ttl.text("Start The Heater");

	subttl.text("After affixing the gas stove, turn the dial to the left and press the ignition");


	d3.select("#stBtn").text("Start Cooking");

}


function animate() {

get_data();

//console.log(currTemp);

// Repeat until timer is reached

// General purpose code for filling in pie
// for(var i=0; i<cTime; i++) {
//     // Push a value [0,1] for color interpolation
//     data.push({
//        length : 1/cTime,
//        color: i/cTime
//     });
// }
console.log(currTemp);
if(currTemp > MAX_TEMP || currTemp < MIN_TEMP) {
	

	data.push({ length: 1/cTime, color: (counter%(1+cTime))/cTime });

	d3.selectAll("path")
	.remove();

	svg.selectAll("path")
	  .data(pie(data))
  	.enter()
	.append("path")
	.attr("class", "arc")
	.style("fill", d => d3.interpolateRdBu(1-d.data.color))
	.attr("d", (d,idx) => arc(idx))
  	.attr("opacity",0)
	.transition()
	.duration(200)
	.ease(d3.easeLinear)
	.attr("opacity",1)
	.each(d => this._current = d.length);


	tempTxt.text(cStatus);

	timeTxt.text("Time: " + counter);

	data = [];

	counter++;
	setTimeout(animate, 1000);
	return;


}

// If we've reached this part of the code, it means the temperature is ready

counter = 0;

data.push({ length: 1/cTime, color: (counter%(1+cTime))/cTime });

svg.selectAll("path")
  .data(pie(data))
  .enter()
  .append("path")
  .attr("class", "arc")
  .style("fill", d => d3.interpolateRdBu(1-d.data.color))
  .attr("d", (d,idx) => arc(idx))
    .attr("opacity",0)
  .transition()
  .duration(200)
  .ease(d3.easeLinear)
  .attr("opacity",1)
  .each(d => this._current = d.length);

tempTxt.text(cStatus);

timeTxt.text("Time: " + counter);

counter++;

if(counter <= cTime) {
	setTimeout(animate, 1000);
}

}

// UN-COMMENT TO START TIMER AUTOMATICALLY
// var timer = d3.interval(animate, 1000);


});




