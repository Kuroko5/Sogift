import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoAreUsComponent } from './who-are-us.component';

describe('WhoAreUsComponent', () => {
  let component: WhoAreUsComponent;
  let fixture: ComponentFixture<WhoAreUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhoAreUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhoAreUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
