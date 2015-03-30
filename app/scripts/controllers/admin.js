'use strict';

/**
 * @ngdoc function
 * @name easterdashApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the easterdashApp
 * {name: 'Team #A', description: 'Doing some awesome stuff an\' that!', balance:123},
 * {name: 'Team #2', description: 'Doing some awesome stuff an\' that!', balance:231},
 * {name: 'Team #III', description: 'Doing some awesome stuff an\' that!', balance:213},
 * {name: 'Team #Ω', description: 'Doing some awesome stuff an\' that!', balance:312}
 */
angular.module('easterdashApp').controller('AdminCtrl', function ($scope, teamDb, ngToast) {
    var saveTransaction = function(title, delta, teamName) {
        var transaction;
        delta = delta || 0;
        transaction = {
            time: new Date().getTime(),
            title: title,
            delta: delta
        };

        teamDb.get('teams').then(function(res) {
            res.data.some(function(stored) {
                if (stored.name === teamName) {
                    stored.balance += delta;
                    transaction.balance = stored.balance;
                    stored.transactions.push(transaction);
                    return true;
                }
            });

            teamDb.put(res);
            $scope.teams = res.data;
        });
    };

    $scope.addTeam = function(team) {
        team.balance = team.balance || 0;
        team.transactions = [{
            time: new Date().getTime(),
            title: 'Initial Investment',
            delta: 0,
            balance: team.balance
        }];
        teamDb.get('teams').then(function(res) {
            res.data.push(team);
            teamDb.put(res);
            $scope.teams = res.data;
            ngToast.create({className: 'success', content: 'Team added.'});
        }).catch(function() {
            teamDb.put({
                _id: 'teams',
                data: [team]
            });
            $scope.teams = [team];
            ngToast.create({className: 'success', content: 'Team added.'});
        });

        $scope.newTeam = {
            balance: '',
            description: '',
            name: ''
        };
    };

    teamDb.get('teams').then(function(res) {
        $scope.teams = res.data;
    }).catch(function() {
        $scope.teams = [];
    });

    $scope.saveCost = function(costIncurred) {
        saveTransaction(costIncurred.description, -1 * costIncurred.value, costIncurred.team.name);
        ngToast.create({className: 'success', content: 'Cost saved.'});
        $scope.costIncurred = {value: '', description: ''};
    };
    $scope.savePayout = function(taskDetails) {
        saveTransaction(taskDetails.description, taskDetails.value, taskDetails.team.name);
        ngToast.create({className: 'success', content: 'Payment saved.'});
        $scope.taskCompleted = {value: '', description: ''};
    };
});
