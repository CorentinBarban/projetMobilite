import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';

import {ListePersonnesLieuPage} from './liste-personnes-lieu.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: ListePersonnesLieuPage
            }
        ])
    ],
    declarations: [ListePersonnesLieuPage]
})
export class ListePersonnesLieuPageModule {
}
