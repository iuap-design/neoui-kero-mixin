"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Module : compox-util iwebCore
 * Author : huyue(huyueb@yonyou.com)
 * Date	  : 2017-01-18 09:34:01
 */

var getEnvironment = function getEnvironment() {
    return u.core.collectEnvironment();
};

var setClientAttribute = function setClientAttribute(k, v) {
    u.core.setClientAttribute(k, v);
};

var getClientAttribute = function getClientAttribute(k) {
    return u.core.getClientAttributes()[k];
};

exports.getEnvironment = getEnvironment;
exports.setClientAttribute = setClientAttribute;
exports.getClientAttribute = getClientAttribute;