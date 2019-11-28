import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';

import {ListePersonnesPage} from './liste-personnes.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: ListePersonnesPage
            }
        ])
    ],
    declarations: [ListePersonnesPage]
})
export class ListePersonnesPageModule {
}
