angular.module('myDirective', [])
    .directive('customOnChange', function () {
    	return {
    		restrict: 'A',
    		link: function (scope, element, attrs) {
    			var onChangeHandler = scope.$eval(attrs.customOnChange);
    			element.bind('change', onChangeHandler);
    		}
    	};
    }).directive('setting', function () {
        return function ($scope, $element, attrs) {
            $scope.$eval(attrs.setting);
        }
    });
