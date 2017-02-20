'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setEnable = undefined;

var _util = require('tinper-sparrow/js/util');

var setEnable = function setEnable(enable) {
    (0, _util.each)(this.elements, function (i, element) {
        if (element) {
            element.querySelectorAll('[u-meta]').each(function () {
                if (this['u-meta']) {
                    var comp = this['u-meta'];
                    if (comp.setEnable) comp.setEnable(enable);
                }
            });
        }
    });
}; /**
    * Module : compox-util util
    * Author : huyue(huyueb@yonyou.com)
    * Date   : 2017-01-18 09:34:01
    */

exports.setEnable = setEnable;