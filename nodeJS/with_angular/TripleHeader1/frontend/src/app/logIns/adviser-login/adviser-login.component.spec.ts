import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviserLoginComponent } from './adviser-login.component';

describe('AdviserLoginComponent', () => {
  let component: AdviserLoginComponent;
  let fixture: ComponentFixture<AdviserLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdviserLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdviserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
