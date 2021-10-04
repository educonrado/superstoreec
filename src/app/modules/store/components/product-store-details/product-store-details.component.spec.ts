import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStoreDetailsComponent } from './product-store-details.component';

describe('ProductStoreDetailsComponent', () => {
  let component: ProductStoreDetailsComponent;
  let fixture: ComponentFixture<ProductStoreDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductStoreDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductStoreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
