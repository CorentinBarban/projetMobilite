import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";

@Component({
    selector: 'app-list',
    templateUrl: 'liste-personnes.page.html',
    styleUrls: ['liste-personnes.page.scss']
})
export class ListePersonnesPage implements OnInit {
    private selectedItem: any;
    public items: Array<{ title: string; note: string; icon: string }> = [];

    constructor(private navLocation: Location,
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
        console.log("hey ! " + item)
    }

    ngOnInit() {
    }

}
