import {Component, OnInit} from '@angular/core';
import {LoadingController, MenuController} from '@ionic/angular';
import {AuthService} from '../services/auth.service';
import {FirebaseService} from '../services/firebase.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';

export interface Image {
    id: string;
    image: string;
}

@Component({
    selector: 'app-profil-details',
    templateUrl: './profil-details-edit.page.html',
    styleUrls: ['./profil-details-edit.page.scss'],
})

/**
 * Cette classe permet à l'utilisateur de modifier les informations de son compte
 */
export class ProfilDetailsEditPage implements OnInit {
    idPersonne;
    validationsForm: FormGroup;
    urlImage: String = "/assets/images/add.png";
    newImage: Image = {
        id: this.afs.createId(), image: ''
    };
    loading: any;
    modeEdit: boolean = false;

    constructor(
        private menu: MenuController,
        private location: Location,
        private authService: AuthService,
        private fireService: FirebaseService,
        private router: Router,
        private formBuilder: FormBuilder,
        private afs: AngularFirestore,
        private storage: AngularFireStorage,
        public loadingCtrl: LoadingController,
        private activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.params.subscribe((res) => {
            this.idPersonne = res['id'];
        });
    }

    /**
     * Lance la récupération + affichage des informations en base, et vérifie que le contenu des champs respecte les patterns définis
     */
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
            ]))
        });
    }

    /**
     * Instance du menu lors de la création de la page
     */
    ionViewWillEnter() {
        this.menu.enable(true);
    }

    /**
     * Retour arrière
     */
    goBack() {
        this.location.back();
    }

    /**
     * Gère l'upload de la nouvelle photo de profil de l'utilisateur et son affichage
     * @param event le clic sur l'image
     */
    async uploadImage(event) {
        this.loading = true;
        this.loading = await this.loadingCtrl.create({
            message: 'Patientez...'
        });
        await this.loading.present();
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();

            reader.readAsDataURL(event.target.files[0]);
            reader.onload = (e: any) => {
                const fileraw = event.target.files[0];
                const filePath = '/Image/' + this.newImage.id + '/' + this.newImage.id;
                const result = this.SaveImageRef(filePath, fileraw);
                const ref = result.ref;
                result.task.then(a => {
                    ref.getDownloadURL().subscribe(a => {
                        this.loading.dismiss();
                        this.validationsForm.get('url').setValue(a);
                        this.urlImage = a;
                        this.newImage.image = a;
                        this.loading = false;
                    });
                    this.afs.collection('Image').doc(this.newImage.id).set(this.newImage);
                });
            }, error => {
                alert('Erreur');
            }
        }
    }

    /**
     * Gère la sauvegarde de la nouvelle photo de profil de l'utilisateur
     * @param filePath le chemin de l'image en base
     * @param file l'image
     * @constructor
     */
    SaveImageRef(filePath, file) {
        return {
            task: this.storage.upload(filePath, file)
            , ref: this.storage.ref(filePath)
        };
    }

    /**
     * Récupération + affichage des différentes informations de l'utilisateur
     */
    initField() {
        let that = this;
        this.fireService.getCurrentUserInformation().then(function (value) {
            that.validationsForm.get('nom').setValue(value.nom);
            that.validationsForm.get('prenom').setValue(value.prenom);
            that.validationsForm.get('email').setValue(value.email);
            that.validationsForm.get('url').setValue(value.url);
            that.urlImage = value.url;
        });
    }

    /**
     * Sauvegarde des nouvelles informations de l'utilisateur en base
     * @param value
     */
    updateInformation(value) {
        this.authService.updateInformation(value);
        presentToast();
        this.initField();
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
