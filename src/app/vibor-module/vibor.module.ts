import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViborComponent } from './vibor/vibor.component';

@NgModule({
  imports: [ CommonModule, FormsModule ],
  declarations: [ ViborComponent ],
  exports: [ ViborComponent ]
})
export class ViborModule {
  public static forRoot(): ModuleWithProviders {
        return {
            ngModule: ViborModule,
            providers: [ ]
        };
    }
}
