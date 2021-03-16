import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css']
})
export class ColorsComponent implements OnInit {
  colors:Color[]=[];
  currentColor:Color|null;
  constructor(private colorService:ColorService,private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.router.events.subscribe(val=>{
      if(val instanceof NavigationStart){
        this.clearCurrentColor();
      }
    })
    this.getColors();
  }
  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
    });
  }

  getCurrentColor(color:Color){
    if(this.currentColor == color){
      return "list-group-item active";
    }
    return "list-group-item";
  }
  setCurrentColor(color:Color){
    this.currentColor = color;
  }
  clearCurrentColor(){
    this.currentColor = null;
  }
}
