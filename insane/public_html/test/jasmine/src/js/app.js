'use stricts';

define(['core/preloads'],function($,Preloads){
    
    return {
        start : function(){
            function onload(data) {
                alert(JSON.stringify(data));
            }
            onload.error = function(err) {
                console.log(err);
            };
            require(['template!../index.html'],onload);
            alert('app started');
        }
    };
});