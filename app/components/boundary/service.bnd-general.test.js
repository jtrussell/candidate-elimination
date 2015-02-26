
describe('Service: bnd.general.service', function() {
  'use strict';
  
  var bndGeneral, g;

  beforeEach(module('bnd.general.service'));

  beforeEach(inject(function(_bndGeneral_) {
    bndGeneral = _bndGeneral_;
    g = bndGeneral();
  }));

  it('should be a factory for General Boundary instances', function() {
    expect(g.constructor.name).toBe('GeneralBoundary');
  });

  describe('General Boundary', function() {
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

