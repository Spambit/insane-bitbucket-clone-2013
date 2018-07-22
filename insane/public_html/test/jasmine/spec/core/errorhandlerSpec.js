/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

define(['src/js/core/errorhandler'],function(ErrHandler){ 
    return describe('My first AMD describe',function(){
        it('Test',function(){
            expect(ErrHandler).toBeDefined();
        });
    });
});
