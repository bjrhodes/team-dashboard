'use strict';

/**
 * @ngdoc function
 * @name easterdashApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the easterdashApp
 */
angular.module('easterdashApp')
  .controller('MainCtrl', function ($scope, $http) {

    function createUnknownError(status) {
      return {
        status: status,
        statusText: 'Internal Server Error',
        description: 'No details available'
      };
    }

    $scope.awesomeThings = [
      {name: "Team #A", description: "Doing some awesome stuff an' that!"},
      {name: "Team #2", description: "Doing some awesome stuff an' that!"},
      {name: "Team #III", description: "Doing some awesome stuff an' that!"},
      {name: "Team #Ω", description: "Doing some awesome stuff an' that!"}
    ];
    $scope.loading = false;

  });
