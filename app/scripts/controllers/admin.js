'use strict';

/**
 * @ngdoc function
 * @name easterdashApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the easterdashApp
 */
angular.module('easterdashApp').controller('AdminCtrl', function (teamDb) {
    teamDb.put({
        _id: 'teams',
        data: [
            {name: 'Team #A', description: 'Doing some awesome stuff an\' that!', currentBalance:123},
            {name: 'Team #2', description: 'Doing some awesome stuff an\' that!', currentBalance:231},
            {name: 'Team #III', description: 'Doing some awesome stuff an\' that!', currentBalance:213},
            {name: 'Team #Ω', description: 'Doing some awesome stuff an\' that!', currentBalance:312}
        ]
    });
});
