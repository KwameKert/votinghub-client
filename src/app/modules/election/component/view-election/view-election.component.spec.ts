import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewElectionComponent } from './view-election.component';

describe('ViewElectionComponent', () => {
  let component: ViewElectionComponent;
  let fixture: ComponentFixture<ViewElectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewElectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewElectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
