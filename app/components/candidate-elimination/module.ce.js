
/**
 * Main candidate elimination module
 *
 * @package ce
 */

angular.module('ce', [
  'ngRoute',
  'bnd',
  'ce.main.controller',
  'ce.example-space.directive'
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
      controllerAs: 'main',
      resolve: {
        generalBoundary: function(bndGeneral) { return bndGeneral(); },
        specificBoundary: function(bndSpecific) { return bndSpecific(); },
        seedExamples: function(exHistory) { return exHistory.fromSearch(); } }
    })
    .otherwise('/candidate-elimination');
})

;// That's all folks!
