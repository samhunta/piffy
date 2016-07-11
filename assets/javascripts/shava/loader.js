(function (context) {

var headEl = document.getElementsByTagName('head')[0];

context.shava = {

  tag: function (type, attributes, sync) {
    var el = document.createElement(type)
      , attrName
      , append;

    for (attrName in attributes) {
      el.setAttribute(attrName, attributes[attrName]);
    }

    sync ? document.write(outerHTML(el)) : headEl.appendChild(el);      
  },

  load: function (args, sync) {
    var i;
    
    for (i = 0; i < args.length; i++) {
      context.shava.tag('script', { src: args[i] }, sync);
    }
  }

};

function outerHTML(el) {
  return el.outerHTML || (function () {
    var d = document.createElement('div'), h;
    d.appendChild(el);
    h = d.innerHTML;
    div = null;
    return h;
  }());
}

}(this));