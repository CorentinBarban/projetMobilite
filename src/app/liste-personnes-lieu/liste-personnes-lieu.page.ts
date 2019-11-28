import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";

@Component({
    selector: 'app-list',
    templateUrl: 'liste-personnes-lieu.page.html',
    styleUrls: ['liste-personnes-lieu.page.scss']
})
export class ListePersonnesLieuPage implements OnInit {
    private selectedItem: any;
    public items: Array<{ title: string; note: string; icon: string }> = [];

    constructor(private navLocation: Location,
    ) {
        for (let i = 1; i < 21; i++) {
            this.items.push({
                title: 'Personne ' + i,
                note: null,
                icon: 'contact'
            });
        }
    }

    ngOnInit() {
    }

    goBack() {
        this.navLocation.back();
    }

}
