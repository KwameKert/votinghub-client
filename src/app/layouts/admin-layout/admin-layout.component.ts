import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  sideBarOpen = true;

  links: Array<object> = [
    {name: 'dashboard',url: '/admin/dashboard', icon: 'home'},
    {name: 'Elections', url: 'election/list',  icon: 'how_to_vote'},
    {name: 'Categories', url: 'category/list', icon: 'extension'},
    {name: 'Positions', url: 'position/list', icon: 'stars'},
    {name: 'Candidates', url: 'candidate/list', icon: 'contacts'},
    {name: 'Users', url: 'user/list', icon: 'supervised_user_circle'},
    {name: 'Man', url: 'voter/list', icon: 'fingerprint'},
    {name: 'Stud', url: 'student/list', icon: 'face'},
    {name: 'Results', url: 'election-results', icon: 'assessment'},
  ]
    

  constructor() { }


  ngOnInit(): void {

  }

  toggleSidebar(){
    this.sideBarOpen = !this.sideBarOpen;
  }

  

  

}
