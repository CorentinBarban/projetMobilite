import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
    selector: 'app-list',
    templateUrl: 'liste-personnes.page.html',
    styleUrls: ['liste-personnes.page.scss']
})
export class ListePersonnesPage implements OnInit {
    private selectedItem: any;
    public items: Array<{ title: string; note: string; icon: string }> = [];

    constructor(
        private navLocation: Location,
        private router: Router
    ) {
        for (let i = 1; i < 11; i++) {
            this.items.push({
                title: 'Personne ' + i,
                note: null,
                icon: 'contact'
            });
        }
    }

    afficherDetails(item) { //Doit rediriger vers une nouvelle instance de liste-lieux avec la liste des lieux visités par la personne en question
        this.router.navigateByUrl('/vue-moderateur/liste-personnes/liste-lieux-personne');
    }

    ngOnInit() {
    }

}
