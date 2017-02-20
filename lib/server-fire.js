'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setSuccessFunc = exports._successFunc = exports.fire = undefined;

var _extend = require('tinper-sparrow/js/extend');

var _ajax = require('tinper-sparrow/js/ajax');

/**
 * Module : kero app serverEvent fire
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-07-29 09:34:01
 */
var fire = function fire(p) {
    var self = this;
    var data = this.getData();
    data.parameters = ko.utils.stringifyJson(this.params);
    var params = {
        type: p.type || "POST",
        data: p.params || {},
        url: p.url || ServerEvent.DEFAULT.url,
        async: typeof p.async == 'undefined' ? ServerEvent.DEFAULT.async : p.async,
        singleton: p.singleton || ServerEvent.DEFAULT.singleton,
        success: p.success,
        error: p.error,
        dataType: 'json'
    };
    params.data.ctrl = p.ctrl;
    params.data.method = p.method;
    if (this.event) params.data.event = ko.utils.stringifyJson(this.event);
    var preSuccess = p.preSuccess || function () {};
    var orignSuccess = p.success || function () {};
    var orignError = params.error; //|| function(){}
    this.orignError = orignError;
    var deferred = params.deferred;
    if (!deferred || !deferred.resolve) {
        deferred = {
            resolve: function resolve() {}, reject: function reject() {}
        };
    }
    params.success = function (data, state, xhr) {
        if (typeof data === 'string') data = JSON.parse(data);
        if (self.processXHRError(self, data, state, xhr)) {
            preSuccess.call(null, data);
            self._successFunc(data, deferred);
            orignSuccess.call(null, data.custom);
            deferred.resolve();
        } else {
            deferred.reject();
        }
    };
    params.error = function (data, state, xhr) {
        if (typeof data === 'string') data = JSON.parse(data);
        if (self.processXHRError(self, data, state, xhr)) {
            if (orignError) orignError.call(null, data.custom);
            //				self._successFunc(data, deferred)
        } else {
            deferred.reject();
        }
    };
    params.data = (0, _extend.extend)(params.data, data);
    if ($) $.ajax(params);else (0, _ajax.ajax)(params);
};

var _successFunc = function _successFunc(data, deferred) {
    if (typeof data === 'string') data = JSON.parse(data);
    var dataTables = data.dataTables;
    var dom = data.dom;
    if (dom) this.updateDom(JSON.parse(dom));
    if (dataTables) this.updateDataTables(dataTables, deferred);
};

var setSuccessFunc = function setSuccessFunc(func) {
    this._successFunc = func;
};

exports.fire = fire;
exports._successFunc = _successFunc;
exports.setSuccessFunc = setSuccessFunc;