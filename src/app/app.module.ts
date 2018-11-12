import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

//@angular/Fire & Firebase imports
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireStorageModule } from "@angular/fire/storage";
import * as firebase from 'firebase';

//Servicio Service Import
import { ServicioService } from "../servicio.service";

//Third Part Login Imports
import { GooglePlus } from "@ionic-native/google-plus";

//Statics third part Imports
import { IonicStepperModule } from 'ionic-stepper';

import { Items } from '../mocks/providers/items';
import { Settings, User, Api } from '../providers';
import { MyApp } from './app.component';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}
firebase.initializeApp({
  apiKey: "AIzaSyAwnufxibhSVmD2Zu5mI_9x0WoFmQ0KctY",
  authDomain: "firecodes-arrastrados.firebaseapp.com",
  databaseURL: "https://firecodes-arrastrados.firebaseio.com",
  projectId: "firecodes-arrastrados",
  storageBucket: "firecodes-arrastrados.appspot.com",
  messagingSenderId: "561640733546"

});

export const FirebaseConfig = {
  apiKey: "AIzaSyAwnufxibhSVmD2Zu5mI_9x0WoFmQ0KctY",
  authDomain: "firecodes-arrastrados.firebaseapp.com",
  databaseURL: "https://firecodes-arrastrados.firebaseio.com",
  projectId: "firecodes-arrastrados",
  storageBucket: "firecodes-arrastrados.appspot.com",
  messagingSenderId: "561640733546"

};

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicStepperModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),

    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Api,
    Items,
    User,
    GooglePlus,
    Camera,
    SplashScreen,
    StatusBar,
    ServicioService,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
