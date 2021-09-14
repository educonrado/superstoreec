import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonStoreComponent } from './skeleton-store.component';

describe('SkeletonStoreComponent', () => {
  let component: SkeletonStoreComponent;
  let fixture: ComponentFixture<SkeletonStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeletonStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
