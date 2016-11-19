'use strict';

/**
 * @ngdoc function
 * @name weatherappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the weatherappApp
 */
angular.module('weatherappApp')
  .controller('MainCtrl', function ($scope, $weather) {
    
    $scope.loadingData = true;
    
    $weather.get(1279233).then(function(data) {
    	$scope.weatherData = data;
    	$scope.loadingData = false;
    }, function(){
    	$scope.loadingData = false;
    	$scope.dataError = true;
    });

    $scope.getImage = function(name) {
      if(!name){
        name = '01d';
      }
    	return 	'http://openweathermap.org/img/w/'+name+'.png';
    };

  	$scope.selectDate = function(dt) {
      if(dt){
    		$scope.selectedDate = dt;
    		$scope.dailyData = $scope.weatherData.list[dt];
      }
  	};

  });
