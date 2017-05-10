"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var helpers_1 = require("./helpers");
var deepEqual = require('deep-equal');
var template = "\n  <ng-content></ng-content>   \n  <div class=\"select-search\"> \n      <ul class=\"select-search-list\"> \n            <ng-container *ngIf=\"!templates.first\">\n                <li class=\"select-search-list-item select-search-list-item_selection\"\n                    *ngFor=\"let item of output; let $index=index; let $last=last; trackBy: TrackByFn;\"\n                    [class.focused]=\"backspaceFocus && last\"\n                    (click)=\"!disabled && removeOne($index)\"\n                    [innerHTML]=\"getListFormatted(item)\">\n                </li>\n            </ng-container>\n\n            <ng-container *ngIf=\"templates.first\">\n                <li class=\"select-search-list-item select-search-list-item_selection\"\n                    *ngFor=\"let item of output; let $index=index; let $last=last; trackBy: TrackByFn;\"\n                    [class.focused]=\"backspaceFocus && last\"\n                    (click)=\"!disabled && removeOne($index)\">\n                    <ng-container *ngTemplateOutlet=\"BothTemplat; context: item\"></ng-container>\n                </li>\n            </ng-container>\n\n            <li class=\"select-search-list-item select-search-list-item_input\"\n                [class.select-search-list-item_hide]=\"InputHide\">\n                <input autocomplete=\"off\"\n                       #inputControl=\"ngModel\" \n                       [name]=\"name\"\n                       [disabled]=\"disabled\"\n                       [required]=\"required\"\n                       [(ngModel)]=\"query\"\n                       [placeholder]=\"output.length == 0 ? placeholder : ''\"\n                       (input)=\"updateOptionsInDelay()\"\n                       (blur)=\"hideDropdownList()\"\n                       (focus)=\"showDropdownList()\"\n                       (keydown)=\"keyDown($event)\"/>\n            </li>\n            <li class=\"select-search-list-item\" [hidden]=\"!dataListSub || dataListSub.closed\">\n                <div class=\"select-search-list-item_loader\"></div>\n            </li>\n    \n        </ul>\n    </div>\n    <div class=\"select-dropdown\" *ngIf=\"isOpen\">\n        <ul class=\"select-dropdown-optgroup\">\n            <ng-container *ngIf=\"!templates.first\">\n                <li class=\"select-dropdown-optgroup-option\"\n                    *ngFor=\"let option of Options; let i=index\"\n                    (mousedown)=\"selectOne($event, option)\"\n                    [class.active]=\"i === selectorPosition\"\n                    [innerHTML]=\"getDropdownFormatted(option)\">\n                </li>\n            </ng-container>\n\n            <ng-container *ngIf=\"templates.first\">\n                <li class=\"select-dropdown-optgroup-option\"\n                    *ngFor=\"let option of Options; let i=index\"\n                    (mousedown)=\"selectOne($event, option)\"\n                    [class.active]=\"i === selectorPosition\">\n                    <ng-container *ngTemplateOutlet=\"BothTemplat; context: option\"></ng-container>\n                </li>\n            </ng-container>\n\n            <li class=\"select-dropdown-optgroup-option loader\" *ngIf=\"dataListSub && !dataListSub.closed\">\n                \u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430\n            </li>\n            <li class=\"select-dropdown-optgroup-option loader\"\n                (mousedown)=\"selectOne($event, CreateNew(query));\"\n                *ngIf=\"newMessage && (!dataListSub || dataListSub.closed) && Options.length == 0\">\n                {{ newMessage }}\n            </li>\n        </ul>\n        <div class=\"select-dropdown-pager\" *ngIf=\"CurrentCache && CurrentCache.countPages > 1\">\n            <p class=\"select-dropdown-pager-page\">\n                {{ CurrentCache.currentPage | number }} / {{ CurrentCache.countPages | number }}\n            </p>\n            <button\n                class=\"select-dropdown-pager-loadmore\"\n                    *ngIf=\"CurrentCache.countPages > 1 && CurrentCache.currentPage < CurrentCache.countPages\"\n                    (mousedown)=\"nextPage($event)\">\n                \u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0435\u0449\u0451\n            </button>\n        </div>\n    </div>";
var ViborComponent = (function () {
    function ViborComponent(elementRef) {
        this.firstLoad = false;
        this.oldQuery = '';
        this.query = '';
        this.selectorPosition = 0;
        this.waitTime = 500;
        // Inputs & Outputs
        this.multiple = false;
        this.canClean = false;
        this.multipleLimit = 5;
        this.placeholder = 'Vibor';
        this.required = false;
        this.disabled = false;
        this.viewProperty = 'Name'; // Поле для дефолтного отображения
        this.modelProperty = 'id'; // То, что записывается в Модель
        this.preloadProperty = 'ids'; // Ключ запроса к серверу для предзагрузки, если undefined записывается весь объект
        this.preloadField = undefined; // Значение поля, которе необходимо отправить в запрос.
        this.searchProperty = 'query';
        this.changeFullModel = new core_1.EventEmitter();
        this.newMessage = undefined;
        this.CreateNew = function (query) {
            return {
                id: query,
                Name: query
            };
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
        this.cacheLazyData = {};
        this.el = elementRef.nativeElement;
        this.output = [];
    }
    // OPTIONS
    ViborComponent.prototype.TrackByFn = function (index) {
        return index;
    };
    ViborComponent.prototype.showDropdownList = function () {
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
            });
        }
        else if (this.dataList instanceof Function) {
            if (this.dataListSub) {
                this.dataListSub.unsubscribe();
            }
            if (!this.CurrentCache) {
                this.cacheLazyData[this.query] = {
                    countElement: 0,
                    countPages: 1,
                    currentPage: 1,
                    objects: []
                };
                var tmp_1 = this.CurrentCache, params = {};
                params[this.searchProperty] = this.query;
                this.dataListSub = this.dataList(params, 1).subscribe(function (answer) {
                    tmp_1.objects = tmp_1.objects.concat(answer.list);
                    tmp_1.countElement = answer.headers['count'];
                    tmp_1.countPages = Math.ceil(tmp_1.countElement / 20);
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
            _this.updateOptions();
        }, delayMs);
    };
    ViborComponent.prototype.focusSelectedOption = function () {
        var list = this.el.getElementsByClassName('select-dropdown')[0];
        var targetLi = this.el.getElementsByClassName('select-dropdown-optgroup-option')[this.selectorPosition];
        helpers_1.scrollActiveOption(list, targetLi);
    };
    ViborComponent.prototype.keyDown = function (event) {
        var totalNumItem = this.Options.length;
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
                    this.selectOne(event, this.Options[this.selectorPosition]);
                }
                else if (this.newMessage && (!this.dataListSub || this.dataListSub.closed)) {
                    var value = this.CreateNew(this.query);
                    this.selectOne(event, value);
                }
                break;
            default: break;
        }
        this.focusSelectedOption();
    };
    ViborComponent.prototype.nextPage = function ($event) {
        var _this = this;
        $event.preventDefault();
        var tmp = this.CurrentCache;
        // Validators
        if (!(this.dataList instanceof Function)) {
            throw new Error('Data List mast be Function');
        }
        if (!tmp) {
            throw new Error('For next page need cache for first Page');
        }
        if (tmp.currentPage >= tmp.countPages) {
            throw new Error('Max Page Limit');
        }
        if (this.dataListSub) {
            this.dataListSub.unsubscribe();
        }
        var params = {};
        params[this.searchProperty] = this.query;
        this.dataListSub = this.dataList(params, tmp.currentPage + 1).subscribe(function (answer) {
            tmp.currentPage++;
            tmp.countElement = answer.headers['count'];
            tmp.countPages = Math.ceil(tmp.countElement / 20);
            tmp.objects = tmp.objects.concat(answer.list);
            _this.selectorPosition = (tmp.currentPage - 1) * 20 + 1;
            _this.focusSelectedOption();
        }, function () { });
    };
    // MODEL
    ViborComponent.prototype.clearProperty = function () {
        this.selectorPosition = 0;
        this.query = '';
    };
    ViborComponent.prototype.selectOne = function ($event, data) {
        // Фильтр ненужных событий
        if ($event instanceof MouseEvent && $event.button !== 0) {
            return;
        }
        if (this.multiple) {
            this.output.push(data);
        }
        else {
            this.output = [data];
        }
        this.changeFullModel.emit(this.output);
        this.Model = this.ValueFromOutput;
        this.clearProperty();
        this.hideDropdownList();
        $event.preventDefault();
    };
    ;
    ViborComponent.prototype.removeOne = function (index) {
        this.output.splice(index, 1);
        this.Model = this.ValueFromOutput;
        // set class
        this.onTouched();
        this.inputControl.control.markAsTouched();
        // open dropdown
        if (this.required) {
            this.showDropdownList();
        }
    };
    // FORMATTING
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
    ViborComponent.prototype.ngAfterContentInit = function () {
        console.log(this.templates);
    };
    ViborComponent.prototype.ngOnChanges = function (inputs) {
        var _this = this;
        if (inputs['_model'] && inputs['_model'].currentValue === undefined) {
            this.Model = undefined;
        }
        if (inputs['canClean']) {
            if (inputs['canClean'].currentValue) {
                this.el.classList.add('cleanMode');
            }
            else {
                this.el.classList.remove('cleanMode');
            }
        }
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
            }
        }
        if (inputs['multiple']) {
            if (!('_model' in inputs)) {
                setTimeout(function () { return _this.Model = undefined; }, 10); // Костыль, надо бы исправить
            }
            if (inputs['multiple'].currentValue) {
                this.el.classList.add('multiple');
            }
            else {
                this.el.classList.remove('multiple');
            }
        }
        if (inputs['disabled']) {
            if (inputs['disabled'].currentValue) {
                this.el.setAttribute('disabled', 'disabled');
            }
            else {
                this.el.removeAttribute('disabled');
            }
        }
        if (inputs['required']) {
            if (inputs['required'].currentValue) {
                this.el.setAttribute('required', 'required');
            }
            else {
                this.el.removeAttribute('required');
            }
        }
    };
    // FORMS
    ViborComponent.prototype.writeValue = function (value) {
        // Нормальный update модели
        if (value) {
            if ((value instanceof Array && !this.multiple) || (!(value instanceof Array) && this.multiple)) {
                throw new Error('Model Type Error');
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
                return this.output.length === 1;
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
                        this.dataListSub = this.dataList(params, 1).subscribe(function (answer) {
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
                    if (deepEqual(helpers_1.fetchFromObject(d, this.modelProperty), v)) {
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
                if (!(this.query in this.cacheLazyData)) {
                    options = this.cacheLazyData[this.oldQuery]['objects'];
                }
                else {
                    options = this.CurrentCache.objects;
                }
            }
            return options.filter(function (op) {
                return _this.output.findIndex(function (o) {
                    return deepEqual(helpers_1.fetchFromObject(o, _this.modelProperty), helpers_1.fetchFromObject(op, _this.modelProperty));
                }) === -1;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViborComponent.prototype, "CurrentCache", {
        get: function () {
            if (this.dataList instanceof Function) {
                return this.cacheLazyData[this.query];
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    return ViborComponent;
}());
ViborComponent.decorators = [
    { type: core_1.Component, args: [{
                // tslint:disable-next-line:component-selector
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
    'canClean': [{ type: core_1.Input },],
    'multipleLimit': [{ type: core_1.Input },],
    'placeholder': [{ type: core_1.Input },],
    'name': [{ type: core_1.Input },],
    'required': [{ type: core_1.Input },],
    'disabled': [{ type: core_1.Input },],
    'templates': [{ type: core_1.ContentChildren, args: [core_1.TemplateRef, { descendants: true },] },],
    'listFormatter': [{ type: core_1.Input },],
    'dropdownFormatter': [{ type: core_1.Input },],
    'viewProperty': [{ type: core_1.Input },],
    'modelProperty': [{ type: core_1.Input },],
    'preloadProperty': [{ type: core_1.Input },],
    'preloadField': [{ type: core_1.Input },],
    'searchProperty': [{ type: core_1.Input },],
    'dataList': [{ type: core_1.Input },],
    'onlyEmitter': [{ type: core_1.Input },],
    'changeFullModel': [{ type: core_1.Output, args: ['changeFullModel',] },],
    'newMessage': [{ type: core_1.Input },],
    'CreateNew': [{ type: core_1.Input },],
};
exports.ViborComponent = ViborComponent;
//# sourceMappingURL=vibor.component.js.map