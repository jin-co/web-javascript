import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyClientProposalDetailsComponent } from './apply-client-proposal-details.component';

describe('ApplyClientProposalDetailsComponent', () => {
  let component: ApplyClientProposalDetailsComponent;
  let fixture: ComponentFixture<ApplyClientProposalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyClientProposalDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyClientProposalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
