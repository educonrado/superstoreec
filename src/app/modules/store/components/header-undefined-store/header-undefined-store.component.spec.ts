import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUndefinedStoreComponent } from './header-undefined-store.component';

describe('HeaderUndefinedStoreComponent', () => {
  let component: HeaderUndefinedStoreComponent;
  let fixture: ComponentFixture<HeaderUndefinedStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderUndefinedStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderUndefinedStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
