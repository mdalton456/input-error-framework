'use strict';

describe('Service errorHandler', function () {

    beforeEach(module('mdalton456.mdd-input-error-framework'));
    beforeEach(module('po.modals'));
    beforeEach(module(angular.mock.module('templates')));

    var poErrorHandler;

    beforeEach(inject(function(_poErrorHandler_){
        poErrorHandler = _poErrorHandler_;
        console.log(poErrorHandler);
    }));

    it('should return the id of the added alert', function() {
        var id = poErrorHandler.addError('Alert','message');
        expect(id).toEqual(jasmine.any(Number));
        expect(poErrorHandler.getErrorArray().length).toBe(1);
        expect(poErrorHandler.getErrorArray()[0]._id).toBe(id);
    });
    it('should always return a different id', function() {
        var id1 = poErrorHandler.addError('Alert','message');
        var id2 = poErrorHandler.addError('Alert','message');
        expect(id2).not.toEqual(id1);
        expect(poErrorHandler.getErrorArray().length).toBe(2)
    });
    it('should dismiss the right error', function() {
        var id1 = poErrorHandler.addError('Alert','message1');
        var id2 = poErrorHandler.addError('Alert','message2');
        var id3 = poErrorHandler.addError('Alert','message3');
        expect(id2).not.toEqual(id1);
        expect(id3).not.toEqual(id1);
        expect(id2).not.toEqual(id3);
        expect(poErrorHandler.getErrorArray().length).toBe(3);
        poErrorHandler.removeErrorById(id2);
        var array = poErrorHandler.getErrorArray();
        expect(array.length).toBe(2);
        var messages =[];
        var i ;
        for (i in array){
            messages.push(array[i].message);
        }
        expect(messages.indexOf('message2')).toBe(-1);
        expect(messages.indexOf('message1')).not.toBe(-1);
        expect(messages.indexOf('message3')).not.toBe(-1);
        var id4 = poErrorHandler.addError('Alert','message2');
        expect(id2).not.toEqual(id4);
        expect(poErrorHandler.getErrorArray().length).toBe(3);
    });

    it('should not do anything if the index to be removed does not exist', function() {
        var id1 = poErrorHandler.addError('Alert','message1');
        expect(poErrorHandler.getErrorArray().length).toBe(1);
        poErrorHandler.removeErrorById(id1);
        expect(poErrorHandler.getErrorArray().length).toBe(0);
        poErrorHandler.removeErrorById(id1);
        expect(poErrorHandler.getErrorArray().length).toBe(0);
    });

    it('getMostRecentError() should return the most recent Alert or an object with all attributes set with empty strings', function() {
        var id1 = poErrorHandler.addError('Alert','message1');
        var id2 = poErrorHandler.addError('Alert','message2');
        var id3 = poErrorHandler.addError('Info','message1');
        var id4 = poErrorHandler.addError('Alert','message3');
        var id5 = poErrorHandler.addError('Info','message2');
        var alert=poErrorHandler.getMostRecentError();
        expect(alert._id).toBe(id4);
    });
    it('getMostRecent() should return be the most recent message', function() {
        var id1 = poErrorHandler.addError('Alert','message1');
        var id2 = poErrorHandler.addError('Alert','message2');
        var id3 = poErrorHandler.addError('Info','message1');
        var id4 = poErrorHandler.addError('Alert','message3');
        var alert1=poErrorHandler.getMostRecent();
        expect(alert1._id).toBe(id4);
        var id5 = poErrorHandler.addError('Info','message2');
        var alert2=poErrorHandler.getMostRecent();
        expect(alert2._id).toBe(id5);
    });
    it('getMostRecent(\'Alert\') should return the most recent Alert', function() {
        var id1 = poErrorHandler.addError('Alert','message1');
        var id2 = poErrorHandler.addError('Alert','message2');
        var id3 = poErrorHandler.addError('Info','message1');
        var id4 = poErrorHandler.addError('Alert','message3');
        var id5 = poErrorHandler.addError('Info','message2');
        var alert=poErrorHandler.getMostRecent('Alert');
        expect(alert._id).toBe(id4);
    });
    it('getMostRecent(\'Info\') should return the most recent Info', function() {
        var id1 = poErrorHandler.addError('Alert','message1');
        var id2 = poErrorHandler.addError('Alert','message2');
        var id3 = poErrorHandler.addError('Info','message1');
        var id4 = poErrorHandler.addError('Alert','message3');
        var alert=poErrorHandler.getMostRecent('Info');
        expect(alert._id).toBe(id3);
    });

    it('getMostRecentError should have no _id attribute if if there is no message ', function() {
        var alert=poErrorHandler.getMostRecentError();
        expect(alert._id).not.toBeDefined();
    });


});