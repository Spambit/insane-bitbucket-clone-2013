"use stricts";require.config({baseUrl:"js",paths:{jquery:"../libs/jquery",underscore:"../libs/underscore",backbone:"../libs/backbone",text:"../libs/text"},shim:{jquery:{exports:"$"},underscore:{exports:"_"},backbone:{deps:["jquery","underscore"],exports:"Backbone"}}}),require.onError=function(e){require(["core/src/errorhandler"],function(t){t.handle({type:t.TYPES.require,origin:e})})};