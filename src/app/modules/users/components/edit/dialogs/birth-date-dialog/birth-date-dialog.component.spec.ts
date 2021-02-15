import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthDateDialogComponent } from './birth-date-dialog.component';

describe('BirthDateDialogComponent', () => {
  let component: BirthDateDialogComponent;
  let fixture: ComponentFixture<BirthDateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirthDateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthDateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
