import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  categories: number;
  candidates: number;
  positions: number;
  votes: number;

  constructor(private _dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.fetchComponents();
  }

  fetchComponents(){
    this._dashboardService.fetchComponents().subscribe(result=>{
        this.candidates = result.data.candidates;
        this.categories = result.data.categories;
        this.positions = result.data.positions;
        this.votes = result.data.votes;
    },error=>{
      console.error(error)
    })
  }

}
