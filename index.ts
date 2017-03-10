import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViborComponent } from './src/vibor.component';

export * from './src/vibor.component';
@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  declarations: [
    ViborComponent
  ],
  exports: [
    ViborComponent
  ]
})
export class ViborModule {}
