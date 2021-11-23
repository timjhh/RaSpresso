$(document).ready(function {



sampleSVG.selectAll("circle")
    .data(dataset)
    .enter().append("circle")
    .style("stroke", "gray")
    .style("fill", "black")
    .attr("r", 40)
    .attr("cx", 50)
    .attr("cy", 20);




});

