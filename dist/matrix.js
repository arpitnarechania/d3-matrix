/*

@author: Arpit Narechania
@email: arpitnarechania@gmail.com
@project: d3-matrix

Copyright (c) 2017 Arpit Narechania

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
OR OTHER DEALINGS IN THE SOFTWARE.

*/

function Matrix(data, options) {

	var margin = options.margin,
	    width = options.width,
	    height = options.height,
	    container = options.container,
	    showLabels = options.show_labels,
	    startColor = options.start_color,
	    endColor = options.end_color,
        highlightCellOnHover = options.highlight_cell_on_hover,
        highlightCellColor = options.highlight_cell_color;

	var dataValues = data['values'];
	var dataLabels = data['labels'];

	if(!dataValues){
		throw new Error('data is empty');
	}

	if(!Array.isArray(dataValues) || !dataValues.length || !Array.isArray(dataValues[0])){
		throw new Error('2-D array expected');
	}

    var maxValue = d3.max(dataValues, function(layer) { return d3.max(layer, function(d) { return d; }); });
    var minValue = d3.min(dataValues, function(layer) { return d3.min(layer, function(d) { return d; }); });

	var numrows = dataValues.length;
	var numcols = dataValues[0].length;

	var svg = d3.select(container).append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
		.append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var background = svg.append("rect")
	    .style("stroke", "black")
	    .style("stroke-width", "2px")
	    .attr("width", width)
	    .attr("height", height);

	var x = d3.scale.ordinal()
	    .domain(d3.range(numcols))
	    .rangeBands([0, width]);

	var y = d3.scale.ordinal()
	    .domain(d3.range(numrows))
	    .rangeBands([0, height]);

	var colorMap = d3.scale.linear()
	    .domain([minValue,maxValue])
	    .range([startColor, endColor]);

	var row = svg.selectAll(".row")
	    .data(dataValues)
	  	.enter().append("g")
	    .attr("class", "row")
	    .attr("transform", function(d, i) { return "translate(0," + y(i) + ")"; });

	var cell = row.selectAll(".cell")
	    .data(function(d) { return d; })
		.enter().append("g")
	    .attr("class", "cell")
	    .attr("transform", function(d, i) { return "translate(" + x(i) + ", 0)"; });

	cell.append('rect')
	    .attr("width", x.rangeBand())
	    .attr("height", y.rangeBand())
	    .style("stroke-width", 0);

    cell.append("text")
	    .attr("dy", ".32em")
	    .attr("x", x.rangeBand() / 2)
	    .attr("y", y.rangeBand() / 2)
	    .attr("text-anchor", "middle")
	    .style("fill", function(d, i) { return d >= maxValue/2 ? 'white' : 'black'; })
	    .text(function(d, i) { return d; });

	row.selectAll(".cell")
	    .data(function(d, i) { return dataValues[i]; })
	    .style("fill", colorMap);

    if(highlightCellOnHover){
        cell
        .on("mouseover", function(d) {
            d3.select(this).style("fill", highlightCellColor);
        })
        .on("mouseout", function() {
            d3.select(this).style("fill", colorMap);
        });
    }

    if (showLabels){
        var labels = svg.append('g')
            .attr('class', "labels");

        var columnLabels = labels.selectAll(".column-label")
            .data(dataLabels)
            .enter().append("g")
            .attr("class", "column-label")
            .attr("transform", function(d, i) { return "translate(" + x(i) + "," + height + ")"; });

        columnLabels.append("line")
            .style("stroke", "black")
            .style("stroke-width", "1px")
            .attr("x1", x.rangeBand() / 2)
            .attr("x2", x.rangeBand() / 2)
            .attr("y1", 0)
            .attr("y2", 5);

        columnLabels.append("text")
            .attr("x", 0)
            .attr("dx", "-0.82em")
            .attr("y", y.rangeBand() / 2)
            .attr("dy", ".41em")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .text(function(d, i) { return d; });

        var rowLabels = labels.selectAll(".row-label")
            .data(dataLabels)
            .enter().append("g")
            .attr("class", "row-label")
            .attr("transform", function(d, i) { return "translate(" + 0 + "," + y(i) + ")"; });

        rowLabels.append("line")
            .style("stroke", "black")
            .style("stroke-width", "1px")
            .attr("x1", 0)
            .attr("x2", -5)
            .attr("y1", y.rangeBand() / 2)
            .attr("y2", y.rangeBand() / 2);

        rowLabels.append("text")
            .attr("x", -8)
            .attr("y", y.rangeBand() / 2)
            .attr("dy", ".32em")
            .attr("text-anchor", "end")
            .text(function(d, i) { return d; });
    }

}