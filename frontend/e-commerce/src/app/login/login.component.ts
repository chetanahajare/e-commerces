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
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule,MatButtonModule,MatInputModule,MatFormFieldModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers:[UserService]
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder,private ser:UserService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.ser.login(this.loginForm.value).subscribe((res)=>{
        console.log(res);
      },
        (error: any) => {
         console.error(error);
         })
    }
  }
}
