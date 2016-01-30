'use strict';
var openFuncName = 'openKim';
var openFuncNamePom = 'openPom';
var openFuncNameErm = 'openErm';
angular.module('po.modals')

  /****************************************************************************
   *                            KEY INFORMATION MODAL                         *
   ****************************************************************************/

  .directive('poKeyInformationModal', function ($compile) {
    var openFuncName = 'openKim';
    return {
      controller: 'KimModalCtrl',
      scope: {
        title: '=',
        keyPointsTitle: '=',
        keyPoints: '=',
        summary: '='
      },
      transclude: true,
      restrict: 'A',
      link: function (scope,element, attrs) {
        element.removeAttr('po-key-information-modal'); // necessary to avoid infinite compile loop
        var ngClick;
        if (attrs.before) {
          ngClick = attrs.ngClick ? openFuncName + '()' + '; ' + attrs.ngClick : openFuncName + '()';
        }
        else {
          ngClick = attrs.ngClick ? attrs.ngClick + '; ' + openFuncName + '()' : openFuncName + '()';
        }
        element.attr('ng-click', ngClick);
        $compile(element[0])(scope);
      }
    };
  })
  .controller('KimModalCtrl', ['$scope', '$modal', function ($scope, $modal) {
    $scope[openFuncName] = function () {
      $scope.$parent.kim = {confirmed: false};
      $modal.open({
        animation: false,
        templateUrl: 'src/modals/templates/key-information-modal.html',
        scope: $scope,
        controller: 'KimModalInstanceCtrl',
        size: 'lg',
        backdrop: 'static'
      });
    };
  }])
  .controller('KimModalInstanceCtrl', function ($scope, $modalInstance) {
    $scope.confirm = function () {
      $scope.$parent.$parent.kim = {confirmed: true};
      $modalInstance.close(true);
    };
      $scope.close = function () {
        $modalInstance.close(true);
      };
  })

/****************************************************************************
 *                            PURCHASE OVERVIEW MODAL                       *
 ****************************************************************************/

    .directive('poPurchaseOverviewModal', function ($compile) {
      var openFuncNamePom = 'openPom';
      return {
        controller: 'PomModalCtrl',
        scope: {
          title: '=',
          summaryList: '=',
          total: '=',
          submitFunction: '&'
        },
        transclude: true,
        restrict: 'A',
        link: function (scope,element, attrs) {
          element.removeAttr('po-purchase-overview-modal'); // necessary to avoid infinite compile loop
          var ngClick;
          if (attrs.before) {
            ngClick = attrs.ngClick ? openFuncNamePom + '()' + '; ' + attrs.ngClick : openFuncNamePom + '()';
          }
          else {
            ngClick = attrs.ngClick ? attrs.ngClick + '; ' + openFuncNamePom + '()' : openFuncNamePom + '()';
          }
          element.attr('ng-click', ngClick);
          $compile(element[0])(scope);
        }
      };
    })
    .controller('PomModalCtrl', ['$scope', '$modal', function ($scope, $modal) {
      $scope[openFuncNamePom] = function () {
        $scope.$parent.pom = {checkbox: false};
        $modal.open({
          animation: false,
          templateUrl: 'src/modals/templates/purchase-overview-modal.html',
          scope: $scope,
          controller: 'PomModalInstanceCtrl',
          size: 'lg',
          backdrop: 'static'
        });
      };
    }])
    .controller('PomModalInstanceCtrl', function ($scope, $modalInstance) {
      $scope.close = function () {
        $modalInstance.close(true);
      };
    })

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
                return 'src/alerts/templates/error-alert.html';
              }
              else if (errorReceived.type === 'Info') {
                scope.info = errorReceived.message;
                return 'src/alerts/templates/info-alert.html';
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
        title: 'Notification Centre',
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
          templateUrl: 'src/modals/templates/error-modal.html',
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
    }]);