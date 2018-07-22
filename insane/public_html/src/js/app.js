'use stricts';

/*
 * 
 * @param {type} App
 * @author Sambit Sarkar
 * 
 * @Legal TBD
 * 
 * SHELL RESPONSIBILITY
 * -------------------------------------------------------------------
 * 1. To show login screen when authentication is needed
 * 2. To show global settings module
 * 3. logout
 * 4. About screen
 * 5. mainView which holds any other views of module or navbar
 * 6. navbar that holds modules
 * 
 * 
 */

define([
    'backbone',
    'underscore',
    'jquery',
    'core/src/errorhandler',
    'core/src/preloads',
    'core/src/core'
], function(
        Backbone,
        _,
        $,
        ErrHandler,
        Ignore_preloads
        ) {

    function App() {
        if (!this instanceof App) {
            return new App();
        }
    }
    ;

    App.prototype = {
        start: function(options) {
            //read each module's config.json first
            //resolve dependencies
            //load least dependent module first and so on
            //load navigator.
            //once navigator is loaded, 
            //show masterModules in navbar
            //trigger defaultModule's home route
            //once masterModules gets clicked, trigger its home routes
            
            console.log('App is starting.');
            var me = this;
            require(['core','core/src/moduleLoader'], function(Core,ModuleLoader) {
                me.moduleLoader = new ModuleLoader();
                me.moduleLoader.load();
            });
            Backbone.history.start();
            
        }
    };

    return App;
});