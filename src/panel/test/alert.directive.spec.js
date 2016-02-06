'use strict';

describe('Directive: Alerts -', function() {
    var element, scope, compile;

    // load the directive's module and view
    beforeEach(function() {
        module('mdalton456.mdd-input-error-framework');
        angular.mock.module('templates');
    });

    function setupSpecError() {
        element = compile(
            '<po-alert-notification error="error"></po-alert-notification>'
        )(scope);
        scope.$digest();
    }

    function setupSpecInfo() {
        element = compile(
            '<po-info-notification info="info"></po-info-notification>'
        )(scope);
        scope.$digest();
    }

    describe('Error Alert Tests', function () {

        beforeEach(inject(function ($rootScope, $compile) {

            compile = $compile;
            scope = $rootScope.$new();

            scope.error = '';

            scope.passedError = 'This is an error';

            scope.newError = function(errMsg){
                scope.error=errMsg;
            };
            scope.clearError = function(){
                scope.error='';
            };

            setupSpecError();

        }));

        it('should show the error container with no message on initial load', function () {

            expect(element.find('.po-alert').length).toEqual(1);
            expect(element.find('.alert-text').text()).toContain('');
            expect(element.find('.alert-text').text()).not.toContain('This is an error');

        });

        it('should show the correct error text that was provided to the error alert', function () {

            expect(element.find('.alert-text').text()).not.toContain('This is an error');

            scope.newError('This is an error');
            scope.$digest();

            expect(element.find('.alert-text').text()).toContain('This is an error');
            expect(element.find('.alert-text').text()).not.toContain('Some other random text that shouldnt be there');

        });

        it('should remove the error when the error is cleared from the scope', function () {

            expect(element.find('.alert-text').text()).not.toContain('This is an error');

            scope.newError('This is an error');
            scope.$digest();

            expect(element.find('.alert-text').text()).toContain('This is an error');
            expect(element.find('.alert-text').text()).not.toContain('Some other random text that shouldnt be there');

            scope.clearError();
            scope.$digest();

            expect(element.find('.alert-text').text()).not.toContain('This is an error');

        });

    });

    describe('Info Alert Tests', function () {

        beforeEach(inject(function ($rootScope, $compile) {

            compile = $compile;
            scope = $rootScope.$new();

            scope.info = '';

            scope.passedInfo = 'This is some information';

            scope.newInfo = function(infoMsg){
                scope.info=infoMsg;
            };
            scope.clearInfo = function(){
                scope.info='';
            };

            setupSpecInfo();

        }));

        it('should show the info container with no message on initial load', function () {

            expect(element.find('.po-alert').length).toEqual(1);
            expect(element.find('.alert-text').text()).toContain('');
            expect(element.find('.alert-text').text()).not.toContain('This is some information');

        });

        it('should show the correct info text that was provided to the info alert', function () {

            expect(element.find('.alert-text').text()).not.toContain('This is some information');

            scope.newInfo('This is some information');
            scope.$digest();

            expect(element.find('.alert-text').text()).toContain('This is some information');
            expect(element.find('.alert-text').text()).not.toContain('Some other random text that shouldnt be there');

        });

        it('should remove the error when the error is cleared from the scope', function () {

            expect(element.find('.alert-text').text()).not.toContain('This is some information');

            scope.newInfo('This is some information');
            scope.$digest();

            expect(element.find('.alert-text').text()).toContain('This is some information');
            expect(element.find('.alert-text').text()).not.toContain('Some other random text that shouldnt be there');

            scope.clearInfo();
            scope.$digest();

            expect(element.find('.alert-text').text()).not.toContain('This is some information');

        });

    });

});