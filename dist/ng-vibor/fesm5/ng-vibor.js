import { Injectable, Directive, TemplateRef, NgModule, EventEmitter, Component, ViewEncapsulation, forwardRef, ElementRef, ViewChild, Input, ContentChild, Output, defineInjectable } from '@angular/core';
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
                    template: "<div class=\"vibor\">\n  <ng-content></ng-content>\n\n  <div class=\"select-search\" (click)=\"showDropdownList($event);\">\n    <ul class=\"select-search-list\">\n      <ng-container *ngIf=\"multiple || !isOpen\">\n        <ng-container *ngIf=\"!SelectedTemplate; else selectedT\">\n          <li class=\"select-search-list-item select-search-list-item_selection\" *ngFor=\"let item of output; let $index=index; let $last=last; trackBy: TrackByFn;\">\n            <div class=\"vibor__selection\">\n              <div [innerHTML]=\"getListFormatted(item)\"></div>\n              <a class=\"select-search-list-item_remove\" *ngIf=\"allowReset\" (click)=\"!disabled && removeOne($index, $event)\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\">\n                  <path fill=\"#2c2c2c\" d=\"M10.1 4.5L8 6.6 5.9 4.5 4.5 5.9 6.6 8l-2.1 2.1 1.4 1.4L8 9.4l2.1 2.1 1.4-1.4L9.4 8l2.1-2.1z\"/>\n                </svg>\n              </a>\n            </div>\n          </li>\n        </ng-container>\n\n        <ng-template #selectedT>\n          <li class=\"select-search-list-item select-search-list-item_selection\" *ngFor=\"let item of output; let $index=index; let $last=last; trackBy: TrackByFn;\">\n            <div class=\"vibor__selection\">\n              <ng-container *ngTemplateOutlet=\"SelectedTemplate; context: {item: item}\"></ng-container>\n              <a class=\"select-search-list-item_remove\" *ngIf=\"allowReset && !disabled\" (click)=\"!disabled && removeOne($index, $event)\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\">\n                  <path fill=\"#2c2c2c\" d=\"M10.1 4.5L8 6.6 5.9 4.5 4.5 5.9 6.6 8l-2.1 2.1 1.4 1.4L8 9.4l2.1 2.1 1.4-1.4L9.4 8l2.1-2.1z\"/>\n                </svg>\n              </a>\n            </div>\n          </li>\n        </ng-template>\n      </ng-container>\n\n      <li class=\"select-search-list-item select-search-list-item_input\" [class.select-search-list-item_hide]=\"InputHide\">\n        <input autocomplete=\"off\" #inputControl=\"ngModel\" [name]=\"name\" [disabled]=\"disabled\" [(ngModel)]=\"query\" [placeholder]=\"output.length == 0 || (multiple && output.length < multipleLimit) ? placeholder : ''\"\n          (input)=\"updateOptionsInDelay()\" (keydown)=\"keyDown($event)\" />\n      </li>\n      <li class=\"select-search-list-item select-search-list-item_loader-center\" [hidden]=\"!dataListSub || dataListSub.closed\">\n        <div class=\"select-search-list-item_loader\"></div>\n      </li>\n\n      <span class=\"arrow\" (click)=\"toggleDropdown($event)\">\n      </span>\n    </ul>\n  </div>\n\n  <div class=\"select-dropdown\" *ngIf=\"isOpen\">\n    <ul class=\"select-dropdown-optgroup\">\n      <ng-container *ngIf=\"!DropdownTemplate; else dropdownT\">\n        <li class=\"select-dropdown-optgroup-option\" *ngFor=\"let option of Options; let i=index\" (mousedown)=\"selectOne($event, option)\"\n          [class.active]=\"i === selectorPosition\" [innerHTML]=\"getDropdownFormatted(option)\">\n        </li>\n      </ng-container>\n\n      <ng-template #dropdownT>\n        <li class=\"select-dropdown-optgroup-option\" *ngFor=\"let option of Options; let i=index\" (mousedown)=\"selectOne($event, option)\"\n          [class.active]=\"i === selectorPosition\">\n          <ng-container *ngTemplateOutlet=\"DropdownTemplate; context: {item: option}\"></ng-container>\n        </li>\n      </ng-template>\n\n      <li class=\"select-dropdown-optgroup-option loading\" *ngIf=\"dataListSub && !dataListSub.closed\">\n        \u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430\n      </li>\n      <li class=\"select-dropdown-optgroup-option loader\" (mousedown)=\"AddNewObject(CreateNew(query));\" [class.active]=\"selectorPosition === Options.length\"\n        *ngIf=\"ShowNew\">\n\n        <ng-container *ngIf=\"createTemplate; else templateWithMessage\">\n          <ng-container *ngTemplateOutlet=\"createTemplate.templateRef; context: {query: query}\"></ng-container>\n        </ng-container>\n\n        <ng-template #templateWithMessage>\n          {{ newMessage }}\n        </ng-template>\n      </li>\n      <li class=\"select-dropdown-optgroup-option loader\" *ngIf=\"ShowEmpty\">\n        \u041F\u0443\u0441\u0442\u043E\n      </li>\n    </ul>\n    <div class=\"select-dropdown-pager\" *ngIf=\"currentCache && currentCache.countPages > 1\">\n      <p class=\"select-dropdown-pager-page\">\n        {{ currentCache.currentPage | number }} / {{ currentCache.countPages | number }}\n      </p>\n      <button class=\"select-dropdown-pager-loadmore\" *ngIf=\"currentCache.countPages > 1 && currentCache.currentPage < currentCache.countPages\"\n        (mousedown)=\"nextPage($event)\">\n        \u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0435\u0449\u0451\n      </button>\n    </div>\n  </div>\n</div>\n",
                    styles: [".vibor a,.vibor label,.vibor legend,.vibor p,.vibor span,.vibor ul{margin:0;padding:0;border:0}.vibor a,.vibor button,.vibor input{outline:0}.vibor ol,.vibor ul{list-style:none}.vibor input{padding:0;margin:0;border:0;font:inherit}.vibor b{font-weight:400}.vibor{position:relative;display:block;padding:10px 15px;border:1px solid #d5d9de;border-radius:3px;font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\";transition:box-shadow .15s linear}.vibor:hover,.vibor:hover .select-dropdown{box-shadow:0 3px 6px 0 rgba(44,44,44,.1)}.vibor[disabled]{opacity:.6;pointer-events:none}.vibor .select-search{position:relative}.vibor .select-search .arrow{content:\"\";position:absolute;right:0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);display:block;width:16px;height:16px;background-image:url(data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ibmMtaWNvbiBnbHlwaCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiI+DQogIDxwYXRoIGZpbGw9IiMyYzJjMmMiIGQ9Ik04IDExLjRMMi42IDYgNCA0LjZsNCA0IDQtNEwxMy40IDYiLz4NCjwvc3ZnPg0K);transition:-webkit-transform .15s ease-in-out;transition:transform .15s ease-in-out;transition:transform .15s ease-in-out,-webkit-transform .15s ease-in-out}.vibor .select-search .arrow:before,.vibor .select-search-list-item_hide{display:none}.vibor .select-search-list-item_selection{position:relative}.vibor .select-search-list-item_input input{width:100%;text-overflow:ellipsis;font-size:14px;color:#383d41}.vibor .select-search-list-item_input input::-webkit-input-placeholder{color:rgba(56,61,65,.3)}.vibor .select-search-list-item_input input:-ms-input-placeholder{color:rgba(56,61,65,.3)}.vibor .select-search-list-item_input input::-ms-input-placeholder{color:rgba(56,61,65,.3)}.vibor .select-search-list-item_input input::placeholder{color:rgba(56,61,65,.3)}.vibor .select-search-list-item_remove{display:flex;align-items:center;justify-content:center;width:16px;height:16px;margin-left:5px;border-radius:50%;background-color:#bababa;cursor:pointer;transition:background-color .15s linear}.vibor .select-search-list-item_remove:hover{background-color:#949494}.vibor .select-dropdown{position:absolute;top:100%;left:-1px;right:-1px;z-index:2}.vibor .select-search-list-item_loader-center{position:absolute;right:0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);display:flex;align-items:center;justify-content:center;width:21px;height:21px;background:#fff;z-index:2}.vibor .select-search-list-item_loader-center[hidden]{display:none}.vibor .select-search-list-item_loader-center .select-search-list-item_loader{width:16px;height:16px;box-sizing:border-box;border-width:2px;border-style:solid;border-color:#22272e rgba(34,39,46,.4) rgba(34,39,46,.4);border-radius:100%;-webkit-animation:.45s linear infinite clockwise;animation:.45s linear infinite clockwise}.vibor .select-dropdown{border:1px solid #d5d9de;border-bottom-left-radius:5px;border-bottom-right-radius:5px;border-top:0;background:#fff}.vibor .select-dropdown-optgroup{max-height:300px;overflow-y:auto}.vibor .select-dropdown-optgroup-option{min-height:30px;padding:10px 15px}.vibor .select-dropdown-optgroup-option:hover{background-color:rgba(66,132,215,.1)}.vibor .select-dropdown-optgroup-option.loading{font-size:16px;line-height:18px;text-align:center;color:#8b8b83}.vibor .select-dropdown-pager{padding:10px;text-align:center;border-top:1px dashed #d5d9de}.vibor .select-dropdown-pager-page{font-size:12px;color:#8b8b83}.vibor .select-dropdown-pager-loadmore{border:0;background:0 0;box-shadow:none}.vibor .select-dropdown-pager-page+.select-dropdown-pager-loadmore{margin-top:10px}.vibor.open-vibor{border-bottom-left-radius:0;border-bottom-right-radius:0}.vibor.open-vibor .select-search .arrow{-webkit-transform:translateY(-50%) rotate(180deg);transform:translateY(-50%) rotate(180deg)}.vibor:not(.multiple) .select-search-list-item_remove{position:absolute;right:25px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.vibor.multiple .select-search-list{display:flex;flex-flow:row wrap;margin:-5px}.vibor.multiple .select-search-list .select-search-list-item{padding:5px;flex-shrink:0}.vibor.multiple .select-search-list .select-search-list-item_input{flex:1}.vibor.multiple .select-search-list .select-search-list-item_input input{height:28px}.vibor.multiple .vibor__selection{display:flex;align-items:center;height:28px;padding:0 7px;border-radius:3px;font-size:14px;background:#e5e5e7;color:#2c2c2c}@-webkit-keyframes clockwise{to{-webkit-transform:rotate(360deg) translatez(0);transform:rotate(360deg) translatez(0)}}@keyframes clockwise{to{-webkit-transform:rotate(360deg) translatez(0);transform:rotate(360deg) translatez(0)}}"],
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctdmlib3IuanMubWFwIiwic291cmNlcyI6WyJuZzovL25nLXZpYm9yL2xpYi9uZy12aWJvci5zZXJ2aWNlLnRzIiwibmc6Ly9uZy12aWJvci9saWIvbmctdmlib3ItdGVtcGxhdGUuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy12aWJvci9saWIvaGVscGVycy50cyIsIm5nOi8vbmctdmlib3IvbGliL25nLXZpYm9yLmNvbXBvbmVudC50cyIsIm5nOi8vbmctdmlib3IvbGliL25nLXZpYm9yLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ1ZpYm9yU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbdmlib3ItZHJvcGRvd24tZWxlbWVudF0nIH0pXHJcbmV4cG9ydCBjbGFzcyBWaWJvckRyb3Bkb3duRGlyZWN0aXZlIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cclxufVxyXG5cclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3ZpYm9yLXNlbGVjdGVkLWVsZW1lbnRdJyB9KVxyXG5leHBvcnQgY2xhc3MgVmlib3JTZWxlY3RlZERpcmVjdGl2ZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHt9XHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1t2aWJvci1ib3RoLWVsZW1lbnRdJyB9KVxyXG5leHBvcnQgY2xhc3MgVmlib3JCb3RoRGlyZWN0aXZlIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cclxufVxyXG5cclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3ZpYm9yLWNyZWF0ZV0nIH0pXHJcbmV4cG9ydCBjbGFzcyBWaWJvckNyZWF0ZURpcmVjdGl2ZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHt9XHJcbn1cclxuIiwiZXhwb3J0IGludGVyZmFjZSBJRGF0YVJlc3BvbnNlIHtcclxuICBkYXRhOiBPYmplY3Q7XHJcbiAgbGlzdDogQXJyYXk8T2JqZWN0PjtcclxuICBoZWFkZXJzOiBhbnk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmZXRjaEZyb21PYmplY3Qob2JqZWN0OiBhbnksIHByb3A6IHN0cmluZyk6IGFueSB7XHJcbiAgaWYgKG9iamVjdCA9PT0gdW5kZWZpbmVkIHx8IHByb3AgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgcmV0dXJuIG9iamVjdDtcclxuICB9XHJcblxyXG4gIGNvbnN0IGluZGV4OiBudW1iZXIgPSBwcm9wLmluZGV4T2YoJy4nKTtcclxuICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgcmV0dXJuIGZldGNoRnJvbU9iamVjdChvYmplY3RbcHJvcC5zdWJzdHJpbmcoMCwgaW5kZXgpXSwgcHJvcC5zdWJzdHIoaW5kZXggKyAxKSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gb2JqZWN0W3Byb3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdEZvcm1hdHRlcihkYXRhOiBhbnksIHZhbHVlUHJvcGVydHlOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGxldCBodG1sID0gJyc7XHJcbiAgaHRtbCArPSBmZXRjaEZyb21PYmplY3QoZGF0YSwgdmFsdWVQcm9wZXJ0eU5hbWUpID8gYDxiPiR7ZmV0Y2hGcm9tT2JqZWN0KGRhdGEsIHZhbHVlUHJvcGVydHlOYW1lKX08L2I+YCA6ICcnO1xyXG4gIHJldHVybiBodG1sO1xyXG59XHJcblxyXG5cclxuLy8gVXNlZCBmb3IgbWF0Y2hpbmcgbnVtYmVyc1xyXG5jb25zdCBjb3JlX3BudW06IHN0cmluZyA9IC9bKy1dPyg/OlxcZCpcXC58KVxcZCsoPzpbZUVdWystXT9cXGQrfCkvLnNvdXJjZTtcclxuY29uc3Qgcm51bW5vbnB4OiBSZWdFeHAgPSBuZXcgUmVnRXhwKCdeKCcgKyBjb3JlX3BudW0gKyAnKSg/IXB4KVthLXolXSskJywgJ2knKTtcclxuXHJcbmZ1bmN0aW9uIGF1Z21lbnRXaWR0aE9ySGVpZ2h0KG5hbWU6IHN0cmluZywgZXh0cmE6IGFueSwgaXNCb3JkZXJCb3g6IGFueSwgc3R5bGVzOiBhbnkpOiBudW1iZXIge1xyXG4gIGxldCBpOiBudW1iZXIgPSBleHRyYSA9PT0gKGlzQm9yZGVyQm94ID8gJ2JvcmRlcicgOiAnY29udGVudCcpID9cclxuICAgIC8vIElmIHdlIGFscmVhZHkgaGF2ZSB0aGUgcmlnaHQgbWVhc3VyZW1lbnQsIGF2b2lkIGF1Z21lbnRhdGlvblxyXG4gICAgNCA6XHJcbiAgICAvLyBPdGhlcndpc2UgaW5pdGlhbGl6ZSBmb3IgaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbCBwcm9wZXJ0aWVzXHJcbiAgICBuYW1lID09PSAnd2lkdGgnID8gMSA6IDAsXHJcblxyXG4gICAgdmFsID0gMDtcclxuICBjb25zdCBjc3NFeHBhbmQ6IHN0cmluZ1tdID0gWydUb3AnLCAnUmlnaHQnLCAnQm90dG9tJywgJ0xlZnQnXTtcclxuXHJcbiAgLy8gVE9ETyBVc2UgYW5ndWxhci5lbGVtZW50LmNzcyBpbnN0ZWFkIG9mIGdldFN0eWxlVmFsdWUgYWZ0ZXJcclxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vY2FpdHAvYW5ndWxhci5qcy9jb21taXQvOTJiYmI1ZTIyNTI1M2ViZGRkMzhlZjU3MzVkNjZmZmVmNzZiNmExNCB3aWxsIGJlIGFwcGxpZWRcclxuICBmdW5jdGlvbiBnZXRTdHlsZVZhbHVlKF9uYW1lOiBhbnkpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoc3R5bGVzW19uYW1lXSk7XHJcbiAgfVxyXG5cclxuICBmb3IgKDsgaSA8IDQ7IGkgKz0gMikge1xyXG4gICAgLy8gYm90aCBib3ggbW9kZWxzIGV4Y2x1ZGUgbWFyZ2luLCBzbyBhZGQgaXQgaWYgd2Ugd2FudCBpdFxyXG4gICAgaWYgKGV4dHJhID09PSAnbWFyZ2luJykge1xyXG4gICAgICB2YWwgKz0gZ2V0U3R5bGVWYWx1ZShleHRyYSArIGNzc0V4cGFuZFtpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzQm9yZGVyQm94KSB7XHJcbiAgICAgIC8vIGJvcmRlci1ib3ggaW5jbHVkZXMgcGFkZGluZywgc28gcmVtb3ZlIGl0IGlmIHdlIHdhbnQgY29udGVudFxyXG4gICAgICBpZiAoZXh0cmEgPT09ICdjb250ZW50Jykge1xyXG4gICAgICAgIHZhbCAtPSBnZXRTdHlsZVZhbHVlKCdwYWRkaW5nJyArIGNzc0V4cGFuZFtpXSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGF0IHRoaXMgcG9pbnQsIGV4dHJhIGlzbid0IGJvcmRlciBub3IgbWFyZ2luLCBzbyByZW1vdmUgYm9yZGVyXHJcbiAgICAgIGlmIChleHRyYSAhPT0gJ21hcmdpbicpIHtcclxuICAgICAgICB2YWwgLT0gZ2V0U3R5bGVWYWx1ZSgnYm9yZGVyJyArIGNzc0V4cGFuZFtpXSArICdXaWR0aCcpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YWwgKz0gZ2V0U3R5bGVWYWx1ZSgncGFkZGluZycgKyBjc3NFeHBhbmRbaV0pO1xyXG5cclxuICAgICAgLy8gYXQgdGhpcyBwb2ludCwgZXh0cmEgaXNuJ3QgY29udGVudCBub3IgcGFkZGluZywgc28gYWRkIGJvcmRlclxyXG4gICAgICBpZiAoZXh0cmEgIT09ICdwYWRkaW5nJykge1xyXG4gICAgICAgIHZhbCArPSBnZXRTdHlsZVZhbHVlKCdib3JkZXInICsgY3NzRXhwYW5kW2ldICsgJ1dpZHRoJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiB2YWw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFdpbmRvdyhlbGVtOiBhbnkpOiBhbnkge1xyXG4gIHJldHVybiBlbGVtICE9IG51bGwgJiYgZWxlbSA9PT0gZWxlbS53aW5kb3cgPyBlbGVtIDogZWxlbS5ub2RlVHlwZSA9PT0gOSAmJiBlbGVtLmRlZmF1bHRWaWV3O1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRPZmZzZXQoZWxlbTogYW55KTogYW55IHtcclxuICBsZXQgZG9jRWxlbTogYW55LCB3aW46IGFueTtcclxuICBjb25zdCBib3g6IGFueSA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgY29uc3QgZG9jOiBhbnkgPSBlbGVtICYmIGVsZW0ub3duZXJEb2N1bWVudDtcclxuXHJcbiAgaWYgKCFkb2MpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGRvY0VsZW0gPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xyXG4gIHdpbiA9IGdldFdpbmRvdyhkb2MpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgdG9wOiBib3gudG9wICsgd2luLnBhZ2VZT2Zmc2V0IC0gZG9jRWxlbS5jbGllbnRUb3AsXHJcbiAgICBsZWZ0OiBib3gubGVmdCArIHdpbi5wYWdlWE9mZnNldCAtIGRvY0VsZW0uY2xpZW50TGVmdFxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzY3JvbGxBY3RpdmVPcHRpb24obGlzdDogSFRNTEVsZW1lbnQsIGl0ZW06IEhUTUxFbGVtZW50KTogdm9pZCB7XHJcbiAgbGV0IHk6IGFueSwgaGVpZ2h0X21lbnU6IGFueSwgaGVpZ2h0X2l0ZW06IGFueSwgc2Nyb2xsOiBhbnksIHNjcm9sbF90b3A6IGFueSwgc2Nyb2xsX2JvdHRvbTogYW55O1xyXG5cclxuICBpZiAoaXRlbSkge1xyXG4gICAgaGVpZ2h0X21lbnUgPSBsaXN0Lm9mZnNldEhlaWdodDtcclxuICAgIGhlaWdodF9pdGVtID0gZ2V0V2lkdGhPckhlaWdodChpdGVtLCAnaGVpZ2h0JywgJ21hcmdpbicpOyAvLyBvdXRlckhlaWdodCh0cnVlKTtcclxuICAgIHNjcm9sbCA9IGxpc3Quc2Nyb2xsVG9wIHx8IDA7XHJcbiAgICB5ID0gZ2V0T2Zmc2V0KGl0ZW0pLnRvcCAtIGdldE9mZnNldChsaXN0KS50b3AgKyBzY3JvbGw7XHJcbiAgICBzY3JvbGxfdG9wID0geTtcclxuICAgIHNjcm9sbF9ib3R0b20gPSB5IC0gaGVpZ2h0X21lbnUgKyBoZWlnaHRfaXRlbTtcclxuXHJcbiAgICAvLyBUT0RPIE1ha2UgYW5pbWF0aW9uXHJcbiAgICBpZiAoeSArIGhlaWdodF9pdGVtID4gaGVpZ2h0X21lbnUgKyBzY3JvbGwpIHtcclxuICAgICAgbGlzdC5zY3JvbGxUb3AgPSBzY3JvbGxfYm90dG9tO1xyXG4gICAgfSBlbHNlIGlmICh5IDwgc2Nyb2xsKSB7XHJcbiAgICAgIGxpc3Quc2Nyb2xsVG9wID0gc2Nyb2xsX3RvcDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFdpZHRoT3JIZWlnaHQoZWxlbTogYW55LCBuYW1lOiBhbnksIGV4dHJhOiBhbnkpOiBhbnkge1xyXG5cclxuICAvLyBTdGFydCB3aXRoIG9mZnNldCBwcm9wZXJ0eSwgd2hpY2ggaXMgZXF1aXZhbGVudCB0byB0aGUgYm9yZGVyLWJveCB2YWx1ZVxyXG4gIGNvbnN0IHZhbHVlSXNCb3JkZXJCb3ggPSB0cnVlO1xyXG4gIGxldCB2YWw6IGFueSA9IG5hbWUgPT09ICd3aWR0aCcgPyBlbGVtLm9mZnNldFdpZHRoIDogZWxlbS5vZmZzZXRIZWlnaHQ7XHJcbiAgY29uc3Qgc3R5bGVzOiBhbnkgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtLCBudWxsKTtcclxuICBjb25zdCBpc0JvcmRlckJveCA9IGZhbHNlOyAvLyBqUXVlcnkuc3VwcG9ydC5ib3hTaXppbmcgJiYgalF1ZXJ5LmNzcyggZWxlbSwgJ2JveFNpemluZycsIGZhbHNlLCBzdHlsZXMgKSA9PT0gJ2JvcmRlci1ib3gnO1xyXG5cclxuICAvLyBzb21lIG5vbi1odG1sIGVsZW1lbnRzIHJldHVybiB1bmRlZmluZWQgZm9yIG9mZnNldFdpZHRoLCBzbyBjaGVjayBmb3IgbnVsbC91bmRlZmluZWRcclxuICAvLyBzdmcgLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02NDkyODVcclxuICAvLyBNYXRoTUwgLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD00OTE2NjhcclxuICBpZiAodmFsIDw9IDAgfHwgdmFsID09IG51bGwpIHtcclxuICAgIC8vIEZhbGwgYmFjayB0byBjb21wdXRlZCB0aGVuIHVuY29tcHV0ZWQgY3NzIGlmIG5lY2Vzc2FyeVxyXG4gICAgdmFsID0gc3R5bGVzW25hbWVdO1xyXG5cclxuICAgIGlmICh2YWwgPCAwIHx8IHZhbCA9PSBudWxsKSB7XHJcbiAgICAgIHZhbCA9IGVsZW0uc3R5bGVbbmFtZV07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ29tcHV0ZWQgdW5pdCBpcyBub3QgcGl4ZWxzLiBTdG9wIGhlcmUgYW5kIHJldHVybi5cclxuICAgIGlmIChybnVtbm9ucHgudGVzdCh2YWwpKSB7XHJcbiAgICAgIHJldHVybiB2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gd2UgbmVlZCB0aGUgY2hlY2sgZm9yIHN0eWxlIGluIGNhc2UgYSBicm93c2VyIHdoaWNoIHJldHVybnMgdW5yZWxpYWJsZSB2YWx1ZXNcclxuICAgIC8vIGZvciBnZXRDb21wdXRlZFN0eWxlIHNpbGVudGx5IGZhbGxzIGJhY2sgdG8gdGhlIHJlbGlhYmxlIGVsZW0uc3R5bGVcclxuICAgIC8vIHZhbHVlSXNCb3JkZXJCb3ggPSBpc0JvcmRlckJveCAmJiAoIGpRdWVyeS5zdXBwb3J0LmJveFNpemluZ1JlbGlhYmxlIHx8IHZhbCA9PT0gZWxlbS5zdHlsZVsgbmFtZSBdICk7XHJcblxyXG4gICAgLy8gTm9ybWFsaXplICcnLCBhdXRvLCBhbmQgcHJlcGFyZSBmb3IgZXh0cmFcclxuICAgIHZhbCA9IHBhcnNlRmxvYXQodmFsKSB8fCAwO1xyXG4gIH1cclxuXHJcbiAgLy8gdXNlIHRoZSBhY3RpdmUgYm94LXNpemluZyBtb2RlbCB0byBhZGQvc3VidHJhY3QgaXJyZWxldmFudCBzdHlsZXNcclxuICByZXR1cm4gdmFsICsgYXVnbWVudFdpZHRoT3JIZWlnaHQobmFtZSwgZXh0cmEgfHwgKGlzQm9yZGVyQm94ID8gJ2JvcmRlcicgOiAnY29udGVudCcpLCB2YWx1ZUlzQm9yZGVyQm94LCBzdHlsZXMpO1xyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LCBPbkluaXQsIE9uQ2hhbmdlcyxcclxuICBJbnB1dCwgT3V0cHV0LCBmb3J3YXJkUmVmLFxyXG4gIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZixcclxuICBUZW1wbGF0ZVJlZiwgQ29udGVudENoaWxkLCBWaWV3Q2hpbGQsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBWaWV3RW5jYXBzdWxhdGlvblxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxyXG4gIE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gIE5nTW9kZWxcclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBWaWJvckJvdGhEaXJlY3RpdmUsXHJcbiAgICBWaWJvckNyZWF0ZURpcmVjdGl2ZSxcclxuICAgIFZpYm9yRHJvcGRvd25EaXJlY3RpdmUsXHJcbiAgICBWaWJvclNlbGVjdGVkRGlyZWN0aXZlXHJcbn0gZnJvbSAnLi9uZy12aWJvci10ZW1wbGF0ZS5kaXJlY3RpdmUnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIElEYXRhUmVzcG9uc2UsXHJcbiAgICBkZWZhdWx0Rm9ybWF0dGVyLFxyXG4gICAgZmV0Y2hGcm9tT2JqZWN0LFxyXG4gICAgc2Nyb2xsQWN0aXZlT3B0aW9uXHJcbn0gZnJvbSAnLi9oZWxwZXJzJztcclxuXHJcbmNvbnN0IGRlZXBFcXVhbCA9IHJlcXVpcmUoJ2RlZXAtZXF1YWwnKTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtc2VsZWN0b3JcclxuICBzZWxlY3RvcjogJ3ZpYm9yJyxcclxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ2aWJvclwiPlxyXG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuXHJcbiAgPGRpdiBjbGFzcz1cInNlbGVjdC1zZWFyY2hcIiAoY2xpY2spPVwic2hvd0Ryb3Bkb3duTGlzdCgkZXZlbnQpO1wiPlxyXG4gICAgPHVsIGNsYXNzPVwic2VsZWN0LXNlYXJjaC1saXN0XCI+XHJcbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJtdWx0aXBsZSB8fCAhaXNPcGVuXCI+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFTZWxlY3RlZFRlbXBsYXRlOyBlbHNlIHNlbGVjdGVkVFwiPlxyXG4gICAgICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LXNlYXJjaC1saXN0LWl0ZW0gc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fc2VsZWN0aW9uXCIgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygb3V0cHV0OyBsZXQgJGluZGV4PWluZGV4OyBsZXQgJGxhc3Q9bGFzdDsgdHJhY2tCeTogVHJhY2tCeUZuO1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlib3JfX3NlbGVjdGlvblwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgW2lubmVySFRNTF09XCJnZXRMaXN0Rm9ybWF0dGVkKGl0ZW0pXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgPGEgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9yZW1vdmVcIiAqbmdJZj1cImFsbG93UmVzZXRcIiAoY2xpY2spPVwiIWRpc2FibGVkICYmIHJlbW92ZU9uZSgkaW5kZXgsICRldmVudClcIj5cclxuICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiPlxyXG4gICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPVwiIzJjMmMyY1wiIGQ9XCJNMTAuMSA0LjVMOCA2LjYgNS45IDQuNSA0LjUgNS45IDYuNiA4bC0yLjEgMi4xIDEuNCAxLjRMOCA5LjRsMi4xIDIuMSAxLjQtMS40TDkuNCA4bDIuMS0yLjF6XCIvPlxyXG4gICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcblxyXG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjc2VsZWN0ZWRUPlxyXG4gICAgICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LXNlYXJjaC1saXN0LWl0ZW0gc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fc2VsZWN0aW9uXCIgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygb3V0cHV0OyBsZXQgJGluZGV4PWluZGV4OyBsZXQgJGxhc3Q9bGFzdDsgdHJhY2tCeTogVHJhY2tCeUZuO1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlib3JfX3NlbGVjdGlvblwiPlxyXG4gICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJTZWxlY3RlZFRlbXBsYXRlOyBjb250ZXh0OiB7aXRlbTogaXRlbX1cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICA8YSBjbGFzcz1cInNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX3JlbW92ZVwiICpuZ0lmPVwiYWxsb3dSZXNldCAmJiAhZGlzYWJsZWRcIiAoY2xpY2spPVwiIWRpc2FibGVkICYmIHJlbW92ZU9uZSgkaW5kZXgsICRldmVudClcIj5cclxuICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiPlxyXG4gICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPVwiIzJjMmMyY1wiIGQ9XCJNMTAuMSA0LjVMOCA2LjYgNS45IDQuNSA0LjUgNS45IDYuNiA4bC0yLjEgMi4xIDEuNCAxLjRMOCA5LjRsMi4xIDIuMSAxLjQtMS40TDkuNCA4bDIuMS0yLjF6XCIvPlxyXG4gICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcblxyXG4gICAgICA8bGkgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbSBzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9pbnB1dFwiIFtjbGFzcy5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9oaWRlXT1cIklucHV0SGlkZVwiPlxyXG4gICAgICAgIDxpbnB1dCBhdXRvY29tcGxldGU9XCJvZmZcIiAjaW5wdXRDb250cm9sPVwibmdNb2RlbFwiIFtuYW1lXT1cIm5hbWVcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbKG5nTW9kZWwpXT1cInF1ZXJ5XCIgW3BsYWNlaG9sZGVyXT1cIm91dHB1dC5sZW5ndGggPT0gMCB8fCAobXVsdGlwbGUgJiYgb3V0cHV0Lmxlbmd0aCA8IG11bHRpcGxlTGltaXQpID8gcGxhY2Vob2xkZXIgOiAnJ1wiXHJcbiAgICAgICAgICAoaW5wdXQpPVwidXBkYXRlT3B0aW9uc0luRGVsYXkoKVwiIChrZXlkb3duKT1cImtleURvd24oJGV2ZW50KVwiIC8+XHJcbiAgICAgIDwvbGk+XHJcbiAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtIHNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2xvYWRlci1jZW50ZXJcIiBbaGlkZGVuXT1cIiFkYXRhTGlzdFN1YiB8fCBkYXRhTGlzdFN1Yi5jbG9zZWRcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fbG9hZGVyXCI+PC9kaXY+XHJcbiAgICAgIDwvbGk+XHJcblxyXG4gICAgICA8c3BhbiBjbGFzcz1cImFycm93XCIgKGNsaWNrKT1cInRvZ2dsZURyb3Bkb3duKCRldmVudClcIj5cclxuICAgICAgPC9zcGFuPlxyXG4gICAgPC91bD5cclxuICA8L2Rpdj5cclxuXHJcbiAgPGRpdiBjbGFzcz1cInNlbGVjdC1kcm9wZG93blwiICpuZ0lmPVwiaXNPcGVuXCI+XHJcbiAgICA8dWwgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXBcIj5cclxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFEcm9wZG93blRlbXBsYXRlOyBlbHNlIGRyb3Bkb3duVFwiPlxyXG4gICAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb25cIiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIE9wdGlvbnM7IGxldCBpPWluZGV4XCIgKG1vdXNlZG93bik9XCJzZWxlY3RPbmUoJGV2ZW50LCBvcHRpb24pXCJcclxuICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaSA9PT0gc2VsZWN0b3JQb3NpdGlvblwiIFtpbm5lckhUTUxdPVwiZ2V0RHJvcGRvd25Gb3JtYXR0ZWQob3B0aW9uKVwiPlxyXG4gICAgICAgIDwvbGk+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG5cclxuICAgICAgPG5nLXRlbXBsYXRlICNkcm9wZG93blQ+XHJcbiAgICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvblwiICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgT3B0aW9uczsgbGV0IGk9aW5kZXhcIiAobW91c2Vkb3duKT1cInNlbGVjdE9uZSgkZXZlbnQsIG9wdGlvbilcIlxyXG4gICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJpID09PSBzZWxlY3RvclBvc2l0aW9uXCI+XHJcbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiRHJvcGRvd25UZW1wbGF0ZTsgY29udGV4dDoge2l0ZW06IG9wdGlvbn1cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICA8L2xpPlxyXG4gICAgICA8L25nLXRlbXBsYXRlPlxyXG5cclxuICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvbiBsb2FkaW5nXCIgKm5nSWY9XCJkYXRhTGlzdFN1YiAmJiAhZGF0YUxpc3RTdWIuY2xvc2VkXCI+XHJcbiAgICAgICAgw5DCl8OQwrDDkMKzw5HCgMORwoPDkMK3w5DCusOQwrBcclxuICAgICAgPC9saT5cclxuICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvbiBsb2FkZXJcIiAobW91c2Vkb3duKT1cIkFkZE5ld09iamVjdChDcmVhdGVOZXcocXVlcnkpKTtcIiBbY2xhc3MuYWN0aXZlXT1cInNlbGVjdG9yUG9zaXRpb24gPT09IE9wdGlvbnMubGVuZ3RoXCJcclxuICAgICAgICAqbmdJZj1cIlNob3dOZXdcIj5cclxuXHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNyZWF0ZVRlbXBsYXRlOyBlbHNlIHRlbXBsYXRlV2l0aE1lc3NhZ2VcIj5cclxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjcmVhdGVUZW1wbGF0ZS50ZW1wbGF0ZVJlZjsgY29udGV4dDoge3F1ZXJ5OiBxdWVyeX1cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgICAgICAgPG5nLXRlbXBsYXRlICN0ZW1wbGF0ZVdpdGhNZXNzYWdlPlxyXG4gICAgICAgICAge3sgbmV3TWVzc2FnZSB9fVxyXG4gICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgIDwvbGk+XHJcbiAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb24gbG9hZGVyXCIgKm5nSWY9XCJTaG93RW1wdHlcIj5cclxuICAgICAgICDDkMKfw5HCg8ORwoHDkcKCw5DCvlxyXG4gICAgICA8L2xpPlxyXG4gICAgPC91bD5cclxuICAgIDxkaXYgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tcGFnZXJcIiAqbmdJZj1cImN1cnJlbnRDYWNoZSAmJiBjdXJyZW50Q2FjaGUuY291bnRQYWdlcyA+IDFcIj5cclxuICAgICAgPHAgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tcGFnZXItcGFnZVwiPlxyXG4gICAgICAgIHt7IGN1cnJlbnRDYWNoZS5jdXJyZW50UGFnZSB8IG51bWJlciB9fSAvIHt7IGN1cnJlbnRDYWNoZS5jb3VudFBhZ2VzIHwgbnVtYmVyIH19XHJcbiAgICAgIDwvcD5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cInNlbGVjdC1kcm9wZG93bi1wYWdlci1sb2FkbW9yZVwiICpuZ0lmPVwiY3VycmVudENhY2hlLmNvdW50UGFnZXMgPiAxICYmIGN1cnJlbnRDYWNoZS5jdXJyZW50UGFnZSA8IGN1cnJlbnRDYWNoZS5jb3VudFBhZ2VzXCJcclxuICAgICAgICAobW91c2Vkb3duKT1cIm5leHRQYWdlKCRldmVudClcIj5cclxuICAgICAgICDDkMKXw5DCsMOQwrPDkcKAw5HCg8OQwrfDkMK4w5HCgsORwowgw5DCtcORwonDkcKRXHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG5gLFxyXG4gIHN0eWxlczogW2Audmlib3IgYSwudmlib3IgbGFiZWwsLnZpYm9yIGxlZ2VuZCwudmlib3IgcCwudmlib3Igc3Bhbiwudmlib3IgdWx7bWFyZ2luOjA7cGFkZGluZzowO2JvcmRlcjowfS52aWJvciBhLC52aWJvciBidXR0b24sLnZpYm9yIGlucHV0e291dGxpbmU6MH0udmlib3Igb2wsLnZpYm9yIHVse2xpc3Qtc3R5bGU6bm9uZX0udmlib3IgaW5wdXR7cGFkZGluZzowO21hcmdpbjowO2JvcmRlcjowO2ZvbnQ6aW5oZXJpdH0udmlib3IgYntmb250LXdlaWdodDo0MDB9LnZpYm9ye3Bvc2l0aW9uOnJlbGF0aXZlO2Rpc3BsYXk6YmxvY2s7cGFkZGluZzoxMHB4IDE1cHg7Ym9yZGVyOjFweCBzb2xpZCAjZDVkOWRlO2JvcmRlci1yYWRpdXM6M3B4O2ZvbnQtZmFtaWx5Oi1hcHBsZS1zeXN0ZW0sQmxpbmtNYWNTeXN0ZW1Gb250LFwiU2Vnb2UgVUlcIixSb2JvdG8sSGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWYsXCJBcHBsZSBDb2xvciBFbW9qaVwiLFwiU2Vnb2UgVUkgRW1vamlcIixcIlNlZ29lIFVJIFN5bWJvbFwiO3RyYW5zaXRpb246Ym94LXNoYWRvdyAuMTVzIGxpbmVhcn0udmlib3I6aG92ZXIsLnZpYm9yOmhvdmVyIC5zZWxlY3QtZHJvcGRvd257Ym94LXNoYWRvdzowIDNweCA2cHggMCByZ2JhKDQ0LDQ0LDQ0LC4xKX0udmlib3JbZGlzYWJsZWRde29wYWNpdHk6LjY7cG9pbnRlci1ldmVudHM6bm9uZX0udmlib3IgLnNlbGVjdC1zZWFyY2h7cG9zaXRpb246cmVsYXRpdmV9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoIC5hcnJvd3tjb250ZW50OlwiXCI7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MDt0b3A6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7ZGlzcGxheTpibG9jazt3aWR0aDoxNnB4O2hlaWdodDoxNnB4O2JhY2tncm91bmQtaW1hZ2U6dXJsKGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QmpiR0Z6Y3owaWJtTXRhV052YmlCbmJIbHdhQ0lnZUcxc2JuTTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TURBdmMzWm5JaUIzYVdSMGFEMGlNVFlpSUdobGFXZG9kRDBpTVRZaUlIWnBaWGRDYjNnOUlqQWdNQ0F4TmlBeE5pSStEUW9nSUR4d1lYUm9JR1pwYkd3OUlpTXlZekpqTW1NaUlHUTlJazA0SURFeExqUk1NaTQySURZZ05DQTBMalpzTkNBMElEUXRORXd4TXk0MElEWWlMejROQ2p3dmMzWm5QZzBLKTt0cmFuc2l0aW9uOi13ZWJraXQtdHJhbnNmb3JtIC4xNXMgZWFzZS1pbi1vdXQ7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjE1cyBlYXNlLWluLW91dDt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMTVzIGVhc2UtaW4tb3V0LC13ZWJraXQtdHJhbnNmb3JtIC4xNXMgZWFzZS1pbi1vdXR9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoIC5hcnJvdzpiZWZvcmUsLnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9oaWRle2Rpc3BsYXk6bm9uZX0udmlib3IgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX3NlbGVjdGlvbntwb3NpdGlvbjpyZWxhdGl2ZX0udmlib3IgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2lucHV0IGlucHV0e3dpZHRoOjEwMCU7dGV4dC1vdmVyZmxvdzplbGxpcHNpcztmb250LXNpemU6MTRweDtjb2xvcjojMzgzZDQxfS52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faW5wdXQgaW5wdXQ6Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXJ7Y29sb3I6cmdiYSg1Niw2MSw2NSwuMyl9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9pbnB1dCBpbnB1dDotbXMtaW5wdXQtcGxhY2Vob2xkZXJ7Y29sb3I6cmdiYSg1Niw2MSw2NSwuMyl9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9pbnB1dCBpbnB1dDo6LW1zLWlucHV0LXBsYWNlaG9sZGVye2NvbG9yOnJnYmEoNTYsNjEsNjUsLjMpfS52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faW5wdXQgaW5wdXQ6OnBsYWNlaG9sZGVye2NvbG9yOnJnYmEoNTYsNjEsNjUsLjMpfS52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fcmVtb3Zle2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjt3aWR0aDoxNnB4O2hlaWdodDoxNnB4O21hcmdpbi1sZWZ0OjVweDtib3JkZXItcmFkaXVzOjUwJTtiYWNrZ3JvdW5kLWNvbG9yOiNiYWJhYmE7Y3Vyc29yOnBvaW50ZXI7dHJhbnNpdGlvbjpiYWNrZ3JvdW5kLWNvbG9yIC4xNXMgbGluZWFyfS52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fcmVtb3ZlOmhvdmVye2JhY2tncm91bmQtY29sb3I6Izk0OTQ5NH0udmlib3IgLnNlbGVjdC1kcm9wZG93bntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MTAwJTtsZWZ0Oi0xcHg7cmlnaHQ6LTFweDt6LWluZGV4OjJ9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9sb2FkZXItY2VudGVye3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjA7dG9wOjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpO2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjt3aWR0aDoyMXB4O2hlaWdodDoyMXB4O2JhY2tncm91bmQ6I2ZmZjt6LWluZGV4OjJ9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9sb2FkZXItY2VudGVyW2hpZGRlbl17ZGlzcGxheTpub25lfS52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fbG9hZGVyLWNlbnRlciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fbG9hZGVye3dpZHRoOjE2cHg7aGVpZ2h0OjE2cHg7Ym94LXNpemluZzpib3JkZXItYm94O2JvcmRlci13aWR0aDoycHg7Ym9yZGVyLXN0eWxlOnNvbGlkO2JvcmRlci1jb2xvcjojMjIyNzJlIHJnYmEoMzQsMzksNDYsLjQpIHJnYmEoMzQsMzksNDYsLjQpO2JvcmRlci1yYWRpdXM6MTAwJTstd2Via2l0LWFuaW1hdGlvbjouNDVzIGxpbmVhciBpbmZpbml0ZSBjbG9ja3dpc2U7YW5pbWF0aW9uOi40NXMgbGluZWFyIGluZmluaXRlIGNsb2Nrd2lzZX0udmlib3IgLnNlbGVjdC1kcm9wZG93bntib3JkZXI6MXB4IHNvbGlkICNkNWQ5ZGU7Ym9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czo1cHg7Ym9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6NXB4O2JvcmRlci10b3A6MDtiYWNrZ3JvdW5kOiNmZmZ9LnZpYm9yIC5zZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXB7bWF4LWhlaWdodDozMDBweDtvdmVyZmxvdy15OmF1dG99LnZpYm9yIC5zZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXAtb3B0aW9ue21pbi1oZWlnaHQ6MzBweDtwYWRkaW5nOjEwcHggMTVweH0udmlib3IgLnNlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb246aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDY2LDEzMiwyMTUsLjEpfS52aWJvciAuc2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvbi5sb2FkaW5ne2ZvbnQtc2l6ZToxNnB4O2xpbmUtaGVpZ2h0OjE4cHg7dGV4dC1hbGlnbjpjZW50ZXI7Y29sb3I6IzhiOGI4M30udmlib3IgLnNlbGVjdC1kcm9wZG93bi1wYWdlcntwYWRkaW5nOjEwcHg7dGV4dC1hbGlnbjpjZW50ZXI7Ym9yZGVyLXRvcDoxcHggZGFzaGVkICNkNWQ5ZGV9LnZpYm9yIC5zZWxlY3QtZHJvcGRvd24tcGFnZXItcGFnZXtmb250LXNpemU6MTJweDtjb2xvcjojOGI4YjgzfS52aWJvciAuc2VsZWN0LWRyb3Bkb3duLXBhZ2VyLWxvYWRtb3Jle2JvcmRlcjowO2JhY2tncm91bmQ6MCAwO2JveC1zaGFkb3c6bm9uZX0udmlib3IgLnNlbGVjdC1kcm9wZG93bi1wYWdlci1wYWdlKy5zZWxlY3QtZHJvcGRvd24tcGFnZXItbG9hZG1vcmV7bWFyZ2luLXRvcDoxMHB4fS52aWJvci5vcGVuLXZpYm9ye2JvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6MDtib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czowfS52aWJvci5vcGVuLXZpYm9yIC5zZWxlY3Qtc2VhcmNoIC5hcnJvd3std2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpIHJvdGF0ZSgxODBkZWcpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpIHJvdGF0ZSgxODBkZWcpfS52aWJvcjpub3QoLm11bHRpcGxlKSAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fcmVtb3Zle3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjI1cHg7dG9wOjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpfS52aWJvci5tdWx0aXBsZSAuc2VsZWN0LXNlYXJjaC1saXN0e2Rpc3BsYXk6ZmxleDtmbGV4LWZsb3c6cm93IHdyYXA7bWFyZ2luOi01cHh9LnZpYm9yLm11bHRpcGxlIC5zZWxlY3Qtc2VhcmNoLWxpc3QgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVte3BhZGRpbmc6NXB4O2ZsZXgtc2hyaW5rOjB9LnZpYm9yLm11bHRpcGxlIC5zZWxlY3Qtc2VhcmNoLWxpc3QgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2lucHV0e2ZsZXg6MX0udmlib3IubXVsdGlwbGUgLnNlbGVjdC1zZWFyY2gtbGlzdCAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faW5wdXQgaW5wdXR7aGVpZ2h0OjI4cHh9LnZpYm9yLm11bHRpcGxlIC52aWJvcl9fc2VsZWN0aW9ue2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7aGVpZ2h0OjI4cHg7cGFkZGluZzowIDdweDtib3JkZXItcmFkaXVzOjNweDtmb250LXNpemU6MTRweDtiYWNrZ3JvdW5kOiNlNWU1ZTc7Y29sb3I6IzJjMmMyY31ALXdlYmtpdC1rZXlmcmFtZXMgY2xvY2t3aXNle3Rvey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpIHRyYW5zbGF0ZXooMCk7dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpIHRyYW5zbGF0ZXooMCl9fUBrZXlmcmFtZXMgY2xvY2t3aXNle3Rvey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpIHRyYW5zbGF0ZXooMCk7dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpIHRyYW5zbGF0ZXooMCl9fWBdLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgcHJvdmlkZXJzOiBbe1xyXG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ1ZpYm9yQ29tcG9uZW50KSxcclxuICAgIG11bHRpOiB0cnVlXHJcbiAgfV1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nVmlib3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG4gIC8vIExvY2FsIFZhcmlhYmxlXHJcbiAgcHVibGljIF9tb2RlbDogYW55O1xyXG5cclxuICBwcml2YXRlIGZpcnN0TG9hZCA9IGZhbHNlO1xyXG4gIHByaXZhdGUgb3B0aW9uczogQXJyYXk8YW55PjtcclxuICBwdWJsaWMgb3V0cHV0OiBBcnJheTxhbnk+O1xyXG5cclxuICBwdWJsaWMgaXNPcGVuOiBib29sZWFuO1xyXG5cclxuICBwcml2YXRlIG9sZFF1ZXJ5OiBzdHJpbmc7XHJcbiAgcHVibGljIHF1ZXJ5OiBzdHJpbmc7XHJcblxyXG4gIHB1YmxpYyBzZWxlY3RvclBvc2l0aW9uID0gMDtcclxuICBwcml2YXRlIHdhaXRUaW1lID0gNTAwO1xyXG5cclxuICBwcml2YXRlIGVsOiBFbGVtZW50OyAgICAgICAgICAgLy8gdGhpcyBjb21wb25lbnQgIGVsZW1lbnQgYDx2aWJvcj5gXHJcbiAgcHJpdmF0ZSBpbnB1dEVsOiBIVE1MSW5wdXRFbGVtZW50OyAvLyBgPGlucHV0PmAgZWxlbWVudCBpbiBgPHZpYm9yPmAgZm9yIGF1dG8gY29tcGxldGVcclxuICBAVmlld0NoaWxkKCdpbnB1dENvbnRyb2wnKSBwdWJsaWMgaW5wdXRDb250cm9sOiBOZ01vZGVsO1xyXG5cclxuICAvLyBJbnB1dHMgJiBPdXRwdXRzXHJcbiAgQElucHV0KCkgcHVibGljIG11bHRpcGxlID0gZmFsc2U7XHJcbiAgQElucHV0KCkgcHVibGljIG11bHRpcGxlTGltaXQgPSBJbmZpbml0eTtcclxuICBASW5wdXQoKSBwdWJsaWMgY291bnRPblBhZ2UgPSAxMDtcclxuXHJcbiAgQElucHV0KCkgcHVibGljIHBsYWNlaG9sZGVyID0gJ1ZpYm9yJztcclxuICBASW5wdXQoKSBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyByZXF1aXJlZCA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBhbGxvd1Jlc2V0ID0gdHJ1ZTtcclxuICBwdWJsaWMgZGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgLy8gw5DCnsORwoLDkMK+w5DCscORwoDDkMKww5DCtsOQwrXDkMK9w5DCuMOQwrUgw5HCgcOQwr/DkMK4w5HCgcOQwrrDkMK+w5DCslxyXG4gIEBDb250ZW50Q2hpbGQoVmlib3JCb3RoRGlyZWN0aXZlKSBwdWJsaWMgYm90aFRlbXBsYXRlOiBWaWJvckJvdGhEaXJlY3RpdmU7XHJcbiAgQENvbnRlbnRDaGlsZChWaWJvckRyb3Bkb3duRGlyZWN0aXZlKSBwdWJsaWMgZHJvcGRvd25UZW1wbGF0ZTogVmlib3JEcm9wZG93bkRpcmVjdGl2ZTtcclxuICBAQ29udGVudENoaWxkKFZpYm9yU2VsZWN0ZWREaXJlY3RpdmUpIHB1YmxpYyBzZWxlY3RlZFRlbXBsYXRlOiBWaWJvclNlbGVjdGVkRGlyZWN0aXZlO1xyXG4gIEBDb250ZW50Q2hpbGQoVmlib3JDcmVhdGVEaXJlY3RpdmUpIHB1YmxpYyBjcmVhdGVUZW1wbGF0ZTogVmlib3JDcmVhdGVEaXJlY3RpdmU7XHJcbiAgQElucHV0KCkgcHVibGljIGxpc3RGb3JtYXR0ZXI6IChhcmc6IGFueSwgdmFsdWU6IHN0cmluZykgPT4gc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBkcm9wZG93bkZvcm1hdHRlcjogKGFyZzogYW55LCB2YWx1ZTogc3RyaW5nKSA9PiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcHVibGljIHZpZXdQcm9wZXJ0eSA9ICdOYW1lJzsgIC8vIMOQwp/DkMK+w5DCu8OQwrUgw5DCtMOQwrvDkcKPIMOQwrTDkMK1w5HChMOQwr7DkMK7w5HCgsOQwr3DkMK+w5DCs8OQwr4gw5DCvsORwoLDkMK+w5DCscORwoDDkMKww5DCtsOQwrXDkMK9w5DCuMORwo9cclxuXHJcbiAgQElucHV0KCkgcHVibGljIG1vZGVsUHJvcGVydHkgPSAnaWQnOyAgLy8gw5DCosOQwr4sIMORwofDkcKCw5DCviDDkMK3w5DCsMOQwr/DkMK4w5HCgcORwovDkMKyw5DCsMOQwrXDkcKCw5HCgcORwo8gw5DCsiDDkMKcw5DCvsOQwrTDkMK1w5DCu8ORwoxcclxuICBASW5wdXQoKSBwdWJsaWMgcHJlbG9hZFByb3BlcnR5ID0gJ2lkcyc7IC8vIMOQwprDkMK7w5HCjsORwocgw5DCt8OQwrDDkMK/w5HCgMOQwr7DkcKBw5DCsCDDkMK6IMORwoHDkMK1w5HCgMOQwrLDkMK1w5HCgMORwoMgw5DCtMOQwrvDkcKPIMOQwr/DkcKAw5DCtcOQwrTDkMK3w5DCsMOQwrPDkcKAw5HCg8OQwrfDkMK6w5DCuCwgw5DCtcORwoHDkMK7w5DCuCB1bmRlZmluZWQgw5DCt8OQwrDDkMK/w5DCuMORwoHDkcKLw5DCssOQwrDDkMK1w5HCgsORwoHDkcKPIMOQwrLDkMK1w5HCgcORwowgw5DCvsOQwrHDkcKKw5DCtcOQwrrDkcKCXHJcbiAgQElucHV0KCkgcHVibGljIHByZWxvYWRGaWVsZDogc3RyaW5nID0gdW5kZWZpbmVkOyAvLyDDkMKXw5DCvcOQwrDDkcKHw5DCtcOQwr3DkMK4w5DCtSDDkMK/w5DCvsOQwrvDkcKPLCDDkMK6w5DCvsORwoLDkMK+w5HCgMOQwrUgw5DCvcOQwrXDkMK+w5DCscORwoXDkMK+w5DCtMOQwrjDkMK8w5DCviDDkMK+w5HCgsOQwr/DkcKAw5DCsMOQwrLDkMK4w5HCgsORwowgw5DCsiDDkMK3w5DCsMOQwr/DkcKAw5DCvsORwoEuXHJcbiAgQElucHV0KCkgcHVibGljIHNlYXJjaFByb3BlcnR5ID0gJ3F1ZXJ5JztcclxuXHJcbiAgQElucHV0KCkgcHVibGljIGRhdGFMaXN0OiAoKHBhcmFtOiBPYmplY3QsIHBhZ2U6IG51bWJlciwgY291bnRPblBhZ2U/OiBudW1iZXIpID0+IE9ic2VydmFibGU8SURhdGFSZXNwb25zZT4pIHwgQXJyYXk8YW55PjtcclxuICBASW5wdXQoKSBwdWJsaWMgZXhjbHVkZUxpc3Q6IEFycmF5PGFueT47XHJcbiAgQElucHV0KCkgcHVibGljIGFkZGl0aW9uYWxGaWx0ZXIgPSB7fTtcclxuICBASW5wdXQoKSBwdWJsaWMgb25seUVtaXR0ZXI6IGJvb2xlYW47XHJcbiAgQE91dHB1dCgnY2hhbmdlRnVsbE1vZGVsJykgcHVibGljIGNoYW5nZUZ1bGxNb2RlbDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG5cclxuICBASW5wdXQoKSBwdWJsaWMgbmV3TWVzc2FnZTogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBDcmVhdGVOZXc6IChxdWVyeTogc3RyaW5nKSA9PiBPYnNlcnZhYmxlPGFueT4gfCBhbnkgPSAocXVlcnk6IHN0cmluZykgPT4ge1xyXG4gICAgcmV0dXJuIHF1ZXJ5O1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIFN1YnNjcmlwdGlvblxyXG4gIHB1YmxpYyBkYXRhTGlzdFN1YjogU3Vic2NyaXB0aW9uO1xyXG5cclxuXHJcbiAgLy8gT1BUSU9OU1xyXG4gIHB1YmxpYyBUcmFja0J5Rm4oaW5kZXg6IG51bWJlcik6IGFueSB7XHJcbiAgICByZXR1cm4gaW5kZXg7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2hvd0Ryb3Bkb3duTGlzdChldmVudDogRm9jdXNFdmVudCB8IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIGlmIChldmVudCkge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5tdWx0aXBsZSAmJiB0aGlzLm91dHB1dC5sZW5ndGggPj0gdGhpcy5tdWx0aXBsZUxpbWl0KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ29wZW4tdmlib3InKTtcclxuICAgIHRoaXMuaW5wdXRFbC5mb2N1cygpO1xyXG4gICAgdGhpcy51cGRhdGVPcHRpb25zKCk7XHJcbiAgICB0aGlzLm9uVG91Y2hlZCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoaWRlRHJvcGRvd25MaXN0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuLXZpYm9yJyk7XHJcbiAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xyXG4gICAgdGhpcy5pbnB1dEVsLmJsdXIoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBoaWRlRHJvcGRvd25MaXN0V2l0aERlbGF5KCk6IHZvaWQge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuaGlkZURyb3Bkb3duTGlzdCgpO1xyXG4gICAgfSwgMTAwKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB0b2dnbGVEcm9wZG93bihldmVudDogRXZlbnQpOiB2b2lkIHtcclxuICAgIGlmIChldmVudCkge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5pc09wZW4pIHtcclxuICAgICAgdGhpcy5oaWRlRHJvcGRvd25MaXN0KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNob3dEcm9wZG93bkxpc3QodW5kZWZpbmVkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZGVsYXk6IEZ1bmN0aW9uID0gKGZ1bmN0aW9uICgpOiBGdW5jdGlvbiB7XHJcbiAgICBsZXQgdGltZXIgPSAwO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjYWxsYmFjazogYW55LCBtczogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XHJcbiAgICAgIHRpbWVyID0gc2V0VGltZW91dChjYWxsYmFjaywgbXMpO1xyXG4gICAgfTtcclxuICB9KSgpO1xyXG5cclxuICBwdWJsaWMgdXBkYXRlT3B0aW9ucygpOiB2b2lkIHtcclxuICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcclxuICAgIGlmICh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgdGhpcy5vcHRpb25zID0gdGhpcy5kYXRhTGlzdC5maWx0ZXIoZGF0YSA9PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnF1ZXJ5IHx8IHRoaXMucXVlcnkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGY6IGFueSA9IGZldGNoRnJvbU9iamVjdChkYXRhLCB0aGlzLnNlYXJjaFByb3BlcnR5KTtcclxuICAgICAgICBpZiAoZiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShmKS5pbmRleE9mKHRoaXMucXVlcnkpID49IDA7XHJcbiAgICAgIH0pLmZpbHRlcihkYXRhID0+IHtcclxuICAgICAgICBpZiAoIXRoaXMuZXhjbHVkZUxpc3QpIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGQgPSBmZXRjaEZyb21PYmplY3QoZGF0YSwgdGhpcy5tb2RlbFByb3BlcnR5KS52YWx1ZU9mKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXhjbHVkZUxpc3QuZmluZEluZGV4KGV4ID0+IHtcclxuICAgICAgICAgIGxldCBhID0gZmV0Y2hGcm9tT2JqZWN0KGV4LCB0aGlzLm1vZGVsUHJvcGVydHkpLnZhbHVlT2YoKTtcclxuICAgICAgICAgIHJldHVybiBkZWVwRXF1YWwoZCwgYSk7XHJcbiAgICAgICAgfSkgPCAwO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgIGlmICh0aGlzLmRhdGFMaXN0U3ViKSB7IHRoaXMuZGF0YUxpc3RTdWIudW5zdWJzY3JpYmUoKTsgfVxyXG4gICAgICBpZiAoIXRoaXMuY3VycmVudENhY2hlKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50Q2FjaGUgPSB7XHJcbiAgICAgICAgICBjb3VudEVsZW1lbnQ6IDAsXHJcbiAgICAgICAgICBjb3VudFBhZ2VzOiAxLFxyXG4gICAgICAgICAgY3VycmVudFBhZ2U6IDEsXHJcbiAgICAgICAgICBvYmplY3RzOiBbXSxcclxuICAgICAgICAgIHF1ZXJ5OiB0aGlzLnF1ZXJ5LFxyXG4gICAgICAgICAgcGFyYW1zOiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmFkZGl0aW9uYWxGaWx0ZXIpXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmNhY2hlTGF6eURhdGEucHVzaCh0aGlzLmN1cnJlbnRDYWNoZSk7XHJcblxyXG4gICAgICAgIGxldCBwYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmFkZGl0aW9uYWxGaWx0ZXIpIGFzIGFueTtcclxuICAgICAgICBwYXJhbXNbdGhpcy5zZWFyY2hQcm9wZXJ0eV0gPSB0aGlzLnF1ZXJ5O1xyXG5cclxuICAgICAgICB0aGlzLmRhdGFMaXN0U3ViID0gKDxPYnNlcnZhYmxlPElEYXRhUmVzcG9uc2U+PnRoaXMuZGF0YUxpc3QocGFyYW1zLCAxLCB0aGlzLmNvdW50T25QYWdlKSkuc3Vic2NyaWJlKGFuc3dlciA9PiB7XHJcbiAgICAgICAgICB0aGlzLmN1cnJlbnRDYWNoZS5vYmplY3RzID0gdGhpcy5jdXJyZW50Q2FjaGUub2JqZWN0cy5jb25jYXQoYW5zd2VyLmxpc3QpO1xyXG4gICAgICAgICAgdGhpcy5jdXJyZW50Q2FjaGUuY291bnRFbGVtZW50ID0gYW5zd2VyLmhlYWRlcnNbJ2NvdW50J107XHJcbiAgICAgICAgICB0aGlzLmN1cnJlbnRDYWNoZS5jb3VudFBhZ2VzID0gTWF0aC5jZWlsKHRoaXMuY3VycmVudENhY2hlLmNvdW50RWxlbWVudCAvIHRoaXMuY291bnRPblBhZ2UpO1xyXG4gICAgICAgIH0sICgpID0+IHsgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyB1cGRhdGVPcHRpb25zSW5EZWxheSgpOiB2b2lkIHtcclxuICAgIGxldCBkZWxheU1zOiBudW1iZXIgPSB0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgQXJyYXkgPyAxMCA6IHRoaXMud2FpdFRpbWU7XHJcblxyXG4gICAgLy8gZXhlY3V0aW5nIGFmdGVyIHVzZXIgc3RvcHBlZCB0eXBpbmdcclxuICAgIHRoaXMuZGVsYXkoKCkgPT4ge1xyXG4gICAgICB0aGlzLm9sZFF1ZXJ5ID0gdGhpcy5xdWVyeTtcclxuICAgICAgdGhpcy5jdXJyZW50Q2FjaGUgPSB0aGlzLkdldENhY2hlKHRoaXMucXVlcnkpO1xyXG4gICAgICB0aGlzLnVwZGF0ZU9wdGlvbnMoKTtcclxuICAgIH0sIGRlbGF5TXMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBmb2N1c1NlbGVjdGVkT3B0aW9uKCk6IHZvaWQge1xyXG4gICAgbGV0IGxpc3Q6IGFueSA9IDxIVE1MRWxlbWVudD50aGlzLmVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NlbGVjdC1kcm9wZG93bicpWzBdO1xyXG4gICAgbGV0IHRhcmdldExpOiBhbnkgPSA8SFRNTEVsZW1lbnQ+dGhpcy5lbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXAtb3B0aW9uJylbdGhpcy5zZWxlY3RvclBvc2l0aW9uXTtcclxuICAgIHNjcm9sbEFjdGl2ZU9wdGlvbihsaXN0LCB0YXJnZXRMaSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMga2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLk9wdGlvbnMpIHtcclxuICAgICAgdGhpcy5zaG93RHJvcGRvd25MaXN0KHVuZGVmaW5lZCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdG90YWxOdW1JdGVtOiBudW1iZXIgPSB0aGlzLk9wdGlvbnMubGVuZ3RoO1xyXG5cclxuICAgIGlmICh0aGlzLlNob3dOZXcpIHtcclxuICAgICAgdG90YWxOdW1JdGVtKys7XHJcbiAgICB9XHJcblxyXG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XHJcbiAgICAgIGNhc2UgMjc6IC8vIEVTQywgaGlkZSBhdXRvIGNvbXBsZXRlXHJcbiAgICAgICAgdGhpcy5oaWRlRHJvcGRvd25MaXN0KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDM4OiAvLyBVUCwgc2VsZWN0IHRoZSBwcmV2aW91cyBsaSBlbFxyXG4gICAgICAgIHRoaXMuc2VsZWN0b3JQb3NpdGlvbiA9ICh0b3RhbE51bUl0ZW0gKyB0aGlzLnNlbGVjdG9yUG9zaXRpb24gLSAxKSAlIHRvdGFsTnVtSXRlbTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgNDA6IC8vIERPV04sIHNlbGVjdCB0aGUgbmV4dCBsaSBlbCBvciB0aGUgZmlyc3Qgb25lXHJcbiAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0b3JQb3NpdGlvbiA9ICh0b3RhbE51bUl0ZW0gKyB0aGlzLnNlbGVjdG9yUG9zaXRpb24gKyAxKSAlIHRvdGFsTnVtSXRlbTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMTM6IC8vIEVOVEVSLCBjaG9vc2UgaXQhIVxyXG4gICAgICAgIGlmICh0b3RhbE51bUl0ZW0gPiAwKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5zZWxlY3RvclBvc2l0aW9uID09PSB0aGlzLk9wdGlvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQWRkTmV3T2JqZWN0KHRoaXMuQ3JlYXRlTmV3KHRoaXMucXVlcnkpKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0T25lKGV2ZW50LCB0aGlzLk9wdGlvbnNbdGhpcy5zZWxlY3RvclBvc2l0aW9uXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLlNob3dOZXcpIHtcclxuICAgICAgICAgIHRoaXMuQWRkTmV3T2JqZWN0KHRoaXMuQ3JlYXRlTmV3KHRoaXMucXVlcnkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBkZWZhdWx0OiBicmVhaztcclxuICAgIH1cclxuICAgIHRoaXMuZm9jdXNTZWxlY3RlZE9wdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5leHRQYWdlKCRldmVudDogRXZlbnQpOiB2b2lkIHtcclxuICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIC8vIFZhbGlkYXRvcnNcclxuICAgIGlmICghKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBGdW5jdGlvbikpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdEYXRhIExpc3QgbWFzdCBiZSBGdW5jdGlvbicpO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLmN1cnJlbnRDYWNoZSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZvciBuZXh0IHBhZ2UgbmVlZCBjYWNoZSBmb3IgZmlyc3QgUGFnZScpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuY3VycmVudENhY2hlLmN1cnJlbnRQYWdlID49IHRoaXMuY3VycmVudENhY2hlLmNvdW50UGFnZXMpIHsgdGhyb3cgbmV3IEVycm9yKCdNYXggUGFnZSBMaW1pdCcpOyB9XHJcblxyXG4gICAgaWYgKHRoaXMuZGF0YUxpc3RTdWIpIHsgdGhpcy5kYXRhTGlzdFN1Yi51bnN1YnNjcmliZSgpOyB9XHJcblxyXG4gICAgbGV0IHBhcmFtczogYW55ID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5hZGRpdGlvbmFsRmlsdGVyKTtcclxuICAgIHBhcmFtc1t0aGlzLnNlYXJjaFByb3BlcnR5XSA9IHRoaXMucXVlcnk7XHJcblxyXG4gICAgdGhpcy5kYXRhTGlzdFN1YiA9IHRoaXMuZGF0YUxpc3QocGFyYW1zLCB0aGlzLmN1cnJlbnRDYWNoZS5jdXJyZW50UGFnZSArIDEsIHRoaXMuY291bnRPblBhZ2UpLnN1YnNjcmliZShhbnN3ZXIgPT4ge1xyXG4gICAgICB0aGlzLmN1cnJlbnRDYWNoZS5jdXJyZW50UGFnZSsrO1xyXG4gICAgICB0aGlzLmN1cnJlbnRDYWNoZS5jb3VudEVsZW1lbnQgPSBhbnN3ZXIuaGVhZGVyc1snY291bnQnXTtcclxuICAgICAgdGhpcy5jdXJyZW50Q2FjaGUuY291bnRQYWdlcyA9IE1hdGguY2VpbCh0aGlzLmN1cnJlbnRDYWNoZS5jb3VudEVsZW1lbnQgLyB0aGlzLmNvdW50T25QYWdlKTtcclxuICAgICAgdGhpcy5jdXJyZW50Q2FjaGUub2JqZWN0cyA9IHRoaXMuY3VycmVudENhY2hlLm9iamVjdHMuY29uY2F0KGFuc3dlci5saXN0KTtcclxuICAgICAgdGhpcy5zZWxlY3RvclBvc2l0aW9uID0gKHRoaXMuY3VycmVudENhY2hlLmN1cnJlbnRQYWdlIC0gMSkgKiB0aGlzLmNvdW50T25QYWdlICsgMTtcclxuICAgICAgdGhpcy5mb2N1c1NlbGVjdGVkT3B0aW9uKCk7XHJcbiAgICB9LCAoKSA9PiB7IH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gTU9ERUxcclxuICBwcml2YXRlIGNsZWFyUHJvcGVydHkoKTogdm9pZCB7XHJcbiAgICB0aGlzLnNlbGVjdG9yUG9zaXRpb24gPSAwO1xyXG4gICAgdGhpcy5xdWVyeSA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZWxlY3RPbmUoJGV2ZW50OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCwgZGF0YTogYW55KTogdm9pZCB7XHJcbiAgICAvLyDDkMKkw5DCuMOQwrvDkcKMw5HCgsORwoAgw5DCvcOQwrXDkMK9w5HCg8OQwrbDkMK9w5HCi8ORwoUgw5HCgcOQwr7DkMKxw5HCi8ORwoLDkMK4w5DCuVxyXG4gICAgaWYgKCRldmVudCBpbnN0YW5jZW9mIE1vdXNlRXZlbnQgJiYgJGV2ZW50LmJ1dHRvbiAhPT0gMCkgeyByZXR1cm47IH1cclxuXHJcbiAgICBpZiAodGhpcy5tdWx0aXBsZSAmJiB0aGlzLm91dHB1dC5sZW5ndGggPCB0aGlzLm11bHRpcGxlTGltaXQpIHtcclxuICAgICAgdGhpcy5vdXRwdXQucHVzaChkYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoIXRoaXMubXVsdGlwbGUpIHtcclxuICAgICAgdGhpcy5vdXRwdXQgPSBbZGF0YV07XHJcbiAgICB9XHJcbiAgICB0aGlzLmNoYW5nZUZ1bGxNb2RlbC5lbWl0KHRoaXMub3V0cHV0KTtcclxuICAgIHRoaXMuTW9kZWwgPSB0aGlzLlZhbHVlRnJvbU91dHB1dDtcclxuICAgIHRoaXMuY2xlYXJQcm9wZXJ0eSgpO1xyXG4gICAgdGhpcy5oaWRlRHJvcGRvd25MaXN0KCk7XHJcbiAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9O1xyXG5cclxuICBwdWJsaWMgcmVtb3ZlT25lKGluZGV4OiBudW1iZXIsIGV2ZW50OiBFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICB0aGlzLm91dHB1dC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgdGhpcy5Nb2RlbCA9IHRoaXMuVmFsdWVGcm9tT3V0cHV0O1xyXG5cclxuICAgIC8vIHNldCBjbGFzc1xyXG4gICAgdGhpcy5vblRvdWNoZWQoKTtcclxuICAgIHRoaXMuaW5wdXRDb250cm9sLmNvbnRyb2wubWFya0FzVG91Y2hlZCgpO1xyXG5cclxuICAgIC8vIG9wZW4gZHJvcGRvd25cclxuICAgIGlmICh0aGlzLnJlcXVpcmVkKSB7XHJcbiAgICAgIHRoaXMuc2hvd0Ryb3Bkb3duTGlzdCh1bmRlZmluZWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gRk9STUFUVElOR1xyXG5cclxuICBwdWJsaWMgZ2V0IFNlbGVjdGVkVGVtcGxhdGUoKTogVGVtcGxhdGVSZWY8YW55PiB7XHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZFRlbXBsYXRlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkVGVtcGxhdGUudGVtcGxhdGVSZWY7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuYm90aFRlbXBsYXRlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmJvdGhUZW1wbGF0ZS50ZW1wbGF0ZVJlZjtcclxuICAgIH1cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IERyb3Bkb3duVGVtcGxhdGUoKTogVGVtcGxhdGVSZWY8YW55PiB7XHJcbiAgICBpZiAodGhpcy5kcm9wZG93blRlbXBsYXRlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmRyb3Bkb3duVGVtcGxhdGUudGVtcGxhdGVSZWY7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuYm90aFRlbXBsYXRlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmJvdGhUZW1wbGF0ZS50ZW1wbGF0ZVJlZjtcclxuICAgIH1cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TGlzdEZvcm1hdHRlZChkYXRhOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgbGV0IGZvcm1hdHRlcjogYW55ID0gdGhpcy5saXN0Rm9ybWF0dGVyIHx8IGRlZmF1bHRGb3JtYXR0ZXI7XHJcbiAgICByZXR1cm4gZm9ybWF0dGVyLmFwcGx5KHRoaXMsIFtkYXRhLCB0aGlzLnZpZXdQcm9wZXJ0eV0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldERyb3Bkb3duRm9ybWF0dGVkKGRhdGE6IGFueSk6IHN0cmluZyB7XHJcbiAgICBsZXQgZm9ybWF0dGVyOiBhbnkgPSB0aGlzLmRyb3Bkb3duRm9ybWF0dGVyIHx8IGRlZmF1bHRGb3JtYXR0ZXI7XHJcbiAgICByZXR1cm4gZm9ybWF0dGVyLmFwcGx5KHRoaXMsIFtkYXRhLCB0aGlzLnZpZXdQcm9wZXJ0eV0pO1xyXG4gIH1cclxuXHJcbiAgLy8gSU5JVFxyXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIC8vIHRoaXMuTW9kZWwgPSB0aGlzLlZhbHVlRnJvbU91dHB1dDsgw5DCrcORwoLDkMK+IMOQwrLDkcKAw5DCvsOQwrTDkMK1IMORwoLDkcKDw5HCgiDDkcKCw5DCvsOQwrbDkMK1IMORwoPDkMK2w5DCtSDDkMK9w5DCtSDDkMK9w5DCsMOQwrTDkMK+LlxyXG4gICAgdGhpcy5lbCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3ZpYm9yJykuaXRlbSgwKTtcclxuICAgIGlmICh0aGlzLm11bHRpcGxlKSB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ211bHRpcGxlJyk7XHJcblxyXG4gICAgdGhpcy5pbnB1dEVsID0gPEhUTUxJbnB1dEVsZW1lbnQ+KHRoaXMuZWwucXVlcnlTZWxlY3RvcignaW5wdXQnKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkNoYW5nZXMoaW5wdXRzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICBpZiAoaW5wdXRzWydkYXRhTGlzdCddICYmIGlucHV0c1snZGF0YUxpc3QnXS5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgLy8gT3V0cHV0XHJcbiAgICAgIGlmICh0aGlzLk1vZGVsID09PSB1bmRlZmluZWQgfHwgdGhpcy5Nb2RlbCA9PSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5vdXRwdXQgPSBbXTtcclxuICAgICAgICB0aGlzLmNoYW5nZUZ1bGxNb2RlbC5lbWl0KHRoaXMub3V0cHV0KTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLk1vZGVsIGluc3RhbmNlb2YgQXJyYXkgJiYgdGhpcy5tdWx0aXBsZSkge1xyXG4gICAgICAgIHRoaXMuT3V0cHV0ID0gdGhpcy5Nb2RlbDtcclxuICAgICAgfSBlbHNlIGlmICghKHRoaXMuTW9kZWwgaW5zdGFuY2VvZiBBcnJheSkgJiYgIXRoaXMubXVsdGlwbGUpIHtcclxuICAgICAgICB0aGlzLk91dHB1dCA9IFt0aGlzLk1vZGVsXTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLm91dHB1dCB8fCAhdGhpcy5vdXRwdXQubGVuZ3RoKSB7XHJcbiAgICAgICAgICB0aGlzLk1vZGVsID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmVsICYmIGlucHV0c1snbXVsdGlwbGUnXSkge1xyXG4gICAgICBpZiAoaW5wdXRzWydtdWx0aXBsZSddLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCgnbXVsdGlwbGUnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ211bHRpcGxlJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoaW5wdXRzWydhZGRpdGlvbmFsRmlsdGVyJ10pIHtcclxuICAgICAgdGhpcy5jdXJyZW50Q2FjaGUgPSB0aGlzLkdldENhY2hlKHRoaXMucXVlcnkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxEaXZFbGVtZW50Pikge1xyXG4gICAgdGhpcy5vdXRwdXQgPSBbXTtcclxuICB9XHJcblxyXG4gIC8vIEZPUk1TXHJcbiAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgLy8gw5DCncOQwr7DkcKAw5DCvMOQwrDDkMK7w5HCjMOQwr3DkcKLw5DCuSB1cGRhdGUgw5DCvMOQwr7DkMK0w5DCtcOQwrvDkMK4XHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgaWYgKCh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5ICYmICF0aGlzLm11bHRpcGxlKSB8fCAoISh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSAmJiB0aGlzLm11bHRpcGxlKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTW9kZWwgVHlwZSBFcnJvcicpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5ICYmIHRoaXMuTW9kZWwgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IHRoaXMuTW9kZWwubGVuZ3RoICYmIHZhbHVlLmV2ZXJ5KHYgPT4gdGhpcy5Nb2RlbC5pbmRleE9mKHYpID49IDApKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuTW9kZWwgPT09IHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZmlyc3RMb2FkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5Nb2RlbCA9IHZhbHVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uQ2hhbmdlOiBhbnkgPSAoKSA9PiB7IH07XHJcbiAgcHVibGljIG9uVG91Y2hlZDogYW55ID0gKCkgPT4geyB9O1xyXG5cclxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICAgIGlmIChpc0Rpc2FibGVkKSB7XHJcbiAgICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5lbC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcbiAgICB9XHJcbiAgICAvLyBkaXNhYmxlIG90aGVyIGNvbXBvbmVudHMgaGVyZVxyXG4gIH1cclxuXHJcbiAgc2V0IE1vZGVsKHZhbHVlOiBhbnkpIHtcclxuICAgIGlmICh0aGlzLm9ubHlFbWl0dGVyKSB7XHJcbiAgICAgIHRoaXMub3V0cHV0ID0gW107XHJcbiAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gT3V0cHV0XHJcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMub3V0cHV0ID0gW107XHJcbiAgICAgIHRoaXMuY2hhbmdlRnVsbE1vZGVsLmVtaXQodGhpcy5vdXRwdXQpO1xyXG4gICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5ICYmIHRoaXMubXVsdGlwbGUpIHtcclxuICAgICAgdGhpcy5PdXRwdXQgPSB2YWx1ZTtcclxuICAgIH0gZWxzZSBpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSAmJiAhdGhpcy5tdWx0aXBsZSkge1xyXG4gICAgICB0aGlzLk91dHB1dCA9IFt2YWx1ZV07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTW9kZWxcclxuICAgIHRoaXMuX21vZGVsID0gdmFsdWU7XHJcblxyXG4gICAgLy8gRm9ybXNcclxuICAgIHRoaXMub25DaGFuZ2UodGhpcy5fbW9kZWwpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IE1vZGVsKCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5fbW9kZWw7XHJcbiAgfVxyXG5cclxuICAvLyBQUk9QRVJUWVxyXG4gIGdldCBJbnB1dEhpZGUoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5vdXRwdXQubGVuZ3RoID49IHRoaXMubXVsdGlwbGVMaW1pdDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm91dHB1dC5sZW5ndGggPT09IDEgJiYgIXRoaXMuaXNPcGVuO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IFZhbHVlRnJvbU91dHB1dCgpOiBhbnkge1xyXG4gICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcclxuICAgICAgbGV0IHRtcDogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgICBmb3IgKGxldCBvIG9mIHRoaXMub3V0cHV0KSB7XHJcbiAgICAgICAgdG1wLnB1c2goZmV0Y2hGcm9tT2JqZWN0KG8sIHRoaXMubW9kZWxQcm9wZXJ0eSkpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0bXA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZmV0Y2hGcm9tT2JqZWN0KHRoaXMub3V0cHV0WzBdLCB0aGlzLm1vZGVsUHJvcGVydHkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0IE91dHB1dChuZXdWYWx1ZTogQXJyYXk8YW55Pikge1xyXG4gICAgbGV0IGRhdGFMaXN0OiBBcnJheTxhbnk+ID0gW107XHJcbiAgICBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgIGRhdGFMaXN0ID0gdGhpcy5kYXRhTGlzdDtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgIGlmIChuZXdWYWx1ZSAmJiBuZXdWYWx1ZS5sZW5ndGggJiYgdGhpcy5maXJzdExvYWQpIHtcclxuICAgICAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcclxuICAgICAgICB0aGlzLmZpcnN0TG9hZCA9IGZhbHNlO1xyXG4gICAgICAgIGlmICghdGhpcy5wcmVsb2FkUHJvcGVydHkpIHtcclxuICAgICAgICAgIHRoaXMub3V0cHV0ID0gbmV3VmFsdWU7XHJcbiAgICAgICAgICB0aGlzLmNoYW5nZUZ1bGxNb2RlbC5lbWl0KHRoaXMub3V0cHV0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcGFyYW1zW3RoaXMucHJlbG9hZFByb3BlcnR5XSA9IG5ld1ZhbHVlLm1hcCh2YWwgPT4gZmV0Y2hGcm9tT2JqZWN0KHZhbCwgdGhpcy5wcmVsb2FkRmllbGQpKTtcclxuICAgICAgICAgIHRoaXMuZGF0YUxpc3RTdWIgPSAoPE9ic2VydmFibGU8SURhdGFSZXNwb25zZT4+dGhpcy5kYXRhTGlzdChwYXJhbXMsIDEsIHRoaXMuY291bnRPblBhZ2UpKS5zdWJzY3JpYmUoYW5zd2VyID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vdXRwdXQgPSBhbnN3ZXIubGlzdDtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VGdWxsTW9kZWwuZW1pdCh0aGlzLm91dHB1dCk7XHJcbiAgICAgICAgICB9LCAoKSA9PiB7IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmNoYW5nZUZ1bGxNb2RlbC5lbWl0KHRoaXMub3V0cHV0KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm47XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5kYXRhTGlzdCA9PT0gdW5kZWZpbmVkKSB7IHJldHVybjsgfVxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2RhdGFMaXN0IHZhbHVlIEVycm9yJyk7XHJcbiAgICB9XHJcbiAgICBsZXQgbmV3T3V0cHV0OiBBcnJheTxhbnk+ID0gW107XHJcbiAgICBmb3IgKGxldCB2IG9mIG5ld1ZhbHVlKSB7XHJcbiAgICAgIGZvciAobGV0IGQgb2YgZGF0YUxpc3QpIHtcclxuICAgICAgICBsZXQgYSA9IGZldGNoRnJvbU9iamVjdChkLCB0aGlzLm1vZGVsUHJvcGVydHkpID8gZmV0Y2hGcm9tT2JqZWN0KGQsIHRoaXMubW9kZWxQcm9wZXJ0eSkudmFsdWVPZigpIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIGxldCBiID0gdiA/IHYudmFsdWVPZigpIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIGlmIChkZWVwRXF1YWwoYSwgYikpIHtcclxuICAgICAgICAgIG5ld091dHB1dC5wdXNoKGQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5vdXRwdXQgPSBuZXdPdXRwdXQ7XHJcbiAgICB0aGlzLmNoYW5nZUZ1bGxNb2RlbC5lbWl0KHRoaXMub3V0cHV0KTtcclxuICB9XHJcblxyXG4gIGdldCBPcHRpb25zKCk6IEFycmF5PGFueT4ge1xyXG4gICAgbGV0IG9wdGlvbnM6IEFycmF5PGFueT47XHJcbiAgICBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICBsZXQgb2xkQ2FjaGUgPSB0aGlzLkdldENhY2hlKHRoaXMub2xkUXVlcnkpO1xyXG5cclxuICAgICAgaWYgKCF0aGlzLmN1cnJlbnRDYWNoZSAmJiBvbGRDYWNoZSkge1xyXG4gICAgICAgIG9wdGlvbnMgPSBvbGRDYWNoZS5vYmplY3RzO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG9wdGlvbnMgPSB0aGlzLmN1cnJlbnRDYWNoZSA/IHRoaXMuY3VycmVudENhY2hlLm9iamVjdHMgOiBbXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIChvcHRpb25zIHx8IFtdKS5maWx0ZXIob3AgPT4ge1xyXG4gICAgICByZXR1cm4gdGhpcy5vdXRwdXQuZmluZEluZGV4KG8gPT4ge1xyXG4gICAgICAgIGxldCBhID0gZmV0Y2hGcm9tT2JqZWN0KG8sIHRoaXMubW9kZWxQcm9wZXJ0eSkgPyBmZXRjaEZyb21PYmplY3QobywgdGhpcy5tb2RlbFByb3BlcnR5KS52YWx1ZU9mKCkgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgbGV0IGIgPSBmZXRjaEZyb21PYmplY3Qob3AsIHRoaXMubW9kZWxQcm9wZXJ0eSkgPyBmZXRjaEZyb21PYmplY3Qob3AsIHRoaXMubW9kZWxQcm9wZXJ0eSkudmFsdWVPZigpIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIHJldHVybiBkZWVwRXF1YWwoYSwgYik7XHJcbiAgICAgIH0pID09PSAtMTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGN1cnJlbnRDYWNoZTogQ2FjaGVJbmZvO1xyXG4gIHByaXZhdGUgR2V0Q2FjaGUocXVlcnk6IHN0cmluZyk6IENhY2hlSW5mbyB7XHJcbiAgICBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNhY2hlTGF6eURhdGEuZmluZChjYWNoZSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGNhY2hlLnF1ZXJ5ID09PSB0aGlzLnF1ZXJ5ICYmIGRlZXBFcXVhbChjYWNoZS5wYXJhbXMsIHRoaXMuYWRkaXRpb25hbEZpbHRlcik7XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLy8gQ3JlYXRlTmV3XHJcblxyXG4gIHB1YmxpYyBBZGROZXdPYmplY3QodmFsdWU6IE9ic2VydmFibGU8YW55PiB8IGFueSk6IHZvaWQge1xyXG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgT2JzZXJ2YWJsZSkge1xyXG4gICAgICB2YWx1ZS5zdWJzY3JpYmUobmV3T2JqZWN0ID0+IHtcclxuICAgICAgICBpZiAobmV3T2JqZWN0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHRoaXMuU2V0TmV3T2JqZWN0KG5ld09iamVjdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2V0TmV3T2JqZWN0KHZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgU2V0TmV3T2JqZWN0KG5ld09iamVjdDogYW55KSB7XHJcbiAgICBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgIHRoaXMuZGF0YUxpc3QucHVzaChuZXdPYmplY3QpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgZm9yIChsZXQgY2FjaGUgb2YgdGhpcy5jYWNoZUxhenlEYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucXVlcnkuaW5jbHVkZXMoY2FjaGUucXVlcnkpIHx8IGNhY2hlLnF1ZXJ5ID09PSB1bmRlZmluZWQgfHwgY2FjaGUucXVlcnkgPT09ICcnKSB7XHJcbiAgICAgICAgICBjYWNoZS5jb3VudEVsZW1lbnQrKztcclxuICAgICAgICAgIGNhY2hlLm9iamVjdHMucHVzaChuZXdPYmplY3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZmlyc3RMb2FkID0gZmFsc2U7XHJcbiAgICB0aGlzLnF1ZXJ5ID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5jdXJyZW50Q2FjaGUgPSB0aGlzLkdldENhY2hlKHRoaXMucXVlcnkpO1xyXG4gICAgdGhpcy5zZWxlY3RPbmUobmV3IE1vdXNlRXZlbnQoJ2NsaWNrJyksIG5ld09iamVjdCk7XHJcbiAgfVxyXG5cclxuICBnZXQgU2hvd05ldygpOiBib29sZWFuIHtcclxuICAgIGxldCBhID0gdGhpcy5xdWVyeSAmJiB0aGlzLm5ld01lc3NhZ2UgJiYgKCF0aGlzLmRhdGFMaXN0U3ViIHx8IHRoaXMuZGF0YUxpc3RTdWIuY2xvc2VkKTtcclxuXHJcbiAgICBsZXQgYiA9IHRoaXMuT3B0aW9ucy5maW5kSW5kZXgobyA9PiB7XHJcbiAgICAgIGxldCBjID0gZmV0Y2hGcm9tT2JqZWN0KG8sIHRoaXMudmlld1Byb3BlcnR5KSA/IGZldGNoRnJvbU9iamVjdChvLCB0aGlzLnZpZXdQcm9wZXJ0eSkudmFsdWVPZigpIDogdW5kZWZpbmVkO1xyXG4gICAgICByZXR1cm4gZGVlcEVxdWFsKGMsIHRoaXMucXVlcnkpO1xyXG4gICAgfSkgPT09IC0xICYmIHRoaXMub3V0cHV0LmZpbmRJbmRleChvID0+IHtcclxuICAgICAgbGV0IGMgPSBmZXRjaEZyb21PYmplY3QobywgdGhpcy52aWV3UHJvcGVydHkpID8gZmV0Y2hGcm9tT2JqZWN0KG8sIHRoaXMudmlld1Byb3BlcnR5KS52YWx1ZU9mKCkgOiB1bmRlZmluZWQ7XHJcbiAgICAgIHJldHVybiBkZWVwRXF1YWwoYywgdGhpcy5xdWVyeSk7XHJcbiAgICB9KSA9PT0gLTE7XHJcblxyXG4gICAgcmV0dXJuIGEgJiYgYjtcclxuICB9XHJcblxyXG4gIGdldCBTaG93RW1wdHkoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5PcHRpb25zLmxlbmd0aCA9PT0gMCAmJiAoISh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgRnVuY3Rpb24pIHx8ICh0aGlzLmRhdGFMaXN0U3ViLmNsb3NlZCkpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIENBQ0hFXHJcbiAgcHJpdmF0ZSBjYWNoZUxhenlEYXRhOiBBcnJheTxDYWNoZUluZm8+ID0gW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ2FjaGVJbmZvIHtcclxuICBjb3VudEVsZW1lbnQ6IG51bWJlcjtcclxuICBjb3VudFBhZ2VzOiBudW1iZXI7XHJcbiAgY3VycmVudFBhZ2U6IG51bWJlcjtcclxuICBvYmplY3RzOiBBcnJheTxhbnk+O1xyXG5cclxuICBxdWVyeTogc3RyaW5nO1xyXG4gIHBhcmFtczogYW55O1xyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IE5nVmlib3JDb21wb25lbnQgfSBmcm9tICcuL25nLXZpYm9yLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFZpYm9yQm90aERpcmVjdGl2ZSwgVmlib3JDcmVhdGVEaXJlY3RpdmUsIFZpYm9yRHJvcGRvd25EaXJlY3RpdmUsIFZpYm9yU2VsZWN0ZWREaXJlY3RpdmUgfSBmcm9tICcuL25nLXZpYm9yLXRlbXBsYXRlLmRpcmVjdGl2ZSc7XHJcbmNvbnN0IGNvbXBvbmVudHMgPSBbTmdWaWJvckNvbXBvbmVudCwgVmlib3JCb3RoRGlyZWN0aXZlLCBWaWJvckNyZWF0ZURpcmVjdGl2ZSwgVmlib3JEcm9wZG93bkRpcmVjdGl2ZSwgVmlib3JTZWxlY3RlZERpcmVjdGl2ZV1cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgRm9ybXNNb2R1bGUsIENvbW1vbk1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAuLi5jb21wb25lbnRzXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICAuLi5jb21wb25lbnRzLCBGb3Jtc01vZHVsZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nVmlib3JNb2R1bGUgeyB9XHJcbiJdLCJuYW1lcyI6WyJ0c2xpYl8xLl9fdmFsdWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7SUFNRTtLQUFpQjs7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