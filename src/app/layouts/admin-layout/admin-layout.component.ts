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
    {name: 'Owner', url: '/admin/list_owner',  icon: 'supervised_user_circle'},
    {name: 'Property', url: '/admin/list_property', icon: 'widgets'},
    {name: 'Location', url: '/admin/property_location', icon: 'pin_drop'},
    {name: 'Invoice', url: '/admin/list_invoices', icon: 'send'},
    {name: 'user', url: '/admin/list_user', icon: 'account_box'},
  ]
    


 
  constructor() { }


  ngOnInit(): void {

  }

  toggleSidebar(){
    this.sideBarOpen = !this.sideBarOpen;
  }

  

  

}
