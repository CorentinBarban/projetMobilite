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
                },
                {
                    path: 'liste-lieux/liste-personnes-lieu/:id/:count',
                    loadChildren: () => import('../liste-personnes-lieu/liste-personnes-lieu.module').then(m => m.ListePersonnesLieuPageModule)
                },
                {
                    path: 'liste-personnes/liste-lieux-personne/:id',
                    loadChildren: () => import('../liste-lieux-personne/liste-lieux-personne.module').then(m => m.ListeLieuxPersonnePageModule)
                }

            ]
        }]),

    ],
    declarations: [VueModerateurPage]
})
export class VueModerateurPageModule {
}
