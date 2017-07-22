import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityRateComponent } from './activity-rate.component';

describe('ActivityRateComponent', () => {
  let component: ActivityRateComponent;
  let fixture: ComponentFixture<ActivityRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
