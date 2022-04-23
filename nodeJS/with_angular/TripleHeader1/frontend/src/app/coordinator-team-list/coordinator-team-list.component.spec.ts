import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorTeamListComponent } from './coordinator-team-list.component';

describe('CoordinatorTeamListComponent', () => {
  let component: CoordinatorTeamListComponent;
  let fixture: ComponentFixture<CoordinatorTeamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoordinatorTeamListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorTeamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
