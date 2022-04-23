import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorAssignFacultyComponent } from './coordinator-assign-faculty.component';

describe('CoordinatorAssignFacultyComponent', () => {
  let component: CoordinatorAssignFacultyComponent;
  let fixture: ComponentFixture<CoordinatorAssignFacultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordinatorAssignFacultyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorAssignFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
