import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {ProfilDetailsEditPageRoutingModule} from './profil-details-edit-routing.module';
import {ProfilDetailsEditPage} from "./profil-details-edit.page";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        ProfilDetailsEditPageRoutingModule
    ],
    declarations: [ProfilDetailsEditPage]
})
export class ProfilDetailsEditPageModule {
}
