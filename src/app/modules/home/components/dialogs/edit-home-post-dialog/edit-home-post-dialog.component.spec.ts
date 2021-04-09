import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHomePostDialogComponent } from './edit-home-post-dialog.component';

describe('EditHomePostDialogComponent', () => {
  let component: EditHomePostDialogComponent;
  let fixture: ComponentFixture<EditHomePostDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditHomePostDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHomePostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
