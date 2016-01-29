/*!
 * angular-directive-boilerplate
 * 
 * Version: 0.0.5 - 2014-10-06T04:21:35.698Z
 * License: MIT
 */


'use strict';

angular.module('mdalton456.mdd-notification-panel', []).directive('mddNotificationPanel', function () {
  var value = 0;

  return {
    restrict: 'AE',
    templateUrl: 'mdd-notification-panel.html',
    replcae: true,
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
angular.module("mdalton456.mdd-notification-panel").run(["$templateCache", function($templateCache) {$templateCache.put("mdd-notification-panel.html","<div class=\"mdd-notification-panel\"><div>The value is {{getValue()}}</div><button ng-click=\"increment()\">+</button></div>");}]);