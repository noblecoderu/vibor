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
                    template: "<div class=\"vibor\">\n  <ng-content></ng-content>\n\n  <div class=\"select-search\" (click)=\"showDropdownList($event);\">\n    <ul class=\"select-search-list\">\n      <ng-container *ngIf=\"multiple || !isOpen\">\n        <ng-container *ngIf=\"!SelectedTemplate; else selectedT\">\n          <li class=\"select-search-list-item select-search-list-item_selection\" *ngFor=\"let item of output; let $index=index; let $last=last; trackBy: TrackByFn;\">\n            <div [innerHTML]=\"getListFormatted(item)\"></div>\n            <a class=\"select-search-list-item_remove\" *ngIf=\"allowReset\" (click)=\"!disabled && removeOne($index, $event)\"></a>\n          </li>\n        </ng-container>\n\n        <ng-template #selectedT>\n          <li class=\"select-search-list-item select-search-list-item_selection\" *ngFor=\"let item of output; let $index=index; let $last=last; trackBy: TrackByFn;\">\n            <ng-container *ngTemplateOutlet=\"SelectedTemplate; context: {item: item}\"></ng-container>\n            <a class=\"select-search-list-item_remove\" *ngIf=\"allowReset && !disabled\" (click)=\"!disabled && removeOne($index, $event)\">\n            </a>\n          </li>\n        </ng-template>\n      </ng-container>\n\n      <li class=\"select-search-list-item select-search-list-item_input\" [class.select-search-list-item_hide]=\"InputHide\">\n        <input autocomplete=\"off\" #inputControl=\"ngModel\" [name]=\"name\" [disabled]=\"disabled\" [(ngModel)]=\"query\" [placeholder]=\"output.length == 0 || (multiple && output.length < multipleLimit) ? placeholder : ''\"\n          (input)=\"updateOptionsInDelay()\" (keydown)=\"keyDown($event)\" />\n      </li>\n      <li class=\"select-search-list-item select-search-list-item_loader-center\" [hidden]=\"!dataListSub || dataListSub.closed\">\n        <div class=\"select-search-list-item_loader\"></div>\n      </li>\n\n      <span class=\"arrow\" (click)=\"toggleDropdown($event)\">\n      </span>\n    </ul>\n  </div>\n\n  <div class=\"select-dropdown\" *ngIf=\"isOpen\">\n    <ul class=\"select-dropdown-optgroup\">\n      <ng-container *ngIf=\"!DropdownTemplate; else dropdownT\">\n        <li class=\"select-dropdown-optgroup-option\" *ngFor=\"let option of Options; let i=index\" (mousedown)=\"selectOne($event, option)\"\n          [class.active]=\"i === selectorPosition\" [innerHTML]=\"getDropdownFormatted(option)\">\n        </li>\n      </ng-container>\n\n      <ng-template #dropdownT>\n        <li class=\"select-dropdown-optgroup-option\" *ngFor=\"let option of Options; let i=index\" (mousedown)=\"selectOne($event, option)\"\n          [class.active]=\"i === selectorPosition\">\n          <ng-container *ngTemplateOutlet=\"DropdownTemplate; context: {item: option}\"></ng-container>\n        </li>\n      </ng-template>\n\n      <li class=\"select-dropdown-optgroup-option loader\" *ngIf=\"dataListSub && !dataListSub.closed\">\n        \u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430\n      </li>\n      <li class=\"select-dropdown-optgroup-option loader\" (mousedown)=\"AddNewObject(CreateNew(query));\" [class.active]=\"selectorPosition === Options.length\"\n        *ngIf=\"ShowNew\">\n\n        <ng-container *ngIf=\"createTemplate; else templateWithMessage\">\n          <ng-container *ngTemplateOutlet=\"createTemplate.templateRef; context: {query: query}\"></ng-container>\n        </ng-container>\n\n        <ng-template #templateWithMessage>\n          {{ newMessage }}\n        </ng-template>\n      </li>\n      <li class=\"select-dropdown-optgroup-option loader\" *ngIf=\"ShowEmpty\">\n        \u041F\u0443\u0441\u0442\u043E\n      </li>\n    </ul>\n    <div class=\"select-dropdown-pager\" *ngIf=\"currentCache && currentCache.countPages > 1\">\n      <p class=\"select-dropdown-pager-page\">\n        {{ currentCache.currentPage | number }} / {{ currentCache.countPages | number }}\n      </p>\n      <button class=\"select-dropdown-pager-loadmore\" *ngIf=\"currentCache.countPages > 1 && currentCache.currentPage < currentCache.countPages\"\n        (mousedown)=\"nextPage($event)\">\n        \u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0435\u0449\u0451\n      </button>\n    </div>\n  </div>\n</div>\n",
                    styles: [".vibor a,.vibor div,.vibor label,.vibor legend,.vibor span,.vibor ul{margin:0;padding:0;border:0}.vibor a,.vibor button,.vibor input{outline:0}.vibor ol,.vibor ul{list-style:none}.vibor input{padding:0;margin:0;border:0;font:inherit}.vibor{position:relative;display:block;font-family:-apple-system,BlinkMacSystemFont, \"Segoe UI\",Roboto,Helvetica,Arial,sans-serif, \"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\"}.vibor .select-search{position:relative}.vibor .select-search .arrow{content:\"\";position:absolute;right:13px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);display:block;width:16px;height:16px;background-image:url(data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ibmMtaWNvbiBnbHlwaCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiI+DQogIDxwYXRoIGZpbGw9IiMyYzJjMmMiIGQ9Ik04IDExLjRMMi42IDYgNCA0LjZsNCA0IDQtNEwxMy40IDYiLz4NCjwvc3ZnPg0K);transition:-webkit-transform .15s ease-in-out;transition:transform .15s ease-in-out;transition:transform .15s ease-in-out,-webkit-transform .15s ease-in-out}.vibor .select-search .arrow:before{display:none}.vibor .select-search-list-item_input input{width:100%}.vibor .select-dropdown{position:absolute;top:100%;left:0;right:0;z-index:2}.vibor .select-search-list-item_loader-center{position:absolute;right:10px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);display:flex;align-items:center;justify-content:center;width:21px;height:21px;background:#fff;z-index:2}.vibor .select-search-list-item_loader-center[hidden]{display:none}.vibor .select-search-list-item_loader-center .select-search-list-item_loader{width:16px;height:16px;box-sizing:border-box;border-width:2px;border-style:solid;border-color:#22272e rgba(34,39,46,.4) rgba(34,39,46,.4);border-radius:100%;-webkit-animation:.45s linear infinite clockwise;animation:.45s linear infinite clockwise}.vibor .select-dropdown-optgroup{max-height:300px;overflow-y:auto;border:1px solid #d5d9de;border-bottom-left-radius:5px;border-bottom-right-radius:5px;border-top:0}.vibor .select-dropdown-optgroup-option{min-height:30px;padding:10px 15px}.vibor .select-dropdown-optgroup-option:hover{background-color:rgba(66,132,215,.1)}.vibor .open-vibor .select-search .arrow{-webkit-transform:rotate(180deg);transform:rotate(180deg)}@-webkit-keyframes clockwise{to{-webkit-transform:rotate(360deg) translatez(0);transform:rotate(360deg) translatez(0)}}@keyframes clockwise{to{-webkit-transform:rotate(360deg) translatez(0);transform:rotate(360deg) translatez(0)}}"],
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctdmlib3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdmlib3IvIiwic291cmNlcyI6WyJsaWIvbmctdmlib3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFDekIsWUFBWSxFQUFFLFVBQVUsRUFDWCxZQUFZLEVBQUUsU0FBUyxFQUVyQyxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBRUwsaUJBQWlCLEVBQ2pCLE9BQU8sRUFDUixNQUFNLGdCQUFnQixDQUFDO0FBRXhCLE9BQU8sRUFBZ0IsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRWhELE9BQU8sRUFDSCxrQkFBa0IsRUFDbEIsb0JBQW9CLEVBQ3BCLHNCQUFzQixFQUN0QixzQkFBc0IsRUFDekIsTUFBTSwrQkFBK0IsQ0FBQztBQUV2QyxPQUFPLEVBRUgsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFDZixrQkFBa0IsRUFDckIsTUFBTSxXQUFXLENBQUM7QUFFbkIscUJBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzs7SUFtY3RDLDBCQUFvQixVQUFzQztRQUF0QyxlQUFVLEdBQVYsVUFBVSxDQUE0Qjt5QkFuV3RDLEtBQUs7Z0NBU0MsQ0FBQzt3QkFDUixHQUFHOzt3QkFPSyxLQUFLOzZCQUNBLFFBQVE7MkJBQ1YsRUFBRTsyQkFFRixPQUFPO3dCQUVWLEtBQUs7MEJBQ0gsSUFBSTt3QkFDZixLQUFLOzRCQVNRLE1BQU07NkJBRUwsSUFBSTsrQkFDRixLQUFLOzRCQUNBLFNBQVM7OEJBQ2YsT0FBTztnQ0FJTCxFQUFFOytCQUVrQyxJQUFJLFlBQVksRUFBRTswQkFHcEQsU0FBUzt5QkFDd0IsVUFBQyxLQUFhO1lBQ2xGLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDZDtxQkFxRHlCLENBQUM7WUFDekIscUJBQUksS0FBSyxHQUFHLENBQUMs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RixTQUFTLFNBQUM7O29CQUVULFFBQVEsRUFBRSxPQUFPO29CQUNqQixRQUFRLEVBQUUsMG5JQStFWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyxxZ0ZBQTIvRSxDQUFDO29CQUNyZ0YsU0FBUyxFQUFFLENBQUM7NEJBQ1YsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsZ0JBQWdCLEVBQWhCLENBQWdCLENBQUM7NEJBQy9DLEtBQUssRUFBRSxJQUFJO3lCQUNaLENBQUM7aUJBQ0g7Ozs7Z0JBckhlLFVBQVU7OzsrQkF3SXZCLFNBQVMsU0FBQyxjQUFjOzJCQUd4QixLQUFLO2dDQUNMLEtBQUs7OEJBQ0wsS0FBSzs4QkFFTCxLQUFLO3VCQUNMLEtBQUs7MkJBQ0wsS0FBSzs2QkFDTCxLQUFLOytCQUlMLFlBQVksU0FBQyxrQkFBa0I7bUNBQy9CLFlBQVksU0FBQyxzQkFBc0I7bUNBQ25DLFlBQVksU0FBQyxzQkFBc0I7aUNBQ25DLFlBQVksU0FBQyxvQkFBb0I7Z0NBQ2pDLEtBQUs7b0NBQ0wsS0FBSzsrQkFDTCxLQUFLO2dDQUVMLEtBQUs7a0NBQ0wsS0FBSzsrQkFDTCxLQUFLO2lDQUNMLEtBQUs7MkJBRUwsS0FBSzs4QkFDTCxLQUFLO21DQUNMLEtBQUs7OEJBQ0wsS0FBSztrQ0FDTCxNQUFNLFNBQUMsaUJBQWlCOzZCQUd4QixLQUFLOzRCQUNMLEtBQUs7OzJCQTlLUjs7U0F5SGEsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsIE9uSW5pdCwgT25DaGFuZ2VzLFxyXG4gIElucHV0LCBPdXRwdXQsIGZvcndhcmRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLFxyXG4gIFRlbXBsYXRlUmVmLCBDb250ZW50Q2hpbGQsIFZpZXdDaGlsZCxcclxuICBTaW1wbGVDaGFuZ2VzXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXHJcbiAgTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgTmdNb2RlbFxyXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIFZpYm9yQm90aERpcmVjdGl2ZSxcclxuICAgIFZpYm9yQ3JlYXRlRGlyZWN0aXZlLFxyXG4gICAgVmlib3JEcm9wZG93bkRpcmVjdGl2ZSxcclxuICAgIFZpYm9yU2VsZWN0ZWREaXJlY3RpdmVcclxufSBmcm9tICcuL25nLXZpYm9yLXRlbXBsYXRlLmRpcmVjdGl2ZSc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgSURhdGFSZXNwb25zZSxcclxuICAgIGRlZmF1bHRGb3JtYXR0ZXIsXHJcbiAgICBmZXRjaEZyb21PYmplY3QsXHJcbiAgICBzY3JvbGxBY3RpdmVPcHRpb25cclxufSBmcm9tICcuL2hlbHBlcnMnO1xyXG5cclxuY29uc3QgZGVlcEVxdWFsID0gcmVxdWlyZSgnZGVlcC1lcXVhbCcpO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxyXG4gIHNlbGVjdG9yOiAndmlib3InLFxyXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInZpYm9yXCI+XHJcbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG5cclxuICA8ZGl2IGNsYXNzPVwic2VsZWN0LXNlYXJjaFwiIChjbGljayk9XCJzaG93RHJvcGRvd25MaXN0KCRldmVudCk7XCI+XHJcbiAgICA8dWwgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoLWxpc3RcIj5cclxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm11bHRpcGxlIHx8ICFpc09wZW5cIj5cclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIVNlbGVjdGVkVGVtcGxhdGU7IGVsc2Ugc2VsZWN0ZWRUXCI+XHJcbiAgICAgICAgICA8bGkgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbSBzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9zZWxlY3Rpb25cIiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBvdXRwdXQ7IGxldCAkaW5kZXg9aW5kZXg7IGxldCAkbGFzdD1sYXN0OyB0cmFja0J5OiBUcmFja0J5Rm47XCI+XHJcbiAgICAgICAgICAgIDxkaXYgW2lubmVySFRNTF09XCJnZXRMaXN0Rm9ybWF0dGVkKGl0ZW0pXCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDxhIGNsYXNzPVwic2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fcmVtb3ZlXCIgKm5nSWY9XCJhbGxvd1Jlc2V0XCIgKGNsaWNrKT1cIiFkaXNhYmxlZCAmJiByZW1vdmVPbmUoJGluZGV4LCAkZXZlbnQpXCI+PC9hPlxyXG4gICAgICAgICAgPC9saT5cclxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgICAgICAgPG5nLXRlbXBsYXRlICNzZWxlY3RlZFQ+XHJcbiAgICAgICAgICA8bGkgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbSBzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9zZWxlY3Rpb25cIiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBvdXRwdXQ7IGxldCAkaW5kZXg9aW5kZXg7IGxldCAkbGFzdD1sYXN0OyB0cmFja0J5OiBUcmFja0J5Rm47XCI+XHJcbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJTZWxlY3RlZFRlbXBsYXRlOyBjb250ZXh0OiB7aXRlbTogaXRlbX1cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgPGEgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9yZW1vdmVcIiAqbmdJZj1cImFsbG93UmVzZXQgJiYgIWRpc2FibGVkXCIgKGNsaWNrKT1cIiFkaXNhYmxlZCAmJiByZW1vdmVPbmUoJGluZGV4LCAkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcblxyXG4gICAgICA8bGkgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbSBzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9pbnB1dFwiIFtjbGFzcy5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9oaWRlXT1cIklucHV0SGlkZVwiPlxyXG4gICAgICAgIDxpbnB1dCBhdXRvY29tcGxldGU9XCJvZmZcIiAjaW5wdXRDb250cm9sPVwibmdNb2RlbFwiIFtuYW1lXT1cIm5hbWVcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbKG5nTW9kZWwpXT1cInF1ZXJ5XCIgW3BsYWNlaG9sZGVyXT1cIm91dHB1dC5sZW5ndGggPT0gMCB8fCAobXVsdGlwbGUgJiYgb3V0cHV0Lmxlbmd0aCA8IG11bHRpcGxlTGltaXQpID8gcGxhY2Vob2xkZXIgOiAnJ1wiXHJcbiAgICAgICAgICAoaW5wdXQpPVwidXBkYXRlT3B0aW9uc0luRGVsYXkoKVwiIChrZXlkb3duKT1cImtleURvd24oJGV2ZW50KVwiIC8+XHJcbiAgICAgIDwvbGk+XHJcbiAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtIHNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2xvYWRlci1jZW50ZXJcIiBbaGlkZGVuXT1cIiFkYXRhTGlzdFN1YiB8fCBkYXRhTGlzdFN1Yi5jbG9zZWRcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fbG9hZGVyXCI+PC9kaXY+XHJcbiAgICAgIDwvbGk+XHJcblxyXG4gICAgICA8c3BhbiBjbGFzcz1cImFycm93XCIgKGNsaWNrKT1cInRvZ2dsZURyb3Bkb3duKCRldmVudClcIj5cclxuICAgICAgPC9zcGFuPlxyXG4gICAgPC91bD5cclxuICA8L2Rpdj5cclxuXHJcbiAgPGRpdiBjbGFzcz1cInNlbGVjdC1kcm9wZG93blwiICpuZ0lmPVwiaXNPcGVuXCI+XHJcbiAgICA8dWwgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXBcIj5cclxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFEcm9wZG93blRlbXBsYXRlOyBlbHNlIGRyb3Bkb3duVFwiPlxyXG4gICAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb25cIiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIE9wdGlvbnM7IGxldCBpPWluZGV4XCIgKG1vdXNlZG93bik9XCJzZWxlY3RPbmUoJGV2ZW50LCBvcHRpb24pXCJcclxuICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaSA9PT0gc2VsZWN0b3JQb3NpdGlvblwiIFtpbm5lckhUTUxdPVwiZ2V0RHJvcGRvd25Gb3JtYXR0ZWQob3B0aW9uKVwiPlxyXG4gICAgICAgIDwvbGk+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG5cclxuICAgICAgPG5nLXRlbXBsYXRlICNkcm9wZG93blQ+XHJcbiAgICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvblwiICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgT3B0aW9uczsgbGV0IGk9aW5kZXhcIiAobW91c2Vkb3duKT1cInNlbGVjdE9uZSgkZXZlbnQsIG9wdGlvbilcIlxyXG4gICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJpID09PSBzZWxlY3RvclBvc2l0aW9uXCI+XHJcbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiRHJvcGRvd25UZW1wbGF0ZTsgY29udGV4dDoge2l0ZW06IG9wdGlvbn1cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICA8L2xpPlxyXG4gICAgICA8L25nLXRlbXBsYXRlPlxyXG5cclxuICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvbiBsb2FkZXJcIiAqbmdJZj1cImRhdGFMaXN0U3ViICYmICFkYXRhTGlzdFN1Yi5jbG9zZWRcIj5cclxuICAgICAgICDQl9Cw0LPRgNGD0LfQutCwXHJcbiAgICAgIDwvbGk+XHJcbiAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb24gbG9hZGVyXCIgKG1vdXNlZG93bik9XCJBZGROZXdPYmplY3QoQ3JlYXRlTmV3KHF1ZXJ5KSk7XCIgW2NsYXNzLmFjdGl2ZV09XCJzZWxlY3RvclBvc2l0aW9uID09PSBPcHRpb25zLmxlbmd0aFwiXHJcbiAgICAgICAgKm5nSWY9XCJTaG93TmV3XCI+XHJcblxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjcmVhdGVUZW1wbGF0ZTsgZWxzZSB0ZW1wbGF0ZVdpdGhNZXNzYWdlXCI+XHJcbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY3JlYXRlVGVtcGxhdGUudGVtcGxhdGVSZWY7IGNvbnRleHQ6IHtxdWVyeTogcXVlcnl9XCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcblxyXG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjdGVtcGxhdGVXaXRoTWVzc2FnZT5cclxuICAgICAgICAgIHt7IG5ld01lc3NhZ2UgfX1cclxuICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICA8L2xpPlxyXG4gICAgICA8bGkgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXAtb3B0aW9uIGxvYWRlclwiICpuZ0lmPVwiU2hvd0VtcHR5XCI+XHJcbiAgICAgICAg0J/Rg9GB0YLQvlxyXG4gICAgICA8L2xpPlxyXG4gICAgPC91bD5cclxuICAgIDxkaXYgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tcGFnZXJcIiAqbmdJZj1cImN1cnJlbnRDYWNoZSAmJiBjdXJyZW50Q2FjaGUuY291bnRQYWdlcyA+IDFcIj5cclxuICAgICAgPHAgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tcGFnZXItcGFnZVwiPlxyXG4gICAgICAgIHt7IGN1cnJlbnRDYWNoZS5jdXJyZW50UGFnZSB8IG51bWJlciB9fSAvIHt7IGN1cnJlbnRDYWNoZS5jb3VudFBhZ2VzIHwgbnVtYmVyIH19XHJcbiAgICAgIDwvcD5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cInNlbGVjdC1kcm9wZG93bi1wYWdlci1sb2FkbW9yZVwiICpuZ0lmPVwiY3VycmVudENhY2hlLmNvdW50UGFnZXMgPiAxICYmIGN1cnJlbnRDYWNoZS5jdXJyZW50UGFnZSA8IGN1cnJlbnRDYWNoZS5jb3VudFBhZ2VzXCJcclxuICAgICAgICAobW91c2Vkb3duKT1cIm5leHRQYWdlKCRldmVudClcIj5cclxuICAgICAgICDQl9Cw0LPRgNGD0LfQuNGC0Ywg0LXRidGRXHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG5gLFxyXG4gIHN0eWxlczogW2Audmlib3IgYSwudmlib3IgZGl2LC52aWJvciBsYWJlbCwudmlib3IgbGVnZW5kLC52aWJvciBzcGFuLC52aWJvciB1bHttYXJnaW46MDtwYWRkaW5nOjA7Ym9yZGVyOjB9LnZpYm9yIGEsLnZpYm9yIGJ1dHRvbiwudmlib3IgaW5wdXR7b3V0bGluZTowfS52aWJvciBvbCwudmlib3IgdWx7bGlzdC1zdHlsZTpub25lfS52aWJvciBpbnB1dHtwYWRkaW5nOjA7bWFyZ2luOjA7Ym9yZGVyOjA7Zm9udDppbmhlcml0fS52aWJvcntwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmJsb2NrO2ZvbnQtZmFtaWx5Oi1hcHBsZS1zeXN0ZW0sQmxpbmtNYWNTeXN0ZW1Gb250LCBcIlNlZ29lIFVJXCIsUm9ib3RvLEhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmLCBcIkFwcGxlIENvbG9yIEVtb2ppXCIsXCJTZWdvZSBVSSBFbW9qaVwiLFwiU2Vnb2UgVUkgU3ltYm9sXCJ9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoe3Bvc2l0aW9uOnJlbGF0aXZlfS52aWJvciAuc2VsZWN0LXNlYXJjaCAuYXJyb3d7Y29udGVudDpcIlwiO3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjEzcHg7dG9wOjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpO2Rpc3BsYXk6YmxvY2s7d2lkdGg6MTZweDtoZWlnaHQ6MTZweDtiYWNrZ3JvdW5kLWltYWdlOnVybChkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUJqYkdGemN6MGlibU10YVdOdmJpQm5iSGx3YUNJZ2VHMXNibk05SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpJd01EQXZjM1puSWlCM2FXUjBhRDBpTVRZaUlHaGxhV2RvZEQwaU1UWWlJSFpwWlhkQ2IzZzlJakFnTUNBeE5pQXhOaUkrRFFvZ0lEeHdZWFJvSUdacGJHdzlJaU15WXpKak1tTWlJR1E5SWswNElERXhMalJNTWk0MklEWWdOQ0EwTGpac05DQTBJRFF0TkV3eE15NDBJRFlpTHo0TkNqd3ZjM1puUGcwSyk7dHJhbnNpdGlvbjotd2Via2l0LXRyYW5zZm9ybSAuMTVzIGVhc2UtaW4tb3V0O3RyYW5zaXRpb246dHJhbnNmb3JtIC4xNXMgZWFzZS1pbi1vdXQ7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjE1cyBlYXNlLWluLW91dCwtd2Via2l0LXRyYW5zZm9ybSAuMTVzIGVhc2UtaW4tb3V0fS52aWJvciAuc2VsZWN0LXNlYXJjaCAuYXJyb3c6YmVmb3Jle2Rpc3BsYXk6bm9uZX0udmlib3IgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2lucHV0IGlucHV0e3dpZHRoOjEwMCV9LnZpYm9yIC5zZWxlY3QtZHJvcGRvd257cG9zaXRpb246YWJzb2x1dGU7dG9wOjEwMCU7bGVmdDowO3JpZ2h0OjA7ei1pbmRleDoyfS52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fbG9hZGVyLWNlbnRlcntwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDoxMHB4O3RvcDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKTtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7d2lkdGg6MjFweDtoZWlnaHQ6MjFweDtiYWNrZ3JvdW5kOiNmZmY7ei1pbmRleDoyfS52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fbG9hZGVyLWNlbnRlcltoaWRkZW5de2Rpc3BsYXk6bm9uZX0udmlib3IgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2xvYWRlci1jZW50ZXIgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2xvYWRlcnt3aWR0aDoxNnB4O2hlaWdodDoxNnB4O2JveC1zaXppbmc6Ym9yZGVyLWJveDtib3JkZXItd2lkdGg6MnB4O2JvcmRlci1zdHlsZTpzb2xpZDtib3JkZXItY29sb3I6IzIyMjcyZSByZ2JhKDM0LDM5LDQ2LC40KSByZ2JhKDM0LDM5LDQ2LC40KTtib3JkZXItcmFkaXVzOjEwMCU7LXdlYmtpdC1hbmltYXRpb246LjQ1cyBsaW5lYXIgaW5maW5pdGUgY2xvY2t3aXNlO2FuaW1hdGlvbjouNDVzIGxpbmVhciBpbmZpbml0ZSBjbG9ja3dpc2V9LnZpYm9yIC5zZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXB7bWF4LWhlaWdodDozMDBweDtvdmVyZmxvdy15OmF1dG87Ym9yZGVyOjFweCBzb2xpZCAjZDVkOWRlO2JvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6NXB4O2JvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOjVweDtib3JkZXItdG9wOjB9LnZpYm9yIC5zZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXAtb3B0aW9ue21pbi1oZWlnaHQ6MzBweDtwYWRkaW5nOjEwcHggMTVweH0udmlib3IgLnNlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb246aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDY2LDEzMiwyMTUsLjEpfS52aWJvciAub3Blbi12aWJvciAuc2VsZWN0LXNlYXJjaCAuYXJyb3d7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDE4MGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgxODBkZWcpfUAtd2Via2l0LWtleWZyYW1lcyBjbG9ja3dpc2V7dG97LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDM2MGRlZykgdHJhbnNsYXRleigwKTt0cmFuc2Zvcm06cm90YXRlKDM2MGRlZykgdHJhbnNsYXRleigwKX19QGtleWZyYW1lcyBjbG9ja3dpc2V7dG97LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDM2MGRlZykgdHJhbnNsYXRleigwKTt0cmFuc2Zvcm06cm90YXRlKDM2MGRlZykgdHJhbnNsYXRleigwKX19YF0sXHJcbiAgcHJvdmlkZXJzOiBbe1xyXG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ1ZpYm9yQ29tcG9uZW50KSxcclxuICAgIG11bHRpOiB0cnVlXHJcbiAgfV1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nVmlib3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG4gIC8vIExvY2FsIFZhcmlhYmxlXHJcbiAgcHVibGljIF9tb2RlbDogYW55O1xyXG5cclxuICBwcml2YXRlIGZpcnN0TG9hZCA9IGZhbHNlO1xyXG4gIHByaXZhdGUgb3B0aW9uczogQXJyYXk8YW55PjtcclxuICBwdWJsaWMgb3V0cHV0OiBBcnJheTxhbnk+O1xyXG5cclxuICBwdWJsaWMgaXNPcGVuOiBib29sZWFuO1xyXG5cclxuICBwcml2YXRlIG9sZFF1ZXJ5OiBzdHJpbmc7XHJcbiAgcHVibGljIHF1ZXJ5OiBzdHJpbmc7XHJcblxyXG4gIHB1YmxpYyBzZWxlY3RvclBvc2l0aW9uID0gMDtcclxuICBwcml2YXRlIHdhaXRUaW1lID0gNTAwO1xyXG5cclxuICBwcml2YXRlIGVsOiBFbGVtZW50OyAgICAgICAgICAgLy8gdGhpcyBjb21wb25lbnQgIGVsZW1lbnQgYDx2aWJvcj5gXHJcbiAgcHJpdmF0ZSBpbnB1dEVsOiBIVE1MSW5wdXRFbGVtZW50OyAvLyBgPGlucHV0PmAgZWxlbWVudCBpbiBgPHZpYm9yPmAgZm9yIGF1dG8gY29tcGxldGVcclxuICBAVmlld0NoaWxkKCdpbnB1dENvbnRyb2wnKSBwdWJsaWMgaW5wdXRDb250cm9sOiBOZ01vZGVsO1xyXG5cclxuICAvLyBJbnB1dHMgJiBPdXRwdXRzXHJcbiAgQElucHV0KCkgcHVibGljIG11bHRpcGxlID0gZmFsc2U7XHJcbiAgQElucHV0KCkgcHVibGljIG11bHRpcGxlTGltaXQgPSBJbmZpbml0eTtcclxuICBASW5wdXQoKSBwdWJsaWMgY291bnRPblBhZ2UgPSAxMDtcclxuXHJcbiAgQElucHV0KCkgcHVibGljIHBsYWNlaG9sZGVyID0gJ1ZpYm9yJztcclxuICBASW5wdXQoKSBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyByZXF1aXJlZCA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBhbGxvd1Jlc2V0ID0gdHJ1ZTtcclxuICBwdWJsaWMgZGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgLy8g0J7RgtC+0LHRgNCw0LbQtdC90LjQtSDRgdC/0LjRgdC60L7QslxyXG4gIEBDb250ZW50Q2hpbGQoVmlib3JCb3RoRGlyZWN0aXZlKSBwdWJsaWMgYm90aFRlbXBsYXRlOiBWaWJvckJvdGhEaXJlY3RpdmU7XHJcbiAgQENvbnRlbnRDaGlsZChWaWJvckRyb3Bkb3duRGlyZWN0aXZlKSBwdWJsaWMgZHJvcGRvd25UZW1wbGF0ZTogVmlib3JEcm9wZG93bkRpcmVjdGl2ZTtcclxuICBAQ29udGVudENoaWxkKFZpYm9yU2VsZWN0ZWREaXJlY3RpdmUpIHB1YmxpYyBzZWxlY3RlZFRlbXBsYXRlOiBWaWJvclNlbGVjdGVkRGlyZWN0aXZlO1xyXG4gIEBDb250ZW50Q2hpbGQoVmlib3JDcmVhdGVEaXJlY3RpdmUpIHB1YmxpYyBjcmVhdGVUZW1wbGF0ZTogVmlib3JDcmVhdGVEaXJlY3RpdmU7XHJcbiAgQElucHV0KCkgcHVibGljIGxpc3RGb3JtYXR0ZXI6IChhcmc6IGFueSwgdmFsdWU6IHN0cmluZykgPT4gc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBkcm9wZG93bkZvcm1hdHRlcjogKGFyZzogYW55LCB2YWx1ZTogc3RyaW5nKSA9PiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcHVibGljIHZpZXdQcm9wZXJ0eSA9ICdOYW1lJzsgIC8vINCf0L7Qu9C1INC00LvRjyDQtNC10YTQvtC70YLQvdC+0LPQviDQvtGC0L7QsdGA0LDQttC10L3QuNGPXHJcblxyXG4gIEBJbnB1dCgpIHB1YmxpYyBtb2RlbFByb3BlcnR5ID0gJ2lkJzsgIC8vINCi0L4sINGH0YLQviDQt9Cw0L/QuNGB0YvQstCw0LXRgtGB0Y8g0LIg0JzQvtC00LXQu9GMXHJcbiAgQElucHV0KCkgcHVibGljIHByZWxvYWRQcm9wZXJ0eSA9ICdpZHMnOyAvLyDQmtC70Y7RhyDQt9Cw0L/RgNC+0YHQsCDQuiDRgdC10YDQstC10YDRgyDQtNC70Y8g0L/RgNC10LTQt9Cw0LPRgNGD0LfQutC4LCDQtdGB0LvQuCB1bmRlZmluZWQg0LfQsNC/0LjRgdGL0LLQsNC10YLRgdGPINCy0LXRgdGMINC+0LHRitC10LrRglxyXG4gIEBJbnB1dCgpIHB1YmxpYyBwcmVsb2FkRmllbGQ6IHN0cmluZyA9IHVuZGVmaW5lZDsgLy8g0JfQvdCw0YfQtdC90LjQtSDQv9C+0LvRjywg0LrQvtGC0L7RgNC1INC90LXQvtCx0YXQvtC00LjQvNC+INC+0YLQv9GA0LDQstC40YLRjCDQsiDQt9Cw0L/RgNC+0YEuXHJcbiAgQElucHV0KCkgcHVibGljIHNlYXJjaFByb3BlcnR5ID0gJ3F1ZXJ5JztcclxuXHJcbiAgQElucHV0KCkgcHVibGljIGRhdGFMaXN0OiAoKHBhcmFtOiBPYmplY3QsIHBhZ2U6IG51bWJlciwgY291bnRPblBhZ2U/OiBudW1iZXIpID0+IE9ic2VydmFibGU8SURhdGFSZXNwb25zZT4pIHwgQXJyYXk8YW55PjtcclxuICBASW5wdXQoKSBwdWJsaWMgZXhjbHVkZUxpc3Q6IEFycmF5PGFueT47XHJcbiAgQElucHV0KCkgcHVibGljIGFkZGl0aW9uYWxGaWx0ZXIgPSB7fTtcclxuICBASW5wdXQoKSBwdWJsaWMgb25seUVtaXR0ZXI6IGJvb2xlYW47XHJcbiAgQE91dHB1dCgnY2hhbmdlRnVsbE1vZGVsJykgcHVibGljIGNoYW5nZUZ1bGxNb2RlbDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG5cclxuICBASW5wdXQoKSBwdWJsaWMgbmV3TWVzc2FnZTogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBDcmVhdGVOZXc6IChxdWVyeTogc3RyaW5nKSA9PiBPYnNlcnZhYmxlPGFueT4gfCBhbnkgPSAocXVlcnk6IHN0cmluZykgPT4ge1xyXG4gICAgcmV0dXJuIHF1ZXJ5O1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIFN1YnNjcmlwdGlvblxyXG4gIHB1YmxpYyBkYXRhTGlzdFN1YjogU3Vic2NyaXB0aW9uO1xyXG5cclxuXHJcbiAgLy8gT1BUSU9OU1xyXG4gIHB1YmxpYyBUcmFja0J5Rm4oaW5kZXg6IG51bWJlcik6IGFueSB7XHJcbiAgICByZXR1cm4gaW5kZXg7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2hvd0Ryb3Bkb3duTGlzdChldmVudDogRm9jdXNFdmVudCB8IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIGlmIChldmVudCkge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5tdWx0aXBsZSAmJiB0aGlzLm91dHB1dC5sZW5ndGggPj0gdGhpcy5tdWx0aXBsZUxpbWl0KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ29wZW4tdmlib3InKTtcclxuICAgIHRoaXMuaW5wdXRFbC5mb2N1cygpO1xyXG4gICAgdGhpcy51cGRhdGVPcHRpb25zKCk7XHJcbiAgICB0aGlzLm9uVG91Y2hlZCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoaWRlRHJvcGRvd25MaXN0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuLXZpYm9yJyk7XHJcbiAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xyXG4gICAgdGhpcy5pbnB1dEVsLmJsdXIoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBoaWRlRHJvcGRvd25MaXN0V2l0aERlbGF5KCk6IHZvaWQge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuaGlkZURyb3Bkb3duTGlzdCgpO1xyXG4gICAgfSwgMTAwKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB0b2dnbGVEcm9wZG93bihldmVudDogRXZlbnQpOiB2b2lkIHtcclxuICAgIGlmIChldmVudCkge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5pc09wZW4pIHtcclxuICAgICAgdGhpcy5oaWRlRHJvcGRvd25MaXN0KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNob3dEcm9wZG93bkxpc3QodW5kZWZpbmVkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZGVsYXk6IEZ1bmN0aW9uID0gKGZ1bmN0aW9uICgpOiBGdW5jdGlvbiB7XHJcbiAgICBsZXQgdGltZXIgPSAwO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjYWxsYmFjazogYW55LCBtczogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XHJcbiAgICAgIHRpbWVyID0gc2V0VGltZW91dChjYWxsYmFjaywgbXMpO1xyXG4gICAgfTtcclxuICB9KSgpO1xyXG5cclxuICBwdWJsaWMgdXBkYXRlT3B0aW9ucygpOiB2b2lkIHtcclxuICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcclxuICAgIGlmICh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgdGhpcy5vcHRpb25zID0gdGhpcy5kYXRhTGlzdC5maWx0ZXIoZGF0YSA9PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnF1ZXJ5IHx8IHRoaXMucXVlcnkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGY6IGFueSA9IGZldGNoRnJvbU9iamVjdChkYXRhLCB0aGlzLnNlYXJjaFByb3BlcnR5KTtcclxuICAgICAgICBpZiAoZiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShmKS5pbmRleE9mKHRoaXMucXVlcnkpID49IDA7XHJcbiAgICAgIH0pLmZpbHRlcihkYXRhID0+IHtcclxuICAgICAgICBpZiAoIXRoaXMuZXhjbHVkZUxpc3QpIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGQgPSBmZXRjaEZyb21PYmplY3QoZGF0YSwgdGhpcy5tb2RlbFByb3BlcnR5KS52YWx1ZU9mKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXhjbHVkZUxpc3QuZmluZEluZGV4KGV4ID0+IHtcclxuICAgICAgICAgIGxldCBhID0gZmV0Y2hGcm9tT2JqZWN0KGV4LCB0aGlzLm1vZGVsUHJvcGVydHkpLnZhbHVlT2YoKTtcclxuICAgICAgICAgIHJldHVybiBkZWVwRXF1YWwoZCwgYSk7XHJcbiAgICAgICAgfSkgPCAwO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgIGlmICh0aGlzLmRhdGFMaXN0U3ViKSB7IHRoaXMuZGF0YUxpc3RTdWIudW5zdWJzY3JpYmUoKTsgfVxyXG4gICAgICBpZiAoIXRoaXMuY3VycmVudENhY2hlKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50Q2FjaGUgPSB7XHJcbiAgICAgICAgICBjb3VudEVsZW1lbnQ6IDAsXHJcbiAgICAgICAgICBjb3VudFBhZ2VzOiAxLFxyXG4gICAgICAgICAgY3VycmVudFBhZ2U6IDEsXHJcbiAgICAgICAgICBvYmplY3RzOiBbXSxcclxuICAgICAgICAgIHF1ZXJ5OiB0aGlzLnF1ZXJ5LFxyXG4gICAgICAgICAgcGFyYW1zOiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmFkZGl0aW9uYWxGaWx0ZXIpXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmNhY2hlTGF6eURhdGEucHVzaCh0aGlzLmN1cnJlbnRDYWNoZSk7XHJcblxyXG4gICAgICAgIGxldCBwYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmFkZGl0aW9uYWxGaWx0ZXIpIGFzIGFueTtcclxuICAgICAgICBwYXJhbXNbdGhpcy5zZWFyY2hQcm9wZXJ0eV0gPSB0aGlzLnF1ZXJ5O1xyXG5cclxuICAgICAgICB0aGlzLmRhdGFMaXN0U3ViID0gKDxPYnNlcnZhYmxlPElEYXRhUmVzcG9uc2U+PnRoaXMuZGF0YUxpc3QocGFyYW1zLCAxLCB0aGlzLmNvdW50T25QYWdlKSkuc3Vic2NyaWJlKGFuc3dlciA9PiB7XHJcbiAgICAgICAgICB0aGlzLmN1cnJlbnRDYWNoZS5vYmplY3RzID0gdGhpcy5jdXJyZW50Q2FjaGUub2JqZWN0cy5jb25jYXQoYW5zd2VyLmxpc3QpO1xyXG4gICAgICAgICAgdGhpcy5jdXJyZW50Q2FjaGUuY291bnRFbGVtZW50ID0gYW5zd2VyLmhlYWRlcnNbJ2NvdW50J107XHJcbiAgICAgICAgICB0aGlzLmN1cnJlbnRDYWNoZS5jb3VudFBhZ2VzID0gTWF0aC5jZWlsKHRoaXMuY3VycmVudENhY2hlLmNvdW50RWxlbWVudCAvIHRoaXMuY291bnRPblBhZ2UpO1xyXG4gICAgICAgIH0sICgpID0+IHsgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyB1cGRhdGVPcHRpb25zSW5EZWxheSgpOiB2b2lkIHtcclxuICAgIGxldCBkZWxheU1zOiBudW1iZXIgPSB0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgQXJyYXkgPyAxMCA6IHRoaXMud2FpdFRpbWU7XHJcblxyXG4gICAgLy8gZXhlY3V0aW5nIGFmdGVyIHVzZXIgc3RvcHBlZCB0eXBpbmdcclxuICAgIHRoaXMuZGVsYXkoKCkgPT4ge1xyXG4gICAgICB0aGlzLm9sZFF1ZXJ5ID0gdGhpcy5xdWVyeTtcclxuICAgICAgdGhpcy5jdXJyZW50Q2FjaGUgPSB0aGlzLkdldENhY2hlKHRoaXMucXVlcnkpO1xyXG4gICAgICB0aGlzLnVwZGF0ZU9wdGlvbnMoKTtcclxuICAgIH0sIGRlbGF5TXMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBmb2N1c1NlbGVjdGVkT3B0aW9uKCk6IHZvaWQge1xyXG4gICAgbGV0IGxpc3Q6IGFueSA9IDxIVE1MRWxlbWVudD50aGlzLmVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NlbGVjdC1kcm9wZG93bicpWzBdO1xyXG4gICAgbGV0IHRhcmdldExpOiBhbnkgPSA8SFRNTEVsZW1lbnQ+dGhpcy5lbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXAtb3B0aW9uJylbdGhpcy5zZWxlY3RvclBvc2l0aW9uXTtcclxuICAgIHNjcm9sbEFjdGl2ZU9wdGlvbihsaXN0LCB0YXJnZXRMaSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMga2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLk9wdGlvbnMpIHtcclxuICAgICAgdGhpcy5zaG93RHJvcGRvd25MaXN0KHVuZGVmaW5lZCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdG90YWxOdW1JdGVtOiBudW1iZXIgPSB0aGlzLk9wdGlvbnMubGVuZ3RoO1xyXG5cclxuICAgIGlmICh0aGlzLlNob3dOZXcpIHtcclxuICAgICAgdG90YWxOdW1JdGVtKys7XHJcbiAgICB9XHJcblxyXG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XHJcbiAgICAgIGNhc2UgMjc6IC8vIEVTQywgaGlkZSBhdXRvIGNvbXBsZXRlXHJcbiAgICAgICAgdGhpcy5oaWRlRHJvcGRvd25MaXN0KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDM4OiAvLyBVUCwgc2VsZWN0IHRoZSBwcmV2aW91cyBsaSBlbFxyXG4gICAgICAgIHRoaXMuc2VsZWN0b3JQb3NpdGlvbiA9ICh0b3RhbE51bUl0ZW0gKyB0aGlzLnNlbGVjdG9yUG9zaXRpb24gLSAxKSAlIHRvdGFsTnVtSXRlbTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgNDA6IC8vIERPV04sIHNlbGVjdCB0aGUgbmV4dCBsaSBlbCBvciB0aGUgZmlyc3Qgb25lXHJcbiAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0b3JQb3NpdGlvbiA9ICh0b3RhbE51bUl0ZW0gKyB0aGlzLnNlbGVjdG9yUG9zaXRpb24gKyAxKSAlIHRvdGFsTnVtSXRlbTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMTM6IC8vIEVOVEVSLCBjaG9vc2UgaXQhIVxyXG4gICAgICAgIGlmICh0b3RhbE51bUl0ZW0gPiAwKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5zZWxlY3RvclBvc2l0aW9uID09PSB0aGlzLk9wdGlvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQWRkTmV3T2JqZWN0KHRoaXMuQ3JlYXRlTmV3KHRoaXMucXVlcnkpKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0T25lKGV2ZW50LCB0aGlzLk9wdGlvbnNbdGhpcy5zZWxlY3RvclBvc2l0aW9uXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLlNob3dOZXcpIHtcclxuICAgICAgICAgIHRoaXMuQWRkTmV3T2JqZWN0KHRoaXMuQ3JlYXRlTmV3KHRoaXMucXVlcnkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBkZWZhdWx0OiBicmVhaztcclxuICAgIH1cclxuICAgIHRoaXMuZm9jdXNTZWxlY3RlZE9wdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5leHRQYWdlKCRldmVudDogRXZlbnQpOiB2b2lkIHtcclxuICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIC8vIFZhbGlkYXRvcnNcclxuICAgIGlmICghKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBGdW5jdGlvbikpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdEYXRhIExpc3QgbWFzdCBiZSBGdW5jdGlvbicpO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLmN1cnJlbnRDYWNoZSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZvciBuZXh0IHBhZ2UgbmVlZCBjYWNoZSBmb3IgZmlyc3QgUGFnZScpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuY3VycmVudENhY2hlLmN1cnJlbnRQYWdlID49IHRoaXMuY3VycmVudENhY2hlLmNvdW50UGFnZXMpIHsgdGhyb3cgbmV3IEVycm9yKCdNYXggUGFnZSBMaW1pdCcpOyB9XHJcblxyXG4gICAgaWYgKHRoaXMuZGF0YUxpc3RTdWIpIHsgdGhpcy5kYXRhTGlzdFN1Yi51bnN1YnNjcmliZSgpOyB9XHJcblxyXG4gICAgbGV0IHBhcmFtczogYW55ID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5hZGRpdGlvbmFsRmlsdGVyKTtcclxuICAgIHBhcmFtc1t0aGlzLnNlYXJjaFByb3BlcnR5XSA9IHRoaXMucXVlcnk7XHJcblxyXG4gICAgdGhpcy5kYXRhTGlzdFN1YiA9IHRoaXMuZGF0YUxpc3QocGFyYW1zLCB0aGlzLmN1cnJlbnRDYWNoZS5jdXJyZW50UGFnZSArIDEsIHRoaXMuY291bnRPblBhZ2UpLnN1YnNjcmliZShhbnN3ZXIgPT4ge1xyXG4gICAgICB0aGlzLmN1cnJlbnRDYWNoZS5jdXJyZW50UGFnZSsrO1xyXG4gICAgICB0aGlzLmN1cnJlbnRDYWNoZS5jb3VudEVsZW1lbnQgPSBhbnN3ZXIuaGVhZGVyc1snY291bnQnXTtcclxuICAgICAgdGhpcy5jdXJyZW50Q2FjaGUuY291bnRQYWdlcyA9IE1hdGguY2VpbCh0aGlzLmN1cnJlbnRDYWNoZS5jb3VudEVsZW1lbnQgLyB0aGlzLmNvdW50T25QYWdlKTtcclxuICAgICAgdGhpcy5jdXJyZW50Q2FjaGUub2JqZWN0cyA9IHRoaXMuY3VycmVudENhY2hlLm9iamVjdHMuY29uY2F0KGFuc3dlci5saXN0KTtcclxuICAgICAgdGhpcy5zZWxlY3RvclBvc2l0aW9uID0gKHRoaXMuY3VycmVudENhY2hlLmN1cnJlbnRQYWdlIC0gMSkgKiB0aGlzLmNvdW50T25QYWdlICsgMTtcclxuICAgICAgdGhpcy5mb2N1c1NlbGVjdGVkT3B0aW9uKCk7XHJcbiAgICB9LCAoKSA9PiB7IH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gTU9ERUxcclxuICBwcml2YXRlIGNsZWFyUHJvcGVydHkoKTogdm9pZCB7XHJcbiAgICB0aGlzLnNlbGVjdG9yUG9zaXRpb24gPSAwO1xyXG4gICAgdGhpcy5xdWVyeSA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZWxlY3RPbmUoJGV2ZW50OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCwgZGF0YTogYW55KTogdm9pZCB7XHJcbiAgICAvLyDQpNC40LvRjNGC0YAg0L3QtdC90YPQttC90YvRhSDRgdC+0LHRi9GC0LjQuVxyXG4gICAgaWYgKCRldmVudCBpbnN0YW5jZW9mIE1vdXNlRXZlbnQgJiYgJGV2ZW50LmJ1dHRvbiAhPT0gMCkgeyByZXR1cm47IH1cclxuXHJcbiAgICBpZiAodGhpcy5tdWx0aXBsZSAmJiB0aGlzLm91dHB1dC5sZW5ndGggPCB0aGlzLm11bHRpcGxlTGltaXQpIHtcclxuICAgICAgdGhpcy5vdXRwdXQucHVzaChkYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoIXRoaXMubXVsdGlwbGUpIHtcclxuICAgICAgdGhpcy5vdXRwdXQgPSBbZGF0YV07XHJcbiAgICB9XHJcbiAgICB0aGlzLmNoYW5nZUZ1bGxNb2RlbC5lbWl0KHRoaXMub3V0cHV0KTtcclxuICAgIHRoaXMuTW9kZWwgPSB0aGlzLlZhbHVlRnJvbU91dHB1dDtcclxuICAgIHRoaXMuY2xlYXJQcm9wZXJ0eSgpO1xyXG4gICAgdGhpcy5oaWRlRHJvcGRvd25MaXN0KCk7XHJcbiAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9O1xyXG5cclxuICBwdWJsaWMgcmVtb3ZlT25lKGluZGV4OiBudW1iZXIsIGV2ZW50OiBFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICB0aGlzLm91dHB1dC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgdGhpcy5Nb2RlbCA9IHRoaXMuVmFsdWVGcm9tT3V0cHV0O1xyXG5cclxuICAgIC8vIHNldCBjbGFzc1xyXG4gICAgdGhpcy5vblRvdWNoZWQoKTtcclxuICAgIHRoaXMuaW5wdXRDb250cm9sLmNvbnRyb2wubWFya0FzVG91Y2hlZCgpO1xyXG5cclxuICAgIC8vIG9wZW4gZHJvcGRvd25cclxuICAgIGlmICh0aGlzLnJlcXVpcmVkKSB7XHJcbiAgICAgIHRoaXMuc2hvd0Ryb3Bkb3duTGlzdCh1bmRlZmluZWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gRk9STUFUVElOR1xyXG5cclxuICBwdWJsaWMgZ2V0IFNlbGVjdGVkVGVtcGxhdGUoKTogVGVtcGxhdGVSZWY8YW55PiB7XHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZFRlbXBsYXRlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkVGVtcGxhdGUudGVtcGxhdGVSZWY7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuYm90aFRlbXBsYXRlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmJvdGhUZW1wbGF0ZS50ZW1wbGF0ZVJlZjtcclxuICAgIH1cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IERyb3Bkb3duVGVtcGxhdGUoKTogVGVtcGxhdGVSZWY8YW55PiB7XHJcbiAgICBpZiAodGhpcy5kcm9wZG93blRlbXBsYXRlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmRyb3Bkb3duVGVtcGxhdGUudGVtcGxhdGVSZWY7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuYm90aFRlbXBsYXRlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmJvdGhUZW1wbGF0ZS50ZW1wbGF0ZVJlZjtcclxuICAgIH1cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TGlzdEZvcm1hdHRlZChkYXRhOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgbGV0IGZvcm1hdHRlcjogYW55ID0gdGhpcy5saXN0Rm9ybWF0dGVyIHx8IGRlZmF1bHRGb3JtYXR0ZXI7XHJcbiAgICByZXR1cm4gZm9ybWF0dGVyLmFwcGx5KHRoaXMsIFtkYXRhLCB0aGlzLnZpZXdQcm9wZXJ0eV0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldERyb3Bkb3duRm9ybWF0dGVkKGRhdGE6IGFueSk6IHN0cmluZyB7XHJcbiAgICBsZXQgZm9ybWF0dGVyOiBhbnkgPSB0aGlzLmRyb3Bkb3duRm9ybWF0dGVyIHx8IGRlZmF1bHRGb3JtYXR0ZXI7XHJcbiAgICByZXR1cm4gZm9ybWF0dGVyLmFwcGx5KHRoaXMsIFtkYXRhLCB0aGlzLnZpZXdQcm9wZXJ0eV0pO1xyXG4gIH1cclxuXHJcbiAgLy8gSU5JVFxyXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIC8vIHRoaXMuTW9kZWwgPSB0aGlzLlZhbHVlRnJvbU91dHB1dDsg0K3RgtC+INCy0YDQvtC00LUg0YLRg9GCINGC0L7QttC1INGD0LbQtSDQvdC1INC90LDQtNC+LlxyXG4gICAgdGhpcy5lbCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3ZpYm9yJykuaXRlbSgwKTtcclxuICAgIHRoaXMuaW5wdXRFbCA9IDxIVE1MSW5wdXRFbGVtZW50Pih0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25DaGFuZ2VzKGlucHV0czogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgaWYgKGlucHV0c1snZGF0YUxpc3QnXSAmJiBpbnB1dHNbJ2RhdGFMaXN0J10uY3VycmVudFZhbHVlKSB7XHJcbiAgICAgIC8vIE91dHB1dFxyXG4gICAgICBpZiAodGhpcy5Nb2RlbCA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuTW9kZWwgPT0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMub3V0cHV0ID0gW107XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VGdWxsTW9kZWwuZW1pdCh0aGlzLm91dHB1dCk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5Nb2RlbCBpbnN0YW5jZW9mIEFycmF5ICYmIHRoaXMubXVsdGlwbGUpIHtcclxuICAgICAgICB0aGlzLk91dHB1dCA9IHRoaXMuTW9kZWw7XHJcbiAgICAgIH0gZWxzZSBpZiAoISh0aGlzLk1vZGVsIGluc3RhbmNlb2YgQXJyYXkpICYmICF0aGlzLm11bHRpcGxlKSB7XHJcbiAgICAgICAgdGhpcy5PdXRwdXQgPSBbdGhpcy5Nb2RlbF07XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5vdXRwdXQgfHwgIXRoaXMub3V0cHV0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgdGhpcy5Nb2RlbCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoaW5wdXRzWydtdWx0aXBsZSddKSB7XHJcbiAgICAgIGlmIChpbnB1dHNbJ211bHRpcGxlJ10uY3VycmVudFZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCdtdWx0aXBsZScpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZSgnbXVsdGlwbGUnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChpbnB1dHNbJ2FkZGl0aW9uYWxGaWx0ZXInXSkge1xyXG4gICAgICB0aGlzLmN1cnJlbnRDYWNoZSA9IHRoaXMuR2V0Q2FjaGUodGhpcy5xdWVyeSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTERpdkVsZW1lbnQ+KSB7XHJcbiAgICB0aGlzLm91dHB1dCA9IFtdO1xyXG4gIH1cclxuXHJcbiAgLy8gRk9STVNcclxuICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XHJcbiAgICAvLyDQndC+0YDQvNCw0LvRjNC90YvQuSB1cGRhdGUg0LzQvtC00LXQu9C4XHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgaWYgKCh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5ICYmICF0aGlzLm11bHRpcGxlKSB8fCAoISh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSAmJiB0aGlzLm11bHRpcGxlKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTW9kZWwgVHlwZSBFcnJvcicpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5ICYmIHRoaXMuTW9kZWwgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IHRoaXMuTW9kZWwubGVuZ3RoICYmIHZhbHVlLmV2ZXJ5KHYgPT4gdGhpcy5Nb2RlbC5pbmRleE9mKHYpID49IDApKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuTW9kZWwgPT09IHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZmlyc3RMb2FkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5Nb2RlbCA9IHZhbHVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uQ2hhbmdlOiBhbnkgPSAoKSA9PiB7IH07XHJcbiAgcHVibGljIG9uVG91Y2hlZDogYW55ID0gKCkgPT4geyB9O1xyXG5cclxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICAgIGlmIChpc0Rpc2FibGVkKSB7XHJcbiAgICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5lbC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcbiAgICB9XHJcbiAgICAvLyBkaXNhYmxlIG90aGVyIGNvbXBvbmVudHMgaGVyZVxyXG4gIH1cclxuXHJcbiAgc2V0IE1vZGVsKHZhbHVlOiBhbnkpIHtcclxuICAgIGlmICh0aGlzLm9ubHlFbWl0dGVyKSB7XHJcbiAgICAgIHRoaXMub3V0cHV0ID0gW107XHJcbiAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gT3V0cHV0XHJcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMub3V0cHV0ID0gW107XHJcbiAgICAgIHRoaXMuY2hhbmdlRnVsbE1vZGVsLmVtaXQodGhpcy5vdXRwdXQpO1xyXG4gICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5ICYmIHRoaXMubXVsdGlwbGUpIHtcclxuICAgICAgdGhpcy5PdXRwdXQgPSB2YWx1ZTtcclxuICAgIH0gZWxzZSBpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSAmJiAhdGhpcy5tdWx0aXBsZSkge1xyXG4gICAgICB0aGlzLk91dHB1dCA9IFt2YWx1ZV07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTW9kZWxcclxuICAgIHRoaXMuX21vZGVsID0gdmFsdWU7XHJcblxyXG4gICAgLy8gRm9ybXNcclxuICAgIHRoaXMub25DaGFuZ2UodGhpcy5fbW9kZWwpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IE1vZGVsKCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5fbW9kZWw7XHJcbiAgfVxyXG5cclxuICAvLyBQUk9QRVJUWVxyXG4gIGdldCBJbnB1dEhpZGUoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5vdXRwdXQubGVuZ3RoID49IHRoaXMubXVsdGlwbGVMaW1pdDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm91dHB1dC5sZW5ndGggPT09IDEgJiYgIXRoaXMuaXNPcGVuO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IFZhbHVlRnJvbU91dHB1dCgpOiBhbnkge1xyXG4gICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcclxuICAgICAgbGV0IHRtcDogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgICBmb3IgKGxldCBvIG9mIHRoaXMub3V0cHV0KSB7XHJcbiAgICAgICAgdG1wLnB1c2goZmV0Y2hGcm9tT2JqZWN0KG8sIHRoaXMubW9kZWxQcm9wZXJ0eSkpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0bXA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZmV0Y2hGcm9tT2JqZWN0KHRoaXMub3V0cHV0WzBdLCB0aGlzLm1vZGVsUHJvcGVydHkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0IE91dHB1dChuZXdWYWx1ZTogQXJyYXk8YW55Pikge1xyXG4gICAgbGV0IGRhdGFMaXN0OiBBcnJheTxhbnk+ID0gW107XHJcbiAgICBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgIGRhdGFMaXN0ID0gdGhpcy5kYXRhTGlzdDtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgIGlmIChuZXdWYWx1ZSAmJiBuZXdWYWx1ZS5sZW5ndGggJiYgdGhpcy5maXJzdExvYWQpIHtcclxuICAgICAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcclxuICAgICAgICB0aGlzLmZpcnN0TG9hZCA9IGZhbHNlO1xyXG4gICAgICAgIGlmICghdGhpcy5wcmVsb2FkUHJvcGVydHkpIHtcclxuICAgICAgICAgIHRoaXMub3V0cHV0ID0gbmV3VmFsdWU7XHJcbiAgICAgICAgICB0aGlzLmNoYW5nZUZ1bGxNb2RlbC5lbWl0KHRoaXMub3V0cHV0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcGFyYW1zW3RoaXMucHJlbG9hZFByb3BlcnR5XSA9IG5ld1ZhbHVlLm1hcCh2YWwgPT4gZmV0Y2hGcm9tT2JqZWN0KHZhbCwgdGhpcy5wcmVsb2FkRmllbGQpKTtcclxuICAgICAgICAgIHRoaXMuZGF0YUxpc3RTdWIgPSAoPE9ic2VydmFibGU8SURhdGFSZXNwb25zZT4+dGhpcy5kYXRhTGlzdChwYXJhbXMsIDEsIHRoaXMuY291bnRPblBhZ2UpKS5zdWJzY3JpYmUoYW5zd2VyID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vdXRwdXQgPSBhbnN3ZXIubGlzdDtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VGdWxsTW9kZWwuZW1pdCh0aGlzLm91dHB1dCk7XHJcbiAgICAgICAgICB9LCAoKSA9PiB7IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmNoYW5nZUZ1bGxNb2RlbC5lbWl0KHRoaXMub3V0cHV0KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm47XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5kYXRhTGlzdCA9PT0gdW5kZWZpbmVkKSB7IHJldHVybjsgfVxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2RhdGFMaXN0IHZhbHVlIEVycm9yJyk7XHJcbiAgICB9XHJcbiAgICBsZXQgbmV3T3V0cHV0OiBBcnJheTxhbnk+ID0gW107XHJcbiAgICBmb3IgKGxldCB2IG9mIG5ld1ZhbHVlKSB7XHJcbiAgICAgIGZvciAobGV0IGQgb2YgZGF0YUxpc3QpIHtcclxuICAgICAgICBsZXQgYSA9IGZldGNoRnJvbU9iamVjdChkLCB0aGlzLm1vZGVsUHJvcGVydHkpID8gZmV0Y2hGcm9tT2JqZWN0KGQsIHRoaXMubW9kZWxQcm9wZXJ0eSkudmFsdWVPZigpIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIGxldCBiID0gdiA/IHYudmFsdWVPZigpIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIGlmIChkZWVwRXF1YWwoYSwgYikpIHtcclxuICAgICAgICAgIG5ld091dHB1dC5wdXNoKGQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5vdXRwdXQgPSBuZXdPdXRwdXQ7XHJcbiAgICB0aGlzLmNoYW5nZUZ1bGxNb2RlbC5lbWl0KHRoaXMub3V0cHV0KTtcclxuICB9XHJcblxyXG4gIGdldCBPcHRpb25zKCk6IEFycmF5PGFueT4ge1xyXG4gICAgbGV0IG9wdGlvbnM6IEFycmF5PGFueT47XHJcbiAgICBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICBsZXQgb2xkQ2FjaGUgPSB0aGlzLkdldENhY2hlKHRoaXMub2xkUXVlcnkpO1xyXG5cclxuICAgICAgaWYgKCF0aGlzLmN1cnJlbnRDYWNoZSAmJiBvbGRDYWNoZSkge1xyXG4gICAgICAgIG9wdGlvbnMgPSBvbGRDYWNoZS5vYmplY3RzO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG9wdGlvbnMgPSB0aGlzLmN1cnJlbnRDYWNoZSA/IHRoaXMuY3VycmVudENhY2hlLm9iamVjdHMgOiBbXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIChvcHRpb25zIHx8IFtdKS5maWx0ZXIob3AgPT4ge1xyXG4gICAgICByZXR1cm4gdGhpcy5vdXRwdXQuZmluZEluZGV4KG8gPT4ge1xyXG4gICAgICAgIGxldCBhID0gZmV0Y2hGcm9tT2JqZWN0KG8sIHRoaXMubW9kZWxQcm9wZXJ0eSkgPyBmZXRjaEZyb21PYmplY3QobywgdGhpcy5tb2RlbFByb3BlcnR5KS52YWx1ZU9mKCkgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgbGV0IGIgPSBmZXRjaEZyb21PYmplY3Qob3AsIHRoaXMubW9kZWxQcm9wZXJ0eSkgPyBmZXRjaEZyb21PYmplY3Qob3AsIHRoaXMubW9kZWxQcm9wZXJ0eSkudmFsdWVPZigpIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIHJldHVybiBkZWVwRXF1YWwoYSwgYik7XHJcbiAgICAgIH0pID09PSAtMTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGN1cnJlbnRDYWNoZTogQ2FjaGVJbmZvO1xyXG4gIHByaXZhdGUgR2V0Q2FjaGUocXVlcnk6IHN0cmluZyk6IENhY2hlSW5mbyB7XHJcbiAgICBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNhY2hlTGF6eURhdGEuZmluZChjYWNoZSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGNhY2hlLnF1ZXJ5ID09PSB0aGlzLnF1ZXJ5ICYmIGRlZXBFcXVhbChjYWNoZS5wYXJhbXMsIHRoaXMuYWRkaXRpb25hbEZpbHRlcik7XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLy8gQ3JlYXRlTmV3XHJcblxyXG4gIHB1YmxpYyBBZGROZXdPYmplY3QodmFsdWU6IE9ic2VydmFibGU8YW55PiB8IGFueSk6IHZvaWQge1xyXG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgT2JzZXJ2YWJsZSkge1xyXG4gICAgICB2YWx1ZS5zdWJzY3JpYmUobmV3T2JqZWN0ID0+IHtcclxuICAgICAgICBpZiAobmV3T2JqZWN0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHRoaXMuU2V0TmV3T2JqZWN0KG5ld09iamVjdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2V0TmV3T2JqZWN0KHZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgU2V0TmV3T2JqZWN0KG5ld09iamVjdDogYW55KSB7XHJcbiAgICBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgIHRoaXMuZGF0YUxpc3QucHVzaChuZXdPYmplY3QpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgZm9yIChsZXQgY2FjaGUgb2YgdGhpcy5jYWNoZUxhenlEYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucXVlcnkuaW5jbHVkZXMoY2FjaGUucXVlcnkpIHx8IGNhY2hlLnF1ZXJ5ID09PSB1bmRlZmluZWQgfHwgY2FjaGUucXVlcnkgPT09ICcnKSB7XHJcbiAgICAgICAgICBjYWNoZS5jb3VudEVsZW1lbnQrKztcclxuICAgICAgICAgIGNhY2hlLm9iamVjdHMucHVzaChuZXdPYmplY3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZmlyc3RMb2FkID0gZmFsc2U7XHJcbiAgICB0aGlzLnF1ZXJ5ID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5jdXJyZW50Q2FjaGUgPSB0aGlzLkdldENhY2hlKHRoaXMucXVlcnkpO1xyXG4gICAgdGhpcy5zZWxlY3RPbmUobmV3IE1vdXNlRXZlbnQoJ2NsaWNrJyksIG5ld09iamVjdCk7XHJcbiAgfVxyXG5cclxuICBnZXQgU2hvd05ldygpOiBib29sZWFuIHtcclxuICAgIGxldCBhID0gdGhpcy5xdWVyeSAmJiB0aGlzLm5ld01lc3NhZ2UgJiYgKCF0aGlzLmRhdGFMaXN0U3ViIHx8IHRoaXMuZGF0YUxpc3RTdWIuY2xvc2VkKTtcclxuXHJcbiAgICBsZXQgYiA9IHRoaXMuT3B0aW9ucy5maW5kSW5kZXgobyA9PiB7XHJcbiAgICAgIGxldCBjID0gZmV0Y2hGcm9tT2JqZWN0KG8sIHRoaXMudmlld1Byb3BlcnR5KSA/IGZldGNoRnJvbU9iamVjdChvLCB0aGlzLnZpZXdQcm9wZXJ0eSkudmFsdWVPZigpIDogdW5kZWZpbmVkO1xyXG4gICAgICByZXR1cm4gZGVlcEVxdWFsKGMsIHRoaXMucXVlcnkpO1xyXG4gICAgfSkgPT09IC0xICYmIHRoaXMub3V0cHV0LmZpbmRJbmRleChvID0+IHtcclxuICAgICAgbGV0IGMgPSBmZXRjaEZyb21PYmplY3QobywgdGhpcy52aWV3UHJvcGVydHkpID8gZmV0Y2hGcm9tT2JqZWN0KG8sIHRoaXMudmlld1Byb3BlcnR5KS52YWx1ZU9mKCkgOiB1bmRlZmluZWQ7XHJcbiAgICAgIHJldHVybiBkZWVwRXF1YWwoYywgdGhpcy5xdWVyeSk7XHJcbiAgICB9KSA9PT0gLTE7XHJcblxyXG4gICAgcmV0dXJuIGEgJiYgYjtcclxuICB9XHJcblxyXG4gIGdldCBTaG93RW1wdHkoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5PcHRpb25zLmxlbmd0aCA9PT0gMCAmJiAoISh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgRnVuY3Rpb24pIHx8ICh0aGlzLmRhdGFMaXN0U3ViLmNsb3NlZCkpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIENBQ0hFXHJcbiAgcHJpdmF0ZSBjYWNoZUxhenlEYXRhOiBBcnJheTxDYWNoZUluZm8+ID0gW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ2FjaGVJbmZvIHtcclxuICBjb3VudEVsZW1lbnQ6IG51bWJlcjtcclxuICBjb3VudFBhZ2VzOiBudW1iZXI7XHJcbiAgY3VycmVudFBhZ2U6IG51bWJlcjtcclxuICBvYmplY3RzOiBBcnJheTxhbnk+O1xyXG5cclxuICBxdWVyeTogc3RyaW5nO1xyXG4gIHBhcmFtczogYW55O1xyXG59XHJcbiJdfQ==