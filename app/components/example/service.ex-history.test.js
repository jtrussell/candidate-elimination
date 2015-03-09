
describe('Service: ex.exHistory.service', function() {
  'use strict';

  var exHistory, $location;

  beforeEach(module('ex.history.service'));

  beforeEach(inject(function(_exHistory_, _$location_) {
    exHistory = _exHistory_;
    $location = _$location_;
  }));

  it('should be able to gather serialized examples from the url', function() {
    spyOn($location, 'search').and.returnValue({'1,1,p;2,2,n': true});
    var examples = exHistory.fromSearch();
    expect(angular.toJson(examples)).toEqual(angular.toJson([
      {x: 1, y: 1, isPositive: true},
      {x: 2, y: 2, isPositive: false}
    ]));
  });

  it('should be able to create permalinks for a given set of examples', function() {
    spyOn($location, 'absUrl').and.returnValue('http://foobar.com');
    var permalink = exHistory.permalink([
      {x: 1, y: 1, isPositive: true},
      {x: 2, y: 2, isPositive: false}
    ]);
    expect(permalink).toEqual('http://foobar.com?1,1,p;2,2,n');
  });
});
