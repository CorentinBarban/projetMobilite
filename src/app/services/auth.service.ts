import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/database';
import {FirebaseService} from './firebase.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {promise} from 'selenium-webdriver';

@Injectable({
    providedIn: 'root'
})

/**
 * Cette classe gère toutes les liaisons avec Firebase concernant le service d'authentification des utilisateurs
 */
export class AuthService {

    constructor(
        private firebaseService: FirebaseService,
        public afAuth: AngularFireAuth
    ) {
    }

    /**
     * Création de compte à partir d'un email et d'un mdp
     * @param value : les informations transmises
     */
    doRegister(value) {
        var that = this;
        return new Promise<any>((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
                .then(function(user) {
                    that.createUser(value);
                });
        });
    }

    /**
     * Stockage de l'utilisateur créé comme noeud en base Firebase
     * @param value
     */
    createUser(value) {
        let postData = {
            prenom: value.prenom,
            nom: value.nom,
            email: value.email,
            url: value.url,
            type: 'user'
        };
        this.afAuth.user.subscribe(currentUser => {
            let updates = {};
            updates['/users/' + currentUser.uid] = postData;
            firebase.database().ref().update(updates);
        });
    }

    /**
     * Mise à jour des informations de l'utilisateur en base Firebase
     * @param value
     */
    updateInformation(value) {
        let postData = {
            prenom: value.prenom,
            nom: value.nom,
            email: value.email,
            url: value.url,
        };
        this.afAuth.user.subscribe(currentUser=>{
            firebase.database().ref('/users/' + currentUser.uid).update({
                prenom: value.prenom, nom: value.nom, email: value.email,
                url: value.url,
            });
        });
    }

    /**
     * Connexion de l'utilisateur à l'application
     * @param value
     */
    doLogin(value) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(value.email, value.password)
                .then(
                    res => resolve(res),
                    err => reject(err));
        });
    }

    /**
     * Déconnexion de l'utilisateur de l'application
     */
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
