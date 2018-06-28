import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgViborModule } from 'ng-vibor';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgViborModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }