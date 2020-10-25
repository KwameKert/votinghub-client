import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  sideBarOpen = true;
  links: Array<object> = [
    {name: 'dashboard',url: '/ec/dashboard', icon: 'home'},
    {name: 'Elections', url: 'election/list',  icon: 'how_to_vote'},
    {name: 'Candidates', url: 'candidate/list', icon: 'contacts'},
    {name: 'Results', url: 'results', icon: 'assessment'},
    {name: 'Live', url: 'live-results', icon: 'visibility'},
  ]



  constructor() { }


  ngOnInit(): void {

  }

  toggleSidebar(){
    this.sideBarOpen = !this.sideBarOpen;
  }

  

  

}
