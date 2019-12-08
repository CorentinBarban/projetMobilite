import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-list',
    templateUrl: 'vue-moderateur.page.html',
    styleUrls: ['vue-moderateur.page.scss']
})

/**
 * Cette classe sert de composant à la vue modérateur et de ses différents onglets
 */
export class VueModerateurPage implements OnInit {
    private selectedItem: any;
    public items: Array<{ title: string; note: string; icon: string }> = [];

    constructor() {
    }

    ngOnInit() {
    }
}
