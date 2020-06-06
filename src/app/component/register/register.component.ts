import { CustomvalidationService } from './../../service/customvalidation.service';
import { Login } from './../../ModuleClass/loginClass.module';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApicallService } from './../../service/apicall.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  RegisterFormGroup: FormGroup;
  // boolean
  submitted = false;
  // Date
  toDayDate: Date;
  constructor(private callService: ApicallService, private fb: FormBuilder, private router: Router,
    private customValidator: CustomvalidationService) { }

  ngOnInit() {
    this.ReactiveForm();
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
  onRegister(RegisterFormGroup) {
    this.submitted = true;
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
        },
        error => console.log(error),
        () => {
          this.router.navigate(['/']);
          this.RegisterFormGroup.reset();
        });

    }
  }
}
