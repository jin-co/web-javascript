import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientProposalEditComponent } from './add-client-proposal-edit.component';

describe('AddClientProposalEditComponent', () => {
  let component: AddClientProposalEditComponent;
  let fixture: ComponentFixture<AddClientProposalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClientProposalEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClientProposalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
