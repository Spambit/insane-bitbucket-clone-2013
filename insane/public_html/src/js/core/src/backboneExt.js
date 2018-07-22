/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

define(['backbone','underscore'],function(Backbone,_){
    return _.extend(Backbone.Router.prototype,{
        /*
         * prepends str string to all its routes keys
         */
        prepend: function (str) {
            var that = this;
            _.each(that.routes, function (callback, key) {
                var name = null, keyEx = null;
                // '*' means default route
                // //add default routes to all modules
                //like : viewer/*
                // default route is being handled by navigator
                // modules are not allowed to change behaviour of default route
                if (key === "") {
                    //home route
                    keyEx = str;
                } else {
                    keyEx = str + '/' + key;
                }

                that.route(keyEx, callback);

            });
        }
    });
});