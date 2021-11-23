$(document).ready(function() {

const margin = {top: 20, bottom: 20, left: 30, right: 30},
height =500-margin.top-margin.bottom,
width=500-margin.left-margin.right;

// Container for each second of cooking time
var data = [];

// Cooking time in seconds
var cTime = 20;

for(var i=0; i<cTime; i++) {
    // Push a value [0,1] for color interpolation
    data.push(i/cTime);
}

var arc = d3.arc()
  .innerRadius(80)
  .outerRadius(100)
  .cornerRadius(20);

var pie = d3.pie()
  .sort(null)
  .value(function(d) {
    return d;
  });

var color = d3.scaleLinear()
    .range(d3.interpolateRdBu())
    .domain([0,1]);

console.log(d3.interpolateRdBu(0.5));

var svg = d3.select("#pChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + (width/2 +margin.right+margin.left) + "," + (height/2) + ")");



svg.selectAll(".arc")
  .data(pie(data))
  .enter()
  .append("path")
  .attr("class", "arc")
  .style("fill", function(d) {

    return d3.interpolateRdBu(1-d.data);
  })
  .attr("d", arc);





});

