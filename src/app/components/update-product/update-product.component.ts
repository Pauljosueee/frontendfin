import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NonNullableFormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ExcuselistService } from '../../services/excuselist.service';
import { Validators as  Myvalidators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzColDirective } from 'ng-zorro-antd/grid';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { ProductListComponent } from '../product-list/product-list.component';


@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [NzFormControlComponent,
      NzFormDirective,
      NzFormItemComponent,
      NzFormLabelComponent,
      NzColDirective,
      ReactiveFormsModule,
      NzInputDirective,
      NzButtonComponent,
      CommonModule,],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnChanges {
  
 constructor (
    private service: ExcuselistService,
    private fb: NonNullableFormBuilder,
    private notification: NzNotificationService

  ) {
    const { required } = Myvalidators;
    this.validateForm = this.fb.group({
      name: ['', [required]],
      description: ['', [required]],
    })
  }

  @Input() product: any;
  @Output() productUpdate = new EventEmitter<any>();

  validateForm: FormGroup <{
    name: FormControl<string>;
    description: FormControl<string>;
  }>

  ngOnChanges(changes: SimpleChanges): void {
  
    if (changes['product']) {
       this.setvalues();
    }
   }
   setvalues(): void {
     if(this.product) {
       this.validateForm.setValue({
         name: this.product.name,
         description: this.product.description,
       });
     }
   }

  submitformProductUpdate(): void {
    if (this.validateForm.valid) {
      this.service.updateProduct(this.product.id, this.validateForm.value).subscribe(() => {
        this.createNotification('success', 
          `${this.validateForm.value.name}${this.validateForm.value. description}`, 
          'The Excuse has been updated successfully.');
      });
    }else {
      Object.values(this.validateForm.controls).forEach((control) => {  
        if(control.invalid) {
        control.markAsDirty(); 
        control.updateValueAndValidity();
  }});
  
}}
createNotification(type: string, title: string, content: string): void {
  this.notification.create(type, title,content);
} }
function submitformProductUpdate() {
  throw new Error('Function not implemented.');
}
  
