/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * @description This is a wrapper on require-text plugin
 * This plugin is intended to read a local json files
 * @param {type} Text
 * @returns returns the parsed json data on a successful read. If json is not 
 * well constructed, it calls a member named error of successcallback.
 * 
 * @use require(json![filepath],onLoad);
 * function onLoad(data) {...} onLoad.error = function(e) {...};
 */

define('json',['text','core/errorhandler'],function(Text,ErrHandler){
   
    return {
        load : function(name, req, onLoad, config) {
            function finishLoading(data){
                var json;
                try{
                    json = JSON.parse(data);
                }catch(err){
                    throw {
                        type : ErrHandler.TYPES.require,
                        origin : err
                    };
                }
                onLoad && onLoad(json);
            };
            
            finishLoading.error = function(err){
                if(onLoad && onLoad.error){
                    onLoad.error(err);
                }
            };
            Text.load(name,req,finishLoading,config);
        },
        
        write : Text.write
    };
});

