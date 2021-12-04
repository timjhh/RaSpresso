$(document).ready(function() {

const margin = {top: 20, bottom: 20, left: 30, right: 30},
height=(window.innerHeight/2)-margin.top-margin.bottom,
width=(window.innerWidth/2)-margin.left-margin.right;
width=(window.innerWidth/2)-margin.left-margin.right;


// Cooking time in seconds
var cTime = 100;

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

var svg = d3.select("#pChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "pie")
    .attr("opacity", 1)
    .append("g")
    .attr("transform", "translate(" + (width/2) + "," + (height/2) + ")");

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

    

svg.append("text")
.attr("font-weight", "bold")
.attr("dx", -(margin.left+margin.right-(Math.PI)))
.text("Cooking Time");

svg.append("text")
.attr("font-weight", "bold")
.attr("id", "time")
.attr("dx", -Math.PI)
.attr("dy", 20)
.text(counter);

d3.select("#stBtn")
.on("click", () => {
  d3.select("#pie")
  .transition()
  .duration(500)
  .attr("opacity", 1);
  counter++;
  var timer = d3.interval(animate, 1000, 0);
});


function animate() {

// Repeat until timer is reached
if(counter > cTime) timer.stop();

// General purpose code for filling in pie
// for(var i=0; i<cTime; i++) {
//     // Push a value [0,1] for color interpolation
//     data.push({
//        length : 1/cTime,
//        color: i/cTime
//     });
// }

data.push({ length: 1/cTime, color: counter/cTime });

svg.selectAll("text")
.remove();

// svg.selectAll("path")
// .remove();

svg.selectAll(".arc")
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


svg.append("text")
.attr("font-weight", "bold")
.attr("dx", -(margin.left+margin.right-(Math.PI)))
.text("Cooking Time");

svg.append("text")
.attr("font-weight", "bold")
.attr("id", "time")
.attr("dx", -(Math.PI*(counter.toString().length)))
.attr("dy", 20)
.text(counter);


counter++;


}

// UN-COMMENT TO START TIMER AUTOMATICALLY
// var timer = d3.interval(animate, 1000);

});

