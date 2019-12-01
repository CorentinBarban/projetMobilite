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
    public items: Array<{ email: string; nom: string; url: string }> = [];
    public listeLieux: Array<{ idLieu: string; }> = [];
    constructor(
        private navLocation: Location,
        private router: Router,
        private firebaseService: FirebaseService,
    ) {

    }

    afficherDetails(personne) { //Doit rediriger vers une nouvelle instance de liste-lieux avec la liste des lieux visités par la personne en question
        this.router.navigate(['/vue-moderateur/liste-personnes/liste-lieux-personne'], {queryParams: personne});
    }

    async ngOnInit() {
        await this.initFields(this.items, this.listeLieux);
    }

    async initFields(items, listeLieux) {
        this.firebaseService.getAllUsers().then(function (personnes) { // Récupérer les lieux, regarder dans l'idUser.
            for (let key of Object.keys(personnes)) {
                let personne = personnes[key];
                console.log(personne);
                items.push({
                    email: personne.email,
                    nom: personne.nom + ' ' + personne.prenom,
                    url: personne.url
                })
                console.log(personne.lieux);
                listeLieux.push({
                    'listeLieux': {
                        'idLieu': personne.lieux
                    }
                })
                console.log(listeLieux);
            }
        });
    }

}
