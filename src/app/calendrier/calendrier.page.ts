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
import {ModalController} from '@ionic/angular';
import {EventPage} from '../event/event.page';
@Component({
    selector: 'app-home',
    templateUrl: 'calendrier.page.html',
    styleUrls: ['calendrier.page.scss'],
})
export class CalendrierPage implements OnInit {
    public currentDate = new Date();
    public currentMonth: string;
    public mode = 'month';
    public afAuth: AngularFireAuth;
    public showAddEvent: boolean;
    public minDate = new Date().toISOString();
    public myCal = document.getElementById('myCal');
    public newEvent = {
        title: '',
        description: '',
        startTime: '',
        endTime: '',
        lat: '',
        lgt: ''
    };
    public calendar;

    public allEvents = [];

    @ViewChild(CalendarComponent, {static: false}) myCalendar: CalendarComponent;

    constructor(
        public modalController: ModalController,
        private afDB: AngularFireDatabase,
        private router: Router
    ) {
        this.loadEvent();
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
            startTime: new Date().toISOString(),
            endTime: new Date().toISOString(),
            lat: '',
            lgt: ''
        };
    }

    addEvent() {
        let key = this.afDB.list('evenements').push({
            title: this.newEvent.title,
            startTime: this.newEvent.startTime,
            endTime: this.newEvent.endTime,
            description: this.newEvent.description,
            lat: '',
            lng: ''
        });
        console.log(('Id event : ' + key.key));
        this.showHideForm();
        this.selectLocation(key.key);
    }

    selectLocation(idEvent) {
        this.router.navigate(['/map-event', idEvent]);
    }

    loadEvent() {
        var that = this;
        this.afDB.list('/evenements').snapshotChanges(['child_added']).subscribe(actions => {
            this.allEvents = [];
            actions.forEach(action => {
                this.allEvents.push({
                    title: action.payload.exportVal().title,
                    startTime: new Date(action.payload.exportVal().startTime),
                    endTime: new Date(action.payload.exportVal().endTime),
                    description: action.payload.exportVal().description,
                    lat: action.payload.exportVal().lat,
                    lng: action.payload.exportVal().lng
                });

            });
        });
    }

    async onEventSelected(event: any) {
        console.log('Event: ' + JSON.stringify(event));
        const modal = await this.modalController.create({
            component: EventPage,
            componentProps: event
        });
        return await modal.present();
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
