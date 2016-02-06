'use strict';
/**
 * adds unroll method to window for karma tests. This function enables you to run the same test with different inputs,
 * minimising test code.
 * @param test - a function called with a when that executes an it.
 * @param whenAndThens - this is the variable input for your test.
 * simple example usage:
 * unroll(function(postcodeTest){
 *      it('should displayInvalid when ' + postcodeTest + ' is entered',function(){
 *         mockSendKeys(postcodeTest);
 *          expect(inputElScope.displayInvalid()).toBe(true);
 *          expect(inputElScope.displayValid()).toBe(false);
 *      });
 *  },['INVALID','SE1 9PZ X', 'SE1 9', 'SE1@9PZ','aWC2H 7LT']);
 *
 * example usage with multiple whenAndThen test args:
 unroll(function(whenAndThen){
        it('should display correct validity when ' + whenAndThen.postcode + ' is entered',function() {
            mockSendKeys(whenAndThen.postcode);
            expect(inputElScope.displayValid()).toBe(whenAndThen.expect);
        });
    },[ {postcode:'SW4 6JY' ,   expect:true},
 {postcode:'se50eg'  ,   expect:true},
 {postcode:'I am a funny looking postcode',   expect:false}
 ]);
 */
window.unroll = function(test,whenAndThens){
    /*jshint loopfunc:true */
    whenAndThens.forEach(function(whenAndThens){
        (function(wt){
            test(wt);
        })(whenAndThens);
    });
};