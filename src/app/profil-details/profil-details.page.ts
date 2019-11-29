import {Component, OnInit} from '@angular/core';
import {MenuController} from '@ionic/angular';
import {AuthService} from '../services/auth.service';
import {FirebaseService} from '../services/firebase.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';

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

    validationsForm: FormGroup;
    urlImage: String="/assets/images/post-malone.jpg";
    newImage: Image = {
        id: this.afs.createId(), image: ''
    }
    loading: boolean = false;

    constructor(
        private menu: MenuController,
        private location: Location,
        private authService: AuthService,
        private fireService: FirebaseService,
        private router: Router,
        private formBuilder: FormBuilder,
        private afs: AngularFirestore,
        private storage: AngularFireStorage
    ) {
    }

    ngOnInit() {
        this.initField();
        this.validationsForm = this.formBuilder.group({
            url: new FormControl('', Validators.compose([
                Validators.required
            ])),
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
        presentToast();
        this.authService.doLogout().then(function () {

            this.router.navigate(['/login']);
        });

        async function presentToast() {
            const toast = document.createElement('ion-toast');
            toast.message = 'Déconnecté';
            toast.duration = 1000;

            document.body.appendChild(toast);
            return toast.present();
        }
    }

    uploadImage(event) {
        this.loading = true;
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();

            reader.readAsDataURL(event.target.files[0]);
            // For Preview Of Image
            reader.onload = (e:any) => { // called once readAsDataURL is completed
                this.urlImage = e.target.result;

                // For Uploading Image To Firebase
                const fileraw = event.target.files[0];
                console.log(this.newImage.id);
                const filePath = '/Image/'+ this.newImage.id + '/'+ this.newImage.id;
                const result = this.SaveImageRef(filePath, fileraw);
                const ref = result.ref;
                result.task.then(a => {
                    ref.getDownloadURL().subscribe(a => {
                        console.log(a);
                        this.validationsForm.get('url').setValue(a);
                        this.newImage.image = a;
                        this.loading = false;
                    });

                    this.afs.collection('Image').doc(this.newImage.id).set(this.newImage);
                });
            }, error => {
                alert("Error");
            }

        }
    }

    SaveImageRef(filePath, file) {

        return {
            task: this.storage.upload(filePath, file)
            , ref: this.storage.ref(filePath)
        };
    }

    initField() {
        let that = this;
        this.fireService.getUserInformation().then(function(value) {
            that.validationsForm.get('nom').setValue(value.nom);
            that.validationsForm.get('prenom').setValue(value.prenom);
            that.validationsForm.get('email').setValue(value.email);
            that.urlImage = value.url;
            that.validationsForm.get('url').setValue(value.url);
        });

    }

    updateInformation(value) {
        presentToast();
        this.authService.updateInformation(value);
        this.goBack();

        async function presentToast() {
            const toast = document.createElement('ion-toast');
            toast.message = 'Mis à jour';
            toast.duration = 1000;

            document.body.appendChild(toast);
            return toast.present();
        }
    }


}
