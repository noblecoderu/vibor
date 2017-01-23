import {
    Component, OnInit, OnChanges,
    Input, Output, forwardRef,
    EventEmitter, ElementRef,
    ViewEncapsulation
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { Subscription, Observable } from 'rxjs';
import {
    IDataResponse,
    defaultFormatter,
    fetchFromObject
} from './helpers';

@Component({
    selector: 'vibor',
    templateUrl: 'vibor/vibor.component.html',
    styleUrls: ['vibor/style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [{ 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ViborComponent),
      multi: true
    }]
})
export class ViborComponent implements OnInit, OnChanges, ControlValueAccessor{

    // Local Variable
    private options: Array<any>;
    private output: Array<any>;
    private order: Array<any>;
    private groups: Object;
    private backspaceFocus: Boolean;
    private inputHide: Boolean;
    private multiple: Boolean;
    private showLoader: Boolean;
    private isOpen: Boolean;
    private oldQuery: String;
    private query: String;
    private multipleLimit: number;
    private selectorPosition: number = 0;
    private waitTime: number = 500;

    el: HTMLElement;           // this component  element `<ng2-auto-complete>`
    inputEl: HTMLInputElement; // `<input>` element in `<ng2-auto-complete>` for auto complete

    // Inputs & Outputs
    @Input("list-formatter") listFormatter: (arg: any, value: string) => string;
    @Input("dropdown-formatter") dropdownFormatter: (arg: any, value: string) => string;
    
    @Input("value-property-name") valuePropertyName: string = "name";
    @Input("query-property-name") queryPropertyName: string = "query";
    @Input('dataList') dataList: (({}, number) => Observable<IDataResponse>) | Array<any>;

    @Input("ngModel") _model: any;

    // Subscription
    private dataListSub: Subscription;

    // OPTIONS
    showDropdownList(): void {
        this.inputEl.focus();
        this.updateOptions();
    }

    hideDropdownList(): void {
        this.isOpen = false;
        this.inputEl.blur();
    }

    private delay = (function () {
        var timer = 0;
        return function (callback: any, ms: number) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })();

    private updateOptions(): void {
        if (this.dataList instanceof Array) {
            this.isOpen = true;
            this.options = this.dataList;
        } else if (this.dataList instanceof Function) {
            if (this.dataListSub) this.dataListSub.unsubscribe();
            let params = {};
            params[this.queryPropertyName] = this.query;
            this.dataListSub = (<Observable<IDataResponse>>this.dataList(params, 0)).subscribe(answer => {
                this.isOpen = true;
                this.options = answer.list;
            }, error => { });
        }
    }

    updateOptionsInDelay(): void {
        let delayMs = this.dataList instanceof Array ? 10 : this.waitTime;

        // executing after user stopped typing
        this.delay(() => this.updateOptions(), delayMs);
    }

    // MODEL
    private clearProperty(): void {
        this.selectorPosition = 0;
        this.query = undefined;
    }

    private modelChange(): void {
        if (this.multiple) {
            this.inputHide = this.output.length >= this.multipleLimit;
            this.Model = this.output;
        } else {
            this.inputHide = this.output.length == 1;
            this.Model = this.output[0];
        }
    }

    private selectOne($event: MouseEvent | KeyboardEvent, data: any) {
        // Фильтр ненужных событий
        if ($event instanceof MouseEvent && $event.button != 0) return;
        
        if (this.multiple) {
            this.output.push(data);
        } else {
            this.output = [data];
        }
        this.modelChange();
        this.clearProperty();
        this.hideDropdownList();
        $event.preventDefault();
    };

    private removeOne(index: number): void {
        this.output.splice(index, 1);
        this.modelChange();
    }

    // FORMATTING
    getListFormatted(data: any): string {
        let formatter = this.listFormatter || defaultFormatter;
        return formatter.apply(this, [data, this.valuePropertyName]);
    }

    getDropdownFormatted(data: any): string {
        let formatter = this.dropdownFormatter || defaultFormatter;
        return formatter.apply(this, [data, this.valuePropertyName]);
    }

    // INIT
    ngOnInit(): void {
        this.modelChange();
        this.inputEl = <HTMLInputElement>(this.el.querySelector("input"));
    }

    ngOnChanges(inputs): void {
        if(inputs._model.currentValue == undefined){
            this.Model = undefined;   
        }
    }

    constructor(elementRef: ElementRef) {
        this.el = elementRef.nativeElement;
        this.output = [];
    }

    // leagcy
    private getSearchLabel = function (item) {
        return item;
    };

    private keyDown(event: KeyboardEvent): void {
        let totalNumItem = this.options.length;

        switch (event.keyCode) {
            case 27: // ESC, hide auto complete
                this.hideDropdownList();
                break;

            case 38: // UP, select the previous li el
                this.selectorPosition = (totalNumItem + this.selectorPosition - 1) % totalNumItem;
                break;

            case 40: // DOWN, select the next li el or the first one
                this.isOpen = true;
                this.selectorPosition = (totalNumItem + this.selectorPosition + 1) % totalNumItem;
                break;

            case 13: // ENTER, choose it!!
                if (this.options.length > 0) {
                    this.selectOne(event, this.options[this.selectorPosition]);
                }
                // Возможно тут надо будет создавать объект
                break;
        }
    };

    // FORMS
    writeValue(value: any) {
        // Нормальный update модели
        if (value) {
            this.Model = value;
        }
    }

    onChange: any = () => {};
    onTouched: any = () => {};

    registerOnChange(fn) {
        this.onChange = fn;
    }

    registerOnTouched(fn) {
        this.onTouched = fn;
    }

    set Model(value) {
        // Model
        this._model = value;

        // Output
        if (value == undefined){
            this.output = [];
            this.inputHide = false;
        } else if (value instanceof Array && this.multiple) {
            this.output = value;
            this.inputHide = this.output.length >= this.multipleLimit;
        } else if (!(value instanceof Array) && !this.multiple){
            this.output = [value];
            this.inputHide = false;
        }

        // Forms
        this.onChange(this._model);
        this.onTouched();
    }

    get Model() {
        return this._model;
    }
}
