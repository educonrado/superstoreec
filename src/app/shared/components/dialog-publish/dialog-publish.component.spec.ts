import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPublishComponent } from './dialog-publish.component';

describe('DialogPublishComponent', () => {
  let component: DialogPublishComponent;
  let fixture: ComponentFixture<DialogPublishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPublishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
