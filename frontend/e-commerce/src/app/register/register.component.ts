import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { UserService } from '../user.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatIconModule,MatButtonModule,MatInputModule,MatFormFieldModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers:[UserService]
})
export class RegisterComponent {
 
  registerForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder, private ser:UserService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() :void{
    if (this.registerForm.valid) {
 this.ser.register(this.registerForm.value).subscribe((res)=>{
  console.log(res);
 },   (error: any) => {
   console.error(error);
   })
    
    
    }
  }
}
