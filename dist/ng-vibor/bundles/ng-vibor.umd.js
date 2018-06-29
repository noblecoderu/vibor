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
                this.el = this.elementRef.nativeElement.getElementsByClassName('vibor').item(0);
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
                        template: "<div class=\"vibor\">\n  <ng-content></ng-content>\n\n  <div class=\"select-search\" (click)=\"showDropdownList($event);\">\n    <ul class=\"select-search-list\">\n      <ng-container *ngIf=\"multiple || !isOpen\">\n        <ng-container *ngIf=\"!SelectedTemplate; else selectedT\">\n          <li class=\"select-search-list-item select-search-list-item_selection\" *ngFor=\"let item of output; let $index=index; let $last=last; trackBy: TrackByFn;\">\n            <div [innerHTML]=\"getListFormatted(item)\"></div>\n            <a class=\"select-search-list-item_remove\" *ngIf=\"allowReset\" (click)=\"!disabled && removeOne($index, $event)\"></a>\n          </li>\n        </ng-container>\n\n        <ng-template #selectedT>\n          <li class=\"select-search-list-item select-search-list-item_selection\" *ngFor=\"let item of output; let $index=index; let $last=last; trackBy: TrackByFn;\">\n            <ng-container *ngTemplateOutlet=\"SelectedTemplate; context: {item: item}\"></ng-container>\n            <a class=\"select-search-list-item_remove\" *ngIf=\"allowReset && !disabled\" (click)=\"!disabled && removeOne($index, $event)\">\n            </a>\n          </li>\n        </ng-template>\n      </ng-container>\n\n      <li class=\"select-search-list-item select-search-list-item_input\" [class.select-search-list-item_hide]=\"InputHide\">\n        <input autocomplete=\"off\" #inputControl=\"ngModel\" [name]=\"name\" [disabled]=\"disabled\" [(ngModel)]=\"query\" [placeholder]=\"output.length == 0 || (multiple && output.length < multipleLimit) ? placeholder : ''\"\n          (input)=\"updateOptionsInDelay()\" (keydown)=\"keyDown($event)\" />\n      </li>\n      <li class=\"select-search-list-item select-search-list-item_loader-center\" [hidden]=\"!dataListSub || dataListSub.closed\">\n        <div class=\"select-search-list-item_loader\"></div>\n      </li>\n\n      <span class=\"arrow\" (click)=\"toggleDropdown($event)\">\n      </span>\n    </ul>\n  </div>\n\n  <div class=\"select-dropdown\" *ngIf=\"isOpen\">\n    <ul class=\"select-dropdown-optgroup\">\n      <ng-container *ngIf=\"!DropdownTemplate; else dropdownT\">\n        <li class=\"select-dropdown-optgroup-option\" *ngFor=\"let option of Options; let i=index\" (mousedown)=\"selectOne($event, option)\"\n          [class.active]=\"i === selectorPosition\" [innerHTML]=\"getDropdownFormatted(option)\">\n        </li>\n      </ng-container>\n\n      <ng-template #dropdownT>\n        <li class=\"select-dropdown-optgroup-option\" *ngFor=\"let option of Options; let i=index\" (mousedown)=\"selectOne($event, option)\"\n          [class.active]=\"i === selectorPosition\">\n          <ng-container *ngTemplateOutlet=\"DropdownTemplate; context: {item: option}\"></ng-container>\n        </li>\n      </ng-template>\n\n      <li class=\"select-dropdown-optgroup-option loader\" *ngIf=\"dataListSub && !dataListSub.closed\">\n        \u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430\n      </li>\n      <li class=\"select-dropdown-optgroup-option loader\" (mousedown)=\"AddNewObject(CreateNew(query));\" [class.active]=\"selectorPosition === Options.length\"\n        *ngIf=\"ShowNew\">\n\n        <ng-container *ngIf=\"createTemplate; else templateWithMessage\">\n          <ng-container *ngTemplateOutlet=\"createTemplate.templateRef; context: {query: query}\"></ng-container>\n        </ng-container>\n\n        <ng-template #templateWithMessage>\n          {{ newMessage }}\n        </ng-template>\n      </li>\n      <li class=\"select-dropdown-optgroup-option loader\" *ngIf=\"ShowEmpty\">\n        \u041F\u0443\u0441\u0442\u043E\n      </li>\n    </ul>\n    <div class=\"select-dropdown-pager\" *ngIf=\"currentCache && currentCache.countPages > 1\">\n      <p class=\"select-dropdown-pager-page\">\n        {{ currentCache.currentPage | number }} / {{ currentCache.countPages | number }}\n      </p>\n      <button class=\"select-dropdown-pager-loadmore\" *ngIf=\"currentCache.countPages > 1 && currentCache.currentPage < currentCache.countPages\"\n        (mousedown)=\"nextPage($event)\">\n        \u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0435\u0449\u0451\n      </button>\n    </div>\n  </div>\n</div>\n",
                        styles: [".vibor a,.vibor div,.vibor label,.vibor legend,.vibor span,.vibor ul{margin:0;padding:0;border:0}.vibor a,.vibor button,.vibor input{outline:0}.vibor ol,.vibor ul{list-style:none}.vibor input{padding:0;margin:0;border:0;font:inherit}.vibor{position:relative;display:block;font-family:-apple-system,BlinkMacSystemFont, \"Segoe UI\",Roboto,Helvetica,Arial,sans-serif, \"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\"}.vibor .select-search{position:relative}.vibor .select-search .arrow{content:\"\";position:absolute;right:13px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);display:block;width:16px;height:16px;background-image:url(data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ibmMtaWNvbiBnbHlwaCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiI+DQogIDxwYXRoIGZpbGw9IiMyYzJjMmMiIGQ9Ik04IDExLjRMMi42IDYgNCA0LjZsNCA0IDQtNEwxMy40IDYiLz4NCjwvc3ZnPg0K);transition:-webkit-transform .15s ease-in-out;transition:transform .15s ease-in-out;transition:transform .15s ease-in-out,-webkit-transform .15s ease-in-out}.vibor .select-search .arrow:before{display:none}.vibor .select-search-list-item_input input{width:100%}.vibor .select-dropdown{position:absolute;top:100%;left:0;right:0;z-index:2}.vibor .select-search-list-item_loader-center{position:absolute;right:10px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);display:flex;align-items:center;justify-content:center;width:21px;height:21px;background:#fff;z-index:2}.vibor .select-search-list-item_loader-center[hidden]{display:none}.vibor .select-search-list-item_loader-center .select-search-list-item_loader{width:16px;height:16px;box-sizing:border-box;border-width:2px;border-style:solid;border-color:#22272e rgba(34,39,46,.4) rgba(34,39,46,.4);border-radius:100%;-webkit-animation:.45s linear infinite clockwise;animation:.45s linear infinite clockwise}.vibor .select-dropdown-optgroup{max-height:300px;overflow-y:auto;border:1px solid #d5d9de;border-bottom-left-radius:5px;border-bottom-right-radius:5px;border-top:0}.vibor .select-dropdown-optgroup-option{min-height:30px;padding:10px 15px}.vibor .select-dropdown-optgroup-option:hover{background-color:rgba(66,132,215,.1)}.vibor .open-vibor .select-search .arrow{-webkit-transform:rotate(180deg);transform:rotate(180deg)}@-webkit-keyframes clockwise{to{-webkit-transform:rotate(360deg) translatez(0);transform:rotate(360deg) translatez(0)}}@keyframes clockwise{to{-webkit-transform:rotate(360deg) translatez(0);transform:rotate(360deg) translatez(0)}}"],
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctdmlib3IudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZy12aWJvci9saWIvbmctdmlib3Iuc2VydmljZS50cyIsbnVsbCwibmc6Ly9uZy12aWJvci9saWIvbmctdmlib3ItdGVtcGxhdGUuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy12aWJvci9saWIvaGVscGVycy50cyIsIm5nOi8vbmctdmlib3IvbGliL25nLXZpYm9yLmNvbXBvbmVudC50cyIsIm5nOi8vbmctdmlib3IvbGliL25nLXZpYm9yLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ1ZpYm9yU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxufVxyXG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1t2aWJvckRyb3Bkb3duRWxlbWVudF0nIH0pXHJcbmV4cG9ydCBjbGFzcyBWaWJvckRyb3Bkb3duRGlyZWN0aXZlIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cclxufVxyXG5cclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3ZpYm9yU2VsZWN0ZWRFbGVtZW50XScgfSlcclxuZXhwb3J0IGNsYXNzIFZpYm9yU2VsZWN0ZWREaXJlY3RpdmUge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxyXG59XHJcblxyXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbdmlib3JCb3RoRWxlbWVudF0nIH0pXHJcbmV4cG9ydCBjbGFzcyBWaWJvckJvdGhEaXJlY3RpdmUge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxyXG59XHJcblxyXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbdmlib3JDcmVhdGVdJyB9KVxyXG5leHBvcnQgY2xhc3MgVmlib3JDcmVhdGVEaXJlY3RpdmUge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxyXG59XHJcbiIsImV4cG9ydCBpbnRlcmZhY2UgSURhdGFSZXNwb25zZSB7XHJcbiAgZGF0YTogT2JqZWN0O1xyXG4gIGxpc3Q6IEFycmF5PE9iamVjdD47XHJcbiAgaGVhZGVyczogYW55O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmV0Y2hGcm9tT2JqZWN0KG9iamVjdDogYW55LCBwcm9wOiBzdHJpbmcpOiBhbnkge1xyXG4gIGlmIChvYmplY3QgPT09IHVuZGVmaW5lZCB8fCBwcm9wID09PSB1bmRlZmluZWQpIHtcclxuICAgIHJldHVybiBvYmplY3Q7XHJcbiAgfVxyXG5cclxuICBjb25zdCBpbmRleDogbnVtYmVyID0gcHJvcC5pbmRleE9mKCcuJyk7XHJcbiAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgIHJldHVybiBmZXRjaEZyb21PYmplY3Qob2JqZWN0W3Byb3Auc3Vic3RyaW5nKDAsIGluZGV4KV0sIHByb3Auc3Vic3RyKGluZGV4ICsgMSkpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG9iamVjdFtwcm9wXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRGb3JtYXR0ZXIoZGF0YTogYW55LCB2YWx1ZVByb3BlcnR5TmFtZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICBsZXQgaHRtbCA9ICcnO1xyXG4gIGh0bWwgKz0gZmV0Y2hGcm9tT2JqZWN0KGRhdGEsIHZhbHVlUHJvcGVydHlOYW1lKSA/IGA8Yj4ke2ZldGNoRnJvbU9iamVjdChkYXRhLCB2YWx1ZVByb3BlcnR5TmFtZSl9PC9iPmAgOiAnJztcclxuICByZXR1cm4gaHRtbDtcclxufVxyXG5cclxuXHJcbi8vIFVzZWQgZm9yIG1hdGNoaW5nIG51bWJlcnNcclxuY29uc3QgY29yZV9wbnVtOiBzdHJpbmcgPSAvWystXT8oPzpcXGQqXFwufClcXGQrKD86W2VFXVsrLV0/XFxkK3wpLy5zb3VyY2U7XHJcbmNvbnN0IHJudW1ub25weDogUmVnRXhwID0gbmV3IFJlZ0V4cCgnXignICsgY29yZV9wbnVtICsgJykoPyFweClbYS16JV0rJCcsICdpJyk7XHJcblxyXG5mdW5jdGlvbiBhdWdtZW50V2lkdGhPckhlaWdodChuYW1lOiBzdHJpbmcsIGV4dHJhOiBhbnksIGlzQm9yZGVyQm94OiBhbnksIHN0eWxlczogYW55KTogbnVtYmVyIHtcclxuICBsZXQgaTogbnVtYmVyID0gZXh0cmEgPT09IChpc0JvcmRlckJveCA/ICdib3JkZXInIDogJ2NvbnRlbnQnKSA/XHJcbiAgICAvLyBJZiB3ZSBhbHJlYWR5IGhhdmUgdGhlIHJpZ2h0IG1lYXN1cmVtZW50LCBhdm9pZCBhdWdtZW50YXRpb25cclxuICAgIDQgOlxyXG4gICAgLy8gT3RoZXJ3aXNlIGluaXRpYWxpemUgZm9yIGhvcml6b250YWwgb3IgdmVydGljYWwgcHJvcGVydGllc1xyXG4gICAgbmFtZSA9PT0gJ3dpZHRoJyA/IDEgOiAwLFxyXG5cclxuICAgIHZhbCA9IDA7XHJcbiAgY29uc3QgY3NzRXhwYW5kOiBzdHJpbmdbXSA9IFsnVG9wJywgJ1JpZ2h0JywgJ0JvdHRvbScsICdMZWZ0J107XHJcblxyXG4gIC8vIFRPRE8gVXNlIGFuZ3VsYXIuZWxlbWVudC5jc3MgaW5zdGVhZCBvZiBnZXRTdHlsZVZhbHVlIGFmdGVyXHJcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2NhaXRwL2FuZ3VsYXIuanMvY29tbWl0LzkyYmJiNWUyMjUyNTNlYmRkZDM4ZWY1NzM1ZDY2ZmZlZjc2YjZhMTQgd2lsbCBiZSBhcHBsaWVkXHJcbiAgZnVuY3Rpb24gZ2V0U3R5bGVWYWx1ZShfbmFtZTogYW55KTogbnVtYmVyIHtcclxuICAgIHJldHVybiBwYXJzZUZsb2F0KHN0eWxlc1tfbmFtZV0pO1xyXG4gIH1cclxuXHJcbiAgZm9yICg7IGkgPCA0OyBpICs9IDIpIHtcclxuICAgIC8vIGJvdGggYm94IG1vZGVscyBleGNsdWRlIG1hcmdpbiwgc28gYWRkIGl0IGlmIHdlIHdhbnQgaXRcclxuICAgIGlmIChleHRyYSA9PT0gJ21hcmdpbicpIHtcclxuICAgICAgdmFsICs9IGdldFN0eWxlVmFsdWUoZXh0cmEgKyBjc3NFeHBhbmRbaV0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpc0JvcmRlckJveCkge1xyXG4gICAgICAvLyBib3JkZXItYm94IGluY2x1ZGVzIHBhZGRpbmcsIHNvIHJlbW92ZSBpdCBpZiB3ZSB3YW50IGNvbnRlbnRcclxuICAgICAgaWYgKGV4dHJhID09PSAnY29udGVudCcpIHtcclxuICAgICAgICB2YWwgLT0gZ2V0U3R5bGVWYWx1ZSgncGFkZGluZycgKyBjc3NFeHBhbmRbaV0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBhdCB0aGlzIHBvaW50LCBleHRyYSBpc24ndCBib3JkZXIgbm9yIG1hcmdpbiwgc28gcmVtb3ZlIGJvcmRlclxyXG4gICAgICBpZiAoZXh0cmEgIT09ICdtYXJnaW4nKSB7XHJcbiAgICAgICAgdmFsIC09IGdldFN0eWxlVmFsdWUoJ2JvcmRlcicgKyBjc3NFeHBhbmRbaV0gKyAnV2lkdGgnKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFsICs9IGdldFN0eWxlVmFsdWUoJ3BhZGRpbmcnICsgY3NzRXhwYW5kW2ldKTtcclxuXHJcbiAgICAgIC8vIGF0IHRoaXMgcG9pbnQsIGV4dHJhIGlzbid0IGNvbnRlbnQgbm9yIHBhZGRpbmcsIHNvIGFkZCBib3JkZXJcclxuICAgICAgaWYgKGV4dHJhICE9PSAncGFkZGluZycpIHtcclxuICAgICAgICB2YWwgKz0gZ2V0U3R5bGVWYWx1ZSgnYm9yZGVyJyArIGNzc0V4cGFuZFtpXSArICdXaWR0aCcpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdmFsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRXaW5kb3coZWxlbTogYW55KTogYW55IHtcclxuICByZXR1cm4gZWxlbSAhPSBudWxsICYmIGVsZW0gPT09IGVsZW0ud2luZG93ID8gZWxlbSA6IGVsZW0ubm9kZVR5cGUgPT09IDkgJiYgZWxlbS5kZWZhdWx0VmlldztcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0T2Zmc2V0KGVsZW06IGFueSk6IGFueSB7XHJcbiAgbGV0IGRvY0VsZW06IGFueSwgd2luOiBhbnk7XHJcbiAgY29uc3QgYm94OiBhbnkgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gIGNvbnN0IGRvYzogYW55ID0gZWxlbSAmJiBlbGVtLm93bmVyRG9jdW1lbnQ7XHJcblxyXG4gIGlmICghZG9jKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBkb2NFbGVtID0gZG9jLmRvY3VtZW50RWxlbWVudDtcclxuICB3aW4gPSBnZXRXaW5kb3coZG9jKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHRvcDogYm94LnRvcCArIHdpbi5wYWdlWU9mZnNldCAtIGRvY0VsZW0uY2xpZW50VG9wLFxyXG4gICAgbGVmdDogYm94LmxlZnQgKyB3aW4ucGFnZVhPZmZzZXQgLSBkb2NFbGVtLmNsaWVudExlZnRcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2Nyb2xsQWN0aXZlT3B0aW9uKGxpc3Q6IEhUTUxFbGVtZW50LCBpdGVtOiBIVE1MRWxlbWVudCk6IHZvaWQge1xyXG4gIGxldCB5OiBhbnksIGhlaWdodF9tZW51OiBhbnksIGhlaWdodF9pdGVtOiBhbnksIHNjcm9sbDogYW55LCBzY3JvbGxfdG9wOiBhbnksIHNjcm9sbF9ib3R0b206IGFueTtcclxuXHJcbiAgaWYgKGl0ZW0pIHtcclxuICAgIGhlaWdodF9tZW51ID0gbGlzdC5vZmZzZXRIZWlnaHQ7XHJcbiAgICBoZWlnaHRfaXRlbSA9IGdldFdpZHRoT3JIZWlnaHQoaXRlbSwgJ2hlaWdodCcsICdtYXJnaW4nKTsgLy8gb3V0ZXJIZWlnaHQodHJ1ZSk7XHJcbiAgICBzY3JvbGwgPSBsaXN0LnNjcm9sbFRvcCB8fCAwO1xyXG4gICAgeSA9IGdldE9mZnNldChpdGVtKS50b3AgLSBnZXRPZmZzZXQobGlzdCkudG9wICsgc2Nyb2xsO1xyXG4gICAgc2Nyb2xsX3RvcCA9IHk7XHJcbiAgICBzY3JvbGxfYm90dG9tID0geSAtIGhlaWdodF9tZW51ICsgaGVpZ2h0X2l0ZW07XHJcblxyXG4gICAgLy8gVE9ETyBNYWtlIGFuaW1hdGlvblxyXG4gICAgaWYgKHkgKyBoZWlnaHRfaXRlbSA+IGhlaWdodF9tZW51ICsgc2Nyb2xsKSB7XHJcbiAgICAgIGxpc3Quc2Nyb2xsVG9wID0gc2Nyb2xsX2JvdHRvbTtcclxuICAgIH0gZWxzZSBpZiAoeSA8IHNjcm9sbCkge1xyXG4gICAgICBsaXN0LnNjcm9sbFRvcCA9IHNjcm9sbF90b3A7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRXaWR0aE9ySGVpZ2h0KGVsZW06IGFueSwgbmFtZTogYW55LCBleHRyYTogYW55KTogYW55IHtcclxuXHJcbiAgLy8gU3RhcnQgd2l0aCBvZmZzZXQgcHJvcGVydHksIHdoaWNoIGlzIGVxdWl2YWxlbnQgdG8gdGhlIGJvcmRlci1ib3ggdmFsdWVcclxuICBjb25zdCB2YWx1ZUlzQm9yZGVyQm94ID0gdHJ1ZTtcclxuICBsZXQgdmFsOiBhbnkgPSBuYW1lID09PSAnd2lkdGgnID8gZWxlbS5vZmZzZXRXaWR0aCA6IGVsZW0ub2Zmc2V0SGVpZ2h0O1xyXG4gIGNvbnN0IHN0eWxlczogYW55ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbSwgbnVsbCk7XHJcbiAgY29uc3QgaXNCb3JkZXJCb3ggPSBmYWxzZTsgLy8galF1ZXJ5LnN1cHBvcnQuYm94U2l6aW5nICYmIGpRdWVyeS5jc3MoIGVsZW0sICdib3hTaXppbmcnLCBmYWxzZSwgc3R5bGVzICkgPT09ICdib3JkZXItYm94JztcclxuXHJcbiAgLy8gc29tZSBub24taHRtbCBlbGVtZW50cyByZXR1cm4gdW5kZWZpbmVkIGZvciBvZmZzZXRXaWR0aCwgc28gY2hlY2sgZm9yIG51bGwvdW5kZWZpbmVkXHJcbiAgLy8gc3ZnIC0gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NjQ5Mjg1XHJcbiAgLy8gTWF0aE1MIC0gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NDkxNjY4XHJcbiAgaWYgKHZhbCA8PSAwIHx8IHZhbCA9PSBudWxsKSB7XHJcbiAgICAvLyBGYWxsIGJhY2sgdG8gY29tcHV0ZWQgdGhlbiB1bmNvbXB1dGVkIGNzcyBpZiBuZWNlc3NhcnlcclxuICAgIHZhbCA9IHN0eWxlc1tuYW1lXTtcclxuXHJcbiAgICBpZiAodmFsIDwgMCB8fCB2YWwgPT0gbnVsbCkge1xyXG4gICAgICB2YWwgPSBlbGVtLnN0eWxlW25hbWVdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENvbXB1dGVkIHVuaXQgaXMgbm90IHBpeGVscy4gU3RvcCBoZXJlIGFuZCByZXR1cm4uXHJcbiAgICBpZiAocm51bW5vbnB4LnRlc3QodmFsKSkge1xyXG4gICAgICByZXR1cm4gdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHdlIG5lZWQgdGhlIGNoZWNrIGZvciBzdHlsZSBpbiBjYXNlIGEgYnJvd3NlciB3aGljaCByZXR1cm5zIHVucmVsaWFibGUgdmFsdWVzXHJcbiAgICAvLyBmb3IgZ2V0Q29tcHV0ZWRTdHlsZSBzaWxlbnRseSBmYWxscyBiYWNrIHRvIHRoZSByZWxpYWJsZSBlbGVtLnN0eWxlXHJcbiAgICAvLyB2YWx1ZUlzQm9yZGVyQm94ID0gaXNCb3JkZXJCb3ggJiYgKCBqUXVlcnkuc3VwcG9ydC5ib3hTaXppbmdSZWxpYWJsZSB8fCB2YWwgPT09IGVsZW0uc3R5bGVbIG5hbWUgXSApO1xyXG5cclxuICAgIC8vIE5vcm1hbGl6ZSAnJywgYXV0bywgYW5kIHByZXBhcmUgZm9yIGV4dHJhXHJcbiAgICB2YWwgPSBwYXJzZUZsb2F0KHZhbCkgfHwgMDtcclxuICB9XHJcblxyXG4gIC8vIHVzZSB0aGUgYWN0aXZlIGJveC1zaXppbmcgbW9kZWwgdG8gYWRkL3N1YnRyYWN0IGlycmVsZXZhbnQgc3R5bGVzXHJcbiAgcmV0dXJuIHZhbCArIGF1Z21lbnRXaWR0aE9ySGVpZ2h0KG5hbWUsIGV4dHJhIHx8IChpc0JvcmRlckJveCA/ICdib3JkZXInIDogJ2NvbnRlbnQnKSwgdmFsdWVJc0JvcmRlckJveCwgc3R5bGVzKTtcclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCwgT25Jbml0LCBPbkNoYW5nZXMsXHJcbiAgSW5wdXQsIE91dHB1dCwgZm9yd2FyZFJlZixcclxuICBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYsXHJcbiAgVGVtcGxhdGVSZWYsIENvbnRlbnRDaGlsZCwgVmlld0NoaWxkLFxyXG4gIFNpbXBsZUNoYW5nZXNcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBDb250cm9sVmFsdWVBY2Nlc3NvcixcclxuICBOR19WQUxVRV9BQ0NFU1NPUixcclxuICBOZ01vZGVsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgVmlib3JCb3RoRGlyZWN0aXZlLFxyXG4gICAgVmlib3JDcmVhdGVEaXJlY3RpdmUsXHJcbiAgICBWaWJvckRyb3Bkb3duRGlyZWN0aXZlLFxyXG4gICAgVmlib3JTZWxlY3RlZERpcmVjdGl2ZVxyXG59IGZyb20gJy4vbmctdmlib3ItdGVtcGxhdGUuZGlyZWN0aXZlJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBJRGF0YVJlc3BvbnNlLFxyXG4gICAgZGVmYXVsdEZvcm1hdHRlcixcclxuICAgIGZldGNoRnJvbU9iamVjdCxcclxuICAgIHNjcm9sbEFjdGl2ZU9wdGlvblxyXG59IGZyb20gJy4vaGVscGVycyc7XHJcblxyXG5jb25zdCBkZWVwRXF1YWwgPSByZXF1aXJlKCdkZWVwLWVxdWFsJyk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LXNlbGVjdG9yXHJcbiAgc2VsZWN0b3I6ICd2aWJvcicsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwidmlib3JcIj5cclxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoXCIgKGNsaWNrKT1cInNob3dEcm9wZG93bkxpc3QoJGV2ZW50KTtcIj5cclxuICAgIDx1bCBjbGFzcz1cInNlbGVjdC1zZWFyY2gtbGlzdFwiPlxyXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibXVsdGlwbGUgfHwgIWlzT3BlblwiPlxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhU2VsZWN0ZWRUZW1wbGF0ZTsgZWxzZSBzZWxlY3RlZFRcIj5cclxuICAgICAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtIHNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX3NlbGVjdGlvblwiICpuZ0Zvcj1cImxldCBpdGVtIG9mIG91dHB1dDsgbGV0ICRpbmRleD1pbmRleDsgbGV0ICRsYXN0PWxhc3Q7IHRyYWNrQnk6IFRyYWNrQnlGbjtcIj5cclxuICAgICAgICAgICAgPGRpdiBbaW5uZXJIVE1MXT1cImdldExpc3RGb3JtYXR0ZWQoaXRlbSlcIj48L2Rpdj5cclxuICAgICAgICAgICAgPGEgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9yZW1vdmVcIiAqbmdJZj1cImFsbG93UmVzZXRcIiAoY2xpY2spPVwiIWRpc2FibGVkICYmIHJlbW92ZU9uZSgkaW5kZXgsICRldmVudClcIj48L2E+XHJcbiAgICAgICAgICA8L2xpPlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG5cclxuICAgICAgICA8bmctdGVtcGxhdGUgI3NlbGVjdGVkVD5cclxuICAgICAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtIHNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX3NlbGVjdGlvblwiICpuZ0Zvcj1cImxldCBpdGVtIG9mIG91dHB1dDsgbGV0ICRpbmRleD1pbmRleDsgbGV0ICRsYXN0PWxhc3Q7IHRyYWNrQnk6IFRyYWNrQnlGbjtcIj5cclxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIlNlbGVjdGVkVGVtcGxhdGU7IGNvbnRleHQ6IHtpdGVtOiBpdGVtfVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICA8YSBjbGFzcz1cInNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX3JlbW92ZVwiICpuZ0lmPVwiYWxsb3dSZXNldCAmJiAhZGlzYWJsZWRcIiAoY2xpY2spPVwiIWRpc2FibGVkICYmIHJlbW92ZU9uZSgkaW5kZXgsICRldmVudClcIj5cclxuICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgPC9saT5cclxuICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtIHNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2lucHV0XCIgW2NsYXNzLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2hpZGVdPVwiSW5wdXRIaWRlXCI+XHJcbiAgICAgICAgPGlucHV0IGF1dG9jb21wbGV0ZT1cIm9mZlwiICNpbnB1dENvbnRyb2w9XCJuZ01vZGVsXCIgW25hbWVdPVwibmFtZVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIFsobmdNb2RlbCldPVwicXVlcnlcIiBbcGxhY2Vob2xkZXJdPVwib3V0cHV0Lmxlbmd0aCA9PSAwIHx8IChtdWx0aXBsZSAmJiBvdXRwdXQubGVuZ3RoIDwgbXVsdGlwbGVMaW1pdCkgPyBwbGFjZWhvbGRlciA6ICcnXCJcclxuICAgICAgICAgIChpbnB1dCk9XCJ1cGRhdGVPcHRpb25zSW5EZWxheSgpXCIgKGtleWRvd24pPVwia2V5RG93bigkZXZlbnQpXCIgLz5cclxuICAgICAgPC9saT5cclxuICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LXNlYXJjaC1saXN0LWl0ZW0gc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fbG9hZGVyLWNlbnRlclwiIFtoaWRkZW5dPVwiIWRhdGFMaXN0U3ViIHx8IGRhdGFMaXN0U3ViLmNsb3NlZFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9sb2FkZXJcIj48L2Rpdj5cclxuICAgICAgPC9saT5cclxuXHJcbiAgICAgIDxzcGFuIGNsYXNzPVwiYXJyb3dcIiAoY2xpY2spPVwidG9nZ2xlRHJvcGRvd24oJGV2ZW50KVwiPlxyXG4gICAgICA8L3NwYW4+XHJcbiAgICA8L3VsPlxyXG4gIDwvZGl2PlxyXG5cclxuICA8ZGl2IGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duXCIgKm5nSWY9XCJpc09wZW5cIj5cclxuICAgIDx1bCBjbGFzcz1cInNlbGVjdC1kcm9wZG93bi1vcHRncm91cFwiPlxyXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIURyb3Bkb3duVGVtcGxhdGU7IGVsc2UgZHJvcGRvd25UXCI+XHJcbiAgICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvblwiICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgT3B0aW9uczsgbGV0IGk9aW5kZXhcIiAobW91c2Vkb3duKT1cInNlbGVjdE9uZSgkZXZlbnQsIG9wdGlvbilcIlxyXG4gICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJpID09PSBzZWxlY3RvclBvc2l0aW9uXCIgW2lubmVySFRNTF09XCJnZXREcm9wZG93bkZvcm1hdHRlZChvcHRpb24pXCI+XHJcbiAgICAgICAgPC9saT5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcblxyXG4gICAgICA8bmctdGVtcGxhdGUgI2Ryb3Bkb3duVD5cclxuICAgICAgICA8bGkgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXAtb3B0aW9uXCIgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBPcHRpb25zOyBsZXQgaT1pbmRleFwiIChtb3VzZWRvd24pPVwic2VsZWN0T25lKCRldmVudCwgb3B0aW9uKVwiXHJcbiAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cImkgPT09IHNlbGVjdG9yUG9zaXRpb25cIj5cclxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJEcm9wZG93blRlbXBsYXRlOyBjb250ZXh0OiB7aXRlbTogb3B0aW9ufVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgIDwvbGk+XHJcbiAgICAgIDwvbmctdGVtcGxhdGU+XHJcblxyXG4gICAgICA8bGkgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXAtb3B0aW9uIGxvYWRlclwiICpuZ0lmPVwiZGF0YUxpc3RTdWIgJiYgIWRhdGFMaXN0U3ViLmNsb3NlZFwiPlxyXG4gICAgICAgIMOQwpfDkMKww5DCs8ORwoDDkcKDw5DCt8OQwrrDkMKwXHJcbiAgICAgIDwvbGk+XHJcbiAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb24gbG9hZGVyXCIgKG1vdXNlZG93bik9XCJBZGROZXdPYmplY3QoQ3JlYXRlTmV3KHF1ZXJ5KSk7XCIgW2NsYXNzLmFjdGl2ZV09XCJzZWxlY3RvclBvc2l0aW9uID09PSBPcHRpb25zLmxlbmd0aFwiXHJcbiAgICAgICAgKm5nSWY9XCJTaG93TmV3XCI+XHJcblxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjcmVhdGVUZW1wbGF0ZTsgZWxzZSB0ZW1wbGF0ZVdpdGhNZXNzYWdlXCI+XHJcbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY3JlYXRlVGVtcGxhdGUudGVtcGxhdGVSZWY7IGNvbnRleHQ6IHtxdWVyeTogcXVlcnl9XCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcblxyXG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjdGVtcGxhdGVXaXRoTWVzc2FnZT5cclxuICAgICAgICAgIHt7IG5ld01lc3NhZ2UgfX1cclxuICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICA8L2xpPlxyXG4gICAgICA8bGkgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXAtb3B0aW9uIGxvYWRlclwiICpuZ0lmPVwiU2hvd0VtcHR5XCI+XHJcbiAgICAgICAgw5DCn8ORwoPDkcKBw5HCgsOQwr5cclxuICAgICAgPC9saT5cclxuICAgIDwvdWw+XHJcbiAgICA8ZGl2IGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLXBhZ2VyXCIgKm5nSWY9XCJjdXJyZW50Q2FjaGUgJiYgY3VycmVudENhY2hlLmNvdW50UGFnZXMgPiAxXCI+XHJcbiAgICAgIDxwIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLXBhZ2VyLXBhZ2VcIj5cclxuICAgICAgICB7eyBjdXJyZW50Q2FjaGUuY3VycmVudFBhZ2UgfCBudW1iZXIgfX0gLyB7eyBjdXJyZW50Q2FjaGUuY291bnRQYWdlcyB8IG51bWJlciB9fVxyXG4gICAgICA8L3A+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tcGFnZXItbG9hZG1vcmVcIiAqbmdJZj1cImN1cnJlbnRDYWNoZS5jb3VudFBhZ2VzID4gMSAmJiBjdXJyZW50Q2FjaGUuY3VycmVudFBhZ2UgPCBjdXJyZW50Q2FjaGUuY291bnRQYWdlc1wiXHJcbiAgICAgICAgKG1vdXNlZG93bik9XCJuZXh0UGFnZSgkZXZlbnQpXCI+XHJcbiAgICAgICAgw5DCl8OQwrDDkMKzw5HCgMORwoPDkMK3w5DCuMORwoLDkcKMIMOQwrXDkcKJw5HCkVxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuYCxcclxuICBzdHlsZXM6IFtgLnZpYm9yIGEsLnZpYm9yIGRpdiwudmlib3IgbGFiZWwsLnZpYm9yIGxlZ2VuZCwudmlib3Igc3Bhbiwudmlib3IgdWx7bWFyZ2luOjA7cGFkZGluZzowO2JvcmRlcjowfS52aWJvciBhLC52aWJvciBidXR0b24sLnZpYm9yIGlucHV0e291dGxpbmU6MH0udmlib3Igb2wsLnZpYm9yIHVse2xpc3Qtc3R5bGU6bm9uZX0udmlib3IgaW5wdXR7cGFkZGluZzowO21hcmdpbjowO2JvcmRlcjowO2ZvbnQ6aW5oZXJpdH0udmlib3J7cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTpibG9jaztmb250LWZhbWlseTotYXBwbGUtc3lzdGVtLEJsaW5rTWFjU3lzdGVtRm9udCwgXCJTZWdvZSBVSVwiLFJvYm90byxIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZiwgXCJBcHBsZSBDb2xvciBFbW9qaVwiLFwiU2Vnb2UgVUkgRW1vamlcIixcIlNlZ29lIFVJIFN5bWJvbFwifS52aWJvciAuc2VsZWN0LXNlYXJjaHtwb3NpdGlvbjpyZWxhdGl2ZX0udmlib3IgLnNlbGVjdC1zZWFyY2ggLmFycm93e2NvbnRlbnQ6XCJcIjtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDoxM3B4O3RvcDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKTtkaXNwbGF5OmJsb2NrO3dpZHRoOjE2cHg7aGVpZ2h0OjE2cHg7YmFja2dyb3VuZC1pbWFnZTp1cmwoZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCamJHRnpjejBpYm1NdGFXTnZiaUJuYkhsd2FDSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklpQjNhV1IwYUQwaU1UWWlJR2hsYVdkb2REMGlNVFlpSUhacFpYZENiM2c5SWpBZ01DQXhOaUF4TmlJK0RRb2dJRHh3WVhSb0lHWnBiR3c5SWlNeVl6SmpNbU1pSUdROUlrMDRJREV4TGpSTU1pNDJJRFlnTkNBMExqWnNOQ0EwSURRdE5Fd3hNeTQwSURZaUx6NE5Dand2YzNablBnMEspO3RyYW5zaXRpb246LXdlYmtpdC10cmFuc2Zvcm0gLjE1cyBlYXNlLWluLW91dDt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMTVzIGVhc2UtaW4tb3V0O3RyYW5zaXRpb246dHJhbnNmb3JtIC4xNXMgZWFzZS1pbi1vdXQsLXdlYmtpdC10cmFuc2Zvcm0gLjE1cyBlYXNlLWluLW91dH0udmlib3IgLnNlbGVjdC1zZWFyY2ggLmFycm93OmJlZm9yZXtkaXNwbGF5Om5vbmV9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9pbnB1dCBpbnB1dHt3aWR0aDoxMDAlfS52aWJvciAuc2VsZWN0LWRyb3Bkb3due3Bvc2l0aW9uOmFic29sdXRlO3RvcDoxMDAlO2xlZnQ6MDtyaWdodDowO3otaW5kZXg6Mn0udmlib3IgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2xvYWRlci1jZW50ZXJ7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MTBweDt0b3A6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO3dpZHRoOjIxcHg7aGVpZ2h0OjIxcHg7YmFja2dyb3VuZDojZmZmO3otaW5kZXg6Mn0udmlib3IgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2xvYWRlci1jZW50ZXJbaGlkZGVuXXtkaXNwbGF5Om5vbmV9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9sb2FkZXItY2VudGVyIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9sb2FkZXJ7d2lkdGg6MTZweDtoZWlnaHQ6MTZweDtib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym9yZGVyLXdpZHRoOjJweDtib3JkZXItc3R5bGU6c29saWQ7Ym9yZGVyLWNvbG9yOiMyMjI3MmUgcmdiYSgzNCwzOSw0NiwuNCkgcmdiYSgzNCwzOSw0NiwuNCk7Ym9yZGVyLXJhZGl1czoxMDAlOy13ZWJraXQtYW5pbWF0aW9uOi40NXMgbGluZWFyIGluZmluaXRlIGNsb2Nrd2lzZTthbmltYXRpb246LjQ1cyBsaW5lYXIgaW5maW5pdGUgY2xvY2t3aXNlfS52aWJvciAuc2VsZWN0LWRyb3Bkb3duLW9wdGdyb3Vwe21heC1oZWlnaHQ6MzAwcHg7b3ZlcmZsb3cteTphdXRvO2JvcmRlcjoxcHggc29saWQgI2Q1ZDlkZTtib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOjVweDtib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czo1cHg7Ym9yZGVyLXRvcDowfS52aWJvciAuc2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvbnttaW4taGVpZ2h0OjMwcHg7cGFkZGluZzoxMHB4IDE1cHh9LnZpYm9yIC5zZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXAtb3B0aW9uOmhvdmVye2JhY2tncm91bmQtY29sb3I6cmdiYSg2NiwxMzIsMjE1LC4xKX0udmlib3IgLm9wZW4tdmlib3IgLnNlbGVjdC1zZWFyY2ggLmFycm93ey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgxODBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMTgwZGVnKX1ALXdlYmtpdC1rZXlmcmFtZXMgY2xvY2t3aXNle3Rvey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpIHRyYW5zbGF0ZXooMCk7dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpIHRyYW5zbGF0ZXooMCl9fUBrZXlmcmFtZXMgY2xvY2t3aXNle3Rvey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpIHRyYW5zbGF0ZXooMCk7dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpIHRyYW5zbGF0ZXooMCl9fWBdLFxyXG4gIHByb3ZpZGVyczogW3tcclxuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdWaWJvckNvbXBvbmVudCksXHJcbiAgICBtdWx0aTogdHJ1ZVxyXG4gIH1dXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ1ZpYm9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcclxuICAvLyBMb2NhbCBWYXJpYWJsZVxyXG4gIHB1YmxpYyBfbW9kZWw6IGFueTtcclxuXHJcbiAgcHJpdmF0ZSBmaXJzdExvYWQgPSBmYWxzZTtcclxuICBwcml2YXRlIG9wdGlvbnM6IEFycmF5PGFueT47XHJcbiAgcHVibGljIG91dHB1dDogQXJyYXk8YW55PjtcclxuXHJcbiAgcHVibGljIGlzT3BlbjogYm9vbGVhbjtcclxuXHJcbiAgcHJpdmF0ZSBvbGRRdWVyeTogc3RyaW5nO1xyXG4gIHB1YmxpYyBxdWVyeTogc3RyaW5nO1xyXG5cclxuICBwdWJsaWMgc2VsZWN0b3JQb3NpdGlvbiA9IDA7XHJcbiAgcHJpdmF0ZSB3YWl0VGltZSA9IDUwMDtcclxuXHJcbiAgcHJpdmF0ZSBlbDogRWxlbWVudDsgICAgICAgICAgIC8vIHRoaXMgY29tcG9uZW50ICBlbGVtZW50IGA8dmlib3I+YFxyXG4gIHByaXZhdGUgaW5wdXRFbDogSFRNTElucHV0RWxlbWVudDsgLy8gYDxpbnB1dD5gIGVsZW1lbnQgaW4gYDx2aWJvcj5gIGZvciBhdXRvIGNvbXBsZXRlXHJcbiAgQFZpZXdDaGlsZCgnaW5wdXRDb250cm9sJykgcHVibGljIGlucHV0Q29udHJvbDogTmdNb2RlbDtcclxuXHJcbiAgLy8gSW5wdXRzICYgT3V0cHV0c1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBtdWx0aXBsZSA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBtdWx0aXBsZUxpbWl0ID0gSW5maW5pdHk7XHJcbiAgQElucHV0KCkgcHVibGljIGNvdW50T25QYWdlID0gMTA7XHJcblxyXG4gIEBJbnB1dCgpIHB1YmxpYyBwbGFjZWhvbGRlciA9ICdWaWJvcic7XHJcbiAgQElucHV0KCkgcHVibGljIG5hbWU6IHN0cmluZztcclxuICBASW5wdXQoKSBwdWJsaWMgcmVxdWlyZWQgPSBmYWxzZTtcclxuICBASW5wdXQoKSBwdWJsaWMgYWxsb3dSZXNldCA9IHRydWU7XHJcbiAgcHVibGljIGRpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gIC8vIMOQwp7DkcKCw5DCvsOQwrHDkcKAw5DCsMOQwrbDkMK1w5DCvcOQwrjDkMK1IMORwoHDkMK/w5DCuMORwoHDkMK6w5DCvsOQwrJcclxuICBAQ29udGVudENoaWxkKFZpYm9yQm90aERpcmVjdGl2ZSkgcHVibGljIGJvdGhUZW1wbGF0ZTogVmlib3JCb3RoRGlyZWN0aXZlO1xyXG4gIEBDb250ZW50Q2hpbGQoVmlib3JEcm9wZG93bkRpcmVjdGl2ZSkgcHVibGljIGRyb3Bkb3duVGVtcGxhdGU6IFZpYm9yRHJvcGRvd25EaXJlY3RpdmU7XHJcbiAgQENvbnRlbnRDaGlsZChWaWJvclNlbGVjdGVkRGlyZWN0aXZlKSBwdWJsaWMgc2VsZWN0ZWRUZW1wbGF0ZTogVmlib3JTZWxlY3RlZERpcmVjdGl2ZTtcclxuICBAQ29udGVudENoaWxkKFZpYm9yQ3JlYXRlRGlyZWN0aXZlKSBwdWJsaWMgY3JlYXRlVGVtcGxhdGU6IFZpYm9yQ3JlYXRlRGlyZWN0aXZlO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBsaXN0Rm9ybWF0dGVyOiAoYXJnOiBhbnksIHZhbHVlOiBzdHJpbmcpID0+IHN0cmluZztcclxuICBASW5wdXQoKSBwdWJsaWMgZHJvcGRvd25Gb3JtYXR0ZXI6IChhcmc6IGFueSwgdmFsdWU6IHN0cmluZykgPT4gc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyB2aWV3UHJvcGVydHkgPSAnTmFtZSc7ICAvLyDDkMKfw5DCvsOQwrvDkMK1IMOQwrTDkMK7w5HCjyDDkMK0w5DCtcORwoTDkMK+w5DCu8ORwoLDkMK9w5DCvsOQwrPDkMK+IMOQwr7DkcKCw5DCvsOQwrHDkcKAw5DCsMOQwrbDkMK1w5DCvcOQwrjDkcKPXHJcblxyXG4gIEBJbnB1dCgpIHB1YmxpYyBtb2RlbFByb3BlcnR5ID0gJ2lkJzsgIC8vIMOQwqLDkMK+LCDDkcKHw5HCgsOQwr4gw5DCt8OQwrDDkMK/w5DCuMORwoHDkcKLw5DCssOQwrDDkMK1w5HCgsORwoHDkcKPIMOQwrIgw5DCnMOQwr7DkMK0w5DCtcOQwrvDkcKMXHJcbiAgQElucHV0KCkgcHVibGljIHByZWxvYWRQcm9wZXJ0eSA9ICdpZHMnOyAvLyDDkMKaw5DCu8ORwo7DkcKHIMOQwrfDkMKww5DCv8ORwoDDkMK+w5HCgcOQwrAgw5DCuiDDkcKBw5DCtcORwoDDkMKyw5DCtcORwoDDkcKDIMOQwrTDkMK7w5HCjyDDkMK/w5HCgMOQwrXDkMK0w5DCt8OQwrDDkMKzw5HCgMORwoPDkMK3w5DCusOQwrgsIMOQwrXDkcKBw5DCu8OQwrggdW5kZWZpbmVkIMOQwrfDkMKww5DCv8OQwrjDkcKBw5HCi8OQwrLDkMKww5DCtcORwoLDkcKBw5HCjyDDkMKyw5DCtcORwoHDkcKMIMOQwr7DkMKxw5HCisOQwrXDkMK6w5HCglxyXG4gIEBJbnB1dCgpIHB1YmxpYyBwcmVsb2FkRmllbGQ6IHN0cmluZyA9IHVuZGVmaW5lZDsgLy8gw5DCl8OQwr3DkMKww5HCh8OQwrXDkMK9w5DCuMOQwrUgw5DCv8OQwr7DkMK7w5HCjywgw5DCusOQwr7DkcKCw5DCvsORwoDDkMK1IMOQwr3DkMK1w5DCvsOQwrHDkcKFw5DCvsOQwrTDkMK4w5DCvMOQwr4gw5DCvsORwoLDkMK/w5HCgMOQwrDDkMKyw5DCuMORwoLDkcKMIMOQwrIgw5DCt8OQwrDDkMK/w5HCgMOQwr7DkcKBLlxyXG4gIEBJbnB1dCgpIHB1YmxpYyBzZWFyY2hQcm9wZXJ0eSA9ICdxdWVyeSc7XHJcblxyXG4gIEBJbnB1dCgpIHB1YmxpYyBkYXRhTGlzdDogKChwYXJhbTogT2JqZWN0LCBwYWdlOiBudW1iZXIsIGNvdW50T25QYWdlPzogbnVtYmVyKSA9PiBPYnNlcnZhYmxlPElEYXRhUmVzcG9uc2U+KSB8IEFycmF5PGFueT47XHJcbiAgQElucHV0KCkgcHVibGljIGV4Y2x1ZGVMaXN0OiBBcnJheTxhbnk+O1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBhZGRpdGlvbmFsRmlsdGVyID0ge307XHJcbiAgQElucHV0KCkgcHVibGljIG9ubHlFbWl0dGVyOiBib29sZWFuO1xyXG4gIEBPdXRwdXQoJ2NoYW5nZUZ1bGxNb2RlbCcpIHB1YmxpYyBjaGFuZ2VGdWxsTW9kZWw6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuXHJcbiAgQElucHV0KCkgcHVibGljIG5ld01lc3NhZ2U6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICBASW5wdXQoKSBwdWJsaWMgQ3JlYXRlTmV3OiAocXVlcnk6IHN0cmluZykgPT4gT2JzZXJ2YWJsZTxhbnk+IHwgYW55ID0gKHF1ZXJ5OiBzdHJpbmcpID0+IHtcclxuICAgIHJldHVybiBxdWVyeTtcclxuICB9XHJcblxyXG5cclxuICAvLyBTdWJzY3JpcHRpb25cclxuICBwdWJsaWMgZGF0YUxpc3RTdWI6IFN1YnNjcmlwdGlvbjtcclxuXHJcblxyXG4gIC8vIE9QVElPTlNcclxuICBwdWJsaWMgVHJhY2tCeUZuKGluZGV4OiBudW1iZXIpOiBhbnkge1xyXG4gICAgcmV0dXJuIGluZGV4O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNob3dEcm9wZG93bkxpc3QoZXZlbnQ6IEZvY3VzRXZlbnQgfCBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMubXVsdGlwbGUgJiYgdGhpcy5vdXRwdXQubGVuZ3RoID49IHRoaXMubXVsdGlwbGVMaW1pdCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCdvcGVuLXZpYm9yJyk7XHJcbiAgICB0aGlzLmlucHV0RWwuZm9jdXMoKTtcclxuICAgIHRoaXMudXBkYXRlT3B0aW9ucygpO1xyXG4gICAgdGhpcy5vblRvdWNoZWQoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGlkZURyb3Bkb3duTGlzdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZSgnb3Blbi12aWJvcicpO1xyXG4gICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcclxuICAgIHRoaXMuaW5wdXRFbC5ibHVyKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaGlkZURyb3Bkb3duTGlzdFdpdGhEZWxheSgpOiB2b2lkIHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLmhpZGVEcm9wZG93bkxpc3QoKTtcclxuICAgIH0sIDEwMCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdG9nZ2xlRHJvcGRvd24oZXZlbnQ6IEV2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuaXNPcGVuKSB7XHJcbiAgICAgIHRoaXMuaGlkZURyb3Bkb3duTGlzdCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zaG93RHJvcGRvd25MaXN0KHVuZGVmaW5lZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRlbGF5OiBGdW5jdGlvbiA9IChmdW5jdGlvbiAoKTogRnVuY3Rpb24ge1xyXG4gICAgbGV0IHRpbWVyID0gMDtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoY2FsbGJhY2s6IGFueSwgbXM6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xyXG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQoY2FsbGJhY2ssIG1zKTtcclxuICAgIH07XHJcbiAgfSkoKTtcclxuXHJcbiAgcHVibGljIHVwZGF0ZU9wdGlvbnMoKTogdm9pZCB7XHJcbiAgICB0aGlzLmlzT3BlbiA9IHRydWU7XHJcbiAgICBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgIHRoaXMub3B0aW9ucyA9IHRoaXMuZGF0YUxpc3QuZmlsdGVyKGRhdGEgPT4ge1xyXG4gICAgICAgIGlmICghdGhpcy5xdWVyeSB8fCB0aGlzLnF1ZXJ5Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBmOiBhbnkgPSBmZXRjaEZyb21PYmplY3QoZGF0YSwgdGhpcy5zZWFyY2hQcm9wZXJ0eSk7XHJcbiAgICAgICAgaWYgKGYgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZikuaW5kZXhPZih0aGlzLnF1ZXJ5KSA+PSAwO1xyXG4gICAgICB9KS5maWx0ZXIoZGF0YSA9PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmV4Y2x1ZGVMaXN0KSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBkID0gZmV0Y2hGcm9tT2JqZWN0KGRhdGEsIHRoaXMubW9kZWxQcm9wZXJ0eSkudmFsdWVPZigpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmV4Y2x1ZGVMaXN0LmZpbmRJbmRleChleCA9PiB7XHJcbiAgICAgICAgICBsZXQgYSA9IGZldGNoRnJvbU9iamVjdChleCwgdGhpcy5tb2RlbFByb3BlcnR5KS52YWx1ZU9mKCk7XHJcbiAgICAgICAgICByZXR1cm4gZGVlcEVxdWFsKGQsIGEpO1xyXG4gICAgICAgIH0pIDwgMDtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICBpZiAodGhpcy5kYXRhTGlzdFN1YikgeyB0aGlzLmRhdGFMaXN0U3ViLnVuc3Vic2NyaWJlKCk7IH1cclxuICAgICAgaWYgKCF0aGlzLmN1cnJlbnRDYWNoZSkge1xyXG4gICAgICAgIHRoaXMuY3VycmVudENhY2hlID0ge1xyXG4gICAgICAgICAgY291bnRFbGVtZW50OiAwLFxyXG4gICAgICAgICAgY291bnRQYWdlczogMSxcclxuICAgICAgICAgIGN1cnJlbnRQYWdlOiAxLFxyXG4gICAgICAgICAgb2JqZWN0czogW10sXHJcbiAgICAgICAgICBxdWVyeTogdGhpcy5xdWVyeSxcclxuICAgICAgICAgIHBhcmFtczogT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5hZGRpdGlvbmFsRmlsdGVyKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5jYWNoZUxhenlEYXRhLnB1c2godGhpcy5jdXJyZW50Q2FjaGUpO1xyXG5cclxuICAgICAgICBsZXQgcGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5hZGRpdGlvbmFsRmlsdGVyKSBhcyBhbnk7XHJcbiAgICAgICAgcGFyYW1zW3RoaXMuc2VhcmNoUHJvcGVydHldID0gdGhpcy5xdWVyeTtcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhTGlzdFN1YiA9ICg8T2JzZXJ2YWJsZTxJRGF0YVJlc3BvbnNlPj50aGlzLmRhdGFMaXN0KHBhcmFtcywgMSwgdGhpcy5jb3VudE9uUGFnZSkpLnN1YnNjcmliZShhbnN3ZXIgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jdXJyZW50Q2FjaGUub2JqZWN0cyA9IHRoaXMuY3VycmVudENhY2hlLm9iamVjdHMuY29uY2F0KGFuc3dlci5saXN0KTtcclxuICAgICAgICAgIHRoaXMuY3VycmVudENhY2hlLmNvdW50RWxlbWVudCA9IGFuc3dlci5oZWFkZXJzWydjb3VudCddO1xyXG4gICAgICAgICAgdGhpcy5jdXJyZW50Q2FjaGUuY291bnRQYWdlcyA9IE1hdGguY2VpbCh0aGlzLmN1cnJlbnRDYWNoZS5jb3VudEVsZW1lbnQgLyB0aGlzLmNvdW50T25QYWdlKTtcclxuICAgICAgICB9LCAoKSA9PiB7IH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdXBkYXRlT3B0aW9uc0luRGVsYXkoKTogdm9pZCB7XHJcbiAgICBsZXQgZGVsYXlNczogbnVtYmVyID0gdGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEFycmF5ID8gMTAgOiB0aGlzLndhaXRUaW1lO1xyXG5cclxuICAgIC8vIGV4ZWN1dGluZyBhZnRlciB1c2VyIHN0b3BwZWQgdHlwaW5nXHJcbiAgICB0aGlzLmRlbGF5KCgpID0+IHtcclxuICAgICAgdGhpcy5vbGRRdWVyeSA9IHRoaXMucXVlcnk7XHJcbiAgICAgIHRoaXMuY3VycmVudENhY2hlID0gdGhpcy5HZXRDYWNoZSh0aGlzLnF1ZXJ5KTtcclxuICAgICAgdGhpcy51cGRhdGVPcHRpb25zKCk7XHJcbiAgICB9LCBkZWxheU1zKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZm9jdXNTZWxlY3RlZE9wdGlvbigpOiB2b2lkIHtcclxuICAgIGxldCBsaXN0OiBhbnkgPSA8SFRNTEVsZW1lbnQ+dGhpcy5lbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzZWxlY3QtZHJvcGRvd24nKVswXTtcclxuICAgIGxldCB0YXJnZXRMaTogYW55ID0gPEhUTUxFbGVtZW50PnRoaXMuZWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvbicpW3RoaXMuc2VsZWN0b3JQb3NpdGlvbl07XHJcbiAgICBzY3JvbGxBY3RpdmVPcHRpb24obGlzdCwgdGFyZ2V0TGkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGtleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5PcHRpb25zKSB7XHJcbiAgICAgIHRoaXMuc2hvd0Ryb3Bkb3duTGlzdCh1bmRlZmluZWQpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHRvdGFsTnVtSXRlbTogbnVtYmVyID0gdGhpcy5PcHRpb25zLmxlbmd0aDtcclxuXHJcbiAgICBpZiAodGhpcy5TaG93TmV3KSB7XHJcbiAgICAgIHRvdGFsTnVtSXRlbSsrO1xyXG4gICAgfVxyXG5cclxuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xyXG4gICAgICBjYXNlIDI3OiAvLyBFU0MsIGhpZGUgYXV0byBjb21wbGV0ZVxyXG4gICAgICAgIHRoaXMuaGlkZURyb3Bkb3duTGlzdCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAzODogLy8gVVAsIHNlbGVjdCB0aGUgcHJldmlvdXMgbGkgZWxcclxuICAgICAgICB0aGlzLnNlbGVjdG9yUG9zaXRpb24gPSAodG90YWxOdW1JdGVtICsgdGhpcy5zZWxlY3RvclBvc2l0aW9uIC0gMSkgJSB0b3RhbE51bUl0ZW07XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDQwOiAvLyBET1dOLCBzZWxlY3QgdGhlIG5leHQgbGkgZWwgb3IgdGhlIGZpcnN0IG9uZVxyXG4gICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNlbGVjdG9yUG9zaXRpb24gPSAodG90YWxOdW1JdGVtICsgdGhpcy5zZWxlY3RvclBvc2l0aW9uICsgMSkgJSB0b3RhbE51bUl0ZW07XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDEzOiAvLyBFTlRFUiwgY2hvb3NlIGl0ISFcclxuICAgICAgICBpZiAodG90YWxOdW1JdGVtID4gMCkge1xyXG4gICAgICAgICAgaWYgKHRoaXMuc2VsZWN0b3JQb3NpdGlvbiA9PT0gdGhpcy5PcHRpb25zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLkFkZE5ld09iamVjdCh0aGlzLkNyZWF0ZU5ldyh0aGlzLnF1ZXJ5KSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdE9uZShldmVudCwgdGhpcy5PcHRpb25zW3RoaXMuc2VsZWN0b3JQb3NpdGlvbl0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5TaG93TmV3KSB7XHJcbiAgICAgICAgICB0aGlzLkFkZE5ld09iamVjdCh0aGlzLkNyZWF0ZU5ldyh0aGlzLnF1ZXJ5KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgZGVmYXVsdDogYnJlYWs7XHJcbiAgICB9XHJcbiAgICB0aGlzLmZvY3VzU2VsZWN0ZWRPcHRpb24oKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZXh0UGFnZSgkZXZlbnQ6IEV2ZW50KTogdm9pZCB7XHJcbiAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAvLyBWYWxpZGF0b3JzXHJcbiAgICBpZiAoISh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgRnVuY3Rpb24pKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignRGF0YSBMaXN0IG1hc3QgYmUgRnVuY3Rpb24nKTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5jdXJyZW50Q2FjaGUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGb3IgbmV4dCBwYWdlIG5lZWQgY2FjaGUgZm9yIGZpcnN0IFBhZ2UnKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmN1cnJlbnRDYWNoZS5jdXJyZW50UGFnZSA+PSB0aGlzLmN1cnJlbnRDYWNoZS5jb3VudFBhZ2VzKSB7IHRocm93IG5ldyBFcnJvcignTWF4IFBhZ2UgTGltaXQnKTsgfVxyXG5cclxuICAgIGlmICh0aGlzLmRhdGFMaXN0U3ViKSB7IHRoaXMuZGF0YUxpc3RTdWIudW5zdWJzY3JpYmUoKTsgfVxyXG5cclxuICAgIGxldCBwYXJhbXM6IGFueSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYWRkaXRpb25hbEZpbHRlcik7XHJcbiAgICBwYXJhbXNbdGhpcy5zZWFyY2hQcm9wZXJ0eV0gPSB0aGlzLnF1ZXJ5O1xyXG5cclxuICAgIHRoaXMuZGF0YUxpc3RTdWIgPSB0aGlzLmRhdGFMaXN0KHBhcmFtcywgdGhpcy5jdXJyZW50Q2FjaGUuY3VycmVudFBhZ2UgKyAxLCB0aGlzLmNvdW50T25QYWdlKS5zdWJzY3JpYmUoYW5zd2VyID0+IHtcclxuICAgICAgdGhpcy5jdXJyZW50Q2FjaGUuY3VycmVudFBhZ2UrKztcclxuICAgICAgdGhpcy5jdXJyZW50Q2FjaGUuY291bnRFbGVtZW50ID0gYW5zd2VyLmhlYWRlcnNbJ2NvdW50J107XHJcbiAgICAgIHRoaXMuY3VycmVudENhY2hlLmNvdW50UGFnZXMgPSBNYXRoLmNlaWwodGhpcy5jdXJyZW50Q2FjaGUuY291bnRFbGVtZW50IC8gdGhpcy5jb3VudE9uUGFnZSk7XHJcbiAgICAgIHRoaXMuY3VycmVudENhY2hlLm9iamVjdHMgPSB0aGlzLmN1cnJlbnRDYWNoZS5vYmplY3RzLmNvbmNhdChhbnN3ZXIubGlzdCk7XHJcbiAgICAgIHRoaXMuc2VsZWN0b3JQb3NpdGlvbiA9ICh0aGlzLmN1cnJlbnRDYWNoZS5jdXJyZW50UGFnZSAtIDEpICogdGhpcy5jb3VudE9uUGFnZSArIDE7XHJcbiAgICAgIHRoaXMuZm9jdXNTZWxlY3RlZE9wdGlvbigpO1xyXG4gICAgfSwgKCkgPT4geyB9KTtcclxuICB9XHJcblxyXG4gIC8vIE1PREVMXHJcbiAgcHJpdmF0ZSBjbGVhclByb3BlcnR5KCk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3RvclBvc2l0aW9uID0gMDtcclxuICAgIHRoaXMucXVlcnkgPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2VsZWN0T25lKCRldmVudDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQsIGRhdGE6IGFueSk6IHZvaWQge1xyXG4gICAgLy8gw5DCpMOQwrjDkMK7w5HCjMORwoLDkcKAIMOQwr3DkMK1w5DCvcORwoPDkMK2w5DCvcORwovDkcKFIMORwoHDkMK+w5DCscORwovDkcKCw5DCuMOQwrlcclxuICAgIGlmICgkZXZlbnQgaW5zdGFuY2VvZiBNb3VzZUV2ZW50ICYmICRldmVudC5idXR0b24gIT09IDApIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgaWYgKHRoaXMubXVsdGlwbGUgJiYgdGhpcy5vdXRwdXQubGVuZ3RoIDwgdGhpcy5tdWx0aXBsZUxpbWl0KSB7XHJcbiAgICAgIHRoaXMub3V0cHV0LnB1c2goZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKCF0aGlzLm11bHRpcGxlKSB7XHJcbiAgICAgIHRoaXMub3V0cHV0ID0gW2RhdGFdO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jaGFuZ2VGdWxsTW9kZWwuZW1pdCh0aGlzLm91dHB1dCk7XHJcbiAgICB0aGlzLk1vZGVsID0gdGhpcy5WYWx1ZUZyb21PdXRwdXQ7XHJcbiAgICB0aGlzLmNsZWFyUHJvcGVydHkoKTtcclxuICAgIHRoaXMuaGlkZURyb3Bkb3duTGlzdCgpO1xyXG4gICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfTtcclxuXHJcbiAgcHVibGljIHJlbW92ZU9uZShpbmRleDogbnVtYmVyLCBldmVudDogRXZlbnQpOiB2b2lkIHtcclxuICAgIGlmIChldmVudCkge1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgdGhpcy5vdXRwdXQuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIHRoaXMuTW9kZWwgPSB0aGlzLlZhbHVlRnJvbU91dHB1dDtcclxuXHJcbiAgICAvLyBzZXQgY2xhc3NcclxuICAgIHRoaXMub25Ub3VjaGVkKCk7XHJcbiAgICB0aGlzLmlucHV0Q29udHJvbC5jb250cm9sLm1hcmtBc1RvdWNoZWQoKTtcclxuXHJcbiAgICAvLyBvcGVuIGRyb3Bkb3duXHJcbiAgICBpZiAodGhpcy5yZXF1aXJlZCkge1xyXG4gICAgICB0aGlzLnNob3dEcm9wZG93bkxpc3QodW5kZWZpbmVkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIEZPUk1BVFRJTkdcclxuXHJcbiAgcHVibGljIGdldCBTZWxlY3RlZFRlbXBsYXRlKCk6IFRlbXBsYXRlUmVmPGFueT4ge1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRUZW1wbGF0ZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZFRlbXBsYXRlLnRlbXBsYXRlUmVmO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmJvdGhUZW1wbGF0ZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5ib3RoVGVtcGxhdGUudGVtcGxhdGVSZWY7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBEcm9wZG93blRlbXBsYXRlKCk6IFRlbXBsYXRlUmVmPGFueT4ge1xyXG4gICAgaWYgKHRoaXMuZHJvcGRvd25UZW1wbGF0ZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5kcm9wZG93blRlbXBsYXRlLnRlbXBsYXRlUmVmO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmJvdGhUZW1wbGF0ZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5ib3RoVGVtcGxhdGUudGVtcGxhdGVSZWY7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldExpc3RGb3JtYXR0ZWQoZGF0YTogYW55KTogc3RyaW5nIHtcclxuICAgIGxldCBmb3JtYXR0ZXI6IGFueSA9IHRoaXMubGlzdEZvcm1hdHRlciB8fCBkZWZhdWx0Rm9ybWF0dGVyO1xyXG4gICAgcmV0dXJuIGZvcm1hdHRlci5hcHBseSh0aGlzLCBbZGF0YSwgdGhpcy52aWV3UHJvcGVydHldKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXREcm9wZG93bkZvcm1hdHRlZChkYXRhOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgbGV0IGZvcm1hdHRlcjogYW55ID0gdGhpcy5kcm9wZG93bkZvcm1hdHRlciB8fCBkZWZhdWx0Rm9ybWF0dGVyO1xyXG4gICAgcmV0dXJuIGZvcm1hdHRlci5hcHBseSh0aGlzLCBbZGF0YSwgdGhpcy52aWV3UHJvcGVydHldKTtcclxuICB9XHJcblxyXG4gIC8vIElOSVRcclxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAvLyB0aGlzLk1vZGVsID0gdGhpcy5WYWx1ZUZyb21PdXRwdXQ7IMOQwq3DkcKCw5DCviDDkMKyw5HCgMOQwr7DkMK0w5DCtSDDkcKCw5HCg8ORwoIgw5HCgsOQwr7DkMK2w5DCtSDDkcKDw5DCtsOQwrUgw5DCvcOQwrUgw5DCvcOQwrDDkMK0w5DCvi5cclxuICAgIHRoaXMuZWwgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd2aWJvcicpLml0ZW0oMCk7XHJcbiAgICB0aGlzLmlucHV0RWwgPSA8SFRNTElucHV0RWxlbWVudD4odGhpcy5lbC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhpbnB1dHM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIGlmIChpbnB1dHNbJ2RhdGFMaXN0J10gJiYgaW5wdXRzWydkYXRhTGlzdCddLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICAvLyBPdXRwdXRcclxuICAgICAgaWYgKHRoaXMuTW9kZWwgPT09IHVuZGVmaW5lZCB8fCB0aGlzLk1vZGVsID09IG51bGwpIHtcclxuICAgICAgICB0aGlzLm91dHB1dCA9IFtdO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlRnVsbE1vZGVsLmVtaXQodGhpcy5vdXRwdXQpO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuTW9kZWwgaW5zdGFuY2VvZiBBcnJheSAmJiB0aGlzLm11bHRpcGxlKSB7XHJcbiAgICAgICAgdGhpcy5PdXRwdXQgPSB0aGlzLk1vZGVsO1xyXG4gICAgICB9IGVsc2UgaWYgKCEodGhpcy5Nb2RlbCBpbnN0YW5jZW9mIEFycmF5KSAmJiAhdGhpcy5tdWx0aXBsZSkge1xyXG4gICAgICAgIHRoaXMuT3V0cHV0ID0gW3RoaXMuTW9kZWxdO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMub3V0cHV0IHx8ICF0aGlzLm91dHB1dC5sZW5ndGgpIHtcclxuICAgICAgICAgIHRoaXMuTW9kZWwgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlucHV0c1snbXVsdGlwbGUnXSkge1xyXG4gICAgICBpZiAoaW5wdXRzWydtdWx0aXBsZSddLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCgnbXVsdGlwbGUnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ211bHRpcGxlJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoaW5wdXRzWydhZGRpdGlvbmFsRmlsdGVyJ10pIHtcclxuICAgICAgdGhpcy5jdXJyZW50Q2FjaGUgPSB0aGlzLkdldENhY2hlKHRoaXMucXVlcnkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxEaXZFbGVtZW50Pikge1xyXG4gICAgdGhpcy5vdXRwdXQgPSBbXTtcclxuICB9XHJcblxyXG4gIC8vIEZPUk1TXHJcbiAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgLy8gw5DCncOQwr7DkcKAw5DCvMOQwrDDkMK7w5HCjMOQwr3DkcKLw5DCuSB1cGRhdGUgw5DCvMOQwr7DkMK0w5DCtcOQwrvDkMK4XHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgaWYgKCh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5ICYmICF0aGlzLm11bHRpcGxlKSB8fCAoISh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSAmJiB0aGlzLm11bHRpcGxlKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTW9kZWwgVHlwZSBFcnJvcicpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5ICYmIHRoaXMuTW9kZWwgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IHRoaXMuTW9kZWwubGVuZ3RoICYmIHZhbHVlLmV2ZXJ5KHYgPT4gdGhpcy5Nb2RlbC5pbmRleE9mKHYpID49IDApKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuTW9kZWwgPT09IHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZmlyc3RMb2FkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5Nb2RlbCA9IHZhbHVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uQ2hhbmdlOiBhbnkgPSAoKSA9PiB7IH07XHJcbiAgcHVibGljIG9uVG91Y2hlZDogYW55ID0gKCkgPT4geyB9O1xyXG5cclxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICAgIGlmIChpc0Rpc2FibGVkKSB7XHJcbiAgICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5lbC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcbiAgICB9XHJcbiAgICAvLyBkaXNhYmxlIG90aGVyIGNvbXBvbmVudHMgaGVyZVxyXG4gIH1cclxuXHJcbiAgc2V0IE1vZGVsKHZhbHVlOiBhbnkpIHtcclxuICAgIGlmICh0aGlzLm9ubHlFbWl0dGVyKSB7XHJcbiAgICAgIHRoaXMub3V0cHV0ID0gW107XHJcbiAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gT3V0cHV0XHJcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMub3V0cHV0ID0gW107XHJcbiAgICAgIHRoaXMuY2hhbmdlRnVsbE1vZGVsLmVtaXQodGhpcy5vdXRwdXQpO1xyXG4gICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5ICYmIHRoaXMubXVsdGlwbGUpIHtcclxuICAgICAgdGhpcy5PdXRwdXQgPSB2YWx1ZTtcclxuICAgIH0gZWxzZSBpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSAmJiAhdGhpcy5tdWx0aXBsZSkge1xyXG4gICAgICB0aGlzLk91dHB1dCA9IFt2YWx1ZV07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTW9kZWxcclxuICAgIHRoaXMuX21vZGVsID0gdmFsdWU7XHJcblxyXG4gICAgLy8gRm9ybXNcclxuICAgIHRoaXMub25DaGFuZ2UodGhpcy5fbW9kZWwpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IE1vZGVsKCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5fbW9kZWw7XHJcbiAgfVxyXG5cclxuICAvLyBQUk9QRVJUWVxyXG4gIGdldCBJbnB1dEhpZGUoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5vdXRwdXQubGVuZ3RoID49IHRoaXMubXVsdGlwbGVMaW1pdDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm91dHB1dC5sZW5ndGggPT09IDEgJiYgIXRoaXMuaXNPcGVuO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IFZhbHVlRnJvbU91dHB1dCgpOiBhbnkge1xyXG4gICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcclxuICAgICAgbGV0IHRtcDogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgICBmb3IgKGxldCBvIG9mIHRoaXMub3V0cHV0KSB7XHJcbiAgICAgICAgdG1wLnB1c2goZmV0Y2hGcm9tT2JqZWN0KG8sIHRoaXMubW9kZWxQcm9wZXJ0eSkpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0bXA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZmV0Y2hGcm9tT2JqZWN0KHRoaXMub3V0cHV0WzBdLCB0aGlzLm1vZGVsUHJvcGVydHkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0IE91dHB1dChuZXdWYWx1ZTogQXJyYXk8YW55Pikge1xyXG4gICAgbGV0IGRhdGFMaXN0OiBBcnJheTxhbnk+ID0gW107XHJcbiAgICBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgIGRhdGFMaXN0ID0gdGhpcy5kYXRhTGlzdDtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgIGlmIChuZXdWYWx1ZSAmJiBuZXdWYWx1ZS5sZW5ndGggJiYgdGhpcy5maXJzdExvYWQpIHtcclxuICAgICAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcclxuICAgICAgICB0aGlzLmZpcnN0TG9hZCA9IGZhbHNlO1xyXG4gICAgICAgIGlmICghdGhpcy5wcmVsb2FkUHJvcGVydHkpIHtcclxuICAgICAgICAgIHRoaXMub3V0cHV0ID0gbmV3VmFsdWU7XHJcbiAgICAgICAgICB0aGlzLmNoYW5nZUZ1bGxNb2RlbC5lbWl0KHRoaXMub3V0cHV0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcGFyYW1zW3RoaXMucHJlbG9hZFByb3BlcnR5XSA9IG5ld1ZhbHVlLm1hcCh2YWwgPT4gZmV0Y2hGcm9tT2JqZWN0KHZhbCwgdGhpcy5wcmVsb2FkRmllbGQpKTtcclxuICAgICAgICAgIHRoaXMuZGF0YUxpc3RTdWIgPSAoPE9ic2VydmFibGU8SURhdGFSZXNwb25zZT4+dGhpcy5kYXRhTGlzdChwYXJhbXMsIDEsIHRoaXMuY291bnRPblBhZ2UpKS5zdWJzY3JpYmUoYW5zd2VyID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vdXRwdXQgPSBhbnN3ZXIubGlzdDtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VGdWxsTW9kZWwuZW1pdCh0aGlzLm91dHB1dCk7XHJcbiAgICAgICAgICB9LCAoKSA9PiB7IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmNoYW5nZUZ1bGxNb2RlbC5lbWl0KHRoaXMub3V0cHV0KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm47XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5kYXRhTGlzdCA9PT0gdW5kZWZpbmVkKSB7IHJldHVybjsgfVxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2RhdGFMaXN0IHZhbHVlIEVycm9yJyk7XHJcbiAgICB9XHJcbiAgICBsZXQgbmV3T3V0cHV0OiBBcnJheTxhbnk+ID0gW107XHJcbiAgICBmb3IgKGxldCB2IG9mIG5ld1ZhbHVlKSB7XHJcbiAgICAgIGZvciAobGV0IGQgb2YgZGF0YUxpc3QpIHtcclxuICAgICAgICBsZXQgYSA9IGZldGNoRnJvbU9iamVjdChkLCB0aGlzLm1vZGVsUHJvcGVydHkpID8gZmV0Y2hGcm9tT2JqZWN0KGQsIHRoaXMubW9kZWxQcm9wZXJ0eSkudmFsdWVPZigpIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIGxldCBiID0gdiA/IHYudmFsdWVPZigpIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIGlmIChkZWVwRXF1YWwoYSwgYikpIHtcclxuICAgICAgICAgIG5ld091dHB1dC5wdXNoKGQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5vdXRwdXQgPSBuZXdPdXRwdXQ7XHJcbiAgICB0aGlzLmNoYW5nZUZ1bGxNb2RlbC5lbWl0KHRoaXMub3V0cHV0KTtcclxuICB9XHJcblxyXG4gIGdldCBPcHRpb25zKCk6IEFycmF5PGFueT4ge1xyXG4gICAgbGV0IG9wdGlvbnM6IEFycmF5PGFueT47XHJcbiAgICBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICBsZXQgb2xkQ2FjaGUgPSB0aGlzLkdldENhY2hlKHRoaXMub2xkUXVlcnkpO1xyXG5cclxuICAgICAgaWYgKCF0aGlzLmN1cnJlbnRDYWNoZSAmJiBvbGRDYWNoZSkge1xyXG4gICAgICAgIG9wdGlvbnMgPSBvbGRDYWNoZS5vYmplY3RzO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG9wdGlvbnMgPSB0aGlzLmN1cnJlbnRDYWNoZSA/IHRoaXMuY3VycmVudENhY2hlLm9iamVjdHMgOiBbXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIChvcHRpb25zIHx8IFtdKS5maWx0ZXIob3AgPT4ge1xyXG4gICAgICByZXR1cm4gdGhpcy5vdXRwdXQuZmluZEluZGV4KG8gPT4ge1xyXG4gICAgICAgIGxldCBhID0gZmV0Y2hGcm9tT2JqZWN0KG8sIHRoaXMubW9kZWxQcm9wZXJ0eSkgPyBmZXRjaEZyb21PYmplY3QobywgdGhpcy5tb2RlbFByb3BlcnR5KS52YWx1ZU9mKCkgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgbGV0IGIgPSBmZXRjaEZyb21PYmplY3Qob3AsIHRoaXMubW9kZWxQcm9wZXJ0eSkgPyBmZXRjaEZyb21PYmplY3Qob3AsIHRoaXMubW9kZWxQcm9wZXJ0eSkudmFsdWVPZigpIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIHJldHVybiBkZWVwRXF1YWwoYSwgYik7XHJcbiAgICAgIH0pID09PSAtMTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGN1cnJlbnRDYWNoZTogQ2FjaGVJbmZvO1xyXG4gIHByaXZhdGUgR2V0Q2FjaGUocXVlcnk6IHN0cmluZyk6IENhY2hlSW5mbyB7XHJcbiAgICBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNhY2hlTGF6eURhdGEuZmluZChjYWNoZSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGNhY2hlLnF1ZXJ5ID09PSB0aGlzLnF1ZXJ5ICYmIGRlZXBFcXVhbChjYWNoZS5wYXJhbXMsIHRoaXMuYWRkaXRpb25hbEZpbHRlcik7XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLy8gQ3JlYXRlTmV3XHJcblxyXG4gIHB1YmxpYyBBZGROZXdPYmplY3QodmFsdWU6IE9ic2VydmFibGU8YW55PiB8IGFueSk6IHZvaWQge1xyXG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgT2JzZXJ2YWJsZSkge1xyXG4gICAgICB2YWx1ZS5zdWJzY3JpYmUobmV3T2JqZWN0ID0+IHtcclxuICAgICAgICBpZiAobmV3T2JqZWN0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHRoaXMuU2V0TmV3T2JqZWN0KG5ld09iamVjdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2V0TmV3T2JqZWN0KHZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgU2V0TmV3T2JqZWN0KG5ld09iamVjdDogYW55KSB7XHJcbiAgICBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgIHRoaXMuZGF0YUxpc3QucHVzaChuZXdPYmplY3QpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgZm9yIChsZXQgY2FjaGUgb2YgdGhpcy5jYWNoZUxhenlEYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucXVlcnkuaW5jbHVkZXMoY2FjaGUucXVlcnkpIHx8IGNhY2hlLnF1ZXJ5ID09PSB1bmRlZmluZWQgfHwgY2FjaGUucXVlcnkgPT09ICcnKSB7XHJcbiAgICAgICAgICBjYWNoZS5jb3VudEVsZW1lbnQrKztcclxuICAgICAgICAgIGNhY2hlLm9iamVjdHMucHVzaChuZXdPYmplY3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZmlyc3RMb2FkID0gZmFsc2U7XHJcbiAgICB0aGlzLnF1ZXJ5ID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5jdXJyZW50Q2FjaGUgPSB0aGlzLkdldENhY2hlKHRoaXMucXVlcnkpO1xyXG4gICAgdGhpcy5zZWxlY3RPbmUobmV3IE1vdXNlRXZlbnQoJ2NsaWNrJyksIG5ld09iamVjdCk7XHJcbiAgfVxyXG5cclxuICBnZXQgU2hvd05ldygpOiBib29sZWFuIHtcclxuICAgIGxldCBhID0gdGhpcy5xdWVyeSAmJiB0aGlzLm5ld01lc3NhZ2UgJiYgKCF0aGlzLmRhdGFMaXN0U3ViIHx8IHRoaXMuZGF0YUxpc3RTdWIuY2xvc2VkKTtcclxuXHJcbiAgICBsZXQgYiA9IHRoaXMuT3B0aW9ucy5maW5kSW5kZXgobyA9PiB7XHJcbiAgICAgIGxldCBjID0gZmV0Y2hGcm9tT2JqZWN0KG8sIHRoaXMudmlld1Byb3BlcnR5KSA/IGZldGNoRnJvbU9iamVjdChvLCB0aGlzLnZpZXdQcm9wZXJ0eSkudmFsdWVPZigpIDogdW5kZWZpbmVkO1xyXG4gICAgICByZXR1cm4gZGVlcEVxdWFsKGMsIHRoaXMucXVlcnkpO1xyXG4gICAgfSkgPT09IC0xICYmIHRoaXMub3V0cHV0LmZpbmRJbmRleChvID0+IHtcclxuICAgICAgbGV0IGMgPSBmZXRjaEZyb21PYmplY3QobywgdGhpcy52aWV3UHJvcGVydHkpID8gZmV0Y2hGcm9tT2JqZWN0KG8sIHRoaXMudmlld1Byb3BlcnR5KS52YWx1ZU9mKCkgOiB1bmRlZmluZWQ7XHJcbiAgICAgIHJldHVybiBkZWVwRXF1YWwoYywgdGhpcy5xdWVyeSk7XHJcbiAgICB9KSA9PT0gLTE7XHJcblxyXG4gICAgcmV0dXJuIGEgJiYgYjtcclxuICB9XHJcblxyXG4gIGdldCBTaG93RW1wdHkoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5PcHRpb25zLmxlbmd0aCA9PT0gMCAmJiAoISh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgRnVuY3Rpb24pIHx8ICh0aGlzLmRhdGFMaXN0U3ViLmNsb3NlZCkpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIENBQ0hFXHJcbiAgcHJpdmF0ZSBjYWNoZUxhenlEYXRhOiBBcnJheTxDYWNoZUluZm8+ID0gW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ2FjaGVJbmZvIHtcclxuICBjb3VudEVsZW1lbnQ6IG51bWJlcjtcclxuICBjb3VudFBhZ2VzOiBudW1iZXI7XHJcbiAgY3VycmVudFBhZ2U6IG51bWJlcjtcclxuICBvYmplY3RzOiBBcnJheTxhbnk+O1xyXG5cclxuICBxdWVyeTogc3RyaW5nO1xyXG4gIHBhcmFtczogYW55O1xyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IE5nVmlib3JDb21wb25lbnQgfSBmcm9tICcuL25nLXZpYm9yLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFZpYm9yQm90aERpcmVjdGl2ZSwgVmlib3JDcmVhdGVEaXJlY3RpdmUsIFZpYm9yRHJvcGRvd25EaXJlY3RpdmUsIFZpYm9yU2VsZWN0ZWREaXJlY3RpdmUgfSBmcm9tICcuL25nLXZpYm9yLXRlbXBsYXRlLmRpcmVjdGl2ZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIEZvcm1zTW9kdWxlLCBDb21tb25Nb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgTmdWaWJvckNvbXBvbmVudCxcclxuICAgIFZpYm9yQm90aERpcmVjdGl2ZSwgVmlib3JDcmVhdGVEaXJlY3RpdmUsIFZpYm9yRHJvcGRvd25EaXJlY3RpdmUsIFZpYm9yU2VsZWN0ZWREaXJlY3RpdmVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIE5nVmlib3JDb21wb25lbnQsIEZvcm1zTW9kdWxlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdWaWJvck1vZHVsZSB7IH1cclxuIl0sIm5hbWVzIjpbIkluamVjdGFibGUiLCJEaXJlY3RpdmUiLCJUZW1wbGF0ZVJlZiIsIkV2ZW50RW1pdHRlciIsInRzbGliXzEuX192YWx1ZXMiLCJPYnNlcnZhYmxlIiwiQ29tcG9uZW50IiwiTkdfVkFMVUVfQUNDRVNTT1IiLCJmb3J3YXJkUmVmIiwiRWxlbWVudFJlZiIsIlZpZXdDaGlsZCIsIklucHV0IiwiQ29udGVudENoaWxkIiwiT3V0cHV0IiwiTmdNb2R1bGUiLCJGb3Jtc01vZHVsZSIsIkNvbW1vbk1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO1FBTUU7U0FBaUI7O29CQUpsQkEsYUFBVSxTQUFDO3dCQUNWLFVBQVUsRUFBRSxNQUFNO3FCQUNuQjs7Ozs7NkJBSkQ7OztJQ0FBOzs7Ozs7Ozs7Ozs7OztBQWNBLHNCQTRGeUIsQ0FBQztRQUN0QixJQUFJLENBQUMsR0FBRyxPQUFPLE1BQU0sS0FBSyxVQUFVLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQztZQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTTtvQkFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7Z0JBQ25DLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO2FBQzNDO1NBQ0osQ0FBQztJQUNOLENBQUM7Ozs7OztBQ25IRDtRQUlJLGdDQUFtQixXQUE2QjtZQUE3QixnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7U0FBSTs7b0JBRnZEQyxZQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsd0JBQXdCLEVBQUU7Ozs7O3dCQUY3QkMsY0FBVzs7O3FDQUEvQjs7O1FBU0ksZ0NBQW1CLFdBQTZCO1lBQTdCLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtTQUFJOztvQkFGdkRELFlBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSx3QkFBd0IsRUFBRTs7Ozs7d0JBUDdCQyxjQUFXOzs7cUNBQS9COzs7UUFjSSw0QkFBbUIsV0FBNkI7WUFBN0IsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO1NBQUk7O29CQUZ2REQsWUFBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFOzs7Ozt3QkFaekJDLGNBQVc7OztpQ0FBL0I7OztRQW1CSSw4QkFBbUIsV0FBNkI7WUFBN0IsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO1NBQUk7O29CQUZ2REQsWUFBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRTs7Ozs7d0JBakJwQkMsY0FBVzs7O21DQUEvQjs7Ozs7Ozs7Ozs7O0FDTUEsNkJBQWdDLE1BQVcsRUFBRSxJQUFZO1FBQ3ZELElBQUksTUFBTSxLQUFLLFNBQVMsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQzlDLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7UUFFRCxxQkFBTSxLQUFLLEdBQVcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNkLE9BQU8sZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEY7UUFFRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNyQjs7Ozs7O0FBRUQsOEJBQWlDLElBQVMsRUFBRSxpQkFBeUI7UUFDbkUscUJBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUksSUFBSSxlQUFlLENBQUMsSUFBSSxFQUFFLGlCQUFpQixDQUFDLEdBQUcsUUFBTSxlQUFlLENBQUMsSUFBSSxFQUFFLGlCQUFpQixDQUFDLFNBQU0sR0FBRyxFQUFFLENBQUM7UUFDN0csT0FBTyxJQUFJLENBQUM7S0FDYjs7SUFJRCxxQkFBTSxTQUFTLEdBQVcscUNBQXFDLENBQUMsTUFBTSxDQUFDO0lBQ3ZFLHFCQUFNLFNBQVMsR0FBVyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEdBQUcsU0FBUyxHQUFHLGlCQUFpQixFQUFFLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7OztJQUVoRiw4QkFBOEIsSUFBWSxFQUFFLEtBQVUsRUFBRSxXQUFnQixFQUFFLE1BQVc7UUFDbkYscUJBQUksQ0FBQyxHQUFXLEtBQUssTUFBTSxXQUFXLEdBQUcsUUFBUSxHQUFHLFNBQVMsQ0FBQztZQUU1RCxDQUFDOztZQUVELElBQUksS0FBSyxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsbUJBRXhCLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDVixxQkFBTSxTQUFTLEdBQWEsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQzs7Ozs7UUFJL0QsdUJBQXVCLEtBQVU7WUFDL0IsT0FBTyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDbEM7UUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTs7WUFFcEIsSUFBSSxLQUFLLEtBQUssUUFBUSxFQUFFO2dCQUN0QixHQUFHLElBQUksYUFBYSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM1QztZQUVELElBQUksV0FBVyxFQUFFOztnQkFFZixJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7b0JBQ3ZCLEdBQUcsSUFBSSxhQUFhLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNoRDs7Z0JBR0QsSUFBSSxLQUFLLEtBQUssUUFBUSxFQUFFO29CQUN0QixHQUFHLElBQUksYUFBYSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUM7aUJBQ3pEO2FBQ0Y7aUJBQU07Z0JBQ0wsR0FBRyxJQUFJLGFBQWEsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O2dCQUcvQyxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7b0JBQ3ZCLEdBQUcsSUFBSSxhQUFhLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztpQkFDekQ7YUFDRjtTQUNGO1FBRUQsT0FBTyxHQUFHLENBQUM7S0FDWjs7Ozs7SUFFRCxtQkFBbUIsSUFBUztRQUMxQixPQUFPLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxLQUFLLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUM7S0FDOUY7Ozs7O0lBRUQsbUJBQW1CLElBQVM7UUFDMUIscUJBQUksT0FBWSxtQkFBRSxHQUFRLENBQUM7UUFDM0IscUJBQU0sR0FBRyxHQUFRLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzlDLHFCQUFNLEdBQUcsR0FBUSxJQUFJLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUU1QyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1IsT0FBTztTQUNSO1FBRUQsT0FBTyxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUM7UUFDOUIsR0FBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVyQixPQUFPO1lBQ0wsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsU0FBUztZQUNsRCxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxVQUFVO1NBQ3RELENBQUM7S0FDSDs7Ozs7O0FBRUQsZ0NBQW1DLElBQWlCLEVBQUUsSUFBaUI7UUFDckUscUJBQUksQ0FBTSxtQkFBRSxXQUFnQixtQkFBRSxXQUFnQixtQkFBRSxNQUFXLG1CQUFFLFVBQWUsbUJBQUUsYUFBa0IsQ0FBQztRQUVqRyxJQUFJLElBQUksRUFBRTtZQUNSLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2hDLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3pELE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQztZQUM3QixDQUFDLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztZQUN2RCxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsYUFBYSxHQUFHLENBQUMsR0FBRyxXQUFXLEdBQUcsV0FBVyxDQUFDOztZQUc5QyxJQUFJLENBQUMsR0FBRyxXQUFXLEdBQUcsV0FBVyxHQUFHLE1BQU0sRUFBRTtnQkFDMUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUM7YUFDaEM7aUJBQU0sSUFBSSxDQUFDLEdBQUcsTUFBTSxFQUFFO2dCQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQzthQUM3QjtTQUNGO0tBQ0Y7Ozs7Ozs7SUFFRCwwQkFBMEIsSUFBUyxFQUFFLElBQVMsRUFBRSxLQUFVOztRQUd4RCxxQkFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDOUIscUJBQUksR0FBRyxHQUFRLElBQUksS0FBSyxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ3ZFLHFCQUFNLE1BQU0sR0FBUSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDOzs7O1FBTXhELElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFOztZQUUzQixHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRW5CLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO2dCQUMxQixHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN4Qjs7WUFHRCxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3ZCLE9BQU8sR0FBRyxDQUFDO2FBQ1o7Ozs7O1lBT0QsR0FBRyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUI7O1FBR0QsT0FBTyxHQUFHLEdBQUcsb0JBQW9CLENBQUMsSUFBSSxFQUFFLEtBQUssS0FBSyxBQUF5QixTQUFTLENBQUMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQztLQUNsSDs7Ozs7O0lDMUhELHFCQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7O1FBbWN0QywwQkFBb0IsVUFBc0M7WUFBdEMsZUFBVSxHQUFWLFVBQVUsQ0FBNEI7NkJBbld0QyxLQUFLO29DQVNDLENBQUM7NEJBQ1IsR0FBRzs7NEJBT0ssS0FBSztpQ0FDQSxRQUFROytCQUNWLEVBQUU7K0JBRUYsT0FBTzs0QkFFVixLQUFLOzhCQUNILElBQUk7NEJBQ2YsS0FBSztnQ0FTUSxNQUFNO2lDQUVMLElBQUk7bUNBQ0YsS0FBSztnQ0FDQSxTQUFTO2tDQUNmLE9BQU87b0NBSUwsRUFBRTttQ0FFa0MsSUFBSUMsZUFBWSxFQUFFOzhCQUdwRCxTQUFTOzZCQUN3QixVQUFDLEtBQWE7Z0JBQ2xGLE9BQU8sS0FBSyxDQUFDO2FBQ2Q7eUJBcUR5QixDQUFDO2dCQUN6QixxQkFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUNkLE9BQU8sVUFBVSxRQUFhLEVBQUUsRUFBVTtvQkFDeEMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNwQixLQUFLLEdBQUcsVUFBVSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztpQkFDbEMsQ0FBQzthQUNILEdBQUc7NEJBNFFtQixlQUFTOzZCQUNSLGVBQVM7aUNBaU1TLEVBQUU7WUF4TjFDLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1NBQ2xCOzs7OztRQTFTTSxvQ0FBUzs7OztzQkFBQyxLQUFhO2dCQUM1QixPQUFPLEtBQUssQ0FBQzs7Ozs7O1FBR1IsMkNBQWdCOzs7O3NCQUFDLEtBQThCO2dCQUNwRCxJQUFJLEtBQUssRUFBRTtvQkFDVCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztpQkFDekI7Z0JBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7b0JBQzdELE9BQU87aUJBQ1I7Z0JBRUQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNyQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7Ozs7UUFHWCwyQ0FBZ0I7Ozs7Z0JBQ3RCLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7Ozs7O1FBR2Ysb0RBQXlCOzs7OztnQkFDOUIsVUFBVSxDQUFDO29CQUNULEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2lCQUN6QixFQUFFLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7UUFHSCx5Q0FBYzs7OztzQkFBQyxLQUFZO2dCQUNoQyxJQUFJLEtBQUssRUFBRTtvQkFDVCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztpQkFDekI7Z0JBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNmLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2lCQUN6QjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQ2xDOzs7OztRQVdJLHdDQUFhOzs7OztnQkFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ25CLElBQUksSUFBSSxDQUFDLFFBQVEsWUFBWSxLQUFLLEVBQUU7b0JBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJO3dCQUN0QyxJQUFJLENBQUMsS0FBSSxDQUFDLEtBQUssSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7NEJBQzFDLE9BQU8sSUFBSSxDQUFDO3lCQUNiO3dCQUNELHFCQUFJLENBQUMsR0FBUSxlQUFlLENBQUMsSUFBSSxFQUFFLEtBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzt3QkFDeEQsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFOzRCQUNuQixPQUFPLEtBQUssQ0FBQzt5QkFDZDt3QkFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ25ELENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJO3dCQUNaLElBQUksQ0FBQyxLQUFJLENBQUMsV0FBVyxFQUFFOzRCQUNyQixPQUFPLElBQUksQ0FBQzt5QkFDYjt3QkFFRCxxQkFBSSxDQUFDLEdBQUcsZUFBZSxDQUFDLElBQUksRUFBRSxLQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQzVELE9BQU8sS0FBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBQSxFQUFFOzRCQUNsQyxxQkFBSSxDQUFDLEdBQUcsZUFBZSxDQUFDLEVBQUUsRUFBRSxLQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7NEJBQzFELE9BQU8sU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzt5QkFDeEIsQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDUixDQUFDLENBQUM7aUJBQ0o7cUJBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxZQUFZLFFBQVEsRUFBRTtvQkFDNUMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO3dCQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7cUJBQUU7b0JBQ3pELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO3dCQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHOzRCQUNsQixZQUFZLEVBQUUsQ0FBQzs0QkFDZixVQUFVLEVBQUUsQ0FBQzs0QkFDYixXQUFXLEVBQUUsQ0FBQzs0QkFDZCxPQUFPLEVBQUUsRUFBRTs0QkFDWCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7NEJBQ2pCLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUM7eUJBQ2pELENBQUM7d0JBQ0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO3dCQUUzQyxxQkFBSSxNQUFNLElBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFRLENBQUEsQ0FBQzt3QkFDN0QsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO3dCQUV6QyxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQTRCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUUsU0FBUyxDQUFDLFVBQUEsTUFBTTs0QkFDekcsS0FBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDMUUsS0FBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFDekQsS0FBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7eUJBQzdGLEVBQUUsZUFBUyxDQUFDLENBQUM7cUJBQ2Y7aUJBQ0Y7Ozs7O1FBR0ksK0NBQW9COzs7OztnQkFDekIscUJBQUksT0FBTyxHQUFXLElBQUksQ0FBQyxRQUFRLFlBQVksS0FBSyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDOztnQkFHMUUsSUFBSSxDQUFDLEtBQUssQ0FBQztvQkFDVCxLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUM7b0JBQzNCLEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzlDLEtBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztpQkFDdEIsRUFBRSxPQUFPLENBQUMsQ0FBQzs7Ozs7UUFHTiw4Q0FBbUI7Ozs7Z0JBQ3pCLHFCQUFJLElBQUksSUFBcUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUM7Z0JBQ2xGLHFCQUFJLFFBQVEsSUFBcUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBLENBQUM7Z0JBQzFILGtCQUFrQixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQzs7Ozs7O1FBRzlCLGtDQUFPOzs7O3NCQUFDLEtBQW9CO2dCQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDakIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNqQyxPQUFPO2lCQUNSO2dCQUVELHFCQUFJLFlBQVksR0FBVyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztnQkFFL0MsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO29CQUNoQixZQUFZLEVBQUUsQ0FBQztpQkFDaEI7Z0JBRUQsUUFBUSxLQUFLLENBQUMsT0FBTztvQkFDbkIsS0FBSyxFQUFFOzt3QkFDTCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzt3QkFDeEIsTUFBTTtvQkFFUixLQUFLLEVBQUU7O3dCQUNMLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxJQUFJLFlBQVksQ0FBQzt3QkFDbEYsTUFBTTtvQkFFUixLQUFLLEVBQUU7O3dCQUNMLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO3dCQUNuQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsSUFBSSxZQUFZLENBQUM7d0JBQ2xGLE1BQU07b0JBRVIsS0FBSyxFQUFFOzt3QkFDTCxJQUFJLFlBQVksR0FBRyxDQUFDLEVBQUU7NEJBQ3BCLElBQUksSUFBSSxDQUFDLGdCQUFnQixLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO2dDQUNqRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7NkJBQy9DO2lDQUFNO2dDQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQzs2QkFDNUQ7eUJBQ0Y7NkJBQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFOzRCQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7eUJBQy9DO3dCQUNELE1BQU07b0JBRVIsU0FBUyxNQUFNO2lCQUNoQjtnQkFDRCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzs7Ozs7O1FBR3RCLG1DQUFROzs7O3NCQUFDLE1BQWE7O2dCQUMzQixNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7O2dCQUd4QixJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsWUFBWSxRQUFRLENBQUMsRUFBRTtvQkFDeEMsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2lCQUMvQztnQkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtvQkFDdEIsTUFBTSxJQUFJLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO2lCQUM1RDtnQkFDRCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFO29CQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztpQkFBRTtnQkFFekcsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO29CQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQUU7Z0JBRXpELHFCQUFJLE1BQU0sR0FBUSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDM0QsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUV6QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtvQkFDNUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDaEMsS0FBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDekQsS0FBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQzVGLEtBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzFFLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxHQUFHLENBQUMsSUFBSSxLQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztvQkFDbkYsS0FBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7aUJBQzVCLEVBQUUsZUFBUyxDQUFDLENBQUM7Ozs7O1FBSVIsd0NBQWE7Ozs7Z0JBQ25CLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDOzs7Ozs7O1FBR2xCLG9DQUFTOzs7OztzQkFBQyxNQUFrQyxFQUFFLElBQVM7O2dCQUU1RCxJQUFJLE1BQU0sWUFBWSxVQUFVLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7b0JBQUUsT0FBTztpQkFBRTtnQkFFcEUsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUU7b0JBQzVELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUN4QjtxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUN0QjtnQkFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUNyQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDeEIsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDOzs7Ozs7O1FBR25CLG9DQUFTOzs7OztzQkFBQyxLQUFhLEVBQUUsS0FBWTtnQkFDMUMsSUFBSSxLQUFLLEVBQUU7b0JBQ1QsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO2lCQUN6QjtnQkFHRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQzs7Z0JBR2xDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDakIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7O2dCQUcxQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDbEM7OzhCQUtRLDhDQUFnQjs7OztnQkFDekIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7b0JBQ3pCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztpQkFDMUM7cUJBQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO29CQUM1QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDO2lCQUN0QztnQkFDRCxPQUFPLFNBQVMsQ0FBQzs7Ozs7OEJBR1IsOENBQWdCOzs7O2dCQUN6QixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtvQkFDekIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDO2lCQUMxQztxQkFBTSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7b0JBQzVCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUM7aUJBQ3RDO2dCQUNELE9BQU8sU0FBUyxDQUFDOzs7Ozs7Ozs7UUFHWiwyQ0FBZ0I7Ozs7c0JBQUMsSUFBUztnQkFDL0IscUJBQUksU0FBUyxHQUFRLElBQUksQ0FBQyxhQUFhLElBQUksZ0JBQWdCLENBQUM7Z0JBQzVELE9BQU8sU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Ozs7OztRQUduRCwrQ0FBb0I7Ozs7c0JBQUMsSUFBUztnQkFDbkMscUJBQUksU0FBUyxHQUFRLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxnQkFBZ0IsQ0FBQztnQkFDaEUsT0FBTyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzs7Ozs7UUFJbkQsbUNBQVE7Ozs7O2dCQUViLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoRixJQUFJLENBQUMsT0FBTyxzQkFBc0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUMsQ0FBQzs7Ozs7O1FBRzdELHNDQUFXOzs7O3NCQUFDLE1BQXFCO2dCQUN0QyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsWUFBWSxFQUFFOztvQkFFekQsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRTt3QkFDbEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7d0JBQ2pCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztxQkFDeEM7eUJBQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxZQUFZLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO3dCQUN2RCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7cUJBQzFCO3lCQUFNLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxZQUFZLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTt3QkFDM0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFFM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTs0QkFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7eUJBQ3hCO3FCQUNGO2lCQUNGO2dCQUVELElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFO29CQUN0QixJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxZQUFZLEVBQUU7d0JBQ25DLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztxQkFDbkM7eUJBQU07d0JBQ0wsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3FCQUN0QztpQkFDRjtnQkFFRCxJQUFJLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO29CQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUMvQzs7Ozs7O1FBUUkscUNBQVU7Ozs7c0JBQUMsS0FBVTs7O2dCQUUxQixJQUFJLEtBQUssRUFBRTtvQkFDVCxJQUFJLENBQUMsS0FBSyxZQUFZLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLE1BQU0sRUFBRSxLQUFLLFlBQVksS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO3dCQUM5RixNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7cUJBQ3JDO29CQUNELElBQUksS0FBSyxZQUFZLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxZQUFZLEtBQUssRUFBRTt3QkFDekQsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUEsQ0FBQyxFQUFFOzRCQUN0RixPQUFPO3lCQUNSO3FCQUNGO3lCQUFNLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLEVBQUU7d0JBQy9CLE9BQU87cUJBQ1I7b0JBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7b0JBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2lCQUNwQjs7Ozs7O1FBTUksMkNBQWdCOzs7O3NCQUFDLEVBQVk7Z0JBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDOzs7Ozs7UUFHZCw0Q0FBaUI7Ozs7c0JBQUMsRUFBWTtnQkFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7Ozs7OztRQUdmLDJDQUFnQjs7OztzQkFBQyxVQUFtQjtnQkFDekMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7Z0JBQzNCLElBQUksVUFBVSxFQUFFO29CQUNkLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztpQkFDOUM7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQ3JDOzs7UUFJSCxzQkFBSSxtQ0FBSzs7O2dCQXdCVDtnQkFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDcEI7Ozs7Z0JBMUJELFVBQVUsS0FBVTtnQkFDbEIsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO29CQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztvQkFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDckIsT0FBTztpQkFDUjs7Z0JBR0QsSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7b0JBQ3hDLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO29CQUNqQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ3hDO3FCQUFNLElBQUksS0FBSyxZQUFZLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNsRCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztpQkFDckI7cUJBQU0sSUFBSSxFQUFFLEtBQUssWUFBWSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ3RELElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDdkI7O2dCQUdELElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDOztnQkFHcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDNUI7OztXQUFBO1FBT0Qsc0JBQUksdUNBQVM7Ozs7Z0JBQWI7Z0JBQ0UsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNqQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUM7aUJBQ2pEO3FCQUFNO29CQUNMLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztpQkFDakQ7YUFDRjs7O1dBQUE7UUFFRCxzQkFBSSw2Q0FBZTs7O2dCQUFuQjtnQkFDRSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ2pCLHFCQUFJLEdBQUcsR0FBZSxFQUFFLENBQUM7O3dCQUN6QixLQUFjLElBQUEsS0FBQUMsU0FBQSxJQUFJLENBQUMsTUFBTSxDQUFBLGdCQUFBOzRCQUFwQixJQUFJLENBQUMsV0FBQTs0QkFDUixHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7eUJBQ2xEOzs7Ozs7Ozs7Ozs7Ozs7b0JBQ0QsT0FBTyxHQUFHLENBQUM7aUJBQ1o7cUJBQU07b0JBQ0wsT0FBTyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7aUJBQzVEOzthQUNGOzs7V0FBQTtRQUVELHNCQUFJLG9DQUFNOzs7O2dCQUFWLFVBQVcsUUFBb0I7Z0JBQS9CLGlCQXNDQztnQkFyQ0MscUJBQUksUUFBUSxHQUFlLEVBQUUsQ0FBQztnQkFDOUIsSUFBSSxJQUFJLENBQUMsUUFBUSxZQUFZLEtBQUssRUFBRTtvQkFDbEMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7aUJBQzFCO3FCQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsWUFBWSxRQUFRLEVBQUU7b0JBQzVDLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTt3QkFDakQscUJBQUksTUFBTSxHQUFRLEVBQUUsQ0FBQzt3QkFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7d0JBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFOzRCQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQzs0QkFDdkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3lCQUN4Qzs2QkFBTTs0QkFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxlQUFlLENBQUMsR0FBRyxFQUFFLEtBQUksQ0FBQyxZQUFZLENBQUMsR0FBQSxDQUFDLENBQUM7NEJBQzVGLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBNEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRSxTQUFTLENBQUMsVUFBQSxNQUFNO2dDQUN6RyxLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0NBQzFCLEtBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs2QkFDeEMsRUFBRSxlQUFTLENBQUMsQ0FBQzt5QkFDZjtxQkFDRjt5QkFBTTt3QkFDTCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQ3hDO29CQUNELE9BQU87aUJBQ1I7cUJBQU07b0JBQ0wsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBRTt3QkFBRSxPQUFPO3FCQUFFO29CQUM1QyxNQUFNLElBQUksS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7aUJBQ3pDO2dCQUNELHFCQUFJLFNBQVMsR0FBZSxFQUFFLENBQUM7O29CQUMvQixLQUFjLElBQUEsYUFBQUEsU0FBQSxRQUFRLENBQUEsa0NBQUE7d0JBQWpCLElBQUksQ0FBQyxxQkFBQTs7NEJBQ1IsS0FBYyxJQUFBLGFBQUFBLFNBQUEsUUFBUSxDQUFBLGtDQUFBO2dDQUFqQixJQUFJLENBQUMscUJBQUE7Z0NBQ1IscUJBQUksQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLFNBQVMsQ0FBQztnQ0FDOUcscUJBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsU0FBUyxDQUFDO2dDQUNwQyxJQUFJLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7b0NBQ25CLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7aUNBQ25COzZCQUNGOzs7Ozs7Ozs7Ozs7Ozs7cUJBQ0Y7Ozs7Ozs7Ozs7Ozs7OztnQkFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzthQUN4Qzs7O1dBQUE7UUFFRCxzQkFBSSxxQ0FBTzs7O2dCQUFYO2dCQUFBLGlCQW9CQztnQkFuQkMscUJBQUksT0FBbUIsQ0FBQztnQkFDeEIsSUFBSSxJQUFJLENBQUMsUUFBUSxZQUFZLEtBQUssRUFBRTtvQkFDbEMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7aUJBQ3hCO3FCQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsWUFBWSxRQUFRLEVBQUU7b0JBQzVDLHFCQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFFNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksUUFBUSxFQUFFO3dCQUNsQyxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQztxQkFDNUI7eUJBQU07d0JBQ0wsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO3FCQUM5RDtpQkFDRjtnQkFDRCxPQUFPLENBQUMsT0FBTyxJQUFJLEVBQUUsRUFBRSxNQUFNLENBQUMsVUFBQSxFQUFFO29CQUM5QixPQUFPLEtBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsQ0FBQzt3QkFDNUIscUJBQUksQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLEVBQUUsS0FBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLEVBQUUsS0FBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLFNBQVMsQ0FBQzt3QkFDOUcscUJBQUksQ0FBQyxHQUFHLGVBQWUsQ0FBQyxFQUFFLEVBQUUsS0FBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxFQUFFLEVBQUUsS0FBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLFNBQVMsQ0FBQzt3QkFDaEgsT0FBTyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUN4QixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7aUJBQ1gsQ0FBQyxDQUFDO2FBQ0o7OztXQUFBOzs7OztRQUdPLG1DQUFROzs7O3NCQUFDLEtBQWE7O2dCQUM1QixJQUFJLElBQUksQ0FBQyxRQUFRLFlBQVksUUFBUSxFQUFFO29CQUNyQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQUEsS0FBSzt3QkFDbEMsT0FBTyxLQUFLLENBQUMsS0FBSyxLQUFLLEtBQUksQ0FBQyxLQUFLLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7cUJBQ3JGLENBQUMsQ0FBQTtpQkFDSDtnQkFDRCxPQUFPLFNBQVMsQ0FBQzs7Ozs7O1FBS1osdUNBQVk7Ozs7c0JBQUMsS0FBNEI7O2dCQUM5QyxJQUFJLEtBQUssWUFBWUMsZUFBVSxFQUFFO29CQUMvQixLQUFLLENBQUMsU0FBUyxDQUFDLFVBQUEsU0FBUzt3QkFDdkIsSUFBSSxTQUFTLEtBQUssU0FBUyxFQUFFOzRCQUMzQixLQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3lCQUM5QjtxQkFDRixDQUFDLENBQUM7aUJBQ0o7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDMUI7Ozs7OztRQUdLLHVDQUFZOzs7O3NCQUFDLFNBQWM7Z0JBQ2pDLElBQUksSUFBSSxDQUFDLFFBQVEsWUFBWSxLQUFLLEVBQUU7b0JBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUMvQjtxQkFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLFlBQVksUUFBUSxFQUFFOzt3QkFDNUMsS0FBa0IsSUFBQSxLQUFBRCxTQUFBLElBQUksQ0FBQyxhQUFhLENBQUEsZ0JBQUE7NEJBQS9CLElBQUksS0FBSyxXQUFBOzRCQUNaLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssRUFBRSxFQUFFO2dDQUN2RixLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7Z0NBQ3JCLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzZCQUMvQjt5QkFDRjs7Ozs7Ozs7Ozs7Ozs7O2lCQUNGO2dCQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDOUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQzs7O1FBR3JELHNCQUFJLHFDQUFPOzs7Z0JBQVg7Z0JBQUEsaUJBWUM7Z0JBWEMscUJBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFeEYscUJBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQUEsQ0FBQztvQkFDOUIscUJBQUksQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLEVBQUUsS0FBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLEVBQUUsS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLFNBQVMsQ0FBQztvQkFDNUcsT0FBTyxTQUFTLENBQUMsQ0FBQyxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDakMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsQ0FBQztvQkFDbEMscUJBQUksQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLEVBQUUsS0FBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLEVBQUUsS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLFNBQVMsQ0FBQztvQkFDNUcsT0FBTyxTQUFTLENBQUMsQ0FBQyxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDakMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUVWLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNmOzs7V0FBQTtRQUVELHNCQUFJLHVDQUFTOzs7Z0JBQWI7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxZQUFZLFFBQVEsQ0FBQyxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUN6Rzs7O1dBQUE7O29CQXRwQkZFLFlBQVMsU0FBQzs7d0JBRVQsUUFBUSxFQUFFLE9BQU87d0JBQ2pCLFFBQVEsRUFBRSwwbklBK0VYO3dCQUNDLE1BQU0sRUFBRSxDQUFDLHFnRkFBMi9FLENBQUM7d0JBQ3JnRixTQUFTLEVBQUUsQ0FBQztnQ0FDVixPQUFPLEVBQUVDLHVCQUFpQjtnQ0FDMUIsV0FBVyxFQUFFQyxhQUFVLENBQUMsY0FBTSxPQUFBLGdCQUFnQixHQUFBLENBQUM7Z0NBQy9DLEtBQUssRUFBRSxJQUFJOzZCQUNaLENBQUM7cUJBQ0g7Ozs7O3dCQXJIZUMsYUFBVTs7OzttQ0F3SXZCQyxZQUFTLFNBQUMsY0FBYzsrQkFHeEJDLFFBQUs7b0NBQ0xBLFFBQUs7a0NBQ0xBLFFBQUs7a0NBRUxBLFFBQUs7MkJBQ0xBLFFBQUs7K0JBQ0xBLFFBQUs7aUNBQ0xBLFFBQUs7bUNBSUxDLGVBQVksU0FBQyxrQkFBa0I7dUNBQy9CQSxlQUFZLFNBQUMsc0JBQXNCO3VDQUNuQ0EsZUFBWSxTQUFDLHNCQUFzQjtxQ0FDbkNBLGVBQVksU0FBQyxvQkFBb0I7b0NBQ2pDRCxRQUFLO3dDQUNMQSxRQUFLO21DQUNMQSxRQUFLO29DQUVMQSxRQUFLO3NDQUNMQSxRQUFLO21DQUNMQSxRQUFLO3FDQUNMQSxRQUFLOytCQUVMQSxRQUFLO2tDQUNMQSxRQUFLO3VDQUNMQSxRQUFLO2tDQUNMQSxRQUFLO3NDQUNMRSxTQUFNLFNBQUMsaUJBQWlCO2lDQUd4QkYsUUFBSztnQ0FDTEEsUUFBSzs7K0JBOUtSOzs7Ozs7O0FDQUE7Ozs7b0JBUUNHLFdBQVEsU0FBQzt3QkFDUixPQUFPLEVBQUU7NEJBQ1BDLGlCQUFXLEVBQUVDLG1CQUFZO3lCQUMxQjt3QkFDRCxZQUFZLEVBQUU7NEJBQ1osZ0JBQWdCOzRCQUNoQixrQkFBa0IsRUFBRSxvQkFBb0IsRUFBRSxzQkFBc0IsRUFBRSxzQkFBc0I7eUJBQ3pGO3dCQUNELE9BQU8sRUFBRTs0QkFDUCxnQkFBZ0IsRUFBRUQsaUJBQVc7eUJBQzlCO3FCQUNGOzs0QkFuQkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9