import { reject,resolve } from 'q';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';

import * as _ from 'lodash';

@Injectable()
export class ServicioService {
  constructor(
    public afAuth: AngularFireAuth,
  ) { }

  registerUser(email, pass) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData),
          err => reject(err));
    });
  }

  loginFacebook(){
      let provider = new firebase.auth.FacebookAuthProvider();
      return this.afAuth.auth.signInWithRedirect(provider).then((result)=>{
          alert(JSON.stringify(result));
      }).catch((error)=>{
          alert(JSON.stringify(error));
      });
  }

  loginEmail(email, pass) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData),
          err => reject(err));
    });
  }

  getAuth() {
    return this.afAuth.authState.map(user => user);
  }

  logout() {
    
  }

  verificaUsuario() {
    var user = this.afAuth.auth.currentUser;

    user.sendEmailVerification().then(function () {
      //email sent
      console.log('Mensaje de Confirmacion Enviado');
    }).catch(function (error) {
      console.log(error);
    })
  }
  emailVerified() {

  }
}