import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyClientProposalCompletedComponent } from './apply-client-proposal-completed.component';

describe('ApplyClientProposalCompletedComponent', () => {
  let component: ApplyClientProposalCompletedComponent;
  let fixture: ComponentFixture<ApplyClientProposalCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyClientProposalCompletedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyClientProposalCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
