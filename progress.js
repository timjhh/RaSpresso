$(document).ready(function() {

var dataset = [1,2,3];

var svg = d3.select("#pChart")
    .append("svg");

svg.selectAll("circle")
    .data(dataset)
    .enter().append("circle")
    .style("stroke", "gray")
    .style("fill", "black")
    .attr("r", 40)
    .attr("cx", 50)
    .attr("cy", 20);




});

