import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public value1: undefined;
  public ValueList1 = [
    'Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 5'
  ];
}
