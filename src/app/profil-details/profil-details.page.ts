import {Component, OnInit} from '@angular/core';
import {MenuController} from '@ionic/angular';
import {AuthService} from '../services/auth.service';
import {FirebaseService} from '../services/firebase.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-profil-details',
    templateUrl: './profil-details.page.html',
    styleUrls: ['./profil-details.page.scss'],
})
export class ProfilDetailsPage implements OnInit {

    validationsForm: FormGroup;

    constructor(
        private menu: MenuController,
        private location: Location,
        private authService: AuthService,
        private fireService: FirebaseService,
        private router: Router,
        private formBuilder: FormBuilder,
    ) {
    }

    ngOnInit() {
        this.initField();
        this.validationsForm = this.formBuilder.group({
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

    ionViewWillEnter() {
        this.menu.enable(true);
    }

    goBack() {
        this.location.back();
    }

    logOut() {
        this.authService.doLogout().then(function () {
            this.router.navigate(['/login']);
        });
    }


    initField() {
        let that = this;
        this.fireService.getUserInformation().then(function(value) {
            that.validationsForm.get('nom').setValue(value.nom);
            that.validationsForm.get('prenom').setValue(value.prenom);
            that.validationsForm.get('email').setValue(value.email);
        });

    }


}
