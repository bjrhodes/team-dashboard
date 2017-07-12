'use strict';

/**
 * @ngdoc function
 * @name easterdashApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the easterdashApp
 */
angular.module('easterdashApp').controller('MainCtrl', ['$scope', 'teamDb', function ($scope, teamDb) {
    var highchartOptions = {
        zoomType: 'x',
        rangeSelector: {enabled: false},
        legend: {
            enabled: true,
            layout: 'vertical',
            itemMarginBottom: 10
        },
        scrollbar: {enabled: false}
    };

    var dbError = function(response) {
        $scope.loading = false;
        $scope.response = response;
    };
    var buildGraphs = function() {
        $scope.teamTotals = {labels: [], data: [[]]};
        $scope.highChart = {options: highchartOptions, chartType: 'stock', series: []};

        $scope.teams.forEach(function(team) {
            var series = {name: team.name, data:[]};
            $scope.teamTotals.labels.push(team.name);
            $scope.teamTotals.data[0].push(team.balance); // The chart allows for multiple plots, so we needd to nest
            if (team.transactions) {
                team.transactions.forEach(function(transaction) {
                    series.data.push([transaction.time, transaction.balance]);
                });
                $scope.highChart.series.push(series);
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
}]);
