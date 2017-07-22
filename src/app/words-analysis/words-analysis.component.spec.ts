import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsAnalysisComponent } from './words-analysis.component';

describe('WordsAnalysisComponent', () => {
  let component: WordsAnalysisComponent;
  let fixture: ComponentFixture<WordsAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordsAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordsAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
