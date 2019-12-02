import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {CalendrierPage} from './calendrier.page';

describe('CalendrierPage', () => {
    let component: CalendrierPage;
    let fixture: ComponentFixture<CalendrierPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CalendrierPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(CalendrierPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
