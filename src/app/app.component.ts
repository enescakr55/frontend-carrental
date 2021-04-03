import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'carrental';
  isAuth:boolean;
  showNav:boolean = true;
  topMenu:boolean = false;
  constructor(private authService:AuthService,private router:Router) {}
  ngOnInit(): void {
    this.isAuth = this.authService.isAuth();
    this.router.events.subscribe(val=>{
      if(val instanceof NavigationEnd){
        console.log(this.router.url);
        if(this.router.url == '/login' ||this.router.url == '/register'){
          this.showNav = false;
        }else if(this.router.url == '/user/update' || this.router.url == '/customers'){
            this.showNav = false;
            this.topMenu = true;
        }else{
          this.showNav = true;
        }
      }
    })
  }

}
