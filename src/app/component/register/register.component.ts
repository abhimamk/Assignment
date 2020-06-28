import { CustomvalidationService } from './../../service/customvalidation.service';
import { Login } from './../../ModuleClass/loginClass.module';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApicallService } from './../../service/apicall.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  RegisterFormGroup: FormGroup;
  // boolean
  submitted = false;
  checkUser = false;
  // Date
  toDayDate: Date;
  // Array
  loginInfo: any[];
  constructor(
    private callService: ApicallService, private fb: FormBuilder, private router: Router,
    private customValidator: CustomvalidationService, private messageService: MessageService) { }

  ngOnInit() {
    this.ReactiveForm();
    this.getLoginDetails();
  }
  getLoginDetails() {
    this.callService.getLogin_User().subscribe(
      (response: any[]) => {
        this.loginInfo = response;
      }
    );
  }
  ReactiveForm() {
    this.RegisterFormGroup = this.fb.group({
      id: [''],
      createdAt: [''],
      name: ['', Validators.required],
      username: ['', [Validators.required]],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      confirmPassword: ['', [Validators.required]],
    },
      {
        validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
      }
    );
  }
  get registerFormControl() {
    return this.RegisterFormGroup.controls;
  }
  checkUserRegister(RegisterFormGroup) {
    for (let i = 0; i < this.loginInfo.length; i++) {
      if (
        this.loginInfo[i].username === RegisterFormGroup.value.username) {
        return this.checkUser = false;
      }
    }
    return this.checkUser = true;
  }


  onRegister(RegisterFormGroup) {
    this.submitted = true;
    this.checkUserRegister(RegisterFormGroup);
    if (this.checkUser === true) {
      if (this.RegisterFormGroup.valid) {
        this.callService.addNewUser(new Login(
          RegisterFormGroup.value.id,
          RegisterFormGroup.value.createdAt,
          RegisterFormGroup.value.name,
          RegisterFormGroup.value.avatar,
          RegisterFormGroup.value.username,
          RegisterFormGroup.value.password
        )).subscribe(
          (response: any) => {
            console.log(response);
            setTimeout(() => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success Message',
                detail: 'Successfully Register'
              });
            }, 1000);
          },
          error => {
            this.messageService.add({ severity: 'warn', summary: 'Warn   Message', detail: 'Failed Register' });

          },
          () => {
            this.router.navigate(['/']);
            this.RegisterFormGroup.reset();
          });

      } else {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Enter Required Details' });
        this.checkUser = false;
      }

    } else {
      // this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Enter Required Details' });
      this.checkUser = false;
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn Message',
        detail: 'UserName Already Register'
      });
    }

  }
}
