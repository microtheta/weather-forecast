'use strict';


angular.module('weatherappApp')
	.service('$weather',function($q, $http) {
		
		var service = {};
		
		service.transformJSON = function(dataObj) {

			var data = JSON.parse(JSON.stringify(dataObj));

			var List = data.list.slice(0);
			data.list = {};

			var dateData = {};
			for(var i=0; i<List.length; i++) {
				var date = List[i].dt_txt;  // jscs:disable
				date = date.split(' ')[0];

				dateData[date] = dateData[date] || [];
				
				dateData[date].push(List[i]);
			}

			data.list = dateData;

			return data;
		};


		service.get = function (cityid) {
		 	var deferred = $q.defer();
			
			$http.get('http://api.openweathermap.org/data/2.5/forecast?units=metric&id='+cityid+'&appid=e59b3d48d4da4b7c9d0884ffe0d8f8a6')
				.then(function(data){
					var dataJSON = service.transformJSON(data.data);
					deferred.resolve(dataJSON);
				}, function(data) {
					console.log(data);
					deferred.reject();
				});


			return deferred.promise;
		};

		return service;
	});