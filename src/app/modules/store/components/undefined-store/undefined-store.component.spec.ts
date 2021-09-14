import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndefinedStoreComponent } from './undefined-store.component';

describe('UndefinedStoreComponent', () => {
  let component: UndefinedStoreComponent;
  let fixture: ComponentFixture<UndefinedStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UndefinedStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UndefinedStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
