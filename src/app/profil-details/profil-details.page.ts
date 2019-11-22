import { Component, OnInit } from '@angular/core';
import {MenuController} from "@ionic/angular";
import {Location} from "@angular/common";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profil-details',
  templateUrl: './profil-details.page.html',
  styleUrls: ['./profil-details.page.scss'],
})
export class ProfilDetailsPage implements OnInit {

  constructor(
      private menu: MenuController,
      private location : Location,
      private authService : AuthService,
      private router :Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menu.enable(true);
  }

  goBack(){
    this.location.back();
  }

  logOut(){
    this.authService.doLogout().then(function (){
        this.router.navigate(['/login'])
    });
  }

}
