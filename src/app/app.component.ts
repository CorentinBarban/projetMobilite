import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    public appPages = [
        {
            title: 'Accueil',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'Liste des lieux visités',
            url: '/carte-visites',
            icon: 'compass'
        },
        {
            title: 'Liste des messages',
            url: '/liste-messages',
            icon: 'mail'
        },
        {
            title: 'Interface modérateur',
            url: '/vue-moderateur',
            icon: 'lock'
        }
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private router: Router,
        public afAuth: AngularFireAuth
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {

            this.afAuth.user.subscribe(user => {
                if ( user ) {
                    this.router.navigate(['/home']);
                } else {
                    this.router.navigate(['/login']);
                }
            }, err => {
                this.router.navigate(['/login']);
            }, () => {
                this.splashScreen.hide();
            })
            this.statusBar.styleDefault();
        });
    }
}
