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

    tryLogin(value) {
        this.authService.doLogin(value)
            .then(res => {
                this.router.navigate(['/home']);
            }, err => {
                this.errorMessage = err.message;
                console.log(err);
            });
    }

    goRegisterPage() {
        this.router.navigate(['/register']);
    }

    ionViewWillEnter() {
        this.menu.enable(false);
    }
}
