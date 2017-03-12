/*
 * A custom directive for creating a simple checkbox.
 * 
 * Required attributes:
 *      - value: the value bound to the value of the checkbox;
 *      - label: the text displayed next to the checkbox.
 *      
 * Optional attributes:
 *      - three-states: changes the default checkbox behaviour (true/false) to a three-state one (undefined/true/false);
 *      - disable-click: disables the default click handler; used if you want to handle the click yourself. * 
 */

define(['commonModules/commonDirectives/commonDirectives'],
    function (directives) {
        var customCheckboxFactoryFunction = function customCheckboxFactoryFunction() {
            return {
                restrict: 'E',

                scope: {
                    value: '=',
                    label: '@',
                    disabled: '=?'
                },                

                link: function (scope, element, attrs, controllers) {

                    scope.threeStates = false;
                    if (attrs.hasOwnProperty('threeStates') && typeof attrs.threeStates === 'string' && attrs.threeStates !== 'false') {
                        scope.threeStates = true;
                    }

                    scope.disableClickHandler = false;
                    if (attrs.hasOwnProperty('disableClickHandler') && typeof attrs.disableClickHandler === 'string' && attrs.disableClickHandler !== 'false') {
                        scope.disableClickHandler = true;
                    }

                    if (typeof scope.value !== 'boolean') {
                        scope.value = scope.threeStates === true ? undefined : false;
                    }

                    if (scope.disabled === undefined) {
                        scope.disabled = false;    // default value if disabled attribute is not present 
                    } else if (typeof scope.disabled !== 'boolean') {
                        throw new Error('The value passed to disabled attribute must be a boolean!');
                    }

                },

                controller: ['$scope', function ($scope) {                    

                    $scope.handleClick = function handleClick() {
                        if ($scope.disableClickHandler === true || $scope.disabled === true) {
                            return;
                        }

                        if ($scope.threeStates === true) {
                            switch ($scope.value) {
                                case true:
                                    $scope.value = false;
                                    break;
                                case false:
                                    $scope.value = undefined;
                                    break;
                                case undefined:
                                    $scope.value = true;
                                    break;
                                default:
                                    throw new RangeError('Invalid value!');
                            }
                        } else {
                            $scope.value = !$scope.value;
                        }
                    };

                }],

                templateUrl: 'commonModules/commonDirectives/customCheckbox/customCheckboxTemplate.html'
            };

        };

        directives.directive('customCheckbox', customCheckboxFactoryFunction);
    });