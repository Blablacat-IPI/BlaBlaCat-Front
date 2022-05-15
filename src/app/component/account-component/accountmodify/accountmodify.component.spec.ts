import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountmodifyComponent } from './accountmodify.component';

describe('AccountmodifyComponent', () => {
  let component: AccountmodifyComponent;
  let fixture: ComponentFixture<AccountmodifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountmodifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountmodifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
