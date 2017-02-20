'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.compsValidateMultiParam = exports.compsValidate = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Module : compox-util validate
                                                                                                                                                                                                                                                                               * Author : huyue(huyueb@yonyou.com)
                                                                                                                                                                                                                                                                               * Date   : 2017-01-18 09:34:01
                                                                                                                                                                                                                                                                               */

var _env = require('tinper-sparrow/js/env');

var _dom = require('tinper-sparrow/js/dom');

/**
 * 控件数据校验
 * @param {Object} element
 */
var compsValidate = function compsValidate(element, retUnpass) {
    var comps = this.getComps(element),
        passed = true,
        unpassed = [];
    for (var i = 0; i < comps.length; i++) {
        if (comps[i].doValidate) {
            var result = comps[i].doValidate({ trueValue: true, showMsg: true });
            result = (typeof result === 'undefined' ? 'undefined' : _typeof(result)) === 'object' ? result['passed'] : result;
            passed = result && passed;
            if (!result) unpassed.push(comps[i]);
        }
    }
    if (retUnpass) return unpassed;
    return passed;
};

var compsValidateMultiParam = function compsValidateMultiParam(options) {
    var element = options.element,
        comps = this.getComps(element),
        passed = true,
        showMsg = options.showMsg,
        notPassedArr = new Array();
    for (var i = 0; i < comps.length; i++) {
        if (comps[i].doValidate) {
            var result = comps[i].doValidate({ trueValue: true, showMsg: showMsg });
            // 如果passed为true,result.passed为false说明第一次出现错误校验
            if (passed && !result.passed) {
                var off = (0, _dom.getOffset)(comps[i].element);
                //滚动到第一次出现错误的地方
                window.scrollTo(0, off.top - 80);
                if (_env.env.isIPAD) {
                    // ipad上面云表单提交校验的时候没有滚动到对应位置
                    window.top.scrollTo(0, off.top - 80);
                }
            }
            passed = result.passed && passed;
            if (!result.passed) {
                notPassedArr.push(result);
            }
        }
    }
    return { passed: passed,
        notPassedArr: notPassedArr };
};

exports.compsValidate = compsValidate;
exports.compsValidateMultiParam = compsValidateMultiParam;