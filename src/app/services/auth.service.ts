import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/database';
import {FirebaseService} from './firebase.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {promise} from 'selenium-webdriver';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private firebaseService: FirebaseService,
        public afAuth: AngularFireAuth
    ) {
    }

    doRegister(value) {
        var that = this;
        return new Promise<any>((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
                .then(function(user) {
                    that.updateInformation(value);
                });
        });
    }

    updateInformation(value){
        let postData = {
            prenom: value.prenom,
            nom: value.nom,
            email: value.email,
            url: value.url,
            type: 'user'
        };
        this.afAuth.user.subscribe(currentUser=>{
            let updates = {};
            updates['/users/' + currentUser.uid] = postData;
            firebase.database().ref().update(updates);
        });
    }

    doLogin(value) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(value.email, value.password)
                .then(
                    res => resolve(res),
                    err => reject(err));
        });
    }

    doLogout() {
        return new Promise((resolve, reject) => {
            this.afAuth.auth.signOut()
                .catch(error => {
                    console.log(error);
                    reject();
                });
        });
    }

}
