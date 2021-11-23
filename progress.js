$(document).ready(function() {

const margin = {top: 20, bottom: 20, left: 30, right: 30},
height =500-margin.top-margin.bottom,
width=500-margin.left-margin.right;

// Container for each second of cooking time
var data = [];

// Cooking time in seconds
var cTime = 100;

for(var i=0; i<cTime; i++) {
    // Push a value [0,1] for color interpolation
    data.push({
       length : 1/cTime,
       color: i/cTime
    });
}

var arc = d3.arc()
  .innerRadius(80)
  .outerRadius(100)
  .cornerRadius(0);

var pie = d3.pie()
  .sort(null)
  .value(function(d) {
    return d.length;
  });

var svg = d3.select("#pChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + (width/2) + "," + (height/2) + ")");



svg.selectAll(".arc")
  .data(pie(data))
  .enter()
  .append("path")
  .attr("class", "arc")
  .style("fill", d => d3.interpolateRdBu(1-d.data.color))
  .attr("d", arc);

svg.append("text")
.attr("font-weight", "bold")
.attr("dx", -(margin.left+margin.right))
.text("Cooking Time");


});

