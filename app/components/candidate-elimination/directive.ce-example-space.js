
angular.module('ce.example-space.directive', ['d3', 'uni'])
  .directive('ceExampleSpace', function(d3, UNI_MIN, UNI_MAX) {
    'use strict';
    return {
      restrict: 'AE',
      template: '<div></div>',
      link: function(scope, element, attrs) {
        element = element.children().eq(0);

        var el = element[0]
          , height = 200
          , width = 200;

        var margin = {
          top: 20,
          right: 0,
          left: 20,
          bottom: 20
        };

        element.css('height', (height + margin.top + margin.bottom) + 'px');
        element.css('width', (width + margin.right + margin.left) + 'px');

        // Build the stage

        var x = d3.scale.linear()
          .domain([UNI_MIN, UNI_MAX])
          .range([0, width]);

        var y = d3.scale.linear()
          .domain([UNI_MIN, UNI_MAX])
          .range([height, 0]);

        var xAxis = d3.svg.axis()
          .scale(x)
          .ticks(10)
          .tickSize(height)
          .orient('bottom');

        var yAxis = d3.svg.axis()
          .scale(y)
          .ticks(10)
          .tickSize(width)
          .orient('right');

        var svg = d3.select(element[0])
          .append('svg')
            .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        var gx = svg.append('g')
          .attr('class', 'x axis')
          .call(xAxis);

        gx.selectAll('g').filter(function(d) { {return d;} })
          .classed('minor', true);

        //gx.selectAll('text')

        var gy = svg.append('g')
          .attr('class', 'y axis')
          .call(yAxis);

        gy.selectAll('g').filter(function(d) { {return d;} })
          .classed('minor', true);

        gy.selectAll('text')
          .attr('x', 4)
          .attr('dy', -4);

        // Plot points
        var posExamples = svg.append('g');

        var plotPosExamples = function(examples) {
          posExamples.selectAll('circles.positive')
            .data(examples)
            .enter().append('circle')
            .attr({
              cx: function(d) {return x(d[0]);},
              cy: function(d) {return y(d[1]);},
              r: 3
            })
            .style('stroke', 'black')
            .style('fill', 'white');
        };
        plotPosExamples([ [1,2], [3,4], [7,7] ]);
        plotPosExamples([ [5,5] ]);
      }
    };
  });

