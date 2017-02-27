// the app/scripts/main.js file, which defines our RequireJS config
require.config({
    paths: {

        jquery: '../scripts/jquery',
        angular: '../scripts/angular.min',
        angularRoutes: '../scripts/angular-route.min', 
        bootstrap: '../scripts/bootstrap.min',
        uiBootstrap: '../scripts/ui-bootstrap-tpls',
        jqueryUI: '../scripts/jquery-ui',
        jqueryColorbox: '../scripts/jquery-colorbox',
        domReady: '../scripts/domReady',
        reactive: '../scripts/rx',
        moment: '../scripts/moment.min',
        ngDialog: '../scripts/ngDialog',
        lodash: '../scripts/lodash',
        angularDropdownMultiselect: '../scripts/angularjs-dropdown-multiselect',

    },
    shim: {
        angular: {
            deps: ['jquery', 'jqueryUI', 'jqueryColorbox'],
            exports: 'angular'
        },
        angularRoutes: {
            deps: ['angular']
        },
        ngDialog: {
            deps: ['angular']
        },
        angularDropdownMultiselect: {
            deps: ['angular', 'lodash']
        },
        bootstrap: {
            deps: ['jquery']
        },
        uiBootstrap: {
            deps: ['angular']
        },
        jqueryUI: {
            deps: ['jquery']
        },
        jquery: {
            exports: "jquery"
        },
        jqueryColorbox: {
            deps: ['jquery']
        }
    },
    priority: [
        "angular"
    ],
    waitSeconds: 0
});

require([
  'angular',
  'app',
  'domReady',
  'angularRoutes',
  'reactive',
  'jquery',
  'bootstrap',
  'ngDialog',
  'lodash'
],
  function (angular, app) {
      'use strict';

      app.constant('ngAuthSettings', {
       
      });
   

      app.config(['$httpProvider', function ($httpProvider) {

      }]);

      app.config(['$httpProvider', function ($httpProvider) {
          $httpProvider.defaults.useXDomain = true;

          /**
           * Just setting useXDomain to true is not enough. AJAX request are also
           * send with the X-Requested-With header, which indicate them as being
           * AJAX. Removing the header is necessary, so the server is not
           * rejecting the incoming request.
           **/
          delete $httpProvider.defaults.headers.common['X-Requested-With'];
      }]);


      app.run(['$rootScope', '$templateCache', 'ngDialog', function ($rootScope, $templateCache, ngDialog) {
          $rootScope.$on('$routeChangeStart', function (event, next, current) {
              if (typeof (current) !== 'undefined') {
                  $templateCache.remove(current.templateUrl);
				  
              }
          });
      }]);



      angular.bootstrap(angular.element("body")[0], ['SingleSelectDemo']);
  });
