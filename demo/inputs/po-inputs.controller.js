'use strict';

angular.module('poUiDocsApp')
  .controller('PoInputsCtrl', function ($scope) {
        $scope.postCodeReqErrorObj = {type: 'Alert', message: 'Please enter a Postcode in this box [Custom override example]'};
        $scope.postCodeBlankPatternErrorObj = {type: '', message: ''};
        $scope.postCodePatternErrorObj = {type: 'Alert', message: 'This postcode is not in the correct valid UK format [Custom override example]'};

        $scope.manualAddressModel = {};
        $scope.manualAddressRequiredModel = {};
        $scope.licenceeForenameLabel = "licencee forename";
        $scope.licenceeForenamePlaceholder = "Licencee Forename";

        /* SELECT BOX DROP DOWN - list usage*/
        $scope.model = {};
        $scope.selectBoxLabel = 'Select Fishing Licence Type';
        $scope.selectBoxItems = ['Salmon', 'Trout'];
        $scope.selectBoxPlaceholder = 'Select an option';
        $scope.model.selectBoxModel = '';

        /* SELECT BOX DROP DOWN - options usage*/
        $scope.selectOptions = {
            modelVal1: 'some label',
            modelVal2: 'some other label'
        };
        $scope.model.poSelectInputSelectOptionsModel = '';
        $scope.selectBoxLabel2 = 'Select Fishing Licence Type';

        $scope.toggleList = function(){
            $scope.selectBoxItems = $scope.selectBoxItems.map(function(value){
                return value;
            }).reverse();
        };

        $scope.toggleOptions = function(){
            $scope.selectOptions = {modelVal1: 'new label', modelVal2: 'another new label'};
        };

        /* SWITCH BOX */
        $scope.switchLabel = "Disabled License?";
        $scope.switchValue = true;

        /* SEARCH FIELD */
        $scope.searchFieldLabel = "Country of Origin";

        $scope.manualAddressPlaceholders = {
            input1: 'Country of Origin',
            input2: 'Address Line 1',
            input3: 'Address Line 2',
            input4: 'Town/City',
            input5: 'County/State',
            input6: 'Postal/Zip Code'
        };

        /* MANUAL DATE INPUT */
        $scope.manualDateLabel = 'Date of Birth';
        $scope.manualDateDisabled = false;
        //$scope.manualDateValue = new Date('2013/3/17');
        $scope.maxDate = new Date('2018/3/17');
        $scope.minDate = new Date('2000/3/17');

        $scope.clearManualDateInput = function () {
            $scope.manualDateValue = null;
        };

        $scope.dpLabel = 'Enter or pick a date';
        $scope.dpUseMinDate = false;
        $scope.dpUseMaxDate = false;
        $scope.dpUseMaxError = false;
        $scope.dpUseMinError = false;

        $scope.dpClearNgModelFn = function () {
            $scope.datePickerValue = null;
        };

        $scope.thirtyDaysAgo = new Date(Date.now() - 30 * 86400000);
        $scope.inThirtyDaysFromNow = new Date(Date.now() + 30 * 86400000);

        $scope.minDateErrorObj = {
            type: 'Alert',
            message: 'Please choose a more recent date'
        };
        $scope.maxDateErrorObj = {
            type: 'Alert',
            message: 'Please choose an older date'
        };

        /* Time input */
        $scope.advancedTimeInputLabel = 'Advanced Time';

        $scope.TextAreaLabel = 'Text Area';
        $scope.TextAreaPlaceholder = 'Enter your text here...';
        $scope.textAreaRows = 5;

        $scope.phoneInputLabel = 'Phone Number';
        $scope.phoneFieldPlaceholder = 'Enter your phone number here...';

        // NOTE: Only supports array of 2 to 5 strings
        $scope.toggleButtonLabelSimpleVersion = 'Type of Licence';
        $scope.toggleButtonItems = ['1 A','2','3','4','5','6','7','8','9','10','11','12','13'];
        $scope.toggleSelectedSimpleVersion = '';
        $scope.columnToggleSelectButtonSimpleVersion = 6;

        $scope.toggleSelectedAdvancedVersion = '';
        $scope.toggleButtonLabelAdvancedVersion = 'Type of Licence';
        $scope.toggleButtonItemsOpts = [{view:'Salmon & Sea Trout',model:'salmon'}, {view:'Non-Migratory Trout & Coarse',model:'trout'}, {view:'Upgrade',model:'upgrade'}];
        $scope.columnToggleSelectButtonAdvancedVersion = 6;

        $scope.model = {};
    });
