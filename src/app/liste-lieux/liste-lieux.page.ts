import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";

@Component({
    selector: 'app-list',
    templateUrl: 'liste-lieux.page.html',
    styleUrls: ['liste-lieux.page.scss']
})
export class ListeLieuxPage implements OnInit {
    private selectedItem: any;
    public items: Array<{ title: string; note: string; icon: string }> = [];

    constructor(private navLocation: Location,
    ) {
        for (let i = 1; i < 11; i++) {
            this.items.push({
                title: 'Contenu ' + i,
                note: 'Personne ' + i,
                icon: 'flag'
            });
        }
    }

    ngOnInit() {
    }

    afficherDetails(item) { // Nouvelle instance de liste de personnes ayant visité ce lieu
        console.log(item)
    }

    goBack() {
        this.navLocation.back();
    }

}
