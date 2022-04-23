import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorProjectDetailsComponent } from './coordinator-project-details.component';

describe('CoordinatorProjectDetailsComponent', () => {
  let component: CoordinatorProjectDetailsComponent;
  let fixture: ComponentFixture<CoordinatorProjectDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordinatorProjectDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorProjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
