import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatausersComponent } from './datausers.component';

describe('DatausersComponent', () => {
  let component: DatausersComponent;
  let fixture: ComponentFixture<DatausersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatausersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatausersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
