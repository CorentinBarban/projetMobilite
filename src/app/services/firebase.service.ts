import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})

/**
 * Cette classe sert de liaison avec Firebase concernant la gestion des données stockées
 */
export class FirebaseService {

    private snapshotChangesSubscription: any;

    constructor(
        public afs: AngularFirestore,
        public afAuth: AngularFireAuth,
    ) {
    }

    /***
     * Récupérer les informations de l'utilisateur connecté
     */
    getCurrentUserInformation() {
        return new Promise<any>((resolve, reject) => {
            this.afAuth.user.subscribe(currentUser => {
                if (currentUser) {
                    let starCountRef = firebase.database().ref('/users/' + currentUser.uid);
                    starCountRef.on('value', function(snapshot) {
                        resolve(snapshot.val());
                    });
                }
            });
        });
    }

    /**
     * Récupérer les informations d'un lieu taggué précis
     * @param idLieu
     */
    getPosition(idLieu) {
        return new Promise<any>((resolve, reject) => {
            this.afAuth.user.subscribe(currentUser => {
                if (currentUser) {
                    let starCountRef = firebase.database().ref('/lieux/' + idLieu);
                    starCountRef.on('value', function (snapshot) {
                        resolve(snapshot.val());
                    });
                }
            });

        });
    }

    /**
     * Récupérer la liste de tous les utilisateurs présents en base
     */
    getAllUsers() {
        return new Promise<any>((resolve, reject) => {
            this.afAuth.user.subscribe(currentUser => {
                if (currentUser) {
                    let starCountRef = firebase.database().ref('/users/');
                    starCountRef.on('value', function (snapshot) {
                        resolve(snapshot.val());
                    });
                }
            });
        });
    }

    /**
     * Récupérer les informations d'un utilisateur précis
     * @param userId
     */
    getUserInformation(userId) {
        return new Promise<any>((resolve, reject) => {
            let starCountRef = firebase.database().ref('/users/' + userId);
            starCountRef.on('value', function (snapshot) {
                resolve(snapshot.val());
            });
        });
    }

    /**
     * Désabonnement d'un utilisateur à la base de données lors de sa déconnexion
     */
    unsubscribeOnLogOut() {
        this.snapshotChangesSubscription.unsubscribe();
    }

    /**
     * Assigner un lieu taggué à un utilisateur
     * @param value : les informations du lieu à ajouter en base
     */
    createUserPosition(value) {
        return new Promise<any>((resolve, reject) => {
            let currentUser = firebase.auth().currentUser;
            let postData = {
                lat: value.lat,
                lgt: value.lgt,
                horodatage: value.date
            };
            let ref = firebase.database().ref("/users/"+ currentUser.uid);
            ref.child("lieux").push(postData);
            this.createLieu(value);
        })
    }

    /**
     * Ajout d'un lieu taggué à la liste générale des lieux
     * @param value
     */
    createLieu(value) {
        return new Promise<any>((resolve, reject) => {
            let currentUser = firebase.auth().currentUser;
            let postData = {
                lat: value.lat,
                lgt: value.lgt,
                'messages': {},
                horodatage: value.date,
                idUser: currentUser.uid
            };
            let ref = firebase.database().ref("/lieux/");
            let key = ref.push(postData);
            this.createMessage(value, key.key);
            this.addMessageToLieu(value, key.key);
        });
    }

    /**
     * Ajout d'un message créé à la liste générale des messages
     * @param value
     * @param uniqueID
     */
    createMessage(value, uniqueID) {
        return new Promise<any>((resolve, reject) => {
            let currentUser = firebase.auth().currentUser;
            let postData = {
                message: value.msg,
                idUser: currentUser.uid,
                idLieu: uniqueID
            };
            let ref = firebase.database().ref("/messages/");
            ref.push(postData);
        });
    }

    /**
     * Récupérer la liste de tous les évenements en base
     */
    getAllEvents() {
        return new Promise<any>((resolve, reject) => {
            this.afAuth.user.subscribe(currentUser => {
                if (currentUser) {
                    let starCountRef = firebase.database().ref('/evenements/');
                    starCountRef.on('value', function(snapshot) {
                        resolve(snapshot.val());
                    });
                }
            });
        });
    }

    /**
     * Ajouter un message à un lieu taggué
     * @param value : les informations du message
     * @param idLieu
     */
    addMessageToLieu(value, idLieu) {
        return new Promise<any>((resolve, reject) => {
            let currentUser = firebase.auth().currentUser;
            let postData = {
                message: value.msg
            };
            let ref = firebase.database().ref("/lieux/" + idLieu);
            ref.child('messages').push(postData.message);
        })
    }

    /**
     * Récupérer tous les lieux taggués par l'utilisateur connecté
     */
    getAllMarkerForCurrentUser(){
        return new Promise<any>((resolve, reject) => {
            this.afAuth.user.subscribe(currentUser => {
                if (currentUser) {
                    let starCountRef = firebase.database().ref('/users/' + currentUser.uid + "/lieux/");
                    starCountRef.on('value', function(snapshot) {
                        resolve(snapshot.val());
                    });
                }
            });
        });
    }

    /**
     * Récupérer la liste génrale des lieux taggués
     */
    getAllMarkers() {
        return new Promise<any>((resolve, reject) => {
            this.afAuth.user.subscribe(currentUser => {
                if (currentUser) {
                    let starCountRef = firebase.database().ref('/lieux/');
                    starCountRef.on('value', function (snapshot) {
                        resolve(snapshot.val());
                    });
                }
            });
        });
    }
}
