"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Module : compox-util processXHRError
 * Author : huyue(huyueb@yonyou.com)
 * Date   : 2017-01-18 09:34:01
 */

var processXHRError = function processXHRError(rsl, state, xhr) {
    if (typeof rsl === 'string') rsl = JSON.parse(rsl);
    if (xhr.getResponseHeader && xhr.getResponseHeader("X-Error")) {
        if (u.showMessageDialog) {
            u.showMessageDialog({ type: "info", title: "提示", msg: rsl["message"], backdrop: true });
        } else {
            alert(rsl["message"]);
        }

        if (rsl["operate"]) {
            eval(rsl["operate"]);
        }
        return false;
    }
    return true;
};

exports.processXHRError = processXHRError;