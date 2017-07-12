import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WikistatsChartsComponent } from './wikistats-charts.component';

describe('WikistatsChartsComponent', () => {
  let component: WikistatsChartsComponent;
  let fixture: ComponentFixture<WikistatsChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WikistatsChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WikistatsChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
