import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRateTableComponent } from './change-rate-table.component';

describe('ChangeRateTableComponent', () => {
  let component: ChangeRateTableComponent;
  let fixture: ComponentFixture<ChangeRateTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeRateTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeRateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
