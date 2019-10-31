import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditAccountsComponent } from './credit-accounts.component';

describe('CreditAccountsComponent', () => {
  let component: CreditAccountsComponent;
  let fixture: ComponentFixture<CreditAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
