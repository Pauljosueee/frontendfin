import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzButtonModule} from 'ng-zorro-antd/button';
import { ExcuselistService } from '../../services/excuselist.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, NzTableModule, NzButtonModule, ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})

export class ProductListComponent implements OnInit {
item: any;
  constructor(private service: ExcuselistService) { }

  product: any[] = [];
  @Output() productSelected = new EventEmitter<any>();
  
  ngOnInit(): void {
    this.loadProducts()
  }

  loadProducts(): void{
    this.service.getProducts().subscribe((product)=>{
      this.product = product;
    })
  }
  deleteProduct(id: string): void{
    this.service.deleteProduct(id).subscribe(()=>{
      this.loadProducts();
    })
  }
  selectedProduct( product:any): void {}
}
