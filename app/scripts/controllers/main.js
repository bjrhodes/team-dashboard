'use strict';

/**
 * @ngdoc function
 * @name easterdashApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the easterdashApp
 */
angular.module('easterdashApp').controller('MainCtrl', function ($scope, teamDb) {
    var buildGraphs = function() {
        $scope.teamTotals = {labels: [], data: [[]]};

        $scope.teams.forEach(function(team) {
            $scope.teamTotals.labels.push(team.name);
            $scope.teamTotals.data[0].push(team.currentBalance); // The chart allows for multiple plots, so we needd to nest

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

    teamDb.get('thing1')
        .then(function(response) {
            $scope.response = response;
            $scope.loading = false;
            $scope.teams = [ /* @todo get tyhis shizniz from the DBiz for riz */
                {name: 'Team #A', description: 'Doing some awesome stuff an\' that!', currentBalance:123},
                {name: 'Team #2', description: 'Doing some awesome stuff an\' that!', currentBalance:231},
                {name: 'Team #III', description: 'Doing some awesome stuff an\' that!', currentBalance:213},
                {name: 'Team #Ω', description: 'Doing some awesome stuff an\' that!', currentBalance:312}
            ];
            buildGraphs();
        })
        .catch(function(response) {
            $scope.loading = false;
            $scope.response = response;
        });

});
