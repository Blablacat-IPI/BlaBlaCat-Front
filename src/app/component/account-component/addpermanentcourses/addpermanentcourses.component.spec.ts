import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpermanentcoursesComponent } from './addpermanentcourses.component';

describe('AddpermanentcoursesComponent', () => {
  let component: AddpermanentcoursesComponent;
  let fixture: ComponentFixture<AddpermanentcoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddpermanentcoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpermanentcoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
