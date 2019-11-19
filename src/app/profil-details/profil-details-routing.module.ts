import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilDetailsPage } from './profil-details.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilDetailsPageRoutingModule {}
