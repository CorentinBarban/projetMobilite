import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuController, IonSlides, NavController} from '@ionic/angular';
import {ActionSheetController, Platform, AlertController, LoadingController, ToastController} from '@ionic/angular'; //Plugins supplémentaires
import {FirebaseService} from '../services/firebase.service';
import {Router} from "@angular/router";
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import {AngularFireAuth} from "@angular/fire/auth";
import {NgCalendarModule} from 'ionic2-calendar';
import {CalendarComponent} from 'ionic2-calendar/calendar';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
    selector: 'app-home',
    templateUrl: 'calendrier.page.html',
    styleUrls: ['calendrier.page.scss'],
})
export class CalendrierPage implements OnInit {
    public currentDate = new Date();
    public currentMonth: string;
    public afAuth: AngularFireAuth;
    public router: Router;
    public showAddEvent: boolean;
    public newEvent = {
        title: '',
        description: '',
        imageURL: '',
        startTime: '',
        endTime: '',
        lat: '',
        lgt: ''
    };
    public calendar;


    public allEvents = [];

    @ViewChild(CalendarComponent, {static: false}) myCalendar: CalendarComponent;

    constructor(
        private firebaseService: FirebaseService,
    ) {
    }

    async ngOnInit() {

    }

    onViewTitleChanged(title: string) {
        this.currentMonth = title;
    }

    showHideForm() {
        this.showAddEvent = !this.showAddEvent;
        this.newEvent = {
            title: '',
            description: '',
            imageURL: '',
            startTime: new Date().toISOString(),
            endTime: new Date().toISOString(),
            lat: '',
            lgt: ''
        };
    }

    addEvent() {
        let value = {
            title: this.newEvent.title,
            description: this.newEvent.description,
            url: this.newEvent.imageURL,
            startTime: this.newEvent.startTime,
            endTime: this.newEvent.endTime,
            lat: this.newEvent.lat,
            lgt: this.newEvent.lgt,
        };
        this.firebaseService.createEvent(value);
        this.showHideForm();
    }

    onTimeSelected(ev: any) {
        const selected = new Date(ev.selectedTime);
        this.newEvent.startTime = selected.toISOString();
        selected.setHours(selected.getHours() + 1);
        this.newEvent.endTime = (selected.toISOString());
    }

    afficherProfil() {
        return new Promise<any>((resolve, reject) => {
            this.afAuth.user.subscribe(currentUser => {
                if (currentUser) {
                    this.router.navigate(['/profil-details', currentUser.uid]);
                }
            });
        });
    }


}