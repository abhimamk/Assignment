import { HomeComponent } from './../../Menu/home/home.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApicallService } from './../../service/apicall.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  subscription: Subscription;
  @ViewChild(HomeComponent, { static: false }) sendData: HomeComponent;

  // FormGroup
  LoginFormGroup: FormGroup;
  // Array
  loginInfo: any[];

  // boolean
  submitted = false;

  constructor(private callService: ApicallService, private fb: FormBuilder, private router: Router,
    private messageService: MessageService) { }

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
        // this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Login' });
        this.router.navigate(['home']);
        this.loginInfo = [];
        return;
      }
    }
    this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });

  }
  showSuccess() {
  }
}
