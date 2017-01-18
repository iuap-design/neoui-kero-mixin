/**
 * Module : Kero Value Mixin
 * Author : Kvkens(yueming@yonyou.com)
 * Date   : 2016-08-08 15:58:49
 */


var ValueMixin = {
    init: function init() {
        var self = this;

        // 如果存在行对象则处理数据都针对此行进行处理
        if (parseInt(this.options.rowIndex) > -1) {
            if ((this.options.rowIndex + '').indexOf('.') > 0) {
                // 主子表的情况
                var childObj = this.getChildVariable();
                var lastRow = childObj.lastRow;
                var lastField = childObj.lastField;

                this.dataModel.on(DataTable.ON_VALUE_CHANGE, function (opt) {
                    var id = opt.rowId;
                    var field = opt.field;
                    var value = opt.newValue;
                    var obj = {
                        fullField: self.options.field,
                        index: self.options.rowIndex
                    };
                    var selfRow = self.dataModel.getChildRow(obj);
                    var row = opt.rowObj;
                    if (selfRow == row && field == lastField) {
                        self.modelValueChange(value);
                    }
                });

                this.dataModel.on(DataTable.ON_INSERT,function(opt){
                    var obj = {
                        fullField: self.options.field,
                        index: self.options.rowIndex
                    };
                    var rowObj = self.dataModel.getChildRow(obj);
                    if (rowObj) {
                        self.modelValueChange(rowObj.getValue(lastField));
                    }
                });

                if (lastRow) {
                    this.modelValueChange(lastRow.getValue(lastField));
                }
            } else {

                this.dataModel.on(DataTable.ON_VALUE_CHANGE, function (opt) {
                    var id = opt.rowId;
                    var field = opt.field;
                    var value = opt.newValue;
                    var row = opt.rowObj;
                    var rowIndex = self.dataModel.getRowIndex(row);
                    if (rowIndex == self.options.rowIndex && field == self.field) {
                        self.modelValueChange(value);
                    }
                });

                this.dataModel.on(DataTable.ON_INSERT,function(opt){
                    var rowObj = self.dataModel.getRow(self.options.rowIndex);
                    if (rowObj) {
                        self.modelValueChange(rowObj.getValue(self.field));
                    }
                });

                var rowObj = this.dataModel.getRow(this.options.rowIndex);
                if (rowObj) {
                    this.modelValueChange(rowObj.getValue(this.field));
                }
            }
        } else {
            this.dataModel.ref(this.field).subscribe(function (value) {
                self.modelValueChange(value);
            });
            this.modelValueChange(this.dataModel.getValue(this.field));
        }
    },
    methods: {
        /**
         * 获取与子表相关的变量
         * @param {Object} value
         */
        getChildVariable: function getChildVariable() {
            var indexArr = this.options.rowIndex.split('.');
            var lastIndex = indexArr[indexArr.length - 1];
            var fieldArr = this.options.field.split('.');
            var lastField = fieldArr[fieldArr.length - 1];
            var lastDataTable = this.dataModel;
            var lastRow = null;

            for (var i = 0; i < fieldArr.length; i++) {
                lastRow = lastDataTable.getRow(indexArr[i]);
                if(!lastRow)
                    break;
                if (i < fieldArr.length - 1) {
                    lastDataTable = lastRow.getValue(fieldArr[i]);
                }
            }
            return {
                lastField: lastField,
                lastIndex: lastIndex,
                lastDataTable: lastDataTable,
                lastRow: lastRow
            };
        },
        /**
         * 模型数据改变
         * @param {Object} value
         */
        modelValueChange: function (value) {
            if (this.slice) return;
            if (value === null || typeof value == "undefined")
                value = "";
            this.trueValue = this.formater ? this.formater.format(value) : value;
            //this.element.trueValue = this.trueValue;
            this.showValue = this.masker ? this.masker.format(this.trueValue).value : this.trueValue;
            this.setShowValue(this.showValue);

            //this.trueValue = value;
            //this.showValue = value;
            //this.setShowValue(this.showValue);
        },

        ///**
        // * 设置模型值
        // * @param {Object} value
        // */
        //setModelValue: function (value) {
        //    if (!this.dataModel) return;
        //    this.dataModel.setValue(this.field, value)
        //},
        /**
         * 设置控件值
         * @param {Object} value
         */
        setValue: function (value) {
            this.trueValue = this.formater ? this.formater.format(value) : value;
            this.showValue = this.masker ? this.masker.format(this.trueValue).value : this.trueValue;
            this.setShowValue(this.showValue);
            this.slice = true;
            if(parseInt(this.options.rowIndex) > -1){
                if((this.options.rowIndex + '').indexOf('.') > 0){
                    var childObj = this.getChildVariable();
                    var lastRow = childObj.lastRow;
                    var lastField = childObj.lastField;
                    if(lastRow)
                        lastRow.setValue(lastField, this.trueValue);
                }else{
                    var rowObj = this.dataModel.getRow(this.options.rowIndex);
                    if(rowObj)
                        rowObj.setValue(this.field, this.trueValue);
                }
                
            }else{
                this.dataModel.setValue(this.field, this.trueValue);
            }
            this.slice = false;
        },
        /**
         * 取控件的值
         */
        getValue: function () {
            return this.trueValue;
        },
        setShowValue: function (showValue) {
            this.showValue = showValue;
            this.element.value = showValue;
            this.element.title = showValue;

        },
        getShowValue: function () {
            return this.showValue
        },
        setModelValue: function (value) {
            if (!this.dataModel) return
            if(parseInt(this.options.rowIndex) > -1){
                if((this.options.rowIndex + '').indexOf('.') > 0){
                    var childObj = this.getChildVariable();
                    var lastRow = childObj.lastRow;
                    var lastField = childObj.lastField;
                    if(lastRow)
                        lastRow.setValue(lastField, this.trueValue);
                }else{
                    var rowObj = this.dataModel.getRow(this.options.rowIndex);
                    if(rowObj)
                        rowObj.setValue(this.field, value)
                }
            }else{
                this.dataModel.setValue(this.field, value)
            }
        }
    }
}

export {ValueMixin};
