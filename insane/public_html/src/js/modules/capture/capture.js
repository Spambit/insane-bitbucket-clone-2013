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
    'template!{capture}main.html'
],
        function (
                Core,
                Template)
        {

            return Core.Module.extend({
                initialize: function (options) {

                },
                routes: {
                    '': 'home',
                    'camera/:mode': 'camera'
                },
                home: function (queryparams) {
                    this.$element.html(Template.compile());
                },
                camera: function (queryparams) {
                    console.log('invoke camera');
                }
            });
        });