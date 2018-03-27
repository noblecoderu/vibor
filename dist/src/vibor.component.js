"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var Observable_1 = require("rxjs/Observable");
var vibor_template_directive_1 = require("./vibor.template.directive");
var helpers_1 = require("./helpers");
var deepEqual = require('deep-equal');
var template = "\n  <ng-content></ng-content>\n\n  <div class=\"select-search\" (click)=\"showDropdownList($event);\">\n      <ul class=\"select-search-list\">\n            <ng-container *ngIf=\"multiple || !isOpen\">\n              <ng-container *ngIf=\"!SelectedTemplate; else selectedT\">\n                  <li class=\"select-search-list-item select-search-list-item_selection\"\n                      *ngFor=\"let item of output; let $index=index; let $last=last; trackBy: TrackByFn;\"\n                      [class.focused]=\"backspaceFocus && last\">\n                      <div [innerHTML]=\"getListFormatted(item)\"></div>\n                      <a class=\"select-search-list-item_remove\" *ngIf=\"allowReset\" (click)=\"!disabled && removeOne($index, $event)\"></a>\n                  </li>\n              </ng-container>\n\n              <ng-template #selectedT>\n                  <li class=\"select-search-list-item select-search-list-item_selection\"\n                      *ngFor=\"let item of output; let $index=index; let $last=last; trackBy: TrackByFn;\"\n                      [class.focused]=\"backspaceFocus && last\">\n                        <ng-container *ngTemplateOutlet=\"SelectedTemplate; context: {item: item}\"></ng-container>\n                        <a class=\"select-search-list-item_remove\"\n                           *ngIf=\"allowReset && !disabled\"\n                           (click)=\"!disabled && removeOne($index, $event)\">\n                        </a>\n                  </li>\n              </ng-template>\n            </ng-container>\n\n            <li class=\"select-search-list-item select-search-list-item_input\"\n                [class.select-search-list-item_hide]=\"InputHide\">\n                <input autocomplete=\"off\"\n                       #inputControl=\"ngModel\"\n                       [name]=\"name\"\n                       [disabled]=\"disabled\"\n                       [(ngModel)]=\"query\"\n                       [placeholder]=\"output.length == 0 || (multiple && output.length < multipleLimit) ? placeholder : ''\"\n                       (input)=\"updateOptionsInDelay()\"\n                       (blur)=\"hideDropdownListWithDelay()\"\n                       (keydown)=\"keyDown($event)\"/>\n            </li>\n            <li class=\"select-search-list-item select-search-list-item_loader-center\" [hidden]=\"!dataListSub || dataListSub.closed\">\n                <div class=\"select-search-list-item_loader\"></div>\n            </li>\n\n            <span class=\"arrow\" (click)=\"toggleDropdown($event)\">\n            </span>\n        </ul>\n    </div>\n\n    <div class=\"select-dropdown\" *ngIf=\"isOpen\">\n        <ul class=\"select-dropdown-optgroup\">\n            <ng-container *ngIf=\"!DropdownTemplate; else dropdownT\">\n                <li class=\"select-dropdown-optgroup-option\"\n                    *ngFor=\"let option of Options; let i=index\"\n                    (mousedown)=\"selectOne($event, option)\"\n                    [class.active]=\"i === selectorPosition\"\n                    [innerHTML]=\"getDropdownFormatted(option)\">\n                </li>\n            </ng-container>\n\n            <ng-template #dropdownT>\n                <li class=\"select-dropdown-optgroup-option\"\n                    *ngFor=\"let option of Options; let i=index\"\n                    (mousedown)=\"selectOne($event, option)\"\n                    [class.active]=\"i === selectorPosition\">\n                    <ng-container *ngTemplateOutlet=\"DropdownTemplate; context: {item: option}\"></ng-container>\n                </li>\n            </ng-template>\n\n            <li class=\"select-dropdown-optgroup-option loader\" *ngIf=\"dataListSub && !dataListSub.closed\">\n                \u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430\n            </li>\n            <li class=\"select-dropdown-optgroup-option loader\"\n                (mousedown)=\"AddNewObject(CreateNew(query));\"\n                [class.active]=\"selectorPosition === Options.length\"\n                *ngIf=\"ShowNew\">\n\n                <ng-container *ngIf=\"createTemplate; else templateWithMessage\">\n                    <ng-container *ngTemplateOutlet=\"createTemplate.templateRef; context: {query: query}\"></ng-container>\n                </ng-container>\n\n                <ng-template #templateWithMessage>\n                    {{ newMessage }}\n                </ng-template>\n            </li>\n            <li class=\"select-dropdown-optgroup-option loader\" *ngIf=\"ShowEmpty\">\n                \u041F\u0443\u0441\u0442\u043E\n            </li>\n        </ul>\n        <div class=\"select-dropdown-pager\" *ngIf=\"currentCache && currentCache.countPages > 1\">\n            <p class=\"select-dropdown-pager-page\">\n                {{ currentCache.currentPage | number }} / {{ currentCache.countPages | number }}\n            </p>\n            <button\n                class=\"select-dropdown-pager-loadmore\"\n                    *ngIf=\"currentCache.countPages > 1 && currentCache.currentPage < currentCache.countPages\"\n                    (mousedown)=\"nextPage($event)\">\n                \u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0435\u0449\u0451\n            </button>\n        </div>\n    </div>";
var ViborComponent = (function () {
    function ViborComponent(elementRef) {
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
        this.viewProperty = 'Name'; // Поле для дефолтного отображения
        this.modelProperty = 'id'; // То, что записывается в Модель
        this.preloadProperty = 'ids'; // Ключ запроса к серверу для предзагрузки, если undefined записывается весь объект
        this.preloadField = undefined; // Значение поля, которе необходимо отправить в запрос.
        this.searchProperty = 'query';
        this.additionalFilter = {};
        this.changeFullModel = new core_1.EventEmitter();
        this.newMessage = undefined;
        this.CreateNew = function (query) {
            return query;
        };
        this.delay = (function () {
            var timer = 0;
            return function (callback, ms) {
                clearTimeout(timer);
                timer = setTimeout(callback, ms);
            };
        })();
        this.onChange = function () { };
        this.onTouched = function () { };
        // CACHE
        this.cacheLazyData = [];
        this.el = elementRef.nativeElement;
        this.output = [];
    }
    // OPTIONS
    ViborComponent.prototype.TrackByFn = function (index) {
        return index;
    };
    ViborComponent.prototype.showDropdownList = function (event) {
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
    ViborComponent.prototype.hideDropdownList = function () {
        this.el.classList.remove('open-vibor');
        this.isOpen = false;
        this.inputEl.blur();
    };
    ViborComponent.prototype.hideDropdownListWithDelay = function () {
        var _this = this;
        setTimeout(function () {
            _this.hideDropdownList();
        }, 100);
    };
    ViborComponent.prototype.toggleDropdown = function (event) {
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
    ViborComponent.prototype.updateOptions = function () {
        var _this = this;
        this.isOpen = true;
        if (this.dataList instanceof Array) {
            this.options = this.dataList.filter(function (data) {
                if (!_this.query || _this.query.length === 0) {
                    return true;
                }
                var f = helpers_1.fetchFromObject(data, _this.searchProperty);
                if (f === undefined) {
                    return false;
                }
                return JSON.stringify(f).indexOf(_this.query) >= 0;
            }).filter(function (data) {
                if (!_this.excludeList) {
                    return true;
                }
                var d = helpers_1.fetchFromObject(data, _this.modelProperty).valueOf();
                return _this.excludeList.findIndex(function (ex) {
                    var a = helpers_1.fetchFromObject(ex, _this.modelProperty).valueOf();
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
                var params = Object.assign({}, this.additionalFilter);
                params[this.searchProperty] = this.query;
                this.dataListSub = this.dataList(params, 1, this.countOnPage).subscribe(function (answer) {
                    _this.currentCache.objects = _this.currentCache.objects.concat(answer.list);
                    _this.currentCache.countElement = answer.headers['count'];
                    _this.currentCache.countPages = Math.ceil(_this.currentCache.countElement / _this.countOnPage);
                }, function () { });
            }
        }
    };
    ViborComponent.prototype.updateOptionsInDelay = function () {
        var _this = this;
        var delayMs = this.dataList instanceof Array ? 10 : this.waitTime;
        // executing after user stopped typing
        this.delay(function () {
            _this.oldQuery = _this.query;
            _this.currentCache = _this.GetCache(_this.query);
            _this.updateOptions();
        }, delayMs);
    };
    ViborComponent.prototype.focusSelectedOption = function () {
        var list = this.el.getElementsByClassName('select-dropdown')[0];
        var targetLi = this.el.getElementsByClassName('select-dropdown-optgroup-option')[this.selectorPosition];
        helpers_1.scrollActiveOption(list, targetLi);
    };
    ViborComponent.prototype.keyDown = function (event) {
        if (!this.Options) {
            this.showDropdownList(undefined);
            return;
        }
        var totalNumItem = this.Options.length;
        if (this.ShowNew) {
            totalNumItem++;
        }
        switch (event.keyCode) {
            case 27:
                this.hideDropdownList();
                break;
            case 38:
                this.selectorPosition = (totalNumItem + this.selectorPosition - 1) % totalNumItem;
                break;
            case 40:
                this.isOpen = true;
                this.selectorPosition = (totalNumItem + this.selectorPosition + 1) % totalNumItem;
                break;
            case 13:
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
    ViborComponent.prototype.nextPage = function ($event) {
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
        var params = Object.assign({}, this.additionalFilter);
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
    // MODEL
    ViborComponent.prototype.clearProperty = function () {
        this.selectorPosition = 0;
        this.query = undefined;
    };
    ViborComponent.prototype.selectOne = function ($event, data) {
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
    ViborComponent.prototype.removeOne = function (index, event) {
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
    Object.defineProperty(ViborComponent.prototype, "SelectedTemplate", {
        // FORMATTING
        get: function () {
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
    Object.defineProperty(ViborComponent.prototype, "DropdownTemplate", {
        get: function () {
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
    ViborComponent.prototype.getListFormatted = function (data) {
        var formatter = this.listFormatter || helpers_1.defaultFormatter;
        return formatter.apply(this, [data, this.viewProperty]);
    };
    ViborComponent.prototype.getDropdownFormatted = function (data) {
        var formatter = this.dropdownFormatter || helpers_1.defaultFormatter;
        return formatter.apply(this, [data, this.viewProperty]);
    };
    // INIT
    ViborComponent.prototype.ngOnInit = function () {
        // this.Model = this.ValueFromOutput; Это вроде тут тоже уже не надо.
        this.inputEl = (this.el.querySelector('input'));
    };
    ViborComponent.prototype.ngOnChanges = function (inputs) {
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
    // FORMS
    ViborComponent.prototype.writeValue = function (value) {
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
    ViborComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    ViborComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    ViborComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
        if (isDisabled) {
            this.el.setAttribute('disabled', 'disabled');
        }
        else {
            this.el.removeAttribute('disabled');
        }
        // disable other components here
    };
    Object.defineProperty(ViborComponent.prototype, "Model", {
        get: function () {
            return this._model;
        },
        set: function (value) {
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
    Object.defineProperty(ViborComponent.prototype, "InputHide", {
        // PROPERTY
        get: function () {
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
    Object.defineProperty(ViborComponent.prototype, "ValueFromOutput", {
        get: function () {
            if (this.multiple) {
                var tmp = [];
                for (var _i = 0, _a = this.output; _i < _a.length; _i++) {
                    var o = _a[_i];
                    tmp.push(helpers_1.fetchFromObject(o, this.modelProperty));
                }
                return tmp;
            }
            else {
                return helpers_1.fetchFromObject(this.output[0], this.modelProperty);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViborComponent.prototype, "Output", {
        set: function (newValue) {
            var _this = this;
            var dataList = [];
            if (this.dataList instanceof Array) {
                dataList = this.dataList;
            }
            else if (this.dataList instanceof Function) {
                if (newValue && newValue.length && this.firstLoad) {
                    var params = {};
                    this.firstLoad = false;
                    if (!this.preloadProperty) {
                        this.output = newValue;
                        this.changeFullModel.emit(this.output);
                    }
                    else {
                        params[this.preloadProperty] = newValue.map(function (val) { return helpers_1.fetchFromObject(val, _this.preloadField); });
                        this.dataListSub = this.dataList(params, 1, this.countOnPage).subscribe(function (answer) {
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
            var newOutput = [];
            for (var _i = 0, newValue_1 = newValue; _i < newValue_1.length; _i++) {
                var v = newValue_1[_i];
                for (var _a = 0, dataList_1 = dataList; _a < dataList_1.length; _a++) {
                    var d = dataList_1[_a];
                    var a = helpers_1.fetchFromObject(d, this.modelProperty) ? helpers_1.fetchFromObject(d, this.modelProperty).valueOf() : undefined;
                    var b = v ? v.valueOf() : undefined;
                    if (deepEqual(a, b)) {
                        newOutput.push(d);
                    }
                }
            }
            this.output = newOutput;
            this.changeFullModel.emit(this.output);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViborComponent.prototype, "Options", {
        get: function () {
            var _this = this;
            var options;
            if (this.dataList instanceof Array) {
                options = this.options;
            }
            else if (this.dataList instanceof Function) {
                var oldCache = this.GetCache(this.oldQuery);
                if (!this.currentCache && oldCache) {
                    options = oldCache.objects;
                }
                else {
                    options = this.currentCache ? this.currentCache.objects : [];
                }
            }
            return (options || []).filter(function (op) {
                return _this.output.findIndex(function (o) {
                    var a = helpers_1.fetchFromObject(o, _this.modelProperty) ? helpers_1.fetchFromObject(o, _this.modelProperty).valueOf() : undefined;
                    var b = helpers_1.fetchFromObject(op, _this.modelProperty) ? helpers_1.fetchFromObject(op, _this.modelProperty).valueOf() : undefined;
                    return deepEqual(a, b);
                }) === -1;
            });
        },
        enumerable: true,
        configurable: true
    });
    ViborComponent.prototype.GetCache = function (query) {
        var _this = this;
        if (this.dataList instanceof Function) {
            return this.cacheLazyData.find(function (cache) {
                return cache.query === _this.query && deepEqual(cache.params, _this.additionalFilter);
            });
        }
        return undefined;
    };
    // CreateNew
    ViborComponent.prototype.AddNewObject = function (value) {
        var _this = this;
        if (value instanceof Observable_1.Observable) {
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
    ViborComponent.prototype.SetNewObject = function (newObject) {
        if (this.dataList instanceof Array) {
            this.dataList.push(newObject);
        }
        else if (this.dataList instanceof Function) {
            for (var _i = 0, _a = this.cacheLazyData; _i < _a.length; _i++) {
                var cache = _a[_i];
                if (this.query.includes(cache.query) || cache.query === undefined || cache.query === '') {
                    cache.countElement++;
                    cache.objects.push(newObject);
                }
            }
        }
        this.selectOne(new MouseEvent('click'), newObject);
    };
    Object.defineProperty(ViborComponent.prototype, "ShowNew", {
        get: function () {
            var _this = this;
            var a = this.query && this.newMessage && (!this.dataListSub || this.dataListSub.closed);
            var b = this.Options.findIndex(function (o) {
                var c = helpers_1.fetchFromObject(o, _this.viewProperty) ? helpers_1.fetchFromObject(o, _this.viewProperty).valueOf() : undefined;
                return deepEqual(c, _this.query);
            }) === -1 && this.output.findIndex(function (o) {
                var c = helpers_1.fetchFromObject(o, _this.viewProperty) ? helpers_1.fetchFromObject(o, _this.viewProperty).valueOf() : undefined;
                return deepEqual(c, _this.query);
            }) === -1;
            return a && b;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViborComponent.prototype, "ShowEmpty", {
        get: function () {
            return this.Options.length === 0 && (!(this.dataList instanceof Function) || (this.dataListSub.closed));
        },
        enumerable: true,
        configurable: true
    });
    return ViborComponent;
}());
ViborComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'vibor',
                template: template,
                providers: [{
                        provide: forms_1.NG_VALUE_ACCESSOR,
                        useExisting: core_1.forwardRef(function () { return ViborComponent; }),
                        multi: true
                    }]
            },] },
];
/** @nocollapse */
ViborComponent.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
]; };
ViborComponent.propDecorators = {
    'inputControl': [{ type: core_1.ViewChild, args: ['inputControl',] },],
    'multiple': [{ type: core_1.Input },],
    'multipleLimit': [{ type: core_1.Input },],
    'countOnPage': [{ type: core_1.Input },],
    'placeholder': [{ type: core_1.Input },],
    'name': [{ type: core_1.Input },],
    'required': [{ type: core_1.Input },],
    'allowReset': [{ type: core_1.Input },],
    'bothTemplate': [{ type: core_1.ContentChild, args: [vibor_template_directive_1.ViborBothDirective,] },],
    'dropdownTemplate': [{ type: core_1.ContentChild, args: [vibor_template_directive_1.ViborDropdownDirective,] },],
    'selectedTemplate': [{ type: core_1.ContentChild, args: [vibor_template_directive_1.ViborSelectedDirective,] },],
    'createTemplate': [{ type: core_1.ContentChild, args: [vibor_template_directive_1.ViborCreateDirective,] },],
    'listFormatter': [{ type: core_1.Input },],
    'dropdownFormatter': [{ type: core_1.Input },],
    'viewProperty': [{ type: core_1.Input },],
    'modelProperty': [{ type: core_1.Input },],
    'preloadProperty': [{ type: core_1.Input },],
    'preloadField': [{ type: core_1.Input },],
    'searchProperty': [{ type: core_1.Input },],
    'dataList': [{ type: core_1.Input },],
    'excludeList': [{ type: core_1.Input },],
    'additionalFilter': [{ type: core_1.Input },],
    'onlyEmitter': [{ type: core_1.Input },],
    'changeFullModel': [{ type: core_1.Output, args: ['changeFullModel',] },],
    'newMessage': [{ type: core_1.Input },],
    'CreateNew': [{ type: core_1.Input },],
};
exports.ViborComponent = ViborComponent;
//# sourceMappingURL=vibor.component.js.map