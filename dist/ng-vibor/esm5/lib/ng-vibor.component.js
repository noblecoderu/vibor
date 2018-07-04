/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, forwardRef, EventEmitter, ElementRef, ContentChild, ViewChild, ViewEncapsulation } from '@angular/core';
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctdmlib3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdmlib3IvIiwic291cmNlcyI6WyJsaWIvbmctdmlib3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFDekIsWUFBWSxFQUFFLFVBQVUsRUFDWCxZQUFZLEVBQUUsU0FBUyxFQUVwQyxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUVMLGlCQUFpQixFQUNqQixPQUFPLEVBQ1IsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEVBQWdCLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVoRCxPQUFPLEVBQ0gsa0JBQWtCLEVBQ2xCLG9CQUFvQixFQUNwQixzQkFBc0IsRUFDdEIsc0JBQXNCLEVBQ3pCLE1BQU0sK0JBQStCLENBQUM7QUFFdkMsT0FBTyxFQUVILGdCQUFnQixFQUNoQixlQUFlLEVBQ2Ysa0JBQWtCLEVBQ3JCLE1BQU0sV0FBVyxDQUFDO0FBRW5CLHFCQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7O0lBMGR0QywwQkFBb0IsVUFBc0M7UUFBdEMsZUFBVSxHQUFWLFVBQVUsQ0FBNEI7eUJBOVd0QyxLQUFLO2dDQVNDLENBQUM7d0JBQ1IsR0FBRzs7d0JBT0ssS0FBSzs2QkFDQSxRQUFROzJCQUNWLEVBQUU7MkJBRUYsT0FBTzt3QkFFVixLQUFLOzBCQUNILElBQUk7d0JBQ2YsS0FBSzs0QkFTUSxNQUFNOzZCQUVMLElBQUk7K0JBQ0YsS0FBSzs0QkFDQSxTQUFTOzhCQUNmLE9BQU87Z0NBSUwsRUFBRTsrQkFFa0MsSUFBSSxZQUFZLEVBQUU7MEJBR3BELFNBQVM7eUJBQ3dCLFVBQUMsS0FBYTtZQUNsRixNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ2Q7cUJBcUR5QixDQUFDO1lBQ3pCLHFCQUFJLEtB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UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMseUNBQXlDLENBQUMsQ0FBQztTQUM1RDtRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUFFO1FBRXpHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUFFO1FBRXpELHFCQUFJLE1BQU0sR0FBUSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUMzRCxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFekMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDNUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNoQyxLQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3pELEtBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzVGLEtBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsT0FB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LEtBQUs7MkJBQ0wsS0FBSzs2QkFDTCxLQUFLOytCQUlMLFlBQVksU0FBQyxrQkFBa0I7bUNBQy9CLFlBQVksU0FBQyxzQkFBc0I7bUNBQ25DLFlBQVksU0FBQyxzQkFBc0I7aUNBQ25DLFlBQVksU0FBQyxvQkFBb0I7Z0NBQ2pDLEtBQUs7b0NBQ0wsS0FBSzsrQkFDTCxLQUFLO2dDQUVMLEtBQUs7a0NBQ0wsS0FBSzsrQkFDTCxLQUFLO2lDQUNMLEtBQUs7MkJBRUwsS0FBSzs4QkFDTCxLQUFLO21DQUNMLEtBQUs7OEJBQ0wsS0FBSztrQ0FDTCxNQUFNLFNBQUMsaUJBQWlCOzZCQUd4QixLQUFLOzRCQUNMLEtBQUs7OzJCQTNMUjs7U0FzSWEsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LCBPbkluaXQsIE9uQ2hhbmdlcyxcbiAgSW5wdXQsIE91dHB1dCwgZm9yd2FyZFJlZixcbiAgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLFxuICBUZW1wbGF0ZVJlZiwgQ29udGVudENoaWxkLCBWaWV3Q2hpbGQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gIE5HX1ZBTFVFX0FDQ0VTU09SLFxuICBOZ01vZGVsXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7XG4gICAgVmlib3JCb3RoRGlyZWN0aXZlLFxuICAgIFZpYm9yQ3JlYXRlRGlyZWN0aXZlLFxuICAgIFZpYm9yRHJvcGRvd25EaXJlY3RpdmUsXG4gICAgVmlib3JTZWxlY3RlZERpcmVjdGl2ZVxufSBmcm9tICcuL25nLXZpYm9yLXRlbXBsYXRlLmRpcmVjdGl2ZSc7XG5cbmltcG9ydCB7XG4gICAgSURhdGFSZXNwb25zZSxcbiAgICBkZWZhdWx0Rm9ybWF0dGVyLFxuICAgIGZldGNoRnJvbU9iamVjdCxcbiAgICBzY3JvbGxBY3RpdmVPcHRpb25cbn0gZnJvbSAnLi9oZWxwZXJzJztcblxuY29uc3QgZGVlcEVxdWFsID0gcmVxdWlyZSgnZGVlcC1lcXVhbCcpO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ3ZpYm9yJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwidmlib3JcIj5cbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuXG4gIDxkaXYgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoXCIgKGNsaWNrKT1cInNob3dEcm9wZG93bkxpc3QoJGV2ZW50KTtcIj5cbiAgICA8dWwgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoLWxpc3RcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJtdWx0aXBsZSB8fCAhaXNPcGVuXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhU2VsZWN0ZWRUZW1wbGF0ZTsgZWxzZSBzZWxlY3RlZFRcIj5cbiAgICAgICAgICA8bGkgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbSBzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9zZWxlY3Rpb25cIiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBvdXRwdXQ7IGxldCAkaW5kZXg9aW5kZXg7IGxldCAkbGFzdD1sYXN0OyB0cmFja0J5OiBUcmFja0J5Rm47XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlib3JfX3NlbGVjdGlvblwiPlxuICAgICAgICAgICAgICA8ZGl2IFtpbm5lckhUTUxdPVwiZ2V0TGlzdEZvcm1hdHRlZChpdGVtKVwiPjwvZGl2PlxuICAgICAgICAgICAgICA8YSBjbGFzcz1cInNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX3JlbW92ZVwiICpuZ0lmPVwiYWxsb3dSZXNldFwiIChjbGljayk9XCIhZGlzYWJsZWQgJiYgcmVtb3ZlT25lKCRpbmRleCwgJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiPlxuICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbD1cIiMyYzJjMmNcIiBkPVwiTTEwLjEgNC41TDggNi42IDUuOSA0LjUgNC41IDUuOSA2LjYgOGwtMi4xIDIuMSAxLjQgMS40TDggOS40bDIuMSAyLjEgMS40LTEuNEw5LjQgOGwyLjEtMi4xelwiLz5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgPG5nLXRlbXBsYXRlICNzZWxlY3RlZFQ+XG4gICAgICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LXNlYXJjaC1saXN0LWl0ZW0gc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fc2VsZWN0aW9uXCIgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygb3V0cHV0OyBsZXQgJGluZGV4PWluZGV4OyBsZXQgJGxhc3Q9bGFzdDsgdHJhY2tCeTogVHJhY2tCeUZuO1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZpYm9yX19zZWxlY3Rpb25cIj5cbiAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIlNlbGVjdGVkVGVtcGxhdGU7IGNvbnRleHQ6IHtpdGVtOiBpdGVtfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICA8YSBjbGFzcz1cInNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX3JlbW92ZVwiICpuZ0lmPVwiYWxsb3dSZXNldCAmJiAhZGlzYWJsZWRcIiAoY2xpY2spPVwiIWRpc2FibGVkICYmIHJlbW92ZU9uZSgkaW5kZXgsICRldmVudClcIj5cbiAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIj5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCIjMmMyYzJjXCIgZD1cIk0xMC4xIDQuNUw4IDYuNiA1LjkgNC41IDQuNSA1LjkgNi42IDhsLTIuMSAyLjEgMS40IDEuNEw4IDkuNGwyLjEgMi4xIDEuNC0xLjRMOS40IDhsMi4xLTIuMXpcIi8+XG4gICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LXNlYXJjaC1saXN0LWl0ZW0gc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faW5wdXRcIiBbY2xhc3Muc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faGlkZV09XCJJbnB1dEhpZGVcIj5cbiAgICAgICAgPGlucHV0IGF1dG9jb21wbGV0ZT1cIm9mZlwiICNpbnB1dENvbnRyb2w9XCJuZ01vZGVsXCIgW25hbWVdPVwibmFtZVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIFsobmdNb2RlbCldPVwicXVlcnlcIiBbcGxhY2Vob2xkZXJdPVwib3V0cHV0Lmxlbmd0aCA9PSAwIHx8IChtdWx0aXBsZSAmJiBvdXRwdXQubGVuZ3RoIDwgbXVsdGlwbGVMaW1pdCkgPyBwbGFjZWhvbGRlciA6ICcnXCJcbiAgICAgICAgICAoaW5wdXQpPVwidXBkYXRlT3B0aW9uc0luRGVsYXkoKVwiIChrZXlkb3duKT1cImtleURvd24oJGV2ZW50KVwiIC8+XG4gICAgICA8L2xpPlxuICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LXNlYXJjaC1saXN0LWl0ZW0gc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fbG9hZGVyLWNlbnRlclwiIFtoaWRkZW5dPVwiIWRhdGFMaXN0U3ViIHx8IGRhdGFMaXN0U3ViLmNsb3NlZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fbG9hZGVyXCI+PC9kaXY+XG4gICAgICA8L2xpPlxuXG4gICAgICA8c3BhbiBjbGFzcz1cImFycm93XCIgKGNsaWNrKT1cInRvZ2dsZURyb3Bkb3duKCRldmVudClcIj5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L3VsPlxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duXCIgKm5nSWY9XCJpc09wZW5cIj5cbiAgICA8dWwgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXBcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhRHJvcGRvd25UZW1wbGF0ZTsgZWxzZSBkcm9wZG93blRcIj5cbiAgICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvblwiICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgT3B0aW9uczsgbGV0IGk9aW5kZXhcIiAobW91c2Vkb3duKT1cInNlbGVjdE9uZSgkZXZlbnQsIG9wdGlvbilcIlxuICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaSA9PT0gc2VsZWN0b3JQb3NpdGlvblwiIFtpbm5lckhUTUxdPVwiZ2V0RHJvcGRvd25Gb3JtYXR0ZWQob3B0aW9uKVwiPlxuICAgICAgICA8L2xpPlxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgIDxuZy10ZW1wbGF0ZSAjZHJvcGRvd25UPlxuICAgICAgICA8bGkgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXAtb3B0aW9uXCIgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBPcHRpb25zOyBsZXQgaT1pbmRleFwiIChtb3VzZWRvd24pPVwic2VsZWN0T25lKCRldmVudCwgb3B0aW9uKVwiXG4gICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJpID09PSBzZWxlY3RvclBvc2l0aW9uXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIkRyb3Bkb3duVGVtcGxhdGU7IGNvbnRleHQ6IHtpdGVtOiBvcHRpb259XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbGk+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgICA8bGkgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXAtb3B0aW9uIGxvYWRpbmdcIiAqbmdJZj1cImRhdGFMaXN0U3ViICYmICFkYXRhTGlzdFN1Yi5jbG9zZWRcIj5cbiAgICAgICAg0JfQsNCz0YDRg9C30LrQsFxuICAgICAgPC9saT5cbiAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb24gbG9hZGVyXCIgKG1vdXNlZG93bik9XCJBZGROZXdPYmplY3QoQ3JlYXRlTmV3KHF1ZXJ5KSk7XCIgW2NsYXNzLmFjdGl2ZV09XCJzZWxlY3RvclBvc2l0aW9uID09PSBPcHRpb25zLmxlbmd0aFwiXG4gICAgICAgICpuZ0lmPVwiU2hvd05ld1wiPlxuXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjcmVhdGVUZW1wbGF0ZTsgZWxzZSB0ZW1wbGF0ZVdpdGhNZXNzYWdlXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNyZWF0ZVRlbXBsYXRlLnRlbXBsYXRlUmVmOyBjb250ZXh0OiB7cXVlcnk6IHF1ZXJ5fVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICA8bmctdGVtcGxhdGUgI3RlbXBsYXRlV2l0aE1lc3NhZ2U+XG4gICAgICAgICAge3sgbmV3TWVzc2FnZSB9fVxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPC9saT5cbiAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb24gbG9hZGVyXCIgKm5nSWY9XCJTaG93RW1wdHlcIj5cbiAgICAgICAg0J/Rg9GB0YLQvlxuICAgICAgPC9saT5cbiAgICA8L3VsPlxuICAgIDxkaXYgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tcGFnZXJcIiAqbmdJZj1cImN1cnJlbnRDYWNoZSAmJiBjdXJyZW50Q2FjaGUuY291bnRQYWdlcyA+IDFcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tcGFnZXItcGFnZVwiPlxuICAgICAgICB7eyBjdXJyZW50Q2FjaGUuY3VycmVudFBhZ2UgfCBudW1iZXIgfX0gLyB7eyBjdXJyZW50Q2FjaGUuY291bnRQYWdlcyB8IG51bWJlciB9fVxuICAgICAgPC9kaXY+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLXBhZ2VyLWxvYWRtb3JlXCIgKm5nSWY9XCJjdXJyZW50Q2FjaGUuY291bnRQYWdlcyA+IDEgJiYgY3VycmVudENhY2hlLmN1cnJlbnRQYWdlIDwgY3VycmVudENhY2hlLmNvdW50UGFnZXNcIlxuICAgICAgICAobW91c2Vkb3duKT1cIm5leHRQYWdlKCRldmVudClcIj5cbiAgICAgICAg0JfQsNCz0YDRg9C30LjRgtGMINC10YnRkVxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLnZpYm9yIGEsLnZpYm9yIGxhYmVsLC52aWJvciBsZWdlbmQsLnZpYm9yIHAsLnZpYm9yIHNwYW4sLnZpYm9yIHVse21hcmdpbjowO3BhZGRpbmc6MDtib3JkZXI6MH0udmlib3IgYSwudmlib3IgYnV0dG9uLC52aWJvciBpbnB1dHtvdXRsaW5lOjB9LnZpYm9yIG9sLC52aWJvciB1bHtsaXN0LXN0eWxlOm5vbmV9LnZpYm9yIGlucHV0e3BhZGRpbmc6MDttYXJnaW46MDtib3JkZXI6MDtmb250OmluaGVyaXR9LnZpYm9yIGJ7Zm9udC13ZWlnaHQ6NDAwfS52aWJvcntwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmJsb2NrO2JvcmRlcjoxcHggc29saWQgI2Q1ZDlkZTtib3JkZXItcmFkaXVzOjNweDtmb250LWZhbWlseTotYXBwbGUtc3lzdGVtLEJsaW5rTWFjU3lzdGVtRm9udCxcIlNlZ29lIFVJXCIsUm9ib3RvLEhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmLFwiQXBwbGUgQ29sb3IgRW1vamlcIixcIlNlZ29lIFVJIEVtb2ppXCIsXCJTZWdvZSBVSSBTeW1ib2xcIjtmb250LXNpemU6MTRweDtsaW5lLWhlaWdodDoxOHB4O2JhY2tncm91bmQtY29sb3I6I2ZmZjt0cmFuc2l0aW9uOmJveC1zaGFkb3cgLjE1cyBsaW5lYXJ9LnZpYm9yOmhvdmVyOm5vdChbZGlzYWJsZWRdKSwudmlib3I6aG92ZXI6bm90KFtkaXNhYmxlZF0pIC5zZWxlY3QtZHJvcGRvd257Ym94LXNoYWRvdzowIDNweCA2cHggMCByZ2JhKDQ0LDQ0LDQ0LC4xKX0udmlib3JbZGlzYWJsZWRde29wYWNpdHk6LjU7cG9pbnRlci1ldmVudHM6bm9uZTtiYWNrZ3JvdW5kLWNvbG9yOiNmNGY0ZjR9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoe3Bvc2l0aW9uOnJlbGF0aXZlO3BhZGRpbmctcmlnaHQ6NDBweH0udmlib3IgLnNlbGVjdC1zZWFyY2ggLmFycm93e2NvbnRlbnQ6XCJcIjtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDoxNXB4O3RvcDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKTtkaXNwbGF5OmJsb2NrO3dpZHRoOjE2cHg7aGVpZ2h0OjE2cHg7YmFja2dyb3VuZC1pbWFnZTp1cmwoZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCamJHRnpjejBpYm1NdGFXTnZiaUJuYkhsd2FDSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklpQjNhV1IwYUQwaU1UWWlJR2hsYVdkb2REMGlNVFlpSUhacFpYZENiM2c5SWpBZ01DQXhOaUF4TmlJK0RRb2dJRHh3WVhSb0lHWnBiR3c5SWlNeVl6SmpNbU1pSUdROUlrMDRJREV4TGpSTU1pNDJJRFlnTkNBMExqWnNOQ0EwSURRdE5Fd3hNeTQwSURZaUx6NE5Dand2YzNablBnMEspO3RyYW5zaXRpb246LXdlYmtpdC10cmFuc2Zvcm0gLjE1cyBlYXNlLWluLW91dDt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMTVzIGVhc2UtaW4tb3V0O3RyYW5zaXRpb246dHJhbnNmb3JtIC4xNXMgZWFzZS1pbi1vdXQsLXdlYmtpdC10cmFuc2Zvcm0gLjE1cyBlYXNlLWluLW91dH0udmlib3IgLnNlbGVjdC1zZWFyY2ggLmFycm93OmJlZm9yZSwudmlib3IgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2hpZGV7ZGlzcGxheTpub25lfS52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fc2VsZWN0aW9ue3Bvc2l0aW9uOnJlbGF0aXZlfS52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fc2VsZWN0aW9uPmRpdntkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO3BhZGRpbmc6NXB4IDIwcHh9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9pbnB1dCBpbnB1dHt3aWR0aDoxMDAlO3BhZGRpbmc6NXB4IDIwcHg7dGV4dC1vdmVyZmxvdzplbGxpcHNpcztmb250LXNpemU6MTRweDtjb2xvcjojMmMyYzJjO2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnR9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9pbnB1dCBpbnB1dDo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlcntjb2xvcjpyZ2JhKDQ0LDQ0LDQ0LC4yKX0udmlib3IgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2lucHV0IGlucHV0Oi1tcy1pbnB1dC1wbGFjZWhvbGRlcntjb2xvcjpyZ2JhKDQ0LDQ0LDQ0LC4yKX0udmlib3IgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2lucHV0IGlucHV0OjotbXMtaW5wdXQtcGxhY2Vob2xkZXJ7Y29sb3I6cmdiYSg0NCw0NCw0NCwuMil9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9pbnB1dCBpbnB1dDo6cGxhY2Vob2xkZXJ7Y29sb3I6cmdiYSg0NCw0NCw0NCwuMil9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9yZW1vdmV7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO3dpZHRoOjE2cHg7aGVpZ2h0OjE2cHg7bWFyZ2luLWxlZnQ6NXB4O2JvcmRlci1yYWRpdXM6NTAlO2JhY2tncm91bmQtY29sb3I6I2JhYmFiYTtjdXJzb3I6cG9pbnRlcjt0cmFuc2l0aW9uOmJhY2tncm91bmQtY29sb3IgLjE1cyBsaW5lYXJ9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9yZW1vdmU6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojOTQ5NDk0fS52aWJvciAuc2VsZWN0LWRyb3Bkb3due3Bvc2l0aW9uOmFic29sdXRlO3RvcDoxMDAlO2xlZnQ6LTFweDtyaWdodDotMXB4O3otaW5kZXg6Mn0udmlib3IgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2xvYWRlci1jZW50ZXJ7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6LTJweDt0b3A6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO3dpZHRoOjIxcHg7aGVpZ2h0OjIxcHg7YmFja2dyb3VuZDojZmZmO3otaW5kZXg6Mn0udmlib3IgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2xvYWRlci1jZW50ZXJbaGlkZGVuXXtkaXNwbGF5Om5vbmV9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9sb2FkZXItY2VudGVyIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9sb2FkZXJ7d2lkdGg6MTZweDtoZWlnaHQ6MTZweDtib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym9yZGVyLXdpZHRoOjJweDtib3JkZXItc3R5bGU6c29saWQ7Ym9yZGVyLWNvbG9yOiMyMjI3MmUgcmdiYSgzNCwzOSw0NiwuNCkgcmdiYSgzNCwzOSw0NiwuNCk7Ym9yZGVyLXJhZGl1czoxMDAlOy13ZWJraXQtYW5pbWF0aW9uOi40NXMgbGluZWFyIGluZmluaXRlIGNsb2Nrd2lzZTthbmltYXRpb246LjQ1cyBsaW5lYXIgaW5maW5pdGUgY2xvY2t3aXNlfS52aWJvciAuc2VsZWN0LWRyb3Bkb3due2JvcmRlcjoxcHggc29saWQgI2Q1ZDlkZTtib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOjVweDtib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czo1cHg7Ym9yZGVyLXRvcDowO2JhY2tncm91bmQ6I2ZmZn0udmlib3IgLnNlbGVjdC1kcm9wZG93bi1vcHRncm91cHttYXgtaGVpZ2h0OjMwMHB4O292ZXJmbG93LXk6YXV0b30udmlib3IgLnNlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb257bWluLWhlaWdodDozMHB4O3BhZGRpbmc6MTBweCAxNXB4O2NvbG9yOiMyYzJjMmN9LnZpYm9yIC5zZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXAtb3B0aW9uOmhvdmVye2JhY2tncm91bmQtY29sb3I6cmdiYSg2NiwxMzIsMjE1LC4xKX0udmlib3IgLnNlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb24ubG9hZGluZ3tmb250LXNpemU6MTZweDtsaW5lLWhlaWdodDoxOHB4O3RleHQtYWxpZ246Y2VudGVyO2NvbG9yOiM4YjhiODN9LnZpYm9yIC5zZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXAtb3B0aW9uLmxvYWRlcnt0ZXh0LWFsaWduOmNlbnRlcjtjb2xvcjojOGI4YjgzfS52aWJvciAuc2VsZWN0LWRyb3Bkb3duLXBhZ2Vye3BhZGRpbmc6MTBweDt0ZXh0LWFsaWduOmNlbnRlcjtib3JkZXItdG9wOjFweCBkYXNoZWQgI2Q1ZDlkZX0udmlib3IgLnNlbGVjdC1kcm9wZG93bi1wYWdlci1wYWdle2ZvbnQtc2l6ZToxMnB4O2NvbG9yOiM4YjhiODN9LnZpYm9yIC5zZWxlY3QtZHJvcGRvd24tcGFnZXItbG9hZG1vcmV7Ym9yZGVyOjA7YmFja2dyb3VuZDowIDA7Ym94LXNoYWRvdzpub25lO2NvbG9yOiM4YjhiODM7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlfS52aWJvciAuc2VsZWN0LWRyb3Bkb3duLXBhZ2VyLXBhZ2UrLnNlbGVjdC1kcm9wZG93bi1wYWdlci1sb2FkbW9yZXttYXJnaW4tdG9wOjEwcHh9LnZpYm9yLm9wZW4tdmlib3J7Ym9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czowO2JvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOjB9LnZpYm9yLm9wZW4tdmlib3IgLnNlbGVjdC1zZWFyY2ggLmFycm93ey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSkgcm90YXRlKDE4MGRlZyk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSkgcm90YXRlKDE4MGRlZyl9LnZpYm9yOm5vdCgubXVsdGlwbGUpIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9yZW1vdmV7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MDt0b3A6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSl9LnZpYm9yLm11bHRpcGxlIC5zZWxlY3Qtc2VhcmNoLWxpc3R7ZGlzcGxheTpmbGV4O2ZsZXgtZmxvdzpyb3cgd3JhcDttYXJnaW46LTVweH0udmlib3IubXVsdGlwbGUgLnNlbGVjdC1zZWFyY2gtbGlzdCAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW17cGFkZGluZzo1cHg7ZmxleC1zaHJpbms6MH0udmlib3IubXVsdGlwbGUgLnNlbGVjdC1zZWFyY2gtbGlzdCAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faW5wdXR7ZmxleDoxfS52aWJvci5tdWx0aXBsZSAuc2VsZWN0LXNlYXJjaC1saXN0IC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9pbnB1dCBpbnB1dHtoZWlnaHQ6MjhweH0udmlib3IubXVsdGlwbGUgLnZpYm9yX19zZWxlY3Rpb257ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtoZWlnaHQ6MjhweDtwYWRkaW5nOjAgN3B4O2JvcmRlci1yYWRpdXM6M3B4O2ZvbnQtc2l6ZToxNHB4O2JhY2tncm91bmQ6I2U1ZTVlNztjb2xvcjojMmMyYzJjfUAtd2Via2l0LWtleWZyYW1lcyBjbG9ja3dpc2V7dG97LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDM2MGRlZykgdHJhbnNsYXRleigwKTt0cmFuc2Zvcm06cm90YXRlKDM2MGRlZykgdHJhbnNsYXRleigwKX19QGtleWZyYW1lcyBjbG9ja3dpc2V7dG97LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDM2MGRlZykgdHJhbnNsYXRleigwKTt0cmFuc2Zvcm06cm90YXRlKDM2MGRlZykgdHJhbnNsYXRleigwKX19YF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHByb3ZpZGVyczogW3tcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ1ZpYm9yQ29tcG9uZW50KSxcbiAgICBtdWx0aTogdHJ1ZVxuICB9XVxufSlcbmV4cG9ydCBjbGFzcyBOZ1ZpYm9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgLy8gTG9jYWwgVmFyaWFibGVcbiAgcHVibGljIF9tb2RlbDogYW55O1xuXG4gIHByaXZhdGUgZmlyc3RMb2FkID0gZmFsc2U7XG4gIHByaXZhdGUgb3B0aW9uczogQXJyYXk8YW55PjtcbiAgcHVibGljIG91dHB1dDogQXJyYXk8YW55PjtcblxuICBwdWJsaWMgaXNPcGVuOiBib29sZWFuO1xuXG4gIHByaXZhdGUgb2xkUXVlcnk6IHN0cmluZztcbiAgcHVibGljIHF1ZXJ5OiBzdHJpbmc7XG5cbiAgcHVibGljIHNlbGVjdG9yUG9zaXRpb24gPSAwO1xuICBwcml2YXRlIHdhaXRUaW1lID0gNTAwO1xuXG4gIHByaXZhdGUgZWw6IEVsZW1lbnQ7ICAgICAgICAgICAvLyB0aGlzIGNvbXBvbmVudCAgZWxlbWVudCBgPHZpYm9yPmBcbiAgcHJpdmF0ZSBpbnB1dEVsOiBIVE1MSW5wdXRFbGVtZW50OyAvLyBgPGlucHV0PmAgZWxlbWVudCBpbiBgPHZpYm9yPmAgZm9yIGF1dG8gY29tcGxldGVcbiAgQFZpZXdDaGlsZCgnaW5wdXRDb250cm9sJykgcHVibGljIGlucHV0Q29udHJvbDogTmdNb2RlbDtcblxuICAvLyBJbnB1dHMgJiBPdXRwdXRzXG4gIEBJbnB1dCgpIHB1YmxpYyBtdWx0aXBsZSA9IGZhbHNlO1xuICBASW5wdXQoKSBwdWJsaWMgbXVsdGlwbGVMaW1pdCA9IEluZmluaXR5O1xuICBASW5wdXQoKSBwdWJsaWMgY291bnRPblBhZ2UgPSAxMDtcblxuICBASW5wdXQoKSBwdWJsaWMgcGxhY2Vob2xkZXIgPSAnVmlib3InO1xuICBASW5wdXQoKSBwdWJsaWMgbmFtZTogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgcmVxdWlyZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgcHVibGljIGFsbG93UmVzZXQgPSB0cnVlO1xuICBwdWJsaWMgZGlzYWJsZWQgPSBmYWxzZTtcblxuICAvLyDQntGC0L7QsdGA0LDQttC10L3QuNC1INGB0L/QuNGB0LrQvtCyXG4gIEBDb250ZW50Q2hpbGQoVmlib3JCb3RoRGlyZWN0aXZlKSBwdWJsaWMgYm90aFRlbXBsYXRlOiBWaWJvckJvdGhEaXJlY3RpdmU7XG4gIEBDb250ZW50Q2hpbGQoVmlib3JEcm9wZG93bkRpcmVjdGl2ZSkgcHVibGljIGRyb3Bkb3duVGVtcGxhdGU6IFZpYm9yRHJvcGRvd25EaXJlY3RpdmU7XG4gIEBDb250ZW50Q2hpbGQoVmlib3JTZWxlY3RlZERpcmVjdGl2ZSkgcHVibGljIHNlbGVjdGVkVGVtcGxhdGU6IFZpYm9yU2VsZWN0ZWREaXJlY3RpdmU7XG4gIEBDb250ZW50Q2hpbGQoVmlib3JDcmVhdGVEaXJlY3RpdmUpIHB1YmxpYyBjcmVhdGVUZW1wbGF0ZTogVmlib3JDcmVhdGVEaXJlY3RpdmU7XG4gIEBJbnB1dCgpIHB1YmxpYyBsaXN0Rm9ybWF0dGVyOiAoYXJnOiBhbnksIHZhbHVlOiBzdHJpbmcpID0+IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIGRyb3Bkb3duRm9ybWF0dGVyOiAoYXJnOiBhbnksIHZhbHVlOiBzdHJpbmcpID0+IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIHZpZXdQcm9wZXJ0eSA9ICdOYW1lJzsgIC8vINCf0L7Qu9C1INC00LvRjyDQtNC10YTQvtC70YLQvdC+0LPQviDQvtGC0L7QsdGA0LDQttC10L3QuNGPXG5cbiAgQElucHV0KCkgcHVibGljIG1vZGVsUHJvcGVydHkgPSAnaWQnOyAgLy8g0KLQviwg0YfRgtC+INC30LDQv9C40YHRi9Cy0LDQtdGC0YHRjyDQsiDQnNC+0LTQtdC70YxcbiAgQElucHV0KCkgcHVibGljIHByZWxvYWRQcm9wZXJ0eSA9ICdpZHMnOyAvLyDQmtC70Y7RhyDQt9Cw0L/RgNC+0YHQsCDQuiDRgdC10YDQstC10YDRgyDQtNC70Y8g0L/RgNC10LTQt9Cw0LPRgNGD0LfQutC4LCDQtdGB0LvQuCB1bmRlZmluZWQg0LfQsNC/0LjRgdGL0LLQsNC10YLRgdGPINCy0LXRgdGMINC+0LHRitC10LrRglxuICBASW5wdXQoKSBwdWJsaWMgcHJlbG9hZEZpZWxkOiBzdHJpbmcgPSB1bmRlZmluZWQ7IC8vINCX0L3QsNGH0LXQvdC40LUg0L/QvtC70Y8sINC60L7RgtC+0YDQtSDQvdC10L7QsdGF0L7QtNC40LzQviDQvtGC0L/RgNCw0LLQuNGC0Ywg0LIg0LfQsNC/0YDQvtGBLlxuICBASW5wdXQoKSBwdWJsaWMgc2VhcmNoUHJvcGVydHkgPSAncXVlcnknO1xuXG4gIEBJbnB1dCgpIHB1YmxpYyBkYXRhTGlzdDogKChwYXJhbTogT2JqZWN0LCBwYWdlOiBudW1iZXIsIGNvdW50T25QYWdlPzogbnVtYmVyKSA9PiBPYnNlcnZhYmxlPElEYXRhUmVzcG9uc2U+KSB8IEFycmF5PGFueT47XG4gIEBJbnB1dCgpIHB1YmxpYyBleGNsdWRlTGlzdDogQXJyYXk8YW55PjtcbiAgQElucHV0KCkgcHVibGljIGFkZGl0aW9uYWxGaWx0ZXIgPSB7fTtcbiAgQElucHV0KCkgcHVibGljIG9ubHlFbWl0dGVyOiBib29sZWFuO1xuICBAT3V0cHV0KCdjaGFuZ2VGdWxsTW9kZWwnKSBwdWJsaWMgY2hhbmdlRnVsbE1vZGVsOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXG4gIEBJbnB1dCgpIHB1YmxpYyBuZXdNZXNzYWdlOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIHB1YmxpYyBDcmVhdGVOZXc6IChxdWVyeTogc3RyaW5nKSA9PiBPYnNlcnZhYmxlPGFueT4gfCBhbnkgPSAocXVlcnk6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiBxdWVyeTtcbiAgfVxuXG5cbiAgLy8gU3Vic2NyaXB0aW9uXG4gIHB1YmxpYyBkYXRhTGlzdFN1YjogU3Vic2NyaXB0aW9uO1xuXG5cbiAgLy8gT1BUSU9OU1xuICBwdWJsaWMgVHJhY2tCeUZuKGluZGV4OiBudW1iZXIpOiBhbnkge1xuICAgIHJldHVybiBpbmRleDtcbiAgfVxuXG4gIHB1YmxpYyBzaG93RHJvcGRvd25MaXN0KGV2ZW50OiBGb2N1c0V2ZW50IHwgTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm11bHRpcGxlICYmIHRoaXMub3V0cHV0Lmxlbmd0aCA+PSB0aGlzLm11bHRpcGxlTGltaXQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ29wZW4tdmlib3InKTtcbiAgICB0aGlzLmlucHV0RWwuZm9jdXMoKTtcbiAgICB0aGlzLnVwZGF0ZU9wdGlvbnMoKTtcbiAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBoaWRlRHJvcGRvd25MaXN0KCk6IHZvaWQge1xuICAgIHRoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZSgnb3Blbi12aWJvcicpO1xuICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgdGhpcy5pbnB1dEVsLmJsdXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBoaWRlRHJvcGRvd25MaXN0V2l0aERlbGF5KCk6IHZvaWQge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5oaWRlRHJvcGRvd25MaXN0KCk7XG4gICAgfSwgMTAwKTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVEcm9wZG93bihldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgIHRoaXMuaGlkZURyb3Bkb3duTGlzdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3dEcm9wZG93bkxpc3QodW5kZWZpbmVkKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRlbGF5OiBGdW5jdGlvbiA9IChmdW5jdGlvbiAoKTogRnVuY3Rpb24ge1xuICAgIGxldCB0aW1lciA9IDA7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjYWxsYmFjazogYW55LCBtczogbnVtYmVyKTogdm9pZCB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGNhbGxiYWNrLCBtcyk7XG4gICAgfTtcbiAgfSkoKTtcblxuICBwdWJsaWMgdXBkYXRlT3B0aW9ucygpOiB2b2lkIHtcbiAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgdGhpcy5vcHRpb25zID0gdGhpcy5kYXRhTGlzdC5maWx0ZXIoZGF0YSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5xdWVyeSB8fCB0aGlzLnF1ZXJ5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBmOiBhbnkgPSBmZXRjaEZyb21PYmplY3QoZGF0YSwgdGhpcy5zZWFyY2hQcm9wZXJ0eSk7XG4gICAgICAgIGlmIChmID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGYpLmluZGV4T2YodGhpcy5xdWVyeSkgPj0gMDtcbiAgICAgIH0pLmZpbHRlcihkYXRhID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmV4Y2x1ZGVMaXN0KSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZCA9IGZldGNoRnJvbU9iamVjdChkYXRhLCB0aGlzLm1vZGVsUHJvcGVydHkpLnZhbHVlT2YoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXhjbHVkZUxpc3QuZmluZEluZGV4KGV4ID0+IHtcbiAgICAgICAgICBsZXQgYSA9IGZldGNoRnJvbU9iamVjdChleCwgdGhpcy5tb2RlbFByb3BlcnR5KS52YWx1ZU9mKCk7XG4gICAgICAgICAgcmV0dXJuIGRlZXBFcXVhbChkLCBhKTtcbiAgICAgICAgfSkgPCAwO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIGlmICh0aGlzLmRhdGFMaXN0U3ViKSB7IHRoaXMuZGF0YUxpc3RTdWIudW5zdWJzY3JpYmUoKTsgfVxuICAgICAgaWYgKCF0aGlzLmN1cnJlbnRDYWNoZSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRDYWNoZSA9IHtcbiAgICAgICAgICBjb3VudEVsZW1lbnQ6IDAsXG4gICAgICAgICAgY291bnRQYWdlczogMSxcbiAgICAgICAgICBjdXJyZW50UGFnZTogMSxcbiAgICAgICAgICBvYmplY3RzOiBbXSxcbiAgICAgICAgICBxdWVyeTogdGhpcy5xdWVyeSxcbiAgICAgICAgICBwYXJhbXM6IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYWRkaXRpb25hbEZpbHRlcilcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jYWNoZUxhenlEYXRhLnB1c2godGhpcy5jdXJyZW50Q2FjaGUpO1xuXG4gICAgICAgIGxldCBwYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmFkZGl0aW9uYWxGaWx0ZXIpIGFzIGFueTtcbiAgICAgICAgcGFyYW1zW3RoaXMuc2VhcmNoUHJvcGVydHldID0gdGhpcy5xdWVyeTtcblxuICAgICAgICB0aGlzLmRhdGFMaXN0U3ViID0gKDxPYnNlcnZhYmxlPElEYXRhUmVzcG9uc2U+PnRoaXMuZGF0YUxpc3QocGFyYW1zLCAxLCB0aGlzLmNvdW50T25QYWdlKSkuc3Vic2NyaWJlKGFuc3dlciA9PiB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50Q2FjaGUub2JqZWN0cyA9IHRoaXMuY3VycmVudENhY2hlLm9iamVjdHMuY29uY2F0KGFuc3dlci5saXN0KTtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRDYWNoZS5jb3VudEVsZW1lbnQgPSBhbnN3ZXIuaGVhZGVyc1snY291bnQnXTtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRDYWNoZS5jb3VudFBhZ2VzID0gTWF0aC5jZWlsKHRoaXMuY3VycmVudENhY2hlLmNvdW50RWxlbWVudCAvIHRoaXMuY291bnRPblBhZ2UpO1xuICAgICAgICB9LCAoKSA9PiB7IH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVPcHRpb25zSW5EZWxheSgpOiB2b2lkIHtcbiAgICBsZXQgZGVsYXlNczogbnVtYmVyID0gdGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEFycmF5ID8gMTAgOiB0aGlzLndhaXRUaW1lO1xuXG4gICAgLy8gZXhlY3V0aW5nIGFmdGVyIHVzZXIgc3RvcHBlZCB0eXBpbmdcbiAgICB0aGlzLmRlbGF5KCgpID0+IHtcbiAgICAgIHRoaXMub2xkUXVlcnkgPSB0aGlzLnF1ZXJ5O1xuICAgICAgdGhpcy5jdXJyZW50Q2FjaGUgPSB0aGlzLkdldENhY2hlKHRoaXMucXVlcnkpO1xuICAgICAgdGhpcy51cGRhdGVPcHRpb25zKCk7XG4gICAgfSwgZGVsYXlNcyk7XG4gIH1cblxuICBwcml2YXRlIGZvY3VzU2VsZWN0ZWRPcHRpb24oKTogdm9pZCB7XG4gICAgbGV0IGxpc3Q6IGFueSA9IDxIVE1MRWxlbWVudD50aGlzLmVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NlbGVjdC1kcm9wZG93bicpWzBdO1xuICAgIGxldCB0YXJnZXRMaTogYW55ID0gPEhUTUxFbGVtZW50PnRoaXMuZWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvbicpW3RoaXMuc2VsZWN0b3JQb3NpdGlvbl07XG4gICAgc2Nyb2xsQWN0aXZlT3B0aW9uKGxpc3QsIHRhcmdldExpKTtcbiAgfVxuXG4gIHB1YmxpYyBrZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLk9wdGlvbnMpIHtcbiAgICAgIHRoaXMuc2hvd0Ryb3Bkb3duTGlzdCh1bmRlZmluZWQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCB0b3RhbE51bUl0ZW06IG51bWJlciA9IHRoaXMuT3B0aW9ucy5sZW5ndGg7XG5cbiAgICBpZiAodGhpcy5TaG93TmV3KSB7XG4gICAgICB0b3RhbE51bUl0ZW0rKztcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgIGNhc2UgMjc6IC8vIEVTQywgaGlkZSBhdXRvIGNvbXBsZXRlXG4gICAgICAgIHRoaXMuaGlkZURyb3Bkb3duTGlzdCgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAzODogLy8gVVAsIHNlbGVjdCB0aGUgcHJldmlvdXMgbGkgZWxcbiAgICAgICAgdGhpcy5zZWxlY3RvclBvc2l0aW9uID0gKHRvdGFsTnVtSXRlbSArIHRoaXMuc2VsZWN0b3JQb3NpdGlvbiAtIDEpICUgdG90YWxOdW1JdGVtO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSA0MDogLy8gRE9XTiwgc2VsZWN0IHRoZSBuZXh0IGxpIGVsIG9yIHRoZSBmaXJzdCBvbmVcbiAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLnNlbGVjdG9yUG9zaXRpb24gPSAodG90YWxOdW1JdGVtICsgdGhpcy5zZWxlY3RvclBvc2l0aW9uICsgMSkgJSB0b3RhbE51bUl0ZW07XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDEzOiAvLyBFTlRFUiwgY2hvb3NlIGl0ISFcbiAgICAgICAgaWYgKHRvdGFsTnVtSXRlbSA+IDApIHtcbiAgICAgICAgICBpZiAodGhpcy5zZWxlY3RvclBvc2l0aW9uID09PSB0aGlzLk9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLkFkZE5ld09iamVjdCh0aGlzLkNyZWF0ZU5ldyh0aGlzLnF1ZXJ5KSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0T25lKGV2ZW50LCB0aGlzLk9wdGlvbnNbdGhpcy5zZWxlY3RvclBvc2l0aW9uXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuU2hvd05ldykge1xuICAgICAgICAgIHRoaXMuQWRkTmV3T2JqZWN0KHRoaXMuQ3JlYXRlTmV3KHRoaXMucXVlcnkpKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDogYnJlYWs7XG4gICAgfVxuICAgIHRoaXMuZm9jdXNTZWxlY3RlZE9wdGlvbigpO1xuICB9XG5cbiAgcHVibGljIG5leHRQYWdlKCRldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIC8vIFZhbGlkYXRvcnNcbiAgICBpZiAoISh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgRnVuY3Rpb24pKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RhdGEgTGlzdCBtYXN0IGJlIEZ1bmN0aW9uJyk7XG4gICAgfVxuICAgIGlmICghdGhpcy5jdXJyZW50Q2FjaGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRm9yIG5leHQgcGFnZSBuZWVkIGNhY2hlIGZvciBmaXJzdCBQYWdlJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmN1cnJlbnRDYWNoZS5jdXJyZW50UGFnZSA+PSB0aGlzLmN1cnJlbnRDYWNoZS5jb3VudFBhZ2VzKSB7IHRocm93IG5ldyBFcnJvcignTWF4IFBhZ2UgTGltaXQnKTsgfVxuXG4gICAgaWYgKHRoaXMuZGF0YUxpc3RTdWIpIHsgdGhpcy5kYXRhTGlzdFN1Yi51bnN1YnNjcmliZSgpOyB9XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmFkZGl0aW9uYWxGaWx0ZXIpO1xuICAgIHBhcmFtc1t0aGlzLnNlYXJjaFByb3BlcnR5XSA9IHRoaXMucXVlcnk7XG5cbiAgICB0aGlzLmRhdGFMaXN0U3ViID0gdGhpcy5kYXRhTGlzdChwYXJhbXMsIHRoaXMuY3VycmVudENhY2hlLmN1cnJlbnRQYWdlICsgMSwgdGhpcy5jb3VudE9uUGFnZSkuc3Vic2NyaWJlKGFuc3dlciA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRDYWNoZS5jdXJyZW50UGFnZSsrO1xuICAgICAgdGhpcy5jdXJyZW50Q2FjaGUuY291bnRFbGVtZW50ID0gYW5zd2VyLmhlYWRlcnNbJ2NvdW50J107XG4gICAgICB0aGlzLmN1cnJlbnRDYWNoZS5jb3VudFBhZ2VzID0gTWF0aC5jZWlsKHRoaXMuY3VycmVudENhY2hlLmNvdW50RWxlbWVudCAvIHRoaXMuY291bnRPblBhZ2UpO1xuICAgICAgdGhpcy5jdXJyZW50Q2FjaGUub2JqZWN0cyA9IHRoaXMuY3VycmVudENhY2hlLm9iamVjdHMuY29uY2F0KGFuc3dlci5saXN0KTtcbiAgICAgIHRoaXMuc2VsZWN0b3JQb3NpdGlvbiA9ICh0aGlzLmN1cnJlbnRDYWNoZS5jdXJyZW50UGFnZSAtIDEpICogdGhpcy5jb3VudE9uUGFnZSArIDE7XG4gICAgICB0aGlzLmZvY3VzU2VsZWN0ZWRPcHRpb24oKTtcbiAgICB9LCAoKSA9PiB7IH0pO1xuICB9XG5cbiAgLy8gTU9ERUxcbiAgcHJpdmF0ZSBjbGVhclByb3BlcnR5KCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0b3JQb3NpdGlvbiA9IDA7XG4gICAgdGhpcy5xdWVyeSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RPbmUoJGV2ZW50OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCwgZGF0YTogYW55KTogdm9pZCB7XG4gICAgLy8g0KTQuNC70YzRgtGAINC90LXQvdGD0LbQvdGL0YUg0YHQvtCx0YvRgtC40LlcbiAgICBpZiAoJGV2ZW50IGluc3RhbmNlb2YgTW91c2VFdmVudCAmJiAkZXZlbnQuYnV0dG9uICE9PSAwKSB7IHJldHVybjsgfVxuXG4gICAgaWYgKHRoaXMubXVsdGlwbGUgJiYgdGhpcy5vdXRwdXQubGVuZ3RoIDwgdGhpcy5tdWx0aXBsZUxpbWl0KSB7XG4gICAgICB0aGlzLm91dHB1dC5wdXNoKGRhdGEpO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMubXVsdGlwbGUpIHtcbiAgICAgIHRoaXMub3V0cHV0ID0gW2RhdGFdO1xuICAgIH1cbiAgICB0aGlzLmNoYW5nZUZ1bGxNb2RlbC5lbWl0KHRoaXMub3V0cHV0KTtcbiAgICB0aGlzLk1vZGVsID0gdGhpcy5WYWx1ZUZyb21PdXRwdXQ7XG4gICAgdGhpcy5jbGVhclByb3BlcnR5KCk7XG4gICAgdGhpcy5oaWRlRHJvcGRvd25MaXN0KCk7XG4gICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH07XG5cbiAgcHVibGljIHJlbW92ZU9uZShpbmRleDogbnVtYmVyLCBldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuXG4gICAgdGhpcy5vdXRwdXQuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLk1vZGVsID0gdGhpcy5WYWx1ZUZyb21PdXRwdXQ7XG5cbiAgICAvLyBzZXQgY2xhc3NcbiAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgIHRoaXMuaW5wdXRDb250cm9sLmNvbnRyb2wubWFya0FzVG91Y2hlZCgpO1xuXG4gICAgLy8gb3BlbiBkcm9wZG93blxuICAgIGlmICh0aGlzLnJlcXVpcmVkKSB7XG4gICAgICB0aGlzLnNob3dEcm9wZG93bkxpc3QodW5kZWZpbmVkKTtcbiAgICB9XG4gIH1cblxuICAvLyBGT1JNQVRUSU5HXG5cbiAgcHVibGljIGdldCBTZWxlY3RlZFRlbXBsYXRlKCk6IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgIGlmICh0aGlzLnNlbGVjdGVkVGVtcGxhdGUpIHtcbiAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkVGVtcGxhdGUudGVtcGxhdGVSZWY7XG4gICAgfSBlbHNlIGlmICh0aGlzLmJvdGhUZW1wbGF0ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuYm90aFRlbXBsYXRlLnRlbXBsYXRlUmVmO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHVibGljIGdldCBEcm9wZG93blRlbXBsYXRlKCk6IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgIGlmICh0aGlzLmRyb3Bkb3duVGVtcGxhdGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmRyb3Bkb3duVGVtcGxhdGUudGVtcGxhdGVSZWY7XG4gICAgfSBlbHNlIGlmICh0aGlzLmJvdGhUZW1wbGF0ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuYm90aFRlbXBsYXRlLnRlbXBsYXRlUmVmO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHVibGljIGdldExpc3RGb3JtYXR0ZWQoZGF0YTogYW55KTogc3RyaW5nIHtcbiAgICBsZXQgZm9ybWF0dGVyOiBhbnkgPSB0aGlzLmxpc3RGb3JtYXR0ZXIgfHwgZGVmYXVsdEZvcm1hdHRlcjtcbiAgICByZXR1cm4gZm9ybWF0dGVyLmFwcGx5KHRoaXMsIFtkYXRhLCB0aGlzLnZpZXdQcm9wZXJ0eV0pO1xuICB9XG5cbiAgcHVibGljIGdldERyb3Bkb3duRm9ybWF0dGVkKGRhdGE6IGFueSk6IHN0cmluZyB7XG4gICAgbGV0IGZvcm1hdHRlcjogYW55ID0gdGhpcy5kcm9wZG93bkZvcm1hdHRlciB8fCBkZWZhdWx0Rm9ybWF0dGVyO1xuICAgIHJldHVybiBmb3JtYXR0ZXIuYXBwbHkodGhpcywgW2RhdGEsIHRoaXMudmlld1Byb3BlcnR5XSk7XG4gIH1cblxuICAvLyBJTklUXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAvLyB0aGlzLk1vZGVsID0gdGhpcy5WYWx1ZUZyb21PdXRwdXQ7INCt0YLQviDQstGA0L7QtNC1INGC0YPRgiDRgtC+0LbQtSDRg9C20LUg0L3QtSDQvdCw0LTQvi5cbiAgICB0aGlzLmVsID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndmlib3InKS5pdGVtKDApO1xuICAgIGlmICh0aGlzLm11bHRpcGxlKSB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ211bHRpcGxlJyk7XG4gICAgaWYgKHRoaXMucmVxdWlyZWQpIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCgncmVxdWlyZWQnKTtcblxuICAgIHRoaXMuaW5wdXRFbCA9IDxIVE1MSW5wdXRFbGVtZW50Pih0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykpO1xuICB9XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKGlucHV0czogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChpbnB1dHNbJ2RhdGFMaXN0J10gJiYgaW5wdXRzWydkYXRhTGlzdCddLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgLy8gT3V0cHV0XG4gICAgICBpZiAodGhpcy5Nb2RlbCA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuTW9kZWwgPT0gbnVsbCkge1xuICAgICAgICB0aGlzLm91dHB1dCA9IFtdO1xuICAgICAgICB0aGlzLmNoYW5nZUZ1bGxNb2RlbC5lbWl0KHRoaXMub3V0cHV0KTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5Nb2RlbCBpbnN0YW5jZW9mIEFycmF5ICYmIHRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgdGhpcy5PdXRwdXQgPSB0aGlzLk1vZGVsO1xuICAgICAgfSBlbHNlIGlmICghKHRoaXMuTW9kZWwgaW5zdGFuY2VvZiBBcnJheSkgJiYgIXRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgdGhpcy5PdXRwdXQgPSBbdGhpcy5Nb2RlbF07XG5cbiAgICAgICAgaWYgKCF0aGlzLm91dHB1dCB8fCAhdGhpcy5vdXRwdXQubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5Nb2RlbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmVsICYmIGlucHV0c1snbXVsdGlwbGUnXSkge1xuICAgICAgaWYgKGlucHV0c1snbXVsdGlwbGUnXS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCdtdWx0aXBsZScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCdtdWx0aXBsZScpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmVsICYmIGlucHV0c1sncmVxdWlyZWQnXSkge1xuICAgICAgaWYgKGlucHV0c1sncmVxdWlyZWQnXS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCdyZXF1aXJlZCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCdyZXF1aXJlZCcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpbnB1dHNbJ2FkZGl0aW9uYWxGaWx0ZXInXSkge1xuICAgICAgdGhpcy5jdXJyZW50Q2FjaGUgPSB0aGlzLkdldENhY2hlKHRoaXMucXVlcnkpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRGl2RWxlbWVudD4pIHtcbiAgICB0aGlzLm91dHB1dCA9IFtdO1xuICB9XG5cbiAgLy8gRk9STVNcbiAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIC8vINCd0L7RgNC80LDQu9GM0L3Ri9C5IHVwZGF0ZSDQvNC+0LTQtdC70LhcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIGlmICgodmFsdWUgaW5zdGFuY2VvZiBBcnJheSAmJiAhdGhpcy5tdWx0aXBsZSkgfHwgKCEodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkgJiYgdGhpcy5tdWx0aXBsZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNb2RlbCBUeXBlIEVycm9yJyk7XG4gICAgICB9XG4gICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBBcnJheSAmJiB0aGlzLk1vZGVsIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gdGhpcy5Nb2RlbC5sZW5ndGggJiYgdmFsdWUuZXZlcnkodiA9PiB0aGlzLk1vZGVsLmluZGV4T2YodikgPj0gMCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5Nb2RlbCA9PT0gdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5maXJzdExvYWQgPSB0cnVlO1xuICAgICAgdGhpcy5Nb2RlbCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBvbkNoYW5nZTogYW55ID0gKCkgPT4geyB9O1xuICBwdWJsaWMgb25Ub3VjaGVkOiBhbnkgPSAoKSA9PiB7IH07XG5cbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBwdWJsaWMgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgaWYgKGlzRGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVsLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICB9XG4gICAgLy8gZGlzYWJsZSBvdGhlciBjb21wb25lbnRzIGhlcmVcbiAgfVxuXG4gIHNldCBNb2RlbCh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHRoaXMub25seUVtaXR0ZXIpIHtcbiAgICAgIHRoaXMub3V0cHV0ID0gW107XG4gICAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBPdXRwdXRcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PSBudWxsKSB7XG4gICAgICB0aGlzLm91dHB1dCA9IFtdO1xuICAgICAgdGhpcy5jaGFuZ2VGdWxsTW9kZWwuZW1pdCh0aGlzLm91dHB1dCk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5ICYmIHRoaXMubXVsdGlwbGUpIHtcbiAgICAgIHRoaXMuT3V0cHV0ID0gdmFsdWU7XG4gICAgfSBlbHNlIGlmICghKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpICYmICF0aGlzLm11bHRpcGxlKSB7XG4gICAgICB0aGlzLk91dHB1dCA9IFt2YWx1ZV07XG4gICAgfVxuXG4gICAgLy8gTW9kZWxcbiAgICB0aGlzLl9tb2RlbCA9IHZhbHVlO1xuXG4gICAgLy8gRm9ybXNcbiAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuX21vZGVsKTtcbiAgfVxuXG4gIGdldCBNb2RlbCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbDtcbiAgfVxuXG4gIC8vIFBST1BFUlRZXG4gIGdldCBJbnB1dEhpZGUoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcbiAgICAgIHJldHVybiB0aGlzLm91dHB1dC5sZW5ndGggPj0gdGhpcy5tdWx0aXBsZUxpbWl0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5vdXRwdXQubGVuZ3RoID09PSAxICYmICF0aGlzLmlzT3BlbjtcbiAgICB9XG4gIH1cblxuICBnZXQgVmFsdWVGcm9tT3V0cHV0KCk6IGFueSB7XG4gICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcbiAgICAgIGxldCB0bXA6IEFycmF5PGFueT4gPSBbXTtcbiAgICAgIGZvciAobGV0IG8gb2YgdGhpcy5vdXRwdXQpIHtcbiAgICAgICAgdG1wLnB1c2goZmV0Y2hGcm9tT2JqZWN0KG8sIHRoaXMubW9kZWxQcm9wZXJ0eSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRtcDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZldGNoRnJvbU9iamVjdCh0aGlzLm91dHB1dFswXSwgdGhpcy5tb2RlbFByb3BlcnR5KTtcbiAgICB9XG4gIH1cblxuICBzZXQgT3V0cHV0KG5ld1ZhbHVlOiBBcnJheTxhbnk+KSB7XG4gICAgbGV0IGRhdGFMaXN0OiBBcnJheTxhbnk+ID0gW107XG4gICAgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgZGF0YUxpc3QgPSB0aGlzLmRhdGFMaXN0O1xuICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICBpZiAobmV3VmFsdWUgJiYgbmV3VmFsdWUubGVuZ3RoICYmIHRoaXMuZmlyc3RMb2FkKSB7XG4gICAgICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuICAgICAgICB0aGlzLmZpcnN0TG9hZCA9IGZhbHNlO1xuICAgICAgICBpZiAoIXRoaXMucHJlbG9hZFByb3BlcnR5KSB7XG4gICAgICAgICAgdGhpcy5vdXRwdXQgPSBuZXdWYWx1ZTtcbiAgICAgICAgICB0aGlzLmNoYW5nZUZ1bGxNb2RlbC5lbWl0KHRoaXMub3V0cHV0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwYXJhbXNbdGhpcy5wcmVsb2FkUHJvcGVydHldID0gbmV3VmFsdWUubWFwKHZhbCA9PiBmZXRjaEZyb21PYmplY3QodmFsLCB0aGlzLnByZWxvYWRGaWVsZCkpO1xuICAgICAgICAgIHRoaXMuZGF0YUxpc3RTdWIgPSAoPE9ic2VydmFibGU8SURhdGFSZXNwb25zZT4+dGhpcy5kYXRhTGlzdChwYXJhbXMsIDEsIHRoaXMuY291bnRPblBhZ2UpKS5zdWJzY3JpYmUoYW5zd2VyID0+IHtcbiAgICAgICAgICAgIHRoaXMub3V0cHV0ID0gYW5zd2VyLmxpc3Q7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUZ1bGxNb2RlbC5lbWl0KHRoaXMub3V0cHV0KTtcbiAgICAgICAgICB9LCAoKSA9PiB7IH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNoYW5nZUZ1bGxNb2RlbC5lbWl0KHRoaXMub3V0cHV0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuZGF0YUxpc3QgPT09IHVuZGVmaW5lZCkgeyByZXR1cm47IH1cbiAgICAgIHRocm93IG5ldyBFcnJvcignZGF0YUxpc3QgdmFsdWUgRXJyb3InKTtcbiAgICB9XG4gICAgbGV0IG5ld091dHB1dDogQXJyYXk8YW55PiA9IFtdO1xuICAgIGZvciAobGV0IHYgb2YgbmV3VmFsdWUpIHtcbiAgICAgIGZvciAobGV0IGQgb2YgZGF0YUxpc3QpIHtcbiAgICAgICAgbGV0IGEgPSBmZXRjaEZyb21PYmplY3QoZCwgdGhpcy5tb2RlbFByb3BlcnR5KSA/IGZldGNoRnJvbU9iamVjdChkLCB0aGlzLm1vZGVsUHJvcGVydHkpLnZhbHVlT2YoKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgbGV0IGIgPSB2ID8gdi52YWx1ZU9mKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChkZWVwRXF1YWwoYSwgYikpIHtcbiAgICAgICAgICBuZXdPdXRwdXQucHVzaChkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLm91dHB1dCA9IG5ld091dHB1dDtcbiAgICB0aGlzLmNoYW5nZUZ1bGxNb2RlbC5lbWl0KHRoaXMub3V0cHV0KTtcbiAgfVxuXG4gIGdldCBPcHRpb25zKCk6IEFycmF5PGFueT4ge1xuICAgIGxldCBvcHRpb25zOiBBcnJheTxhbnk+O1xuICAgIGlmICh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgfSBlbHNlIGlmICh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIGxldCBvbGRDYWNoZSA9IHRoaXMuR2V0Q2FjaGUodGhpcy5vbGRRdWVyeSk7XG5cbiAgICAgIGlmICghdGhpcy5jdXJyZW50Q2FjaGUgJiYgb2xkQ2FjaGUpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9sZENhY2hlLm9iamVjdHM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb25zID0gdGhpcy5jdXJyZW50Q2FjaGUgPyB0aGlzLmN1cnJlbnRDYWNoZS5vYmplY3RzIDogW107XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAob3B0aW9ucyB8fCBbXSkuZmlsdGVyKG9wID0+IHtcbiAgICAgIHJldHVybiB0aGlzLm91dHB1dC5maW5kSW5kZXgobyA9PiB7XG4gICAgICAgIGxldCBhID0gZmV0Y2hGcm9tT2JqZWN0KG8sIHRoaXMubW9kZWxQcm9wZXJ0eSkgPyBmZXRjaEZyb21PYmplY3QobywgdGhpcy5tb2RlbFByb3BlcnR5KS52YWx1ZU9mKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgIGxldCBiID0gZmV0Y2hGcm9tT2JqZWN0KG9wLCB0aGlzLm1vZGVsUHJvcGVydHkpID8gZmV0Y2hGcm9tT2JqZWN0KG9wLCB0aGlzLm1vZGVsUHJvcGVydHkpLnZhbHVlT2YoKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIGRlZXBFcXVhbChhLCBiKTtcbiAgICAgIH0pID09PSAtMTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBjdXJyZW50Q2FjaGU6IENhY2hlSW5mbztcbiAgcHJpdmF0ZSBHZXRDYWNoZShxdWVyeTogc3RyaW5nKTogQ2FjaGVJbmZvIHtcbiAgICBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYWNoZUxhenlEYXRhLmZpbmQoY2FjaGUgPT4ge1xuICAgICAgICByZXR1cm4gY2FjaGUucXVlcnkgPT09IHRoaXMucXVlcnkgJiYgZGVlcEVxdWFsKGNhY2hlLnBhcmFtcywgdGhpcy5hZGRpdGlvbmFsRmlsdGVyKTtcbiAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICAvLyBDcmVhdGVOZXdcblxuICBwdWJsaWMgQWRkTmV3T2JqZWN0KHZhbHVlOiBPYnNlcnZhYmxlPGFueT4gfCBhbnkpOiB2b2lkIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSB7XG4gICAgICB2YWx1ZS5zdWJzY3JpYmUobmV3T2JqZWN0ID0+IHtcbiAgICAgICAgaWYgKG5ld09iamVjdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhpcy5TZXROZXdPYmplY3QobmV3T2JqZWN0KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuU2V0TmV3T2JqZWN0KHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIFNldE5ld09iamVjdChuZXdPYmplY3Q6IGFueSkge1xuICAgIGlmICh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHRoaXMuZGF0YUxpc3QucHVzaChuZXdPYmplY3QpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICBmb3IgKGxldCBjYWNoZSBvZiB0aGlzLmNhY2hlTGF6eURhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMucXVlcnkuaW5jbHVkZXMoY2FjaGUucXVlcnkpIHx8IGNhY2hlLnF1ZXJ5ID09PSB1bmRlZmluZWQgfHwgY2FjaGUucXVlcnkgPT09ICcnKSB7XG4gICAgICAgICAgY2FjaGUuY291bnRFbGVtZW50Kys7XG4gICAgICAgICAgY2FjaGUub2JqZWN0cy5wdXNoKG5ld09iamVjdCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmZpcnN0TG9hZCA9IGZhbHNlO1xuICAgIHRoaXMucXVlcnkgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5jdXJyZW50Q2FjaGUgPSB0aGlzLkdldENhY2hlKHRoaXMucXVlcnkpO1xuICAgIHRoaXMuc2VsZWN0T25lKG5ldyBNb3VzZUV2ZW50KCdjbGljaycpLCBuZXdPYmplY3QpO1xuICB9XG5cbiAgZ2V0IFNob3dOZXcoKTogYm9vbGVhbiB7XG4gICAgbGV0IGEgPSB0aGlzLnF1ZXJ5ICYmIHRoaXMubmV3TWVzc2FnZSAmJiAoIXRoaXMuZGF0YUxpc3RTdWIgfHwgdGhpcy5kYXRhTGlzdFN1Yi5jbG9zZWQpO1xuXG4gICAgbGV0IGIgPSB0aGlzLk9wdGlvbnMuZmluZEluZGV4KG8gPT4ge1xuICAgICAgbGV0IGMgPSBmZXRjaEZyb21PYmplY3QobywgdGhpcy52aWV3UHJvcGVydHkpID8gZmV0Y2hGcm9tT2JqZWN0KG8sIHRoaXMudmlld1Byb3BlcnR5KS52YWx1ZU9mKCkgOiB1bmRlZmluZWQ7XG4gICAgICByZXR1cm4gZGVlcEVxdWFsKGMsIHRoaXMucXVlcnkpO1xuICAgIH0pID09PSAtMSAmJiB0aGlzLm91dHB1dC5maW5kSW5kZXgobyA9PiB7XG4gICAgICBsZXQgYyA9IGZldGNoRnJvbU9iamVjdChvLCB0aGlzLnZpZXdQcm9wZXJ0eSkgPyBmZXRjaEZyb21PYmplY3QobywgdGhpcy52aWV3UHJvcGVydHkpLnZhbHVlT2YoKSA6IHVuZGVmaW5lZDtcbiAgICAgIHJldHVybiBkZWVwRXF1YWwoYywgdGhpcy5xdWVyeSk7XG4gICAgfSkgPT09IC0xO1xuXG4gICAgcmV0dXJuIGEgJiYgYjtcbiAgfVxuXG4gIGdldCBTaG93RW1wdHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuT3B0aW9ucy5sZW5ndGggPT09IDAgJiYgKCEodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB8fCAodGhpcy5kYXRhTGlzdFN1Yi5jbG9zZWQpKTtcbiAgfVxuXG5cbiAgLy8gQ0FDSEVcbiAgcHJpdmF0ZSBjYWNoZUxhenlEYXRhOiBBcnJheTxDYWNoZUluZm8+ID0gW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2FjaGVJbmZvIHtcbiAgY291bnRFbGVtZW50OiBudW1iZXI7XG4gIGNvdW50UGFnZXM6IG51bWJlcjtcbiAgY3VycmVudFBhZ2U6IG51bWJlcjtcbiAgb2JqZWN0czogQXJyYXk8YW55PjtcblxuICBxdWVyeTogc3RyaW5nO1xuICBwYXJhbXM6IGFueTtcbn1cbiJdfQ==