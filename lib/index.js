'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.u = undefined;

var _extend = require('tinper-sparrow/src/extend');

var _enableMixin = require('./enableMixin');

var _requiredMixin = require('./requiredMixin');

var _validateMixin = require('./validateMixin');

var _valueMixin = require('./valueMixin');

var ex = {
  EnableMixin: _enableMixin.EnableMixin,
  RequiredMixin: _requiredMixin.RequiredMixin,
  ValidateMixin: _validateMixin.ValidateMixin,
  ValueMixin: _valueMixin.ValueMixin
}; /**
    * Module : Kero webpack entry index
    * Author : yaoxinc
    * Date	  : 2017-01-17 16:51:05
    */


(0, _extend.extend)(ex, window.u || {});
window.u = ex;
exports.u = ex;