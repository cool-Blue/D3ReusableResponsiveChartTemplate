/**
 * basic template for a reusable, resizable d3 chart. 
 */
(function() {
	"use strict";
	d3.myReusableResponsiveChart = function() {

	  /** Options go here */
	  var svgWidth = null, // width can be set via .width(). if no width set, we take the width of the parent element
	      svgHeight = null, // height can be set via .height(). if no height set, we take the height of the parent element
	      margin = {top: 20, right: 20, bottom: 20, left: 20}, // default margins
	      value = function(d) { return +d.value; }; // default accessorfunction for values

	  /**
	   * main chart function. Takes a selection and initializes or updates the chart.
	   */
	  function chart(selection) {
	    selection.each(function(data, index) {
	    	// select the container
	      var container = d3.select(this).datum([data]);
	      // init svg width and height
	      if(container.select("svg").empty()) { // no svg element found. if no width or height is given, use parent values
	        svgWidth = (svgWidth === null) ? container.node().offsetWidth : svgWidth;
	        svgHeight = (svgHeight === null) ? container.node().offsetHeight : svgHeight;
	      } else { // svg element found. parse viewBox attribute for width and height
	        var viewBox = tempSvg.node().getAttribute("viewBox").split(" ");
	        svgWidth = viewBox[2];
	        svgHeight = viewBox[3];
	      }

	      var svg = container.selectAll("svg").data([data]);

	      svg.enter()
	      	.append("svg")
	      		.attr("viewBox", "0 0 " + svgWidth + " " + svgHeight) // set viewBox of the svg 
	      		.attr("preserveAspectRatio", "xMinYMin meet"); // keep aspectratio on resize, see https://developer.mozilla.org/de/docs/Web/SVG/Attribute/preserveAspectRatio

				var width = svgWidth - margin.left -margin.right,
	          height = svgHeight - margin.top - margin.bottom;

	      var g = svg.selectAll("g").data([data]);
	      
	      g.enter()
	      	.append("g")
	      		.attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // apply conventional margins, see http://bl.ocks.org/mbostock/3019563

	      /** 
	       * append further elements to the g element here
	       */
	      g.selectAll("circle")
	          .data(data)
	          .enter()
	        .append("circle")
	          .attr("r", value)
	          .attr("cx", function(d) { return value(d) * 3; })
	          .attr("cy", value)
	          .attr("opacity", function(d) { return (100 - value(d)) / 100; });

	      g.selectAll("text")
	          .data(data)
	          .enter()
	        .append("text")
	          .text(function(d) { return value(d); })
	          .attr("x", function(d) { return value(d) * 3; })
	          .attr("y", value)
	          .attr("fill", "#ffffff")
	          .attr("text-anchor", "middle");

	    });
		}

		/**
	   * Utility for merging optionObjects.
	   * Overrides only old options with corresponding new ones
	   *
	   * @param newOptions 			options to be set
	   * @param currentOptions 	current optionsObject
	   * @returns merged options
	   */
	  function extendOptions(newOptions, currentOptions) {
	    var propertyName;
	    for(propertyName in oldOptions) {
	      if(oldOptions.hasOwnProperty(propertyName)) {
	        if(!newOptions.hasOwnProperty(propertyName)) 
	          newOptions[propertyName] = oldOptions[propertyName];
	      }
	    }
	    return newOptions;
	  }

		/** 
		 * getter/setter go here.
		 * support method chaining by returning chart after setting a value.
		 */
		
		chart.width = function(_) {
			if(!arguments.length) return svgWidth;
			svgWidth = _;
			return chart; 
		};

		chart.height = function(_) {
			if(!arguments.length) return svgHeight;
			svgHeight = _;
			return chart; 
		};

		chart.value = function(_) {
			if(!arguments.length) return value;
			value = _;
			return chart; 
		};

		chart.margin = function(_) {
			if(!arguments.length) return margin;
			margin = extendOptions(_, margin);
			return chart;
		};

		return chart;
	}
})();