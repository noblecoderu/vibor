import { Component } from '@angular/core';
import { of as observableOf, Subject, Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

interface IViborData {
  list: Array<any>;
  headers: { count: number };
}
const countOnPage = 10;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private AsyncValues = [];
  constructor() {
    for (let i = 1; i <= 20; i++) {
      this.AsyncValues.push({ id: i, Name: `value ${i}`, desc: `Value ${i} desc` });
    }
  }

  public value1: undefined;
  public value2: undefined;
  public value3 = [1];

  public ValueList1 = [
    'Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 5'
  ];

  public ValueList2 = (params: Object, page: number): Observable<IViborData> => {
    return Observable.create(obs => {
      const list = this.AsyncValues.filter(value => params['ids'].includes(value.id)).slice((page - 1) * countOnPage, page * countOnPage);
      const t = { list, headers: { count: this.AsyncValues.length } };
      setTimeout(() => {
        obs.next(t);
        obs.complete();
      }, 1000);
    });
  }
}
