import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyClientProposalAddComponent } from './apply-client-proposal-add.component';

describe('ApplyClientProposalAddComponent', () => {
  let component: ApplyClientProposalAddComponent;
  let fixture: ComponentFixture<ApplyClientProposalAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyClientProposalAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyClientProposalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
