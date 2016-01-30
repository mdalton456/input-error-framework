'use strict';


describe('Directive: po-input=', function () {
    var $scope, form, poInputTranslcudeScope, compiledEl, inputEl, input;

    function mockSendKeys(keys) {
        input.$setViewValue(keys);
        input.$setTouched();
    }

    beforeEach(module('po-ui-component'));

    function setupDirective($compile,$rootScope,inputType){
        $scope = $rootScope;
        var element = angular.element(
            '<form name="formName">' +
            '  <input po-input="' + inputType + '" ng-model="model.' + inputType + '" name="' + inputType + '" />' +
            '</form>'
        );
        compiledEl = $compile(element)($scope);
        $scope.$digest();
        poInputTranslcudeScope = angular.element(element.find('input')).scope().$parent;
        form = $scope.formName;
        input = form[inputType];
        inputEl = compiledEl.find('input');
    }

    describe('"time"', function () {
        var inputType;
        beforeEach(inject(function ($compile, $rootScope) {
            inputType = 'time';
            setupDirective($compile,$rootScope,inputType)
        }));

        it('should displayInvalid when time is invalid only after the form field has been touched', function () {
            input.$setViewValue('XXX');
            expect(poInputTranslcudeScope.displayInvalid()).toBe(false);
            expect(poInputTranslcudeScope.displayValid()).toBe(false);
            input.$setTouched();
            expect(poInputTranslcudeScope.displayInvalid()).toBe(true);
            expect(poInputTranslcudeScope.displayValid()).toBe(false);
        });

        it('should displayValid as soon as a valid time is provided', function () {
            input.$setViewValue('2:15');
            expect(poInputTranslcudeScope.displayInvalid()).toBe(false);
            expect(poInputTranslcudeScope.displayValid()).toBe(true);
        });

        unroll(function (invalidTime) {
            it('should displayInvalid when ' + invalidTime + ' is entered', function () {
                mockSendKeys(invalidTime);
                expect(poInputTranslcudeScope.displayInvalid()).toBe(true);
                expect(poInputTranslcudeScope.displayValid()).toBe(false);
            });
        }, ['INVALID', '24:00', '12:60', '0:0', '13:1', '101:00']);

        unroll(function (validTime) {
            it('should displayValid when ' + validTime + ' is entered', function () {
                mockSendKeys(validTime);
                expect(poInputTranslcudeScope.displayInvalid()).toBe(false);
                expect(poInputTranslcudeScope.displayValid()).toBe(true);
            });
        }, ['01:00', '2:00', '23:59', '0:00', '00:00', '15:00']);
    });

    describe('"ukPostcode"', function () {
        var inputType;
        beforeEach(inject(function ($compile, $rootScope) {
            inputType = 'ukPostcode';
            setupDirective($compile,$rootScope,inputType)
        }));

        it('should displayInvalid when postcode is invalid only after the form field has been touched', function () {
            input.$setViewValue('XXX');
            expect(poInputTranslcudeScope.displayInvalid()).toBe(false);
            expect(poInputTranslcudeScope.displayValid()).toBe(false);
            input.$setTouched();
            expect(poInputTranslcudeScope.displayInvalid()).toBe(true);
            expect(poInputTranslcudeScope.displayValid()).toBe(false);
        });

        it('should displayValid as soon as a valid postcode is provided', function () {
            input.$setViewValue('SE1 9PZ');
            expect(poInputTranslcudeScope.displayInvalid()).toBe(false);
            expect(poInputTranslcudeScope.displayValid()).toBe(true);
        });

        unroll(function (invalidPostcode) {
            it('should displayInvalid when ' + invalidPostcode + ' is entered', function () {
                mockSendKeys(invalidPostcode);
                expect(poInputTranslcudeScope.displayInvalid()).toBe(true);
                expect(poInputTranslcudeScope.displayValid()).toBe(false);
            });
        }, ['INVALID', 'SE1 9PZ X', 'SE1 9', 'SE1@9PZ', 'aWC2H 7LT']);

        unroll(function (whenAndThen) {
            it('should displayValid when ' + whenAndThen.postcode + ' is entered', function () {
                mockSendKeys(whenAndThen.postcode);
                expect(poInputTranslcudeScope.displayValid()).toBe(whenAndThen.expect);
            });
        }, [{postcode: 'SW4 6JY', expect: true},
            {postcode: 'se50eg', expect: true},
            {postcode: 'WC2H 7LT', expect: true}]);
    });

    describe('"country"',function(){
        var inputType = 'country';
        beforeEach(inject(function ($compile, $rootScope) {
            setupDirective($compile,$rootScope,inputType)
        }));
        it('should have the search input icon on the text field', function() {
            expect(inputEl.hasClass('po-search-input-text')).toBeTruthy;
        });
        it('should allow 2 characters', function() {
            mockSendKeys('UK');
            expect(poInputTranslcudeScope.displayInvalid()).toBe(false);
        });
        it('should not allow 1 character', function() {
            mockSendKeys('U');
            expect(poInputTranslcudeScope.displayValid()).toBe(false);
            expect(poInputTranslcudeScope.displayInvalid()).toBe(true);
        });
        it('should not allow numbers', function() {
            mockSendKeys('123');
            expect(poInputTranslcudeScope.displayValid()).toBe(false);
            expect(poInputTranslcudeScope.displayInvalid()).toBe(true);
        });
    });

    describe('"ukPhone"', function () {
        var inputType = 'ukPhone';
        beforeEach(inject(function ($compile, $rootScope) {
            setupDirective($compile,$rootScope,inputType)
        }));

        describe('should should take a valid phone number', function () {
            it('without country code', function () {
                input.$setViewValue('07777777777');
                expect(poInputTranslcudeScope.displayInvalid()).toBe(false);
                expect(poInputTranslcudeScope.displayValid()).toBe(true);
            });

            it('for home phones', function () {
                input.$setViewValue('0121 747 9962');
                expect(poInputTranslcudeScope.displayInvalid()).toBe(false);
                expect(poInputTranslcudeScope.displayValid()).toBe(true);
            });
            it('or mobile phones with spaces', function () {
                input.$setViewValue('07780 442 312');
                expect(poInputTranslcudeScope.displayInvalid()).toBe(false);
                expect(poInputTranslcudeScope.displayValid()).toBe(true);
            });
        });

        unroll(function (invalidPhoneTest) {
            it('should displayInvalid when ' + invalidPhoneTest.phoneNumber + ' is entered (' + invalidPhoneTest.useCase + ')', function () {
                mockSendKeys(invalidPhoneTest.phoneNumber);
                expect(poInputTranslcudeScope.displayInvalid()).toBe(true);
                expect(poInputTranslcudeScope.displayValid()).toBe(false);
            });
        }, [{phoneNumber: 'INVALID', useCase: 'no numbers'},
            {phoneNumber: '+447912121211',useCase: '+ is entered'},
            {phoneNumber: '4477777777x7',useCase: 'invalid characters'},
            {phoneNumber: '4477777777777',useCase: '00 does not prefix country code'},
            {phoneNumber: '557777777777',useCase: 'invalid prefix'},
            {phoneNumber: '0077777777',useCase: 'too few numbers'}]);

    });
});