import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerAddStockComponent } from './seller-add-stock.component';

describe('SellerAddStockComponent', () => {
  let component: SellerAddStockComponent;
  let fixture: ComponentFixture<SellerAddStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerAddStockComponent]
    });
    fixture = TestBed.createComponent(SellerAddStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
