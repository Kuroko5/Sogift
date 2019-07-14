import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoGiftComponent } from './so-gift.component';

describe('SoGiftComponent', () => {
  let component: SoGiftComponent;
  let fixture: ComponentFixture<SoGiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoGiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
