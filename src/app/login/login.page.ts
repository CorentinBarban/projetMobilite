import { Component, NgModule, OnInit} from '@angular/core';
import { MenuController, IonSlides } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})

/**
 * Cette classe gère la connexion d'un utilisateur disposant déja d'un compte à l'application
 */

export class LoginPage implements OnInit {
    validations_form: FormGroup;
    errorMessage: string = '';

    validation_messages = {
        'email': [
            {type: 'required', message: 'Adresse email requise'},
            {type: 'pattern', message: 'Une adresse email valide est requise.'}
        ],
        'password': [
            {type: 'required', message: 'Mot de passe requis'},
            {type: 'minlength', message: 'Le mot de passe doit faire au moins 5 caractères.'}
        ]
    };
    constructor(
        public menu: MenuController,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private router: Router
    ) { }

    /**
     * Instaure le menu dès la création de la page
     */

    ionViewWillEnter() {
        this.menu.enable(false);
    }

    /**
     * Vérifie si les informations entrées dans le formulaire respectent bien les patterns définis.
     */

    ngOnInit() {
        this.validations_form = this.formBuilder.group({
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            password: new FormControl('', Validators.compose([
                Validators.minLength(5),
                Validators.required
            ]))
        });
    }

    /**
     * Tentative de connexion de l'utilisateur, avec soit redirection soit affichage du message d'erreur selon l'issue
     * @param value
     */
    tryLogin(value) {
        this.authService.doLogin(value)
            .then(res => {
                this.router.navigate(['/home']);
            }, err => {
                this.errorMessage = err.message;
            });
    }

    /**
     * Redirige vers la page de création de compte
     */
    goRegisterPage() {
        this.router.navigate(['/register']);
    }
}
