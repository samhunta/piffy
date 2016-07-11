(function () {
  angular.module('shava.directives.sorter.sorterItemDirective', [
    'shava.directives.sorter.sorterController',
    'shava.directives.sorter'
  ])
    .directive('shSorterItem', sorterItem);

  sorterItem.$inject = ['$document', '$timeout'];

  function sorterItem($document, $timeout) {
    return {
      restrict: 'A',
      require: '^shSorter',
      link: function (scope, element, attrs) {
        element.attr('draggable', true);

        element.on('draggesture dragstart', function (ev) {
          var dt = ev.originalEvent.dataTransfer;
          var el = document.createElement('span');

          element.trigger($.Event('dragClick', {
            shiftKey: ev.shiftKey,
            metaKey: ev.metaKey,
            ctrlKey: ev.ctrlKey
          }));

          el.innerHTML = scope.$eval(attrs.shSorterItem);
          el.id = 'shDragLabelEl';
          el.className = 'sh-drag-label';

          $document[0].body.appendChild(el);
          dt.effectAllowed = 'copyMove';
          dt.setDragImage(el, -20, 0);          
        });

        element.on('dragend', function (ev) {
          document.getElementById('shDragLabelEl').remove();
        });

      }
    };
  }
})(); 