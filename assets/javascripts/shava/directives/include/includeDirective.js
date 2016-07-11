(function () {
  
  angular.module('shava.directives.include', [])

    .directive('shInclude', shInclude);

  shInclude.$inject = ['$compile', '$parse', '$templateCache', '$http', '$controller'];

  function shInclude($compile, $parse, $templateCache, $http, $controller) {

    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var html = element.html()
          , init = false;

        scope.shInclude = $parse(attrs.shInclude)(scope);
        scope.shWatch = $parse(attrs.shWatch)(scope);

        scope.$watch('shInclude.controller', updateController);
        scope.$watch('shInclude.templateUrl', updateTemplateUrl);
        scope.$watch('shInclude.template', updateTemplate);

        function updateTemplateUrl(value) {
          if (value != null) {
            $http.get(value, { cache: $templateCache })
              .then(function(resp) {
                compile(element, resp.data, scope);
              });
          }
        }

        function updateController(value) {
          if (value != null) {
            var locals = scope.shInclude.locals || {};
            $controller(value, angular.extend(locals, {
              $scope: scope,
            }));
          }
        }

        function updateTemplate(value) {
          if (value != null) {
            compile(element, value, scope);
          }
        }

        function compile(element, html, scope) {
          element.html(html);
          $compile(element.contents())(scope);
        }
      }
    };

  }

})(); 