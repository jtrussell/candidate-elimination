
angular.module('ce.example-space.directive', ['d3', 'uni'])
  .directive('ceExampleSpace', function(d3, UNI_MIN, UNI_MAX) {
    'use strict';
    return {
      restrict: 'AE',
      template: '<div></div>',
      scope: {
        examples: '='
      },
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

        var gy = svg.append('g')
          .attr('class', 'y axis')
          .call(yAxis);

        gy.selectAll('g').filter(function(d) { {return d;} })
          .classed('minor', true);

        gy.selectAll('text')
          .attr('x', 2)
          .attr('dy', -2);

        // Plot points
        var gEx = svg.append('g');
        var plotExamples = function(exampleData) {
          var examples = gEx.selectAll('circle')
            .data(exampleData, function(ex) {
              return '(' + ex.x + ',' + ex.y + ',' + (ex.isPositive ? 'p' : 'n') + ')';
            });

          examples.enter().append('circle')
            .attr({
              cx: function(d) {return x(d.x);},
              cy: function(d) {return y(d.y);},
              r: 4
            })
            .style('stroke', 'black')
            .style('fill', function(d) {
              return d.isPositive ? 'black' : 'white';
            });

          examples.exit().remove();
        };

        var gHypo = svg.append('g');
        var plotHypotheses = function(hypoData) {
          var hypos = gHypo.selectAll('rect')
            .data(hypoData, function(d) {
              return '(' + [
                d.lowerLeftX, d.lowerLeftY,
                d.topRightX, d.topRightY
              ].join(',') + ')';
            });

          hypos.enter().append('rect')
            .attr({
              x: function(d) { return x(d.lowerLeftX); },
              y: function(d) { return y(d.lowerLeftY); },
              width: function(d) { return x(d.topRightX - d.lowerLeftX); },
              height: function(d) {
                var h = y(d.topRightY - d.lowerLeftY)
                console.log(h);
                return h;
              }
            })
            .style('stroke', 'black')
            .style('fill', 'white');

          hypos.exit().remove();
        };

        plotHypotheses([
          {
            lowerLeftX: 1,
            lowerLeftY: 1,
            topRightX: 4,
            topRightY: 4
          }
        ]);

        scope.$watch('examples', plotExamples, true);
      }
    };
  });

