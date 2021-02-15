import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLanguagesComponent } from './view-languages.component';

describe('ViewLanguagesComponent', () => {
  let component: ViewLanguagesComponent;
  let fixture: ComponentFixture<ViewLanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewLanguagesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
