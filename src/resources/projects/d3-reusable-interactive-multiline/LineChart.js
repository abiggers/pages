import React, { Component } from 'react'
import './App.css'
import * as d3 from 'd3'
import * as chromatic from 'd3-scale-chromatic'

class LineChart extends Component {
    constructor(props){
        super(props)
        this.createLineChart = this.createLineChart.bind(this)
        
        
    }
    componentDidMount() {
        this.createLineChart()
    }
    componentDidUpdate() {
        this.createLineChart()
    }


    createLineChart(){

//this is the svg we render down at the bottom. we need this to tell our d3 function where to put everthing    
const node = this.node


//we go ahead and set the margins here to give some space between the svg edge and the outside of the graph
var margin = {
    top: 20,
    right: 30,
    bottom: 30,
    left: 50
  },
  
//and the width/height of the d3 element minus the margins so it's not all squishy
  width = this.props.size[0] - margin.left - margin.right,
  height = this.props.size[1] - margin.top - margin.bottom;
  

//here we are defining the x and y variables that we are going to use for our axis
// to avoid filling an entire page with comments, if you are interested in how they work
// or why we are using these ones
var x = d3.scaleLinear()
  .range([0, width]);

var y = d3.scaleLinear()
  .range([height, 0]);


//this is wicked nifty because it allows us to create a color scale 
//to avoid having to manually assign colors
//to learn more about color catagories, this is a great resource 
//http://bl.ocks.org/aaizemberg/78bd3dade9593896a59d
var color = d3.scaleOrdinal(chromatic.schemeDark2);



//here we are taking the x and y variables we defined above and 
//turning them into our actual axis for the chart. notice the orient
//method we applied to each

var xAxis = d3.axisBottom()
  .scale(x)
  .tickFormat(d3.format(""))


var yAxis = d3.axisLeft()
  .scale(y)
  .tickFormat(d3.format(""))



//somewhat obviously, this defines the line
var line = d3.line()
  .curve(d3.curveCardinal)

//attaching our x and y variables to the line gives it the points it needs to squiggle through
  .x(function(d) {
    return x(d.year);
  })
  .y(function(d) {
    return y(d.yData / 1000000);
    
  });
  



//appends graph inside the node element we render
var svg = d3.select(node)
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



  var data = this.props.data


color.domain(d3.keys(data[0]).filter(function(key) {
  return key !== "year";
}));

var linedata = color.domain().map(function(name) {
  return {
    name: name,
    values: data.map(function(d) {
      return {
        year: d.year,
        yData: +d[name].num_val,
        prefix: d[name].prefix,
        suffix: d[name].suffix
      };
    })
  };
});
console.log(linedata)
x.domain(d3.extent(data, function(d) {
  return d.year;
}));

y.domain([
  d3.min(linedata, function(c) {
    return d3.min(c.values, function(v) {
      return v.yData /1000000;
    });
  }),
  d3.max(linedata, function(c) {
    return d3.max(c.values, function(v) {
      return v.yData /1000000;
    });
  })
]);


svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

svg.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text("yData (in millions)");

var lineG = svg.selectAll(".lineG")
  .data(linedata)
  .enter().append("g")
  .attr("class", "lineG");

lineG.append("path")
  .attr("class", "line")
  .attr("d", function(d) {
    return line(d.values);
  })
  .style("stroke", function(d) {
    return color(d.name);
  });

lineG.append("text")
  .datum(function(d) {
    return {
      name: d.name,
      value: d.values[d.values.length - 1]
    };
  })
  .attr("transform", function(d) {
    return "translate(" + x(d.value.year) + "," + y(d.value.yData) + ")";
  })
  .attr("x", 3)
  .attr("dy", ".35em")
  .text(function(d) {
    return d.name;
  });

var mouseG = svg.append("g")
  .attr("class", "mouse-over-effects");

mouseG.append("path") // this is the black vertical line to follow mouse
  .attr("class", "mouse-line")
  .style("stroke", "black")
  .style("stroke-width", "1px")
  .style("opalineG", "0");
  
var lines = document.getElementsByClassName('line');

var mousePerLine = mouseG.selectAll('.mouse-per-line')
  .data(linedata)
  .enter()
  .append("g")
  .attr("class", "mouse-per-line");

mousePerLine.append("circle")
  .attr("r", 7)
  .style("stroke", function(d) {
    return color(d.name);
  })
  .style("fill", "none")
  .style("stroke-width", "1px")
  .style("opalineG", "0");

mousePerLine.append("text")
  .attr("transform", "translate(10,3)");

mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
  .attr('width', width) // can't catch mouse events on a g element
  .attr('height', height)
  .attr('fill', 'none')
  .attr('pointer-events', 'all')
  .on('mouseout', function() { // on mouse out hide line, circles and text
    d3.select(".mouse-line")
      .style("opalineG", "0");
    d3.selectAll(".mouse-per-line circle")
      .style("opalineG", "0");
    d3.selectAll(".mouse-per-line text")
      .style("opalineG", "0");
  })
  .on('mouseover', function() { // on mouse in show line, circles and text
    d3.select(".mouse-line")
      .style("opalineG", "1");
    d3.selectAll(".mouse-per-line circle")
      .style("opalineG", "1");
    d3.selectAll(".mouse-per-line text")
      .style("opalineG", "1");
  })
  .on('mousemove', function() { // mouse moving over canvas
    var mouse = d3.mouse(this);
    d3.select(".mouse-line")
      .attr("d", function() {
        var d = "M" + mouse[0] + "," + height;
        d += " " + mouse[0] + "," + 0;
        return d;
      });
      d3.selectAll(".mouse-per-line")
      .attr("transform", function(d, i) {
        console.log(width/mouse[0])
        var xYear = x.invert(mouse[0]),
            bisect = d3.bisector(function(d) { return d.year; }).right;
           var idx = bisect(d.values, xYear);
        var labeltext = d.name
        var labelprefix = d.values[i].prefix
        var labelsuffix = d.values[i].suffix


        var beginning = 0,
            end = lines[i].getTotalLength(),
            target = null;
            var pos = lines[i].getPointAtLength(target);
        while (true){
          target = Math.floor((beginning + end) / 2);
          var pos = lines[i].getPointAtLength(target);
          if ((target === end || target === beginning) && pos.x !== mouse[0]) {
              break;
          }
          if (pos.x > mouse[0])      end = target;
          else if (pos.x < mouse[0]) beginning = target;
          else break; //position found
        }
        //this is where we add the label
        d3.select(this).select('text')
          .text(labelprefix+y.invert(pos.y).toFixed(2) + labelsuffix+"   " +labeltext)

          
        return "translate(" + mouse[0] + "," + pos.y +")";
      });
   
  });
  
    }
    render() {
        return <svg ref={node => this.node = node}
        width={this.props.size[0]} height={this.props.size[1]}>
        </svg>

    }
}

export default LineChart