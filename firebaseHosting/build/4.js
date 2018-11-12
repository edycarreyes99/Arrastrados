webpackJsonp([4],{

/***/ 772:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupPageModule", function() { return SignupPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_stepper__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_stepper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ionic_stepper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__signup__ = __webpack_require__(786);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var SignupPageModule = /** @class */ (function () {
    function SignupPageModule() {
    }
    SignupPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__signup__["a" /* SignupPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_4__signup__["a" /* SignupPage */]),
                __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["b" /* TranslateModule */].forChild(),
                __WEBPACK_IMPORTED_MODULE_3_ionic_stepper__["IonicStepperModule"]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_4__signup__["a" /* SignupPage */]
            ]
        })
    ], SignupPageModule);
    return SignupPageModule;
}());

//# sourceMappingURL=signup.module.js.map

/***/ }),

/***/ 786:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6____ = __webpack_require__(405);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SignupPage = /** @class */ (function () {
    function SignupPage(navCtrl, user, toastCtrl, translateService, formBuilder, camera, actionSheetCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.user = user;
        this.toastCtrl = toastCtrl;
        this.translateService = translateService;
        this.formBuilder = formBuilder;
        this.camera = camera;
        this.actionSheetCtrl = actionSheetCtrl;
        // The account fields for the login form.
        // If you're using the username field with or without email, make
        // sure to add it to the type
        this.nombres = '';
        this.apellidos = '';
        this.email = '';
        this.password = '';
        this.translateService.get('SIGNUP_ERROR').subscribe(function (value) {
            _this.signupErrorString = value;
        });
        this.form = formBuilder.group({
            profilePic: ['']
        });
        // Watch the form for changes, and
        this.form.valueChanges.subscribe(function (v) {
            _this.isReadyToSave = _this.form.valid;
        });
    }
    SignupPage.prototype.selectChange = function () {
        console.log('Pagina Cambiada');
    };
    SignupPage.prototype.processWebImage = function (event) {
        var _this = this;
        var reader = new FileReader();
        reader.onload = function (readerEvent) {
            var imageData = readerEvent.target.result;
            _this.form.patchValue({ 'profilePic': imageData });
        };
        reader.readAsDataURL(event.target.files[0]);
    };
    SignupPage.prototype.getProfileImageStyle = function () {
        return 'url(' + this.form.controls['profilePic'].value + ')';
    };
    SignupPage.prototype.getPicture = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Seleccione una Opción',
            buttons: [
                {
                    text: 'Tomar Foto',
                    role: 'tomarFoto',
                    handler: function () {
                        if (__WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */]['installed']()) {
                            _this.camera.getPicture({
                                destinationType: _this.camera.DestinationType.DATA_URL,
                                targetWidth: 256,
                                targetHeight: 256
                            }).then(function (imagen) {
                                _this.form.patchValue({ 'profilePic': "data:perfil_" + _this.email + "/jpg;base64," + imagen });
                            }, function (err) {
                                alert('No se pudo tomar la foto: ' + err);
                            });
                        }
                        else {
                            alert('Camara no detectada');
                        }
                    }
                },
                {
                    text: 'Elegir de Mis Documentos',
                    role: 'elegirFromDocumentos',
                    handler: function () {
                        _this.fileInput.nativeElement.click();
                    }
                }
            ]
        });
        actionSheet.present();
    };
    SignupPage.prototype.doSignup = function () {
        var _this = this;
        // Attempt to login in through our User service
        this.user.signup(this.email).subscribe(function (resp) {
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6____["b" /* MainPage */]);
        }, function (err) {
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6____["b" /* MainPage */]);
            // Unable to sign up
            var toast = _this.toastCtrl.create({
                message: _this.signupErrorString,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('fileInput'),
        __metadata("design:type", Object)
    ], SignupPage.prototype, "fileInput", void 0);
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-signup',template:/*ion-inline-start:"K:\Proyectos Web\Arrastrados\src\pages\signup\signup.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{ \'SIGNUP_TITLE\' | translate }}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-stepper #stepper (selectIndexChange)="selectChange($event)">\n    <ion-step label="Información sobre la Cuenta" description="Email, Contraseña, Etc.">\n      <ion-card>\n\n        <img style="height: 200px; margin: auto; width: 200px;" src="../../assets/img/LogotipoConCirculo.png">\n\n        <ion-card-content>\n          <form>\n            <ion-list>\n\n              <ion-item>\n                <ion-label floating>Ingrese su nuevo E-Mail</ion-label>\n                <ion-input type="email" [(ngModel)]="email" name="email"></ion-input>\n              </ion-item>\n\n              <ion-item>\n                <ion-label floating>Ingrese su nueva Contraseña</ion-label>\n                <ion-input type="password" [(ngModel)]="password" name="password"></ion-input>\n              </ion-item>\n            </ion-list>\n          </form>\n        </ion-card-content>\n      </ion-card>\n      <button ion-button small ionicStepperNext>Siguiente</button>\n    </ion-step>\n    <ion-step label="Informacion Personal" description="Nombres, Apellidos, Etc.">\n      <form>\n        <ion-list>\n\n          <ion-item>\n            <ion-label floating>Ingrese sus Nombres</ion-label>\n            <ion-input type="text" [(ngModel)]="nombres" name="nombres"></ion-input>\n          </ion-item>\n\n          <ion-item>\n            <ion-label floating>Ingrese sus Apellidos</ion-label>\n            <ion-input type="text" [(ngModel)]="apellidos" name="apellidos"></ion-input>\n          </ion-item>\n        </ion-list>\n      </form>\n      <button ion-button color="light" small ionicStepperPrevious>Anterior</button>\n      <button ion-button small ionicStepperNext>Siguiente</button>\n    </ion-step>\n    <ion-step label="Estilo de la cuenta" description="Imagen de Perfil">\n      <form *ngIf="form" [formGroup]="form" (ngSubmit)="createItem()">\n        <input type="file" #fileInput style="visibility: hidden; height: 0px" name="files[]" (change)="processWebImage($event)" />\n        <div class="profile-image-wrapper" (click)="getPicture()">\n          <div class="profile-image-placeholder" *ngIf="!this.form.controls.profilePic.value">\n            <ion-icon name="add"></ion-icon>\n            <div>\n              {{ \'ITEM_CREATE_CHOOSE_IMAGE\' | translate }}\n            </div>\n          </div>\n          <div class="profile-image" [style.backgroundImage]="getProfileImageStyle()" *ngIf="this.form.controls.profilePic.value"></div>\n        </div>\n      </form>\n      <button ion-button color="light" small ionicStepperPrevious>Anterior</button>\n    </ion-step>\n  </ion-stepper>\n</ion-content>'/*ion-inline-end:"K:\Proyectos Web\Arrastrados\src\pages\signup\signup.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_5__providers__["d" /* User */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["ToastController"],
            __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["ActionSheetController"]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ })

});
//# sourceMappingURL=4.js.map