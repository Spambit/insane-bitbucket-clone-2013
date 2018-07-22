/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


//exports functionalities of core

'use strict';

define('core', [
    'core/src/module',
    'core/src/errorhandler',
    'core/src/globalized',
    'core/src/emitter',
    'core/src/moduleconfigValidator',
    'core/src/util',
    'core/src/logger',
    'core/src/view'
], function (module,
        errorHandler,
        Globalized,
        emitter,
        moduleConfigValidator,
        Util,
        Logger,
        View) {
    
    //TODO : introduce an freezed export object
    
    return {
        Module: module,
        ErrorHandler: errorHandler,
        Globalized: new Globalized(),
        Emitter: emitter,
        ConfigValidator: moduleConfigValidator,
        Util: Util,
        Logger : Logger,
        View : View
    };
});