import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHomePostDialogComponent } from './new-home-post-dialog.component';

describe('NewHomePostDialogComponent', () => {
  let component: NewHomePostDialogComponent;
  let fixture: ComponentFixture<NewHomePostDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewHomePostDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHomePostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
