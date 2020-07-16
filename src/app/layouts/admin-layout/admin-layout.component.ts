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
    {name: 'Categories', url: '/admin/list_property', icon: 'extension'},
    {name: 'Positions', url: '/admin/property_location', icon: 'stars'},
    {name: 'Candidates', url: '/admin/list_invoices', icon: 'contacts'},
    {name: 'Users', url: '/admin/user/list', icon: 'supervised_user_circle'},
  ]
    


 
  constructor() { }


  ngOnInit(): void {

  }

  toggleSidebar(){
    this.sideBarOpen = !this.sideBarOpen;
  }

  

  

}
