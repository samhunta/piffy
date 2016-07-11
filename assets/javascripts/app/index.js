(function(){

  'use strict';

  //========================================
  // App modules
  //========================================

  // Main app
  angular.module('app', [
    'ng',
    'shava',
    'vs-repeat',
    'app.config',
    'app.routes',
    'app.settings',
    'app.models',
    'app.templates',
    'app.controllers',
    'app.directives',
    'app.services',
    'ngAnimate',
    'mgcrea.ngStrap',
    'ui.router'
  ]);

}());