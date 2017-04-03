"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var helpers_1 = require("./helpers");
var deepEqual = require('deep-equal');
var template = '   <div class="select-search">  ' +
    '       <ul class="select-search-list">  ' +
    '           <li class="select-search-list-item select-search-list-item_selection"  ' +
    '               *ngFor="let item of output; let $index=index; let $last=last; trackBy: TrackByFn;"  ' +
    '               [class.focused]="backspaceFocus && last"  ' +
    '               (click)="!disabled && removeOne($index)"  ' +
    '               [innerHTML]="getListFormatted(item)">  ' +
    '           </li>  ' +
    '           <li class="select-search-list-item select-search-list-item_input"  ' +
    '               [class.select-search-list-item_hide]="InputHide">  ' +
    '               <input autocomplete="off"  ' +
    '                      [disabled]="disabled"  ' +
    '                      [required]="required"  ' +
    '                      [(ngModel)]="query"  ' +
    '                      [placeholder]="output.length == 0 ? placeholder : \'\'"  ' +
    '                      (input)="updateOptionsInDelay()"  ' +
    '                      (blur)="hideDropdownList()"  ' +
    '                      (focus)="showDropdownList()"  ' +
    '                      (keydown)="keyDown($event)"/>  ' +
    '           </li>  ' +
    '           <li class="select-search-list-item" [hidden]="!dataListSub || dataListSub.closed">  ' +
    '               <div class="select-search-list-item_loader"></div>  ' +
    '           </li>  ' +
    '     ' +
    '       </ul>  ' +
    '   </div>  ' +
    '   <div class="select-dropdown" *ngIf="isOpen">  ' +
    '       <ul class="select-dropdown-optgroup">  ' +
    '           <li class="select-dropdown-optgroup-option"  ' +
    '               *ngFor="let option of Options; let i=index"  ' +
    '               (mousedown)="selectOne($event, option)"  ' +
    '               [class.active]="i === selectorPosition"  ' +
    '               [innerHTML]="getDropdownFormatted(option)">  ' +
    '           </li>  ' +
    '           <li class="select-dropdown-optgroup-option loader" *ngIf="dataListSub && !dataListSub.closed">  ' +
    '               Загрузка  ' +
    '           </li>  ' +
    '           <li class="select-dropdown-optgroup-option loader"  ' +
    '               (mousedown)="selectOne($event, CreateNew(query));"  ' +
    '               *ngIf="newMessage && (!dataListSub || dataListSub.closed) && Options.length == 0">  ' +
    '               {{ newMessage }}  ' +
    '           </li>  ' +
    '       </ul>  ' +
    '       <div class="select-dropdown-pager" *ngIf="CurrentCache && CurrentCache.countPages > 1">  ' +
    '           <p class="select-dropdown-pager-page">  ' +
    '               {{ CurrentCache.currentPage | number }} / {{ CurrentCache.countPages | number }}  ' +
    '           </p>  ' +
    '           <button  ' +
    '               class="select-dropdown-pager-loadmore"  ' +
    '                   *ngIf="CurrentCache.countPages > 1 && CurrentCache.currentPage < CurrentCache.countPages"  ' +
    '                   (mousedown)="nextPage($event)">  ' +
    '               Загрузить ещё  ' +
    '           </button>  ' +
    '       </div>  ' +
    '   </div>  ' +
    '    ';
var ViborComponent = ViborComponent_1 = (function () {
    function ViborComponent(elementRef) {
        // Local Variable
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
        // tslint:disable-next-line:no-output-rename
        this._ngChange = new core_1.EventEmitter();
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
        this.onTouched();
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
    Object.defineProperty(ViborComponent.prototype, "Model", {
        get: function () {
            return this._model;
        },
        set: function (value) {
            if (this.onlyEmitter) {
                this.output = [];
                this._ngChange.emit(value);
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
            // Event
            this._ngChange.emit(value);
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
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ViborComponent.prototype, "multiple", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ViborComponent.prototype, "canClean", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ViborComponent.prototype, "multipleLimit", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ViborComponent.prototype, "placeholder", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ViborComponent.prototype, "required", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ViborComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Function)
], ViborComponent.prototype, "listFormatter", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Function)
], ViborComponent.prototype, "dropdownFormatter", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ViborComponent.prototype, "viewProperty", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ViborComponent.prototype, "modelProperty", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ViborComponent.prototype, "preloadProperty", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ViborComponent.prototype, "preloadField", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ViborComponent.prototype, "searchProperty", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ViborComponent.prototype, "dataList", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ViborComponent.prototype, "onlyEmitter", void 0);
__decorate([
    core_1.Input('ngModel'),
    __metadata("design:type", Object)
], ViborComponent.prototype, "_model", void 0);
__decorate([
    core_1.Output('ngChange'),
    __metadata("design:type", core_1.EventEmitter)
], ViborComponent.prototype, "_ngChange", void 0);
__decorate([
    core_1.Output('changeFullModel'),
    __metadata("design:type", core_1.EventEmitter)
], ViborComponent.prototype, "changeFullModel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ViborComponent.prototype, "newMessage", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Function)
], ViborComponent.prototype, "CreateNew", void 0);
ViborComponent = ViborComponent_1 = __decorate([
    core_1.Component({
        // tslint:disable-next-line:component-selector
        selector: 'vibor',
        template: template,
        providers: [{
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: core_1.forwardRef(function () { return ViborComponent_1; }),
                multi: true
            }]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], ViborComponent);
exports.ViborComponent = ViborComponent;
var ViborComponent_1;
//# sourceMappingURL=vibor.component.js.map