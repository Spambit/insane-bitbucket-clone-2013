/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


'use strict';

define([],function(){
    
    var res = {};
    function Globalized(){
        require(['json!core/res/strings/en/strings.json'],function(Strings){
            res = Strings;
        });
    }
    Globalized.prototype.get = function(str) {
        //TODO : implement globalization
        return res[str];
    };
    
    return Globalized;
});