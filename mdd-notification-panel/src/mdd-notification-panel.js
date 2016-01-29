'use strict';

angular.module('mdalton456.mdd-notification-panel', []).directive('mddNotificationPanel', function () {
  var value = 0;

  return {
    restrict: 'AE',
    templateUrl: 'mdd-notification-panel.html',
    replace: true,
    link: function ($scope) {

      $scope.getValue = function () {
        return value;
      };
      $scope.increment = function () {
        value++;
      };
    }
  };
});