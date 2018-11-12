import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicStepperModule } from 'ionic-stepper';



import { SignupPage } from './signup';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
    TranslateModule.forChild(),
    IonicStepperModule
  ],
  exports: [
    SignupPage
  ]
})
export class SignupPageModule { }
