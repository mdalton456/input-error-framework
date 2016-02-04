/*!
 * input-error-framework
 * 
 * Version: 0.0.0 - 2016-02-04T18:47:03.117Z
 * License: 
 */


'use strict';

angular.module('mdalton456.mdd-input-error-framework', ['po.alerts', 'po.input', 'po.modals']);

angular.module('po.alerts', [])
    .directive('poAlertNotification', function () {
        return {
            templateUrl: 'src/alerts/templates/error-alert.html',
            restrict: 'EA',
            scope: {
                error: '='
            }
        };
    })

    .directive('poInfoNotification', function () {
        return {
            templateUrl: 'src/alerts/templates/info-alert.html',
            restrict: 'EA',
            scope: {
                info: '='
            }
        };
    });


angular.module('po.input', [])
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
            return poInputRefData;
        };
    });

function validateMinDate(modelValue, minDate) {
    return modelValue > minDate;
}

function validateMaxDate(modelValue, maxDate) {
    return modelValue < maxDate;
}

angular.module('po.input')

/****************************************************************************
 *                                   INPUT                                   *
 ****************************************************************************/

    .directive('poInput', function ($compile, PoInputRefData) {

        function poInputTemplateElCompilerBuilder() {
            var baseInputEl,
                baseInputRemoveAttrs = [],
                baseInputAddAttrs = {},
                inputTemplateTypeProps,
                inputTemplateType,
                scopeToCompile,
                poInputRefData;
            return {
                withScope: function (scope) {
                    scopeToCompile = scope;
                    return this;
                },
                ofType: function (inputTypeAttr) {
                    //this gives you a new instance of the Ref Data for each input field
                    poInputRefData = new PoInputRefData();
                    var inputTypeProps = poInputRefData[inputTypeAttr];
                    if (!inputTypeProps && inputTypeAttr) {
                        console.warn('input type: ' + inputTypeAttr + ' not found, using default.');
                    }
                    if (!inputTypeProps || !inputTypeAttr) {
                        inputTemplateType = 'default';
                        inputTemplateTypeProps = poInputRefData.default;
                    } else {
                        inputTemplateType = inputTypeAttr;
                        inputTemplateTypeProps = inputTypeProps;
                    }
                    return this;
                },
                withBaseInputEl: function (el) {
                    baseInputEl = el;
                    return this;
                },
                withAttr: function (attrKey, attrValue) {
                    baseInputAddAttrs[attrKey] = attrValue;
                    return this;
                },
                withoutAttr: function (attrKey) {
                    baseInputRemoveAttrs.push(attrKey);
                    return this;
                },
                withDefaultPlaceholder: function (placeholder) {
                    return this.setDefaultAttr('placeholder', placeholder);
                },
                setDefaultAttr: function (attrKey, attrValue) {
                    return this.withAttr(attrKey, baseInputEl.attr(attrKey) || attrValue);
                },
                withRequired: function () {
                    return this.withAttr('ng-required', '\'true\'');
                },
                withPattern: function (pattern) {
                    return this.withAttr('ng-pattern', pattern);
                },
                addClass: function (clazz) {
                    baseInputEl.addClass(clazz);
                    return this;
                },
                buildType: function () {
                    var attributes = {};
                    angular.copy(inputTemplateTypeProps.attributes, attributes);
                    attributes = attributes || {};
                    if (attributes.class) {
                        attributes.class.split(/\s+/).forEach(this.addClass);
                        scopeToCompile.hadClasses = ((scopeToCompile && scopeToCompile.hadClasses && (scopeToCompile.hadClasses + ' ') || '') + attributes.class);
                        delete attributes.class;
                    }
                    for (var attrKey in attributes) {
                        this.withAttr(attrKey, attributes[attrKey]);
                    }
                    if (inputTemplateType !== 'default') {
                        scopeToCompile.ngRequired =  attributes['ng-required'] || false;
                    }
                    return this.withDefaultPlaceholder(inputTemplateTypeProps.default && inputTemplateTypeProps.default.placeholder);
                },
                compile: function () {
                    if (!baseInputEl) {
                        throw new Error('baseInputEl not provided');
                    }
                    if (!scopeToCompile.ngModelString) {
                        console.error('input directives and po-input must use ng-model');
                    }

                    //name for input is used by controller and needs a value.
                    scopeToCompile.name = scopeToCompile.name || scopeToCompile.ngModelString;

                    scopeToCompile.hadClasses = scopeToCompile.class && scopeToCompile.class.split(/\s+/).join(' ').trim();
                    this.buildType()
                        .withoutAttr('po-input')
                        .addClass('po-input')
                        .withAttr('po-input-processed', inputTemplateTypeProps.type || '')
                        .setDefaultAttr('name', scopeToCompile.ngModelString);

                    for (var attrKey in baseInputAddAttrs) {
                        baseInputEl.attr(attrKey, baseInputAddAttrs[attrKey]);
                    }

                    baseInputRemoveAttrs.forEach(function (attrKey) {
                        baseInputEl.removeAttr(attrKey);
                    });

                    //Replace default error messages with any provided
                    scopeToCompile.errors = inputTemplateTypeProps.defaultErrors;
                    scopeToCompile.errorJustAdded = [];
                    if(scopeToCompile.errors) {
                        for (var i = 0; i < scopeToCompile.errors.length; i++) {
                            for (var j = 0; j < poInputRefData.failureTypes.length; j++) {
                                var failureType = poInputRefData.failureTypes[j];
                                if (Object.keys(scopeToCompile.errors[i])[0] === failureType && scopeToCompile[failureType + 'ErrorObj']) {
                                    scopeToCompile.errors[i][failureType] = scopeToCompile[failureType + 'ErrorObj'];
                                }
                            }
                        }
                    }

                    baseInputEl.wrap('<po-input-transclude po-input-type="{{poInput}}" po-had-classes="{{hadClasses}}" name="{{name || nameDefault}}" ' +
                        'po-label="poLabel" po-errors="errors" po-error-just-added="errorJustAdded" po-required="ngRequired"></po-input-transclude>');
                    // default the label
                    scopeToCompile.poLabel = scopeToCompile.poLabel || (inputTemplateTypeProps.default && inputTemplateTypeProps.default.poLabel);

                    $compile(baseInputEl.parent())(scopeToCompile);
                }
            };
        }

        return {
            terminal: true,
            priority: 1010,
            scope: {
                name: '@',
                poLabel: '=',
                poInput: '@',
                ngModelString: '@ngModel',
                class: '@',
                ngRequired: '=',
                requiredErrorObj: '=',
                patternErrorObj: '='
            },
            link: function (scope, el) {
                // add to scope details needed by transcluder poLabel and name to parent scope for access in the po-input-transclude
                var scopeToCompileWith = scope.$parent.$new();
                scopeToCompileWith.poLabel = scope.poLabel;
                scopeToCompileWith.name = scope.name;
                scopeToCompileWith.ngModelString = scope.ngModelString;
                scopeToCompileWith.class = scope.class;
                scopeToCompileWith.ngRequired = scope.ngRequired || false;
                scopeToCompileWith.poInput = scope.poInput;
                scopeToCompileWith.requiredErrorObj = scope.requiredErrorObj;
                scopeToCompileWith.patternErrorObj = scope.patternErrorObj;
                poInputTemplateElCompilerBuilder()
                    .withBaseInputEl(el)
                    .withScope(scopeToCompileWith)
                    .ofType(scope.poInput)
                    .compile();
            }
        };
    })

    .directive('poInputTransclude', ['poErrorHandler', function (poErrorHandler) {
        return {
            transclude: true,
            scope: {
                poLabel: '=',
                inputName: '@name',
                poHadClasses: '@',
                poRequired: '=',
                poErrors: '=',
                poRequiredErrorObj: '=',
                poPatternErrorObj: '=',
                poErrorJustAdded: '='
            },
            templateUrl: 'input/templates/input-wrapper-template.html', //'src/inputs/templates/input-wrapper-template.html',
            require: '^form',
            controller: 'PoInputValidatorCtrl',
            link: function (scope, el, attrs, ctrl) {
                scope.form = ctrl;
                // set name to default if not provided. must do this again here because scope is already provided to controller
                // before compile step.
                scope.inputName = scope.inputName || scope.defaultInputName;
                scope.input = scope.form && scope.form[scope.inputName];

                scope.$watchGroup([function () {
                        return scope.input.$valid;
                    }, function () {
                        return scope.input.$touched;
                    }, function () {
                        return Object.keys(scope.input.$error)[0];
                    }],
                    function () {
                        if(scope.poErrors) {
                            if (scope.input.$valid === false && scope.input.$touched === true) {
                                //if error already exists, first remove that error
                                if (scope.poErrorJustAdded.length === 1) {
                                    for (var j = 0; j < poErrorHandler.length; j++) {
                                        var comparisonObj1 = poErrorHandler.getErrorArray()[j];
                                        var comparisonObj2 = scope.poErrorJustAdded[0];
                                        if ((comparisonObj1.type === comparisonObj2.type)
                                            && (comparisonObj1.message === comparisonObj2.message)
                                            && (comparisonObj1.timestamp === comparisonObj2.timestamp)) {
                                            poErrorHandler.removeError(j);
                                            scope.poErrorJustAdded = [];
                                            break;
                                        }
                                    }
                                }

                                var validatorThatFailed = Object.keys(scope.input.$error)[0];
                                //Find error object for current error type
                                for (var i = 0; i < scope.poErrors.length; i++) {
                                    if (Object.keys(scope.poErrors[i])[0] === validatorThatFailed) {
                                        var currentErrorRow = scope.poErrors[i];
                                        var currentErrorObj = currentErrorRow[validatorThatFailed];

                                        //if the error object provided is blank, suppress the error
                                        if (currentErrorObj.type === '' && currentErrorObj.message === '') {
                                            //do nothing
                                        }
                                        else {
                                            poErrorHandler.addError(currentErrorObj.type, currentErrorObj.message);
                                            scope.poErrorJustAdded.push(poErrorHandler.getMostRecentError());
                                        }
                                        break;
                                    }
                                }
                            }
                            else if (scope.input.$valid === true && scope.poErrorJustAdded.length > 0) {
                                for (var k = 0; k < poErrorHandler.length; k++) {
                                    var comparison1 = poErrorHandler.getErrorArray()[k];
                                    var comparison2 = scope.poErrorJustAdded[0];
                                    if ((comparison1.type === comparison2.type) && (comparison1.message === comparison2.message) && (comparison1.timestamp === comparison2.timestamp)) {
                                        poErrorHandler.removeError(k);
                                        scope.poErrorJustAdded = [];
                                        break;
                                    }
                                }
                            }
                        }
                    });
            }
        };
    }])

    .controller('PoInputValidatorCtrl', function ($scope) {

        function hasValidators(input) {
            return Object.getOwnPropertyNames(input.$validators).length > 0;
        }

        $scope.displayValid = function () {

            return $scope.input && $scope.input.$valid && $scope.poRequired && true || false;
        };
        $scope.displayInvalid = function () {
            //TODO need to handle when making invalid, then resetting and clicking away then back on the form

            return $scope.input && $scope.input.$invalid && $scope.input.$touched && ($scope.poRequired || (hasValidators($scope.input))) && true || false;
        };
    });

var openFuncNameErm = 'openErm';
angular.module('po.modals', [])

/****************************************************************************
 *                            ERROR MODAL                                    *
 ****************************************************************************/

    .directive('poErrorModal', function ($compile) {
        var openFuncNameErm = 'openErm';
        return {
            controller: 'ErmModalCtrl',
            scope: {
                title: '=',
                errorList: '='
            },
            transclude: true,
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.removeAttr('po-error-modal'); // necessary to avoid infinite compile loop
                var ngClick;
                if (attrs.before) {
                    ngClick = attrs.ngClick ? openFuncNameErm + '()' + '; ' + attrs.ngClick : openFuncNameErm + '()';
                }
                else {
                    ngClick = attrs.ngClick ? attrs.ngClick + '; ' + openFuncNameErm + '()' : openFuncNameErm + '()';
                }
                element.attr('ng-click', ngClick);
                $compile(element[0])(scope);
            }
        };
    })
    .directive('poAlertPanel',['poErrorHandler', function(poErrorHandler) {
        return {
            controller: 'ErmModalCtrl',
            restrict: 'EA',
            scope: {},
            template: '<div ng-include="getTemplateUrl()" class="generic-notif-container" ng-click="openErm()"></div>',
            transclude: true,
            link: function(scope) {
                scope.$watch(poErrorHandler.getMostRecentError, function(errorReceived) {
                    scope.getTemplateUrl = function() {
                        scope.mostRecentError = errorReceived;
                        if (errorReceived.type === 'Alert') {
                            scope.error = errorReceived.message;
                            return 'panel/templates/error-alert.html';
                        }
                        else if (errorReceived.type === 'Info') {
                            scope.info = errorReceived.message;
                            return 'panel/templates/info-alert.html';
                        }
                        else {
                            return '';
                        }
                    };
                    scope.messageOverflow = poErrorHandler.getMessageOverflow();
                }, true);
                scope.$watch(poErrorHandler.getNumNotifications, function(num) {
                    scope.numNotifications = num;
                });
            }
        };
    }])
    .controller('ErmModalCtrl', ['poErrorHandler', '$scope', '$modal', function (poErrorHandler, $scope, $modal) {
        $scope.errorModal = {
            title: 'Notifications',
            errorList: []
        };
        $scope.mostRecentError = poErrorHandler.getMostRecentError();
        $scope.messageOverflow = poErrorHandler.getMessageOverflow();
        $scope.numNotifications = poErrorHandler.getNumNotifications();
        $scope.errorModal.errorList = poErrorHandler;
        $scope[openFuncNameErm] = function () {
            $scope.$parent.erm = {checkbox: false};
            $modal.open({
                animation: false,
                templateUrl: 'modal/templates/error-modal.html',
                scope: $scope,
                controller: 'ErmModalInstanceCtrl',
                size: 'lg',
                backdrop: 'static'
            });
        };
    }])
    .controller('ErmModalInstanceCtrl', ['poErrorHandler', '$scope', '$modalInstance', function (poErrorHandler, $scope, $modalInstance) {
        $scope.close = function () {
            $modalInstance.close(true);
        };
        $scope.closeError = function(error) {
            var index=$scope.errorModal.errorList.indexOf(error);
            if($scope.errorModal.errorList.length===1){
                $scope.errorModal.errorList.splice(index, 1);
                poErrorHandler.generateMostRecentError();
                $scope.close();
            }
            $scope.errorModal.errorList.splice(index, 1);
            poErrorHandler.generateMostRecentError();
        };
    }])
    .factory('poErrorHandler', function () {
        var errorArray = [];
        var mostRecentError = {
            type: '', message: '', timestamp: ''
        };
        var messageOverflow = false;
        var characterLimit = 70;

        function compareObjs(a, b) {
            if (a.type === "Alert" && b.type === "Info") {
                return -1;
            }
            else if (a.type === "Info" && b.type === "Alert") {
                return 1;
            }
            else {
                if (a.timestamp > b.timestamp) {
                    return -1;
                }
                else if (a.timestamp < b.timestamp) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
        }

        errorArray.addError = function (type, message) {
            var timestamp = Date.now();
            errorArray.push({type: type, message: message, timestamp: timestamp});
            errorArray.sort(compareObjs);
            errorArray.generateMostRecentError();
        };
        errorArray.removeError = function (index) {
            if (errorArray.length >= index) {
                errorArray.splice(index, 1);
            }
            errorArray.generateMostRecentError();
        };
        errorArray.clearArray = function () {
            errorArray = [];
        };
        errorArray.setCharacterLimit = function (limit) {
            characterLimit = limit;
        };
        errorArray.generateMostRecentError = function () {
            if (errorArray[0] != null) {
                if (errorArray[0].message.length > characterLimit) {
                    mostRecentError.message = errorArray[0].message.slice(0, characterLimit - 7) + "...";
                    messageOverflow = true;
                } else {
                    mostRecentError.message = errorArray[0].message;
                    messageOverflow = false;
                }
                mostRecentError.type = errorArray[0].type;
                mostRecentError.timestamp = errorArray[0].timestamp;
            }
            else {
                mostRecentError = {
                    type: '', message: '', timestamp: ''
                };
            }
        };
        errorArray.getMessageOverflow = function () {
            return messageOverflow;
        };
        errorArray.getMostRecentError = function () {
            return mostRecentError;
        };
        errorArray.getNumNotifications = function () {
            return errorArray.length;
        };
        errorArray.getErrorArray = function () {
            return errorArray;
        };
        return errorArray;
    });

angular.module("mdalton456.mdd-input-error-framework").run(["$templateCache", function($templateCache) {$templateCache.put("input/templates/input-wrapper-template.html","<div><div class=\"po-label\">{{poLabel || poLabelDefault}}</div><div class=\"po-relative-input {{inputName}}\" ng-class=\"{\'po-valid\':displayValid(), \'po-invalid\': displayInvalid()}\" po-had-classes=\"{{poHadClasses}}\"><ng-transclude></ng-transclude><div class=\"po-input-validate-icon-relative\"><span class=\"po-input-validate-icon\"></span></div></div></div>");
$templateCache.put("panel/templates/error-alert.html","<div class=\"po-alert error\" ng-show=\"error\"><div class=\"alert-icon\"><img src=\"../dist/assets/error.png\" class=\"img-responsive\"></div><div class=\"alert-text\"><p>{{error}}</p></div><div ng-show=\"numNotifications>1\" class=\"error-notif-num\">{{numNotifications}}</div><div ng-show=\"messageOverflow\" class=\"error-more-icon\">more</div></div>");
$templateCache.put("panel/templates/info-alert.html","<div class=\"po-alert info\" ng-show=\"info\"><div class=\"alert-icon\"><img src=\"../dist/assets/info.png\" class=\"img-responsive\"></div><div class=\"alert-text\"><p>{{info}}</p></div><div ng-show=\"numNotifications>1\" class=\"info-notif-num\">{{numNotifications}}</div><div ng-show=\"messageOverflow\" class=\"info-more-icon\">more</div></div>");
$templateCache.put("modal/templates/error-modal.html","<div class=\"erm-modal container-fluid\"><div class=\"row\"><div class=\"col-xs-12 banner\"><a class=\"navbar-brand po-cross-link\" href=\"\" ng-click=\"close()\"><img class=\"po-cross\" src=\"../dist/assets/cross.png\" alt=\"close\"></a><h1 ng-bind=\"errorModal.title\"></h1></div></div><div class=\"row\"><div class=\"error-container col-xs-12\"><div ng-repeat=\"error in errorModal.errorList\" class=\"notif-row-background\"><div class=\"error-row row\" ng-class=\"error.type+\'-row\'\"><div class=\"error-value-col\"><p class=\"error-value no-margin\">{{error.message}}</p></div><div class=\"po-cross-link\" id=\"{{\'error\'+$index}}\"><a ng-if=\"error.type!=\'Alert\'\" href=\"\" ng-click=\"closeError(error)\"><img class=\"po-cross\" src=\"../dist/assets/black-cross.png\" alt=\"close\"></a></div></div></div></div></div></div>");}]);