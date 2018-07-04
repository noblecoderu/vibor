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
                        template: "<div class=\"vibor\">\n  <ng-content></ng-content>\n\n  <div class=\"select-search\" (click)=\"showDropdownList($event);\">\n    <ul class=\"select-search-list\">\n      <ng-container *ngIf=\"multiple || !isOpen\">\n        <ng-container *ngIf=\"!SelectedTemplate; else selectedT\">\n          <li class=\"select-search-list-item select-search-list-item_selection\" *ngFor=\"let item of output; let $index=index; let $last=last; trackBy: TrackByFn;\">\n            <div class=\"vibor__selection\">\n              <div [innerHTML]=\"getListFormatted(item)\"></div>\n              <a class=\"select-search-list-item_remove\" *ngIf=\"allowReset\" (click)=\"!disabled && removeOne($index, $event)\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\">\n                  <path fill=\"#2c2c2c\" d=\"M10.1 4.5L8 6.6 5.9 4.5 4.5 5.9 6.6 8l-2.1 2.1 1.4 1.4L8 9.4l2.1 2.1 1.4-1.4L9.4 8l2.1-2.1z\"/>\n                </svg>\n              </a>\n            </div>\n          </li>\n        </ng-container>\n\n        <ng-template #selectedT>\n          <li class=\"select-search-list-item select-search-list-item_selection\" *ngFor=\"let item of output; let $index=index; let $last=last; trackBy: TrackByFn;\">\n            <div class=\"vibor__selection\">\n              <ng-container *ngTemplateOutlet=\"SelectedTemplate; context: {item: item}\"></ng-container>\n              <a class=\"select-search-list-item_remove\" *ngIf=\"allowReset && !disabled\" (click)=\"!disabled && removeOne($index, $event)\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\">\n                  <path fill=\"#2c2c2c\" d=\"M10.1 4.5L8 6.6 5.9 4.5 4.5 5.9 6.6 8l-2.1 2.1 1.4 1.4L8 9.4l2.1 2.1 1.4-1.4L9.4 8l2.1-2.1z\"/>\n                </svg>\n              </a>\n            </div>\n          </li>\n        </ng-template>\n      </ng-container>\n\n      <li class=\"select-search-list-item select-search-list-item_input\" [class.select-search-list-item_hide]=\"InputHide\">\n        <input autocomplete=\"off\" #inputControl=\"ngModel\" [name]=\"name\" [disabled]=\"disabled\" [(ngModel)]=\"query\" [placeholder]=\"output.length == 0 || (multiple && output.length < multipleLimit) ? placeholder : ''\"\n          (input)=\"updateOptionsInDelay()\" (keydown)=\"keyDown($event)\" />\n      </li>\n      <li class=\"select-search-list-item select-search-list-item_loader-center\" [hidden]=\"!dataListSub || dataListSub.closed\">\n        <div class=\"select-search-list-item_loader\"></div>\n      </li>\n\n      <span class=\"arrow\" (click)=\"toggleDropdown($event)\">\n      </span>\n    </ul>\n  </div>\n\n  <div class=\"select-dropdown\" *ngIf=\"isOpen\">\n    <ul class=\"select-dropdown-optgroup\">\n      <ng-container *ngIf=\"!DropdownTemplate; else dropdownT\">\n        <li class=\"select-dropdown-optgroup-option\" *ngFor=\"let option of Options; let i=index\" (mousedown)=\"selectOne($event, option)\"\n          [class.active]=\"i === selectorPosition\" [innerHTML]=\"getDropdownFormatted(option)\">\n        </li>\n      </ng-container>\n\n      <ng-template #dropdownT>\n        <li class=\"select-dropdown-optgroup-option\" *ngFor=\"let option of Options; let i=index\" (mousedown)=\"selectOne($event, option)\"\n          [class.active]=\"i === selectorPosition\">\n          <ng-container *ngTemplateOutlet=\"DropdownTemplate; context: {item: option}\"></ng-container>\n        </li>\n      </ng-template>\n\n      <li class=\"select-dropdown-optgroup-option loading\" *ngIf=\"dataListSub && !dataListSub.closed\">\n        \u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430\n      </li>\n      <li class=\"select-dropdown-optgroup-option loader\" (mousedown)=\"AddNewObject(CreateNew(query));\" [class.active]=\"selectorPosition === Options.length\"\n        *ngIf=\"ShowNew\">\n\n        <ng-container *ngIf=\"createTemplate; else templateWithMessage\">\n          <ng-container *ngTemplateOutlet=\"createTemplate.templateRef; context: {query: query}\"></ng-container>\n        </ng-container>\n\n        <ng-template #templateWithMessage>\n          {{ newMessage }}\n        </ng-template>\n      </li>\n      <li class=\"select-dropdown-optgroup-option loader\" *ngIf=\"ShowEmpty\">\n        \u041F\u0443\u0441\u0442\u043E\n      </li>\n    </ul>\n    <div class=\"select-dropdown-pager\" *ngIf=\"currentCache && currentCache.countPages > 1\">\n      <p class=\"select-dropdown-pager-page\">\n        {{ currentCache.currentPage | number }} / {{ currentCache.countPages | number }}\n      </p>\n      <button class=\"select-dropdown-pager-loadmore\" *ngIf=\"currentCache.countPages > 1 && currentCache.currentPage < currentCache.countPages\"\n        (mousedown)=\"nextPage($event)\">\n        \u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0435\u0449\u0451\n      </button>\n    </div>\n  </div>\n</div>\n",
                        styles: [".vibor a,.vibor label,.vibor legend,.vibor p,.vibor span,.vibor ul{margin:0;padding:0;border:0}.vibor a,.vibor button,.vibor input{outline:0}.vibor ol,.vibor ul{list-style:none}.vibor input{padding:0;margin:0;border:0;font:inherit}.vibor b{font-weight:400}.vibor{position:relative;display:block;padding:10px 15px;border:1px solid #d5d9de;border-radius:3px;font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\";font-size:14px;line-height:18px;transition:box-shadow .15s linear}.vibor:hover,.vibor:hover .select-dropdown{box-shadow:0 3px 6px 0 rgba(44,44,44,.1)}.vibor[disabled]{opacity:.6;pointer-events:none}.vibor .select-search{position:relative}.vibor .select-search .arrow{content:\"\";position:absolute;right:0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);display:block;width:16px;height:16px;background-image:url(data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ibmMtaWNvbiBnbHlwaCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiI+DQogIDxwYXRoIGZpbGw9IiMyYzJjMmMiIGQ9Ik04IDExLjRMMi42IDYgNCA0LjZsNCA0IDQtNEwxMy40IDYiLz4NCjwvc3ZnPg0K);transition:-webkit-transform .15s ease-in-out;transition:transform .15s ease-in-out;transition:transform .15s ease-in-out,-webkit-transform .15s ease-in-out}.vibor .select-search .arrow:before,.vibor .select-search-list-item_hide{display:none}.vibor .select-search-list-item_selection{position:relative}.vibor .select-search-list-item_input input{width:100%;text-overflow:ellipsis;font-size:14px;color:#2c2c2c}.vibor .select-search-list-item_input input::-webkit-input-placeholder{color:rgba(44,44,44,.2)}.vibor .select-search-list-item_input input:-ms-input-placeholder{color:rgba(44,44,44,.2)}.vibor .select-search-list-item_input input::-ms-input-placeholder{color:rgba(44,44,44,.2)}.vibor .select-search-list-item_input input::placeholder{color:rgba(44,44,44,.2)}.vibor .select-search-list-item_remove{display:flex;align-items:center;justify-content:center;width:16px;height:16px;margin-left:5px;border-radius:50%;background-color:#bababa;cursor:pointer;transition:background-color .15s linear}.vibor .select-search-list-item_remove:hover{background-color:#949494}.vibor .select-dropdown{position:absolute;top:100%;left:-1px;right:-1px;z-index:2}.vibor .select-search-list-item_loader-center{position:absolute;right:-2px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);display:flex;align-items:center;justify-content:center;width:21px;height:21px;background:#fff;z-index:2}.vibor .select-search-list-item_loader-center[hidden]{display:none}.vibor .select-search-list-item_loader-center .select-search-list-item_loader{width:16px;height:16px;box-sizing:border-box;border-width:2px;border-style:solid;border-color:#22272e rgba(34,39,46,.4) rgba(34,39,46,.4);border-radius:100%;-webkit-animation:.45s linear infinite clockwise;animation:.45s linear infinite clockwise}.vibor .select-dropdown{border:1px solid #d5d9de;border-bottom-left-radius:5px;border-bottom-right-radius:5px;border-top:0;background:#fff}.vibor .select-dropdown-optgroup{max-height:300px;overflow-y:auto}.vibor .select-dropdown-optgroup-option{min-height:30px;padding:10px 15px;color:#2c2c2c}.vibor .select-dropdown-optgroup-option:hover{background-color:rgba(66,132,215,.1)}.vibor .select-dropdown-optgroup-option.loading{font-size:16px;line-height:18px;text-align:center;color:#8b8b83}.vibor .select-dropdown-pager{padding:10px;text-align:center;border-top:1px dashed #d5d9de}.vibor .select-dropdown-pager-page{font-size:12px;color:#8b8b83}.vibor .select-dropdown-pager-loadmore{border:0;background:0 0;box-shadow:none;color:#8b8b83;text-transform:uppercase}.vibor .select-dropdown-pager-page+.select-dropdown-pager-loadmore{margin-top:10px}.vibor.open-vibor{border-bottom-left-radius:0;border-bottom-right-radius:0}.vibor.open-vibor .select-search .arrow{-webkit-transform:translateY(-50%) rotate(180deg);transform:translateY(-50%) rotate(180deg)}.vibor:not(.multiple) .select-search-list-item_remove{position:absolute;right:25px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.vibor.multiple .select-search-list{display:flex;flex-flow:row wrap;margin:-5px}.vibor.multiple .select-search-list .select-search-list-item{padding:5px;flex-shrink:0}.vibor.multiple .select-search-list .select-search-list-item_input{flex:1}.vibor.multiple .select-search-list .select-search-list-item_input input{height:28px}.vibor.multiple .vibor__selection{display:flex;align-items:center;height:28px;padding:0 7px;border-radius:3px;font-size:14px;background:#e5e5e7;color:#2c2c2c}@-webkit-keyframes clockwise{to{-webkit-transform:rotate(360deg) translatez(0);transform:rotate(360deg) translatez(0)}}@keyframes clockwise{to{-webkit-transform:rotate(360deg) translatez(0);transform:rotate(360deg) translatez(0)}}"],
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctdmlib3IudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZy12aWJvci9saWIvbmctdmlib3Iuc2VydmljZS50cyIsbnVsbCwibmc6Ly9uZy12aWJvci9saWIvbmctdmlib3ItdGVtcGxhdGUuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy12aWJvci9saWIvaGVscGVycy50cyIsIm5nOi8vbmctdmlib3IvbGliL25nLXZpYm9yLmNvbXBvbmVudC50cyIsIm5nOi8vbmctdmlib3IvbGliL25nLXZpYm9yLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ1ZpYm9yU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxufVxyXG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1t2aWJvci1kcm9wZG93bi1lbGVtZW50XScgfSlcclxuZXhwb3J0IGNsYXNzIFZpYm9yRHJvcGRvd25EaXJlY3RpdmUge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxyXG59XHJcblxyXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbdmlib3Itc2VsZWN0ZWQtZWxlbWVudF0nIH0pXHJcbmV4cG9ydCBjbGFzcyBWaWJvclNlbGVjdGVkRGlyZWN0aXZlIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cclxufVxyXG5cclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3ZpYm9yLWJvdGgtZWxlbWVudF0nIH0pXHJcbmV4cG9ydCBjbGFzcyBWaWJvckJvdGhEaXJlY3RpdmUge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxyXG59XHJcblxyXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbdmlib3ItY3JlYXRlXScgfSlcclxuZXhwb3J0IGNsYXNzIFZpYm9yQ3JlYXRlRGlyZWN0aXZlIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cclxufVxyXG4iLCJleHBvcnQgaW50ZXJmYWNlIElEYXRhUmVzcG9uc2Uge1xyXG4gIGRhdGE6IE9iamVjdDtcclxuICBsaXN0OiBBcnJheTxPYmplY3Q+O1xyXG4gIGhlYWRlcnM6IGFueTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZldGNoRnJvbU9iamVjdChvYmplY3Q6IGFueSwgcHJvcDogc3RyaW5nKTogYW55IHtcclxuICBpZiAob2JqZWN0ID09PSB1bmRlZmluZWQgfHwgcHJvcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICByZXR1cm4gb2JqZWN0O1xyXG4gIH1cclxuXHJcbiAgY29uc3QgaW5kZXg6IG51bWJlciA9IHByb3AuaW5kZXhPZignLicpO1xyXG4gIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICByZXR1cm4gZmV0Y2hGcm9tT2JqZWN0KG9iamVjdFtwcm9wLnN1YnN0cmluZygwLCBpbmRleCldLCBwcm9wLnN1YnN0cihpbmRleCArIDEpKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBvYmplY3RbcHJvcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0Rm9ybWF0dGVyKGRhdGE6IGFueSwgdmFsdWVQcm9wZXJ0eU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgbGV0IGh0bWwgPSAnJztcclxuICBodG1sICs9IGZldGNoRnJvbU9iamVjdChkYXRhLCB2YWx1ZVByb3BlcnR5TmFtZSkgPyBgPGI+JHtmZXRjaEZyb21PYmplY3QoZGF0YSwgdmFsdWVQcm9wZXJ0eU5hbWUpfTwvYj5gIDogJyc7XHJcbiAgcmV0dXJuIGh0bWw7XHJcbn1cclxuXHJcblxyXG4vLyBVc2VkIGZvciBtYXRjaGluZyBudW1iZXJzXHJcbmNvbnN0IGNvcmVfcG51bTogc3RyaW5nID0gL1srLV0/KD86XFxkKlxcLnwpXFxkKyg/OltlRV1bKy1dP1xcZCt8KS8uc291cmNlO1xyXG5jb25zdCBybnVtbm9ucHg6IFJlZ0V4cCA9IG5ldyBSZWdFeHAoJ14oJyArIGNvcmVfcG51bSArICcpKD8hcHgpW2EteiVdKyQnLCAnaScpO1xyXG5cclxuZnVuY3Rpb24gYXVnbWVudFdpZHRoT3JIZWlnaHQobmFtZTogc3RyaW5nLCBleHRyYTogYW55LCBpc0JvcmRlckJveDogYW55LCBzdHlsZXM6IGFueSk6IG51bWJlciB7XHJcbiAgbGV0IGk6IG51bWJlciA9IGV4dHJhID09PSAoaXNCb3JkZXJCb3ggPyAnYm9yZGVyJyA6ICdjb250ZW50JykgP1xyXG4gICAgLy8gSWYgd2UgYWxyZWFkeSBoYXZlIHRoZSByaWdodCBtZWFzdXJlbWVudCwgYXZvaWQgYXVnbWVudGF0aW9uXHJcbiAgICA0IDpcclxuICAgIC8vIE90aGVyd2lzZSBpbml0aWFsaXplIGZvciBob3Jpem9udGFsIG9yIHZlcnRpY2FsIHByb3BlcnRpZXNcclxuICAgIG5hbWUgPT09ICd3aWR0aCcgPyAxIDogMCxcclxuXHJcbiAgICB2YWwgPSAwO1xyXG4gIGNvbnN0IGNzc0V4cGFuZDogc3RyaW5nW10gPSBbJ1RvcCcsICdSaWdodCcsICdCb3R0b20nLCAnTGVmdCddO1xyXG5cclxuICAvLyBUT0RPIFVzZSBhbmd1bGFyLmVsZW1lbnQuY3NzIGluc3RlYWQgb2YgZ2V0U3R5bGVWYWx1ZSBhZnRlclxyXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9jYWl0cC9hbmd1bGFyLmpzL2NvbW1pdC85MmJiYjVlMjI1MjUzZWJkZGQzOGVmNTczNWQ2NmZmZWY3NmI2YTE0IHdpbGwgYmUgYXBwbGllZFxyXG4gIGZ1bmN0aW9uIGdldFN0eWxlVmFsdWUoX25hbWU6IGFueSk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gcGFyc2VGbG9hdChzdHlsZXNbX25hbWVdKTtcclxuICB9XHJcblxyXG4gIGZvciAoOyBpIDwgNDsgaSArPSAyKSB7XHJcbiAgICAvLyBib3RoIGJveCBtb2RlbHMgZXhjbHVkZSBtYXJnaW4sIHNvIGFkZCBpdCBpZiB3ZSB3YW50IGl0XHJcbiAgICBpZiAoZXh0cmEgPT09ICdtYXJnaW4nKSB7XHJcbiAgICAgIHZhbCArPSBnZXRTdHlsZVZhbHVlKGV4dHJhICsgY3NzRXhwYW5kW2ldKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNCb3JkZXJCb3gpIHtcclxuICAgICAgLy8gYm9yZGVyLWJveCBpbmNsdWRlcyBwYWRkaW5nLCBzbyByZW1vdmUgaXQgaWYgd2Ugd2FudCBjb250ZW50XHJcbiAgICAgIGlmIChleHRyYSA9PT0gJ2NvbnRlbnQnKSB7XHJcbiAgICAgICAgdmFsIC09IGdldFN0eWxlVmFsdWUoJ3BhZGRpbmcnICsgY3NzRXhwYW5kW2ldKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gYXQgdGhpcyBwb2ludCwgZXh0cmEgaXNuJ3QgYm9yZGVyIG5vciBtYXJnaW4sIHNvIHJlbW92ZSBib3JkZXJcclxuICAgICAgaWYgKGV4dHJhICE9PSAnbWFyZ2luJykge1xyXG4gICAgICAgIHZhbCAtPSBnZXRTdHlsZVZhbHVlKCdib3JkZXInICsgY3NzRXhwYW5kW2ldICsgJ1dpZHRoJyk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhbCArPSBnZXRTdHlsZVZhbHVlKCdwYWRkaW5nJyArIGNzc0V4cGFuZFtpXSk7XHJcblxyXG4gICAgICAvLyBhdCB0aGlzIHBvaW50LCBleHRyYSBpc24ndCBjb250ZW50IG5vciBwYWRkaW5nLCBzbyBhZGQgYm9yZGVyXHJcbiAgICAgIGlmIChleHRyYSAhPT0gJ3BhZGRpbmcnKSB7XHJcbiAgICAgICAgdmFsICs9IGdldFN0eWxlVmFsdWUoJ2JvcmRlcicgKyBjc3NFeHBhbmRbaV0gKyAnV2lkdGgnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHZhbDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0V2luZG93KGVsZW06IGFueSk6IGFueSB7XHJcbiAgcmV0dXJuIGVsZW0gIT0gbnVsbCAmJiBlbGVtID09PSBlbGVtLndpbmRvdyA/IGVsZW0gOiBlbGVtLm5vZGVUeXBlID09PSA5ICYmIGVsZW0uZGVmYXVsdFZpZXc7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldE9mZnNldChlbGVtOiBhbnkpOiBhbnkge1xyXG4gIGxldCBkb2NFbGVtOiBhbnksIHdpbjogYW55O1xyXG4gIGNvbnN0IGJveDogYW55ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICBjb25zdCBkb2M6IGFueSA9IGVsZW0gJiYgZWxlbS5vd25lckRvY3VtZW50O1xyXG5cclxuICBpZiAoIWRvYykge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgZG9jRWxlbSA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XHJcbiAgd2luID0gZ2V0V2luZG93KGRvYyk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB0b3A6IGJveC50b3AgKyB3aW4ucGFnZVlPZmZzZXQgLSBkb2NFbGVtLmNsaWVudFRvcCxcclxuICAgIGxlZnQ6IGJveC5sZWZ0ICsgd2luLnBhZ2VYT2Zmc2V0IC0gZG9jRWxlbS5jbGllbnRMZWZ0XHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNjcm9sbEFjdGl2ZU9wdGlvbihsaXN0OiBIVE1MRWxlbWVudCwgaXRlbTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuICBsZXQgeTogYW55LCBoZWlnaHRfbWVudTogYW55LCBoZWlnaHRfaXRlbTogYW55LCBzY3JvbGw6IGFueSwgc2Nyb2xsX3RvcDogYW55LCBzY3JvbGxfYm90dG9tOiBhbnk7XHJcblxyXG4gIGlmIChpdGVtKSB7XHJcbiAgICBoZWlnaHRfbWVudSA9IGxpc3Qub2Zmc2V0SGVpZ2h0O1xyXG4gICAgaGVpZ2h0X2l0ZW0gPSBnZXRXaWR0aE9ySGVpZ2h0KGl0ZW0sICdoZWlnaHQnLCAnbWFyZ2luJyk7IC8vIG91dGVySGVpZ2h0KHRydWUpO1xyXG4gICAgc2Nyb2xsID0gbGlzdC5zY3JvbGxUb3AgfHwgMDtcclxuICAgIHkgPSBnZXRPZmZzZXQoaXRlbSkudG9wIC0gZ2V0T2Zmc2V0KGxpc3QpLnRvcCArIHNjcm9sbDtcclxuICAgIHNjcm9sbF90b3AgPSB5O1xyXG4gICAgc2Nyb2xsX2JvdHRvbSA9IHkgLSBoZWlnaHRfbWVudSArIGhlaWdodF9pdGVtO1xyXG5cclxuICAgIC8vIFRPRE8gTWFrZSBhbmltYXRpb25cclxuICAgIGlmICh5ICsgaGVpZ2h0X2l0ZW0gPiBoZWlnaHRfbWVudSArIHNjcm9sbCkge1xyXG4gICAgICBsaXN0LnNjcm9sbFRvcCA9IHNjcm9sbF9ib3R0b207XHJcbiAgICB9IGVsc2UgaWYgKHkgPCBzY3JvbGwpIHtcclxuICAgICAgbGlzdC5zY3JvbGxUb3AgPSBzY3JvbGxfdG9wO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0V2lkdGhPckhlaWdodChlbGVtOiBhbnksIG5hbWU6IGFueSwgZXh0cmE6IGFueSk6IGFueSB7XHJcblxyXG4gIC8vIFN0YXJ0IHdpdGggb2Zmc2V0IHByb3BlcnR5LCB3aGljaCBpcyBlcXVpdmFsZW50IHRvIHRoZSBib3JkZXItYm94IHZhbHVlXHJcbiAgY29uc3QgdmFsdWVJc0JvcmRlckJveCA9IHRydWU7XHJcbiAgbGV0IHZhbDogYW55ID0gbmFtZSA9PT0gJ3dpZHRoJyA/IGVsZW0ub2Zmc2V0V2lkdGggOiBlbGVtLm9mZnNldEhlaWdodDtcclxuICBjb25zdCBzdHlsZXM6IGFueSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW0sIG51bGwpO1xyXG4gIGNvbnN0IGlzQm9yZGVyQm94ID0gZmFsc2U7IC8vIGpRdWVyeS5zdXBwb3J0LmJveFNpemluZyAmJiBqUXVlcnkuY3NzKCBlbGVtLCAnYm94U2l6aW5nJywgZmFsc2UsIHN0eWxlcyApID09PSAnYm9yZGVyLWJveCc7XHJcblxyXG4gIC8vIHNvbWUgbm9uLWh0bWwgZWxlbWVudHMgcmV0dXJuIHVuZGVmaW5lZCBmb3Igb2Zmc2V0V2lkdGgsIHNvIGNoZWNrIGZvciBudWxsL3VuZGVmaW5lZFxyXG4gIC8vIHN2ZyAtIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY0OTI4NVxyXG4gIC8vIE1hdGhNTCAtIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTQ5MTY2OFxyXG4gIGlmICh2YWwgPD0gMCB8fCB2YWwgPT0gbnVsbCkge1xyXG4gICAgLy8gRmFsbCBiYWNrIHRvIGNvbXB1dGVkIHRoZW4gdW5jb21wdXRlZCBjc3MgaWYgbmVjZXNzYXJ5XHJcbiAgICB2YWwgPSBzdHlsZXNbbmFtZV07XHJcblxyXG4gICAgaWYgKHZhbCA8IDAgfHwgdmFsID09IG51bGwpIHtcclxuICAgICAgdmFsID0gZWxlbS5zdHlsZVtuYW1lXTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDb21wdXRlZCB1bml0IGlzIG5vdCBwaXhlbHMuIFN0b3AgaGVyZSBhbmQgcmV0dXJuLlxyXG4gICAgaWYgKHJudW1ub25weC50ZXN0KHZhbCkpIHtcclxuICAgICAgcmV0dXJuIHZhbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyB3ZSBuZWVkIHRoZSBjaGVjayBmb3Igc3R5bGUgaW4gY2FzZSBhIGJyb3dzZXIgd2hpY2ggcmV0dXJucyB1bnJlbGlhYmxlIHZhbHVlc1xyXG4gICAgLy8gZm9yIGdldENvbXB1dGVkU3R5bGUgc2lsZW50bHkgZmFsbHMgYmFjayB0byB0aGUgcmVsaWFibGUgZWxlbS5zdHlsZVxyXG4gICAgLy8gdmFsdWVJc0JvcmRlckJveCA9IGlzQm9yZGVyQm94ICYmICggalF1ZXJ5LnN1cHBvcnQuYm94U2l6aW5nUmVsaWFibGUgfHwgdmFsID09PSBlbGVtLnN0eWxlWyBuYW1lIF0gKTtcclxuXHJcbiAgICAvLyBOb3JtYWxpemUgJycsIGF1dG8sIGFuZCBwcmVwYXJlIGZvciBleHRyYVxyXG4gICAgdmFsID0gcGFyc2VGbG9hdCh2YWwpIHx8IDA7XHJcbiAgfVxyXG5cclxuICAvLyB1c2UgdGhlIGFjdGl2ZSBib3gtc2l6aW5nIG1vZGVsIHRvIGFkZC9zdWJ0cmFjdCBpcnJlbGV2YW50IHN0eWxlc1xyXG4gIHJldHVybiB2YWwgKyBhdWdtZW50V2lkdGhPckhlaWdodChuYW1lLCBleHRyYSB8fCAoaXNCb3JkZXJCb3ggPyAnYm9yZGVyJyA6ICdjb250ZW50JyksIHZhbHVlSXNCb3JkZXJCb3gsIHN0eWxlcyk7XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBDb21wb25lbnQsIE9uSW5pdCwgT25DaGFuZ2VzLFxyXG4gIElucHV0LCBPdXRwdXQsIGZvcndhcmRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLFxyXG4gIFRlbXBsYXRlUmVmLCBDb250ZW50Q2hpbGQsIFZpZXdDaGlsZCxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXHJcbiAgTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgTmdNb2RlbFxyXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIFZpYm9yQm90aERpcmVjdGl2ZSxcclxuICAgIFZpYm9yQ3JlYXRlRGlyZWN0aXZlLFxyXG4gICAgVmlib3JEcm9wZG93bkRpcmVjdGl2ZSxcclxuICAgIFZpYm9yU2VsZWN0ZWREaXJlY3RpdmVcclxufSBmcm9tICcuL25nLXZpYm9yLXRlbXBsYXRlLmRpcmVjdGl2ZSc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgSURhdGFSZXNwb25zZSxcclxuICAgIGRlZmF1bHRGb3JtYXR0ZXIsXHJcbiAgICBmZXRjaEZyb21PYmplY3QsXHJcbiAgICBzY3JvbGxBY3RpdmVPcHRpb25cclxufSBmcm9tICcuL2hlbHBlcnMnO1xyXG5cclxuY29uc3QgZGVlcEVxdWFsID0gcmVxdWlyZSgnZGVlcC1lcXVhbCcpO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxyXG4gIHNlbGVjdG9yOiAndmlib3InLFxyXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInZpYm9yXCI+XHJcbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG5cclxuICA8ZGl2IGNsYXNzPVwic2VsZWN0LXNlYXJjaFwiIChjbGljayk9XCJzaG93RHJvcGRvd25MaXN0KCRldmVudCk7XCI+XHJcbiAgICA8dWwgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoLWxpc3RcIj5cclxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm11bHRpcGxlIHx8ICFpc09wZW5cIj5cclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIVNlbGVjdGVkVGVtcGxhdGU7IGVsc2Ugc2VsZWN0ZWRUXCI+XHJcbiAgICAgICAgICA8bGkgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbSBzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9zZWxlY3Rpb25cIiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBvdXRwdXQ7IGxldCAkaW5kZXg9aW5kZXg7IGxldCAkbGFzdD1sYXN0OyB0cmFja0J5OiBUcmFja0J5Rm47XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2aWJvcl9fc2VsZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBbaW5uZXJIVE1MXT1cImdldExpc3RGb3JtYXR0ZWQoaXRlbSlcIj48L2Rpdj5cclxuICAgICAgICAgICAgICA8YSBjbGFzcz1cInNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX3JlbW92ZVwiICpuZ0lmPVwiYWxsb3dSZXNldFwiIChjbGljayk9XCIhZGlzYWJsZWQgJiYgcmVtb3ZlT25lKCRpbmRleCwgJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCIjMmMyYzJjXCIgZD1cIk0xMC4xIDQuNUw4IDYuNiA1LjkgNC41IDQuNSA1LjkgNi42IDhsLTIuMSAyLjEgMS40IDEuNEw4IDkuNGwyLjEgMi4xIDEuNC0xLjRMOS40IDhsMi4xLTIuMXpcIi8+XHJcbiAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9saT5cclxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgICAgICAgPG5nLXRlbXBsYXRlICNzZWxlY3RlZFQ+XHJcbiAgICAgICAgICA8bGkgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbSBzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9zZWxlY3Rpb25cIiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBvdXRwdXQ7IGxldCAkaW5kZXg9aW5kZXg7IGxldCAkbGFzdD1sYXN0OyB0cmFja0J5OiBUcmFja0J5Rm47XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2aWJvcl9fc2VsZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIlNlbGVjdGVkVGVtcGxhdGU7IGNvbnRleHQ6IHtpdGVtOiBpdGVtfVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgIDxhIGNsYXNzPVwic2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fcmVtb3ZlXCIgKm5nSWY9XCJhbGxvd1Jlc2V0ICYmICFkaXNhYmxlZFwiIChjbGljayk9XCIhZGlzYWJsZWQgJiYgcmVtb3ZlT25lKCRpbmRleCwgJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCIjMmMyYzJjXCIgZD1cIk0xMC4xIDQuNUw4IDYuNiA1LjkgNC41IDQuNSA1LjkgNi42IDhsLTIuMSAyLjEgMS40IDEuNEw4IDkuNGwyLjEgMi4xIDEuNC0xLjRMOS40IDhsMi4xLTIuMXpcIi8+XHJcbiAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9saT5cclxuICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtIHNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2lucHV0XCIgW2NsYXNzLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2hpZGVdPVwiSW5wdXRIaWRlXCI+XHJcbiAgICAgICAgPGlucHV0IGF1dG9jb21wbGV0ZT1cIm9mZlwiICNpbnB1dENvbnRyb2w9XCJuZ01vZGVsXCIgW25hbWVdPVwibmFtZVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIFsobmdNb2RlbCldPVwicXVlcnlcIiBbcGxhY2Vob2xkZXJdPVwib3V0cHV0Lmxlbmd0aCA9PSAwIHx8IChtdWx0aXBsZSAmJiBvdXRwdXQubGVuZ3RoIDwgbXVsdGlwbGVMaW1pdCkgPyBwbGFjZWhvbGRlciA6ICcnXCJcclxuICAgICAgICAgIChpbnB1dCk9XCJ1cGRhdGVPcHRpb25zSW5EZWxheSgpXCIgKGtleWRvd24pPVwia2V5RG93bigkZXZlbnQpXCIgLz5cclxuICAgICAgPC9saT5cclxuICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LXNlYXJjaC1saXN0LWl0ZW0gc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fbG9hZGVyLWNlbnRlclwiIFtoaWRkZW5dPVwiIWRhdGFMaXN0U3ViIHx8IGRhdGFMaXN0U3ViLmNsb3NlZFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9sb2FkZXJcIj48L2Rpdj5cclxuICAgICAgPC9saT5cclxuXHJcbiAgICAgIDxzcGFuIGNsYXNzPVwiYXJyb3dcIiAoY2xpY2spPVwidG9nZ2xlRHJvcGRvd24oJGV2ZW50KVwiPlxyXG4gICAgICA8L3NwYW4+XHJcbiAgICA8L3VsPlxyXG4gIDwvZGl2PlxyXG5cclxuICA8ZGl2IGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duXCIgKm5nSWY9XCJpc09wZW5cIj5cclxuICAgIDx1bCBjbGFzcz1cInNlbGVjdC1kcm9wZG93bi1vcHRncm91cFwiPlxyXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIURyb3Bkb3duVGVtcGxhdGU7IGVsc2UgZHJvcGRvd25UXCI+XHJcbiAgICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvblwiICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgT3B0aW9uczsgbGV0IGk9aW5kZXhcIiAobW91c2Vkb3duKT1cInNlbGVjdE9uZSgkZXZlbnQsIG9wdGlvbilcIlxyXG4gICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJpID09PSBzZWxlY3RvclBvc2l0aW9uXCIgW2lubmVySFRNTF09XCJnZXREcm9wZG93bkZvcm1hdHRlZChvcHRpb24pXCI+XHJcbiAgICAgICAgPC9saT5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcblxyXG4gICAgICA8bmctdGVtcGxhdGUgI2Ryb3Bkb3duVD5cclxuICAgICAgICA8bGkgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXAtb3B0aW9uXCIgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBPcHRpb25zOyBsZXQgaT1pbmRleFwiIChtb3VzZWRvd24pPVwic2VsZWN0T25lKCRldmVudCwgb3B0aW9uKVwiXHJcbiAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cImkgPT09IHNlbGVjdG9yUG9zaXRpb25cIj5cclxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJEcm9wZG93blRlbXBsYXRlOyBjb250ZXh0OiB7aXRlbTogb3B0aW9ufVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgIDwvbGk+XHJcbiAgICAgIDwvbmctdGVtcGxhdGU+XHJcblxyXG4gICAgICA8bGkgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXAtb3B0aW9uIGxvYWRpbmdcIiAqbmdJZj1cImRhdGFMaXN0U3ViICYmICFkYXRhTGlzdFN1Yi5jbG9zZWRcIj5cclxuICAgICAgICDDkMKXw5DCsMOQwrPDkcKAw5HCg8OQwrfDkMK6w5DCsFxyXG4gICAgICA8L2xpPlxyXG4gICAgICA8bGkgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXAtb3B0aW9uIGxvYWRlclwiIChtb3VzZWRvd24pPVwiQWRkTmV3T2JqZWN0KENyZWF0ZU5ldyhxdWVyeSkpO1wiIFtjbGFzcy5hY3RpdmVdPVwic2VsZWN0b3JQb3NpdGlvbiA9PT0gT3B0aW9ucy5sZW5ndGhcIlxyXG4gICAgICAgICpuZ0lmPVwiU2hvd05ld1wiPlxyXG5cclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY3JlYXRlVGVtcGxhdGU7IGVsc2UgdGVtcGxhdGVXaXRoTWVzc2FnZVwiPlxyXG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNyZWF0ZVRlbXBsYXRlLnRlbXBsYXRlUmVmOyBjb250ZXh0OiB7cXVlcnk6IHF1ZXJ5fVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG5cclxuICAgICAgICA8bmctdGVtcGxhdGUgI3RlbXBsYXRlV2l0aE1lc3NhZ2U+XHJcbiAgICAgICAgICB7eyBuZXdNZXNzYWdlIH19XHJcbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgPC9saT5cclxuICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvbiBsb2FkZXJcIiAqbmdJZj1cIlNob3dFbXB0eVwiPlxyXG4gICAgICAgIMOQwp/DkcKDw5HCgcORwoLDkMK+XHJcbiAgICAgIDwvbGk+XHJcbiAgICA8L3VsPlxyXG4gICAgPGRpdiBjbGFzcz1cInNlbGVjdC1kcm9wZG93bi1wYWdlclwiICpuZ0lmPVwiY3VycmVudENhY2hlICYmIGN1cnJlbnRDYWNoZS5jb3VudFBhZ2VzID4gMVwiPlxyXG4gICAgICA8cCBjbGFzcz1cInNlbGVjdC1kcm9wZG93bi1wYWdlci1wYWdlXCI+XHJcbiAgICAgICAge3sgY3VycmVudENhY2hlLmN1cnJlbnRQYWdlIHwgbnVtYmVyIH19IC8ge3sgY3VycmVudENhY2hlLmNvdW50UGFnZXMgfCBudW1iZXIgfX1cclxuICAgICAgPC9wPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLXBhZ2VyLWxvYWRtb3JlXCIgKm5nSWY9XCJjdXJyZW50Q2FjaGUuY291bnRQYWdlcyA+IDEgJiYgY3VycmVudENhY2hlLmN1cnJlbnRQYWdlIDwgY3VycmVudENhY2hlLmNvdW50UGFnZXNcIlxyXG4gICAgICAgIChtb3VzZWRvd24pPVwibmV4dFBhZ2UoJGV2ZW50KVwiPlxyXG4gICAgICAgIMOQwpfDkMKww5DCs8ORwoDDkcKDw5DCt8OQwrjDkcKCw5HCjCDDkMK1w5HCicORwpFcclxuICAgICAgPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbmAsXHJcbiAgc3R5bGVzOiBbYC52aWJvciBhLC52aWJvciBsYWJlbCwudmlib3IgbGVnZW5kLC52aWJvciBwLC52aWJvciBzcGFuLC52aWJvciB1bHttYXJnaW46MDtwYWRkaW5nOjA7Ym9yZGVyOjB9LnZpYm9yIGEsLnZpYm9yIGJ1dHRvbiwudmlib3IgaW5wdXR7b3V0bGluZTowfS52aWJvciBvbCwudmlib3IgdWx7bGlzdC1zdHlsZTpub25lfS52aWJvciBpbnB1dHtwYWRkaW5nOjA7bWFyZ2luOjA7Ym9yZGVyOjA7Zm9udDppbmhlcml0fS52aWJvciBie2ZvbnQtd2VpZ2h0OjQwMH0udmlib3J7cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTpibG9jaztwYWRkaW5nOjEwcHggMTVweDtib3JkZXI6MXB4IHNvbGlkICNkNWQ5ZGU7Ym9yZGVyLXJhZGl1czozcHg7Zm9udC1mYW1pbHk6LWFwcGxlLXN5c3RlbSxCbGlua01hY1N5c3RlbUZvbnQsXCJTZWdvZSBVSVwiLFJvYm90byxIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZixcIkFwcGxlIENvbG9yIEVtb2ppXCIsXCJTZWdvZSBVSSBFbW9qaVwiLFwiU2Vnb2UgVUkgU3ltYm9sXCI7Zm9udC1zaXplOjE0cHg7bGluZS1oZWlnaHQ6MThweDt0cmFuc2l0aW9uOmJveC1zaGFkb3cgLjE1cyBsaW5lYXJ9LnZpYm9yOmhvdmVyLC52aWJvcjpob3ZlciAuc2VsZWN0LWRyb3Bkb3due2JveC1zaGFkb3c6MCAzcHggNnB4IDAgcmdiYSg0NCw0NCw0NCwuMSl9LnZpYm9yW2Rpc2FibGVkXXtvcGFjaXR5Oi42O3BvaW50ZXItZXZlbnRzOm5vbmV9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoe3Bvc2l0aW9uOnJlbGF0aXZlfS52aWJvciAuc2VsZWN0LXNlYXJjaCAuYXJyb3d7Y29udGVudDpcIlwiO3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjA7dG9wOjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpO2Rpc3BsYXk6YmxvY2s7d2lkdGg6MTZweDtoZWlnaHQ6MTZweDtiYWNrZ3JvdW5kLWltYWdlOnVybChkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUJqYkdGemN6MGlibU10YVdOdmJpQm5iSGx3YUNJZ2VHMXNibk05SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpJd01EQXZjM1puSWlCM2FXUjBhRDBpTVRZaUlHaGxhV2RvZEQwaU1UWWlJSFpwWlhkQ2IzZzlJakFnTUNBeE5pQXhOaUkrRFFvZ0lEeHdZWFJvSUdacGJHdzlJaU15WXpKak1tTWlJR1E5SWswNElERXhMalJNTWk0MklEWWdOQ0EwTGpac05DQTBJRFF0TkV3eE15NDBJRFlpTHo0TkNqd3ZjM1puUGcwSyk7dHJhbnNpdGlvbjotd2Via2l0LXRyYW5zZm9ybSAuMTVzIGVhc2UtaW4tb3V0O3RyYW5zaXRpb246dHJhbnNmb3JtIC4xNXMgZWFzZS1pbi1vdXQ7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjE1cyBlYXNlLWluLW91dCwtd2Via2l0LXRyYW5zZm9ybSAuMTVzIGVhc2UtaW4tb3V0fS52aWJvciAuc2VsZWN0LXNlYXJjaCAuYXJyb3c6YmVmb3JlLC52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faGlkZXtkaXNwbGF5Om5vbmV9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9zZWxlY3Rpb257cG9zaXRpb246cmVsYXRpdmV9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9pbnB1dCBpbnB1dHt3aWR0aDoxMDAlO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7Zm9udC1zaXplOjE0cHg7Y29sb3I6IzJjMmMyY30udmlib3IgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2lucHV0IGlucHV0Ojotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVye2NvbG9yOnJnYmEoNDQsNDQsNDQsLjIpfS52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faW5wdXQgaW5wdXQ6LW1zLWlucHV0LXBsYWNlaG9sZGVye2NvbG9yOnJnYmEoNDQsNDQsNDQsLjIpfS52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faW5wdXQgaW5wdXQ6Oi1tcy1pbnB1dC1wbGFjZWhvbGRlcntjb2xvcjpyZ2JhKDQ0LDQ0LDQ0LC4yKX0udmlib3IgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2lucHV0IGlucHV0OjpwbGFjZWhvbGRlcntjb2xvcjpyZ2JhKDQ0LDQ0LDQ0LC4yKX0udmlib3IgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX3JlbW92ZXtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7d2lkdGg6MTZweDtoZWlnaHQ6MTZweDttYXJnaW4tbGVmdDo1cHg7Ym9yZGVyLXJhZGl1czo1MCU7YmFja2dyb3VuZC1jb2xvcjojYmFiYWJhO2N1cnNvcjpwb2ludGVyO3RyYW5zaXRpb246YmFja2dyb3VuZC1jb2xvciAuMTVzIGxpbmVhcn0udmlib3IgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX3JlbW92ZTpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiM5NDk0OTR9LnZpYm9yIC5zZWxlY3QtZHJvcGRvd257cG9zaXRpb246YWJzb2x1dGU7dG9wOjEwMCU7bGVmdDotMXB4O3JpZ2h0Oi0xcHg7ei1pbmRleDoyfS52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fbG9hZGVyLWNlbnRlcntwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDotMnB4O3RvcDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKTtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7d2lkdGg6MjFweDtoZWlnaHQ6MjFweDtiYWNrZ3JvdW5kOiNmZmY7ei1pbmRleDoyfS52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fbG9hZGVyLWNlbnRlcltoaWRkZW5de2Rpc3BsYXk6bm9uZX0udmlib3IgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2xvYWRlci1jZW50ZXIgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2xvYWRlcnt3aWR0aDoxNnB4O2hlaWdodDoxNnB4O2JveC1zaXppbmc6Ym9yZGVyLWJveDtib3JkZXItd2lkdGg6MnB4O2JvcmRlci1zdHlsZTpzb2xpZDtib3JkZXItY29sb3I6IzIyMjcyZSByZ2JhKDM0LDM5LDQ2LC40KSByZ2JhKDM0LDM5LDQ2LC40KTtib3JkZXItcmFkaXVzOjEwMCU7LXdlYmtpdC1hbmltYXRpb246LjQ1cyBsaW5lYXIgaW5maW5pdGUgY2xvY2t3aXNlO2FuaW1hdGlvbjouNDVzIGxpbmVhciBpbmZpbml0ZSBjbG9ja3dpc2V9LnZpYm9yIC5zZWxlY3QtZHJvcGRvd257Ym9yZGVyOjFweCBzb2xpZCAjZDVkOWRlO2JvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6NXB4O2JvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOjVweDtib3JkZXItdG9wOjA7YmFja2dyb3VuZDojZmZmfS52aWJvciAuc2VsZWN0LWRyb3Bkb3duLW9wdGdyb3Vwe21heC1oZWlnaHQ6MzAwcHg7b3ZlcmZsb3cteTphdXRvfS52aWJvciAuc2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvbnttaW4taGVpZ2h0OjMwcHg7cGFkZGluZzoxMHB4IDE1cHg7Y29sb3I6IzJjMmMyY30udmlib3IgLnNlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb246aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDY2LDEzMiwyMTUsLjEpfS52aWJvciAuc2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvbi5sb2FkaW5ne2ZvbnQtc2l6ZToxNnB4O2xpbmUtaGVpZ2h0OjE4cHg7dGV4dC1hbGlnbjpjZW50ZXI7Y29sb3I6IzhiOGI4M30udmlib3IgLnNlbGVjdC1kcm9wZG93bi1wYWdlcntwYWRkaW5nOjEwcHg7dGV4dC1hbGlnbjpjZW50ZXI7Ym9yZGVyLXRvcDoxcHggZGFzaGVkICNkNWQ5ZGV9LnZpYm9yIC5zZWxlY3QtZHJvcGRvd24tcGFnZXItcGFnZXtmb250LXNpemU6MTJweDtjb2xvcjojOGI4YjgzfS52aWJvciAuc2VsZWN0LWRyb3Bkb3duLXBhZ2VyLWxvYWRtb3Jle2JvcmRlcjowO2JhY2tncm91bmQ6MCAwO2JveC1zaGFkb3c6bm9uZTtjb2xvcjojOGI4YjgzO3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZX0udmlib3IgLnNlbGVjdC1kcm9wZG93bi1wYWdlci1wYWdlKy5zZWxlY3QtZHJvcGRvd24tcGFnZXItbG9hZG1vcmV7bWFyZ2luLXRvcDoxMHB4fS52aWJvci5vcGVuLXZpYm9ye2JvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6MDtib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czowfS52aWJvci5vcGVuLXZpYm9yIC5zZWxlY3Qtc2VhcmNoIC5hcnJvd3std2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpIHJvdGF0ZSgxODBkZWcpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpIHJvdGF0ZSgxODBkZWcpfS52aWJvcjpub3QoLm11bHRpcGxlKSAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fcmVtb3Zle3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjI1cHg7dG9wOjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpfS52aWJvci5tdWx0aXBsZSAuc2VsZWN0LXNlYXJjaC1saXN0e2Rpc3BsYXk6ZmxleDtmbGV4LWZsb3c6cm93IHdyYXA7bWFyZ2luOi01cHh9LnZpYm9yLm11bHRpcGxlIC5zZWxlY3Qtc2VhcmNoLWxpc3QgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVte3BhZGRpbmc6NXB4O2ZsZXgtc2hyaW5rOjB9LnZpYm9yLm11bHRpcGxlIC5zZWxlY3Qtc2VhcmNoLWxpc3QgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2lucHV0e2ZsZXg6MX0udmlib3IubXVsdGlwbGUgLnNlbGVjdC1zZWFyY2gtbGlzdCAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faW5wdXQgaW5wdXR7aGVpZ2h0OjI4cHh9LnZpYm9yLm11bHRpcGxlIC52aWJvcl9fc2VsZWN0aW9ue2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7aGVpZ2h0OjI4cHg7cGFkZGluZzowIDdweDtib3JkZXItcmFkaXVzOjNweDtmb250LXNpemU6MTRweDtiYWNrZ3JvdW5kOiNlNWU1ZTc7Y29sb3I6IzJjMmMyY31ALXdlYmtpdC1rZXlmcmFtZXMgY2xvY2t3aXNle3Rvey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpIHRyYW5zbGF0ZXooMCk7dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpIHRyYW5zbGF0ZXooMCl9fUBrZXlmcmFtZXMgY2xvY2t3aXNle3Rvey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpIHRyYW5zbGF0ZXooMCk7dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpIHRyYW5zbGF0ZXooMCl9fWBdLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgcHJvdmlkZXJzOiBbe1xyXG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ1ZpYm9yQ29tcG9uZW50KSxcclxuICAgIG11bHRpOiB0cnVlXHJcbiAgfV1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nVmlib3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG4gIC8vIExvY2FsIFZhcmlhYmxlXHJcbiAgcHVibGljIF9tb2RlbDogYW55O1xyXG5cclxuICBwcml2YXRlIGZpcnN0TG9hZCA9IGZhbHNlO1xyXG4gIHByaXZhdGUgb3B0aW9uczogQXJyYXk8YW55PjtcclxuICBwdWJsaWMgb3V0cHV0OiBBcnJheTxhbnk+O1xyXG5cclxuICBwdWJsaWMgaXNPcGVuOiBib29sZWFuO1xyXG5cclxuICBwcml2YXRlIG9sZFF1ZXJ5OiBzdHJpbmc7XHJcbiAgcHVibGljIHF1ZXJ5OiBzdHJpbmc7XHJcblxyXG4gIHB1YmxpYyBzZWxlY3RvclBvc2l0aW9uID0gMDtcclxuICBwcml2YXRlIHdhaXRUaW1lID0gNTAwO1xyXG5cclxuICBwcml2YXRlIGVsOiBFbGVtZW50OyAgICAgICAgICAgLy8gdGhpcyBjb21wb25lbnQgIGVsZW1lbnQgYDx2aWJvcj5gXHJcbiAgcHJpdmF0ZSBpbnB1dEVsOiBIVE1MSW5wdXRFbGVtZW50OyAvLyBgPGlucHV0PmAgZWxlbWVudCBpbiBgPHZpYm9yPmAgZm9yIGF1dG8gY29tcGxldGVcclxuICBAVmlld0NoaWxkKCdpbnB1dENvbnRyb2wnKSBwdWJsaWMgaW5wdXRDb250cm9sOiBOZ01vZGVsO1xyXG5cclxuICAvLyBJbnB1dHMgJiBPdXRwdXRzXHJcbiAgQElucHV0KCkgcHVibGljIG11bHRpcGxlID0gZmFsc2U7XHJcbiAgQElucHV0KCkgcHVibGljIG11bHRpcGxlTGltaXQgPSBJbmZpbml0eTtcclxuICBASW5wdXQoKSBwdWJsaWMgY291bnRPblBhZ2UgPSAxMDtcclxuXHJcbiAgQElucHV0KCkgcHVibGljIHBsYWNlaG9sZGVyID0gJ1ZpYm9yJztcclxuICBASW5wdXQoKSBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyByZXF1aXJlZCA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBhbGxvd1Jlc2V0ID0gdHJ1ZTtcclxuICBwdWJsaWMgZGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgLy8gw5DCnsORwoLDkMK+w5DCscORwoDDkMKww5DCtsOQwrXDkMK9w5DCuMOQwrUgw5HCgcOQwr/DkMK4w5HCgcOQwrrDkMK+w5DCslxyXG4gIEBDb250ZW50Q2hpbGQoVmlib3JCb3RoRGlyZWN0aXZlKSBwdWJsaWMgYm90aFRlbXBsYXRlOiBWaWJvckJvdGhEaXJlY3RpdmU7XHJcbiAgQENvbnRlbnRDaGlsZChWaWJvckRyb3Bkb3duRGlyZWN0aXZlKSBwdWJsaWMgZHJvcGRvd25UZW1wbGF0ZTogVmlib3JEcm9wZG93bkRpcmVjdGl2ZTtcclxuICBAQ29udGVudENoaWxkKFZpYm9yU2VsZWN0ZWREaXJlY3RpdmUpIHB1YmxpYyBzZWxlY3RlZFRlbXBsYXRlOiBWaWJvclNlbGVjdGVkRGlyZWN0aXZlO1xyXG4gIEBDb250ZW50Q2hpbGQoVmlib3JDcmVhdGVEaXJlY3RpdmUpIHB1YmxpYyBjcmVhdGVUZW1wbGF0ZTogVmlib3JDcmVhdGVEaXJlY3RpdmU7XHJcbiAgQElucHV0KCkgcHVibGljIGxpc3RGb3JtYXR0ZXI6IChhcmc6IGFueSwgdmFsdWU6IHN0cmluZykgPT4gc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBkcm9wZG93bkZvcm1hdHRlcjogKGFyZzogYW55LCB2YWx1ZTogc3RyaW5nKSA9PiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcHVibGljIHZpZXdQcm9wZXJ0eSA9ICdOYW1lJzsgIC8vIMOQwp/DkMK+w5DCu8OQwrUgw5DCtMOQwrvDkcKPIMOQwrTDkMK1w5HChMOQwr7DkMK7w5HCgsOQwr3DkMK+w5DCs8OQwr4gw5DCvsORwoLDkMK+w5DCscORwoDDkMKww5DCtsOQwrXDkMK9w5DCuMORwo9cclxuXHJcbiAgQElucHV0KCkgcHVibGljIG1vZGVsUHJvcGVydHkgPSAnaWQnOyAgLy8gw5DCosOQwr4sIMORwofDkcKCw5DCviDDkMK3w5DCsMOQwr/DkMK4w5HCgcORwovDkMKyw5DCsMOQwrXDkcKCw5HCgcORwo8gw5DCsiDDkMKcw5DCvsOQwrTDkMK1w5DCu8ORwoxcclxuICBASW5wdXQoKSBwdWJsaWMgcHJlbG9hZFByb3BlcnR5ID0gJ2lkcyc7IC8vIMOQwprDkMK7w5HCjsORwocgw5DCt8OQwrDDkMK/w5HCgMOQwr7DkcKBw5DCsCDDkMK6IMORwoHDkMK1w5HCgMOQwrLDkMK1w5HCgMORwoMgw5DCtMOQwrvDkcKPIMOQwr/DkcKAw5DCtcOQwrTDkMK3w5DCsMOQwrPDkcKAw5HCg8OQwrfDkMK6w5DCuCwgw5DCtcORwoHDkMK7w5DCuCB1bmRlZmluZWQgw5DCt8OQwrDDkMK/w5DCuMORwoHDkcKLw5DCssOQwrDDkMK1w5HCgsORwoHDkcKPIMOQwrLDkMK1w5HCgcORwowgw5DCvsOQwrHDkcKKw5DCtcOQwrrDkcKCXHJcbiAgQElucHV0KCkgcHVibGljIHByZWxvYWRGaWVsZDogc3RyaW5nID0gdW5kZWZpbmVkOyAvLyDDkMKXw5DCvcOQwrDDkcKHw5DCtcOQwr3DkMK4w5DCtSDDkMK/w5DCvsOQwrvDkcKPLCDDkMK6w5DCvsORwoLDkMK+w5HCgMOQwrUgw5DCvcOQwrXDkMK+w5DCscORwoXDkMK+w5DCtMOQwrjDkMK8w5DCviDDkMK+w5HCgsOQwr/DkcKAw5DCsMOQwrLDkMK4w5HCgsORwowgw5DCsiDDkMK3w5DCsMOQwr/DkcKAw5DCvsORwoEuXHJcbiAgQElucHV0KCkgcHVibGljIHNlYXJjaFByb3BlcnR5ID0gJ3F1ZXJ5JztcclxuXHJcbiAgQElucHV0KCkgcHVibGljIGRhdGFMaXN0OiAoKHBhcmFtOiBPYmplY3QsIHBhZ2U6IG51bWJlciwgY291bnRPblBhZ2U/OiBudW1iZXIpID0+IE9ic2VydmFibGU8SURhdGFSZXNwb25zZT4pIHwgQXJyYXk8YW55PjtcclxuICBASW5wdXQoKSBwdWJsaWMgZXhjbHVkZUxpc3Q6IEFycmF5PGFueT47XHJcbiAgQElucHV0KCkgcHVibGljIGFkZGl0aW9uYWxGaWx0ZXIgPSB7fTtcclxuICBASW5wdXQoKSBwdWJsaWMgb25seUVtaXR0ZXI6IGJvb2xlYW47XHJcbiAgQE91dHB1dCgnY2hhbmdlRnVsbE1vZGVsJykgcHVibGljIGNoYW5nZUZ1bGxNb2RlbDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG5cclxuICBASW5wdXQoKSBwdWJsaWMgbmV3TWVzc2FnZTogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBDcmVhdGVOZXc6IChxdWVyeTogc3RyaW5nKSA9PiBPYnNlcnZhYmxlPGFueT4gfCBhbnkgPSAocXVlcnk6IHN0cmluZykgPT4ge1xyXG4gICAgcmV0dXJuIHF1ZXJ5O1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIFN1YnNjcmlwdGlvblxyXG4gIHB1YmxpYyBkYXRhTGlzdFN1YjogU3Vic2NyaXB0aW9uO1xyXG5cclxuXHJcbiAgLy8gT1BUSU9OU1xyXG4gIHB1YmxpYyBUcmFja0J5Rm4oaW5kZXg6IG51bWJlcik6IGFueSB7XHJcbiAgICByZXR1cm4gaW5kZXg7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2hvd0Ryb3Bkb3duTGlzdChldmVudDogRm9jdXNFdmVudCB8IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIGlmIChldmVudCkge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5tdWx0aXBsZSAmJiB0aGlzLm91dHB1dC5sZW5ndGggPj0gdGhpcy5tdWx0aXBsZUxpbWl0KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ29wZW4tdmlib3InKTtcclxuICAgIHRoaXMuaW5wdXRFbC5mb2N1cygpO1xyXG4gICAgdGhpcy51cGRhdGVPcHRpb25zKCk7XHJcbiAgICB0aGlzLm9uVG91Y2hlZCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoaWRlRHJvcGRvd25MaXN0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuLXZpYm9yJyk7XHJcbiAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xyXG4gICAgdGhpcy5pbnB1dEVsLmJsdXIoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBoaWRlRHJvcGRvd25MaXN0V2l0aERlbGF5KCk6IHZvaWQge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuaGlkZURyb3Bkb3duTGlzdCgpO1xyXG4gICAgfSwgMTAwKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB0b2dnbGVEcm9wZG93bihldmVudDogRXZlbnQpOiB2b2lkIHtcclxuICAgIGlmIChldmVudCkge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5pc09wZW4pIHtcclxuICAgICAgdGhpcy5oaWRlRHJvcGRvd25MaXN0KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNob3dEcm9wZG93bkxpc3QodW5kZWZpbmVkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZGVsYXk6IEZ1bmN0aW9uID0gKGZ1bmN0aW9uICgpOiBGdW5jdGlvbiB7XHJcbiAgICBsZXQgdGltZXIgPSAwO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjYWxsYmFjazogYW55LCBtczogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XHJcbiAgICAgIHRpbWVyID0gc2V0VGltZW91dChjYWxsYmFjaywgbXMpO1xyXG4gICAgfTtcclxuICB9KSgpO1xyXG5cclxuICBwdWJsaWMgdXBkYXRlT3B0aW9ucygpOiB2b2lkIHtcclxuICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcclxuICAgIGlmICh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgdGhpcy5vcHRpb25zID0gdGhpcy5kYXRhTGlzdC5maWx0ZXIoZGF0YSA9PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnF1ZXJ5IHx8IHRoaXMucXVlcnkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGY6IGFueSA9IGZldGNoRnJvbU9iamVjdChkYXRhLCB0aGlzLnNlYXJjaFByb3BlcnR5KTtcclxuICAgICAgICBpZiAoZiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShmKS5pbmRleE9mKHRoaXMucXVlcnkpID49IDA7XHJcbiAgICAgIH0pLmZpbHRlcihkYXRhID0+IHtcclxuICAgICAgICBpZiAoIXRoaXMuZXhjbHVkZUxpc3QpIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGQgPSBmZXRjaEZyb21PYmplY3QoZGF0YSwgdGhpcy5tb2RlbFByb3BlcnR5KS52YWx1ZU9mKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXhjbHVkZUxpc3QuZmluZEluZGV4KGV4ID0+IHtcclxuICAgICAgICAgIGxldCBhID0gZmV0Y2hGcm9tT2JqZWN0KGV4LCB0aGlzLm1vZGVsUHJvcGVydHkpLnZhbHVlT2YoKTtcclxuICAgICAgICAgIHJldHVybiBkZWVwRXF1YWwoZCwgYSk7XHJcbiAgICAgICAgfSkgPCAwO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgIGlmICh0aGlzLmRhdGFMaXN0U3ViKSB7IHRoaXMuZGF0YUxpc3RTdWIudW5zdWJzY3JpYmUoKTsgfVxyXG4gICAgICBpZiAoIXRoaXMuY3VycmVudENhY2hlKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50Q2FjaGUgPSB7XHJcbiAgICAgICAgICBjb3VudEVsZW1lbnQ6IDAsXHJcbiAgICAgICAgICBjb3VudFBhZ2VzOiAxLFxyXG4gICAgICAgICAgY3VycmVudFBhZ2U6IDEsXHJcbiAgICAgICAgICBvYmplY3RzOiBbXSxcclxuICAgICAgICAgIHF1ZXJ5OiB0aGlzLnF1ZXJ5LFxyXG4gICAgICAgICAgcGFyYW1zOiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmFkZGl0aW9uYWxGaWx0ZXIpXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmNhY2hlTGF6eURhdGEucHVzaCh0aGlzLmN1cnJlbnRDYWNoZSk7XHJcblxyXG4gICAgICAgIGxldCBwYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmFkZGl0aW9uYWxGaWx0ZXIpIGFzIGFueTtcclxuICAgICAgICBwYXJhbXNbdGhpcy5zZWFyY2hQcm9wZXJ0eV0gPSB0aGlzLnF1ZXJ5O1xyXG5cclxuICAgICAgICB0aGlzLmRhdGFMaXN0U3ViID0gKDxPYnNlcnZhYmxlPElEYXRhUmVzcG9uc2U+PnRoaXMuZGF0YUxpc3QocGFyYW1zLCAxLCB0aGlzLmNvdW50T25QYWdlKSkuc3Vic2NyaWJlKGFuc3dlciA9PiB7XHJcbiAgICAgICAgICB0aGlzLmN1cnJlbnRDYWNoZS5vYmplY3RzID0gdGhpcy5jdXJyZW50Q2FjaGUub2JqZWN0cy5jb25jYXQoYW5zd2VyLmxpc3QpO1xyXG4gICAgICAgICAgdGhpcy5jdXJyZW50Q2FjaGUuY291bnRFbGVtZW50ID0gYW5zd2VyLmhlYWRlcnNbJ2NvdW50J107XHJcbiAgICAgICAgICB0aGlzLmN1cnJlbnRDYWNoZS5jb3VudFBhZ2VzID0gTWF0aC5jZWlsKHRoaXMuY3VycmVudENhY2hlLmNvdW50RWxlbWVudCAvIHRoaXMuY291bnRPblBhZ2UpO1xyXG4gICAgICAgIH0sICgpID0+IHsgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyB1cGRhdGVPcHRpb25zSW5EZWxheSgpOiB2b2lkIHtcclxuICAgIGxldCBkZWxheU1zOiBudW1iZXIgPSB0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgQXJyYXkgPyAxMCA6IHRoaXMud2FpdFRpbWU7XHJcblxyXG4gICAgLy8gZXhlY3V0aW5nIGFmdGVyIHVzZXIgc3RvcHBlZCB0eXBpbmdcclxuICAgIHRoaXMuZGVsYXkoKCkgPT4ge1xyXG4gICAgICB0aGlzLm9sZFF1ZXJ5ID0gdGhpcy5xdWVyeTtcclxuICAgICAgdGhpcy5jdXJyZW50Q2FjaGUgPSB0aGlzLkdldENhY2hlKHRoaXMucXVlcnkpO1xyXG4gICAgICB0aGlzLnVwZGF0ZU9wdGlvbnMoKTtcclxuICAgIH0sIGRlbGF5TXMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBmb2N1c1NlbGVjdGVkT3B0aW9uKCk6IHZvaWQge1xyXG4gICAgbGV0IGxpc3Q6IGFueSA9IDxIVE1MRWxlbWVudD50aGlzLmVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NlbGVjdC1kcm9wZG93bicpWzBdO1xyXG4gICAgbGV0IHRhcmdldExpOiBhbnkgPSA8SFRNTEVsZW1lbnQ+dGhpcy5lbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXAtb3B0aW9uJylbdGhpcy5zZWxlY3RvclBvc2l0aW9uXTtcclxuICAgIHNjcm9sbEFjdGl2ZU9wdGlvbihsaXN0LCB0YXJnZXRMaSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMga2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLk9wdGlvbnMpIHtcclxuICAgICAgdGhpcy5zaG93RHJvcGRvd25MaXN0KHVuZGVmaW5lZCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdG90YWxOdW1JdGVtOiBudW1iZXIgPSB0aGlzLk9wdGlvbnMubGVuZ3RoO1xyXG5cclxuICAgIGlmICh0aGlzLlNob3dOZXcpIHtcclxuICAgICAgdG90YWxOdW1JdGVtKys7XHJcbiAgICB9XHJcblxyXG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XHJcbiAgICAgIGNhc2UgMjc6IC8vIEVTQywgaGlkZSBhdXRvIGNvbXBsZXRlXHJcbiAgICAgICAgdGhpcy5oaWRlRHJvcGRvd25MaXN0KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDM4OiAvLyBVUCwgc2VsZWN0IHRoZSBwcmV2aW91cyBsaSBlbFxyXG4gICAgICAgIHRoaXMuc2VsZWN0b3JQb3NpdGlvbiA9ICh0b3RhbE51bUl0ZW0gKyB0aGlzLnNlbGVjdG9yUG9zaXRpb24gLSAxKSAlIHRvdGFsTnVtSXRlbTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgNDA6IC8vIERPV04sIHNlbGVjdCB0aGUgbmV4dCBsaSBlbCBvciB0aGUgZmlyc3Qgb25lXHJcbiAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0b3JQb3NpdGlvbiA9ICh0b3RhbE51bUl0ZW0gKyB0aGlzLnNlbGVjdG9yUG9zaXRpb24gKyAxKSAlIHRvdGFsTnVtSXRlbTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMTM6IC8vIEVOVEVSLCBjaG9vc2UgaXQhIVxyXG4gICAgICAgIGlmICh0b3RhbE51bUl0ZW0gPiAwKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5zZWxlY3RvclBvc2l0aW9uID09PSB0aGlzLk9wdGlvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQWRkTmV3T2JqZWN0KHRoaXMuQ3JlYXRlTmV3KHRoaXMucXVlcnkpKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0T25lKGV2ZW50LCB0aGlzLk9wdGlvbnNbdGhpcy5zZWxlY3RvclBvc2l0aW9uXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLlNob3dOZXcpIHtcclxuICAgICAgICAgIHRoaXMuQWRkTmV3T2JqZWN0KHRoaXMuQ3JlYXRlTmV3KHRoaXMucXVlcnkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBkZWZhdWx0OiBicmVhaztcclxuICAgIH1cclxuICAgIHRoaXMuZm9jdXNTZWxlY3RlZE9wdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5leHRQYWdlKCRldmVudDogRXZlbnQpOiB2b2lkIHtcclxuICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIC8vIFZhbGlkYXRvcnNcclxuICAgIGlmICghKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBGdW5jdGlvbikpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdEYXRhIExpc3QgbWFzdCBiZSBGdW5jdGlvbicpO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLmN1cnJlbnRDYWNoZSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZvciBuZXh0IHBhZ2UgbmVlZCBjYWNoZSBmb3IgZmlyc3QgUGFnZScpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuY3VycmVudENhY2hlLmN1cnJlbnRQYWdlID49IHRoaXMuY3VycmVudENhY2hlLmNvdW50UGFnZXMpIHsgdGhyb3cgbmV3IEVycm9yKCdNYXggUGFnZSBMaW1pdCcpOyB9XHJcblxyXG4gICAgaWYgKHRoaXMuZGF0YUxpc3RTdWIpIHsgdGhpcy5kYXRhTGlzdFN1Yi51bnN1YnNjcmliZSgpOyB9XHJcblxyXG4gICAgbGV0IHBhcmFtczogYW55ID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5hZGRpdGlvbmFsRmlsdGVyKTtcclxuICAgIHBhcmFtc1t0aGlzLnNlYXJjaFByb3BlcnR5XSA9IHRoaXMucXVlcnk7XHJcblxyXG4gICAgdGhpcy5kYXRhTGlzdFN1YiA9IHRoaXMuZGF0YUxpc3QocGFyYW1zLCB0aGlzLmN1cnJlbnRDYWNoZS5jdXJyZW50UGFnZSArIDEsIHRoaXMuY291bnRPblBhZ2UpLnN1YnNjcmliZShhbnN3ZXIgPT4ge1xyXG4gICAgICB0aGlzLmN1cnJlbnRDYWNoZS5jdXJyZW50UGFnZSsrO1xyXG4gICAgICB0aGlzLmN1cnJlbnRDYWNoZS5jb3VudEVsZW1lbnQgPSBhbnN3ZXIuaGVhZGVyc1snY291bnQnXTtcclxuICAgICAgdGhpcy5jdXJyZW50Q2FjaGUuY291bnRQYWdlcyA9IE1hdGguY2VpbCh0aGlzLmN1cnJlbnRDYWNoZS5jb3VudEVsZW1lbnQgLyB0aGlzLmNvdW50T25QYWdlKTtcclxuICAgICAgdGhpcy5jdXJyZW50Q2FjaGUub2JqZWN0cyA9IHRoaXMuY3VycmVudENhY2hlLm9iamVjdHMuY29uY2F0KGFuc3dlci5saXN0KTtcclxuICAgICAgdGhpcy5zZWxlY3RvclBvc2l0aW9uID0gKHRoaXMuY3VycmVudENhY2hlLmN1cnJlbnRQYWdlIC0gMSkgKiB0aGlzLmNvdW50T25QYWdlICsgMTtcclxuICAgICAgdGhpcy5mb2N1c1NlbGVjdGVkT3B0aW9uKCk7XHJcbiAgICB9LCAoKSA9PiB7IH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gTU9ERUxcclxuICBwcml2YXRlIGNsZWFyUHJvcGVydHkoKTogdm9pZCB7XHJcbiAgICB0aGlzLnNlbGVjdG9yUG9zaXRpb24gPSAwO1xyXG4gICAgdGhpcy5xdWVyeSA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZWxlY3RPbmUoJGV2ZW50OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCwgZGF0YTogYW55KTogdm9pZCB7XHJcbiAgICAvLyDDkMKkw5DCuMOQwrvDkcKMw5HCgsORwoAgw5DCvcOQwrXDkMK9w5HCg8OQwrbDkMK9w5HCi8ORwoUgw5HCgcOQwr7DkMKxw5HCi8ORwoLDkMK4w5DCuVxyXG4gICAgaWYgKCRldmVudCBpbnN0YW5jZW9mIE1vdXNlRXZlbnQgJiYgJGV2ZW50LmJ1dHRvbiAhPT0gMCkgeyByZXR1cm47IH1cclxuXHJcbiAgICBpZiAodGhpcy5tdWx0aXBsZSAmJiB0aGlzLm91dHB1dC5sZW5ndGggPCB0aGlzLm11bHRpcGxlTGltaXQpIHtcclxuICAgICAgdGhpcy5vdXRwdXQucHVzaChkYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoIXRoaXMubXVsdGlwbGUpIHtcclxuICAgICAgdGhpcy5vdXRwdXQgPSBbZGF0YV07XHJcbiAgICB9XHJcbiAgICB0aGlzLmNoYW5nZUZ1bGxNb2RlbC5lbWl0KHRoaXMub3V0cHV0KTtcclxuICAgIHRoaXMuTW9kZWwgPSB0aGlzLlZhbHVlRnJvbU91dHB1dDtcclxuICAgIHRoaXMuY2xlYXJQcm9wZXJ0eSgpO1xyXG4gICAgdGhpcy5oaWRlRHJvcGRvd25MaXN0KCk7XHJcbiAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9O1xyXG5cclxuICBwdWJsaWMgcmVtb3ZlT25lKGluZGV4OiBudW1iZXIsIGV2ZW50OiBFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICB0aGlzLm91dHB1dC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgdGhpcy5Nb2RlbCA9IHRoaXMuVmFsdWVGcm9tT3V0cHV0O1xyXG5cclxuICAgIC8vIHNldCBjbGFzc1xyXG4gICAgdGhpcy5vblRvdWNoZWQoKTtcclxuICAgIHRoaXMuaW5wdXRDb250cm9sLmNvbnRyb2wubWFya0FzVG91Y2hlZCgpO1xyXG5cclxuICAgIC8vIG9wZW4gZHJvcGRvd25cclxuICAgIGlmICh0aGlzLnJlcXVpcmVkKSB7XHJcbiAgICAgIHRoaXMuc2hvd0Ryb3Bkb3duTGlzdCh1bmRlZmluZWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gRk9STUFUVElOR1xyXG5cclxuICBwdWJsaWMgZ2V0IFNlbGVjdGVkVGVtcGxhdGUoKTogVGVtcGxhdGVSZWY8YW55PiB7XHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZFRlbXBsYXRlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkVGVtcGxhdGUudGVtcGxhdGVSZWY7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuYm90aFRlbXBsYXRlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmJvdGhUZW1wbGF0ZS50ZW1wbGF0ZVJlZjtcclxuICAgIH1cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IERyb3Bkb3duVGVtcGxhdGUoKTogVGVtcGxhdGVSZWY8YW55PiB7XHJcbiAgICBpZiAodGhpcy5kcm9wZG93blRlbXBsYXRlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmRyb3Bkb3duVGVtcGxhdGUudGVtcGxhdGVSZWY7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuYm90aFRlbXBsYXRlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmJvdGhUZW1wbGF0ZS50ZW1wbGF0ZVJlZjtcclxuICAgIH1cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TGlzdEZvcm1hdHRlZChkYXRhOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgbGV0IGZvcm1hdHRlcjogYW55ID0gdGhpcy5saXN0Rm9ybWF0dGVyIHx8IGRlZmF1bHRGb3JtYXR0ZXI7XHJcbiAgICByZXR1cm4gZm9ybWF0dGVyLmFwcGx5KHRoaXMsIFtkYXRhLCB0aGlzLnZpZXdQcm9wZXJ0eV0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldERyb3Bkb3duRm9ybWF0dGVkKGRhdGE6IGFueSk6IHN0cmluZyB7XHJcbiAgICBsZXQgZm9ybWF0dGVyOiBhbnkgPSB0aGlzLmRyb3Bkb3duRm9ybWF0dGVyIHx8IGRlZmF1bHRGb3JtYXR0ZXI7XHJcbiAgICByZXR1cm4gZm9ybWF0dGVyLmFwcGx5KHRoaXMsIFtkYXRhLCB0aGlzLnZpZXdQcm9wZXJ0eV0pO1xyXG4gIH1cclxuXHJcbiAgLy8gSU5JVFxyXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIC8vIHRoaXMuTW9kZWwgPSB0aGlzLlZhbHVlRnJvbU91dHB1dDsgw5DCrcORwoLDkMK+IMOQwrLDkcKAw5DCvsOQwrTDkMK1IMORwoLDkcKDw5HCgiDDkcKCw5DCvsOQwrbDkMK1IMORwoPDkMK2w5DCtSDDkMK9w5DCtSDDkMK9w5DCsMOQwrTDkMK+LlxyXG4gICAgdGhpcy5lbCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3ZpYm9yJykuaXRlbSgwKTtcclxuICAgIGlmICh0aGlzLm11bHRpcGxlKSB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ211bHRpcGxlJyk7XHJcbiAgICBpZiAodGhpcy5yZXF1aXJlZCkgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCdyZXF1aXJlZCcpO1xyXG5cclxuICAgIHRoaXMuaW5wdXRFbCA9IDxIVE1MSW5wdXRFbGVtZW50Pih0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25DaGFuZ2VzKGlucHV0czogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgaWYgKGlucHV0c1snZGF0YUxpc3QnXSAmJiBpbnB1dHNbJ2RhdGFMaXN0J10uY3VycmVudFZhbHVlKSB7XHJcbiAgICAgIC8vIE91dHB1dFxyXG4gICAgICBpZiAodGhpcy5Nb2RlbCA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuTW9kZWwgPT0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMub3V0cHV0ID0gW107XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VGdWxsTW9kZWwuZW1pdCh0aGlzLm91dHB1dCk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5Nb2RlbCBpbnN0YW5jZW9mIEFycmF5ICYmIHRoaXMubXVsdGlwbGUpIHtcclxuICAgICAgICB0aGlzLk91dHB1dCA9IHRoaXMuTW9kZWw7XHJcbiAgICAgIH0gZWxzZSBpZiAoISh0aGlzLk1vZGVsIGluc3RhbmNlb2YgQXJyYXkpICYmICF0aGlzLm11bHRpcGxlKSB7XHJcbiAgICAgICAgdGhpcy5PdXRwdXQgPSBbdGhpcy5Nb2RlbF07XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5vdXRwdXQgfHwgIXRoaXMub3V0cHV0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgdGhpcy5Nb2RlbCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5lbCAmJiBpbnB1dHNbJ211bHRpcGxlJ10pIHtcclxuICAgICAgaWYgKGlucHV0c1snbXVsdGlwbGUnXS5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ211bHRpcGxlJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCdtdWx0aXBsZScpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZWwgJiYgaW5wdXRzWydyZXF1aXJlZCddKSB7XHJcbiAgICAgIGlmIChpbnB1dHNbJ3JlcXVpcmVkJ10uY3VycmVudFZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCdyZXF1aXJlZCcpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZSgncmVxdWlyZWQnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChpbnB1dHNbJ2FkZGl0aW9uYWxGaWx0ZXInXSkge1xyXG4gICAgICB0aGlzLmN1cnJlbnRDYWNoZSA9IHRoaXMuR2V0Q2FjaGUodGhpcy5xdWVyeSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTERpdkVsZW1lbnQ+KSB7XHJcbiAgICB0aGlzLm91dHB1dCA9IFtdO1xyXG4gIH1cclxuXHJcbiAgLy8gRk9STVNcclxuICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XHJcbiAgICAvLyDDkMKdw5DCvsORwoDDkMK8w5DCsMOQwrvDkcKMw5DCvcORwovDkMK5IHVwZGF0ZSDDkMK8w5DCvsOQwrTDkMK1w5DCu8OQwrhcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICBpZiAoKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkgJiYgIXRoaXMubXVsdGlwbGUpIHx8ICghKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpICYmIHRoaXMubXVsdGlwbGUpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNb2RlbCBUeXBlIEVycm9yJyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkgJiYgdGhpcy5Nb2RlbCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gdGhpcy5Nb2RlbC5sZW5ndGggJiYgdmFsdWUuZXZlcnkodiA9PiB0aGlzLk1vZGVsLmluZGV4T2YodikgPj0gMCkpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5Nb2RlbCA9PT0gdmFsdWUpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5maXJzdExvYWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLk1vZGVsID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25DaGFuZ2U6IGFueSA9ICgpID0+IHsgfTtcclxuICBwdWJsaWMgb25Ub3VjaGVkOiBhbnkgPSAoKSA9PiB7IH07XHJcblxyXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xyXG4gICAgaWYgKGlzRGlzYWJsZWQpIHtcclxuICAgICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmVsLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcclxuICAgIH1cclxuICAgIC8vIGRpc2FibGUgb3RoZXIgY29tcG9uZW50cyBoZXJlXHJcbiAgfVxyXG5cclxuICBzZXQgTW9kZWwodmFsdWU6IGFueSkge1xyXG4gICAgaWYgKHRoaXMub25seUVtaXR0ZXIpIHtcclxuICAgICAgdGhpcy5vdXRwdXQgPSBbXTtcclxuICAgICAgdGhpcy5vbkNoYW5nZSh2YWx1ZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBPdXRwdXRcclxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09IG51bGwpIHtcclxuICAgICAgdGhpcy5vdXRwdXQgPSBbXTtcclxuICAgICAgdGhpcy5jaGFuZ2VGdWxsTW9kZWwuZW1pdCh0aGlzLm91dHB1dCk7XHJcbiAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkgJiYgdGhpcy5tdWx0aXBsZSkge1xyXG4gICAgICB0aGlzLk91dHB1dCA9IHZhbHVlO1xyXG4gICAgfSBlbHNlIGlmICghKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpICYmICF0aGlzLm11bHRpcGxlKSB7XHJcbiAgICAgIHRoaXMuT3V0cHV0ID0gW3ZhbHVlXTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNb2RlbFxyXG4gICAgdGhpcy5fbW9kZWwgPSB2YWx1ZTtcclxuXHJcbiAgICAvLyBGb3Jtc1xyXG4gICAgdGhpcy5vbkNoYW5nZSh0aGlzLl9tb2RlbCk7XHJcbiAgfVxyXG5cclxuICBnZXQgTW9kZWwoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLl9tb2RlbDtcclxuICB9XHJcblxyXG4gIC8vIFBST1BFUlRZXHJcbiAgZ2V0IElucHV0SGlkZSgpOiBib29sZWFuIHtcclxuICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm91dHB1dC5sZW5ndGggPj0gdGhpcy5tdWx0aXBsZUxpbWl0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMub3V0cHV0Lmxlbmd0aCA9PT0gMSAmJiAhdGhpcy5pc09wZW47XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXQgVmFsdWVGcm9tT3V0cHV0KCk6IGFueSB7XHJcbiAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xyXG4gICAgICBsZXQgdG1wOiBBcnJheTxhbnk+ID0gW107XHJcbiAgICAgIGZvciAobGV0IG8gb2YgdGhpcy5vdXRwdXQpIHtcclxuICAgICAgICB0bXAucHVzaChmZXRjaEZyb21PYmplY3QobywgdGhpcy5tb2RlbFByb3BlcnR5KSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRtcDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmZXRjaEZyb21PYmplY3QodGhpcy5vdXRwdXRbMF0sIHRoaXMubW9kZWxQcm9wZXJ0eSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXQgT3V0cHV0KG5ld1ZhbHVlOiBBcnJheTxhbnk+KSB7XHJcbiAgICBsZXQgZGF0YUxpc3Q6IEFycmF5PGFueT4gPSBbXTtcclxuICAgIGlmICh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgZGF0YUxpc3QgPSB0aGlzLmRhdGFMaXN0O1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgaWYgKG5ld1ZhbHVlICYmIG5ld1ZhbHVlLmxlbmd0aCAmJiB0aGlzLmZpcnN0TG9hZCkge1xyXG4gICAgICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xyXG4gICAgICAgIHRoaXMuZmlyc3RMb2FkID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKCF0aGlzLnByZWxvYWRQcm9wZXJ0eSkge1xyXG4gICAgICAgICAgdGhpcy5vdXRwdXQgPSBuZXdWYWx1ZTtcclxuICAgICAgICAgIHRoaXMuY2hhbmdlRnVsbE1vZGVsLmVtaXQodGhpcy5vdXRwdXQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBwYXJhbXNbdGhpcy5wcmVsb2FkUHJvcGVydHldID0gbmV3VmFsdWUubWFwKHZhbCA9PiBmZXRjaEZyb21PYmplY3QodmFsLCB0aGlzLnByZWxvYWRGaWVsZCkpO1xyXG4gICAgICAgICAgdGhpcy5kYXRhTGlzdFN1YiA9ICg8T2JzZXJ2YWJsZTxJRGF0YVJlc3BvbnNlPj50aGlzLmRhdGFMaXN0KHBhcmFtcywgMSwgdGhpcy5jb3VudE9uUGFnZSkpLnN1YnNjcmliZShhbnN3ZXIgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm91dHB1dCA9IGFuc3dlci5saXN0O1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUZ1bGxNb2RlbC5lbWl0KHRoaXMub3V0cHV0KTtcclxuICAgICAgICAgIH0sICgpID0+IHsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuY2hhbmdlRnVsbE1vZGVsLmVtaXQodGhpcy5vdXRwdXQpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0aGlzLmRhdGFMaXN0ID09PSB1bmRlZmluZWQpIHsgcmV0dXJuOyB9XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignZGF0YUxpc3QgdmFsdWUgRXJyb3InKTtcclxuICAgIH1cclxuICAgIGxldCBuZXdPdXRwdXQ6IEFycmF5PGFueT4gPSBbXTtcclxuICAgIGZvciAobGV0IHYgb2YgbmV3VmFsdWUpIHtcclxuICAgICAgZm9yIChsZXQgZCBvZiBkYXRhTGlzdCkge1xyXG4gICAgICAgIGxldCBhID0gZmV0Y2hGcm9tT2JqZWN0KGQsIHRoaXMubW9kZWxQcm9wZXJ0eSkgPyBmZXRjaEZyb21PYmplY3QoZCwgdGhpcy5tb2RlbFByb3BlcnR5KS52YWx1ZU9mKCkgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgbGV0IGIgPSB2ID8gdi52YWx1ZU9mKCkgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYgKGRlZXBFcXVhbChhLCBiKSkge1xyXG4gICAgICAgICAgbmV3T3V0cHV0LnB1c2goZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLm91dHB1dCA9IG5ld091dHB1dDtcclxuICAgIHRoaXMuY2hhbmdlRnVsbE1vZGVsLmVtaXQodGhpcy5vdXRwdXQpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IE9wdGlvbnMoKTogQXJyYXk8YW55PiB7XHJcbiAgICBsZXQgb3B0aW9uczogQXJyYXk8YW55PjtcclxuICAgIGlmICh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcclxuICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgIGxldCBvbGRDYWNoZSA9IHRoaXMuR2V0Q2FjaGUodGhpcy5vbGRRdWVyeSk7XHJcblxyXG4gICAgICBpZiAoIXRoaXMuY3VycmVudENhY2hlICYmIG9sZENhY2hlKSB7XHJcbiAgICAgICAgb3B0aW9ucyA9IG9sZENhY2hlLm9iamVjdHM7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgb3B0aW9ucyA9IHRoaXMuY3VycmVudENhY2hlID8gdGhpcy5jdXJyZW50Q2FjaGUub2JqZWN0cyA6IFtdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKG9wdGlvbnMgfHwgW10pLmZpbHRlcihvcCA9PiB7XHJcbiAgICAgIHJldHVybiB0aGlzLm91dHB1dC5maW5kSW5kZXgobyA9PiB7XHJcbiAgICAgICAgbGV0IGEgPSBmZXRjaEZyb21PYmplY3QobywgdGhpcy5tb2RlbFByb3BlcnR5KSA/IGZldGNoRnJvbU9iamVjdChvLCB0aGlzLm1vZGVsUHJvcGVydHkpLnZhbHVlT2YoKSA6IHVuZGVmaW5lZDtcclxuICAgICAgICBsZXQgYiA9IGZldGNoRnJvbU9iamVjdChvcCwgdGhpcy5tb2RlbFByb3BlcnR5KSA/IGZldGNoRnJvbU9iamVjdChvcCwgdGhpcy5tb2RlbFByb3BlcnR5KS52YWx1ZU9mKCkgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgcmV0dXJuIGRlZXBFcXVhbChhLCBiKTtcclxuICAgICAgfSkgPT09IC0xO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY3VycmVudENhY2hlOiBDYWNoZUluZm87XHJcbiAgcHJpdmF0ZSBHZXRDYWNoZShxdWVyeTogc3RyaW5nKTogQ2FjaGVJbmZvIHtcclxuICAgIGlmICh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY2FjaGVMYXp5RGF0YS5maW5kKGNhY2hlID0+IHtcclxuICAgICAgICByZXR1cm4gY2FjaGUucXVlcnkgPT09IHRoaXMucXVlcnkgJiYgZGVlcEVxdWFsKGNhY2hlLnBhcmFtcywgdGhpcy5hZGRpdGlvbmFsRmlsdGVyKTtcclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICAvLyBDcmVhdGVOZXdcclxuXHJcbiAgcHVibGljIEFkZE5ld09iamVjdCh2YWx1ZTogT2JzZXJ2YWJsZTxhbnk+IHwgYW55KTogdm9pZCB7XHJcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSB7XHJcbiAgICAgIHZhbHVlLnN1YnNjcmliZShuZXdPYmplY3QgPT4ge1xyXG4gICAgICAgIGlmIChuZXdPYmplY3QgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgdGhpcy5TZXROZXdPYmplY3QobmV3T2JqZWN0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TZXROZXdPYmplY3QodmFsdWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBTZXROZXdPYmplY3QobmV3T2JqZWN0OiBhbnkpIHtcclxuICAgIGlmICh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgdGhpcy5kYXRhTGlzdC5wdXNoKG5ld09iamVjdCk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICBmb3IgKGxldCBjYWNoZSBvZiB0aGlzLmNhY2hlTGF6eURhdGEpIHtcclxuICAgICAgICBpZiAodGhpcy5xdWVyeS5pbmNsdWRlcyhjYWNoZS5xdWVyeSkgfHwgY2FjaGUucXVlcnkgPT09IHVuZGVmaW5lZCB8fCBjYWNoZS5xdWVyeSA9PT0gJycpIHtcclxuICAgICAgICAgIGNhY2hlLmNvdW50RWxlbWVudCsrO1xyXG4gICAgICAgICAgY2FjaGUub2JqZWN0cy5wdXNoKG5ld09iamVjdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5maXJzdExvYWQgPSBmYWxzZTtcclxuICAgIHRoaXMucXVlcnkgPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLmN1cnJlbnRDYWNoZSA9IHRoaXMuR2V0Q2FjaGUodGhpcy5xdWVyeSk7XHJcbiAgICB0aGlzLnNlbGVjdE9uZShuZXcgTW91c2VFdmVudCgnY2xpY2snKSwgbmV3T2JqZWN0KTtcclxuICB9XHJcblxyXG4gIGdldCBTaG93TmV3KCk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IGEgPSB0aGlzLnF1ZXJ5ICYmIHRoaXMubmV3TWVzc2FnZSAmJiAoIXRoaXMuZGF0YUxpc3RTdWIgfHwgdGhpcy5kYXRhTGlzdFN1Yi5jbG9zZWQpO1xyXG5cclxuICAgIGxldCBiID0gdGhpcy5PcHRpb25zLmZpbmRJbmRleChvID0+IHtcclxuICAgICAgbGV0IGMgPSBmZXRjaEZyb21PYmplY3QobywgdGhpcy52aWV3UHJvcGVydHkpID8gZmV0Y2hGcm9tT2JqZWN0KG8sIHRoaXMudmlld1Byb3BlcnR5KS52YWx1ZU9mKCkgOiB1bmRlZmluZWQ7XHJcbiAgICAgIHJldHVybiBkZWVwRXF1YWwoYywgdGhpcy5xdWVyeSk7XHJcbiAgICB9KSA9PT0gLTEgJiYgdGhpcy5vdXRwdXQuZmluZEluZGV4KG8gPT4ge1xyXG4gICAgICBsZXQgYyA9IGZldGNoRnJvbU9iamVjdChvLCB0aGlzLnZpZXdQcm9wZXJ0eSkgPyBmZXRjaEZyb21PYmplY3QobywgdGhpcy52aWV3UHJvcGVydHkpLnZhbHVlT2YoKSA6IHVuZGVmaW5lZDtcclxuICAgICAgcmV0dXJuIGRlZXBFcXVhbChjLCB0aGlzLnF1ZXJ5KTtcclxuICAgIH0pID09PSAtMTtcclxuXHJcbiAgICByZXR1cm4gYSAmJiBiO1xyXG4gIH1cclxuXHJcbiAgZ2V0IFNob3dFbXB0eSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLk9wdGlvbnMubGVuZ3RoID09PSAwICYmICghKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBGdW5jdGlvbikgfHwgKHRoaXMuZGF0YUxpc3RTdWIuY2xvc2VkKSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gQ0FDSEVcclxuICBwcml2YXRlIGNhY2hlTGF6eURhdGE6IEFycmF5PENhY2hlSW5mbz4gPSBbXTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDYWNoZUluZm8ge1xyXG4gIGNvdW50RWxlbWVudDogbnVtYmVyO1xyXG4gIGNvdW50UGFnZXM6IG51bWJlcjtcclxuICBjdXJyZW50UGFnZTogbnVtYmVyO1xyXG4gIG9iamVjdHM6IEFycmF5PGFueT47XHJcblxyXG4gIHF1ZXJ5OiBzdHJpbmc7XHJcbiAgcGFyYW1zOiBhbnk7XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgTmdWaWJvckNvbXBvbmVudCB9IGZyb20gJy4vbmctdmlib3IuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVmlib3JCb3RoRGlyZWN0aXZlLCBWaWJvckNyZWF0ZURpcmVjdGl2ZSwgVmlib3JEcm9wZG93bkRpcmVjdGl2ZSwgVmlib3JTZWxlY3RlZERpcmVjdGl2ZSB9IGZyb20gJy4vbmctdmlib3ItdGVtcGxhdGUuZGlyZWN0aXZlJztcclxuY29uc3QgY29tcG9uZW50cyA9IFtOZ1ZpYm9yQ29tcG9uZW50LCBWaWJvckJvdGhEaXJlY3RpdmUsIFZpYm9yQ3JlYXRlRGlyZWN0aXZlLCBWaWJvckRyb3Bkb3duRGlyZWN0aXZlLCBWaWJvclNlbGVjdGVkRGlyZWN0aXZlXVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBGb3Jtc01vZHVsZSwgQ29tbW9uTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIC4uLmNvbXBvbmVudHNcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIC4uLmNvbXBvbmVudHMsIEZvcm1zTW9kdWxlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdWaWJvck1vZHVsZSB7IH1cclxuIl0sIm5hbWVzIjpbIkluamVjdGFibGUiLCJEaXJlY3RpdmUiLCJUZW1wbGF0ZVJlZiIsIkV2ZW50RW1pdHRlciIsInRzbGliXzEuX192YWx1ZXMiLCJPYnNlcnZhYmxlIiwiQ29tcG9uZW50IiwiVmlld0VuY2Fwc3VsYXRpb24iLCJOR19WQUxVRV9BQ0NFU1NPUiIsImZvcndhcmRSZWYiLCJFbGVtZW50UmVmIiwiVmlld0NoaWxkIiwiSW5wdXQiLCJDb250ZW50Q2hpbGQiLCJPdXRwdXQiLCJOZ01vZHVsZSIsIkZvcm1zTW9kdWxlIiwiQ29tbW9uTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7UUFNRTtTQUFpQjs7b0JBSmxCQSxhQUFVLFNBQUM7d0JBQ1YsVUFBVSxFQUFFLE1BQU07cUJBQ25COzs7Ozs2QkFKRDs7O0lDQUE7Ozs7Ozs7Ozs7Ozs7O0FBY0Esc0JBNEZ5QixDQUFDO1FBQ3RCLElBQUksQ0FBQyxHQUFHLE9BQU8sTUFBTSxLQUFLLFVBQVUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDO1lBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNO29CQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztnQkFDbkMsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7YUFDM0M7U0FDSixDQUFDO0lBQ04sQ0FBQztBQUVELG9CQUF1QixDQUFDLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxPQUFPLE1BQU0sS0FBSyxVQUFVLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsQ0FBQztZQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFF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