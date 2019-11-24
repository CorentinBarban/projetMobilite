import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {ProfilDetailsPageRoutingModule} from './profil-details-routing.module';
import {ProfilDetailsPage} from './profil-details.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        ProfilDetailsPageRoutingModule
    ],
    declarations: [ProfilDetailsPage]
})
export class ProfilDetailsPageModule {
}
