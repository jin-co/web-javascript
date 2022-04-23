import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviserAssignedProjectListComponent } from './adviser-assigned-project-list.component';

describe('AdviserAssignedProjectListComponent', () => {
  let component: AdviserAssignedProjectListComponent;
  let fixture: ComponentFixture<AdviserAssignedProjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdviserAssignedProjectListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdviserAssignedProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
