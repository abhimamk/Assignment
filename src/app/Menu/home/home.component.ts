import { Login } from './../../ModuleClass/loginClass.module';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApicallService } from 'src/app/service/apicall.service';
import { MessageService } from 'primeng/api';
import { Article } from './article';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MainService } from '../../service/main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  collapsed = true;
  displayModal = false;
  checkAdminn = false;
  artilces: any[];
  loginInfo: any[];
  getLoginDetails: any;
  articleFormGroup: FormGroup;
  submitted = false;
  buttonName: string;
  headerName: string;
  subscription: Subscription;
  constructor(
    private router: Router, private http: ApicallService, private messageService: MessageService,
    private fb: FormBuilder, private mainService: MainService) {
    this.mainService.currentMessage.subscribe(message => this.getLoginDetails = message);

  }

  ngOnInit() {
    this.getArticleData();
    this.articleReactiveForm();
  }
  articleReactiveForm() {
    this.articleFormGroup = this.fb.group(
      {
        id: new FormControl(''),
        createdAt: new FormControl(''),
        name: new FormControl('', Validators.required),
        avatar: new FormControl('', Validators.required)
      }
    );
  }
  getArticleData() {
    this.http.getArticle().subscribe(
      (response: any[]) => {
        this.artilces = response;
      },
      error => {
        this.messageService.add({ severity: 'warn', summary: 'Warn   Message', detail: 'Sercer Error' });

      },
    );
  }
  logout() {
    this.router.navigate(['/']);
  }
  showModalDialog() {
  }
  addNewArticles() {
    this.displayModal = true;
    this.articleFormGroup.reset();
    this.buttonName = 'Add';
    this.headerName = 'Add Article';
  }
  onEdit(item: Article) {
    this.displayModal = true;
    this.headerName = 'UpDate Article';
    this.articleFormGroup.reset();
    this.articleFormGroup.patchValue(
      {
        id: item.id,
        createdAt: item.createdAt,
        name: item.name,
        avatar: item.avatar
      }
    );
    this.buttonName = 'Update Details';
  }
  transforData() {
    if (this.getLoginDetails.value.username === "First1" && this.getLoginDetails.value.password === "password1") {
      this.checkAdminn = true;
      return this.checkAdminn = true;
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warn Message', detail: 'Your Not Admin' });
      return this.checkAdminn = false;

    }
  }
  onDelete(item) {
    this.transforData();
    if (this.checkAdminn === true) {
      this.subscription = this.http.deleteArticle(item.id).subscribe(
        (response: any) => {
          this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Deleted successfully' });
        }
      );
      this.loginInfo = [];
      this.getArticleData();
      this.checkAdminn = false;
      this.articleFormGroup.reset();
      this.getArticleData();
    }

  }
  get registerFormControl() {
    return this.articleFormGroup.controls;
  }
  onSubmit(articlesForm) {
    this.submitted = true;
    if (this.articleFormGroup.valid) {
      if (articlesForm.value.id === null) {
        const req = {
          id: articlesForm.value.id,
          createdAt: articlesForm.value.createdAt,
          name: articlesForm.value.name,
          avatar: articlesForm.value.avatar
        };
        this.subscription = this.http.addNewArticles(req).subscribe(
          (response: any) => {
            console.log(response);
          },
          error => {
            this.messageService.add({ severity: 'success', summary: 'success   Message', detail: 'Failed Add' });
          },
          () => {
            this.messageService.add({ severity: 'success', summary: 'success   Message', detail: 'Successfully Add' });
            this.articleFormGroup.reset();
            this.getArticleData();
            this.displayModal = false;
          });
      } else {

        const req = {
          createdAt: articlesForm.value.createdAt,
          name: articlesForm.value.name,
          avatar: articlesForm.value.avatar
        };
        this.subscription = this.http.editArticle(req, articlesForm.value.id).subscribe(
          (response: any) => {
            console.log(response);
          },
          error => {
            this.messageService.add({ severity: 'warn', summary: 'Warn   Message', detail: 'Failed Add' });
          },
          () => {
            this.messageService.add({ severity: 'success', summary: 'success   Message', detail: 'Successfully UpDate' });
            this.articleFormGroup.reset();
            this.getArticleData();
            this.displayModal = false;

          });
      }

    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warn   Message', detail: 'Enter Proper Details' });
      return false;

    }
  }
  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
