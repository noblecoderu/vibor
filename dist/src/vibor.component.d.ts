import { OnInit, OnChanges, EventEmitter, ElementRef, TemplateRef, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NgModel } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ViborBothDirective, ViborCreateDirective, ViborDropdownDirective, ViborSelectedDirective } from './vibor.template.directive';
import { IDataResponse } from './helpers';
export declare class ViborComponent implements OnInit, OnChanges, ControlValueAccessor {
    _model: any;
    private firstLoad;
    private options;
    output: Array<any>;
    isOpen: boolean;
    private oldQuery;
    query: string;
    private selectorPosition;
    private waitTime;
    private el;
    private inputEl;
    inputControl: NgModel;
    multiple: boolean;
    multipleLimit: number;
    countOnPage: number;
    placeholder: string;
    name: string;
    required: boolean;
    disabled: boolean;
    bothTemplate: ViborBothDirective;
    dropdownTemplate: ViborDropdownDirective;
    selectedTemplate: ViborSelectedDirective;
    createTemplate: ViborCreateDirective;
    listFormatter: (arg: any, value: string) => string;
    dropdownFormatter: (arg: any, value: string) => string;
    viewProperty: string;
    modelProperty: string;
    preloadProperty: string;
    preloadField: string;
    searchProperty: string;
    dataList: ((param: Object, page: number, countOnPage?: number) => Observable<IDataResponse>) | Array<any>;
    excludeList: Array<any>;
    additionalFilter: {};
    onlyEmitter: boolean;
    changeFullModel: EventEmitter<any>;
    newMessage: string;
    CreateNew: (query: string) => Observable<any> | any;
    dataListSub: Subscription;
    TrackByFn(index: number): any;
    showDropdownList(event: FocusEvent | MouseEvent): void;
    private hideDropdownList();
    hideDropdownListWithDelay(): void;
    toggleDropdown(event: Event): void;
    private delay;
    updateOptions(): void;
    updateOptionsInDelay(): void;
    private focusSelectedOption();
    keyDown(event: KeyboardEvent): void;
    nextPage($event: Event): void;
    private clearProperty();
    selectOne($event: MouseEvent | KeyboardEvent, data: any): void;
    removeOne(index: number, event: Event): void;
    readonly SelectedTemplate: TemplateRef<any>;
    readonly DropdownTemplate: TemplateRef<any>;
    getListFormatted(data: any): string;
    getDropdownFormatted(data: any): string;
    ngOnInit(): void;
    ngOnChanges(inputs: SimpleChanges): void;
    constructor(elementRef: ElementRef);
    writeValue(value: any): void;
    onChange: any;
    onTouched: any;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(isDisabled: boolean): void;
    Model: any;
    readonly InputHide: boolean;
    readonly ValueFromOutput: any;
    Output: Array<any>;
    readonly Options: Array<any>;
    currentCache: CacheInfo;
    private GetCache(query);
    AddNewObject(value: Observable<any> | any): void;
    private SetNewObject(newObject);
    readonly ShowNew: boolean;
    readonly ShowEmpty: boolean;
    UpdateValue(): void;
    private cacheLazyData;
}
export interface CacheInfo {
    countElement: number;
    countPages: number;
    currentPage: number;
    objects: Array<any>;
    query: string;
    params: any;
}
