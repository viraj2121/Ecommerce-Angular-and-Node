import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoverviewComponent } from './productoverview.component';

describe('ProductoverviewComponent', () => {
  let component: ProductoverviewComponent;
  let fixture: ComponentFixture<ProductoverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
