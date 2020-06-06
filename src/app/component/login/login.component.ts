import { Login } from './../../ModuleClass/loginClass.module';
import { Component, OnInit } from '@angular/core';
import { ApicallService } from './../../service/apicall.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  subscription: Subscription;
  // FormGroup
  LoginFormGroup: FormGroup;
  // Array
  loginInfo: any[];

  // boolean
  submitted = false;

  constructor(private callService: ApicallService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.ReactiveForm();
    this.getLoginDetails();
  }
  ReactiveForm() {
    this.LoginFormGroup = this.fb.group({
      id: [''],
      createdAt: [''],
      name: [''],
      avatar: [''],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  getLoginDetails() {
    this.subscription = this.callService.getLogin_User().subscribe(
      (response: any[]) => {
        this.loginInfo = response;
        console.log(response);
      }
    );
  }
  get loginFormControl() {
    return this.LoginFormGroup.controls;
  }
  onSubmit(information) {
    this.submitted = true;
    console.log(information);
    for (let i = 0; i < this.loginInfo.length; i++) {
      if (this.loginInfo[i].username === information.value.username && this.loginInfo[i].password === information.value.password) {
        console.log('Login Done');
        this.router.navigate(['home']);
        this.loginInfo = [];
        return;
      }
    }
    alert('invalid');
  }
}
