'use strict';
angular.module('po.input', ['ui.mask'])
/**
 * returns an object containing attributes and default values input types
 */

    .factory('PoInputRefData', function () {
        /**
         * Important - do not use RegExp options, e.g. /regexp/ig (ignore case global). This causes odd behavior!
         * @type {'poInputType': {attributes: {valid-ng-validator: string/RegExp/Number,...}, default: {poLabel: string, placeholder: string}},...}
         */
        return function InputRefData(){
            var poInputRefData = {
                requiredEmail: {
                    attributes: {
                        'ng-required': '\'true\'',
                        'type': 'email'
                    },
                    default: {
                        poLabel: 'Email Address',
                        placeholder: 'Email Address'
                    },
                    defaultErrors: [
                        {'required': {type: 'Alert', message: 'Please enter an email'}}
                    ]
                },
                ukPhone: {
                    attributes: {
                        'ng-required': '\'true\'',
                        'ng-pattern': /^((\(?0\d{4}\)?\s?\d{3}\s?\d{3})|(\(?0\d{3}\)?\s?\d{3}\s?\d{4})|(\(?0\d{2}\)?\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/
                    },
                    default: {
                        poLabel: 'Contact Number',
                        placeholder: 'Contact Number'
                    },
                    defaultErrors: [
                        {'required': {type: 'Alert', message: 'Please enter a Phone Number'}},
                        {'pattern': {type: 'Alert', message: 'Please enter Phone number in a valid format'}}
                    ]
                },
                currency: {
                    attributes: {
                        'ng-required': '\'true\'',
                        'ng-pattern': /^[0-9]{1,6}(\.[0-9]{2})?$/,
                        'maxlength':"9",
                        'class':"currency-input"
                    },
                    default: {
                        poLabel: 'Currency Box',
                        placeholder: '000.00'
                    },
                    defaultErrors: [
                        {'required': {type: 'Alert', message: 'Please enter a value for currency'}},
                        {'pattern': {type: 'Alert', message: 'Please enter a currency in a valid format'}}
                    ]
                },
                time: {
                    attributes: {
                        'ng-required': '\'true\'',
                        'ng-pattern': /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
                        'class':"time-input"
                    },
                    default: {
                        poLabel: 'Time',
                        placeholder: '00:00'
                    },
                    defaultErrors: [
                        {'required': {type: 'Alert', message: 'Please enter a time'}},
                        {'pattern': {type: 'Alert', message: 'Please enter the time in a valid format'}}
                    ]
                },
                addressLine1: {
                    attributes: {
                        'ng-pattern': /^([A-Z]|[a-z]|[0-9])\w+|[0-9]$/
                    },
                    default: {
                        poLabel: 'Address Line 1',
                        placeholder: 'Address Line 1'
                    },
                    defaultErrors: [
                        {'pattern': {type: 'Alert', message: 'Please enter the first line of the address in a valid format'}}
                    ]
                },
                addressLine2: {
                    attributes: {
                        'ng-pattern': /^$|([A-Z]|[a-z])\w+/
                    },
                    default: {
                        poLabel: 'Address Line 2 (Optional)',
                        placeholder: 'Address Line 2'
                    },
                    defaultErrors: [
                        {'pattern': {type: 'Alert', message: 'Please enter the second line of the address in a valid format'}}
                    ]
                },
                addressLine3: {
                    attributes: {
                        'ng-pattern': /^$|([A-Z]|[a-z])\w+/
                    },
                    default: {
                        poLabel: 'Address Line 3',
                        placeholder: 'Address Line 3'
                    },
                    defaultErrors: [
                        {'pattern': {type: 'Alert', message: 'Please enter the third line of the address in a valid format'}}
                    ]
                },
                city: {
                    attributes: {
                        'ng-pattern': /([A-Z]|[a-z])\w+/
                    },
                    default: {
                        poLabel: 'Town/City',
                        placeholder: 'Town/City'
                    },
                    defaultErrors: [
                        {'pattern': {type: 'Alert', message: 'Please enter the city in a valid format'}}
                    ]
                },
                county: {
                    attributes: {
                        'ng-pattern': /([A-Z]|[a-z])\w+/,
                        class: 'po-search-input-text'
                    },
                    default: {
                        poLabel: 'County',
                        placeholder: 'County'
                    },
                    defaultErrors: [
                        {'pattern': {type: 'Alert', message: 'Please enter the county in a valid format'}}
                    ]
                },
                country: {
                    attributes: {
                        'ng-pattern': /([A-Z]|[a-z]){2,}/,
                        class: 'po-search-input-text'
                    },
                    default: {
                        poLabel: 'Country of Origin',
                        placeholder: 'Country of Origin'
                    },
                    defaultErrors: [
                        {'pattern': {type: 'Alert', message: 'Please enter the country in a valid format'}}
                    ]
                },
                ukPostcodeOptional: {
                    attributes: {
                        'ng-pattern': /^(|([A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}))$/i
                    },
                    default: {
                        poLabel: 'Postcode',
                        placeholder: 'Postcode'
                    },
                    defaultErrors: [
                        {'pattern': {type: 'Alert', message: 'Please enter the Postcode in a valid format'}}
                    ]
                },
                ukPostcode: {
                    attributes: {
                        'ng-required': '\'true\'',
                        'ng-pattern': /^[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}$/i,
                    },
                    default: {
                        poLabel: 'Postcode',
                        placeholder: 'Postcode'
                    },
                    defaultErrors: [
                        {'required': {type: 'Alert', message: 'Please enter a Postcode'}},
                        {'pattern': {type: 'Alert', message: 'Please enter Postcode in a valid format'}}
                    ]
                },
                stringHardCodedNgpattern: {
                    attributes: {
                        'ng-required': '\'true\'',
                        'ng-pattern': '/^[0-9]+$/',
                    },
                    default: {
                        poLabel: 'def: hard coded string ng pattern',
                        placeholder: 'def: hard coded string ng pattern'
                    }
                },
                regexHardCodedNgpattern: {
                    attributes: {
                        'ng-required': '\'true\'',
                        'ng-pattern': /^[0-9]{3}$/
                    },
                    default: {
                        'poLabel': 'def: hard coded regex ngPattern',
                        'placeholder': 'def: hard coded regex ngPattern'
                    }
                },
                minlength: {
                    attributes: {
                        'ng-minlength': '3',
                        'ng-required': '\'true\''
                    },
                    default: {
                        'poLabel': 'def: minlength label',
                        'placeholder': 'def: minlength placeholder'
                    }

                },
                validStyle: {
                    attributes: {
                        'ng-required': '\'true\''
                    },
                    default: {
                        'poLabel': 'def: example valid style label',
                        'placeholder': 'def: example valid style placeholder style'
                    }

                },
                default: {},
                failureTypes: []
            };
            for (var inputType in poInputRefData) {
                if (inputType !== 'failureTypes') {
                    poInputRefData[inputType].type = inputType;
                }
                if (poInputRefData[inputType].defaultErrors) {
                    for (var i = 0; i < poInputRefData[inputType].defaultErrors.length; i++) {
                        var errorType = Object.keys(poInputRefData[inputType].defaultErrors[i])[0];
                        var isFound = false;
                        for ( var j = 0; j < poInputRefData.failureTypes.length; j++) {
                            if (errorType === poInputRefData.failureTypes[j]) {
                                isFound = true;
                                break;
                            }
                        }
                        if (isFound === false) {
                            poInputRefData.failureTypes.push(errorType);
                        }
                    }
                }
            }
            return poInputRefData
        }
    });
