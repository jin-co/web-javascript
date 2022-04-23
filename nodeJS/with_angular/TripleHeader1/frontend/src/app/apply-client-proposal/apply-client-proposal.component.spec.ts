import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyClientProposalComponent } from './apply-client-proposal.component';

describe('ApplyClientProposalComponent', () => {
  let component: ApplyClientProposalComponent;
  let fixture: ComponentFixture<ApplyClientProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyClientProposalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyClientProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
