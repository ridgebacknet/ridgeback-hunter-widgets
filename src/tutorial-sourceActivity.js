/*
Copyright (c)2016 Ridgeback Network Defense, Inc.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/*
This file is part of a tutorial on how to make a dashboard widget for Ridgeback Hunter.

Dashboard widget files go here:
/opt/ridgeback/plugins/ui

Important parts of a widget:

* id - unique identifier for the widget
* version - version number of the widget
* title - human-readable title for the widget panel
* description - human-readable description of the widget
* copyright - widget copyright information
* render(element, datasource) - render the widget

Some important objects and functions:

* $ - Reference to JQuery object
* ADS - Aerie Data Source
* ADS.getLogField(record, field) - Get a field from a record
* TIMEFILTER - Aerie Time Filter
* d3 - Handle to D3 (https://d3js.org/)
* AWM - Aerie Widget Manager
* AWM.registerWidget(widget) - Register a widget

*/

(function(){
var widget =
{
    id: "tutorial-sourceActivity",
    version: "1.0",
    title: "Live Source Activity (tutorial)",
    description: "Shows which live endpoints are contacting other endpoints. Destination may or may not be live.",
    copyright: "(C)2016 Ridgeback Network Defense, Inc. (GPL3)",
    render: function(e, source)
    {
        var data = source.log().filter(function(e){
            return source.getLogField(e, "src_ip") &&
                (source.getLogField(e, "src_ip") != "000.000.000.000") &&
                (! source.getLogField(e, "src_sim"));
        });

        var xFn = function(d)
        {
            return source.getLogField(d, "time")
        };
        var yFn = function(d)
        {
            var v = parseInt(source.getLogField(d, "src_ip").substr(12, 3));
            if (isNaN(v)) {
                return 0;
            } else {
                return v;
            } // if NaN
        };

        var x = d3.scaleLinear()
            .range([10, 490])
            .domain([TIMEFILTER.from, TIMEFILTER.to]);
        var y = d3.scaleLinear()
            .range([10, 490])
            .domain(d3.extent(data, yFn));

        // Get rid of any prior SVG
        $(e + " .data svg").remove();
        // The actual height and width are handled by the enclosing div.
        var svg = d3.select(e + " .data")
            .append("svg:svg")
            .attr("shape-rendering", "auto")
            .attr("viewBox", "0 0 499 499");
        var circle = svg.selectAll("circle").data(data).enter()
            .append("svg:circle")
            .attr("class", "live")
            .attr("r", 3)
            .attr("cx", function(d) { return x(xFn(d)) })
            .attr("cy", function(d) { return y(yFn(d)) })
            .on("click", function(d) {
                d3.select(e + " .value").html(
                    "Time: " +
                    new Date(parseInt(source.getLogField(d, "time"))) +
                    " Protocol: " + source.getLogField(d, "proto") +
                    "<br>SRC IP: " + source.getLogField(d, "src_ip") +
                    " SRC MAC: " + source.getLogField(d, "src_mac") +
                    "<br>DST: " + source.getLogField(d, "dst_ip") +
                    " DST MAC: " + source.getLogField(d, "dst_mac"))
            })
            .append("svg:title")
            .text(function(d){
                return new Date(parseInt(source.getLogField(d, "time"))) +
                " SRC=" + source.getLogField(d, "src_ip");
            });
    }, // render()
    noop: true
}; // widget
AWM.registerWidget(widget);
})(); // widget
