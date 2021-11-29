$(document).ready(function() {

const margin = {top: 20, bottom: 20, left: 30, right: 30},
height=(window.innerHeight/2)-margin.top-margin.bottom,
width=(window.innerWidth/2)-margin.left-margin.right;


// Cooking time in seconds
var cTime = 100;

// Container for each second of cooking time
var data = [{ length: 1/cTime, color: 0 }];



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
    .attr("id", "pie")
    .attr("opacity", 0)
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
  .attr("d", arc)
  .each(d => this._current = d.length);

// svg.selectAll("path")
// .data(pie(data))
// .transition()
// .attrTween("d", arcTween);

    

svg.append("text")
.attr("font-weight", "bold")
.attr("dx", -(margin.left+margin.right-5))
.text("Cooking Time");

d3.select("#stBtn")
.on("click", () => {
  d3.select("#pie")
  .transition()
  .duration(500)
  .attr("opacity", 1);
});


});

