import { Login } from './../../ModuleClass/loginClass.module';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  collapsed = true;
  constructor(private router: Router) { }

  ngOnInit() {
  }
  logout() {
    this.router.navigate(['/']);
  }
}
