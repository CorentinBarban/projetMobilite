import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';

import {VueModerateurPage} from './vue-moderateur.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([{
            path: '',
            component: VueModerateurPage,
            children: [
                {
                    path: 'liste-lieux',
                    loadChildren: () => import('../liste-lieux-fragment/liste-lieux.module').then(m => m.ListeLieuxPageModule)
                },
                {
                    path: 'liste-personnes',
                    loadChildren: () => import('../liste-personnes-fragment/liste-personnes.module').then(m => m.ListePersonnesPageModule)
                }
            ]
        }]),

    ],
    declarations: [VueModerateurPage]
})
export class VueModerateurPageModule {
}
