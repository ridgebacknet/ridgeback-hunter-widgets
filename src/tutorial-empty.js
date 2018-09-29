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
    id: "tutorial-empty",
    version: "1.0",
    title: "Empty Widget (tutorial)",
    description: "This is an empty widget.",
    copyright: "(C)2016 Ridgeback Network Defense, Inc. (GPL3)",
    render: function(e, source)
    {
        // render code goes here
    } // render()
}; // widget
AWM.registerWidget(widget);
})(); // widget
