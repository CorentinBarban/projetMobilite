import {Component, OnInit} from '@angular/core';
import {MenuController} from '@ionic/angular';
import {AuthService} from '../services/auth.service';
import {FirebaseService} from '../services/firebase.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFireAuth} from "@angular/fire/auth";

export interface Image {
    id: string;
    image: string;
}

@Component({
    selector: 'app-profil-details',
    templateUrl: './profil-details.page.html',
    styleUrls: ['./profil-details.page.scss'],
})
export class ProfilDetailsPage implements OnInit {
    idPersonne;
    nom;
    prenom;
    email;
    url;
    validationsForm: FormGroup;
    loading: boolean = false;

    constructor(
        private menu: MenuController,
        private location: Location,
        private authService: AuthService,
        private fireService: FirebaseService,
        private router: Router,
        private formBuilder: FormBuilder,
        private afs: AngularFirestore,
        private storage: AngularFireStorage,
        private activatedRoute: ActivatedRoute,
        public afAuth: AngularFireAuth
    ) {
        this.activatedRoute.params.subscribe((res) => {
            this.idPersonne = res['id'];
        });
    }

    ngOnInit() {
        this.initField();
    }

    ionViewWillEnter() {
        this.menu.enable(true);
    }

    goBack() {
        this.location.back();
    }

    logOut() {
        let that = this;
        presentToast();
        this.authService.doLogout().then(function () {
            that.router.navigate(['/login']);
        });

        async function presentToast() {
            const toast = document.createElement('ion-toast');
            toast.message = 'Déconnecté';
            toast.duration = 1000;

            document.body.appendChild(toast);
            return toast.present();
        }
    }

    initField() {
        let that = this;
        this.fireService.getUserInformation(this.idPersonne).then(function (value) {
            that.nom = value.nom;
            that.prenom = value.prenom;
            that.email = value.email;
            that.url = value.url;
        });
    }

    editer() {
        return new Promise<any>((resolve, reject) => {
            this.afAuth.user.subscribe(currentUser => {
                if (currentUser) {
                    this.router.navigate(['/profil-details-editer', currentUser.uid]);
                }
            });
        });
    }
}
