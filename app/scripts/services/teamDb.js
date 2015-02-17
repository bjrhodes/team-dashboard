angular.module('easterdashApp').service('teamDb', function(pouchDB) {
    'use strict';
    return pouchDB('teams');
});
