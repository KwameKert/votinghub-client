import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVotersComponent } from './list-voters.component';

describe('ListVotersComponent', () => {
  let component: ListVotersComponent;
  let fixture: ComponentFixture<ListVotersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVotersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVotersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
