import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentTeamComponent } from './add-student-team.component';

describe('AddStudentTeamComponent', () => {
  let component: AddStudentTeamComponent;
  let fixture: ComponentFixture<AddStudentTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStudentTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
