import {
  Component, OnInit, OnChanges,
  Input, Output, forwardRef,
  EventEmitter, ElementRef,
  ViewEncapsulation, SimpleChanges
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import {
  IDataResponse,
  defaultFormatter,
  fetchFromObject,
  scrollActiveOption
} from './helpers';

const deepEqual = require('deep-equal');

@Component({
  selector: 'vibor',
  templateUrl: './vibor.component.html',
  styleUrls: ['./vibor.component.scss']
})
export class ViborComponent implements OnInit {

  // Local Variable
  private firstLoad: boolean = false;
  private options: Array<any>;
  private output: Array<any>;

  private showLoader: boolean;
  private isOpen: boolean;

  private oldQuery: string = '';
  private query: string = '';

  private selectorPosition: number = 0;
  private waitTime: number = 500;

  private el: HTMLElement;           // this component  element `<vibor>`
  private inputEl: HTMLInputElement; // `<input>` element in `<vibor>` for auto complete
  private ulEl: HTMLUListElement; // `<ul>` element in `<vibor>` for auto complete

  // Inputs & Outputs
  @Input() public multiple: Boolean = false;
  @Input() public canClean: Boolean = false;
  @Input() public multipleLimit: number = 5;

  @Input() public placeholder: string = 'Vibor';
  @Input() public required: boolean = false;
  @Input() public disabled: boolean = false;

  @Input() public listFormatter: (arg: any, value: string) => string;
  @Input() public dropdownFormatter: (arg: any, value: string) => string;
  @Input() public viewProperty: string = 'Name';  // Поле для дефолтного отображения

  @Input() public modelProperty: string = 'id';  // То, что записывается в Модель
  @Input() public preloadProperty: string = 'ids'; // Ключ запроса к серверу для предзагрузки, если undefined записывается весь объект
  @Input() public preloadField: string = undefined; // Значение поля, которе необходимо отправить в запрос.
  @Input() public searchProperty: string = 'query';

  @Input() public dataList: ((param: Object, page: number) => Observable<IDataResponse>) | Array<any>;
  @Input() public onlyEmitter: boolean;
  @Input('ngModel') public _model: any;
  @Output('ngChange') public _ngChange: EventEmitter<any> = new EventEmitter();
  @Output('changeFullModel') public changeFullModel: EventEmitter<any> = new EventEmitter();


  @Input() public newMessage: string = undefined;
  @Input() public CreateNew: (query: string) => any = (query: string) => {
    return {
      id: query,
      Name: query
    };
  }

  // Subscription
  private dataListSub: Subscription;


  // OPTIONS
  private TrackByFn(index: number): any {
    return index;
  }

  private showDropdownList(): void {
    this.el.classList.add('open-vibor');
    this.inputEl.focus();
    this.updateOptions();
    this.onTouched();
  }

  private hideDropdownList(): void {
    this.el.classList.remove('open-vibor');
    this.isOpen = false;
    this.inputEl.blur();
  }

  private delay: Function = (function (): Function {
    var timer: number = 0;
    return function (callback: any, ms: number): void {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();

  private updateOptions(): void {
    this.isOpen = true;
    if (this.dataList instanceof Array) {
      this.options = this.dataList.filter(data => {
        if (!this.query || this.query.length === 0) return true;
        let f: any = fetchFromObject(data, this.searchProperty);
        if (f === undefined) return false;
        return JSON.stringify(f).indexOf(this.query) >= 0;
      });
    } else if (this.dataList instanceof Function) {
      if (this.dataListSub) this.dataListSub.unsubscribe();
      if (!this.CurrentCache) {
        this.cacheLazyData[this.query] = {
          countElement: 0,
          countPages: 1,
          currentPage: 1,
          objects: []
        };
        let tmp: CacheInfo = this.CurrentCache, params: {} = {};
        params[this.searchProperty] = this.query;
        this.dataListSub = (<Observable<IDataResponse>>this.dataList(params, 1)).subscribe(answer => {
          tmp.objects = tmp.objects.concat(answer.list);
          tmp.countElement = answer.headers['count'];
          tmp.countPages = Math.ceil(tmp.countElement / 20);
        }, () => { });
      }
    }
  }

  private updateOptionsInDelay(): void {
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

  private keyDown(event: KeyboardEvent): void {
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

  private nextPage($event: Event): void {
    $event.preventDefault();
    let tmp: CacheInfo = this.CurrentCache;

    // Validators
    if (!(this.dataList instanceof Function)) throw new Error('Data List mast be Function');
    if (!tmp) throw new Error('For next page need cache for first Page');
    if (tmp.currentPage >= tmp.countPages) throw new Error('Max Page Limit');

    if (this.dataListSub) this.dataListSub.unsubscribe();

    let params: {} = {};
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

  private selectOne($event: MouseEvent | KeyboardEvent, data: any): void {
    // Фильтр ненужных событий
    if ($event instanceof MouseEvent && $event.button !== 0) return;

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

  private removeOne(index: number): void {
    this.output.splice(index, 1);
    this.Model = this.ValueFromOutput;
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
      if (!('_model' in inputs)) setTimeout(() => this.Model = undefined, 10); // Костыль, надо бы исправить
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

  set Model(value: any) {
    if (this.onlyEmitter) {
      this.output = [];
      this._ngChange.emit(value);
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
    this._ngChange.emit(value);

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
        let params: {} = {};
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
      }
      return;
    } else {
      if (this.dataList === undefined) return;
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

  get CurrentCache(): CacheInfo {
    if (this.dataList instanceof Function) {
      return <CacheInfo>this.cacheLazyData[this.query];
    }
    return undefined;
  }

  // CACHE


  private cacheLazyData: Object = {};
}

interface CacheInfo {
  countElement: number;
  countPages: number;
  currentPage: number;
  objects: Array<any>;
}