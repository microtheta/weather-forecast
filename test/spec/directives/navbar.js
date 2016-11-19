'use strict';

describe('navBar test', function () {
    var element;

    beforeEach(function () {
        module('weatherappApp');
        
        element = angular.element('<nav-bar></nav-bar>');
    	
        inject(function ($rootScope, $compile, $templateCache) {
            $templateCache.put('views/navbar.html', '<div>Header template</div>');

            var scope = $rootScope.$new();
			scope.name = name;
			$compile(element)(scope);
			scope.$digest();
		});
    });
    it('should replace the template', function () {
        expect(element.text()).toBe('Header template');
    });
});