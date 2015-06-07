(function(){
	"use strict";
	var dataSet = [{
      something: 20
    },{
      something: 30
    },{
      something: 50
    },{
      something: 80
    }];

	var dataSet2 = [{something: 40},{something:90}];

	var myChart = d3.myReusableResponsiveChart()
	    .value(function(d) { return d.something })
	    .height(400);

	var chart = d3.select('#chartContainer').selectAll('div')
	    .data([dataSet, dataSet2])
	    .enter()
	  .append('div')
	    .call(myChart);
})();