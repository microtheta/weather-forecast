'use strict';

describe('Controller: MainCtrl', function() {
  
  var scope, $controller, _mockMyService;
  var data = {
    dt:1, 
    list: {
      1: {b:1}
    }
  };
  
  
  beforeEach(module('weatherappApp'));
  
  beforeEach(inject(function(_$rootScope_, _$controller_) {
    scope = _$rootScope_;
    $controller = _$controller_;
    
    _mockMyService = {
      get: function() {
        return {
          then: function() { 
          }
        }; 
      }
    };
    
  }));
  
  describe('should test controller Initialization', function() {

    beforeEach(function() {
      $controller('MainCtrl', { $scope: scope });
    });
    
    it('should set Loading flag', function () {
      expect(scope.loadingData).toBe(true);
    });
    
  });

  describe('should test weather data Loading successFn', function() {

    beforeEach(function() {
      _mockMyService = {
        get: function() {
          return {
            then: function(successFn) {
               successFn(data);
            }
          };
        }
      };
      $controller('MainCtrl', { $scope: scope, $weather: _mockMyService });
    });
    
    it('should set data retrived from service and unset loding flag', function () {
      expect(scope.loadingData).toBe(false);
      expect(scope.weatherData).toEqual(data);
    });
    
  });

  describe('should test weather data Loading errorFn', function() {

    beforeEach(function(){
      _mockMyService = {
        get: function() {
          return {
            then: function(successFn, errorFn) {
               errorFn();
            }
          };
        }
      };
      $controller('MainCtrl', { $scope: scope, $weather: _mockMyService });
    });
    
    it('should set error flag and unset loding flag', function () {
      expect(scope.loadingData).toBe(false);
      expect(scope.dataError).toBe(true);
    });
    
  });
  
  describe('fn:getImage', function () {
    
    beforeEach(function(){
      $controller('MainCtrl', { $scope: scope});
    });

    it('should return a default image url wnen no icon id given', function () {
      
      var imageURL = 'http://openweathermap.org/img/w/01d.png';
      
      expect(scope.getImage()).toBe(imageURL);

    });


    it('should return an image url wnen passing an icon id', function () {
      
      var imageURL = 'http://openweathermap.org/img/w/10d.png';
      
      expect(scope.getImage('10d')).toBe(imageURL);

    });

  });

  describe('fn:selectDate', function() {

    beforeEach(function() {
      _mockMyService = {
        get: function() {
          return {
            then: function(successFn) {
               successFn(data);
            }
          };
        }
      };
      $controller('MainCtrl', { $scope: scope, $weather: _mockMyService });
    });
    
    it('should set selectedDate and dailyData object when date is selected', function () {
      
      scope.selectDate(1);

      expect(scope.selectedDate).toBe(1);
      expect(scope.dailyData).toEqual({b:1});
    });
    
  });
  
});