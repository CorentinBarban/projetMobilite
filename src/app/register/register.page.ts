import { Component, OnInit } from '@angular/core';
import { MenuController, IonSlides } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

export interface Image {
    id: string;
    image: string;
}

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
    validations_form: FormGroup;
    url: string= "/assets/images/add.png";
    errorMessage: string = '';
    successMessage: string = '';
    newImage: Image = {
        id: this.afs.createId(), image: ''
    }
    loading: boolean = false;
    validation_messages = {
        'email': [
            {type: 'required', message: 'Adresse email requise.'},
            {type: 'pattern', message: 'Merci d\'entrer une adresse valide.'}
        ],
        'password': [
            {type: 'required', message: 'Mot de passe requis.'},
            {type: 'minlength', message: 'Le mot de passe doit faire au moins 5 caractères.'}
        ]
    };
    constructor(
        public menu: MenuController,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private router: Router,
        private afs: AngularFirestore,
        private storage: AngularFireStorage
    ) { }

    ngOnInit() {
        this.validations_form = this.formBuilder.group({
            url:new FormControl('', Validators.compose([
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

    tryRegister(value) {
        console.log('tryregister :' + value);
        this.authService.doRegister(value)
            .then(res => {
                // console.log(res);
                this.errorMessage = '';
                this.successMessage = 'Your account has been created. Please log in.';

            }, err => {
                // console.log(err);
                this.errorMessage = err.message;
                this.successMessage = '';
            });
    }

    goLoginPage() {
        this.router.navigate(['/login']);
    }

    ionViewWillEnter() {
        this.menu.enable(false);
    }

    uploadImage(event) {
        this.loading = true;
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();

            reader.readAsDataURL(event.target.files[0]);
            // For Preview Of Image
            reader.onload = (e:any) => { // called once readAsDataURL is completed
                this.url = e.target.result;

                // For Uploading Image To Firebase
                const fileraw = event.target.files[0];
                console.log(this.newImage.id);
                const filePath = '/Image/'+ this.newImage.id + '/'+ this.newImage.id;
                const result = this.SaveImageRef(filePath, fileraw);
                const ref = result.ref;
                result.task.then(a => {
                    ref.getDownloadURL().subscribe(a => {
                        console.log(a);
                        this.validations_form.get('url').setValue(a);
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


}
