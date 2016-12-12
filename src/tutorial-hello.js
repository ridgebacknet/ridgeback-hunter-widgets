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

*/

(function(){
var widget =
{
    id: "tutorial-hello",
    version: "1.0",
    title: "Hello World (tutorial)",
    description: "This is a simple tutorial widget.",
    copyright: "(C)2016 Ridgeback Network Defense, Inc. (GPL3)",
    render: function(e, source)
    {
        var count = source.log().length;
        $(e + " .data").append("<h1>Hello, world!</h1>");
        $(e + " .value").append("There are " + count + " records.");
    } // render()
}; // widget
AWM.registerWidget(widget);
})(); // widget
