import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorProjectListComponent } from './coordinator-project-list.component';

describe('CoordinatorProjectListComponent', () => {
  let component: CoordinatorProjectListComponent;
  let fixture: ComponentFixture<CoordinatorProjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordinatorProjectListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
