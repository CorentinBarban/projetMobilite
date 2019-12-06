import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {FirebaseService} from "../services/firebase.service";
import {AngularFireAuth} from "@angular/fire/auth";

@Component({
    selector: 'app-list',
    templateUrl: 'liste-personnes.page.html',
    styleUrls: ['liste-personnes.page.scss']
})

/**
 * Classe servant de fragment contient la liste des personnes ayant taggué des lieux, afin de les afficher dans les onglets de la vue modérateur.
 */

export class ListePersonnesPage implements OnInit {
    private selectedItem: any;
    public items: Array<{ email: string; nom: string; url: string; id: string; }> = [];
    public listeLieux: Array<{ idLieu: string; }> = [];
    constructor(
        private navLocation: Location,
        private router: Router,
        private firebaseService: FirebaseService,
        public afAuth: AngularFireAuth
    ) {
    }

    async ngOnInit() {
        await this.initFields(this.items);
    }

    /**
     * Initialisation de la liste des utilisateurs présents en base
     * @param items
     */

    async initFields(items) {
        this.firebaseService.getAllUsers().then(function (personnes) { // Récupérer les lieux, regarder dans l'idUser.
            for (let key of Object.keys(personnes)) {
                let personne = personnes[key];
                items.push({
                    email: personne.email,
                    nom: personne.nom + ' ' + personne.prenom,
                    url: personne.url,
                    id: key
                });

                if (personne.lieux != undefined) {
                    let listeLieux = personne.lieux;
                    for (let keyLieu of Object.keys(personne.lieux)) {
                        let lieu = personne.lieux[keyLieu];
                        listeLieux = {
                            'idLieu': lieu.idLieu
                        };
                    }
                }
            }
        });
    }

    /**
     * Ouvrir une nouvelle page contenant les lieux taggués par la personne sélectionnée
     * @param id : l'id de l'utilisateur
     */
    afficherDetails(id) {
        this.router.navigate(['/vue-moderateur/liste-personnes/liste-lieux-personne', id]);
    }

    /**
     * Affiche le profil de l'utilisateur connecté
     */
    afficherProfil() {
        return new Promise<any>((resolve, reject) => {
            this.afAuth.user.subscribe(currentUser => {
                if (currentUser) {
                    this.router.navigate(['/profil-details', currentUser.uid]);
                }
            });
        });
    }

}
