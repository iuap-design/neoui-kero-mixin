/**
 * Module : Kero Enable Mixin
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-08-08 16:32:54
 */
import {
    addClass,
    removeClass
} from 'tinper-sparrow/src/dom';

var EnableMixin = {
    init: function() {
        var self = this;
        //处理只读
        /*if (this.options['enable'] && (this.options['enable'] == 'false' || this.options['enable'] == false)){
                this.setEnable(false);
        }else {
            this.dataModel.refEnable(this.field).subscribe(function (value) {
                self.setEnable(value);
            });
            this.setEnable(this.dataModel.isEnable(this.field));
        }*/



        var oEnable = this.options.enable,
            enable;
        if (typeof oEnable == 'undefined') {
            enable = this.dataModel.getRowMeta(this.field, 'enable');
        } else {
            enable = oEnable;
        }
        if (typeof enable == 'undefined' || enable == null)
            enable = true;
        this.enable = enable;
        this.setEnable(this.enable);
        //refEnable方法：绑定字段是否可修改属性，当字段enable属性发生改变时触发对应方法
        this.dataModel.refEnable(this.field).subscribe(function(value) {
            self.setEnable(value);
        });
    },
    methods: {
        setEnable: function(enable) {
            if (enable === true || enable === 'true') {
                this.enable = true;
                this.element.removeAttribute('readonly');
                removeClass(this.element.parentNode, 'disablecover');
            } else if (enable === false || enable === 'false') {
                this.enable = false;
                this.element.setAttribute('readonly', 'readonly');
                addClass(this.element.parentNode, 'disablecover');
            }
        }
    }
}

export {
    EnableMixin
};
