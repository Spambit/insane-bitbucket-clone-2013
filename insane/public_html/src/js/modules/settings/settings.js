'use strict';

define([
    'core'
],
function(
        Core,
        Template)
        {
    return Core.Module.extend({
        initialize : function(options){
            
        },
        routes : {
            '' : 'home',
            'image' : 'imageSettings'
        },
        home : function(queryparams) {
            console.log('settings home');
        },
        imageSettings : function(queryparams) {
            console.log('image settings');
        }
    });
});