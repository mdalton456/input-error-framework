function validateMinDate(modelValue, minDate) {
    'use strict';
    return modelValue > minDate;
}

function validateMaxDate(modelValue, maxDate) {
    'use strict';
    return modelValue < maxDate;
}

angular.module('po.input')

/****************************************************************************
 *                                   INPUT                                   *
 ****************************************************************************/

    .directive('poInput', function ($compile, PoInputRefData) {
        'use strict';

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
        'use strict';
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
            templateUrl: 'src/inputs/templates/input-wrapper-template.html',
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
                                    if ((comparisonObj1.type === comparisonObj2.type) && (comparisonObj1.message === comparisonObj2.message) && (comparisonObj1.timestamp === comparisonObj2.timestamp)) {
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
        'use strict';
        
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
    })

/****************************************************************************
 *                              SELECT INPUT                                *
 ****************************************************************************/

    .directive('poSelectInput', function () {
        'use strict';
        return {
            templateUrl: 'src/inputs/templates/select-input.html',
            restrict: 'EA',
            scope: {
                list: '=',
                poLabel: '=',
                poSelectOptions: '=',
                ngRequired: '=',
                poPlaceholder: '=',
                ngDisabled: '='
            },
            require: '?ngModel',
            replace: true,
            link: function (scope, elm, attr, ctrl) {

                scope.ngModelCtrl = ctrl;
                scope.optionCollection = [];

                scope.poPlaceholder = scope.poPlaceholder === '' ? undefined : scope.poPlaceholder;

                scope.$watch('list', function( newValue, oldValue ) {
                    if(newValue && oldValue && newValue !== oldValue) {
                        scope.ngModelCtrl.$setViewValue(scope.poPlaceholder);
                        scope.optionCollection = newValue.map(function (item) {
                            return {
                                'viewValue': item,
                                'modelValue': item
                            };
                        });
                    }
                });

                scope.$watch('poSelectOptions', function( newValue, oldValue ) {
                    if(newValue && oldValue && newValue !== oldValue) {
                        scope.optionCollection = [];
                        scope.ngModelCtrl.$setViewValue(scope.poPlaceholder);
                        for (var modelVal in scope.poSelectOptions) {
                            scope.optionCollection.push({
                                viewValue: scope.poSelectOptions[modelVal],
                                modelValue: modelVal
                            });
                        }
                    }
                });

                function getViewValue(modelValue) {
                    var viewValue = '';
                    if (scope.ngModelCtrl.$dirty || scope.poPlaceholder === '' || scope.poPlaceholder === undefined) {
                        scope.optionCollection.some(function (option) {
                            if (option.modelValue === modelValue) {
                                viewValue = option.viewValue;
                                return true;
                            }
                        });
                    } else if ((scope.poPlaceholder !== '' || scope.poPlaceholder !== undefined) && scope.ngModelCtrl.$pristine) {
                        viewValue = scope.poPlaceholder;
                    }
                    return viewValue;
                }

                function getModelValue(viewValue) {
                    var modelValue = '';
                    if (scope.ngModelCtrl.$dirty || scope.poPlaceholder === '' || scope.poPlaceholder === undefined) {
                        scope.optionCollection.some(function (option) {
                            if (option.viewValue === viewValue) {
                                modelValue = option.modelValue;
                                return true;
                            }
                        });
                    }
                    return modelValue;
                }


                scope.ngModelCtrl.$validators.inCollection = function (modelValue, viewValue) {
                    return !modelValue || !viewValue || getViewValue(modelValue) && getModelValue(viewValue);
                };


                //format text going to user (model to view)
                scope.ngModelCtrl.$formatters.push(function (modelValue) {
                    return getViewValue(modelValue);
                });

                //format text from the user (view to model)
                scope.ngModelCtrl.$parsers.push(function (viewValue) {
                    return getModelValue(viewValue);
                });

                if (scope.poSelectOptions) {
                    for (var modelVal in scope.poSelectOptions) {
                        scope.optionCollection.push({
                            viewValue: scope.poSelectOptions[modelVal],
                            modelValue: modelVal
                        });
                    }
                } else {
                    scope.optionCollection = scope.list.map(function (item) {
                        return {
                            'viewValue': item,
                            'modelValue': item
                        };
                    });
                }

                if (scope.$parent.selectBoxItems !== undefined && scope.ngModelCtrl !== undefined && scope.list !== undefined) {
                    if (scope.ngModelCtrl.$dirty || scope.poPlaceholder === '' || scope.poPlaceholder === undefined) {
                        scope.ngModel = scope.list[0];
                    }
                }

            },
            controller: function ($scope) {
                $scope.selectedOptionViewValue = $scope.ngModelCtrl && $scope.ngModelCtrl.$viewValue;
                $scope.select = function (option) {
                    $scope.ngModelCtrl.$setViewValue(option.viewValue);
                };
            }
        };
    })

/****************************************************************************
 *                               TEXT AREA                                  *
 ****************************************************************************/

    .directive('poTextArea', function () {
        'use strict';
        return {
            templateUrl: 'src/inputs/templates/text-area.html',
            restrict: 'EA',
            scope: {
                label: '=',
                ngModel: '=',
                placeholder: '=',
                rows: '='
            }
        };
    })

/****************************************************************************
 *                           MANUAL DATE INPUT                              *
 ****************************************************************************/

    .directive('poManualDateInput', function ($compile, $templateCache) {
        'use strict';
        return {
            restrict: 'EA',
            scope: {
                poLabel: '=',
                ngModel: '=',
                minDate: '=',
                maxDate: '=',
                minDateErrorObj: '=',
                maxDateErrorObj: '=',
                ngDisabled: '=',
                ngRequired: '=',
                name: '@',
                defaultName: '@ngModel'
            },
            link: function (scope, el) {
                scope.ngRequired = scope.ngRequired || false;
                var replacerTemplateEl = angular.element($templateCache.get('src/inputs/templates/date-input.html'));
                el.replaceWith(replacerTemplateEl);
                $compile(replacerTemplateEl)(scope);
            },
            controller: 'poManualDateInputCtrl'
        };
    })

    .controller('poManualDateInputCtrl', ['$scope', function ($scope) {
        'use strict';
        $scope.errorJustAdded = [];
    }])

    .directive('checkDate', function () {
        'use strict';
        var dateRegex = /^(?:(?:31(\s-\s)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\s-\s)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\s-\s)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\s-\s)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/i;

        return {
            require: 'ngModel',
            scope: {
                minDate: '=',
                maxDate: '='
            },
            restrict: '',
            link: function (scope, elm, attrs, ctrl) {
                // only apply the validator if ngModel is present and Angular has added validators
                if (ctrl && ctrl.$validators) {
                    // let ngRequired deal with empties in validators
                    ctrl.$validators.testDate = function () {
                        return !ctrl.$viewValue || dateRegex.test(ctrl.$viewValue);
                    };

                    if (scope.minDate !== undefined) {
                        ctrl.$validators.minDate = function (modelValue) {
                            return !ctrl.$viewValue || validateMinDate(modelValue, scope.minDate);
                        };
                    }

                    if (scope.maxDate !== undefined) {
                        ctrl.$validators.maxDate = function (modelValue) {
                            return !ctrl.$viewValue || validateMaxDate(modelValue, scope.maxDate);
                        };
                    }
                }
            }
        };
    })

    .directive('formatDate', ['poErrorHandler', function (poErrorHandler) {
        'use strict';
        return {
            require: 'ngModel',
            priority: 101,
            restrict: '',
            link: function (scope, element, attr, ngModelCtrl) {

                //Only way we found so far to reset the ngModel to null (might be due to isolated scopes or could be a ui-mask side effect)
                scope.$watch('$parent.$parent.ngModel', function(newValue) {
                    if (newValue === null) {
                        scope.ngModel = null;
                    }
                });

                var getModelValue = function (viewValue) {
                    var modelValue = NaN;
                    if (viewValue.length === 8) {
                        var day = viewValue.substr(0, 2);
                        var month = viewValue.substr(2, 2);
                        var year = viewValue.substr(4, 4);
                        modelValue = new Date(year + '-' + month + '-' + day);

                        ngModelCtrl.$validate();
                        if (ngModelCtrl.$valid !== scope.inputIsValid) {
                            //validity has changed
                            if (ngModelCtrl.$valid === false) {
                                if (modelValue <= scope.$parent.$parent.minDate) {
                                    poErrorHandler.addError(scope.$parent.$parent.minDateErrorObj.type, scope.$parent.$parent.minDateErrorObj.message);
                                    scope.$parent.$parent.errorJustAdded.push(poErrorHandler.getMostRecentError());
                                }
                                if (modelValue >= scope.$parent.$parent.maxDate) {
                                    poErrorHandler.addError(scope.$parent.$parent.maxDateErrorObj.type, scope.$parent.$parent.maxDateErrorObj.message);
                                    scope.$parent.$parent.errorJustAdded.push(poErrorHandler.getMostRecentError());
                                }
                            }
                            else if (ngModelCtrl.$valid === true) {
                                for (var i = 0; i < poErrorHandler.length; i++) {
                                    var comparisonObj1 = poErrorHandler.getErrorArray()[i];
                                    var comparisonObj2 = scope.$parent.$parent.errorJustAdded[0];
                                    if ((comparisonObj1.type === comparisonObj2.type) && (comparisonObj1.message === comparisonObj2.message) && (comparisonObj1.timestamp === comparisonObj2.timestamp)) {
                                        poErrorHandler.removeError(i);
                                    }
                                }
                            }
                        }
                        scope.inputIsValid = ngModelCtrl.$valid;
                        //Due to isolated scopes, referencing grandparent scope for ngModel using $parent, which should not cause issue as directive is not exposed and will only be used in the single given structure
                        if (ngModelCtrl.$valid) {
                            scope.$parent.$parent.ngModel = modelValue;
                        }
                    }
                    return modelValue;
                };

                var getViewValue = function (modelValue) {
                    var viewValue = '';
                    if (modelValue instanceof Date){
                        var day = modelValue.getDate();
                        var month = modelValue.getMonth();
                        var year = modelValue.getFullYear();

                        month = month + 1;

                        if (day < 10) {
                            day = '0' + day;
                        }

                        if (month < 10) {
                            month = '0' + month;
                        }
                        viewValue = day + ' - ' + month + ' - ' + year;
                    }
                    return viewValue;
                };

                ngModelCtrl.$formatters.push(function myFormatter(value) {
                    return getViewValue(value);
                });

                ngModelCtrl.$parsers.push(function myParser(value) {
                    return getModelValue(value);
                });

                //reset the model if it is not valid
                ngModelCtrl.$viewChangeListeners.push(function() {
                    if(!ngModelCtrl.$valid){
                        scope.$parent.$parent.ngModel = undefined;
                    }
                });
            }
        };
    }])


/****************************************************************************
 *                       MANUAL ADDRESS INPUT (OPTIONAL)                    *
 ****************************************************************************/

    .directive('poManualAddressInput', function () {
        'use strict';
        return {
            templateUrl: 'src/inputs/templates/manual-address-input-optional.html',
            restrict: 'E',
            scope: {
                ngModel: '='
            }
        };
    })

/****************************************************************************
 *                      MANUAL ADDRESS INPUT (REQUIRED)                     *
 ****************************************************************************/

    .directive('poManualAddressInputRequired', function () {
        'use strict';
        return {
            templateUrl: 'src/inputs/templates/manual-address-input-required.html',
            restrict: 'E',
            scope: {
                ngModel: '=',
            }
        };
    })

/****************************************************************************
 *                            TOGGLE BUTTON SELECT                           *
 ****************************************************************************/

    .directive('poToggleButtonSelect', function () {
        'use strict';
        return {
            templateUrl: 'src/inputs/templates/toggle-button-select.html',
            restrict: 'E',
            scope: {
                toggleButtonItems: '=',
                toggleButtonItemsOpts: '=',
                ngModel: '=',
                poLabel: '=',
                column: '='
            },
            controller: 'PoToggleButtonCtrl',
            require: 'ngModel',
            link: function (scope, elm, attr, ctrl) {

                scope.ngModelCtrl = ctrl;
                scope.optionCollection = [];

                function getViewValue(modelValue) {
                    var viewValue = '';
                    scope.optionCollection.some(function (option) {
                        if (option.modelValue === modelValue) {
                            viewValue = option.viewValue;
                            return true;
                        }
                    });
                    return viewValue;
                }

                function getModelValue(viewValue) {
                    var modelValue = '';
                    scope.optionCollection.some(function (option) {
                        if (option.viewValue === viewValue) {
                            modelValue = option.modelValue;
                            return true;
                        }
                    });
                    return modelValue;
                }


                scope.ngModelCtrl.$validators.inCollection = function (modelValue, viewValue) {
                    return !modelValue || !viewValue || getViewValue(modelValue) && getModelValue(viewValue);
                };


                //format text going to user (model to view)
                scope.ngModelCtrl.$formatters.push(function (modelValue) {
                    return getViewValue(modelValue);
                });

                //format text from the user (view to model)
                scope.ngModelCtrl.$parsers.push(function (viewValue) {
                    return getModelValue(viewValue);
                });

                if (scope.toggleButtonItemsOpts) {
                    scope.optionCollection = scope.toggleButtonItemsOpts.map(function (option) {
                        return {
                            viewValue: option.view,
                            modelValue: option.model
                        };
                    });
                } else {
                    scope.optionCollection = scope.toggleButtonItems.map(function (item) {
                        return {
                            viewValue: item,
                            modelValue: item
                        };
                    });
                }

                 scope.$watch('column', function (n) {
                    var isNumber = new RegExp('^[0-9]*$').test(n);
                    if (typeof n !== 'undefined' && n !== '' && ((isNumber && (parseInt(n) < 1 || parseInt(n) > 12)) || !isNumber)) {
                        throw new TypeError('Column should be a number between 1 and 12 included');

                    } else if (typeof n === 'undefined' || n === '') {
                        scope.internatColumn = 12;
                    } else {
                        scope.internatColumn = parseInt(n);
                    }
                    var nbLines = Math.ceil(scope.optionCollection.length / scope.internatColumn);
                    scope.lines = new Array(nbLines);
                });

                scope.sliceArray = function (line) {
                    return scope.optionCollection.slice(parseInt(line) * scope.internatColumn, parseInt(line) * scope.internatColumn + (scope.internatColumn));
                };
            }
        };
    })

    .controller('PoToggleButtonCtrl', ['$scope', function ($scope) {
        'use strict';

        $scope.internatColumn = 12;

        if (!!$scope.toggleButtonItems && !!$scope.toggleButtonItemsOpts) {
            throw new TypeError('toggleButtonItems and toggleButtonItemsOpts can\'t be set simultaneously ');
        }

        $scope.numBtnsClass = function () {
            return 'num-buttons-' + Math.min($scope.internatColumn, $scope.optionCollection && $scope.optionCollection.length);
        };

        $scope.select = function (option) {
            $scope.ngModelCtrl.$setViewValue(option.viewValue);
        };
        $scope.isSelected = function (option) {
            return option.viewValue === $scope.ngModelCtrl.$viewValue;
        };
    }]);