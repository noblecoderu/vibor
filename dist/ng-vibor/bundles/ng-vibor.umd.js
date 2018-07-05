(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('rxjs'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ng-vibor', ['exports', '@angular/core', '@angular/forms', 'rxjs', '@angular/common'], factory) :
    (factory((global['ng-vibor'] = {}),global.ng.core,global.ng.forms,global.rxjs,global.ng.common));
}(this, (function (exports,i0,forms,rxjs,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NgViborService = (function () {
        function NgViborService() {
        }
        NgViborService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        NgViborService.ctorParameters = function () { return []; };
        /** @nocollapse */ NgViborService.ngInjectableDef = i0.defineInjectable({ factory: function NgViborService_Factory() { return new NgViborService(); }, token: NgViborService, providedIn: "root" });
        return NgViborService;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ViborDropdownDirective = (function () {
        function ViborDropdownDirective(templateRef) {
            this.templateRef = templateRef;
        }
        ViborDropdownDirective.decorators = [
            { type: i0.Directive, args: [{ selector: '[vibor-dropdown-element]' },] },
        ];
        /** @nocollapse */
        ViborDropdownDirective.ctorParameters = function () {
            return [
                { type: i0.TemplateRef }
            ];
        };
        return ViborDropdownDirective;
    }());
    var ViborSelectedDirective = (function () {
        function ViborSelectedDirective(templateRef) {
            this.templateRef = templateRef;
        }
        ViborSelectedDirective.decorators = [
            { type: i0.Directive, args: [{ selector: '[vibor-selected-element]' },] },
        ];
        /** @nocollapse */
        ViborSelectedDirective.ctorParameters = function () {
            return [
                { type: i0.TemplateRef }
            ];
        };
        return ViborSelectedDirective;
    }());
    var ViborBothDirective = (function () {
        function ViborBothDirective(templateRef) {
            this.templateRef = templateRef;
        }
        ViborBothDirective.decorators = [
            { type: i0.Directive, args: [{ selector: '[vibor-both-element]' },] },
        ];
        /** @nocollapse */
        ViborBothDirective.ctorParameters = function () {
            return [
                { type: i0.TemplateRef }
            ];
        };
        return ViborBothDirective;
    }());
    var ViborCreateDirective = (function () {
        function ViborCreateDirective(templateRef) {
            this.templateRef = templateRef;
        }
        ViborCreateDirective.decorators = [
            { type: i0.Directive, args: [{ selector: '[vibor-create]' },] },
        ];
        /** @nocollapse */
        ViborCreateDirective.ctorParameters = function () {
            return [
                { type: i0.TemplateRef }
            ];
        };
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
            name === 'width' ? 1 : 0, /** @type {?} */ val = 0;
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
    var NgViborComponent = (function () {
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
            this.changeFullModel = new i0.EventEmitter();
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
                        var /** @type {?} */ params = (Object.assign({}, this.additionalFilter));
                        params[this.searchProperty] = this.query;
                        this.dataListSub = ((this.dataList(params, 1, this.countOnPage))).subscribe(function (answer) {
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
                var /** @type {?} */ list = (this.el.getElementsByClassName('select-dropdown')[0]);
                var /** @type {?} */ targetLi = (this.el.getElementsByClassName('select-dropdown-optgroup-option')[this.selectorPosition]);
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
             */ function () {
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
             */ function () {
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
             */ function () {
                return this._model;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
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
             */ function () {
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
             */ function () {
                if (this.multiple) {
                    var /** @type {?} */ tmp = [];
                    try {
                        for (var _a = __values(this.output), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var o = _b.value;
                            tmp.push(fetchFromObject(o, this.modelProperty));
                        }
                    }
                    catch (e_1_1) {
                        e_1 = { error: e_1_1 };
                    }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return))
                                _c.call(_a);
                        }
                        finally {
                            if (e_1)
                                throw e_1.error;
                        }
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
             */ function (newValue) {
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
                            this.dataListSub = ((this.dataList(params, 1, this.countOnPage))).subscribe(function (answer) {
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
                        catch (e_2_1) {
                            e_2 = { error: e_2_1 };
                        }
                        finally {
                            try {
                                if (dataList_1_1 && !dataList_1_1.done && (_a = dataList_1.return))
                                    _a.call(dataList_1);
                            }
                            finally {
                                if (e_2)
                                    throw e_2.error;
                            }
                        }
                    }
                }
                catch (e_3_1) {
                    e_3 = { error: e_3_1 };
                }
                finally {
                    try {
                        if (newValue_1_1 && !newValue_1_1.done && (_b = newValue_1.return))
                            _b.call(newValue_1);
                    }
                    finally {
                        if (e_3)
                            throw e_3.error;
                    }
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
             */ function () {
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
                if (value instanceof rxjs.Observable) {
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
                    catch (e_4_1) {
                        e_4 = { error: e_4_1 };
                    }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return))
                                _c.call(_a);
                        }
                        finally {
                            if (e_4)
                                throw e_4.error;
                        }
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
             */ function () {
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
             */ function () {
                return this.Options.length === 0 && (!(this.dataList instanceof Function) || (this.dataListSub.closed));
            },
            enumerable: true,
            configurable: true
        });
        NgViborComponent.decorators = [
            { type: i0.Component, args: [{
                        // tslint:disable-next-line:component-selector
                        selector: 'vibor',
                        template: "<div class=\"vibor\">\n  <ng-content></ng-content>\n\n  <div class=\"select-search\" (click)=\"showDropdownList($event);\">\n    <ul class=\"select-search-list\">\n      <ng-container *ngIf=\"multiple || !isOpen\">\n        <ng-container *ngIf=\"!SelectedTemplate; else selectedT\">\n          <li class=\"select-search-list-item select-search-list-item_selection\" *ngFor=\"let item of output; let $index=index; let $last=last; trackBy: TrackByFn;\">\n            <div class=\"vibor__selection\">\n              <div [innerHTML]=\"getListFormatted(item)\"></div>\n              <a class=\"select-search-list-item_remove\" *ngIf=\"allowReset\" (click)=\"!disabled && removeOne($index, $event)\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\">\n                  <path fill=\"#2c2c2c\" d=\"M10.1 4.5L8 6.6 5.9 4.5 4.5 5.9 6.6 8l-2.1 2.1 1.4 1.4L8 9.4l2.1 2.1 1.4-1.4L9.4 8l2.1-2.1z\"/>\n                </svg>\n              </a>\n            </div>\n          </li>\n        </ng-container>\n\n        <ng-template #selectedT>\n          <li class=\"select-search-list-item select-search-list-item_selection\" *ngFor=\"let item of output; let $index=index; let $last=last; trackBy: TrackByFn;\">\n            <div class=\"vibor__selection\">\n              <ng-container *ngTemplateOutlet=\"SelectedTemplate; context: {item: item}\"></ng-container>\n              <a class=\"select-search-list-item_remove\" *ngIf=\"allowReset && !disabled\" (click)=\"!disabled && removeOne($index, $event)\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\">\n                  <path fill=\"#2c2c2c\" d=\"M10.1 4.5L8 6.6 5.9 4.5 4.5 5.9 6.6 8l-2.1 2.1 1.4 1.4L8 9.4l2.1 2.1 1.4-1.4L9.4 8l2.1-2.1z\"/>\n                </svg>\n              </a>\n            </div>\n          </li>\n        </ng-template>\n      </ng-container>\n\n      <li class=\"select-search-list-item select-search-list-item_input\" [class.select-search-list-item_hide]=\"InputHide\">\n        <input autocomplete=\"off\" #inputControl=\"ngModel\" [name]=\"name\" [disabled]=\"disabled\" [(ngModel)]=\"query\" [placeholder]=\"output.length == 0 || (multiple && output.length < multipleLimit) ? placeholder : ''\"\n          (input)=\"updateOptionsInDelay()\" (keydown)=\"keyDown($event)\" />\n      </li>\n      <li class=\"select-search-list-item select-search-list-item_loader-center\" [hidden]=\"!dataListSub || dataListSub.closed\">\n        <div class=\"select-search-list-item_loader\"></div>\n      </li>\n\n      <span class=\"arrow\" (click)=\"toggleDropdown($event)\">\n      </span>\n    </ul>\n  </div>\n\n  <div class=\"select-dropdown\" *ngIf=\"isOpen\">\n    <ul class=\"select-dropdown-optgroup\">\n      <ng-container *ngIf=\"!DropdownTemplate; else dropdownT\">\n        <li class=\"select-dropdown-optgroup-option\" *ngFor=\"let option of Options; let i=index\" (mousedown)=\"selectOne($event, option)\"\n          [class.active]=\"i === selectorPosition\" [innerHTML]=\"getDropdownFormatted(option)\">\n        </li>\n      </ng-container>\n\n      <ng-template #dropdownT>\n        <li class=\"select-dropdown-optgroup-option\" *ngFor=\"let option of Options; let i=index\" (mousedown)=\"selectOne($event, option)\"\n          [class.active]=\"i === selectorPosition\">\n          <ng-container *ngTemplateOutlet=\"DropdownTemplate; context: {item: option}\"></ng-container>\n        </li>\n      </ng-template>\n\n      <li class=\"select-dropdown-optgroup-option loading\" *ngIf=\"dataListSub && !dataListSub.closed\">\n        \u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430\n      </li>\n      <li class=\"select-dropdown-optgroup-option loader\" (mousedown)=\"AddNewObject(CreateNew(query));\" [class.active]=\"selectorPosition === Options.length\"\n        *ngIf=\"ShowNew\">\n\n        <ng-container *ngIf=\"createTemplate; else templateWithMessage\">\n          <ng-container *ngTemplateOutlet=\"createTemplate.templateRef; context: {query: query}\"></ng-container>\n        </ng-container>\n\n        <ng-template #templateWithMessage>\n          {{ newMessage }}\n        </ng-template>\n      </li>\n      <li class=\"select-dropdown-optgroup-option loader\" *ngIf=\"ShowEmpty\">\n        \u041F\u0443\u0441\u0442\u043E\n      </li>\n    </ul>\n    <div class=\"select-dropdown-pager\" *ngIf=\"currentCache && currentCache.countPages > 1\">\n      <div class=\"select-dropdown-pager-page\">\n        {{ currentCache.currentPage | number }} / {{ currentCache.countPages | number }}\n      </div>\n      <button class=\"select-dropdown-pager-loadmore\" *ngIf=\"currentCache.countPages > 1 && currentCache.currentPage < currentCache.countPages\"\n        (mousedown)=\"nextPage($event)\">\n        \u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0435\u0449\u0451\n      </button>\n    </div>\n  </div>\n</div>\n",
                        styles: [".vibor a,.vibor label,.vibor legend,.vibor p,.vibor span,.vibor ul{margin:0;padding:0;border:0}.vibor a,.vibor button,.vibor input{outline:0}.vibor ol,.vibor ul{list-style:none}.vibor input{padding:0;margin:0;border:0;font:inherit}.vibor b{font-weight:400}.vibor{position:relative;display:block;border:1px solid #d5d9de;border-radius:3px;font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\";font-size:14px;line-height:18px;background-color:#fff;transition:box-shadow .15s linear}.vibor:hover:not([disabled]),.vibor:hover:not([disabled]) .select-dropdown{box-shadow:0 3px 6px 0 rgba(44,44,44,.1)}.vibor[disabled]{opacity:.5;pointer-events:none;background-color:#f4f4f4}.vibor .select-search{position:relative;padding-right:40px}.vibor .select-search .arrow{content:\"\";position:absolute;right:15px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);display:block;width:16px;height:16px;background-image:url(data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ibmMtaWNvbiBnbHlwaCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiI+DQogIDxwYXRoIGZpbGw9IiMyYzJjMmMiIGQ9Ik04IDExLjRMMi42IDYgNCA0LjZsNCA0IDQtNEwxMy40IDYiLz4NCjwvc3ZnPg0K);transition:-webkit-transform .15s ease-in-out;transition:transform .15s ease-in-out;transition:transform .15s ease-in-out,-webkit-transform .15s ease-in-out}.vibor .select-search .arrow:before,.vibor .select-search-list-item_hide{display:none}.vibor .select-search-list-item_selection{position:relative}.vibor .select-search-list-item_selection>div{display:flex;align-items:center;padding:0 15px}.vibor .select-search-list-item_input input{width:100%;padding:0 15px;text-overflow:ellipsis;font-size:14px;color:#2c2c2c;background-color:transparent}.vibor .select-search-list-item_input input::-webkit-input-placeholder{color:rgba(44,44,44,.2)}.vibor .select-search-list-item_input input:-ms-input-placeholder{color:rgba(44,44,44,.2)}.vibor .select-search-list-item_input input::-ms-input-placeholder{color:rgba(44,44,44,.2)}.vibor .select-search-list-item_input input::placeholder{color:rgba(44,44,44,.2)}.vibor .select-search-list-item_remove{display:flex;align-items:center;justify-content:center;width:16px;height:16px;margin-left:5px;border-radius:50%;background-color:#bababa;cursor:pointer;transition:background-color .15s linear}.vibor .select-search-list-item_remove:hover{background-color:#949494}.vibor .select-search-list-item_loader-center{position:absolute;right:12px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);display:flex;align-items:center;justify-content:center;width:21px;height:21px;background:#fff;z-index:2}.vibor .select-search-list-item_loader-center[hidden]{display:none}.vibor .select-search-list-item_loader-center .select-search-list-item_loader{width:16px;height:16px;box-sizing:border-box;border-width:2px;border-style:solid;border-color:#22272e rgba(34,39,46,.4) rgba(34,39,46,.4);border-radius:100%;-webkit-animation:.45s linear infinite clockwise;animation:.45s linear infinite clockwise}.vibor .select-dropdown{position:absolute;top:100%;left:-1px;right:-1px;border:1px solid #d5d9de;border-bottom-left-radius:5px;border-bottom-right-radius:5px;border-top:0;background:#fff;overflow:hidden;z-index:2}.vibor .select-dropdown-optgroup{max-height:300px;overflow-y:auto}.vibor .select-dropdown-optgroup-option{min-height:30px;padding:10px 15px;color:#2c2c2c}.vibor .select-dropdown-optgroup-option:hover{background-color:rgba(66,132,215,.1)}.vibor .select-dropdown-optgroup-option.loading{font-size:16px;line-height:18px;text-align:center;color:#8b8b83}.vibor .select-dropdown-optgroup-option.loader{text-align:center;color:#8b8b83}.vibor .select-dropdown-pager{padding:10px;text-align:center;border-top:1px dashed #d5d9de}.vibor .select-dropdown-pager-page{font-size:12px;color:#8b8b83}.vibor .select-dropdown-pager-loadmore{border:0;background:0 0;box-shadow:none;color:#8b8b83;text-transform:uppercase}.vibor .select-dropdown-pager-page+.select-dropdown-pager-loadmore{margin-top:10px}.vibor.open-vibor{border-bottom-left-radius:0;border-bottom-right-radius:0}.vibor.open-vibor .select-search .arrow{-webkit-transform:translateY(-50%) rotate(180deg);transform:translateY(-50%) rotate(180deg)}.vibor:not(.multiple) .select-search-list-item_remove{position:absolute;right:0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.vibor.multiple .select-search{padding:5px 40px 5px 15px}.vibor.multiple .select-search-list{display:flex;flex-flow:row wrap;margin:-5px}.vibor.multiple .select-search-list-item{padding:5px}.vibor.multiple .select-search-list-item_input{flex:1}.vibor.multiple .select-search-list-item_input input{height:28px;padding:0}.vibor.multiple .vibor__selection{display:flex;align-items:center;height:28px;padding:0 7px;border-radius:3px;font-size:14px;background:#e5e5e7;color:#2c2c2c}.vibor:not(.multiple) .select-search-list-item_input input,.vibor:not(.multiple) .select-search-list-item_selection>div{min-height:38px}@-webkit-keyframes clockwise{to{-webkit-transform:rotate(360deg) translatez(0);transform:rotate(360deg) translatez(0)}}@keyframes clockwise{to{-webkit-transform:rotate(360deg) translatez(0);transform:rotate(360deg) translatez(0)}}"],
                        encapsulation: i0.ViewEncapsulation.None,
                        providers: [{
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: i0.forwardRef(function () { return NgViborComponent; }),
                                multi: true
                            }]
                    },] },
        ];
        /** @nocollapse */
        NgViborComponent.ctorParameters = function () {
            return [
                { type: i0.ElementRef }
            ];
        };
        NgViborComponent.propDecorators = {
            inputControl: [{ type: i0.ViewChild, args: ['inputControl',] }],
            multiple: [{ type: i0.Input }],
            multipleLimit: [{ type: i0.Input }],
            countOnPage: [{ type: i0.Input }],
            placeholder: [{ type: i0.Input }],
            name: [{ type: i0.Input }],
            required: [{ type: i0.Input }],
            allowReset: [{ type: i0.Input }],
            bothTemplate: [{ type: i0.ContentChild, args: [ViborBothDirective,] }],
            dropdownTemplate: [{ type: i0.ContentChild, args: [ViborDropdownDirective,] }],
            selectedTemplate: [{ type: i0.ContentChild, args: [ViborSelectedDirective,] }],
            createTemplate: [{ type: i0.ContentChild, args: [ViborCreateDirective,] }],
            listFormatter: [{ type: i0.Input }],
            dropdownFormatter: [{ type: i0.Input }],
            viewProperty: [{ type: i0.Input }],
            modelProperty: [{ type: i0.Input }],
            preloadProperty: [{ type: i0.Input }],
            preloadField: [{ type: i0.Input }],
            searchProperty: [{ type: i0.Input }],
            dataList: [{ type: i0.Input }],
            excludeList: [{ type: i0.Input }],
            additionalFilter: [{ type: i0.Input }],
            onlyEmitter: [{ type: i0.Input }],
            changeFullModel: [{ type: i0.Output, args: ['changeFullModel',] }],
            newMessage: [{ type: i0.Input }],
            CreateNew: [{ type: i0.Input }]
        };
        return NgViborComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var /** @type {?} */ components = [NgViborComponent, ViborBothDirective, ViborCreateDirective, ViborDropdownDirective, ViborSelectedDirective];
    var NgViborModule = (function () {
        function NgViborModule() {
        }
        NgViborModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            forms.FormsModule, common.CommonModule
                        ],
                        declarations: __spread(components),
                        exports: __spread(components, [
                            forms.FormsModule
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

    exports.NgViborService = NgViborService;
    exports.NgViborComponent = NgViborComponent;
    exports.NgViborModule = NgViborModule;
    exports.ɵc = ViborBothDirective;
    exports.ɵd = ViborCreateDirective;
    exports.ɵa = ViborDropdownDirective;
    exports.ɵb = ViborSelectedDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctdmlib3IudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZy12aWJvci9saWIvbmctdmlib3Iuc2VydmljZS50cyIsbnVsbCwibmc6Ly9uZy12aWJvci9saWIvbmctdmlib3ItdGVtcGxhdGUuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy12aWJvci9saWIvaGVscGVycy50cyIsIm5nOi8vbmctdmlib3IvbGliL25nLXZpYm9yLmNvbXBvbmVudC50cyIsIm5nOi8vbmctdmlib3IvbGliL25nLXZpYm9yLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5nVmlib3JTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbdmlib3ItZHJvcGRvd24tZWxlbWVudF0nIH0pXG5leHBvcnQgY2xhc3MgVmlib3JEcm9wZG93bkRpcmVjdGl2ZSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxufVxuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbdmlib3Itc2VsZWN0ZWQtZWxlbWVudF0nIH0pXG5leHBvcnQgY2xhc3MgVmlib3JTZWxlY3RlZERpcmVjdGl2ZSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxufVxuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbdmlib3ItYm90aC1lbGVtZW50XScgfSlcbmV4cG9ydCBjbGFzcyBWaWJvckJvdGhEaXJlY3RpdmUge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cbn1cblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3ZpYm9yLWNyZWF0ZV0nIH0pXG5leHBvcnQgY2xhc3MgVmlib3JDcmVhdGVEaXJlY3RpdmUge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cbn1cbiIsImV4cG9ydCBpbnRlcmZhY2UgSURhdGFSZXNwb25zZSB7XG4gIGRhdGE6IE9iamVjdDtcbiAgbGlzdDogQXJyYXk8T2JqZWN0PjtcbiAgaGVhZGVyczogYW55O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmV0Y2hGcm9tT2JqZWN0KG9iamVjdDogYW55LCBwcm9wOiBzdHJpbmcpOiBhbnkge1xuICBpZiAob2JqZWN0ID09PSB1bmRlZmluZWQgfHwgcHJvcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuXG4gIGNvbnN0IGluZGV4OiBudW1iZXIgPSBwcm9wLmluZGV4T2YoJy4nKTtcbiAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICByZXR1cm4gZmV0Y2hGcm9tT2JqZWN0KG9iamVjdFtwcm9wLnN1YnN0cmluZygwLCBpbmRleCldLCBwcm9wLnN1YnN0cihpbmRleCArIDEpKTtcbiAgfVxuXG4gIHJldHVybiBvYmplY3RbcHJvcF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0Rm9ybWF0dGVyKGRhdGE6IGFueSwgdmFsdWVQcm9wZXJ0eU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGxldCBodG1sID0gJyc7XG4gIGh0bWwgKz0gZmV0Y2hGcm9tT2JqZWN0KGRhdGEsIHZhbHVlUHJvcGVydHlOYW1lKSA/IGA8Yj4ke2ZldGNoRnJvbU9iamVjdChkYXRhLCB2YWx1ZVByb3BlcnR5TmFtZSl9PC9iPmAgOiAnJztcbiAgcmV0dXJuIGh0bWw7XG59XG5cblxuLy8gVXNlZCBmb3IgbWF0Y2hpbmcgbnVtYmVyc1xuY29uc3QgY29yZV9wbnVtOiBzdHJpbmcgPSAvWystXT8oPzpcXGQqXFwufClcXGQrKD86W2VFXVsrLV0/XFxkK3wpLy5zb3VyY2U7XG5jb25zdCBybnVtbm9ucHg6IFJlZ0V4cCA9IG5ldyBSZWdFeHAoJ14oJyArIGNvcmVfcG51bSArICcpKD8hcHgpW2EteiVdKyQnLCAnaScpO1xuXG5mdW5jdGlvbiBhdWdtZW50V2lkdGhPckhlaWdodChuYW1lOiBzdHJpbmcsIGV4dHJhOiBhbnksIGlzQm9yZGVyQm94OiBhbnksIHN0eWxlczogYW55KTogbnVtYmVyIHtcbiAgbGV0IGk6IG51bWJlciA9IGV4dHJhID09PSAoaXNCb3JkZXJCb3ggPyAnYm9yZGVyJyA6ICdjb250ZW50JykgP1xuICAgIC8vIElmIHdlIGFscmVhZHkgaGF2ZSB0aGUgcmlnaHQgbWVhc3VyZW1lbnQsIGF2b2lkIGF1Z21lbnRhdGlvblxuICAgIDQgOlxuICAgIC8vIE90aGVyd2lzZSBpbml0aWFsaXplIGZvciBob3Jpem9udGFsIG9yIHZlcnRpY2FsIHByb3BlcnRpZXNcbiAgICBuYW1lID09PSAnd2lkdGgnID8gMSA6IDAsXG5cbiAgICB2YWwgPSAwO1xuICBjb25zdCBjc3NFeHBhbmQ6IHN0cmluZ1tdID0gWydUb3AnLCAnUmlnaHQnLCAnQm90dG9tJywgJ0xlZnQnXTtcblxuICAvLyBUT0RPIFVzZSBhbmd1bGFyLmVsZW1lbnQuY3NzIGluc3RlYWQgb2YgZ2V0U3R5bGVWYWx1ZSBhZnRlclxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vY2FpdHAvYW5ndWxhci5qcy9jb21taXQvOTJiYmI1ZTIyNTI1M2ViZGRkMzhlZjU3MzVkNjZmZmVmNzZiNmExNCB3aWxsIGJlIGFwcGxpZWRcbiAgZnVuY3Rpb24gZ2V0U3R5bGVWYWx1ZShfbmFtZTogYW55KTogbnVtYmVyIHtcbiAgICByZXR1cm4gcGFyc2VGbG9hdChzdHlsZXNbX25hbWVdKTtcbiAgfVxuXG4gIGZvciAoOyBpIDwgNDsgaSArPSAyKSB7XG4gICAgLy8gYm90aCBib3ggbW9kZWxzIGV4Y2x1ZGUgbWFyZ2luLCBzbyBhZGQgaXQgaWYgd2Ugd2FudCBpdFxuICAgIGlmIChleHRyYSA9PT0gJ21hcmdpbicpIHtcbiAgICAgIHZhbCArPSBnZXRTdHlsZVZhbHVlKGV4dHJhICsgY3NzRXhwYW5kW2ldKTtcbiAgICB9XG5cbiAgICBpZiAoaXNCb3JkZXJCb3gpIHtcbiAgICAgIC8vIGJvcmRlci1ib3ggaW5jbHVkZXMgcGFkZGluZywgc28gcmVtb3ZlIGl0IGlmIHdlIHdhbnQgY29udGVudFxuICAgICAgaWYgKGV4dHJhID09PSAnY29udGVudCcpIHtcbiAgICAgICAgdmFsIC09IGdldFN0eWxlVmFsdWUoJ3BhZGRpbmcnICsgY3NzRXhwYW5kW2ldKTtcbiAgICAgIH1cblxuICAgICAgLy8gYXQgdGhpcyBwb2ludCwgZXh0cmEgaXNuJ3QgYm9yZGVyIG5vciBtYXJnaW4sIHNvIHJlbW92ZSBib3JkZXJcbiAgICAgIGlmIChleHRyYSAhPT0gJ21hcmdpbicpIHtcbiAgICAgICAgdmFsIC09IGdldFN0eWxlVmFsdWUoJ2JvcmRlcicgKyBjc3NFeHBhbmRbaV0gKyAnV2lkdGgnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFsICs9IGdldFN0eWxlVmFsdWUoJ3BhZGRpbmcnICsgY3NzRXhwYW5kW2ldKTtcblxuICAgICAgLy8gYXQgdGhpcyBwb2ludCwgZXh0cmEgaXNuJ3QgY29udGVudCBub3IgcGFkZGluZywgc28gYWRkIGJvcmRlclxuICAgICAgaWYgKGV4dHJhICE9PSAncGFkZGluZycpIHtcbiAgICAgICAgdmFsICs9IGdldFN0eWxlVmFsdWUoJ2JvcmRlcicgKyBjc3NFeHBhbmRbaV0gKyAnV2lkdGgnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdmFsO1xufVxuXG5mdW5jdGlvbiBnZXRXaW5kb3coZWxlbTogYW55KTogYW55IHtcbiAgcmV0dXJuIGVsZW0gIT0gbnVsbCAmJiBlbGVtID09PSBlbGVtLndpbmRvdyA/IGVsZW0gOiBlbGVtLm5vZGVUeXBlID09PSA5ICYmIGVsZW0uZGVmYXVsdFZpZXc7XG59XG5cbmZ1bmN0aW9uIGdldE9mZnNldChlbGVtOiBhbnkpOiBhbnkge1xuICBsZXQgZG9jRWxlbTogYW55LCB3aW46IGFueTtcbiAgY29uc3QgYm94OiBhbnkgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBjb25zdCBkb2M6IGFueSA9IGVsZW0gJiYgZWxlbS5vd25lckRvY3VtZW50O1xuXG4gIGlmICghZG9jKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZG9jRWxlbSA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG4gIHdpbiA9IGdldFdpbmRvdyhkb2MpO1xuXG4gIHJldHVybiB7XG4gICAgdG9wOiBib3gudG9wICsgd2luLnBhZ2VZT2Zmc2V0IC0gZG9jRWxlbS5jbGllbnRUb3AsXG4gICAgbGVmdDogYm94LmxlZnQgKyB3aW4ucGFnZVhPZmZzZXQgLSBkb2NFbGVtLmNsaWVudExlZnRcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNjcm9sbEFjdGl2ZU9wdGlvbihsaXN0OiBIVE1MRWxlbWVudCwgaXRlbTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgbGV0IHk6IGFueSwgaGVpZ2h0X21lbnU6IGFueSwgaGVpZ2h0X2l0ZW06IGFueSwgc2Nyb2xsOiBhbnksIHNjcm9sbF90b3A6IGFueSwgc2Nyb2xsX2JvdHRvbTogYW55O1xuXG4gIGlmIChpdGVtKSB7XG4gICAgaGVpZ2h0X21lbnUgPSBsaXN0Lm9mZnNldEhlaWdodDtcbiAgICBoZWlnaHRfaXRlbSA9IGdldFdpZHRoT3JIZWlnaHQoaXRlbSwgJ2hlaWdodCcsICdtYXJnaW4nKTsgLy8gb3V0ZXJIZWlnaHQodHJ1ZSk7XG4gICAgc2Nyb2xsID0gbGlzdC5zY3JvbGxUb3AgfHwgMDtcbiAgICB5ID0gZ2V0T2Zmc2V0KGl0ZW0pLnRvcCAtIGdldE9mZnNldChsaXN0KS50b3AgKyBzY3JvbGw7XG4gICAgc2Nyb2xsX3RvcCA9IHk7XG4gICAgc2Nyb2xsX2JvdHRvbSA9IHkgLSBoZWlnaHRfbWVudSArIGhlaWdodF9pdGVtO1xuXG4gICAgLy8gVE9ETyBNYWtlIGFuaW1hdGlvblxuICAgIGlmICh5ICsgaGVpZ2h0X2l0ZW0gPiBoZWlnaHRfbWVudSArIHNjcm9sbCkge1xuICAgICAgbGlzdC5zY3JvbGxUb3AgPSBzY3JvbGxfYm90dG9tO1xuICAgIH0gZWxzZSBpZiAoeSA8IHNjcm9sbCkge1xuICAgICAgbGlzdC5zY3JvbGxUb3AgPSBzY3JvbGxfdG9wO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRXaWR0aE9ySGVpZ2h0KGVsZW06IGFueSwgbmFtZTogYW55LCBleHRyYTogYW55KTogYW55IHtcblxuICAvLyBTdGFydCB3aXRoIG9mZnNldCBwcm9wZXJ0eSwgd2hpY2ggaXMgZXF1aXZhbGVudCB0byB0aGUgYm9yZGVyLWJveCB2YWx1ZVxuICBjb25zdCB2YWx1ZUlzQm9yZGVyQm94ID0gdHJ1ZTtcbiAgbGV0IHZhbDogYW55ID0gbmFtZSA9PT0gJ3dpZHRoJyA/IGVsZW0ub2Zmc2V0V2lkdGggOiBlbGVtLm9mZnNldEhlaWdodDtcbiAgY29uc3Qgc3R5bGVzOiBhbnkgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtLCBudWxsKTtcbiAgY29uc3QgaXNCb3JkZXJCb3ggPSBmYWxzZTsgLy8galF1ZXJ5LnN1cHBvcnQuYm94U2l6aW5nICYmIGpRdWVyeS5jc3MoIGVsZW0sICdib3hTaXppbmcnLCBmYWxzZSwgc3R5bGVzICkgPT09ICdib3JkZXItYm94JztcblxuICAvLyBzb21lIG5vbi1odG1sIGVsZW1lbnRzIHJldHVybiB1bmRlZmluZWQgZm9yIG9mZnNldFdpZHRoLCBzbyBjaGVjayBmb3IgbnVsbC91bmRlZmluZWRcbiAgLy8gc3ZnIC0gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NjQ5Mjg1XG4gIC8vIE1hdGhNTCAtIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTQ5MTY2OFxuICBpZiAodmFsIDw9IDAgfHwgdmFsID09IG51bGwpIHtcbiAgICAvLyBGYWxsIGJhY2sgdG8gY29tcHV0ZWQgdGhlbiB1bmNvbXB1dGVkIGNzcyBpZiBuZWNlc3NhcnlcbiAgICB2YWwgPSBzdHlsZXNbbmFtZV07XG5cbiAgICBpZiAodmFsIDwgMCB8fCB2YWwgPT0gbnVsbCkge1xuICAgICAgdmFsID0gZWxlbS5zdHlsZVtuYW1lXTtcbiAgICB9XG5cbiAgICAvLyBDb21wdXRlZCB1bml0IGlzIG5vdCBwaXhlbHMuIFN0b3AgaGVyZSBhbmQgcmV0dXJuLlxuICAgIGlmIChybnVtbm9ucHgudGVzdCh2YWwpKSB7XG4gICAgICByZXR1cm4gdmFsO1xuICAgIH1cblxuICAgIC8vIHdlIG5lZWQgdGhlIGNoZWNrIGZvciBzdHlsZSBpbiBjYXNlIGEgYnJvd3NlciB3aGljaCByZXR1cm5zIHVucmVsaWFibGUgdmFsdWVzXG4gICAgLy8gZm9yIGdldENvbXB1dGVkU3R5bGUgc2lsZW50bHkgZmFsbHMgYmFjayB0byB0aGUgcmVsaWFibGUgZWxlbS5zdHlsZVxuICAgIC8vIHZhbHVlSXNCb3JkZXJCb3ggPSBpc0JvcmRlckJveCAmJiAoIGpRdWVyeS5zdXBwb3J0LmJveFNpemluZ1JlbGlhYmxlIHx8IHZhbCA9PT0gZWxlbS5zdHlsZVsgbmFtZSBdICk7XG5cbiAgICAvLyBOb3JtYWxpemUgJycsIGF1dG8sIGFuZCBwcmVwYXJlIGZvciBleHRyYVxuICAgIHZhbCA9IHBhcnNlRmxvYXQodmFsKSB8fCAwO1xuICB9XG5cbiAgLy8gdXNlIHRoZSBhY3RpdmUgYm94LXNpemluZyBtb2RlbCB0byBhZGQvc3VidHJhY3QgaXJyZWxldmFudCBzdHlsZXNcbiAgcmV0dXJuIHZhbCArIGF1Z21lbnRXaWR0aE9ySGVpZ2h0KG5hbWUsIGV4dHJhIHx8IChpc0JvcmRlckJveCA/ICdib3JkZXInIDogJ2NvbnRlbnQnKSwgdmFsdWVJc0JvcmRlckJveCwgc3R5bGVzKTtcbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCwgT25Jbml0LCBPbkNoYW5nZXMsXG4gIElucHV0LCBPdXRwdXQsIGZvcndhcmRSZWYsXG4gIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZixcbiAgVGVtcGxhdGVSZWYsIENvbnRlbnRDaGlsZCwgVmlld0NoaWxkLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBOR19WQUxVRV9BQ0NFU1NPUixcbiAgTmdNb2RlbFxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge1xuICAgIFZpYm9yQm90aERpcmVjdGl2ZSxcbiAgICBWaWJvckNyZWF0ZURpcmVjdGl2ZSxcbiAgICBWaWJvckRyb3Bkb3duRGlyZWN0aXZlLFxuICAgIFZpYm9yU2VsZWN0ZWREaXJlY3RpdmVcbn0gZnJvbSAnLi9uZy12aWJvci10ZW1wbGF0ZS5kaXJlY3RpdmUnO1xuXG5pbXBvcnQge1xuICAgIElEYXRhUmVzcG9uc2UsXG4gICAgZGVmYXVsdEZvcm1hdHRlcixcbiAgICBmZXRjaEZyb21PYmplY3QsXG4gICAgc2Nyb2xsQWN0aXZlT3B0aW9uXG59IGZyb20gJy4vaGVscGVycyc7XG5cbmNvbnN0IGRlZXBFcXVhbCA9IHJlcXVpcmUoJ2RlZXAtZXF1YWwnKTtcblxuQENvbXBvbmVudCh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICd2aWJvcicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInZpYm9yXCI+XG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cblxuICA8ZGl2IGNsYXNzPVwic2VsZWN0LXNlYXJjaFwiIChjbGljayk9XCJzaG93RHJvcGRvd25MaXN0KCRldmVudCk7XCI+XG4gICAgPHVsIGNsYXNzPVwic2VsZWN0LXNlYXJjaC1saXN0XCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibXVsdGlwbGUgfHwgIWlzT3BlblwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIVNlbGVjdGVkVGVtcGxhdGU7IGVsc2Ugc2VsZWN0ZWRUXCI+XG4gICAgICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LXNlYXJjaC1saXN0LWl0ZW0gc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fc2VsZWN0aW9uXCIgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygb3V0cHV0OyBsZXQgJGluZGV4PWluZGV4OyBsZXQgJGxhc3Q9bGFzdDsgdHJhY2tCeTogVHJhY2tCeUZuO1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZpYm9yX19zZWxlY3Rpb25cIj5cbiAgICAgICAgICAgICAgPGRpdiBbaW5uZXJIVE1MXT1cImdldExpc3RGb3JtYXR0ZWQoaXRlbSlcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPGEgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9yZW1vdmVcIiAqbmdJZj1cImFsbG93UmVzZXRcIiAoY2xpY2spPVwiIWRpc2FibGVkICYmIHJlbW92ZU9uZSgkaW5kZXgsICRldmVudClcIj5cbiAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIj5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCIjMmMyYzJjXCIgZD1cIk0xMC4xIDQuNUw4IDYuNiA1LjkgNC41IDQuNSA1LjkgNi42IDhsLTIuMSAyLjEgMS40IDEuNEw4IDkuNGwyLjEgMi4xIDEuNC0xLjRMOS40IDhsMi4xLTIuMXpcIi8+XG4gICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjc2VsZWN0ZWRUPlxuICAgICAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtIHNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX3NlbGVjdGlvblwiICpuZ0Zvcj1cImxldCBpdGVtIG9mIG91dHB1dDsgbGV0ICRpbmRleD1pbmRleDsgbGV0ICRsYXN0PWxhc3Q7IHRyYWNrQnk6IFRyYWNrQnlGbjtcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2aWJvcl9fc2VsZWN0aW9uXCI+XG4gICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJTZWxlY3RlZFRlbXBsYXRlOyBjb250ZXh0OiB7aXRlbTogaXRlbX1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgPGEgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9yZW1vdmVcIiAqbmdJZj1cImFsbG93UmVzZXQgJiYgIWRpc2FibGVkXCIgKGNsaWNrKT1cIiFkaXNhYmxlZCAmJiByZW1vdmVPbmUoJGluZGV4LCAkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCI+XG4gICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPVwiIzJjMmMyY1wiIGQ9XCJNMTAuMSA0LjVMOCA2LjYgNS45IDQuNSA0LjUgNS45IDYuNiA4bC0yLjEgMi4xIDEuNCAxLjRMOCA5LjRsMi4xIDIuMSAxLjQtMS40TDkuNCA4bDIuMS0yLjF6XCIvPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtIHNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2lucHV0XCIgW2NsYXNzLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2hpZGVdPVwiSW5wdXRIaWRlXCI+XG4gICAgICAgIDxpbnB1dCBhdXRvY29tcGxldGU9XCJvZmZcIiAjaW5wdXRDb250cm9sPVwibmdNb2RlbFwiIFtuYW1lXT1cIm5hbWVcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbKG5nTW9kZWwpXT1cInF1ZXJ5XCIgW3BsYWNlaG9sZGVyXT1cIm91dHB1dC5sZW5ndGggPT0gMCB8fCAobXVsdGlwbGUgJiYgb3V0cHV0Lmxlbmd0aCA8IG11bHRpcGxlTGltaXQpID8gcGxhY2Vob2xkZXIgOiAnJ1wiXG4gICAgICAgICAgKGlucHV0KT1cInVwZGF0ZU9wdGlvbnNJbkRlbGF5KClcIiAoa2V5ZG93bik9XCJrZXlEb3duKCRldmVudClcIiAvPlxuICAgICAgPC9saT5cbiAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtIHNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2xvYWRlci1jZW50ZXJcIiBbaGlkZGVuXT1cIiFkYXRhTGlzdFN1YiB8fCBkYXRhTGlzdFN1Yi5jbG9zZWRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2xvYWRlclwiPjwvZGl2PlxuICAgICAgPC9saT5cblxuICAgICAgPHNwYW4gY2xhc3M9XCJhcnJvd1wiIChjbGljayk9XCJ0b2dnbGVEcm9wZG93bigkZXZlbnQpXCI+XG4gICAgICA8L3NwYW4+XG4gICAgPC91bD5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cInNlbGVjdC1kcm9wZG93blwiICpuZ0lmPVwiaXNPcGVuXCI+XG4gICAgPHVsIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwXCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIURyb3Bkb3duVGVtcGxhdGU7IGVsc2UgZHJvcGRvd25UXCI+XG4gICAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb25cIiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIE9wdGlvbnM7IGxldCBpPWluZGV4XCIgKG1vdXNlZG93bik9XCJzZWxlY3RPbmUoJGV2ZW50LCBvcHRpb24pXCJcbiAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cImkgPT09IHNlbGVjdG9yUG9zaXRpb25cIiBbaW5uZXJIVE1MXT1cImdldERyb3Bkb3duRm9ybWF0dGVkKG9wdGlvbilcIj5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8bmctdGVtcGxhdGUgI2Ryb3Bkb3duVD5cbiAgICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvblwiICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgT3B0aW9uczsgbGV0IGk9aW5kZXhcIiAobW91c2Vkb3duKT1cInNlbGVjdE9uZSgkZXZlbnQsIG9wdGlvbilcIlxuICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaSA9PT0gc2VsZWN0b3JQb3NpdGlvblwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJEcm9wZG93blRlbXBsYXRlOyBjb250ZXh0OiB7aXRlbTogb3B0aW9ufVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2xpPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvbiBsb2FkaW5nXCIgKm5nSWY9XCJkYXRhTGlzdFN1YiAmJiAhZGF0YUxpc3RTdWIuY2xvc2VkXCI+XG4gICAgICAgIMOQwpfDkMKww5DCs8ORwoDDkcKDw5DCt8OQwrrDkMKwXG4gICAgICA8L2xpPlxuICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvbiBsb2FkZXJcIiAobW91c2Vkb3duKT1cIkFkZE5ld09iamVjdChDcmVhdGVOZXcocXVlcnkpKTtcIiBbY2xhc3MuYWN0aXZlXT1cInNlbGVjdG9yUG9zaXRpb24gPT09IE9wdGlvbnMubGVuZ3RoXCJcbiAgICAgICAgKm5nSWY9XCJTaG93TmV3XCI+XG5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNyZWF0ZVRlbXBsYXRlOyBlbHNlIHRlbXBsYXRlV2l0aE1lc3NhZ2VcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY3JlYXRlVGVtcGxhdGUudGVtcGxhdGVSZWY7IGNvbnRleHQ6IHtxdWVyeTogcXVlcnl9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjdGVtcGxhdGVXaXRoTWVzc2FnZT5cbiAgICAgICAgICB7eyBuZXdNZXNzYWdlIH19XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8L2xpPlxuICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvbiBsb2FkZXJcIiAqbmdJZj1cIlNob3dFbXB0eVwiPlxuICAgICAgICDDkMKfw5HCg8ORwoHDkcKCw5DCvlxuICAgICAgPC9saT5cbiAgICA8L3VsPlxuICAgIDxkaXYgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tcGFnZXJcIiAqbmdJZj1cImN1cnJlbnRDYWNoZSAmJiBjdXJyZW50Q2FjaGUuY291bnRQYWdlcyA+IDFcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tcGFnZXItcGFnZVwiPlxuICAgICAgICB7eyBjdXJyZW50Q2FjaGUuY3VycmVudFBhZ2UgfCBudW1iZXIgfX0gLyB7eyBjdXJyZW50Q2FjaGUuY291bnRQYWdlcyB8IG51bWJlciB9fVxuICAgICAgPC9kaXY+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLXBhZ2VyLWxvYWRtb3JlXCIgKm5nSWY9XCJjdXJyZW50Q2FjaGUuY291bnRQYWdlcyA+IDEgJiYgY3VycmVudENhY2hlLmN1cnJlbnRQYWdlIDwgY3VycmVudENhY2hlLmNvdW50UGFnZXNcIlxuICAgICAgICAobW91c2Vkb3duKT1cIm5leHRQYWdlKCRldmVudClcIj5cbiAgICAgICAgw5DCl8OQwrDDkMKzw5HCgMORwoPDkMK3w5DCuMORwoLDkcKMIMOQwrXDkcKJw5HCkVxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLnZpYm9yIGEsLnZpYm9yIGxhYmVsLC52aWJvciBsZWdlbmQsLnZpYm9yIHAsLnZpYm9yIHNwYW4sLnZpYm9yIHVse21hcmdpbjowO3BhZGRpbmc6MDtib3JkZXI6MH0udmlib3IgYSwudmlib3IgYnV0dG9uLC52aWJvciBpbnB1dHtvdXRsaW5lOjB9LnZpYm9yIG9sLC52aWJvciB1bHtsaXN0LXN0eWxlOm5vbmV9LnZpYm9yIGlucHV0e3BhZGRpbmc6MDttYXJnaW46MDtib3JkZXI6MDtmb250OmluaGVyaXR9LnZpYm9yIGJ7Zm9udC13ZWlnaHQ6NDAwfS52aWJvcntwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmJsb2NrO2JvcmRlcjoxcHggc29saWQgI2Q1ZDlkZTtib3JkZXItcmFkaXVzOjNweDtmb250LWZhbWlseTotYXBwbGUtc3lzdGVtLEJsaW5rTWFjU3lzdGVtRm9udCxcIlNlZ29lIFVJXCIsUm9ib3RvLEhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmLFwiQXBwbGUgQ29sb3IgRW1vamlcIixcIlNlZ29lIFVJIEVtb2ppXCIsXCJTZWdvZSBVSSBTeW1ib2xcIjtmb250LXNpemU6MTRweDtsaW5lLWhlaWdodDoxOHB4O2JhY2tncm91bmQtY29sb3I6I2ZmZjt0cmFuc2l0aW9uOmJveC1zaGFkb3cgLjE1cyBsaW5lYXJ9LnZpYm9yOmhvdmVyOm5vdChbZGlzYWJsZWRdKSwudmlib3I6aG92ZXI6bm90KFtkaXNhYmxlZF0pIC5zZWxlY3QtZHJvcGRvd257Ym94LXNoYWRvdzowIDNweCA2cHggMCByZ2JhKDQ0LDQ0LDQ0LC4xKX0udmlib3JbZGlzYWJsZWRde29wYWNpdHk6LjU7cG9pbnRlci1ldmVudHM6bm9uZTtiYWNrZ3JvdW5kLWNvbG9yOiNmNGY0ZjR9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoe3Bvc2l0aW9uOnJlbGF0aXZlO3BhZGRpbmctcmlnaHQ6NDBweH0udmlib3IgLnNlbGVjdC1zZWFyY2ggLmFycm93e2NvbnRlbnQ6XCJcIjtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDoxNXB4O3RvcDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKTtkaXNwbGF5OmJsb2NrO3dpZHRoOjE2cHg7aGVpZ2h0OjE2cHg7YmFja2dyb3VuZC1pbWFnZTp1cmwoZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCamJHRnpjejBpYm1NdGFXTnZiaUJuYkhsd2FDSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklpQjNhV1IwYUQwaU1UWWlJR2hsYVdkb2REMGlNVFlpSUhacFpYZENiM2c5SWpBZ01DQXhOaUF4TmlJK0RRb2dJRHh3WVhSb0lHWnBiR3c5SWlNeVl6SmpNbU1pSUdROUlrMDRJREV4TGpSTU1pNDJJRFlnTkNBMExqWnNOQ0EwSURRdE5Fd3hNeTQwSURZaUx6NE5Dand2YzNablBnMEspO3RyYW5zaXRpb246LXdlYmtpdC10cmFuc2Zvcm0gLjE1cyBlYXNlLWluLW91dDt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMTVzIGVhc2UtaW4tb3V0O3RyYW5zaXRpb246dHJhbnNmb3JtIC4xNXMgZWFzZS1pbi1vdXQsLXdlYmtpdC10cmFuc2Zvcm0gLjE1cyBlYXNlLWluLW91dH0udmlib3IgLnNlbGVjdC1zZWFyY2ggLmFycm93OmJlZm9yZSwudmlib3IgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2hpZGV7ZGlzcGxheTpub25lfS52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fc2VsZWN0aW9ue3Bvc2l0aW9uOnJlbGF0aXZlfS52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fc2VsZWN0aW9uPmRpdntkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO3BhZGRpbmc6MCAxNXB4fS52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faW5wdXQgaW5wdXR7d2lkdGg6MTAwJTtwYWRkaW5nOjAgMTVweDt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2ZvbnQtc2l6ZToxNHB4O2NvbG9yOiMyYzJjMmM7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudH0udmlib3IgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2lucHV0IGlucHV0Ojotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVye2NvbG9yOnJnYmEoNDQsNDQsNDQsLjIpfS52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faW5wdXQgaW5wdXQ6LW1zLWlucHV0LXBsYWNlaG9sZGVye2NvbG9yOnJnYmEoNDQsNDQsNDQsLjIpfS52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faW5wdXQgaW5wdXQ6Oi1tcy1pbnB1dC1wbGFjZWhvbGRlcntjb2xvcjpyZ2JhKDQ0LDQ0LDQ0LC4yKX0udmlib3IgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2lucHV0IGlucHV0OjpwbGFjZWhvbGRlcntjb2xvcjpyZ2JhKDQ0LDQ0LDQ0LC4yKX0udmlib3IgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX3JlbW92ZXtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7d2lkdGg6MTZweDtoZWlnaHQ6MTZweDttYXJnaW4tbGVmdDo1cHg7Ym9yZGVyLXJhZGl1czo1MCU7YmFja2dyb3VuZC1jb2xvcjojYmFiYWJhO2N1cnNvcjpwb2ludGVyO3RyYW5zaXRpb246YmFja2dyb3VuZC1jb2xvciAuMTVzIGxpbmVhcn0udmlib3IgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX3JlbW92ZTpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiM5NDk0OTR9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9sb2FkZXItY2VudGVye3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjEycHg7dG9wOjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpO2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjt3aWR0aDoyMXB4O2hlaWdodDoyMXB4O2JhY2tncm91bmQ6I2ZmZjt6LWluZGV4OjJ9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9sb2FkZXItY2VudGVyW2hpZGRlbl17ZGlzcGxheTpub25lfS52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fbG9hZGVyLWNlbnRlciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fbG9hZGVye3dpZHRoOjE2cHg7aGVpZ2h0OjE2cHg7Ym94LXNpemluZzpib3JkZXItYm94O2JvcmRlci13aWR0aDoycHg7Ym9yZGVyLXN0eWxlOnNvbGlkO2JvcmRlci1jb2xvcjojMjIyNzJlIHJnYmEoMzQsMzksNDYsLjQpIHJnYmEoMzQsMzksNDYsLjQpO2JvcmRlci1yYWRpdXM6MTAwJTstd2Via2l0LWFuaW1hdGlvbjouNDVzIGxpbmVhciBpbmZpbml0ZSBjbG9ja3dpc2U7YW5pbWF0aW9uOi40NXMgbGluZWFyIGluZmluaXRlIGNsb2Nrd2lzZX0udmlib3IgLnNlbGVjdC1kcm9wZG93bntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MTAwJTtsZWZ0Oi0xcHg7cmlnaHQ6LTFweDtib3JkZXI6MXB4IHNvbGlkICNkNWQ5ZGU7Ym9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czo1cHg7Ym9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6NXB4O2JvcmRlci10b3A6MDtiYWNrZ3JvdW5kOiNmZmY7b3ZlcmZsb3c6aGlkZGVuO3otaW5kZXg6Mn0udmlib3IgLnNlbGVjdC1kcm9wZG93bi1vcHRncm91cHttYXgtaGVpZ2h0OjMwMHB4O292ZXJmbG93LXk6YXV0b30udmlib3IgLnNlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb257bWluLWhlaWdodDozMHB4O3BhZGRpbmc6MTBweCAxNXB4O2NvbG9yOiMyYzJjMmN9LnZpYm9yIC5zZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXAtb3B0aW9uOmhvdmVye2JhY2tncm91bmQtY29sb3I6cmdiYSg2NiwxMzIsMjE1LC4xKX0udmlib3IgLnNlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb24ubG9hZGluZ3tmb250LXNpemU6MTZweDtsaW5lLWhlaWdodDoxOHB4O3RleHQtYWxpZ246Y2VudGVyO2NvbG9yOiM4YjhiODN9LnZpYm9yIC5zZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXAtb3B0aW9uLmxvYWRlcnt0ZXh0LWFsaWduOmNlbnRlcjtjb2xvcjojOGI4YjgzfS52aWJvciAuc2VsZWN0LWRyb3Bkb3duLXBhZ2Vye3BhZGRpbmc6MTBweDt0ZXh0LWFsaWduOmNlbnRlcjtib3JkZXItdG9wOjFweCBkYXNoZWQgI2Q1ZDlkZX0udmlib3IgLnNlbGVjdC1kcm9wZG93bi1wYWdlci1wYWdle2ZvbnQtc2l6ZToxMnB4O2NvbG9yOiM4YjhiODN9LnZpYm9yIC5zZWxlY3QtZHJvcGRvd24tcGFnZXItbG9hZG1vcmV7Ym9yZGVyOjA7YmFja2dyb3VuZDowIDA7Ym94LXNoYWRvdzpub25lO2NvbG9yOiM4YjhiODM7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlfS52aWJvciAuc2VsZWN0LWRyb3Bkb3duLXBhZ2VyLXBhZ2UrLnNlbGVjdC1kcm9wZG93bi1wYWdlci1sb2FkbW9yZXttYXJnaW4tdG9wOjEwcHh9LnZpYm9yLm9wZW4tdmlib3J7Ym9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czowO2JvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOjB9LnZpYm9yLm9wZW4tdmlib3IgLnNlbGVjdC1zZWFyY2ggLmFycm93ey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSkgcm90YXRlKDE4MGRlZyk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSkgcm90YXRlKDE4MGRlZyl9LnZpYm9yOm5vdCgubXVsdGlwbGUpIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9yZW1vdmV7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MDt0b3A6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSl9LnZpYm9yLm11bHRpcGxlIC5zZWxlY3Qtc2VhcmNoe3BhZGRpbmc6NXB4IDQwcHggNXB4IDE1cHh9LnZpYm9yLm11bHRpcGxlIC5zZWxlY3Qtc2VhcmNoLWxpc3R7ZGlzcGxheTpmbGV4O2ZsZXgtZmxvdzpyb3cgd3JhcDttYXJnaW46LTVweH0udmlib3IubXVsdGlwbGUgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVte3BhZGRpbmc6NXB4fS52aWJvci5tdWx0aXBsZSAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faW5wdXR7ZmxleDoxfS52aWJvci5tdWx0aXBsZSAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faW5wdXQgaW5wdXR7aGVpZ2h0OjI4cHg7cGFkZGluZzowfS52aWJvci5tdWx0aXBsZSAudmlib3JfX3NlbGVjdGlvbntkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2hlaWdodDoyOHB4O3BhZGRpbmc6MCA3cHg7Ym9yZGVyLXJhZGl1czozcHg7Zm9udC1zaXplOjE0cHg7YmFja2dyb3VuZDojZTVlNWU3O2NvbG9yOiMyYzJjMmN9LnZpYm9yOm5vdCgubXVsdGlwbGUpIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9pbnB1dCBpbnB1dCwudmlib3I6bm90KC5tdWx0aXBsZSkgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX3NlbGVjdGlvbj5kaXZ7bWluLWhlaWdodDozOHB4fUAtd2Via2l0LWtleWZyYW1lcyBjbG9ja3dpc2V7dG97LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDM2MGRlZykgdHJhbnNsYXRleigwKTt0cmFuc2Zvcm06cm90YXRlKDM2MGRlZykgdHJhbnNsYXRleigwKX19QGtleWZyYW1lcyBjbG9ja3dpc2V7dG97LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDM2MGRlZykgdHJhbnNsYXRleigwKTt0cmFuc2Zvcm06cm90YXRlKDM2MGRlZykgdHJhbnNsYXRleigwKX19YF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHByb3ZpZGVyczogW3tcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ1ZpYm9yQ29tcG9uZW50KSxcbiAgICBtdWx0aTogdHJ1ZVxuICB9XVxufSlcbmV4cG9ydCBjbGFzcyBOZ1ZpYm9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgLy8gTG9jYWwgVmFyaWFibGVcbiAgcHVibGljIF9tb2RlbDogYW55O1xuXG4gIHByaXZhdGUgZmlyc3RMb2FkID0gZmFsc2U7XG4gIHByaXZhdGUgb3B0aW9uczogQXJyYXk8YW55PjtcbiAgcHVibGljIG91dHB1dDogQXJyYXk8YW55PjtcblxuICBwdWJsaWMgaXNPcGVuOiBib29sZWFuO1xuXG4gIHByaXZhdGUgb2xkUXVlcnk6IHN0cmluZztcbiAgcHVibGljIHF1ZXJ5OiBzdHJpbmc7XG5cbiAgcHVibGljIHNlbGVjdG9yUG9zaXRpb24gPSAwO1xuICBwcml2YXRlIHdhaXRUaW1lID0gNTAwO1xuXG4gIHByaXZhdGUgZWw6IEVsZW1lbnQ7ICAgICAgICAgICAvLyB0aGlzIGNvbXBvbmVudCAgZWxlbWVudCBgPHZpYm9yPmBcbiAgcHJpdmF0ZSBpbnB1dEVsOiBIVE1MSW5wdXRFbGVtZW50OyAvLyBgPGlucHV0PmAgZWxlbWVudCBpbiBgPHZpYm9yPmAgZm9yIGF1dG8gY29tcGxldGVcbiAgQFZpZXdDaGlsZCgnaW5wdXRDb250cm9sJykgcHVibGljIGlucHV0Q29udHJvbDogTmdNb2RlbDtcblxuICAvLyBJbnB1dHMgJiBPdXRwdXRzXG4gIEBJbnB1dCgpIHB1YmxpYyBtdWx0aXBsZSA9IGZhbHNlO1xuICBASW5wdXQoKSBwdWJsaWMgbXVsdGlwbGVMaW1pdCA9IEluZmluaXR5O1xuICBASW5wdXQoKSBwdWJsaWMgY291bnRPblBhZ2UgPSAxMDtcblxuICBASW5wdXQoKSBwdWJsaWMgcGxhY2Vob2xkZXIgPSAnVmlib3InO1xuICBASW5wdXQoKSBwdWJsaWMgbmFtZTogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgcmVxdWlyZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgcHVibGljIGFsbG93UmVzZXQgPSB0cnVlO1xuICBwdWJsaWMgZGlzYWJsZWQgPSBmYWxzZTtcblxuICAvLyDDkMKew5HCgsOQwr7DkMKxw5HCgMOQwrDDkMK2w5DCtcOQwr3DkMK4w5DCtSDDkcKBw5DCv8OQwrjDkcKBw5DCusOQwr7DkMKyXG4gIEBDb250ZW50Q2hpbGQoVmlib3JCb3RoRGlyZWN0aXZlKSBwdWJsaWMgYm90aFRlbXBsYXRlOiBWaWJvckJvdGhEaXJlY3RpdmU7XG4gIEBDb250ZW50Q2hpbGQoVmlib3JEcm9wZG93bkRpcmVjdGl2ZSkgcHVibGljIGRyb3Bkb3duVGVtcGxhdGU6IFZpYm9yRHJvcGRvd25EaXJlY3RpdmU7XG4gIEBDb250ZW50Q2hpbGQoVmlib3JTZWxlY3RlZERpcmVjdGl2ZSkgcHVibGljIHNlbGVjdGVkVGVtcGxhdGU6IFZpYm9yU2VsZWN0ZWREaXJlY3RpdmU7XG4gIEBDb250ZW50Q2hpbGQoVmlib3JDcmVhdGVEaXJlY3RpdmUpIHB1YmxpYyBjcmVhdGVUZW1wbGF0ZTogVmlib3JDcmVhdGVEaXJlY3RpdmU7XG4gIEBJbnB1dCgpIHB1YmxpYyBsaXN0Rm9ybWF0dGVyOiAoYXJnOiBhbnksIHZhbHVlOiBzdHJpbmcpID0+IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIGRyb3Bkb3duRm9ybWF0dGVyOiAoYXJnOiBhbnksIHZhbHVlOiBzdHJpbmcpID0+IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIHZpZXdQcm9wZXJ0eSA9ICdOYW1lJzsgIC8vIMOQwp/DkMK+w5DCu8OQwrUgw5DCtMOQwrvDkcKPIMOQwrTDkMK1w5HChMOQwr7DkMK7w5HCgsOQwr3DkMK+w5DCs8OQwr4gw5DCvsORwoLDkMK+w5DCscORwoDDkMKww5DCtsOQwrXDkMK9w5DCuMORwo9cblxuICBASW5wdXQoKSBwdWJsaWMgbW9kZWxQcm9wZXJ0eSA9ICdpZCc7ICAvLyDDkMKiw5DCviwgw5HCh8ORwoLDkMK+IMOQwrfDkMKww5DCv8OQwrjDkcKBw5HCi8OQwrLDkMKww5DCtcORwoLDkcKBw5HCjyDDkMKyIMOQwpzDkMK+w5DCtMOQwrXDkMK7w5HCjFxuICBASW5wdXQoKSBwdWJsaWMgcHJlbG9hZFByb3BlcnR5ID0gJ2lkcyc7IC8vIMOQwprDkMK7w5HCjsORwocgw5DCt8OQwrDDkMK/w5HCgMOQwr7DkcKBw5DCsCDDkMK6IMORwoHDkMK1w5HCgMOQwrLDkMK1w5HCgMORwoMgw5DCtMOQwrvDkcKPIMOQwr/DkcKAw5DCtcOQwrTDkMK3w5DCsMOQwrPDkcKAw5HCg8OQwrfDkMK6w5DCuCwgw5DCtcORwoHDkMK7w5DCuCB1bmRlZmluZWQgw5DCt8OQwrDDkMK/w5DCuMORwoHDkcKLw5DCssOQwrDDkMK1w5HCgsORwoHDkcKPIMOQwrLDkMK1w5HCgcORwowgw5DCvsOQwrHDkcKKw5DCtcOQwrrDkcKCXG4gIEBJbnB1dCgpIHB1YmxpYyBwcmVsb2FkRmllbGQ6IHN0cmluZyA9IHVuZGVmaW5lZDsgLy8gw5DCl8OQwr3DkMKww5HCh8OQwrXDkMK9w5DCuMOQwrUgw5DCv8OQwr7DkMK7w5HCjywgw5DCusOQwr7DkcKCw5DCvsORwoDDkMK1IMOQwr3DkMK1w5DCvsOQwrHDkcKFw5DCvsOQwrTDkMK4w5DCvMOQwr4gw5DCvsORwoLDkMK/w5HCgMOQwrDDkMKyw5DCuMORwoLDkcKMIMOQwrIgw5DCt8OQwrDDkMK/w5HCgMOQwr7DkcKBLlxuICBASW5wdXQoKSBwdWJsaWMgc2VhcmNoUHJvcGVydHkgPSAncXVlcnknO1xuXG4gIEBJbnB1dCgpIHB1YmxpYyBkYXRhTGlzdDogKChwYXJhbTogT2JqZWN0LCBwYWdlOiBudW1iZXIsIGNvdW50T25QYWdlPzogbnVtYmVyKSA9PiBPYnNlcnZhYmxlPElEYXRhUmVzcG9uc2U+KSB8IEFycmF5PGFueT47XG4gIEBJbnB1dCgpIHB1YmxpYyBleGNsdWRlTGlzdDogQXJyYXk8YW55PjtcbiAgQElucHV0KCkgcHVibGljIGFkZGl0aW9uYWxGaWx0ZXIgPSB7fTtcbiAgQElucHV0KCkgcHVibGljIG9ubHlFbWl0dGVyOiBib29sZWFuO1xuICBAT3V0cHV0KCdjaGFuZ2VGdWxsTW9kZWwnKSBwdWJsaWMgY2hhbmdlRnVsbE1vZGVsOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXG4gIEBJbnB1dCgpIHB1YmxpYyBuZXdNZXNzYWdlOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIHB1YmxpYyBDcmVhdGVOZXc6IChxdWVyeTogc3RyaW5nKSA9PiBPYnNlcnZhYmxlPGFueT4gfCBhbnkgPSAocXVlcnk6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiBxdWVyeTtcbiAgfVxuXG5cbiAgLy8gU3Vic2NyaXB0aW9uXG4gIHB1YmxpYyBkYXRhTGlzdFN1YjogU3Vic2NyaXB0aW9uO1xuXG5cbiAgLy8gT1BUSU9OU1xuICBwdWJsaWMgVHJhY2tCeUZuKGluZGV4OiBudW1iZXIpOiBhbnkge1xuICAgIHJldHVybiBpbmRleDtcbiAgfVxuXG4gIHB1YmxpYyBzaG93RHJvcGRvd25MaXN0KGV2ZW50OiBGb2N1c0V2ZW50IHwgTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm11bHRpcGxlICYmIHRoaXMub3V0cHV0Lmxlbmd0aCA+PSB0aGlzLm11bHRpcGxlTGltaXQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ29wZW4tdmlib3InKTtcbiAgICB0aGlzLmlucHV0RWwuZm9jdXMoKTtcbiAgICB0aGlzLnVwZGF0ZU9wdGlvbnMoKTtcbiAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBoaWRlRHJvcGRvd25MaXN0KCk6IHZvaWQge1xuICAgIHRoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZSgnb3Blbi12aWJvcicpO1xuICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgdGhpcy5pbnB1dEVsLmJsdXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBoaWRlRHJvcGRvd25MaXN0V2l0aERlbGF5KCk6IHZvaWQge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5oaWRlRHJvcGRvd25MaXN0KCk7XG4gICAgfSwgMTAwKTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVEcm9wZG93bihldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgIHRoaXMuaGlkZURyb3Bkb3duTGlzdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3dEcm9wZG93bkxpc3QodW5kZWZpbmVkKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRlbGF5OiBGdW5jdGlvbiA9IChmdW5jdGlvbiAoKTogRnVuY3Rpb24ge1xuICAgIGxldCB0aW1lciA9IDA7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjYWxsYmFjazogYW55LCBtczogbnVtYmVyKTogdm9pZCB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGNhbGxiYWNrLCBtcyk7XG4gICAgfTtcbiAgfSkoKTtcblxuICBwdWJsaWMgdXBkYXRlT3B0aW9ucygpOiB2b2lkIHtcbiAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgdGhpcy5vcHRpb25zID0gdGhpcy5kYXRhTGlzdC5maWx0ZXIoZGF0YSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5xdWVyeSB8fCB0aGlzLnF1ZXJ5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBmOiBhbnkgPSBmZXRjaEZyb21PYmplY3QoZGF0YSwgdGhpcy5zZWFyY2hQcm9wZXJ0eSk7XG4gICAgICAgIGlmIChmID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGYpLmluZGV4T2YodGhpcy5xdWVyeSkgPj0gMDtcbiAgICAgIH0pLmZpbHRlcihkYXRhID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmV4Y2x1ZGVMaXN0KSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZCA9IGZldGNoRnJvbU9iamVjdChkYXRhLCB0aGlzLm1vZGVsUHJvcGVydHkpLnZhbHVlT2YoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXhjbHVkZUxpc3QuZmluZEluZGV4KGV4ID0+IHtcbiAgICAgICAgICBsZXQgYSA9IGZldGNoRnJvbU9iamVjdChleCwgdGhpcy5tb2RlbFByb3BlcnR5KS52YWx1ZU9mKCk7XG4gICAgICAgICAgcmV0dXJuIGRlZXBFcXVhbChkLCBhKTtcbiAgICAgICAgfSkgPCAwO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIGlmICh0aGlzLmRhdGFMaXN0U3ViKSB7IHRoaXMuZGF0YUxpc3RTdWIudW5zdWJzY3JpYmUoKTsgfVxuICAgICAgaWYgKCF0aGlzLmN1cnJlbnRDYWNoZSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRDYWNoZSA9IHtcbiAgICAgICAgICBjb3VudEVsZW1lbnQ6IDAsXG4gICAgICAgICAgY291bnRQYWdlczogMSxcbiAgICAgICAgICBjdXJyZW50UGFnZTogMSxcbiAgICAgICAgICBvYmplY3RzOiBbXSxcbiAgICAgICAgICBxdWVyeTogdGhpcy5xdWVyeSxcbiAgICAgICAgICBwYXJhbXM6IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYWRkaXRpb25hbEZpbHRlcilcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jYWNoZUxhenlEYXRhLnB1c2godGhpcy5jdXJyZW50Q2FjaGUpO1xuXG4gICAgICAgIGxldCBwYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmFkZGl0aW9uYWxGaWx0ZXIpIGFzIGFueTtcbiAgICAgICAgcGFyYW1zW3RoaXMuc2VhcmNoUHJvcGVydHldID0gdGhpcy5xdWVyeTtcblxuICAgICAgICB0aGlzLmRhdGFMaXN0U3ViID0gKDxPYnNlcnZhYmxlPElEYXRhUmVzcG9uc2U+PnRoaXMuZGF0YUxpc3QocGFyYW1zLCAxLCB0aGlzLmNvdW50T25QYWdlKSkuc3Vic2NyaWJlKGFuc3dlciA9PiB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50Q2FjaGUub2JqZWN0cyA9IHRoaXMuY3VycmVudENhY2hlLm9iamVjdHMuY29uY2F0KGFuc3dlci5saXN0KTtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRDYWNoZS5jb3VudEVsZW1lbnQgPSBhbnN3ZXIuaGVhZGVyc1snY291bnQnXTtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRDYWNoZS5jb3VudFBhZ2VzID0gTWF0aC5jZWlsKHRoaXMuY3VycmVudENhY2hlLmNvdW50RWxlbWVudCAvIHRoaXMuY291bnRPblBhZ2UpO1xuICAgICAgICB9LCAoKSA9PiB7IH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVPcHRpb25zSW5EZWxheSgpOiB2b2lkIHtcbiAgICBsZXQgZGVsYXlNczogbnVtYmVyID0gdGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEFycmF5ID8gMTAgOiB0aGlzLndhaXRUaW1lO1xuXG4gICAgLy8gZXhlY3V0aW5nIGFmdGVyIHVzZXIgc3RvcHBlZCB0eXBpbmdcbiAgICB0aGlzLmRlbGF5KCgpID0+IHtcbiAgICAgIHRoaXMub2xkUXVlcnkgPSB0aGlzLnF1ZXJ5O1xuICAgICAgdGhpcy5jdXJyZW50Q2FjaGUgPSB0aGlzLkdldENhY2hlKHRoaXMucXVlcnkpO1xuICAgICAgdGhpcy51cGRhdGVPcHRpb25zKCk7XG4gICAgfSwgZGVsYXlNcyk7XG4gIH1cblxuICBwcml2YXRlIGZvY3VzU2VsZWN0ZWRPcHRpb24oKTogdm9pZCB7XG4gICAgbGV0IGxpc3Q6IGFueSA9IDxIVE1MRWxlbWVudD50aGlzLmVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NlbGVjdC1kcm9wZG93bicpWzBdO1xuICAgIGxldCB0YXJnZXRMaTogYW55ID0gPEhUTUxFbGVtZW50PnRoaXMuZWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvbicpW3RoaXMuc2VsZWN0b3JQb3NpdGlvbl07XG4gICAgc2Nyb2xsQWN0aXZlT3B0aW9uKGxpc3QsIHRhcmdldExpKTtcbiAgfVxuXG4gIHB1YmxpYyBrZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLk9wdGlvbnMpIHtcbiAgICAgIHRoaXMuc2hvd0Ryb3Bkb3duTGlzdCh1bmRlZmluZWQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCB0b3RhbE51bUl0ZW06IG51bWJlciA9IHRoaXMuT3B0aW9ucy5sZW5ndGg7XG5cbiAgICBpZiAodGhpcy5TaG93TmV3KSB7XG4gICAgICB0b3RhbE51bUl0ZW0rKztcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgIGNhc2UgMjc6IC8vIEVTQywgaGlkZSBhdXRvIGNvbXBsZXRlXG4gICAgICAgIHRoaXMuaGlkZURyb3Bkb3duTGlzdCgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAzODogLy8gVVAsIHNlbGVjdCB0aGUgcHJldmlvdXMgbGkgZWxcbiAgICAgICAgdGhpcy5zZWxlY3RvclBvc2l0aW9uID0gKHRvdGFsTnVtSXRlbSArIHRoaXMuc2VsZWN0b3JQb3NpdGlvbiAtIDEpICUgdG90YWxOdW1JdGVtO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSA0MDogLy8gRE9XTiwgc2VsZWN0IHRoZSBuZXh0IGxpIGVsIG9yIHRoZSBmaXJzdCBvbmVcbiAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLnNlbGVjdG9yUG9zaXRpb24gPSAodG90YWxOdW1JdGVtICsgdGhpcy5zZWxlY3RvclBvc2l0aW9uICsgMSkgJSB0b3RhbE51bUl0ZW07XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDEzOiAvLyBFTlRFUiwgY2hvb3NlIGl0ISFcbiAgICAgICAgaWYgKHRvdGFsTnVtSXRlbSA+IDApIHtcbiAgICAgICAgICBpZiAodGhpcy5zZWxlY3RvclBvc2l0aW9uID09PSB0aGlzLk9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLkFkZE5ld09iamVjdCh0aGlzLkNyZWF0ZU5ldyh0aGlzLnF1ZXJ5KSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0T25lKGV2ZW50LCB0aGlzLk9wdGlvbnNbdGhpcy5zZWxlY3RvclBvc2l0aW9uXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuU2hvd05ldykge1xuICAgICAgICAgIHRoaXMuQWRkTmV3T2JqZWN0KHRoaXMuQ3JlYXRlTmV3KHRoaXMucXVlcnkpKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDogYnJlYWs7XG4gICAgfVxuICAgIHRoaXMuZm9jdXNTZWxlY3RlZE9wdGlvbigpO1xuICB9XG5cbiAgcHVibGljIG5leHRQYWdlKCRldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIC8vIFZhbGlkYXRvcnNcbiAgICBpZiAoISh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgRnVuY3Rpb24pKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RhdGEgTGlzdCBtYXN0IGJlIEZ1bmN0aW9uJyk7XG4gICAgfVxuICAgIGlmICghdGhpcy5jdXJyZW50Q2FjaGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRm9yIG5leHQgcGFnZSBuZWVkIGNhY2hlIGZvciBmaXJzdCBQYWdlJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmN1cnJlbnRDYWNoZS5jdXJyZW50UGFnZSA+PSB0aGlzLmN1cnJlbnRDYWNoZS5jb3VudFBhZ2VzKSB7IHRocm93IG5ldyBFcnJvcignTWF4IFBhZ2UgTGltaXQnKTsgfVxuXG4gICAgaWYgKHRoaXMuZGF0YUxpc3RTdWIpIHsgdGhpcy5kYXRhTGlzdFN1Yi51bnN1YnNjcmliZSgpOyB9XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmFkZGl0aW9uYWxGaWx0ZXIpO1xuICAgIHBhcmFtc1t0aGlzLnNlYXJjaFByb3BlcnR5XSA9IHRoaXMucXVlcnk7XG5cbiAgICB0aGlzLmRhdGFMaXN0U3ViID0gdGhpcy5kYXRhTGlzdChwYXJhbXMsIHRoaXMuY3VycmVudENhY2hlLmN1cnJlbnRQYWdlICsgMSwgdGhpcy5jb3VudE9uUGFnZSkuc3Vic2NyaWJlKGFuc3dlciA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRDYWNoZS5jdXJyZW50UGFnZSsrO1xuICAgICAgdGhpcy5jdXJyZW50Q2FjaGUuY291bnRFbGVtZW50ID0gYW5zd2VyLmhlYWRlcnNbJ2NvdW50J107XG4gICAgICB0aGlzLmN1cnJlbnRDYWNoZS5jb3VudFBhZ2VzID0gTWF0aC5jZWlsKHRoaXMuY3VycmVudENhY2hlLmNvdW50RWxlbWVudCAvIHRoaXMuY291bnRPblBhZ2UpO1xuICAgICAgdGhpcy5jdXJyZW50Q2FjaGUub2JqZWN0cyA9IHRoaXMuY3VycmVudENhY2hlLm9iamVjdHMuY29uY2F0KGFuc3dlci5saXN0KTtcbiAgICAgIHRoaXMuc2VsZWN0b3JQb3NpdGlvbiA9ICh0aGlzLmN1cnJlbnRDYWNoZS5jdXJyZW50UGFnZSAtIDEpICogdGhpcy5jb3VudE9uUGFnZSArIDE7XG4gICAgICB0aGlzLmZvY3VzU2VsZWN0ZWRPcHRpb24oKTtcbiAgICB9LCAoKSA9PiB7IH0pO1xuICB9XG5cbiAgLy8gTU9ERUxcbiAgcHJpdmF0ZSBjbGVhclByb3BlcnR5KCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0b3JQb3NpdGlvbiA9IDA7XG4gICAgdGhpcy5xdWVyeSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RPbmUoJGV2ZW50OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCwgZGF0YTogYW55KTogdm9pZCB7XG4gICAgLy8gw5DCpMOQwrjDkMK7w5HCjMORwoLDkcKAIMOQwr3DkMK1w5DCvcORwoPDkMK2w5DCvcORwovDkcKFIMORwoHDkMK+w5DCscORwovDkcKCw5DCuMOQwrlcbiAgICBpZiAoJGV2ZW50IGluc3RhbmNlb2YgTW91c2VFdmVudCAmJiAkZXZlbnQuYnV0dG9uICE9PSAwKSB7IHJldHVybjsgfVxuXG4gICAgaWYgKHRoaXMubXVsdGlwbGUgJiYgdGhpcy5vdXRwdXQubGVuZ3RoIDwgdGhpcy5tdWx0aXBsZUxpbWl0KSB7XG4gICAgICB0aGlzLm91dHB1dC5wdXNoKGRhdGEpO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMubXVsdGlwbGUpIHtcbiAgICAgIHRoaXMub3V0cHV0ID0gW2RhdGFdO1xuICAgIH1cbiAgICB0aGlzLmNoYW5nZUZ1bGxNb2RlbC5lbWl0KHRoaXMub3V0cHV0KTtcbiAgICB0aGlzLk1vZGVsID0gdGhpcy5WYWx1ZUZyb21PdXRwdXQ7XG4gICAgdGhpcy5jbGVhclByb3BlcnR5KCk7XG4gICAgdGhpcy5oaWRlRHJvcGRvd25MaXN0KCk7XG4gICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH07XG5cbiAgcHVibGljIHJlbW92ZU9uZShpbmRleDogbnVtYmVyLCBldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuXG4gICAgdGhpcy5vdXRwdXQuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLk1vZGVsID0gdGhpcy5WYWx1ZUZyb21PdXRwdXQ7XG5cbiAgICAvLyBzZXQgY2xhc3NcbiAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgIHRoaXMuaW5wdXRDb250cm9sLmNvbnRyb2wubWFya0FzVG91Y2hlZCgpO1xuXG4gICAgLy8gb3BlbiBkcm9wZG93blxuICAgIGlmICh0aGlzLnJlcXVpcmVkKSB7XG4gICAgICB0aGlzLnNob3dEcm9wZG93bkxpc3QodW5kZWZpbmVkKTtcbiAgICB9XG4gIH1cblxuICAvLyBGT1JNQVRUSU5HXG5cbiAgcHVibGljIGdldCBTZWxlY3RlZFRlbXBsYXRlKCk6IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgIGlmICh0aGlzLnNlbGVjdGVkVGVtcGxhdGUpIHtcbiAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkVGVtcGxhdGUudGVtcGxhdGVSZWY7XG4gICAgfSBlbHNlIGlmICh0aGlzLmJvdGhUZW1wbGF0ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuYm90aFRlbXBsYXRlLnRlbXBsYXRlUmVmO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHVibGljIGdldCBEcm9wZG93blRlbXBsYXRlKCk6IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgIGlmICh0aGlzLmRyb3Bkb3duVGVtcGxhdGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmRyb3Bkb3duVGVtcGxhdGUudGVtcGxhdGVSZWY7XG4gICAgfSBlbHNlIGlmICh0aGlzLmJvdGhUZW1wbGF0ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuYm90aFRlbXBsYXRlLnRlbXBsYXRlUmVmO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHVibGljIGdldExpc3RGb3JtYXR0ZWQoZGF0YTogYW55KTogc3RyaW5nIHtcbiAgICBsZXQgZm9ybWF0dGVyOiBhbnkgPSB0aGlzLmxpc3RGb3JtYXR0ZXIgfHwgZGVmYXVsdEZvcm1hdHRlcjtcbiAgICByZXR1cm4gZm9ybWF0dGVyLmFwcGx5KHRoaXMsIFtkYXRhLCB0aGlzLnZpZXdQcm9wZXJ0eV0pO1xuICB9XG5cbiAgcHVibGljIGdldERyb3Bkb3duRm9ybWF0dGVkKGRhdGE6IGFueSk6IHN0cmluZyB7XG4gICAgbGV0IGZvcm1hdHRlcjogYW55ID0gdGhpcy5kcm9wZG93bkZvcm1hdHRlciB8fCBkZWZhdWx0Rm9ybWF0dGVyO1xuICAgIHJldHVybiBmb3JtYXR0ZXIuYXBwbHkodGhpcywgW2RhdGEsIHRoaXMudmlld1Byb3BlcnR5XSk7XG4gIH1cblxuICAvLyBJTklUXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAvLyB0aGlzLk1vZGVsID0gdGhpcy5WYWx1ZUZyb21PdXRwdXQ7IMOQwq3DkcKCw5DCviDDkMKyw5HCgMOQwr7DkMK0w5DCtSDDkcKCw5HCg8ORwoIgw5HCgsOQwr7DkMK2w5DCtSDDkcKDw5DCtsOQwrUgw5DCvcOQwrUgw5DCvcOQwrDDkMK0w5DCvi5cbiAgICB0aGlzLmVsID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndmlib3InKS5pdGVtKDApO1xuICAgIGlmICh0aGlzLm11bHRpcGxlKSB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ211bHRpcGxlJyk7XG4gICAgaWYgKHRoaXMucmVxdWlyZWQpIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCgncmVxdWlyZWQnKTtcblxuICAgIHRoaXMuaW5wdXRFbCA9IDxIVE1MSW5wdXRFbGVtZW50Pih0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykpO1xuICB9XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKGlucHV0czogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChpbnB1dHNbJ2RhdGFMaXN0J10gJiYgaW5wdXRzWydkYXRhTGlzdCddLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgLy8gT3V0cHV0XG4gICAgICBpZiAodGhpcy5Nb2RlbCA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuTW9kZWwgPT0gbnVsbCkge1xuICAgICAgICB0aGlzLm91dHB1dCA9IFtdO1xuICAgICAgICB0aGlzLmNoYW5nZUZ1bGxNb2RlbC5lbWl0KHRoaXMub3V0cHV0KTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5Nb2RlbCBpbnN0YW5jZW9mIEFycmF5ICYmIHRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgdGhpcy5PdXRwdXQgPSB0aGlzLk1vZGVsO1xuICAgICAgfSBlbHNlIGlmICghKHRoaXMuTW9kZWwgaW5zdGFuY2VvZiBBcnJheSkgJiYgIXRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgdGhpcy5PdXRwdXQgPSBbdGhpcy5Nb2RlbF07XG5cbiAgICAgICAgaWYgKCF0aGlzLm91dHB1dCB8fCAhdGhpcy5vdXRwdXQubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5Nb2RlbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmVsICYmIGlucHV0c1snbXVsdGlwbGUnXSkge1xuICAgICAgaWYgKGlucHV0c1snbXVsdGlwbGUnXS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCdtdWx0aXBsZScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCdtdWx0aXBsZScpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmVsICYmIGlucHV0c1sncmVxdWlyZWQnXSkge1xuICAgICAgaWYgKGlucHV0c1sncmVxdWlyZWQnXS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCdyZXF1aXJlZCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCdyZXF1aXJlZCcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpbnB1dHNbJ2FkZGl0aW9uYWxGaWx0ZXInXSkge1xuICAgICAgdGhpcy5jdXJyZW50Q2FjaGUgPSB0aGlzLkdldENhY2hlKHRoaXMucXVlcnkpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRGl2RWxlbWVudD4pIHtcbiAgICB0aGlzLm91dHB1dCA9IFtdO1xuICB9XG5cbiAgLy8gRk9STVNcbiAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIC8vIMOQwp3DkMK+w5HCgMOQwrzDkMKww5DCu8ORwozDkMK9w5HCi8OQwrkgdXBkYXRlIMOQwrzDkMK+w5DCtMOQwrXDkMK7w5DCuFxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgaWYgKCh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5ICYmICF0aGlzLm11bHRpcGxlKSB8fCAoISh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSAmJiB0aGlzLm11bHRpcGxlKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01vZGVsIFR5cGUgRXJyb3InKTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5ICYmIHRoaXMuTW9kZWwgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBpZiAodmFsdWUubGVuZ3RoID09PSB0aGlzLk1vZGVsLmxlbmd0aCAmJiB2YWx1ZS5ldmVyeSh2ID0+IHRoaXMuTW9kZWwuaW5kZXhPZih2KSA+PSAwKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0aGlzLk1vZGVsID09PSB2YWx1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmZpcnN0TG9hZCA9IHRydWU7XG4gICAgICB0aGlzLk1vZGVsID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9uQ2hhbmdlOiBhbnkgPSAoKSA9PiB7IH07XG4gIHB1YmxpYyBvblRvdWNoZWQ6IGFueSA9ICgpID0+IHsgfTtcblxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHB1YmxpYyBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICBpZiAoaXNEaXNhYmxlZCkge1xuICAgICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWwucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgIH1cbiAgICAvLyBkaXNhYmxlIG90aGVyIGNvbXBvbmVudHMgaGVyZVxuICB9XG5cbiAgc2V0IE1vZGVsKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodGhpcy5vbmx5RW1pdHRlcikge1xuICAgICAgdGhpcy5vdXRwdXQgPSBbXTtcbiAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIE91dHB1dFxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICAgIHRoaXMub3V0cHV0ID0gW107XG4gICAgICB0aGlzLmNoYW5nZUZ1bGxNb2RlbC5lbWl0KHRoaXMub3V0cHV0KTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkgJiYgdGhpcy5tdWx0aXBsZSkge1xuICAgICAgdGhpcy5PdXRwdXQgPSB2YWx1ZTtcbiAgICB9IGVsc2UgaWYgKCEodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkgJiYgIXRoaXMubXVsdGlwbGUpIHtcbiAgICAgIHRoaXMuT3V0cHV0ID0gW3ZhbHVlXTtcbiAgICB9XG5cbiAgICAvLyBNb2RlbFxuICAgIHRoaXMuX21vZGVsID0gdmFsdWU7XG5cbiAgICAvLyBGb3Jtc1xuICAgIHRoaXMub25DaGFuZ2UodGhpcy5fbW9kZWwpO1xuICB9XG5cbiAgZ2V0IE1vZGVsKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsO1xuICB9XG5cbiAgLy8gUFJPUEVSVFlcbiAgZ2V0IElucHV0SGlkZSgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgcmV0dXJuIHRoaXMub3V0cHV0Lmxlbmd0aCA+PSB0aGlzLm11bHRpcGxlTGltaXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLm91dHB1dC5sZW5ndGggPT09IDEgJiYgIXRoaXMuaXNPcGVuO1xuICAgIH1cbiAgfVxuXG4gIGdldCBWYWx1ZUZyb21PdXRwdXQoKTogYW55IHtcbiAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgbGV0IHRtcDogQXJyYXk8YW55PiA9IFtdO1xuICAgICAgZm9yIChsZXQgbyBvZiB0aGlzLm91dHB1dCkge1xuICAgICAgICB0bXAucHVzaChmZXRjaEZyb21PYmplY3QobywgdGhpcy5tb2RlbFByb3BlcnR5KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdG1wO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmV0Y2hGcm9tT2JqZWN0KHRoaXMub3V0cHV0WzBdLCB0aGlzLm1vZGVsUHJvcGVydHkpO1xuICAgIH1cbiAgfVxuXG4gIHNldCBPdXRwdXQobmV3VmFsdWU6IEFycmF5PGFueT4pIHtcbiAgICBsZXQgZGF0YUxpc3Q6IEFycmF5PGFueT4gPSBbXTtcbiAgICBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBkYXRhTGlzdCA9IHRoaXMuZGF0YUxpc3Q7XG4gICAgfSBlbHNlIGlmICh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIGlmIChuZXdWYWx1ZSAmJiBuZXdWYWx1ZS5sZW5ndGggJiYgdGhpcy5maXJzdExvYWQpIHtcbiAgICAgICAgbGV0IHBhcmFtczogYW55ID0ge307XG4gICAgICAgIHRoaXMuZmlyc3RMb2FkID0gZmFsc2U7XG4gICAgICAgIGlmICghdGhpcy5wcmVsb2FkUHJvcGVydHkpIHtcbiAgICAgICAgICB0aGlzLm91dHB1dCA9IG5ld1ZhbHVlO1xuICAgICAgICAgIHRoaXMuY2hhbmdlRnVsbE1vZGVsLmVtaXQodGhpcy5vdXRwdXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBhcmFtc1t0aGlzLnByZWxvYWRQcm9wZXJ0eV0gPSBuZXdWYWx1ZS5tYXAodmFsID0+IGZldGNoRnJvbU9iamVjdCh2YWwsIHRoaXMucHJlbG9hZEZpZWxkKSk7XG4gICAgICAgICAgdGhpcy5kYXRhTGlzdFN1YiA9ICg8T2JzZXJ2YWJsZTxJRGF0YVJlc3BvbnNlPj50aGlzLmRhdGFMaXN0KHBhcmFtcywgMSwgdGhpcy5jb3VudE9uUGFnZSkpLnN1YnNjcmliZShhbnN3ZXIgPT4ge1xuICAgICAgICAgICAgdGhpcy5vdXRwdXQgPSBhbnN3ZXIubGlzdDtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRnVsbE1vZGVsLmVtaXQodGhpcy5vdXRwdXQpO1xuICAgICAgICAgIH0sICgpID0+IHsgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2hhbmdlRnVsbE1vZGVsLmVtaXQodGhpcy5vdXRwdXQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5kYXRhTGlzdCA9PT0gdW5kZWZpbmVkKSB7IHJldHVybjsgfVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdkYXRhTGlzdCB2YWx1ZSBFcnJvcicpO1xuICAgIH1cbiAgICBsZXQgbmV3T3V0cHV0OiBBcnJheTxhbnk+ID0gW107XG4gICAgZm9yIChsZXQgdiBvZiBuZXdWYWx1ZSkge1xuICAgICAgZm9yIChsZXQgZCBvZiBkYXRhTGlzdCkge1xuICAgICAgICBsZXQgYSA9IGZldGNoRnJvbU9iamVjdChkLCB0aGlzLm1vZGVsUHJvcGVydHkpID8gZmV0Y2hGcm9tT2JqZWN0KGQsIHRoaXMubW9kZWxQcm9wZXJ0eSkudmFsdWVPZigpIDogdW5kZWZpbmVkO1xuICAgICAgICBsZXQgYiA9IHYgPyB2LnZhbHVlT2YoKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKGRlZXBFcXVhbChhLCBiKSkge1xuICAgICAgICAgIG5ld091dHB1dC5wdXNoKGQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMub3V0cHV0ID0gbmV3T3V0cHV0O1xuICAgIHRoaXMuY2hhbmdlRnVsbE1vZGVsLmVtaXQodGhpcy5vdXRwdXQpO1xuICB9XG5cbiAgZ2V0IE9wdGlvbnMoKTogQXJyYXk8YW55PiB7XG4gICAgbGV0IG9wdGlvbnM6IEFycmF5PGFueT47XG4gICAgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgbGV0IG9sZENhY2hlID0gdGhpcy5HZXRDYWNoZSh0aGlzLm9sZFF1ZXJ5KTtcblxuICAgICAgaWYgKCF0aGlzLmN1cnJlbnRDYWNoZSAmJiBvbGRDYWNoZSkge1xuICAgICAgICBvcHRpb25zID0gb2xkQ2FjaGUub2JqZWN0cztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wdGlvbnMgPSB0aGlzLmN1cnJlbnRDYWNoZSA/IHRoaXMuY3VycmVudENhY2hlLm9iamVjdHMgOiBbXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIChvcHRpb25zIHx8IFtdKS5maWx0ZXIob3AgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMub3V0cHV0LmZpbmRJbmRleChvID0+IHtcbiAgICAgICAgbGV0IGEgPSBmZXRjaEZyb21PYmplY3QobywgdGhpcy5tb2RlbFByb3BlcnR5KSA/IGZldGNoRnJvbU9iamVjdChvLCB0aGlzLm1vZGVsUHJvcGVydHkpLnZhbHVlT2YoKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgbGV0IGIgPSBmZXRjaEZyb21PYmplY3Qob3AsIHRoaXMubW9kZWxQcm9wZXJ0eSkgPyBmZXRjaEZyb21PYmplY3Qob3AsIHRoaXMubW9kZWxQcm9wZXJ0eSkudmFsdWVPZigpIDogdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gZGVlcEVxdWFsKGEsIGIpO1xuICAgICAgfSkgPT09IC0xO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGN1cnJlbnRDYWNoZTogQ2FjaGVJbmZvO1xuICBwcml2YXRlIEdldENhY2hlKHF1ZXJ5OiBzdHJpbmcpOiBDYWNoZUluZm8ge1xuICAgIGlmICh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLmNhY2hlTGF6eURhdGEuZmluZChjYWNoZSA9PiB7XG4gICAgICAgIHJldHVybiBjYWNoZS5xdWVyeSA9PT0gdGhpcy5xdWVyeSAmJiBkZWVwRXF1YWwoY2FjaGUucGFyYW1zLCB0aGlzLmFkZGl0aW9uYWxGaWx0ZXIpO1xuICAgICAgfSlcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8vIENyZWF0ZU5ld1xuXG4gIHB1YmxpYyBBZGROZXdPYmplY3QodmFsdWU6IE9ic2VydmFibGU8YW55PiB8IGFueSk6IHZvaWQge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcbiAgICAgIHZhbHVlLnN1YnNjcmliZShuZXdPYmplY3QgPT4ge1xuICAgICAgICBpZiAobmV3T2JqZWN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLlNldE5ld09iamVjdChuZXdPYmplY3QpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5TZXROZXdPYmplY3QodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgU2V0TmV3T2JqZWN0KG5ld09iamVjdDogYW55KSB7XG4gICAgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgdGhpcy5kYXRhTGlzdC5wdXNoKG5ld09iamVjdCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIGZvciAobGV0IGNhY2hlIG9mIHRoaXMuY2FjaGVMYXp5RGF0YSkge1xuICAgICAgICBpZiAodGhpcy5xdWVyeS5pbmNsdWRlcyhjYWNoZS5xdWVyeSkgfHwgY2FjaGUucXVlcnkgPT09IHVuZGVmaW5lZCB8fCBjYWNoZS5xdWVyeSA9PT0gJycpIHtcbiAgICAgICAgICBjYWNoZS5jb3VudEVsZW1lbnQrKztcbiAgICAgICAgICBjYWNoZS5vYmplY3RzLnB1c2gobmV3T2JqZWN0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZmlyc3RMb2FkID0gZmFsc2U7XG4gICAgdGhpcy5xdWVyeSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmN1cnJlbnRDYWNoZSA9IHRoaXMuR2V0Q2FjaGUodGhpcy5xdWVyeSk7XG4gICAgdGhpcy5zZWxlY3RPbmUobmV3IE1vdXNlRXZlbnQoJ2NsaWNrJyksIG5ld09iamVjdCk7XG4gIH1cblxuICBnZXQgU2hvd05ldygpOiBib29sZWFuIHtcbiAgICBsZXQgYSA9IHRoaXMucXVlcnkgJiYgdGhpcy5uZXdNZXNzYWdlICYmICghdGhpcy5kYXRhTGlzdFN1YiB8fCB0aGlzLmRhdGFMaXN0U3ViLmNsb3NlZCk7XG5cbiAgICBsZXQgYiA9IHRoaXMuT3B0aW9ucy5maW5kSW5kZXgobyA9PiB7XG4gICAgICBsZXQgYyA9IGZldGNoRnJvbU9iamVjdChvLCB0aGlzLnZpZXdQcm9wZXJ0eSkgPyBmZXRjaEZyb21PYmplY3QobywgdGhpcy52aWV3UHJvcGVydHkpLnZhbHVlT2YoKSA6IHVuZGVmaW5lZDtcbiAgICAgIHJldHVybiBkZWVwRXF1YWwoYywgdGhpcy5xdWVyeSk7XG4gICAgfSkgPT09IC0xICYmIHRoaXMub3V0cHV0LmZpbmRJbmRleChvID0+IHtcbiAgICAgIGxldCBjID0gZmV0Y2hGcm9tT2JqZWN0KG8sIHRoaXMudmlld1Byb3BlcnR5KSA/IGZldGNoRnJvbU9iamVjdChvLCB0aGlzLnZpZXdQcm9wZXJ0eSkudmFsdWVPZigpIDogdW5kZWZpbmVkO1xuICAgICAgcmV0dXJuIGRlZXBFcXVhbChjLCB0aGlzLnF1ZXJ5KTtcbiAgICB9KSA9PT0gLTE7XG5cbiAgICByZXR1cm4gYSAmJiBiO1xuICB9XG5cbiAgZ2V0IFNob3dFbXB0eSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5PcHRpb25zLmxlbmd0aCA9PT0gMCAmJiAoISh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgRnVuY3Rpb24pIHx8ICh0aGlzLmRhdGFMaXN0U3ViLmNsb3NlZCkpO1xuICB9XG5cblxuICAvLyBDQUNIRVxuICBwcml2YXRlIGNhY2hlTGF6eURhdGE6IEFycmF5PENhY2hlSW5mbz4gPSBbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDYWNoZUluZm8ge1xuICBjb3VudEVsZW1lbnQ6IG51bWJlcjtcbiAgY291bnRQYWdlczogbnVtYmVyO1xuICBjdXJyZW50UGFnZTogbnVtYmVyO1xuICBvYmplY3RzOiBBcnJheTxhbnk+O1xuXG4gIHF1ZXJ5OiBzdHJpbmc7XG4gIHBhcmFtczogYW55O1xufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBOZ1ZpYm9yQ29tcG9uZW50IH0gZnJvbSAnLi9uZy12aWJvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmlib3JCb3RoRGlyZWN0aXZlLCBWaWJvckNyZWF0ZURpcmVjdGl2ZSwgVmlib3JEcm9wZG93bkRpcmVjdGl2ZSwgVmlib3JTZWxlY3RlZERpcmVjdGl2ZSB9IGZyb20gJy4vbmctdmlib3ItdGVtcGxhdGUuZGlyZWN0aXZlJztcbmNvbnN0IGNvbXBvbmVudHMgPSBbTmdWaWJvckNvbXBvbmVudCwgVmlib3JCb3RoRGlyZWN0aXZlLCBWaWJvckNyZWF0ZURpcmVjdGl2ZSwgVmlib3JEcm9wZG93bkRpcmVjdGl2ZSwgVmlib3JTZWxlY3RlZERpcmVjdGl2ZV1cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEZvcm1zTW9kdWxlLCBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgLi4uY29tcG9uZW50c1xuICBdLFxuICBleHBvcnRzOiBbXG4gICAgLi4uY29tcG9uZW50cywgRm9ybXNNb2R1bGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ1ZpYm9yTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbIkluamVjdGFibGUiLCJEaXJlY3RpdmUiLCJUZW1wbGF0ZVJlZiIsIkV2ZW50RW1pdHRlciIsInRzbGliXzEuX192YWx1ZXMiLCJPYnNlcnZhYmxlIiwiQ29tcG9uZW50IiwiVmlld0VuY2Fwc3VsYXRpb24iLCJOR19WQUxVRV9BQ0NFU1NPUiIsImZvcndhcmRSZWYiLCJFbGVtZW50UmVmIiwiVmlld0NoaWxkIiwiSW5wdXQiLCJDb250ZW50Q2hpbGQiLCJPdXRwdXQiLCJOZ01vZHVsZSIsIkZvcm1zTW9kdWxlIiwiQ29tbW9uTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7UUFNRTtTQUFpQjs7b0JBSmxCQSxhQUFVLFNBQUM7d0JBQ1YsVUFBVSxFQUFFLE1BQU07cUJBQ25COzs7Ozs2QkFKRDs7O0lDQUE7Ozs7Ozs7Ozs7Ozs7O0FBY0Esc0JBNEZ5QixDQUFDO1FBQ3RCLElBQUksQ0FBQyxHQUFHLE9BQU8sTUFBTSxLQUFLLFVBQVUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDO1lBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNO29CQUFFLENBQUMsR0FBRyxL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