import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {CarteVisitesPage} from './carte-visites.page';

describe('HomePage', () => {
    let component: CarteVisitesPage;
    let fixture: ComponentFixture<CarteVisitesPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CarteVisitesPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(CarteVisitesPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
