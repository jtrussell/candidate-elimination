
describe('Constant: uni.UNI_MIN', function() {
  'use strict';

  var min;

  beforeEach(module('uni.min.constant'));

  beforeEach(inject(function(UNI_MIN) {
    min = UNI_MIN;
  }));

  it('should be a number', function() {
    expect(min).toEqual(jasmine.any(Number));
  });
});

