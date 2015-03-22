'use strict';

/**
 * @ngdoc function
 * @name easterdashApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the easterdashApp
 */
angular.module('easterdashApp').controller('MainCtrl', function ($scope, teamDb) {
    var dbError = function(response) {
        $scope.loading = false;
        $scope.response = response;
    };
    var buildGraphs = function() {
        $scope.teamTotals = {labels: [], data: [[]]};

        $scope.teams.forEach(function(team) {
            $scope.teamTotals.labels.push(team.name);
            $scope.teamTotals.data[0].push(team.balance); // The chart allows for multiple plots, so we needd to nest

            team.history = {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                series: ['Series A', 'Series B'],
                data: [
                    [65, 59, 80, 81, 56, 55, 40],
                    [28, 48, 40, 19, 86, 27, 90]
                ]
            };
        });

        $scope.graphsReady = true;
    };

    $scope.teams = [];
    $scope.graphsReady = false;
    $scope.debug = false;

    teamDb.get('teams')
        .then(function(response) {
            $scope.response = response;
            if (response.data) {
                $scope.loading = false;
                $scope.teams = response.data;
                buildGraphs();
            } else {
                dbError(response);
            }
        })
        .catch(dbError);
});
