import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataPickerComponent } from './data-picker/data-picker.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DataPickerComponent],
  exports: [DataPickerComponent]
})
export class DataPickerModule { }
