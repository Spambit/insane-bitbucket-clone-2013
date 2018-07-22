/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

define([], function() {

    var typesImpl = {
        require: function(e) {
            //TODO : log requireModule[0] etc..
        }
        //TODO : implement other types
    };

    return {
        TYPES: {
            require: 0,
            app_config: 1,
            module_config: 2,
            version_mismatch: 3
        },
        handle: function(err) {
            var impl = typesImpl[err.types];
            if (!impl) {
                //TODO : throw 'Error : Unknown error type.';
            }
            console.log(err);
        }
    };
});

