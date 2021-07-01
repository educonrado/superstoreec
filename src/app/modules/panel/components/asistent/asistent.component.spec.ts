import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistentComponent } from './asistent.component';

describe('AsistentComponent', () => {
  let component: AsistentComponent;
  let fixture: ComponentFixture<AsistentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsistentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
