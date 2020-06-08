import { Login } from './../../ModuleClass/loginClass.module';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApicallService } from 'src/app/service/apicall.service';
import { MessageService } from 'primeng/api';
import { Atilce } from './article';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  collapsed = true;
  artilces: any[];
  constructor(private router: Router, private http: ApicallService, private messageService: MessageService) { }

  ngOnInit() {
    this.getArticleData();
  }
  getArticleData() {
    this.http.getArticle().subscribe(
      (response: Atilce[]) => {
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
}
