/*
Required Attributes:
    - options: the list of items available for selection;
    - selected-value: the selected item of the dropdown;

Optional Attributes:
    - filter: an angular filter to filter the options if needed;
    - is-active: is the dropdown active. Default(true); Use the _isActive $scope property in the directive if you want to make use of the default value;
    - is-requred: is the dropdown required. Red indicator if required, blue indicator if not required. Clear option inserted if not required;
    - enable-search: { searchPropertyName: propertyNameValue }   search box enabled (searchPropertyName required in order the search to work) 
    - tooltip-enable: enable tool tip
    - tooltip-text: text of the tooltip
    - tooltip-trigger: { propertyName: propertyNameValue, propertyValue: propertyValueValue } - trigger of the tooltip
    - enable-check-box: enables active/inactive chackboxes
    - disabled-option: { propertyName: propertyNameValue, propertyValue: propertyValueValue, allowOptionSelection: true/false } disables an option which has a propertyName matching the propertyValue, allowOptionSelection - whether or not the selection of the option is available

    - change-selected-value-func: callback function when changing a selected value. Passes the selected-value as a parameter;
    - change-selected-value-func-args: additional arguments to pass to the callback function in an array, besides the selected-value one; 


String / Property Parameters:
    - label: the label displaying above the dropdown;
    - clear-option-text: the text that shows on the option that clears the dropdown. Default('Clear Dropdown');
    - display-property-name: the name of the property to display from the model. Default('name'); Use the _displayPropertyName $scope property in the directive if you want to make use of the default value;
    - order-by-property-name: the name of the property to order by. Don't use this argument to keep the original ordering;
    - is-marked-property-name: the name of the property indicating where the entry should be marked;
    - dropdown-color-property-name: the name of the property indicating whether the text should be green (true), red (false) or default (null, undefined);
*/

define(['commonModules/commonDirectives/commonDirectives', 'commonModules/commonDirectives/customCheckBox/customCheckBox'], function (commonDirectives) {
    commonDirectives.directive('singleSelectDropDown', [function () {
        var defaults = {
            isActive: true,
            displayPropertyName: 'name',
            clearOptionText: 'Clear Dropdown',
            horizontal: false
        };

        return {
                restrict: 'E',
                templateUrl: 'commonModules/commonDirectives/singleSelectDropDownDirective/singleSelectDropDownTemplate.html',
                scope: {
                    options: '=',
                    selectedValue: '=',

                    filter: '=?',
                    isActive: '=?',
                    isRequired: '=?',
                    enableSearch: '=?',
                    horizontal: '=?',
                    tooltipEnable: '=?',
                    tooltipText: '@',
                    tooltipTrigger: '=?',
                    enableCheckBox: '=?',
                    disabledOption: '=?',
                    changeSelectedValueFunc: '=?',
                    changeSelectedValueFuncArgs: '&',

                    label: '@',
                    clearOptionText: '@',
                    displayPropertyName: '@',
                    orderByPropertyName: '@',
                    isMarkedPropertyName: '@',
                    dropdownColorPropertyName: '@',
                    disabledOptionPropertyName: '@',
                    disabledOptionPropertyValue: '@',
                    searchPropertyName: '@',
                },
                compile: function() {
                    return {
                        pre: function(scope, el, attrs) {
                            scope._displayPropertyName = angular.isUndefined(attrs.displayPropertyName) ? defaults.displayPropertyName : attrs.displayPropertyName;
                            scope._clearOptionText = angular.isUndefined(attrs.clearOptionText) ? defaults.clearOptionText : attrs.clearOptionText;
                            scope._horizontal = angular.isUndefined(scope.horizontal) ? defaults.horizontal : scope.horizontal;
                        },
                        post: function(scope, el) {
                        }
                    };
                },

                controller: ["$scope", function ($scope) {
                    $scope.checkBoxState = { isActiveStateSelected: true, isInActiveStateSelected : true  };

                    $scope.optionsFilter = function (option) {
                        if (!$scope.enableCheckBox || !option.hasOwnProperty('isActive'))
                        {
                            return true;
                        }

                        if ($scope.checkBoxState.isActiveStateSelected && option.isActive === true) {
                            return true;
                        }
                        
                        if ($scope.checkBoxState.isInActiveStateSelected && option.isActive === false) {
                            return true;
                        }

                        return false;
                    }
                    
                    $scope.stopEvent = function ($event) {
                        $event.stopPropagation();
                    };

                    $scope.isVisible = function (option) {
                        if (!angular.isUndefined($scope.isMarkedPropertyName)) {
                            if (option[$scope.isMarkedPropertyName])
                                return true;
                        }

                        return false;
                    };

                    $scope.changeSelectedItem = function (option) {
                        if (isOptionDisabledSelection(option)) {
                            return; // Don't change if the option is disabled;
                        }

                        if (!$scope.selectedValue && !option) {
                            return; // Only change the items and call the callback if there is a need for that. If both the selected values and the option values are null, don't do anything and return;
                        }

                        if ($scope.selectedValue && option && $scope.selectedValue[$scope._displayPropertyName] === option[$scope._displayPropertyName]) {
                            return; // Only change the items and call the callback if there is a need for that. Changing an item with the same item should do nothing, not call the callback and return;
                        }

                        $scope.selectedValue = option;
                        
                        if ($scope.changeSelectedValueFunc) {
                            var functionArguments = $scope.changeSelectedValueFuncArgs ? $scope.changeSelectedValueFuncArgs() : null;

                            if (functionArguments && Array.isArray(functionArguments) && functionArguments.length > 0) {
                                functionArguments.unshift(option);

                                $scope.changeSelectedValueFunc.apply(this, functionArguments);
                            }
                            else {
                                $scope.changeSelectedValueFunc(option);
                            }

                        }
                    };


                    $scope.getOptionStyle = function (option) {

                        if (isOptionDisabledSelection(option)) {
                            return 'itemDisabled';
                        }

                        if (isOptionDisabledWithoutSelection(option))
                        {
                            return 'itemDisabledSoft';
                        }

                        if ($scope.dropdownColorPropertyName && option[$scope.dropdownColorPropertyName] !== undefined) {
                            if (option[$scope.dropdownColorPropertyName]) {
                                return { 'color': 'green' };
                            }
                            else {
                                return { 'color': 'red' };
                            }
                        }

                        return {};
                    };
                    
                    setSearchBoxFilter();

                    function setSearchBoxFilter() {
                        $scope.searchFilter = null;
                        $scope.disabledFilter = true;

                        if ($scope.enableSearch.searchPropertyName) {
                            $scope.disabledFilter = false;
                            $scope.searchFilter = {};

                            $scope.searchFilter[$scope.enableSearch.searchPropertyName] = '';
                        }
                    };

                    $scope.isOptionWithDisabledStyle = function (option) {
                        if (isOptionDisabledSelection(option) || isOptionDisabledWithoutSelection(option)) {
                            return true;
                        }

                        return false;
                    };

                    function isOptionDisabledSelection(option) {
                        if (isOptionDisabled(option) && ( $scope.disabledOption.allowOptionSelection === false || $scope.disabledOption.allowOptionSelection === undefined) ) {
                            return true;
                        }

                        return false;
                    };

                    function isOptionDisabledWithoutSelection(option) {
                        if (isOptionDisabled(option) && $scope.disabledOption.allowOptionSelection === true) {
                            return true;
                        }

                        return false;
                    };

                    function isOptionDisabled(option) {
                        if ($scope.disabledOption && option[$scope.disabledOption.propertyName] !== undefined &&
                            (($scope.disabledOption.propertyValue !== undefined && option[$scope.disabledOption.propertyName] === $scope.disabledOption.propertyValue) ||

                             ($scope.disabledOption.propertyValue === undefined && option[$scope.disabledOption.propertyName] === true)) ) {
                            return true;
                        }

                        return false;
                    }

                    $scope.isOptionDisabledMarker = '';    

                    $scope.isTooltipActive = function (option) 
                    {
                        if (!option) {
                            return false;
                        }

                        return $scope.tooltipEnable && option[$scope.tooltipTrigger.propertyName] === $scope.tooltipTrigger.propertyValue
                    }

                }],

                link: function (scope, element, attrs, controllers) {
                    scope.option.forEach(function (option) {
                        if (isOptionWithDisabledStyle(option) == true && option.hasOwnProperty('name')) {
                            option.name += ' *';
                        }
                    });
                },
            }
        }
    ]);
});