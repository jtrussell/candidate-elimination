
describe('Service: bnd.general.service', function() {
  'use strict';
  
  var bndGeneral, g, s;

  beforeEach(module('bnd.general.service'));

  beforeEach(inject(function(_bndGeneral_) {
    bndGeneral = _bndGeneral_;
    g = bndGeneral();

    s = {
      hasMoreSpecificThan: function() {
        console.log('Did you forget to mock hasMoreSpecificThan?');
      }
    };
  }));

  it('should be a factory for General Boundary instances', function() {
    expect(g.constructor.name).toBe('GeneralBoundary');
  });

  describe('General Boundary', function() {
    it('should have a collection of active hypotheses', function() {
      expect(g.hypotheses).toEqual(jasmine.any(Array));
    });

    it('should have a method to observe an example', function() {
      expect(g.observe, s).toEqual(jasmine.any(Function));
    });

    it('should track rejected hypotheses by example', function() {
      expect(g.rejections).toEqual(jasmine.any(Array));
    });

    it('should have a list of observed examples', function() {
      expect(g.examples).toEqual(jasmine.any(Array));
    });

    it('should know when it contains an hypothesis more general than a given hypothesis', function() {
      var h = {
        isMoreGeneralThan: angular.noop
      };

      spyOn(h, 'isMoreGeneralThan').and.returnValue(true);
      g.hypotheses = [h];

      expect(g.hasMoreGeneralThan({x:3,y:3,isPositive: true})).toBe(true);
    });

    it('should know when it contains no hypothesis more general than a given hypothesis', function() {
      var h = {
        isMoreGeneralThan: angular.noop
      };

      spyOn(h, 'isMoreGeneralThan').and.returnValue(false);
      g.hypotheses = [h];

      expect(g.hasMoreGeneralThan({x:3,y:3,isPositive: true})).toBe(false);
    });

    it('should update when given a new hypotheses', function() {
      spyOn(s, 'hasMoreSpecificThan').and.returnValue(true);
      g.observe({x: 4, y: 5, isPositive: false}, s);
      expect(g.hypotheses.length).toBe(4);
    });
  });
});

