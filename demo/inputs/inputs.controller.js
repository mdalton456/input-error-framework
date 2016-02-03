'use strict';

angular.module('demo')
  .controller('PoInputsCtrl', function ($scope) {
        $scope.postCodeReqErrorObj = {type: 'Alert', message: 'Please enter a Postcode in this box [Custom override example]'};
        $scope.postCodeBlankPatternErrorObj = {type: '', message: ''};
        $scope.postCodePatternErrorObj = {type: 'Alert', message: 'This postcode is not in the correct valid UK format [Custom override example]'};

        $scope.manualAddressModel = {};
        $scope.manualAddressRequiredModel = {};
        $scope.licenceeForenameLabel = "licencee forename";
        $scope.licenceeForenamePlaceholder = "Licencee Forename";

        $scope.minDateErrorObj = {
            type: 'Alert',
            message: 'Please choose a more recent date'
        };
        $scope.maxDateErrorObj = {
            type: 'Alert',
            message: 'Please choose an older date'
        };

        $scope.model = {};
    });
