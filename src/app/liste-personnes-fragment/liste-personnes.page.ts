import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {FirebaseService} from "../services/firebase.service";

@Component({
    selector: 'app-list',
    templateUrl: 'liste-personnes.page.html',
    styleUrls: ['liste-personnes.page.scss']
})

export class ListePersonnesPage implements OnInit {
    private selectedItem: any;
    public items: Array<{ email: string; nom: string; url: string; id: string; }> = [];
    public listeLieux: Array<{ idLieu: string; }> = [];
    constructor(
        private navLocation: Location,
        private router: Router,
        private firebaseService: FirebaseService,
    ) {
    }

    afficherDetails(id) {
        this.router.navigate(['/vue-moderateur/liste-personnes/liste-lieux-personne', id]);
    }

    async ngOnInit() {
        await this.initFields(this.items);
    }

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

}
