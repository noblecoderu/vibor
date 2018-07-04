import { Injectable, Directive, TemplateRef, defineInjectable, NgModule, EventEmitter, Component, ViewEncapsulation, forwardRef, ElementRef, ViewChild, Input, ContentChild, Output } from '@angular/core';
import { __spread, __values } from 'tslib';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgViborService = /** @class */ (function () {
    function NgViborService() {
    }
    NgViborService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    NgViborService.ctorParameters = function () { return []; };
    /** @nocollapse */ NgViborService.ngInjectableDef = defineInjectable({ factory: function NgViborService_Factory() { return new NgViborService(); }, token: NgViborService, providedIn: "root" });
    return NgViborService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ViborDropdownDirective = /** @class */ (function () {
    function ViborDropdownDirective(templateRef) {
        this.templateRef = templateRef;
    }
    ViborDropdownDirective.decorators = [
        { type: Directive, args: [{ selector: '[vibor-dropdown-element]' },] },
    ];
    /** @nocollapse */
    ViborDropdownDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return ViborDropdownDirective;
}());
var ViborSelectedDirective = /** @class */ (function () {
    function ViborSelectedDirective(templateRef) {
        this.templateRef = templateRef;
    }
    ViborSelectedDirective.decorators = [
        { type: Directive, args: [{ selector: '[vibor-selected-element]' },] },
    ];
    /** @nocollapse */
    ViborSelectedDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return ViborSelectedDirective;
}());
var ViborBothDirective = /** @class */ (function () {
    function ViborBothDirective(templateRef) {
        this.templateRef = templateRef;
    }
    ViborBothDirective.decorators = [
        { type: Directive, args: [{ selector: '[vibor-both-element]' },] },
    ];
    /** @nocollapse */
    ViborBothDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return ViborBothDirective;
}());
var ViborCreateDirective = /** @class */ (function () {
    function ViborCreateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    ViborCreateDirective.decorators = [
        { type: Directive, args: [{ selector: '[vibor-create]' },] },
    ];
    /** @nocollapse */
    ViborCreateDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return ViborCreateDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?} object
 * @param {?} prop
 * @return {?}
 */
function fetchFromObject(object, prop) {
    if (object === undefined || prop === undefined) {
        return object;
    }
    var /** @type {?} */ index = prop.indexOf('.');
    if (index > -1) {
        return fetchFromObject(object[prop.substring(0, index)], prop.substr(index + 1));
    }
    return object[prop];
}
/**
 * @param {?} data
 * @param {?} valuePropertyName
 * @return {?}
 */
function defaultFormatter(data, valuePropertyName) {
    var /** @type {?} */ html = '';
    html += fetchFromObject(data, valuePropertyName) ? "<b>" + fetchFromObject(data, valuePropertyName) + "</b>" : '';
    return html;
}
// Used for matching numbers
var /** @type {?} */ core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
var /** @type {?} */ rnumnonpx = new RegExp('^(' + core_pnum + ')(?!px)[a-z%]+$', 'i');
/**
 * @param {?} name
 * @param {?} extra
 * @param {?} isBorderBox
 * @param {?} styles
 * @return {?}
 */
function augmentWidthOrHeight(name, extra, isBorderBox, styles) {
    var /** @type {?} */ i = extra === (isBorderBox ? 'border' : 'content') ?
        4 :
        // Otherwise initialize for horizontal or vertical properties
        name === 'width' ? 1 : 0, /** @type {?} */
    val = 0;
    var /** @type {?} */ cssExpand = ['Top', 'Right', 'Bottom', 'Left'];
    /**
     * @param {?} _name
     * @return {?}
     */
    function getStyleValue(_name) {
        return parseFloat(styles[_name]);
    }
    for (; i < 4; i += 2) {
        // both box models exclude margin, so add it if we want it
        if (extra === 'margin') {
            val += getStyleValue(extra + cssExpand[i]);
        }
        if (isBorderBox) {
            // border-box includes padding, so remove it if we want content
            if (extra === 'content') {
                val -= getStyleValue('padding' + cssExpand[i]);
            }
            // at this point, extra isn't border nor margin, so remove border
            if (extra !== 'margin') {
                val -= getStyleValue('border' + cssExpand[i] + 'Width');
            }
        }
        else {
            val += getStyleValue('padding' + cssExpand[i]);
            // at this point, extra isn't content nor padding, so add border
            if (extra !== 'padding') {
                val += getStyleValue('border' + cssExpand[i] + 'Width');
            }
        }
    }
    return val;
}
/**
 * @param {?} elem
 * @return {?}
 */
function getWindow(elem) {
    return elem != null && elem === elem.window ? elem : elem.nodeType === 9 && elem.defaultView;
}
/**
 * @param {?} elem
 * @return {?}
 */
function getOffset(elem) {
    var /** @type {?} */ docElem, /** @type {?} */ win;
    var /** @type {?} */ box = elem.getBoundingClientRect();
    var /** @type {?} */ doc = elem && elem.ownerDocument;
    if (!doc) {
        return;
    }
    docElem = doc.documentElement;
    win = getWindow(doc);
    return {
        top: box.top + win.pageYOffset - docElem.clientTop,
        left: box.left + win.pageXOffset - docElem.clientLeft
    };
}
/**
 * @param {?} list
 * @param {?} item
 * @return {?}
 */
function scrollActiveOption(list, item) {
    var /** @type {?} */ y, /** @type {?} */ height_menu, /** @type {?} */ height_item, /** @type {?} */ scroll, /** @type {?} */ scroll_top, /** @type {?} */ scroll_bottom;
    if (item) {
        height_menu = list.offsetHeight;
        height_item = getWidthOrHeight(item, 'height', 'margin'); // outerHeight(true);
        scroll = list.scrollTop || 0;
        y = getOffset(item).top - getOffset(list).top + scroll;
        scroll_top = y;
        scroll_bottom = y - height_menu + height_item;
        // TODO Make animation
        if (y + height_item > height_menu + scroll) {
            list.scrollTop = scroll_bottom;
        }
        else if (y < scroll) {
            list.scrollTop = scroll_top;
        }
    }
}
/**
 * @param {?} elem
 * @param {?} name
 * @param {?} extra
 * @return {?}
 */
function getWidthOrHeight(elem, name, extra) {
    // Start with offset property, which is equivalent to the border-box value
    var /** @type {?} */ valueIsBorderBox = true;
    var /** @type {?} */ val = name === 'width' ? elem.offsetWidth : elem.offsetHeight;
    var /** @type {?} */ styles = window.getComputedStyle(elem, null);
    // some non-html elements return undefined for offsetWidth, so check for null/undefined
    // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
    // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
    if (val <= 0 || val == null) {
        // Fall back to computed then uncomputed css if necessary
        val = styles[name];
        if (val < 0 || val == null) {
            val = elem.style[name];
        }
        // Computed unit is not pixels. Stop here and return.
        if (rnumnonpx.test(val)) {
            return val;
        }
        // we need the check for style in case a browser which returns unreliable values
        // for getComputedStyle silently falls back to the reliable elem.style
        // valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );
        // Normalize '', auto, and prepare for extra
        val = parseFloat(val) || 0;
    }
    // use the active box-sizing model to add/subtract irrelevant styles
    return val + augmentWidthOrHeight(name, extra || ('content'), valueIsBorderBox, styles);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ deepEqual = require('deep-equal');
var NgViborComponent = /** @class */ (function () {
    function NgViborComponent(elementRef) {
        this.elementRef = elementRef;
        this.firstLoad = false;
        this.selectorPosition = 0;
        this.waitTime = 500;
        // Inputs & Outputs
        this.multiple = false;
        this.multipleLimit = Infinity;
        this.countOnPage = 10;
        this.placeholder = 'Vibor';
        this.required = false;
        this.allowReset = true;
        this.disabled = false;
        this.viewProperty = 'Name';
        this.modelProperty = 'id';
        this.preloadProperty = 'ids';
        this.preloadField = undefined;
        this.searchProperty = 'query';
        this.additionalFilter = {};
        this.changeFullModel = new EventEmitter();
        this.newMessage = undefined;
        this.CreateNew = function (query) {
            return query;
        };
        this.delay = (function () {
            var /** @type {?} */ timer = 0;
            return function (callback, ms) {
                clearTimeout(timer);
                timer = setTimeout(callback, ms);
            };
        })();
        this.onChange = function () { };
        this.onTouched = function () { };
        this.cacheLazyData = [];
        this.output = [];
    }
    /**
     * @param {?} index
     * @return {?}
     */
    NgViborComponent.prototype.TrackByFn = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        return index;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgViborComponent.prototype.showDropdownList = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (this.multiple && this.output.length >= this.multipleLimit) {
            return;
        }
        this.el.classList.add('open-vibor');
        this.inputEl.focus();
        this.updateOptions();
        this.onTouched();
    };
    /**
     * @return {?}
     */
    NgViborComponent.prototype.hideDropdownList = /**
     * @return {?}
     */
    function () {
        this.el.classList.remove('open-vibor');
        this.isOpen = false;
        this.inputEl.blur();
    };
    /**
     * @return {?}
     */
    NgViborComponent.prototype.hideDropdownListWithDelay = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            _this.hideDropdownList();
        }, 100);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgViborComponent.prototype.toggleDropdown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (this.isOpen) {
            this.hideDropdownList();
        }
        else {
            this.showDropdownList(undefined);
        }
    };
    /**
     * @return {?}
     */
    NgViborComponent.prototype.updateOptions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.isOpen = true;
        if (this.dataList instanceof Array) {
            this.options = this.dataList.filter(function (data) {
                if (!_this.query || _this.query.length === 0) {
                    return true;
                }
                var /** @type {?} */ f = fetchFromObject(data, _this.searchProperty);
                if (f === undefined) {
                    return false;
                }
                return JSON.stringify(f).indexOf(_this.query) >= 0;
            }).filter(function (data) {
                if (!_this.excludeList) {
                    return true;
                }
                var /** @type {?} */ d = fetchFromObject(data, _this.modelProperty).valueOf();
                return _this.excludeList.findIndex(function (ex) {
                    var /** @type {?} */ a = fetchFromObject(ex, _this.modelProperty).valueOf();
                    return deepEqual(d, a);
                }) < 0;
            });
        }
        else if (this.dataList instanceof Function) {
            if (this.dataListSub) {
                this.dataListSub.unsubscribe();
            }
            if (!this.currentCache) {
                this.currentCache = {
                    countElement: 0,
                    countPages: 1,
                    currentPage: 1,
                    objects: [],
                    query: this.query,
                    params: Object.assign({}, this.additionalFilter)
                };
                this.cacheLazyData.push(this.currentCache);
                var /** @type {?} */ params = /** @type {?} */ (Object.assign({}, this.additionalFilter));
                params[this.searchProperty] = this.query;
                this.dataListSub = (/** @type {?} */ (this.dataList(params, 1, this.countOnPage))).subscribe(function (answer) {
                    _this.currentCache.objects = _this.currentCache.objects.concat(answer.list);
                    _this.currentCache.countElement = answer.headers['count'];
                    _this.currentCache.countPages = Math.ceil(_this.currentCache.countElement / _this.countOnPage);
                }, function () { });
            }
        }
    };
    /**
     * @return {?}
     */
    NgViborComponent.prototype.updateOptionsInDelay = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ delayMs = this.dataList instanceof Array ? 10 : this.waitTime;
        // executing after user stopped typing
        this.delay(function () {
            _this.oldQuery = _this.query;
            _this.currentCache = _this.GetCache(_this.query);
            _this.updateOptions();
        }, delayMs);
    };
    /**
     * @return {?}
     */
    NgViborComponent.prototype.focusSelectedOption = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ list = /** @type {?} */ (this.el.getElementsByClassName('select-dropdown')[0]);
        var /** @type {?} */ targetLi = /** @type {?} */ (this.el.getElementsByClassName('select-dropdown-optgroup-option')[this.selectorPosition]);
        scrollActiveOption(list, targetLi);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgViborComponent.prototype.keyDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.Options) {
            this.showDropdownList(undefined);
            return;
        }
        var /** @type {?} */ totalNumItem = this.Options.length;
        if (this.ShowNew) {
            totalNumItem++;
        }
        switch (event.keyCode) {
            case 27:
                // ESC, hide auto complete
                this.hideDropdownList();
                break;
            case 38:
                // UP, select the previous li el
                this.selectorPosition = (totalNumItem + this.selectorPosition - 1) % totalNumItem;
                break;
            case 40:
                // DOWN, select the next li el or the first one
                this.isOpen = true;
                this.selectorPosition = (totalNumItem + this.selectorPosition + 1) % totalNumItem;
                break;
            case 13:
                // ENTER, choose it!!
                if (totalNumItem > 0) {
                    if (this.selectorPosition === this.Options.length) {
                        this.AddNewObject(this.CreateNew(this.query));
                    }
                    else {
                        this.selectOne(event, this.Options[this.selectorPosition]);
                    }
                }
                else if (this.ShowNew) {
                    this.AddNewObject(this.CreateNew(this.query));
                }
                break;
            default: break;
        }
        this.focusSelectedOption();
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    NgViborComponent.prototype.nextPage = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        var _this = this;
        $event.preventDefault();
        // Validators
        if (!(this.dataList instanceof Function)) {
            throw new Error('Data List mast be Function');
        }
        if (!this.currentCache) {
            throw new Error('For next page need cache for first Page');
        }
        if (this.currentCache.currentPage >= this.currentCache.countPages) {
            throw new Error('Max Page Limit');
        }
        if (this.dataListSub) {
            this.dataListSub.unsubscribe();
        }
        var /** @type {?} */ params = Object.assign({}, this.additionalFilter);
        params[this.searchProperty] = this.query;
        this.dataListSub = this.dataList(params, this.currentCache.currentPage + 1, this.countOnPage).subscribe(function (answer) {
            _this.currentCache.currentPage++;
            _this.currentCache.countElement = answer.headers['count'];
            _this.currentCache.countPages = Math.ceil(_this.currentCache.countElement / _this.countOnPage);
            _this.currentCache.objects = _this.currentCache.objects.concat(answer.list);
            _this.selectorPosition = (_this.currentCache.currentPage - 1) * _this.countOnPage + 1;
            _this.focusSelectedOption();
        }, function () { });
    };
    /**
     * @return {?}
     */
    NgViborComponent.prototype.clearProperty = /**
     * @return {?}
     */
    function () {
        this.selectorPosition = 0;
        this.query = undefined;
    };
    /**
     * @param {?} $event
     * @param {?} data
     * @return {?}
     */
    NgViborComponent.prototype.selectOne = /**
     * @param {?} $event
     * @param {?} data
     * @return {?}
     */
    function ($event, data) {
        // Фильтр ненужных событий
        if ($event instanceof MouseEvent && $event.button !== 0) {
            return;
        }
        if (this.multiple && this.output.length < this.multipleLimit) {
            this.output.push(data);
        }
        else if (!this.multiple) {
            this.output = [data];
        }
        this.changeFullModel.emit(this.output);
        this.Model = this.ValueFromOutput;
        this.clearProperty();
        this.hideDropdownList();
        $event.preventDefault();
    };
    /**
     * @param {?} index
     * @param {?} event
     * @return {?}
     */
    NgViborComponent.prototype.removeOne = /**
     * @param {?} index
     * @param {?} event
     * @return {?}
     */
    function (index, event) {
        if (event) {
            event.stopPropagation();
        }
        this.output.splice(index, 1);
        this.Model = this.ValueFromOutput;
        // set class
        this.onTouched();
        this.inputControl.control.markAsTouched();
        // open dropdown
        if (this.required) {
            this.showDropdownList(undefined);
        }
    };
    Object.defineProperty(NgViborComponent.prototype, "SelectedTemplate", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.selectedTemplate) {
                return this.selectedTemplate.templateRef;
            }
            else if (this.bothTemplate) {
                return this.bothTemplate.templateRef;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgViborComponent.prototype, "DropdownTemplate", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.dropdownTemplate) {
                return this.dropdownTemplate.templateRef;
            }
            else if (this.bothTemplate) {
                return this.bothTemplate.templateRef;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} data
     * @return {?}
     */
    NgViborComponent.prototype.getListFormatted = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var /** @type {?} */ formatter = this.listFormatter || defaultFormatter;
        return formatter.apply(this, [data, this.viewProperty]);
    };
    /**
     * @param {?} data
     * @return {?}
     */
    NgViborComponent.prototype.getDropdownFormatted = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var /** @type {?} */ formatter = this.dropdownFormatter || defaultFormatter;
        return formatter.apply(this, [data, this.viewProperty]);
    };
    /**
     * @return {?}
     */
    NgViborComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // this.Model = this.ValueFromOutput; Это вроде тут тоже уже не надо.
        this.el = this.elementRef.nativeElement.getElementsByClassName('vibor').item(0);
        if (this.multiple)
            this.el.classList.add('multiple');
        if (this.required)
            this.el.classList.add('required');
        this.inputEl = /** @type {?} */ ((this.el.querySelector('input')));
    };
    /**
     * @param {?} inputs
     * @return {?}
     */
    NgViborComponent.prototype.ngOnChanges = /**
     * @param {?} inputs
     * @return {?}
     */
    function (inputs) {
        if (inputs['dataList'] && inputs['dataList'].currentValue) {
            // Output
            if (this.Model === undefined || this.Model == null) {
                this.output = [];
                this.changeFullModel.emit(this.output);
            }
            else if (this.Model instanceof Array && this.multiple) {
                this.Output = this.Model;
            }
            else if (!(this.Model instanceof Array) && !this.multiple) {
                this.Output = [this.Model];
                if (!this.output || !this.output.length) {
                    this.Model = undefined;
                }
            }
        }
        if (this.el && inputs['multiple']) {
            if (inputs['multiple'].currentValue) {
                this.el.classList.add('multiple');
            }
            else {
                this.el.classList.remove('multiple');
            }
        }
        if (this.el && inputs['required']) {
            if (inputs['required'].currentValue) {
                this.el.classList.add('required');
            }
            else {
                this.el.classList.remove('required');
            }
        }
        if (inputs['additionalFilter']) {
            this.currentCache = this.GetCache(this.query);
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NgViborComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        // Нормальный update модели
        if (value) {
            if ((value instanceof Array && !this.multiple) || (!(value instanceof Array) && this.multiple)) {
                throw new Error('Model Type Error');
            }
            if (value instanceof Array && this.Model instanceof Array) {
                if (value.length === this.Model.length && value.every(function (v) { return _this.Model.indexOf(v) >= 0; })) {
                    return;
                }
            }
            else if (this.Model === value) {
                return;
            }
            this.firstLoad = true;
            this.Model = value;
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgViborComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgViborComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NgViborComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
        if (isDisabled) {
            this.el.setAttribute('disabled', 'disabled');
        }
        else {
            this.el.removeAttribute('disabled');
        }
        // disable other components here
    };
    Object.defineProperty(NgViborComponent.prototype, "Model", {
        get: /**
         * @return {?}
         */
        function () {
            return this._model;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this.onlyEmitter) {
                this.output = [];
                this.onChange(value);
                return;
            }
            // Output
            if (value === undefined || value == null) {
                this.output = [];
                this.changeFullModel.emit(this.output);
            }
            else if (value instanceof Array && this.multiple) {
                this.Output = value;
            }
            else if (!(value instanceof Array) && !this.multiple) {
                this.Output = [value];
            }
            // Model
            this._model = value;
            // Forms
            this.onChange(this._model);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgViborComponent.prototype, "InputHide", {
        // PROPERTY
        get: /**
         * @return {?}
         */
        function () {
            if (this.multiple) {
                return this.output.length >= this.multipleLimit;
            }
            else {
                return this.output.length === 1 && !this.isOpen;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgViborComponent.prototype, "ValueFromOutput", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.multiple) {
                var /** @type {?} */ tmp = [];
                try {
                    for (var _a = __values(this.output), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var o = _b.value;
                        tmp.push(fetchFromObject(o, this.modelProperty));
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return tmp;
            }
            else {
                return fetchFromObject(this.output[0], this.modelProperty);
            }
            var e_1, _c;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgViborComponent.prototype, "Output", {
        set: /**
         * @param {?} newValue
         * @return {?}
         */
        function (newValue) {
            var _this = this;
            var /** @type {?} */ dataList = [];
            if (this.dataList instanceof Array) {
                dataList = this.dataList;
            }
            else if (this.dataList instanceof Function) {
                if (newValue && newValue.length && this.firstLoad) {
                    var /** @type {?} */ params = {};
                    this.firstLoad = false;
                    if (!this.preloadProperty) {
                        this.output = newValue;
                        this.changeFullModel.emit(this.output);
                    }
                    else {
                        params[this.preloadProperty] = newValue.map(function (val) { return fetchFromObject(val, _this.preloadField); });
                        this.dataListSub = (/** @type {?} */ (this.dataList(params, 1, this.countOnPage))).subscribe(function (answer) {
                            _this.output = answer.list;
                            _this.changeFullModel.emit(_this.output);
                        }, function () { });
                    }
                }
                else {
                    this.changeFullModel.emit(this.output);
                }
                return;
            }
            else {
                if (this.dataList === undefined) {
                    return;
                }
                throw new Error('dataList value Error');
            }
            var /** @type {?} */ newOutput = [];
            try {
                for (var newValue_1 = __values(newValue), newValue_1_1 = newValue_1.next(); !newValue_1_1.done; newValue_1_1 = newValue_1.next()) {
                    var v = newValue_1_1.value;
                    try {
                        for (var dataList_1 = __values(dataList), dataList_1_1 = dataList_1.next(); !dataList_1_1.done; dataList_1_1 = dataList_1.next()) {
                            var d = dataList_1_1.value;
                            var /** @type {?} */ a = fetchFromObject(d, this.modelProperty) ? fetchFromObject(d, this.modelProperty).valueOf() : undefined;
                            var /** @type {?} */ b = v ? v.valueOf() : undefined;
                            if (deepEqual(a, b)) {
                                newOutput.push(d);
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (dataList_1_1 && !dataList_1_1.done && (_a = dataList_1.return)) _a.call(dataList_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (newValue_1_1 && !newValue_1_1.done && (_b = newValue_1.return)) _b.call(newValue_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            this.output = newOutput;
            this.changeFullModel.emit(this.output);
            var e_3, _b, e_2, _a;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgViborComponent.prototype, "Options", {
        get: /**
         * @return {?}
         */
        function () {
            var _this = this;
            var /** @type {?} */ options;
            if (this.dataList instanceof Array) {
                options = this.options;
            }
            else if (this.dataList instanceof Function) {
                var /** @type {?} */ oldCache = this.GetCache(this.oldQuery);
                if (!this.currentCache && oldCache) {
                    options = oldCache.objects;
                }
                else {
                    options = this.currentCache ? this.currentCache.objects : [];
                }
            }
            return (options || []).filter(function (op) {
                return _this.output.findIndex(function (o) {
                    var /** @type {?} */ a = fetchFromObject(o, _this.modelProperty) ? fetchFromObject(o, _this.modelProperty).valueOf() : undefined;
                    var /** @type {?} */ b = fetchFromObject(op, _this.modelProperty) ? fetchFromObject(op, _this.modelProperty).valueOf() : undefined;
                    return deepEqual(a, b);
                }) === -1;
            });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} query
     * @return {?}
     */
    NgViborComponent.prototype.GetCache = /**
     * @param {?} query
     * @return {?}
     */
    function (query) {
        var _this = this;
        if (this.dataList instanceof Function) {
            return this.cacheLazyData.find(function (cache) {
                return cache.query === _this.query && deepEqual(cache.params, _this.additionalFilter);
            });
        }
        return undefined;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NgViborComponent.prototype.AddNewObject = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        if (value instanceof Observable) {
            value.subscribe(function (newObject) {
                if (newObject !== undefined) {
                    _this.SetNewObject(newObject);
                }
            });
        }
        else {
            this.SetNewObject(value);
        }
    };
    /**
     * @param {?} newObject
     * @return {?}
     */
    NgViborComponent.prototype.SetNewObject = /**
     * @param {?} newObject
     * @return {?}
     */
    function (newObject) {
        if (this.dataList instanceof Array) {
            this.dataList.push(newObject);
        }
        else if (this.dataList instanceof Function) {
            try {
                for (var _a = __values(this.cacheLazyData), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var cache = _b.value;
                    if (this.query.includes(cache.query) || cache.query === undefined || cache.query === '') {
                        cache.countElement++;
                        cache.objects.push(newObject);
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        this.firstLoad = false;
        this.query = undefined;
        this.currentCache = this.GetCache(this.query);
        this.selectOne(new MouseEvent('click'), newObject);
        var e_4, _c;
    };
    Object.defineProperty(NgViborComponent.prototype, "ShowNew", {
        get: /**
         * @return {?}
         */
        function () {
            var _this = this;
            var /** @type {?} */ a = this.query && this.newMessage && (!this.dataListSub || this.dataListSub.closed);
            var /** @type {?} */ b = this.Options.findIndex(function (o) {
                var /** @type {?} */ c = fetchFromObject(o, _this.viewProperty) ? fetchFromObject(o, _this.viewProperty).valueOf() : undefined;
                return deepEqual(c, _this.query);
            }) === -1 && this.output.findIndex(function (o) {
                var /** @type {?} */ c = fetchFromObject(o, _this.viewProperty) ? fetchFromObject(o, _this.viewProperty).valueOf() : undefined;
                return deepEqual(c, _this.query);
            }) === -1;
            return a && b;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgViborComponent.prototype, "ShowEmpty", {
        get: /**
         * @return {?}
         */
        function () {
            return this.Options.length === 0 && (!(this.dataList instanceof Function) || (this.dataListSub.closed));
        },
        enumerable: true,
        configurable: true
    });
    NgViborComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'vibor',
                    template: "<div class=\"vibor\">\n  <ng-content></ng-content>\n\n  <div class=\"select-search\" (click)=\"showDropdownList($event);\">\n    <ul class=\"select-search-list\">\n      <ng-container *ngIf=\"multiple || !isOpen\">\n        <ng-container *ngIf=\"!SelectedTemplate; else selectedT\">\n          <li class=\"select-search-list-item select-search-list-item_selection\" *ngFor=\"let item of output; let $index=index; let $last=last; trackBy: TrackByFn;\">\n            <div class=\"vibor__selection\">\n              <div [innerHTML]=\"getListFormatted(item)\"></div>\n              <a class=\"select-search-list-item_remove\" *ngIf=\"allowReset\" (click)=\"!disabled && removeOne($index, $event)\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\">\n                  <path fill=\"#2c2c2c\" d=\"M10.1 4.5L8 6.6 5.9 4.5 4.5 5.9 6.6 8l-2.1 2.1 1.4 1.4L8 9.4l2.1 2.1 1.4-1.4L9.4 8l2.1-2.1z\"/>\n                </svg>\n              </a>\n            </div>\n          </li>\n        </ng-container>\n\n        <ng-template #selectedT>\n          <li class=\"select-search-list-item select-search-list-item_selection\" *ngFor=\"let item of output; let $index=index; let $last=last; trackBy: TrackByFn;\">\n            <div class=\"vibor__selection\">\n              <ng-container *ngTemplateOutlet=\"SelectedTemplate; context: {item: item}\"></ng-container>\n              <a class=\"select-search-list-item_remove\" *ngIf=\"allowReset && !disabled\" (click)=\"!disabled && removeOne($index, $event)\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\">\n                  <path fill=\"#2c2c2c\" d=\"M10.1 4.5L8 6.6 5.9 4.5 4.5 5.9 6.6 8l-2.1 2.1 1.4 1.4L8 9.4l2.1 2.1 1.4-1.4L9.4 8l2.1-2.1z\"/>\n                </svg>\n              </a>\n            </div>\n          </li>\n        </ng-template>\n      </ng-container>\n\n      <li class=\"select-search-list-item select-search-list-item_input\" [class.select-search-list-item_hide]=\"InputHide\">\n        <input autocomplete=\"off\" #inputControl=\"ngModel\" [name]=\"name\" [disabled]=\"disabled\" [(ngModel)]=\"query\" [placeholder]=\"output.length == 0 || (multiple && output.length < multipleLimit) ? placeholder : ''\"\n          (input)=\"updateOptionsInDelay()\" (keydown)=\"keyDown($event)\" />\n      </li>\n      <li class=\"select-search-list-item select-search-list-item_loader-center\" [hidden]=\"!dataListSub || dataListSub.closed\">\n        <div class=\"select-search-list-item_loader\"></div>\n      </li>\n\n      <span class=\"arrow\" (click)=\"toggleDropdown($event)\">\n      </span>\n    </ul>\n  </div>\n\n  <div class=\"select-dropdown\" *ngIf=\"isOpen\">\n    <ul class=\"select-dropdown-optgroup\">\n      <ng-container *ngIf=\"!DropdownTemplate; else dropdownT\">\n        <li class=\"select-dropdown-optgroup-option\" *ngFor=\"let option of Options; let i=index\" (mousedown)=\"selectOne($event, option)\"\n          [class.active]=\"i === selectorPosition\" [innerHTML]=\"getDropdownFormatted(option)\">\n        </li>\n      </ng-container>\n\n      <ng-template #dropdownT>\n        <li class=\"select-dropdown-optgroup-option\" *ngFor=\"let option of Options; let i=index\" (mousedown)=\"selectOne($event, option)\"\n          [class.active]=\"i === selectorPosition\">\n          <ng-container *ngTemplateOutlet=\"DropdownTemplate; context: {item: option}\"></ng-container>\n        </li>\n      </ng-template>\n\n      <li class=\"select-dropdown-optgroup-option loading\" *ngIf=\"dataListSub && !dataListSub.closed\">\n        \u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430\n      </li>\n      <li class=\"select-dropdown-optgroup-option loader\" (mousedown)=\"AddNewObject(CreateNew(query));\" [class.active]=\"selectorPosition === Options.length\"\n        *ngIf=\"ShowNew\">\n\n        <ng-container *ngIf=\"createTemplate; else templateWithMessage\">\n          <ng-container *ngTemplateOutlet=\"createTemplate.templateRef; context: {query: query}\"></ng-container>\n        </ng-container>\n\n        <ng-template #templateWithMessage>\n          {{ newMessage }}\n        </ng-template>\n      </li>\n      <li class=\"select-dropdown-optgroup-option loader\" *ngIf=\"ShowEmpty\">\n        \u041F\u0443\u0441\u0442\u043E\n      </li>\n    </ul>\n    <div class=\"select-dropdown-pager\" *ngIf=\"currentCache && currentCache.countPages > 1\">\n      <div class=\"select-dropdown-pager-page\">\n        {{ currentCache.currentPage | number }} / {{ currentCache.countPages | number }}\n      </div>\n      <button class=\"select-dropdown-pager-loadmore\" *ngIf=\"currentCache.countPages > 1 && currentCache.currentPage < currentCache.countPages\"\n        (mousedown)=\"nextPage($event)\">\n        \u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0435\u0449\u0451\n      </button>\n    </div>\n  </div>\n</div>\n",
                    styles: [".vibor a,.vibor label,.vibor legend,.vibor p,.vibor span,.vibor ul{margin:0;padding:0;border:0}.vibor a,.vibor button,.vibor input{outline:0}.vibor ol,.vibor ul{list-style:none}.vibor input{padding:0;margin:0;border:0;font:inherit}.vibor b{font-weight:400}.vibor{position:relative;display:block;border:1px solid #d5d9de;border-radius:3px;font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\";font-size:14px;line-height:18px;background-color:#fff;transition:box-shadow .15s linear}.vibor:hover:not([disabled]),.vibor:hover:not([disabled]) .select-dropdown{box-shadow:0 3px 6px 0 rgba(44,44,44,.1)}.vibor[disabled]{opacity:.5;pointer-events:none;background-color:#f4f4f4}.vibor .select-search{position:relative;padding-right:40px}.vibor .select-search .arrow{content:\"\";position:absolute;right:15px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);display:block;width:16px;height:16px;background-image:url(data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ibmMtaWNvbiBnbHlwaCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiI+DQogIDxwYXRoIGZpbGw9IiMyYzJjMmMiIGQ9Ik04IDExLjRMMi42IDYgNCA0LjZsNCA0IDQtNEwxMy40IDYiLz4NCjwvc3ZnPg0K);transition:-webkit-transform .15s ease-in-out;transition:transform .15s ease-in-out;transition:transform .15s ease-in-out,-webkit-transform .15s ease-in-out}.vibor .select-search .arrow:before,.vibor .select-search-list-item_hide{display:none}.vibor .select-search-list-item_selection{position:relative}.vibor .select-search-list-item_selection>div{display:flex;align-items:center;padding:5px 20px}.vibor .select-search-list-item_input input{width:100%;padding:5px 20px;text-overflow:ellipsis;font-size:14px;color:#2c2c2c;background-color:transparent}.vibor .select-search-list-item_input input::-webkit-input-placeholder{color:rgba(44,44,44,.2)}.vibor .select-search-list-item_input input:-ms-input-placeholder{color:rgba(44,44,44,.2)}.vibor .select-search-list-item_input input::-ms-input-placeholder{color:rgba(44,44,44,.2)}.vibor .select-search-list-item_input input::placeholder{color:rgba(44,44,44,.2)}.vibor .select-search-list-item_remove{display:flex;align-items:center;justify-content:center;width:16px;height:16px;margin-left:5px;border-radius:50%;background-color:#bababa;cursor:pointer;transition:background-color .15s linear}.vibor .select-search-list-item_remove:hover{background-color:#949494}.vibor .select-dropdown{position:absolute;top:100%;left:-1px;right:-1px;z-index:2}.vibor .select-search-list-item_loader-center{position:absolute;right:-2px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);display:flex;align-items:center;justify-content:center;width:21px;height:21px;background:#fff;z-index:2}.vibor .select-search-list-item_loader-center[hidden]{display:none}.vibor .select-search-list-item_loader-center .select-search-list-item_loader{width:16px;height:16px;box-sizing:border-box;border-width:2px;border-style:solid;border-color:#22272e rgba(34,39,46,.4) rgba(34,39,46,.4);border-radius:100%;-webkit-animation:.45s linear infinite clockwise;animation:.45s linear infinite clockwise}.vibor .select-dropdown{border:1px solid #d5d9de;border-bottom-left-radius:5px;border-bottom-right-radius:5px;border-top:0;background:#fff}.vibor .select-dropdown-optgroup{max-height:300px;overflow-y:auto}.vibor .select-dropdown-optgroup-option{min-height:30px;padding:10px 15px;color:#2c2c2c}.vibor .select-dropdown-optgroup-option:hover{background-color:rgba(66,132,215,.1)}.vibor .select-dropdown-optgroup-option.loading{font-size:16px;line-height:18px;text-align:center;color:#8b8b83}.vibor .select-dropdown-optgroup-option.loader{text-align:center;color:#8b8b83}.vibor .select-dropdown-pager{padding:10px;text-align:center;border-top:1px dashed #d5d9de}.vibor .select-dropdown-pager-page{font-size:12px;color:#8b8b83}.vibor .select-dropdown-pager-loadmore{border:0;background:0 0;box-shadow:none;color:#8b8b83;text-transform:uppercase}.vibor .select-dropdown-pager-page+.select-dropdown-pager-loadmore{margin-top:10px}.vibor.open-vibor{border-bottom-left-radius:0;border-bottom-right-radius:0}.vibor.open-vibor .select-search .arrow{-webkit-transform:translateY(-50%) rotate(180deg);transform:translateY(-50%) rotate(180deg)}.vibor:not(.multiple) .select-search-list-item_remove{position:absolute;right:0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.vibor.multiple .select-search-list{display:flex;flex-flow:row wrap;margin:-5px}.vibor.multiple .select-search-list .select-search-list-item{padding:5px;flex-shrink:0}.vibor.multiple .select-search-list .select-search-list-item_input{flex:1}.vibor.multiple .select-search-list .select-search-list-item_input input{height:28px}.vibor.multiple .vibor__selection{display:flex;align-items:center;height:28px;padding:0 7px;border-radius:3px;font-size:14px;background:#e5e5e7;color:#2c2c2c}@-webkit-keyframes clockwise{to{-webkit-transform:rotate(360deg) translatez(0);transform:rotate(360deg) translatez(0)}}@keyframes clockwise{to{-webkit-transform:rotate(360deg) translatez(0);transform:rotate(360deg) translatez(0)}}"],
                    encapsulation: ViewEncapsulation.None,
                    providers: [{
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return NgViborComponent; }),
                            multi: true
                        }]
                },] },
    ];
    /** @nocollapse */
    NgViborComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    NgViborComponent.propDecorators = {
        inputControl: [{ type: ViewChild, args: ['inputControl',] }],
        multiple: [{ type: Input }],
        multipleLimit: [{ type: Input }],
        countOnPage: [{ type: Input }],
        placeholder: [{ type: Input }],
        name: [{ type: Input }],
        required: [{ type: Input }],
        allowReset: [{ type: Input }],
        bothTemplate: [{ type: ContentChild, args: [ViborBothDirective,] }],
        dropdownTemplate: [{ type: ContentChild, args: [ViborDropdownDirective,] }],
        selectedTemplate: [{ type: ContentChild, args: [ViborSelectedDirective,] }],
        createTemplate: [{ type: ContentChild, args: [ViborCreateDirective,] }],
        listFormatter: [{ type: Input }],
        dropdownFormatter: [{ type: Input }],
        viewProperty: [{ type: Input }],
        modelProperty: [{ type: Input }],
        preloadProperty: [{ type: Input }],
        preloadField: [{ type: Input }],
        searchProperty: [{ type: Input }],
        dataList: [{ type: Input }],
        excludeList: [{ type: Input }],
        additionalFilter: [{ type: Input }],
        onlyEmitter: [{ type: Input }],
        changeFullModel: [{ type: Output, args: ['changeFullModel',] }],
        newMessage: [{ type: Input }],
        CreateNew: [{ type: Input }]
    };
    return NgViborComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ components = [NgViborComponent, ViborBothDirective, ViborCreateDirective, ViborDropdownDirective, ViborSelectedDirective];
var NgViborModule = /** @class */ (function () {
    function NgViborModule() {
    }
    NgViborModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        FormsModule, CommonModule
                    ],
                    declarations: __spread(components),
                    exports: __spread(components, [
                        FormsModule
                    ])
                },] },
    ];
    return NgViborModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { NgViborService, NgViborComponent, NgViborModule, ViborBothDirective as ɵc, ViborCreateDirective as ɵd, ViborDropdownDirective as ɵa, ViborSelectedDirective as ɵb };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctdmlib3IuanMubWFwIiwic291cmNlcyI6WyJuZzovL25nLXZpYm9yL2xpYi9uZy12aWJvci5zZXJ2aWNlLnRzIiwibmc6Ly9uZy12aWJvci9saWIvbmctdmlib3ItdGVtcGxhdGUuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy12aWJvci9saWIvaGVscGVycy50cyIsIm5nOi8vbmctdmlib3IvbGliL25nLXZpYm9yLmNvbXBvbmVudC50cyIsIm5nOi8vbmctdmlib3IvbGliL25nLXZpYm9yLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5nVmlib3JTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3ZpYm9yLWRyb3Bkb3duLWVsZW1lbnRdJyB9KVxuZXhwb3J0IGNsYXNzIFZpYm9yRHJvcGRvd25EaXJlY3RpdmUge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cbn1cblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3ZpYm9yLXNlbGVjdGVkLWVsZW1lbnRdJyB9KVxuZXhwb3J0IGNsYXNzIFZpYm9yU2VsZWN0ZWREaXJlY3RpdmUge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cbn1cblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3ZpYm9yLWJvdGgtZWxlbWVudF0nIH0pXG5leHBvcnQgY2xhc3MgVmlib3JCb3RoRGlyZWN0aXZlIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHt9XG59XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1t2aWJvci1jcmVhdGVdJyB9KVxuZXhwb3J0IGNsYXNzIFZpYm9yQ3JlYXRlRGlyZWN0aXZlIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHt9XG59XG4iLCJleHBvcnQgaW50ZXJmYWNlIElEYXRhUmVzcG9uc2Uge1xuICBkYXRhOiBPYmplY3Q7XG4gIGxpc3Q6IEFycmF5PE9iamVjdD47XG4gIGhlYWRlcnM6IGFueTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZldGNoRnJvbU9iamVjdChvYmplY3Q6IGFueSwgcHJvcDogc3RyaW5nKTogYW55IHtcbiAgaWYgKG9iamVjdCA9PT0gdW5kZWZpbmVkIHx8IHByb3AgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cblxuICBjb25zdCBpbmRleDogbnVtYmVyID0gcHJvcC5pbmRleE9mKCcuJyk7XG4gIGlmIChpbmRleCA+IC0xKSB7XG4gICAgcmV0dXJuIGZldGNoRnJvbU9iamVjdChvYmplY3RbcHJvcC5zdWJzdHJpbmcoMCwgaW5kZXgpXSwgcHJvcC5zdWJzdHIoaW5kZXggKyAxKSk7XG4gIH1cblxuICByZXR1cm4gb2JqZWN0W3Byb3BdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdEZvcm1hdHRlcihkYXRhOiBhbnksIHZhbHVlUHJvcGVydHlOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICBsZXQgaHRtbCA9ICcnO1xuICBodG1sICs9IGZldGNoRnJvbU9iamVjdChkYXRhLCB2YWx1ZVByb3BlcnR5TmFtZSkgPyBgPGI+JHtmZXRjaEZyb21PYmplY3QoZGF0YSwgdmFsdWVQcm9wZXJ0eU5hbWUpfTwvYj5gIDogJyc7XG4gIHJldHVybiBodG1sO1xufVxuXG5cbi8vIFVzZWQgZm9yIG1hdGNoaW5nIG51bWJlcnNcbmNvbnN0IGNvcmVfcG51bTogc3RyaW5nID0gL1srLV0/KD86XFxkKlxcLnwpXFxkKyg/OltlRV1bKy1dP1xcZCt8KS8uc291cmNlO1xuY29uc3Qgcm51bW5vbnB4OiBSZWdFeHAgPSBuZXcgUmVnRXhwKCdeKCcgKyBjb3JlX3BudW0gKyAnKSg/IXB4KVthLXolXSskJywgJ2knKTtcblxuZnVuY3Rpb24gYXVnbWVudFdpZHRoT3JIZWlnaHQobmFtZTogc3RyaW5nLCBleHRyYTogYW55LCBpc0JvcmRlckJveDogYW55LCBzdHlsZXM6IGFueSk6IG51bWJlciB7XG4gIGxldCBpOiBudW1iZXIgPSBleHRyYSA9PT0gKGlzQm9yZGVyQm94ID8gJ2JvcmRlcicgOiAnY29udGVudCcpID9cbiAgICAvLyBJZiB3ZSBhbHJlYWR5IGhhdmUgdGhlIHJpZ2h0IG1lYXN1cmVtZW50LCBhdm9pZCBhdWdtZW50YXRpb25cbiAgICA0IDpcbiAgICAvLyBPdGhlcndpc2UgaW5pdGlhbGl6ZSBmb3IgaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbCBwcm9wZXJ0aWVzXG4gICAgbmFtZSA9PT0gJ3dpZHRoJyA/IDEgOiAwLFxuXG4gICAgdmFsID0gMDtcbiAgY29uc3QgY3NzRXhwYW5kOiBzdHJpbmdbXSA9IFsnVG9wJywgJ1JpZ2h0JywgJ0JvdHRvbScsICdMZWZ0J107XG5cbiAgLy8gVE9ETyBVc2UgYW5ndWxhci5lbGVtZW50LmNzcyBpbnN0ZWFkIG9mIGdldFN0eWxlVmFsdWUgYWZ0ZXJcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2NhaXRwL2FuZ3VsYXIuanMvY29tbWl0LzkyYmJiNWUyMjUyNTNlYmRkZDM4ZWY1NzM1ZDY2ZmZlZjc2YjZhMTQgd2lsbCBiZSBhcHBsaWVkXG4gIGZ1bmN0aW9uIGdldFN0eWxlVmFsdWUoX25hbWU6IGFueSk6IG51bWJlciB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoc3R5bGVzW19uYW1lXSk7XG4gIH1cblxuICBmb3IgKDsgaSA8IDQ7IGkgKz0gMikge1xuICAgIC8vIGJvdGggYm94IG1vZGVscyBleGNsdWRlIG1hcmdpbiwgc28gYWRkIGl0IGlmIHdlIHdhbnQgaXRcbiAgICBpZiAoZXh0cmEgPT09ICdtYXJnaW4nKSB7XG4gICAgICB2YWwgKz0gZ2V0U3R5bGVWYWx1ZShleHRyYSArIGNzc0V4cGFuZFtpXSk7XG4gICAgfVxuXG4gICAgaWYgKGlzQm9yZGVyQm94KSB7XG4gICAgICAvLyBib3JkZXItYm94IGluY2x1ZGVzIHBhZGRpbmcsIHNvIHJlbW92ZSBpdCBpZiB3ZSB3YW50IGNvbnRlbnRcbiAgICAgIGlmIChleHRyYSA9PT0gJ2NvbnRlbnQnKSB7XG4gICAgICAgIHZhbCAtPSBnZXRTdHlsZVZhbHVlKCdwYWRkaW5nJyArIGNzc0V4cGFuZFtpXSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGF0IHRoaXMgcG9pbnQsIGV4dHJhIGlzbid0IGJvcmRlciBub3IgbWFyZ2luLCBzbyByZW1vdmUgYm9yZGVyXG4gICAgICBpZiAoZXh0cmEgIT09ICdtYXJnaW4nKSB7XG4gICAgICAgIHZhbCAtPSBnZXRTdHlsZVZhbHVlKCdib3JkZXInICsgY3NzRXhwYW5kW2ldICsgJ1dpZHRoJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbCArPSBnZXRTdHlsZVZhbHVlKCdwYWRkaW5nJyArIGNzc0V4cGFuZFtpXSk7XG5cbiAgICAgIC8vIGF0IHRoaXMgcG9pbnQsIGV4dHJhIGlzbid0IGNvbnRlbnQgbm9yIHBhZGRpbmcsIHNvIGFkZCBib3JkZXJcbiAgICAgIGlmIChleHRyYSAhPT0gJ3BhZGRpbmcnKSB7XG4gICAgICAgIHZhbCArPSBnZXRTdHlsZVZhbHVlKCdib3JkZXInICsgY3NzRXhwYW5kW2ldICsgJ1dpZHRoJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHZhbDtcbn1cblxuZnVuY3Rpb24gZ2V0V2luZG93KGVsZW06IGFueSk6IGFueSB7XG4gIHJldHVybiBlbGVtICE9IG51bGwgJiYgZWxlbSA9PT0gZWxlbS53aW5kb3cgPyBlbGVtIDogZWxlbS5ub2RlVHlwZSA9PT0gOSAmJiBlbGVtLmRlZmF1bHRWaWV3O1xufVxuXG5mdW5jdGlvbiBnZXRPZmZzZXQoZWxlbTogYW55KTogYW55IHtcbiAgbGV0IGRvY0VsZW06IGFueSwgd2luOiBhbnk7XG4gIGNvbnN0IGJveDogYW55ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgY29uc3QgZG9jOiBhbnkgPSBlbGVtICYmIGVsZW0ub3duZXJEb2N1bWVudDtcblxuICBpZiAoIWRvYykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGRvY0VsZW0gPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuICB3aW4gPSBnZXRXaW5kb3coZG9jKTtcblxuICByZXR1cm4ge1xuICAgIHRvcDogYm94LnRvcCArIHdpbi5wYWdlWU9mZnNldCAtIGRvY0VsZW0uY2xpZW50VG9wLFxuICAgIGxlZnQ6IGJveC5sZWZ0ICsgd2luLnBhZ2VYT2Zmc2V0IC0gZG9jRWxlbS5jbGllbnRMZWZ0XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzY3JvbGxBY3RpdmVPcHRpb24obGlzdDogSFRNTEVsZW1lbnQsIGl0ZW06IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gIGxldCB5OiBhbnksIGhlaWdodF9tZW51OiBhbnksIGhlaWdodF9pdGVtOiBhbnksIHNjcm9sbDogYW55LCBzY3JvbGxfdG9wOiBhbnksIHNjcm9sbF9ib3R0b206IGFueTtcblxuICBpZiAoaXRlbSkge1xuICAgIGhlaWdodF9tZW51ID0gbGlzdC5vZmZzZXRIZWlnaHQ7XG4gICAgaGVpZ2h0X2l0ZW0gPSBnZXRXaWR0aE9ySGVpZ2h0KGl0ZW0sICdoZWlnaHQnLCAnbWFyZ2luJyk7IC8vIG91dGVySGVpZ2h0KHRydWUpO1xuICAgIHNjcm9sbCA9IGxpc3Quc2Nyb2xsVG9wIHx8IDA7XG4gICAgeSA9IGdldE9mZnNldChpdGVtKS50b3AgLSBnZXRPZmZzZXQobGlzdCkudG9wICsgc2Nyb2xsO1xuICAgIHNjcm9sbF90b3AgPSB5O1xuICAgIHNjcm9sbF9ib3R0b20gPSB5IC0gaGVpZ2h0X21lbnUgKyBoZWlnaHRfaXRlbTtcblxuICAgIC8vIFRPRE8gTWFrZSBhbmltYXRpb25cbiAgICBpZiAoeSArIGhlaWdodF9pdGVtID4gaGVpZ2h0X21lbnUgKyBzY3JvbGwpIHtcbiAgICAgIGxpc3Quc2Nyb2xsVG9wID0gc2Nyb2xsX2JvdHRvbTtcbiAgICB9IGVsc2UgaWYgKHkgPCBzY3JvbGwpIHtcbiAgICAgIGxpc3Quc2Nyb2xsVG9wID0gc2Nyb2xsX3RvcDtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0V2lkdGhPckhlaWdodChlbGVtOiBhbnksIG5hbWU6IGFueSwgZXh0cmE6IGFueSk6IGFueSB7XG5cbiAgLy8gU3RhcnQgd2l0aCBvZmZzZXQgcHJvcGVydHksIHdoaWNoIGlzIGVxdWl2YWxlbnQgdG8gdGhlIGJvcmRlci1ib3ggdmFsdWVcbiAgY29uc3QgdmFsdWVJc0JvcmRlckJveCA9IHRydWU7XG4gIGxldCB2YWw6IGFueSA9IG5hbWUgPT09ICd3aWR0aCcgPyBlbGVtLm9mZnNldFdpZHRoIDogZWxlbS5vZmZzZXRIZWlnaHQ7XG4gIGNvbnN0IHN0eWxlczogYW55ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbSwgbnVsbCk7XG4gIGNvbnN0IGlzQm9yZGVyQm94ID0gZmFsc2U7IC8vIGpRdWVyeS5zdXBwb3J0LmJveFNpemluZyAmJiBqUXVlcnkuY3NzKCBlbGVtLCAnYm94U2l6aW5nJywgZmFsc2UsIHN0eWxlcyApID09PSAnYm9yZGVyLWJveCc7XG5cbiAgLy8gc29tZSBub24taHRtbCBlbGVtZW50cyByZXR1cm4gdW5kZWZpbmVkIGZvciBvZmZzZXRXaWR0aCwgc28gY2hlY2sgZm9yIG51bGwvdW5kZWZpbmVkXG4gIC8vIHN2ZyAtIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY0OTI4NVxuICAvLyBNYXRoTUwgLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD00OTE2NjhcbiAgaWYgKHZhbCA8PSAwIHx8IHZhbCA9PSBudWxsKSB7XG4gICAgLy8gRmFsbCBiYWNrIHRvIGNvbXB1dGVkIHRoZW4gdW5jb21wdXRlZCBjc3MgaWYgbmVjZXNzYXJ5XG4gICAgdmFsID0gc3R5bGVzW25hbWVdO1xuXG4gICAgaWYgKHZhbCA8IDAgfHwgdmFsID09IG51bGwpIHtcbiAgICAgIHZhbCA9IGVsZW0uc3R5bGVbbmFtZV07XG4gICAgfVxuXG4gICAgLy8gQ29tcHV0ZWQgdW5pdCBpcyBub3QgcGl4ZWxzLiBTdG9wIGhlcmUgYW5kIHJldHVybi5cbiAgICBpZiAocm51bW5vbnB4LnRlc3QodmFsKSkge1xuICAgICAgcmV0dXJuIHZhbDtcbiAgICB9XG5cbiAgICAvLyB3ZSBuZWVkIHRoZSBjaGVjayBmb3Igc3R5bGUgaW4gY2FzZSBhIGJyb3dzZXIgd2hpY2ggcmV0dXJucyB1bnJlbGlhYmxlIHZhbHVlc1xuICAgIC8vIGZvciBnZXRDb21wdXRlZFN0eWxlIHNpbGVudGx5IGZhbGxzIGJhY2sgdG8gdGhlIHJlbGlhYmxlIGVsZW0uc3R5bGVcbiAgICAvLyB2YWx1ZUlzQm9yZGVyQm94ID0gaXNCb3JkZXJCb3ggJiYgKCBqUXVlcnkuc3VwcG9ydC5ib3hTaXppbmdSZWxpYWJsZSB8fCB2YWwgPT09IGVsZW0uc3R5bGVbIG5hbWUgXSApO1xuXG4gICAgLy8gTm9ybWFsaXplICcnLCBhdXRvLCBhbmQgcHJlcGFyZSBmb3IgZXh0cmFcbiAgICB2YWwgPSBwYXJzZUZsb2F0KHZhbCkgfHwgMDtcbiAgfVxuXG4gIC8vIHVzZSB0aGUgYWN0aXZlIGJveC1zaXppbmcgbW9kZWwgdG8gYWRkL3N1YnRyYWN0IGlycmVsZXZhbnQgc3R5bGVzXG4gIHJldHVybiB2YWwgKyBhdWdtZW50V2lkdGhPckhlaWdodChuYW1lLCBleHRyYSB8fCAoaXNCb3JkZXJCb3ggPyAnYm9yZGVyJyA6ICdjb250ZW50JyksIHZhbHVlSXNCb3JkZXJCb3gsIHN0eWxlcyk7XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsIE9uSW5pdCwgT25DaGFuZ2VzLFxuICBJbnB1dCwgT3V0cHV0LCBmb3J3YXJkUmVmLFxuICBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYsXG4gIFRlbXBsYXRlUmVmLCBDb250ZW50Q2hpbGQsIFZpZXdDaGlsZCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgTkdfVkFMVUVfQUNDRVNTT1IsXG4gIE5nTW9kZWxcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtcbiAgICBWaWJvckJvdGhEaXJlY3RpdmUsXG4gICAgVmlib3JDcmVhdGVEaXJlY3RpdmUsXG4gICAgVmlib3JEcm9wZG93bkRpcmVjdGl2ZSxcbiAgICBWaWJvclNlbGVjdGVkRGlyZWN0aXZlXG59IGZyb20gJy4vbmctdmlib3ItdGVtcGxhdGUuZGlyZWN0aXZlJztcblxuaW1wb3J0IHtcbiAgICBJRGF0YVJlc3BvbnNlLFxuICAgIGRlZmF1bHRGb3JtYXR0ZXIsXG4gICAgZmV0Y2hGcm9tT2JqZWN0LFxuICAgIHNjcm9sbEFjdGl2ZU9wdGlvblxufSBmcm9tICcuL2hlbHBlcnMnO1xuXG5jb25zdCBkZWVwRXF1YWwgPSByZXF1aXJlKCdkZWVwLWVxdWFsJyk7XG5cbkBDb21wb25lbnQoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAndmlib3InLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ2aWJvclwiPlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG5cbiAgPGRpdiBjbGFzcz1cInNlbGVjdC1zZWFyY2hcIiAoY2xpY2spPVwic2hvd0Ryb3Bkb3duTGlzdCgkZXZlbnQpO1wiPlxuICAgIDx1bCBjbGFzcz1cInNlbGVjdC1zZWFyY2gtbGlzdFwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm11bHRpcGxlIHx8ICFpc09wZW5cIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFTZWxlY3RlZFRlbXBsYXRlOyBlbHNlIHNlbGVjdGVkVFwiPlxuICAgICAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtIHNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX3NlbGVjdGlvblwiICpuZ0Zvcj1cImxldCBpdGVtIG9mIG91dHB1dDsgbGV0ICRpbmRleD1pbmRleDsgbGV0ICRsYXN0PWxhc3Q7IHRyYWNrQnk6IFRyYWNrQnlGbjtcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2aWJvcl9fc2VsZWN0aW9uXCI+XG4gICAgICAgICAgICAgIDxkaXYgW2lubmVySFRNTF09XCJnZXRMaXN0Rm9ybWF0dGVkKGl0ZW0pXCI+PC9kaXY+XG4gICAgICAgICAgICAgIDxhIGNsYXNzPVwic2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fcmVtb3ZlXCIgKm5nSWY9XCJhbGxvd1Jlc2V0XCIgKGNsaWNrKT1cIiFkaXNhYmxlZCAmJiByZW1vdmVPbmUoJGluZGV4LCAkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCI+XG4gICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPVwiIzJjMmMyY1wiIGQ9XCJNMTAuMSA0LjVMOCA2LjYgNS45IDQuNSA0LjUgNS45IDYuNiA4bC0yLjEgMi4xIDEuNCAxLjRMOCA5LjRsMi4xIDIuMSAxLjQtMS40TDkuNCA4bDIuMS0yLjF6XCIvPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICA8bmctdGVtcGxhdGUgI3NlbGVjdGVkVD5cbiAgICAgICAgICA8bGkgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbSBzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9zZWxlY3Rpb25cIiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBvdXRwdXQ7IGxldCAkaW5kZXg9aW5kZXg7IGxldCAkbGFzdD1sYXN0OyB0cmFja0J5OiBUcmFja0J5Rm47XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlib3JfX3NlbGVjdGlvblwiPlxuICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiU2VsZWN0ZWRUZW1wbGF0ZTsgY29udGV4dDoge2l0ZW06IGl0ZW19XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgIDxhIGNsYXNzPVwic2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fcmVtb3ZlXCIgKm5nSWY9XCJhbGxvd1Jlc2V0ICYmICFkaXNhYmxlZFwiIChjbGljayk9XCIhZGlzYWJsZWQgJiYgcmVtb3ZlT25lKCRpbmRleCwgJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiPlxuICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbD1cIiMyYzJjMmNcIiBkPVwiTTEwLjEgNC41TDggNi42IDUuOSA0LjUgNC41IDUuOSA2LjYgOGwtMi4xIDIuMSAxLjQgMS40TDggOS40bDIuMSAyLjEgMS40LTEuNEw5LjQgOGwyLjEtMi4xelwiLz5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8bGkgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbSBzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9pbnB1dFwiIFtjbGFzcy5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9oaWRlXT1cIklucHV0SGlkZVwiPlxuICAgICAgICA8aW5wdXQgYXV0b2NvbXBsZXRlPVwib2ZmXCIgI2lucHV0Q29udHJvbD1cIm5nTW9kZWxcIiBbbmFtZV09XCJuYW1lXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgWyhuZ01vZGVsKV09XCJxdWVyeVwiIFtwbGFjZWhvbGRlcl09XCJvdXRwdXQubGVuZ3RoID09IDAgfHwgKG11bHRpcGxlICYmIG91dHB1dC5sZW5ndGggPCBtdWx0aXBsZUxpbWl0KSA/IHBsYWNlaG9sZGVyIDogJydcIlxuICAgICAgICAgIChpbnB1dCk9XCJ1cGRhdGVPcHRpb25zSW5EZWxheSgpXCIgKGtleWRvd24pPVwia2V5RG93bigkZXZlbnQpXCIgLz5cbiAgICAgIDwvbGk+XG4gICAgICA8bGkgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbSBzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9sb2FkZXItY2VudGVyXCIgW2hpZGRlbl09XCIhZGF0YUxpc3RTdWIgfHwgZGF0YUxpc3RTdWIuY2xvc2VkXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9sb2FkZXJcIj48L2Rpdj5cbiAgICAgIDwvbGk+XG5cbiAgICAgIDxzcGFuIGNsYXNzPVwiYXJyb3dcIiAoY2xpY2spPVwidG9nZ2xlRHJvcGRvd24oJGV2ZW50KVwiPlxuICAgICAgPC9zcGFuPlxuICAgIDwvdWw+XG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd25cIiAqbmdJZj1cImlzT3BlblwiPlxuICAgIDx1bCBjbGFzcz1cInNlbGVjdC1kcm9wZG93bi1vcHRncm91cFwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFEcm9wZG93blRlbXBsYXRlOyBlbHNlIGRyb3Bkb3duVFwiPlxuICAgICAgICA8bGkgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXAtb3B0aW9uXCIgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBPcHRpb25zOyBsZXQgaT1pbmRleFwiIChtb3VzZWRvd24pPVwic2VsZWN0T25lKCRldmVudCwgb3B0aW9uKVwiXG4gICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJpID09PSBzZWxlY3RvclBvc2l0aW9uXCIgW2lubmVySFRNTF09XCJnZXREcm9wZG93bkZvcm1hdHRlZChvcHRpb24pXCI+XG4gICAgICAgIDwvbGk+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgPG5nLXRlbXBsYXRlICNkcm9wZG93blQ+XG4gICAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb25cIiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIE9wdGlvbnM7IGxldCBpPWluZGV4XCIgKG1vdXNlZG93bik9XCJzZWxlY3RPbmUoJGV2ZW50LCBvcHRpb24pXCJcbiAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cImkgPT09IHNlbGVjdG9yUG9zaXRpb25cIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiRHJvcGRvd25UZW1wbGF0ZTsgY29udGV4dDoge2l0ZW06IG9wdGlvbn1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb24gbG9hZGluZ1wiICpuZ0lmPVwiZGF0YUxpc3RTdWIgJiYgIWRhdGFMaXN0U3ViLmNsb3NlZFwiPlxuICAgICAgICDDkMKXw5DCsMOQwrPDkcKAw5HCg8OQwrfDkMK6w5DCsFxuICAgICAgPC9saT5cbiAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb24gbG9hZGVyXCIgKG1vdXNlZG93bik9XCJBZGROZXdPYmplY3QoQ3JlYXRlTmV3KHF1ZXJ5KSk7XCIgW2NsYXNzLmFjdGl2ZV09XCJzZWxlY3RvclBvc2l0aW9uID09PSBPcHRpb25zLmxlbmd0aFwiXG4gICAgICAgICpuZ0lmPVwiU2hvd05ld1wiPlxuXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjcmVhdGVUZW1wbGF0ZTsgZWxzZSB0ZW1wbGF0ZVdpdGhNZXNzYWdlXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNyZWF0ZVRlbXBsYXRlLnRlbXBsYXRlUmVmOyBjb250ZXh0OiB7cXVlcnk6IHF1ZXJ5fVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICA8bmctdGVtcGxhdGUgI3RlbXBsYXRlV2l0aE1lc3NhZ2U+XG4gICAgICAgICAge3sgbmV3TWVzc2FnZSB9fVxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPC9saT5cbiAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb24gbG9hZGVyXCIgKm5nSWY9XCJTaG93RW1wdHlcIj5cbiAgICAgICAgw5DCn8ORwoPDkcKBw5HCgsOQwr5cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgICA8ZGl2IGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLXBhZ2VyXCIgKm5nSWY9XCJjdXJyZW50Q2FjaGUgJiYgY3VycmVudENhY2hlLmNvdW50UGFnZXMgPiAxXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLXBhZ2VyLXBhZ2VcIj5cbiAgICAgICAge3sgY3VycmVudENhY2hlLmN1cnJlbnRQYWdlIHwgbnVtYmVyIH19IC8ge3sgY3VycmVudENhY2hlLmNvdW50UGFnZXMgfCBudW1iZXIgfX1cbiAgICAgIDwvZGl2PlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cInNlbGVjdC1kcm9wZG93bi1wYWdlci1sb2FkbW9yZVwiICpuZ0lmPVwiY3VycmVudENhY2hlLmNvdW50UGFnZXMgPiAxICYmIGN1cnJlbnRDYWNoZS5jdXJyZW50UGFnZSA8IGN1cnJlbnRDYWNoZS5jb3VudFBhZ2VzXCJcbiAgICAgICAgKG1vdXNlZG93bik9XCJuZXh0UGFnZSgkZXZlbnQpXCI+XG4gICAgICAgIMOQwpfDkMKww5DCs8ORwoDDkcKDw5DCt8OQwrjDkcKCw5HCjCDDkMK1w5HCicORwpFcbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC52aWJvciBhLC52aWJvciBsYWJlbCwudmlib3IgbGVnZW5kLC52aWJvciBwLC52aWJvciBzcGFuLC52aWJvciB1bHttYXJnaW46MDtwYWRkaW5nOjA7Ym9yZGVyOjB9LnZpYm9yIGEsLnZpYm9yIGJ1dHRvbiwudmlib3IgaW5wdXR7b3V0bGluZTowfS52aWJvciBvbCwudmlib3IgdWx7bGlzdC1zdHlsZTpub25lfS52aWJvciBpbnB1dHtwYWRkaW5nOjA7bWFyZ2luOjA7Ym9yZGVyOjA7Zm9udDppbmhlcml0fS52aWJvciBie2ZvbnQtd2VpZ2h0OjQwMH0udmlib3J7cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTpibG9jaztib3JkZXI6MXB4IHNvbGlkICNkNWQ5ZGU7Ym9yZGVyLXJhZGl1czozcHg7Zm9udC1mYW1pbHk6LWFwcGxlLXN5c3RlbSxCbGlua01hY1N5c3RlbUZvbnQsXCJTZWdvZSBVSVwiLFJvYm90byxIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZixcIkFwcGxlIENvbG9yIEVtb2ppXCIsXCJTZWdvZSBVSSBFbW9qaVwiLFwiU2Vnb2UgVUkgU3ltYm9sXCI7Zm9udC1zaXplOjE0cHg7bGluZS1oZWlnaHQ6MThweDtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7dHJhbnNpdGlvbjpib3gtc2hhZG93IC4xNXMgbGluZWFyfS52aWJvcjpob3Zlcjpub3QoW2Rpc2FibGVkXSksLnZpYm9yOmhvdmVyOm5vdChbZGlzYWJsZWRdKSAuc2VsZWN0LWRyb3Bkb3due2JveC1zaGFkb3c6MCAzcHggNnB4IDAgcmdiYSg0NCw0NCw0NCwuMSl9LnZpYm9yW2Rpc2FibGVkXXtvcGFjaXR5Oi41O3BvaW50ZXItZXZlbnRzOm5vbmU7YmFja2dyb3VuZC1jb2xvcjojZjRmNGY0fS52aWJvciAuc2VsZWN0LXNlYXJjaHtwb3NpdGlvbjpyZWxhdGl2ZTtwYWRkaW5nLXJpZ2h0OjQwcHh9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoIC5hcnJvd3tjb250ZW50OlwiXCI7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MTVweDt0b3A6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7ZGlzcGxheTpibG9jazt3aWR0aDoxNnB4O2hlaWdodDoxNnB4O2JhY2tncm91bmQtaW1hZ2U6dXJsKGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QmpiR0Z6Y3owaWJtTXRhV052YmlCbmJIbHdhQ0lnZUcxc2JuTTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TURBdmMzWm5JaUIzYVdSMGFEMGlNVFlpSUdobGFXZG9kRDBpTVRZaUlIWnBaWGRDYjNnOUlqQWdNQ0F4TmlBeE5pSStEUW9nSUR4d1lYUm9JR1pwYkd3OUlpTXlZekpqTW1NaUlHUTlJazA0SURFeExqUk1NaTQySURZZ05DQTBMalpzTkNBMElEUXRORXd4TXk0MElEWWlMejROQ2p3dmMzWm5QZzBLKTt0cmFuc2l0aW9uOi13ZWJraXQtdHJhbnNmb3JtIC4xNXMgZWFzZS1pbi1vdXQ7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjE1cyBlYXNlLWluLW91dDt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMTVzIGVhc2UtaW4tb3V0LC13ZWJraXQtdHJhbnNmb3JtIC4xNXMgZWFzZS1pbi1vdXR9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoIC5hcnJvdzpiZWZvcmUsLnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9oaWRle2Rpc3BsYXk6bm9uZX0udmlib3IgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX3NlbGVjdGlvbntwb3NpdGlvbjpyZWxhdGl2ZX0udmlib3IgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX3NlbGVjdGlvbj5kaXZ7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtwYWRkaW5nOjVweCAyMHB4fS52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faW5wdXQgaW5wdXR7d2lkdGg6MTAwJTtwYWRkaW5nOjVweCAyMHB4O3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7Zm9udC1zaXplOjE0cHg7Y29sb3I6IzJjMmMyYztiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50fS52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faW5wdXQgaW5wdXQ6Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXJ7Y29sb3I6cmdiYSg0NCw0NCw0NCwuMil9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9pbnB1dCBpbnB1dDotbXMtaW5wdXQtcGxhY2Vob2xkZXJ7Y29sb3I6cmdiYSg0NCw0NCw0NCwuMil9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9pbnB1dCBpbnB1dDo6LW1zLWlucHV0LXBsYWNlaG9sZGVye2NvbG9yOnJnYmEoNDQsNDQsNDQsLjIpfS52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faW5wdXQgaW5wdXQ6OnBsYWNlaG9sZGVye2NvbG9yOnJnYmEoNDQsNDQsNDQsLjIpfS52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fcmVtb3Zle2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjt3aWR0aDoxNnB4O2hlaWdodDoxNnB4O21hcmdpbi1sZWZ0OjVweDtib3JkZXItcmFkaXVzOjUwJTtiYWNrZ3JvdW5kLWNvbG9yOiNiYWJhYmE7Y3Vyc29yOnBvaW50ZXI7dHJhbnNpdGlvbjpiYWNrZ3JvdW5kLWNvbG9yIC4xNXMgbGluZWFyfS52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fcmVtb3ZlOmhvdmVye2JhY2tncm91bmQtY29sb3I6Izk0OTQ5NH0udmlib3IgLnNlbGVjdC1kcm9wZG93bntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MTAwJTtsZWZ0Oi0xcHg7cmlnaHQ6LTFweDt6LWluZGV4OjJ9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9sb2FkZXItY2VudGVye3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0Oi0ycHg7dG9wOjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpO2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjt3aWR0aDoyMXB4O2hlaWdodDoyMXB4O2JhY2tncm91bmQ6I2ZmZjt6LWluZGV4OjJ9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9sb2FkZXItY2VudGVyW2hpZGRlbl17ZGlzcGxheTpub25lfS52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fbG9hZGVyLWNlbnRlciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fbG9hZGVye3dpZHRoOjE2cHg7aGVpZ2h0OjE2cHg7Ym94LXNpemluZzpib3JkZXItYm94O2JvcmRlci13aWR0aDoycHg7Ym9yZGVyLXN0eWxlOnNvbGlkO2JvcmRlci1jb2xvcjojMjIyNzJlIHJnYmEoMzQsMzksNDYsLjQpIHJnYmEoMzQsMzksNDYsLjQpO2JvcmRlci1yYWRpdXM6MTAwJTstd2Via2l0LWFuaW1hdGlvbjouNDVzIGxpbmVhciBpbmZpbml0ZSBjbG9ja3dpc2U7YW5pbWF0aW9uOi40NXMgbGluZWFyIGluZmluaXRlIGNsb2Nrd2lzZX0udmlib3IgLnNlbGVjdC1kcm9wZG93bntib3JkZXI6MXB4IHNvbGlkICNkNWQ5ZGU7Ym9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czo1cHg7Ym9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6NXB4O2JvcmRlci10b3A6MDtiYWNrZ3JvdW5kOiNmZmZ9LnZpYm9yIC5zZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXB7bWF4LWhlaWdodDozMDBweDtvdmVyZmxvdy15OmF1dG99LnZpYm9yIC5zZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXAtb3B0aW9ue21pbi1oZWlnaHQ6MzBweDtwYWRkaW5nOjEwcHggMTVweDtjb2xvcjojMmMyYzJjfS52aWJvciAuc2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvbjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoNjYsMTMyLDIxNSwuMSl9LnZpYm9yIC5zZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXAtb3B0aW9uLmxvYWRpbmd7Zm9udC1zaXplOjE2cHg7bGluZS1oZWlnaHQ6MThweDt0ZXh0LWFsaWduOmNlbnRlcjtjb2xvcjojOGI4YjgzfS52aWJvciAuc2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvbi5sb2FkZXJ7dGV4dC1hbGlnbjpjZW50ZXI7Y29sb3I6IzhiOGI4M30udmlib3IgLnNlbGVjdC1kcm9wZG93bi1wYWdlcntwYWRkaW5nOjEwcHg7dGV4dC1hbGlnbjpjZW50ZXI7Ym9yZGVyLXRvcDoxcHggZGFzaGVkICNkNWQ5ZGV9LnZpYm9yIC5zZWxlY3QtZHJvcGRvd24tcGFnZXItcGFnZXtmb250LXNpemU6MTJweDtjb2xvcjojOGI4YjgzfS52aWJvciAuc2VsZWN0LWRyb3Bkb3duLXBhZ2VyLWxvYWRtb3Jle2JvcmRlcjowO2JhY2tncm91bmQ6MCAwO2JveC1zaGFkb3c6bm9uZTtjb2xvcjojOGI4YjgzO3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZX0udmlib3IgLnNlbGVjdC1kcm9wZG93bi1wYWdlci1wYWdlKy5zZWxlY3QtZHJvcGRvd24tcGFnZXItbG9hZG1vcmV7bWFyZ2luLXRvcDoxMHB4fS52aWJvci5vcGVuLXZpYm9ye2JvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6MDtib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czowfS52aWJvci5vcGVuLXZpYm9yIC5zZWxlY3Qtc2VhcmNoIC5hcnJvd3std2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpIHJvdGF0ZSgxODBkZWcpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpIHJvdGF0ZSgxODBkZWcpfS52aWJvcjpub3QoLm11bHRpcGxlKSAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fcmVtb3Zle3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjA7dG9wOjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpfS52aWJvci5tdWx0aXBsZSAuc2VsZWN0LXNlYXJjaC1saXN0e2Rpc3BsYXk6ZmxleDtmbGV4LWZsb3c6cm93IHdyYXA7bWFyZ2luOi01cHh9LnZpYm9yLm11bHRpcGxlIC5zZWxlY3Qtc2VhcmNoLWxpc3QgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVte3BhZGRpbmc6NXB4O2ZsZXgtc2hyaW5rOjB9LnZpYm9yLm11bHRpcGxlIC5zZWxlY3Qtc2VhcmNoLWxpc3QgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2lucHV0e2ZsZXg6MX0udmlib3IubXVsdGlwbGUgLnNlbGVjdC1zZWFyY2gtbGlzdCAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faW5wdXQgaW5wdXR7aGVpZ2h0OjI4cHh9LnZpYm9yLm11bHRpcGxlIC52aWJvcl9fc2VsZWN0aW9ue2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7aGVpZ2h0OjI4cHg7cGFkZGluZzowIDdweDtib3JkZXItcmFkaXVzOjNweDtmb250LXNpemU6MTRweDtiYWNrZ3JvdW5kOiNlNWU1ZTc7Y29sb3I6IzJjMmMyY31ALXdlYmtpdC1rZXlmcmFtZXMgY2xvY2t3aXNle3Rvey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpIHRyYW5zbGF0ZXooMCk7dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpIHRyYW5zbGF0ZXooMCl9fUBrZXlmcmFtZXMgY2xvY2t3aXNle3Rvey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpIHRyYW5zbGF0ZXooMCk7dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpIHRyYW5zbGF0ZXooMCl9fWBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBwcm92aWRlcnM6IFt7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdWaWJvckNvbXBvbmVudCksXG4gICAgbXVsdGk6IHRydWVcbiAgfV1cbn0pXG5leHBvcnQgY2xhc3MgTmdWaWJvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIC8vIExvY2FsIFZhcmlhYmxlXG4gIHB1YmxpYyBfbW9kZWw6IGFueTtcblxuICBwcml2YXRlIGZpcnN0TG9hZCA9IGZhbHNlO1xuICBwcml2YXRlIG9wdGlvbnM6IEFycmF5PGFueT47XG4gIHB1YmxpYyBvdXRwdXQ6IEFycmF5PGFueT47XG5cbiAgcHVibGljIGlzT3BlbjogYm9vbGVhbjtcblxuICBwcml2YXRlIG9sZFF1ZXJ5OiBzdHJpbmc7XG4gIHB1YmxpYyBxdWVyeTogc3RyaW5nO1xuXG4gIHB1YmxpYyBzZWxlY3RvclBvc2l0aW9uID0gMDtcbiAgcHJpdmF0ZSB3YWl0VGltZSA9IDUwMDtcblxuICBwcml2YXRlIGVsOiBFbGVtZW50OyAgICAgICAgICAgLy8gdGhpcyBjb21wb25lbnQgIGVsZW1lbnQgYDx2aWJvcj5gXG4gIHByaXZhdGUgaW5wdXRFbDogSFRNTElucHV0RWxlbWVudDsgLy8gYDxpbnB1dD5gIGVsZW1lbnQgaW4gYDx2aWJvcj5gIGZvciBhdXRvIGNvbXBsZXRlXG4gIEBWaWV3Q2hpbGQoJ2lucHV0Q29udHJvbCcpIHB1YmxpYyBpbnB1dENvbnRyb2w6IE5nTW9kZWw7XG5cbiAgLy8gSW5wdXRzICYgT3V0cHV0c1xuICBASW5wdXQoKSBwdWJsaWMgbXVsdGlwbGUgPSBmYWxzZTtcbiAgQElucHV0KCkgcHVibGljIG11bHRpcGxlTGltaXQgPSBJbmZpbml0eTtcbiAgQElucHV0KCkgcHVibGljIGNvdW50T25QYWdlID0gMTA7XG5cbiAgQElucHV0KCkgcHVibGljIHBsYWNlaG9sZGVyID0gJ1ZpYm9yJztcbiAgQElucHV0KCkgcHVibGljIG5hbWU6IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIHJlcXVpcmVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIHB1YmxpYyBhbGxvd1Jlc2V0ID0gdHJ1ZTtcbiAgcHVibGljIGRpc2FibGVkID0gZmFsc2U7XG5cbiAgLy8gw5DCnsORwoLDkMK+w5DCscORwoDDkMKww5DCtsOQwrXDkMK9w5DCuMOQwrUgw5HCgcOQwr/DkMK4w5HCgcOQwrrDkMK+w5DCslxuICBAQ29udGVudENoaWxkKFZpYm9yQm90aERpcmVjdGl2ZSkgcHVibGljIGJvdGhUZW1wbGF0ZTogVmlib3JCb3RoRGlyZWN0aXZlO1xuICBAQ29udGVudENoaWxkKFZpYm9yRHJvcGRvd25EaXJlY3RpdmUpIHB1YmxpYyBkcm9wZG93blRlbXBsYXRlOiBWaWJvckRyb3Bkb3duRGlyZWN0aXZlO1xuICBAQ29udGVudENoaWxkKFZpYm9yU2VsZWN0ZWREaXJlY3RpdmUpIHB1YmxpYyBzZWxlY3RlZFRlbXBsYXRlOiBWaWJvclNlbGVjdGVkRGlyZWN0aXZlO1xuICBAQ29udGVudENoaWxkKFZpYm9yQ3JlYXRlRGlyZWN0aXZlKSBwdWJsaWMgY3JlYXRlVGVtcGxhdGU6IFZpYm9yQ3JlYXRlRGlyZWN0aXZlO1xuICBASW5wdXQoKSBwdWJsaWMgbGlzdEZvcm1hdHRlcjogKGFyZzogYW55LCB2YWx1ZTogc3RyaW5nKSA9PiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBkcm9wZG93bkZvcm1hdHRlcjogKGFyZzogYW55LCB2YWx1ZTogc3RyaW5nKSA9PiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyB2aWV3UHJvcGVydHkgPSAnTmFtZSc7ICAvLyDDkMKfw5DCvsOQwrvDkMK1IMOQwrTDkMK7w5HCjyDDkMK0w5DCtcORwoTDkMK+w5DCu8ORwoLDkMK9w5DCvsOQwrPDkMK+IMOQwr7DkcKCw5DCvsOQwrHDkcKAw5DCsMOQwrbDkMK1w5DCvcOQwrjDkcKPXG5cbiAgQElucHV0KCkgcHVibGljIG1vZGVsUHJvcGVydHkgPSAnaWQnOyAgLy8gw5DCosOQwr4sIMORwofDkcKCw5DCviDDkMK3w5DCsMOQwr/DkMK4w5HCgcORwovDkMKyw5DCsMOQwrXDkcKCw5HCgcORwo8gw5DCsiDDkMKcw5DCvsOQwrTDkMK1w5DCu8ORwoxcbiAgQElucHV0KCkgcHVibGljIHByZWxvYWRQcm9wZXJ0eSA9ICdpZHMnOyAvLyDDkMKaw5DCu8ORwo7DkcKHIMOQwrfDkMKww5DCv8ORwoDDkMK+w5HCgcOQwrAgw5DCuiDDkcKBw5DCtcORwoDDkMKyw5DCtcORwoDDkcKDIMOQwrTDkMK7w5HCjyDDkMK/w5HCgMOQwrXDkMK0w5DCt8OQwrDDkMKzw5HCgMORwoPDkMK3w5DCusOQwrgsIMOQwrXDkcKBw5DCu8OQwrggdW5kZWZpbmVkIMOQwrfDkMKww5DCv8OQwrjDkcKBw5HCi8OQwrLDkMKww5DCtcORwoLDkcKBw5HCjyDDkMKyw5DCtcORwoHDkcKMIMOQwr7DkMKxw5HCisOQwrXDkMK6w5HCglxuICBASW5wdXQoKSBwdWJsaWMgcHJlbG9hZEZpZWxkOiBzdHJpbmcgPSB1bmRlZmluZWQ7IC8vIMOQwpfDkMK9w5DCsMORwofDkMK1w5DCvcOQwrjDkMK1IMOQwr/DkMK+w5DCu8ORwo8sIMOQwrrDkMK+w5HCgsOQwr7DkcKAw5DCtSDDkMK9w5DCtcOQwr7DkMKxw5HChcOQwr7DkMK0w5DCuMOQwrzDkMK+IMOQwr7DkcKCw5DCv8ORwoDDkMKww5DCssOQwrjDkcKCw5HCjCDDkMKyIMOQwrfDkMKww5DCv8ORwoDDkMK+w5HCgS5cbiAgQElucHV0KCkgcHVibGljIHNlYXJjaFByb3BlcnR5ID0gJ3F1ZXJ5JztcblxuICBASW5wdXQoKSBwdWJsaWMgZGF0YUxpc3Q6ICgocGFyYW06IE9iamVjdCwgcGFnZTogbnVtYmVyLCBjb3VudE9uUGFnZT86IG51bWJlcikgPT4gT2JzZXJ2YWJsZTxJRGF0YVJlc3BvbnNlPikgfCBBcnJheTxhbnk+O1xuICBASW5wdXQoKSBwdWJsaWMgZXhjbHVkZUxpc3Q6IEFycmF5PGFueT47XG4gIEBJbnB1dCgpIHB1YmxpYyBhZGRpdGlvbmFsRmlsdGVyID0ge307XG4gIEBJbnB1dCgpIHB1YmxpYyBvbmx5RW1pdHRlcjogYm9vbGVhbjtcbiAgQE91dHB1dCgnY2hhbmdlRnVsbE1vZGVsJykgcHVibGljIGNoYW5nZUZ1bGxNb2RlbDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblxuICBASW5wdXQoKSBwdWJsaWMgbmV3TWVzc2FnZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuICBASW5wdXQoKSBwdWJsaWMgQ3JlYXRlTmV3OiAocXVlcnk6IHN0cmluZykgPT4gT2JzZXJ2YWJsZTxhbnk+IHwgYW55ID0gKHF1ZXJ5OiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gcXVlcnk7XG4gIH1cblxuXG4gIC8vIFN1YnNjcmlwdGlvblxuICBwdWJsaWMgZGF0YUxpc3RTdWI6IFN1YnNjcmlwdGlvbjtcblxuXG4gIC8vIE9QVElPTlNcbiAgcHVibGljIFRyYWNrQnlGbihpbmRleDogbnVtYmVyKTogYW55IHtcbiAgICByZXR1cm4gaW5kZXg7XG4gIH1cblxuICBwdWJsaWMgc2hvd0Ryb3Bkb3duTGlzdChldmVudDogRm9jdXNFdmVudCB8IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5tdWx0aXBsZSAmJiB0aGlzLm91dHB1dC5sZW5ndGggPj0gdGhpcy5tdWx0aXBsZUxpbWl0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCdvcGVuLXZpYm9yJyk7XG4gICAgdGhpcy5pbnB1dEVsLmZvY3VzKCk7XG4gICAgdGhpcy51cGRhdGVPcHRpb25zKCk7XG4gICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgfVxuXG4gIHByaXZhdGUgaGlkZURyb3Bkb3duTGlzdCgpOiB2b2lkIHtcbiAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4tdmlib3InKTtcbiAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgIHRoaXMuaW5wdXRFbC5ibHVyKCk7XG4gIH1cblxuICBwdWJsaWMgaGlkZURyb3Bkb3duTGlzdFdpdGhEZWxheSgpOiB2b2lkIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuaGlkZURyb3Bkb3duTGlzdCgpO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlRHJvcGRvd24oZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICB0aGlzLmhpZGVEcm9wZG93bkxpc3QoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaG93RHJvcGRvd25MaXN0KHVuZGVmaW5lZCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZWxheTogRnVuY3Rpb24gPSAoZnVuY3Rpb24gKCk6IEZ1bmN0aW9uIHtcbiAgICBsZXQgdGltZXIgPSAwO1xuICAgIHJldHVybiBmdW5jdGlvbiAoY2FsbGJhY2s6IGFueSwgbXM6IG51bWJlcik6IHZvaWQge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIHRpbWVyID0gc2V0VGltZW91dChjYWxsYmFjaywgbXMpO1xuICAgIH07XG4gIH0pKCk7XG5cbiAgcHVibGljIHVwZGF0ZU9wdGlvbnMoKTogdm9pZCB7XG4gICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgIGlmICh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHRoaXMub3B0aW9ucyA9IHRoaXMuZGF0YUxpc3QuZmlsdGVyKGRhdGEgPT4ge1xuICAgICAgICBpZiAoIXRoaXMucXVlcnkgfHwgdGhpcy5xdWVyeS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZjogYW55ID0gZmV0Y2hGcm9tT2JqZWN0KGRhdGEsIHRoaXMuc2VhcmNoUHJvcGVydHkpO1xuICAgICAgICBpZiAoZiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShmKS5pbmRleE9mKHRoaXMucXVlcnkpID49IDA7XG4gICAgICB9KS5maWx0ZXIoZGF0YSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5leGNsdWRlTGlzdCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGQgPSBmZXRjaEZyb21PYmplY3QoZGF0YSwgdGhpcy5tb2RlbFByb3BlcnR5KS52YWx1ZU9mKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmV4Y2x1ZGVMaXN0LmZpbmRJbmRleChleCA9PiB7XG4gICAgICAgICAgbGV0IGEgPSBmZXRjaEZyb21PYmplY3QoZXgsIHRoaXMubW9kZWxQcm9wZXJ0eSkudmFsdWVPZigpO1xuICAgICAgICAgIHJldHVybiBkZWVwRXF1YWwoZCwgYSk7XG4gICAgICAgIH0pIDwgMDtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kYXRhTGlzdFN1YikgeyB0aGlzLmRhdGFMaXN0U3ViLnVuc3Vic2NyaWJlKCk7IH1cbiAgICAgIGlmICghdGhpcy5jdXJyZW50Q2FjaGUpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50Q2FjaGUgPSB7XG4gICAgICAgICAgY291bnRFbGVtZW50OiAwLFxuICAgICAgICAgIGNvdW50UGFnZXM6IDEsXG4gICAgICAgICAgY3VycmVudFBhZ2U6IDEsXG4gICAgICAgICAgb2JqZWN0czogW10sXG4gICAgICAgICAgcXVlcnk6IHRoaXMucXVlcnksXG4gICAgICAgICAgcGFyYW1zOiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmFkZGl0aW9uYWxGaWx0ZXIpXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY2FjaGVMYXp5RGF0YS5wdXNoKHRoaXMuY3VycmVudENhY2hlKTtcblxuICAgICAgICBsZXQgcGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5hZGRpdGlvbmFsRmlsdGVyKSBhcyBhbnk7XG4gICAgICAgIHBhcmFtc1t0aGlzLnNlYXJjaFByb3BlcnR5XSA9IHRoaXMucXVlcnk7XG5cbiAgICAgICAgdGhpcy5kYXRhTGlzdFN1YiA9ICg8T2JzZXJ2YWJsZTxJRGF0YVJlc3BvbnNlPj50aGlzLmRhdGFMaXN0KHBhcmFtcywgMSwgdGhpcy5jb3VudE9uUGFnZSkpLnN1YnNjcmliZShhbnN3ZXIgPT4ge1xuICAgICAgICAgIHRoaXMuY3VycmVudENhY2hlLm9iamVjdHMgPSB0aGlzLmN1cnJlbnRDYWNoZS5vYmplY3RzLmNvbmNhdChhbnN3ZXIubGlzdCk7XG4gICAgICAgICAgdGhpcy5jdXJyZW50Q2FjaGUuY291bnRFbGVtZW50ID0gYW5zd2VyLmhlYWRlcnNbJ2NvdW50J107XG4gICAgICAgICAgdGhpcy5jdXJyZW50Q2FjaGUuY291bnRQYWdlcyA9IE1hdGguY2VpbCh0aGlzLmN1cnJlbnRDYWNoZS5jb3VudEVsZW1lbnQgLyB0aGlzLmNvdW50T25QYWdlKTtcbiAgICAgICAgfSwgKCkgPT4geyB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlT3B0aW9uc0luRGVsYXkoKTogdm9pZCB7XG4gICAgbGV0IGRlbGF5TXM6IG51bWJlciA9IHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBBcnJheSA/IDEwIDogdGhpcy53YWl0VGltZTtcblxuICAgIC8vIGV4ZWN1dGluZyBhZnRlciB1c2VyIHN0b3BwZWQgdHlwaW5nXG4gICAgdGhpcy5kZWxheSgoKSA9PiB7XG4gICAgICB0aGlzLm9sZFF1ZXJ5ID0gdGhpcy5xdWVyeTtcbiAgICAgIHRoaXMuY3VycmVudENhY2hlID0gdGhpcy5HZXRDYWNoZSh0aGlzLnF1ZXJ5KTtcbiAgICAgIHRoaXMudXBkYXRlT3B0aW9ucygpO1xuICAgIH0sIGRlbGF5TXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBmb2N1c1NlbGVjdGVkT3B0aW9uKCk6IHZvaWQge1xuICAgIGxldCBsaXN0OiBhbnkgPSA8SFRNTEVsZW1lbnQ+dGhpcy5lbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzZWxlY3QtZHJvcGRvd24nKVswXTtcbiAgICBsZXQgdGFyZ2V0TGk6IGFueSA9IDxIVE1MRWxlbWVudD50aGlzLmVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb24nKVt0aGlzLnNlbGVjdG9yUG9zaXRpb25dO1xuICAgIHNjcm9sbEFjdGl2ZU9wdGlvbihsaXN0LCB0YXJnZXRMaSk7XG4gIH1cblxuICBwdWJsaWMga2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5PcHRpb25zKSB7XG4gICAgICB0aGlzLnNob3dEcm9wZG93bkxpc3QodW5kZWZpbmVkKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgdG90YWxOdW1JdGVtOiBudW1iZXIgPSB0aGlzLk9wdGlvbnMubGVuZ3RoO1xuXG4gICAgaWYgKHRoaXMuU2hvd05ldykge1xuICAgICAgdG90YWxOdW1JdGVtKys7XG4gICAgfVxuXG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICBjYXNlIDI3OiAvLyBFU0MsIGhpZGUgYXV0byBjb21wbGV0ZVxuICAgICAgICB0aGlzLmhpZGVEcm9wZG93bkxpc3QoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgMzg6IC8vIFVQLCBzZWxlY3QgdGhlIHByZXZpb3VzIGxpIGVsXG4gICAgICAgIHRoaXMuc2VsZWN0b3JQb3NpdGlvbiA9ICh0b3RhbE51bUl0ZW0gKyB0aGlzLnNlbGVjdG9yUG9zaXRpb24gLSAxKSAlIHRvdGFsTnVtSXRlbTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgNDA6IC8vIERPV04sIHNlbGVjdCB0aGUgbmV4dCBsaSBlbCBvciB0aGUgZmlyc3Qgb25lXG4gICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zZWxlY3RvclBvc2l0aW9uID0gKHRvdGFsTnVtSXRlbSArIHRoaXMuc2VsZWN0b3JQb3NpdGlvbiArIDEpICUgdG90YWxOdW1JdGVtO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAxMzogLy8gRU5URVIsIGNob29zZSBpdCEhXG4gICAgICAgIGlmICh0b3RhbE51bUl0ZW0gPiAwKSB7XG4gICAgICAgICAgaWYgKHRoaXMuc2VsZWN0b3JQb3NpdGlvbiA9PT0gdGhpcy5PcHRpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5BZGROZXdPYmplY3QodGhpcy5DcmVhdGVOZXcodGhpcy5xdWVyeSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE9uZShldmVudCwgdGhpcy5PcHRpb25zW3RoaXMuc2VsZWN0b3JQb3NpdGlvbl0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLlNob3dOZXcpIHtcbiAgICAgICAgICB0aGlzLkFkZE5ld09iamVjdCh0aGlzLkNyZWF0ZU5ldyh0aGlzLnF1ZXJ5KSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6IGJyZWFrO1xuICAgIH1cbiAgICB0aGlzLmZvY3VzU2VsZWN0ZWRPcHRpb24oKTtcbiAgfVxuXG4gIHB1YmxpYyBuZXh0UGFnZSgkZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAvLyBWYWxpZGF0b3JzXG4gICAgaWYgKCEodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdEYXRhIExpc3QgbWFzdCBiZSBGdW5jdGlvbicpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuY3VycmVudENhY2hlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZvciBuZXh0IHBhZ2UgbmVlZCBjYWNoZSBmb3IgZmlyc3QgUGFnZScpO1xuICAgIH1cbiAgICBpZiAodGhpcy5jdXJyZW50Q2FjaGUuY3VycmVudFBhZ2UgPj0gdGhpcy5jdXJyZW50Q2FjaGUuY291bnRQYWdlcykgeyB0aHJvdyBuZXcgRXJyb3IoJ01heCBQYWdlIExpbWl0Jyk7IH1cblxuICAgIGlmICh0aGlzLmRhdGFMaXN0U3ViKSB7IHRoaXMuZGF0YUxpc3RTdWIudW5zdWJzY3JpYmUoKTsgfVxuXG4gICAgbGV0IHBhcmFtczogYW55ID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5hZGRpdGlvbmFsRmlsdGVyKTtcbiAgICBwYXJhbXNbdGhpcy5zZWFyY2hQcm9wZXJ0eV0gPSB0aGlzLnF1ZXJ5O1xuXG4gICAgdGhpcy5kYXRhTGlzdFN1YiA9IHRoaXMuZGF0YUxpc3QocGFyYW1zLCB0aGlzLmN1cnJlbnRDYWNoZS5jdXJyZW50UGFnZSArIDEsIHRoaXMuY291bnRPblBhZ2UpLnN1YnNjcmliZShhbnN3ZXIgPT4ge1xuICAgICAgdGhpcy5jdXJyZW50Q2FjaGUuY3VycmVudFBhZ2UrKztcbiAgICAgIHRoaXMuY3VycmVudENhY2hlLmNvdW50RWxlbWVudCA9IGFuc3dlci5oZWFkZXJzWydjb3VudCddO1xuICAgICAgdGhpcy5jdXJyZW50Q2FjaGUuY291bnRQYWdlcyA9IE1hdGguY2VpbCh0aGlzLmN1cnJlbnRDYWNoZS5jb3VudEVsZW1lbnQgLyB0aGlzLmNvdW50T25QYWdlKTtcbiAgICAgIHRoaXMuY3VycmVudENhY2hlLm9iamVjdHMgPSB0aGlzLmN1cnJlbnRDYWNoZS5vYmplY3RzLmNvbmNhdChhbnN3ZXIubGlzdCk7XG4gICAgICB0aGlzLnNlbGVjdG9yUG9zaXRpb24gPSAodGhpcy5jdXJyZW50Q2FjaGUuY3VycmVudFBhZ2UgLSAxKSAqIHRoaXMuY291bnRPblBhZ2UgKyAxO1xuICAgICAgdGhpcy5mb2N1c1NlbGVjdGVkT3B0aW9uKCk7XG4gICAgfSwgKCkgPT4geyB9KTtcbiAgfVxuXG4gIC8vIE1PREVMXG4gIHByaXZhdGUgY2xlYXJQcm9wZXJ0eSgpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdG9yUG9zaXRpb24gPSAwO1xuICAgIHRoaXMucXVlcnkgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0T25lKCRldmVudDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQsIGRhdGE6IGFueSk6IHZvaWQge1xuICAgIC8vIMOQwqTDkMK4w5DCu8ORwozDkcKCw5HCgCDDkMK9w5DCtcOQwr3DkcKDw5DCtsOQwr3DkcKLw5HChSDDkcKBw5DCvsOQwrHDkcKLw5HCgsOQwrjDkMK5XG4gICAgaWYgKCRldmVudCBpbnN0YW5jZW9mIE1vdXNlRXZlbnQgJiYgJGV2ZW50LmJ1dHRvbiAhPT0gMCkgeyByZXR1cm47IH1cblxuICAgIGlmICh0aGlzLm11bHRpcGxlICYmIHRoaXMub3V0cHV0Lmxlbmd0aCA8IHRoaXMubXVsdGlwbGVMaW1pdCkge1xuICAgICAgdGhpcy5vdXRwdXQucHVzaChkYXRhKTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLm11bHRpcGxlKSB7XG4gICAgICB0aGlzLm91dHB1dCA9IFtkYXRhXTtcbiAgICB9XG4gICAgdGhpcy5jaGFuZ2VGdWxsTW9kZWwuZW1pdCh0aGlzLm91dHB1dCk7XG4gICAgdGhpcy5Nb2RlbCA9IHRoaXMuVmFsdWVGcm9tT3V0cHV0O1xuICAgIHRoaXMuY2xlYXJQcm9wZXJ0eSgpO1xuICAgIHRoaXMuaGlkZURyb3Bkb3duTGlzdCgpO1xuICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9O1xuXG4gIHB1YmxpYyByZW1vdmVPbmUoaW5kZXg6IG51bWJlciwgZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cblxuICAgIHRoaXMub3V0cHV0LnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy5Nb2RlbCA9IHRoaXMuVmFsdWVGcm9tT3V0cHV0O1xuXG4gICAgLy8gc2V0IGNsYXNzXG4gICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICB0aGlzLmlucHV0Q29udHJvbC5jb250cm9sLm1hcmtBc1RvdWNoZWQoKTtcblxuICAgIC8vIG9wZW4gZHJvcGRvd25cbiAgICBpZiAodGhpcy5yZXF1aXJlZCkge1xuICAgICAgdGhpcy5zaG93RHJvcGRvd25MaXN0KHVuZGVmaW5lZCk7XG4gICAgfVxuICB9XG5cbiAgLy8gRk9STUFUVElOR1xuXG4gIHB1YmxpYyBnZXQgU2VsZWN0ZWRUZW1wbGF0ZSgpOiBUZW1wbGF0ZVJlZjxhbnk+IHtcbiAgICBpZiAodGhpcy5zZWxlY3RlZFRlbXBsYXRlKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZFRlbXBsYXRlLnRlbXBsYXRlUmVmO1xuICAgIH0gZWxzZSBpZiAodGhpcy5ib3RoVGVtcGxhdGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmJvdGhUZW1wbGF0ZS50ZW1wbGF0ZVJlZjtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgRHJvcGRvd25UZW1wbGF0ZSgpOiBUZW1wbGF0ZVJlZjxhbnk+IHtcbiAgICBpZiAodGhpcy5kcm9wZG93blRlbXBsYXRlKSB7XG4gICAgICByZXR1cm4gdGhpcy5kcm9wZG93blRlbXBsYXRlLnRlbXBsYXRlUmVmO1xuICAgIH0gZWxzZSBpZiAodGhpcy5ib3RoVGVtcGxhdGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmJvdGhUZW1wbGF0ZS50ZW1wbGF0ZVJlZjtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRMaXN0Rm9ybWF0dGVkKGRhdGE6IGFueSk6IHN0cmluZyB7XG4gICAgbGV0IGZvcm1hdHRlcjogYW55ID0gdGhpcy5saXN0Rm9ybWF0dGVyIHx8IGRlZmF1bHRGb3JtYXR0ZXI7XG4gICAgcmV0dXJuIGZvcm1hdHRlci5hcHBseSh0aGlzLCBbZGF0YSwgdGhpcy52aWV3UHJvcGVydHldKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXREcm9wZG93bkZvcm1hdHRlZChkYXRhOiBhbnkpOiBzdHJpbmcge1xuICAgIGxldCBmb3JtYXR0ZXI6IGFueSA9IHRoaXMuZHJvcGRvd25Gb3JtYXR0ZXIgfHwgZGVmYXVsdEZvcm1hdHRlcjtcbiAgICByZXR1cm4gZm9ybWF0dGVyLmFwcGx5KHRoaXMsIFtkYXRhLCB0aGlzLnZpZXdQcm9wZXJ0eV0pO1xuICB9XG5cbiAgLy8gSU5JVFxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgLy8gdGhpcy5Nb2RlbCA9IHRoaXMuVmFsdWVGcm9tT3V0cHV0OyDDkMKtw5HCgsOQwr4gw5DCssORwoDDkMK+w5DCtMOQwrUgw5HCgsORwoPDkcKCIMORwoLDkMK+w5DCtsOQwrUgw5HCg8OQwrbDkMK1IMOQwr3DkMK1IMOQwr3DkMKww5DCtMOQwr4uXG4gICAgdGhpcy5lbCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3ZpYm9yJykuaXRlbSgwKTtcbiAgICBpZiAodGhpcy5tdWx0aXBsZSkgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCdtdWx0aXBsZScpO1xuICAgIGlmICh0aGlzLnJlcXVpcmVkKSB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ3JlcXVpcmVkJyk7XG5cbiAgICB0aGlzLmlucHV0RWwgPSA8SFRNTElucHV0RWxlbWVudD4odGhpcy5lbC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhpbnB1dHM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoaW5wdXRzWydkYXRhTGlzdCddICYmIGlucHV0c1snZGF0YUxpc3QnXS5jdXJyZW50VmFsdWUpIHtcbiAgICAgIC8vIE91dHB1dFxuICAgICAgaWYgKHRoaXMuTW9kZWwgPT09IHVuZGVmaW5lZCB8fCB0aGlzLk1vZGVsID09IG51bGwpIHtcbiAgICAgICAgdGhpcy5vdXRwdXQgPSBbXTtcbiAgICAgICAgdGhpcy5jaGFuZ2VGdWxsTW9kZWwuZW1pdCh0aGlzLm91dHB1dCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuTW9kZWwgaW5zdGFuY2VvZiBBcnJheSAmJiB0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgIHRoaXMuT3V0cHV0ID0gdGhpcy5Nb2RlbDtcbiAgICAgIH0gZWxzZSBpZiAoISh0aGlzLk1vZGVsIGluc3RhbmNlb2YgQXJyYXkpICYmICF0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgIHRoaXMuT3V0cHV0ID0gW3RoaXMuTW9kZWxdO1xuXG4gICAgICAgIGlmICghdGhpcy5vdXRwdXQgfHwgIXRoaXMub3V0cHV0Lmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuTW9kZWwgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5lbCAmJiBpbnB1dHNbJ211bHRpcGxlJ10pIHtcbiAgICAgIGlmIChpbnB1dHNbJ211bHRpcGxlJ10uY3VycmVudFZhbHVlKSB7XG4gICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCgnbXVsdGlwbGUnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZSgnbXVsdGlwbGUnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5lbCAmJiBpbnB1dHNbJ3JlcXVpcmVkJ10pIHtcbiAgICAgIGlmIChpbnB1dHNbJ3JlcXVpcmVkJ10uY3VycmVudFZhbHVlKSB7XG4gICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCgncmVxdWlyZWQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZSgncmVxdWlyZWQnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaW5wdXRzWydhZGRpdGlvbmFsRmlsdGVyJ10pIHtcbiAgICAgIHRoaXMuY3VycmVudENhY2hlID0gdGhpcy5HZXRDYWNoZSh0aGlzLnF1ZXJ5KTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTERpdkVsZW1lbnQ+KSB7XG4gICAgdGhpcy5vdXRwdXQgPSBbXTtcbiAgfVxuXG4gIC8vIEZPUk1TXG4gIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAvLyDDkMKdw5DCvsORwoDDkMK8w5DCsMOQwrvDkcKMw5DCvcORwovDkMK5IHVwZGF0ZSDDkMK8w5DCvsOQwrTDkMK1w5DCu8OQwrhcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIGlmICgodmFsdWUgaW5zdGFuY2VvZiBBcnJheSAmJiAhdGhpcy5tdWx0aXBsZSkgfHwgKCEodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkgJiYgdGhpcy5tdWx0aXBsZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNb2RlbCBUeXBlIEVycm9yJyk7XG4gICAgICB9XG4gICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBBcnJheSAmJiB0aGlzLk1vZGVsIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gdGhpcy5Nb2RlbC5sZW5ndGggJiYgdmFsdWUuZXZlcnkodiA9PiB0aGlzLk1vZGVsLmluZGV4T2YodikgPj0gMCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5Nb2RlbCA9PT0gdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5maXJzdExvYWQgPSB0cnVlO1xuICAgICAgdGhpcy5Nb2RlbCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBvbkNoYW5nZTogYW55ID0gKCkgPT4geyB9O1xuICBwdWJsaWMgb25Ub3VjaGVkOiBhbnkgPSAoKSA9PiB7IH07XG5cbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBwdWJsaWMgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgaWYgKGlzRGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVsLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICB9XG4gICAgLy8gZGlzYWJsZSBvdGhlciBjb21wb25lbnRzIGhlcmVcbiAgfVxuXG4gIHNldCBNb2RlbCh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHRoaXMub25seUVtaXR0ZXIpIHtcbiAgICAgIHRoaXMub3V0cHV0ID0gW107XG4gICAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBPdXRwdXRcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PSBudWxsKSB7XG4gICAgICB0aGlzLm91dHB1dCA9IFtdO1xuICAgICAgdGhpcy5jaGFuZ2VGdWxsTW9kZWwuZW1pdCh0aGlzLm91dHB1dCk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5ICYmIHRoaXMubXVsdGlwbGUpIHtcbiAgICAgIHRoaXMuT3V0cHV0ID0gdmFsdWU7XG4gICAgfSBlbHNlIGlmICghKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpICYmICF0aGlzLm11bHRpcGxlKSB7XG4gICAgICB0aGlzLk91dHB1dCA9IFt2YWx1ZV07XG4gICAgfVxuXG4gICAgLy8gTW9kZWxcbiAgICB0aGlzLl9tb2RlbCA9IHZhbHVlO1xuXG4gICAgLy8gRm9ybXNcbiAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuX21vZGVsKTtcbiAgfVxuXG4gIGdldCBNb2RlbCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbDtcbiAgfVxuXG4gIC8vIFBST1BFUlRZXG4gIGdldCBJbnB1dEhpZGUoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcbiAgICAgIHJldHVybiB0aGlzLm91dHB1dC5sZW5ndGggPj0gdGhpcy5tdWx0aXBsZUxpbWl0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5vdXRwdXQubGVuZ3RoID09PSAxICYmICF0aGlzLmlzT3BlbjtcbiAgICB9XG4gIH1cblxuICBnZXQgVmFsdWVGcm9tT3V0cHV0KCk6IGFueSB7XG4gICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcbiAgICAgIGxldCB0bXA6IEFycmF5PGFueT4gPSBbXTtcbiAgICAgIGZvciAobGV0IG8gb2YgdGhpcy5vdXRwdXQpIHtcbiAgICAgICAgdG1wLnB1c2goZmV0Y2hGcm9tT2JqZWN0KG8sIHRoaXMubW9kZWxQcm9wZXJ0eSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRtcDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZldGNoRnJvbU9iamVjdCh0aGlzLm91dHB1dFswXSwgdGhpcy5tb2RlbFByb3BlcnR5KTtcbiAgICB9XG4gIH1cblxuICBzZXQgT3V0cHV0KG5ld1ZhbHVlOiBBcnJheTxhbnk+KSB7XG4gICAgbGV0IGRhdGFMaXN0OiBBcnJheTxhbnk+ID0gW107XG4gICAgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgZGF0YUxpc3QgPSB0aGlzLmRhdGFMaXN0O1xuICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICBpZiAobmV3VmFsdWUgJiYgbmV3VmFsdWUubGVuZ3RoICYmIHRoaXMuZmlyc3RMb2FkKSB7XG4gICAgICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuICAgICAgICB0aGlzLmZpcnN0TG9hZCA9IGZhbHNlO1xuICAgICAgICBpZiAoIXRoaXMucHJlbG9hZFByb3BlcnR5KSB7XG4gICAgICAgICAgdGhpcy5vdXRwdXQgPSBuZXdWYWx1ZTtcbiAgICAgICAgICB0aGlzLmNoYW5nZUZ1bGxNb2RlbC5lbWl0KHRoaXMub3V0cHV0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwYXJhbXNbdGhpcy5wcmVsb2FkUHJvcGVydHldID0gbmV3VmFsdWUubWFwKHZhbCA9PiBmZXRjaEZyb21PYmplY3QodmFsLCB0aGlzLnByZWxvYWRGaWVsZCkpO1xuICAgICAgICAgIHRoaXMuZGF0YUxpc3RTdWIgPSAoPE9ic2VydmFibGU8SURhdGFSZXNwb25zZT4+dGhpcy5kYXRhTGlzdChwYXJhbXMsIDEsIHRoaXMuY291bnRPblBhZ2UpKS5zdWJzY3JpYmUoYW5zd2VyID0+IHtcbiAgICAgICAgICAgIHRoaXMub3V0cHV0ID0gYW5zd2VyLmxpc3Q7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUZ1bGxNb2RlbC5lbWl0KHRoaXMub3V0cHV0KTtcbiAgICAgICAgICB9LCAoKSA9PiB7IH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNoYW5nZUZ1bGxNb2RlbC5lbWl0KHRoaXMub3V0cHV0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuZGF0YUxpc3QgPT09IHVuZGVmaW5lZCkgeyByZXR1cm47IH1cbiAgICAgIHRocm93IG5ldyBFcnJvcignZGF0YUxpc3QgdmFsdWUgRXJyb3InKTtcbiAgICB9XG4gICAgbGV0IG5ld091dHB1dDogQXJyYXk8YW55PiA9IFtdO1xuICAgIGZvciAobGV0IHYgb2YgbmV3VmFsdWUpIHtcbiAgICAgIGZvciAobGV0IGQgb2YgZGF0YUxpc3QpIHtcbiAgICAgICAgbGV0IGEgPSBmZXRjaEZyb21PYmplY3QoZCwgdGhpcy5tb2RlbFByb3BlcnR5KSA/IGZldGNoRnJvbU9iamVjdChkLCB0aGlzLm1vZGVsUHJvcGVydHkpLnZhbHVlT2YoKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgbGV0IGIgPSB2ID8gdi52YWx1ZU9mKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChkZWVwRXF1YWwoYSwgYikpIHtcbiAgICAgICAgICBuZXdPdXRwdXQucHVzaChkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLm91dHB1dCA9IG5ld091dHB1dDtcbiAgICB0aGlzLmNoYW5nZUZ1bGxNb2RlbC5lbWl0KHRoaXMub3V0cHV0KTtcbiAgfVxuXG4gIGdldCBPcHRpb25zKCk6IEFycmF5PGFueT4ge1xuICAgIGxldCBvcHRpb25zOiBBcnJheTxhbnk+O1xuICAgIGlmICh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgfSBlbHNlIGlmICh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIGxldCBvbGRDYWNoZSA9IHRoaXMuR2V0Q2FjaGUodGhpcy5vbGRRdWVyeSk7XG5cbiAgICAgIGlmICghdGhpcy5jdXJyZW50Q2FjaGUgJiYgb2xkQ2FjaGUpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9sZENhY2hlLm9iamVjdHM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb25zID0gdGhpcy5jdXJyZW50Q2FjaGUgPyB0aGlzLmN1cnJlbnRDYWNoZS5vYmplY3RzIDogW107XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAob3B0aW9ucyB8fCBbXSkuZmlsdGVyKG9wID0+IHtcbiAgICAgIHJldHVybiB0aGlzLm91dHB1dC5maW5kSW5kZXgobyA9PiB7XG4gICAgICAgIGxldCBhID0gZmV0Y2hGcm9tT2JqZWN0KG8sIHRoaXMubW9kZWxQcm9wZXJ0eSkgPyBmZXRjaEZyb21PYmplY3QobywgdGhpcy5tb2RlbFByb3BlcnR5KS52YWx1ZU9mKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgIGxldCBiID0gZmV0Y2hGcm9tT2JqZWN0KG9wLCB0aGlzLm1vZGVsUHJvcGVydHkpID8gZmV0Y2hGcm9tT2JqZWN0KG9wLCB0aGlzLm1vZGVsUHJvcGVydHkpLnZhbHVlT2YoKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIGRlZXBFcXVhbChhLCBiKTtcbiAgICAgIH0pID09PSAtMTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBjdXJyZW50Q2FjaGU6IENhY2hlSW5mbztcbiAgcHJpdmF0ZSBHZXRDYWNoZShxdWVyeTogc3RyaW5nKTogQ2FjaGVJbmZvIHtcbiAgICBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYWNoZUxhenlEYXRhLmZpbmQoY2FjaGUgPT4ge1xuICAgICAgICByZXR1cm4gY2FjaGUucXVlcnkgPT09IHRoaXMucXVlcnkgJiYgZGVlcEVxdWFsKGNhY2hlLnBhcmFtcywgdGhpcy5hZGRpdGlvbmFsRmlsdGVyKTtcbiAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICAvLyBDcmVhdGVOZXdcblxuICBwdWJsaWMgQWRkTmV3T2JqZWN0KHZhbHVlOiBPYnNlcnZhYmxlPGFueT4gfCBhbnkpOiB2b2lkIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSB7XG4gICAgICB2YWx1ZS5zdWJzY3JpYmUobmV3T2JqZWN0ID0+IHtcbiAgICAgICAgaWYgKG5ld09iamVjdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhpcy5TZXROZXdPYmplY3QobmV3T2JqZWN0KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuU2V0TmV3T2JqZWN0KHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIFNldE5ld09iamVjdChuZXdPYmplY3Q6IGFueSkge1xuICAgIGlmICh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHRoaXMuZGF0YUxpc3QucHVzaChuZXdPYmplY3QpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICBmb3IgKGxldCBjYWNoZSBvZiB0aGlzLmNhY2hlTGF6eURhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMucXVlcnkuaW5jbHVkZXMoY2FjaGUucXVlcnkpIHx8IGNhY2hlLnF1ZXJ5ID09PSB1bmRlZmluZWQgfHwgY2FjaGUucXVlcnkgPT09ICcnKSB7XG4gICAgICAgICAgY2FjaGUuY291bnRFbGVtZW50Kys7XG4gICAgICAgICAgY2FjaGUub2JqZWN0cy5wdXNoKG5ld09iamVjdCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmZpcnN0TG9hZCA9IGZhbHNlO1xuICAgIHRoaXMucXVlcnkgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5jdXJyZW50Q2FjaGUgPSB0aGlzLkdldENhY2hlKHRoaXMucXVlcnkpO1xuICAgIHRoaXMuc2VsZWN0T25lKG5ldyBNb3VzZUV2ZW50KCdjbGljaycpLCBuZXdPYmplY3QpO1xuICB9XG5cbiAgZ2V0IFNob3dOZXcoKTogYm9vbGVhbiB7XG4gICAgbGV0IGEgPSB0aGlzLnF1ZXJ5ICYmIHRoaXMubmV3TWVzc2FnZSAmJiAoIXRoaXMuZGF0YUxpc3RTdWIgfHwgdGhpcy5kYXRhTGlzdFN1Yi5jbG9zZWQpO1xuXG4gICAgbGV0IGIgPSB0aGlzLk9wdGlvbnMuZmluZEluZGV4KG8gPT4ge1xuICAgICAgbGV0IGMgPSBmZXRjaEZyb21PYmplY3QobywgdGhpcy52aWV3UHJvcGVydHkpID8gZmV0Y2hGcm9tT2JqZWN0KG8sIHRoaXMudmlld1Byb3BlcnR5KS52YWx1ZU9mKCkgOiB1bmRlZmluZWQ7XG4gICAgICByZXR1cm4gZGVlcEVxdWFsKGMsIHRoaXMucXVlcnkpO1xuICAgIH0pID09PSAtMSAmJiB0aGlzLm91dHB1dC5maW5kSW5kZXgobyA9PiB7XG4gICAgICBsZXQgYyA9IGZldGNoRnJvbU9iamVjdChvLCB0aGlzLnZpZXdQcm9wZXJ0eSkgPyBmZXRjaEZyb21PYmplY3QobywgdGhpcy52aWV3UHJvcGVydHkpLnZhbHVlT2YoKSA6IHVuZGVmaW5lZDtcbiAgICAgIHJldHVybiBkZWVwRXF1YWwoYywgdGhpcy5xdWVyeSk7XG4gICAgfSkgPT09IC0xO1xuXG4gICAgcmV0dXJuIGEgJiYgYjtcbiAgfVxuXG4gIGdldCBTaG93RW1wdHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuT3B0aW9ucy5sZW5ndGggPT09IDAgJiYgKCEodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB8fCAodGhpcy5kYXRhTGlzdFN1Yi5jbG9zZWQpKTtcbiAgfVxuXG5cbiAgLy8gQ0FDSEVcbiAgcHJpdmF0ZSBjYWNoZUxhenlEYXRhOiBBcnJheTxDYWNoZUluZm8+ID0gW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2FjaGVJbmZvIHtcbiAgY291bnRFbGVtZW50OiBudW1iZXI7XG4gIGNvdW50UGFnZXM6IG51bWJlcjtcbiAgY3VycmVudFBhZ2U6IG51bWJlcjtcbiAgb2JqZWN0czogQXJyYXk8YW55PjtcblxuICBxdWVyeTogc3RyaW5nO1xuICBwYXJhbXM6IGFueTtcbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgTmdWaWJvckNvbXBvbmVudCB9IGZyb20gJy4vbmctdmlib3IuY29tcG9uZW50JztcbmltcG9ydCB7IFZpYm9yQm90aERpcmVjdGl2ZSwgVmlib3JDcmVhdGVEaXJlY3RpdmUsIFZpYm9yRHJvcGRvd25EaXJlY3RpdmUsIFZpYm9yU2VsZWN0ZWREaXJlY3RpdmUgfSBmcm9tICcuL25nLXZpYm9yLXRlbXBsYXRlLmRpcmVjdGl2ZSc7XG5jb25zdCBjb21wb25lbnRzID0gW05nVmlib3JDb21wb25lbnQsIFZpYm9yQm90aERpcmVjdGl2ZSwgVmlib3JDcmVhdGVEaXJlY3RpdmUsIFZpYm9yRHJvcGRvd25EaXJlY3RpdmUsIFZpYm9yU2VsZWN0ZWREaXJlY3RpdmVdXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBGb3Jtc01vZHVsZSwgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIC4uLmNvbXBvbmVudHNcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIC4uLmNvbXBvbmVudHMsIEZvcm1zTW9kdWxlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmdWaWJvck1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJ0c2xpYl8xLl9fdmFsdWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7SUFNRTtLQUFpQjs7Z0JBSmxCLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7O3lCQUpEOzs7Ozs7O0FDQUE7SUFJSSxnQ0FBbUIsV0FBNkI7UUFBN0IsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO0tBQUk7O2dCQUZ2RCxTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsMEJBQTBCLEVBQUU7Ozs7Z0JBRi9CLFdBQVc7O2lDQUEvQjs7O0lBU0ksZ0NBQW1CLFdBQTZCO1FBQTdCLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtLQUFJOztnQkFGdkQsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLDBCQUEwQixFQUFFOzs7O2dC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