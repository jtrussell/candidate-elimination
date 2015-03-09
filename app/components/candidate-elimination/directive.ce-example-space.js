
angular.module('ce.example-space.directive', ['d3', 'uni'])
  .directive('ceExampleSpace', function(d3, UNI_MIN, UNI_MAX) {
    'use strict';
    return {
      restrict: 'AE',
      template: '<svg></svg>',
      scope: {
        examples: '=',
        generalHypotheses: '=',
        specificHypotheses: '='
      },
      link: function(scope, element, attrs) {
        element = element.find('svg').eq(0);

        var height = 200
          , width = 200;

        var margin = {
          top: 15,
          right: 15,
          left: 15,
          bottom: 15
        };

        element.css('width', width + margin.right + margin.left + 'px');
        element.css('height', width + margin.top + margin.bottom + 'px');

        // Build the stage

        var xScale = d3.scale.linear()
          .domain([UNI_MIN, UNI_MAX])
          .range([0, width]);

        var yScale = d3.scale.linear()
          .domain([UNI_MIN, UNI_MAX])
          .range([height, 0]);

        var xAxis = d3.svg.axis()
          .scale(xScale)
          .ticks(10)
          .tickSize(height)
          .orient('bottom');

        var yAxis = d3.svg.axis()
          .scale(yScale)
          .ticks(10)
          .tickSize(width)
          .orient('right');

        var svg = d3.select(element[0])
            .attr('height', height + margin.top + margin.bottom)
            .attr('width', width + margin.right + margin.left)
          .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        var gx = svg.append('g')
          .attr('class', 'x axis')
          .call(xAxis);

        var gy = svg.append('g')
          .attr('class', 'y axis')
          .call(yAxis);

        gy.selectAll('text')
          .attr('x', 2)
          .attr('dy', -2);

        // Plot points
        var gEx = svg.append('g');
        var plotExamples = function(exampleData) {
          exampleData = (exampleData || []).filter(function(ex) {
            return isFinite(ex.x) && isFinite(ex.y);
          });

          var examples = gEx.selectAll('circle')
            .data(exampleData, function(ex) {
              return '(' + ex.x + ',' + ex.y + ',' + (ex.isPositive ? 'p' : 'n') + ')';
            });

          examples.enter().append('circle')
            .attr({
              cx: function(d) {return xScale(d.x);},
              cy: function(d) {return yScale(d.y);},
              r: 4
            })
            .style('stroke', 'black')
            .style('fill', function(d) {
              return d.isPositive ? 'black' : 'white';
            });

          examples.exit().remove();
        };

        var gHyposGeneral = svg.append('g')
          , gHyposSpecific = svg.append('g');
        var plotHypotheses = function(hypoData, isGeneral) {
          hypoData = (hypoData || []).filter(function(h) {
            return isFinite(h.lowerLeftX) && isFinite(h.lowerLeftY) &&
              isFinite(h.topRightX) && isFinite(h.topRightY);
          });

          var gHypo = isGeneral ? gHyposGeneral : gHyposSpecific
            , hypos = gHypo.selectAll('rect')
              .data(hypoData, function(d) {
                return '(' + [
                  d.lowerLeftX, d.lowerLeftY, d.topRightX, d.topRightY
                ].join(',') + ')';
              });

          hypos.enter().append('rect')
            .attr({
              x: function(d) { return xScale(d.lowerLeftX); },
              y: function(d) { return yScale(d.topRightY); },
              width: function(d) { return xScale(d.topRightX - d.lowerLeftX); },
              height: function(d) {
                // I must have messed something up elsewhere... I shouldn't have
                // to subtract the height from 10...
                return yScale((UNI_MAX-UNI_MIN) - (d.topRightY - d.lowerLeftY));
              }
            })
            .attr('class', 'hypothesis')
            .style('stroke', isGeneral ? 'gold' : 'blue')
            .style('fill', isGeneral ? 'yellow' : 'blue')
            .style('fill-opacity', '0.1');

          hypos.exit().remove();
        };

        var plotGeneralHypotheses = function(hypos) {
          plotHypotheses(hypos, true);
        };

        var plotSpecificHypotheses = function(hypos) {
          plotHypotheses(hypos, false);
        };

        scope.$watch('examples', plotExamples, true);
        scope.$watch('generalHypotheses', plotGeneralHypotheses, true);
        scope.$watch('specificHypotheses', plotSpecificHypotheses, true);
      }
    };
  });

