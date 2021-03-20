import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';
import { BrandsComponent } from '../brands/brands.component';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css']
})
export class ColorsComponent implements OnInit {
  colors:Color[]=[];
  selectedColor:number;
  public static currentColor:Color|null;
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
    if(ColorsComponent.currentColor == color){
      return "true";
    }
    return "false";
  }
  setCurrentColor(colorId:number){
    this.colorService.getColorById(colorId).subscribe(response=>{
      ColorsComponent.currentColor = response.data;
    })
  }
  clearCurrentColor(){
    ColorsComponent.currentColor = null;
  }
}
