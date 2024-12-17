import { Component } from '@angular/core';
import { NzFormDirective } from 'ng-zorro-antd/form';
import { NzFormItemComponent } from 'ng-zorro-antd/form';
import { NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzFormControlComponent } from 'ng-zorro-antd/form';
import { NzColDirective } from 'ng-zorro-antd/grid';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, NonNullableFormBuilder } from '@angular/forms';
import { Validators as Myvalidators  } from '@angular/forms';
import { ExcuselistService } from '../../services/excuselist.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzColDirective,
    ReactiveFormsModule,
    NzInputDirective,
    NzButtonComponent,
    CommonModule,
    ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
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

  validateForm: FormGroup <{
    name: FormControl<string>;
    description: FormControl<string>;
  }>
  
  

  submitFormProduct(): void {
    if (this.validateForm.valid) {
      this.service.createProducts(this.validateForm.value).subscribe(() => {
      this.createNotification(
        'success', 
        `${this.validateForm.value.name}${this.validateForm.value.description}`,
        'Your theory has been created successfully'
      );
    }); 
  }else {
      Object.values(this.validateForm.controls).forEach((control) => {  
        if(control.invalid) {
        control.markAsDirty(); 
        control.updateValueAndValidity();
  }});
    }
  }
  createNotification(type: string, title: string, content: string): void {
    this.notification.create(type, title,content);
  } 

  
  
  }
