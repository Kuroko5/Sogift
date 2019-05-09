import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesAddComponent } from './articles-add.component';

describe('ArticlesAddComponent', () => {
  let component: ArticlesAddComponent;
  let fixture: ComponentFixture<ArticlesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
