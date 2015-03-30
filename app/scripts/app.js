'use strict';

/**
 * @ngdoc overview
 * @name easterdashApp
 * @description
 * # easterdashApp
 *
 * Main module of the application.
 */
angular
  .module('easterdashApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'pouchdb',
    'ngModal',
    'ngToast',
    'chart.js',
    'highcharts-ng'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl'
      })
      .when('/stories', {
        templateUrl: 'views/stories.html',
        controller: 'StoriesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
