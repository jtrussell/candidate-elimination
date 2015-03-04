
/**
 * Main candidate elimination module
 *
 * @package ce
 */

angular.module('ce', [
  'ngRoute',
  'bnd',
  'ce.main.controller'
])

.config(function($locationProvider) {
  'use strict';
  $locationProvider.hashPrefix('!');
})
  
.config(function($routeProvider) {
  'use strict';
  $routeProvider
    .when('/candidate-elimination', {
      reloadOnSearch: false,
      templateUrl: 'components/candidate-elimination/view.main.html',
      controller: 'CEMainCtrl',
      controllerAs: 'main'
    })
    .otherwise('/candidate-elimination');
})

;// That's all folks!
