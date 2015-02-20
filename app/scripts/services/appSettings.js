angular.module('easterdashApp').service('appSettings', function(pouchDB) {
    'use strict';
    var settings = ['githubUsername', 'githubPassword', 'dbPassword'];
    var db = pouchDB('appSettings');
    var self = {};

    self.get = function() {
        return db.get('settings');
    };

    self.setSingle = function(key, value) {
        if (settings.indexOf(key) === -1)  {
            return false;
        }
        db.get('settings').then(function(response) {
            response[key] = value;
            return db.put(store);
        });
    };

    self.save = function(hash) {
        var newSettings = {_id: 'settings'};
        angular.forEach(hash, function(value, key) {
            if (settings.indexOf(key) === -1)  {
                return;
            }
            newSettings[key] = value;
        });

        db.get('settings').then(function(response) {
            // need to append the _rev to demonstrate we're serious!
            newSettings._rev = response._rev;
            return db.put(newSettings);
        }).catch(function() {
            // not found, just put to db.
            return db.put(newSettings);
        });
    };

    self.clearSettings = function() {
        db.get('settings').then(function(response) {
            // need to append the _rev to demonstrate we're serious!
            var doc = {
                _id: 'settings',
                _rev: response._rev,
            };
            return db.remove(doc);
        })
    };

    return self;
});
