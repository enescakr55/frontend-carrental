import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-leftsidebar',
  templateUrl: './leftsidebar.component.html',
  styleUrls: ['./leftsidebar.component.css']
})
export class LeftsidebarComponent implements OnInit {
  clearedFilterClass:string;
  showAll:boolean = false;
  constructor(private router:Router) {}

  ngOnInit(): void {
    
    this.router.events.subscribe(e=>{
      if(e instanceof NavigationEnd){
        if(this.router.url == "/"){
          this.showAll = true;
        }else{
          this.showAll = false;
        }
      }
    })

  }
  clearedFilter(){
        if(this.showAll == true){
          return "list-group-item active";
        }else{
          return "list-group-item";
        }
  }
  setParams(){
    this.showAll = true;
  }
}
