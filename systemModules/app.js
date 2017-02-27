define(['angular', 'angularRoutes', 'ngDialog',
    'userManagement/scripts/UserManagement',
     'commonModules/commonDirectives/singleSelectDropDownDirective/singleSelectDropDown',
],
function (angular)
{
    return angular.module('SingleSelectDemo', [
        'ngRoute',
        'ngDialog',
        'UserManagement'
    ]);
});