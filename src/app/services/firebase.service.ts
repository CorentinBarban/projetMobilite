import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import {AngularFireAuth} from '@angular/fire/auth';
import {objectKeys} from "codelyzer/util/objectKeys";

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    private snapshotChangesSubscription: any;
    private countLieu = 1;

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

    getUserPositions(user) { //FAUSSE
        return new Promise<any>((resolve, reject) => {
            this.afAuth.user.subscribe(currentUser => {
                if (currentUser) {
                    let starCountRef = firebase.database().ref('/users/' + user.uid + '/lieux/');
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
        //remember to unsubscribe from the snapshotChanges
        this.snapshotChangesSubscription.unsubscribe();
    }

    // updateTask(taskKey, value) {
    //     return new Promise<any>((resolve, reject) => {
    //         let currentUser = firebase.auth().currentUser;
    //         this.afs.collection('people').doc(currentUser.uid).collection('tasks').doc(taskKey).set(value)
    //             .then(
    //                 res => resolve(res),
    //                 err => reject(err)
    //             )
    //     })
    // }

    createUserPosition(value) {
        return new Promise<any>((resolve, reject) => {
            let currentUser = firebase.auth().currentUser;
            let postData = {
                idLieu: this.countLieu,
                lat: value.lat,
                lgt: value.lgt,
                horodatage : value.date,
                message: value.msg
            };
            let ref = firebase.database().ref("/users/"+ currentUser.uid);
            ref.child("lieux").push(postData);
            this.createLieu(value);
            this.countLieu++;
        })
    }

    createLieu(value) {
        return new Promise<any>((resolve, reject) => {
            let currentUser = firebase.auth().currentUser;
            let postData = {
                lat: value.lat,
                lgt: value.lgt,
                horodatage: value.date,
                message: value.msg,
                idUser: currentUser.email
            };
            let ref = firebase.database().ref("/lieux/");
            let key = ref.push(postData);
            this.createMessage(value, key.key);
        })
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

    // encodeImageUri(imageUri, callback) {
    //     var c = document.createElement('canvas');
    //     var ctx = c.getContext('2d');
    //     var img = new Image();
    //     img.onload = function () {
    //         var aux: any = this;
    //         c.width = aux.width;
    //         c.height = aux.height;
    //         ctx.drawImage(img, 0, 0);
    //         var dataURL = c.toDataURL('image/jpeg');
    //         callback(dataURL);
    //     };
    //     img.src = imageUri;
    // };
    //
    // uploadImage(imageURI, randomId) {
    //     return new Promise<any>((resolve, reject) => {
    //         let storageRef = firebase.storage().ref();
    //         let imageRef = storageRef.child('image').child(randomId);
    //         this.encodeImageUri(imageURI, function (image64) {
    //             imageRef.putString(image64, 'data_url')
    //                 .then(snapshot => {
    //                     snapshot.ref.getDownloadURL()
    //                         .then(res => resolve(res))
    //                 }, err => {
    //                     reject(err);
    //                 })
    //         })
    //     })
    // }
}
