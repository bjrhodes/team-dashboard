'use strict';

/**
 * @ngdoc function
 * @name easterdashApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the easterdashApp
 */
angular.module('easterdashApp')
  .controller('MainCtrl', function ($scope, teamDb) {
    $scope.awesomeThings = [
      {name: 'Team #A', description: 'Doing some awesome stuff an\' that!'},
      {name: 'Team #2', description: 'Doing some awesome stuff an\' that!'},
      {name: 'Team #III', description: 'Doing some awesome stuff an\' that!'},
      {name: 'Team #Ω', description: 'Doing some awesome stuff an\' that!'}
    ];

    teamDb.get('thing1')
      .then(function(response) {
        $scope.response = response;
        $scope.loading = false;
      })
      .catch(function(response) {
        $scope.loading = false;
        $scope.response = response;
      });
  });
