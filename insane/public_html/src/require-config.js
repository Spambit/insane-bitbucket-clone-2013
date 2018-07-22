'use stricts';
require.config({
    baseUrl : 'js',
    paths : {
        'jquery' : '../libs/jquery',
        'underscore' : '../libs/underscore',
        'backbone' : '../libs/backbone',
        'text' : '../libs/text',
        'semver' : '../libs/semver', //semver is made to support AMD
        'handlebars' : '../libs/handlebars',
        'bootstrap' : '../libs/bootstrap/js/bootstrap'
    },
    shim : {
        'jquery' : {
            exports : '$'
        },
        'underscore' : {
            exports : '_'
        },
        'backbone' : {
            deps : ['jquery','underscore'],
            exports : 'Backbone'
        },
        handlebars : {
            exports : 'Handlebars'
        },
        bootstrap : {
            deps : ['jquery']
        }
    }
});

/**
 * TODO : uncomment following code. This is central space to log require-errors by 
 * insane framework
 * 
require.onError = function(err){
    
    require(['core/src/errorhandler'],function(ErrHandler){
        ErrHandler.handle({
            type : ErrHandler.TYPES.require,
            origin : err
        });
    });
};*/