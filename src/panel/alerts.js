'use strict';
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


