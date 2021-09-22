import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonUndefinedStoreComponent } from './skeleton-undefined-store.component';

describe('SkeletonUndefinedStoreComponent', () => {
  let component: SkeletonUndefinedStoreComponent;
  let fixture: ComponentFixture<SkeletonUndefinedStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonUndefinedStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeletonUndefinedStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
