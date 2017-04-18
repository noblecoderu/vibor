import {
  Component, OnInit, OnChanges,
  Input, Output, forwardRef,
  EventEmitter, ElementRef,
  ViewChild,
  SimpleChanges
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';


import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import {
  IDataResponse,
  defaultFormatter,
  fetchFromObject,
  scrollActiveOption
} from './helpers';

const deepEqual = require('deep-equal');

const template =  '   <div class="select-search">  '  +
 '       <ul class="select-search-list">  '  +
 '           <li class="select-search-list-item select-search-list-item_selection"  '  +
 '               *ngFor="let item of output; let $index=index; let $last=last; trackBy: TrackByFn;"  '  +
 '               [class.focused]="backspaceFocus && last"  '  +
 '               (click)="!disabled && removeOne($index)"  '  +
 '               [innerHTML]="getListFormatted(item)">  '  +
 '           </li>  '  +
 '           <li class="select-search-list-item select-search-list-item_input"  '  +
 '               [class.select-search-list-item_hide]="InputHide">  '  +
 '               <input autocomplete="off"  '  +
 '                      #inputControl="ngModel"   '  +
 '                      [name]="name"  '  +
 '                      [disabled]="disabled"  '  +
 '                      [required]="required"  '  +
 '                      [(ngModel)]="query"  '  +
 '                      [placeholder]="output.length == 0 ? placeholder : \'\'"  '  +
 '                      (input)="updateOptionsInDelay()"  '  +
 '                      (blur)="hideDropdownList()"  '  +
 '                      (focus)="showDropdownList()"  '  +
 '                      (keydown)="keyDown($event)"/>  '  +
 '           </li>  '  +
 '           <li class="select-search-list-item" [hidden]="!dataListSub || dataListSub.closed">  '  +
 '               <div class="select-search-list-item_loader"></div>  '  +
 '           </li>  '  +
 '     '  +
 '       </ul>  '  +
 '   </div>  '  +
 '   <div class="select-dropdown" *ngIf="isOpen">  '  +
 '       <ul class="select-dropdown-optgroup">  '  +
 '           <li class="select-dropdown-optgroup-option"  '  +
 '               *ngFor="let option of Options; let i=index"  '  +
 '               (mousedown)="selectOne($event, option)"  '  +
 '               [class.active]="i === selectorPosition"  '  +
 '               [innerHTML]="getDropdownFormatted(option)">  '  +
 '           </li>  '  +
 '           <li class="select-dropdown-optgroup-option loader" *ngIf="dataListSub && !dataListSub.closed">  '  +
 '               Загрузка  '  +
 '           </li>  '  +
 '           <li class="select-dropdown-optgroup-option loader"  '  +
 '               (mousedown)="selectOne($event, CreateNew(query));"  '  +
 '               *ngIf="newMessage && (!dataListSub || dataListSub.closed) && Options.length == 0">  '  +
 '               {{ newMessage }}  '  +
 '           </li>  '  +
 '       </ul>  '  +
 '       <div class="select-dropdown-pager" *ngIf="CurrentCache && CurrentCache.countPages > 1">  '  +
 '           <p class="select-dropdown-pager-page">  '  +
 '               {{ CurrentCache.currentPage | number }} / {{ CurrentCache.countPages | number }}  '  +
 '           </p>  '  +
 '           <button  '  +
 '               class="select-dropdown-pager-loadmore"  '  +
 '                   *ngIf="CurrentCache.countPages > 1 && CurrentCache.currentPage < CurrentCache.countPages"  '  +
 '                   (mousedown)="nextPage($event)">  '  +
 '               Загрузить ещё  '  +
 '           </button>  '  +
 '       </div>  '  +
 '   </div>  '  +
 '    ' ;

@Component({
     // tslint:disable-next-line:component-selector
     selector: 'vibor',
     template: template,
     providers: [{
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => ViborComponent),
       multi: true
     }]
 })
export class ViborComponent implements OnInit, OnChanges, ControlValueAccessor {

  // Local Variable
  private firstLoad = false;
  private options: Array<any>;
  public output: Array<any>;

  public isOpen: boolean;

  private oldQuery = '';
  public query = '';

  private selectorPosition = 0;
  private waitTime = 500;

  private el: HTMLElement;           // this component  element `<vibor>`
  private inputEl: HTMLInputElement; // `<input>` element in `<vibor>` for auto complete
  @ViewChild("inputControl") public inputControl: NgModel; 

  // Inputs & Outputs
  @Input() public multiple = false;
  @Input() public canClean = false;
  @Input() public multipleLimit = 5;

  @Input() public placeholder = 'Vibor';
  @Input() public name: string;
  @Input() public required = false;
  @Input() public disabled = false;

  @Input() public listFormatter: (arg: any, value: string) => string;
  @Input() public dropdownFormatter: (arg: any, value: string) => string;
  @Input() public viewProperty = 'Name';  // Поле для дефолтного отображения

  @Input() public modelProperty = 'id';  // То, что записывается в Модель
  @Input() public preloadProperty = 'ids'; // Ключ запроса к серверу для предзагрузки, если undefined записывается весь объект
  @Input() public preloadField: string = undefined; // Значение поля, которе необходимо отправить в запрос.
  @Input() public searchProperty = 'query';

  @Input() public dataList: ((param: Object, page: number) => Observable<IDataResponse>) | Array<any>;
  @Input() public onlyEmitter: boolean;
  // tslint:disable-next-line:no-input-rename
  public _model: any;
  // tslint:disable-next-line:no-output-rename
  @Output('changeFullModel') public changeFullModel: EventEmitter<any> = new EventEmitter();


  @Input() public newMessage: string = undefined;
  @Input() public CreateNew: (query: string) => any = (query: string) => {
    return {
      id: query,
      Name: query
    };
  }

  // Subscription
  public dataListSub: Subscription;


  // OPTIONS
  public TrackByFn(index: number): any {
    return index;
  }

  public showDropdownList(): void {
    this.el.classList.add('open-vibor');
    this.inputEl.focus();
    this.updateOptions();
    this.onTouched();
  }

  public hideDropdownList(): void {
    this.el.classList.remove('open-vibor');
    this.isOpen = false;
    this.inputEl.blur();
  }

  private delay: Function = (function (): Function {
    let timer = 0;
    return function (callback: any, ms: number): void {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();

  public updateOptions(): void {
    this.isOpen = true;
    if (this.dataList instanceof Array) {
      this.options = this.dataList.filter(data => {
        if (!this.query || this.query.length === 0) {
          return true;
        }
        let f: any = fetchFromObject(data, this.searchProperty);
        if (f === undefined) {
          return false;
        }
        return JSON.stringify(f).indexOf(this.query) >= 0;
      });
    } else if (this.dataList instanceof Function) {
      if (this.dataListSub) { this.dataListSub.unsubscribe(); }
      if (!this.CurrentCache) {
        this.cacheLazyData[this.query] = {
          countElement: 0,
          countPages: 1,
          currentPage: 1,
          objects: []
        };
        let tmp: CacheInfo = this.CurrentCache, params: any = {};
        params[this.searchProperty] = this.query;
        this.dataListSub = (<Observable<IDataResponse>>this.dataList(params, 1)).subscribe(answer => {
          tmp.objects = tmp.objects.concat(answer.list);
          tmp.countElement = answer.headers['count'];
          tmp.countPages = Math.ceil(tmp.countElement / 20);
        }, () => { });
      }
    }
  }

  public updateOptionsInDelay(): void {
    let delayMs: number = this.dataList instanceof Array ? 10 : this.waitTime;

    // executing after user stopped typing
    this.delay(() => {
      this.oldQuery = this.query;
      this.updateOptions();
    }, delayMs);
  }

  private focusSelectedOption(): void {
    let list: any = <HTMLElement>this.el.getElementsByClassName('select-dropdown')[0];
    let targetLi: any = <HTMLElement>this.el.getElementsByClassName('select-dropdown-optgroup-option')[this.selectorPosition];
    scrollActiveOption(list, targetLi);
  }

  public keyDown(event: KeyboardEvent): void {
    let totalNumItem: number = this.Options.length;
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
        if (totalNumItem > 0) {
          this.selectOne(event, this.Options[this.selectorPosition]);
        } else if (this.newMessage && (!this.dataListSub || this.dataListSub.closed)) {
          let value: any = this.CreateNew(this.query);
          this.selectOne(event, value);
        }
        break;

      default: break;
    }
    this.focusSelectedOption();
  }

  public nextPage($event: Event): void {
    $event.preventDefault();
    let tmp: CacheInfo = this.CurrentCache;

    // Validators
    if (!(this.dataList instanceof Function)) {
      throw new Error('Data List mast be Function');
    }
    if (!tmp) {
      throw new Error('For next page need cache for first Page');
    }
    if (tmp.currentPage >= tmp.countPages) { throw new Error('Max Page Limit'); }

    if (this.dataListSub) { this.dataListSub.unsubscribe(); }

    let params: any = {};
    params[this.searchProperty] = this.query;

    this.dataListSub = (<Observable<IDataResponse>>this.dataList(params, tmp.currentPage + 1)).subscribe(answer => {
      tmp.currentPage++;
      tmp.countElement = answer.headers['count'];
      tmp.countPages = Math.ceil(tmp.countElement / 20);
      tmp.objects = tmp.objects.concat(answer.list);
      this.selectorPosition = (tmp.currentPage - 1) * 20 + 1;
      this.focusSelectedOption();
    }, () => { });
  }

  // MODEL
  private clearProperty(): void {
    this.selectorPosition = 0;
    this.query = '';
  }

  public selectOne($event: MouseEvent | KeyboardEvent, data: any): void {
    // Фильтр ненужных событий
    if ($event instanceof MouseEvent && $event.button !== 0) { return; }

    if (this.multiple) {
      this.output.push(data);
    } else {
      this.output = [data];
    }
    this.changeFullModel.emit(this.output);
    this.Model = this.ValueFromOutput;
    this.clearProperty();
    this.hideDropdownList();
    $event.preventDefault();
  };

  public removeOne(index: number): void {
    this.output.splice(index, 1);
    this.Model = this.ValueFromOutput;
    
    // set class
    this.onTouched();
    this.inputControl.control.markAsTouched();

    // open dropdown
    if (this.required) {
      this.showDropdownList();
    }
  }

  // FORMATTING
  public getListFormatted(data: any): string {
    let formatter: any = this.listFormatter || defaultFormatter;
    return formatter.apply(this, [data, this.viewProperty]);
  }

  public getDropdownFormatted(data: any): string {
    let formatter: any = this.dropdownFormatter || defaultFormatter;
    return formatter.apply(this, [data, this.viewProperty]);
  }

  // INIT
  public ngOnInit(): void {
    // this.Model = this.ValueFromOutput; Это вроде тут тоже уже не надо.
    this.inputEl = <HTMLInputElement>(this.el.querySelector('input'));
  }

  public ngOnChanges(inputs: SimpleChanges): void {
    if (inputs['_model'] && inputs['_model'].currentValue === undefined) {
      this.Model = undefined;
    }
    if (inputs['canClean']) {
      if (inputs['canClean'].currentValue) {
        this.el.classList.add('cleanMode');
      } else {
        this.el.classList.remove('cleanMode');
      }
    }
    if (inputs['dataList'] && inputs['dataList'].currentValue) {
      // Output
      if (this.Model === undefined || this.Model == null) {
        this.output = [];
        this.changeFullModel.emit(this.output);
      } else if (this.Model instanceof Array && this.multiple) {
        this.Output = this.Model;
      } else if (!(this.Model instanceof Array) && !this.multiple) {
        this.Output = [this.Model];
      }
    }
    if (inputs['multiple']) {
      if (!('_model' in inputs)) {
        setTimeout(() => this.Model = undefined, 10); // Костыль, надо бы исправить
      }
      if (inputs['multiple'].currentValue) {
        this.el.classList.add('multiple');
      } else {
        this.el.classList.remove('multiple');
      }
    }
    if (inputs['disabled']) {
      if (inputs['disabled'].currentValue) {
        this.el.setAttribute('disabled', 'disabled');
      } else {
        this.el.removeAttribute('disabled');
      }
    }
    if (inputs['required']) {
      if (inputs['required'].currentValue) {
        this.el.setAttribute('required', 'required');
      } else {
        this.el.removeAttribute('required');
      }
    }
  }

  constructor(elementRef: ElementRef) {
    this.el = elementRef.nativeElement;
    this.output = [];
  }

  // FORMS
  public writeValue(value: any): void {
    // Нормальный update модели
    if (value) {
      if ((value instanceof Array && !this.multiple) || (!(value instanceof Array) && this.multiple)) {
        throw new Error('Model Type Error');
      }
      this.firstLoad = true;
      this.Model = value;
    }
  }

  public onChange: any = () => { };
  public onTouched: any = () => { };

  public registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean) {
      if (isDisabled) {
        this.el.setAttribute('disabled', 'disabled');
      } else {
        this.el.removeAttribute('disabled');
      }
      // disable other components here
  }

  set Model(value: any) {
    if (this.onlyEmitter) {
      this.output = [];
      this.onChange(value);
      return;
    }

    // Output
    if (value === undefined || value == null) {
      this.output = [];
      this.changeFullModel.emit(this.output);
    } else if (value instanceof Array && this.multiple) {
      this.Output = value;
    } else if (!(value instanceof Array) && !this.multiple) {
      this.Output = [value];
    }

    // Model
    this._model = value;

    // Forms
    this.onChange(this._model);
  }

  get Model(): any {
    return this._model;
  }

  // PROPERTY
  get InputHide(): boolean {
    if (this.multiple) {
      return this.output.length >= this.multipleLimit;
    } else {
      return this.output.length === 1;
    }
  }

  get ValueFromOutput(): any {
    if (this.multiple) {
      let tmp: Array<any> = [];
      for (let o of this.output) {
        tmp.push(fetchFromObject(o, this.modelProperty));
      }
      return tmp;
    } else {
      return fetchFromObject(this.output[0], this.modelProperty);
    }
  }

  set Output(newValue: Array<any>) {
    let dataList: Array<any> = [];
    if (this.dataList instanceof Array) {
      dataList = this.dataList;
    } else if (this.dataList instanceof Function) {
      if (newValue && newValue.length && this.firstLoad) {
        let params: any = {};
        this.firstLoad = false;
        if (!this.preloadProperty) {
          this.output = newValue;
          this.changeFullModel.emit(this.output);
        } else {
          params[this.preloadProperty] = newValue.map(val => fetchFromObject(val, this.preloadField));
          this.dataListSub = (<Observable<IDataResponse>>this.dataList(params, 1)).subscribe(answer => {
            this.output = answer.list;
            this.changeFullModel.emit(this.output);
          }, () => { });
        }
      } else {
        this.changeFullModel.emit(this.output);
      }
      return;
    } else {
      if (this.dataList === undefined) { return; }
      throw new Error('dataList value Error');
    }
    let newOutput: Array<any> = [];
    for (let v of newValue) {
      for (let d of dataList) {
        if (deepEqual(fetchFromObject(d, this.modelProperty), v)) {
          newOutput.push(d);
        }
      }
    }
    this.output = newOutput;
    this.changeFullModel.emit(this.output);
  }

  get Options(): Array<any> {
    let options: Array<any>;
    if (this.dataList instanceof Array) {
      options = this.options;
    } else if (this.dataList instanceof Function) {
      if (!(this.query in this.cacheLazyData)) {
        options = this.cacheLazyData[this.oldQuery]['objects'];
      } else {
        options = this.CurrentCache.objects;
      }
    }
    return options.filter(op => {
      return this.output.findIndex(o => {
        return deepEqual(fetchFromObject(o, this.modelProperty), fetchFromObject(op, this.modelProperty));
      }) === -1;
    });
  }

  get CurrentCache(): CacheInfo | undefined{
    if (this.dataList instanceof Function) {
      return <CacheInfo>this.cacheLazyData[this.query];
    }
    return undefined;
  }

  // CACHE


  private cacheLazyData: any = {};
}

export interface CacheInfo {
  countElement: number;
  countPages: number;
  currentPage: number;
  objects: Array<any>;
}
