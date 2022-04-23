import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProposalListComponent } from './client-proposal-list.component';

describe('ClientProposalListComponent', () => {
  let component: ClientProposalListComponent;
  let fixture: ComponentFixture<ClientProposalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientProposalListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientProposalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
