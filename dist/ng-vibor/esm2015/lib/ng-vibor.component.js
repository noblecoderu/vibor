/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, Output, forwardRef, EventEmitter, ElementRef, ContentChild, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { ViborBothDirective, ViborCreateDirective, ViborDropdownDirective, ViborSelectedDirective } from './ng-vibor-template.directive';
import { defaultFormatter, fetchFromObject, scrollActiveOption } from './helpers';
const /** @type {?} */ deepEqual = require('deep-equal');
export class NgViborComponent {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
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
        this.CreateNew = (query) => {
            return query;
        };
        this.delay = (function () {
            let /** @type {?} */ timer = 0;
            return function (callback, ms) {
                clearTimeout(timer);
                timer = setTimeout(callback, ms);
            };
        })();
        this.onChange = () => { };
        this.onTouched = () => { };
        this.cacheLazyData = [];
        this.output = [];
    }
    /**
     * @param {?} index
     * @return {?}
     */
    TrackByFn(index) {
        return index;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    showDropdownList(event) {
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
    }
    /**
     * @return {?}
     */
    hideDropdownList() {
        this.el.classList.remove('open-vibor');
        this.isOpen = false;
        this.inputEl.blur();
    }
    /**
     * @return {?}
     */
    hideDropdownListWithDelay() {
        setTimeout(() => {
            this.hideDropdownList();
        }, 100);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    toggleDropdown(event) {
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
    }
    /**
     * @return {?}
     */
    updateOptions() {
        this.isOpen = true;
        if (this.dataList instanceof Array) {
            this.options = this.dataList.filter(data => {
                if (!this.query || this.query.length === 0) {
                    return true;
                }
                let /** @type {?} */ f = fetchFromObject(data, this.searchProperty);
                if (f === undefined) {
                    return false;
                }
                return JSON.stringify(f).indexOf(this.query) >= 0;
            }).filter(data => {
                if (!this.excludeList) {
                    return true;
                }
                let /** @type {?} */ d = fetchFromObject(data, this.modelProperty).valueOf();
                return this.excludeList.findIndex(ex => {
                    let /** @type {?} */ a = fetchFromObject(ex, this.modelProperty).valueOf();
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
                let /** @type {?} */ params = /** @type {?} */ (Object.assign({}, this.additionalFilter));
                params[this.searchProperty] = this.query;
                this.dataListSub = (/** @type {?} */ (this.dataList(params, 1, this.countOnPage))).subscribe(answer => {
                    this.currentCache.objects = this.currentCache.objects.concat(answer.list);
                    this.currentCache.countElement = answer.headers['count'];
                    this.currentCache.countPages = Math.ceil(this.currentCache.countElement / this.countOnPage);
                }, () => { });
            }
        }
    }
    /**
     * @return {?}
     */
    updateOptionsInDelay() {
        let /** @type {?} */ delayMs = this.dataList instanceof Array ? 10 : this.waitTime;
        // executing after user stopped typing
        this.delay(() => {
            this.oldQuery = this.query;
            this.currentCache = this.GetCache(this.query);
            this.updateOptions();
        }, delayMs);
    }
    /**
     * @return {?}
     */
    focusSelectedOption() {
        let /** @type {?} */ list = /** @type {?} */ (this.el.getElementsByClassName('select-dropdown')[0]);
        let /** @type {?} */ targetLi = /** @type {?} */ (this.el.getElementsByClassName('select-dropdown-optgroup-option')[this.selectorPosition]);
        scrollActiveOption(list, targetLi);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    keyDown(event) {
        if (!this.Options) {
            this.showDropdownList(undefined);
            return;
        }
        let /** @type {?} */ totalNumItem = this.Options.length;
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
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    nextPage($event) {
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
        let /** @type {?} */ params = Object.assign({}, this.additionalFilter);
        params[this.searchProperty] = this.query;
        this.dataListSub = this.dataList(params, this.currentCache.currentPage + 1, this.countOnPage).subscribe(answer => {
            this.currentCache.currentPage++;
            this.currentCache.countElement = answer.headers['count'];
            this.currentCache.countPages = Math.ceil(this.currentCache.countElement / this.countOnPage);
            this.currentCache.objects = this.currentCache.objects.concat(answer.list);
            this.selectorPosition = (this.currentCache.currentPage - 1) * this.countOnPage + 1;
            this.focusSelectedOption();
        }, () => { });
    }
    /**
     * @return {?}
     */
    clearProperty() {
        this.selectorPosition = 0;
        this.query = undefined;
    }
    /**
     * @param {?} $event
     * @param {?} data
     * @return {?}
     */
    selectOne($event, data) {
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
    }
    ;
    /**
     * @param {?} index
     * @param {?} event
     * @return {?}
     */
    removeOne(index, event) {
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
    }
    /**
     * @return {?}
     */
    get SelectedTemplate() {
        if (this.selectedTemplate) {
            return this.selectedTemplate.templateRef;
        }
        else if (this.bothTemplate) {
            return this.bothTemplate.templateRef;
        }
        return undefined;
    }
    /**
     * @return {?}
     */
    get DropdownTemplate() {
        if (this.dropdownTemplate) {
            return this.dropdownTemplate.templateRef;
        }
        else if (this.bothTemplate) {
            return this.bothTemplate.templateRef;
        }
        return undefined;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    getListFormatted(data) {
        let /** @type {?} */ formatter = this.listFormatter || defaultFormatter;
        return formatter.apply(this, [data, this.viewProperty]);
    }
    /**
     * @param {?} data
     * @return {?}
     */
    getDropdownFormatted(data) {
        let /** @type {?} */ formatter = this.dropdownFormatter || defaultFormatter;
        return formatter.apply(this, [data, this.viewProperty]);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // this.Model = this.ValueFromOutput; Это вроде тут тоже уже не надо.
        this.el = this.elementRef.nativeElement.getElementsByClassName('vibor').item(0);
        this.inputEl = /** @type {?} */ ((this.el.querySelector('input')));
    }
    /**
     * @param {?} inputs
     * @return {?}
     */
    ngOnChanges(inputs) {
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
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        // Нормальный update модели
        if (value) {
            if ((value instanceof Array && !this.multiple) || (!(value instanceof Array) && this.multiple)) {
                throw new Error('Model Type Error');
            }
            if (value instanceof Array && this.Model instanceof Array) {
                if (value.length === this.Model.length && value.every(v => this.Model.indexOf(v) >= 0)) {
                    return;
                }
            }
            else if (this.Model === value) {
                return;
            }
            this.firstLoad = true;
            this.Model = value;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        if (isDisabled) {
            this.el.setAttribute('disabled', 'disabled');
        }
        else {
            this.el.removeAttribute('disabled');
        }
        // disable other components here
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set Model(value) {
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
    }
    /**
     * @return {?}
     */
    get Model() {
        return this._model;
    }
    /**
     * @return {?}
     */
    get InputHide() {
        if (this.multiple) {
            return this.output.length >= this.multipleLimit;
        }
        else {
            return this.output.length === 1 && !this.isOpen;
        }
    }
    /**
     * @return {?}
     */
    get ValueFromOutput() {
        if (this.multiple) {
            let /** @type {?} */ tmp = [];
            for (let /** @type {?} */ o of this.output) {
                tmp.push(fetchFromObject(o, this.modelProperty));
            }
            return tmp;
        }
        else {
            return fetchFromObject(this.output[0], this.modelProperty);
        }
    }
    /**
     * @param {?} newValue
     * @return {?}
     */
    set Output(newValue) {
        let /** @type {?} */ dataList = [];
        if (this.dataList instanceof Array) {
            dataList = this.dataList;
        }
        else if (this.dataList instanceof Function) {
            if (newValue && newValue.length && this.firstLoad) {
                let /** @type {?} */ params = {};
                this.firstLoad = false;
                if (!this.preloadProperty) {
                    this.output = newValue;
                    this.changeFullModel.emit(this.output);
                }
                else {
                    params[this.preloadProperty] = newValue.map(val => fetchFromObject(val, this.preloadField));
                    this.dataListSub = (/** @type {?} */ (this.dataList(params, 1, this.countOnPage))).subscribe(answer => {
                        this.output = answer.list;
                        this.changeFullModel.emit(this.output);
                    }, () => { });
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
        let /** @type {?} */ newOutput = [];
        for (let /** @type {?} */ v of newValue) {
            for (let /** @type {?} */ d of dataList) {
                let /** @type {?} */ a = fetchFromObject(d, this.modelProperty) ? fetchFromObject(d, this.modelProperty).valueOf() : undefined;
                let /** @type {?} */ b = v ? v.valueOf() : undefined;
                if (deepEqual(a, b)) {
                    newOutput.push(d);
                }
            }
        }
        this.output = newOutput;
        this.changeFullModel.emit(this.output);
    }
    /**
     * @return {?}
     */
    get Options() {
        let /** @type {?} */ options;
        if (this.dataList instanceof Array) {
            options = this.options;
        }
        else if (this.dataList instanceof Function) {
            let /** @type {?} */ oldCache = this.GetCache(this.oldQuery);
            if (!this.currentCache && oldCache) {
                options = oldCache.objects;
            }
            else {
                options = this.currentCache ? this.currentCache.objects : [];
            }
        }
        return (options || []).filter(op => {
            return this.output.findIndex(o => {
                let /** @type {?} */ a = fetchFromObject(o, this.modelProperty) ? fetchFromObject(o, this.modelProperty).valueOf() : undefined;
                let /** @type {?} */ b = fetchFromObject(op, this.modelProperty) ? fetchFromObject(op, this.modelProperty).valueOf() : undefined;
                return deepEqual(a, b);
            }) === -1;
        });
    }
    /**
     * @param {?} query
     * @return {?}
     */
    GetCache(query) {
        if (this.dataList instanceof Function) {
            return this.cacheLazyData.find(cache => {
                return cache.query === this.query && deepEqual(cache.params, this.additionalFilter);
            });
        }
        return undefined;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    AddNewObject(value) {
        if (value instanceof Observable) {
            value.subscribe(newObject => {
                if (newObject !== undefined) {
                    this.SetNewObject(newObject);
                }
            });
        }
        else {
            this.SetNewObject(value);
        }
    }
    /**
     * @param {?} newObject
     * @return {?}
     */
    SetNewObject(newObject) {
        if (this.dataList instanceof Array) {
            this.dataList.push(newObject);
        }
        else if (this.dataList instanceof Function) {
            for (let /** @type {?} */ cache of this.cacheLazyData) {
                if (this.query.includes(cache.query) || cache.query === undefined || cache.query === '') {
                    cache.countElement++;
                    cache.objects.push(newObject);
                }
            }
        }
        this.firstLoad = false;
        this.query = undefined;
        this.currentCache = this.GetCache(this.query);
        this.selectOne(new MouseEvent('click'), newObject);
    }
    /**
     * @return {?}
     */
    get ShowNew() {
        let /** @type {?} */ a = this.query && this.newMessage && (!this.dataListSub || this.dataListSub.closed);
        let /** @type {?} */ b = this.Options.findIndex(o => {
            let /** @type {?} */ c = fetchFromObject(o, this.viewProperty) ? fetchFromObject(o, this.viewProperty).valueOf() : undefined;
            return deepEqual(c, this.query);
        }) === -1 && this.output.findIndex(o => {
            let /** @type {?} */ c = fetchFromObject(o, this.viewProperty) ? fetchFromObject(o, this.viewProperty).valueOf() : undefined;
            return deepEqual(c, this.query);
        }) === -1;
        return a && b;
    }
    /**
     * @return {?}
     */
    get ShowEmpty() {
        return this.Options.length === 0 && (!(this.dataList instanceof Function) || (this.dataListSub.closed));
    }
}
NgViborComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: 'vibor',
                template: `<div class="vibor">
  <ng-content></ng-content>

  <div class="select-search" (click)="showDropdownList($event);">
    <ul class="select-search-list">
      <ng-container *ngIf="multiple || !isOpen">
        <ng-container *ngIf="!SelectedTemplate; else selectedT">
          <li class="select-search-list-item select-search-list-item_selection" *ngFor="let item of output; let $index=index; let $last=last; trackBy: TrackByFn;">
            <div [innerHTML]="getListFormatted(item)"></div>
            <a class="select-search-list-item_remove" *ngIf="allowReset" (click)="!disabled && removeOne($index, $event)"></a>
          </li>
        </ng-container>

        <ng-template #selectedT>
          <li class="select-search-list-item select-search-list-item_selection" *ngFor="let item of output; let $index=index; let $last=last; trackBy: TrackByFn;">
            <ng-container *ngTemplateOutlet="SelectedTemplate; context: {item: item}"></ng-container>
            <a class="select-search-list-item_remove" *ngIf="allowReset && !disabled" (click)="!disabled && removeOne($index, $event)">
            </a>
          </li>
        </ng-template>
      </ng-container>

      <li class="select-search-list-item select-search-list-item_input" [class.select-search-list-item_hide]="InputHide">
        <input autocomplete="off" #inputControl="ngModel" [name]="name" [disabled]="disabled" [(ngModel)]="query" [placeholder]="output.length == 0 || (multiple && output.length < multipleLimit) ? placeholder : ''"
          (input)="updateOptionsInDelay()" (keydown)="keyDown($event)" />
      </li>
      <li class="select-search-list-item select-search-list-item_loader-center" [hidden]="!dataListSub || dataListSub.closed">
        <div class="select-search-list-item_loader"></div>
      </li>

      <span class="arrow" (click)="toggleDropdown($event)">
      </span>
    </ul>
  </div>

  <div class="select-dropdown" *ngIf="isOpen">
    <ul class="select-dropdown-optgroup">
      <ng-container *ngIf="!DropdownTemplate; else dropdownT">
        <li class="select-dropdown-optgroup-option" *ngFor="let option of Options; let i=index" (mousedown)="selectOne($event, option)"
          [class.active]="i === selectorPosition" [innerHTML]="getDropdownFormatted(option)">
        </li>
      </ng-container>

      <ng-template #dropdownT>
        <li class="select-dropdown-optgroup-option" *ngFor="let option of Options; let i=index" (mousedown)="selectOne($event, option)"
          [class.active]="i === selectorPosition">
          <ng-container *ngTemplateOutlet="DropdownTemplate; context: {item: option}"></ng-container>
        </li>
      </ng-template>

      <li class="select-dropdown-optgroup-option loader" *ngIf="dataListSub && !dataListSub.closed">
        Загрузка
      </li>
      <li class="select-dropdown-optgroup-option loader" (mousedown)="AddNewObject(CreateNew(query));" [class.active]="selectorPosition === Options.length"
        *ngIf="ShowNew">

        <ng-container *ngIf="createTemplate; else templateWithMessage">
          <ng-container *ngTemplateOutlet="createTemplate.templateRef; context: {query: query}"></ng-container>
        </ng-container>

        <ng-template #templateWithMessage>
          {{ newMessage }}
        </ng-template>
      </li>
      <li class="select-dropdown-optgroup-option loader" *ngIf="ShowEmpty">
        Пусто
      </li>
    </ul>
    <div class="select-dropdown-pager" *ngIf="currentCache && currentCache.countPages > 1">
      <p class="select-dropdown-pager-page">
        {{ currentCache.currentPage | number }} / {{ currentCache.countPages | number }}
      </p>
      <button class="select-dropdown-pager-loadmore" *ngIf="currentCache.countPages > 1 && currentCache.currentPage < currentCache.countPages"
        (mousedown)="nextPage($event)">
        Загрузить ещё
      </button>
    </div>
  </div>
</div>
`,
                styles: [`.vibor a,.vibor div,.vibor label,.vibor legend,.vibor span,.vibor ul{margin:0;padding:0;border:0}.vibor a,.vibor button,.vibor input{outline:0}.vibor ol,.vibor ul{list-style:none}.vibor input{padding:0;margin:0;border:0;font:inherit}.vibor{position:relative;display:block;font-family:-apple-system,BlinkMacSystemFont, "Segoe UI",Roboto,Helvetica,Arial,sans-serif, "Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"}.vibor .select-search{position:relative}.vibor .select-search .arrow{content:"";position:absolute;right:13px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);display:block;width:16px;height:16px;background-image:url(data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ibmMtaWNvbiBnbHlwaCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiI+DQogIDxwYXRoIGZpbGw9IiMyYzJjMmMiIGQ9Ik04IDExLjRMMi42IDYgNCA0LjZsNCA0IDQtNEwxMy40IDYiLz4NCjwvc3ZnPg0K);transition:-webkit-transform .15s ease-in-out;transition:transform .15s ease-in-out;transition:transform .15s ease-in-out,-webkit-transform .15s ease-in-out}.vibor .select-search .arrow:before{display:none}.vibor .select-search-list-item_input input{width:100%}.vibor .select-dropdown{position:absolute;top:100%;left:0;right:0;z-index:2}.vibor .select-search-list-item_loader-center{position:absolute;right:10px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);display:flex;align-items:center;justify-content:center;width:21px;height:21px;background:#fff;z-index:2}.vibor .select-search-list-item_loader-center[hidden]{display:none}.vibor .select-search-list-item_loader-center .select-search-list-item_loader{width:16px;height:16px;box-sizing:border-box;border-width:2px;border-style:solid;border-color:#22272e rgba(34,39,46,.4) rgba(34,39,46,.4);border-radius:100%;-webkit-animation:.45s linear infinite clockwise;animation:.45s linear infinite clockwise}.vibor .select-dropdown-optgroup{max-height:300px;overflow-y:auto;border:1px solid #d5d9de;border-bottom-left-radius:5px;border-bottom-right-radius:5px;border-top:0}.vibor .select-dropdown-optgroup-option{min-height:30px;padding:10px 15px}.vibor .select-dropdown-optgroup-option:hover{background-color:rgba(66,132,215,.1)}.vibor .open-vibor .select-search .arrow{-webkit-transform:rotate(180deg);transform:rotate(180deg)}@-webkit-keyframes clockwise{to{-webkit-transform:rotate(360deg) translatez(0);transform:rotate(360deg) translatez(0)}}@keyframes clockwise{to{-webkit-transform:rotate(360deg) translatez(0);transform:rotate(360deg) translatez(0)}}`],
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => NgViborComponent),
                        multi: true
                    }]
            },] },
];
/** @nocollapse */
NgViborComponent.ctorParameters = () => [
    { type: ElementRef }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctdmlib3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdmlib3IvIiwic291cmNlcyI6WyJsaWIvbmctdmlib3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUN6QixZQUFZLEVBQUUsVUFBVSxFQUNYLFlBQVksRUFBRSxTQUFTLEVBRXJDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFFTCxpQkFBaUIsRUFDakIsT0FBTyxFQUNSLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEIsT0FBTyxFQUFnQixVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFaEQsT0FBTyxFQUNILGtCQUFrQixFQUNsQixvQkFBb0IsRUFDcEIsc0JBQXNCLEVBQ3RCLHNCQUFzQixFQUN6QixNQUFNLCtCQUErQixDQUFDO0FBRXZDLE9BQU8sRUFFSCxnQkFBZ0IsRUFDaEIsZUFBZSxFQUNmLGtCQUFrQixFQUNyQixNQUFNLFdBQVcsQ0FBQztBQUVuQix1QkFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBNEZ4QyxNQUFNOzs7O0lBdVdKLFlBQW9CLFVBQXNDO1FBQXRDLGVBQVUsR0FBVixVQUFVLENBQTRCO3lCQW5XdEMsS0FBSztnQ0FTQyxDQUFDO3dCQUNSLEdBQUc7O3dCQU9LLEtBQUs7NkJBQ0EsUUFBUTsyQkFDVixFQUFFOzJCQUVGLE9BQU87d0JBRVYsS0FBSzswQkFDSCxJQUFJO3dCQUNmLEtBQUs7NEJBU1EsTUFBTTs2QkFFTCxJQUFJOytCQUNGLEtBQUs7NEJBQ0EsU0FBUzs4QkFDZixPQUFPO2dDQUlMLEVBQUU7K0JBRWtDLElBQUksWUFBWSxFQUFFOzBCQUdwRCxTQUFTO3lCQUN3QixDQUFDLEtBQWEsRUFBRSxFQUFFO1lBQ3RGLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDZDtxQkFxRHlCLENBQUM7WUFDekIs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O3dCQUMvQyxLQUFLLEVBQUUsSUFBSTtxQkFDWixDQUFDO2FBQ0g7Ozs7WUFySGUsVUFBVTs7OzJCQXdJdkIsU0FBUyxTQUFDLGNBQWM7dUJBR3hCLEtBQUs7NEJBQ0wsS0FBSzswQkFDTCxLQUFLOzBCQUVMLEtBQUs7bUJBQ0wsS0FBSzt1QkFDTCxLQUFLO3lCQUNMLEtBQUs7MkJBSUwsWUFBWSxTQUFDLGtCQUFrQjsrQkFDL0IsWUFBWSxTQUFDLHNCQUFzQjsrQkFDbkMsWUFBWSxTQUFDLHNCQUFzQjs2QkFDbkMsWUFBWSxTQUFDLG9CQUFvQjs0QkFDakMsS0FBSztnQ0FDTCxLQUFLOzJCQUNMLEtBQUs7NEJBRUwsS0FBSzs4QkFDTCxLQUFLOzJCQUNMLEtBQUs7NkJBQ0wsS0FBSzt1QkFFTCxLQUFLOzBCQUNMLEtBQUs7K0JBQ0wsS0FBSzswQkFDTCxLQUFLOzhCQUNMLE1BQU0sU0FBQyxpQkFBaUI7eUJBR3hCLEtBQUs7d0JBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LCBPbkluaXQsIE9uQ2hhbmdlcyxcclxuICBJbnB1dCwgT3V0cHV0LCBmb3J3YXJkUmVmLFxyXG4gIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZixcclxuICBUZW1wbGF0ZVJlZiwgQ29udGVudENoaWxkLCBWaWV3Q2hpbGQsXHJcbiAgU2ltcGxlQ2hhbmdlc1xyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxyXG4gIE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gIE5nTW9kZWxcclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBWaWJvckJvdGhEaXJlY3RpdmUsXHJcbiAgICBWaWJvckNyZWF0ZURpcmVjdGl2ZSxcclxuICAgIFZpYm9yRHJvcGRvd25EaXJlY3RpdmUsXHJcbiAgICBWaWJvclNlbGVjdGVkRGlyZWN0aXZlXHJcbn0gZnJvbSAnLi9uZy12aWJvci10ZW1wbGF0ZS5kaXJlY3RpdmUnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIElEYXRhUmVzcG9uc2UsXHJcbiAgICBkZWZhdWx0Rm9ybWF0dGVyLFxyXG4gICAgZmV0Y2hGcm9tT2JqZWN0LFxyXG4gICAgc2Nyb2xsQWN0aXZlT3B0aW9uXHJcbn0gZnJvbSAnLi9oZWxwZXJzJztcclxuXHJcbmNvbnN0IGRlZXBFcXVhbCA9IHJlcXVpcmUoJ2RlZXAtZXF1YWwnKTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtc2VsZWN0b3JcclxuICBzZWxlY3RvcjogJ3ZpYm9yJyxcclxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ2aWJvclwiPlxyXG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuXHJcbiAgPGRpdiBjbGFzcz1cInNlbGVjdC1zZWFyY2hcIiAoY2xpY2spPVwic2hvd0Ryb3Bkb3duTGlzdCgkZXZlbnQpO1wiPlxyXG4gICAgPHVsIGNsYXNzPVwic2VsZWN0LXNlYXJjaC1saXN0XCI+XHJcbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJtdWx0aXBsZSB8fCAhaXNPcGVuXCI+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFTZWxlY3RlZFRlbXBsYXRlOyBlbHNlIHNlbGVjdGVkVFwiPlxyXG4gICAgICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LXNlYXJjaC1saXN0LWl0ZW0gc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fc2VsZWN0aW9uXCIgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygb3V0cHV0OyBsZXQgJGluZGV4PWluZGV4OyBsZXQgJGxhc3Q9bGFzdDsgdHJhY2tCeTogVHJhY2tCeUZuO1wiPlxyXG4gICAgICAgICAgICA8ZGl2IFtpbm5lckhUTUxdPVwiZ2V0TGlzdEZvcm1hdHRlZChpdGVtKVwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8YSBjbGFzcz1cInNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX3JlbW92ZVwiICpuZ0lmPVwiYWxsb3dSZXNldFwiIChjbGljayk9XCIhZGlzYWJsZWQgJiYgcmVtb3ZlT25lKCRpbmRleCwgJGV2ZW50KVwiPjwvYT5cclxuICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcblxyXG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjc2VsZWN0ZWRUPlxyXG4gICAgICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LXNlYXJjaC1saXN0LWl0ZW0gc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fc2VsZWN0aW9uXCIgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygb3V0cHV0OyBsZXQgJGluZGV4PWluZGV4OyBsZXQgJGxhc3Q9bGFzdDsgdHJhY2tCeTogVHJhY2tCeUZuO1wiPlxyXG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiU2VsZWN0ZWRUZW1wbGF0ZTsgY29udGV4dDoge2l0ZW06IGl0ZW19XCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgIDxhIGNsYXNzPVwic2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fcmVtb3ZlXCIgKm5nSWY9XCJhbGxvd1Jlc2V0ICYmICFkaXNhYmxlZFwiIChjbGljayk9XCIhZGlzYWJsZWQgJiYgcmVtb3ZlT25lKCRpbmRleCwgJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICA8L2xpPlxyXG4gICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG5cclxuICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LXNlYXJjaC1saXN0LWl0ZW0gc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faW5wdXRcIiBbY2xhc3Muc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faGlkZV09XCJJbnB1dEhpZGVcIj5cclxuICAgICAgICA8aW5wdXQgYXV0b2NvbXBsZXRlPVwib2ZmXCIgI2lucHV0Q29udHJvbD1cIm5nTW9kZWxcIiBbbmFtZV09XCJuYW1lXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgWyhuZ01vZGVsKV09XCJxdWVyeVwiIFtwbGFjZWhvbGRlcl09XCJvdXRwdXQubGVuZ3RoID09IDAgfHwgKG11bHRpcGxlICYmIG91dHB1dC5sZW5ndGggPCBtdWx0aXBsZUxpbWl0KSA/IHBsYWNlaG9sZGVyIDogJydcIlxyXG4gICAgICAgICAgKGlucHV0KT1cInVwZGF0ZU9wdGlvbnNJbkRlbGF5KClcIiAoa2V5ZG93bik9XCJrZXlEb3duKCRldmVudClcIiAvPlxyXG4gICAgICA8L2xpPlxyXG4gICAgICA8bGkgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbSBzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9sb2FkZXItY2VudGVyXCIgW2hpZGRlbl09XCIhZGF0YUxpc3RTdWIgfHwgZGF0YUxpc3RTdWIuY2xvc2VkXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2xvYWRlclwiPjwvZGl2PlxyXG4gICAgICA8L2xpPlxyXG5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJhcnJvd1wiIChjbGljayk9XCJ0b2dnbGVEcm9wZG93bigkZXZlbnQpXCI+XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgIDwvdWw+XHJcbiAgPC9kaXY+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd25cIiAqbmdJZj1cImlzT3BlblwiPlxyXG4gICAgPHVsIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwXCI+XHJcbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhRHJvcGRvd25UZW1wbGF0ZTsgZWxzZSBkcm9wZG93blRcIj5cclxuICAgICAgICA8bGkgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXAtb3B0aW9uXCIgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBPcHRpb25zOyBsZXQgaT1pbmRleFwiIChtb3VzZWRvd24pPVwic2VsZWN0T25lKCRldmVudCwgb3B0aW9uKVwiXHJcbiAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cImkgPT09IHNlbGVjdG9yUG9zaXRpb25cIiBbaW5uZXJIVE1MXT1cImdldERyb3Bkb3duRm9ybWF0dGVkKG9wdGlvbilcIj5cclxuICAgICAgICA8L2xpPlxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgICAgIDxuZy10ZW1wbGF0ZSAjZHJvcGRvd25UPlxyXG4gICAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb25cIiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIE9wdGlvbnM7IGxldCBpPWluZGV4XCIgKG1vdXNlZG93bik9XCJzZWxlY3RPbmUoJGV2ZW50LCBvcHRpb24pXCJcclxuICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaSA9PT0gc2VsZWN0b3JQb3NpdGlvblwiPlxyXG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIkRyb3Bkb3duVGVtcGxhdGU7IGNvbnRleHQ6IHtpdGVtOiBvcHRpb259XCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgPC9saT5cclxuICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuXHJcbiAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb24gbG9hZGVyXCIgKm5nSWY9XCJkYXRhTGlzdFN1YiAmJiAhZGF0YUxpc3RTdWIuY2xvc2VkXCI+XHJcbiAgICAgICAg0JfQsNCz0YDRg9C30LrQsFxyXG4gICAgICA8L2xpPlxyXG4gICAgICA8bGkgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXAtb3B0aW9uIGxvYWRlclwiIChtb3VzZWRvd24pPVwiQWRkTmV3T2JqZWN0KENyZWF0ZU5ldyhxdWVyeSkpO1wiIFtjbGFzcy5hY3RpdmVdPVwic2VsZWN0b3JQb3NpdGlvbiA9PT0gT3B0aW9ucy5sZW5ndGhcIlxyXG4gICAgICAgICpuZ0lmPVwiU2hvd05ld1wiPlxyXG5cclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY3JlYXRlVGVtcGxhdGU7IGVsc2UgdGVtcGxhdGVXaXRoTWVzc2FnZVwiPlxyXG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNyZWF0ZVRlbXBsYXRlLnRlbXBsYXRlUmVmOyBjb250ZXh0OiB7cXVlcnk6IHF1ZXJ5fVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG5cclxuICAgICAgICA8bmctdGVtcGxhdGUgI3RlbXBsYXRlV2l0aE1lc3NhZ2U+XHJcbiAgICAgICAgICB7eyBuZXdNZXNzYWdlIH19XHJcbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgPC9saT5cclxuICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvbiBsb2FkZXJcIiAqbmdJZj1cIlNob3dFbXB0eVwiPlxyXG4gICAgICAgINCf0YPRgdGC0L5cclxuICAgICAgPC9saT5cclxuICAgIDwvdWw+XHJcbiAgICA8ZGl2IGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLXBhZ2VyXCIgKm5nSWY9XCJjdXJyZW50Q2FjaGUgJiYgY3VycmVudENhY2hlLmNvdW50UGFnZXMgPiAxXCI+XHJcbiAgICAgIDxwIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLXBhZ2VyLXBhZ2VcIj5cclxuICAgICAgICB7eyBjdXJyZW50Q2FjaGUuY3VycmVudFBhZ2UgfCBudW1iZXIgfX0gLyB7eyBjdXJyZW50Q2FjaGUuY291bnRQYWdlcyB8IG51bWJlciB9fVxyXG4gICAgICA8L3A+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tcGFnZXItbG9hZG1vcmVcIiAqbmdJZj1cImN1cnJlbnRDYWNoZS5jb3VudFBhZ2VzID4gMSAmJiBjdXJyZW50Q2FjaGUuY3VycmVudFBhZ2UgPCBjdXJyZW50Q2FjaGUuY291bnRQYWdlc1wiXHJcbiAgICAgICAgKG1vdXNlZG93bik9XCJuZXh0UGFnZSgkZXZlbnQpXCI+XHJcbiAgICAgICAg0JfQsNCz0YDRg9C30LjRgtGMINC10YnRkVxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuYCxcclxuICBzdHlsZXM6IFtgLnZpYm9yIGEsLnZpYm9yIGRpdiwudmlib3IgbGFiZWwsLnZpYm9yIGxlZ2VuZCwudmlib3Igc3Bhbiwudmlib3IgdWx7bWFyZ2luOjA7cGFkZGluZzowO2JvcmRlcjowfS52aWJvciBhLC52aWJvciBidXR0b24sLnZpYm9yIGlucHV0e291dGxpbmU6MH0udmlib3Igb2wsLnZpYm9yIHVse2xpc3Qtc3R5bGU6bm9uZX0udmlib3IgaW5wdXR7cGFkZGluZzowO21hcmdpbjowO2JvcmRlcjowO2ZvbnQ6aW5oZXJpdH0udmlib3J7cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTpibG9jaztmb250LWZhbWlseTotYXBwbGUtc3lzdGVtLEJsaW5rTWFjU3lzdGVtRm9udCwgXCJTZWdvZSBVSVwiLFJvYm90byxIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZiwgXCJBcHBsZSBDb2xvciBFbW9qaVwiLFwiU2Vnb2UgVUkgRW1vamlcIixcIlNlZ29lIFVJIFN5bWJvbFwifS52aWJvciAuc2VsZWN0LXNlYXJjaHtwb3NpdGlvbjpyZWxhdGl2ZX0udmlib3IgLnNlbGVjdC1zZWFyY2ggLmFycm93e2NvbnRlbnQ6XCJcIjtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDoxM3B4O3RvcDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKTtkaXNwbGF5OmJsb2NrO3dpZHRoOjE2cHg7aGVpZ2h0OjE2cHg7YmFja2dyb3VuZC1pbWFnZTp1cmwoZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCamJHRnpjejBpYm1NdGFXTnZiaUJuYkhsd2FDSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklpQjNhV1IwYUQwaU1UWWlJR2hsYVdkb2REMGlNVFlpSUhacFpYZENiM2c5SWpBZ01DQXhOaUF4TmlJK0RRb2dJRHh3WVhSb0lHWnBiR3c5SWlNeVl6SmpNbU1pSUdROUlrMDRJREV4TGpSTU1pNDJJRFlnTkNBMExqWnNOQ0EwSURRdE5Fd3hNeTQwSURZaUx6NE5Dand2YzNablBnMEspO3RyYW5zaXRpb246LXdlYmtpdC10cmFuc2Zvcm0gLjE1cyBlYXNlLWluLW91dDt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMTVzIGVhc2UtaW4tb3V0O3RyYW5zaXRpb246dHJhbnNmb3JtIC4xNXMgZWFzZS1pbi1vdXQsLXdlYmtpdC10cmFuc2Zvcm0gLjE1cyBlYXNlLWluLW91dH0udmlib3IgLnNlbGVjdC1zZWFyY2ggLmFycm93OmJlZm9yZXtkaXNwbGF5Om5vbmV9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9pbnB1dCBpbnB1dHt3aWR0aDoxMDAlfS52aWJvciAuc2VsZWN0LWRyb3Bkb3due3Bvc2l0aW9uOmFic29sdXRlO3RvcDoxMDAlO2xlZnQ6MDtyaWdodDowO3otaW5kZXg6Mn0udmlib3IgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2xvYWRlci1jZW50ZXJ7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MTBweDt0b3A6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO3dpZHRoOjIxcHg7aGVpZ2h0OjIxcHg7YmFja2dyb3VuZDojZmZmO3otaW5kZXg6Mn0udmlib3IgLnNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2xvYWRlci1jZW50ZXJbaGlkZGVuXXtkaXNwbGF5Om5vbmV9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9sb2FkZXItY2VudGVyIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9sb2FkZXJ7d2lkdGg6MTZweDtoZWlnaHQ6MTZweDtib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym9yZGVyLXdpZHRoOjJweDtib3JkZXItc3R5bGU6c29saWQ7Ym9yZGVyLWNvbG9yOiMyMjI3MmUgcmdiYSgzNCwzOSw0NiwuNCkgcmdiYSgzNCwzOSw0NiwuNCk7Ym9yZGVyLXJhZGl1czoxMDAlOy13ZWJraXQtYW5pbWF0aW9uOi40NXMgbGluZWFyIGluZmluaXRlIGNsb2Nrd2lzZTthbmltYXRpb246LjQ1cyBsaW5lYXIgaW5maW5pdGUgY2xvY2t3aXNlfS52aWJvciAuc2VsZWN0LWRyb3Bkb3duLW9wdGdyb3Vwe21heC1oZWlnaHQ6MzAwcHg7b3ZlcmZsb3cteTphdXRvO2JvcmRlcjoxcHggc29saWQgI2Q1ZDlkZTtib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOjVweDtib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czo1cHg7Ym9yZGVyLXRvcDowfS52aWJvciAuc2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvbnttaW4taGVpZ2h0OjMwcHg7cGFkZGluZzoxMHB4IDE1cHh9LnZpYm9yIC5zZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXAtb3B0aW9uOmhvdmVye2JhY2tncm91bmQtY29sb3I6cmdiYSg2NiwxMzIsMjE1LC4xKX0udmlib3IgLm9wZW4tdmlib3IgLnNlbGVjdC1zZWFyY2ggLmFycm93ey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgxODBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMTgwZGVnKX1ALXdlYmtpdC1rZXlmcmFtZXMgY2xvY2t3aXNle3Rvey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpIHRyYW5zbGF0ZXooMCk7dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpIHRyYW5zbGF0ZXooMCl9fUBrZXlmcmFtZXMgY2xvY2t3aXNle3Rvey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpIHRyYW5zbGF0ZXooMCk7dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpIHRyYW5zbGF0ZXooMCl9fWBdLFxyXG4gIHByb3ZpZGVyczogW3tcclxuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdWaWJvckNvbXBvbmVudCksXHJcbiAgICBtdWx0aTogdHJ1ZVxyXG4gIH1dXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ1ZpYm9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcclxuICAvLyBMb2NhbCBWYXJpYWJsZVxyXG4gIHB1YmxpYyBfbW9kZWw6IGFueTtcclxuXHJcbiAgcHJpdmF0ZSBmaXJzdExvYWQgPSBmYWxzZTtcclxuICBwcml2YXRlIG9wdGlvbnM6IEFycmF5PGFueT47XHJcbiAgcHVibGljIG91dHB1dDogQXJyYXk8YW55PjtcclxuXHJcbiAgcHVibGljIGlzT3BlbjogYm9vbGVhbjtcclxuXHJcbiAgcHJpdmF0ZSBvbGRRdWVyeTogc3RyaW5nO1xyXG4gIHB1YmxpYyBxdWVyeTogc3RyaW5nO1xyXG5cclxuICBwdWJsaWMgc2VsZWN0b3JQb3NpdGlvbiA9IDA7XHJcbiAgcHJpdmF0ZSB3YWl0VGltZSA9IDUwMDtcclxuXHJcbiAgcHJpdmF0ZSBlbDogRWxlbWVudDsgICAgICAgICAgIC8vIHRoaXMgY29tcG9uZW50ICBlbGVtZW50IGA8dmlib3I+YFxyXG4gIHByaXZhdGUgaW5wdXRFbDogSFRNTElucHV0RWxlbWVudDsgLy8gYDxpbnB1dD5gIGVsZW1lbnQgaW4gYDx2aWJvcj5gIGZvciBhdXRvIGNvbXBsZXRlXHJcbiAgQFZpZXdDaGlsZCgnaW5wdXRDb250cm9sJykgcHVibGljIGlucHV0Q29udHJvbDogTmdNb2RlbDtcclxuXHJcbiAgLy8gSW5wdXRzICYgT3V0cHV0c1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBtdWx0aXBsZSA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBtdWx0aXBsZUxpbWl0ID0gSW5maW5pdHk7XHJcbiAgQElucHV0KCkgcHVibGljIGNvdW50T25QYWdlID0gMTA7XHJcblxyXG4gIEBJbnB1dCgpIHB1YmxpYyBwbGFjZWhvbGRlciA9ICdWaWJvcic7XHJcbiAgQElucHV0KCkgcHVibGljIG5hbWU6IHN0cmluZztcclxuICBASW5wdXQoKSBwdWJsaWMgcmVxdWlyZWQgPSBmYWxzZTtcclxuICBASW5wdXQoKSBwdWJsaWMgYWxsb3dSZXNldCA9IHRydWU7XHJcbiAgcHVibGljIGRpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gIC8vINCe0YLQvtCx0YDQsNC20LXQvdC40LUg0YHQv9C40YHQutC+0LJcclxuICBAQ29udGVudENoaWxkKFZpYm9yQm90aERpcmVjdGl2ZSkgcHVibGljIGJvdGhUZW1wbGF0ZTogVmlib3JCb3RoRGlyZWN0aXZlO1xyXG4gIEBDb250ZW50Q2hpbGQoVmlib3JEcm9wZG93bkRpcmVjdGl2ZSkgcHVibGljIGRyb3Bkb3duVGVtcGxhdGU6IFZpYm9yRHJvcGRvd25EaXJlY3RpdmU7XHJcbiAgQENvbnRlbnRDaGlsZChWaWJvclNlbGVjdGVkRGlyZWN0aXZlKSBwdWJsaWMgc2VsZWN0ZWRUZW1wbGF0ZTogVmlib3JTZWxlY3RlZERpcmVjdGl2ZTtcclxuICBAQ29udGVudENoaWxkKFZpYm9yQ3JlYXRlRGlyZWN0aXZlKSBwdWJsaWMgY3JlYXRlVGVtcGxhdGU6IFZpYm9yQ3JlYXRlRGlyZWN0aXZlO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBsaXN0Rm9ybWF0dGVyOiAoYXJnOiBhbnksIHZhbHVlOiBzdHJpbmcpID0+IHN0cmluZztcclxuICBASW5wdXQoKSBwdWJsaWMgZHJvcGRvd25Gb3JtYXR0ZXI6IChhcmc6IGFueSwgdmFsdWU6IHN0cmluZykgPT4gc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyB2aWV3UHJvcGVydHkgPSAnTmFtZSc7ICAvLyDQn9C+0LvQtSDQtNC70Y8g0LTQtdGE0L7Qu9GC0L3QvtCz0L4g0L7RgtC+0LHRgNCw0LbQtdC90LjRj1xyXG5cclxuICBASW5wdXQoKSBwdWJsaWMgbW9kZWxQcm9wZXJ0eSA9ICdpZCc7ICAvLyDQotC+LCDRh9GC0L4g0LfQsNC/0LjRgdGL0LLQsNC10YLRgdGPINCyINCc0L7QtNC10LvRjFxyXG4gIEBJbnB1dCgpIHB1YmxpYyBwcmVsb2FkUHJvcGVydHkgPSAnaWRzJzsgLy8g0JrQu9GO0Ycg0LfQsNC/0YDQvtGB0LAg0Log0YHQtdGA0LLQtdGA0YMg0LTQu9GPINC/0YDQtdC00LfQsNCz0YDRg9C30LrQuCwg0LXRgdC70LggdW5kZWZpbmVkINC30LDQv9C40YHRi9Cy0LDQtdGC0YHRjyDQstC10YHRjCDQvtCx0YrQtdC60YJcclxuICBASW5wdXQoKSBwdWJsaWMgcHJlbG9hZEZpZWxkOiBzdHJpbmcgPSB1bmRlZmluZWQ7IC8vINCX0L3QsNGH0LXQvdC40LUg0L/QvtC70Y8sINC60L7RgtC+0YDQtSDQvdC10L7QsdGF0L7QtNC40LzQviDQvtGC0L/RgNCw0LLQuNGC0Ywg0LIg0LfQsNC/0YDQvtGBLlxyXG4gIEBJbnB1dCgpIHB1YmxpYyBzZWFyY2hQcm9wZXJ0eSA9ICdxdWVyeSc7XHJcblxyXG4gIEBJbnB1dCgpIHB1YmxpYyBkYXRhTGlzdDogKChwYXJhbTogT2JqZWN0LCBwYWdlOiBudW1iZXIsIGNvdW50T25QYWdlPzogbnVtYmVyKSA9PiBPYnNlcnZhYmxlPElEYXRhUmVzcG9uc2U+KSB8IEFycmF5PGFueT47XHJcbiAgQElucHV0KCkgcHVibGljIGV4Y2x1ZGVMaXN0OiBBcnJheTxhbnk+O1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBhZGRpdGlvbmFsRmlsdGVyID0ge307XHJcbiAgQElucHV0KCkgcHVibGljIG9ubHlFbWl0dGVyOiBib29sZWFuO1xyXG4gIEBPdXRwdXQoJ2NoYW5nZUZ1bGxNb2RlbCcpIHB1YmxpYyBjaGFuZ2VGdWxsTW9kZWw6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuXHJcbiAgQElucHV0KCkgcHVibGljIG5ld01lc3NhZ2U6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICBASW5wdXQoKSBwdWJsaWMgQ3JlYXRlTmV3OiAocXVlcnk6IHN0cmluZykgPT4gT2JzZXJ2YWJsZTxhbnk+IHwgYW55ID0gKHF1ZXJ5OiBzdHJpbmcpID0+IHtcclxuICAgIHJldHVybiBxdWVyeTtcclxuICB9XHJcblxyXG5cclxuICAvLyBTdWJzY3JpcHRpb25cclxuICBwdWJsaWMgZGF0YUxpc3RTdWI6IFN1YnNjcmlwdGlvbjtcclxuXHJcblxyXG4gIC8vIE9QVElPTlNcclxuICBwdWJsaWMgVHJhY2tCeUZuKGluZGV4OiBudW1iZXIpOiBhbnkge1xyXG4gICAgcmV0dXJuIGluZGV4O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNob3dEcm9wZG93bkxpc3QoZXZlbnQ6IEZvY3VzRXZlbnQgfCBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMubXVsdGlwbGUgJiYgdGhpcy5vdXRwdXQubGVuZ3RoID49IHRoaXMubXVsdGlwbGVMaW1pdCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCdvcGVuLXZpYm9yJyk7XHJcbiAgICB0aGlzLmlucHV0RWwuZm9jdXMoKTtcclxuICAgIHRoaXMudXBkYXRlT3B0aW9ucygpO1xyXG4gICAgdGhpcy5vblRvdWNoZWQoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGlkZURyb3Bkb3duTGlzdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZSgnb3Blbi12aWJvcicpO1xyXG4gICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcclxuICAgIHRoaXMuaW5wdXRFbC5ibHVyKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaGlkZURyb3Bkb3duTGlzdFdpdGhEZWxheSgpOiB2b2lkIHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLmhpZGVEcm9wZG93bkxpc3QoKTtcclxuICAgIH0sIDEwMCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdG9nZ2xlRHJvcGRvd24oZXZlbnQ6IEV2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuaXNPcGVuKSB7XHJcbiAgICAgIHRoaXMuaGlkZURyb3Bkb3duTGlzdCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zaG93RHJvcGRvd25MaXN0KHVuZGVmaW5lZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRlbGF5OiBGdW5jdGlvbiA9IChmdW5jdGlvbiAoKTogRnVuY3Rpb24ge1xyXG4gICAgbGV0IHRpbWVyID0gMDtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoY2FsbGJhY2s6IGFueSwgbXM6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xyXG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQoY2FsbGJhY2ssIG1zKTtcclxuICAgIH07XHJcbiAgfSkoKTtcclxuXHJcbiAgcHVibGljIHVwZGF0ZU9wdGlvbnMoKTogdm9pZCB7XHJcbiAgICB0aGlzLmlzT3BlbiA9IHRydWU7XHJcbiAgICBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgIHRoaXMub3B0aW9ucyA9IHRoaXMuZGF0YUxpc3QuZmlsdGVyKGRhdGEgPT4ge1xyXG4gICAgICAgIGlmICghdGhpcy5xdWVyeSB8fCB0aGlzLnF1ZXJ5Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBmOiBhbnkgPSBmZXRjaEZyb21PYmplY3QoZGF0YSwgdGhpcy5zZWFyY2hQcm9wZXJ0eSk7XHJcbiAgICAgICAgaWYgKGYgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZikuaW5kZXhPZih0aGlzLnF1ZXJ5KSA+PSAwO1xyXG4gICAgICB9KS5maWx0ZXIoZGF0YSA9PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmV4Y2x1ZGVMaXN0KSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBkID0gZmV0Y2hGcm9tT2JqZWN0KGRhdGEsIHRoaXMubW9kZWxQcm9wZXJ0eSkudmFsdWVPZigpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmV4Y2x1ZGVMaXN0LmZpbmRJbmRleChleCA9PiB7XHJcbiAgICAgICAgICBsZXQgYSA9IGZldGNoRnJvbU9iamVjdChleCwgdGhpcy5tb2RlbFByb3BlcnR5KS52YWx1ZU9mKCk7XHJcbiAgICAgICAgICByZXR1cm4gZGVlcEVxdWFsKGQsIGEpO1xyXG4gICAgICAgIH0pIDwgMDtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICBpZiAodGhpcy5kYXRhTGlzdFN1YikgeyB0aGlzLmRhdGFMaXN0U3ViLnVuc3Vic2NyaWJlKCk7IH1cclxuICAgICAgaWYgKCF0aGlzLmN1cnJlbnRDYWNoZSkge1xyXG4gICAgICAgIHRoaXMuY3VycmVudENhY2hlID0ge1xyXG4gICAgICAgICAgY291bnRFbGVtZW50OiAwLFxyXG4gICAgICAgICAgY291bnRQYWdlczogMSxcclxuICAgICAgICAgIGN1cnJlbnRQYWdlOiAxLFxyXG4gICAgICAgICAgb2JqZWN0czogW10sXHJcbiAgICAgICAgICBxdWVyeTogdGhpcy5xdWVyeSxcclxuICAgICAgICAgIHBhcmFtczogT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5hZGRpdGlvbmFsRmlsdGVyKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5jYWNoZUxhenlEYXRhLnB1c2godGhpcy5jdXJyZW50Q2FjaGUpO1xyXG5cclxuICAgICAgICBsZXQgcGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5hZGRpdGlvbmFsRmlsdGVyKSBhcyBhbnk7XHJcbiAgICAgICAgcGFyYW1zW3RoaXMuc2VhcmNoUHJvcGVydHldID0gdGhpcy5xdWVyeTtcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhTGlzdFN1YiA9ICg8T2JzZXJ2YWJsZTxJRGF0YVJlc3BvbnNlPj50aGlzLmRhdGFMaXN0KHBhcmFtcywgMSwgdGhpcy5jb3VudE9uUGFnZSkpLnN1YnNjcmliZShhbnN3ZXIgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jdXJyZW50Q2FjaGUub2JqZWN0cyA9IHRoaXMuY3VycmVudENhY2hlLm9iamVjdHMuY29uY2F0KGFuc3dlci5saXN0KTtcclxuICAgICAgICAgIHRoaXMuY3VycmVudENhY2hlLmNvdW50RWxlbWVudCA9IGFuc3dlci5oZWFkZXJzWydjb3VudCddO1xyXG4gICAgICAgICAgdGhpcy5jdXJyZW50Q2FjaGUuY291bnRQYWdlcyA9IE1hdGguY2VpbCh0aGlzLmN1cnJlbnRDYWNoZS5jb3VudEVsZW1lbnQgLyB0aGlzLmNvdW50T25QYWdlKTtcclxuICAgICAgICB9LCAoKSA9PiB7IH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdXBkYXRlT3B0aW9uc0luRGVsYXkoKTogdm9pZCB7XHJcbiAgICBsZXQgZGVsYXlNczogbnVtYmVyID0gdGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEFycmF5ID8gMTAgOiB0aGlzLndhaXRUaW1lO1xyXG5cclxuICAgIC8vIGV4ZWN1dGluZyBhZnRlciB1c2VyIHN0b3BwZWQgdHlwaW5nXHJcbiAgICB0aGlzLmRlbGF5KCgpID0+IHtcclxuICAgICAgdGhpcy5vbGRRdWVyeSA9IHRoaXMucXVlcnk7XHJcbiAgICAgIHRoaXMuY3VycmVudENhY2hlID0gdGhpcy5HZXRDYWNoZSh0aGlzLnF1ZXJ5KTtcclxuICAgICAgdGhpcy51cGRhdGVPcHRpb25zKCk7XHJcbiAgICB9LCBkZWxheU1zKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZm9jdXNTZWxlY3RlZE9wdGlvbigpOiB2b2lkIHtcclxuICAgIGxldCBsaXN0OiBhbnkgPSA8SFRNTEVsZW1lbnQ+dGhpcy5lbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzZWxlY3QtZHJvcGRvd24nKVswXTtcclxuICAgIGxldCB0YXJnZXRMaTogYW55ID0gPEhUTUxFbGVtZW50PnRoaXMuZWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvbicpW3RoaXMuc2VsZWN0b3JQb3NpdGlvbl07XHJcbiAgICBzY3JvbGxBY3RpdmVPcHRpb24obGlzdCwgdGFyZ2V0TGkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGtleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5PcHRpb25zKSB7XHJcbiAgICAgIHRoaXMuc2hvd0Ryb3Bkb3duTGlzdCh1bmRlZmluZWQpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHRvdGFsTnVtSXRlbTogbnVtYmVyID0gdGhpcy5PcHRpb25zLmxlbmd0aDtcclxuXHJcbiAgICBpZiAodGhpcy5TaG93TmV3KSB7XHJcbiAgICAgIHRvdGFsTnVtSXRlbSsrO1xyXG4gICAgfVxyXG5cclxuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xyXG4gICAgICBjYXNlIDI3OiAvLyBFU0MsIGhpZGUgYXV0byBjb21wbGV0ZVxyXG4gICAgICAgIHRoaXMuaGlkZURyb3Bkb3duTGlzdCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAzODogLy8gVVAsIHNlbGVjdCB0aGUgcHJldmlvdXMgbGkgZWxcclxuICAgICAgICB0aGlzLnNlbGVjdG9yUG9zaXRpb24gPSAodG90YWxOdW1JdGVtICsgdGhpcy5zZWxlY3RvclBvc2l0aW9uIC0gMSkgJSB0b3RhbE51bUl0ZW07XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDQwOiAvLyBET1dOLCBzZWxlY3QgdGhlIG5leHQgbGkgZWwgb3IgdGhlIGZpcnN0IG9uZVxyXG4gICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNlbGVjdG9yUG9zaXRpb24gPSAodG90YWxOdW1JdGVtICsgdGhpcy5zZWxlY3RvclBvc2l0aW9uICsgMSkgJSB0b3RhbE51bUl0ZW07XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIDEzOiAvLyBFTlRFUiwgY2hvb3NlIGl0ISFcclxuICAgICAgICBpZiAodG90YWxOdW1JdGVtID4gMCkge1xyXG4gICAgICAgICAgaWYgKHRoaXMuc2VsZWN0b3JQb3NpdGlvbiA9PT0gdGhpcy5PcHRpb25zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLkFkZE5ld09iamVjdCh0aGlzLkNyZWF0ZU5ldyh0aGlzLnF1ZXJ5KSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdE9uZShldmVudCwgdGhpcy5PcHRpb25zW3RoaXMuc2VsZWN0b3JQb3NpdGlvbl0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5TaG93TmV3KSB7XHJcbiAgICAgICAgICB0aGlzLkFkZE5ld09iamVjdCh0aGlzLkNyZWF0ZU5ldyh0aGlzLnF1ZXJ5KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgZGVmYXVsdDogYnJlYWs7XHJcbiAgICB9XHJcbiAgICB0aGlzLmZvY3VzU2VsZWN0ZWRPcHRpb24oKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZXh0UGFnZSgkZXZlbnQ6IEV2ZW50KTogdm9pZCB7XHJcbiAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAvLyBWYWxpZGF0b3JzXHJcbiAgICBpZiAoISh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgRnVuY3Rpb24pKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignRGF0YSBMaXN0IG1hc3QgYmUgRnVuY3Rpb24nKTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5jdXJyZW50Q2FjaGUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGb3IgbmV4dCBwYWdlIG5lZWQgY2FjaGUgZm9yIGZpcnN0IFBhZ2UnKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmN1cnJlbnRDYWNoZS5jdXJyZW50UGFnZSA+PSB0aGlzLmN1cnJlbnRDYWNoZS5jb3VudFBhZ2VzKSB7IHRocm93IG5ldyBFcnJvcignTWF4IFBhZ2UgTGltaXQnKTsgfVxyXG5cclxuICAgIGlmICh0aGlzLmRhdGFMaXN0U3ViKSB7IHRoaXMuZGF0YUxpc3RTdWIudW5zdWJzY3JpYmUoKTsgfVxyXG5cclxuICAgIGxldCBwYXJhbXM6IGFueSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYWRkaXRpb25hbEZpbHRlcik7XHJcbiAgICBwYXJhbXNbdGhpcy5zZWFyY2hQcm9wZXJ0eV0gPSB0aGlzLnF1ZXJ5O1xyXG5cclxuICAgIHRoaXMuZGF0YUxpc3RTdWIgPSB0aGlzLmRhdGFMaXN0KHBhcmFtcywgdGhpcy5jdXJyZW50Q2FjaGUuY3VycmVudFBhZ2UgKyAxLCB0aGlzLmNvdW50T25QYWdlKS5zdWJzY3JpYmUoYW5zd2VyID0+IHtcclxuICAgICAgdGhpcy5jdXJyZW50Q2FjaGUuY3VycmVudFBhZ2UrKztcclxuICAgICAgdGhpcy5jdXJyZW50Q2FjaGUuY291bnRFbGVtZW50ID0gYW5zd2VyLmhlYWRlcnNbJ2NvdW50J107XHJcbiAgICAgIHRoaXMuY3VycmVudENhY2hlLmNvdW50UGFnZXMgPSBNYXRoLmNlaWwodGhpcy5jdXJyZW50Q2FjaGUuY291bnRFbGVtZW50IC8gdGhpcy5jb3VudE9uUGFnZSk7XHJcbiAgICAgIHRoaXMuY3VycmVudENhY2hlLm9iamVjdHMgPSB0aGlzLmN1cnJlbnRDYWNoZS5vYmplY3RzLmNvbmNhdChhbnN3ZXIubGlzdCk7XHJcbiAgICAgIHRoaXMuc2VsZWN0b3JQb3NpdGlvbiA9ICh0aGlzLmN1cnJlbnRDYWNoZS5jdXJyZW50UGFnZSAtIDEpICogdGhpcy5jb3VudE9uUGFnZSArIDE7XHJcbiAgICAgIHRoaXMuZm9jdXNTZWxlY3RlZE9wdGlvbigpO1xyXG4gICAgfSwgKCkgPT4geyB9KTtcclxuICB9XHJcblxyXG4gIC8vIE1PREVMXHJcbiAgcHJpdmF0ZSBjbGVhclByb3BlcnR5KCk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3RvclBvc2l0aW9uID0gMDtcclxuICAgIHRoaXMucXVlcnkgPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2VsZWN0T25lKCRldmVudDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQsIGRhdGE6IGFueSk6IHZvaWQge1xyXG4gICAgLy8g0KTQuNC70YzRgtGAINC90LXQvdGD0LbQvdGL0YUg0YHQvtCx0YvRgtC40LlcclxuICAgIGlmICgkZXZlbnQgaW5zdGFuY2VvZiBNb3VzZUV2ZW50ICYmICRldmVudC5idXR0b24gIT09IDApIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgaWYgKHRoaXMubXVsdGlwbGUgJiYgdGhpcy5vdXRwdXQubGVuZ3RoIDwgdGhpcy5tdWx0aXBsZUxpbWl0KSB7XHJcbiAgICAgIHRoaXMub3V0cHV0LnB1c2goZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKCF0aGlzLm11bHRpcGxlKSB7XHJcbiAgICAgIHRoaXMub3V0cHV0ID0gW2RhdGFdO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jaGFuZ2VGdWxsTW9kZWwuZW1pdCh0aGlzLm91dHB1dCk7XHJcbiAgICB0aGlzLk1vZGVsID0gdGhpcy5WYWx1ZUZyb21PdXRwdXQ7XHJcbiAgICB0aGlzLmNsZWFyUHJvcGVydHkoKTtcclxuICAgIHRoaXMuaGlkZURyb3Bkb3duTGlzdCgpO1xyXG4gICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfTtcclxuXHJcbiAgcHVibGljIHJlbW92ZU9uZShpbmRleDogbnVtYmVyLCBldmVudDogRXZlbnQpOiB2b2lkIHtcclxuICAgIGlmIChldmVudCkge1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgdGhpcy5vdXRwdXQuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIHRoaXMuTW9kZWwgPSB0aGlzLlZhbHVlRnJvbU91dHB1dDtcclxuXHJcbiAgICAvLyBzZXQgY2xhc3NcclxuICAgIHRoaXMub25Ub3VjaGVkKCk7XHJcbiAgICB0aGlzLmlucHV0Q29udHJvbC5jb250cm9sLm1hcmtBc1RvdWNoZWQoKTtcclxuXHJcbiAgICAvLyBvcGVuIGRyb3Bkb3duXHJcbiAgICBpZiAodGhpcy5yZXF1aXJlZCkge1xyXG4gICAgICB0aGlzLnNob3dEcm9wZG93bkxpc3QodW5kZWZpbmVkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIEZPUk1BVFRJTkdcclxuXHJcbiAgcHVibGljIGdldCBTZWxlY3RlZFRlbXBsYXRlKCk6IFRlbXBsYXRlUmVmPGFueT4ge1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRUZW1wbGF0ZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZFRlbXBsYXRlLnRlbXBsYXRlUmVmO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmJvdGhUZW1wbGF0ZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5ib3RoVGVtcGxhdGUudGVtcGxhdGVSZWY7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBEcm9wZG93blRlbXBsYXRlKCk6IFRlbXBsYXRlUmVmPGFueT4ge1xyXG4gICAgaWYgKHRoaXMuZHJvcGRvd25UZW1wbGF0ZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5kcm9wZG93blRlbXBsYXRlLnRlbXBsYXRlUmVmO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmJvdGhUZW1wbGF0ZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5ib3RoVGVtcGxhdGUudGVtcGxhdGVSZWY7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldExpc3RGb3JtYXR0ZWQoZGF0YTogYW55KTogc3RyaW5nIHtcclxuICAgIGxldCBmb3JtYXR0ZXI6IGFueSA9IHRoaXMubGlzdEZvcm1hdHRlciB8fCBkZWZhdWx0Rm9ybWF0dGVyO1xyXG4gICAgcmV0dXJuIGZvcm1hdHRlci5hcHBseSh0aGlzLCBbZGF0YSwgdGhpcy52aWV3UHJvcGVydHldKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXREcm9wZG93bkZvcm1hdHRlZChkYXRhOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgbGV0IGZvcm1hdHRlcjogYW55ID0gdGhpcy5kcm9wZG93bkZvcm1hdHRlciB8fCBkZWZhdWx0Rm9ybWF0dGVyO1xyXG4gICAgcmV0dXJuIGZvcm1hdHRlci5hcHBseSh0aGlzLCBbZGF0YSwgdGhpcy52aWV3UHJvcGVydHldKTtcclxuICB9XHJcblxyXG4gIC8vIElOSVRcclxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAvLyB0aGlzLk1vZGVsID0gdGhpcy5WYWx1ZUZyb21PdXRwdXQ7INCt0YLQviDQstGA0L7QtNC1INGC0YPRgiDRgtC+0LbQtSDRg9C20LUg0L3QtSDQvdCw0LTQvi5cclxuICAgIHRoaXMuZWwgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd2aWJvcicpLml0ZW0oMCk7XHJcbiAgICB0aGlzLmlucHV0RWwgPSA8SFRNTElucHV0RWxlbWVudD4odGhpcy5lbC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhpbnB1dHM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIGlmIChpbnB1dHNbJ2RhdGFMaXN0J10gJiYgaW5wdXRzWydkYXRhTGlzdCddLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICAvLyBPdXRwdXRcclxuICAgICAgaWYgKHRoaXMuTW9kZWwgPT09IHVuZGVmaW5lZCB8fCB0aGlzLk1vZGVsID09IG51bGwpIHtcclxuICAgICAgICB0aGlzLm91dHB1dCA9IFtdO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlRnVsbE1vZGVsLmVtaXQodGhpcy5vdXRwdXQpO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuTW9kZWwgaW5zdGFuY2VvZiBBcnJheSAmJiB0aGlzLm11bHRpcGxlKSB7XHJcbiAgICAgICAgdGhpcy5PdXRwdXQgPSB0aGlzLk1vZGVsO1xyXG4gICAgICB9IGVsc2UgaWYgKCEodGhpcy5Nb2RlbCBpbnN0YW5jZW9mIEFycmF5KSAmJiAhdGhpcy5tdWx0aXBsZSkge1xyXG4gICAgICAgIHRoaXMuT3V0cHV0ID0gW3RoaXMuTW9kZWxdO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMub3V0cHV0IHx8ICF0aGlzLm91dHB1dC5sZW5ndGgpIHtcclxuICAgICAgICAgIHRoaXMuTW9kZWwgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlucHV0c1snbXVsdGlwbGUnXSkge1xyXG4gICAgICBpZiAoaW5wdXRzWydtdWx0aXBsZSddLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCgnbXVsdGlwbGUnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ211bHRpcGxlJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoaW5wdXRzWydhZGRpdGlvbmFsRmlsdGVyJ10pIHtcclxuICAgICAgdGhpcy5jdXJyZW50Q2FjaGUgPSB0aGlzLkdldENhY2hlKHRoaXMucXVlcnkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxEaXZFbGVtZW50Pikge1xyXG4gICAgdGhpcy5vdXRwdXQgPSBbXTtcclxuICB9XHJcblxyXG4gIC8vIEZPUk1TXHJcbiAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgLy8g0J3QvtGA0LzQsNC70YzQvdGL0LkgdXBkYXRlINC80L7QtNC10LvQuFxyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIGlmICgodmFsdWUgaW5zdGFuY2VvZiBBcnJheSAmJiAhdGhpcy5tdWx0aXBsZSkgfHwgKCEodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkgJiYgdGhpcy5tdWx0aXBsZSkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01vZGVsIFR5cGUgRXJyb3InKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBBcnJheSAmJiB0aGlzLk1vZGVsIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICBpZiAodmFsdWUubGVuZ3RoID09PSB0aGlzLk1vZGVsLmxlbmd0aCAmJiB2YWx1ZS5ldmVyeSh2ID0+IHRoaXMuTW9kZWwuaW5kZXhPZih2KSA+PSAwKSkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLk1vZGVsID09PSB2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmZpcnN0TG9hZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuTW9kZWwgPSB2YWx1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbkNoYW5nZTogYW55ID0gKCkgPT4geyB9O1xyXG4gIHB1YmxpYyBvblRvdWNoZWQ6IGFueSA9ICgpID0+IHsgfTtcclxuXHJcbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XHJcbiAgICBpZiAoaXNEaXNhYmxlZCkge1xyXG4gICAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZWwucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gICAgfVxyXG4gICAgLy8gZGlzYWJsZSBvdGhlciBjb21wb25lbnRzIGhlcmVcclxuICB9XHJcblxyXG4gIHNldCBNb2RlbCh2YWx1ZTogYW55KSB7XHJcbiAgICBpZiAodGhpcy5vbmx5RW1pdHRlcikge1xyXG4gICAgICB0aGlzLm91dHB1dCA9IFtdO1xyXG4gICAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE91dHB1dFxyXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLm91dHB1dCA9IFtdO1xyXG4gICAgICB0aGlzLmNoYW5nZUZ1bGxNb2RlbC5lbWl0KHRoaXMub3V0cHV0KTtcclxuICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBBcnJheSAmJiB0aGlzLm11bHRpcGxlKSB7XHJcbiAgICAgIHRoaXMuT3V0cHV0ID0gdmFsdWU7XHJcbiAgICB9IGVsc2UgaWYgKCEodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkgJiYgIXRoaXMubXVsdGlwbGUpIHtcclxuICAgICAgdGhpcy5PdXRwdXQgPSBbdmFsdWVdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE1vZGVsXHJcbiAgICB0aGlzLl9tb2RlbCA9IHZhbHVlO1xyXG5cclxuICAgIC8vIEZvcm1zXHJcbiAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuX21vZGVsKTtcclxuICB9XHJcblxyXG4gIGdldCBNb2RlbCgpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuX21vZGVsO1xyXG4gIH1cclxuXHJcbiAgLy8gUFJPUEVSVFlcclxuICBnZXQgSW5wdXRIaWRlKCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMub3V0cHV0Lmxlbmd0aCA+PSB0aGlzLm11bHRpcGxlTGltaXQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5vdXRwdXQubGVuZ3RoID09PSAxICYmICF0aGlzLmlzT3BlbjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBWYWx1ZUZyb21PdXRwdXQoKTogYW55IHtcclxuICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XHJcbiAgICAgIGxldCB0bXA6IEFycmF5PGFueT4gPSBbXTtcclxuICAgICAgZm9yIChsZXQgbyBvZiB0aGlzLm91dHB1dCkge1xyXG4gICAgICAgIHRtcC5wdXNoKGZldGNoRnJvbU9iamVjdChvLCB0aGlzLm1vZGVsUHJvcGVydHkpKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdG1wO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZldGNoRnJvbU9iamVjdCh0aGlzLm91dHB1dFswXSwgdGhpcy5tb2RlbFByb3BlcnR5KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldCBPdXRwdXQobmV3VmFsdWU6IEFycmF5PGFueT4pIHtcclxuICAgIGxldCBkYXRhTGlzdDogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICBkYXRhTGlzdCA9IHRoaXMuZGF0YUxpc3Q7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICBpZiAobmV3VmFsdWUgJiYgbmV3VmFsdWUubGVuZ3RoICYmIHRoaXMuZmlyc3RMb2FkKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtczogYW55ID0ge307XHJcbiAgICAgICAgdGhpcy5maXJzdExvYWQgPSBmYWxzZTtcclxuICAgICAgICBpZiAoIXRoaXMucHJlbG9hZFByb3BlcnR5KSB7XHJcbiAgICAgICAgICB0aGlzLm91dHB1dCA9IG5ld1ZhbHVlO1xyXG4gICAgICAgICAgdGhpcy5jaGFuZ2VGdWxsTW9kZWwuZW1pdCh0aGlzLm91dHB1dCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHBhcmFtc1t0aGlzLnByZWxvYWRQcm9wZXJ0eV0gPSBuZXdWYWx1ZS5tYXAodmFsID0+IGZldGNoRnJvbU9iamVjdCh2YWwsIHRoaXMucHJlbG9hZEZpZWxkKSk7XHJcbiAgICAgICAgICB0aGlzLmRhdGFMaXN0U3ViID0gKDxPYnNlcnZhYmxlPElEYXRhUmVzcG9uc2U+PnRoaXMuZGF0YUxpc3QocGFyYW1zLCAxLCB0aGlzLmNvdW50T25QYWdlKSkuc3Vic2NyaWJlKGFuc3dlciA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub3V0cHV0ID0gYW5zd2VyLmxpc3Q7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRnVsbE1vZGVsLmVtaXQodGhpcy5vdXRwdXQpO1xyXG4gICAgICAgICAgfSwgKCkgPT4geyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VGdWxsTW9kZWwuZW1pdCh0aGlzLm91dHB1dCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMuZGF0YUxpc3QgPT09IHVuZGVmaW5lZCkgeyByZXR1cm47IH1cclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdkYXRhTGlzdCB2YWx1ZSBFcnJvcicpO1xyXG4gICAgfVxyXG4gICAgbGV0IG5ld091dHB1dDogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgZm9yIChsZXQgdiBvZiBuZXdWYWx1ZSkge1xyXG4gICAgICBmb3IgKGxldCBkIG9mIGRhdGFMaXN0KSB7XHJcbiAgICAgICAgbGV0IGEgPSBmZXRjaEZyb21PYmplY3QoZCwgdGhpcy5tb2RlbFByb3BlcnR5KSA/IGZldGNoRnJvbU9iamVjdChkLCB0aGlzLm1vZGVsUHJvcGVydHkpLnZhbHVlT2YoKSA6IHVuZGVmaW5lZDtcclxuICAgICAgICBsZXQgYiA9IHYgPyB2LnZhbHVlT2YoKSA6IHVuZGVmaW5lZDtcclxuICAgICAgICBpZiAoZGVlcEVxdWFsKGEsIGIpKSB7XHJcbiAgICAgICAgICBuZXdPdXRwdXQucHVzaChkKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMub3V0cHV0ID0gbmV3T3V0cHV0O1xyXG4gICAgdGhpcy5jaGFuZ2VGdWxsTW9kZWwuZW1pdCh0aGlzLm91dHB1dCk7XHJcbiAgfVxyXG5cclxuICBnZXQgT3B0aW9ucygpOiBBcnJheTxhbnk+IHtcclxuICAgIGxldCBvcHRpb25zOiBBcnJheTxhbnk+O1xyXG4gICAgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgbGV0IG9sZENhY2hlID0gdGhpcy5HZXRDYWNoZSh0aGlzLm9sZFF1ZXJ5KTtcclxuXHJcbiAgICAgIGlmICghdGhpcy5jdXJyZW50Q2FjaGUgJiYgb2xkQ2FjaGUpIHtcclxuICAgICAgICBvcHRpb25zID0gb2xkQ2FjaGUub2JqZWN0cztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBvcHRpb25zID0gdGhpcy5jdXJyZW50Q2FjaGUgPyB0aGlzLmN1cnJlbnRDYWNoZS5vYmplY3RzIDogW107XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiAob3B0aW9ucyB8fCBbXSkuZmlsdGVyKG9wID0+IHtcclxuICAgICAgcmV0dXJuIHRoaXMub3V0cHV0LmZpbmRJbmRleChvID0+IHtcclxuICAgICAgICBsZXQgYSA9IGZldGNoRnJvbU9iamVjdChvLCB0aGlzLm1vZGVsUHJvcGVydHkpID8gZmV0Y2hGcm9tT2JqZWN0KG8sIHRoaXMubW9kZWxQcm9wZXJ0eSkudmFsdWVPZigpIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIGxldCBiID0gZmV0Y2hGcm9tT2JqZWN0KG9wLCB0aGlzLm1vZGVsUHJvcGVydHkpID8gZmV0Y2hGcm9tT2JqZWN0KG9wLCB0aGlzLm1vZGVsUHJvcGVydHkpLnZhbHVlT2YoKSA6IHVuZGVmaW5lZDtcclxuICAgICAgICByZXR1cm4gZGVlcEVxdWFsKGEsIGIpO1xyXG4gICAgICB9KSA9PT0gLTE7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjdXJyZW50Q2FjaGU6IENhY2hlSW5mbztcclxuICBwcml2YXRlIEdldENhY2hlKHF1ZXJ5OiBzdHJpbmcpOiBDYWNoZUluZm8ge1xyXG4gICAgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICByZXR1cm4gdGhpcy5jYWNoZUxhenlEYXRhLmZpbmQoY2FjaGUgPT4ge1xyXG4gICAgICAgIHJldHVybiBjYWNoZS5xdWVyeSA9PT0gdGhpcy5xdWVyeSAmJiBkZWVwRXF1YWwoY2FjaGUucGFyYW1zLCB0aGlzLmFkZGl0aW9uYWxGaWx0ZXIpO1xyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8vIENyZWF0ZU5ld1xyXG5cclxuICBwdWJsaWMgQWRkTmV3T2JqZWN0KHZhbHVlOiBPYnNlcnZhYmxlPGFueT4gfCBhbnkpOiB2b2lkIHtcclxuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcclxuICAgICAgdmFsdWUuc3Vic2NyaWJlKG5ld09iamVjdCA9PiB7XHJcbiAgICAgICAgaWYgKG5ld09iamVjdCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICB0aGlzLlNldE5ld09iamVjdChuZXdPYmplY3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNldE5ld09iamVjdCh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIFNldE5ld09iamVjdChuZXdPYmplY3Q6IGFueSkge1xyXG4gICAgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICB0aGlzLmRhdGFMaXN0LnB1c2gobmV3T2JqZWN0KTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgIGZvciAobGV0IGNhY2hlIG9mIHRoaXMuY2FjaGVMYXp5RGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLnF1ZXJ5LmluY2x1ZGVzKGNhY2hlLnF1ZXJ5KSB8fCBjYWNoZS5xdWVyeSA9PT0gdW5kZWZpbmVkIHx8IGNhY2hlLnF1ZXJ5ID09PSAnJykge1xyXG4gICAgICAgICAgY2FjaGUuY291bnRFbGVtZW50Kys7XHJcbiAgICAgICAgICBjYWNoZS5vYmplY3RzLnB1c2gobmV3T2JqZWN0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmZpcnN0TG9hZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5xdWVyeSA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuY3VycmVudENhY2hlID0gdGhpcy5HZXRDYWNoZSh0aGlzLnF1ZXJ5KTtcclxuICAgIHRoaXMuc2VsZWN0T25lKG5ldyBNb3VzZUV2ZW50KCdjbGljaycpLCBuZXdPYmplY3QpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IFNob3dOZXcoKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgYSA9IHRoaXMucXVlcnkgJiYgdGhpcy5uZXdNZXNzYWdlICYmICghdGhpcy5kYXRhTGlzdFN1YiB8fCB0aGlzLmRhdGFMaXN0U3ViLmNsb3NlZCk7XHJcblxyXG4gICAgbGV0IGIgPSB0aGlzLk9wdGlvbnMuZmluZEluZGV4KG8gPT4ge1xyXG4gICAgICBsZXQgYyA9IGZldGNoRnJvbU9iamVjdChvLCB0aGlzLnZpZXdQcm9wZXJ0eSkgPyBmZXRjaEZyb21PYmplY3QobywgdGhpcy52aWV3UHJvcGVydHkpLnZhbHVlT2YoKSA6IHVuZGVmaW5lZDtcclxuICAgICAgcmV0dXJuIGRlZXBFcXVhbChjLCB0aGlzLnF1ZXJ5KTtcclxuICAgIH0pID09PSAtMSAmJiB0aGlzLm91dHB1dC5maW5kSW5kZXgobyA9PiB7XHJcbiAgICAgIGxldCBjID0gZmV0Y2hGcm9tT2JqZWN0KG8sIHRoaXMudmlld1Byb3BlcnR5KSA/IGZldGNoRnJvbU9iamVjdChvLCB0aGlzLnZpZXdQcm9wZXJ0eSkudmFsdWVPZigpIDogdW5kZWZpbmVkO1xyXG4gICAgICByZXR1cm4gZGVlcEVxdWFsKGMsIHRoaXMucXVlcnkpO1xyXG4gICAgfSkgPT09IC0xO1xyXG5cclxuICAgIHJldHVybiBhICYmIGI7XHJcbiAgfVxyXG5cclxuICBnZXQgU2hvd0VtcHR5KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuT3B0aW9ucy5sZW5ndGggPT09IDAgJiYgKCEodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB8fCAodGhpcy5kYXRhTGlzdFN1Yi5jbG9zZWQpKTtcclxuICB9XHJcblxyXG5cclxuICAvLyBDQUNIRVxyXG4gIHByaXZhdGUgY2FjaGVMYXp5RGF0YTogQXJyYXk8Q2FjaGVJbmZvPiA9IFtdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENhY2hlSW5mbyB7XHJcbiAgY291bnRFbGVtZW50OiBudW1iZXI7XHJcbiAgY291bnRQYWdlczogbnVtYmVyO1xyXG4gIGN1cnJlbnRQYWdlOiBudW1iZXI7XHJcbiAgb2JqZWN0czogQXJyYXk8YW55PjtcclxuXHJcbiAgcXVlcnk6IHN0cmluZztcclxuICBwYXJhbXM6IGFueTtcclxufVxyXG4iXX0=