'use strict';

/**
 * @ngdoc service
 * @name service: weatherdataservice
 * @description
 * # weatherdataservice test
 */

describe('weatherdataservice test', function() {
	var httpBackend, service;
	
	var data = {
		  'city': {
		    'id': 1279233,
		    'name': 'Ahmadabad',
		    'coord': {
		     	'lon':72.616669,
		     	'lat':23.033333
		    },
		    'country': 'IN',
		    'population': 0,
		    'sys': {
		      'population': 0
		    }
		  },
		  'cod': '200',
		  'message': 0.0303,
		  'cnt': 36,
		  'list': [
		    {
		      'dt': 1479470400,
		      'main': {
		        'temp': 271.61,
		        'temp_min': 271.091,
		        'temp_max': 271.61,
		        'pressure': 1017.95,
		        'sea_level': 1038.82,
		        'grnd_level': 1017.95,
		        'humidity': 93,
		        'temp_kf': 0.52
		      },
		      'weather': [
		        {
		          'id': 600,
		          'main': 'Snow',
		          'description': 'light snow',
		          'icon': '13d'
		        }
		      ],
		      'clouds': {
		        'all': 92
		      },
		      'wind': {
		        'speed': 5.41,
		        'deg': 193.001
		      },
		      'snow': {
		        '3h': 0.5975
		      },
		      'sys': {
		        'pod': 'd'
		      },
		      'dt_txt': '2016-11-18 12:00:00'
		    }
	    ]
	};
		  
	
	beforeEach(function(){
		
		module('weatherappApp');
		
		inject(function ($injector) {
			httpBackend = $injector.get('$httpBackend');
			service = $injector.get('$weather');
		});
		
	});
	
	describe('get', function () {
	
		it('should fetch weather data and call transformJSON', inject(function () {
			
			spyOn(service, 'transformJSON');

			var uri = 'http://api.openweathermap.org/data/2.5/forecast?units=metric&id=1279233&appid=e59b3d48d4da4b7c9d0884ffe0d8f8a6';
			httpBackend.expectGET(uri).respond(data);
			
			service.get(1279233);
			
			httpBackend.flush();
			
			expect(service.transformJSON).toHaveBeenCalled();
			
		}));

	});

	describe('transformJSON', function () {
	
		it('should transform JSON from list data to date wise list', inject(function () {
			
			var transFromedData = service.transformJSON(data);

			expect(transFromedData.list['2016-11-18'][0]).toEqual(data.list[0]);
			
		}));

	});
	
});