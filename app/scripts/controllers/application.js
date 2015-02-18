'use strict';

/**
 * @ngdoc function
 * @name easterdashApp.controller:ApplicationCtrl
 * @description
 * # ApplicationCtrl
 * Controller of the easterdashApp
 */
angular.module('easterdashApp').controller('ApplicationCtrl', function ($scope, $location) {
    $scope.isActive = function (viewLocation) {
         var active = (viewLocation === $location.path());
         return active;
    };
});
