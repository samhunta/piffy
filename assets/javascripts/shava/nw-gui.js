

function App() {
}

App.prototype = {
  registerGlobalHotkey: noop,
  unregisterGlobalHotKey: noop
};

function Window(window) {
  this._window = window;
  Window.opened.push(this);
}

Window.opened = [];

Window.prototype = {
  show: function(){},
  showDevTools: function(){},
  minimize: function(){},
  maximize: function(){},
  close: function(){
    Window.opened.splice(Window.opened.indexOf(this), 1);
    $window.location=$window.NW_CLOSE_URL||'about:blank';
  }
};

function noop(){}

function Menu() {
  this.menu = [];
}
Menu.prototype = {
  popup: function (x, y) {
    var self = this;

    var menuOptions = [

      {
        icon: 'fa-download',
        text: 'DOWNLOAD'
      }

    ];

    window.angular.injector(['shava.services.contextMenu', 'ng'])
      .invoke(['shavaContextMenuFactory', function(shavaContextMenuFactory){
        shavaContextMenuFactory({
          options: menuOptions
        });
      }]);
  },
  append: function (menuItem) {
    this.menu = menuItem;
  },
  removeAt: function (menuItemIndex) {
    this.menu.splice(menuItemIndex, 1);
  }
};

function Shortcut() {
}

Shortcut.prototype = {
  on: noop,
  off: noop
};

function MenuItem(opts) {
  this.label = opts.label;
  this.click = opts.click;
  this.type = opts.type;
}
MenuItem.prototype = {

};

function Tray() {
}

Window.open = function (url) {
  location.href = url;
  return new Window();
};

Window.get = function () {
  return Window._mainWindow;
};

Window._mainWindow = new Window();

Window.show = Window.hide =
Window.setMinimumSize = Window.setMaximumSize = 
Window.setWidth = Window.setHeight = noop;

module.exports = {
  nodeless: true,
  Menu: Menu,
  MenuItem: MenuItem,
  Shortcut: Shortcut,
  Tray: Tray,
  Window: Window,
  App: App
};