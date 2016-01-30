'use strict';

angular.module('poUiDocsApp')
  .controller('ComponentsCtrl', ['poErrorHandler', '$scope', function (poErrorHandler, $scope) {
    $scope.message = 'Hello';
  }]);
