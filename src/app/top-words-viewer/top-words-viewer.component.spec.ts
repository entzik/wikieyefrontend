import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopWordsViewerComponent } from './top-words-viewer.component';

describe('TopWordsViewerComponent', () => {
  let component: TopWordsViewerComponent;
  let fixture: ComponentFixture<TopWordsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopWordsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopWordsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
