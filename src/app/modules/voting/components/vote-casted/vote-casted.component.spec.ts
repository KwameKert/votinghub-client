import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteCastedComponent } from './vote-casted.component';

describe('VoteCastedComponent', () => {
  let component: VoteCastedComponent;
  let fixture: ComponentFixture<VoteCastedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteCastedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteCastedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
