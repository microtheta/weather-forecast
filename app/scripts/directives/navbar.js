'use strict';

/**
 * @ngdoc function
 * @name weatherappApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the weatherappApp
 */
angular.module('weatherappApp')
  .directive('navBar',  function ($location) {
    return{
		templateUrl:'views/navbar.html',
		link : function(scope) {
			scope.isActive = function (locationName) {
			     var active = (locationName === $location.path());
			     return active;
			};
		}
	};
});
