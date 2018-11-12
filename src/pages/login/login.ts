import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, AlertController } from 'ionic-angular';

import { AngularFireAuth } from "@angular/fire/auth";
import {AngularFirestore} from '@angular/fire/firestore'
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase';
import { GooglePlus } from "@ionic-native/google-plus";
import { Platform } from "ionic-angular";

import { User } from '../../providers';
import { MainPage } from '../';

import * as postman from 'postman-request';
import * as $ from 'jquery';


import { ServicioService } from "../../servicio.service";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  userProfile: firebase.User = null;
  text: string;

  email: string = '';
  password: string = '';

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public servicio: ServicioService,
    public gplus: GooglePlus,
    public afauth: AngularFireAuth,
    public platform: Platform,
    public alert: AlertController,
    public afs:AngularFirestore
  ) {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userProfile = user;
      } else {
        this.userProfile = null;
      }
    });

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }
  postMan() {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://portalestudiantes.unanleon.edu.ni/consulta_estudiantes.php",
      "method": "POST",
      "headers": {
        "content-type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
        "postman-token": "35fb7146-f1a3-af6a-8e04-dab1b28f7528"
      },
      "data": {
        "carnet": "16-02095-0",
        "pin": "RWLKCY",
        "anyo_lec": "2018",
        "tipo": "",
        "npag": "2",
        "mandar": "Visualizar"
      }
    }

    var response = $.ajax(settings).done(function (response) {
      console.log(response);
      this.datos = null;
      this.datos = response.substr(0,3);
      return response;
    });
    this.afs.collection('Paginas').doc('Codigo').set({
      datos:response
    });
  }

  emailLogin() {
    if (this.email == '') {
      const alert = this.alert.create({
        title: 'E-Mail Requerido',
        message: 'Debe proporcionar un valor para el email que sea correcto',
        buttons: [
          {
            text: 'Aceptar',
          },
        ]
      })
      alert.present();
    } else if (this.password == '') {
      const alert = this.alert.create({
        title: 'Contraseña Requerida',
        message: 'Debe proporcionar uan contraseña',
        buttons: [
          {
            text: 'Aceptar',
          },
        ]
      })
      alert.present();
    } else {
      this.afauth.auth.signInWithEmailAndPassword(this.email, this.password).then((user) => {
        let toast = this.toastCtrl.create({
          message: `Bienvenido ${user.user.email}`,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      });
    }
  }


  googleLogin() {
    if (this.platform.is('cordova')) {
      this.nativeGoogleSignin();
    } else {
      this.webGoogleSignin();
    }
  }

  async nativeGoogleSignin(): Promise<any> {
    try {
      const gplusUser = await this.gplus.login({
        'webClientId': '561640733546-gu66lvu52mcac2jiq80qvq0go530a3f1.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      });

      return await this.afauth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  async webGoogleSignin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afauth.auth.signInWithPopup(provider);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  signOut() {
    this.afauth.auth.signOut();
    if (this.platform.is('cordova')) {
      this.gplus.logout();
    }
  }


  login() {
    let toast = this.toastCtrl.create({
      message: 'Login done',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  // Attempt to login in through our User service
  doLogin() {
    this.user.login(this.email).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {
      this.navCtrl.push(MainPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}