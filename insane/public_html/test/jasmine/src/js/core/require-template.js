/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

define('template',['text','core/errorhandler'],function(Text,ErrHandler){
   
    return {
        load : function(name, req, onLoad, config) {
            function finishLoading(data){
                var pattern = /<(\w+)((?:\s+\w+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
                        regExp = new RegExp(pattern);
                
                if(regExp.test(data)){
                    onLoad && onLoad(data);
                }else {
                    throw {
                        type : ErrHandler.TYPES.require,
                        origin : {
                            desc : 'Bad template'
                        }        
                    };
                }
            };
            finishLoading.error = function(err){
                if(onLoad && onLoad.error){
                    onLoad.error({
                        type : ErrHandler.TYPES.require,
                        origin : err
                    });
                }
            };
            Text.load(name,req,finishLoading,config);
        },
        
        write : Text.write
    };
});


