import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserDocumentsComponent } from './view-user-documents.component';

describe('ViewDocumentsComponent', () => {
  let component: ViewUserDocumentsComponent;
  let fixture: ComponentFixture<ViewUserDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewUserDocumentsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
