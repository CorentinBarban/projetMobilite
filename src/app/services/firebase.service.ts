import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    private snapshotChangesSubscription: any;

    constructor(
        public afs: AngularFirestore,
        public afAuth: AngularFireAuth,
    ) {
    }

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

    getUserInformation(userId) {
        return new Promise<any>((resolve, reject) => {
            let starCountRef = firebase.database().ref('/users/' + userId);
            starCountRef.on('value', function (snapshot) {
                resolve(snapshot.val());
            });
        });
    }

    unsubscribeOnLogOut() {
        this.snapshotChangesSubscription.unsubscribe();
    }

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
