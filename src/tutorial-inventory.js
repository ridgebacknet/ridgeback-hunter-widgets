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

*/

(function(){
var widget =
{
    id: "tutorial-inventory",
    version: "1.0",
    title: "Endpoint Inventory (tutorial)",
    description: "Generate an inventory of endpoints.",
    copyright: "(C)2016 Ridgeback Network Defense, Inc. (GPL3)",
    render: function(e, source)
    {
        // Filter for live sources
        var data = source.log().filter(function(e){
            return source.getLogField(e, "src_ip") &&
                (source.getLogField(e, "src_ip") != "000.000.000.000") &&
                (! source.getLogField(e, "src_sim"));
        });

        // mapping from IP address to MAC address
        var ip2Mac = {};

        // set the IP/MAC pairs
        data.map(function(e){
            var ip = source.getLogField(e, "src_ip");
            var mac = source.getLogField(e, "src_mac");
            var oui = MAC_OUI[mac.toUpperCase().replace(/:/g,"").substr(0,6)];
            if (! ip2Mac[ip]) {
                ip2Mac[ip] = { };
            } // if
            ip2Mac[ip][mac] = oui;
        });

        // construct the IP to MAC table
        var table = "<table border=\"3\" style=\"font-family: monospace;\">";
        var ipList = Object.keys(ip2Mac).sort();
        for (var i=0; i<ipList.length; i++) {
            var ip = ipList[i];
            var macList = ip2Mac[ipList[i]];
            var macKeys = Object.keys(macList);
            for (var j=0; j<macKeys.length; j++) {
                table += "<tr>";
                table += "<td>" + ip + "</td>";
                table += "<td>" + macKeys[j] + "</td>";
                table += "<td>" + macList[macKeys[j]] + "</td>";
                table += "</tr>";
            } // for j
        } // for i
        table += "</table>";

        // set the .data field
        $(e + " .data").append(table);
        $(e + " .value").append("There are " + ipList.length + " records.");

    } // render()
}; // widget
AWM.registerWidget(widget);
})(); // widget
