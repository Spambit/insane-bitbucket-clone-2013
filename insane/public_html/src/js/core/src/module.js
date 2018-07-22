
/*
 * 
 */

'use strict';

//core is still not defined when module is being required.
//hence 'core' in this define-dependency-list won't work.

define(['backbone',
    'underscore',
    'jquery',
    'core/src/util'],function(Backbone,_,$,CoreUtil){
    
    var  MAIN_STYLE_PATH = function(moduleName){
                        return 'modules/'+moduleName+'/src/styles/main.css';
                    };
    
    function module(){
        
        //enforce new 
        if(!this instanceof module){
            return new module();
        }
        
        var args = Array.prototype.slice.call(arguments);
        _.extend(module.prototype,Backbone.Events);
        
        //module's initialize method gets called by initializing the router also
        if(this.initialize) {
            this.initialize.apply(this,args);
        }
        
        this.on('active',_.bind(function(){
            //load styles of individuals
            CoreUtil.loadStyle(require.toUrl(MAIN_STYLE_PATH(this.name)));
            //trigger it's home route
            this.router.navigate(this.name,{trigger : true});
        },this));
        
        this.$element = $('.container');
        
        var Router = Backbone.Router.extend(this);
        this.router = new Router();
        this.router.name = this.name;
    };
    module.extend = Backbone.Router.extend;
    return module;
});