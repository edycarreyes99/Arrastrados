import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { NotasPage } from './list-master';

@NgModule({
  declarations: [
    NotasPage,
  ],
  imports: [
    IonicPageModule.forChild(NotasPage),
    TranslateModule.forChild()
  ],
  exports: [
    NotasPage
  ]
})
export class NotasPageModule { }
