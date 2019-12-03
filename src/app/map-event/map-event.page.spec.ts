import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {MapEventPage} from './map-event.page';

describe('MapEventPage', () => {
    let component: MapEventPage;
    let fixture: ComponentFixture<MapEventPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapEventPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(MapEventPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
