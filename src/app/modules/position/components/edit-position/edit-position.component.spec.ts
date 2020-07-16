import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPositionComponent } from './edit-position.component';

describe('EditPositionComponent', () => {
  let component: EditPositionComponent;
  let fixture: ComponentFixture<EditPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
