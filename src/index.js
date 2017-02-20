/**
 * Module : Kero webpack entry index
 * Author : yaoxinc
 * Date	  : 2017-01-17 16:51:05
 */
import {extend} from 'tinper-sparrow/src/extend';

import {EnableMixin} from './enableMixin';
import {RequiredMixin} from './requiredMixin';
import {ValidateMixin} from './validateMixin';
import {ValueMixin} from './valueMixin';

var ex = {
	EnableMixin: EnableMixin,
	RequiredMixin: RequiredMixin,
	ValidateMixin: ValidateMixin,
	ValueMixin: ValueMixin
};

extend(ex,window.u || {});
window.u = ex;
export { ex as u };
