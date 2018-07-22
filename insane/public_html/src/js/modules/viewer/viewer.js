'use stricts';
/*
 * 
 * @param {type} Core
 * @param {type} Controls
 * @returns {@exp;Core@pro;Modules@call;extend}
 * Core and Control will automatically be available even if it is not set as dependencies
 * of said module.
 */
'use strict';

define([
    'core',
    'settings',
    'template!{viewer}main.html'
],
function(
        Core,
        Settings,
        Template)
        {
    
    return Core.Module.extend({
        initialize : function(options){
            
        },
        routes : {
            '' : 'home',
            'view/:image' : 'showImage',
            '*notfound' : 'notFound'
        },
        home : function(queryparams) {
            //TODO : globalize handlebar template engine
            this.$element.html(Template.compile());
        },
        showImage : function(queryparams) {
            alert(3);
        },
        notFound : function(){
            console.log('Not found');
        }
    });
});