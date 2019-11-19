import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilDetailsPageRoutingModule } from './profil-details-routing.module';

import { ProfilDetailsPage } from './profil-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilDetailsPageRoutingModule
  ],
  declarations: [ProfilDetailsPage]
})
export class ProfilDetailsPageModule {}
