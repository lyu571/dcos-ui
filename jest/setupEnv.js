// jsdom doesn't have support for localStorage at the moment
global.localStorage = require('localStorage');
global.document.body.classList = {
  add: function () {},
  remove: function () {},
  toggle: function () {}
};

// Tests should just mock responses for the json API
// so let's just default to a noop
var RequestUtil = require('../src/js/utils/RequestUtil');
RequestUtil.json = function () {}
