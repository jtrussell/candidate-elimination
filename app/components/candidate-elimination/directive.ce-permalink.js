
angular.module('ce.permalink.directive', ['ex'])
  .directive('cePermalink', function(exExample) {
    'use strict';
    return {
      scope: {
        examples: '='
      },
      transclude: true,
      template: [
        '<span>',
          '<span class="glyphicon glyphicon-link">',
          '</span>',
          '<a ng-href="{{perma.makeLink(examples)}}" ng-transclude></a>',
        '</span>'
      ].join('\n'),
      controllerAs: 'perma',
      controller: function(exHistory) {
        this.makeLink = exHistory.permalink;
      }
    };
  });
