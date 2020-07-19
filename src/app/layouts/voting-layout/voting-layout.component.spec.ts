import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingLayoutComponent } from './voting-layout.component';

describe('VotingLayoutComponent', () => {
  let component: VotingLayoutComponent;
  let fixture: ComponentFixture<VotingLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
