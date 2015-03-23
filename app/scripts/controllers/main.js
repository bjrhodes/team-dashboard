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
            team.highchart = {useHighStocks: true, series: [{data:[]}]};
            team.history = {labels: [], data: [[]], series: ['Historical balance']};
            $scope.teamTotals.labels.push(team.name);
            $scope.teamTotals.data[0].push(team.balance); // The chart allows for multiple plots, so we needd to nest
            if (team.transactions) {
                team.transactions.forEach(function(transaction) {
                    team.history.labels.push($scope.formatDate(transaction.time));
                    team.history.data[0].push(transaction.balance);
                    team.highchart.series[0].data.push([transaction.time, transaction.balance]);
                });
            }
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
