import { Component, OnInit } from '@angular/core';
import { MenuController, IonSlides } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
    validations_form: FormGroup;
    errorMessage: string = '';
    successMessage: string = '';
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
        private router: Router
    ) { }

    ngOnInit() {
        this.validations_form = this.formBuilder.group({
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

    tryRegister(value) {
        this.authService.doRegister(value)
            .then(res => {
                // console.log(res);
                this.errorMessage = '';
                this.successMessage = 'Your account has been created. Please log in.';
            }, err => {
                // console.log(err);
                this.errorMessage = err.message;
                this.successMessage = '';
            });
    }

    goLoginPage() {
        this.router.navigate(['/login']);
    }

    ionViewWillEnter() {
        this.menu.enable(false);
    }


}
