import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchCandidatesComponent } from './fetch-candidates.component';

describe('FetchCandidatesComponent', () => {
  let component: FetchCandidatesComponent;
  let fixture: ComponentFixture<FetchCandidatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FetchCandidatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
