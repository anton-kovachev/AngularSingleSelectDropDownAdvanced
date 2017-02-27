// The app/scripts/app.js file, which defines our AngularJS app
define(['angular', 'angularRoutes',  'ngDialog', 'uiBootstrap', 

    'commonModules/commonDirectives/commonDirectives',
    'commonModules/commonDirectives/singleSelectDropDownDirective/singleSelectDropDown',
    'userManagement/scripts/controllers/controllers',
    'userManagement/scripts/controllers/usersController',
    'userManagement/scripts/services/services'
   ],
    function (angular) {

        var userManagement = angular.module('UserManagement', ['ngRoute', 'ngDialog', 'ui.bootstrap', 'commonDirectives', 'controllers', 'services']);

        userManagement.config(["$routeProvider", function ($routeProvider) {
                $routeProvider
                            .when('/', {
                                templateUrl: 'userManagement/views/userManagement.html',
                                controller: 'usersController'
                            })
                            .when('/users', {
                                 templateUrl: 'userManagement/views/userManagement.html',
                                 controller: 'usersController'
                             })
                             .otherwise({ redirectTo: '/users' });
        }]);

        return userManagement;
});
