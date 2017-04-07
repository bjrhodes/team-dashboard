angular.module('easterdashApp').service('teamDb', ['pouchDB', function(pouchDB) {
    'use strict';
    return pouchDB('teams');
}]);
