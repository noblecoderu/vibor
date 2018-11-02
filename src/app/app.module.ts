import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgViborModule } from 'vibor';

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
