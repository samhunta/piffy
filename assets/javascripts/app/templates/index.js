(function () {

  angular.module('app.templates', []);

  var style = require('../../../stylesheets/app.css');
  style.use();

  // Load angular strap templates, for some reason
  // webpack is not including these?
  require('angular-strap/dist/angular-strap.tpl.js');

  require('./login.html');
  require('./app.html');
  require('./browse.html');
  require('./downloads.html');
  require('./queue.html');
  require('./playlist.html');
  require('./star-rating.html');
  require('./controversial.html');
  require('./loader.html');
  require('./home.html');
  require('./player.html');
  require('./preferences.html');
  require('./searchBar.html');
  require('./sidebar.html');
  require('./search.html');

})(); 