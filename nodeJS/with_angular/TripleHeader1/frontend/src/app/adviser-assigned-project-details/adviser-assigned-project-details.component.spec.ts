import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviserAssignedProjectDetailsComponent } from './adviser-assigned-project-details.component';

describe('AdviserAssignedProjectDetailsComponent', () => {
  let component: AdviserAssignedProjectDetailsComponent;
  let fixture: ComponentFixture<AdviserAssignedProjectDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdviserAssignedProjectDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdviserAssignedProjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
