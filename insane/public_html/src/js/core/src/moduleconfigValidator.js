/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

define(['underscore','core/src/errorhandler'],function(_,ErrHandler){
    
    function nonEmptyString(str){
        if(!_.isString(str) || (_.isString(str) && str.trim() === '')){
            return false;
        }
        
        return true;
    }
    
    function semverVersion(){
        //TODO : introduce semver.js to check the version
        return true;
    }
    
    var conf = {
        name : nonEmptyString,
        version : semverVersion
    };
    
    return {
        /**
         * @param {string} type - what, desc - any key of config json
         * @param {any} val value of the key in config json 
         * @returns {bool} true if valid 
         */
        validate : function(type,val){
            var validator_fn = conf[type];
            if(!validator_fn) {
                throw 'Error : unsupported validator function';
            }
            
            if(!validator_fn(val)){
                ErrHandler.handle({
                            type: ErrHandler.TYPES.module_config,
                            desc: 'Invalid field named : '+type+' at config'
                        });
                return false;
            }
            
            return true;
        },
        isValidConfig : function(config){
            //TODO : define a global standard of valid config
        }
    };
});