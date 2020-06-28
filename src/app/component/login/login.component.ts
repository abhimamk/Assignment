import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApicallService } from './../../service/apicall.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MainService} from '../../service/main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  // FormGroup
  LoginFormGroup: FormGroup;
  // Array
  loginInfo: any[];

  // boolean
  submitted = false;

  constructor(
    private callService: ApicallService, private fb: FormBuilder,
    private router: Router, private messageService: MessageService,
    private mainService: MainService) { }

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
      }
    );
  }
  get loginFormControl() {
    return this.LoginFormGroup.controls;
  }
  onSubmit(information) {
    this.mainService.changeMessage(information);
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
    this.messageService.add(
      { severity: 'error', summary: 'Error Message', detail: 'Check Username or password.Miss Match Enter Correctly' });

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
