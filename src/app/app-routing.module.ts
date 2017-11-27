import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'

import { GenderComponent } from './gender/gender.component'
import { ProductComponent } from './product/product.component'
import { DateTimeComponent } from './date-time/date-time.component'

const routes: Routes = [
  { path: '', redirectTo: '/gender', pathMatch: 'full' },
  { path: 'gender', component: GenderComponent },
  { path: 'product', component: ProductComponent },
  { path: 'date-time', component: DateTimeComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
