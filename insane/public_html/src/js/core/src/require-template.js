/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

'use stricts';

define('template',['text',
    'core/src/errorhandler',
    'core/src/handlebarsHelpers'
],function(Text,ErrHandler,Handlebars){
   
    return {
        normalize: function (name, normalize) {
            
            var regex = /{([\s\S]+?)}/,
            matches = name.match(regex),
            moduleName = matches ? matches[1] : null;
            
            //enforce strict directory structure
            var prefix = '';
            if(moduleName && moduleName.trim() !== '') {
                prefix = 'modules/'+moduleName+'/src/templates/';
                name = name.replace(regex,'');
            }
            
            // This methods gets called two times. Even for text! plugin it does in same way.
            // I shall check to find why.
            // If prefix already there do not do anything. 
            
            return prefix + normalize(name);
        },
        load : function(name, req, onLoad, config) {
            function finishLoading(data){
                var pattern = /<(\w+)((?:\s+\w+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
                        regExp = new RegExp(pattern);
                
                if(regExp.test(data)){
                    //apply handlebar
                    var compilefn = Handlebars.compile(data);
                    onLoad && onLoad({
                        compile : compilefn
                    });
                }else {
                    require.onError({
                        type : ErrHandler.TYPES.require,
                        origin : {
                            desc : 'Bad template'
                        }        
                    });
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


