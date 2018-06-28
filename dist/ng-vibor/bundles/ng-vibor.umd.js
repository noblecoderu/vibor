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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ViborDropdownDirective = (function () {
        function ViborDropdownDirective(templateRef) {
            this.templateRef = templateRef;
        }
        ViborDropdownDirective.decorators = [
            { type: i0.Directive, args: [{ selector: '[viborDropdownElement]' },] },
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
            { type: i0.Directive, args: [{ selector: '[viborSelectedElement]' },] },
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
            { type: i0.Directive, args: [{ selector: '[viborBothElement]' },] },
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
            { type: i0.Directive, args: [{ selector: '[viborCreate]' },] },
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
                this.el = this.elementRef.nativeElement.getElementsByClassName('root-vibor').item(0);
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
                if (inputs['multiple']) {
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
                        template: "<div class=\"root-vibor\">\n  <ng-content></ng-content>\n\n  <div class=\"select-search\" (click)=\"showDropdownList($event);\">\n    <ul class=\"select-search-list\">\n      <ng-container *ngIf=\"multiple || !isOpen\">\n        <ng-container *ngIf=\"!SelectedTemplate; else selectedT\">\n          <li class=\"select-search-list-item select-search-list-item_selection\" *ngFor=\"let item of output; let $index=index; let $last=last; trackBy: TrackByFn;\">\n            <div [innerHTML]=\"getListFormatted(item)\"></div>\n            <a class=\"select-search-list-item_remove\" *ngIf=\"allowReset\" (click)=\"!disabled && removeOne($index, $event)\"></a>\n          </li>\n        </ng-container>\n\n        <ng-template #selectedT>\n          <li class=\"select-search-list-item select-search-list-item_selection\" *ngFor=\"let item of output; let $index=index; let $last=last; trackBy: TrackByFn;\">\n            <ng-container *ngTemplateOutlet=\"SelectedTemplate; context: {item: item}\"></ng-container>\n            <a class=\"select-search-list-item_remove\" *ngIf=\"allowReset && !disabled\" (click)=\"!disabled && removeOne($index, $event)\">\n            </a>\n          </li>\n        </ng-template>\n      </ng-container>\n\n      <li class=\"select-search-list-item select-search-list-item_input\" [class.select-search-list-item_hide]=\"InputHide\">\n        <input autocomplete=\"off\" #inputControl=\"ngModel\" [name]=\"name\" [disabled]=\"disabled\" [(ngModel)]=\"query\" [placeholder]=\"output.length == 0 || (multiple && output.length < multipleLimit) ? placeholder : ''\"\n          (input)=\"updateOptionsInDelay()\" (blur)=\"hideDropdownListWithDelay()\" (keydown)=\"keyDown($event)\" />\n      </li>\n      <li class=\"select-search-list-item select-search-list-item_loader-center\" [hidden]=\"!dataListSub || dataListSub.closed\">\n        <div class=\"select-search-list-item_loader\"></div>\n      </li>\n\n      <span class=\"arrow\" (click)=\"toggleDropdown($event)\">\n      </span>\n    </ul>\n  </div>\n\n  <div class=\"select-dropdown\" *ngIf=\"isOpen\">\n    <ul class=\"select-dropdown-optgroup\">\n      <ng-container *ngIf=\"!DropdownTemplate; else dropdownT\">\n        <li class=\"select-dropdown-optgroup-option\" *ngFor=\"let option of Options; let i=index\" (mousedown)=\"selectOne($event, option)\"\n          [class.active]=\"i === selectorPosition\" [innerHTML]=\"getDropdownFormatted(option)\">\n        </li>\n      </ng-container>\n\n      <ng-template #dropdownT>\n        <li class=\"select-dropdown-optgroup-option\" *ngFor=\"let option of Options; let i=index\" (mousedown)=\"selectOne($event, option)\"\n          [class.active]=\"i === selectorPosition\">\n          <ng-container *ngTemplateOutlet=\"DropdownTemplate; context: {item: option}\"></ng-container>\n        </li>\n      </ng-template>\n\n      <li class=\"select-dropdown-optgroup-option loader\" *ngIf=\"dataListSub && !dataListSub.closed\">\n        \u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430\n      </li>\n      <li class=\"select-dropdown-optgroup-option loader\" (mousedown)=\"AddNewObject(CreateNew(query));\" [class.active]=\"selectorPosition === Options.length\"\n        *ngIf=\"ShowNew\">\n\n        <ng-container *ngIf=\"createTemplate; else templateWithMessage\">\n          <ng-container *ngTemplateOutlet=\"createTemplate.templateRef; context: {query: query}\"></ng-container>\n        </ng-container>\n\n        <ng-template #templateWithMessage>\n          {{ newMessage }}\n        </ng-template>\n      </li>\n      <li class=\"select-dropdown-optgroup-option loader\" *ngIf=\"ShowEmpty\">\n        \u041F\u0443\u0441\u0442\u043E\n      </li>\n    </ul>\n    <div class=\"select-dropdown-pager\" *ngIf=\"currentCache && currentCache.countPages > 1\">\n      <p class=\"select-dropdown-pager-page\">\n        {{ currentCache.currentPage | number }} / {{ currentCache.countPages | number }}\n      </p>\n      <button class=\"select-dropdown-pager-loadmore\" *ngIf=\"currentCache.countPages > 1 && currentCache.currentPage < currentCache.countPages\"\n        (mousedown)=\"nextPage($event)\">\n        \u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0435\u0449\u0451\n      </button>\n    </div>\n  </div>\n</div>\n",
                        styles: [".root-vibor{position:relative;display:block;font-family:-apple-system,BlinkMacSystemFont, \"Segoe UI\",Roboto,Helvetica,Arial,sans-serif, \"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\"}.root-vibor:not(.multiple) .select-search-list-item_selection{padding-right:70px}.root-vibor.multiple .select-search-list-item_remove{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+CiAgPHBhdGggZmlsbD0iIzhlNDRhZCIgZD0iTTEwLjEgNC41TDggNi42IDUuOSA0LjUgNC41IDUuOSA2LjYgOGwtMi4xIDIuMSAxLjQgMS40TDggOS40bDIuMSAyLjEgMS40LTEuNEw5LjQgOGwyLjEtMi4xeiIvPgo8L3N2Zz4K);background-color:transparent}.root-vibor .select-dropdown{position:absolute;top:100%;left:0;right:0;z-index:2;background:#fff}.root-vibor .select-search{position:relative}.root-vibor .select-search .arrow{content:\"\";position:absolute;right:13px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);display:block;width:16px;height:16px;background-image:url(data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ibmMtaWNvbiBnbHlwaCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiI+DQogIDxwYXRoIGZpbGw9IiMyYzJjMmMiIGQ9Ik04IDExLjRMMi42IDYgNCA0LjZsNCA0IDQtNEwxMy40IDYiLz4NCjwvc3ZnPg0K);transition:-webkit-transform .15s ease-in-out;transition:transform .15s ease-in-out;transition:transform .15s ease-in-out,-webkit-transform .15s ease-in-out}.root-vibor .select-search .arrow:before{display:none}.root-vibor .select-search-list-item_input input{background:0 0}.root-vibor .select-search-list-item_input input::-webkit-input-placeholder{color:rgba(56,61,65,.3)}.root-vibor .select-search-list-item_input input::-moz-placeholder{color:rgba(56,61,65,.3)}.root-vibor .select-search-list-item_input input:-moz-placeholder{color:rgba(56,61,65,.3)}.root-vibor .select-search-list-item_input input:-ms-input-placeholder{color:rgba(56,61,65,.3)}.root-vibor .select-search-list-item_loader-center[hidden]{display:none!important}.root-vibor .select-search-list-item_loader-center{position:absolute;right:10px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);display:flex;align-items:center;justify-content:center;width:21px;height:21px;background:#fff;z-index:2}.root-vibor .select-search-list-item_loader-center .select-search-list-item_loader{width:16px;height:16px;box-sizing:border-box;border-width:2px;border-style:solid;border-color:#22272e rgba(34,39,46,.4) rgba(34,39,46,.4);border-radius:100%;-webkit-animation:.45s linear infinite clockwise;animation:.45s linear infinite clockwise}.root-vibor .select-search-list-item_hide{display:none}.root-vibor .select-dropdown .select-dropdown-optgroup-option:hover{background-color:rgba(66,132,215,.1)}.root-vibor .select-search-list-item_remove{position:absolute;top:50%;right:35px;-webkit-transform:translateY(-50%);transform:translateY(-50%);display:block;width:20px;height:20px;border-radius:50%;background-color:rgba(44,44,44,.1);background-image:url(data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ibmMtaWNvbiBnbHlwaCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCAxNiAxNiI+PGc+Cjxwb2x5Z29uIGZpbGw9IiMwZjBmMGYiIHBvaW50cz0iMTAuMSw0LjUgOCw2LjYgNS45LDQuNSA0LjUsNS45IDYuNiw4IDQuNSwxMC4xIDUuOSwxMS41IDgsOS40IDEwLjEsMTEuNSAxMS41LDEwLjEgOS40LDggMTEuNSw1LjkgCgkiPjwvcG9seWdvbj4KPC9nPjwvc3ZnPg==);background-repeat:no-repeat;background-position:center;color:transparent}.root-vibor.disabled .select-search-list-item_remove,.root-vibor[disabled] .select-search-list-item_remove{display:none}.root-vibor[class*='_size'][class*='-s'] .select-search .b-vibor__value,.root-vibor[class*='_size'][class*='-s'] .select-search-list-item_input input,.root-vibor[class*='_size'][class*='-s'] .select-search-list-item_selection{height:40px}.root-vibor[class*='_size'][class*='-m'] .select-search .b-vibor__value,.root-vibor[class*='_size'][class*='-m'] .select-search-list-item_input input,.root-vibor[class*='_size'][class*='-m'] .select-search-list-item_selection{height:50px}.root-vibor[class*='_size'][class*='-l'] .select-search .b-vibor__value,.root-vibor[class*='_size'][class*='-l'] .select-search-list-item_input input,.root-vibor[class*='_size'][class*='-l'] .select-search-list-item_selection{height:60px}@-webkit-keyframes clockwise{to{-webkit-transform:rotate(360deg) translatez(0);transform:rotate(360deg) translatez(0)}}@keyframes clockwise{to{-webkit-transform:rotate(360deg) translatez(0);transform:rotate(360deg) translatez(0)}}.root-vibor .select-dropdown .b-vibor__value{display:flex;flex-direction:column}.root-vibor .select-dropdown .b-vibor__value__text{color:#383d41}.root-vibor .select-dropdown .b-vibor__value-descr_small{color:#8b8b83}.root-vibor .select-dropdown .b-vibor__value__text+.b-vibor__value-descr{margin-top:4px}.root-vibor .select-dropdown-pager{padding:10px;text-align:center;border-top:1px solid #e5e5e7}.root-vibor .select-dropdown-pager .select-dropdown-pager-page{color:#8b8b83}.root-vibor .select-dropdown-pager .select-dropdown-pager-loadmore{color:#4284d7;border-bottom:1px solid rgba(66,132,215,.3)}.root-vibor .select-dropdown-pager .select-dropdown-pager-page+.select-dropdown-pager-loadmore{margin-top:5px}.root-vibor .select-dropdown-optgroup{max-height:300px;overflow-y:auto}"],
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
    var NgViborModule = (function () {
        function NgViborModule() {
        }
        NgViborModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            forms.FormsModule, common.CommonModule
                        ],
                        declarations: [
                            NgViborComponent,
                            ViborBothDirective, ViborCreateDirective, ViborDropdownDirective, ViborSelectedDirective
                        ],
                        exports: [
                            NgViborComponent, forms.FormsModule
                        ]
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctdmlib3IudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZy12aWJvci9saWIvbmctdmlib3Iuc2VydmljZS50cyIsbnVsbCwibmc6Ly9uZy12aWJvci9saWIvbmctdmlib3ItdGVtcGxhdGUuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy12aWJvci9saWIvaGVscGVycy50cyIsIm5nOi8vbmctdmlib3IvbGliL25nLXZpYm9yLmNvbXBvbmVudC50cyIsIm5nOi8vbmctdmlib3IvbGliL25nLXZpYm9yLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ1ZpYm9yU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxufVxyXG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1t2aWJvckRyb3Bkb3duRWxlbWVudF0nIH0pXHJcbmV4cG9ydCBjbGFzcyBWaWJvckRyb3Bkb3duRGlyZWN0aXZlIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cclxufVxyXG5cclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3ZpYm9yU2VsZWN0ZWRFbGVtZW50XScgfSlcclxuZXhwb3J0IGNsYXNzIFZpYm9yU2VsZWN0ZWREaXJlY3RpdmUge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxyXG59XHJcblxyXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbdmlib3JCb3RoRWxlbWVudF0nIH0pXHJcbmV4cG9ydCBjbGFzcyBWaWJvckJvdGhEaXJlY3RpdmUge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxyXG59XHJcblxyXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbdmlib3JDcmVhdGVdJyB9KVxyXG5leHBvcnQgY2xhc3MgVmlib3JDcmVhdGVEaXJlY3RpdmUge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxyXG59XHJcbiIsImV4cG9ydCBpbnRlcmZhY2UgSURhdGFSZXNwb25zZSB7XHJcbiAgZGF0YTogT2JqZWN0O1xyXG4gIGxpc3Q6IEFycmF5PE9iamVjdD47XHJcbiAgaGVhZGVyczogYW55O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmV0Y2hGcm9tT2JqZWN0KG9iamVjdDogYW55LCBwcm9wOiBzdHJpbmcpOiBhbnkge1xyXG4gIGlmIChvYmplY3QgPT09IHVuZGVmaW5lZCB8fCBwcm9wID09PSB1bmRlZmluZWQpIHtcclxuICAgIHJldHVybiBvYmplY3Q7XHJcbiAgfVxyXG5cclxuICBjb25zdCBpbmRleDogbnVtYmVyID0gcHJvcC5pbmRleE9mKCcuJyk7XHJcbiAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgIHJldHVybiBmZXRjaEZyb21PYmplY3Qob2JqZWN0W3Byb3Auc3Vic3RyaW5nKDAsIGluZGV4KV0sIHByb3Auc3Vic3RyKGluZGV4ICsgMSkpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG9iamVjdFtwcm9wXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRGb3JtYXR0ZXIoZGF0YTogYW55LCB2YWx1ZVByb3BlcnR5TmFtZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICBsZXQgaHRtbCA9ICcnO1xyXG4gIGh0bWwgKz0gZmV0Y2hGcm9tT2JqZWN0KGRhdGEsIHZhbHVlUHJvcGVydHlOYW1lKSA/IGA8Yj4ke2ZldGNoRnJvbU9iamVjdChkYXRhLCB2YWx1ZVByb3BlcnR5TmFtZSl9PC9iPmAgOiAnJztcclxuICByZXR1cm4gaHRtbDtcclxufVxyXG5cclxuXHJcbi8vIFVzZWQgZm9yIG1hdGNoaW5nIG51bWJlcnNcclxuY29uc3QgY29yZV9wbnVtOiBzdHJpbmcgPSAvWystXT8oPzpcXGQqXFwufClcXGQrKD86W2VFXVsrLV0/XFxkK3wpLy5zb3VyY2U7XHJcbmNvbnN0IHJudW1ub25weDogUmVnRXhwID0gbmV3IFJlZ0V4cCgnXignICsgY29yZV9wbnVtICsgJykoPyFweClbYS16JV0rJCcsICdpJyk7XHJcblxyXG5mdW5jdGlvbiBhdWdtZW50V2lkdGhPckhlaWdodChuYW1lOiBzdHJpbmcsIGV4dHJhOiBhbnksIGlzQm9yZGVyQm94OiBhbnksIHN0eWxlczogYW55KTogbnVtYmVyIHtcclxuICBsZXQgaTogbnVtYmVyID0gZXh0cmEgPT09IChpc0JvcmRlckJveCA/ICdib3JkZXInIDogJ2NvbnRlbnQnKSA/XHJcbiAgICAvLyBJZiB3ZSBhbHJlYWR5IGhhdmUgdGhlIHJpZ2h0IG1lYXN1cmVtZW50LCBhdm9pZCBhdWdtZW50YXRpb25cclxuICAgIDQgOlxyXG4gICAgLy8gT3RoZXJ3aXNlIGluaXRpYWxpemUgZm9yIGhvcml6b250YWwgb3IgdmVydGljYWwgcHJvcGVydGllc1xyXG4gICAgbmFtZSA9PT0gJ3dpZHRoJyA/IDEgOiAwLFxyXG5cclxuICAgIHZhbCA9IDA7XHJcbiAgY29uc3QgY3NzRXhwYW5kOiBzdHJpbmdbXSA9IFsnVG9wJywgJ1JpZ2h0JywgJ0JvdHRvbScsICdMZWZ0J107XHJcblxyXG4gIC8vIFRPRE8gVXNlIGFuZ3VsYXIuZWxlbWVudC5jc3MgaW5zdGVhZCBvZiBnZXRTdHlsZVZhbHVlIGFmdGVyXHJcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2NhaXRwL2FuZ3VsYXIuanMvY29tbWl0LzkyYmJiNWUyMjUyNTNlYmRkZDM4ZWY1NzM1ZDY2ZmZlZjc2YjZhMTQgd2lsbCBiZSBhcHBsaWVkXHJcbiAgZnVuY3Rpb24gZ2V0U3R5bGVWYWx1ZShfbmFtZTogYW55KTogbnVtYmVyIHtcclxuICAgIHJldHVybiBwYXJzZUZsb2F0KHN0eWxlc1tfbmFtZV0pO1xyXG4gIH1cclxuXHJcbiAgZm9yICg7IGkgPCA0OyBpICs9IDIpIHtcclxuICAgIC8vIGJvdGggYm94IG1vZGVscyBleGNsdWRlIG1hcmdpbiwgc28gYWRkIGl0IGlmIHdlIHdhbnQgaXRcclxuICAgIGlmIChleHRyYSA9PT0gJ21hcmdpbicpIHtcclxuICAgICAgdmFsICs9IGdldFN0eWxlVmFsdWUoZXh0cmEgKyBjc3NFeHBhbmRbaV0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpc0JvcmRlckJveCkge1xyXG4gICAgICAvLyBib3JkZXItYm94IGluY2x1ZGVzIHBhZGRpbmcsIHNvIHJlbW92ZSBpdCBpZiB3ZSB3YW50IGNvbnRlbnRcclxuICAgICAgaWYgKGV4dHJhID09PSAnY29udGVudCcpIHtcclxuICAgICAgICB2YWwgLT0gZ2V0U3R5bGVWYWx1ZSgncGFkZGluZycgKyBjc3NFeHBhbmRbaV0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBhdCB0aGlzIHBvaW50LCBleHRyYSBpc24ndCBib3JkZXIgbm9yIG1hcmdpbiwgc28gcmVtb3ZlIGJvcmRlclxyXG4gICAgICBpZiAoZXh0cmEgIT09ICdtYXJnaW4nKSB7XHJcbiAgICAgICAgdmFsIC09IGdldFN0eWxlVmFsdWUoJ2JvcmRlcicgKyBjc3NFeHBhbmRbaV0gKyAnV2lkdGgnKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFsICs9IGdldFN0eWxlVmFsdWUoJ3BhZGRpbmcnICsgY3NzRXhwYW5kW2ldKTtcclxuXHJcbiAgICAgIC8vIGF0IHRoaXMgcG9pbnQsIGV4dHJhIGlzbid0IGNvbnRlbnQgbm9yIHBhZGRpbmcsIHNvIGFkZCBib3JkZXJcclxuICAgICAgaWYgKGV4dHJhICE9PSAncGFkZGluZycpIHtcclxuICAgICAgICB2YWwgKz0gZ2V0U3R5bGVWYWx1ZSgnYm9yZGVyJyArIGNzc0V4cGFuZFtpXSArICdXaWR0aCcpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdmFsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRXaW5kb3coZWxlbTogYW55KTogYW55IHtcclxuICByZXR1cm4gZWxlbSAhPSBudWxsICYmIGVsZW0gPT09IGVsZW0ud2luZG93ID8gZWxlbSA6IGVsZW0ubm9kZVR5cGUgPT09IDkgJiYgZWxlbS5kZWZhdWx0VmlldztcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0T2Zmc2V0KGVsZW06IGFueSk6IGFueSB7XHJcbiAgbGV0IGRvY0VsZW06IGFueSwgd2luOiBhbnk7XHJcbiAgY29uc3QgYm94OiBhbnkgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gIGNvbnN0IGRvYzogYW55ID0gZWxlbSAmJiBlbGVtLm93bmVyRG9jdW1lbnQ7XHJcblxyXG4gIGlmICghZG9jKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBkb2NFbGVtID0gZG9jLmRvY3VtZW50RWxlbWVudDtcclxuICB3aW4gPSBnZXRXaW5kb3coZG9jKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHRvcDogYm94LnRvcCArIHdpbi5wYWdlWU9mZnNldCAtIGRvY0VsZW0uY2xpZW50VG9wLFxyXG4gICAgbGVmdDogYm94LmxlZnQgKyB3aW4ucGFnZVhPZmZzZXQgLSBkb2NFbGVtLmNsaWVudExlZnRcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2Nyb2xsQWN0aXZlT3B0aW9uKGxpc3Q6IEhUTUxFbGVtZW50LCBpdGVtOiBIVE1MRWxlbWVudCk6IHZvaWQge1xyXG4gIGxldCB5OiBhbnksIGhlaWdodF9tZW51OiBhbnksIGhlaWdodF9pdGVtOiBhbnksIHNjcm9sbDogYW55LCBzY3JvbGxfdG9wOiBhbnksIHNjcm9sbF9ib3R0b206IGFueTtcclxuXHJcbiAgaWYgKGl0ZW0pIHtcclxuICAgIGhlaWdodF9tZW51ID0gbGlzdC5vZmZzZXRIZWlnaHQ7XHJcbiAgICBoZWlnaHRfaXRlbSA9IGdldFdpZHRoT3JIZWlnaHQoaXRlbSwgJ2hlaWdodCcsICdtYXJnaW4nKTsgLy8gb3V0ZXJIZWlnaHQodHJ1ZSk7XHJcbiAgICBzY3JvbGwgPSBsaXN0LnNjcm9sbFRvcCB8fCAwO1xyXG4gICAgeSA9IGdldE9mZnNldChpdGVtKS50b3AgLSBnZXRPZmZzZXQobGlzdCkudG9wICsgc2Nyb2xsO1xyXG4gICAgc2Nyb2xsX3RvcCA9IHk7XHJcbiAgICBzY3JvbGxfYm90dG9tID0geSAtIGhlaWdodF9tZW51ICsgaGVpZ2h0X2l0ZW07XHJcblxyXG4gICAgLy8gVE9ETyBNYWtlIGFuaW1hdGlvblxyXG4gICAgaWYgKHkgKyBoZWlnaHRfaXRlbSA+IGhlaWdodF9tZW51ICsgc2Nyb2xsKSB7XHJcbiAgICAgIGxpc3Quc2Nyb2xsVG9wID0gc2Nyb2xsX2JvdHRvbTtcclxuICAgIH0gZWxzZSBpZiAoeSA8IHNjcm9sbCkge1xyXG4gICAgICBsaXN0LnNjcm9sbFRvcCA9IHNjcm9sbF90b3A7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRXaWR0aE9ySGVpZ2h0KGVsZW06IGFueSwgbmFtZTogYW55LCBleHRyYTogYW55KTogYW55IHtcclxuXHJcbiAgLy8gU3RhcnQgd2l0aCBvZmZzZXQgcHJvcGVydHksIHdoaWNoIGlzIGVxdWl2YWxlbnQgdG8gdGhlIGJvcmRlci1ib3ggdmFsdWVcclxuICBjb25zdCB2YWx1ZUlzQm9yZGVyQm94ID0gdHJ1ZTtcclxuICBsZXQgdmFsOiBhbnkgPSBuYW1lID09PSAnd2lkdGgnID8gZWxlbS5vZmZzZXRXaWR0aCA6IGVsZW0ub2Zmc2V0SGVpZ2h0O1xyXG4gIGNvbnN0IHN0eWxlczogYW55ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbSwgbnVsbCk7XHJcbiAgY29uc3QgaXNCb3JkZXJCb3ggPSBmYWxzZTsgLy8galF1ZXJ5LnN1cHBvcnQuYm94U2l6aW5nICYmIGpRdWVyeS5jc3MoIGVsZW0sICdib3hTaXppbmcnLCBmYWxzZSwgc3R5bGVzICkgPT09ICdib3JkZXItYm94JztcclxuXHJcbiAgLy8gc29tZSBub24taHRtbCBlbGVtZW50cyByZXR1cm4gdW5kZWZpbmVkIGZvciBvZmZzZXRXaWR0aCwgc28gY2hlY2sgZm9yIG51bGwvdW5kZWZpbmVkXHJcbiAgLy8gc3ZnIC0gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NjQ5Mjg1XHJcbiAgLy8gTWF0aE1MIC0gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NDkxNjY4XHJcbiAgaWYgKHZhbCA8PSAwIHx8IHZhbCA9PSBudWxsKSB7XHJcbiAgICAvLyBGYWxsIGJhY2sgdG8gY29tcHV0ZWQgdGhlbiB1bmNvbXB1dGVkIGNzcyBpZiBuZWNlc3NhcnlcclxuICAgIHZhbCA9IHN0eWxlc1tuYW1lXTtcclxuXHJcbiAgICBpZiAodmFsIDwgMCB8fCB2YWwgPT0gbnVsbCkge1xyXG4gICAgICB2YWwgPSBlbGVtLnN0eWxlW25hbWVdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENvbXB1dGVkIHVuaXQgaXMgbm90IHBpeGVscy4gU3RvcCBoZXJlIGFuZCByZXR1cm4uXHJcbiAgICBpZiAocm51bW5vbnB4LnRlc3QodmFsKSkge1xyXG4gICAgICByZXR1cm4gdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHdlIG5lZWQgdGhlIGNoZWNrIGZvciBzdHlsZSBpbiBjYXNlIGEgYnJvd3NlciB3aGljaCByZXR1cm5zIHVucmVsaWFibGUgdmFsdWVzXHJcbiAgICAvLyBmb3IgZ2V0Q29tcHV0ZWRTdHlsZSBzaWxlbnRseSBmYWxscyBiYWNrIHRvIHRoZSByZWxpYWJsZSBlbGVtLnN0eWxlXHJcbiAgICAvLyB2YWx1ZUlzQm9yZGVyQm94ID0gaXNCb3JkZXJCb3ggJiYgKCBqUXVlcnkuc3VwcG9ydC5ib3hTaXppbmdSZWxpYWJsZSB8fCB2YWwgPT09IGVsZW0uc3R5bGVbIG5hbWUgXSApO1xyXG5cclxuICAgIC8vIE5vcm1hbGl6ZSAnJywgYXV0bywgYW5kIHByZXBhcmUgZm9yIGV4dHJhXHJcbiAgICB2YWwgPSBwYXJzZUZsb2F0KHZhbCkgfHwgMDtcclxuICB9XHJcblxyXG4gIC8vIHVzZSB0aGUgYWN0aXZlIGJveC1zaXppbmcgbW9kZWwgdG8gYWRkL3N1YnRyYWN0IGlycmVsZXZhbnQgc3R5bGVzXHJcbiAgcmV0dXJuIHZhbCArIGF1Z21lbnRXaWR0aE9ySGVpZ2h0KG5hbWUsIGV4dHJhIHx8IChpc0JvcmRlckJveCA/ICdib3JkZXInIDogJ2NvbnRlbnQnKSwgdmFsdWVJc0JvcmRlckJveCwgc3R5bGVzKTtcclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCwgT25Jbml0LCBPbkNoYW5nZXMsXHJcbiAgSW5wdXQsIE91dHB1dCwgZm9yd2FyZFJlZixcclxuICBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYsXHJcbiAgVGVtcGxhdGVSZWYsIENvbnRlbnRDaGlsZCwgVmlld0NoaWxkLFxyXG4gIFNpbXBsZUNoYW5nZXNcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBDb250cm9sVmFsdWVBY2Nlc3NvcixcclxuICBOR19WQUxVRV9BQ0NFU1NPUixcclxuICBOZ01vZGVsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgVmlib3JCb3RoRGlyZWN0aXZlLFxyXG4gICAgVmlib3JDcmVhdGVEaXJlY3RpdmUsXHJcbiAgICBWaWJvckRyb3Bkb3duRGlyZWN0aXZlLFxyXG4gICAgVmlib3JTZWxlY3RlZERpcmVjdGl2ZVxyXG59IGZyb20gJy4vbmctdmlib3ItdGVtcGxhdGUuZGlyZWN0aXZlJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBJRGF0YVJlc3BvbnNlLFxyXG4gICAgZGVmYXVsdEZvcm1hdHRlcixcclxuICAgIGZldGNoRnJvbU9iamVjdCxcclxuICAgIHNjcm9sbEFjdGl2ZU9wdGlvblxyXG59IGZyb20gJy4vaGVscGVycyc7XHJcblxyXG5jb25zdCBkZWVwRXF1YWwgPSByZXF1aXJlKCdkZWVwLWVxdWFsJyk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LXNlbGVjdG9yXHJcbiAgc2VsZWN0b3I6ICd2aWJvcicsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwicm9vdC12aWJvclwiPlxyXG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuXHJcbiAgPGRpdiBjbGFzcz1cInNlbGVjdC1zZWFyY2hcIiAoY2xpY2spPVwic2hvd0Ryb3Bkb3duTGlzdCgkZXZlbnQpO1wiPlxyXG4gICAgPHVsIGNsYXNzPVwic2VsZWN0LXNlYXJjaC1saXN0XCI+XHJcbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJtdWx0aXBsZSB8fCAhaXNPcGVuXCI+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFTZWxlY3RlZFRlbXBsYXRlOyBlbHNlIHNlbGVjdGVkVFwiPlxyXG4gICAgICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LXNlYXJjaC1saXN0LWl0ZW0gc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fc2VsZWN0aW9uXCIgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygb3V0cHV0OyBsZXQgJGluZGV4PWluZGV4OyBsZXQgJGxhc3Q9bGFzdDsgdHJhY2tCeTogVHJhY2tCeUZuO1wiPlxyXG4gICAgICAgICAgICA8ZGl2IFtpbm5lckhUTUxdPVwiZ2V0TGlzdEZvcm1hdHRlZChpdGVtKVwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8YSBjbGFzcz1cInNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX3JlbW92ZVwiICpuZ0lmPVwiYWxsb3dSZXNldFwiIChjbGljayk9XCIhZGlzYWJsZWQgJiYgcmVtb3ZlT25lKCRpbmRleCwgJGV2ZW50KVwiPjwvYT5cclxuICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcblxyXG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjc2VsZWN0ZWRUPlxyXG4gICAgICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LXNlYXJjaC1saXN0LWl0ZW0gc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fc2VsZWN0aW9uXCIgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygb3V0cHV0OyBsZXQgJGluZGV4PWluZGV4OyBsZXQgJGxhc3Q9bGFzdDsgdHJhY2tCeTogVHJhY2tCeUZuO1wiPlxyXG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiU2VsZWN0ZWRUZW1wbGF0ZTsgY29udGV4dDoge2l0ZW06IGl0ZW19XCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgIDxhIGNsYXNzPVwic2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fcmVtb3ZlXCIgKm5nSWY9XCJhbGxvd1Jlc2V0ICYmICFkaXNhYmxlZFwiIChjbGljayk9XCIhZGlzYWJsZWQgJiYgcmVtb3ZlT25lKCRpbmRleCwgJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICA8L2xpPlxyXG4gICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG5cclxuICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LXNlYXJjaC1saXN0LWl0ZW0gc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faW5wdXRcIiBbY2xhc3Muc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faGlkZV09XCJJbnB1dEhpZGVcIj5cclxuICAgICAgICA8aW5wdXQgYXV0b2NvbXBsZXRlPVwib2ZmXCIgI2lucHV0Q29udHJvbD1cIm5nTW9kZWxcIiBbbmFtZV09XCJuYW1lXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgWyhuZ01vZGVsKV09XCJxdWVyeVwiIFtwbGFjZWhvbGRlcl09XCJvdXRwdXQubGVuZ3RoID09IDAgfHwgKG11bHRpcGxlICYmIG91dHB1dC5sZW5ndGggPCBtdWx0aXBsZUxpbWl0KSA/IHBsYWNlaG9sZGVyIDogJydcIlxyXG4gICAgICAgICAgKGlucHV0KT1cInVwZGF0ZU9wdGlvbnNJbkRlbGF5KClcIiAoYmx1cik9XCJoaWRlRHJvcGRvd25MaXN0V2l0aERlbGF5KClcIiAoa2V5ZG93bik9XCJrZXlEb3duKCRldmVudClcIiAvPlxyXG4gICAgICA8L2xpPlxyXG4gICAgICA8bGkgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbSBzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9sb2FkZXItY2VudGVyXCIgW2hpZGRlbl09XCIhZGF0YUxpc3RTdWIgfHwgZGF0YUxpc3RTdWIuY2xvc2VkXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2xvYWRlclwiPjwvZGl2PlxyXG4gICAgICA8L2xpPlxyXG5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJhcnJvd1wiIChjbGljayk9XCJ0b2dnbGVEcm9wZG93bigkZXZlbnQpXCI+XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgIDwvdWw+XHJcbiAgPC9kaXY+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd25cIiAqbmdJZj1cImlzT3BlblwiPlxyXG4gICAgPHVsIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwXCI+XHJcbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhRHJvcGRvd25UZW1wbGF0ZTsgZWxzZSBkcm9wZG93blRcIj5cclxuICAgICAgICA8bGkgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXAtb3B0aW9uXCIgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBPcHRpb25zOyBsZXQgaT1pbmRleFwiIChtb3VzZWRvd24pPVwic2VsZWN0T25lKCRldmVudCwgb3B0aW9uKVwiXHJcbiAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cImkgPT09IHNlbGVjdG9yUG9zaXRpb25cIiBbaW5uZXJIVE1MXT1cImdldERyb3Bkb3duRm9ybWF0dGVkKG9wdGlvbilcIj5cclxuICAgICAgICA8L2xpPlxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgICAgIDxuZy10ZW1wbGF0ZSAjZHJvcGRvd25UPlxyXG4gICAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb25cIiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIE9wdGlvbnM7IGxldCBpPWluZGV4XCIgKG1vdXNlZG93bik9XCJzZWxlY3RPbmUoJGV2ZW50LCBvcHRpb24pXCJcclxuICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaSA9PT0gc2VsZWN0b3JQb3NpdGlvblwiPlxyXG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIkRyb3Bkb3duVGVtcGxhdGU7IGNvbnRleHQ6IHtpdGVtOiBvcHRpb259XCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgPC9saT5cclxuICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuXHJcbiAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb24gbG9hZGVyXCIgKm5nSWY9XCJkYXRhTGlzdFN1YiAmJiAhZGF0YUxpc3RTdWIuY2xvc2VkXCI+XHJcbiAgICAgICAgw5DCl8OQwrDDkMKzw5HCgMORwoPDkMK3w5DCusOQwrBcclxuICAgICAgPC9saT5cclxuICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvbiBsb2FkZXJcIiAobW91c2Vkb3duKT1cIkFkZE5ld09iamVjdChDcmVhdGVOZXcocXVlcnkpKTtcIiBbY2xhc3MuYWN0aXZlXT1cInNlbGVjdG9yUG9zaXRpb24gPT09IE9wdGlvbnMubGVuZ3RoXCJcclxuICAgICAgICAqbmdJZj1cIlNob3dOZXdcIj5cclxuXHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNyZWF0ZVRlbXBsYXRlOyBlbHNlIHRlbXBsYXRlV2l0aE1lc3NhZ2VcIj5cclxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjcmVhdGVUZW1wbGF0ZS50ZW1wbGF0ZVJlZjsgY29udGV4dDoge3F1ZXJ5OiBxdWVyeX1cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgICAgICAgPG5nLXRlbXBsYXRlICN0ZW1wbGF0ZVdpdGhNZXNzYWdlPlxyXG4gICAgICAgICAge3sgbmV3TWVzc2FnZSB9fVxyXG4gICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgIDwvbGk+XHJcbiAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb24gbG9hZGVyXCIgKm5nSWY9XCJTaG93RW1wdHlcIj5cclxuICAgICAgICDDkMKfw5HCg8ORwoHDkcKCw5DCvlxyXG4gICAgICA8L2xpPlxyXG4gICAgPC91bD5cclxuICAgIDxkaXYgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tcGFnZXJcIiAqbmdJZj1cImN1cnJlbnRDYWNoZSAmJiBjdXJyZW50Q2FjaGUuY291bnRQYWdlcyA+IDFcIj5cclxuICAgICAgPHAgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tcGFnZXItcGFnZVwiPlxyXG4gICAgICAgIHt7IGN1cnJlbnRDYWNoZS5jdXJyZW50UGFnZSB8IG51bWJlciB9fSAvIHt7IGN1cnJlbnRDYWNoZS5jb3VudFBhZ2VzIHwgbnVtYmVyIH19XHJcbiAgICAgIDwvcD5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cInNlbGVjdC1kcm9wZG93bi1wYWdlci1sb2FkbW9yZVwiICpuZ0lmPVwiY3VycmVudENhY2hlLmNvdW50UGFnZXMgPiAxICYmIGN1cnJlbnRDYWNoZS5jdXJyZW50UGFnZSA8IGN1cnJlbnRDYWNoZS5jb3VudFBhZ2VzXCJcclxuICAgICAgICAobW91c2Vkb3duKT1cIm5leHRQYWdlKCRldmVudClcIj5cclxuICAgICAgICDDkMKXw5DCsMOQwrPDkcKAw5HCg8OQwrfDkMK4w5HCgsORwowgw5DCtcORwonDkcKRXHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG5gLFxyXG4gIHN0eWxlczogW2Aucm9vdC12aWJvcntwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmJsb2NrO2ZvbnQtZmFtaWx5Oi1hcHBsZS1zeXN0ZW0sQmxpbmtNYWNTeXN0ZW1Gb250LCBcIlNlZ29lIFVJXCIsUm9ib3RvLEhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmLCBcIkFwcGxlIENvbG9yIEVtb2ppXCIsXCJTZWdvZSBVSSBFbW9qaVwiLFwiU2Vnb2UgVUkgU3ltYm9sXCJ9LnJvb3Qtdmlib3I6bm90KC5tdWx0aXBsZSkgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX3NlbGVjdGlvbntwYWRkaW5nLXJpZ2h0OjcwcHh9LnJvb3Qtdmlib3IubXVsdGlwbGUgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX3JlbW92ZXtiYWNrZ3JvdW5kLWltYWdlOnVybChkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSGRwWkhSb1BTSXhOaUlnYUdWcFoyaDBQU0l4TmlJK0NpQWdQSEJoZEdnZ1ptbHNiRDBpSXpobE5EUmhaQ0lnWkQwaVRURXdMakVnTkM0MVREZ2dOaTQySURVdU9TQTBMalVnTkM0MUlEVXVPU0EyTGpZZ09Hd3RNaTR4SURJdU1TQXhMalFnTVM0MFREZ2dPUzQwYkRJdU1TQXlMakVnTVM0MExURXVORXc1TGpRZ09Hd3lMakV0TWk0eGVpSXZQZ284TDNOMlp6NEspO2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnR9LnJvb3Qtdmlib3IgLnNlbGVjdC1kcm9wZG93bntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MTAwJTtsZWZ0OjA7cmlnaHQ6MDt6LWluZGV4OjI7YmFja2dyb3VuZDojZmZmfS5yb290LXZpYm9yIC5zZWxlY3Qtc2VhcmNoe3Bvc2l0aW9uOnJlbGF0aXZlfS5yb290LXZpYm9yIC5zZWxlY3Qtc2VhcmNoIC5hcnJvd3tjb250ZW50OlwiXCI7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MTNweDt0b3A6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7ZGlzcGxheTpibG9jazt3aWR0aDoxNnB4O2hlaWdodDoxNnB4O2JhY2tncm91bmQtaW1hZ2U6dXJsKGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QmpiR0Z6Y3owaWJtTXRhV052YmlCbmJIbHdhQ0lnZUcxc2JuTTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TURBdmMzWm5JaUIzYVdSMGFEMGlNVFlpSUdobGFXZG9kRDBpTVRZaUlIWnBaWGRDYjNnOUlqQWdNQ0F4TmlBeE5pSStEUW9nSUR4d1lYUm9JR1pwYkd3OUlpTXlZekpqTW1NaUlHUTlJazA0SURFeExqUk1NaTQySURZZ05DQTBMalpzTkNBMElEUXRORXd4TXk0MElEWWlMejROQ2p3dmMzWm5QZzBLKTt0cmFuc2l0aW9uOi13ZWJraXQtdHJhbnNmb3JtIC4xNXMgZWFzZS1pbi1vdXQ7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjE1cyBlYXNlLWluLW91dDt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMTVzIGVhc2UtaW4tb3V0LC13ZWJraXQtdHJhbnNmb3JtIC4xNXMgZWFzZS1pbi1vdXR9LnJvb3Qtdmlib3IgLnNlbGVjdC1zZWFyY2ggLmFycm93OmJlZm9yZXtkaXNwbGF5Om5vbmV9LnJvb3Qtdmlib3IgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2lucHV0IGlucHV0e2JhY2tncm91bmQ6MCAwfS5yb290LXZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9pbnB1dCBpbnB1dDo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlcntjb2xvcjpyZ2JhKDU2LDYxLDY1LC4zKX0ucm9vdC12aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faW5wdXQgaW5wdXQ6Oi1tb3otcGxhY2Vob2xkZXJ7Y29sb3I6cmdiYSg1Niw2MSw2NSwuMyl9LnJvb3Qtdmlib3IgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2lucHV0IGlucHV0Oi1tb3otcGxhY2Vob2xkZXJ7Y29sb3I6cmdiYSg1Niw2MSw2NSwuMyl9LnJvb3Qtdmlib3IgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2lucHV0IGlucHV0Oi1tcy1pbnB1dC1wbGFjZWhvbGRlcntjb2xvcjpyZ2JhKDU2LDYxLDY1LC4zKX0ucm9vdC12aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fbG9hZGVyLWNlbnRlcltoaWRkZW5de2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9LnJvb3Qtdmlib3IgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2xvYWRlci1jZW50ZXJ7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MTBweDt0b3A6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO3dpZHRoOjIxcHg7aGVpZ2h0OjIxcHg7YmFja2dyb3VuZDojZmZmO3otaW5kZXg6Mn0ucm9vdC12aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fbG9hZGVyLWNlbnRlciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fbG9hZGVye3dpZHRoOjE2cHg7aGVpZ2h0OjE2cHg7Ym94LXNpemluZzpib3JkZXItYm94O2JvcmRlci13aWR0aDoycHg7Ym9yZGVyLXN0eWxlOnNvbGlkO2JvcmRlci1jb2xvcjojMjIyNzJlIHJnYmEoMzQsMzksNDYsLjQpIHJnYmEoMzQsMzksNDYsLjQpO2JvcmRlci1yYWRpdXM6MTAwJTstd2Via2l0LWFuaW1hdGlvbjouNDVzIGxpbmVhciBpbmZpbml0ZSBjbG9ja3dpc2U7YW5pbWF0aW9uOi40NXMgbGluZWFyIGluZmluaXRlIGNsb2Nrd2lzZX0ucm9vdC12aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faGlkZXtkaXNwbGF5Om5vbmV9LnJvb3Qtdmlib3IgLnNlbGVjdC1kcm9wZG93biAuc2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvbjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoNjYsMTMyLDIxNSwuMSl9LnJvb3Qtdmlib3IgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX3JlbW92ZXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO3JpZ2h0OjM1cHg7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKTtkaXNwbGF5OmJsb2NrO3dpZHRoOjIwcHg7aGVpZ2h0OjIwcHg7Ym9yZGVyLXJhZGl1czo1MCU7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDQ0LDQ0LDQ0LC4xKTtiYWNrZ3JvdW5kLWltYWdlOnVybChkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUJqYkdGemN6MGlibU10YVdOdmJpQm5iSGx3YUNJZ2VHMXNibk05SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpJd01EQXZjM1puSWlCNGJXeHVjenA0YkdsdWF6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNVGs1T1M5NGJHbHVheUlnZUQwaU1IQjRJaUI1UFNJd2NIZ2lJSGRwWkhSb1BTSXhObkI0SWlCb1pXbG5hSFE5SWpFMmNIZ2lJSFpwWlhkQ2IzZzlJakFnTUNBeE5pQXhOaUkrUEdjK0NqeHdiMng1WjI5dUlHWnBiR3c5SWlNd1pqQm1NR1lpSUhCdmFXNTBjejBpTVRBdU1TdzBMalVnT0N3MkxqWWdOUzQ1TERRdU5TQTBMalVzTlM0NUlEWXVOaXc0SURRdU5Td3hNQzR4SURVdU9Td3hNUzQxSURnc09TNDBJREV3TGpFc01URXVOU0F4TVM0MUxERXdMakVnT1M0MExEZ2dNVEV1TlN3MUxqa2dDZ2tpUGp3dmNHOXNlV2R2Ymo0S1BDOW5Qand2YzNablBnPT0pO2JhY2tncm91bmQtcmVwZWF0Om5vLXJlcGVhdDtiYWNrZ3JvdW5kLXBvc2l0aW9uOmNlbnRlcjtjb2xvcjp0cmFuc3BhcmVudH0ucm9vdC12aWJvci5kaXNhYmxlZCAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fcmVtb3ZlLC5yb290LXZpYm9yW2Rpc2FibGVkXSAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fcmVtb3Zle2Rpc3BsYXk6bm9uZX0ucm9vdC12aWJvcltjbGFzcyo9J19zaXplJ11bY2xhc3MqPSctcyddIC5zZWxlY3Qtc2VhcmNoIC5iLXZpYm9yX192YWx1ZSwucm9vdC12aWJvcltjbGFzcyo9J19zaXplJ11bY2xhc3MqPSctcyddIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9pbnB1dCBpbnB1dCwucm9vdC12aWJvcltjbGFzcyo9J19zaXplJ11bY2xhc3MqPSctcyddIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9zZWxlY3Rpb257aGVpZ2h0OjQwcHh9LnJvb3Qtdmlib3JbY2xhc3MqPSdfc2l6ZSddW2NsYXNzKj0nLW0nXSAuc2VsZWN0LXNlYXJjaCAuYi12aWJvcl9fdmFsdWUsLnJvb3Qtdmlib3JbY2xhc3MqPSdfc2l6ZSddW2NsYXNzKj0nLW0nXSAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faW5wdXQgaW5wdXQsLnJvb3Qtdmlib3JbY2xhc3MqPSdfc2l6ZSddW2NsYXNzKj0nLW0nXSAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fc2VsZWN0aW9ue2hlaWdodDo1MHB4fS5yb290LXZpYm9yW2NsYXNzKj0nX3NpemUnXVtjbGFzcyo9Jy1sJ10gLnNlbGVjdC1zZWFyY2ggLmItdmlib3JfX3ZhbHVlLC5yb290LXZpYm9yW2NsYXNzKj0nX3NpemUnXVtjbGFzcyo9Jy1sJ10gLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2lucHV0IGlucHV0LC5yb290LXZpYm9yW2NsYXNzKj0nX3NpemUnXVtjbGFzcyo9Jy1sJ10gLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX3NlbGVjdGlvbntoZWlnaHQ6NjBweH1ALXdlYmtpdC1rZXlmcmFtZXMgY2xvY2t3aXNle3Rvey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpIHRyYW5zbGF0ZXooMCk7dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpIHRyYW5zbGF0ZXooMCl9fUBrZXlmcmFtZXMgY2xvY2t3aXNle3Rvey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpIHRyYW5zbGF0ZXooMCk7dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpIHRyYW5zbGF0ZXooMCl9fS5yb290LXZpYm9yIC5zZWxlY3QtZHJvcGRvd24gLmItdmlib3JfX3ZhbHVle2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW59LnJvb3Qtdmlib3IgLnNlbGVjdC1kcm9wZG93biAuYi12aWJvcl9fdmFsdWVfX3RleHR7Y29sb3I6IzM4M2Q0MX0ucm9vdC12aWJvciAuc2VsZWN0LWRyb3Bkb3duIC5iLXZpYm9yX192YWx1ZS1kZXNjcl9zbWFsbHtjb2xvcjojOGI4YjgzfS5yb290LXZpYm9yIC5zZWxlY3QtZHJvcGRvd24gLmItdmlib3JfX3ZhbHVlX190ZXh0Ky5iLXZpYm9yX192YWx1ZS1kZXNjcnttYXJnaW4tdG9wOjRweH0ucm9vdC12aWJvciAuc2VsZWN0LWRyb3Bkb3duLXBhZ2Vye3BhZGRpbmc6MTBweDt0ZXh0LWFsaWduOmNlbnRlcjtib3JkZXItdG9wOjFweCBzb2xpZCAjZTVlNWU3fS5yb290LXZpYm9yIC5zZWxlY3QtZHJvcGRvd24tcGFnZXIgLnNlbGVjdC1kcm9wZG93bi1wYWdlci1wYWdle2NvbG9yOiM4YjhiODN9LnJvb3Qtdmlib3IgLnNlbGVjdC1kcm9wZG93bi1wYWdlciAuc2VsZWN0LWRyb3Bkb3duLXBhZ2VyLWxvYWRtb3Jle2NvbG9yOiM0Mjg0ZDc7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgcmdiYSg2NiwxMzIsMjE1LC4zKX0ucm9vdC12aWJvciAuc2VsZWN0LWRyb3Bkb3duLXBhZ2VyIC5zZWxlY3QtZHJvcGRvd24tcGFnZXItcGFnZSsuc2VsZWN0LWRyb3Bkb3duLXBhZ2VyLWxvYWRtb3Jle21hcmdpbi10b3A6NXB4fS5yb290LXZpYm9yIC5zZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXB7bWF4LWhlaWdodDozMDBweDtvdmVyZmxvdy15OmF1dG99YF0sXHJcbiAgcHJvdmlkZXJzOiBbe1xyXG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ1ZpYm9yQ29tcG9uZW50KSxcclxuICAgIG11bHRpOiB0cnVlXHJcbiAgfV1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nVmlib3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG4gIC8vIExvY2FsIFZhcmlhYmxlXHJcbiAgcHVibGljIF9tb2RlbDogYW55O1xyXG5cclxuICBwcml2YXRlIGZpcnN0TG9hZCA9IGZhbHNlO1xyXG4gIHByaXZhdGUgb3B0aW9uczogQXJyYXk8YW55PjtcclxuICBwdWJsaWMgb3V0cHV0OiBBcnJheTxhbnk+O1xyXG5cclxuICBwdWJsaWMgaXNPcGVuOiBib29sZWFuO1xyXG5cclxuICBwcml2YXRlIG9sZFF1ZXJ5OiBzdHJpbmc7XHJcbiAgcHVibGljIHF1ZXJ5OiBzdHJpbmc7XHJcblxyXG4gIHB1YmxpYyBzZWxlY3RvclBvc2l0aW9uID0gMDtcclxuICBwcml2YXRlIHdhaXRUaW1lID0gNTAwO1xyXG5cclxuICBwcml2YXRlIGVsOiBFbGVtZW50OyAgICAgICAgICAgLy8gdGhpcyBjb21wb25lbnQgIGVsZW1lbnQgYDx2aWJvcj5gXHJcbiAgcHJpdmF0ZSBpbnB1dEVsOiBIVE1MSW5wdXRFbGVtZW50OyAvLyBgPGlucHV0PmAgZWxlbWVudCBpbiBgPHZpYm9yPmAgZm9yIGF1dG8gY29tcGxldGVcclxuICBAVmlld0NoaWxkKCdpbnB1dENvbnRyb2wnKSBwdWJsaWMgaW5wdXRDb250cm9sOiBOZ01vZGVsO1xyXG5cclxuICAvLyBJbnB1dHMgJiBPdXRwdXRzXHJcbiAgQElucHV0KCkgcHVibGljIG11bHRpcGxlID0gZmFsc2U7XHJcbiAgQElucHV0KCkgcHVibGljIG11bHRpcGxlTGltaXQgPSBJbmZpbml0eTtcclxuICBASW5wdXQoKSBwdWJsaWMgY291bnRPblBhZ2UgPSAxMDtcclxuXHJcbiAgQElucHV0KCkgcHVibGljIHBsYWNlaG9sZGVyID0gJ1ZpYm9yJztcclxuICBASW5wdXQoKSBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyByZXF1aXJlZCA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBhbGxvd1Jlc2V0ID0gdHJ1ZTtcclxuICBwdWJsaWMgZGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgLy8gw5DCnsORwoLDkMK+w5DCscORwoDDkMKww5DCtsOQwrXDkMK9w5DCuMOQwrUgw5HCgcOQwr/DkMK4w5HCgcOQwrrDkMK+w5DCslxyXG4gIEBDb250ZW50Q2hpbGQoVmlib3JCb3RoRGlyZWN0aXZlKSBwdWJsaWMgYm90aFRlbXBsYXRlOiBWaWJvckJvdGhEaXJlY3RpdmU7XHJcbiAgQENvbnRlbnRDaGlsZChWaWJvckRyb3Bkb3duRGlyZWN0aXZlKSBwdWJsaWMgZHJvcGRvd25UZW1wbGF0ZTogVmlib3JEcm9wZG93bkRpcmVjdGl2ZTtcclxuICBAQ29udGVudENoaWxkKFZpYm9yU2VsZWN0ZWREaXJlY3RpdmUpIHB1YmxpYyBzZWxlY3RlZFRlbXBsYXRlOiBWaWJvclNlbGVjdGVkRGlyZWN0aXZlO1xyXG4gIEBDb250ZW50Q2hpbGQoVmlib3JDcmVhdGVEaXJlY3RpdmUpIHB1YmxpYyBjcmVhdGVUZW1wbGF0ZTogVmlib3JDcmVhdGVEaXJlY3RpdmU7XHJcbiAgQElucHV0KCkgcHVibGljIGxpc3RGb3JtYXR0ZXI6IChhcmc6IGFueSwgdmFsdWU6IHN0cmluZykgPT4gc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBkcm9wZG93bkZvcm1hdHRlcjogKGFyZzogYW55LCB2YWx1ZTogc3RyaW5nKSA9PiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcHVibGljIHZpZXdQcm9wZXJ0eSA9ICdOYW1lJzsgIC8vIMOQwp/DkMK+w5DCu8OQwrUgw5DCtMOQwrvDkcKPIMOQwrTDkMK1w5HChMOQwr7DkMK7w5HCgsOQwr3DkMK+w5DCs8OQwr4gw5DCvsORwoLDkMK+w5DCscORwoDDkMKww5DCtsOQwrXDkMK9w5DCuMORwo9cclxuXHJcbiAgQElucHV0KCkgcHVibGljIG1vZGVsUHJvcGVydHkgPSAnaWQnOyAgLy8gw5DCosOQwr4sIMORwofDkcKCw5DCviDDkMK3w5DCsMOQwr/DkMK4w5HCgcORwovDkMKyw5DCsMOQwrXDkcKCw5HCgcORwo8gw5DCsiDDkMKcw5DCvsOQwrTDkMK1w5DCu8ORwoxcclxuICBASW5wdXQoKSBwdWJsaWMgcHJlbG9hZFByb3BlcnR5ID0gJ2lkcyc7IC8vIMOQwprDkMK7w5HCjsORwocgw5DCt8OQwrDDkMK/w5HCgMOQwr7DkcKBw5DCsCDDkMK6IMORwoHDkMK1w5HCgMOQwrLDkMK1w5HCgMORwoMgw5DCtMOQwrvDkcKPIMOQwr/DkcKAw5DCtcOQwrTDkMK3w5DCsMOQwrPDkcKAw5HCg8OQwrfDkMK6w5DCuCwgw5DCtcORwoHDkMK7w5DCuCB1bmRlZmluZWQgw5DCt8OQwrDDkMK/w5DCuMORwoHDkcKLw5DCssOQwrDDkMK1w5HCgsORwoHDkcKPIMOQwrLDkMK1w5HCgcORwowgw5DCvsOQwrHDkcKKw5DCtcOQwrrDkcKCXHJcbiAgQElucHV0KCkgcHVibGljIHByZWxvYWRGaWVsZDogc3RyaW5nID0gdW5kZWZpbmVkOyAvLyDDkMKXw5DCvcOQwrDDkcKHw5DCtcOQwr3DkMK4w5DCtSDDkMK/w5DCvsOQwrvDkcKPLCDDkMK6w5DCvsORwoLDkMK+w5HCgMOQwrUgw5DCvcOQwrXDkMK+w5DCscORwoXDkMK+w5DCtMOQwrjDkMK8w5DCviDDkMK+w5HCgsOQwr/DkcKAw5DCsMOQwrLDkMK4w5HCgsORwowgw5DCsiDDkMK3w5DCsMOQwr/DkcKAw5DCvsORwoEuXHJcbiAgQElucHV0KCkgcHVibGljIHNlYXJjaFByb3BlcnR5ID0gJ3F1ZXJ5JztcclxuXHJcbiAgQElucHV0KCkgcHVibGljIGRhdGFMaXN0OiAoKHBhcmFtOiBPYmplY3QsIHBhZ2U6IG51bWJlciwgY291bnRPblBhZ2U/OiBudW1iZXIpID0+IE9ic2VydmFibGU8SURhdGFSZXNwb25zZT4pIHwgQXJyYXk8YW55PjtcclxuICBASW5wdXQoKSBwdWJsaWMgZXhjbHVkZUxpc3Q6IEFycmF5PGFueT47XHJcbiAgQElucHV0KCkgcHVibGljIGFkZGl0aW9uYWxGaWx0ZXIgPSB7fTtcclxuICBASW5wdXQoKSBwdWJsaWMgb25seUVtaXR0ZXI6IGJvb2xlYW47XHJcbiAgQE91dHB1dCgnY2hhbmdlRnVsbE1vZGVsJykgcHVibGljIGNoYW5nZUZ1bGxNb2RlbDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG5cclxuICBASW5wdXQoKSBwdWJsaWMgbmV3TWVzc2FnZTogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBDcmVhdGVOZXc6IChxdWVyeTogc3RyaW5nKSA9PiBPYnNlcnZhYmxlPGFueT4gfCBhbnkgPSAocXVlcnk6IHN0cmluZykgPT4ge1xyXG4gICAgcmV0dXJuIHF1ZXJ5O1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIFN1YnNjcmlwdGlvblxyXG4gIHB1YmxpYyBkYXRhTGlzdFN1YjogU3Vic2NyaXB0aW9uO1xyXG5cclxuXHJcbiAgLy8gT1BUSU9OU1xyXG4gIHB1YmxpYyBUcmFja0J5Rm4oaW5kZXg6IG51bWJlcik6IGFueSB7XHJcbiAgICByZXR1cm4gaW5kZXg7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2hvd0Ryb3Bkb3duTGlzdChldmVudDogRm9jdXNFdmVudCB8IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIGlmIChldmVudCkge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5tdWx0aXBsZSAmJiB0aGlzLm91dHB1dC5sZW5ndGggPj0gdGhpcy5tdWx0aXBsZUxpbWl0KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ29wZW4tdmlib3InKTtcclxuICAgIHRoaXMuaW5wdXRFbC5mb2N1cygpO1xyXG4gICAgdGhpcy51cGRhdGVPcHRpb25zKCk7XHJcbiAgICB0aGlzLm9uVG91Y2hlZCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoaWRlRHJvcGRvd25MaXN0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuLXZpYm9yJyk7XHJcbiAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xyXG4gICAgdGhpcy5pbnB1dEVsLmJsdXIoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBoaWRlRHJvcGRvd25MaXN0V2l0aERlbGF5KCk6IHZvaWQge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuaGlkZURyb3Bkb3duTGlzdCgpO1xyXG4gICAgfSwgMTAwKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB0b2dnbGVEcm9wZG93bihldmVudDogRXZlbnQpOiB2b2lkIHtcclxuICAgIGlmIChldmVudCkge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5pc09wZW4pIHtcclxuICAgICAgdGhpcy5oaWRlRHJvcGRvd25MaXN0KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNob3dEcm9wZG93bkxpc3QodW5kZWZpbmVkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZGVsYXk6IEZ1bmN0aW9uID0gKGZ1bmN0aW9uICgpOiBGdW5jdGlvbiB7XHJcbiAgICBsZXQgdGltZXIgPSAwO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjYWxsYmFjazogYW55LCBtczogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XHJcbiAgICAgIHRpbWVyID0gc2V0VGltZW91dChjYWxsYmFjaywgbXMpO1xyXG4gICAgfTtcclxuICB9KSgpO1xyXG5cclxuICBwdWJsaWMgdXBkYXRlT3B0aW9ucygpOiB2b2lkIHtcclxuICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcclxuICAgIGlmICh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgdGhpcy5vcHRpb25zID0gdGhpcy5kYXRhTGlzdC5maWx0ZXIoZGF0YSA9PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnF1ZXJ5IHx8IHRoaXMucXVlcnkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGY6IGFueSA9IGZldGNoRnJvbU9iamVjdChkYXRhLCB0aGlzLnNlYXJjaFByb3BlcnR5KTtcclxuICAgICAgICBpZiAoZiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShmKS5pbmRleE9mKHRoaXMucXVlcnkpID49IDA7XHJcbiAgICAgIH0pLmZpbHRlcihkYXRhID0+IHtcclxuICAgICAgICBpZiAoIXRoaXMuZXhjbHVkZUxpc3QpIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGQgPSBmZXRjaEZyb21PYmplY3QoZGF0YSwgdGhpcy5tb2RlbFByb3BlcnR5KS52YWx1ZU9mKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXhjbHVkZUxpc3QuZmluZEluZGV4KGV4ID0+IHtcclxuICAgICAgICAgIGxldCBhID0gZmV0Y2hGcm9tT2JqZWN0KGV4LCB0aGlzLm1vZGVsUHJvcGVydHkpLnZhbHVlT2YoKTtcclxuICAgICAgICAgIHJldHVybiBkZWVwRXF1YWwoZCwgYSk7XHJcbiAgICAgICAgfSkgPCAwO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgIGlmICh0aGlzLmRhdGFMaXN0U3ViKSB7IHRoaXMuZGF0YUxpc3RTdWIudW5zdWJzY3JpYmUoKTsgfVxyXG4gICAgICBpZiAoIXRoaXMuY3VycmVudENhY2hlKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50Q2FjaGUgPSB7XHJcbiAgICAgICAgICBjb3VudEVsZW1lbnQ6IDAsXHJcbiAgICAgICAgICBjb3VudFBhZ2VzOiAxLFxyXG4gICAgICAgICAgY3VycmVudFBhZ2U6IDEsXHJcbiAgICAgICAgICBvYmplY3RzOiBbXSxcclxuICAgICAgICAgIHF1ZXJ5OiB0aGlzLnF1ZXJ5LFxyXG4gICAgICAgICAgcGFyYW1zOiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmFkZGl0aW9uYWxGaWx0ZXIpXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmNhY2hlTGF6eURhdGEucHVzaCh0aGlzLmN1cnJlbnRDYWNoZSk7XHJcblxyXG4gICAgICAgIGxldCBwYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmFkZGl0aW9uYWxGaWx0ZXIpIGFzIGFueTtcclxuICAgICAgICBwYXJhbXNbdGhpcy5zZWFyY2hQcm9wZXJ0eV0gPSB0aGlzLnF1ZXJ5O1xyXG5cclxuICAgICAgICB0aGlzLmRhdGFMaXN0U3ViID0gKDxPYnNlcnZhYmxlPElEYXRhUmVzcG9uc2U+PnRoaXMuZGF0YUxpc3QocGFyYW1zLCAxLCB0aGlzLmNvdW50T25QYWdlKSkuc3Vic2NyaWJlKGFuc3dlciA9PiB7XHJcbiAgICAgICAgICB0aGlzLmN1cnJlbnRDYWNoZS5vYmplY3RzID0gdGhpcy5jdXJyZW50Q2FjaGUub2JqZWN0cy5jb25jYXQoYW5zd2VyLmxpc3QpO1xyXG4gICAgICAgICAgdGhpcy5jdXJyZW50Q2FjaGUuY291bnRFbGVtZW50ID0gYW5zd2VyLmhlYWRlcnNbJ2NvdW50J107XHJcbiAgICAgICAgICB0aGlzLmN1cnJlbnRDYWNoZS5jb3VudFBhZ2VzID0gTWF0aC5jZWlsKHRoaXMuY3VycmVudENhY2hlLmNvdW50RWxlbWVudCAvIHRoaXMuY291bnRPblBhZ2UpO1xyXG4gICAgICAgIH0sICgpID0+IHsgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyB1cGRhdGVPcHRpb25zSW5EZWxheSgpOiB2b2lkIHtcclxuICAgIGxldCBkZWxheU1zOiBudW1iZXIgPSB0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgQXJyYXkgPyAxMCA6IHRoaXMud2FpdFRpbWU7XHJcblxyXG4gICAgLy8gZXhlY3V0aW5nIGFmdGVyIHVzZXIgc3RvcHBlZCB0eXBpbmdcclxuICAgIHRoaXMuZGVsYXkoKCkgPT4ge1xyXG4gICAgICB0aGlzLm9sZFF1ZXJ5ID0gdGhpcy5xdWVyeTtcclxuICAgICAgdGhpcy5jdXJyZW50Q2FjaGUgPSB0aGlzLkdldENhY2hlKHRoaXMucXVlcnkpO1xyXG4gICAgICB0aGlzLnVwZGF0ZU9wdGlvbnMoKTtcclxuICAgIH0sIGRlbGF5TXMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBmb2N1c1NlbGVjdGVkT3B0aW9uKCk6IHZvaWQge1xyXG4gICAgbGV0IGxpc3Q6IGFueSA9IDxIVE1MRWxlbWVudD50aGlzLmVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NlbGVjdC1kcm9wZG93bicpWzBdO1xyXG4gICAgbGV0IHRhcmdldExpOiBhbnkgPSA8SFRNTEVsZW1lbnQ+dGhpcy5lbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXAtb3B0aW9uJylbdGhpcy5zZWxlY3RvclBvc2l0aW9uXTtcclxuICAgIHNjcm9sbEFjdGl2ZU9wdGlvbihsaXN0LCB0YXJnZXRMaSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMga2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLk9wdGlvbnMpIHtcclxuICAgICAgdGhpcy5zaG93RHJvcGRvd25MaXN0KHVuZGVmaW5lZCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdG90YWxOdW1JdGVtOiBudW1iZXIgPSB0aGlzLk9wdGlvbnMubGVuZ3RoO1xyXG5cclxuICAgIGlmICh0aGlzLlNob3dOZXcpIHtcclxuICAgICAgdG90YWxOdW1JdGVtKys7XHJcbiAgICB9XHJcblxyXG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XHJcbiAgICAgIGNhc2UgMjc6IC8vIEVTQywgaGlkZSBhdXRvIGNvbXBsZXRlXHJcbiAgICAgICAgdGhpcy5oaWRlRHJvcGRvd25MaXN0KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDM4OiAvLyBVUCwgc2VsZWN0IHRoZSBwcmV2aW91cyBsaSBlbFxyXG4gICAgICAgIHRoaXMuc2VsZWN0b3JQb3NpdGlvbiA9ICh0b3RhbE51bUl0ZW0gKyB0aGlzLnNlbGVjdG9yUG9zaXRpb24gLSAxKSAlIHRvdGFsTnVtSXRlbTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgNDA6IC8vIERPV04sIHNlbGVjdCB0aGUgbmV4dCBsaSBlbCBvciB0aGUgZmlyc3Qgb25lXHJcbiAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0b3JQb3NpdGlvbiA9ICh0b3RhbE51bUl0ZW0gKyB0aGlzLnNlbGVjdG9yUG9zaXRpb24gKyAxKSAlIHRvdGFsTnVtSXRlbTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMTM6IC8vIEVOVEVSLCBjaG9vc2UgaXQhIVxyXG4gICAgICAgIGlmICh0b3RhbE51bUl0ZW0gPiAwKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5zZWxlY3RvclBvc2l0aW9uID09PSB0aGlzLk9wdGlvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQWRkTmV3T2JqZWN0KHRoaXMuQ3JlYXRlTmV3KHRoaXMucXVlcnkpKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0T25lKGV2ZW50LCB0aGlzLk9wdGlvbnNbdGhpcy5zZWxlY3RvclBvc2l0aW9uXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLlNob3dOZXcpIHtcclxuICAgICAgICAgIHRoaXMuQWRkTmV3T2JqZWN0KHRoaXMuQ3JlYXRlTmV3KHRoaXMucXVlcnkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBkZWZhdWx0OiBicmVhaztcclxuICAgIH1cclxuICAgIHRoaXMuZm9jdXNTZWxlY3RlZE9wdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5leHRQYWdlKCRldmVudDogRXZlbnQpOiB2b2lkIHtcclxuICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIC8vIFZhbGlkYXRvcnNcclxuICAgIGlmICghKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBGdW5jdGlvbikpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdEYXRhIExpc3QgbWFzdCBiZSBGdW5jdGlvbicpO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLmN1cnJlbnRDYWNoZSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZvciBuZXh0IHBhZ2UgbmVlZCBjYWNoZSBmb3IgZmlyc3QgUGFnZScpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuY3VycmVudENhY2hlLmN1cnJlbnRQYWdlID49IHRoaXMuY3VycmVudENhY2hlLmNvdW50UGFnZXMpIHsgdGhyb3cgbmV3IEVycm9yKCdNYXggUGFnZSBMaW1pdCcpOyB9XHJcblxyXG4gICAgaWYgKHRoaXMuZGF0YUxpc3RTdWIpIHsgdGhpcy5kYXRhTGlzdFN1Yi51bnN1YnNjcmliZSgpOyB9XHJcblxyXG4gICAgbGV0IHBhcmFtczogYW55ID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5hZGRpdGlvbmFsRmlsdGVyKTtcclxuICAgIHBhcmFtc1t0aGlzLnNlYXJjaFByb3BlcnR5XSA9IHRoaXMucXVlcnk7XHJcblxyXG4gICAgdGhpcy5kYXRhTGlzdFN1YiA9IHRoaXMuZGF0YUxpc3QocGFyYW1zLCB0aGlzLmN1cnJlbnRDYWNoZS5jdXJyZW50UGFnZSArIDEsIHRoaXMuY291bnRPblBhZ2UpLnN1YnNjcmliZShhbnN3ZXIgPT4ge1xyXG4gICAgICB0aGlzLmN1cnJlbnRDYWNoZS5jdXJyZW50UGFnZSsrO1xyXG4gICAgICB0aGlzLmN1cnJlbnRDYWNoZS5jb3VudEVsZW1lbnQgPSBhbnN3ZXIuaGVhZGVyc1snY291bnQnXTtcclxuICAgICAgdGhpcy5jdXJyZW50Q2FjaGUuY291bnRQYWdlcyA9IE1hdGguY2VpbCh0aGlzLmN1cnJlbnRDYWNoZS5jb3VudEVsZW1lbnQgLyB0aGlzLmNvdW50T25QYWdlKTtcclxuICAgICAgdGhpcy5jdXJyZW50Q2FjaGUub2JqZWN0cyA9IHRoaXMuY3VycmVudENhY2hlLm9iamVjdHMuY29uY2F0KGFuc3dlci5saXN0KTtcclxuICAgICAgdGhpcy5zZWxlY3RvclBvc2l0aW9uID0gKHRoaXMuY3VycmVudENhY2hlLmN1cnJlbnRQYWdlIC0gMSkgKiB0aGlzLmNvdW50T25QYWdlICsgMTtcclxuICAgICAgdGhpcy5mb2N1c1NlbGVjdGVkT3B0aW9uKCk7XHJcbiAgICB9LCAoKSA9PiB7IH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gTU9ERUxcclxuICBwcml2YXRlIGNsZWFyUHJvcGVydHkoKTogdm9pZCB7XHJcbiAgICB0aGlzLnNlbGVjdG9yUG9zaXRpb24gPSAwO1xyXG4gICAgdGhpcy5xdWVyeSA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZWxlY3RPbmUoJGV2ZW50OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCwgZGF0YTogYW55KTogdm9pZCB7XHJcbiAgICAvLyDDkMKkw5DCuMOQwrvDkcKMw5HCgsORwoAgw5DCvcOQwrXDkMK9w5HCg8OQwrbDkMK9w5HCi8ORwoUgw5HCgcOQwr7DkMKxw5HCi8ORwoLDkMK4w5DCuVxyXG4gICAgaWYgKCRldmVudCBpbnN0YW5jZW9mIE1vdXNlRXZlbnQgJiYgJGV2ZW50LmJ1dHRvbiAhPT0gMCkgeyByZXR1cm47IH1cclxuXHJcbiAgICBpZiAodGhpcy5tdWx0aXBsZSAmJiB0aGlzLm91dHB1dC5sZW5ndGggPCB0aGlzLm11bHRpcGxlTGltaXQpIHtcclxuICAgICAgdGhpcy5vdXRwdXQucHVzaChkYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoIXRoaXMubXVsdGlwbGUpIHtcclxuICAgICAgdGhpcy5vdXRwdXQgPSBbZGF0YV07XHJcbiAgICB9XHJcbiAgICB0aGlzLmNoYW5nZUZ1bGxNb2RlbC5lbWl0KHRoaXMub3V0cHV0KTtcclxuICAgIHRoaXMuTW9kZWwgPSB0aGlzLlZhbHVlRnJvbU91dHB1dDtcclxuICAgIHRoaXMuY2xlYXJQcm9wZXJ0eSgpO1xyXG4gICAgdGhpcy5oaWRlRHJvcGRvd25MaXN0KCk7XHJcbiAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9O1xyXG5cclxuICBwdWJsaWMgcmVtb3ZlT25lKGluZGV4OiBudW1iZXIsIGV2ZW50OiBFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICB0aGlzLm91dHB1dC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgdGhpcy5Nb2RlbCA9IHRoaXMuVmFsdWVGcm9tT3V0cHV0O1xyXG5cclxuICAgIC8vIHNldCBjbGFzc1xyXG4gICAgdGhpcy5vblRvdWNoZWQoKTtcclxuICAgIHRoaXMuaW5wdXRDb250cm9sLmNvbnRyb2wubWFya0FzVG91Y2hlZCgpO1xyXG5cclxuICAgIC8vIG9wZW4gZHJvcGRvd25cclxuICAgIGlmICh0aGlzLnJlcXVpcmVkKSB7XHJcbiAgICAgIHRoaXMuc2hvd0Ryb3Bkb3duTGlzdCh1bmRlZmluZWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gRk9STUFUVElOR1xyXG5cclxuICBwdWJsaWMgZ2V0IFNlbGVjdGVkVGVtcGxhdGUoKTogVGVtcGxhdGVSZWY8YW55PiB7XHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZFRlbXBsYXRlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkVGVtcGxhdGUudGVtcGxhdGVSZWY7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuYm90aFRlbXBsYXRlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmJvdGhUZW1wbGF0ZS50ZW1wbGF0ZVJlZjtcclxuICAgIH1cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IERyb3Bkb3duVGVtcGxhdGUoKTogVGVtcGxhdGVSZWY8YW55PiB7XHJcbiAgICBpZiAodGhpcy5kcm9wZG93blRlbXBsYXRlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmRyb3Bkb3duVGVtcGxhdGUudGVtcGxhdGVSZWY7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuYm90aFRlbXBsYXRlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmJvdGhUZW1wbGF0ZS50ZW1wbGF0ZVJlZjtcclxuICAgIH1cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TGlzdEZvcm1hdHRlZChkYXRhOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgbGV0IGZvcm1hdHRlcjogYW55ID0gdGhpcy5saXN0Rm9ybWF0dGVyIHx8IGRlZmF1bHRGb3JtYXR0ZXI7XHJcbiAgICByZXR1cm4gZm9ybWF0dGVyLmFwcGx5KHRoaXMsIFtkYXRhLCB0aGlzLnZpZXdQcm9wZXJ0eV0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldERyb3Bkb3duRm9ybWF0dGVkKGRhdGE6IGFueSk6IHN0cmluZyB7XHJcbiAgICBsZXQgZm9ybWF0dGVyOiBhbnkgPSB0aGlzLmRyb3Bkb3duRm9ybWF0dGVyIHx8IGRlZmF1bHRGb3JtYXR0ZXI7XHJcbiAgICByZXR1cm4gZm9ybWF0dGVyLmFwcGx5KHRoaXMsIFtkYXRhLCB0aGlzLnZpZXdQcm9wZXJ0eV0pO1xyXG4gIH1cclxuXHJcbiAgLy8gSU5JVFxyXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIC8vIHRoaXMuTW9kZWwgPSB0aGlzLlZhbHVlRnJvbU91dHB1dDsgw5DCrcORwoLDkMK+IMOQwrLDkcKAw5DCvsOQwrTDkMK1IMORwoLDkcKDw5HCgiDDkcKCw5DCvsOQwrbDkMK1IMORwoPDkMK2w5DCtSDDkMK9w5DCtSDDkMK9w5DCsMOQwrTDkMK+LlxyXG4gICAgdGhpcy5lbCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Jvb3Qtdmlib3InKS5pdGVtKDApO1xyXG4gICAgdGhpcy5pbnB1dEVsID0gPEhUTUxJbnB1dEVsZW1lbnQ+KHRoaXMuZWwucXVlcnlTZWxlY3RvcignaW5wdXQnKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkNoYW5nZXMoaW5wdXRzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICBpZiAoaW5wdXRzWydkYXRhTGlzdCddICYmIGlucHV0c1snZGF0YUxpc3QnXS5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgLy8gT3V0cHV0XHJcbiAgICAgIGlmICh0aGlzLk1vZGVsID09PSB1bmRlZmluZWQgfHwgdGhpcy5Nb2RlbCA9PSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5vdXRwdXQgPSBbXTtcclxuICAgICAgICB0aGlzLmNoYW5nZUZ1bGxNb2RlbC5lbWl0KHRoaXMub3V0cHV0KTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLk1vZGVsIGluc3RhbmNlb2YgQXJyYXkgJiYgdGhpcy5tdWx0aXBsZSkge1xyXG4gICAgICAgIHRoaXMuT3V0cHV0ID0gdGhpcy5Nb2RlbDtcclxuICAgICAgfSBlbHNlIGlmICghKHRoaXMuTW9kZWwgaW5zdGFuY2VvZiBBcnJheSkgJiYgIXRoaXMubXVsdGlwbGUpIHtcclxuICAgICAgICB0aGlzLk91dHB1dCA9IFt0aGlzLk1vZGVsXTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLm91dHB1dCB8fCAhdGhpcy5vdXRwdXQubGVuZ3RoKSB7XHJcbiAgICAgICAgICB0aGlzLk1vZGVsID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChpbnB1dHNbJ211bHRpcGxlJ10pIHtcclxuICAgICAgaWYgKGlucHV0c1snbXVsdGlwbGUnXS5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ211bHRpcGxlJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCdtdWx0aXBsZScpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlucHV0c1snYWRkaXRpb25hbEZpbHRlciddKSB7XHJcbiAgICAgIHRoaXMuY3VycmVudENhY2hlID0gdGhpcy5HZXRDYWNoZSh0aGlzLnF1ZXJ5KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRGl2RWxlbWVudD4pIHtcclxuICAgIHRoaXMub3V0cHV0ID0gW107XHJcbiAgfVxyXG5cclxuICAvLyBGT1JNU1xyXG4gIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcclxuICAgIC8vIMOQwp3DkMK+w5HCgMOQwrzDkMKww5DCu8ORwozDkMK9w5HCi8OQwrkgdXBkYXRlIMOQwrzDkMK+w5DCtMOQwrXDkMK7w5DCuFxyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIGlmICgodmFsdWUgaW5zdGFuY2VvZiBBcnJheSAmJiAhdGhpcy5tdWx0aXBsZSkgfHwgKCEodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkgJiYgdGhpcy5tdWx0aXBsZSkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01vZGVsIFR5cGUgRXJyb3InKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBBcnJheSAmJiB0aGlzLk1vZGVsIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICBpZiAodmFsdWUubGVuZ3RoID09PSB0aGlzLk1vZGVsLmxlbmd0aCAmJiB2YWx1ZS5ldmVyeSh2ID0+IHRoaXMuTW9kZWwuaW5kZXhPZih2KSA+PSAwKSkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLk1vZGVsID09PSB2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmZpcnN0TG9hZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuTW9kZWwgPSB2YWx1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbkNoYW5nZTogYW55ID0gKCkgPT4geyB9O1xyXG4gIHB1YmxpYyBvblRvdWNoZWQ6IGFueSA9ICgpID0+IHsgfTtcclxuXHJcbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XHJcbiAgICBpZiAoaXNEaXNhYmxlZCkge1xyXG4gICAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZWwucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gICAgfVxyXG4gICAgLy8gZGlzYWJsZSBvdGhlciBjb21wb25lbnRzIGhlcmVcclxuICB9XHJcblxyXG4gIHNldCBNb2RlbCh2YWx1ZTogYW55KSB7XHJcbiAgICBpZiAodGhpcy5vbmx5RW1pdHRlcikge1xyXG4gICAgICB0aGlzLm91dHB1dCA9IFtdO1xyXG4gICAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE91dHB1dFxyXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLm91dHB1dCA9IFtdO1xyXG4gICAgICB0aGlzLmNoYW5nZUZ1bGxNb2RlbC5lbWl0KHRoaXMub3V0cHV0KTtcclxuICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBBcnJheSAmJiB0aGlzLm11bHRpcGxlKSB7XHJcbiAgICAgIHRoaXMuT3V0cHV0ID0gdmFsdWU7XHJcbiAgICB9IGVsc2UgaWYgKCEodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkgJiYgIXRoaXMubXVsdGlwbGUpIHtcclxuICAgICAgdGhpcy5PdXRwdXQgPSBbdmFsdWVdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE1vZGVsXHJcbiAgICB0aGlzLl9tb2RlbCA9IHZhbHVlO1xyXG5cclxuICAgIC8vIEZvcm1zXHJcbiAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuX21vZGVsKTtcclxuICB9XHJcblxyXG4gIGdldCBNb2RlbCgpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuX21vZGVsO1xyXG4gIH1cclxuXHJcbiAgLy8gUFJPUEVSVFlcclxuICBnZXQgSW5wdXRIaWRlKCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMub3V0cHV0Lmxlbmd0aCA+PSB0aGlzLm11bHRpcGxlTGltaXQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5vdXRwdXQubGVuZ3RoID09PSAxICYmICF0aGlzLmlzT3BlbjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBWYWx1ZUZyb21PdXRwdXQoKTogYW55IHtcclxuICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XHJcbiAgICAgIGxldCB0bXA6IEFycmF5PGFueT4gPSBbXTtcclxuICAgICAgZm9yIChsZXQgbyBvZiB0aGlzLm91dHB1dCkge1xyXG4gICAgICAgIHRtcC5wdXNoKGZldGNoRnJvbU9iamVjdChvLCB0aGlzLm1vZGVsUHJvcGVydHkpKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdG1wO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZldGNoRnJvbU9iamVjdCh0aGlzLm91dHB1dFswXSwgdGhpcy5tb2RlbFByb3BlcnR5KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldCBPdXRwdXQobmV3VmFsdWU6IEFycmF5PGFueT4pIHtcclxuICAgIGxldCBkYXRhTGlzdDogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICBkYXRhTGlzdCA9IHRoaXMuZGF0YUxpc3Q7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICBpZiAobmV3VmFsdWUgJiYgbmV3VmFsdWUubGVuZ3RoICYmIHRoaXMuZmlyc3RMb2FkKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtczogYW55ID0ge307XHJcbiAgICAgICAgdGhpcy5maXJzdExvYWQgPSBmYWxzZTtcclxuICAgICAgICBpZiAoIXRoaXMucHJlbG9hZFByb3BlcnR5KSB7XHJcbiAgICAgICAgICB0aGlzLm91dHB1dCA9IG5ld1ZhbHVlO1xyXG4gICAgICAgICAgdGhpcy5jaGFuZ2VGdWxsTW9kZWwuZW1pdCh0aGlzLm91dHB1dCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHBhcmFtc1t0aGlzLnByZWxvYWRQcm9wZXJ0eV0gPSBuZXdWYWx1ZS5tYXAodmFsID0+IGZldGNoRnJvbU9iamVjdCh2YWwsIHRoaXMucHJlbG9hZEZpZWxkKSk7XHJcbiAgICAgICAgICB0aGlzLmRhdGFMaXN0U3ViID0gKDxPYnNlcnZhYmxlPElEYXRhUmVzcG9uc2U+PnRoaXMuZGF0YUxpc3QocGFyYW1zLCAxLCB0aGlzLmNvdW50T25QYWdlKSkuc3Vic2NyaWJlKGFuc3dlciA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub3V0cHV0ID0gYW5zd2VyLmxpc3Q7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRnVsbE1vZGVsLmVtaXQodGhpcy5vdXRwdXQpO1xyXG4gICAgICAgICAgfSwgKCkgPT4geyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VGdWxsTW9kZWwuZW1pdCh0aGlzLm91dHB1dCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMuZGF0YUxpc3QgPT09IHVuZGVmaW5lZCkgeyByZXR1cm47IH1cclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdkYXRhTGlzdCB2YWx1ZSBFcnJvcicpO1xyXG4gICAgfVxyXG4gICAgbGV0IG5ld091dHB1dDogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgZm9yIChsZXQgdiBvZiBuZXdWYWx1ZSkge1xyXG4gICAgICBmb3IgKGxldCBkIG9mIGRhdGFMaXN0KSB7XHJcbiAgICAgICAgbGV0IGEgPSBmZXRjaEZyb21PYmplY3QoZCwgdGhpcy5tb2RlbFByb3BlcnR5KSA/IGZldGNoRnJvbU9iamVjdChkLCB0aGlzLm1vZGVsUHJvcGVydHkpLnZhbHVlT2YoKSA6IHVuZGVmaW5lZDtcclxuICAgICAgICBsZXQgYiA9IHYgPyB2LnZhbHVlT2YoKSA6IHVuZGVmaW5lZDtcclxuICAgICAgICBpZiAoZGVlcEVxdWFsKGEsIGIpKSB7XHJcbiAgICAgICAgICBuZXdPdXRwdXQucHVzaChkKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMub3V0cHV0ID0gbmV3T3V0cHV0O1xyXG4gICAgdGhpcy5jaGFuZ2VGdWxsTW9kZWwuZW1pdCh0aGlzLm91dHB1dCk7XHJcbiAgfVxyXG5cclxuICBnZXQgT3B0aW9ucygpOiBBcnJheTxhbnk+IHtcclxuICAgIGxldCBvcHRpb25zOiBBcnJheTxhbnk+O1xyXG4gICAgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgbGV0IG9sZENhY2hlID0gdGhpcy5HZXRDYWNoZSh0aGlzLm9sZFF1ZXJ5KTtcclxuXHJcbiAgICAgIGlmICghdGhpcy5jdXJyZW50Q2FjaGUgJiYgb2xkQ2FjaGUpIHtcclxuICAgICAgICBvcHRpb25zID0gb2xkQ2FjaGUub2JqZWN0cztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBvcHRpb25zID0gdGhpcy5jdXJyZW50Q2FjaGUgPyB0aGlzLmN1cnJlbnRDYWNoZS5vYmplY3RzIDogW107XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiAob3B0aW9ucyB8fCBbXSkuZmlsdGVyKG9wID0+IHtcclxuICAgICAgcmV0dXJuIHRoaXMub3V0cHV0LmZpbmRJbmRleChvID0+IHtcclxuICAgICAgICBsZXQgYSA9IGZldGNoRnJvbU9iamVjdChvLCB0aGlzLm1vZGVsUHJvcGVydHkpID8gZmV0Y2hGcm9tT2JqZWN0KG8sIHRoaXMubW9kZWxQcm9wZXJ0eSkudmFsdWVPZigpIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIGxldCBiID0gZmV0Y2hGcm9tT2JqZWN0KG9wLCB0aGlzLm1vZGVsUHJvcGVydHkpID8gZmV0Y2hGcm9tT2JqZWN0KG9wLCB0aGlzLm1vZGVsUHJvcGVydHkpLnZhbHVlT2YoKSA6IHVuZGVmaW5lZDtcclxuICAgICAgICByZXR1cm4gZGVlcEVxdWFsKGEsIGIpO1xyXG4gICAgICB9KSA9PT0gLTE7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjdXJyZW50Q2FjaGU6IENhY2hlSW5mbztcclxuICBwcml2YXRlIEdldENhY2hlKHF1ZXJ5OiBzdHJpbmcpOiBDYWNoZUluZm8ge1xyXG4gICAgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICByZXR1cm4gdGhpcy5jYWNoZUxhenlEYXRhLmZpbmQoY2FjaGUgPT4ge1xyXG4gICAgICAgIHJldHVybiBjYWNoZS5xdWVyeSA9PT0gdGhpcy5xdWVyeSAmJiBkZWVwRXF1YWwoY2FjaGUucGFyYW1zLCB0aGlzLmFkZGl0aW9uYWxGaWx0ZXIpO1xyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8vIENyZWF0ZU5ld1xyXG5cclxuICBwdWJsaWMgQWRkTmV3T2JqZWN0KHZhbHVlOiBPYnNlcnZhYmxlPGFueT4gfCBhbnkpOiB2b2lkIHtcclxuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcclxuICAgICAgdmFsdWUuc3Vic2NyaWJlKG5ld09iamVjdCA9PiB7XHJcbiAgICAgICAgaWYgKG5ld09iamVjdCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICB0aGlzLlNldE5ld09iamVjdChuZXdPYmplY3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNldE5ld09iamVjdCh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIFNldE5ld09iamVjdChuZXdPYmplY3Q6IGFueSkge1xyXG4gICAgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICB0aGlzLmRhdGFMaXN0LnB1c2gobmV3T2JqZWN0KTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgIGZvciAobGV0IGNhY2hlIG9mIHRoaXMuY2FjaGVMYXp5RGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLnF1ZXJ5LmluY2x1ZGVzKGNhY2hlLnF1ZXJ5KSB8fCBjYWNoZS5xdWVyeSA9PT0gdW5kZWZpbmVkIHx8IGNhY2hlLnF1ZXJ5ID09PSAnJykge1xyXG4gICAgICAgICAgY2FjaGUuY291bnRFbGVtZW50Kys7XHJcbiAgICAgICAgICBjYWNoZS5vYmplY3RzLnB1c2gobmV3T2JqZWN0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmZpcnN0TG9hZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5xdWVyeSA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuY3VycmVudENhY2hlID0gdGhpcy5HZXRDYWNoZSh0aGlzLnF1ZXJ5KTtcclxuICAgIHRoaXMuc2VsZWN0T25lKG5ldyBNb3VzZUV2ZW50KCdjbGljaycpLCBuZXdPYmplY3QpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IFNob3dOZXcoKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgYSA9IHRoaXMucXVlcnkgJiYgdGhpcy5uZXdNZXNzYWdlICYmICghdGhpcy5kYXRhTGlzdFN1YiB8fCB0aGlzLmRhdGFMaXN0U3ViLmNsb3NlZCk7XHJcblxyXG4gICAgbGV0IGIgPSB0aGlzLk9wdGlvbnMuZmluZEluZGV4KG8gPT4ge1xyXG4gICAgICBsZXQgYyA9IGZldGNoRnJvbU9iamVjdChvLCB0aGlzLnZpZXdQcm9wZXJ0eSkgPyBmZXRjaEZyb21PYmplY3QobywgdGhpcy52aWV3UHJvcGVydHkpLnZhbHVlT2YoKSA6IHVuZGVmaW5lZDtcclxuICAgICAgcmV0dXJuIGRlZXBFcXVhbChjLCB0aGlzLnF1ZXJ5KTtcclxuICAgIH0pID09PSAtMSAmJiB0aGlzLm91dHB1dC5maW5kSW5kZXgobyA9PiB7XHJcbiAgICAgIGxldCBjID0gZmV0Y2hGcm9tT2JqZWN0KG8sIHRoaXMudmlld1Byb3BlcnR5KSA/IGZldGNoRnJvbU9iamVjdChvLCB0aGlzLnZpZXdQcm9wZXJ0eSkudmFsdWVPZigpIDogdW5kZWZpbmVkO1xyXG4gICAgICByZXR1cm4gZGVlcEVxdWFsKGMsIHRoaXMucXVlcnkpO1xyXG4gICAgfSkgPT09IC0xO1xyXG5cclxuICAgIHJldHVybiBhICYmIGI7XHJcbiAgfVxyXG5cclxuICBnZXQgU2hvd0VtcHR5KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuT3B0aW9ucy5sZW5ndGggPT09IDAgJiYgKCEodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB8fCAodGhpcy5kYXRhTGlzdFN1Yi5jbG9zZWQpKTtcclxuICB9XHJcblxyXG5cclxuICAvLyBDQUNIRVxyXG4gIHByaXZhdGUgY2FjaGVMYXp5RGF0YTogQXJyYXk8Q2FjaGVJbmZvPiA9IFtdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENhY2hlSW5mbyB7XHJcbiAgY291bnRFbGVtZW50OiBudW1iZXI7XHJcbiAgY291bnRQYWdlczogbnVtYmVyO1xyXG4gIGN1cnJlbnRQYWdlOiBudW1iZXI7XHJcbiAgb2JqZWN0czogQXJyYXk8YW55PjtcclxuXHJcbiAgcXVlcnk6IHN0cmluZztcclxuICBwYXJhbXM6IGFueTtcclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBOZ1ZpYm9yQ29tcG9uZW50IH0gZnJvbSAnLi9uZy12aWJvci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBWaWJvckJvdGhEaXJlY3RpdmUsIFZpYm9yQ3JlYXRlRGlyZWN0aXZlLCBWaWJvckRyb3Bkb3duRGlyZWN0aXZlLCBWaWJvclNlbGVjdGVkRGlyZWN0aXZlIH0gZnJvbSAnLi9uZy12aWJvci10ZW1wbGF0ZS5kaXJlY3RpdmUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBGb3Jtc01vZHVsZSwgQ29tbW9uTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIE5nVmlib3JDb21wb25lbnQsXHJcbiAgICBWaWJvckJvdGhEaXJlY3RpdmUsIFZpYm9yQ3JlYXRlRGlyZWN0aXZlLCBWaWJvckRyb3Bkb3duRGlyZWN0aXZlLCBWaWJvclNlbGVjdGVkRGlyZWN0aXZlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBOZ1ZpYm9yQ29tcG9uZW50LCBGb3Jtc01vZHVsZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nVmlib3JNb2R1bGUgeyB9XHJcbiJdLCJuYW1lcyI6WyJJbmplY3RhYmxlIiwiRGlyZWN0aXZlIiwiVGVtcGxhdGVSZWYiLCJFdmVudEVtaXR0ZXIiLCJ0c2xpYl8xLl9fdmFsdWVzIiwiT2JzZXJ2YWJsZSIsIkNvbXBvbmVudCIsIk5HX1ZBTFVFX0FDQ0VTU09SIiwiZm9yd2FyZFJlZiIsIkVsZW1lbnRSZWYiLCJWaWV3Q2hpbGQiLCJJbnB1dCIsIkNvbnRlbnRDaGlsZCIsIk91dHB1dCIsIk5nTW9kdWxlIiwiRm9ybXNNb2R1bGUiLCJDb21tb25Nb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtRQU1FO1NBQWlCOztvQkFKbEJBLGFBQVUsU0FBQzt3QkFDVixVQUFVLEVBQUUsTUFBTTtxQkFDbkI7Ozs7OzZCQUpEOzs7SUNBQTs7Ozs7Ozs7Ozs7Ozs7QUFjQSxzQkE0RnlCLENBQUM7UUFDdEIsSUFBSSxDQUFDLEdBQUcsT0FBTyxNQUFNLEtBQUssVUFBVSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUM7WUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU07b0JBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO2dCQUNuQyxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJ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