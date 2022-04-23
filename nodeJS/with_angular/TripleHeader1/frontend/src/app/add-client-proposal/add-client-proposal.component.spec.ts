import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientProposalComponent } from './add-client-proposal.component';

describe('AddClientProposalComponent', () => {
  let component: AddClientProposalComponent;
  let fixture: ComponentFixture<AddClientProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClientProposalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClientProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
