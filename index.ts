import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


export * from './src/vibor.component';

import { ViborComponent } from './src/vibor.component';
import { ViborBothDirective, ViborDropdownDirective, ViborSelectedDirective } from './src/vibor.template.directive';

@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  declarations: [
    ViborComponent, ViborBothDirective, ViborDropdownDirective, ViborSelectedDirective
  ],
  exports: [
    ViborComponent, ViborBothDirective, ViborDropdownDirective, ViborSelectedDirective
  ]
})
export class ViborModule {}
