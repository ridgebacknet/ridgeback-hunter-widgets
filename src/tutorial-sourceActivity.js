/*
Copyright (c)2016 Ridgeback Network Defense, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
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
