import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricViewerComponent } from './metric-viewer.component';

describe('MetricViewerComponent', () => {
  let component: MetricViewerComponent;
  let fixture: ComponentFixture<MetricViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
