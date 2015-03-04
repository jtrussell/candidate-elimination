
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
      controllerAs: 'main',
      resolve: {
        generalBoundary: function(bndGeneral) { return bndGeneral(); },
        specificBoundary: function(bndSpecific) { return bndSpecific(); },
        seedExamples: function($location, exExample) {
          
          // Allow for examples to be encoded in the url
          var examples = []
            , search = $location.search();
          angular.forEach(search, function(val, key) {
            angular.forEach(key.split(';'), function(exLiteral) {
              var exParts = exLiteral.split(',');
              if(3 === exParts.length) {
                var x = parseInt(exParts[0], 10)
                  , y = parseInt(exParts[1], 10)
                  , isPositive = 'p' === exParts[2].toLowerCase();
                if(isFinite(x) && isFinite(y)) {
                  examples.push(exExample(x, y, isPositive));
                }
              }
            });
          });

          return examples;
        }
      }
    })
    .otherwise('/candidate-elimination');
})

;// That's all folks!
