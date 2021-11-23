$(document).ready(function() {

const margin = {top: 20, bottom: 20, left: 30, right: 30},
height =500-margin.top-margin.bottom,
width=500-margin.left-margin.right;


var data = [],
i = 0;

for(i=0; i<5; i++){
    data.push(Math.round(Math.random()*100));
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



var svg = d3.select("#pChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + (width/2 +margin.right) + "," + (height/2) + ")");



svg.selectAll(".arc")
  .data(pie(data))
  .enter()
  .append("path")
  .attr("class", "arc")
  .style("fill", function(d) {
    return "red";
  })
  .attr("d", arc);





});

