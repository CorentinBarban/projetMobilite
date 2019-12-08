import { Component, OnInit } from '@angular/core';
import {MenuController, IonSlides, LoadingController} from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

export interface Image {
    id: string;
    image: string;
}

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})

/**
 * Cette classe permet à un utilisateur qui n'a pas encore de compte de s'en créer un
 */

export class RegisterPage implements OnInit {
    validations_form: FormGroup;
    url: string= "/assets/images/add.png";
    errorMessage: string = '';
    successMessage: string = '';
    loading: any;
    newImage: Image = {
        id: this.afs.createId(), image: ''
    }
    validation_messages = {
        'email': [
            {type: 'required', message: 'Adresse email requise.'},
            {type: 'pattern', message: 'Merci d\'entrer une adresse valide.'}
        ],
        'password': [
            {type: 'required', message: 'Mot de passe requis.'},
            {type: 'minlength', message: 'Le mot de passe doit faire au moins 5 caractères.'}
        ]
    };
    constructor(
        public menu: MenuController,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private router: Router,
        private afs: AngularFirestore,
        public loadingCtrl: LoadingController,
        private storage: AngularFireStorage
    ) { }

    /**
     * S'assure que les informations présentes dans les champs respectent bien les patterns définis
     */
    ngOnInit() {
        this.validations_form = this.formBuilder.group({
            url:new FormControl('', Validators.compose([
                Validators.required
            ])),
            nom: new FormControl('', Validators.compose([
                Validators.required
            ])),
            prenom: new FormControl('', Validators.compose([
                Validators.required
            ])),
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            password: new FormControl('', Validators.compose([
                Validators.minLength(5),
                Validators.required
            ])),
        });
    }

    /**
     * Tentative de création de compte. Si le compte est créé, l'utilisateur est redirigé.
     * @param value
     */
    tryRegister(value) {
        this.authService.doRegister(value)
            .then(res => {
                this.errorMessage = '';
                this.successMessage = 'Le compte a bien été créé. Merci de vous connecter.';
            }, err => {
                console.log(err);
                this.errorMessage = err.message;
                this.successMessage = '';
            });
    }

    /**
     * Retour sur la page de connexion
     */
    goLoginPage() {
        this.router.navigate(['/login']);
    }

    /**
     * Instance de menu lors de la création de la page
     */
    ionViewWillEnter() {
        this.menu.enable(false);
    }

    /**
     * Gère l'upload de photo de profil et son affichage
     * @param event
     */
    async uploadImage(event) {
        this.loading = true;
        this.loading = await this.loadingCtrl.create({
            message: 'Patientez...'
        });
        await this.loading.present();
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();

            reader.readAsDataURL(event.target.files[0]);
            // For Preview Of Image
            reader.onload = (e: any) => {
                this.url = e.target.result;

                const fileraw = event.target.files[0];
                console.log(this.newImage.id);
                const filePath = '/Image/'+ this.newImage.id + '/'+ this.newImage.id;
                const result = this.SaveImageRef(filePath, fileraw);
                const ref = result.ref;
                result.task.then(a => {
                    ref.getDownloadURL().subscribe(a => {
                        this.loading.dismiss();
                        console.log(a);
                        this.validations_form.get('url').setValue(a);
                        this.newImage.image = a;
                    });
                    this.afs.collection('Image').doc(this.newImage.id).set(this.newImage);
                });
            }, error => {
                alert('Erreur');
            }
        }
    }

    /**
     * Gère la sauvegarde de la photo de profil
     * @param filePath
     * @param file
     * @constructor
     */
    SaveImageRef(filePath, file) {

        return {
            task: this.storage.upload(filePath, file)
            , ref: this.storage.ref(filePath)
        };
    }


}
