import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentApplicationListComponent } from './student-application-list.component';

describe('StudentApplicationListComponent', () => {
  let component: StudentApplicationListComponent;
  let fixture: ComponentFixture<StudentApplicationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentApplicationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentApplicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
