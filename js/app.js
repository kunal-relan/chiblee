'use strict';

/* App Module */

var phonecatApp = angular.module('phonecatApp', [
  'ngRoute',
  'phonecatControllers',

]);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/show', {
        templateUrl: './one.html',
        controller: 'logincheck'
      }).
      when('/phones', {
        templateUrl: './list.html',
        controller: 'PhoneListCtrl'
      }).
      when('/login', {
        templateUrl: './one.html',
        controller: 'loginCtrl'
      }).
      when('/category/:name', {
        templateUrl: './listview.html',
        controller: 'PhoneDetailCtrl'
      }).
      when('/type/:type', {
        templateUrl: './typeview.html',
        controller: 'typeCtrl'
      }).
      when('/detail/:id', {
        templateUrl: './detailview.html',
        controller: 'detailCtrl'
      }).
      when('/map', {
        templateUrl: './map.html',
        controller: 'mapCtrl'
      }).
      otherwise({
        redirectTo: '/show'
      });
  }]);
