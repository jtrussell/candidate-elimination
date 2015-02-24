
describe('Service: ex.exExample.service', function() {
  'use strict';
  
  var exExample;

  beforeEach(module('ex.example.service'));

  beforeEach(inject(function(_exExample_) {
    exExample = _exExample_;
  }));

  it('should be a factory for Example instances', function() {
    var ex = exExample(1,2,3,4,false);
    expect(ex.constructor.name).toBe('Example');
  });

  describe('Example', function() {
    var ex;

    beforeEach(function() {
      ex = exExample(1,2,false);
    });

    it('should have an x-value', function() {
      expect(ex.x).toBe(1);
    });

    it('should have a y-value', function() {
      expect(ex.y).toBe(2);
    });

    it('should know whether it is positive or not', function() {
      expect(ex.isPositive).toBe(false);
    });
  });

});
