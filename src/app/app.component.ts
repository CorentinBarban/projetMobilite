import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import {FirebaseService} from "./services/firebase.service";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    public appPages = [];

    public appPagesModerateur = [
        {
            title: 'Accueil',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'Interface modérateur',
            url: '/vue-moderateur/liste-lieux',
            icon: 'lock'
        }
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private router: Router,
        public afAuth: AngularFireAuth,
        public firebaseService: FirebaseService,
    ) {
        this.initializeApp();
    }

    initializeApp() {

        this.platform.ready().then(() => {
            this.afAuth.user.subscribe(user => {
                if ( user ) {
                    let that = this;
                    this.firebaseService.getUserInformation(user.uid).then(function (infos) {
                        for (let key of Object.keys(infos)) {
                            if (infos.type == 'moderator') {
                                console.log('Salut modo');
                                that.appPages = [
                                    {
                                        title: 'Accueil',
                                        url: '/home',
                                        icon: 'home'
                                    },
                                    {
                                        title: 'Interface modérateur',
                                        url: '/vue-moderateur/liste-lieux',
                                        icon: 'lock'
                                    }];
                            } else {
                                console.log('noob');
                                that.appPages = [
                                    {
                                        title: 'Accueil',
                                        url: '/home',
                                        icon: 'home'
                                    }];
                            }
                        }
                    });
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
