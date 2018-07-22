'use stricts';
require.config({
    baseUrl : 'js',
    paths : {
        'jquery' : '../libs/jquery',
        'underscore' : '../libs/underscore-amd',
        'backbone' : '../libs/backbone-amd',
        'text' : '../libs/text'
    },
    shim : {
        'jquery' : {
            exports : '$'
        }
    }
});

require.onError = function(err){
    require(['core/errorhandler'],function(ErrHandler){
        ErrHandler.handle({
            type : ErrHandler.TYPES.require,
            origin : err
        });
    });
};