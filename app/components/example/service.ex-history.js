
angular.module('ex.history.service', ['ex.example.service'])
  .factory('exHistory', function($location, exExample) {
    'use strict';
    var exports = {};

    exports.fromSearch = function() {
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
    };

    exports.permalink = function(examples) {
      var url = $location.absUrl();
      return url.replace(/\?.*/, '') + '?' + examples.map(function(ex) {
        return ex.x + ',' + ex.y + ',' + (ex.isPositive ? 'p' : 'n');
      }).join(';');
    };
  
    return exports;
  });
