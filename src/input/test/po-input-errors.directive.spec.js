'use strict';


describe('Directive: po-input=', function () {
    var $scope, form, poInputTranscludeScope, poErrorHandler, compiledEl, inputEl, input, noErrorObj;

    beforeEach(function() {
        module('mdalton456.mdd-input-error-framework');
        angular.mock.module('templates');
    });

    function setupDirective($compile, $rootScope, inputType, _poErrorHandler_, reqErrorObj, pattErrorObj){
        $scope = $rootScope;
        $scope.reqErrorObjReference = reqErrorObj;
        $scope.pattErrorObjReference = pattErrorObj;

        var element = angular.element(
            '<form name="formName">' +
            '  <input po-input="' + inputType + '" ng-model="model.' + inputType + '" name="' + inputType +
            '" required-error-obj="reqErrorObjReference" pattern-error-obj="pattErrorObjReference" ' +
            '/></form>'
        );
        compiledEl = $compile(element)($scope);
        $scope.$digest();
        poInputTranscludeScope = angular.element(element.find('input')).scope().$parent;
        form = $scope.formName;
        input = form[inputType];
        inputEl = compiledEl.find('input');
        poErrorHandler = _poErrorHandler_;
        noErrorObj = {
            type:'', message: '', timestamp: ''
        };
    }

//naughty duplication of poInputRefData here...this is because you can't import a service outside of a beforeEach,
// and importing in a beforeEach causes problems with the unrolls
    var refDataInfo = {
        requiredEmail: {
            validValue: 'ginni@ibm.com',
            invalidValues: {
                required: ''
            },
            customErrors: {
                required: {type: 'Alert', message: 'Please enter an email CUSTOM MESSAGE'},
                blank: {type: '', message: ''}
            },
            defaultErrors: {
                required: {type: 'Alert', message: 'Please enter an email'}
            }
        },
        ukPhone: {
            validValue: '07903876456',
            invalidValues: {
                required: '',
                pattern: 'heeelloooooooo'
            },
            customErrors: {
                required: {type: 'Alert', message: 'Please enter a phone number CUSTOM MESSAGE'},
                pattern: {type: 'Alert', message: 'Please enter a phone number in the correct format CUSTOM MESSAGE'},
                blank: {type: '', message: ''}
            },
            defaultErrors: {
                required: {type: 'Alert', message: 'Please enter a Phone Number'},
                pattern: {type: 'Alert', message: 'Please enter Phone number in a valid format'}
            }
        },
        currency: {
            validValue: '1000.09',
            invalidValues: {
                required: '',
                pattern: 'heeelloooooooo'
            },
            customErrors: {
                required: {type: 'Alert', message: 'Please enter a currency CUSTOM MESSAGE'},
                pattern: {type: 'Alert', message: 'Please enter a currency in the correct format CUSTOM MESSAGE'},
                blank: {type: '', message: ''}
            },
            defaultErrors: {
                required: {type: 'Alert', message: 'Please enter a value for currency'},
                pattern: {type: 'Alert', message: 'Please enter a currency in a valid format'}
            }
        },
        time: {
            validValue: '12:00',
            invalidValues: {
                required: '',
                pattern: '31:00'
            },
            customErrors: {
                required: {type: 'Alert', message: 'Please enter a time CUSTOM MESSAGE'},
                pattern: {type: 'Alert', message: 'Please enter a time in the correct format CUSTOM MESSAGE'},
                blank: {type: '', message: ''}
            },
            defaultErrors: {
                required: {type: 'Alert', message: 'Please enter a time'},
                pattern: {type: 'Alert', message: 'Please enter the time in a valid format'}
            }
        },
        addressLine1: {
            validValue: '12 Post Office Road',
            invalidValues: {
                pattern: '/@£%%'
            },
            customErrors: {
                pattern: {type: 'Alert', message: 'Please enter an address first line in the correct format CUSTOM MESSAGE'},
                blank: {type: '', message: ''}
            },
            defaultErrors: {
                pattern: {type: 'Alert', message: 'Please enter the first line of the address in a valid format'}
            }
        },
        addressLine2: {
            validValue: 'A street',
            invalidValues: {
                pattern: '/@£%%'
            },
            customErrors: {
                pattern: {type: 'Alert', message: 'Please enter an address second line in the correct format CUSTOM MESSAGE'},
                blank: {type: '', message: ''}
            },
            defaultErrors: {
                pattern: {type: 'Alert', message: 'Please enter the second line of the address in a valid format'}
            }
        },
        addressLine3: {
            validValue: 'Another street',
            invalidValues: {
                pattern: '/@£%%'
            },
            customErrors: {
                pattern: {type: 'Alert', message: 'Please enter an address third line in the correct format CUSTOM MESSAGE'},
                blank: {type: '', message: ''}
            },
            defaultErrors: {
                pattern: {type: 'Alert', message: 'Please enter the third line of the address in a valid format'}
            }
        },
        city: {
            validValue: 'Bangalore',
            invalidValues: {
                pattern: '3273b'
            },
            customErrors: {
                pattern: {type: 'Alert', message: 'Please enter a city in the correct format CUSTOM MESSAGE'},
                blank: {type: '', message: ''}
            },
            defaultErrors: {
                pattern: {type: 'Alert', message: 'Please enter the city in a valid format'}
            }
        },
        county: {
            validValue: 'Kildare',
            invalidValues: {
                pattern: '3273b'
            },
            customErrors: {
                pattern: {type: 'Alert', message: 'Please enter a county in the correct format CUSTOM MESSAGE'},
                blank: {type: '', message: ''}
            },
            defaultErrors: {
                pattern: {type: 'Alert', message: 'Please enter the county in a valid format'}
            }
        },
        ukPostcode: {
            validValue: 'CV983AS',
            invalidValues: {
                required: '',
                pattern: 'AS8jhhvjhv'
            },
            customErrors: {
                required: {type: 'Alert', message: 'Please enter a UK Postcode CUSTOM MESSAGE'},
                pattern: {type: 'Alert', message: 'Please enter a Postcode in the correct format CUSTOM MESSAGE'},
                blank: {type: '', message: ''}
            },
            defaultErrors: {
                required: {type: 'Alert', message: 'Please enter a Postcode'},
                pattern: {type: 'Alert', message: 'Please enter Postcode in a valid format'}
            }
        }
    };

    (function() {
        for (var input in refDataInfo) {
            var failureTypes = [];
            for (var key in refDataInfo[input].defaultErrors) {
                failureTypes.push(key);
            }
            refDataInfo[input].failureTypes = failureTypes;
        }
    })();

    for (var inputType in refDataInfo) {
        describe('"' + inputType + '"', function () {
            describe(' (with default errors) ', function() {
                beforeEach(inject(function ($compile, $rootScope, _poErrorHandler_) {
                    setupDirective($compile, $rootScope, inputType, _poErrorHandler_, '', '')
                }));

                it('should not show an error message when a valid entry is added', function() {
                    input.$setTouched();
                    input.$setViewValue(refDataInfo[inputType].validValue);
                    expect(poErrorHandler.getMostRecentError()).toEqual(noErrorObj);
                });

                unroll(function (failureType) {
                    it('should show an error when ' + refDataInfo[inputType].invalidValues[failureType] + ' is entered', function () {
                        input.$setTouched();
                        input.$setViewValue(refDataInfo[inputType].invalidValues[failureType]);
                        expect(poErrorHandler.getMostRecentError().message).toEqual(refDataInfo[inputType].defaultErrors[failureType].message);
                    });
                }, refDataInfo[inputType].failureTypes);

                it('should run through each failure case correctly', function() {
                    input.$setTouched();

                    for (var i = 0; i < Object.keys(refDataInfo[inputType].invalidValues).length; i++) {
                        var currentKey = Object.keys(refDataInfo[inputType].invalidValues)[i];
                        input.$setViewValue(refDataInfo[inputType].invalidValues[currentKey]);
                        expect(poErrorHandler.getMostRecentError().message).toEqual(refDataInfo[inputType].defaultErrors[currentKey].message);
                    }

                    input.$setViewValue(refDataInfo[inputType].validValue);
                    expect(poErrorHandler.getMostRecentError()).toEqual(noErrorObj);
                });
            });

            describe(' (with custom errors) ', function() {
                unroll(function (type) {
                    it('should show the correct custom error when a custom ' + type + ' error is added to the directive', inject(function($compile, $rootScope, _poErrorHandler_) {
                        if (type === 'required') {
                            setupDirective($compile, $rootScope, inputType, _poErrorHandler_, refDataInfo[inputType].customErrors.required, '');
                        }
                        else if (type === 'pattern') {
                            setupDirective($compile, $rootScope, inputType, _poErrorHandler_, '', refDataInfo[inputType].customErrors.pattern);
                        }
                        input.$setTouched();
                        input.$setViewValue(refDataInfo[inputType].invalidValues[type]);
                        expect(poErrorHandler.getMostRecentError().message).toEqual(refDataInfo[inputType].customErrors[type].message);
                    }));
                }, refDataInfo[inputType].failureTypes);

                unroll(function (type) {
                    it('should not display an error when a blank ' + type + ' error is added to the directive', inject(function($compile, $rootScope, _poErrorHandler_) {
                        if (type === 'required') {
                            setupDirective($compile, $rootScope, inputType, _poErrorHandler_, refDataInfo[inputType].customErrors.blank, '');
                        }
                        else if (type === 'pattern') {
                            setupDirective($compile, $rootScope, inputType, _poErrorHandler_, '', refDataInfo[inputType].customErrors.blank);
                        }
                        input.$setTouched();
                        input.$setViewValue(refDataInfo[inputType].invalidValues[type]);
                        expect(poErrorHandler.getMostRecentError()).toEqual(noErrorObj);
                    }));
                }, refDataInfo[inputType].failureTypes);
            });
        });
    }

    describe('generic tests - ', function() {
        beforeEach(inject(function ($compile, $rootScope, _poErrorHandler_) {
            setupDirective($compile, $rootScope, 'time', _poErrorHandler_, '', '');
        }));

        it('should only display an error when input is $touched', function() {
            input.$setViewValue(refDataInfo['time'].invalidValues['pattern']);
            expect(poErrorHandler.getMostRecentError()).toEqual(noErrorObj);
        });

    });


    var timeInput, postcodeInput, currencyInput;
    describe('testing multiple fields - ', function() {
        beforeEach(inject(function ($compile, $rootScope, _poErrorHandler_) {
            $scope = $rootScope;
            var element = angular.element(
                '<form name="formName">' +
                '  <input po-input="time" ng-model="model.time" name="time"/>' +
                '  <input po-input="ukPostcode" ng-model="model.postcode" name="postcode" ng-required="true"/>' +
                '  <input po-input="currency" ng-model="model.currency" name="currency"/>' +
                '</form>'
            );
            compiledEl = $compile(element)($scope);
            $scope.$digest();
            poInputTranscludeScope = angular.element(element.find('input')).scope().$parent;
            form = $scope.formName;
            timeInput = form['time'];
            postcodeInput = form['postcode'];
            currencyInput = form['currency'];
            poErrorHandler = _poErrorHandler_;
            noErrorObj = {
                type:'', message: '', timestamp: ''
            };
        }));

        it('should deal with multiple errors on multiple fields without causing clashes', function() {
            var expectErrors = function(defaultMessage, numNotifications) {
                expect(poErrorHandler.getMostRecentError().message).toEqual(defaultMessage);
                expect(poErrorHandler.getNumNotifications()).toEqual(numNotifications);
            }
            timeInput.$setTouched();
            timeInput.$setViewValue('25:00');
            currencyInput.$setTouched();
            currencyInput.$setViewValue('sdjha');
            currencyInput.$setViewValue('987.78');
            currencyInput.$setViewValue('sdjhascs');
            expectErrors(refDataInfo.currency.defaultErrors.pattern.message, 2);
            postcodeInput.$setTouched();
            postcodeInput.$setViewValue('VB98hjvjh798v');
            postcodeInput.$setViewValue('cv659as');
            postcodeInput.$setViewValue('csdfsfDSF');
            expectErrors(refDataInfo.ukPostcode.defaultErrors.pattern.message, 3);
            currencyInput.$setViewValue('999.87');
            postcodeInput.$setViewValue('Bn879JH');
            timeInput.$setViewValue('17:00');
            expectErrors(noErrorObj.message, 0);
        })
    })
});