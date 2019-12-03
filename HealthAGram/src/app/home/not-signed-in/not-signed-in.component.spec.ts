import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotSignedInComponent } from './not-signed-in.component';

describe('NotSignedInComponent', () => {
  let component: NotSignedInComponent;
  let fixture: ComponentFixture<NotSignedInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotSignedInComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotSignedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
