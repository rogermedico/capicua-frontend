import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivingLicencesDialogComponent } from './driving-licences-dialog.component';

describe('DrivingLicencesDialogComponent', () => {
  let component: DrivingLicencesDialogComponent;
  let fixture: ComponentFixture<DrivingLicencesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrivingLicencesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrivingLicencesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
