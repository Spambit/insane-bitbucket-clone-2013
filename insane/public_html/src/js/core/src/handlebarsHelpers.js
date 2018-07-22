/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

define(['handlebars'],function(Handlebars){
    Handlebars.registerHelper('globalize', function(res_key){
         //TODO : globalize a string here from Core.globalize.get(res_key);       
    });
    
    return Handlebars; 
});
