import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { NgViborComponent } from './ng-vibor.component';
import { ViborBothDirective, ViborCreateDirective, ViborDropdownDirective, ViborSelectedDirective } from './ng-vibor-template.directive';

@NgModule({
  imports: [
    FormsModule, BrowserModule
  ],
  declarations: [
    NgViborComponent,
    ViborBothDirective, ViborCreateDirective, ViborDropdownDirective, ViborSelectedDirective
  ],
  exports: [
    NgViborComponent, FormsModule
  ]
})
export class NgViborModule { }
