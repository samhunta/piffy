/**
 * TODO:
 *   - Add horizontal scroll support
 *   - Add horizontal body spacing support
 */
(function () {
  
  angular.module('shava.directives.scrollarea.scrollareaController', [])

    .controller('ShScrollareaController', scrollerController);

  scrollerController.$inject = ['$element', '$timeout', '$attrs'];

  function scrollerController($element, $timeout, $attrs) {

    var bodySpacing = 0;
    var addSpacing = 0;

    this.setBodySpacing = function (iSpacing) {
      bodySpacing = parseInt(iSpacing);
    };

    this.incrementSpacing = function (iSpacing) {
      addSpacing = addSpacing + iSpacing;
    };

    this.decrementSpacing = function (iSpacing) {
      addSpacing = addSpacing - iSpacing;
    };

    this.onScroll = function (el, fn) {
      $element.on('scroll', fn);
      el.on('$destroy', function () {
        $element.off('scroll', fn);
      })
    };

    this.elOffsetTop = function (el) {
      return el.offset().top - bodySpacing;
    }

    this.scrollTop = function () {
      return $element.scrollTop();
    };

    this.scrollLeft = function () {
      return $element.scrollLeft();
    };

    this.position = function () {
      return $element.offset();
    };

    // This scrolls to an element with additional spacing
    // of offSpacing, offSpacing defaults to `1.5`
    // so it will scroll an extra half the element size 
    this.scrollTo = function (el, offSpacing) {
      // jQuery's offset() doesn't add the <body> padding
      // so we use addSpacing for that
      var height = $element.outerHeight()
        , top = $element.scrollTop()
        , posTop = this.elOffsetTop(el)
        , elHeight = el.outerHeight()
        , sizeOffset = (elHeight * (offSpacing != null ? offSpacing : 1.5));
      if (posTop - addSpacing < 0) {
        $element.scrollTop(top + posTop + elHeight - sizeOffset - addSpacing);
      }
      else if (posTop + elHeight > height) {
        $element.scrollTop((top + posTop - height) + sizeOffset);
      }

    };

  }

})(); 