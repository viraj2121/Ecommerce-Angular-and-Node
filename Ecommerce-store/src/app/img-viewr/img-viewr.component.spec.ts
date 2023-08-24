import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgViewrComponent } from './img-viewr.component';

describe('ImgViewrComponent', () => {
  let component: ImgViewrComponent;
  let fixture: ComponentFixture<ImgViewrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgViewrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgViewrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
