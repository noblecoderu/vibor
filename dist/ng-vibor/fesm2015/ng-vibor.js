import { Injectable, Directive, TemplateRef, Component, Input, Output, forwardRef, EventEmitter, ElementRef, ContentChild, ViewChild, NgModule, defineInjectable } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgViborService {
    constructor() { }
}
NgViborService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
NgViborService.ctorParameters = () => [];
/** @nocollapse */ NgViborService.ngInjectableDef = defineInjectable({ factory: function NgViborService_Factory() { return new NgViborService(); }, token: NgViborService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ViborDropdownDirective {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
ViborDropdownDirective.decorators = [
    { type: Directive, args: [{ selector: '[viborDropdownElement]' },] },
];
/** @nocollapse */
ViborDropdownDirective.ctorParameters = () => [
    { type: TemplateRef }
];
class ViborSelectedDirective {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
ViborSelectedDirective.decorators = [
    { type: Directive, args: [{ selector: '[viborSelectedElement]' },] },
];
/** @nocollapse */
ViborSelectedDirective.ctorParameters = () => [
    { type: TemplateRef }
];
class ViborBothDirective {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
ViborBothDirective.decorators = [
    { type: Directive, args: [{ selector: '[viborBothElement]' },] },
];
/** @nocollapse */
ViborBothDirective.ctorParameters = () => [
    { type: TemplateRef }
];
class ViborCreateDirective {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
ViborCreateDirective.decorators = [
    { type: Directive, args: [{ selector: '[viborCreate]' },] },
];
/** @nocollapse */
ViborCreateDirective.ctorParameters = () => [
    { type: TemplateRef }
];

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
    const /** @type {?} */ index = prop.indexOf('.');
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
    let /** @type {?} */ html = '';
    html += fetchFromObject(data, valuePropertyName) ? `<b>${fetchFromObject(data, valuePropertyName)}</b>` : '';
    return html;
}
// Used for matching numbers
const /** @type {?} */ core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
const /** @type {?} */ rnumnonpx = new RegExp('^(' + core_pnum + ')(?!px)[a-z%]+$', 'i');
/**
 * @param {?} name
 * @param {?} extra
 * @param {?} isBorderBox
 * @param {?} styles
 * @return {?}
 */
function augmentWidthOrHeight(name, extra, isBorderBox, styles) {
    let /** @type {?} */ i = extra === (isBorderBox ? 'border' : 'content') ?
        4 :
        // Otherwise initialize for horizontal or vertical properties
        name === 'width' ? 1 : 0, /** @type {?} */
    val = 0;
    const /** @type {?} */ cssExpand = ['Top', 'Right', 'Bottom', 'Left'];
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
    let /** @type {?} */ docElem, /** @type {?} */ win;
    const /** @type {?} */ box = elem.getBoundingClientRect();
    const /** @type {?} */ doc = elem && elem.ownerDocument;
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
    let /** @type {?} */ y, /** @type {?} */ height_menu, /** @type {?} */ height_item, /** @type {?} */ scroll, /** @type {?} */ scroll_top, /** @type {?} */ scroll_bottom;
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
    const /** @type {?} */ valueIsBorderBox = true;
    let /** @type {?} */ val = name === 'width' ? elem.offsetWidth : elem.offsetHeight;
    const /** @type {?} */ styles = window.getComputedStyle(elem, null);
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
const /** @type {?} */ deepEqual = require('deep-equal');
class NgViborComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgViborModule {
}
NgViborModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    FormsModule, CommonModule
                ],
                declarations: [
                    NgViborComponent,
                    ViborBothDirective, ViborCreateDirective, ViborDropdownDirective, ViborSelectedDirective
                ],
                exports: [
                    NgViborComponent, FormsModule
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { NgViborService, NgViborComponent, NgViborModule, ViborBothDirective as ɵc, ViborCreateDirective as ɵd, ViborDropdownDirective as ɵa, ViborSelectedDirective as ɵb };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctdmlib3IuanMubWFwIiwic291cmNlcyI6WyJuZzovL25nLXZpYm9yL2xpYi9uZy12aWJvci5zZXJ2aWNlLnRzIiwibmc6Ly9uZy12aWJvci9saWIvbmctdmlib3ItdGVtcGxhdGUuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy12aWJvci9saWIvaGVscGVycy50cyIsIm5nOi8vbmctdmlib3IvbGliL25nLXZpYm9yLmNvbXBvbmVudC50cyIsIm5nOi8vbmctdmlib3IvbGliL25nLXZpYm9yLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ1ZpYm9yU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbdmlib3JEcm9wZG93bkVsZW1lbnRdJyB9KVxyXG5leHBvcnQgY2xhc3MgVmlib3JEcm9wZG93bkRpcmVjdGl2ZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHt9XHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1t2aWJvclNlbGVjdGVkRWxlbWVudF0nIH0pXHJcbmV4cG9ydCBjbGFzcyBWaWJvclNlbGVjdGVkRGlyZWN0aXZlIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cclxufVxyXG5cclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3ZpYm9yQm90aEVsZW1lbnRdJyB9KVxyXG5leHBvcnQgY2xhc3MgVmlib3JCb3RoRGlyZWN0aXZlIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cclxufVxyXG5cclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3ZpYm9yQ3JlYXRlXScgfSlcclxuZXhwb3J0IGNsYXNzIFZpYm9yQ3JlYXRlRGlyZWN0aXZlIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cclxufVxyXG4iLCJleHBvcnQgaW50ZXJmYWNlIElEYXRhUmVzcG9uc2Uge1xyXG4gIGRhdGE6IE9iamVjdDtcclxuICBsaXN0OiBBcnJheTxPYmplY3Q+O1xyXG4gIGhlYWRlcnM6IGFueTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZldGNoRnJvbU9iamVjdChvYmplY3Q6IGFueSwgcHJvcDogc3RyaW5nKTogYW55IHtcclxuICBpZiAob2JqZWN0ID09PSB1bmRlZmluZWQgfHwgcHJvcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICByZXR1cm4gb2JqZWN0O1xyXG4gIH1cclxuXHJcbiAgY29uc3QgaW5kZXg6IG51bWJlciA9IHByb3AuaW5kZXhPZignLicpO1xyXG4gIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICByZXR1cm4gZmV0Y2hGcm9tT2JqZWN0KG9iamVjdFtwcm9wLnN1YnN0cmluZygwLCBpbmRleCldLCBwcm9wLnN1YnN0cihpbmRleCArIDEpKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBvYmplY3RbcHJvcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0Rm9ybWF0dGVyKGRhdGE6IGFueSwgdmFsdWVQcm9wZXJ0eU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgbGV0IGh0bWwgPSAnJztcclxuICBodG1sICs9IGZldGNoRnJvbU9iamVjdChkYXRhLCB2YWx1ZVByb3BlcnR5TmFtZSkgPyBgPGI+JHtmZXRjaEZyb21PYmplY3QoZGF0YSwgdmFsdWVQcm9wZXJ0eU5hbWUpfTwvYj5gIDogJyc7XHJcbiAgcmV0dXJuIGh0bWw7XHJcbn1cclxuXHJcblxyXG4vLyBVc2VkIGZvciBtYXRjaGluZyBudW1iZXJzXHJcbmNvbnN0IGNvcmVfcG51bTogc3RyaW5nID0gL1srLV0/KD86XFxkKlxcLnwpXFxkKyg/OltlRV1bKy1dP1xcZCt8KS8uc291cmNlO1xyXG5jb25zdCBybnVtbm9ucHg6IFJlZ0V4cCA9IG5ldyBSZWdFeHAoJ14oJyArIGNvcmVfcG51bSArICcpKD8hcHgpW2EteiVdKyQnLCAnaScpO1xyXG5cclxuZnVuY3Rpb24gYXVnbWVudFdpZHRoT3JIZWlnaHQobmFtZTogc3RyaW5nLCBleHRyYTogYW55LCBpc0JvcmRlckJveDogYW55LCBzdHlsZXM6IGFueSk6IG51bWJlciB7XHJcbiAgbGV0IGk6IG51bWJlciA9IGV4dHJhID09PSAoaXNCb3JkZXJCb3ggPyAnYm9yZGVyJyA6ICdjb250ZW50JykgP1xyXG4gICAgLy8gSWYgd2UgYWxyZWFkeSBoYXZlIHRoZSByaWdodCBtZWFzdXJlbWVudCwgYXZvaWQgYXVnbWVudGF0aW9uXHJcbiAgICA0IDpcclxuICAgIC8vIE90aGVyd2lzZSBpbml0aWFsaXplIGZvciBob3Jpem9udGFsIG9yIHZlcnRpY2FsIHByb3BlcnRpZXNcclxuICAgIG5hbWUgPT09ICd3aWR0aCcgPyAxIDogMCxcclxuXHJcbiAgICB2YWwgPSAwO1xyXG4gIGNvbnN0IGNzc0V4cGFuZDogc3RyaW5nW10gPSBbJ1RvcCcsICdSaWdodCcsICdCb3R0b20nLCAnTGVmdCddO1xyXG5cclxuICAvLyBUT0RPIFVzZSBhbmd1bGFyLmVsZW1lbnQuY3NzIGluc3RlYWQgb2YgZ2V0U3R5bGVWYWx1ZSBhZnRlclxyXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9jYWl0cC9hbmd1bGFyLmpzL2NvbW1pdC85MmJiYjVlMjI1MjUzZWJkZGQzOGVmNTczNWQ2NmZmZWY3NmI2YTE0IHdpbGwgYmUgYXBwbGllZFxyXG4gIGZ1bmN0aW9uIGdldFN0eWxlVmFsdWUoX25hbWU6IGFueSk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gcGFyc2VGbG9hdChzdHlsZXNbX25hbWVdKTtcclxuICB9XHJcblxyXG4gIGZvciAoOyBpIDwgNDsgaSArPSAyKSB7XHJcbiAgICAvLyBib3RoIGJveCBtb2RlbHMgZXhjbHVkZSBtYXJnaW4sIHNvIGFkZCBpdCBpZiB3ZSB3YW50IGl0XHJcbiAgICBpZiAoZXh0cmEgPT09ICdtYXJnaW4nKSB7XHJcbiAgICAgIHZhbCArPSBnZXRTdHlsZVZhbHVlKGV4dHJhICsgY3NzRXhwYW5kW2ldKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNCb3JkZXJCb3gpIHtcclxuICAgICAgLy8gYm9yZGVyLWJveCBpbmNsdWRlcyBwYWRkaW5nLCBzbyByZW1vdmUgaXQgaWYgd2Ugd2FudCBjb250ZW50XHJcbiAgICAgIGlmIChleHRyYSA9PT0gJ2NvbnRlbnQnKSB7XHJcbiAgICAgICAgdmFsIC09IGdldFN0eWxlVmFsdWUoJ3BhZGRpbmcnICsgY3NzRXhwYW5kW2ldKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gYXQgdGhpcyBwb2ludCwgZXh0cmEgaXNuJ3QgYm9yZGVyIG5vciBtYXJnaW4sIHNvIHJlbW92ZSBib3JkZXJcclxuICAgICAgaWYgKGV4dHJhICE9PSAnbWFyZ2luJykge1xyXG4gICAgICAgIHZhbCAtPSBnZXRTdHlsZVZhbHVlKCdib3JkZXInICsgY3NzRXhwYW5kW2ldICsgJ1dpZHRoJyk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhbCArPSBnZXRTdHlsZVZhbHVlKCdwYWRkaW5nJyArIGNzc0V4cGFuZFtpXSk7XHJcblxyXG4gICAgICAvLyBhdCB0aGlzIHBvaW50LCBleHRyYSBpc24ndCBjb250ZW50IG5vciBwYWRkaW5nLCBzbyBhZGQgYm9yZGVyXHJcbiAgICAgIGlmIChleHRyYSAhPT0gJ3BhZGRpbmcnKSB7XHJcbiAgICAgICAgdmFsICs9IGdldFN0eWxlVmFsdWUoJ2JvcmRlcicgKyBjc3NFeHBhbmRbaV0gKyAnV2lkdGgnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHZhbDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0V2luZG93KGVsZW06IGFueSk6IGFueSB7XHJcbiAgcmV0dXJuIGVsZW0gIT0gbnVsbCAmJiBlbGVtID09PSBlbGVtLndpbmRvdyA/IGVsZW0gOiBlbGVtLm5vZGVUeXBlID09PSA5ICYmIGVsZW0uZGVmYXVsdFZpZXc7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldE9mZnNldChlbGVtOiBhbnkpOiBhbnkge1xyXG4gIGxldCBkb2NFbGVtOiBhbnksIHdpbjogYW55O1xyXG4gIGNvbnN0IGJveDogYW55ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICBjb25zdCBkb2M6IGFueSA9IGVsZW0gJiYgZWxlbS5vd25lckRvY3VtZW50O1xyXG5cclxuICBpZiAoIWRvYykge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgZG9jRWxlbSA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XHJcbiAgd2luID0gZ2V0V2luZG93KGRvYyk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB0b3A6IGJveC50b3AgKyB3aW4ucGFnZVlPZmZzZXQgLSBkb2NFbGVtLmNsaWVudFRvcCxcclxuICAgIGxlZnQ6IGJveC5sZWZ0ICsgd2luLnBhZ2VYT2Zmc2V0IC0gZG9jRWxlbS5jbGllbnRMZWZ0XHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNjcm9sbEFjdGl2ZU9wdGlvbihsaXN0OiBIVE1MRWxlbWVudCwgaXRlbTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuICBsZXQgeTogYW55LCBoZWlnaHRfbWVudTogYW55LCBoZWlnaHRfaXRlbTogYW55LCBzY3JvbGw6IGFueSwgc2Nyb2xsX3RvcDogYW55LCBzY3JvbGxfYm90dG9tOiBhbnk7XHJcblxyXG4gIGlmIChpdGVtKSB7XHJcbiAgICBoZWlnaHRfbWVudSA9IGxpc3Qub2Zmc2V0SGVpZ2h0O1xyXG4gICAgaGVpZ2h0X2l0ZW0gPSBnZXRXaWR0aE9ySGVpZ2h0KGl0ZW0sICdoZWlnaHQnLCAnbWFyZ2luJyk7IC8vIG91dGVySGVpZ2h0KHRydWUpO1xyXG4gICAgc2Nyb2xsID0gbGlzdC5zY3JvbGxUb3AgfHwgMDtcclxuICAgIHkgPSBnZXRPZmZzZXQoaXRlbSkudG9wIC0gZ2V0T2Zmc2V0KGxpc3QpLnRvcCArIHNjcm9sbDtcclxuICAgIHNjcm9sbF90b3AgPSB5O1xyXG4gICAgc2Nyb2xsX2JvdHRvbSA9IHkgLSBoZWlnaHRfbWVudSArIGhlaWdodF9pdGVtO1xyXG5cclxuICAgIC8vIFRPRE8gTWFrZSBhbmltYXRpb25cclxuICAgIGlmICh5ICsgaGVpZ2h0X2l0ZW0gPiBoZWlnaHRfbWVudSArIHNjcm9sbCkge1xyXG4gICAgICBsaXN0LnNjcm9sbFRvcCA9IHNjcm9sbF9ib3R0b207XHJcbiAgICB9IGVsc2UgaWYgKHkgPCBzY3JvbGwpIHtcclxuICAgICAgbGlzdC5zY3JvbGxUb3AgPSBzY3JvbGxfdG9wO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0V2lkdGhPckhlaWdodChlbGVtOiBhbnksIG5hbWU6IGFueSwgZXh0cmE6IGFueSk6IGFueSB7XHJcblxyXG4gIC8vIFN0YXJ0IHdpdGggb2Zmc2V0IHByb3BlcnR5LCB3aGljaCBpcyBlcXVpdmFsZW50IHRvIHRoZSBib3JkZXItYm94IHZhbHVlXHJcbiAgY29uc3QgdmFsdWVJc0JvcmRlckJveCA9IHRydWU7XHJcbiAgbGV0IHZhbDogYW55ID0gbmFtZSA9PT0gJ3dpZHRoJyA/IGVsZW0ub2Zmc2V0V2lkdGggOiBlbGVtLm9mZnNldEhlaWdodDtcclxuICBjb25zdCBzdHlsZXM6IGFueSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW0sIG51bGwpO1xyXG4gIGNvbnN0IGlzQm9yZGVyQm94ID0gZmFsc2U7IC8vIGpRdWVyeS5zdXBwb3J0LmJveFNpemluZyAmJiBqUXVlcnkuY3NzKCBlbGVtLCAnYm94U2l6aW5nJywgZmFsc2UsIHN0eWxlcyApID09PSAnYm9yZGVyLWJveCc7XHJcblxyXG4gIC8vIHNvbWUgbm9uLWh0bWwgZWxlbWVudHMgcmV0dXJuIHVuZGVmaW5lZCBmb3Igb2Zmc2V0V2lkdGgsIHNvIGNoZWNrIGZvciBudWxsL3VuZGVmaW5lZFxyXG4gIC8vIHN2ZyAtIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY0OTI4NVxyXG4gIC8vIE1hdGhNTCAtIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTQ5MTY2OFxyXG4gIGlmICh2YWwgPD0gMCB8fCB2YWwgPT0gbnVsbCkge1xyXG4gICAgLy8gRmFsbCBiYWNrIHRvIGNvbXB1dGVkIHRoZW4gdW5jb21wdXRlZCBjc3MgaWYgbmVjZXNzYXJ5XHJcbiAgICB2YWwgPSBzdHlsZXNbbmFtZV07XHJcblxyXG4gICAgaWYgKHZhbCA8IDAgfHwgdmFsID09IG51bGwpIHtcclxuICAgICAgdmFsID0gZWxlbS5zdHlsZVtuYW1lXTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDb21wdXRlZCB1bml0IGlzIG5vdCBwaXhlbHMuIFN0b3AgaGVyZSBhbmQgcmV0dXJuLlxyXG4gICAgaWYgKHJudW1ub25weC50ZXN0KHZhbCkpIHtcclxuICAgICAgcmV0dXJuIHZhbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyB3ZSBuZWVkIHRoZSBjaGVjayBmb3Igc3R5bGUgaW4gY2FzZSBhIGJyb3dzZXIgd2hpY2ggcmV0dXJucyB1bnJlbGlhYmxlIHZhbHVlc1xyXG4gICAgLy8gZm9yIGdldENvbXB1dGVkU3R5bGUgc2lsZW50bHkgZmFsbHMgYmFjayB0byB0aGUgcmVsaWFibGUgZWxlbS5zdHlsZVxyXG4gICAgLy8gdmFsdWVJc0JvcmRlckJveCA9IGlzQm9yZGVyQm94ICYmICggalF1ZXJ5LnN1cHBvcnQuYm94U2l6aW5nUmVsaWFibGUgfHwgdmFsID09PSBlbGVtLnN0eWxlWyBuYW1lIF0gKTtcclxuXHJcbiAgICAvLyBOb3JtYWxpemUgJycsIGF1dG8sIGFuZCBwcmVwYXJlIGZvciBleHRyYVxyXG4gICAgdmFsID0gcGFyc2VGbG9hdCh2YWwpIHx8IDA7XHJcbiAgfVxyXG5cclxuICAvLyB1c2UgdGhlIGFjdGl2ZSBib3gtc2l6aW5nIG1vZGVsIHRvIGFkZC9zdWJ0cmFjdCBpcnJlbGV2YW50IHN0eWxlc1xyXG4gIHJldHVybiB2YWwgKyBhdWdtZW50V2lkdGhPckhlaWdodChuYW1lLCBleHRyYSB8fCAoaXNCb3JkZXJCb3ggPyAnYm9yZGVyJyA6ICdjb250ZW50JyksIHZhbHVlSXNCb3JkZXJCb3gsIHN0eWxlcyk7XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBDb21wb25lbnQsIE9uSW5pdCwgT25DaGFuZ2VzLFxyXG4gIElucHV0LCBPdXRwdXQsIGZvcndhcmRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLFxyXG4gIFRlbXBsYXRlUmVmLCBDb250ZW50Q2hpbGQsIFZpZXdDaGlsZCxcclxuICBTaW1wbGVDaGFuZ2VzXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXHJcbiAgTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgTmdNb2RlbFxyXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIFZpYm9yQm90aERpcmVjdGl2ZSxcclxuICAgIFZpYm9yQ3JlYXRlRGlyZWN0aXZlLFxyXG4gICAgVmlib3JEcm9wZG93bkRpcmVjdGl2ZSxcclxuICAgIFZpYm9yU2VsZWN0ZWREaXJlY3RpdmVcclxufSBmcm9tICcuL25nLXZpYm9yLXRlbXBsYXRlLmRpcmVjdGl2ZSc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgSURhdGFSZXNwb25zZSxcclxuICAgIGRlZmF1bHRGb3JtYXR0ZXIsXHJcbiAgICBmZXRjaEZyb21PYmplY3QsXHJcbiAgICBzY3JvbGxBY3RpdmVPcHRpb25cclxufSBmcm9tICcuL2hlbHBlcnMnO1xyXG5cclxuY29uc3QgZGVlcEVxdWFsID0gcmVxdWlyZSgnZGVlcC1lcXVhbCcpO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxyXG4gIHNlbGVjdG9yOiAndmlib3InLFxyXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInZpYm9yXCI+XHJcbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG5cclxuICA8ZGl2IGNsYXNzPVwic2VsZWN0LXNlYXJjaFwiIChjbGljayk9XCJzaG93RHJvcGRvd25MaXN0KCRldmVudCk7XCI+XHJcbiAgICA8dWwgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoLWxpc3RcIj5cclxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm11bHRpcGxlIHx8ICFpc09wZW5cIj5cclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIVNlbGVjdGVkVGVtcGxhdGU7IGVsc2Ugc2VsZWN0ZWRUXCI+XHJcbiAgICAgICAgICA8bGkgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbSBzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9zZWxlY3Rpb25cIiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBvdXRwdXQ7IGxldCAkaW5kZXg9aW5kZXg7IGxldCAkbGFzdD1sYXN0OyB0cmFja0J5OiBUcmFja0J5Rm47XCI+XHJcbiAgICAgICAgICAgIDxkaXYgW2lubmVySFRNTF09XCJnZXRMaXN0Rm9ybWF0dGVkKGl0ZW0pXCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDxhIGNsYXNzPVwic2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fcmVtb3ZlXCIgKm5nSWY9XCJhbGxvd1Jlc2V0XCIgKGNsaWNrKT1cIiFkaXNhYmxlZCAmJiByZW1vdmVPbmUoJGluZGV4LCAkZXZlbnQpXCI+PC9hPlxyXG4gICAgICAgICAgPC9saT5cclxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgICAgICAgPG5nLXRlbXBsYXRlICNzZWxlY3RlZFQ+XHJcbiAgICAgICAgICA8bGkgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbSBzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9zZWxlY3Rpb25cIiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBvdXRwdXQ7IGxldCAkaW5kZXg9aW5kZXg7IGxldCAkbGFzdD1sYXN0OyB0cmFja0J5OiBUcmFja0J5Rm47XCI+XHJcbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJTZWxlY3RlZFRlbXBsYXRlOyBjb250ZXh0OiB7aXRlbTogaXRlbX1cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgPGEgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9yZW1vdmVcIiAqbmdJZj1cImFsbG93UmVzZXQgJiYgIWRpc2FibGVkXCIgKGNsaWNrKT1cIiFkaXNhYmxlZCAmJiByZW1vdmVPbmUoJGluZGV4LCAkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcblxyXG4gICAgICA8bGkgY2xhc3M9XCJzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbSBzZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9pbnB1dFwiIFtjbGFzcy5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9oaWRlXT1cIklucHV0SGlkZVwiPlxyXG4gICAgICAgIDxpbnB1dCBhdXRvY29tcGxldGU9XCJvZmZcIiAjaW5wdXRDb250cm9sPVwibmdNb2RlbFwiIFtuYW1lXT1cIm5hbWVcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbKG5nTW9kZWwpXT1cInF1ZXJ5XCIgW3BsYWNlaG9sZGVyXT1cIm91dHB1dC5sZW5ndGggPT0gMCB8fCAobXVsdGlwbGUgJiYgb3V0cHV0Lmxlbmd0aCA8IG11bHRpcGxlTGltaXQpID8gcGxhY2Vob2xkZXIgOiAnJ1wiXHJcbiAgICAgICAgICAoaW5wdXQpPVwidXBkYXRlT3B0aW9uc0luRGVsYXkoKVwiIChrZXlkb3duKT1cImtleURvd24oJGV2ZW50KVwiIC8+XHJcbiAgICAgIDwvbGk+XHJcbiAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtIHNlbGVjdC1zZWFyY2gtbGlzdC1pdGVtX2xvYWRlci1jZW50ZXJcIiBbaGlkZGVuXT1cIiFkYXRhTGlzdFN1YiB8fCBkYXRhTGlzdFN1Yi5jbG9zZWRcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fbG9hZGVyXCI+PC9kaXY+XHJcbiAgICAgIDwvbGk+XHJcblxyXG4gICAgICA8c3BhbiBjbGFzcz1cImFycm93XCIgKGNsaWNrKT1cInRvZ2dsZURyb3Bkb3duKCRldmVudClcIj5cclxuICAgICAgPC9zcGFuPlxyXG4gICAgPC91bD5cclxuICA8L2Rpdj5cclxuXHJcbiAgPGRpdiBjbGFzcz1cInNlbGVjdC1kcm9wZG93blwiICpuZ0lmPVwiaXNPcGVuXCI+XHJcbiAgICA8dWwgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXBcIj5cclxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFEcm9wZG93blRlbXBsYXRlOyBlbHNlIGRyb3Bkb3duVFwiPlxyXG4gICAgICAgIDxsaSBjbGFzcz1cInNlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb25cIiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIE9wdGlvbnM7IGxldCBpPWluZGV4XCIgKG1vdXNlZG93bik9XCJzZWxlY3RPbmUoJGV2ZW50LCBvcHRpb24pXCJcclxuICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaSA9PT0gc2VsZWN0b3JQb3NpdGlvblwiIFtpbm5lckhUTUxdPVwiZ2V0RHJvcGRvd25Gb3JtYXR0ZWQob3B0aW9uKVwiPlxyXG4gICAgICAgIDwvbGk+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG5cclxuICAgICAgPG5nLXRlbXBsYXRlICNkcm9wZG93blQ+XHJcbiAgICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvblwiICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgT3B0aW9uczsgbGV0IGk9aW5kZXhcIiAobW91c2Vkb3duKT1cInNlbGVjdE9uZSgkZXZlbnQsIG9wdGlvbilcIlxyXG4gICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJpID09PSBzZWxlY3RvclBvc2l0aW9uXCI+XHJcbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiRHJvcGRvd25UZW1wbGF0ZTsgY29udGV4dDoge2l0ZW06IG9wdGlvbn1cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICA8L2xpPlxyXG4gICAgICA8L25nLXRlbXBsYXRlPlxyXG5cclxuICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvbiBsb2FkZXJcIiAqbmdJZj1cImRhdGFMaXN0U3ViICYmICFkYXRhTGlzdFN1Yi5jbG9zZWRcIj5cclxuICAgICAgICDDkMKXw5DCsMOQwrPDkcKAw5HCg8OQwrfDkMK6w5DCsFxyXG4gICAgICA8L2xpPlxyXG4gICAgICA8bGkgY2xhc3M9XCJzZWxlY3QtZHJvcGRvd24tb3B0Z3JvdXAtb3B0aW9uIGxvYWRlclwiIChtb3VzZWRvd24pPVwiQWRkTmV3T2JqZWN0KENyZWF0ZU5ldyhxdWVyeSkpO1wiIFtjbGFzcy5hY3RpdmVdPVwic2VsZWN0b3JQb3NpdGlvbiA9PT0gT3B0aW9ucy5sZW5ndGhcIlxyXG4gICAgICAgICpuZ0lmPVwiU2hvd05ld1wiPlxyXG5cclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY3JlYXRlVGVtcGxhdGU7IGVsc2UgdGVtcGxhdGVXaXRoTWVzc2FnZVwiPlxyXG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNyZWF0ZVRlbXBsYXRlLnRlbXBsYXRlUmVmOyBjb250ZXh0OiB7cXVlcnk6IHF1ZXJ5fVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG5cclxuICAgICAgICA8bmctdGVtcGxhdGUgI3RlbXBsYXRlV2l0aE1lc3NhZ2U+XHJcbiAgICAgICAgICB7eyBuZXdNZXNzYWdlIH19XHJcbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgPC9saT5cclxuICAgICAgPGxpIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvbiBsb2FkZXJcIiAqbmdJZj1cIlNob3dFbXB0eVwiPlxyXG4gICAgICAgIMOQwp/DkcKDw5HCgcORwoLDkMK+XHJcbiAgICAgIDwvbGk+XHJcbiAgICA8L3VsPlxyXG4gICAgPGRpdiBjbGFzcz1cInNlbGVjdC1kcm9wZG93bi1wYWdlclwiICpuZ0lmPVwiY3VycmVudENhY2hlICYmIGN1cnJlbnRDYWNoZS5jb3VudFBhZ2VzID4gMVwiPlxyXG4gICAgICA8cCBjbGFzcz1cInNlbGVjdC1kcm9wZG93bi1wYWdlci1wYWdlXCI+XHJcbiAgICAgICAge3sgY3VycmVudENhY2hlLmN1cnJlbnRQYWdlIHwgbnVtYmVyIH19IC8ge3sgY3VycmVudENhY2hlLmNvdW50UGFnZXMgfCBudW1iZXIgfX1cclxuICAgICAgPC9wPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLXBhZ2VyLWxvYWRtb3JlXCIgKm5nSWY9XCJjdXJyZW50Q2FjaGUuY291bnRQYWdlcyA+IDEgJiYgY3VycmVudENhY2hlLmN1cnJlbnRQYWdlIDwgY3VycmVudENhY2hlLmNvdW50UGFnZXNcIlxyXG4gICAgICAgIChtb3VzZWRvd24pPVwibmV4dFBhZ2UoJGV2ZW50KVwiPlxyXG4gICAgICAgIMOQwpfDkMKww5DCs8ORwoDDkcKDw5DCt8OQwrjDkcKCw5HCjCDDkMK1w5HCicORwpFcclxuICAgICAgPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbmAsXHJcbiAgc3R5bGVzOiBbYC52aWJvciBhLC52aWJvciBkaXYsLnZpYm9yIGxhYmVsLC52aWJvciBsZWdlbmQsLnZpYm9yIHNwYW4sLnZpYm9yIHVse21hcmdpbjowO3BhZGRpbmc6MDtib3JkZXI6MH0udmlib3IgYSwudmlib3IgYnV0dG9uLC52aWJvciBpbnB1dHtvdXRsaW5lOjB9LnZpYm9yIG9sLC52aWJvciB1bHtsaXN0LXN0eWxlOm5vbmV9LnZpYm9yIGlucHV0e3BhZGRpbmc6MDttYXJnaW46MDtib3JkZXI6MDtmb250OmluaGVyaXR9LnZpYm9ye3Bvc2l0aW9uOnJlbGF0aXZlO2Rpc3BsYXk6YmxvY2s7Zm9udC1mYW1pbHk6LWFwcGxlLXN5c3RlbSxCbGlua01hY1N5c3RlbUZvbnQsIFwiU2Vnb2UgVUlcIixSb2JvdG8sSGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWYsIFwiQXBwbGUgQ29sb3IgRW1vamlcIixcIlNlZ29lIFVJIEVtb2ppXCIsXCJTZWdvZSBVSSBTeW1ib2xcIn0udmlib3IgLnNlbGVjdC1zZWFyY2h7cG9zaXRpb246cmVsYXRpdmV9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoIC5hcnJvd3tjb250ZW50OlwiXCI7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MTNweDt0b3A6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7ZGlzcGxheTpibG9jazt3aWR0aDoxNnB4O2hlaWdodDoxNnB4O2JhY2tncm91bmQtaW1hZ2U6dXJsKGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QmpiR0Z6Y3owaWJtTXRhV052YmlCbmJIbHdhQ0lnZUcxc2JuTTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TURBdmMzWm5JaUIzYVdSMGFEMGlNVFlpSUdobGFXZG9kRDBpTVRZaUlIWnBaWGRDYjNnOUlqQWdNQ0F4TmlBeE5pSStEUW9nSUR4d1lYUm9JR1pwYkd3OUlpTXlZekpqTW1NaUlHUTlJazA0SURFeExqUk1NaTQySURZZ05DQTBMalpzTkNBMElEUXRORXd4TXk0MElEWWlMejROQ2p3dmMzWm5QZzBLKTt0cmFuc2l0aW9uOi13ZWJraXQtdHJhbnNmb3JtIC4xNXMgZWFzZS1pbi1vdXQ7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjE1cyBlYXNlLWluLW91dDt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMTVzIGVhc2UtaW4tb3V0LC13ZWJraXQtdHJhbnNmb3JtIC4xNXMgZWFzZS1pbi1vdXR9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoIC5hcnJvdzpiZWZvcmV7ZGlzcGxheTpub25lfS52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1faW5wdXQgaW5wdXR7d2lkdGg6MTAwJX0udmlib3IgLnNlbGVjdC1kcm9wZG93bntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MTAwJTtsZWZ0OjA7cmlnaHQ6MDt6LWluZGV4OjJ9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9sb2FkZXItY2VudGVye3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjEwcHg7dG9wOjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpO2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjt3aWR0aDoyMXB4O2hlaWdodDoyMXB4O2JhY2tncm91bmQ6I2ZmZjt6LWluZGV4OjJ9LnZpYm9yIC5zZWxlY3Qtc2VhcmNoLWxpc3QtaXRlbV9sb2FkZXItY2VudGVyW2hpZGRlbl17ZGlzcGxheTpub25lfS52aWJvciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fbG9hZGVyLWNlbnRlciAuc2VsZWN0LXNlYXJjaC1saXN0LWl0ZW1fbG9hZGVye3dpZHRoOjE2cHg7aGVpZ2h0OjE2cHg7Ym94LXNpemluZzpib3JkZXItYm94O2JvcmRlci13aWR0aDoycHg7Ym9yZGVyLXN0eWxlOnNvbGlkO2JvcmRlci1jb2xvcjojMjIyNzJlIHJnYmEoMzQsMzksNDYsLjQpIHJnYmEoMzQsMzksNDYsLjQpO2JvcmRlci1yYWRpdXM6MTAwJTstd2Via2l0LWFuaW1hdGlvbjouNDVzIGxpbmVhciBpbmZpbml0ZSBjbG9ja3dpc2U7YW5pbWF0aW9uOi40NXMgbGluZWFyIGluZmluaXRlIGNsb2Nrd2lzZX0udmlib3IgLnNlbGVjdC1kcm9wZG93bi1vcHRncm91cHttYXgtaGVpZ2h0OjMwMHB4O292ZXJmbG93LXk6YXV0bztib3JkZXI6MXB4IHNvbGlkICNkNWQ5ZGU7Ym9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czo1cHg7Ym9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6NXB4O2JvcmRlci10b3A6MH0udmlib3IgLnNlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb257bWluLWhlaWdodDozMHB4O3BhZGRpbmc6MTBweCAxNXB4fS52aWJvciAuc2VsZWN0LWRyb3Bkb3duLW9wdGdyb3VwLW9wdGlvbjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoNjYsMTMyLDIxNSwuMSl9LnZpYm9yIC5vcGVuLXZpYm9yIC5zZWxlY3Qtc2VhcmNoIC5hcnJvd3std2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMTgwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDE4MGRlZyl9QC13ZWJraXQta2V5ZnJhbWVzIGNsb2Nrd2lzZXt0b3std2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKSB0cmFuc2xhdGV6KDApO3RyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKSB0cmFuc2xhdGV6KDApfX1Aa2V5ZnJhbWVzIGNsb2Nrd2lzZXt0b3std2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKSB0cmFuc2xhdGV6KDApO3RyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKSB0cmFuc2xhdGV6KDApfX1gXSxcclxuICBwcm92aWRlcnM6IFt7XHJcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nVmlib3JDb21wb25lbnQpLFxyXG4gICAgbXVsdGk6IHRydWVcclxuICB9XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdWaWJvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcbiAgLy8gTG9jYWwgVmFyaWFibGVcclxuICBwdWJsaWMgX21vZGVsOiBhbnk7XHJcblxyXG4gIHByaXZhdGUgZmlyc3RMb2FkID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBvcHRpb25zOiBBcnJheTxhbnk+O1xyXG4gIHB1YmxpYyBvdXRwdXQ6IEFycmF5PGFueT47XHJcblxyXG4gIHB1YmxpYyBpc09wZW46IGJvb2xlYW47XHJcblxyXG4gIHByaXZhdGUgb2xkUXVlcnk6IHN0cmluZztcclxuICBwdWJsaWMgcXVlcnk6IHN0cmluZztcclxuXHJcbiAgcHVibGljIHNlbGVjdG9yUG9zaXRpb24gPSAwO1xyXG4gIHByaXZhdGUgd2FpdFRpbWUgPSA1MDA7XHJcblxyXG4gIHByaXZhdGUgZWw6IEVsZW1lbnQ7ICAgICAgICAgICAvLyB0aGlzIGNvbXBvbmVudCAgZWxlbWVudCBgPHZpYm9yPmBcclxuICBwcml2YXRlIGlucHV0RWw6IEhUTUxJbnB1dEVsZW1lbnQ7IC8vIGA8aW5wdXQ+YCBlbGVtZW50IGluIGA8dmlib3I+YCBmb3IgYXV0byBjb21wbGV0ZVxyXG4gIEBWaWV3Q2hpbGQoJ2lucHV0Q29udHJvbCcpIHB1YmxpYyBpbnB1dENvbnRyb2w6IE5nTW9kZWw7XHJcblxyXG4gIC8vIElucHV0cyAmIE91dHB1dHNcclxuICBASW5wdXQoKSBwdWJsaWMgbXVsdGlwbGUgPSBmYWxzZTtcclxuICBASW5wdXQoKSBwdWJsaWMgbXVsdGlwbGVMaW1pdCA9IEluZmluaXR5O1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBjb3VudE9uUGFnZSA9IDEwO1xyXG5cclxuICBASW5wdXQoKSBwdWJsaWMgcGxhY2Vob2xkZXIgPSAnVmlib3InO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcHVibGljIHJlcXVpcmVkID0gZmFsc2U7XHJcbiAgQElucHV0KCkgcHVibGljIGFsbG93UmVzZXQgPSB0cnVlO1xyXG4gIHB1YmxpYyBkaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICAvLyDDkMKew5HCgsOQwr7DkMKxw5HCgMOQwrDDkMK2w5DCtcOQwr3DkMK4w5DCtSDDkcKBw5DCv8OQwrjDkcKBw5DCusOQwr7DkMKyXHJcbiAgQENvbnRlbnRDaGlsZChWaWJvckJvdGhEaXJlY3RpdmUpIHB1YmxpYyBib3RoVGVtcGxhdGU6IFZpYm9yQm90aERpcmVjdGl2ZTtcclxuICBAQ29udGVudENoaWxkKFZpYm9yRHJvcGRvd25EaXJlY3RpdmUpIHB1YmxpYyBkcm9wZG93blRlbXBsYXRlOiBWaWJvckRyb3Bkb3duRGlyZWN0aXZlO1xyXG4gIEBDb250ZW50Q2hpbGQoVmlib3JTZWxlY3RlZERpcmVjdGl2ZSkgcHVibGljIHNlbGVjdGVkVGVtcGxhdGU6IFZpYm9yU2VsZWN0ZWREaXJlY3RpdmU7XHJcbiAgQENvbnRlbnRDaGlsZChWaWJvckNyZWF0ZURpcmVjdGl2ZSkgcHVibGljIGNyZWF0ZVRlbXBsYXRlOiBWaWJvckNyZWF0ZURpcmVjdGl2ZTtcclxuICBASW5wdXQoKSBwdWJsaWMgbGlzdEZvcm1hdHRlcjogKGFyZzogYW55LCB2YWx1ZTogc3RyaW5nKSA9PiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcHVibGljIGRyb3Bkb3duRm9ybWF0dGVyOiAoYXJnOiBhbnksIHZhbHVlOiBzdHJpbmcpID0+IHN0cmluZztcclxuICBASW5wdXQoKSBwdWJsaWMgdmlld1Byb3BlcnR5ID0gJ05hbWUnOyAgLy8gw5DCn8OQwr7DkMK7w5DCtSDDkMK0w5DCu8ORwo8gw5DCtMOQwrXDkcKEw5DCvsOQwrvDkcKCw5DCvcOQwr7DkMKzw5DCviDDkMK+w5HCgsOQwr7DkMKxw5HCgMOQwrDDkMK2w5DCtcOQwr3DkMK4w5HCj1xyXG5cclxuICBASW5wdXQoKSBwdWJsaWMgbW9kZWxQcm9wZXJ0eSA9ICdpZCc7ICAvLyDDkMKiw5DCviwgw5HCh8ORwoLDkMK+IMOQwrfDkMKww5DCv8OQwrjDkcKBw5HCi8OQwrLDkMKww5DCtcORwoLDkcKBw5HCjyDDkMKyIMOQwpzDkMK+w5DCtMOQwrXDkMK7w5HCjFxyXG4gIEBJbnB1dCgpIHB1YmxpYyBwcmVsb2FkUHJvcGVydHkgPSAnaWRzJzsgLy8gw5DCmsOQwrvDkcKOw5HChyDDkMK3w5DCsMOQwr/DkcKAw5DCvsORwoHDkMKwIMOQwrogw5HCgcOQwrXDkcKAw5DCssOQwrXDkcKAw5HCgyDDkMK0w5DCu8ORwo8gw5DCv8ORwoDDkMK1w5DCtMOQwrfDkMKww5DCs8ORwoDDkcKDw5DCt8OQwrrDkMK4LCDDkMK1w5HCgcOQwrvDkMK4IHVuZGVmaW5lZCDDkMK3w5DCsMOQwr/DkMK4w5HCgcORwovDkMKyw5DCsMOQwrXDkcKCw5HCgcORwo8gw5DCssOQwrXDkcKBw5HCjCDDkMK+w5DCscORworDkMK1w5DCusORwoJcclxuICBASW5wdXQoKSBwdWJsaWMgcHJlbG9hZEZpZWxkOiBzdHJpbmcgPSB1bmRlZmluZWQ7IC8vIMOQwpfDkMK9w5DCsMORwofDkMK1w5DCvcOQwrjDkMK1IMOQwr/DkMK+w5DCu8ORwo8sIMOQwrrDkMK+w5HCgsOQwr7DkcKAw5DCtSDDkMK9w5DCtcOQwr7DkMKxw5HChcOQwr7DkMK0w5DCuMOQwrzDkMK+IMOQwr7DkcKCw5DCv8ORwoDDkMKww5DCssOQwrjDkcKCw5HCjCDDkMKyIMOQwrfDkMKww5DCv8ORwoDDkMK+w5HCgS5cclxuICBASW5wdXQoKSBwdWJsaWMgc2VhcmNoUHJvcGVydHkgPSAncXVlcnknO1xyXG5cclxuICBASW5wdXQoKSBwdWJsaWMgZGF0YUxpc3Q6ICgocGFyYW06IE9iamVjdCwgcGFnZTogbnVtYmVyLCBjb3VudE9uUGFnZT86IG51bWJlcikgPT4gT2JzZXJ2YWJsZTxJRGF0YVJlc3BvbnNlPikgfCBBcnJheTxhbnk+O1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBleGNsdWRlTGlzdDogQXJyYXk8YW55PjtcclxuICBASW5wdXQoKSBwdWJsaWMgYWRkaXRpb25hbEZpbHRlciA9IHt9O1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBvbmx5RW1pdHRlcjogYm9vbGVhbjtcclxuICBAT3V0cHV0KCdjaGFuZ2VGdWxsTW9kZWwnKSBwdWJsaWMgY2hhbmdlRnVsbE1vZGVsOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcblxyXG4gIEBJbnB1dCgpIHB1YmxpYyBuZXdNZXNzYWdlOiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQElucHV0KCkgcHVibGljIENyZWF0ZU5ldzogKHF1ZXJ5OiBzdHJpbmcpID0+IE9ic2VydmFibGU8YW55PiB8IGFueSA9IChxdWVyeTogc3RyaW5nKSA9PiB7XHJcbiAgICByZXR1cm4gcXVlcnk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gU3Vic2NyaXB0aW9uXHJcbiAgcHVibGljIGRhdGFMaXN0U3ViOiBTdWJzY3JpcHRpb247XHJcblxyXG5cclxuICAvLyBPUFRJT05TXHJcbiAgcHVibGljIFRyYWNrQnlGbihpbmRleDogbnVtYmVyKTogYW55IHtcclxuICAgIHJldHVybiBpbmRleDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzaG93RHJvcGRvd25MaXN0KGV2ZW50OiBGb2N1c0V2ZW50IHwgTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLm11bHRpcGxlICYmIHRoaXMub3V0cHV0Lmxlbmd0aCA+PSB0aGlzLm11bHRpcGxlTGltaXQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCgnb3Blbi12aWJvcicpO1xyXG4gICAgdGhpcy5pbnB1dEVsLmZvY3VzKCk7XHJcbiAgICB0aGlzLnVwZGF0ZU9wdGlvbnMoKTtcclxuICAgIHRoaXMub25Ub3VjaGVkKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhpZGVEcm9wZG93bkxpc3QoKTogdm9pZCB7XHJcbiAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4tdmlib3InKTtcclxuICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XHJcbiAgICB0aGlzLmlucHV0RWwuYmx1cigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGhpZGVEcm9wZG93bkxpc3RXaXRoRGVsYXkoKTogdm9pZCB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5oaWRlRHJvcGRvd25MaXN0KCk7XHJcbiAgICB9LCAxMDApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHRvZ2dsZURyb3Bkb3duKGV2ZW50OiBFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmlzT3Blbikge1xyXG4gICAgICB0aGlzLmhpZGVEcm9wZG93bkxpc3QoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2hvd0Ryb3Bkb3duTGlzdCh1bmRlZmluZWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkZWxheTogRnVuY3Rpb24gPSAoZnVuY3Rpb24gKCk6IEZ1bmN0aW9uIHtcclxuICAgIGxldCB0aW1lciA9IDA7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNhbGxiYWNrOiBhbnksIG1zOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcclxuICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGNhbGxiYWNrLCBtcyk7XHJcbiAgICB9O1xyXG4gIH0pKCk7XHJcblxyXG4gIHB1YmxpYyB1cGRhdGVPcHRpb25zKCk6IHZvaWQge1xyXG4gICAgdGhpcy5pc09wZW4gPSB0cnVlO1xyXG4gICAgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmRhdGFMaXN0LmZpbHRlcihkYXRhID0+IHtcclxuICAgICAgICBpZiAoIXRoaXMucXVlcnkgfHwgdGhpcy5xdWVyeS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZjogYW55ID0gZmV0Y2hGcm9tT2JqZWN0KGRhdGEsIHRoaXMuc2VhcmNoUHJvcGVydHkpO1xyXG4gICAgICAgIGlmIChmID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGYpLmluZGV4T2YodGhpcy5xdWVyeSkgPj0gMDtcclxuICAgICAgfSkuZmlsdGVyKGRhdGEgPT4ge1xyXG4gICAgICAgIGlmICghdGhpcy5leGNsdWRlTGlzdCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZCA9IGZldGNoRnJvbU9iamVjdChkYXRhLCB0aGlzLm1vZGVsUHJvcGVydHkpLnZhbHVlT2YoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5leGNsdWRlTGlzdC5maW5kSW5kZXgoZXggPT4ge1xyXG4gICAgICAgICAgbGV0IGEgPSBmZXRjaEZyb21PYmplY3QoZXgsIHRoaXMubW9kZWxQcm9wZXJ0eSkudmFsdWVPZigpO1xyXG4gICAgICAgICAgcmV0dXJuIGRlZXBFcXVhbChkLCBhKTtcclxuICAgICAgICB9KSA8IDA7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgaWYgKHRoaXMuZGF0YUxpc3RTdWIpIHsgdGhpcy5kYXRhTGlzdFN1Yi51bnN1YnNjcmliZSgpOyB9XHJcbiAgICAgIGlmICghdGhpcy5jdXJyZW50Q2FjaGUpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRDYWNoZSA9IHtcclxuICAgICAgICAgIGNvdW50RWxlbWVudDogMCxcclxuICAgICAgICAgIGNvdW50UGFnZXM6IDEsXHJcbiAgICAgICAgICBjdXJyZW50UGFnZTogMSxcclxuICAgICAgICAgIG9iamVjdHM6IFtdLFxyXG4gICAgICAgICAgcXVlcnk6IHRoaXMucXVlcnksXHJcbiAgICAgICAgICBwYXJhbXM6IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYWRkaXRpb25hbEZpbHRlcilcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuY2FjaGVMYXp5RGF0YS5wdXNoKHRoaXMuY3VycmVudENhY2hlKTtcclxuXHJcbiAgICAgICAgbGV0IHBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYWRkaXRpb25hbEZpbHRlcikgYXMgYW55O1xyXG4gICAgICAgIHBhcmFtc1t0aGlzLnNlYXJjaFByb3BlcnR5XSA9IHRoaXMucXVlcnk7XHJcblxyXG4gICAgICAgIHRoaXMuZGF0YUxpc3RTdWIgPSAoPE9ic2VydmFibGU8SURhdGFSZXNwb25zZT4+dGhpcy5kYXRhTGlzdChwYXJhbXMsIDEsIHRoaXMuY291bnRPblBhZ2UpKS5zdWJzY3JpYmUoYW5zd2VyID0+IHtcclxuICAgICAgICAgIHRoaXMuY3VycmVudENhY2hlLm9iamVjdHMgPSB0aGlzLmN1cnJlbnRDYWNoZS5vYmplY3RzLmNvbmNhdChhbnN3ZXIubGlzdCk7XHJcbiAgICAgICAgICB0aGlzLmN1cnJlbnRDYWNoZS5jb3VudEVsZW1lbnQgPSBhbnN3ZXIuaGVhZGVyc1snY291bnQnXTtcclxuICAgICAgICAgIHRoaXMuY3VycmVudENhY2hlLmNvdW50UGFnZXMgPSBNYXRoLmNlaWwodGhpcy5jdXJyZW50Q2FjaGUuY291bnRFbGVtZW50IC8gdGhpcy5jb3VudE9uUGFnZSk7XHJcbiAgICAgICAgfSwgKCkgPT4geyB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHVwZGF0ZU9wdGlvbnNJbkRlbGF5KCk6IHZvaWQge1xyXG4gICAgbGV0IGRlbGF5TXM6IG51bWJlciA9IHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBBcnJheSA/IDEwIDogdGhpcy53YWl0VGltZTtcclxuXHJcbiAgICAvLyBleGVjdXRpbmcgYWZ0ZXIgdXNlciBzdG9wcGVkIHR5cGluZ1xyXG4gICAgdGhpcy5kZWxheSgoKSA9PiB7XHJcbiAgICAgIHRoaXMub2xkUXVlcnkgPSB0aGlzLnF1ZXJ5O1xyXG4gICAgICB0aGlzLmN1cnJlbnRDYWNoZSA9IHRoaXMuR2V0Q2FjaGUodGhpcy5xdWVyeSk7XHJcbiAgICAgIHRoaXMudXBkYXRlT3B0aW9ucygpO1xyXG4gICAgfSwgZGVsYXlNcyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZvY3VzU2VsZWN0ZWRPcHRpb24oKTogdm9pZCB7XHJcbiAgICBsZXQgbGlzdDogYW55ID0gPEhUTUxFbGVtZW50PnRoaXMuZWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2VsZWN0LWRyb3Bkb3duJylbMF07XHJcbiAgICBsZXQgdGFyZ2V0TGk6IGFueSA9IDxIVE1MRWxlbWVudD50aGlzLmVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NlbGVjdC1kcm9wZG93bi1vcHRncm91cC1vcHRpb24nKVt0aGlzLnNlbGVjdG9yUG9zaXRpb25dO1xyXG4gICAgc2Nyb2xsQWN0aXZlT3B0aW9uKGxpc3QsIHRhcmdldExpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBrZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuT3B0aW9ucykge1xyXG4gICAgICB0aGlzLnNob3dEcm9wZG93bkxpc3QodW5kZWZpbmVkKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB0b3RhbE51bUl0ZW06IG51bWJlciA9IHRoaXMuT3B0aW9ucy5sZW5ndGg7XHJcblxyXG4gICAgaWYgKHRoaXMuU2hvd05ldykge1xyXG4gICAgICB0b3RhbE51bUl0ZW0rKztcclxuICAgIH1cclxuXHJcbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcclxuICAgICAgY2FzZSAyNzogLy8gRVNDLCBoaWRlIGF1dG8gY29tcGxldGVcclxuICAgICAgICB0aGlzLmhpZGVEcm9wZG93bkxpc3QoKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMzg6IC8vIFVQLCBzZWxlY3QgdGhlIHByZXZpb3VzIGxpIGVsXHJcbiAgICAgICAgdGhpcy5zZWxlY3RvclBvc2l0aW9uID0gKHRvdGFsTnVtSXRlbSArIHRoaXMuc2VsZWN0b3JQb3NpdGlvbiAtIDEpICUgdG90YWxOdW1JdGVtO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSA0MDogLy8gRE9XTiwgc2VsZWN0IHRoZSBuZXh0IGxpIGVsIG9yIHRoZSBmaXJzdCBvbmVcclxuICAgICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RvclBvc2l0aW9uID0gKHRvdGFsTnVtSXRlbSArIHRoaXMuc2VsZWN0b3JQb3NpdGlvbiArIDEpICUgdG90YWxOdW1JdGVtO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAxMzogLy8gRU5URVIsIGNob29zZSBpdCEhXHJcbiAgICAgICAgaWYgKHRvdGFsTnVtSXRlbSA+IDApIHtcclxuICAgICAgICAgIGlmICh0aGlzLnNlbGVjdG9yUG9zaXRpb24gPT09IHRoaXMuT3B0aW9ucy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5BZGROZXdPYmplY3QodGhpcy5DcmVhdGVOZXcodGhpcy5xdWVyeSkpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RPbmUoZXZlbnQsIHRoaXMuT3B0aW9uc1t0aGlzLnNlbGVjdG9yUG9zaXRpb25dKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuU2hvd05ldykge1xyXG4gICAgICAgICAgdGhpcy5BZGROZXdPYmplY3QodGhpcy5DcmVhdGVOZXcodGhpcy5xdWVyeSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGRlZmF1bHQ6IGJyZWFrO1xyXG4gICAgfVxyXG4gICAgdGhpcy5mb2N1c1NlbGVjdGVkT3B0aW9uKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmV4dFBhZ2UoJGV2ZW50OiBFdmVudCk6IHZvaWQge1xyXG4gICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgLy8gVmFsaWRhdG9yc1xyXG4gICAgaWYgKCEodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RhdGEgTGlzdCBtYXN0IGJlIEZ1bmN0aW9uJyk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuY3VycmVudENhY2hlKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignRm9yIG5leHQgcGFnZSBuZWVkIGNhY2hlIGZvciBmaXJzdCBQYWdlJyk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5jdXJyZW50Q2FjaGUuY3VycmVudFBhZ2UgPj0gdGhpcy5jdXJyZW50Q2FjaGUuY291bnRQYWdlcykgeyB0aHJvdyBuZXcgRXJyb3IoJ01heCBQYWdlIExpbWl0Jyk7IH1cclxuXHJcbiAgICBpZiAodGhpcy5kYXRhTGlzdFN1YikgeyB0aGlzLmRhdGFMaXN0U3ViLnVuc3Vic2NyaWJlKCk7IH1cclxuXHJcbiAgICBsZXQgcGFyYW1zOiBhbnkgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmFkZGl0aW9uYWxGaWx0ZXIpO1xyXG4gICAgcGFyYW1zW3RoaXMuc2VhcmNoUHJvcGVydHldID0gdGhpcy5xdWVyeTtcclxuXHJcbiAgICB0aGlzLmRhdGFMaXN0U3ViID0gdGhpcy5kYXRhTGlzdChwYXJhbXMsIHRoaXMuY3VycmVudENhY2hlLmN1cnJlbnRQYWdlICsgMSwgdGhpcy5jb3VudE9uUGFnZSkuc3Vic2NyaWJlKGFuc3dlciA9PiB7XHJcbiAgICAgIHRoaXMuY3VycmVudENhY2hlLmN1cnJlbnRQYWdlKys7XHJcbiAgICAgIHRoaXMuY3VycmVudENhY2hlLmNvdW50RWxlbWVudCA9IGFuc3dlci5oZWFkZXJzWydjb3VudCddO1xyXG4gICAgICB0aGlzLmN1cnJlbnRDYWNoZS5jb3VudFBhZ2VzID0gTWF0aC5jZWlsKHRoaXMuY3VycmVudENhY2hlLmNvdW50RWxlbWVudCAvIHRoaXMuY291bnRPblBhZ2UpO1xyXG4gICAgICB0aGlzLmN1cnJlbnRDYWNoZS5vYmplY3RzID0gdGhpcy5jdXJyZW50Q2FjaGUub2JqZWN0cy5jb25jYXQoYW5zd2VyLmxpc3QpO1xyXG4gICAgICB0aGlzLnNlbGVjdG9yUG9zaXRpb24gPSAodGhpcy5jdXJyZW50Q2FjaGUuY3VycmVudFBhZ2UgLSAxKSAqIHRoaXMuY291bnRPblBhZ2UgKyAxO1xyXG4gICAgICB0aGlzLmZvY3VzU2VsZWN0ZWRPcHRpb24oKTtcclxuICAgIH0sICgpID0+IHsgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBNT0RFTFxyXG4gIHByaXZhdGUgY2xlYXJQcm9wZXJ0eSgpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0b3JQb3NpdGlvbiA9IDA7XHJcbiAgICB0aGlzLnF1ZXJ5ID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNlbGVjdE9uZSgkZXZlbnQ6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50LCBkYXRhOiBhbnkpOiB2b2lkIHtcclxuICAgIC8vIMOQwqTDkMK4w5DCu8ORwozDkcKCw5HCgCDDkMK9w5DCtcOQwr3DkcKDw5DCtsOQwr3DkcKLw5HChSDDkcKBw5DCvsOQwrHDkcKLw5HCgsOQwrjDkMK5XHJcbiAgICBpZiAoJGV2ZW50IGluc3RhbmNlb2YgTW91c2VFdmVudCAmJiAkZXZlbnQuYnV0dG9uICE9PSAwKSB7IHJldHVybjsgfVxyXG5cclxuICAgIGlmICh0aGlzLm11bHRpcGxlICYmIHRoaXMub3V0cHV0Lmxlbmd0aCA8IHRoaXMubXVsdGlwbGVMaW1pdCkge1xyXG4gICAgICB0aGlzLm91dHB1dC5wdXNoKGRhdGEpO1xyXG4gICAgfSBlbHNlIGlmICghdGhpcy5tdWx0aXBsZSkge1xyXG4gICAgICB0aGlzLm91dHB1dCA9IFtkYXRhXTtcclxuICAgIH1cclxuICAgIHRoaXMuY2hhbmdlRnVsbE1vZGVsLmVtaXQodGhpcy5vdXRwdXQpO1xyXG4gICAgdGhpcy5Nb2RlbCA9IHRoaXMuVmFsdWVGcm9tT3V0cHV0O1xyXG4gICAgdGhpcy5jbGVhclByb3BlcnR5KCk7XHJcbiAgICB0aGlzLmhpZGVEcm9wZG93bkxpc3QoKTtcclxuICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH07XHJcblxyXG4gIHB1YmxpYyByZW1vdmVPbmUoaW5kZXg6IG51bWJlciwgZXZlbnQ6IEV2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHRoaXMub3V0cHV0LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB0aGlzLk1vZGVsID0gdGhpcy5WYWx1ZUZyb21PdXRwdXQ7XHJcblxyXG4gICAgLy8gc2V0IGNsYXNzXHJcbiAgICB0aGlzLm9uVG91Y2hlZCgpO1xyXG4gICAgdGhpcy5pbnB1dENvbnRyb2wuY29udHJvbC5tYXJrQXNUb3VjaGVkKCk7XHJcblxyXG4gICAgLy8gb3BlbiBkcm9wZG93blxyXG4gICAgaWYgKHRoaXMucmVxdWlyZWQpIHtcclxuICAgICAgdGhpcy5zaG93RHJvcGRvd25MaXN0KHVuZGVmaW5lZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBGT1JNQVRUSU5HXHJcblxyXG4gIHB1YmxpYyBnZXQgU2VsZWN0ZWRUZW1wbGF0ZSgpOiBUZW1wbGF0ZVJlZjxhbnk+IHtcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkVGVtcGxhdGUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRUZW1wbGF0ZS50ZW1wbGF0ZVJlZjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5ib3RoVGVtcGxhdGUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuYm90aFRlbXBsYXRlLnRlbXBsYXRlUmVmO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgRHJvcGRvd25UZW1wbGF0ZSgpOiBUZW1wbGF0ZVJlZjxhbnk+IHtcclxuICAgIGlmICh0aGlzLmRyb3Bkb3duVGVtcGxhdGUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZHJvcGRvd25UZW1wbGF0ZS50ZW1wbGF0ZVJlZjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5ib3RoVGVtcGxhdGUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuYm90aFRlbXBsYXRlLnRlbXBsYXRlUmVmO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRMaXN0Rm9ybWF0dGVkKGRhdGE6IGFueSk6IHN0cmluZyB7XHJcbiAgICBsZXQgZm9ybWF0dGVyOiBhbnkgPSB0aGlzLmxpc3RGb3JtYXR0ZXIgfHwgZGVmYXVsdEZvcm1hdHRlcjtcclxuICAgIHJldHVybiBmb3JtYXR0ZXIuYXBwbHkodGhpcywgW2RhdGEsIHRoaXMudmlld1Byb3BlcnR5XSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0RHJvcGRvd25Gb3JtYXR0ZWQoZGF0YTogYW55KTogc3RyaW5nIHtcclxuICAgIGxldCBmb3JtYXR0ZXI6IGFueSA9IHRoaXMuZHJvcGRvd25Gb3JtYXR0ZXIgfHwgZGVmYXVsdEZvcm1hdHRlcjtcclxuICAgIHJldHVybiBmb3JtYXR0ZXIuYXBwbHkodGhpcywgW2RhdGEsIHRoaXMudmlld1Byb3BlcnR5XSk7XHJcbiAgfVxyXG5cclxuICAvLyBJTklUXHJcbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgLy8gdGhpcy5Nb2RlbCA9IHRoaXMuVmFsdWVGcm9tT3V0cHV0OyDDkMKtw5HCgsOQwr4gw5DCssORwoDDkMK+w5DCtMOQwrUgw5HCgsORwoPDkcKCIMORwoLDkMK+w5DCtsOQwrUgw5HCg8OQwrbDkMK1IMOQwr3DkMK1IMOQwr3DkMKww5DCtMOQwr4uXHJcbiAgICB0aGlzLmVsID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndmlib3InKS5pdGVtKDApO1xyXG4gICAgdGhpcy5pbnB1dEVsID0gPEhUTUxJbnB1dEVsZW1lbnQ+KHRoaXMuZWwucXVlcnlTZWxlY3RvcignaW5wdXQnKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkNoYW5nZXMoaW5wdXRzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICBpZiAoaW5wdXRzWydkYXRhTGlzdCddICYmIGlucHV0c1snZGF0YUxpc3QnXS5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgLy8gT3V0cHV0XHJcbiAgICAgIGlmICh0aGlzLk1vZGVsID09PSB1bmRlZmluZWQgfHwgdGhpcy5Nb2RlbCA9PSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5vdXRwdXQgPSBbXTtcclxuICAgICAgICB0aGlzLmNoYW5nZUZ1bGxNb2RlbC5lbWl0KHRoaXMub3V0cHV0KTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLk1vZGVsIGluc3RhbmNlb2YgQXJyYXkgJiYgdGhpcy5tdWx0aXBsZSkge1xyXG4gICAgICAgIHRoaXMuT3V0cHV0ID0gdGhpcy5Nb2RlbDtcclxuICAgICAgfSBlbHNlIGlmICghKHRoaXMuTW9kZWwgaW5zdGFuY2VvZiBBcnJheSkgJiYgIXRoaXMubXVsdGlwbGUpIHtcclxuICAgICAgICB0aGlzLk91dHB1dCA9IFt0aGlzLk1vZGVsXTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLm91dHB1dCB8fCAhdGhpcy5vdXRwdXQubGVuZ3RoKSB7XHJcbiAgICAgICAgICB0aGlzLk1vZGVsID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChpbnB1dHNbJ211bHRpcGxlJ10pIHtcclxuICAgICAgaWYgKGlucHV0c1snbXVsdGlwbGUnXS5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ211bHRpcGxlJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCdtdWx0aXBsZScpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlucHV0c1snYWRkaXRpb25hbEZpbHRlciddKSB7XHJcbiAgICAgIHRoaXMuY3VycmVudENhY2hlID0gdGhpcy5HZXRDYWNoZSh0aGlzLnF1ZXJ5KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRGl2RWxlbWVudD4pIHtcclxuICAgIHRoaXMub3V0cHV0ID0gW107XHJcbiAgfVxyXG5cclxuICAvLyBGT1JNU1xyXG4gIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcclxuICAgIC8vIMOQwp3DkMK+w5HCgMOQwrzDkMKww5DCu8ORwozDkMK9w5HCi8OQwrkgdXBkYXRlIMOQwrzDkMK+w5DCtMOQwrXDkMK7w5DCuFxyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIGlmICgodmFsdWUgaW5zdGFuY2VvZiBBcnJheSAmJiAhdGhpcy5tdWx0aXBsZSkgfHwgKCEodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkgJiYgdGhpcy5tdWx0aXBsZSkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01vZGVsIFR5cGUgRXJyb3InKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBBcnJheSAmJiB0aGlzLk1vZGVsIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICBpZiAodmFsdWUubGVuZ3RoID09PSB0aGlzLk1vZGVsLmxlbmd0aCAmJiB2YWx1ZS5ldmVyeSh2ID0+IHRoaXMuTW9kZWwuaW5kZXhPZih2KSA+PSAwKSkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLk1vZGVsID09PSB2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmZpcnN0TG9hZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuTW9kZWwgPSB2YWx1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbkNoYW5nZTogYW55ID0gKCkgPT4geyB9O1xyXG4gIHB1YmxpYyBvblRvdWNoZWQ6IGFueSA9ICgpID0+IHsgfTtcclxuXHJcbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XHJcbiAgICBpZiAoaXNEaXNhYmxlZCkge1xyXG4gICAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZWwucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gICAgfVxyXG4gICAgLy8gZGlzYWJsZSBvdGhlciBjb21wb25lbnRzIGhlcmVcclxuICB9XHJcblxyXG4gIHNldCBNb2RlbCh2YWx1ZTogYW55KSB7XHJcbiAgICBpZiAodGhpcy5vbmx5RW1pdHRlcikge1xyXG4gICAgICB0aGlzLm91dHB1dCA9IFtdO1xyXG4gICAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE91dHB1dFxyXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLm91dHB1dCA9IFtdO1xyXG4gICAgICB0aGlzLmNoYW5nZUZ1bGxNb2RlbC5lbWl0KHRoaXMub3V0cHV0KTtcclxuICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBBcnJheSAmJiB0aGlzLm11bHRpcGxlKSB7XHJcbiAgICAgIHRoaXMuT3V0cHV0ID0gdmFsdWU7XHJcbiAgICB9IGVsc2UgaWYgKCEodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkgJiYgIXRoaXMubXVsdGlwbGUpIHtcclxuICAgICAgdGhpcy5PdXRwdXQgPSBbdmFsdWVdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE1vZGVsXHJcbiAgICB0aGlzLl9tb2RlbCA9IHZhbHVlO1xyXG5cclxuICAgIC8vIEZvcm1zXHJcbiAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuX21vZGVsKTtcclxuICB9XHJcblxyXG4gIGdldCBNb2RlbCgpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuX21vZGVsO1xyXG4gIH1cclxuXHJcbiAgLy8gUFJPUEVSVFlcclxuICBnZXQgSW5wdXRIaWRlKCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMub3V0cHV0Lmxlbmd0aCA+PSB0aGlzLm11bHRpcGxlTGltaXQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5vdXRwdXQubGVuZ3RoID09PSAxICYmICF0aGlzLmlzT3BlbjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBWYWx1ZUZyb21PdXRwdXQoKTogYW55IHtcclxuICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XHJcbiAgICAgIGxldCB0bXA6IEFycmF5PGFueT4gPSBbXTtcclxuICAgICAgZm9yIChsZXQgbyBvZiB0aGlzLm91dHB1dCkge1xyXG4gICAgICAgIHRtcC5wdXNoKGZldGNoRnJvbU9iamVjdChvLCB0aGlzLm1vZGVsUHJvcGVydHkpKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdG1wO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZldGNoRnJvbU9iamVjdCh0aGlzLm91dHB1dFswXSwgdGhpcy5tb2RlbFByb3BlcnR5KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldCBPdXRwdXQobmV3VmFsdWU6IEFycmF5PGFueT4pIHtcclxuICAgIGxldCBkYXRhTGlzdDogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICBkYXRhTGlzdCA9IHRoaXMuZGF0YUxpc3Q7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICBpZiAobmV3VmFsdWUgJiYgbmV3VmFsdWUubGVuZ3RoICYmIHRoaXMuZmlyc3RMb2FkKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtczogYW55ID0ge307XHJcbiAgICAgICAgdGhpcy5maXJzdExvYWQgPSBmYWxzZTtcclxuICAgICAgICBpZiAoIXRoaXMucHJlbG9hZFByb3BlcnR5KSB7XHJcbiAgICAgICAgICB0aGlzLm91dHB1dCA9IG5ld1ZhbHVlO1xyXG4gICAgICAgICAgdGhpcy5jaGFuZ2VGdWxsTW9kZWwuZW1pdCh0aGlzLm91dHB1dCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHBhcmFtc1t0aGlzLnByZWxvYWRQcm9wZXJ0eV0gPSBuZXdWYWx1ZS5tYXAodmFsID0+IGZldGNoRnJvbU9iamVjdCh2YWwsIHRoaXMucHJlbG9hZEZpZWxkKSk7XHJcbiAgICAgICAgICB0aGlzLmRhdGFMaXN0U3ViID0gKDxPYnNlcnZhYmxlPElEYXRhUmVzcG9uc2U+PnRoaXMuZGF0YUxpc3QocGFyYW1zLCAxLCB0aGlzLmNvdW50T25QYWdlKSkuc3Vic2NyaWJlKGFuc3dlciA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub3V0cHV0ID0gYW5zd2VyLmxpc3Q7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRnVsbE1vZGVsLmVtaXQodGhpcy5vdXRwdXQpO1xyXG4gICAgICAgICAgfSwgKCkgPT4geyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VGdWxsTW9kZWwuZW1pdCh0aGlzLm91dHB1dCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMuZGF0YUxpc3QgPT09IHVuZGVmaW5lZCkgeyByZXR1cm47IH1cclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdkYXRhTGlzdCB2YWx1ZSBFcnJvcicpO1xyXG4gICAgfVxyXG4gICAgbGV0IG5ld091dHB1dDogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgZm9yIChsZXQgdiBvZiBuZXdWYWx1ZSkge1xyXG4gICAgICBmb3IgKGxldCBkIG9mIGRhdGFMaXN0KSB7XHJcbiAgICAgICAgbGV0IGEgPSBmZXRjaEZyb21PYmplY3QoZCwgdGhpcy5tb2RlbFByb3BlcnR5KSA/IGZldGNoRnJvbU9iamVjdChkLCB0aGlzLm1vZGVsUHJvcGVydHkpLnZhbHVlT2YoKSA6IHVuZGVmaW5lZDtcclxuICAgICAgICBsZXQgYiA9IHYgPyB2LnZhbHVlT2YoKSA6IHVuZGVmaW5lZDtcclxuICAgICAgICBpZiAoZGVlcEVxdWFsKGEsIGIpKSB7XHJcbiAgICAgICAgICBuZXdPdXRwdXQucHVzaChkKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMub3V0cHV0ID0gbmV3T3V0cHV0O1xyXG4gICAgdGhpcy5jaGFuZ2VGdWxsTW9kZWwuZW1pdCh0aGlzLm91dHB1dCk7XHJcbiAgfVxyXG5cclxuICBnZXQgT3B0aW9ucygpOiBBcnJheTxhbnk+IHtcclxuICAgIGxldCBvcHRpb25zOiBBcnJheTxhbnk+O1xyXG4gICAgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmRhdGFMaXN0IGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgbGV0IG9sZENhY2hlID0gdGhpcy5HZXRDYWNoZSh0aGlzLm9sZFF1ZXJ5KTtcclxuXHJcbiAgICAgIGlmICghdGhpcy5jdXJyZW50Q2FjaGUgJiYgb2xkQ2FjaGUpIHtcclxuICAgICAgICBvcHRpb25zID0gb2xkQ2FjaGUub2JqZWN0cztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBvcHRpb25zID0gdGhpcy5jdXJyZW50Q2FjaGUgPyB0aGlzLmN1cnJlbnRDYWNoZS5vYmplY3RzIDogW107XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiAob3B0aW9ucyB8fCBbXSkuZmlsdGVyKG9wID0+IHtcclxuICAgICAgcmV0dXJuIHRoaXMub3V0cHV0LmZpbmRJbmRleChvID0+IHtcclxuICAgICAgICBsZXQgYSA9IGZldGNoRnJvbU9iamVjdChvLCB0aGlzLm1vZGVsUHJvcGVydHkpID8gZmV0Y2hGcm9tT2JqZWN0KG8sIHRoaXMubW9kZWxQcm9wZXJ0eSkudmFsdWVPZigpIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIGxldCBiID0gZmV0Y2hGcm9tT2JqZWN0KG9wLCB0aGlzLm1vZGVsUHJvcGVydHkpID8gZmV0Y2hGcm9tT2JqZWN0KG9wLCB0aGlzLm1vZGVsUHJvcGVydHkpLnZhbHVlT2YoKSA6IHVuZGVmaW5lZDtcclxuICAgICAgICByZXR1cm4gZGVlcEVxdWFsKGEsIGIpO1xyXG4gICAgICB9KSA9PT0gLTE7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjdXJyZW50Q2FjaGU6IENhY2hlSW5mbztcclxuICBwcml2YXRlIEdldENhY2hlKHF1ZXJ5OiBzdHJpbmcpOiBDYWNoZUluZm8ge1xyXG4gICAgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICByZXR1cm4gdGhpcy5jYWNoZUxhenlEYXRhLmZpbmQoY2FjaGUgPT4ge1xyXG4gICAgICAgIHJldHVybiBjYWNoZS5xdWVyeSA9PT0gdGhpcy5xdWVyeSAmJiBkZWVwRXF1YWwoY2FjaGUucGFyYW1zLCB0aGlzLmFkZGl0aW9uYWxGaWx0ZXIpO1xyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8vIENyZWF0ZU5ld1xyXG5cclxuICBwdWJsaWMgQWRkTmV3T2JqZWN0KHZhbHVlOiBPYnNlcnZhYmxlPGFueT4gfCBhbnkpOiB2b2lkIHtcclxuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcclxuICAgICAgdmFsdWUuc3Vic2NyaWJlKG5ld09iamVjdCA9PiB7XHJcbiAgICAgICAgaWYgKG5ld09iamVjdCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICB0aGlzLlNldE5ld09iamVjdChuZXdPYmplY3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlNldE5ld09iamVjdCh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIFNldE5ld09iamVjdChuZXdPYmplY3Q6IGFueSkge1xyXG4gICAgaWYgKHRoaXMuZGF0YUxpc3QgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICB0aGlzLmRhdGFMaXN0LnB1c2gobmV3T2JqZWN0KTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgIGZvciAobGV0IGNhY2hlIG9mIHRoaXMuY2FjaGVMYXp5RGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLnF1ZXJ5LmluY2x1ZGVzKGNhY2hlLnF1ZXJ5KSB8fCBjYWNoZS5xdWVyeSA9PT0gdW5kZWZpbmVkIHx8IGNhY2hlLnF1ZXJ5ID09PSAnJykge1xyXG4gICAgICAgICAgY2FjaGUuY291bnRFbGVtZW50Kys7XHJcbiAgICAgICAgICBjYWNoZS5vYmplY3RzLnB1c2gobmV3T2JqZWN0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmZpcnN0TG9hZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5xdWVyeSA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuY3VycmVudENhY2hlID0gdGhpcy5HZXRDYWNoZSh0aGlzLnF1ZXJ5KTtcclxuICAgIHRoaXMuc2VsZWN0T25lKG5ldyBNb3VzZUV2ZW50KCdjbGljaycpLCBuZXdPYmplY3QpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IFNob3dOZXcoKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgYSA9IHRoaXMucXVlcnkgJiYgdGhpcy5uZXdNZXNzYWdlICYmICghdGhpcy5kYXRhTGlzdFN1YiB8fCB0aGlzLmRhdGFMaXN0U3ViLmNsb3NlZCk7XHJcblxyXG4gICAgbGV0IGIgPSB0aGlzLk9wdGlvbnMuZmluZEluZGV4KG8gPT4ge1xyXG4gICAgICBsZXQgYyA9IGZldGNoRnJvbU9iamVjdChvLCB0aGlzLnZpZXdQcm9wZXJ0eSkgPyBmZXRjaEZyb21PYmplY3QobywgdGhpcy52aWV3UHJvcGVydHkpLnZhbHVlT2YoKSA6IHVuZGVmaW5lZDtcclxuICAgICAgcmV0dXJuIGRlZXBFcXVhbChjLCB0aGlzLnF1ZXJ5KTtcclxuICAgIH0pID09PSAtMSAmJiB0aGlzLm91dHB1dC5maW5kSW5kZXgobyA9PiB7XHJcbiAgICAgIGxldCBjID0gZmV0Y2hGcm9tT2JqZWN0KG8sIHRoaXMudmlld1Byb3BlcnR5KSA/IGZldGNoRnJvbU9iamVjdChvLCB0aGlzLnZpZXdQcm9wZXJ0eSkudmFsdWVPZigpIDogdW5kZWZpbmVkO1xyXG4gICAgICByZXR1cm4gZGVlcEVxdWFsKGMsIHRoaXMucXVlcnkpO1xyXG4gICAgfSkgPT09IC0xO1xyXG5cclxuICAgIHJldHVybiBhICYmIGI7XHJcbiAgfVxyXG5cclxuICBnZXQgU2hvd0VtcHR5KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuT3B0aW9ucy5sZW5ndGggPT09IDAgJiYgKCEodGhpcy5kYXRhTGlzdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB8fCAodGhpcy5kYXRhTGlzdFN1Yi5jbG9zZWQpKTtcclxuICB9XHJcblxyXG5cclxuICAvLyBDQUNIRVxyXG4gIHByaXZhdGUgY2FjaGVMYXp5RGF0YTogQXJyYXk8Q2FjaGVJbmZvPiA9IFtdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENhY2hlSW5mbyB7XHJcbiAgY291bnRFbGVtZW50OiBudW1iZXI7XHJcbiAgY291bnRQYWdlczogbnVtYmVyO1xyXG4gIGN1cnJlbnRQYWdlOiBudW1iZXI7XHJcbiAgb2JqZWN0czogQXJyYXk8YW55PjtcclxuXHJcbiAgcXVlcnk6IHN0cmluZztcclxuICBwYXJhbXM6IGFueTtcclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBOZ1ZpYm9yQ29tcG9uZW50IH0gZnJvbSAnLi9uZy12aWJvci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBWaWJvckJvdGhEaXJlY3RpdmUsIFZpYm9yQ3JlYXRlRGlyZWN0aXZlLCBWaWJvckRyb3Bkb3duRGlyZWN0aXZlLCBWaWJvclNlbGVjdGVkRGlyZWN0aXZlIH0gZnJvbSAnLi9uZy12aWJvci10ZW1wbGF0ZS5kaXJlY3RpdmUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBGb3Jtc01vZHVsZSwgQ29tbW9uTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIE5nVmlib3JDb21wb25lbnQsXHJcbiAgICBWaWJvckJvdGhEaXJlY3RpdmUsIFZpYm9yQ3JlYXRlRGlyZWN0aXZlLCBWaWJvckRyb3Bkb3duRGlyZWN0aXZlLCBWaWJvclNlbGVjdGVkRGlyZWN0aXZlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBOZ1ZpYm9yQ29tcG9uZW50LCBGb3Jtc01vZHVsZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nVmlib3JNb2R1bGUgeyB9XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtJQU1FLGlCQUFpQjs7O1lBSmxCLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7Ozs7Ozs7OztBQ0pEOzs7O0lBSUksWUFBbUIsV0FBNkI7UUFBN0IsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO0tBQUk7OztZQUZ2RCxTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsd0JBQXdCLEVBQUU7Ozs7WUFGN0IsV0FBVzs7Ozs7O0lBUzNCLFlBQW1CLFdBQTZCO1FBQTdCLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtLQUFJOzs7WUFGdkQsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLHdCQUF3QixFQUFFOzs7O1lBUDdCLFdBQVc7Ozs7OztJQWMzQixZQUFtQixXQUE2QjtRQUE3QixnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7S0FBSTs7O1lBRnZELFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRTs7OztZQVp6QixXQUFXOzs7Ozs7SUFtQjNCLFlBQW1CLFdBQTZCO1FBQTdCLGdCQUFX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