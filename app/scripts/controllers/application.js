'use strict';

/**
 * @ngdoc function
 * @name easterdashApp.controller:ApplicationCtrl
 * @description
 * # ApplicationCtrl
 * Controller of the easterdashApp
 */
angular.module('easterdashApp').controller('ApplicationCtrl', function ($scope, $location, appSettings) {
    $scope.saveAppSettings = function(saveThis) {
      appSettings.save(saveThis);
      $scope.settings = saveThis;
      $scope.modals.setup.visible = false;
    };
    $scope.clearAppSettings = function(saveThis) {
      appSettings.clearSettings();
      $scope.settings = {};
      $scope.modals.setup.visible = false;
    };
    $scope.isActive = function (viewLocation) {
         var active = (viewLocation === $location.path());
         return active;
    };
    $scope.showModal = function(id) {
        if (!$scope.modals[id]) {
          return;
        }
        angular.forEach($scope.modals, function(modal) {
            modal.visible = false;
        });

        $scope.modals[id].visible = true;
    };

    $scope.modals = {setup:{visible: false}};
    $scope.settings = {};
    appSettings.get().then(function(response) {
      $scope.settings = response;
    });
});
