import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorSchooltermListComponent } from './coordinator-schoolterm-list.component';

describe('CoordinatorSchooltermListComponent', () => {
  let component: CoordinatorSchooltermListComponent;
  let fixture: ComponentFixture<CoordinatorSchooltermListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordinatorSchooltermListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorSchooltermListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
