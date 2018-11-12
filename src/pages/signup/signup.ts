import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, ActionSheetController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { User } from '../../providers';
import { MainPage } from '../';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  @ViewChild('fileInput') fileInput;
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  nombres: string = '';
  apellidos: string = '';
  email: string = '';
  password: string = '';
  form: FormGroup;
  isReadyToSave: boolean;

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public formBuilder: FormBuilder,
    public camera: Camera,
    public actionSheetCtrl: ActionSheetController
  ) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })

    this.form = formBuilder.group({
      profilePic: ['']
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  selectChange() {
    console.log('Pagina Cambiada');
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  getPicture() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Seleccione una Opción',
      buttons: [
        {
          text: 'Tomar Foto',
          role: 'tomarFoto',
          handler: () => {
            if (Camera['installed']()) {
              this.camera.getPicture({
                destinationType: this.camera.DestinationType.DATA_URL,
                targetWidth: 256,
                targetHeight: 256
              }).then((imagen) => {
                this.form.patchValue({ 'profilePic': `data:perfil_${this.email}/jpg;base64,` + imagen });
              }, (err) => {
                alert('No se pudo tomar la foto: ' + err);
              })
            } else {
              alert('Camara no detectada');
            }
          }
        },
        {
          text: 'Elegir de Mis Documentos',
          role: 'elegirFromDocumentos',
          handler: () => {
            this.fileInput.nativeElement.click();
          }
        }
      ]
    });
    actionSheet.present();
  }

  doSignup() {
    // Attempt to login in through our User service
    this.user.signup(this.email).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {

      this.navCtrl.push(MainPage);

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
