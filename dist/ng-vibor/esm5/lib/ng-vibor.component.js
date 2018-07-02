/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, forwardRef, EventEmitter, ElementRef, ContentChild, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { ViborBothDirective, ViborCreateDirective, ViborDropdownDirective, ViborSelectedDirective } from './ng-vibor-template.directive';
import { defaultFormatter, fetchFromObject, scrollActiveOption } from './helpers';
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
    ;
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
                    for (var _a = tslib_1.__values(this.output), _b = _a.next(); !_b.done; _b = _a.next()) {
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
                for (var newValue_1 = tslib_1.__values(newValue), newValue_1_1 = newValue_1.next(); !newValue_1_1.done; newValue_1_1 = newValue_1.next()) {
                    var v = newValue_1_1.value;
                    try {
                        for (var dataList_1 = tslib_1.__values(dataList), dataList_1_1 = dataList_1.next(); !dataList_1_1.done; dataList_1_1 = dataList_1.next()) {
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
                for (var _a = tslib_1.__values(this.cacheLazyData), _b = _a.next(); !_b.done; _b = _a.next()) {
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
                    styles: [".vibor a,.vibor label,.vibor legend,.vibor p,.vibor span,.vibor ul{margin:0;padding:0;border:0}.vibor a,.vibor button,.vibor input{outline:0}.vibor ol,.vibor ul{list-style:none}.vibor input{padding:0;margin:0;border:0;font:inherit}.vibor b{font-weight:400}.vibor{position:relative;display:block;padding:10px 15px;border:1px solid #d5d9de;border-radius:3px;font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\";transition:box-shadow .15s linear}.vibor:hover,.vibor:hover .select-dropdown{box-shadow:0 3px 6px 0 rgba(44,44,44,.1)}.vibor .select-search{position:relative}.vibor .select-search .arrow{content:\"\";position:absolute;right:0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);display:block;width:16px;height:16px;background-image:url(data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ibmMtaWNvbiBnbHlwaCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiI+DQogIDxwYXRoIGZpbGw9IiMyYzJjMmMiIGQ9Ik04IDExLjRMMi42IDYgNCA0LjZsNCA0IDQtNEwxMy40IDYiLz4NCjwvc3ZnPg0K);transition:-webkit-transform .15s ease-in-out;transition:transform .15s ease-in-out;transition:transform .15s ease-in-out,-webkit-transform .15s ease-in-out}.vibor .select-search .arrow:before,.vibor .select-search-list-item_hide{display:none}.vibor .select-search-list-item_selection{position:relative}.vibor .select-search-list-item_input input{width:100%;text-overflow:ellipsis;font-size:14px;color:#383d41}.vibor .select-search-list-item_input input::-webkit-input-placeholder{color:rgba(56,61,65,.3)}.vibor .select-search-list-item_input input:-ms-input-placeholder{color:rgba(56,61,65,.3)}.vibor .select-search-list-item_input input::-ms-input-placeholder{color:rgba(56,61,65,.3)}.vibor .select-search-list-item_input input::placeholder{color:rgba(56,61,65,.3)}.vibor .select-search-list-item_remove{display:flex;align-items:center;justify-content:center;width:16px;height:16px;margin-left:5px;border-radius:50%;background-color:#bababa;cursor:pointer;transition:background-color .15s linear}.vibor .select-search-list-item_remove:hover{background-color:#949494}.vibor .select-dropdown{position:absolute;top:100%;left:-1px;right:-1px;z-index:2}.vibor .select-search-list-item_loader-center{position:absolute;right:0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);display:flex;align-items:center;justify-content:center;width:21px;height:21px;background:#fff;z-index:2}.vibor .select-search-list-item_loader-center[hidden]{display:none}.vibor .select-search-list-item_loader-center .select-search-list-item_loader{width:16px;height:16px;box-sizing:border-box;border-width:2px;border-style:solid;border-color:#22272e rgba(34,39,46,.4) rgba(34,39,46,.4);border-radius:100%;-webkit-animation:.45s linear infinite clockwise;animation:.45s linear infinite clockwise}.vibor .select-dropdown{border:1px solid #d5d9de;border-bottom-left-radius:5px;border-bottom-right-radius:5px;border-top:0;background:#fff}.vibor .select-dropdown-optgroup{max-height:300px;overflow-y:auto}.vibor .select-dropdown-optgroup-option{min-height:30px;padding:10px 15px}.vibor .select-dropdown-optgroup-option:hover{background-color:rgba(66,132,215,.1)}.vibor .select-dropdown-optgroup-option.loading{font-size:16px;line-height:18px;text-align:center;color:#8b8b83}.vibor .select-dropdown-pager{padding:10px;text-align:center;border-top:1px dashed #d5d9de}.vibor .select-dropdown-pager-page{font-size:12px;color:#8b8b83}.vibor .select-dropdown-pager-loadmore{border:0;background:0 0;box-shadow:none}.vibor .select-dropdown-pager-page+.select-dropdown-pager-loadmore{margin-top:10px}.vibor.open-vibor{border-bottom-left-radius:0;border-bottom-right-radius:0}.vibor.open-vibor .select-search .arrow{-webkit-transform:translateY(-50%) rotate(180deg);transform:translateY(-50%) rotate(180deg)}.vibor:not(.multiple) .select-search-list-item_remove{position:absolute;right:25px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.vibor.multiple .select-search-list{display:flex;flex-flow:row wrap;margin:-5px}.vibor.multiple .select-search-list .select-search-list-item{padding:5px;flex-shrink:0}.vibor.multiple .select-search-list .select-search-list-item_input{flex:1}.vibor.multiple .select-search-list .select-search-list-item_input input{height:28px}.vibor.multiple .vibor__selection{display:flex;align-items:center;height:28px;padding:0 7px;border-radius:3px;font-size:14px;background:#e5e5e7;color:#2c2c2c}@-webkit-keyframes clockwise{to{-webkit-transform:rotate(360deg) translatez(0);transform:rotate(360deg) translatez(0)}}@keyframes clockwise{to{-webkit-transform:rotate(360deg) translatez(0);transform:rotate(360deg) translatez(0)}}"],
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
export { NgViborComponent };
function NgViborComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NgViborComponent.prototype._model;
    /** @type {?} */
    NgViborComponent.prototype.firstLoad;
    /** @type {?} */
    NgViborComponent.prototype.options;
    /** @type {?} */
    NgViborComponent.prototype.output;
    /** @type {?} */
    NgViborComponent.prototype.isOpen;
    /** @type {?} */
    NgViborComponent.prototype.oldQuery;
    /** @type {?} */
    NgViborComponent.prototype.query;
    /** @type {?} */
    NgViborComponent.prototype.selectorPosition;
    /** @type {?} */
    NgViborComponent.prototype.waitTime;
    /** @type {?} */
    NgViborComponent.prototype.el;
    /** @type {?} */
    NgViborComponent.prototype.inputEl;
    /** @type {?} */
    NgViborComponent.prototype.inputControl;
    /** @type {?} */
    NgViborComponent.prototype.multiple;
    /** @type {?} */
    NgViborComponent.prototype.multipleLimit;
    /** @type {?} */
    NgViborComponent.prototype.countOnPage;
    /** @type {?} */
    NgViborComponent.prototype.placeholder;
    /** @type {?} */
    NgViborComponent.prototype.name;
    /** @type {?} */
    NgViborComponent.prototype.required;
    /** @type {?} */
    NgViborComponent.prototype.allowReset;
    /** @type {?} */
    NgViborComponent.prototype.disabled;
    /** @type {?} */
    NgViborComponent.prototype.bothTemplate;
    /** @type {?} */
    NgViborComponent.prototype.dropdownTemplate;
    /** @type {?} */
    NgViborComponent.prototype.selectedTemplate;
    /** @type {?} */
    NgViborComponent.prototype.createTemplate;
    /** @type {?} */
    NgViborComponent.prototype.listFormatter;
    /** @type {?} */
    NgViborComponent.prototype.dropdownFormatter;
    /** @type {?} */
    NgViborComponent.prototype.viewProperty;
    /** @type {?} */
    NgViborComponent.prototype.modelProperty;
    /** @type {?} */
    NgViborComponent.prototype.preloadProperty;
    /** @type {?} */
    NgViborComponent.prototype.preloadField;
    /** @type {?} */
    NgViborComponent.prototype.searchProperty;
    /** @type {?} */
    NgViborComponent.prototype.dataList;
    /** @type {?} */
    NgViborComponent.prototype.excludeList;
    /** @type {?} */
    NgViborComponent.prototype.additionalFilter;
    /** @type {?} */
    NgViborComponent.prototype.onlyEmitter;
    /** @type {?} */
    NgViborComponent.prototype.changeFullModel;
    /** @type {?} */
    NgViborComponent.prototype.newMessage;
    /** @type {?} */
    NgViborComponent.prototype.CreateNew;
    /** @type {?} */
    NgViborComponent.prototype.dataListSub;
    /** @type {?} */
    NgViborComponent.prototype.delay;
    /** @type {?} */
    NgViborComponent.prototype.onChange;
    /** @type {?} */
    NgViborComponent.prototype.onTouched;
    /** @type {?} */
    NgViborComponent.prototype.currentCache;
    /** @type {?} */
    NgViborComponent.prototype.cacheLazyData;
    /** @type {?} */
    NgViborComponent.prototype.elementRef;
}
/**
 * @record
 */
export function CacheInfo() { }
function CacheInfo_tsickle_Closure_declarations() {
    /** @type {?} */
    CacheInfo.prototype.countElement;
    /** @type {?} */
    CacheInfo.prototype.countPages;
    /** @type {?} */
    CacheInfo.prototype.currentPage;
    /** @type {?} */
    CacheInfo.prototype.objects;
    /** @type {?} */
    CacheInfo.prototype.query;
    /** @type {?} */
    CacheInfo.prototype.params;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctdmlib3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdmlib3IvIiwic291cmNlcyI6WyJsaWIvbmctdmlib3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFDekIsWUFBWSxFQUFFLFVBQVUsRUFDWCxZQUFZLEVBQUUsU0FBUyxFQUVyQyxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBRUwsaUJBQWlCLEVBQ2pCLE9BQU8sRUFDUixNQUFNLGdCQUFnQixDQUFDO0FBRXhCLE9BQU8sRUFBZ0IsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRWhELE9BQU8sRUFDSCxrQkFBa0IsRUFDbEIsb0JBQW9CLEVBQ3BCLHNCQUFzQixFQUN0QixzQkFBc0IsRUFDekIsTUFBTSwrQkFBK0IsQ0FBQztBQUV2QyxPQUFPLEVBRUgsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFDZixrQkFBa0IsRUFDckIsTUFBTSxXQUFXLENBQUM7QUFFbkIscUJBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzs7SUFnZHRDLDBCQUFvQixVQUFzQztRQUF0QyxlQUFVLEdBQVYsVUFBVSxDQUE0Qjt5QkFyV3RDLEtBQUs7Z0NBU0MsQ0FBQzt3QkFDUixHQUFHOzt3QkFPSyxLQUFLOzZCQUNBLFFBQVE7MkJBQ1YsRUFBRTsyQkFFRixPQUFPO3dCQUVWLEtBQUs7MEJBQ0gsSUFBSTt3QkFDZixLQUFLOzRCQVNRLE1BQU07NkJBRUwsSUFBSTsrQkFDRixLQUFLOzRCQUNBLFNBQVM7OEJBQ2YsT0FBTztnQ0FJTCxFQUFFOytCQUVrQyxJQUFJLFlBQVksRUFBRTswQkFHcEQsU0FBUzt5QkFDd0IsVUFBQyxLQUFhO1lBQ2xGLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDZDtxQkFxRHlCLENBQUM7WUFDekIscUJBQUksS0FBSyxHQUFHLENBQUMs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LElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsWUFBWSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUN6Rzs7O09BQUE7O2dCQW5xQkYsU0FBUyxTQUFDOztvQkFFVCxRQUFRLEVBQUUsT0FBTztvQkFDakIsUUFBUSxFQUFFLG14SkEwRlg7b0JBQ0MsTUFBTSxFQUFFLENBQUMsa3JKQUF3cUosQ0FBQztvQkFDbHJKLFNBQVMsRUFBRSxDQUFDOzRCQUNWLE9BQU8sRUFBRSxpQkFBaUI7NEJBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLGdCQUFnQixFQUFoQixDQUFnQixDQUFDOzRCQUMvQyxLQUFLLEVBQUUsSUFBSTt5QkFDWixDQUFDO2lCQUNIOzs7O2dCQWhJZSxVQUFVOzs7K0JBbUp2QixTQUFTLFNBQUMsY0FBYzsyQkFHeEIsS0FBSztnQ0FDTCxLQUFLOzhCQUNMLEtBQUs7OEJBRUwsS0FBSzt1QkFDTCxLQUFLOzJCQUNMLEtBQUs7NkJBQ0wsS0FBSzsrQkFJTCxZQUFZLFNBQUMsa0JBQWtCO21DQUMvQixZQUFZLFNBQUMsc0JBQXNCO21DQUNuQyxZQUFZLFNBQUMsc0JBQXNCO2lDQUNuQyxZQUFZLFNBQUMsb0JBQW9CO2dDQUNqQyxLQUFLO29DQUNMLEtBQUs7K0JBQ0wsS0FBSztnQ0FFTCxLQUFLO2tDQUNMLEtBQUs7K0JBQ0wsS0FBSztpQ0FDTCxLQUFLOzJCQUVMLEtBQUs7OEJBQ0wsS0FBSzttQ0FDTCxLQUFLOzhCQUNMLEtBQUs7a0NBQ0wsTUFBTSxTQUFDLGlCQUFpQjs2QkFHeEIsS0FBSzs0QkFDTCxLQUFLOzsyQkF6TFI7O1NBb0lhLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCwgT25Jbml0LCBPbkNoYW5nZXMsXG4gIElucHV0LCBPdXRwdXQsIGZvcndhcmRSZWYsXG4gIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZixcbiAgVGVtcGxhdGVSZWYsIENvbnRlbnRDaGlsZCwgVmlld0NoaWxkLFxuICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gIE5HX1ZBTFVFX0FDQ0VTU09SLFxuICBOZ01vZGVsXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7XG4gICAgVmlib3JCb3RoRGlyZWN0aXZlLFxuICAgIFZpYm9yQ3JlYXRlRGlyZWN0aXZlLFxuICAgIFZpYm9yRHJvcGRvd25EaXJlY3RpdmUsXG4gICAgVmlib3JTZWxlY3RlZERpcmVjdGl2ZVxufSBmcm9tICcuL25nLXZpYm9yLXRlbXBsYXRlLmRpcmVjdGl2ZSc7XG5cbmltcG9ydCB7XG4gICAgSURhdGFSZXNwb25zZSxcbiAgICBkZWZhdWx0Rm9ybWF0dGVyLFxuICAgIGZldGNoRnJvbU9iamVjdCxcbiAgICBzY3JvbGxBY3RpdmVPcHRpb25cbn0gZnJvbSAnLi9oZWxwZXJzJztcblxuY29uc3QgZGVlcEVxdWFsID0gcmVxdWlyZSgnZGVlcC1lcXVhbCcpO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ3ZpYm9yJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwidmlib3JcIj5cbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuXG4gIDxkaXYgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoXCIgKGNsaWNrKT1cInNob3dEcm9wZG93bkxpc3QoJGV2ZW50KTtcIj5cbiAgICA8dWwgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoLWxpc3RcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJtdWx0aXBsZSB8fCAhaXNPcGVuXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhU2VsZWN0ZWRUZW1wbGF0ZTsgZWxzZSBzZWxlY3RlZFRcIj5cbiAgICAgICAgICA8bGkgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbSBzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9zZWxlY3Rpb25cIiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBvdXRwdXQ7IGxldCAkaW5kZXg9aW5kZXg7IGxldCAkbGFzdD1sYXN0OyB0cmFja0J5OiBUcmFja0J5Rm47XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlib3JfX3NlbGVjdGlvblwiPlxuICAgICAgICAgICAgICA8ZGl2IFtpbm5lckhUTUxdPVwiZ2V0TGlzdEZvcm1hdHRlZChpdGVtKVwiPjwvZGl2PlxuICAgICAgICAgICAgICA8YSBjbGFzcz1cInNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX3JlbW92ZVwiICpuZ0lmPVwiYWxsb3dSZXNldFwiIChjbGljayk9XCIhZGlzYWJsZWQgJiYgcmVtb3ZlT25lKCRpbmRleCwgJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiPlxuICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbD1cIiMyYzJjMmNcIiBkPVwiTTEwLjEgNC41TDggNi42IDUuOSA0LjUgNC41IDUuOSA2LjYgOGwtMi4xIDIuMSAxLjQgMS40TDggOS40bDIuMSAyLjEgMS40LTEuNEw5LjQgOGwyLjEtMi4xelwiLz5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgPG5nLXRlbXBsYXRlICNzZWxlY3RlZFQ+XG4gICAgICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LXNlYXJjaC1saXN0LWl0ZW0gc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fc2VsZWN0aW9uXCIgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygb3V0cHV0OyBsZXQgJGluZGV4PWluZGV4OyBsZXQgJGxhc3Q9bGFzdDsgdHJhY2tCeTogVHJhY2tCeUZuO1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZpYm9yX19zZWxlY3Rpb25cIj5cbiAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIlNlbGVjdGVkVGVtcGxhdGU7IGNvbnRleHQ6IHtpdGVtOiBpdGVtfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICA8YSBjbGFzcz1cInNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX3JlbW92ZVwiICpuZ0lmPVwiYWxsb3dSZXNldCAmJiAhZGlzYWJsZWRcIiAoY2xpY2spPVwiIWRpc2FibGVkICYmIHJlbW92ZU9uZSgkaW5kZXgsICRldmVudClcIj5cbiAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIj5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCIjMmMyYzJjXCIgZD1cIk0xMC4xIDQuNUw4IDYuNiA1LjkgNC41IDQuNSA1LjkgNi42IDhsLTIuMSAyLjEgMS40IDEuNEw4IDkuNGwyLjEgMi4xIDEuNC0xLjRMOS40IDhsMi4xLTIuMXpcIi8+XG4gICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LXNlYXJjaC1saXN0LWl0ZW0gc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faW5wdXRcIiBbY2xhc3Muc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faGlkZV09XCJJbnB1dEhpZGVcIj5cbiAgICAgICAgPGlucHV0IGF1dG9jb21wbGV0ZT1cIm9mZlwiICNpbnB1dENvbnRyb2w9XCJuZ01vZGVsXCIgW25hbWVdPVwibmFtZVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIFsobmdNb2RlbCldPVwicXVlcnlcIiBbcGxhY2Vob2xkZXJdPVwib3V0cHV0Lmxlbmd0aCA9PSAwIHx8IChtdWx0aXBsZSAmJiBvdXRwdXQubGVuZ3RoIDwgbXVsdGlwbGVMaW1pdCkgPyBwbGFjZWhvbGRlciA6ICcnXCJcbiAgICAgICAgICAoaW5wdXQpPVwidXBkYXRlT3B0aW9uc0luRGVsYXkoKVwiIChrZXlkb3duKT1cImtleURvd24oJGV2ZW50KVwiIC8+XG4gICAgICA8L2xpPlxuICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LXNlYXJjaC1saXN0LWl0ZW0gc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fbG9hZGVyLWNlbnRlclwiIFtoaWRkZW5dPVwiIWRhdGFMaXN0U3ViIHx8IGRhdGFMaXN0U3ViLmNsb3NlZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fbG9hZGVyXCI+PC9kaXY+XG4gICAgICA8L2xpPlxuXG4gICAgICA8c3BhbiBjbGFzcz1cImFycm93XCIgKGNsaWNrKT1cInRvZ2dsZURyb3Bkb3duKCRldmVudClcIj5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L3VsPlxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duXCIgKm5nSWY9XCJpc09wZW5cIj5cbiAgICA8dWwgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXBcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhRHJvcGRvd25UZW1wbGF0ZTsgZWxzZSBkcm9wZG93blRcIj5cbiAgICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvblwiICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgT3B0aW9uczsgbGV0IGk9aW5kZXhcIiAobW91c2Vkb3duKT1cInNlbGVjdE9uZSgkZXZlbnQsIG9wdGlvbilcIlxuICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaSA9PT0gc2VsZWN0b3JQb3NpdGlvblwiIFtpbm5lckhUTUxdPVwiZ2V0RHJvcGRvd25Gb3JtYXR0ZWQob3B0aW9uKVwiPlxuICAgICAgICA8L2xpPlxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgIDxuZy10ZW1wbGF0ZSAjZHJvcGRvd25UPlxuICAgICAgICA8bGkgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXAtb3B0aW9uXCIgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBPcHRpb25zOyBsZXQgaT1pbmRleFwiIChtb3VzZWRvd24pPVwic2VsZWN0T25lKCRldmVudCwgb3B0aW9uKVwiXG4gICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJpID09PSBzZWxlY3RvclBvc2l0aW9uXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIkRyb3Bkb3duVGVtcGxhdGU7IGNvbnRleHQ6IHtpdGVtOiBvcHRpb259XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbGk+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgICA8bGkgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXAtb3B0aW9uIGxvYWRpbmdcIiAqbmdJZj1cImRhdGFMaXN0U3ViICYmICFkYXRhTGlzdFN1Yi5jbG9zZWRcIj5cbiAgICAgICAg0JfQsNCz0YDRg9C30LrQsFxuICAgICAgPC9saT5cbiAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb24gbG9hZGVyXCIgKG1vdXNlZG93bik9XCJBZGROZXdPYmplY3QoQ3JlYXRlTmV3KHF1ZXJ5KSk7XCIgW2NsYXNzLmFjdGl2ZV09XCJzZWxlY3RvclBvc2l0aW9uID09PSBPcHRpb25zLmxlbmd0aFwiXG4gICAgICAgICpuZ0lmPVwiU2hvd05ld1wiPlxuXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjcmVhdGVUZW1wbGF0ZTsgZWxzZSB0ZW1wbGF0ZVdpdGhNZXNzYWdlXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNyZWF0ZVRlbXBsYXRlLnRlbXBsYXRlUmVmOyBjb250ZXh0OiB7cXVlcnk6IHF1ZXJ5fVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICA8bmctdGVtcGxhdGUgI3RlbXBsYXRlV2l0aE1lc3NhZ2U+XG4gICAgICAgICAge3sgbmV3TWVzc2FnZSB9fVxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPC9saT5cbiAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb24gbG9hZGVyXCIgKm5nSWY9XCJTaG93RW1wdHlcIj5cbiAgICAgICAg0J/Rg9GB0YLQvlxuICAgICAgPC9saT5cbiAgICA8L3VsPlxuICAgIDxkaXYgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tcGFnZXJcIiAqbmdJZj1cImN1cnJlbnRDYWNoZSAmJiBjdXJyZW50Q2FjaGUuY291bnRQYWdlcyA+IDFcIj5cbiAgICAgIDxwIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLXBhZ2VyLXBhZ2VcIj5cbiAgICAgICAge3sgY3VycmVudENhY2hlLmN1cnJlbnRQYWdlIHwgbnVtYmVyIH19IC8ge3sgY3VycmVudENhY2hlLmNvdW50UGFnZXMgfCBudW1iZXIgfX1cbiAgICAgIDwvcD5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tcGFnZXItbG9hZG1vcmVcIiAqbmdJZj1cImN1cnJlbnRDYWNoZS5jb3VudFBhZ2VzID4gMSAmJiBjdXJyZW50Q2FjaGUuY3VycmVudFBhZ2UgPCBjdXJyZW50Q2FjaGUuY291bnRQYWdlc1wiXG4gICAgICAgIChtb3VzZWRvd24pPVwibmV4dFBhZ2UoJGV2ZW50KVwiPlxuICAgICAgICDQl9Cw0LPRgNGD0LfQuNGC0Ywg0LXRidGRXG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2Audmlib3IgYSwudmlib3IgbGFiZWwsLnZpYm9yIGxlZ2VuZCwudmlib3IgcCwudmlib3Igc3Bhbiwudmlib3IgdWx7bWFyZ2luOjA7cGFkZGluZzowO2JvcmRlcjowfS52aWJvciBhLC52aWJvciBidXR0b24sLnZpYm9yIGlucHV0e291dGxpbmU6MH0udmlib3Igb2wsLnZpYm9yIHVse2xpc3Qtc3R5bGU6bm9uZX0udmlib3IgaW5wdXR7cGFkZGluZzowO21hcmdpbjowO2JvcmRlcjowO2ZvbnQ6aW5oZXJpdH0udmlib3IgYntmb250LXdlaWdodDo0MDB9LnZpYm9ye3Bvc2l0aW9uOnJlbGF0aXZlO2Rpc3BsYXk6YmxvY2s7cGFkZGluZzoxMHB4IDE1cHg7Ym9yZGVyOjFweCBzb2xpZCAjZDVkOWRlO2JvcmRlci1yYWRpdXM6M3B4O2ZvbnQtZmFtaWx5Oi1hcHBsZS1zeXN0ZW0sQmxpbmtNYWNTeXN0ZW1Gb250LFwiU2Vnb2UgVUlcIixSb2JvdG8sSGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWYsXCJBcHBsZSBDb2xvciBFbW9qaVwiLFwiU2Vnb2UgVUkgRW1vamlcIixcIlNlZ29lIFVJIFN5bWJvbFwiO3RyYW5zaXRpb246Ym94LXNoYWRvdyAuMTVzIGxpbmVhcn0udmlib3I6aG92ZXIsLnZpYm9yOmhvdmVyIC5zZWxlY3QtZHJvcGRvd257Ym94LXNoYWRvdzowIDNweCA2cHggMCByZ2JhKDQ0LDQ0LDQ0LC4xKX0udmlib3IgLnNlbGVjdC1zZWFyY2h7cG9zaXRpb246cmVsYXRpdmV9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoIC5hcnJvd3tjb250ZW50OlwiXCI7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MDt0b3A6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7ZGlzcGxheTpibG9jazt3aWR0aDoxNnB4O2hlaWdodDoxNnB4O2JhY2tncm91bmQtaW1hZ2U6dXJsKGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QmpiR0Z6Y3owaWJtTXRhV052YmlCbmJIbHdhQ0lnZUcxc2JuTTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TURBdmMzWm5JaUIzYVdSMGFEMGlNVFlpSUdobGFXZG9kRDBpTVRZaUlIWnBaWGRDYjNnOUlqQWdNQ0F4TmlBeE5pSStEUW9nSUR4d1lYUm9JR1pwYkd3OUlpTXlZekpqTW1NaUlHUTlJazA0SURFeExqUk1NaTQySURZZ05DQTBMalpzTkNBMElEUXRORXd4TXk0MElEWWlMejROQ2p3dmMzWm5QZzBLKTt0cmFuc2l0aW9uOi13ZWJraXQtdHJhbnNmb3JtIC4xNXMgZWFzZS1pbi1vdXQ7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjE1cyBlYXNlLWluLW91dDt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMTVzIGVhc2UtaW4tb3V0LC13ZWJraXQtdHJhbnNmb3JtIC4xNXMgZWFzZS1pbi1vdXR9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoIC5hcnJvdzpiZWZvcmUsLnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9oaWRle2Rpc3BsYXk6bm9uZX0udmlib3IgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX3NlbGVjdGlvbntwb3NpdGlvbjpyZWxhdGl2ZX0udmlib3IgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2lucHV0IGlucHV0e3dpZHRoOjEwMCU7dGV4dC1vdmVyZmxvdzplbGxpcHNpcztmb250LXNpemU6MTRweDtjb2xvcjojMzgzZDQxfS52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faW5wdXQgaW5wdXQ6Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXJ7Y29sb3I6cmdiYSg1Niw2MSw2NSwuMyl9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9pbnB1dCBpbnB1dDotbXMtaW5wdXQtcGxhY2Vob2xkZXJ7Y29sb3I6cmdiYSg1Niw2MSw2NSwuMyl9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9pbnB1dCBpbnB1dDo6LW1zLWlucHV0LXBsYWNlaG9sZGVye2NvbG9yOnJnYmEoNTYsNjEsNjUsLjMpfS52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faW5wdXQgaW5wdXQ6OnBsYWNlaG9sZGVye2NvbG9yOnJnYmEoNTYsNjEsNjUsLjMpfS52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fcmVtb3Zle2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjt3aWR0aDoxNnB4O2hlaWdodDoxNnB4O21hcmdpbi1sZWZ0OjVweDtib3JkZXItcmFkaXVzOjUwJTtiYWNrZ3JvdW5kLWNvbG9yOiNiYWJhYmE7Y3Vyc29yOnBvaW50ZXI7dHJhbnNpdGlvbjpiYWNrZ3JvdW5kLWNvbG9yIC4xNXMgbGluZWFyfS52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fcmVtb3ZlOmhvdmVye2JhY2tncm91bmQtY29sb3I6Izk0OTQ5NH0udmlib3IgLnNlbGVjdC1kcm9wZG93bntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MTAwJTtsZWZ0Oi0xcHg7cmlnaHQ6LTFweDt6LWluZGV4OjJ9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9sb2FkZXItY2VudGVye3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjA7dG9wOjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpO2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjt3aWR0aDoyMXB4O2hlaWdodDoyMXB4O2JhY2tncm91bmQ6I2ZmZjt6LWluZGV4OjJ9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9sb2FkZXItY2VudGVyW2hpZGRlbl17ZGlzcGxheTpub25lfS52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fbG9hZGVyLWNlbnRlciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fbG9hZGVye3dpZHRoOjE2cHg7aGVpZ2h0OjE2cHg7Ym94LXNpemluZzpib3JkZXItYm94O2JvcmRlci13aWR0aDoycHg7Ym9yZGVyLXN0eWxlOnNvbGlkO2JvcmRlci1jb2xvcjojMjIyNzJlIHJnYmEoMzQsMzksNDYsLjQpIHJnYmEoMzQsMzksNDYsLjQpO2JvcmRlci1yYWRpdXM6MTAwJTstd2Via2l0LWFuaW1hdGlvbjouNDVzIGxpbmVhciBpbmZpbml0ZSBjbG9ja3dpc2U7YW5pbWF0aW9uOi40NXMgbGluZWFyIGluZmluaXRlIGNsb2Nrd2lzZX0udmlib3IgLnNlbGVjdC1kcm9wZG93bntib3JkZXI6MXB4IHNvbGlkICNkNWQ5ZGU7Ym9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czo1cHg7Ym9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6NXB4O2JvcmRlci10b3A6MDtiYWNrZ3JvdW5kOiNmZmZ9LnZpYm9yIC5zZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXB7bWF4LWhlaWdodDozMDBweDtvdmVyZmxvdy15OmF1dG99LnZpYm9yIC5zZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXAtb3B0aW9ue21pbi1oZWlnaHQ6MzBweDtwYWRkaW5nOjEwcHggMTVweH0udmlib3IgLnNlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb246aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDY2LDEzMiwyMTUsLjEpfS52aWJvciAuc2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvbi5sb2FkaW5ne2ZvbnQtc2l6ZToxNnB4O2xpbmUtaGVpZ2h0OjE4cHg7dGV4dC1hbGlnbjpjZW50ZXI7Y29sb3I6IzhiOGI4M30udmlib3IgLnNlbGVjdC1kcm9wZG93bi1wYWdlcntwYWRkaW5nOjEwcHg7dGV4dC1hbGlnbjpjZW50ZXI7Ym9yZGVyLXRvcDoxcHggZGFzaGVkICNkNWQ5ZGV9LnZpYm9yIC5zZWxlY3QtZHJvcGRvd24tcGFnZXItcGFnZXtmb250LXNpemU6MTJweDtjb2xvcjojOGI4YjgzfS52aWJvciAuc2VsZWN0LWRyb3Bkb3duLXBhZ2VyLWxvYWRtb3Jle2JvcmRlcjowO2JhY2tncm91bmQ6MCAwO2JveC1zaGFkb3c6bm9uZX0udmlib3IgLnNlbGVjdC1kcm9wZG93bi1wYWdlci1wYWdlKy5zZWxlY3QtZHJvcGRvd24tcGFnZXItbG9hZG1vcmV7bWFyZ2luLXRvcDoxMHB4fS52aWJvci5vcGVuLXZpYm9ye2JvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6MDtib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czowfS52aWJvci5vcGVuLXZpYm9yIC5zZWxlY3Qtc2VhcmNoIC5hcnJvd3std2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpIHJvdGF0ZSgxODBkZWcpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpIHJvdGF0ZSgxODBkZWcpfS52aWJvcjpub3QoLm11bHRpcGxlKSAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fcmVtb3Zle3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjI1cHg7dG9wOjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpfS52aWJvci5tdWx0aXBsZSAuc2VsZWN0LXNlYXJjaC1saXN0e2Rpc3BsYXk6ZmxleDtmbGV4LWZsb3c6cm93IHdyYXA7bWFyZ2luOi01cHh9LnZpYm9yLm11bHRpcGxlIC5zZWxlY3Qtc2VhcmNoLWxpc3QgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVte3BhZGRpbmc6NXB4O2ZsZXgtc2hyaW5rOjB9LnZpYm9yLm11bHRpcGxlIC5zZWxlY3Qtc2VhcmNoLWxpc3QgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2lucHV0e2ZsZXg6MX0udmlib3IubXVsdGlwbGUgLnNlbGVjdC1zZWFyY2gtbGlzdCAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faW5wdXQgaW5wdXR7aGVpZ2h0OjI4cHh9LnZpYm9yLm11bHRpcGxlIC52aWJvcl9fc2VsZWN0aW9ue2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7aGVpZ2h0OjI4cHg7cGFkZGluZzowIDdweDtib3JkZXItcmFkaXVzOjNweDtmb250LXNpemU6MTRweDtiYWNrZ3JvdW5kOiNlNWU1ZTc7Y29sb3I6IzJjMmMyY31ALXdlYmtpdC1rZXlmcmFtZXMgY2xvY2t3aXNle3Rvey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpIHRyYW5zbGF0ZXooMCk7dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpIHRyYW5zbGF0ZXooMCl9fUBrZXlmcmFtZXMgY2xvY2t3aXNle3Rvey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpIHRyYW5zbGF0ZXooMCk7dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpIHRyYW5zbGF0ZXooMCl9fWBdLFxuICBwcm92aWRlcnM6IFt7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdWaWJvckNvbXBvbmVudCksXG4gICAgbXVsdGk6IHRydWVcbiAgfV1cbn0pXG5leHBvcnQgY2xhc3MgTmdWaWJvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIC8vIExvY2FsIFZhcmlhYmxlXG4gIHB1YmxpYyBfbW9kZWw6IGFueTtcblxuICBwcml2YXRlIGZpcnN0TG9hZCA9IGZhbHNlO1xuICBwcml2YXRlIG9wdGlvbnM6IEFycmF5PGFueT47XG4gIHB1YmxpYyBvdXRwdXQ6IEFycmF5PGFueT47XG5cbiAgcHVibGljIGlzT3BlbjogYm9vbGVhbjtcblxuICBwcml2YXRlIG9sZFF1ZXJ5OiBzdHJpbmc7XG4gIHB1YmxpYyBxdWVyeTogc3RyaW5nO1xuXG4gIHB1YmxpYyBzZWxlY3RvclBvc2l0aW9uID0gMDtcbiAgcHJpdmF0ZSB3YWl0VGltZSA9IDUwMDtcblxuICBwcml2YXRlIGVsOiBFbGVtZW50OyAgICAgICAgICAgLy8gdGhpcyBjb21wb25lbnQgIGVsZW1lbnQgYDx2aWJvcj5gXG4gIHByaXZhdGUgaW5wdXRFbDogSFRNTElucHV0RWxlbWVudDsgLy8gYDxpbnB1dD5gIGVsZW1lbnQgaW4gYDx2aWJvcj5gIGZvciBhdXRvIGNvbXBsZXRlXG4gIEBWaWV3Q2hpbGQoJ2lucHV0Q29udHJvbCcpIHB1YmxpYyBpbnB1dENvbnRyb2w6IE5nTW9kZWw7XG5cbiAgLy8gSW5wdXRzICYgT3V0cHV0c1xuICBASW5wdXQoKSBwdWJsaWMgbXVsdGlwbGUgPSBmYWxzZTtcbiAgQElucHV0KCkgcHVibGljIG11bHRpcGxlTGltaXQgPSBJbmZpbml0eTtcbiAgQElucHV0KCkgcHVibGljIGNvdW50T25QYWdlID0gMTA7XG5cbiAgQElucHV0KCkgcHVibGljIHBsYWNlaG9sZGVyID0gJ1ZpYm9yJztcbiAgQElucHV0KCkgcHVibGljIG5hbWU6IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIHJlcXVpcmVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIHB1YmxpYyBhbGxvd1Jlc2V0ID0gdHJ1ZTtcbiAgcHVibGljIGRpc2FibGVkID0gZmFsc2U7XG5cbiAgLy8g0J7RgtC+0LHRgNCw0LbQtdC90LjQtSDRgdC/0LjRgdC60L7QslxuICBAQ29udGVudENoaWxkKFZpYm9yQm90aERpcmVjdGl2ZSkgcHVibGljIGJvdGhUZW1wbGF0ZTogVmlib3JCb3RoRGlyZWN0aXZlO1xuICBAQ29udGVudENoaWxkKFZpYm9yRHJvcGRvd25EaXJlY3RpdmUpIHB1YmxpYyBkcm9wZG93blRlbXBsYXRlOiBWaWJvckRyb3Bkb3duRGlyZWN0aXZlO1xuICBAQ29udGVudENoaWxkKFZpYm9yU2VsZWN0ZWREaXJlY3RpdmUpIHB1YmxpYyBzZWxlY3RlZFRlbXBsYXRlOiBWaWJvclNlbGVjdGVkRGlyZWN0aXZlO1xuICBAQ29udGVudENoaWxkKFZpYm9yQ3JlYXRlRGlyZWN0aXZlKSBwdWJsaWMgY3JlYXRlVGVtcGxhdGU6IFZpYm9yQ3JlYXRlRGlyZWN0aXZlO1xuICBASW5wdXQoKSBwdWJsaWMgbGlzdEZvcm1hdHRlcjogKGFyZzogYW55LCB2YWx1ZTogc3RyaW5nKSA9PiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBkcm9wZG93bkZvcm1hdHRlcjogKGFyZzogYW55LCB2YWx1ZTogc3RyaW5nKSA9PiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyB2aWV3UHJvcGVydHkgPSAnTmFtZSc7ICAvLyDQn9C+0LvQtSDQtNC70Y8g0LTQtdGE0L7Qu9GC0L3QvtCz0L4g0L7RgtC+0LHRgNCw0LbQtdC90LjRj1xuXG4gIEBJbnB1dCgpIHB1YmxpYyBtb2RlbFByb3BlcnR5ID0gJ2lkJzsgIC8vINCi0L4sINGH0YLQviDQt9Cw0L/QuNGB0YvQstCw0LXRgtGB0Y8g0LIg0JzQvtC00LXQu9GMXG4gIEBJbnB1dCgpIHB1YmxpYyBwcmVsb2FkUHJvcGVydHkgPSAnaWRzJzsgLy8g0JrQu9GO0Ycg0LfQsNC/0YDQvtGB0LAg0Log0YHQtdGA0LLQtdGA0YMg0LTQu9GPINC/0YDQtdC00LfQsNCz0YDRg9C30LrQuCwg0LXRgdC70LggdW5kZWZpbmVkINC30LDQv9C40YHRi9Cy0LDQtdGC0YHRjyDQstC10YHRjCDQvtCx0YrQtdC60YJcbiAgQElucHV0KCkgcHVibGljIHByZWxvYWRGaWVsZDogc3RyaW5nID0gdW5kZWZpbmVkOyAvLyDQl9C90LDRh9C10L3QuNC1INC/0L7Qu9GPLCDQutC+0YLQvtGA0LUg0L3QtdC+0LHRhdC+0LTQuNC80L4g0L7RgtC/0YDQsNCy0LjRgtGMINCyINC30LDQv9GA0L7RgS5cbiAgQElucHV0KCkgcHVibGljIHNlYXJjaFByb3BlcnR5ID0gJ3F1ZXJ5JztcblxuICBASW5wdXQoKSBwdWJsaWMgZGF0YUxpc3Q6ICgocGFyYW06IE9iamVjdCwgcGFnZTogbnVtYmVyLCBjb3VudE9uUGFnZT86IG51bWJlcikgPT4gT2JzZXJ2YWJsZTxJRGF0YVJlc3BvbnNlPikgfCBBcnJheTxhbnk+O1xuICBASW5wdXQoKSBwdWJsaWMgZXhjbHVkZUxpc3Q6IEFycmF5PGFueT47XG4gIEBJbnB1dCgpIHB1YmxpYyBhZGRpdGlvbmFsRmlsdGVyID0ge307XG4gIEBJbnB1dCgpIHB1YmxpYyBvbmx5RW1pdHRlcjogYm9vbGVhbjtcbiAgQE91dHB1dCgnY2hhbmdlRnVsbE1vZGVsJykgcHVibGljIGNoYW5nZUZ1bGxNb2RlbDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblxuICBASW5wdXQoKSBwdWJsaWMgbmV3TWVzc2FnZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuICBASW5wdXQoKSBwdWJsaWMgQ3JlYXRlTmV3OiAocXVlcnk6IHN0cmluZykgPT4gT2JzZXJ2YWJsZTxhbnk+IHwgYW55ID0gKHF1ZXJ5OiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gcXVlcnk7XG4gIH1cblxuXG4gIC8vIFN1YnNjcmlwdGlvblxuICBwdWJsaWMgZGF0YUxpc3RTdWI6IFN1YnNjcmlwdGlvbjtcblxuXG4gIC8vIE9QVElPTlNcbiAgcHVibGljIFRyYWNrQnlGbihpbmRleDogbnVtYmVyKTogYW55IHtcbiAgICByZXR1cm4gaW5kZXg7XG4gIH1cblxuICBwdWJsaWMgc2hvd0Ryb3Bkb3duTGlzdChldmVudDogRm9jdXNFdmVudCB8IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5tdWx0aXBsZSAmJiB0aGlzLm91dHB1dC5sZW5ndGggPj0gdGhpcy5tdWx0aXBsZUxpbWl0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCdvcGVuLXZpYm9yJyk7XG4gICAgdGhpcy5pbnB1dEVsLmZvY3VzKCk7XG4gICAgdGhpcy51cGRhdGVPcHRpb25zKCk7XG4gICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgfVxuXG4gIHByaXZhdGUgaGlkZURyb3Bkb3duTGlzdCgpOiB2b2lkIHtcbiAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4tdmlib3InKTtcbiAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgIHRoaXMuaW5wdXRFbC5ibHVyKCk7XG4gIH1cblxuICBwdWJsaWMgaGlkZURyb3Bkb3duTGlzdFdpdGhEZWxheSgpOiB2b2lkIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuaGlkZURyb3Bkb3duTGlzdCgpO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlRHJvcGRvd24oZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICB0aGlzLmhpZGVEcm9wZG93bkxpc3QoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaG93RHJvcGRvd25MaXN0KHVuZGVmaW5lZCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZWxheTogRnVuY3Rpb24gPSAoZnVuY3Rpb24gKCk6IEZ1bmN0aW9uIHtcbiAgICBsZXQgdGltZXIgPSAwO1xuICAgIHJldHVybiBmdW5jdGlvbiAoY2FsbGJhY2s6IGFueSwgbXM6IG51bWJlcik6IHZvaWQge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIHRpbWVyID0gc2V0VGltZW91dChjYWxsYmFjaywgbXMpO1xuICAgIH07XG4gIH0pKCk7XG5cbiAgcHVibGljIHVwZGF0ZU9wdGlvbnMoKTogdm9pZCB7XG4gICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgIGlmICh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHRoaXMub3B0aW9ucyA9IHRoaXMuZGF0YUxpc3QuZmlsdGVyKGRhdGEgPT4ge1xuICAgICAgICBpZiAoIXRoaXMucXVlcnkgfHwgdGhpcy5xdWVyeS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZjogYW55ID0gZmV0Y2hGcm9tT2JqZWN0KGRhdGEsIHRoaXMuc2VhcmNoUHJvcGVydHkpO1xuICAgICAgICBpZiAoZiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShmKS5pbmRleE9mKHRoaXMucXVlcnkpID49IDA7XG4gICAgICB9KS5maWx0ZXIoZGF0YSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5leGNsdWRlTGlzdCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGQgPSBmZXRjaEZyb21PYmplY3QoZGF0YSwgdGhpcy5tb2RlbFByb3BlcnR5KS52YWx1ZU9mKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmV4Y2x1ZGVMaXN0LmZpbmRJbmRleChleCA9PiB7XG4gICAgICAgICAgbGV0IGEgPSBmZXRjaEZyb21PYmplY3QoZXgsIHRoaXMubW9kZWxQcm9wZXJ0eSkudmFsdWVPZigpO1xuICAgICAgICAgIHJldHVybiBkZWVwRXF1YWwoZCwgYSk7XG4gICAgICAgIH0pIDwgMDtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kYXRhTGlzdFN1YikgeyB0aGlzLmRhdGFMaXN0U3ViLnVuc3Vic2NyaWJlKCk7IH1cbiAgICAgIGlmICghdGhpcy5jdXJyZW50Q2FjaGUpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50Q2FjaGUgPSB7XG4gICAgICAgICAgY291bnRFbGVtZW50OiAwLFxuICAgICAgICAgIGNvdW50UGFnZXM6IDEsXG4gICAgICAgICAgY3VycmVudFBhZ2U6IDEsXG4gICAgICAgICAgb2JqZWN0czogW10sXG4gICAgICAgICAgcXVlcnk6IHRoaXMucXVlcnksXG4gICAgICAgICAgcGFyYW1zOiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmFkZGl0aW9uYWxGaWx0ZXIpXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY2FjaGVMYXp5RGF0YS5wdXNoKHRoaXMuY3VycmVudENhY2hlKTtcblxuICAgICAgICBsZXQgcGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5hZGRpdGlvbmFsRmlsdGVyKSBhcyBhbnk7XG4gICAgICAgIHBhcmFtc1t0aGlzLnNlYXJjaFByb3BlcnR5XSA9IHRoaXMucXVlcnk7XG5cbiAgICAgICAgdGhpcy5kYXRhTGlzdFN1YiA9ICg8T2JzZXJ2YWJsZTxJRGF0YVJlc3BvbnNlPj50aGlzLmRhdGFMaXN0KHBhcmFtcywgMSwgdGhpcy5jb3VudE9uUGFnZSkpLnN1YnNjcmliZShhbnN3ZXIgPT4ge1xuICAgICAgICAgIHRoaXMuY3VycmVudENhY2hlLm9iamVjdHMgPSB0aGlzLmN1cnJlbnRDYWNoZS5vYmplY3RzLmNvbmNhdChhbnN3ZXIubGlzdCk7XG4gICAgICAgICAgdGhpcy5jdXJyZW50Q2FjaGUuY291bnRFbGVtZW50ID0gYW5zd2VyLmhlYWRlcnNbJ2NvdW50J107XG4gICAgICAgICAgdGhpcy5jdXJyZW50Q2FjaGUuY291bnRQYWdlcyA9IE1hdGguY2VpbCh0aGlzLmN1cnJlbnRDYWNoZS5jb3VudEVsZW1lbnQgLyB0aGlzLmNvdW50T25QYWdlKTtcbiAgICAgICAgfSwgKCkgPT4geyB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlT3B0aW9uc0luRGVsYXkoKTogdm9pZCB7XG4gICAgbGV0IGRlbGF5TXM6IG51bWJlciA9IHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBBcnJheSA/IDEwIDogdGhpcy53YWl0VGltZTtcblxuICAgIC8vIGV4ZWN1dGluZyBhZnRlciB1c2VyIHN0b3BwZWQgdHlwaW5nXG4gICAgdGhpcy5kZWxheSgoKSA9PiB7XG4gICAgICB0aGlzLm9sZFF1ZXJ5ID0gdGhpcy5xdWVyeTtcbiAgICAgIHRoaXMuY3VycmVudENhY2hlID0gdGhpcy5HZXRDYWNoZSh0aGlzLnF1ZXJ5KTtcbiAgICAgIHRoaXMudXBkYXRlT3B0aW9ucygpO1xuICAgIH0sIGRlbGF5TXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBmb2N1c1NlbGVjdGVkT3B0aW9uKCk6IHZvaWQge1xuICAgIGxldCBsaXN0OiBhbnkgPSA8SFRNTEVsZW1lbnQ+dGhpcy5lbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzZWxlY3QtZHJvcGRvd24nKVswXTtcbiAgICBsZXQgdGFyZ2V0TGk6IGFueSA9IDxIVE1MRWxlbWVudD50aGlzLmVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb24nKVt0aGlzLnNlbGVjdG9yUG9zaXRpb25dO1xuICAgIHNjcm9sbEFjdGl2ZU9wdGlvbihsaXN0LCB0YXJnZXRMaSk7XG4gIH1cblxuICBwdWJsaWMga2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5PcHRpb25zKSB7XG4gICAgICB0aGlzLnNob3dEcm9wZG93bkxpc3QodW5kZWZpbmVkKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgdG90YWxOdW1JdGVtOiBudW1iZXIgPSB0aGlzLk9wdGlvbnMubGVuZ3RoO1xuXG4gICAgaWYgKHRoaXMuU2hvd05ldykge1xuICAgICAgdG90YWxOdW1JdGVtKys7XG4gICAgfVxuXG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICBjYXNlIDI3OiAvLyBFU0MsIGhpZGUgYXV0byBjb21wbGV0ZVxuICAgICAgICB0aGlzLmhpZGVEcm9wZG93bkxpc3QoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgMzg6IC8vIFVQLCBzZWxlY3QgdGhlIHByZXZpb3VzIGxpIGVsXG4gICAgICAgIHRoaXMuc2VsZWN0b3JQb3NpdGlvbiA9ICh0b3RhbE51bUl0ZW0gKyB0aGlzLnNlbGVjdG9yUG9zaXRpb24gLSAxKSAlIHRvdGFsTnVtSXRlbTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgNDA6IC8vIERPV04sIHNlbGVjdCB0aGUgbmV4dCBsaSBlbCBvciB0aGUgZmlyc3Qgb25lXG4gICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zZWxlY3RvclBvc2l0aW9uID0gKHRvdGFsTnVtSXRlbSArIHRoaXMuc2VsZWN0b3JQb3NpdGlvbiArIDEpICUgdG90YWxOdW1JdGVtO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAxMzogLy8gRU5URVIsIGNob29zZSBpdCEhXG4gICAgICAgIGlmICh0b3RhbE51bUl0ZW0gPiAwKSB7XG4gICAgICAgICAgaWYgKHRoaXMuc2VsZWN0b3JQb3NpdGlvbiA9PT0gdGhpcy5PcHRpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5BZGROZXdPYmplY3QodGhpcy5DcmVhdGVOZXcodGhpcy5xdWVyeSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE9uZShldmVudCwgdGhpcy5PcHRpb25zW3RoaXMuc2VsZWN0b3JQb3NpdGlvbl0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLlNob3dOZXcpIHtcbiAgICAgICAgICB0aGlzLkFkZE5ld09iamVjdCh0aGlzLkNyZWF0ZU5ldyh0aGlzLnF1ZXJ5KSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6IGJyZWFrO1xuICAgIH1cbiAgICB0aGlzLmZvY3VzU2VsZWN0ZWRPcHRpb24oKTtcbiAgfVxuXG4gIHB1YmxpYyBuZXh0UGFnZSgkZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAvLyBWYWxpZGF0b3JzXG4gICAgaWYgKCEodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdEYXRhIExpc3QgbWFzdCBiZSBGdW5jdGlvbicpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuY3VycmVudENhY2hlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZvciBuZXh0IHBhZ2UgbmVlZCBjYWNoZSBmb3IgZmlyc3QgUGFnZScpO1xuICAgIH1cbiAgICBpZiAodGhpcy5jdXJyZW50Q2FjaGUuY3VycmVudFBhZ2UgPj0gdGhpcy5jdXJyZW50Q2FjaGUuY291bnRQYWdlcykgeyB0aHJvdyBuZXcgRXJyb3IoJ01heCBQYWdlIExpbWl0Jyk7IH1cblxuICAgIGlmICh0aGlzLmRhdGFMaXN0U3ViKSB7IHRoaXMuZGF0YUxpc3RTdWIudW5zdWJzY3JpYmUoKTsgfVxuXG4gICAgbGV0IHBhcmFtczogYW55ID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5hZGRpdGlvbmFsRmlsdGVyKTtcbiAgICBwYXJhbXNbdGhpcy5zZWFyY2hQcm9wZXJ0eV0gPSB0aGlzLnF1ZXJ5O1xuXG4gICAgdGhpcy5kYXRhTGlzdFN1YiA9IHRoaXMuZGF0YUxpc3QocGFyYW1zLCB0aGlzLmN1cnJlbnRDYWNoZS5jdXJyZW50UGFnZSArIDEsIHRoaXMuY291bnRPblBhZ2UpLnN1YnNjcmliZShhbnN3ZXIgPT4ge1xuICAgICAgdGhpcy5jdXJyZW50Q2FjaGUuY3VycmVudFBhZ2UrKztcbiAgICAgIHRoaXMuY3VycmVudENhY2hlLmNvdW50RWxlbWVudCA9IGFuc3dlci5oZWFkZXJzWydjb3VudCddO1xuICAgICAgdGhpcy5jdXJyZW50Q2FjaGUuY291bnRQYWdlcyA9IE1hdGguY2VpbCh0aGlzLmN1cnJlbnRDYWNoZS5jb3VudEVsZW1lbnQgLyB0aGlzLmNvdW50T25QYWdlKTtcbiAgICAgIHRoaXMuY3VycmVudENhY2hlLm9iamVjdHMgPSB0aGlzLmN1cnJlbnRDYWNoZS5vYmplY3RzLmNvbmNhdChhbnN3ZXIubGlzdCk7XG4gICAgICB0aGlzLnNlbGVjdG9yUG9zaXRpb24gPSAodGhpcy5jdXJyZW50Q2FjaGUuY3VycmVudFBhZ2UgLSAxKSAqIHRoaXMuY291bnRPblBhZ2UgKyAxO1xuICAgICAgdGhpcy5mb2N1c1NlbGVjdGVkT3B0aW9uKCk7XG4gICAgfSwgKCkgPT4geyB9KTtcbiAgfVxuXG4gIC8vIE1PREVMXG4gIHByaXZhdGUgY2xlYXJQcm9wZXJ0eSgpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdG9yUG9zaXRpb24gPSAwO1xuICAgIHRoaXMucXVlcnkgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0T25lKCRldmVudDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQsIGRhdGE6IGFueSk6IHZvaWQge1xuICAgIC8vINCk0LjQu9GM0YLRgCDQvdC10L3Rg9C20L3Ri9GFINGB0L7QsdGL0YLQuNC5XG4gICAgaWYgKCRldmVudCBpbnN0YW5jZW9mIE1vdXNlRXZlbnQgJiYgJGV2ZW50LmJ1dHRvbiAhPT0gMCkgeyByZXR1cm47IH1cblxuICAgIGlmICh0aGlzLm11bHRpcGxlICYmIHRoaXMub3V0cHV0Lmxlbmd0aCA8IHRoaXMubXVsdGlwbGVMaW1pdCkge1xuICAgICAgdGhpcy5vdXRwdXQucHVzaChkYXRhKTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLm11bHRpcGxlKSB7XG4gICAgICB0aGlzLm91dHB1dCA9IFtkYXRhXTtcbiAgICB9XG4gICAgdGhpcy5jaGFuZ2VGdWxsTW9kZWwuZW1pdCh0aGlzLm91dHB1dCk7XG4gICAgdGhpcy5Nb2RlbCA9IHRoaXMuVmFsdWVGcm9tT3V0cHV0O1xuICAgIHRoaXMuY2xlYXJQcm9wZXJ0eSgpO1xuICAgIHRoaXMuaGlkZURyb3Bkb3duTGlzdCgpO1xuICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9O1xuXG4gIHB1YmxpYyByZW1vdmVPbmUoaW5kZXg6IG51bWJlciwgZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cblxuICAgIHRoaXMub3V0cHV0LnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy5Nb2RlbCA9IHRoaXMuVmFsdWVGcm9tT3V0cHV0O1xuXG4gICAgLy8gc2V0IGNsYXNzXG4gICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICB0aGlzLmlucHV0Q29udHJvbC5jb250cm9sLm1hcmtBc1RvdWNoZWQoKTtcblxuICAgIC8vIG9wZW4gZHJvcGRvd25cbiAgICBpZiAodGhpcy5yZXF1aXJlZCkge1xuICAgICAgdGhpcy5zaG93RHJvcGRvd25MaXN0KHVuZGVmaW5lZCk7XG4gICAgfVxuICB9XG5cbiAgLy8gRk9STUFUVElOR1xuXG4gIHB1YmxpYyBnZXQgU2VsZWN0ZWRUZW1wbGF0ZSgpOiBUZW1wbGF0ZVJlZjxhbnk+IHtcbiAgICBpZiAodGhpcy5zZWxlY3RlZFRlbXBsYXRlKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZFRlbXBsYXRlLnRlbXBsYXRlUmVmO1xuICAgIH0gZWxzZSBpZiAodGhpcy5ib3RoVGVtcGxhdGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmJvdGhUZW1wbGF0ZS50ZW1wbGF0ZVJlZjtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgRHJvcGRvd25UZW1wbGF0ZSgpOiBUZW1wbGF0ZVJlZjxhbnk+IHtcbiAgICBpZiAodGhpcy5kcm9wZG93blRlbXBsYXRlKSB7XG4gICAgICByZXR1cm4gdGhpcy5kcm9wZG93blRlbXBsYXRlLnRlbXBsYXRlUmVmO1xuICAgIH0gZWxzZSBpZiAodGhpcy5ib3RoVGVtcGxhdGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmJvdGhUZW1wbGF0ZS50ZW1wbGF0ZVJlZjtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRMaXN0Rm9ybWF0dGVkKGRhdGE6IGFueSk6IHN0cmluZyB7XG4gICAgbGV0IGZvcm1hdHRlcjogYW55ID0gdGhpcy5saXN0Rm9ybWF0dGVyIHx8IGRlZmF1bHRGb3JtYXR0ZXI7XG4gICAgcmV0dXJuIGZvcm1hdHRlci5hcHBseSh0aGlzLCBbZGF0YSwgdGhpcy52aWV3UHJvcGVydHldKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXREcm9wZG93bkZvcm1hdHRlZChkYXRhOiBhbnkpOiBzdHJpbmcge1xuICAgIGxldCBmb3JtYXR0ZXI6IGFueSA9IHRoaXMuZHJvcGRvd25Gb3JtYXR0ZXIgfHwgZGVmYXVsdEZvcm1hdHRlcjtcbiAgICByZXR1cm4gZm9ybWF0dGVyLmFwcGx5KHRoaXMsIFtkYXRhLCB0aGlzLnZpZXdQcm9wZXJ0eV0pO1xuICB9XG5cbiAgLy8gSU5JVFxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgLy8gdGhpcy5Nb2RlbCA9IHRoaXMuVmFsdWVGcm9tT3V0cHV0OyDQrdGC0L4g0LLRgNC+0LTQtSDRgtGD0YIg0YLQvtC20LUg0YPQttC1INC90LUg0L3QsNC00L4uXG4gICAgdGhpcy5lbCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3ZpYm9yJykuaXRlbSgwKTtcbiAgICBpZiAodGhpcy5tdWx0aXBsZSkgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCdtdWx0aXBsZScpO1xuXG4gICAgdGhpcy5pbnB1dEVsID0gPEhUTUxJbnB1dEVsZW1lbnQ+KHRoaXMuZWwucXVlcnlTZWxlY3RvcignaW5wdXQnKSk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkNoYW5nZXMoaW5wdXRzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGlucHV0c1snZGF0YUxpc3QnXSAmJiBpbnB1dHNbJ2RhdGFMaXN0J10uY3VycmVudFZhbHVlKSB7XG4gICAgICAvLyBPdXRwdXRcbiAgICAgIGlmICh0aGlzLk1vZGVsID09PSB1bmRlZmluZWQgfHwgdGhpcy5Nb2RlbCA9PSBudWxsKSB7XG4gICAgICAgIHRoaXMub3V0cHV0ID0gW107XG4gICAgICAgIHRoaXMuY2hhbmdlRnVsbE1vZGVsLmVtaXQodGhpcy5vdXRwdXQpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLk1vZGVsIGluc3RhbmNlb2YgQXJyYXkgJiYgdGhpcy5tdWx0aXBsZSkge1xuICAgICAgICB0aGlzLk91dHB1dCA9IHRoaXMuTW9kZWw7XG4gICAgICB9IGVsc2UgaWYgKCEodGhpcy5Nb2RlbCBpbnN0YW5jZW9mIEFycmF5KSAmJiAhdGhpcy5tdWx0aXBsZSkge1xuICAgICAgICB0aGlzLk91dHB1dCA9IFt0aGlzLk1vZGVsXTtcblxuICAgICAgICBpZiAoIXRoaXMub3V0cHV0IHx8ICF0aGlzLm91dHB1dC5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLk1vZGVsID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZWwgJiYgaW5wdXRzWydtdWx0aXBsZSddKSB7XG4gICAgICBpZiAoaW5wdXRzWydtdWx0aXBsZSddLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ211bHRpcGxlJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ211bHRpcGxlJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlucHV0c1snYWRkaXRpb25hbEZpbHRlciddKSB7XG4gICAgICB0aGlzLmN1cnJlbnRDYWNoZSA9IHRoaXMuR2V0Q2FjaGUodGhpcy5xdWVyeSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxEaXZFbGVtZW50Pikge1xuICAgIHRoaXMub3V0cHV0ID0gW107XG4gIH1cblxuICAvLyBGT1JNU1xuICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgLy8g0J3QvtGA0LzQsNC70YzQvdGL0LkgdXBkYXRlINC80L7QtNC10LvQuFxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgaWYgKCh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5ICYmICF0aGlzLm11bHRpcGxlKSB8fCAoISh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSAmJiB0aGlzLm11bHRpcGxlKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01vZGVsIFR5cGUgRXJyb3InKTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5ICYmIHRoaXMuTW9kZWwgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBpZiAodmFsdWUubGVuZ3RoID09PSB0aGlzLk1vZGVsLmxlbmd0aCAmJiB2YWx1ZS5ldmVyeSh2ID0+IHRoaXMuTW9kZWwuaW5kZXhPZih2KSA+PSAwKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0aGlzLk1vZGVsID09PSB2YWx1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmZpcnN0TG9hZCA9IHRydWU7XG4gICAgICB0aGlzLk1vZGVsID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9uQ2hhbmdlOiBhbnkgPSAoKSA9PiB7IH07XG4gIHB1YmxpYyBvblRvdWNoZWQ6IGFueSA9ICgpID0+IHsgfTtcblxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHB1YmxpYyBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICBpZiAoaXNEaXNhYmxlZCkge1xuICAgICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWwucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgIH1cbiAgICAvLyBkaXNhYmxlIG90aGVyIGNvbXBvbmVudHMgaGVyZVxuICB9XG5cbiAgc2V0IE1vZGVsKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodGhpcy5vbmx5RW1pdHRlcikge1xuICAgICAgdGhpcy5vdXRwdXQgPSBbXTtcbiAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIE91dHB1dFxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICAgIHRoaXMub3V0cHV0ID0gW107XG4gICAgICB0aGlzLmNoYW5nZUZ1bGxNb2RlbC5lbWl0KHRoaXMub3V0cHV0KTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkgJiYgdGhpcy5tdWx0aXBsZSkge1xuICAgICAgdGhpcy5PdXRwdXQgPSB2YWx1ZTtcbiAgICB9IGVsc2UgaWYgKCEodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkgJiYgIXRoaXMubXVsdGlwbGUpIHtcbiAgICAgIHRoaXMuT3V0cHV0ID0gW3ZhbHVlXTtcbiAgICB9XG5cbiAgICAvLyBNb2RlbFxuICAgIHRoaXMuX21vZGVsID0gdmFsdWU7XG5cbiAgICAvLyBGb3Jtc1xuICAgIHRoaXMub25DaGFuZ2UodGhpcy5fbW9kZWwpO1xuICB9XG5cbiAgZ2V0IE1vZGVsKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsO1xuICB9XG5cbiAgLy8gUFJPUEVSVFlcbiAgZ2V0IElucHV0SGlkZSgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgcmV0dXJuIHRoaXMub3V0cHV0Lmxlbmd0aCA+PSB0aGlzLm11bHRpcGxlTGltaXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLm91dHB1dC5sZW5ndGggPT09IDEgJiYgIXRoaXMuaXNPcGVuO1xuICAgIH1cbiAgfVxuXG4gIGdldCBWYWx1ZUZyb21PdXRwdXQoKTogYW55IHtcbiAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgbGV0IHRtcDogQXJyYXk8YW55PiA9IFtdO1xuICAgICAgZm9yIChsZXQgbyBvZiB0aGlzLm91dHB1dCkge1xuICAgICAgICB0bXAucHVzaChmZXRjaEZyb21PYmplY3QobywgdGhpcy5tb2RlbFByb3BlcnR5KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdG1wO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmV0Y2hGcm9tT2JqZWN0KHRoaXMub3V0cHV0WzBdLCB0aGlzLm1vZGVsUHJvcGVydHkpO1xuICAgIH1cbiAgfVxuXG4gIHNldCBPdXRwdXQobmV3VmFsdWU6IEFycmF5PGFueT4pIHtcbiAgICBsZXQgZGF0YUxpc3Q6IEFycmF5PGFueT4gPSBbXTtcbiAgICBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBkYXRhTGlzdCA9IHRoaXMuZGF0YUxpc3Q7XG4gICAgfSBlbHNlIGlmICh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIGlmIChuZXdWYWx1ZSAmJiBuZXdWYWx1ZS5sZW5ndGggJiYgdGhpcy5maXJzdExvYWQpIHtcbiAgICAgICAgbGV0IHBhcmFtczogYW55ID0ge307XG4gICAgICAgIHRoaXMuZmlyc3RMb2FkID0gZmFsc2U7XG4gICAgICAgIGlmICghdGhpcy5wcmVsb2FkUHJvcGVydHkpIHtcbiAgICAgICAgICB0aGlzLm91dHB1dCA9IG5ld1ZhbHVlO1xuICAgICAgICAgIHRoaXMuY2hhbmdlRnVsbE1vZGVsLmVtaXQodGhpcy5vdXRwdXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBhcmFtc1t0aGlzLnByZWxvYWRQcm9wZXJ0eV0gPSBuZXdWYWx1ZS5tYXAodmFsID0+IGZldGNoRnJvbU9iamVjdCh2YWwsIHRoaXMucHJlbG9hZEZpZWxkKSk7XG4gICAgICAgICAgdGhpcy5kYXRhTGlzdFN1YiA9ICg8T2JzZXJ2YWJsZTxJRGF0YVJlc3BvbnNlPj50aGlzLmRhdGFMaXN0KHBhcmFtcywgMSwgdGhpcy5jb3VudE9uUGFnZSkpLnN1YnNjcmliZShhbnN3ZXIgPT4ge1xuICAgICAgICAgICAgdGhpcy5vdXRwdXQgPSBhbnN3ZXIubGlzdDtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRnVsbE1vZGVsLmVtaXQodGhpcy5vdXRwdXQpO1xuICAgICAgICAgIH0sICgpID0+IHsgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2hhbmdlRnVsbE1vZGVsLmVtaXQodGhpcy5vdXRwdXQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5kYXRhTGlzdCA9PT0gdW5kZWZpbmVkKSB7IHJldHVybjsgfVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdkYXRhTGlzdCB2YWx1ZSBFcnJvcicpO1xuICAgIH1cbiAgICBsZXQgbmV3T3V0cHV0OiBBcnJheTxhbnk+ID0gW107XG4gICAgZm9yIChsZXQgdiBvZiBuZXdWYWx1ZSkge1xuICAgICAgZm9yIChsZXQgZCBvZiBkYXRhTGlzdCkge1xuICAgICAgICBsZXQgYSA9IGZldGNoRnJvbU9iamVjdChkLCB0aGlzLm1vZGVsUHJvcGVydHkpID8gZmV0Y2hGcm9tT2JqZWN0KGQsIHRoaXMubW9kZWxQcm9wZXJ0eSkudmFsdWVPZigpIDogdW5kZWZpbmVkO1xuICAgICAgICBsZXQgYiA9IHYgPyB2LnZhbHVlT2YoKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKGRlZXBFcXVhbChhLCBiKSkge1xuICAgICAgICAgIG5ld091dHB1dC5wdXNoKGQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMub3V0cHV0ID0gbmV3T3V0cHV0O1xuICAgIHRoaXMuY2hhbmdlRnVsbE1vZGVsLmVtaXQodGhpcy5vdXRwdXQpO1xuICB9XG5cbiAgZ2V0IE9wdGlvbnMoKTogQXJyYXk8YW55PiB7XG4gICAgbGV0IG9wdGlvbnM6IEFycmF5PGFueT47XG4gICAgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgbGV0IG9sZENhY2hlID0gdGhpcy5HZXRDYWNoZSh0aGlzLm9sZFF1ZXJ5KTtcblxuICAgICAgaWYgKCF0aGlzLmN1cnJlbnRDYWNoZSAmJiBvbGRDYWNoZSkge1xuICAgICAgICBvcHRpb25zID0gb2xkQ2FjaGUub2JqZWN0cztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wdGlvbnMgPSB0aGlzLmN1cnJlbnRDYWNoZSA/IHRoaXMuY3VycmVudENhY2hlLm9iamVjdHMgOiBbXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIChvcHRpb25zIHx8IFtdKS5maWx0ZXIob3AgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMub3V0cHV0LmZpbmRJbmRleChvID0+IHtcbiAgICAgICAgbGV0IGEgPSBmZXRjaEZyb21PYmplY3QobywgdGhpcy5tb2RlbFByb3BlcnR5KSA/IGZldGNoRnJvbU9iamVjdChvLCB0aGlzLm1vZGVsUHJvcGVydHkpLnZhbHVlT2YoKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgbGV0IGIgPSBmZXRjaEZyb21PYmplY3Qob3AsIHRoaXMubW9kZWxQcm9wZXJ0eSkgPyBmZXRjaEZyb21PYmplY3Qob3AsIHRoaXMubW9kZWxQcm9wZXJ0eSkudmFsdWVPZigpIDogdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gZGVlcEVxdWFsKGEsIGIpO1xuICAgICAgfSkgPT09IC0xO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGN1cnJlbnRDYWNoZTogQ2FjaGVJbmZvO1xuICBwcml2YXRlIEdldENhY2hlKHF1ZXJ5OiBzdHJpbmcpOiBDYWNoZUluZm8ge1xuICAgIGlmICh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLmNhY2hlTGF6eURhdGEuZmluZChjYWNoZSA9PiB7XG4gICAgICAgIHJldHVybiBjYWNoZS5xdWVyeSA9PT0gdGhpcy5xdWVyeSAmJiBkZWVwRXF1YWwoY2FjaGUucGFyYW1zLCB0aGlzLmFkZGl0aW9uYWxGaWx0ZXIpO1xuICAgICAgfSlcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8vIENyZWF0ZU5ld1xuXG4gIHB1YmxpYyBBZGROZXdPYmplY3QodmFsdWU6IE9ic2VydmFibGU8YW55PiB8IGFueSk6IHZvaWQge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcbiAgICAgIHZhbHVlLnN1YnNjcmliZShuZXdPYmplY3QgPT4ge1xuICAgICAgICBpZiAobmV3T2JqZWN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLlNldE5ld09iamVjdChuZXdPYmplY3QpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5TZXROZXdPYmplY3QodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgU2V0TmV3T2JqZWN0KG5ld09iamVjdDogYW55KSB7XG4gICAgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgdGhpcy5kYXRhTGlzdC5wdXNoKG5ld09iamVjdCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIGZvciAobGV0IGNhY2hlIG9mIHRoaXMuY2FjaGVMYXp5RGF0YSkge1xuICAgICAgICBpZiAodGhpcy5xdWVyeS5pbmNsdWRlcyhjYWNoZS5xdWVyeSkgfHwgY2FjaGUucXVlcnkgPT09IHVuZGVmaW5lZCB8fCBjYWNoZS5xdWVyeSA9PT0gJycpIHtcbiAgICAgICAgICBjYWNoZS5jb3VudEVsZW1lbnQrKztcbiAgICAgICAgICBjYWNoZS5vYmplY3RzLnB1c2gobmV3T2JqZWN0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZmlyc3RMb2FkID0gZmFsc2U7XG4gICAgdGhpcy5xdWVyeSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmN1cnJlbnRDYWNoZSA9IHRoaXMuR2V0Q2FjaGUodGhpcy5xdWVyeSk7XG4gICAgdGhpcy5zZWxlY3RPbmUobmV3IE1vdXNlRXZlbnQoJ2NsaWNrJyksIG5ld09iamVjdCk7XG4gIH1cblxuICBnZXQgU2hvd05ldygpOiBib29sZWFuIHtcbiAgICBsZXQgYSA9IHRoaXMucXVlcnkgJiYgdGhpcy5uZXdNZXNzYWdlICYmICghdGhpcy5kYXRhTGlzdFN1YiB8fCB0aGlzLmRhdGFMaXN0U3ViLmNsb3NlZCk7XG5cbiAgICBsZXQgYiA9IHRoaXMuT3B0aW9ucy5maW5kSW5kZXgobyA9PiB7XG4gICAgICBsZXQgYyA9IGZldGNoRnJvbU9iamVjdChvLCB0aGlzLnZpZXdQcm9wZXJ0eSkgPyBmZXRjaEZyb21PYmplY3QobywgdGhpcy52aWV3UHJvcGVydHkpLnZhbHVlT2YoKSA6IHVuZGVmaW5lZDtcbiAgICAgIHJldHVybiBkZWVwRXF1YWwoYywgdGhpcy5xdWVyeSk7XG4gICAgfSkgPT09IC0xICYmIHRoaXMub3V0cHV0LmZpbmRJbmRleChvID0+IHtcbiAgICAgIGxldCBjID0gZmV0Y2hGcm9tT2JqZWN0KG8sIHRoaXMudmlld1Byb3BlcnR5KSA/IGZldGNoRnJvbU9iamVjdChvLCB0aGlzLnZpZXdQcm9wZXJ0eSkudmFsdWVPZigpIDogdW5kZWZpbmVkO1xuICAgICAgcmV0dXJuIGRlZXBFcXVhbChjLCB0aGlzLnF1ZXJ5KTtcbiAgICB9KSA9PT0gLTE7XG5cbiAgICByZXR1cm4gYSAmJiBiO1xuICB9XG5cbiAgZ2V0IFNob3dFbXB0eSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5PcHRpb25zLmxlbmd0aCA9PT0gMCAmJiAoISh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgRnVuY3Rpb24pIHx8ICh0aGlzLmRhdGFMaXN0U3ViLmNsb3NlZCkpO1xuICB9XG5cblxuICAvLyBDQUNIRVxuICBwcml2YXRlIGNhY2hlTGF6eURhdGE6IEFycmF5PENhY2hlSW5mbz4gPSBbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDYWNoZUluZm8ge1xuICBjb3VudEVsZW1lbnQ6IG51bWJlcjtcbiAgY291bnRQYWdlczogbnVtYmVyO1xuICBjdXJyZW50UGFnZTogbnVtYmVyO1xuICBvYmplY3RzOiBBcnJheTxhbnk+O1xuXG4gIHF1ZXJ5OiBzdHJpbmc7XG4gIHBhcmFtczogYW55O1xufVxuIl19