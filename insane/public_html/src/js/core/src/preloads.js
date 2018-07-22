/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

'use stricts';

//preloads gets loaded before core is loaded

define([
    'core/src/util',
    'core/src/device',
    'core/src/logger',
    'core/src/require-json',
    'core/src/require-template',
    'core/src/backboneExt',
    'bootstrap'
],function(
    Util
){
    Util.loadStyle(require.toUrl('../libs/bootstrap/css/bootstrap.css'));
});
