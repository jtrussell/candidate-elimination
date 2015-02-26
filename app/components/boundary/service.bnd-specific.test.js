
describe('Service: bnd.specific.service', function() {
  'use strict';
  
  var bndSpecific, g;

  beforeEach(module('bnd.specific.service'));

  beforeEach(inject(function(_bndSpecific_) {
    bndSpecific = _bndSpecific_;
    g = bndSpecific();
  }));

  it('should be a factory for Specific Boundary instances', function() {
    expect(g.constructor.name).toBe('SpecificBoundary');
  });

  describe('Specific Boundary', function() {
    it('should have a collection of active hypotheses', function() {
      expect(g.hypotheses).toEqual(jasmine.any(Array));
    });

    it('should have a method to observe an example', function() {
      expect(g.observe).toEqual(jasmine.any(Function));
    });

    it('should track rejected hypotheses by example', function() {
      expect(g.rejections).toEqual(jasmine.any(Array));
    });

    it('should have a list of observed examples', function() {
      expect(g.examples).toEqual(jasmine.any(Array));
    });

    it('should update when given a new hypotheses', function() {
      g.observe({x: 3, y: 3, isPositive: false});
    });

  });
});


