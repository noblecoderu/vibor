(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('rxjs'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('vibor', ['exports', '@angular/core', '@angular/forms', 'rxjs', '@angular/common'], factory) :
    (factory((global.vibor = {}),global.ng.core,global.ng.forms,global.rxjs,global.ng.common));
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
                        styles: [".vibor a,.vibor label,.vibor legend,.vibor p,.vibor span,.vibor ul{margin:0;padding:0;border:0}.vibor a,.vibor button,.vibor input{outline:0}.vibor ol,.vibor ul{list-style:none}.vibor input{padding:0;margin:0;border:0;font:inherit}.vibor b{font-weight:400}.vibor{position:relative;display:block;border:1px solid #d5d9de;border-radius:3px;font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\";font-size:14px;line-height:18px;background-color:#fff;transition:box-shadow .15s linear;color:#2c2c2c}.vibor:hover:not([disabled]),.vibor:hover:not([disabled]) .select-dropdown{box-shadow:0 3px 6px 0 rgba(44,44,44,.1)}.vibor[disabled]{opacity:.5;pointer-events:none;background-color:#f4f4f4}.vibor .select-search{position:relative;padding-right:40px}.vibor .select-search .arrow{content:\"\";position:absolute;right:15px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);display:block;width:16px;height:16px;background-image:url(data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ibmMtaWNvbiBnbHlwaCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiI+DQogIDxwYXRoIGZpbGw9IiMyYzJjMmMiIGQ9Ik04IDExLjRMMi42IDYgNCA0LjZsNCA0IDQtNEwxMy40IDYiLz4NCjwvc3ZnPg0K);transition:-webkit-transform .15s ease-in-out;transition:transform .15s ease-in-out;transition:transform .15s ease-in-out,-webkit-transform .15s ease-in-out}.vibor .select-search .arrow:before,.vibor .select-search-list-item_hide{display:none}.vibor .select-search-list-item_selection{position:relative}.vibor .select-search-list-item_selection>div{display:flex;align-items:center;padding:0 15px}.vibor .select-search-list-item_input input{width:100%;padding:0 15px;text-overflow:ellipsis;font-size:14px;color:#2c2c2c;background-color:transparent}.vibor .select-search-list-item_input input::-webkit-input-placeholder{color:rgba(44,44,44,.2)}.vibor .select-search-list-item_input input:-ms-input-placeholder{color:rgba(44,44,44,.2)}.vibor .select-search-list-item_input input::-ms-input-placeholder{color:rgba(44,44,44,.2)}.vibor .select-search-list-item_input input::placeholder{color:rgba(44,44,44,.2)}.vibor .select-search-list-item_remove{display:flex;align-items:center;justify-content:center;width:16px;height:16px;margin-left:5px;border-radius:50%;background-color:#bababa;cursor:pointer;transition:background-color .15s linear}.vibor .select-search-list-item_remove:hover{background-color:#949494}.vibor .select-search-list-item_loader-center{position:absolute;right:12px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);display:flex;align-items:center;justify-content:center;width:21px;height:21px;background:#fff;z-index:2}.vibor .select-search-list-item_loader-center[hidden]{display:none}.vibor .select-search-list-item_loader-center .select-search-list-item_loader{width:16px;height:16px;box-sizing:border-box;border-width:2px;border-style:solid;border-color:#22272e rgba(34,39,46,.4) rgba(34,39,46,.4);border-radius:100%;-webkit-animation:.45s linear infinite clockwise;animation:.45s linear infinite clockwise}.vibor .select-dropdown{position:absolute;top:100%;left:-1px;right:-1px;border:1px solid #d5d9de;border-bottom-left-radius:5px;border-bottom-right-radius:5px;border-top:0;background:#fff;overflow:hidden;z-index:2}.vibor .select-dropdown-optgroup{max-height:300px;overflow-y:auto}.vibor .select-dropdown-optgroup-option{min-height:30px;padding:10px 15px;color:#2c2c2c}.vibor .select-dropdown-optgroup-option:hover{background-color:rgba(66,132,215,.1)}.vibor .select-dropdown-optgroup-option.loading{font-size:16px;line-height:18px;text-align:center;color:#8b8b83}.vibor .select-dropdown-optgroup-option.loader{text-align:center;color:#8b8b83}.vibor .select-dropdown-pager{padding:10px;text-align:center;border-top:1px dashed #d5d9de}.vibor .select-dropdown-pager-page{font-size:12px;color:#8b8b83}.vibor .select-dropdown-pager-loadmore{border:0;background:0 0;box-shadow:none;color:#8b8b83;text-transform:uppercase}.vibor .select-dropdown-pager-page+.select-dropdown-pager-loadmore{margin-top:10px}.vibor.open-vibor{border-bottom-left-radius:0;border-bottom-right-radius:0}.vibor.open-vibor .select-search .arrow{-webkit-transform:translateY(-50%) rotate(180deg);transform:translateY(-50%) rotate(180deg)}.vibor:not(.multiple) .select-search-list-item_remove{position:absolute;right:0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.vibor.multiple .select-search{padding:5px 40px 5px 15px}.vibor.multiple .select-search-list{display:flex;flex-flow:row wrap;margin:-5px}.vibor.multiple .select-search-list-item{padding:5px}.vibor.multiple .select-search-list-item_input{flex:1}.vibor.multiple .select-search-list-item_input input{height:28px;padding:0}.vibor.multiple .vibor__selection{display:flex;align-items:center;height:28px;padding:0 7px;border-radius:3px;font-size:14px;background:#e5e5e7;color:#2c2c2c}.vibor:not(.multiple) .select-search-list-item_input input,.vibor:not(.multiple) .select-search-list-item_selection>div{min-height:38px}@-webkit-keyframes clockwise{to{-webkit-transform:rotate(360deg) translatez(0);transform:rotate(360deg) translatez(0)}}@keyframes clockwise{to{-webkit-transform:rotate(360deg) translatez(0);transform:rotate(360deg) translatez(0)}}"],
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlib3IudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly92aWJvci9saWIvdmlib3Iuc2VydmljZS50cyIsbnVsbCwibmc6Ly92aWJvci9saWIvdmlib3ItdGVtcGxhdGUuZGlyZWN0aXZlLnRzIiwibmc6Ly92aWJvci9saWIvaGVscGVycy50cyIsIm5nOi8vdmlib3IvbGliL3ZpYm9yLmNvbXBvbmVudC50cyIsIm5nOi8vdmlib3IvbGliL3ZpYm9yLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5nVmlib3JTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbdmlib3ItZHJvcGRvd24tZWxlbWVudF0nIH0pXG5leHBvcnQgY2xhc3MgVmlib3JEcm9wZG93bkRpcmVjdGl2ZSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxufVxuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbdmlib3Itc2VsZWN0ZWQtZWxlbWVudF0nIH0pXG5leHBvcnQgY2xhc3MgVmlib3JTZWxlY3RlZERpcmVjdGl2ZSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxufVxuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbdmlib3ItYm90aC1lbGVtZW50XScgfSlcbmV4cG9ydCBjbGFzcyBWaWJvckJvdGhEaXJlY3RpdmUge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cbn1cblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3ZpYm9yLWNyZWF0ZV0nIH0pXG5leHBvcnQgY2xhc3MgVmlib3JDcmVhdGVEaXJlY3RpdmUge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cbn1cbiIsImV4cG9ydCBpbnRlcmZhY2UgSURhdGFSZXNwb25zZSB7XG4gIGRhdGE6IE9iamVjdDtcbiAgbGlzdDogQXJyYXk8T2JqZWN0PjtcbiAgaGVhZGVyczogYW55O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmV0Y2hGcm9tT2JqZWN0KG9iamVjdDogYW55LCBwcm9wOiBzdHJpbmcpOiBhbnkge1xuICBpZiAob2JqZWN0ID09PSB1bmRlZmluZWQgfHwgcHJvcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuXG4gIGNvbnN0IGluZGV4OiBudW1iZXIgPSBwcm9wLmluZGV4T2YoJy4nKTtcbiAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICByZXR1cm4gZmV0Y2hGcm9tT2JqZWN0KG9iamVjdFtwcm9wLnN1YnN0cmluZygwLCBpbmRleCldLCBwcm9wLnN1YnN0cihpbmRleCArIDEpKTtcbiAgfVxuXG4gIHJldHVybiBvYmplY3RbcHJvcF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0Rm9ybWF0dGVyKGRhdGE6IGFueSwgdmFsdWVQcm9wZXJ0eU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGxldCBodG1sID0gJyc7XG4gIGh0bWwgKz0gZmV0Y2hGcm9tT2JqZWN0KGRhdGEsIHZhbHVlUHJvcGVydHlOYW1lKSA/IGA8Yj4ke2ZldGNoRnJvbU9iamVjdChkYXRhLCB2YWx1ZVByb3BlcnR5TmFtZSl9PC9iPmAgOiAnJztcbiAgcmV0dXJuIGh0bWw7XG59XG5cblxuLy8gVXNlZCBmb3IgbWF0Y2hpbmcgbnVtYmVyc1xuY29uc3QgY29yZV9wbnVtOiBzdHJpbmcgPSAvWystXT8oPzpcXGQqXFwufClcXGQrKD86W2VFXVsrLV0/XFxkK3wpLy5zb3VyY2U7XG5jb25zdCBybnVtbm9ucHg6IFJlZ0V4cCA9IG5ldyBSZWdFeHAoJ14oJyArIGNvcmVfcG51bSArICcpKD8hcHgpW2EteiVdKyQnLCAnaScpO1xuXG5mdW5jdGlvbiBhdWdtZW50V2lkdGhPckhlaWdodChuYW1lOiBzdHJpbmcsIGV4dHJhOiBhbnksIGlzQm9yZGVyQm94OiBhbnksIHN0eWxlczogYW55KTogbnVtYmVyIHtcbiAgbGV0IGk6IG51bWJlciA9IGV4dHJhID09PSAoaXNCb3JkZXJCb3ggPyAnYm9yZGVyJyA6ICdjb250ZW50JykgP1xuICAgIC8vIElmIHdlIGFscmVhZHkgaGF2ZSB0aGUgcmlnaHQgbWVhc3VyZW1lbnQsIGF2b2lkIGF1Z21lbnRhdGlvblxuICAgIDQgOlxuICAgIC8vIE90aGVyd2lzZSBpbml0aWFsaXplIGZvciBob3Jpem9udGFsIG9yIHZlcnRpY2FsIHByb3BlcnRpZXNcbiAgICBuYW1lID09PSAnd2lkdGgnID8gMSA6IDAsXG5cbiAgICB2YWwgPSAwO1xuICBjb25zdCBjc3NFeHBhbmQ6IHN0cmluZ1tdID0gWydUb3AnLCAnUmlnaHQnLCAnQm90dG9tJywgJ0xlZnQnXTtcblxuICAvLyBUT0RPIFVzZSBhbmd1bGFyLmVsZW1lbnQuY3NzIGluc3RlYWQgb2YgZ2V0U3R5bGVWYWx1ZSBhZnRlclxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vY2FpdHAvYW5ndWxhci5qcy9jb21taXQvOTJiYmI1ZTIyNTI1M2ViZGRkMzhlZjU3MzVkNjZmZmVmNzZiNmExNCB3aWxsIGJlIGFwcGxpZWRcbiAgZnVuY3Rpb24gZ2V0U3R5bGVWYWx1ZShfbmFtZTogYW55KTogbnVtYmVyIHtcbiAgICByZXR1cm4gcGFyc2VGbG9hdChzdHlsZXNbX25hbWVdKTtcbiAgfVxuXG4gIGZvciAoOyBpIDwgNDsgaSArPSAyKSB7XG4gICAgLy8gYm90aCBib3ggbW9kZWxzIGV4Y2x1ZGUgbWFyZ2luLCBzbyBhZGQgaXQgaWYgd2Ugd2FudCBpdFxuICAgIGlmIChleHRyYSA9PT0gJ21hcmdpbicpIHtcbiAgICAgIHZhbCArPSBnZXRTdHlsZVZhbHVlKGV4dHJhICsgY3NzRXhwYW5kW2ldKTtcbiAgICB9XG5cbiAgICBpZiAoaXNCb3JkZXJCb3gpIHtcbiAgICAgIC8vIGJvcmRlci1ib3ggaW5jbHVkZXMgcGFkZGluZywgc28gcmVtb3ZlIGl0IGlmIHdlIHdhbnQgY29udGVudFxuICAgICAgaWYgKGV4dHJhID09PSAnY29udGVudCcpIHtcbiAgICAgICAgdmFsIC09IGdldFN0eWxlVmFsdWUoJ3BhZGRpbmcnICsgY3NzRXhwYW5kW2ldKTtcbiAgICAgIH1cblxuICAgICAgLy8gYXQgdGhpcyBwb2ludCwgZXh0cmEgaXNuJ3QgYm9yZGVyIG5vciBtYXJnaW4sIHNvIHJlbW92ZSBib3JkZXJcbiAgICAgIGlmIChleHRyYSAhPT0gJ21hcmdpbicpIHtcbiAgICAgICAgdmFsIC09IGdldFN0eWxlVmFsdWUoJ2JvcmRlcicgKyBjc3NFeHBhbmRbaV0gKyAnV2lkdGgnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFsICs9IGdldFN0eWxlVmFsdWUoJ3BhZGRpbmcnICsgY3NzRXhwYW5kW2ldKTtcblxuICAgICAgLy8gYXQgdGhpcyBwb2ludCwgZXh0cmEgaXNuJ3QgY29udGVudCBub3IgcGFkZGluZywgc28gYWRkIGJvcmRlclxuICAgICAgaWYgKGV4dHJhICE9PSAncGFkZGluZycpIHtcbiAgICAgICAgdmFsICs9IGdldFN0eWxlVmFsdWUoJ2JvcmRlcicgKyBjc3NFeHBhbmRbaV0gKyAnV2lkdGgnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdmFsO1xufVxuXG5mdW5jdGlvbiBnZXRXaW5kb3coZWxlbTogYW55KTogYW55IHtcbiAgcmV0dXJuIGVsZW0gIT0gbnVsbCAmJiBlbGVtID09PSBlbGVtLndpbmRvdyA/IGVsZW0gOiBlbGVtLm5vZGVUeXBlID09PSA5ICYmIGVsZW0uZGVmYXVsdFZpZXc7XG59XG5cbmZ1bmN0aW9uIGdldE9mZnNldChlbGVtOiBhbnkpOiBhbnkge1xuICBsZXQgZG9jRWxlbTogYW55LCB3aW46IGFueTtcbiAgY29uc3QgYm94OiBhbnkgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBjb25zdCBkb2M6IGFueSA9IGVsZW0gJiYgZWxlbS5vd25lckRvY3VtZW50O1xuXG4gIGlmICghZG9jKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZG9jRWxlbSA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG4gIHdpbiA9IGdldFdpbmRvdyhkb2MpO1xuXG4gIHJldHVybiB7XG4gICAgdG9wOiBib3gudG9wICsgd2luLnBhZ2VZT2Zmc2V0IC0gZG9jRWxlbS5jbGllbnRUb3AsXG4gICAgbGVmdDogYm94LmxlZnQgKyB3aW4ucGFnZVhPZmZzZXQgLSBkb2NFbGVtLmNsaWVudExlZnRcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNjcm9sbEFjdGl2ZU9wdGlvbihsaXN0OiBIVE1MRWxlbWVudCwgaXRlbTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgbGV0IHk6IGFueSwgaGVpZ2h0X21lbnU6IGFueSwgaGVpZ2h0X2l0ZW06IGFueSwgc2Nyb2xsOiBhbnksIHNjcm9sbF90b3A6IGFueSwgc2Nyb2xsX2JvdHRvbTogYW55O1xuXG4gIGlmIChpdGVtKSB7XG4gICAgaGVpZ2h0X21lbnUgPSBsaXN0Lm9mZnNldEhlaWdodDtcbiAgICBoZWlnaHRfaXRlbSA9IGdldFdpZHRoT3JIZWlnaHQoaXRlbSwgJ2hlaWdodCcsICdtYXJnaW4nKTsgLy8gb3V0ZXJIZWlnaHQodHJ1ZSk7XG4gICAgc2Nyb2xsID0gbGlzdC5zY3JvbGxUb3AgfHwgMDtcbiAgICB5ID0gZ2V0T2Zmc2V0KGl0ZW0pLnRvcCAtIGdldE9mZnNldChsaXN0KS50b3AgKyBzY3JvbGw7XG4gICAgc2Nyb2xsX3RvcCA9IHk7XG4gICAgc2Nyb2xsX2JvdHRvbSA9IHkgLSBoZWlnaHRfbWVudSArIGhlaWdodF9pdGVtO1xuXG4gICAgLy8gVE9ETyBNYWtlIGFuaW1hdGlvblxuICAgIGlmICh5ICsgaGVpZ2h0X2l0ZW0gPiBoZWlnaHRfbWVudSArIHNjcm9sbCkge1xuICAgICAgbGlzdC5zY3JvbGxUb3AgPSBzY3JvbGxfYm90dG9tO1xuICAgIH0gZWxzZSBpZiAoeSA8IHNjcm9sbCkge1xuICAgICAgbGlzdC5zY3JvbGxUb3AgPSBzY3JvbGxfdG9wO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRXaWR0aE9ySGVpZ2h0KGVsZW06IGFueSwgbmFtZTogYW55LCBleHRyYTogYW55KTogYW55IHtcblxuICAvLyBTdGFydCB3aXRoIG9mZnNldCBwcm9wZXJ0eSwgd2hpY2ggaXMgZXF1aXZhbGVudCB0byB0aGUgYm9yZGVyLWJveCB2YWx1ZVxuICBjb25zdCB2YWx1ZUlzQm9yZGVyQm94ID0gdHJ1ZTtcbiAgbGV0IHZhbDogYW55ID0gbmFtZSA9PT0gJ3dpZHRoJyA/IGVsZW0ub2Zmc2V0V2lkdGggOiBlbGVtLm9mZnNldEhlaWdodDtcbiAgY29uc3Qgc3R5bGVzOiBhbnkgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtLCBudWxsKTtcbiAgY29uc3QgaXNCb3JkZXJCb3ggPSBmYWxzZTsgLy8galF1ZXJ5LnN1cHBvcnQuYm94U2l6aW5nICYmIGpRdWVyeS5jc3MoIGVsZW0sICdib3hTaXppbmcnLCBmYWxzZSwgc3R5bGVzICkgPT09ICdib3JkZXItYm94JztcblxuICAvLyBzb21lIG5vbi1odG1sIGVsZW1lbnRzIHJldHVybiB1bmRlZmluZWQgZm9yIG9mZnNldFdpZHRoLCBzbyBjaGVjayBmb3IgbnVsbC91bmRlZmluZWRcbiAgLy8gc3ZnIC0gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NjQ5Mjg1XG4gIC8vIE1hdGhNTCAtIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTQ5MTY2OFxuICBpZiAodmFsIDw9IDAgfHwgdmFsID09IG51bGwpIHtcbiAgICAvLyBGYWxsIGJhY2sgdG8gY29tcHV0ZWQgdGhlbiB1bmNvbXB1dGVkIGNzcyBpZiBuZWNlc3NhcnlcbiAgICB2YWwgPSBzdHlsZXNbbmFtZV07XG5cbiAgICBpZiAodmFsIDwgMCB8fCB2YWwgPT0gbnVsbCkge1xuICAgICAgdmFsID0gZWxlbS5zdHlsZVtuYW1lXTtcbiAgICB9XG5cbiAgICAvLyBDb21wdXRlZCB1bml0IGlzIG5vdCBwaXhlbHMuIFN0b3AgaGVyZSBhbmQgcmV0dXJuLlxuICAgIGlmIChybnVtbm9ucHgudGVzdCh2YWwpKSB7XG4gICAgICByZXR1cm4gdmFsO1xuICAgIH1cblxuICAgIC8vIHdlIG5lZWQgdGhlIGNoZWNrIGZvciBzdHlsZSBpbiBjYXNlIGEgYnJvd3NlciB3aGljaCByZXR1cm5zIHVucmVsaWFibGUgdmFsdWVzXG4gICAgLy8gZm9yIGdldENvbXB1dGVkU3R5bGUgc2lsZW50bHkgZmFsbHMgYmFjayB0byB0aGUgcmVsaWFibGUgZWxlbS5zdHlsZVxuICAgIC8vIHZhbHVlSXNCb3JkZXJCb3ggPSBpc0JvcmRlckJveCAmJiAoIGpRdWVyeS5zdXBwb3J0LmJveFNpemluZ1JlbGlhYmxlIHx8IHZhbCA9PT0gZWxlbS5zdHlsZVsgbmFtZSBdICk7XG5cbiAgICAvLyBOb3JtYWxpemUgJycsIGF1dG8sIGFuZCBwcmVwYXJlIGZvciBleHRyYVxuICAgIHZhbCA9IHBhcnNlRmxvYXQodmFsKSB8fCAwO1xuICB9XG5cbiAgLy8gdXNlIHRoZSBhY3RpdmUgYm94LXNpemluZyBtb2RlbCB0byBhZGQvc3VidHJhY3QgaXJyZWxldmFudCBzdHlsZXNcbiAgcmV0dXJuIHZhbCArIGF1Z21lbnRXaWR0aE9ySGVpZ2h0KG5hbWUsIGV4dHJhIHx8IChpc0JvcmRlckJveCA/ICdib3JkZXInIDogJ2NvbnRlbnQnKSwgdmFsdWVJc0JvcmRlckJveCwgc3R5bGVzKTtcbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCwgT25Jbml0LCBPbkNoYW5nZXMsXG4gIElucHV0LCBPdXRwdXQsIGZvcndhcmRSZWYsXG4gIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZixcbiAgVGVtcGxhdGVSZWYsIENvbnRlbnRDaGlsZCwgVmlld0NoaWxkLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBOR19WQUxVRV9BQ0NFU1NPUixcbiAgTmdNb2RlbFxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge1xuICAgIFZpYm9yQm90aERpcmVjdGl2ZSxcbiAgICBWaWJvckNyZWF0ZURpcmVjdGl2ZSxcbiAgICBWaWJvckRyb3Bkb3duRGlyZWN0aXZlLFxuICAgIFZpYm9yU2VsZWN0ZWREaXJlY3RpdmVcbn0gZnJvbSAnLi92aWJvci10ZW1wbGF0ZS5kaXJlY3RpdmUnO1xuXG5pbXBvcnQge1xuICAgIElEYXRhUmVzcG9uc2UsXG4gICAgZGVmYXVsdEZvcm1hdHRlcixcbiAgICBmZXRjaEZyb21PYmplY3QsXG4gICAgc2Nyb2xsQWN0aXZlT3B0aW9uXG59IGZyb20gJy4vaGVscGVycyc7XG5cbmNvbnN0IGRlZXBFcXVhbCA9IHJlcXVpcmUoJ2RlZXAtZXF1YWwnKTtcblxuQENvbXBvbmVudCh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICd2aWJvcicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInZpYm9yXCI+XG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cblxuICA8ZGl2IGNsYXNzPVwic2VsZWN0LXNlYXJjaFwiIChjbGljayk9XCJzaG93RHJvcGRvd25MaXN0KCRldmVudCk7XCI+XG4gICAgPHVsIGNsYXNzPVwic2VsZWN0LXNlYXJjaC1saXN0XCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibXVsdGlwbGUgfHwgIWlzT3BlblwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIVNlbGVjdGVkVGVtcGxhdGU7IGVsc2Ugc2VsZWN0ZWRUXCI+XG4gICAgICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LXNlYXJjaC1saXN0LWl0ZW0gc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fc2VsZWN0aW9uXCIgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygb3V0cHV0OyBsZXQgJGluZGV4PWluZGV4OyBsZXQgJGxhc3Q9bGFzdDsgdHJhY2tCeTogVHJhY2tCeUZuO1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZpYm9yX19zZWxlY3Rpb25cIj5cbiAgICAgICAgICAgICAgPGRpdiBbaW5uZXJIVE1MXT1cImdldExpc3RGb3JtYXR0ZWQoaXRlbSlcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPGEgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9yZW1vdmVcIiAqbmdJZj1cImFsbG93UmVzZXRcIiAoY2xpY2spPVwiIWRpc2FibGVkICYmIHJlbW92ZU9uZSgkaW5kZXgsICRldmVudClcIj5cbiAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIj5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCIjMmMyYzJjXCIgZD1cIk0xMC4xIDQuNUw4IDYuNiA1LjkgNC41IDQuNSA1LjkgNi42IDhsLTIuMSAyLjEgMS40IDEuNEw4IDkuNGwyLjEgMi4xIDEuNC0xLjRMOS40IDhsMi4xLTIuMXpcIi8+XG4gICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjc2VsZWN0ZWRUPlxuICAgICAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtIHNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX3NlbGVjdGlvblwiICpuZ0Zvcj1cImxldCBpdGVtIG9mIG91dHB1dDsgbGV0ICRpbmRleD1pbmRleDsgbGV0ICRsYXN0PWxhc3Q7IHRyYWNrQnk6IFRyYWNrQnlGbjtcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2aWJvcl9fc2VsZWN0aW9uXCI+XG4gICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJTZWxlY3RlZFRlbXBsYXRlOyBjb250ZXh0OiB7aXRlbTogaXRlbX1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgPGEgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9yZW1vdmVcIiAqbmdJZj1cImFsbG93UmVzZXQgJiYgIWRpc2FibGVkXCIgKGNsaWNrKT1cIiFkaXNhYmxlZCAmJiByZW1vdmVPbmUoJGluZGV4LCAkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCI+XG4gICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPVwiIzJjMmMyY1wiIGQ9XCJNMTAuMSA0LjVMOCA2LjYgNS45IDQuNSA0LjUgNS45IDYuNiA4bC0yLjEgMi4xIDEuNCAxLjRMOCA5LjRsMi4xIDIuMSAxLjQtMS40TDkuNCA4bDIuMS0yLjF6XCIvPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtIHNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2lucHV0XCIgW2NsYXNzLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2hpZGVdPVwiSW5wdXRIaWRlXCI+XG4gICAgICAgIDxpbnB1dCBhdXRvY29tcGxldGU9XCJvZmZcIiAjaW5wdXRDb250cm9sPVwibmdNb2RlbFwiIFtuYW1lXT1cIm5hbWVcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbKG5nTW9kZWwpXT1cInF1ZXJ5XCIgW3BsYWNlaG9sZGVyXT1cIm91dHB1dC5sZW5ndGggPT0gMCB8fCAobXVsdGlwbGUgJiYgb3V0cHV0Lmxlbmd0aCA8IG11bHRpcGxlTGltaXQpID8gcGxhY2Vob2xkZXIgOiAnJ1wiXG4gICAgICAgICAgKGlucHV0KT1cInVwZGF0ZU9wdGlvbnNJbkRlbGF5KClcIiAoa2V5ZG93bik9XCJrZXlEb3duKCRldmVudClcIiAvPlxuICAgICAgPC9saT5cbiAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtIHNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2xvYWRlci1jZW50ZXJcIiBbaGlkZGVuXT1cIiFkYXRhTGlzdFN1YiB8fCBkYXRhTGlzdFN1Yi5jbG9zZWRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2xvYWRlclwiPjwvZGl2PlxuICAgICAgPC9saT5cblxuICAgICAgPHNwYW4gY2xhc3M9XCJhcnJvd1wiIChjbGljayk9XCJ0b2dnbGVEcm9wZG93bigkZXZlbnQpXCI+XG4gICAgICA8L3NwYW4+XG4gICAgPC91bD5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cInNlbGVjdC1kcm9wZG93blwiICpuZ0lmPVwiaXNPcGVuXCI+XG4gICAgPHVsIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwXCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIURyb3Bkb3duVGVtcGxhdGU7IGVsc2UgZHJvcGRvd25UXCI+XG4gICAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb25cIiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIE9wdGlvbnM7IGxldCBpPWluZGV4XCIgKG1vdXNlZG93bik9XCJzZWxlY3RPbmUoJGV2ZW50LCBvcHRpb24pXCJcbiAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cImkgPT09IHNlbGVjdG9yUG9zaXRpb25cIiBbaW5uZXJIVE1MXT1cImdldERyb3Bkb3duRm9ybWF0dGVkKG9wdGlvbilcIj5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8bmctdGVtcGxhdGUgI2Ryb3Bkb3duVD5cbiAgICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvblwiICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgT3B0aW9uczsgbGV0IGk9aW5kZXhcIiAobW91c2Vkb3duKT1cInNlbGVjdE9uZSgkZXZlbnQsIG9wdGlvbilcIlxuICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaSA9PT0gc2VsZWN0b3JQb3NpdGlvblwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJEcm9wZG93blRlbXBsYXRlOyBjb250ZXh0OiB7aXRlbTogb3B0aW9ufVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2xpPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvbiBsb2FkaW5nXCIgKm5nSWY9XCJkYXRhTGlzdFN1YiAmJiAhZGF0YUxpc3RTdWIuY2xvc2VkXCI+XG4gICAgICAgIMOQwpfDkMKww5DCs8ORwoDDkcKDw5DCt8OQwrrDkMKwXG4gICAgICA8L2xpPlxuICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvbiBsb2FkZXJcIiAobW91c2Vkb3duKT1cIkFkZE5ld09iamVjdChDcmVhdGVOZXcocXVlcnkpKTtcIiBbY2xhc3MuYWN0aXZlXT1cInNlbGVjdG9yUG9zaXRpb24gPT09IE9wdGlvbnMubGVuZ3RoXCJcbiAgICAgICAgKm5nSWY9XCJTaG93TmV3XCI+XG5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNyZWF0ZVRlbXBsYXRlOyBlbHNlIHRlbXBsYXRlV2l0aE1lc3NhZ2VcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY3JlYXRlVGVtcGxhdGUudGVtcGxhdGVSZWY7IGNvbnRleHQ6IHtxdWVyeTogcXVlcnl9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjdGVtcGxhdGVXaXRoTWVzc2FnZT5cbiAgICAgICAgICB7eyBuZXdNZXNzYWdlIH19XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8L2xpPlxuICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvbiBsb2FkZXJcIiAqbmdJZj1cIlNob3dFbXB0eVwiPlxuICAgICAgICDDkMKfw5HCg8ORwoHDkcKCw5DCvlxuICAgICAgPC9saT5cbiAgICA8L3VsPlxuICAgIDxkaXYgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tcGFnZXJcIiAqbmdJZj1cImN1cnJlbnRDYWNoZSAmJiBjdXJyZW50Q2FjaGUuY291bnRQYWdlcyA+IDFcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tcGFnZXItcGFnZVwiPlxuICAgICAgICB7eyBjdXJyZW50Q2FjaGUuY3VycmVudFBhZ2UgfCBudW1iZXIgfX0gLyB7eyBjdXJyZW50Q2FjaGUuY291bnRQYWdlcyB8IG51bWJlciB9fVxuICAgICAgPC9kaXY+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLXBhZ2VyLWxvYWRtb3JlXCIgKm5nSWY9XCJjdXJyZW50Q2FjaGUuY291bnRQYWdlcyA+IDEgJiYgY3VycmVudENhY2hlLmN1cnJlbnRQYWdlIDwgY3VycmVudENhY2hlLmNvdW50UGFnZXNcIlxuICAgICAgICAobW91c2Vkb3duKT1cIm5leHRQYWdlKCRldmVudClcIj5cbiAgICAgICAgw5DCl8OQwrDDkMKzw5HCgMORwoPDkMK3w5DCuMORwoLDkcKMIMOQwrXDkcKJw5HCkVxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLnZpYm9yIGEsLnZpYm9yIGxhYmVsLC52aWJvciBsZWdlbmQsLnZpYm9yIHAsLnZpYm9yIHNwYW4sLnZpYm9yIHVse21hcmdpbjowO3BhZGRpbmc6MDtib3JkZXI6MH0udmlib3IgYSwudmlib3IgYnV0dG9uLC52aWJvciBpbnB1dHtvdXRsaW5lOjB9LnZpYm9yIG9sLC52aWJvciB1bHtsaXN0LXN0eWxlOm5vbmV9LnZpYm9yIGlucHV0e3BhZGRpbmc6MDttYXJnaW46MDtib3JkZXI6MDtmb250OmluaGVyaXR9LnZpYm9yIGJ7Zm9udC13ZWlnaHQ6NDAwfS52aWJvcntwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmJsb2NrO2JvcmRlcjoxcHggc29saWQgI2Q1ZDlkZTtib3JkZXItcmFkaXVzOjNweDtmb250LWZhbWlseTotYXBwbGUtc3lzdGVtLEJsaW5rTWFjU3lzdGVtRm9udCxcIlNlZ29lIFVJXCIsUm9ib3RvLEhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmLFwiQXBwbGUgQ29sb3IgRW1vamlcIixcIlNlZ29lIFVJIEVtb2ppXCIsXCJTZWdvZSBVSSBTeW1ib2xcIjtmb250LXNpemU6MTRweDtsaW5lLWhlaWdodDoxOHB4O2JhY2tncm91bmQtY29sb3I6I2ZmZjt0cmFuc2l0aW9uOmJveC1zaGFkb3cgLjE1cyBsaW5lYXI7Y29sb3I6IzJjMmMyY30udmlib3I6aG92ZXI6bm90KFtkaXNhYmxlZF0pLC52aWJvcjpob3Zlcjpub3QoW2Rpc2FibGVkXSkgLnNlbGVjdC1kcm9wZG93bntib3gtc2hhZG93OjAgM3B4IDZweCAwIHJnYmEoNDQsNDQsNDQsLjEpfS52aWJvcltkaXNhYmxlZF17b3BhY2l0eTouNTtwb2ludGVyLWV2ZW50czpub25lO2JhY2tncm91bmQtY29sb3I6I2Y0ZjRmNH0udmlib3IgLnNlbGVjdC1zZWFyY2h7cG9zaXRpb246cmVsYXRpdmU7cGFkZGluZy1yaWdodDo0MHB4fS52aWJvciAuc2VsZWN0LXNlYXJjaCAuYXJyb3d7Y29udGVudDpcIlwiO3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjE1cHg7dG9wOjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpO2Rpc3BsYXk6YmxvY2s7d2lkdGg6MTZweDtoZWlnaHQ6MTZweDtiYWNrZ3JvdW5kLWltYWdlOnVybChkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUJqYkdGemN6MGlibU10YVdOdmJpQm5iSGx3YUNJZ2VHMXNibk05SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpJd01EQXZjM1puSWlCM2FXUjBhRDBpTVRZaUlHaGxhV2RvZEQwaU1UWWlJSFpwWlhkQ2IzZzlJakFnTUNBeE5pQXhOaUkrRFFvZ0lEeHdZWFJvSUdacGJHdzlJaU15WXpKak1tTWlJR1E5SWswNElERXhMalJNTWk0MklEWWdOQ0EwTGpac05DQTBJRFF0TkV3eE15NDBJRFlpTHo0TkNqd3ZjM1puUGcwSyk7dHJhbnNpdGlvbjotd2Via2l0LXRyYW5zZm9ybSAuMTVzIGVhc2UtaW4tb3V0O3RyYW5zaXRpb246dHJhbnNmb3JtIC4xNXMgZWFzZS1pbi1vdXQ7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjE1cyBlYXNlLWluLW91dCwtd2Via2l0LXRyYW5zZm9ybSAuMTVzIGVhc2UtaW4tb3V0fS52aWJvciAuc2VsZWN0LXNlYXJjaCAuYXJyb3c6YmVmb3JlLC52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faGlkZXtkaXNwbGF5Om5vbmV9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9zZWxlY3Rpb257cG9zaXRpb246cmVsYXRpdmV9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9zZWxlY3Rpb24+ZGl2e2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7cGFkZGluZzowIDE1cHh9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9pbnB1dCBpbnB1dHt3aWR0aDoxMDAlO3BhZGRpbmc6MCAxNXB4O3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7Zm9udC1zaXplOjE0cHg7Y29sb3I6IzJjMmMyYztiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50fS52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faW5wdXQgaW5wdXQ6Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXJ7Y29sb3I6cmdiYSg0NCw0NCw0NCwuMil9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9pbnB1dCBpbnB1dDotbXMtaW5wdXQtcGxhY2Vob2xkZXJ7Y29sb3I6cmdiYSg0NCw0NCw0NCwuMil9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9pbnB1dCBpbnB1dDo6LW1zLWlucHV0LXBsYWNlaG9sZGVye2NvbG9yOnJnYmEoNDQsNDQsNDQsLjIpfS52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faW5wdXQgaW5wdXQ6OnBsYWNlaG9sZGVye2NvbG9yOnJnYmEoNDQsNDQsNDQsLjIpfS52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fcmVtb3Zle2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjt3aWR0aDoxNnB4O2hlaWdodDoxNnB4O21hcmdpbi1sZWZ0OjVweDtib3JkZXItcmFkaXVzOjUwJTtiYWNrZ3JvdW5kLWNvbG9yOiNiYWJhYmE7Y3Vyc29yOnBvaW50ZXI7dHJhbnNpdGlvbjpiYWNrZ3JvdW5kLWNvbG9yIC4xNXMgbGluZWFyfS52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fcmVtb3ZlOmhvdmVye2JhY2tncm91bmQtY29sb3I6Izk0OTQ5NH0udmlib3IgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2xvYWRlci1jZW50ZXJ7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MTJweDt0b3A6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO3dpZHRoOjIxcHg7aGVpZ2h0OjIxcHg7YmFja2dyb3VuZDojZmZmO3otaW5kZXg6Mn0udmlib3IgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2xvYWRlci1jZW50ZXJbaGlkZGVuXXtkaXNwbGF5Om5vbmV9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9sb2FkZXItY2VudGVyIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9sb2FkZXJ7d2lkdGg6MTZweDtoZWlnaHQ6MTZweDtib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym9yZGVyLXdpZHRoOjJweDtib3JkZXItc3R5bGU6c29saWQ7Ym9yZGVyLWNvbG9yOiMyMjI3MmUgcmdiYSgzNCwzOSw0NiwuNCkgcmdiYSgzNCwzOSw0NiwuNCk7Ym9yZGVyLXJhZGl1czoxMDAlOy13ZWJraXQtYW5pbWF0aW9uOi40NXMgbGluZWFyIGluZmluaXRlIGNsb2Nrd2lzZTthbmltYXRpb246LjQ1cyBsaW5lYXIgaW5maW5pdGUgY2xvY2t3aXNlfS52aWJvciAuc2VsZWN0LWRyb3Bkb3due3Bvc2l0aW9uOmFic29sdXRlO3RvcDoxMDAlO2xlZnQ6LTFweDtyaWdodDotMXB4O2JvcmRlcjoxcHggc29saWQgI2Q1ZDlkZTtib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOjVweDtib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czo1cHg7Ym9yZGVyLXRvcDowO2JhY2tncm91bmQ6I2ZmZjtvdmVyZmxvdzpoaWRkZW47ei1pbmRleDoyfS52aWJvciAuc2VsZWN0LWRyb3Bkb3duLW9wdGdyb3Vwe21heC1oZWlnaHQ6MzAwcHg7b3ZlcmZsb3cteTphdXRvfS52aWJvciAuc2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvbnttaW4taGVpZ2h0OjMwcHg7cGFkZGluZzoxMHB4IDE1cHg7Y29sb3I6IzJjMmMyY30udmlib3IgLnNlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb246aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDY2LDEzMiwyMTUsLjEpfS52aWJvciAuc2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvbi5sb2FkaW5ne2ZvbnQtc2l6ZToxNnB4O2xpbmUtaGVpZ2h0OjE4cHg7dGV4dC1hbGlnbjpjZW50ZXI7Y29sb3I6IzhiOGI4M30udmlib3IgLnNlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb24ubG9hZGVye3RleHQtYWxpZ246Y2VudGVyO2NvbG9yOiM4YjhiODN9LnZpYm9yIC5zZWxlY3QtZHJvcGRvd24tcGFnZXJ7cGFkZGluZzoxMHB4O3RleHQtYWxpZ246Y2VudGVyO2JvcmRlci10b3A6MXB4IGRhc2hlZCAjZDVkOWRlfS52aWJvciAuc2VsZWN0LWRyb3Bkb3duLXBhZ2VyLXBhZ2V7Zm9udC1zaXplOjEycHg7Y29sb3I6IzhiOGI4M30udmlib3IgLnNlbGVjdC1kcm9wZG93bi1wYWdlci1sb2FkbW9yZXtib3JkZXI6MDtiYWNrZ3JvdW5kOjAgMDtib3gtc2hhZG93Om5vbmU7Y29sb3I6IzhiOGI4Mzt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2V9LnZpYm9yIC5zZWxlY3QtZHJvcGRvd24tcGFnZXItcGFnZSsuc2VsZWN0LWRyb3Bkb3duLXBhZ2VyLWxvYWRtb3Jle21hcmdpbi10b3A6MTBweH0udmlib3Iub3Blbi12aWJvcntib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOjA7Ym9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6MH0udmlib3Iub3Blbi12aWJvciAuc2VsZWN0LXNlYXJjaCAuYXJyb3d7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKSByb3RhdGUoMTgwZGVnKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKSByb3RhdGUoMTgwZGVnKX0udmlib3I6bm90KC5tdWx0aXBsZSkgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX3JlbW92ZXtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDowO3RvcDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKX0udmlib3IubXVsdGlwbGUgLnNlbGVjdC1zZWFyY2h7cGFkZGluZzo1cHggNDBweCA1cHggMTVweH0udmlib3IubXVsdGlwbGUgLnNlbGVjdC1zZWFyY2gtbGlzdHtkaXNwbGF5OmZsZXg7ZmxleC1mbG93OnJvdyB3cmFwO21hcmdpbjotNXB4fS52aWJvci5tdWx0aXBsZSAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW17cGFkZGluZzo1cHh9LnZpYm9yLm11bHRpcGxlIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9pbnB1dHtmbGV4OjF9LnZpYm9yLm11bHRpcGxlIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9pbnB1dCBpbnB1dHtoZWlnaHQ6MjhweDtwYWRkaW5nOjB9LnZpYm9yLm11bHRpcGxlIC52aWJvcl9fc2VsZWN0aW9ue2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7aGVpZ2h0OjI4cHg7cGFkZGluZzowIDdweDtib3JkZXItcmFkaXVzOjNweDtmb250LXNpemU6MTRweDtiYWNrZ3JvdW5kOiNlNWU1ZTc7Y29sb3I6IzJjMmMyY30udmlib3I6bm90KC5tdWx0aXBsZSkgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2lucHV0IGlucHV0LC52aWJvcjpub3QoLm11bHRpcGxlKSAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fc2VsZWN0aW9uPmRpdnttaW4taGVpZ2h0OjM4cHh9QC13ZWJraXQta2V5ZnJhbWVzIGNsb2Nrd2lzZXt0b3std2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKSB0cmFuc2xhdGV6KDApO3RyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKSB0cmFuc2xhdGV6KDApfX1Aa2V5ZnJhbWVzIGNsb2Nrd2lzZXt0b3std2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKSB0cmFuc2xhdGV6KDApO3RyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKSB0cmFuc2xhdGV6KDApfX1gXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgcHJvdmlkZXJzOiBbe1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nVmlib3JDb21wb25lbnQpLFxuICAgIG11bHRpOiB0cnVlXG4gIH1dXG59KVxuZXhwb3J0IGNsYXNzIE5nVmlib3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICAvLyBMb2NhbCBWYXJpYWJsZVxuICBwdWJsaWMgX21vZGVsOiBhbnk7XG5cbiAgcHJpdmF0ZSBmaXJzdExvYWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBvcHRpb25zOiBBcnJheTxhbnk+O1xuICBwdWJsaWMgb3V0cHV0OiBBcnJheTxhbnk+O1xuXG4gIHB1YmxpYyBpc09wZW46IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBvbGRRdWVyeTogc3RyaW5nO1xuICBwdWJsaWMgcXVlcnk6IHN0cmluZztcblxuICBwdWJsaWMgc2VsZWN0b3JQb3NpdGlvbiA9IDA7XG4gIHByaXZhdGUgd2FpdFRpbWUgPSA1MDA7XG5cbiAgcHJpdmF0ZSBlbDogRWxlbWVudDsgICAgICAgICAgIC8vIHRoaXMgY29tcG9uZW50ICBlbGVtZW50IGA8dmlib3I+YFxuICBwcml2YXRlIGlucHV0RWw6IEhUTUxJbnB1dEVsZW1lbnQ7IC8vIGA8aW5wdXQ+YCBlbGVtZW50IGluIGA8dmlib3I+YCBmb3IgYXV0byBjb21wbGV0ZVxuICBAVmlld0NoaWxkKCdpbnB1dENvbnRyb2wnKSBwdWJsaWMgaW5wdXRDb250cm9sOiBOZ01vZGVsO1xuXG4gIC8vIElucHV0cyAmIE91dHB1dHNcbiAgQElucHV0KCkgcHVibGljIG11bHRpcGxlID0gZmFsc2U7XG4gIEBJbnB1dCgpIHB1YmxpYyBtdWx0aXBsZUxpbWl0ID0gSW5maW5pdHk7XG4gIEBJbnB1dCgpIHB1YmxpYyBjb3VudE9uUGFnZSA9IDEwO1xuXG4gIEBJbnB1dCgpIHB1YmxpYyBwbGFjZWhvbGRlciA9ICdWaWJvcic7XG4gIEBJbnB1dCgpIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyByZXF1aXJlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBwdWJsaWMgYWxsb3dSZXNldCA9IHRydWU7XG4gIHB1YmxpYyBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gIC8vIMOQwp7DkcKCw5DCvsOQwrHDkcKAw5DCsMOQwrbDkMK1w5DCvcOQwrjDkMK1IMORwoHDkMK/w5DCuMORwoHDkMK6w5DCvsOQwrJcbiAgQENvbnRlbnRDaGlsZChWaWJvckJvdGhEaXJlY3RpdmUpIHB1YmxpYyBib3RoVGVtcGxhdGU6IFZpYm9yQm90aERpcmVjdGl2ZTtcbiAgQENvbnRlbnRDaGlsZChWaWJvckRyb3Bkb3duRGlyZWN0aXZlKSBwdWJsaWMgZHJvcGRvd25UZW1wbGF0ZTogVmlib3JEcm9wZG93bkRpcmVjdGl2ZTtcbiAgQENvbnRlbnRDaGlsZChWaWJvclNlbGVjdGVkRGlyZWN0aXZlKSBwdWJsaWMgc2VsZWN0ZWRUZW1wbGF0ZTogVmlib3JTZWxlY3RlZERpcmVjdGl2ZTtcbiAgQENvbnRlbnRDaGlsZChWaWJvckNyZWF0ZURpcmVjdGl2ZSkgcHVibGljIGNyZWF0ZVRlbXBsYXRlOiBWaWJvckNyZWF0ZURpcmVjdGl2ZTtcbiAgQElucHV0KCkgcHVibGljIGxpc3RGb3JtYXR0ZXI6IChhcmc6IGFueSwgdmFsdWU6IHN0cmluZykgPT4gc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgZHJvcGRvd25Gb3JtYXR0ZXI6IChhcmc6IGFueSwgdmFsdWU6IHN0cmluZykgPT4gc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgdmlld1Byb3BlcnR5ID0gJ05hbWUnOyAgLy8gw5DCn8OQwr7DkMK7w5DCtSDDkMK0w5DCu8ORwo8gw5DCtMOQwrXDkcKEw5DCvsOQwrvDkcKCw5DCvcOQwr7DkMKzw5DCviDDkMK+w5HCgsOQwr7DkMKxw5HCgMOQwrDDkMK2w5DCtcOQwr3DkMK4w5HCj1xuXG4gIEBJbnB1dCgpIHB1YmxpYyBtb2RlbFByb3BlcnR5ID0gJ2lkJzsgIC8vIMOQwqLDkMK+LCDDkcKHw5HCgsOQwr4gw5DCt8OQwrDDkMK/w5DCuMORwoHDkcKLw5DCssOQwrDDkMK1w5HCgsORwoHDkcKPIMOQwrIgw5DCnMOQwr7DkMK0w5DCtcOQwrvDkcKMXG4gIEBJbnB1dCgpIHB1YmxpYyBwcmVsb2FkUHJvcGVydHkgPSAnaWRzJzsgLy8gw5DCmsOQwrvDkcKOw5HChyDDkMK3w5DCsMOQwr/DkcKAw5DCvsORwoHDkMKwIMOQwrogw5HCgcOQwrXDkcKAw5DCssOQwrXDkcKAw5HCgyDDkMK0w5DCu8ORwo8gw5DCv8ORwoDDkMK1w5DCtMOQwrfDkMKww5DCs8ORwoDDkcKDw5DCt8OQwrrDkMK4LCDDkMK1w5HCgcOQwrvDkMK4IHVuZGVmaW5lZCDDkMK3w5DCsMOQwr/DkMK4w5HCgcORwovDkMKyw5DCsMOQwrXDkcKCw5HCgcORwo8gw5DCssOQwrXDkcKBw5HCjCDDkMK+w5DCscORworDkMK1w5DCusORwoJcbiAgQElucHV0KCkgcHVibGljIHByZWxvYWRGaWVsZDogc3RyaW5nID0gdW5kZWZpbmVkOyAvLyDDkMKXw5DCvcOQwrDDkcKHw5DCtcOQwr3DkMK4w5DCtSDDkMK/w5DCvsOQwrvDkcKPLCDDkMK6w5DCvsORwoLDkMK+w5HCgMOQwrUgw5DCvcOQwrXDkMK+w5DCscORwoXDkMK+w5DCtMOQwrjDkMK8w5DCviDDkMK+w5HCgsOQwr/DkcKAw5DCsMOQwrLDkMK4w5HCgsORwowgw5DCsiDDkMK3w5DCsMOQwr/DkcKAw5DCvsORwoEuXG4gIEBJbnB1dCgpIHB1YmxpYyBzZWFyY2hQcm9wZXJ0eSA9ICdxdWVyeSc7XG5cbiAgQElucHV0KCkgcHVibGljIGRhdGFMaXN0OiAoKHBhcmFtOiBPYmplY3QsIHBhZ2U6IG51bWJlciwgY291bnRPblBhZ2U/OiBudW1iZXIpID0+IE9ic2VydmFibGU8SURhdGFSZXNwb25zZT4pIHwgQXJyYXk8YW55PjtcbiAgQElucHV0KCkgcHVibGljIGV4Y2x1ZGVMaXN0OiBBcnJheTxhbnk+O1xuICBASW5wdXQoKSBwdWJsaWMgYWRkaXRpb25hbEZpbHRlciA9IHt9O1xuICBASW5wdXQoKSBwdWJsaWMgb25seUVtaXR0ZXI6IGJvb2xlYW47XG4gIEBPdXRwdXQoJ2NoYW5nZUZ1bGxNb2RlbCcpIHB1YmxpYyBjaGFuZ2VGdWxsTW9kZWw6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cbiAgQElucHV0KCkgcHVibGljIG5ld01lc3NhZ2U6IHN0cmluZyA9IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgcHVibGljIENyZWF0ZU5ldzogKHF1ZXJ5OiBzdHJpbmcpID0+IE9ic2VydmFibGU8YW55PiB8IGFueSA9IChxdWVyeTogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIHF1ZXJ5O1xuICB9XG5cblxuICAvLyBTdWJzY3JpcHRpb25cbiAgcHVibGljIGRhdGFMaXN0U3ViOiBTdWJzY3JpcHRpb247XG5cblxuICAvLyBPUFRJT05TXG4gIHB1YmxpYyBUcmFja0J5Rm4oaW5kZXg6IG51bWJlcik6IGFueSB7XG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG5cbiAgcHVibGljIHNob3dEcm9wZG93bkxpc3QoZXZlbnQ6IEZvY3VzRXZlbnQgfCBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubXVsdGlwbGUgJiYgdGhpcy5vdXRwdXQubGVuZ3RoID49IHRoaXMubXVsdGlwbGVMaW1pdCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCgnb3Blbi12aWJvcicpO1xuICAgIHRoaXMuaW5wdXRFbC5mb2N1cygpO1xuICAgIHRoaXMudXBkYXRlT3B0aW9ucygpO1xuICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gIH1cblxuICBwcml2YXRlIGhpZGVEcm9wZG93bkxpc3QoKTogdm9pZCB7XG4gICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuLXZpYm9yJyk7XG4gICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICB0aGlzLmlucHV0RWwuYmx1cigpO1xuICB9XG5cbiAgcHVibGljIGhpZGVEcm9wZG93bkxpc3RXaXRoRGVsYXkoKTogdm9pZCB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmhpZGVEcm9wZG93bkxpc3QoKTtcbiAgICB9LCAxMDApO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZURyb3Bkb3duKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIGlmIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgdGhpcy5oaWRlRHJvcGRvd25MaXN0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2hvd0Ryb3Bkb3duTGlzdCh1bmRlZmluZWQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGVsYXk6IEZ1bmN0aW9uID0gKGZ1bmN0aW9uICgpOiBGdW5jdGlvbiB7XG4gICAgbGV0IHRpbWVyID0gMDtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNhbGxiYWNrOiBhbnksIG1zOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQoY2FsbGJhY2ssIG1zKTtcbiAgICB9O1xuICB9KSgpO1xuXG4gIHB1YmxpYyB1cGRhdGVPcHRpb25zKCk6IHZvaWQge1xuICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmRhdGFMaXN0LmZpbHRlcihkYXRhID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLnF1ZXJ5IHx8IHRoaXMucXVlcnkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGY6IGFueSA9IGZldGNoRnJvbU9iamVjdChkYXRhLCB0aGlzLnNlYXJjaFByb3BlcnR5KTtcbiAgICAgICAgaWYgKGYgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZikuaW5kZXhPZih0aGlzLnF1ZXJ5KSA+PSAwO1xuICAgICAgfSkuZmlsdGVyKGRhdGEgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuZXhjbHVkZUxpc3QpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkID0gZmV0Y2hGcm9tT2JqZWN0KGRhdGEsIHRoaXMubW9kZWxQcm9wZXJ0eSkudmFsdWVPZigpO1xuICAgICAgICByZXR1cm4gdGhpcy5leGNsdWRlTGlzdC5maW5kSW5kZXgoZXggPT4ge1xuICAgICAgICAgIGxldCBhID0gZmV0Y2hGcm9tT2JqZWN0KGV4LCB0aGlzLm1vZGVsUHJvcGVydHkpLnZhbHVlT2YoKTtcbiAgICAgICAgICByZXR1cm4gZGVlcEVxdWFsKGQsIGEpO1xuICAgICAgICB9KSA8IDA7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgaWYgKHRoaXMuZGF0YUxpc3RTdWIpIHsgdGhpcy5kYXRhTGlzdFN1Yi51bnN1YnNjcmliZSgpOyB9XG4gICAgICBpZiAoIXRoaXMuY3VycmVudENhY2hlKSB7XG4gICAgICAgIHRoaXMuY3VycmVudENhY2hlID0ge1xuICAgICAgICAgIGNvdW50RWxlbWVudDogMCxcbiAgICAgICAgICBjb3VudFBhZ2VzOiAxLFxuICAgICAgICAgIGN1cnJlbnRQYWdlOiAxLFxuICAgICAgICAgIG9iamVjdHM6IFtdLFxuICAgICAgICAgIHF1ZXJ5OiB0aGlzLnF1ZXJ5LFxuICAgICAgICAgIHBhcmFtczogT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5hZGRpdGlvbmFsRmlsdGVyKVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNhY2hlTGF6eURhdGEucHVzaCh0aGlzLmN1cnJlbnRDYWNoZSk7XG5cbiAgICAgICAgbGV0IHBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYWRkaXRpb25hbEZpbHRlcikgYXMgYW55O1xuICAgICAgICBwYXJhbXNbdGhpcy5zZWFyY2hQcm9wZXJ0eV0gPSB0aGlzLnF1ZXJ5O1xuXG4gICAgICAgIHRoaXMuZGF0YUxpc3RTdWIgPSAoPE9ic2VydmFibGU8SURhdGFSZXNwb25zZT4+dGhpcy5kYXRhTGlzdChwYXJhbXMsIDEsIHRoaXMuY291bnRPblBhZ2UpKS5zdWJzY3JpYmUoYW5zd2VyID0+IHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRDYWNoZS5vYmplY3RzID0gdGhpcy5jdXJyZW50Q2FjaGUub2JqZWN0cy5jb25jYXQoYW5zd2VyLmxpc3QpO1xuICAgICAgICAgIHRoaXMuY3VycmVudENhY2hlLmNvdW50RWxlbWVudCA9IGFuc3dlci5oZWFkZXJzWydjb3VudCddO1xuICAgICAgICAgIHRoaXMuY3VycmVudENhY2hlLmNvdW50UGFnZXMgPSBNYXRoLmNlaWwodGhpcy5jdXJyZW50Q2FjaGUuY291bnRFbGVtZW50IC8gdGhpcy5jb3VudE9uUGFnZSk7XG4gICAgICAgIH0sICgpID0+IHsgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHVwZGF0ZU9wdGlvbnNJbkRlbGF5KCk6IHZvaWQge1xuICAgIGxldCBkZWxheU1zOiBudW1iZXIgPSB0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgQXJyYXkgPyAxMCA6IHRoaXMud2FpdFRpbWU7XG5cbiAgICAvLyBleGVjdXRpbmcgYWZ0ZXIgdXNlciBzdG9wcGVkIHR5cGluZ1xuICAgIHRoaXMuZGVsYXkoKCkgPT4ge1xuICAgICAgdGhpcy5vbGRRdWVyeSA9IHRoaXMucXVlcnk7XG4gICAgICB0aGlzLmN1cnJlbnRDYWNoZSA9IHRoaXMuR2V0Q2FjaGUodGhpcy5xdWVyeSk7XG4gICAgICB0aGlzLnVwZGF0ZU9wdGlvbnMoKTtcbiAgICB9LCBkZWxheU1zKTtcbiAgfVxuXG4gIHByaXZhdGUgZm9jdXNTZWxlY3RlZE9wdGlvbigpOiB2b2lkIHtcbiAgICBsZXQgbGlzdDogYW55ID0gPEhUTUxFbGVtZW50PnRoaXMuZWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2VsZWN0LWRyb3Bkb3duJylbMF07XG4gICAgbGV0IHRhcmdldExpOiBhbnkgPSA8SFRNTEVsZW1lbnQ+dGhpcy5lbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXAtb3B0aW9uJylbdGhpcy5zZWxlY3RvclBvc2l0aW9uXTtcbiAgICBzY3JvbGxBY3RpdmVPcHRpb24obGlzdCwgdGFyZ2V0TGkpO1xuICB9XG5cbiAgcHVibGljIGtleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuT3B0aW9ucykge1xuICAgICAgdGhpcy5zaG93RHJvcGRvd25MaXN0KHVuZGVmaW5lZCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHRvdGFsTnVtSXRlbTogbnVtYmVyID0gdGhpcy5PcHRpb25zLmxlbmd0aDtcblxuICAgIGlmICh0aGlzLlNob3dOZXcpIHtcbiAgICAgIHRvdGFsTnVtSXRlbSsrO1xuICAgIH1cblxuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgY2FzZSAyNzogLy8gRVNDLCBoaWRlIGF1dG8gY29tcGxldGVcbiAgICAgICAgdGhpcy5oaWRlRHJvcGRvd25MaXN0KCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDM4OiAvLyBVUCwgc2VsZWN0IHRoZSBwcmV2aW91cyBsaSBlbFxuICAgICAgICB0aGlzLnNlbGVjdG9yUG9zaXRpb24gPSAodG90YWxOdW1JdGVtICsgdGhpcy5zZWxlY3RvclBvc2l0aW9uIC0gMSkgJSB0b3RhbE51bUl0ZW07XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDQwOiAvLyBET1dOLCBzZWxlY3QgdGhlIG5leHQgbGkgZWwgb3IgdGhlIGZpcnN0IG9uZVxuICAgICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JQb3NpdGlvbiA9ICh0b3RhbE51bUl0ZW0gKyB0aGlzLnNlbGVjdG9yUG9zaXRpb24gKyAxKSAlIHRvdGFsTnVtSXRlbTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgMTM6IC8vIEVOVEVSLCBjaG9vc2UgaXQhIVxuICAgICAgICBpZiAodG90YWxOdW1JdGVtID4gMCkge1xuICAgICAgICAgIGlmICh0aGlzLnNlbGVjdG9yUG9zaXRpb24gPT09IHRoaXMuT3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuQWRkTmV3T2JqZWN0KHRoaXMuQ3JlYXRlTmV3KHRoaXMucXVlcnkpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RPbmUoZXZlbnQsIHRoaXMuT3B0aW9uc1t0aGlzLnNlbGVjdG9yUG9zaXRpb25dKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5TaG93TmV3KSB7XG4gICAgICAgICAgdGhpcy5BZGROZXdPYmplY3QodGhpcy5DcmVhdGVOZXcodGhpcy5xdWVyeSkpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OiBicmVhaztcbiAgICB9XG4gICAgdGhpcy5mb2N1c1NlbGVjdGVkT3B0aW9uKCk7XG4gIH1cblxuICBwdWJsaWMgbmV4dFBhZ2UoJGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgLy8gVmFsaWRhdG9yc1xuICAgIGlmICghKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBGdW5jdGlvbikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRGF0YSBMaXN0IG1hc3QgYmUgRnVuY3Rpb24nKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmN1cnJlbnRDYWNoZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGb3IgbmV4dCBwYWdlIG5lZWQgY2FjaGUgZm9yIGZpcnN0IFBhZ2UnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY3VycmVudENhY2hlLmN1cnJlbnRQYWdlID49IHRoaXMuY3VycmVudENhY2hlLmNvdW50UGFnZXMpIHsgdGhyb3cgbmV3IEVycm9yKCdNYXggUGFnZSBMaW1pdCcpOyB9XG5cbiAgICBpZiAodGhpcy5kYXRhTGlzdFN1YikgeyB0aGlzLmRhdGFMaXN0U3ViLnVuc3Vic2NyaWJlKCk7IH1cblxuICAgIGxldCBwYXJhbXM6IGFueSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYWRkaXRpb25hbEZpbHRlcik7XG4gICAgcGFyYW1zW3RoaXMuc2VhcmNoUHJvcGVydHldID0gdGhpcy5xdWVyeTtcblxuICAgIHRoaXMuZGF0YUxpc3RTdWIgPSB0aGlzLmRhdGFMaXN0KHBhcmFtcywgdGhpcy5jdXJyZW50Q2FjaGUuY3VycmVudFBhZ2UgKyAxLCB0aGlzLmNvdW50T25QYWdlKS5zdWJzY3JpYmUoYW5zd2VyID0+IHtcbiAgICAgIHRoaXMuY3VycmVudENhY2hlLmN1cnJlbnRQYWdlKys7XG4gICAgICB0aGlzLmN1cnJlbnRDYWNoZS5jb3VudEVsZW1lbnQgPSBhbnN3ZXIuaGVhZGVyc1snY291bnQnXTtcbiAgICAgIHRoaXMuY3VycmVudENhY2hlLmNvdW50UGFnZXMgPSBNYXRoLmNlaWwodGhpcy5jdXJyZW50Q2FjaGUuY291bnRFbGVtZW50IC8gdGhpcy5jb3VudE9uUGFnZSk7XG4gICAgICB0aGlzLmN1cnJlbnRDYWNoZS5vYmplY3RzID0gdGhpcy5jdXJyZW50Q2FjaGUub2JqZWN0cy5jb25jYXQoYW5zd2VyLmxpc3QpO1xuICAgICAgdGhpcy5zZWxlY3RvclBvc2l0aW9uID0gKHRoaXMuY3VycmVudENhY2hlLmN1cnJlbnRQYWdlIC0gMSkgKiB0aGlzLmNvdW50T25QYWdlICsgMTtcbiAgICAgIHRoaXMuZm9jdXNTZWxlY3RlZE9wdGlvbigpO1xuICAgIH0sICgpID0+IHsgfSk7XG4gIH1cblxuICAvLyBNT0RFTFxuICBwcml2YXRlIGNsZWFyUHJvcGVydHkoKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RvclBvc2l0aW9uID0gMDtcbiAgICB0aGlzLnF1ZXJ5ID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdE9uZSgkZXZlbnQ6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50LCBkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICAvLyDDkMKkw5DCuMOQwrvDkcKMw5HCgsORwoAgw5DCvcOQwrXDkMK9w5HCg8OQwrbDkMK9w5HCi8ORwoUgw5HCgcOQwr7DkMKxw5HCi8ORwoLDkMK4w5DCuVxuICAgIGlmICgkZXZlbnQgaW5zdGFuY2VvZiBNb3VzZUV2ZW50ICYmICRldmVudC5idXR0b24gIT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICBpZiAodGhpcy5tdWx0aXBsZSAmJiB0aGlzLm91dHB1dC5sZW5ndGggPCB0aGlzLm11bHRpcGxlTGltaXQpIHtcbiAgICAgIHRoaXMub3V0cHV0LnB1c2goZGF0YSk7XG4gICAgfSBlbHNlIGlmICghdGhpcy5tdWx0aXBsZSkge1xuICAgICAgdGhpcy5vdXRwdXQgPSBbZGF0YV07XG4gICAgfVxuICAgIHRoaXMuY2hhbmdlRnVsbE1vZGVsLmVtaXQodGhpcy5vdXRwdXQpO1xuICAgIHRoaXMuTW9kZWwgPSB0aGlzLlZhbHVlRnJvbU91dHB1dDtcbiAgICB0aGlzLmNsZWFyUHJvcGVydHkoKTtcbiAgICB0aGlzLmhpZGVEcm9wZG93bkxpc3QoKTtcbiAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfTtcblxuICBwdWJsaWMgcmVtb3ZlT25lKGluZGV4OiBudW1iZXIsIGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIGlmIChldmVudCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG5cbiAgICB0aGlzLm91dHB1dC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRoaXMuTW9kZWwgPSB0aGlzLlZhbHVlRnJvbU91dHB1dDtcblxuICAgIC8vIHNldCBjbGFzc1xuICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgdGhpcy5pbnB1dENvbnRyb2wuY29udHJvbC5tYXJrQXNUb3VjaGVkKCk7XG5cbiAgICAvLyBvcGVuIGRyb3Bkb3duXG4gICAgaWYgKHRoaXMucmVxdWlyZWQpIHtcbiAgICAgIHRoaXMuc2hvd0Ryb3Bkb3duTGlzdCh1bmRlZmluZWQpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZPUk1BVFRJTkdcblxuICBwdWJsaWMgZ2V0IFNlbGVjdGVkVGVtcGxhdGUoKTogVGVtcGxhdGVSZWY8YW55PiB7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRUZW1wbGF0ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRUZW1wbGF0ZS50ZW1wbGF0ZVJlZjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYm90aFRlbXBsYXRlKSB7XG4gICAgICByZXR1cm4gdGhpcy5ib3RoVGVtcGxhdGUudGVtcGxhdGVSZWY7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0IERyb3Bkb3duVGVtcGxhdGUoKTogVGVtcGxhdGVSZWY8YW55PiB7XG4gICAgaWYgKHRoaXMuZHJvcGRvd25UZW1wbGF0ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZHJvcGRvd25UZW1wbGF0ZS50ZW1wbGF0ZVJlZjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYm90aFRlbXBsYXRlKSB7XG4gICAgICByZXR1cm4gdGhpcy5ib3RoVGVtcGxhdGUudGVtcGxhdGVSZWY7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0TGlzdEZvcm1hdHRlZChkYXRhOiBhbnkpOiBzdHJpbmcge1xuICAgIGxldCBmb3JtYXR0ZXI6IGFueSA9IHRoaXMubGlzdEZvcm1hdHRlciB8fCBkZWZhdWx0Rm9ybWF0dGVyO1xuICAgIHJldHVybiBmb3JtYXR0ZXIuYXBwbHkodGhpcywgW2RhdGEsIHRoaXMudmlld1Byb3BlcnR5XSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0RHJvcGRvd25Gb3JtYXR0ZWQoZGF0YTogYW55KTogc3RyaW5nIHtcbiAgICBsZXQgZm9ybWF0dGVyOiBhbnkgPSB0aGlzLmRyb3Bkb3duRm9ybWF0dGVyIHx8IGRlZmF1bHRGb3JtYXR0ZXI7XG4gICAgcmV0dXJuIGZvcm1hdHRlci5hcHBseSh0aGlzLCBbZGF0YSwgdGhpcy52aWV3UHJvcGVydHldKTtcbiAgfVxuXG4gIC8vIElOSVRcbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIC8vIHRoaXMuTW9kZWwgPSB0aGlzLlZhbHVlRnJvbU91dHB1dDsgw5DCrcORwoLDkMK+IMOQwrLDkcKAw5DCvsOQwrTDkMK1IMORwoLDkcKDw5HCgiDDkcKCw5DCvsOQwrbDkMK1IMORwoPDkMK2w5DCtSDDkMK9w5DCtSDDkMK9w5DCsMOQwrTDkMK+LlxuICAgIHRoaXMuZWwgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd2aWJvcicpLml0ZW0oMCk7XG4gICAgaWYgKHRoaXMubXVsdGlwbGUpIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCgnbXVsdGlwbGUnKTtcbiAgICBpZiAodGhpcy5yZXF1aXJlZCkgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCdyZXF1aXJlZCcpO1xuXG4gICAgdGhpcy5pbnB1dEVsID0gPEhUTUxJbnB1dEVsZW1lbnQ+KHRoaXMuZWwucXVlcnlTZWxlY3RvcignaW5wdXQnKSk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkNoYW5nZXMoaW5wdXRzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGlucHV0c1snZGF0YUxpc3QnXSAmJiBpbnB1dHNbJ2RhdGFMaXN0J10uY3VycmVudFZhbHVlKSB7XG4gICAgICAvLyBPdXRwdXRcbiAgICAgIGlmICh0aGlzLk1vZGVsID09PSB1bmRlZmluZWQgfHwgdGhpcy5Nb2RlbCA9PSBudWxsKSB7XG4gICAgICAgIHRoaXMub3V0cHV0ID0gW107XG4gICAgICAgIHRoaXMuY2hhbmdlRnVsbE1vZGVsLmVtaXQodGhpcy5vdXRwdXQpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLk1vZGVsIGluc3RhbmNlb2YgQXJyYXkgJiYgdGhpcy5tdWx0aXBsZSkge1xuICAgICAgICB0aGlzLk91dHB1dCA9IHRoaXMuTW9kZWw7XG4gICAgICB9IGVsc2UgaWYgKCEodGhpcy5Nb2RlbCBpbnN0YW5jZW9mIEFycmF5KSAmJiAhdGhpcy5tdWx0aXBsZSkge1xuICAgICAgICB0aGlzLk91dHB1dCA9IFt0aGlzLk1vZGVsXTtcblxuICAgICAgICBpZiAoIXRoaXMub3V0cHV0IHx8ICF0aGlzLm91dHB1dC5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLk1vZGVsID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZWwgJiYgaW5wdXRzWydtdWx0aXBsZSddKSB7XG4gICAgICBpZiAoaW5wdXRzWydtdWx0aXBsZSddLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ211bHRpcGxlJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ211bHRpcGxlJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZWwgJiYgaW5wdXRzWydyZXF1aXJlZCddKSB7XG4gICAgICBpZiAoaW5wdXRzWydyZXF1aXJlZCddLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ3JlcXVpcmVkJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ3JlcXVpcmVkJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlucHV0c1snYWRkaXRpb25hbEZpbHRlciddKSB7XG4gICAgICB0aGlzLmN1cnJlbnRDYWNoZSA9IHRoaXMuR2V0Q2FjaGUodGhpcy5xdWVyeSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxEaXZFbGVtZW50Pikge1xuICAgIHRoaXMub3V0cHV0ID0gW107XG4gIH1cblxuICAvLyBGT1JNU1xuICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgLy8gw5DCncOQwr7DkcKAw5DCvMOQwrDDkMK7w5HCjMOQwr3DkcKLw5DCuSB1cGRhdGUgw5DCvMOQwr7DkMK0w5DCtcOQwrvDkMK4XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICBpZiAoKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkgJiYgIXRoaXMubXVsdGlwbGUpIHx8ICghKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpICYmIHRoaXMubXVsdGlwbGUpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTW9kZWwgVHlwZSBFcnJvcicpO1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkgJiYgdGhpcy5Nb2RlbCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IHRoaXMuTW9kZWwubGVuZ3RoICYmIHZhbHVlLmV2ZXJ5KHYgPT4gdGhpcy5Nb2RlbC5pbmRleE9mKHYpID49IDApKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuTW9kZWwgPT09IHZhbHVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuZmlyc3RMb2FkID0gdHJ1ZTtcbiAgICAgIHRoaXMuTW9kZWwgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb25DaGFuZ2U6IGFueSA9ICgpID0+IHsgfTtcbiAgcHVibGljIG9uVG91Y2hlZDogYW55ID0gKCkgPT4geyB9O1xuXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgcHVibGljIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIGlmIChpc0Rpc2FibGVkKSB7XG4gICAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgfVxuICAgIC8vIGRpc2FibGUgb3RoZXIgY29tcG9uZW50cyBoZXJlXG4gIH1cblxuICBzZXQgTW9kZWwodmFsdWU6IGFueSkge1xuICAgIGlmICh0aGlzLm9ubHlFbWl0dGVyKSB7XG4gICAgICB0aGlzLm91dHB1dCA9IFtdO1xuICAgICAgdGhpcy5vbkNoYW5nZSh2YWx1ZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gT3V0cHV0XG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT0gbnVsbCkge1xuICAgICAgdGhpcy5vdXRwdXQgPSBbXTtcbiAgICAgIHRoaXMuY2hhbmdlRnVsbE1vZGVsLmVtaXQodGhpcy5vdXRwdXQpO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBBcnJheSAmJiB0aGlzLm11bHRpcGxlKSB7XG4gICAgICB0aGlzLk91dHB1dCA9IHZhbHVlO1xuICAgIH0gZWxzZSBpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSAmJiAhdGhpcy5tdWx0aXBsZSkge1xuICAgICAgdGhpcy5PdXRwdXQgPSBbdmFsdWVdO1xuICAgIH1cblxuICAgIC8vIE1vZGVsXG4gICAgdGhpcy5fbW9kZWwgPSB2YWx1ZTtcblxuICAgIC8vIEZvcm1zXG4gICAgdGhpcy5vbkNoYW5nZSh0aGlzLl9tb2RlbCk7XG4gIH1cblxuICBnZXQgTW9kZWwoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWw7XG4gIH1cblxuICAvLyBQUk9QRVJUWVxuICBnZXQgSW5wdXRIaWRlKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICByZXR1cm4gdGhpcy5vdXRwdXQubGVuZ3RoID49IHRoaXMubXVsdGlwbGVMaW1pdDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMub3V0cHV0Lmxlbmd0aCA9PT0gMSAmJiAhdGhpcy5pc09wZW47XG4gICAgfVxuICB9XG5cbiAgZ2V0IFZhbHVlRnJvbU91dHB1dCgpOiBhbnkge1xuICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICBsZXQgdG1wOiBBcnJheTxhbnk+ID0gW107XG4gICAgICBmb3IgKGxldCBvIG9mIHRoaXMub3V0cHV0KSB7XG4gICAgICAgIHRtcC5wdXNoKGZldGNoRnJvbU9iamVjdChvLCB0aGlzLm1vZGVsUHJvcGVydHkpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0bXA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmZXRjaEZyb21PYmplY3QodGhpcy5vdXRwdXRbMF0sIHRoaXMubW9kZWxQcm9wZXJ0eSk7XG4gICAgfVxuICB9XG5cbiAgc2V0IE91dHB1dChuZXdWYWx1ZTogQXJyYXk8YW55Pikge1xuICAgIGxldCBkYXRhTGlzdDogQXJyYXk8YW55PiA9IFtdO1xuICAgIGlmICh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIGRhdGFMaXN0ID0gdGhpcy5kYXRhTGlzdDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgaWYgKG5ld1ZhbHVlICYmIG5ld1ZhbHVlLmxlbmd0aCAmJiB0aGlzLmZpcnN0TG9hZCkge1xuICAgICAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcbiAgICAgICAgdGhpcy5maXJzdExvYWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKCF0aGlzLnByZWxvYWRQcm9wZXJ0eSkge1xuICAgICAgICAgIHRoaXMub3V0cHV0ID0gbmV3VmFsdWU7XG4gICAgICAgICAgdGhpcy5jaGFuZ2VGdWxsTW9kZWwuZW1pdCh0aGlzLm91dHB1dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGFyYW1zW3RoaXMucHJlbG9hZFByb3BlcnR5XSA9IG5ld1ZhbHVlLm1hcCh2YWwgPT4gZmV0Y2hGcm9tT2JqZWN0KHZhbCwgdGhpcy5wcmVsb2FkRmllbGQpKTtcbiAgICAgICAgICB0aGlzLmRhdGFMaXN0U3ViID0gKDxPYnNlcnZhYmxlPElEYXRhUmVzcG9uc2U+PnRoaXMuZGF0YUxpc3QocGFyYW1zLCAxLCB0aGlzLmNvdW50T25QYWdlKSkuc3Vic2NyaWJlKGFuc3dlciA9PiB7XG4gICAgICAgICAgICB0aGlzLm91dHB1dCA9IGFuc3dlci5saXN0O1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VGdWxsTW9kZWwuZW1pdCh0aGlzLm91dHB1dCk7XG4gICAgICAgICAgfSwgKCkgPT4geyB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VGdWxsTW9kZWwuZW1pdCh0aGlzLm91dHB1dCk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmRhdGFMaXN0ID09PSB1bmRlZmluZWQpIHsgcmV0dXJuOyB9XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2RhdGFMaXN0IHZhbHVlIEVycm9yJyk7XG4gICAgfVxuICAgIGxldCBuZXdPdXRwdXQ6IEFycmF5PGFueT4gPSBbXTtcbiAgICBmb3IgKGxldCB2IG9mIG5ld1ZhbHVlKSB7XG4gICAgICBmb3IgKGxldCBkIG9mIGRhdGFMaXN0KSB7XG4gICAgICAgIGxldCBhID0gZmV0Y2hGcm9tT2JqZWN0KGQsIHRoaXMubW9kZWxQcm9wZXJ0eSkgPyBmZXRjaEZyb21PYmplY3QoZCwgdGhpcy5tb2RlbFByb3BlcnR5KS52YWx1ZU9mKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgIGxldCBiID0gdiA/IHYudmFsdWVPZigpIDogdW5kZWZpbmVkO1xuICAgICAgICBpZiAoZGVlcEVxdWFsKGEsIGIpKSB7XG4gICAgICAgICAgbmV3T3V0cHV0LnB1c2goZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5vdXRwdXQgPSBuZXdPdXRwdXQ7XG4gICAgdGhpcy5jaGFuZ2VGdWxsTW9kZWwuZW1pdCh0aGlzLm91dHB1dCk7XG4gIH1cblxuICBnZXQgT3B0aW9ucygpOiBBcnJheTxhbnk+IHtcbiAgICBsZXQgb3B0aW9uczogQXJyYXk8YW55PjtcbiAgICBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICBsZXQgb2xkQ2FjaGUgPSB0aGlzLkdldENhY2hlKHRoaXMub2xkUXVlcnkpO1xuXG4gICAgICBpZiAoIXRoaXMuY3VycmVudENhY2hlICYmIG9sZENhY2hlKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvbGRDYWNoZS5vYmplY3RzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3B0aW9ucyA9IHRoaXMuY3VycmVudENhY2hlID8gdGhpcy5jdXJyZW50Q2FjaGUub2JqZWN0cyA6IFtdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gKG9wdGlvbnMgfHwgW10pLmZpbHRlcihvcCA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5vdXRwdXQuZmluZEluZGV4KG8gPT4ge1xuICAgICAgICBsZXQgYSA9IGZldGNoRnJvbU9iamVjdChvLCB0aGlzLm1vZGVsUHJvcGVydHkpID8gZmV0Y2hGcm9tT2JqZWN0KG8sIHRoaXMubW9kZWxQcm9wZXJ0eSkudmFsdWVPZigpIDogdW5kZWZpbmVkO1xuICAgICAgICBsZXQgYiA9IGZldGNoRnJvbU9iamVjdChvcCwgdGhpcy5tb2RlbFByb3BlcnR5KSA/IGZldGNoRnJvbU9iamVjdChvcCwgdGhpcy5tb2RlbFByb3BlcnR5KS52YWx1ZU9mKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBkZWVwRXF1YWwoYSwgYik7XG4gICAgICB9KSA9PT0gLTE7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgY3VycmVudENhY2hlOiBDYWNoZUluZm87XG4gIHByaXZhdGUgR2V0Q2FjaGUocXVlcnk6IHN0cmluZyk6IENhY2hlSW5mbyB7XG4gICAgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgcmV0dXJuIHRoaXMuY2FjaGVMYXp5RGF0YS5maW5kKGNhY2hlID0+IHtcbiAgICAgICAgcmV0dXJuIGNhY2hlLnF1ZXJ5ID09PSB0aGlzLnF1ZXJ5ICYmIGRlZXBFcXVhbChjYWNoZS5wYXJhbXMsIHRoaXMuYWRkaXRpb25hbEZpbHRlcik7XG4gICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgLy8gQ3JlYXRlTmV3XG5cbiAgcHVibGljIEFkZE5ld09iamVjdCh2YWx1ZTogT2JzZXJ2YWJsZTxhbnk+IHwgYW55KTogdm9pZCB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgT2JzZXJ2YWJsZSkge1xuICAgICAgdmFsdWUuc3Vic2NyaWJlKG5ld09iamVjdCA9PiB7XG4gICAgICAgIGlmIChuZXdPYmplY3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMuU2V0TmV3T2JqZWN0KG5ld09iamVjdCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLlNldE5ld09iamVjdCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBTZXROZXdPYmplY3QobmV3T2JqZWN0OiBhbnkpIHtcbiAgICBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICB0aGlzLmRhdGFMaXN0LnB1c2gobmV3T2JqZWN0KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgZm9yIChsZXQgY2FjaGUgb2YgdGhpcy5jYWNoZUxhenlEYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLnF1ZXJ5LmluY2x1ZGVzKGNhY2hlLnF1ZXJ5KSB8fCBjYWNoZS5xdWVyeSA9PT0gdW5kZWZpbmVkIHx8IGNhY2hlLnF1ZXJ5ID09PSAnJykge1xuICAgICAgICAgIGNhY2hlLmNvdW50RWxlbWVudCsrO1xuICAgICAgICAgIGNhY2hlLm9iamVjdHMucHVzaChuZXdPYmplY3QpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5maXJzdExvYWQgPSBmYWxzZTtcbiAgICB0aGlzLnF1ZXJ5ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuY3VycmVudENhY2hlID0gdGhpcy5HZXRDYWNoZSh0aGlzLnF1ZXJ5KTtcbiAgICB0aGlzLnNlbGVjdE9uZShuZXcgTW91c2VFdmVudCgnY2xpY2snKSwgbmV3T2JqZWN0KTtcbiAgfVxuXG4gIGdldCBTaG93TmV3KCk6IGJvb2xlYW4ge1xuICAgIGxldCBhID0gdGhpcy5xdWVyeSAmJiB0aGlzLm5ld01lc3NhZ2UgJiYgKCF0aGlzLmRhdGFMaXN0U3ViIHx8IHRoaXMuZGF0YUxpc3RTdWIuY2xvc2VkKTtcblxuICAgIGxldCBiID0gdGhpcy5PcHRpb25zLmZpbmRJbmRleChvID0+IHtcbiAgICAgIGxldCBjID0gZmV0Y2hGcm9tT2JqZWN0KG8sIHRoaXMudmlld1Byb3BlcnR5KSA/IGZldGNoRnJvbU9iamVjdChvLCB0aGlzLnZpZXdQcm9wZXJ0eSkudmFsdWVPZigpIDogdW5kZWZpbmVkO1xuICAgICAgcmV0dXJuIGRlZXBFcXVhbChjLCB0aGlzLnF1ZXJ5KTtcbiAgICB9KSA9PT0gLTEgJiYgdGhpcy5vdXRwdXQuZmluZEluZGV4KG8gPT4ge1xuICAgICAgbGV0IGMgPSBmZXRjaEZyb21PYmplY3QobywgdGhpcy52aWV3UHJvcGVydHkpID8gZmV0Y2hGcm9tT2JqZWN0KG8sIHRoaXMudmlld1Byb3BlcnR5KS52YWx1ZU9mKCkgOiB1bmRlZmluZWQ7XG4gICAgICByZXR1cm4gZGVlcEVxdWFsKGMsIHRoaXMucXVlcnkpO1xuICAgIH0pID09PSAtMTtcblxuICAgIHJldHVybiBhICYmIGI7XG4gIH1cblxuICBnZXQgU2hvd0VtcHR5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLk9wdGlvbnMubGVuZ3RoID09PSAwICYmICghKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBGdW5jdGlvbikgfHwgKHRoaXMuZGF0YUxpc3RTdWIuY2xvc2VkKSk7XG4gIH1cblxuXG4gIC8vIENBQ0hFXG4gIHByaXZhdGUgY2FjaGVMYXp5RGF0YTogQXJyYXk8Q2FjaGVJbmZvPiA9IFtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENhY2hlSW5mbyB7XG4gIGNvdW50RWxlbWVudDogbnVtYmVyO1xuICBjb3VudFBhZ2VzOiBudW1iZXI7XG4gIGN1cnJlbnRQYWdlOiBudW1iZXI7XG4gIG9iamVjdHM6IEFycmF5PGFueT47XG5cbiAgcXVlcnk6IHN0cmluZztcbiAgcGFyYW1zOiBhbnk7XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IE5nVmlib3JDb21wb25lbnQgfSBmcm9tICcuL3ZpYm9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWaWJvckJvdGhEaXJlY3RpdmUsIFZpYm9yQ3JlYXRlRGlyZWN0aXZlLCBWaWJvckRyb3Bkb3duRGlyZWN0aXZlLCBWaWJvclNlbGVjdGVkRGlyZWN0aXZlIH0gZnJvbSAnLi92aWJvci10ZW1wbGF0ZS5kaXJlY3RpdmUnO1xuY29uc3QgY29tcG9uZW50cyA9IFtOZ1ZpYm9yQ29tcG9uZW50LCBWaWJvckJvdGhEaXJlY3RpdmUsIFZpYm9yQ3JlYXRlRGlyZWN0aXZlLCBWaWJvckRyb3Bkb3duRGlyZWN0aXZlLCBWaWJvclNlbGVjdGVkRGlyZWN0aXZlXVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgRm9ybXNNb2R1bGUsIENvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICAuLi5jb21wb25lbnRzXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICAuLi5jb21wb25lbnRzLCBGb3Jtc01vZHVsZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5nVmlib3JNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsiSW5qZWN0YWJsZSIsIkRpcmVjdGl2ZSIsIlRlbXBsYXRlUmVmIiwiRXZlbnRFbWl0dGVyIiwidHNsaWJfMS5fX3ZhbHVlcyIsIk9ic2VydmFibGUiLCJDb21wb25lbnQiLCJWaWV3RW5jYXBzdWxhdGlvbiIsIk5HX1ZBTFVFX0FDQ0VTU09SIiwiZm9yd2FyZFJlZiIsIkVsZW1lbnRSZWYiLCJWaWV3Q2hpbGQiLCJJbnB1dCIsIkNvbnRlbnRDaGlsZCIsIk91dHB1dCIsIk5nTW9kdWxlIiwiRm9ybXNNb2R1bGUiLCJDb21tb25Nb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtRQU1FO1NBQWlCOztvQkFKbEJBLGFBQVUsU0FBQzt3QkFDVixVQUFVLEVBQUUsTUFBTTtxQkFDbkI7Ozs7OzZCQUpEOzs7SUNBQTs7Ozs7Ozs7Ozs7Ozs7QUFjQSxzQkE0RnlCLENBQUM7UUFDdEIsSUFBSSxDQUFDLEdBQUcsT0FBTyxNQUFNLEtBQUssVUFBVSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUM7WUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU07b0JBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO2dCQUNuQyxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQzthQUMzQztTQUNKLENBQUM7SUFDTixDQUFDO0FBRUQsb0JBQXVCLENBQUMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLE9BQU8sTUFBTSxLQUFLLFVBQVUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxDQUFDO1lBQUUsT0FBTyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakMsSUFBSTtZQUNBLE9BQU8sQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLElBQUk7Z0JBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUU7UUFDRCxPQUFPLEtBQUssRUFBRTtZQUFFLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQztTQUFFO2dCQUMvQjtZQUNKLElBQUk7Z0JBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNwRDtvQkFDTztnQkFBRSxJQUFJLENBQUM7b0JBQUUsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDO2FBQUU7U0FDcEM7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7QUFFRDtRQUNJLEtBQUssSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFO1lBQzlDLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7O0FDMUlEO1FBSUksZ0NBQW1CLFdBQTZCO1lBQTdCLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtTQUFJOztvQkFGdkRDLFlBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSwwQkFBMEIsRUFBRTs7Ozs7d0JBRi9CQyxjQUFXOzs7cUNBQS9COzs7UUFTSSxnQ0FBbUIsV0FBNkI7WUFBN0IsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO1NBQUk7O29CQUZ2REQsWUFBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLDBCQUEwQixFQUFFOzs7Ozt3QkFQL0JDLGNBQVc7OztxQ0FBL0I7OztRQWNJLDRCQUFtQixXQUE2QjtZQUE3QixnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7U0FBSTs7b0JBRnZERCxZQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsc0JBQXNCLEVBQUU7Ozs7O3dCQVozQkMsY0FBVzs7O2lDQUEvQjs7O1FBbUJJLDhCQUFtQixXQUE2QjtZQUE3QixnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7U0FBSTs7b0JBRnZERCxZQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUU7Ozs7O3dCQWpCckJDLGNBQVc7OzttQ0FBL0I7Ozs7Ozs7Ozs7OztBQ01BLDZCQUFnQyxNQUFXLEVBQUUsSUFBWTtRQUN2RCxJQUFJLE1BQU0sS0FBSyxTQUFTLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUM5QyxPQUFPLE1BQU0sQ0FBQztTQUNmO1FBRUQscUJBQU0sS0FBSyxHQUFXLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDZCxPQUFPLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2xGO1FBRUQsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDckI7Ozs7OztBQUVELDhCQUFpQyxJQUFTLEVBQUUsaUJBQXlCO1FBQ25FLHFCQUFJLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZCxJQUFJLElBQUksZUFBZSxDQUFDLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxHQUFHLFFBQU0sZUFBZSxDQUFDLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxTQUFNLEdBQUcsRUFBRSxDQUFDO1FBQzdHLE9BQU8sSUFBSSxDQUFDO0tBQ2I7O0lBSUQscUJBQU0sU0FBUyxHQUFXLHFDQUFxQyxDQUFDLE1BQU0sQ0FBQztJQUN2RSxxQkFBTSxTQUFTLEdBQVcsSUFBSSxNQUFNLENBQUMsSUFBSSxHQUFHLFNBQVMsR0FBRyxpQkFBaUIsRUFBRSxHQUFHLENBQUMsQ0FBQzs7Ozs7Ozs7SUFFaEYsOEJBQThCLElBQVksRUFBRSxLQUFVLEVBQUUsV0FBZ0IsRUFBRSxNQUFXO1FBQ25GLHFCQUFJLENBQUMsR0FBVyxLQUFLLE1BQU0sV0FBVyxHQUFHLFFBQVEsR0FBRyxTQUFTLENBQUM7WUFFNUQsQ0FBQzs7WUFFRCxJQUFJLEtBQUssT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLG1CQUV4QixHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1YscUJBQU0sU0FBUyxHQUFhLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7Ozs7O1FBSS9ELHVCQUF1QixLQUFVO1lBQy9CLE9BQU8sVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ2xDO1FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7O1lBRXBCLElBQUksS0FBSyxLQUFLLFFBQVEsRUFBRTtnQkFDdEIsR0FBRyxJQUFJLGFBQWEsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDNUM7WUFFRCxJQUFJLFdBQVcsRUFBRTs7Z0JBRWYsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO29CQUN2QixHQUFHLElBQUksYUFBYSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDaEQ7O2dCQUdELElBQUksS0FBSyxLQUFLLFFBQVEsRUFBRTtvQkFDdEIsR0FBRyxJQUFJLGFBQWEsQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDO2lCQUN6RDthQUNGO2lCQUFNO2dCQUNMLEdBQUcsSUFBSSxhQUFhLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztnQkFHL0MsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO29CQUN2QixHQUFHLElBQUksYUFBYSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUM7aUJBQ3pEO2FBQ0Y7U0FDRjtRQUVELE9BQU8sR0FBRyxDQUFDO0tBQ1o7Ozs7O0lBRUQsbUJBQW1CLElBQVM7UUFDMUIsT0FBTyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksS0FBSyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDO0tBQzlGOzs7OztJQUVELG1CQUFtQixJQUFTO1FBQzFCLHFCQUFJLE9BQVksbUJBQUUsR0FBUSxDQUFDO1FBQzNCLHFCQUFNLEdBQUcsR0FBUSxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM5QyxxQkFBTSxHQUFHLEdBQVEsSUFBSSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUM7UUFFNUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNSLE9BQU87U0FDUjtRQUVELE9BQU8sR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDO1FBQzlCLEdBQUcsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFckIsT0FBTztZQUNMLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFNBQVM7WUFDbEQsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsVUFBVTtTQUN0RCxDQUFDO0tBQ0g7Ozs7OztBQUVELGdDQUFtQyxJQUFpQixFQUFFLElBQWlCO1FBQ3JFLHFCQUFJLENBQU0sbUJBQUUsV0FBZ0IsbUJBQUUsV0FBZ0IsbUJBQUUsTUFBVyxtQkFBRSxVQUFlLG1CQUFFLGFBQWtCLENBQUM7UUFFakcsSUFBSSxJQUFJLEVBQUU7WUFDUixXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNoQyxXQUFXLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN6RCxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUM7WUFDN0IsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7WUFDdkQsVUFBVSxHQUFHLENBQUMsQ0FBQztZQUNmLGFBQWEsR0FBRyxDQUFDLEdBQUcsV0FBVyxHQUFHLFdBQVcsQ0FBQzs7WUFHOUMsSUFBSSxDQUFDLEdBQUcsV0FBVyxHQUFHLFdBQVcsR0FBRyxNQUFNLEVBQUU7Z0JBQzFDLElBQUksQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDO2FBQ2hDO2lCQUFNLElBQUksQ0FBQyxHQUFHLE1BQU0sRUFBRTtnQkFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7YUFDN0I7U0FDRjtLQUNGOzs7Ozs7O0lBRUQsMEJBQTBCLElBQVMsRUFBRSxJQUFTLEVBQUUsS0FBVTs7UUFHeEQscUJBQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQzlCLHFCQUFJLEdBQUcsR0FBUSxJQUFJLEtBQUssT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUN2RSxxQkFBTSxNQUFNLEdBQVEsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzs7OztRQU14RCxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksRUFBRTs7WUFFM0IsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVuQixJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtnQkFDMUIsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDeEI7O1lBR0QsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN2QixPQUFPLEdBQUcsQ0FBQzthQUNaOzs7OztZQU9ELEdBQUcsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzVCOztRQUdELE9BQU8sR0FBRyxHQUFHLG9CQUFvQixDQUFDLElBQUksRUFBRSxLQUFLLEtBQUssQUFBeUIsU0FBUyxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDbEg7Ozs7OztJQ3pIRCxxQkFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDOztRQTBkdEMsMEJBQW9CLFVBQXNDO1lBQXRDLGVBQVUsR0FBVixVQUFVLENBQTRCOzZCQTlXdEMsS0FBSztvQ0FTQyxDQUFDOzRCQUNSLEdBQUc7OzRCQU9LLEtBQUs7aUNBQ0EsUUFBUTsrQkFDVixFQUFFOytCQUVGLE9BQU87NEJBRVYsS0FBSzs4QkFDSCxJQUFJOzRCQUNmLEtBQUs7Z0NBU1EsTUFBTTtpQ0FFTCxJQUFJO21DQUNGLEtBQUs7Z0NBQ0EsU0FBUztrQ0FDZixPQUFPO29DQUlMLEVBQUU7bUNBRWtDLElBQUlDLGVBQVksRUFBRTs4QkFHcEQsU0FBUzs2QkFDd0IsVUFBQyxLQUFhO2dCQUNsRixPQUFPLEtBQUssQ0FBQzthQUNkO3lCQXFEeUIsQ0FBQztnQkFDekIscUJBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDZCxPQUFPLFVBQVUsUUFBYSxFQUFFLEVBQVU7b0JBQ3hDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDcEIsS0FBSyxHQUFHLFVBQVUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7aUJBQ2xDLENBQUM7YUFDSCxHQUFHOzRCQXVSbUIsZUFBUzs2QkFDUixlQUFTO2lDQWlNUyxFQUFFO1lBeE4xQyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztTQUNsQjs7Ozs7UUFyVE0sb0NBQVM7Ozs7c0JBQUMsS0FBYTtnQkFDNUIsT0FBTyxLQUFLLENBQUM7Ozs7OztRQUdSLDJDQUFnQjs7OztzQkFBQyxLQUE4QjtnQkFDcEQsSUFBSSxLQUFLLEVBQUU7b0JBQ1QsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7aUJBQ3pCO2dCQUVELElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO29CQUM3RCxPQUFPO2lCQUNSO2dCQUVELElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDckIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUNyQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Ozs7O1FBR1gsMkNBQWdCOzs7O2dCQUN0QixJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDOzs7OztRQUdmLG9EQUF5Qjs7Ozs7Z0JBQzlCLFVBQVUsQ0FBQztvQkFDVCxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztpQkFDekIsRUFBRSxHQUFHLENBQUMsQ0FBQzs7Ozs7O1FBR0gseUNBQWM7Ozs7c0JBQUMsS0FBWTtnQkFDaEMsSUFBSSxLQUFLLEVBQUU7b0JBQ1QsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7aUJBQ3pCO2dCQUVELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDZixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztpQkFDekI7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUNsQzs7Ozs7UUFXSSx3Q0FBYTs7Ozs7Z0JBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUNuQixJQUFJLElBQUksQ0FBQyxRQUFRLFlBQVksS0FBSyxFQUFFO29CQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQUEsSUFBSTt3QkFDdEMsSUFBSSxDQUFDLEtBQUksQ0FBQyxLQUFLLElBQUksS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFOzRCQUMxQyxPQUFPLElBQUksQ0FBQzt5QkFDYjt3QkFDRCxxQkFBSSxDQUFDLEdBQVEsZUFBZSxDQUFDLElBQUksRUFBRSxLQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7d0JBQ3hELElBQUksQ0FBQyxLQUFLLFNBQVMsRUFBRTs0QkFDbkIsT0FBTyxLQUFLLENBQUM7eUJBQ2Q7d0JBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUNuRCxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUEsSUFBSTt3QkFDWixJQUFJLENBQUMsS0FBSSxDQUFDLFdBQVcsRUFBRTs0QkFDckIsT0FBTyxJQUFJLENBQUM7eUJBQ2I7d0JBRUQscUJBQUksQ0FBQyxHQUFHLGVBQWUsQ0FBQyxJQUFJLEVBQUUsS0FBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUM1RCxPQUFPLEtBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQUEsRUFBRTs0QkFDbEMscUJBQUksQ0FBQyxHQUFHLGVBQWUsQ0FBQyxFQUFFLEVBQUUsS0FBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUMxRCxPQUFPLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7eUJBQ3hCLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ1IsQ0FBQyxDQUFDO2lCQUNKO3FCQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsWUFBWSxRQUFRLEVBQUU7b0JBQzVDLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTt3QkFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO3FCQUFFO29CQUN6RCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTt3QkFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRzs0QkFDbEIsWUFBWSxFQUFFLENBQUM7NEJBQ2YsVUFBVSxFQUFFLENBQUM7NEJBQ2IsV0FBVyxFQUFFLENBQUM7NEJBQ2QsT0FBTyxFQUFFLEVBQUU7NEJBQ1gsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLOzRCQUNqQixNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDO3lCQUNqRCxDQUFDO3dCQUNGLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzt3QkFFM0MscUJBQUksTUFBTSxJQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBUSxDQUFBLENBQUM7d0JBQzdELE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQzt3QkFFekMsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUE0QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFFLFNBQVMsQ0FBQyxVQUFBLE1BQU07NEJBQ3pHLEtBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQzFFLEtBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7NEJBQ3pELEtBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3lCQUM3RixFQUFFLGVBQVMsQ0FBQyxDQUFDO3FCQUNmO2lCQUNGOzs7OztRQUdJLCtDQUFvQjs7Ozs7Z0JBQ3pCLHFCQUFJLE9BQU8sR0FBVyxJQUFJLENBQUMsUUFBUSxZQUFZLEtBQUssR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQzs7Z0JBRzFFLElBQUksQ0FBQyxLQUFLLENBQUM7b0JBQ1QsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDO29CQUMzQixLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUM5QyxLQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7aUJBQ3RCLEVBQUUsT0FBTyxDQUFDLENBQUM7Ozs7O1FBR04sOENBQW1COzs7O2dCQUN6QixxQkFBSSxJQUFJLElBQXFCLElBQUksQ0FBQyxFQUFFLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDO2dCQUNsRixxQkFBSSxRQUFRLElBQXFCLElBQUksQ0FBQyxFQUFFLENBQUMsc0JBQXNCLENBQUMsaUNBQWlDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQSxDQUFDO2dCQUMxSCxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7Ozs7OztRQUc5QixrQ0FBTzs7OztzQkFBQyxLQUFvQjtnQkFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDakMsT0FBTztpQkFDUjtnQkFFRCxxQkFBSSxZQUFZLEdBQVcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7Z0JBRS9DLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDaEIsWUFBWSxFQUFFLENBQUM7aUJBQ2hCO2dCQUVELFFBQVEsS0FBSyxDQUFDLE9BQU87b0JBQ25CLEtBQUssRUFBRTs7d0JBQ0wsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7d0JBQ3hCLE1BQU07b0JBRVIsS0FBSyxFQUFFOzt3QkFDTCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsSUFBSSxZQUFZLENBQUM7d0JBQ2xGLE1BQU07b0JBRVIsS0FBSyxFQUFFOzt3QkFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzt3QkFDbkIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLElBQUksWUFBWSxDQUFDO3dCQUNsRixNQUFNO29CQUVSLEtBQUssRUFBRTs7d0JBQ0wsSUFBSSxZQUFZLEdBQUcsQ0FBQyxFQUFFOzRCQUNwQixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtnQ0FDakQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzZCQUMvQztpQ0FBTTtnQ0FDTCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7NkJBQzVEO3lCQUNGOzZCQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTs0QkFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO3lCQUMvQzt3QkFDRCxNQUFNO29CQUVSLFNBQVMsTUFBTTtpQkFDaEI7Z0JBQ0QsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7Ozs7OztRQUd0QixtQ0FBUTs7OztzQkFBQyxNQUFhOztnQkFDM0IsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDOztnQkFHeEIsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLFlBQVksUUFBUSxDQUFDLEVBQUU7b0JBQ3hDLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztpQkFDL0M7Z0JBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7b0JBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQUMseUNBQXlDLENBQUMsQ0FBQztpQkFDNUQ7Z0JBQ0QsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRTtvQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7aUJBQUU7Z0JBRXpHLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtvQkFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUFFO2dCQUV6RCxxQkFBSSxNQUFNLEdBQVEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQzNELE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFFekMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07b0JBQzVHLEtBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQ2hDLEtBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3pELEtBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUM1RixLQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUMxRSxLQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsR0FBRyxDQUFDLElBQUksS0FBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7b0JBQ25GLEtBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2lCQUM1QixFQUFFLGVBQVMsQ0FBQyxDQUFDOzs7OztRQUlSLHdDQUFhOzs7O2dCQUNuQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQzs7Ozs7OztRQUdsQixvQ0FBUzs7Ozs7c0JBQUMsTUFBa0MsRUFBRSxJQUFTOztnQkFFNUQsSUFBSSxNQUFNLFlBQVksVUFBVSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO29CQUFFLE9BQU87aUJBQUU7Z0JBRXBFLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFO29CQUM1RCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDeEI7cUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDdEI7Z0JBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDckIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQ3hCLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7Ozs7OztRQUduQixvQ0FBUzs7Ozs7c0JBQUMsS0FBYSxFQUFFLEtBQVk7Z0JBQzFDLElBQUksS0FBSyxFQUFFO29CQUNULEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztpQkFDekI7Z0JBR0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7O2dCQUdsQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDOztnQkFHMUMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNqQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQ2xDOzs4QkFLUSw4Q0FBZ0I7Ozs7Z0JBQ3pCLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO29CQUN6QixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUM7aUJBQzFDO3FCQUFNLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtvQkFDNUIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQztpQkFDdEM7Z0JBQ0QsT0FBTyxTQUFTLENBQUM7Ozs7OzhCQUdSLDhDQUFnQjs7OztnQkFDekIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7b0JBQ3pCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztpQkFDMUM7cUJBQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO29CQUM1QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDO2lCQUN0QztnQkFDRCxPQUFPLFNBQVMsQ0FBQzs7Ozs7Ozs7O1FBR1osMkNBQWdCOzs7O3NCQUFDLElBQVM7Z0JBQy9CLHFCQUFJLFNBQVMsR0FBUSxJQUFJLENBQUMsYUFBYSxJQUFJLGdCQUFnQixDQUFDO2dCQUM1RCxPQUFPLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDOzs7Ozs7UUFHbkQsK0NBQW9COzs7O3NCQUFDLElBQVM7Z0JBQ25DLHFCQUFJLFNBQVMsR0FBUSxJQUFJLENBQUMsaUJBQWlCLElBQUksZ0JBQWdCLENBQUM7Z0JBQ2hFLE9BQU8sU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Ozs7O1FBSW5ELG1DQUFROzs7OztnQkFFYixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEYsSUFBSSxJQUFJLENBQUMsUUFBUTtvQkFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3JELElBQUksSUFBSSxDQUFDLFFBQVE7b0JBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUVyRCxJQUFJLENBQUMsT0FBTyxzQkFBc0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUMsQ0FBQzs7Ozs7O1FBRzdELHNDQUFXOzs7O3NCQUFDLE1BQXFCO2dCQUN0QyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsWUFBWSxFQUFFOztvQkFFekQsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRTt3QkFDbEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7d0JBQ2pCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztxQkFDeEM7eUJBQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxZQUFZLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO3dCQUN2RCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7cUJBQzFCO3lCQUFNLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxZQUFZLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTt3QkFDM0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFFM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTs0QkFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7eUJBQ3hCO3FCQUNGO2lCQUNGO2dCQUVELElBQUksSUFBSSxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUU7b0JBQ2pDLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFlBQVksRUFBRTt3QkFDbkMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO3FCQUNuQzt5QkFBTTt3QkFDTCxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7cUJBQ3RDO2lCQUNGO2dCQUVELElBQUksSUFBSSxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUU7b0JBQ2pDLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFlBQVksRUFBRTt3QkFDbkMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO3FCQUNuQzt5QkFBTTt3QkFDTCxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7cUJBQ3RDO2lCQUNGO2dCQUVELElBQUksTUFBTSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7b0JBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQy9DOzs7Ozs7UUFRSSxxQ0FBVTs7OztzQkFBQyxLQUFVOzs7Z0JBRTFCLElBQUksS0FBSyxFQUFFO29CQUNULElBQUksQ0FBQyxLQUFLLFlBQVksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsTUFBTSxFQUFFLEtBQUssWUFBWSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7d0JBQzlGLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztxQkFDckM7b0JBQ0QsSUFBSSxLQUFLLFlBQVksS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLFlBQVksS0FBSyxFQUFFO3dCQUN6RCxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBQSxDQUFDLEVBQUU7NEJBQ3RGLE9BQU87eUJBQ1I7cUJBQ0Y7eUJBQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBRTt3QkFDL0IsT0FBTztxQkFDUjtvQkFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztvQkFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7aUJBQ3BCOzs7Ozs7UUFNSSwyQ0FBZ0I7Ozs7c0JBQUMsRUFBWTtnQkFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7Ozs7OztRQUdkLDRDQUFpQjs7OztzQkFBQyxFQUFZO2dCQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQzs7Ozs7O1FBR2YsMkNBQWdCOzs7O3NCQUFDLFVBQW1CO2dCQUN6QyxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztnQkFDM0IsSUFBSSxVQUFVLEVBQUU7b0JBQ2QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2lCQUM5QztxQkFBTTtvQkFDTCxJQUFJLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztpQkFDckM7OztRQUlILHNCQUFJLG1DQUFLOzs7Z0JBd0JUO2dCQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUNwQjs7OztnQkExQkQsVUFBVSxLQUFVO2dCQUNsQixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7b0JBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO29CQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNyQixPQUFPO2lCQUNSOztnQkFHRCxJQUFJLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtvQkFDeEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDeEM7cUJBQU0sSUFBSSxLQUFLLFlBQVksS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ2xELElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2lCQUNyQjtxQkFBTSxJQUFJLEVBQUUsS0FBSyxZQUFZLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDdEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN2Qjs7Z0JBR0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7O2dCQUdwQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM1Qjs7O1dBQUE7UUFPRCxzQkFBSSx1Q0FBUzs7OztnQkFBYjtnQkFDRSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ2pCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQztpQkFDakQ7cUJBQU07b0JBQ0wsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2lCQUNqRDthQUNGOzs7V0FBQTtRQUVELHNCQUFJLDZDQUFlOzs7Z0JBQW5CO2dCQUNFLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDakIscUJBQUksR0FBRyxHQUFlLEVBQUUsQ0FBQzs7d0JBQ3pCLEtBQWMsSUFBQSxLQUFBQyxTQUFBLElBQUksQ0FBQyxNQUFNLENBQUEsZ0JBQUE7NEJBQXBCLElBQUksQ0FBQyxXQUFBOzRCQUNSLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzt5QkFDbEQ7Ozs7Ozs7Ozs7Ozs7OztvQkFDRCxPQUFPLEdBQUcsQ0FBQztpQkFDWjtxQkFBTTtvQkFDTCxPQUFPLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztpQkFDNUQ7O2FBQ0Y7OztXQUFBO1FBRUQsc0JBQUksb0NBQU07Ozs7Z0JBQVYsVUFBVyxRQUFvQjtnQkFBL0IsaUJBc0NDO2dCQXJDQyxxQkFBSSxRQUFRLEdBQWUsRUFBRSxDQUFDO2dCQUM5QixJQUFJLElBQUksQ0FBQyxRQUFRLFlBQVksS0FBSyxFQUFFO29CQUNsQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztpQkFDMUI7cUJBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxZQUFZLFFBQVEsRUFBRTtvQkFDNUMsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO3dCQUNqRCxxQkFBSSxNQUFNLEdBQVEsRUFBRSxDQUFDO3dCQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQzt3QkFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7NEJBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDOzRCQUN2QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7eUJBQ3hDOzZCQUFNOzRCQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLGVBQWUsQ0FBQyxHQUFHLEVBQUUsS0FBSSxDQUFDLFlBQVksQ0FBQyxHQUFBLENBQUMsQ0FBQzs0QkFDNUYsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUE0QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFFLFNBQVMsQ0FBQyxVQUFBLE1BQU07Z0NBQ3pHLEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztnQ0FDMUIsS0FBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzZCQUN4QyxFQUFFLGVBQVMsQ0FBQyxDQUFDO3lCQUNmO3FCQUNGO3lCQUFNO3dCQUNMLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztxQkFDeEM7b0JBQ0QsT0FBTztpQkFDUjtxQkFBTTtvQkFDTCxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFFO3dCQUFFLE9BQU87cUJBQUU7b0JBQzVDLE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztpQkFDekM7Z0JBQ0QscUJBQUksU0FBUyxHQUFlLEVBQUUsQ0FBQzs7b0JBQy9CLEtBQWMsSUFBQSxhQUFBQSxTQUFBLFFBQVEsQ0FBQSxrQ0FBQTt3QkFBakIsSUFBSSxDQUFDLHFCQUFBOzs0QkFDUixLQUFjLElBQUEsYUFBQUEsU0FBQSxRQUFRLENBQUEsa0NBQUE7Z0NBQWpCLElBQUksQ0FBQyxxQkFBQTtnQ0FDUixxQkFBSSxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsU0FBUyxDQUFDO2dDQUM5RyxxQkFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxTQUFTLENBQUM7Z0NBQ3BDLElBQUksU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtvQ0FDbkIsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztpQ0FDbkI7NkJBQ0Y7Ozs7Ozs7Ozs7Ozs7OztxQkFDRjs7Ozs7Ozs7Ozs7Ozs7O2dCQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO2dCQUN4QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7O2FBQ3hDOzs7V0FBQTtRQUVELHNCQUFJLHFDQUFPOzs7Z0JBQVg7Z0JBQUEsaUJBb0JDO2dCQW5CQyxxQkFBSSxPQUFtQixDQUFDO2dCQUN4QixJQUFJLElBQUksQ0FBQyxRQUFRLFlBQVksS0FBSyxFQUFFO29CQUNsQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztpQkFDeEI7cUJBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxZQUFZLFFBQVEsRUFBRTtvQkFDNUMscUJBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUU1QyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxRQUFRLEVBQUU7d0JBQ2xDLE9BQU8sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDO3FCQUM1Qjt5QkFBTTt3QkFDTCxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7cUJBQzlEO2lCQUNGO2dCQUNELE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxFQUFFLE1BQU0sQ0FBQyxVQUFBLEVBQUU7b0JBQzlCLE9BQU8sS0FBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQSxDQUFDO3dCQUM1QixxQkFBSSxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsRUFBRSxLQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsRUFBRSxLQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsU0FBUyxDQUFDO3dCQUM5RyxxQkFBSSxDQUFDLEdBQUcsZUFBZSxDQUFDLEVBQUUsRUFBRSxLQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsZUFBZSxDQUFDLEVBQUUsRUFBRSxLQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsU0FBUyxDQUFDO3dCQUNoSCxPQUFPLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7cUJBQ3hCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztpQkFDWCxDQUFDLENBQUM7YUFDSjs7O1dBQUE7Ozs7O1FBR08sbUNBQVE7Ozs7c0JBQUMsS0FBYTs7Z0JBQzVCLElBQUksSUFBSSxDQUFDLFFBQVEsWUFBWSxRQUFRLEVBQUU7b0JBQ3JDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBQSxLQUFLO3dCQUNsQyxPQUFPLEtBQUssQ0FBQyxLQUFLLEtBQUssS0FBSSxDQUFDLEtBQUssSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztxQkFDckYsQ0FBQyxDQUFBO2lCQUNIO2dCQUNELE9BQU8sU0FBUyxDQUFDOzs7Ozs7UUFLWix1Q0FBWTs7OztzQkFBQyxLQUE0Qjs7Z0JBQzlDLElBQUksS0FBSyxZQUFZQyxlQUFVLEVBQUU7b0JBQy9CLEtBQUssQ0FBQyxTQUFTLENBQUMsVUFBQSxTQUFTO3dCQUN2QixJQUFJLFNBQVMsS0FBSyxTQUFTLEVBQUU7NEJBQzNCLEtBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7eUJBQzlCO3FCQUNGLENBQUMsQ0FBQztpQkFDSjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUMxQjs7Ozs7O1FBR0ssdUNBQVk7Ozs7c0JBQUMsU0FBYztnQkFDakMsSUFBSSxJQUFJLENBQUMsUUFBUSxZQUFZLEtBQUssRUFBRTtvQkFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQy9CO3FCQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsWUFBWSxRQUFRLEVBQUU7O3dCQUM1QyxLQUFrQixJQUFBLEtBQUFELFNBQUEsSUFBSSxDQUFDLGFBQWEsQ0FBQSxnQkFBQTs0QkFBL0IsSUFBSSxLQUFLLFdBQUE7NEJBQ1osSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxFQUFFLEVBQUU7Z0NBQ3ZGLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQ0FDckIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7NkJBQy9CO3lCQUNGOzs7Ozs7Ozs7Ozs7Ozs7aUJBQ0Y7Z0JBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO2dCQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM5QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDOzs7UUFHckQsc0JBQUkscUNBQU87OztnQkFBWDtnQkFBQSxpQkFZQztnQkFYQyxxQkFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUV4RixxQkFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBQSxDQUFDO29CQUM5QixxQkFBSSxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsRUFBRSxLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsRUFBRSxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsU0FBUyxDQUFDO29CQUM1RyxPQUFPLFNBQVMsQ0FBQyxDQUFDLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNqQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQSxDQUFDO29CQUNsQyxxQkFBSSxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsRUFBRSxLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsRUFBRSxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsU0FBUyxDQUFDO29CQUM1RyxPQUFPLFNBQVMsQ0FBQyxDQUFDLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNqQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBRVYsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2Y7OztXQUFBO1FBRUQsc0JBQUksdUNBQVM7OztnQkFBYjtnQkFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLFlBQVksUUFBUSxDQUFDLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2FBQ3pHOzs7V0FBQTs7b0JBN3FCRkUsWUFBUyxTQUFDOzt3QkFFVCxRQUFRLEVBQUUsT0FBTzt3QkFDakIsUUFBUSxFQUFFLHV4SkEwRlg7d0JBQ0MsTUFBTSxFQUFFLENBQUMseXVLQUErdEssQ0FBQzt3QkFDenVLLGFBQWEsRUFBRUMsb0JBQWlCLENBQUMsSUFBSTt3QkFDckMsU0FBUyxFQUFFLENBQUM7Z0NBQ1YsT0FBTyxFQUFFQyx1QkFBaUI7Z0NBQzFCLFdBQVcsRUFBRUMsYUFBVSxDQUFDLGNBQU0sT0FBQSxnQkFBZ0IsR0FBQSxDQUFDO2dDQUMvQyxLQUFLLEVBQUUsSUFBSTs2QkFDWixDQUFDO3FCQUNIOzs7Ozt3QkFsSWVDLGFBQVU7Ozs7bUNBcUp2QkMsWUFBUyxTQUFDLGNBQWM7K0JBR3hCQyxRQUFLO29DQUNMQSxRQUFLO2tDQUNMQSxRQUFLO2tDQUVMQSxRQUFLOzJCQUNMQSxRQUFLOytCQUNMQSxRQUFLO2lDQUNMQSxRQUFLO21DQUlMQyxlQUFZLFNBQUMsa0JBQWtCO3VDQUMvQkEsZUFBWSxTQUFDLHNCQUFzQjt1Q0FDbkNBLGVBQVksU0FBQyxzQkFBc0I7cUNBQ25DQSxlQUFZLFNBQUMsb0JBQW9CO29DQUNqQ0QsUUFBSzt3Q0FDTEEsUUFBSzttQ0FDTEEsUUFBSztvQ0FFTEEsUUFBSztzQ0FDTEEsUUFBSzttQ0FDTEEsUUFBSztxQ0FDTEEsUUFBSzsrQkFFTEEsUUFBSztrQ0FDTEEsUUFBSzt1Q0FDTEEsUUFBSztrQ0FDTEEsUUFBSztzQ0FDTEUsU0FBTSxTQUFDLGlCQUFpQjtpQ0FHeEJGLFFBQUs7Z0NBQ0xBLFFBQUs7OytCQTNMUjs7Ozs7OztJQ09BLHFCQUFNLFVBQVUsR0FBRyxDQUFDLGdCQUFnQixFQUFFLGtCQUFrQixFQUFFLG9CQUFvQixFQUFFLHNCQUFzQixFQUFFLHNCQUFzQixDQUFDLENBQUE7Ozs7O29CQUU5SEcsV0FBUSxTQUFDO3dCQUNSLE9BQU8sRUFBRTs0QkFDUEMsaUJBQVcsRUFBRUMsbUJBQVk7eUJBQzFCO3dCQUNELFlBQVksV0FDUCxVQUFVLENBQ2Q7d0JBQ0QsT0FBTyxXQUNGLFVBQVU7NEJBQUVELGlCQUFXOzBCQUMzQjtxQkFDRjs7NEJBbkJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==