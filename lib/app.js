'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _logic = require('./logic');

var _logic2 = _interopRequireDefault(_logic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Reading the input file synchronously.
var data = _fs2.default.readFileSync('clicks.json', "utf8");
var finalHashArr = (0, _logic2.default)(data, function (finalHashArr) {
    console.log("Output", finalHashArr);
});