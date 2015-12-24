'use strict';
//based on binding implementation by Josh Crowther
angular.module('bindPolymer', [])
  .directive('bindPolymer', ['$parse', function($parse) {
    var handler, context;
    return {
      restrict: 'A',
      scope: false,
      compile: function bindPolymerCompile(el, attr) {
        var attrMap = {};

        for (var prop in attr) {
          if (angular.isString(attr[prop])) {
            var _match = attr[prop].match(/\{\{\s*([\.\w]+)\s*\}\}/);
            if (_match) {
              attrMap[prop] = $parse(_match[1]);
            }
          }
        }
        return function bindPolymerLink(scope, element, attrs) {
          handler = attrs.eventNamespace ? scope[attrs.eventNamespace].polymerChange : scope.polymerChange;
          context = attrs.eventNamespace ? scope[attrs.eventNamespace] : scope;
          Object.keys(attrMap).forEach(function(key) {
            element.on(key + '-changed', function(event) {
              scope.$evalAsync(function() {
                if (attrMap[key](scope) === event.detail.value) return;
                attrMap[key].assign(scope, event.detail.value);
                if (typeof handler === 'function') {
                  handler.call(context);
                }
              });
            });
          });
        };
      }
    };
  }]);
