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
                    template: "<div class=\"root-vibor\">\n  <ng-content></ng-content>\n\n  <div class=\"select-search\" (click)=\"showDropdownList($event);\">\n    <ul class=\"select-search-list\">\n      <ng-container *ngIf=\"multiple || !isOpen\">\n        <ng-container *ngIf=\"!SelectedTemplate; else selectedT\">\n          <li class=\"select-search-list-item select-search-list-item_selection\" *ngFor=\"let item of output; let $index=index; let $last=last; trackBy: TrackByFn;\">\n            <div [innerHTML]=\"getListFormatted(item)\"></div>\n            <a class=\"select-search-list-item_remove\" *ngIf=\"allowReset\" (click)=\"!disabled && removeOne($index, $event)\"></a>\n          </li>\n        </ng-container>\n\n        <ng-template #selectedT>\n          <li class=\"select-search-list-item select-search-list-item_selection\" *ngFor=\"let item of output; let $index=index; let $last=last; trackBy: TrackByFn;\">\n            <ng-container *ngTemplateOutlet=\"SelectedTemplate; context: {item: item}\"></ng-container>\n            <a class=\"select-search-list-item_remove\" *ngIf=\"allowReset && !disabled\" (click)=\"!disabled && removeOne($index, $event)\">\n            </a>\n          </li>\n        </ng-template>\n      </ng-container>\n\n      <li class=\"select-search-list-item select-search-list-item_input\" [class.select-search-list-item_hide]=\"InputHide\">\n        <input autocomplete=\"off\" #inputControl=\"ngModel\" [name]=\"name\" [disabled]=\"disabled\" [(ngModel)]=\"query\" [placeholder]=\"output.length == 0 || (multiple && output.length < multipleLimit) ? placeholder : ''\"\n          (input)=\"updateOptionsInDelay()\" (blur)=\"hideDropdownListWithDelay()\" (keydown)=\"keyDown($event)\" />\n      </li>\n      <li class=\"select-search-list-item select-search-list-item_loader-center\" [hidden]=\"!dataListSub || dataListSub.closed\">\n        <div class=\"select-search-list-item_loader\"></div>\n      </li>\n\n      <span class=\"arrow\" (click)=\"toggleDropdown($event)\">\n      </span>\n    </ul>\n  </div>\n\n  <div class=\"select-dropdown\" *ngIf=\"isOpen\">\n    <ul class=\"select-dropdown-optgroup\">\n      <ng-container *ngIf=\"!DropdownTemplate; else dropdownT\">\n        <li class=\"select-dropdown-optgroup-option\" *ngFor=\"let option of Options; let i=index\" (mousedown)=\"selectOne($event, option)\"\n          [class.active]=\"i === selectorPosition\" [innerHTML]=\"getDropdownFormatted(option)\">\n        </li>\n      </ng-container>\n\n      <ng-template #dropdownT>\n        <li class=\"select-dropdown-optgroup-option\" *ngFor=\"let option of Options; let i=index\" (mousedown)=\"selectOne($event, option)\"\n          [class.active]=\"i === selectorPosition\">\n          <ng-container *ngTemplateOutlet=\"DropdownTemplate; context: {item: option}\"></ng-container>\n        </li>\n      </ng-template>\n\n      <li class=\"select-dropdown-optgroup-option loader\" *ngIf=\"dataListSub && !dataListSub.closed\">\n        \u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430\n      </li>\n      <li class=\"select-dropdown-optgroup-option loader\" (mousedown)=\"AddNewObject(CreateNew(query));\" [class.active]=\"selectorPosition === Options.length\"\n        *ngIf=\"ShowNew\">\n\n        <ng-container *ngIf=\"createTemplate; else templateWithMessage\">\n          <ng-container *ngTemplateOutlet=\"createTemplate.templateRef; context: {query: query}\"></ng-container>\n        </ng-container>\n\n        <ng-template #templateWithMessage>\n          {{ newMessage }}\n        </ng-template>\n      </li>\n      <li class=\"select-dropdown-optgroup-option loader\" *ngIf=\"ShowEmpty\">\n        \u041F\u0443\u0441\u0442\u043E\n      </li>\n    </ul>\n    <div class=\"select-dropdown-pager\" *ngIf=\"currentCache && currentCache.countPages > 1\">\n      <p class=\"select-dropdown-pager-page\">\n        {{ currentCache.currentPage | number }} / {{ currentCache.countPages | number }}\n      </p>\n      <button class=\"select-dropdown-pager-loadmore\" *ngIf=\"currentCache.countPages > 1 && currentCache.currentPage < currentCache.countPages\"\n        (mousedown)=\"nextPage($event)\">\n        \u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0435\u0449\u0451\n      </button>\n    </div>\n  </div>\n</div>\n",
                    styles: [".root-vibor{position:relative;display:block;font-family:-apple-system,BlinkMacSystemFont, \"Segoe UI\",Roboto,Helvetica,Arial,sans-serif, \"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\"}.root-vibor:not(.multiple) .select-search-list-item_selection{padding-right:70px}.root-vibor.multiple .select-search-list-item_remove{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+CiAgPHBhdGggZmlsbD0iIzhlNDRhZCIgZD0iTTEwLjEgNC41TDggNi42IDUuOSA0LjUgNC41IDUuOSA2LjYgOGwtMi4xIDIuMSAxLjQgMS40TDggOS40bDIuMSAyLjEgMS40LTEuNEw5LjQgOGwyLjEtMi4xeiIvPgo8L3N2Zz4K);background-color:transparent}.root-vibor .select-dropdown{position:absolute;top:100%;left:0;right:0;z-index:2;background:#fff}.root-vibor .select-search{position:relative}.root-vibor .select-search .arrow{content:\"\";position:absolute;right:13px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);display:block;width:16px;height:16px;background-image:url(data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ibmMtaWNvbiBnbHlwaCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiI+DQogIDxwYXRoIGZpbGw9IiMyYzJjMmMiIGQ9Ik04IDExLjRMMi42IDYgNCA0LjZsNCA0IDQtNEwxMy40IDYiLz4NCjwvc3ZnPg0K);transition:-webkit-transform .15s ease-in-out;transition:transform .15s ease-in-out;transition:transform .15s ease-in-out,-webkit-transform .15s ease-in-out}.root-vibor .select-search .arrow:before{display:none}.root-vibor .select-search-list-item_input input{background:0 0}.root-vibor .select-search-list-item_input input::-webkit-input-placeholder{color:rgba(56,61,65,.3)}.root-vibor .select-search-list-item_input input::-moz-placeholder{color:rgba(56,61,65,.3)}.root-vibor .select-search-list-item_input input:-moz-placeholder{color:rgba(56,61,65,.3)}.root-vibor .select-search-list-item_input input:-ms-input-placeholder{color:rgba(56,61,65,.3)}.root-vibor .select-search-list-item_loader-center[hidden]{display:none!important}.root-vibor .select-search-list-item_loader-center{position:absolute;right:10px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);display:flex;align-items:center;justify-content:center;width:21px;height:21px;background:#fff;z-index:2}.root-vibor .select-search-list-item_loader-center .select-search-list-item_loader{width:16px;height:16px;box-sizing:border-box;border-width:2px;border-style:solid;border-color:#22272e rgba(34,39,46,.4) rgba(34,39,46,.4);border-radius:100%;-webkit-animation:.45s linear infinite clockwise;animation:.45s linear infinite clockwise}.root-vibor .select-search-list-item_hide{display:none}.root-vibor .select-dropdown .select-dropdown-optgroup-option:hover{background-color:rgba(66,132,215,.1)}.root-vibor .select-search-list-item_remove{position:absolute;top:50%;right:35px;-webkit-transform:translateY(-50%);transform:translateY(-50%);display:block;width:20px;height:20px;border-radius:50%;background-color:rgba(44,44,44,.1);background-image:url(data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ibmMtaWNvbiBnbHlwaCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCAxNiAxNiI+PGc+Cjxwb2x5Z29uIGZpbGw9IiMwZjBmMGYiIHBvaW50cz0iMTAuMSw0LjUgOCw2LjYgNS45LDQuNSA0LjUsNS45IDYuNiw4IDQuNSwxMC4xIDUuOSwxMS41IDgsOS40IDEwLjEsMTEuNSAxMS41LDEwLjEgOS40LDggMTEuNSw1LjkgCgkiPjwvcG9seWdvbj4KPC9nPjwvc3ZnPg==);background-repeat:no-repeat;background-position:center;color:transparent}.root-vibor.disabled .select-search-list-item_remove,.root-vibor[disabled] .select-search-list-item_remove{display:none}.root-vibor[class*='_size'][class*='-s'] .select-search .b-vibor__value,.root-vibor[class*='_size'][class*='-s'] .select-search-list-item_input input,.root-vibor[class*='_size'][class*='-s'] .select-search-list-item_selection{height:40px}.root-vibor[class*='_size'][class*='-m'] .select-search .b-vibor__value,.root-vibor[class*='_size'][class*='-m'] .select-search-list-item_input input,.root-vibor[class*='_size'][class*='-m'] .select-search-list-item_selection{height:50px}.root-vibor[class*='_size'][class*='-l'] .select-search .b-vibor__value,.root-vibor[class*='_size'][class*='-l'] .select-search-list-item_input input,.root-vibor[class*='_size'][class*='-l'] .select-search-list-item_selection{height:60px}@-webkit-keyframes clockwise{to{-webkit-transform:rotate(360deg) translatez(0);transform:rotate(360deg) translatez(0)}}@keyframes clockwise{to{-webkit-transform:rotate(360deg) translatez(0);transform:rotate(360deg) translatez(0)}}.root-vibor .select-dropdown .b-vibor__value{display:flex;flex-direction:column}.root-vibor .select-dropdown .b-vibor__value__text{color:#383d41}.root-vibor .select-dropdown .b-vibor__value-descr_small{color:#8b8b83}.root-vibor .select-dropdown .b-vibor__value__text+.b-vibor__value-descr{margin-top:4px}.root-vibor .select-dropdown-pager{padding:10px;text-align:center;border-top:1px solid #e5e5e7}.root-vibor .select-dropdown-pager .select-dropdown-pager-page{color:#8b8b83}.root-vibor .select-dropdown-pager .select-dropdown-pager-loadmore{color:#4284d7;border-bottom:1px solid rgba(66,132,215,.3)}.root-vibor .select-dropdown-pager .select-dropdown-pager-page+.select-dropdown-pager-loadmore{margin-top:5px}.root-vibor .select-dropdown-optgroup{max-height:300px;overflow-y:auto}"],
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctdmlib3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdmlib3IvIiwic291cmNlcyI6WyJsaWIvbmctdmlib3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFDekIsWUFBWSxFQUFFLFVBQVUsRUFDWCxZQUFZLEVBQUUsU0FBUyxFQUVyQyxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBRUwsaUJBQWlCLEVBQ2pCLE9BQU8sRUFDUixNQUFNLGdCQUFnQixDQUFDO0FBRXhCLE9BQU8sRUFBZ0IsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRWhELE9BQU8sRUFDSCxrQkFBa0IsRUFDbEIsb0JBQW9CLEVBQ3BCLHNCQUFzQixFQUN0QixzQkFBc0IsRUFDekIsTUFBTSwrQkFBK0IsQ0FBQztBQUV2QyxPQUFPLEVBRUgsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFDZixrQkFBa0IsRUFDckIsTUFBTSxXQUFXLENBQUM7QUFFbkIscUJBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzs7SUFtY3RDLDBCQUFvQixVQUFzQztRQUF0QyxlQUFVLEdBQVYsVUFBVSxDQUE0Qjt5QkFuV3RDLEtBQUs7Z0NBU0MsQ0FBQzt3QkFDUixHQUFHOzt3QkFPSyxLQUFLOzZCQUNBLFFBQVE7MkJBQ1YsRUFBRTsyQkFFRixPQUFPO3dCQUVWLEtBQUs7MEJBQ0gsSUFBSTt3QkFDZixLQUFLOzRCQVNRLE1BQU07NkJBRUwsSUFBSTsrQkFDRixLQUFLOzRCQUNBLFNBQVM7OEJBQ2YsT0FBTztnQ0FJTCxFQUFFOytCQUVrQyxJQUFJLFlBQVksRUFBRTswQkFHcEQsU0FBUzt5QkFDd0IsVUFBQyxLQUFhO1lBQ2xGLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDZDtxQkFxRHlCLENBQUM7WUFDekIscUJBQUksS0FBSyxHQUFHLENBQUMs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RixTQUFTLFNBQUM7O29CQUVULFFBQVEsRUFBRSxPQUFPO29CQUNqQixRQUFRLEVBQUUsc3FJQStFWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyxxeEtBQTJ3SyxDQUFDO29CQUNyeEssU0FBUyxFQUFFLENBQUM7NEJBQ1YsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsZ0JBQWdCLEVBQWhCLENBQWdCLENBQUM7NEJBQy9DLEtBQUssRUFBRSxJQUFJO3lCQUNaLENBQUM7aUJBQ0g7Ozs7Z0JBckhlLFVBQVU7OzsrQkF3SXZCLFNBQVMsU0FBQyxjQUFjOzJCQUd4QixLQUFLO2dDQUNMLEtBQUs7OEJBQ0wsS0FBSzs4QkFFTCxLQUFLO3VCQUNMLEtBQUs7MkJBQ0wsS0FBSzs2QkFDTCxLQUFLOytCQUlMLFlBQVksU0FBQyxrQkFBa0I7bUNBQy9CLFlBQVksU0FBQyxzQkFBc0I7bUNBQ25DLFlBQVksU0FBQyxzQkFBc0I7aUNBQ25DLFlBQVksU0FBQyxvQkFBb0I7Z0NBQ2pDLEtBQUs7b0NBQ0wsS0FBSzsrQkFDTCxLQUFLO2dDQUVMLEtBQUs7a0NBQ0wsS0FBSzsrQkFDTCxLQUFLO2lDQUNMLEtBQUs7MkJBRUwsS0FBSzs4QkFDTCxLQUFLO21DQUNMLEtBQUs7OEJBQ0wsS0FBSztrQ0FDTCxNQUFNLFNBQUMsaUJBQWlCOzZCQUd4QixLQUFLOzRCQUNMLEtBQUs7OzJCQTlLUjs7U0F5SGEsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsIE9uSW5pdCwgT25DaGFuZ2VzLFxyXG4gIElucHV0LCBPdXRwdXQsIGZvcndhcmRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLFxyXG4gIFRlbXBsYXRlUmVmLCBDb250ZW50Q2hpbGQsIFZpZXdDaGlsZCxcclxuICBTaW1wbGVDaGFuZ2VzXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXHJcbiAgTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgTmdNb2RlbFxyXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIFZpYm9yQm90aERpcmVjdGl2ZSxcclxuICAgIFZpYm9yQ3JlYXRlRGlyZWN0aXZlLFxyXG4gICAgVmlib3JEcm9wZG93bkRpcmVjdGl2ZSxcclxuICAgIFZpYm9yU2VsZWN0ZWREaXJlY3RpdmVcclxufSBmcm9tICcuL25nLXZpYm9yLXRlbXBsYXRlLmRpcmVjdGl2ZSc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgSURhdGFSZXNwb25zZSxcclxuICAgIGRlZmF1bHRGb3JtYXR0ZXIsXHJcbiAgICBmZXRjaEZyb21PYmplY3QsXHJcbiAgICBzY3JvbGxBY3RpdmVPcHRpb25cclxufSBmcm9tICcuL2hlbHBlcnMnO1xyXG5cclxuY29uc3QgZGVlcEVxdWFsID0gcmVxdWlyZSgnZGVlcC1lcXVhbCcpO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxyXG4gIHNlbGVjdG9yOiAndmlib3InLFxyXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInJvb3Qtdmlib3JcIj5cclxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoXCIgKGNsaWNrKT1cInNob3dEcm9wZG93bkxpc3QoJGV2ZW50KTtcIj5cclxuICAgIDx1bCBjbGFzcz1cInNlbGVjdC1zZWFyY2gtbGlzdFwiPlxyXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibXVsdGlwbGUgfHwgIWlzT3BlblwiPlxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhU2VsZWN0ZWRUZW1wbGF0ZTsgZWxzZSBzZWxlY3RlZFRcIj5cclxuICAgICAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtIHNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX3NlbGVjdGlvblwiICpuZ0Zvcj1cImxldCBpdGVtIG9mIG91dHB1dDsgbGV0ICRpbmRleD1pbmRleDsgbGV0ICRsYXN0PWxhc3Q7IHRyYWNrQnk6IFRyYWNrQnlGbjtcIj5cclxuICAgICAgICAgICAgPGRpdiBbaW5uZXJIVE1MXT1cImdldExpc3RGb3JtYXR0ZWQoaXRlbSlcIj48L2Rpdj5cclxuICAgICAgICAgICAgPGEgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9yZW1vdmVcIiAqbmdJZj1cImFsbG93UmVzZXRcIiAoY2xpY2spPVwiIWRpc2FibGVkICYmIHJlbW92ZU9uZSgkaW5kZXgsICRldmVudClcIj48L2E+XHJcbiAgICAgICAgICA8L2xpPlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG5cclxuICAgICAgICA8bmctdGVtcGxhdGUgI3NlbGVjdGVkVD5cclxuICAgICAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtIHNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX3NlbGVjdGlvblwiICpuZ0Zvcj1cImxldCBpdGVtIG9mIG91dHB1dDsgbGV0ICRpbmRleD1pbmRleDsgbGV0ICRsYXN0PWxhc3Q7IHRyYWNrQnk6IFRyYWNrQnlGbjtcIj5cclxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIlNlbGVjdGVkVGVtcGxhdGU7IGNvbnRleHQ6IHtpdGVtOiBpdGVtfVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICA8YSBjbGFzcz1cInNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX3JlbW92ZVwiICpuZ0lmPVwiYWxsb3dSZXNldCAmJiAhZGlzYWJsZWRcIiAoY2xpY2spPVwiIWRpc2FibGVkICYmIHJlbW92ZU9uZSgkaW5kZXgsICRldmVudClcIj5cclxuICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgPC9saT5cclxuICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtIHNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2lucHV0XCIgW2NsYXNzLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2hpZGVdPVwiSW5wdXRIaWRlXCI+XHJcbiAgICAgICAgPGlucHV0IGF1dG9jb21wbGV0ZT1cIm9mZlwiICNpbnB1dENvbnRyb2w9XCJuZ01vZGVsXCIgW25hbWVdPVwibmFtZVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIFsobmdNb2RlbCldPVwicXVlcnlcIiBbcGxhY2Vob2xkZXJdPVwib3V0cHV0Lmxlbmd0aCA9PSAwIHx8IChtdWx0aXBsZSAmJiBvdXRwdXQubGVuZ3RoIDwgbXVsdGlwbGVMaW1pdCkgPyBwbGFjZWhvbGRlciA6ICcnXCJcclxuICAgICAgICAgIChpbnB1dCk9XCJ1cGRhdGVPcHRpb25zSW5EZWxheSgpXCIgKGJsdXIpPVwiaGlkZURyb3Bkb3duTGlzdFdpdGhEZWxheSgpXCIgKGtleWRvd24pPVwia2V5RG93bigkZXZlbnQpXCIgLz5cclxuICAgICAgPC9saT5cclxuICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LXNlYXJjaC1saXN0LWl0ZW0gc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fbG9hZGVyLWNlbnRlclwiIFtoaWRkZW5dPVwiIWRhdGFMaXN0U3ViIHx8IGRhdGFMaXN0U3ViLmNsb3NlZFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9sb2FkZXJcIj48L2Rpdj5cclxuICAgICAgPC9saT5cclxuXHJcbiAgICAgIDxzcGFuIGNsYXNzPVwiYXJyb3dcIiAoY2xpY2spPVwidG9nZ2xlRHJvcGRvd24oJGV2ZW50KVwiPlxyXG4gICAgICA8L3NwYW4+XHJcbiAgICA8L3VsPlxyXG4gIDwvZGl2PlxyXG5cclxuICA8ZGl2IGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duXCIgKm5nSWY9XCJpc09wZW5cIj5cclxuICAgIDx1bCBjbGFzcz1cInNlbGVjdC1kcm9wZG93bi1vcHRncm91cFwiPlxyXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIURyb3Bkb3duVGVtcGxhdGU7IGVsc2UgZHJvcGRvd25UXCI+XHJcbiAgICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvblwiICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgT3B0aW9uczsgbGV0IGk9aW5kZXhcIiAobW91c2Vkb3duKT1cInNlbGVjdE9uZSgkZXZlbnQsIG9wdGlvbilcIlxyXG4gICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJpID09PSBzZWxlY3RvclBvc2l0aW9uXCIgW2lubmVySFRNTF09XCJnZXREcm9wZG93bkZvcm1hdHRlZChvcHRpb24pXCI+XHJcbiAgICAgICAgPC9saT5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcblxyXG4gICAgICA8bmctdGVtcGxhdGUgI2Ryb3Bkb3duVD5cclxuICAgICAgICA8bGkgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXAtb3B0aW9uXCIgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBPcHRpb25zOyBsZXQgaT1pbmRleFwiIChtb3VzZWRvd24pPVwic2VsZWN0T25lKCRldmVudCwgb3B0aW9uKVwiXHJcbiAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cImkgPT09IHNlbGVjdG9yUG9zaXRpb25cIj5cclxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJEcm9wZG93blRlbXBsYXRlOyBjb250ZXh0OiB7aXRlbTogb3B0aW9ufVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgIDwvbGk+XHJcbiAgICAgIDwvbmctdGVtcGxhdGU+XHJcblxyXG4gICAgICA8bGkgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXAtb3B0aW9uIGxvYWRlclwiICpuZ0lmPVwiZGF0YUxpc3RTdWIgJiYgIWRhdGFMaXN0U3ViLmNsb3NlZFwiPlxyXG4gICAgICAgINCX0LDQs9GA0YPQt9C60LBcclxuICAgICAgPC9saT5cclxuICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvbiBsb2FkZXJcIiAobW91c2Vkb3duKT1cIkFkZE5ld09iamVjdChDcmVhdGVOZXcocXVlcnkpKTtcIiBbY2xhc3MuYWN0aXZlXT1cInNlbGVjdG9yUG9zaXRpb24gPT09IE9wdGlvbnMubGVuZ3RoXCJcclxuICAgICAgICAqbmdJZj1cIlNob3dOZXdcIj5cclxuXHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNyZWF0ZVRlbXBsYXRlOyBlbHNlIHRlbXBsYXRlV2l0aE1lc3NhZ2VcIj5cclxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjcmVhdGVUZW1wbGF0ZS50ZW1wbGF0ZVJlZjsgY29udGV4dDoge3F1ZXJ5OiBxdWVyeX1cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgICAgICAgPG5nLXRlbXBsYXRlICN0ZW1wbGF0ZVdpdGhNZXNzYWdlPlxyXG4gICAgICAgICAge3sgbmV3TWVzc2FnZSB9fVxyXG4gICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgIDwvbGk+XHJcbiAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb24gbG9hZGVyXCIgKm5nSWY9XCJTaG93RW1wdHlcIj5cclxuICAgICAgICDQn9GD0YHRgtC+XHJcbiAgICAgIDwvbGk+XHJcbiAgICA8L3VsPlxyXG4gICAgPGRpdiBjbGFzcz1cInNlbGVjdC1kcm9wZG93bi1wYWdlclwiICpuZ0lmPVwiY3VycmVudENhY2hlICYmIGN1cnJlbnRDYWNoZS5jb3VudFBhZ2VzID4gMVwiPlxyXG4gICAgICA8cCBjbGFzcz1cInNlbGVjdC1kcm9wZG93bi1wYWdlci1wYWdlXCI+XHJcbiAgICAgICAge3sgY3VycmVudENhY2hlLmN1cnJlbnRQYWdlIHwgbnVtYmVyIH19IC8ge3sgY3VycmVudENhY2hlLmNvdW50UGFnZXMgfCBudW1iZXIgfX1cclxuICAgICAgPC9wPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLXBhZ2VyLWxvYWRtb3JlXCIgKm5nSWY9XCJjdXJyZW50Q2FjaGUuY291bnRQYWdlcyA+IDEgJiYgY3VycmVudENhY2hlLmN1cnJlbnRQYWdlIDwgY3VycmVudENhY2hlLmNvdW50UGFnZXNcIlxyXG4gICAgICAgIChtb3VzZWRvd24pPVwibmV4dFBhZ2UoJGV2ZW50KVwiPlxyXG4gICAgICAgINCX0LDQs9GA0YPQt9C40YLRjCDQtdGJ0ZFcclxuICAgICAgPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbmAsXHJcbiAgc3R5bGVzOiBbYC5yb290LXZpYm9ye3Bvc2l0aW9uOnJlbGF0aXZlO2Rpc3BsYXk6YmxvY2s7Zm9udC1mYW1pbHk6LWFwcGxlLXN5c3RlbSxCbGlua01hY1N5c3RlbUZvbnQsIFwiU2Vnb2UgVUlcIixSb2JvdG8sSGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWYsIFwiQXBwbGUgQ29sb3IgRW1vamlcIixcIlNlZ29lIFVJIEVtb2ppXCIsXCJTZWdvZSBVSSBTeW1ib2xcIn0ucm9vdC12aWJvcjpub3QoLm11bHRpcGxlKSAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fc2VsZWN0aW9ue3BhZGRpbmctcmlnaHQ6NzBweH0ucm9vdC12aWJvci5tdWx0aXBsZSAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fcmVtb3Zle2JhY2tncm91bmQtaW1hZ2U6dXJsKGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIZHBaSFJvUFNJeE5pSWdhR1ZwWjJoMFBTSXhOaUkrQ2lBZ1BIQmhkR2dnWm1sc2JEMGlJemhsTkRSaFpDSWdaRDBpVFRFd0xqRWdOQzQxVERnZ05pNDJJRFV1T1NBMExqVWdOQzQxSURVdU9TQTJMallnT0d3dE1pNHhJREl1TVNBeExqUWdNUzQwVERnZ09TNDBiREl1TVNBeUxqRWdNUzQwTFRFdU5FdzVMalFnT0d3eUxqRXRNaTR4ZWlJdlBnbzhMM04yWno0Syk7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudH0ucm9vdC12aWJvciAuc2VsZWN0LWRyb3Bkb3due3Bvc2l0aW9uOmFic29sdXRlO3RvcDoxMDAlO2xlZnQ6MDtyaWdodDowO3otaW5kZXg6MjtiYWNrZ3JvdW5kOiNmZmZ9LnJvb3Qtdmlib3IgLnNlbGVjdC1zZWFyY2h7cG9zaXRpb246cmVsYXRpdmV9LnJvb3Qtdmlib3IgLnNlbGVjdC1zZWFyY2ggLmFycm93e2NvbnRlbnQ6XCJcIjtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDoxM3B4O3RvcDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKTtkaXNwbGF5OmJsb2NrO3dpZHRoOjE2cHg7aGVpZ2h0OjE2cHg7YmFja2dyb3VuZC1pbWFnZTp1cmwoZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCamJHRnpjejBpYm1NdGFXTnZiaUJuYkhsd2FDSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklpQjNhV1IwYUQwaU1UWWlJR2hsYVdkb2REMGlNVFlpSUhacFpYZENiM2c5SWpBZ01DQXhOaUF4TmlJK0RRb2dJRHh3WVhSb0lHWnBiR3c5SWlNeVl6SmpNbU1pSUdROUlrMDRJREV4TGpSTU1pNDJJRFlnTkNBMExqWnNOQ0EwSURRdE5Fd3hNeTQwSURZaUx6NE5Dand2YzNablBnMEspO3RyYW5zaXRpb246LXdlYmtpdC10cmFuc2Zvcm0gLjE1cyBlYXNlLWluLW91dDt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMTVzIGVhc2UtaW4tb3V0O3RyYW5zaXRpb246dHJhbnNmb3JtIC4xNXMgZWFzZS1pbi1vdXQsLXdlYmtpdC10cmFuc2Zvcm0gLjE1cyBlYXNlLWluLW91dH0ucm9vdC12aWJvciAuc2VsZWN0LXNlYXJjaCAuYXJyb3c6YmVmb3Jle2Rpc3BsYXk6bm9uZX0ucm9vdC12aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faW5wdXQgaW5wdXR7YmFja2dyb3VuZDowIDB9LnJvb3Qtdmlib3IgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2lucHV0IGlucHV0Ojotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVye2NvbG9yOnJnYmEoNTYsNjEsNjUsLjMpfS5yb290LXZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9pbnB1dCBpbnB1dDo6LW1vei1wbGFjZWhvbGRlcntjb2xvcjpyZ2JhKDU2LDYxLDY1LC4zKX0ucm9vdC12aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faW5wdXQgaW5wdXQ6LW1vei1wbGFjZWhvbGRlcntjb2xvcjpyZ2JhKDU2LDYxLDY1LC4zKX0ucm9vdC12aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faW5wdXQgaW5wdXQ6LW1zLWlucHV0LXBsYWNlaG9sZGVye2NvbG9yOnJnYmEoNTYsNjEsNjUsLjMpfS5yb290LXZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9sb2FkZXItY2VudGVyW2hpZGRlbl17ZGlzcGxheTpub25lIWltcG9ydGFudH0ucm9vdC12aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fbG9hZGVyLWNlbnRlcntwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDoxMHB4O3RvcDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKTtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7d2lkdGg6MjFweDtoZWlnaHQ6MjFweDtiYWNrZ3JvdW5kOiNmZmY7ei1pbmRleDoyfS5yb290LXZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9sb2FkZXItY2VudGVyIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9sb2FkZXJ7d2lkdGg6MTZweDtoZWlnaHQ6MTZweDtib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym9yZGVyLXdpZHRoOjJweDtib3JkZXItc3R5bGU6c29saWQ7Ym9yZGVyLWNvbG9yOiMyMjI3MmUgcmdiYSgzNCwzOSw0NiwuNCkgcmdiYSgzNCwzOSw0NiwuNCk7Ym9yZGVyLXJhZGl1czoxMDAlOy13ZWJraXQtYW5pbWF0aW9uOi40NXMgbGluZWFyIGluZmluaXRlIGNsb2Nrd2lzZTthbmltYXRpb246LjQ1cyBsaW5lYXIgaW5maW5pdGUgY2xvY2t3aXNlfS5yb290LXZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9oaWRle2Rpc3BsYXk6bm9uZX0ucm9vdC12aWJvciAuc2VsZWN0LWRyb3Bkb3duIC5zZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXAtb3B0aW9uOmhvdmVye2JhY2tncm91bmQtY29sb3I6cmdiYSg2NiwxMzIsMjE1LC4xKX0ucm9vdC12aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fcmVtb3Zle3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7cmlnaHQ6MzVweDstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpO2Rpc3BsYXk6YmxvY2s7d2lkdGg6MjBweDtoZWlnaHQ6MjBweDtib3JkZXItcmFkaXVzOjUwJTtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoNDQsNDQsNDQsLjEpO2JhY2tncm91bmQtaW1hZ2U6dXJsKGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QmpiR0Z6Y3owaWJtTXRhV052YmlCbmJIbHdhQ0lnZUcxc2JuTTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TURBdmMzWm5JaUI0Yld4dWN6cDRiR2x1YXowaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1UazVPUzk0YkdsdWF5SWdlRDBpTUhCNElpQjVQU0l3Y0hnaUlIZHBaSFJvUFNJeE5uQjRJaUJvWldsbmFIUTlJakUyY0hnaUlIWnBaWGRDYjNnOUlqQWdNQ0F4TmlBeE5pSStQR2MrQ2p4d2IyeDVaMjl1SUdacGJHdzlJaU13WmpCbU1HWWlJSEJ2YVc1MGN6MGlNVEF1TVN3MExqVWdPQ3cyTGpZZ05TNDVMRFF1TlNBMExqVXNOUzQ1SURZdU5pdzRJRFF1TlN3eE1DNHhJRFV1T1N3eE1TNDFJRGdzT1M0MElERXdMakVzTVRFdU5TQXhNUzQxTERFd0xqRWdPUzQwTERnZ01URXVOU3cxTGprZ0Nna2lQand2Y0c5c2VXZHZiajRLUEM5blBqd3ZjM1puUGc9PSk7YmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0O2JhY2tncm91bmQtcG9zaXRpb246Y2VudGVyO2NvbG9yOnRyYW5zcGFyZW50fS5yb290LXZpYm9yLmRpc2FibGVkIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9yZW1vdmUsLnJvb3Qtdmlib3JbZGlzYWJsZWRdIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9yZW1vdmV7ZGlzcGxheTpub25lfS5yb290LXZpYm9yW2NsYXNzKj0nX3NpemUnXVtjbGFzcyo9Jy1zJ10gLnNlbGVjdC1zZWFyY2ggLmItdmlib3JfX3ZhbHVlLC5yb290LXZpYm9yW2NsYXNzKj0nX3NpemUnXVtjbGFzcyo9Jy1zJ10gLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2lucHV0IGlucHV0LC5yb290LXZpYm9yW2NsYXNzKj0nX3NpemUnXVtjbGFzcyo9Jy1zJ10gLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX3NlbGVjdGlvbntoZWlnaHQ6NDBweH0ucm9vdC12aWJvcltjbGFzcyo9J19zaXplJ11bY2xhc3MqPSctbSddIC5zZWxlY3Qtc2VhcmNoIC5iLXZpYm9yX192YWx1ZSwucm9vdC12aWJvcltjbGFzcyo9J19zaXplJ11bY2xhc3MqPSctbSddIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9pbnB1dCBpbnB1dCwucm9vdC12aWJvcltjbGFzcyo9J19zaXplJ11bY2xhc3MqPSctbSddIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9zZWxlY3Rpb257aGVpZ2h0OjUwcHh9LnJvb3Qtdmlib3JbY2xhc3MqPSdfc2l6ZSddW2NsYXNzKj0nLWwnXSAuc2VsZWN0LXNlYXJjaCAuYi12aWJvcl9fdmFsdWUsLnJvb3Qtdmlib3JbY2xhc3MqPSdfc2l6ZSddW2NsYXNzKj0nLWwnXSAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faW5wdXQgaW5wdXQsLnJvb3Qtdmlib3JbY2xhc3MqPSdfc2l6ZSddW2NsYXNzKj0nLWwnXSAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fc2VsZWN0aW9ue2hlaWdodDo2MHB4fUAtd2Via2l0LWtleWZyYW1lcyBjbG9ja3dpc2V7dG97LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDM2MGRlZykgdHJhbnNsYXRleigwKTt0cmFuc2Zvcm06cm90YXRlKDM2MGRlZykgdHJhbnNsYXRleigwKX19QGtleWZyYW1lcyBjbG9ja3dpc2V7dG97LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDM2MGRlZykgdHJhbnNsYXRleigwKTt0cmFuc2Zvcm06cm90YXRlKDM2MGRlZykgdHJhbnNsYXRleigwKX19LnJvb3Qtdmlib3IgLnNlbGVjdC1kcm9wZG93biAuYi12aWJvcl9fdmFsdWV7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbn0ucm9vdC12aWJvciAuc2VsZWN0LWRyb3Bkb3duIC5iLXZpYm9yX192YWx1ZV9fdGV4dHtjb2xvcjojMzgzZDQxfS5yb290LXZpYm9yIC5zZWxlY3QtZHJvcGRvd24gLmItdmlib3JfX3ZhbHVlLWRlc2NyX3NtYWxse2NvbG9yOiM4YjhiODN9LnJvb3Qtdmlib3IgLnNlbGVjdC1kcm9wZG93biAuYi12aWJvcl9fdmFsdWVfX3RleHQrLmItdmlib3JfX3ZhbHVlLWRlc2Nye21hcmdpbi10b3A6NHB4fS5yb290LXZpYm9yIC5zZWxlY3QtZHJvcGRvd24tcGFnZXJ7cGFkZGluZzoxMHB4O3RleHQtYWxpZ246Y2VudGVyO2JvcmRlci10b3A6MXB4IHNvbGlkICNlNWU1ZTd9LnJvb3Qtdmlib3IgLnNlbGVjdC1kcm9wZG93bi1wYWdlciAuc2VsZWN0LWRyb3Bkb3duLXBhZ2VyLXBhZ2V7Y29sb3I6IzhiOGI4M30ucm9vdC12aWJvciAuc2VsZWN0LWRyb3Bkb3duLXBhZ2VyIC5zZWxlY3QtZHJvcGRvd24tcGFnZXItbG9hZG1vcmV7Y29sb3I6IzQyODRkNztib3JkZXItYm90dG9tOjFweCBzb2xpZCByZ2JhKDY2LDEzMiwyMTUsLjMpfS5yb290LXZpYm9yIC5zZWxlY3QtZHJvcGRvd24tcGFnZXIgLnNlbGVjdC1kcm9wZG93bi1wYWdlci1wYWdlKy5zZWxlY3QtZHJvcGRvd24tcGFnZXItbG9hZG1vcmV7bWFyZ2luLXRvcDo1cHh9LnJvb3Qtdmlib3IgLnNlbGVjdC1kcm9wZG93bi1vcHRncm91cHttYXgtaGVpZ2h0OjMwMHB4O292ZXJmbG93LXk6YXV0b31gXSxcclxuICBwcm92aWRlcnM6IFt7XHJcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nVmlib3JDb21wb25lbnQpLFxyXG4gICAgbXVsdGk6IHRydWVcclxuICB9XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdWaWJvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcbiAgLy8gTG9jYWwgVmFyaWFibGVcclxuICBwdWJsaWMgX21vZGVsOiBhbnk7XHJcblxyXG4gIHByaXZhdGUgZmlyc3RMb2FkID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBvcHRpb25zOiBBcnJheTxhbnk+O1xyXG4gIHB1YmxpYyBvdXRwdXQ6IEFycmF5PGFueT47XHJcblxyXG4gIHB1YmxpYyBpc09wZW46IGJvb2xlYW47XHJcblxyXG4gIHByaXZhdGUgb2xkUXVlcnk6IHN0cmluZztcclxuICBwdWJsaWMgcXVlcnk6IHN0cmluZztcclxuXHJcbiAgcHVibGljIHNlbGVjdG9yUG9zaXRpb24gPSAwO1xyXG4gIHByaXZhdGUgd2FpdFRpbWUgPSA1MDA7XHJcblxyXG4gIHByaXZhdGUgZWw6IEVsZW1lbnQ7ICAgICAgICAgICAvLyB0aGlzIGNvbXBvbmVudCAgZWxlbWVudCBgPHZpYm9yPmBcclxuICBwcml2YXRlIGlucHV0RWw6IEhUTUxJbnB1dEVsZW1lbnQ7IC8vIGA8aW5wdXQ+YCBlbGVtZW50IGluIGA8dmlib3I+YCBmb3IgYXV0byBjb21wbGV0ZVxyXG4gIEBWaWV3Q2hpbGQoJ2lucHV0Q29udHJvbCcpIHB1YmxpYyBpbnB1dENvbnRyb2w6IE5nTW9kZWw7XHJcblxyXG4gIC8vIElucHV0cyAmIE91dHB1dHNcclxuICBASW5wdXQoKSBwdWJsaWMgbXVsdGlwbGUgPSBmYWxzZTtcclxuICBASW5wdXQoKSBwdWJsaWMgbXVsdGlwbGVMaW1pdCA9IEluZmluaXR5O1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBjb3VudE9uUGFnZSA9IDEwO1xyXG5cclxuICBASW5wdXQoKSBwdWJsaWMgcGxhY2Vob2xkZXIgPSAnVmlib3InO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcHVibGljIHJlcXVpcmVkID0gZmFsc2U7XHJcbiAgQElucHV0KCkgcHVibGljIGFsbG93UmVzZXQgPSB0cnVlO1xyXG4gIHB1YmxpYyBkaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICAvLyDQntGC0L7QsdGA0LDQttC10L3QuNC1INGB0L/QuNGB0LrQvtCyXHJcbiAgQENvbnRlbnRDaGlsZChWaWJvckJvdGhEaXJlY3RpdmUpIHB1YmxpYyBib3RoVGVtcGxhdGU6IFZpYm9yQm90aERpcmVjdGl2ZTtcclxuICBAQ29udGVudENoaWxkKFZpYm9yRHJvcGRvd25EaXJlY3RpdmUpIHB1YmxpYyBkcm9wZG93blRlbXBsYXRlOiBWaWJvckRyb3Bkb3duRGlyZWN0aXZlO1xyXG4gIEBDb250ZW50Q2hpbGQoVmlib3JTZWxlY3RlZERpcmVjdGl2ZSkgcHVibGljIHNlbGVjdGVkVGVtcGxhdGU6IFZpYm9yU2VsZWN0ZWREaXJlY3RpdmU7XHJcbiAgQENvbnRlbnRDaGlsZChWaWJvckNyZWF0ZURpcmVjdGl2ZSkgcHVibGljIGNyZWF0ZVRlbXBsYXRlOiBWaWJvckNyZWF0ZURpcmVjdGl2ZTtcclxuICBASW5wdXQoKSBwdWJsaWMgbGlzdEZvcm1hdHRlcjogKGFyZzogYW55LCB2YWx1ZTogc3RyaW5nKSA9PiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcHVibGljIGRyb3Bkb3duRm9ybWF0dGVyOiAoYXJnOiBhbnksIHZhbHVlOiBzdHJpbmcpID0+IHN0cmluZztcclxuICBASW5wdXQoKSBwdWJsaWMgdmlld1Byb3BlcnR5ID0gJ05hbWUnOyAgLy8g0J/QvtC70LUg0LTQu9GPINC00LXRhNC+0LvRgtC90L7Qs9C+INC+0YLQvtCx0YDQsNC20LXQvdC40Y9cclxuXHJcbiAgQElucHV0KCkgcHVibGljIG1vZGVsUHJvcGVydHkgPSAnaWQnOyAgLy8g0KLQviwg0YfRgtC+INC30LDQv9C40YHRi9Cy0LDQtdGC0YHRjyDQsiDQnNC+0LTQtdC70YxcclxuICBASW5wdXQoKSBwdWJsaWMgcHJlbG9hZFByb3BlcnR5ID0gJ2lkcyc7IC8vINCa0LvRjtGHINC30LDQv9GA0L7RgdCwINC6INGB0LXRgNCy0LXRgNGDINC00LvRjyDQv9GA0LXQtNC30LDQs9GA0YPQt9C60LgsINC10YHQu9C4IHVuZGVmaW5lZCDQt9Cw0L/QuNGB0YvQstCw0LXRgtGB0Y8g0LLQtdGB0Ywg0L7QsdGK0LXQutGCXHJcbiAgQElucHV0KCkgcHVibGljIHByZWxvYWRGaWVsZDogc3RyaW5nID0gdW5kZWZpbmVkOyAvLyDQl9C90LDRh9C10L3QuNC1INC/0L7Qu9GPLCDQutC+0YLQvtGA0LUg0L3QtdC+0LHRhdC+0LTQuNC80L4g0L7RgtC/0YDQsNCy0LjRgtGMINCyINC30LDQv9GA0L7RgS5cclxuICBASW5wdXQoKSBwdWJsaWMgc2VhcmNoUHJvcGVydHkgPSAncXVlcnknO1xyXG5cclxuICBASW5wdXQoKSBwdWJsaWMgZGF0YUxpc3Q6ICgocGFyYW06IE9iamVjdCwgcGFnZTogbnVtYmVyLCBjb3VudE9uUGFnZT86IG51bWJlcikgPT4gT2JzZXJ2YWJsZTxJRGF0YVJlc3BvbnNlPikgfCBBcnJheTxhbnk+O1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBleGNsdWRlTGlzdDogQXJyYXk8YW55PjtcclxuICBASW5wdXQoKSBwdWJsaWMgYWRkaXRpb25hbEZpbHRlciA9IHt9O1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBvbmx5RW1pdHRlcjogYm9vbGVhbjtcclxuICBAT3V0cHV0KCdjaGFuZ2VGdWxsTW9kZWwnKSBwdWJsaWMgY2hhbmdlRnVsbE1vZGVsOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcblxyXG4gIEBJbnB1dCgpIHB1YmxpYyBuZXdNZXNzYWdlOiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQElucHV0KCkgcHVibGljIENyZWF0ZU5ldzogKHF1ZXJ5OiBzdHJpbmcpID0+IE9ic2VydmFibGU8YW55PiB8IGFueSA9IChxdWVyeTogc3RyaW5nKSA9PiB7XHJcbiAgICByZXR1cm4gcXVlcnk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gU3Vic2NyaXB0aW9uXHJcbiAgcHVibGljIGRhdGFMaXN0U3ViOiBTdWJzY3JpcHRpb247XHJcblxyXG5cclxuICAvLyBPUFRJT05TXHJcbiAgcHVibGljIFRyYWNrQnlGbihpbmRleDogbnVtYmVyKTogYW55IHtcclxuICAgIHJldHVybiBpbmRleDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzaG93RHJvcGRvd25MaXN0KGV2ZW50OiBGb2N1c0V2ZW50IHwgTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLm11bHRpcGxlICYmIHRoaXMub3V0cHV0Lmxlbmd0aCA+PSB0aGlzLm11bHRpcGxlTGltaXQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCgnb3Blbi12aWJvcicpO1xyXG4gICAgdGhpcy5pbnB1dEVsLmZvY3VzKCk7XHJcbiAgICB0aGlzLnVwZGF0ZU9wdGlvbnMoKTtcclxuICAgIHRoaXMub25Ub3VjaGVkKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhpZGVEcm9wZG93bkxpc3QoKTogdm9pZCB7XHJcbiAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4tdmlib3InKTtcclxuICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XHJcbiAgICB0aGlzLmlucHV0RWwuYmx1cigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGhpZGVEcm9wZG93bkxpc3RXaXRoRGVsYXkoKTogdm9pZCB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5oaWRlRHJvcGRvd25MaXN0KCk7XHJcbiAgICB9LCAxMDApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHRvZ2dsZURyb3Bkb3duKGV2ZW50OiBFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmlzT3Blbikge1xyXG4gICAgICB0aGlzLmhpZGVEcm9wZG93bkxpc3QoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2hvd0Ryb3Bkb3duTGlzdCh1bmRlZmluZWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkZWxheTogRnVuY3Rpb24gPSAoZnVuY3Rpb24gKCk6IEZ1bmN0aW9uIHtcclxuICAgIGxldCB0aW1lciA9IDA7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNhbGxiYWNrOiBhbnksIG1zOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcclxuICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGNhbGxiYWNrLCBtcyk7XHJcbiAgICB9O1xyXG4gIH0pKCk7XHJcblxyXG4gIHB1YmxpYyB1cGRhdGVPcHRpb25zKCk6IHZvaWQge1xyXG4gICAgdGhpcy5pc09wZW4gPSB0cnVlO1xyXG4gICAgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmRhdGFMaXN0LmZpbHRlcihkYXRhID0+IHtcclxuICAgICAgICBpZiAoIXRoaXMucXVlcnkgfHwgdGhpcy5xdWVyeS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZjogYW55ID0gZmV0Y2hGcm9tT2JqZWN0KGRhdGEsIHRoaXMuc2VhcmNoUHJvcGVydHkpO1xyXG4gICAgICAgIGlmIChmID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGYpLmluZGV4T2YodGhpcy5xdWVyeSkgPj0gMDtcclxuICAgICAgfSkuZmlsdGVyKGRhdGEgPT4ge1xyXG4gICAgICAgIGlmICghdGhpcy5leGNsdWRlTGlzdCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZCA9IGZldGNoRnJvbU9iamVjdChkYXRhLCB0aGlzLm1vZGVsUHJvcGVydHkpLnZhbHVlT2YoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5leGNsdWRlTGlzdC5maW5kSW5kZXgoZXggPT4ge1xyXG4gICAgICAgICAgbGV0IGEgPSBmZXRjaEZyb21PYmplY3QoZXgsIHRoaXMubW9kZWxQcm9wZXJ0eSkudmFsdWVPZigpO1xyXG4gICAgICAgICAgcmV0dXJuIGRlZXBFcXVhbChkLCBhKTtcclxuICAgICAgICB9KSA8IDA7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgaWYgKHRoaXMuZGF0YUxpc3RTdWIpIHsgdGhpcy5kYXRhTGlzdFN1Yi51bnN1YnNjcmliZSgpOyB9XHJcbiAgICAgIGlmICghdGhpcy5jdXJyZW50Q2FjaGUpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRDYWNoZSA9IHtcclxuICAgICAgICAgIGNvdW50RWxlbWVudDogMCxcclxuICAgICAgICAgIGNvdW50UGFnZXM6IDEsXHJcbiAgICAgICAgICBjdXJyZW50UGFnZTogMSxcclxuICAgICAgICAgIG9iamVjdHM6IFtdLFxyXG4gICAgICAgICAgcXVlcnk6IHRoaXMucXVlcnksXHJcbiAgICAgICAgICBwYXJhbXM6IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYWRkaXRpb25hbEZpbHRlcilcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuY2FjaGVMYXp5RGF0YS5wdXNoKHRoaXMuY3VycmVudENhY2hlKTtcclxuXHJcbiAgICAgICAgbGV0IHBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYWRkaXRpb25hbEZpbHRlcikgYXMgYW55O1xyXG4gICAgICAgIHBhcmFtc1t0aGlzLnNlYXJjaFByb3BlcnR5XSA9IHRoaXMucXVlcnk7XHJcblxyXG4gICAgICAgIHRoaXMuZGF0YUxpc3RTdWIgPSAoPE9ic2VydmFibGU8SURhdGFSZXNwb25zZT4+dGhpcy5kYXRhTGlzdChwYXJhbXMsIDEsIHRoaXMuY291bnRPblBhZ2UpKS5zdWJzY3JpYmUoYW5zd2VyID0+IHtcclxuICAgICAgICAgIHRoaXMuY3VycmVudENhY2hlLm9iamVjdHMgPSB0aGlzLmN1cnJlbnRDYWNoZS5vYmplY3RzLmNvbmNhdChhbnN3ZXIubGlzdCk7XHJcbiAgICAgICAgICB0aGlzLmN1cnJlbnRDYWNoZS5jb3VudEVsZW1lbnQgPSBhbnN3ZXIuaGVhZGVyc1snY291bnQnXTtcclxuICAgICAgICAgIHRoaXMuY3VycmVudENhY2hlLmNvdW50UGFnZXMgPSBNYXRoLmNlaWwodGhpcy5jdXJyZW50Q2FjaGUuY291bnRFbGVtZW50IC8gdGhpcy5jb3VudE9uUGFnZSk7XHJcbiAgICAgICAgfSwgKCkgPT4geyB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHVwZGF0ZU9wdGlvbnNJbkRlbGF5KCk6IHZvaWQge1xyXG4gICAgbGV0IGRlbGF5TXM6IG51bWJlciA9IHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBBcnJheSA/IDEwIDogdGhpcy53YWl0VGltZTtcclxuXHJcbiAgICAvLyBleGVjdXRpbmcgYWZ0ZXIgdXNlciBzdG9wcGVkIHR5cGluZ1xyXG4gICAgdGhpcy5kZWxheSgoKSA9PiB7XHJcbiAgICAgIHRoaXMub2xkUXVlcnkgPSB0aGlzLnF1ZXJ5O1xyXG4gICAgICB0aGlzLmN1cnJlbnRDYWNoZSA9IHRoaXMuR2V0Q2FjaGUodGhpcy5xdWVyeSk7XHJcbiAgICAgIHRoaXMudXBkYXRlT3B0aW9ucygpO1xyXG4gICAgfSwgZGVsYXlNcyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZvY3VzU2VsZWN0ZWRPcHRpb24oKTogdm9pZCB7XHJcbiAgICBsZXQgbGlzdDogYW55ID0gPEhUTUxFbGVtZW50PnRoaXMuZWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2VsZWN0LWRyb3Bkb3duJylbMF07XHJcbiAgICBsZXQgdGFyZ2V0TGk6IGFueSA9IDxIVE1MRWxlbWVudD50aGlzLmVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb24nKVt0aGlzLnNlbGVjdG9yUG9zaXRpb25dO1xyXG4gICAgc2Nyb2xsQWN0aXZlT3B0aW9uKGxpc3QsIHRhcmdldExpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBrZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuT3B0aW9ucykge1xyXG4gICAgICB0aGlzLnNob3dEcm9wZG93bkxpc3QodW5kZWZpbmVkKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB0b3RhbE51bUl0ZW06IG51bWJlciA9IHRoaXMuT3B0aW9ucy5sZW5ndGg7XHJcblxyXG4gICAgaWYgKHRoaXMuU2hvd05ldykge1xyXG4gICAgICB0b3RhbE51bUl0ZW0rKztcclxuICAgIH1cclxuXHJcbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcclxuICAgICAgY2FzZSAyNzogLy8gRVNDLCBoaWRlIGF1dG8gY29tcGxldGVcclxuICAgICAgICB0aGlzLmhpZGVEcm9wZG93bkxpc3QoKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMzg6IC8vIFVQLCBzZWxlY3QgdGhlIHByZXZpb3VzIGxpIGVsXHJcbiAgICAgICAgdGhpcy5zZWxlY3RvclBvc2l0aW9uID0gKHRvdGFsTnVtSXRlbSArIHRoaXMuc2VsZWN0b3JQb3NpdGlvbiAtIDEpICUgdG90YWxOdW1JdGVtO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSA0MDogLy8gRE9XTiwgc2VsZWN0IHRoZSBuZXh0IGxpIGVsIG9yIHRoZSBmaXJzdCBvbmVcclxuICAgICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RvclBvc2l0aW9uID0gKHRvdGFsTnVtSXRlbSArIHRoaXMuc2VsZWN0b3JQb3NpdGlvbiArIDEpICUgdG90YWxOdW1JdGVtO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAxMzogLy8gRU5URVIsIGNob29zZSBpdCEhXHJcbiAgICAgICAgaWYgKHRvdGFsTnVtSXRlbSA+IDApIHtcclxuICAgICAgICAgIGlmICh0aGlzLnNlbGVjdG9yUG9zaXRpb24gPT09IHRoaXMuT3B0aW9ucy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5BZGROZXdPYmplY3QodGhpcy5DcmVhdGVOZXcodGhpcy5xdWVyeSkpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RPbmUoZXZlbnQsIHRoaXMuT3B0aW9uc1t0aGlzLnNlbGVjdG9yUG9zaXRpb25dKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuU2hvd05ldykge1xyXG4gICAgICAgICAgdGhpcy5BZGROZXdPYmplY3QodGhpcy5DcmVhdGVOZXcodGhpcy5xdWVyeSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGRlZmF1bHQ6IGJyZWFrO1xyXG4gICAgfVxyXG4gICAgdGhpcy5mb2N1c1NlbGVjdGVkT3B0aW9uKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmV4dFBhZ2UoJGV2ZW50OiBFdmVudCk6IHZvaWQge1xyXG4gICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgLy8gVmFsaWRhdG9yc1xyXG4gICAgaWYgKCEodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RhdGEgTGlzdCBtYXN0IGJlIEZ1bmN0aW9uJyk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuY3VycmVudENhY2hlKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignRm9yIG5leHQgcGFnZSBuZWVkIGNhY2hlIGZvciBmaXJzdCBQYWdlJyk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5jdXJyZW50Q2FjaGUuY3VycmVudFBhZ2UgPj0gdGhpcy5jdXJyZW50Q2FjaGUuY291bnRQYWdlcykgeyB0aHJvdyBuZXcgRXJyb3IoJ01heCBQYWdlIExpbWl0Jyk7IH1cclxuXHJcbiAgICBpZiAodGhpcy5kYXRhTGlzdFN1YikgeyB0aGlzLmRhdGFMaXN0U3ViLnVuc3Vic2NyaWJlKCk7IH1cclxuXHJcbiAgICBsZXQgcGFyYW1zOiBhbnkgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmFkZGl0aW9uYWxGaWx0ZXIpO1xyXG4gICAgcGFyYW1zW3RoaXMuc2VhcmNoUHJvcGVydHldID0gdGhpcy5xdWVyeTtcclxuXHJcbiAgICB0aGlzLmRhdGFMaXN0U3ViID0gdGhpcy5kYXRhTGlzdChwYXJhbXMsIHRoaXMuY3VycmVudENhY2hlLmN1cnJlbnRQYWdlICsgMSwgdGhpcy5jb3VudE9uUGFnZSkuc3Vic2NyaWJlKGFuc3dlciA9PiB7XHJcbiAgICAgIHRoaXMuY3VycmVudENhY2hlLmN1cnJlbnRQYWdlKys7XHJcbiAgICAgIHRoaXMuY3VycmVudENhY2hlLmNvdW50RWxlbWVudCA9IGFuc3dlci5oZWFkZXJzWydjb3VudCddO1xyXG4gICAgICB0aGlzLmN1cnJlbnRDYWNoZS5jb3VudFBhZ2VzID0gTWF0aC5jZWlsKHRoaXMuY3VycmVudENhY2hlLmNvdW50RWxlbWVudCAvIHRoaXMuY291bnRPblBhZ2UpO1xyXG4gICAgICB0aGlzLmN1cnJlbnRDYWNoZS5vYmplY3RzID0gdGhpcy5jdXJyZW50Q2FjaGUub2JqZWN0cy5jb25jYXQoYW5zd2VyLmxpc3QpO1xyXG4gICAgICB0aGlzLnNlbGVjdG9yUG9zaXRpb24gPSAodGhpcy5jdXJyZW50Q2FjaGUuY3VycmVudFBhZ2UgLSAxKSAqIHRoaXMuY291bnRPblBhZ2UgKyAxO1xyXG4gICAgICB0aGlzLmZvY3VzU2VsZWN0ZWRPcHRpb24oKTtcclxuICAgIH0sICgpID0+IHsgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBNT0RFTFxyXG4gIHByaXZhdGUgY2xlYXJQcm9wZXJ0eSgpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0b3JQb3NpdGlvbiA9IDA7XHJcbiAgICB0aGlzLnF1ZXJ5ID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNlbGVjdE9uZSgkZXZlbnQ6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50LCBkYXRhOiBhbnkpOiB2b2lkIHtcclxuICAgIC8vINCk0LjQu9GM0YLRgCDQvdC10L3Rg9C20L3Ri9GFINGB0L7QsdGL0YLQuNC5XHJcbiAgICBpZiAoJGV2ZW50IGluc3RhbmNlb2YgTW91c2VFdmVudCAmJiAkZXZlbnQuYnV0dG9uICE9PSAwKSB7IHJldHVybjsgfVxyXG5cclxuICAgIGlmICh0aGlzLm11bHRpcGxlICYmIHRoaXMub3V0cHV0Lmxlbmd0aCA8IHRoaXMubXVsdGlwbGVMaW1pdCkge1xyXG4gICAgICB0aGlzLm91dHB1dC5wdXNoKGRhdGEpO1xyXG4gICAgfSBlbHNlIGlmICghdGhpcy5tdWx0aXBsZSkge1xyXG4gICAgICB0aGlzLm91dHB1dCA9IFtkYXRhXTtcclxuICAgIH1cclxuICAgIHRoaXMuY2hhbmdlRnVsbE1vZGVsLmVtaXQodGhpcy5vdXRwdXQpO1xyXG4gICAgdGhpcy5Nb2RlbCA9IHRoaXMuVmFsdWVGcm9tT3V0cHV0O1xyXG4gICAgdGhpcy5jbGVhclByb3BlcnR5KCk7XHJcbiAgICB0aGlzLmhpZGVEcm9wZG93bkxpc3QoKTtcclxuICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH07XHJcblxyXG4gIHB1YmxpYyByZW1vdmVPbmUoaW5kZXg6IG51bWJlciwgZXZlbnQ6IEV2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHRoaXMub3V0cHV0LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB0aGlzLk1vZGVsID0gdGhpcy5WYWx1ZUZyb21PdXRwdXQ7XHJcblxyXG4gICAgLy8gc2V0IGNsYXNzXHJcbiAgICB0aGlzLm9uVG91Y2hlZCgpO1xyXG4gICAgdGhpcy5pbnB1dENvbnRyb2wuY29udHJvbC5tYXJrQXNUb3VjaGVkKCk7XHJcblxyXG4gICAgLy8gb3BlbiBkcm9wZG93blxyXG4gICAgaWYgKHRoaXMucmVxdWlyZWQpIHtcclxuICAgICAgdGhpcy5zaG93RHJvcGRvd25MaXN0KHVuZGVmaW5lZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBGT1JNQVRUSU5HXHJcblxyXG4gIHB1YmxpYyBnZXQgU2VsZWN0ZWRUZW1wbGF0ZSgpOiBUZW1wbGF0ZVJlZjxhbnk+IHtcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkVGVtcGxhdGUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRUZW1wbGF0ZS50ZW1wbGF0ZVJlZjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5ib3RoVGVtcGxhdGUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuYm90aFRlbXBsYXRlLnRlbXBsYXRlUmVmO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgRHJvcGRvd25UZW1wbGF0ZSgpOiBUZW1wbGF0ZVJlZjxhbnk+IHtcclxuICAgIGlmICh0aGlzLmRyb3Bkb3duVGVtcGxhdGUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZHJvcGRvd25UZW1wbGF0ZS50ZW1wbGF0ZVJlZjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5ib3RoVGVtcGxhdGUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuYm90aFRlbXBsYXRlLnRlbXBsYXRlUmVmO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRMaXN0Rm9ybWF0dGVkKGRhdGE6IGFueSk6IHN0cmluZyB7XHJcbiAgICBsZXQgZm9ybWF0dGVyOiBhbnkgPSB0aGlzLmxpc3RGb3JtYXR0ZXIgfHwgZGVmYXVsdEZvcm1hdHRlcjtcclxuICAgIHJldHVybiBmb3JtYXR0ZXIuYXBwbHkodGhpcywgW2RhdGEsIHRoaXMudmlld1Byb3BlcnR5XSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0RHJvcGRvd25Gb3JtYXR0ZWQoZGF0YTogYW55KTogc3RyaW5nIHtcclxuICAgIGxldCBmb3JtYXR0ZXI6IGFueSA9IHRoaXMuZHJvcGRvd25Gb3JtYXR0ZXIgfHwgZGVmYXVsdEZvcm1hdHRlcjtcclxuICAgIHJldHVybiBmb3JtYXR0ZXIuYXBwbHkodGhpcywgW2RhdGEsIHRoaXMudmlld1Byb3BlcnR5XSk7XHJcbiAgfVxyXG5cclxuICAvLyBJTklUXHJcbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgLy8gdGhpcy5Nb2RlbCA9IHRoaXMuVmFsdWVGcm9tT3V0cHV0OyDQrdGC0L4g0LLRgNC+0LTQtSDRgtGD0YIg0YLQvtC20LUg0YPQttC1INC90LUg0L3QsNC00L4uXHJcbiAgICB0aGlzLmVsID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncm9vdC12aWJvcicpLml0ZW0oMCk7XHJcbiAgICB0aGlzLmlucHV0RWwgPSA8SFRNTElucHV0RWxlbWVudD4odGhpcy5lbC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhpbnB1dHM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIGlmIChpbnB1dHNbJ2RhdGFMaXN0J10gJiYgaW5wdXRzWydkYXRhTGlzdCddLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICAvLyBPdXRwdXRcclxuICAgICAgaWYgKHRoaXMuTW9kZWwgPT09IHVuZGVmaW5lZCB8fCB0aGlzLk1vZGVsID09IG51bGwpIHtcclxuICAgICAgICB0aGlzLm91dHB1dCA9IFtdO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlRnVsbE1vZGVsLmVtaXQodGhpcy5vdXRwdXQpO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuTW9kZWwgaW5zdGFuY2VvZiBBcnJheSAmJiB0aGlzLm11bHRpcGxlKSB7XHJcbiAgICAgICAgdGhpcy5PdXRwdXQgPSB0aGlzLk1vZGVsO1xyXG4gICAgICB9IGVsc2UgaWYgKCEodGhpcy5Nb2RlbCBpbnN0YW5jZW9mIEFycmF5KSAmJiAhdGhpcy5tdWx0aXBsZSkge1xyXG4gICAgICAgIHRoaXMuT3V0cHV0ID0gW3RoaXMuTW9kZWxdO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMub3V0cHV0IHx8ICF0aGlzLm91dHB1dC5sZW5ndGgpIHtcclxuICAgICAgICAgIHRoaXMuTW9kZWwgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlucHV0c1snbXVsdGlwbGUnXSkge1xyXG4gICAgICBpZiAoaW5wdXRzWydtdWx0aXBsZSddLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCgnbXVsdGlwbGUnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ211bHRpcGxlJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoaW5wdXRzWydhZGRpdGlvbmFsRmlsdGVyJ10pIHtcclxuICAgICAgdGhpcy5jdXJyZW50Q2FjaGUgPSB0aGlzLkdldENhY2hlKHRoaXMucXVlcnkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxEaXZFbGVtZW50Pikge1xyXG4gICAgdGhpcy5vdXRwdXQgPSBbXTtcclxuICB9XHJcblxyXG4gIC8vIEZPUk1TXHJcbiAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgLy8g0J3QvtGA0LzQsNC70YzQvdGL0LkgdXBkYXRlINC80L7QtNC10LvQuFxyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIGlmICgodmFsdWUgaW5zdGFuY2VvZiBBcnJheSAmJiAhdGhpcy5tdWx0aXBsZSkgfHwgKCEodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkgJiYgdGhpcy5tdWx0aXBsZSkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01vZGVsIFR5cGUgRXJyb3InKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBBcnJheSAmJiB0aGlzLk1vZGVsIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICBpZiAodmFsdWUubGVuZ3RoID09PSB0aGlzLk1vZGVsLmxlbmd0aCAmJiB2YWx1ZS5ldmVyeSh2ID0+IHRoaXMuTW9kZWwuaW5kZXhPZih2KSA+PSAwKSkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLk1vZGVsID09PSB2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmZpcnN0TG9hZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuTW9kZWwgPSB2YWx1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbkNoYW5nZTogYW55ID0gKCkgPT4geyB9O1xyXG4gIHB1YmxpYyBvblRvdWNoZWQ6IGFueSA9ICgpID0+IHsgfTtcclxuXHJcbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XHJcbiAgICBpZiAoaXNEaXNhYmxlZCkge1xyXG4gICAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZWwucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gICAgfVxyXG4gICAgLy8gZGlzYWJsZSBvdGhlciBjb21wb25lbnRzIGhlcmVcclxuICB9XHJcblxyXG4gIHNldCBNb2RlbCh2YWx1ZTogYW55KSB7XHJcbiAgICBpZiAodGhpcy5vbmx5RW1pdHRlcikge1xyXG4gICAgICB0aGlzLm91dHB1dCA9IFtdO1xyXG4gICAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE91dHB1dFxyXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLm91dHB1dCA9IFtdO1xyXG4gICAgICB0aGlzLmNoYW5nZUZ1bGxNb2RlbC5lbWl0KHRoaXMub3V0cHV0KTtcclxuICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBBcnJheSAmJiB0aGlzLm11bHRpcGxlKSB7XHJcbiAgICAgIHRoaXMuT3V0cHV0ID0gdmFsdWU7XHJcbiAgICB9IGVsc2UgaWYgKCEodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkgJiYgIXRoaXMubXVsdGlwbGUpIHtcclxuICAgICAgdGhpcy5PdXRwdXQgPSBbdmFsdWVdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE1vZGVsXHJcbiAgICB0aGlzLl9tb2RlbCA9IHZhbHVlO1xyXG5cclxuICAgIC8vIEZvcm1zXHJcbiAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuX21vZGVsKTtcclxuICB9XHJcblxyXG4gIGdldCBNb2RlbCgpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuX21vZGVsO1xyXG4gIH1cclxuXHJcbiAgLy8gUFJPUEVSVFlcclxuICBnZXQgSW5wdXRIaWRlKCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMub3V0cHV0Lmxlbmd0aCA+PSB0aGlzLm11bHRpcGxlTGltaXQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5vdXRwdXQubGVuZ3RoID09PSAxICYmICF0aGlzLmlzT3BlbjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBWYWx1ZUZyb21PdXRwdXQoKTogYW55IHtcclxuICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XHJcbiAgICAgIGxldCB0bXA6IEFycmF5PGFueT4gPSBbXTtcclxuICAgICAgZm9yIChsZXQgbyBvZiB0aGlzLm91dHB1dCkge1xyXG4gICAgICAgIHRtcC5wdXNoKGZldGNoRnJvbU9iamVjdChvLCB0aGlzLm1vZGVsUHJvcGVydHkpKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdG1wO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZldGNoRnJvbU9iamVjdCh0aGlzLm91dHB1dFswXSwgdGhpcy5tb2RlbFByb3BlcnR5KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldCBPdXRwdXQobmV3VmFsdWU6IEFycmF5PGFueT4pIHtcclxuICAgIGxldCBkYXRhTGlzdDogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICBkYXRhTGlzdCA9IHRoaXMuZGF0YUxpc3Q7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICBpZiAobmV3VmFsdWUgJiYgbmV3VmFsdWUubGVuZ3RoICYmIHRoaXMuZmlyc3RMb2FkKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtczogYW55ID0ge307XHJcbiAgICAgICAgdGhpcy5maXJzdExvYWQgPSBmYWxzZTtcclxuICAgICAgICBpZiAoIXRoaXMucHJlbG9hZFByb3BlcnR5KSB7XHJcbiAgICAgICAgICB0aGlzLm91dHB1dCA9IG5ld1ZhbHVlO1xyXG4gICAgICAgICAgdGhpcy5jaGFuZ2VGdWxsTW9kZWwuZW1pdCh0aGlzLm91dHB1dCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHBhcmFtc1t0aGlzLnByZWxvYWRQcm9wZXJ0eV0gPSBuZXdWYWx1ZS5tYXAodmFsID0+IGZldGNoRnJvbU9iamVjdCh2YWwsIHRoaXMucHJlbG9hZEZpZWxkKSk7XHJcbiAgICAgICAgICB0aGlzLmRhdGFMaXN0U3ViID0gKDxPYnNlcnZhYmxlPElEYXRhUmVzcG9uc2U+PnRoaXMuZGF0YUxpc3QocGFyYW1zLCAxLCB0aGlzLmNvdW50T25QYWdlKSkuc3Vic2NyaWJlKGFuc3dlciA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub3V0cHV0ID0gYW5zd2VyLmxpc3Q7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRnVsbE1vZGVsLmVtaXQodGhpcy5vdXRwdXQpO1xyXG4gICAgICAgICAgfSwgKCkgPT4geyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VGdWxsTW9kZWwuZW1pdCh0aGlzLm91dHB1dCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMuZGF0YUxpc3QgPT09IHVuZGVmaW5lZCkgeyByZXR1cm47IH1cclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdkYXRhTGlzdCB2YWx1ZSBFcnJvcicpO1xyXG4gICAgfVxyXG4gICAgbGV0IG5ld091dHB1dDogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgZm9yIChsZXQgdiBvZiBuZXdWYWx1ZSkge1xyXG4gICAgICBmb3IgKGxldCBkIG9mIGRhdGFMaXN0KSB7XHJcbiAgICAgICAgbGV0IGEgPSBmZXRjaEZyb21PYmplY3QoZCwgdGhpcy5tb2RlbFByb3BlcnR5KSA/IGZldGNoRnJvbU9iamVjdChkLCB0aGlzLm1vZGVsUHJvcGVydHkpLnZhbHVlT2YoKSA6IHVuZGVmaW5lZDtcclxuICAgICAgICBsZXQgYiA9IHYgPyB2LnZhbHVlT2YoKSA6IHVuZGVmaW5lZDtcclxuICAgICAgICBpZiAoZGVlcEVxdWFsKGEsIGIpKSB7XHJcbiAgICAgICAgICBuZXdPdXRwdXQucHVzaChkKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMub3V0cHV0ID0gbmV3T3V0cHV0O1xyXG4gICAgdGhpcy5jaGFuZ2VGdWxsTW9kZWwuZW1pdCh0aGlzLm91dHB1dCk7XHJcbiAgfVxyXG5cclxuICBnZXQgT3B0aW9ucygpOiBBcnJheTxhbnk+IHtcclxuICAgIGxldCBvcHRpb25zOiBBcnJheTxhbnk+O1xyXG4gICAgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgbGV0IG9sZENhY2hlID0gdGhpcy5HZXRDYWNoZSh0aGlzLm9sZFF1ZXJ5KTtcclxuXHJcbiAgICAgIGlmICghdGhpcy5jdXJyZW50Q2FjaGUgJiYgb2xkQ2FjaGUpIHtcclxuICAgICAgICBvcHRpb25zID0gb2xkQ2FjaGUub2JqZWN0cztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBvcHRpb25zID0gdGhpcy5jdXJyZW50Q2FjaGUgPyB0aGlzLmN1cnJlbnRDYWNoZS5vYmplY3RzIDogW107XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiAob3B0aW9ucyB8fCBbXSkuZmlsdGVyKG9wID0+IHtcclxuICAgICAgcmV0dXJuIHRoaXMub3V0cHV0LmZpbmRJbmRleChvID0+IHtcclxuICAgICAgICBsZXQgYSA9IGZldGNoRnJvbU9iamVjdChvLCB0aGlzLm1vZGVsUHJvcGVydHkpID8gZmV0Y2hGcm9tT2JqZWN0KG8sIHRoaXMubW9kZWxQcm9wZXJ0eSkudmFsdWVPZigpIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIGxldCBiID0gZmV0Y2hGcm9tT2JqZWN0KG9wLCB0aGlzLm1vZGVsUHJvcGVydHkpID8gZmV0Y2hGcm9tT2JqZWN0KG9wLCB0aGlzLm1vZGVsUHJvcGVydHkpLnZhbHVlT2YoKSA6IHVuZGVmaW5lZDtcclxuICAgICAgICByZXR1cm4gZGVlcEVxdWFsKGEsIGIpO1xyXG4gICAgICB9KSA9PT0gLTE7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjdXJyZW50Q2FjaGU6IENhY2hlSW5mbztcclxuICBwcml2YXRlIEdldENhY2hlKHF1ZXJ5OiBzdHJpbmcpOiBDYWNoZUluZm8ge1xyXG4gICAgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICByZXR1cm4gdGhpcy5jYWNoZUxhenlEYXRhLmZpbmQoY2FjaGUgPT4ge1xyXG4gICAgICAgIHJldHVybiBjYWNoZS5xdWVyeSA9PT0gdGhpcy5xdWVyeSAmJiBkZWVwRXF1YWwoY2FjaGUucGFyYW1zLCB0aGlzLmFkZGl0aW9uYWxGaWx0ZXIpO1xyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8vIENyZWF0ZU5ld1xyXG5cclxuICBwdWJsaWMgQWRkTmV3T2JqZWN0KHZhbHVlOiBPYnNlcnZhYmxlPGFueT4gfCBhbnkpOiB2b2lkIHtcclxuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcclxuICAgICAgdmFsdWUuc3Vic2NyaWJlKG5ld09iamVjdCA9PiB7XHJcbiAgICAgICAgaWYgKG5ld09iamVjdCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICB0aGlzLlNldE5ld09iamVjdChuZXdPYmplY3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNldE5ld09iamVjdCh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIFNldE5ld09iamVjdChuZXdPYmplY3Q6IGFueSkge1xyXG4gICAgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICB0aGlzLmRhdGFMaXN0LnB1c2gobmV3T2JqZWN0KTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgIGZvciAobGV0IGNhY2hlIG9mIHRoaXMuY2FjaGVMYXp5RGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLnF1ZXJ5LmluY2x1ZGVzKGNhY2hlLnF1ZXJ5KSB8fCBjYWNoZS5xdWVyeSA9PT0gdW5kZWZpbmVkIHx8IGNhY2hlLnF1ZXJ5ID09PSAnJykge1xyXG4gICAgICAgICAgY2FjaGUuY291bnRFbGVtZW50Kys7XHJcbiAgICAgICAgICBjYWNoZS5vYmplY3RzLnB1c2gobmV3T2JqZWN0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmZpcnN0TG9hZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5xdWVyeSA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuY3VycmVudENhY2hlID0gdGhpcy5HZXRDYWNoZSh0aGlzLnF1ZXJ5KTtcclxuICAgIHRoaXMuc2VsZWN0T25lKG5ldyBNb3VzZUV2ZW50KCdjbGljaycpLCBuZXdPYmplY3QpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IFNob3dOZXcoKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgYSA9IHRoaXMucXVlcnkgJiYgdGhpcy5uZXdNZXNzYWdlICYmICghdGhpcy5kYXRhTGlzdFN1YiB8fCB0aGlzLmRhdGFMaXN0U3ViLmNsb3NlZCk7XHJcblxyXG4gICAgbGV0IGIgPSB0aGlzLk9wdGlvbnMuZmluZEluZGV4KG8gPT4ge1xyXG4gICAgICBsZXQgYyA9IGZldGNoRnJvbU9iamVjdChvLCB0aGlzLnZpZXdQcm9wZXJ0eSkgPyBmZXRjaEZyb21PYmplY3QobywgdGhpcy52aWV3UHJvcGVydHkpLnZhbHVlT2YoKSA6IHVuZGVmaW5lZDtcclxuICAgICAgcmV0dXJuIGRlZXBFcXVhbChjLCB0aGlzLnF1ZXJ5KTtcclxuICAgIH0pID09PSAtMSAmJiB0aGlzLm91dHB1dC5maW5kSW5kZXgobyA9PiB7XHJcbiAgICAgIGxldCBjID0gZmV0Y2hGcm9tT2JqZWN0KG8sIHRoaXMudmlld1Byb3BlcnR5KSA/IGZldGNoRnJvbU9iamVjdChvLCB0aGlzLnZpZXdQcm9wZXJ0eSkudmFsdWVPZigpIDogdW5kZWZpbmVkO1xyXG4gICAgICByZXR1cm4gZGVlcEVxdWFsKGMsIHRoaXMucXVlcnkpO1xyXG4gICAgfSkgPT09IC0xO1xyXG5cclxuICAgIHJldHVybiBhICYmIGI7XHJcbiAgfVxyXG5cclxuICBnZXQgU2hvd0VtcHR5KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuT3B0aW9ucy5sZW5ndGggPT09IDAgJiYgKCEodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB8fCAodGhpcy5kYXRhTGlzdFN1Yi5jbG9zZWQpKTtcclxuICB9XHJcblxyXG5cclxuICAvLyBDQUNIRVxyXG4gIHByaXZhdGUgY2FjaGVMYXp5RGF0YTogQXJyYXk8Q2FjaGVJbmZvPiA9IFtdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENhY2hlSW5mbyB7XHJcbiAgY291bnRFbGVtZW50OiBudW1iZXI7XHJcbiAgY291bnRQYWdlczogbnVtYmVyO1xyXG4gIGN1cnJlbnRQYWdlOiBudW1iZXI7XHJcbiAgb2JqZWN0czogQXJyYXk8YW55PjtcclxuXHJcbiAgcXVlcnk6IHN0cmluZztcclxuICBwYXJhbXM6IGFueTtcclxufVxyXG4iXX0=