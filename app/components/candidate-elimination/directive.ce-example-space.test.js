
describe('Directive: ce-version-space', function() {
  'use strict';

  var ng = angular
    , scope
    , compile;

  beforeEach(module('ce.example-space.directive'));

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();

    compile = function(tpl, scp) {
      scp = scp || scope;
      var $el = $compile(ng.element(tpl))(scp);
      scp.$apply();
      return $el;
    };
  }));

  describe('rendering examples', function() {
    beforeEach(function() {
      scope.examples = [
        { x: 2, y: 3, isPositive: true },
        { x: 4, y: 5, isPositive: false }
      ];
    });

    it('should render a circle for each example', function() {
      var $el = compile([
        '<div ce-example-space',
          'examples="examples">',
        '</div>'
      ].join('\n'));
      scope.$apply();

      var n = 0;
      d3.select($el[0])
        .selectAll('circle')
        .each(function() {n++});
      expect(n).toEqual(2);
    });
  });

});
